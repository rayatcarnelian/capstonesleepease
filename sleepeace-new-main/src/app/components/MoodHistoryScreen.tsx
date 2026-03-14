import { useState } from 'react';
import { ChevronRight, TrendingUp, Calendar, Target, Award, Flame, Moon, Sun, Heart, Activity, Coffee } from 'lucide-react';
import { Language, translations } from '../translations';

type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings';
type Mode = 'general' | 'islamic' | null;

interface MoodHistoryScreenProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  currentLanguage: Language;
}
type MoodKey = 'calm' | 'happy' | 'anxious' | 'tired' | 'sad';
const moodMeta: Record<MoodKey, { emoji: string; color: string; bgColor: string }> = {
  calm: { emoji: '😌', color: 'text-blue-400', bgColor: 'bg-blue-400/30' },
  happy: { emoji: '😊', color: 'text-green-400', bgColor: 'bg-green-400/30' },
  anxious: { emoji: '😰', color: 'text-amber-400', bgColor: 'bg-amber-400/30' },
  tired: { emoji: '😴', color: 'text-purple-400', bgColor: 'bg-purple-400/30' },
  sad: { emoji: '😢', color: 'text-slate-400', bgColor: 'bg-slate-400/30' },
};
const summary: { key: MoodKey; pct: number }[] = [ { key: 'calm', pct: 35 }, { key: 'happy', pct: 30 }, { key: 'anxious', pct: 15 }, { key: 'tired', pct: 12 }, { key: 'sad', pct: 8 } ];
const checkins: { day: string; time: string; mood: MoodKey; note?: string }[] = [
  { day: 'Today', time: '10:30 PM', mood: 'calm', note: 'Meditation helped a lot' },
  { day: 'Yesterday', time: '9:15 PM', mood: 'happy', note: 'Great day at work!' },
  { day: 'Dec 29', time: '11:00 PM', mood: 'tired', note: 'Long productive day' },
  { day: 'Dec 28', time: '10:45 PM', mood: 'calm' },
  { day: 'Dec 27', time: '8:30 PM', mood: 'anxious', note: 'Stressed about deadline' },
];

