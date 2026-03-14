import { ChevronRight, Moon, User, Sun, Globe, Shield, FileText, Bell, Palette, Volume2, HelpCircle, Mail, Star, Award, Heart, LogOut, BookOpen, Smartphone, Calendar, Compass } from 'lucide-react';
import { Language, translations } from '../translations';

type Mode = 'general' | 'islamic';
type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings' | 'settings-islamic' | 'language-selection';

interface SettingsModeSwitchingIslamicProps {
  navigate: (screen: Screen, mode?: 'general' | 'islamic' | null) => void;
  currentMode: 'general' | 'islamic';
  userInfo: { name: string; email: string };
  onLogout: () => void;
  currentLanguage: Language;
}

export default function SettingsModeSwitchingIslamic({ navigate, currentMode, userInfo, onLogout, currentLanguage }: SettingsModeSwitchingIslamicProps) {
  const t = translations[currentLanguage].settings;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-white text-3xl font-light flex items-center gap-3">
          <Moon className="w-8 h-8 text-yellow-300" />
          {t.title}
        </h1>
        <p className="text-emerald-100/70 mt-1">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/20 p-6 flex items-center gap-5 shadow-lg">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400/40 to-teal-400/40 flex items-center justify-center text-4xl shadow-inner">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M21 12.5c-1.2.7-2.6 1.1-4.1 1.1-4.4 0-8-3.6-8-8 0-1.5.4-2.9 1.1-4.1A9 9 0 1 0 21 12.5Z" stroke="#F5D36C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 18.2s-2.5-1.5-3.6-2.9c-1.1-1.4-.7-3.2.6-4.1 1-.7 2.3-.5 3 .4.7-.9 2-.9 3-.2 1.2.8 1.5 2.6.4 4-1.1 1.5-3.4 2.8-3.4 2.8Z" fill="#F5D36C" opacity="0.9" /></svg>
            </div>
            <div className="flex-1">
              <h3 className="text-white text-xl font-medium mb-1">{userInfo.name || translations[currentLanguage].islamicHome.guest}</h3>
              <p className="text-emerald-100/80 text-sm mb-2">{userInfo.email || 'No email'}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-100/90 text-xs font-medium border border-emerald-500/30"><Star className="w-3.5 h-3.5 text-yellow-400" />{t.blessedMember}</div>
            </div>
            <button className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-4 py-2 rounded-xl text-sm transition-colors border border-emerald-500/20">Edit</button>
          </div>

          <div className="space-y-4">
             <SectionLabel text={t.islamicSettingsTitle} />
             <div className="bg-white/5 border border-emerald-400/20 rounded-3xl overflow-hidden divide-y divide-white/10 shadow-lg">
                <SettingRow icon={<Moon className="w-5 h-5"/>} label={t.prayerTimes} subtitle={t.prayerTimesDesc} iconBg="from-emerald-500/30 to-teal-500/30" />
                <SettingRow icon={<Compass className="w-5 h-5" />} label={t.qiblaDirection} subtitle={t.qiblaDesc} iconBg="from-blue-500/30 to-cyan-500/30" />
                <SettingRow icon={<Calendar className="w-5 h-5" />} label={t.hijriCalendar} subtitle={t.hijriDesc} iconBg="from-purple-500/30 to-indigo-500/30" />
                <SettingRow icon={<BookOpen className="w-5 h-5" />} label={t.quranProgress} subtitle={t.quranDesc} iconBg="from-amber-500/30 to-yellow-500/30" />
             </div>
          </div>
          
          <div className="space-y-4">
             <SectionLabel text={t.preferences} />
             <div className="bg-white/5 border border-emerald-400/20 rounded-3xl overflow-hidden divide-y divide-white/10 shadow-lg">
               <SettingRow icon={<Sun />} label={t.appMode} subtitle={currentMode === 'general' ? t.generalMode : t.islamicMode} iconBg="from-orange-500/30 to-amber-500/30" onClick={() => navigate(currentMode === 'general' ? 'islamic-home' : 'general-home', currentMode === 'general' ? 'islamic' : 'general')} />
               <SettingRow icon={<Bell />} label={t.notifications} subtitle={t.prayerReminders} iconBg="from-emerald-500/30 to-green-500/30" badge="On" />
               <SettingRow icon={<Palette />} label={t.theme} subtitle={t.islamicMode} iconBg="from-teal-500/30 to-cyan-500/30" />
               <SettingRow icon={<Volume2 />} label={t.sound} subtitle={t.makkahAdhan} iconBg="from-blue-500/30 to-indigo-500/30" />
               <SettingRow icon={<Globe />} label={t.language} subtitle={currentLanguage === 'en' ? 'English' : currentLanguage === 'zh' ? '中文' : currentLanguage === 'ar' ? 'العربية' : 'Bahasa Melayu'} iconBg="from-purple-500/30 to-pink-500/30" onClick={() => navigate('language-selection')} />
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <SectionLabel text={t.account} />
            <div className="bg-white/5 border border-emerald-400/20 rounded-3xl overflow-hidden divide-y divide-white/10 shadow-lg">
              <SettingRow icon={<User />} label={t.manageAccount} subtitle={t.personalInfo} iconBg="from-slate-500/30 to-gray-500/30" />
              <SettingRow icon={<Award />} label={t.spiritualMilestones} subtitle={t.achievementsDesc} iconBg="from-yellow-500/30 to-amber-500/30" />
              <SettingRow icon={<Heart />} label={t.savedDuas} subtitle={t.favoritesDesc} iconBg="from-red-500/30 to-rose-500/30" />
            </div>
          </div>

          <div className="space-y-4">
            <SectionLabel text={t.support} />
            <div className="bg-white/5 border border-emerald-400/20 rounded-3xl overflow-hidden divide-y divide-white/10 shadow-lg">
              <SettingRow icon={<HelpCircle />} label={t.helpCenter} subtitle={t.helpCenterDesc} iconBg="from-cyan-500/30 to-teal-500/30" />
              <SettingRow icon={<Mail />} label={t.contactSupport} subtitle={t.contactDesc} iconBg="from-blue-500/30 to-indigo-500/30" />
            </div>
          </div>

          <div className="space-y-4">
            <SectionLabel text={t.legal} />
            <div className="bg-white/5 border border-emerald-400/20 rounded-3xl overflow-hidden divide-y divide-white/10 shadow-lg">
              <SettingRow icon={<Shield />} label={t.privacyPolicy} subtitle={t.yourDataSafe} iconBg="from-green-500/30 to-emerald-500/30" />
              <SettingRow icon={<FileText />} label={t.termsOfService} subtitle={t.usageAgreement} iconBg="from-slate-500/30 to-gray-500/30" />
              <SettingRow icon={<Smartphone />} label={t.appVersion} subtitle={t.appVersionDesc} hideArrow iconBg="from-purple-500/30 to-indigo-500/30" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <button onClick={onLogout} className="w-full max-w-sm mx-auto rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 p-4 transition-colors flex items-center justify-center gap-3 group">
          <LogOut className="w-5 h-5 text-red-400 group-hover:-translate-x-1 transition-transform" />
          <span className="text-red-400 font-medium text-lg">{t.logOut}</span>
        </button>
      </div>

    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <p className="text-emerald-100/50 text-xs font-semibold uppercase tracking-wider pl-4">{text}</p>;
}

function SettingRow({ icon, label, subtitle, iconBg, badge, hideArrow = false, onClick }: { icon: any, label: string, subtitle?: string, iconBg: string, badge?: string, hideArrow?: boolean, onClick?: () => void }) {
  return (
    <button className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left" onClick={onClick}>
       <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center text-white flex-shrink-0 shadow-sm border border-white/20`}>{icon}</div>
       <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-base mb-0.5">{label}</p>
          {subtitle && <p className="text-emerald-100/70 text-sm">{subtitle}</p>}
       </div>
       {badge && <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">{badge}</div>}
       {!hideArrow && <ChevronRight className="w-5 h-5 text-emerald-100/30 flex-shrink-0" />}
    </button>
  );
}