import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { translations, Language } from '../translations';

type Message = { id: number; text: string; sender: 'user' | 'bot'; timestamp?: string; };
type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings' | 'settings-islamic';
type Mode = 'general' | 'islamic' | null;

interface AIChatSupportScreenIslamicProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  currentLanguage?: Language;
  userName?: string;
}

const quickPrompts = [
  { text: "Help me find peace", icon: "🤲" },
  { text: "Feeling anxious", icon: "😰" },
  { text: "Need du'a guidance", icon: "📿" },
  { text: "Spiritual support", icon: "🕌" },
];

export default function AIChatSupportScreenIslamic({ navigate, currentLanguage = 'en', userName }: AIChatSupportScreenIslamicProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: `As-salamu alaykum${userName ? `, ${userName}` : ''}! I'm your Islamic wellness companion. How are you feeling tonight? May Allah ease your worries. 💚`, sender: 'bot', timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const sendToAI = async (userText: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: messages.length + 1, text: userText, sender: 'user', timestamp }]);
    setMessage('');
    setIsTyping(true);

    try {
      // Use the deployed Render backend so it works without running a local server.
      // Note: Free Render instances spin down after inactivity, so the first request might take 15-30 seconds.
      const API_URL = "https://sleepease-backend.onrender.com/chat";
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer test_token"
        },
        body: JSON.stringify({ message: userText, mode: "islamic" }),
      });
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      
      const data = await response.json();
      setMessages(prev => [...prev, { id: Date.now(), text: data.reply, sender: 'bot', timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), text: "SubhanAllah, I'm having trouble connecting right now. The server might be waking up (this can take up to 50 seconds on the free tier). Please try again. May Allah ease your way.", sender: 'bot', timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
    } finally { setIsTyping(false); }
  };

  const handleSendMessage = () => { if (message.trim()) sendToAI(message); };
  const handleQuickPrompt = (promptText: string) => {
    setMessage(promptText);
    setTimeout(() => { if (promptText.trim()) sendToAI(promptText); }, 100);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSendMessage(); };

  const showQuickPrompts = messages.length === 1;

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-emerald-500/20 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-emerald-950" />
        </div>
        <div>
          <h1 className="text-white text-lg font-medium">Islamic Wellness Guide</h1>
          <p className="text-emerald-100/70 text-xs flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Here to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 px-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-5 py-3.5 rounded-2xl ${
              msg.sender === 'user'
                ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-br-md shadow-lg shadow-emerald-500/10'
                : 'bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-bl-md shadow-lg'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
              {msg.timestamp && <p className={`text-xs mt-1 opacity-60 ${msg.sender === 'user' ? 'text-emerald-100/70 text-right' : 'text-emerald-100/50 text-left'}`}>{msg.timestamp}</p>}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-3.5 rounded-2xl rounded-bl-md shadow-lg">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {showQuickPrompts && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 px-2">
          {quickPrompts.map((prompt, index) => (
            <button key={index} onClick={() => handleQuickPrompt(prompt.text)} className="rounded-xl bg-white/5 border border-white/10 p-4 text-center sm:text-left transition-all hover:bg-white/10 hover:border-emerald-500/30 active:scale-95 shadow-md">
              <span className="text-3xl sm:text-2xl mb-2 sm:mb-1 block">{prompt.icon}</span>
              <span className="text-white/80 text-sm">{prompt.text}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="pt-4 border-t border-emerald-500/20">
        <div className="flex gap-3 items-center">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-5 py-3.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all text-sm shadow-inner"
            onKeyPress={handleKeyPress}
          />
          <button 
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
              message.trim() ? 'bg-gradient-to-br from-emerald-500 to-teal-500 hover:opacity-90 active:scale-95 shadow-lg shadow-emerald-500/20' : 'bg-white/10 opacity-50 cursor-not-allowed'
            }`}
            onClick={handleSendMessage} disabled={!message.trim()}
          >
            <Send className={`w-5 h-5 ${message.trim() ? 'text-white' : 'text-white/40'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