export default function MoodHistoryScreen({ navigate, currentLanguage }: MoodHistoryScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'insights' | 'history'>('overview');
  const t = translations[currentLanguage].explore;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-3xl font-light">{t.title}</h1>
          <p className="text-white/60 mt-1">{t.subtitle}</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 flex items-center gap-2 hover:bg-white/15 transition-all">
          <Calendar className="w-4 h-4 text-white/80" />
          <span className="text-white/90 text-sm">{t.week}</span>
          <ChevronRight className="w-4 h-4 text-white/50" />
        </button>
      </div>

      {/* Desktop Layout: Sidebar + Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="flex lg:flex-col gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
            <button onClick={() => setSelectedTab('overview')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left whitespace-nowrap ${selectedTab === 'overview' ? 'bg-white/15 text-white shadow-sm' : 'text-white/60 hover:text-white/80 hover:bg-white/5'}`}>{t.overview}</button>
            <button onClick={() => setSelectedTab('insights')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left whitespace-nowrap ${selectedTab === 'insights' ? 'bg-white/15 text-white shadow-sm' : 'text-white/60 hover:text-white/80 hover:bg-white/5'}`}>{t.insights}</button>
            <button onClick={() => setSelectedTab('history')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left whitespace-nowrap ${selectedTab === 'history' ? 'bg-white/15 text-white shadow-sm' : 'text-white/60 hover:text-white/80 hover:bg-white/5'}`}>{t.history}</button>
          </div>
        </div>

        {/* Selected Content Area */}
        <div className="flex-1">
          {selectedTab === 'overview' && <OverviewTab currentLanguage={currentLanguage} />}
          {selectedTab === 'insights' && <InsightsTab currentLanguage={currentLanguage} />}
          {selectedTab === 'history' && <HistoryTab currentLanguage={currentLanguage} />}
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ currentLanguage }: { currentLanguage: Language }) {
  const t = translations[currentLanguage].explore;
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-white/10 p-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex flex-shrink-0 items-center justify-center"><Flame className="w-8 h-8 text-orange-400" /></div>
          <div><p className="text-white text-3xl font-bold">7</p><p className="text-white/70 text-sm mt-1">{t.dayStreak}</p></div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 p-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex flex-shrink-0 items-center justify-center"><Target className="w-8 h-8 text-blue-400" /></div>
          <div><p className="text-white text-3xl font-bold">30</p><p className="text-white/70 text-sm mt-1">{t.checkIns}</p></div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 p-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex flex-shrink-0 items-center justify-center"><Award className="w-8 h-8 text-purple-400" /></div>
          <div><p className="text-white text-3xl font-bold">5</p><p className="text-white/70 text-sm mt-1">{t.badges}</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Trend Chart */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 flex flex-col items-center place-content-center h-80 relative overflow-hidden">
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <h3 className="text-white text-lg font-medium">{t.moodTrend}</h3>
            <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-medium flex items-center gap-1"><TrendingUp className="w-4 h-4" />+15%</div>
          </div>
          {/* Faked Chart */}
          <div className="w-full flex items-end justify-between gap-4 h-48 mt-12 mb-4 px-2">
            {[65, 45, 75, 60, 85, 70, 90].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full sm:w-8 flex-1 flex flex-col justify-end relative group">
                  <div className="w-full bg-gradient-to-t from-blue-500/40 to-purple-500/40 rounded-t-lg transition-all group-hover:from-blue-400/60 group-hover:to-purple-400/60" style={{ height: `${h}%` }} />
                </div>
                <span className="text-white/50 text-xs sm:text-sm">{'SMTWTFS'[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Distribution */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 h-80 flex flex-col justify-start">
          <h3 className="text-white text-lg font-medium mb-6">{t.moodDistribution}</h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {summary.map(s => (
              <div key={s.key} className="flex items-center gap-4">
                <span className="text-3xl">{moodMeta[s.key].emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{t[s.key]}</span><span className="text-white/60">{s.pct}%</span>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden"><div className={`h-full ${moodMeta[s.key].bgColor}`} style={{ width: `${s.pct}%` }}/></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightsTab({ currentLanguage }: { currentLanguage: Language }) {
  const t = translations[currentLanguage].explore;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InsightCard icon={<TrendingUp className="w-6 h-6"/>} title={t.positiveTrend} desc={t.positiveTrendDesc} clr="green" tag={t.great} />
      <InsightCard icon={<Moon className="w-6 h-6"/>} title={t.bestSleepPattern} desc={t.bestSleepPatternDesc} clr="indigo" tag={t.insight} />
      <InsightCard icon={<Sun className="w-6 h-6"/>} title={t.morningEnergy} desc={t.morningEnergyDesc} clr="amber" tag={t.pattern} />
      <InsightCard icon={<Heart className="w-6 h-6"/>} title={t.meditationImpact} desc={t.meditationImpactDesc} clr="pink" tag={t.discovery} />
      <InsightCard icon={<Activity className="w-6 h-6"/>} title={t.stressTriggers} desc={t.stressTriggersDesc} clr="red" tag={t.alert} />
      <InsightCard icon={<Coffee className="w-6 h-6"/>} title={t.afternoonDip} desc={t.afternoonDipDesc} clr="cyan" tag={t.tip} />
    </div>
  );
}

function InsightCard({ icon, title, desc, clr, tag }: { icon: any, title: string, desc: string, clr: string, tag: string }) {
  const colorMap: any = {
    green: "from-green-500/20 to-emerald-500/20 text-emerald-300",
    indigo: "from-indigo-500/20 to-purple-500/20 text-purple-300",
    amber: "from-amber-500/20 to-orange-500/20 text-orange-300",
    pink: "from-pink-500/20 to-rose-500/20 text-rose-300",
    red: "from-red-500/20 to-rose-500/20 text-red-300",
    cyan: "from-cyan-500/20 to-blue-500/20 text-blue-300"
  };
  return (
    <div className={`rounded-2xl bg-gradient-to-br bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors flex gap-5`}>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${colorMap[clr].split(' ')[0]} ${colorMap[clr].split(' ')[1]}`}>
        <div className={colorMap[clr].split(' ')[2]}>{icon}</div>
      </div>
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h4 className="text-white font-medium text-lg">{title}</h4>
          <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium">{tag}</span>
        </div>
        <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function HistoryTab({ currentLanguage }: { currentLanguage: Language }) {
  const t = translations[currentLanguage].explore;
  return (
    <div className="space-y-4">
      {checkins.map((checkin, i) => (
        <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col sm:flex-row sm:items-center gap-5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-5 w-full sm:w-auto">
            <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
              {moodMeta[checkin.mood].emoji}
            </div>
            <div className="flex-1 sm:w-48">
              <h3 className="text-white font-medium text-lg mb-1">{t[checkin.mood]}</h3>
              <p className="text-white/60 text-sm flex items-center gap-2"><Calendar className="w-4 h-4"/>{checkin.day} • {checkin.time}</p>
            </div>
          </div>
          {checkin.note && (
            <div className="flex-1 rounded-xl bg-white/5 p-4 border border-white/5 mt-4 sm:mt-0">
              <p className="text-white/80 italic">"{checkin.note}"</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}