import { ReactNode } from 'react';
import Header from './Header';
import { Language } from '../translations';

type Screen =
  | 'mode-selection'
  | 'general-home'
  | 'islamic-home'
  | 'general-login'
  | 'islamic-login'
  | 'general-signup'
  | 'islamic-signup'
  | 'mood-check-general'
  | 'mood-check-islamic'
  | 'content-general'
  | 'content-islamic'
  | 'ai-chat'
  | 'ai-chat-islamic'
  | 'mood-history-general'
  | 'mood-history-islamic'
  | 'settings'
  | 'settings-islamic'
  | 'language-selection';

type Mode = 'general' | 'islamic' | null;

interface WebAppLayoutProps {
  children: ReactNode;
  currentScreen: Screen;
  currentMode: Mode;
  currentLanguage: Language;
  userInfo: { name: string; email: string };
  navigate: (screen: Screen, mode?: Mode) => void;
  onLogout: () => void;
  /** If true, content takes full height without scrolling (for chat screens) */
  fullHeight?: boolean;
}

export default function WebAppLayout({
  children,
  currentScreen,
  currentMode,
  currentLanguage,
  userInfo,
  navigate,
  onLogout,
  fullHeight = false,
}: WebAppLayoutProps) {
  const isIslamic = currentMode === 'islamic';

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background gradient — matches existing theme */}
      <div
        className={`fixed inset-0 transition-colors duration-500 ${
          isIslamic
            ? 'bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-900'
            : 'bg-gradient-to-br from-slate-700 via-slate-800 to-blue-900'
        }`}
      />

      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 right-1/4 w-96 h-96 rounded-full blur-3xl transition-colors duration-500 ${
            isIslamic ? 'bg-emerald-400/5' : 'bg-blue-400/5'
          }`}
        />
        <div
          className={`absolute bottom-32 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl transition-colors duration-500 ${
            isIslamic ? 'bg-yellow-400/5' : 'bg-purple-400/5'
          }`}
        />
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-50">
        <Header
          currentScreen={currentScreen}
          currentMode={currentMode}
          currentLanguage={currentLanguage}
          userInfo={userInfo}
          navigate={navigate}
          onLogout={onLogout}
        />
      </div>

      {/* Main Content */}
      <main
        className={`relative z-10 flex-1 ${
          fullHeight
            ? 'flex flex-col overflow-hidden'
            : 'overflow-y-auto'
        }`}
      >
        <div
          className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 ${
            fullHeight
              ? 'flex-1 flex flex-col overflow-hidden'
              : 'py-6 sm:py-8'
          }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
