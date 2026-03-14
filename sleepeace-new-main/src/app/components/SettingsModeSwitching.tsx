import { ChevronRight, Sun, User, Globe, Shield, FileText, Bell, Palette, Volume2, HelpCircle, Mail, Star, Award, Heart, LogOut, Smartphone } from 'lucide-react';
import { Language, translations } from '../translations';

type Mode = 'general' | 'islamic';
type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings' | 'settings-islamic' | 'language-selection';

interface SettingsModeSwitchingProps {
  navigate: (screen: Screen, mode?: 'general' | 'islamic' | null) => void;
  currentMode: 'general' | 'islamic';
  userInfo: { name: string; email: string };
  onLogout: () => void;
  currentLanguage: Language;
}

export default function SettingsModeSwitching({ navigate, currentMode, userInfo, onLogout, currentLanguage }: SettingsModeSwitchingProps) {
  const t = translations[currentLanguage].settings;
  const isIslamic = currentMode === 'islamic';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-white text-3xl font-light">{t.title}</h1>
        <p className="text-white/60 mt-1">{t.subtitle}</p>
      </div>

      {/* Grid Layout for Desktop Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Profile Card */}
          <div className={`rounded-3xl bg-gradient-to-br ${isIslamic ? 'from-emerald-500/20 to-teal-500/20 border-emerald-400/20' : 'from-blue-500/20 to-purple-500/20 border-blue-400/20'} border p-6 flex items-center gap-5 shadow-lg`}>
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${isIslamic ? 'from-emerald-400/40 to-teal-400/40' : 'from-blue-400/40 to-purple-400/40'} flex items-center justify-center text-4xl shadow-inner`}>👤</div>
            <div className="flex-1">
              <h3 className="text-white text-xl font-medium mb-1">{userInfo.name || translations[currentLanguage].generalHome.guest}</h3>
              <p className="text-white/70 text-sm mb-2">{userInfo.email || 'No email'}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium"><Star className="w-3.5 h-3.5 text-yellow-400" />{t.premiumMember}</div>
            </div>
            <button className={`${isIslamic ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300' : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300'} px-4 py-2 rounded-xl text-sm transition-colors`}>Edit</button>
          </div>

          <div className="space-y-4">
            <SectionLabel text={t.preferences} />
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/10">
              <SettingRow icon={<Sun />} label={t.appMode} subtitle={currentMode === 'general' ? t.generalMode : t.islamicMode} iconBg="from-amber-500/30 to-orange-500/30" onClick={() => navigate(currentMode === 'general' ? 'islamic-home' : 'general-home', currentMode === 'general' ? 'islamic' : 'general')} />
              <SettingRow icon={<Bell />} label={t.notifications} subtitle={t.remindersUpdates} iconBg="from-blue-500/30 to-cyan-500/30" badge="3" />
              <SettingRow icon={<Palette />} label={t.theme} subtitle={t.darkMode} iconBg="from-purple-500/30 to-pink-500/30" />
              <SettingRow icon={<Volume2 />} label={t.sound} subtitle={t.soundEnabled} iconBg="from-green-500/30 to-emerald-500/30" />
              <SettingRow icon={<Globe />} label={t.language} subtitle={currentLanguage === 'en' ? 'English' : currentLanguage === 'zh' ? '中文' : currentLanguage === 'ar' ? 'العربية' : 'Bahasa Melayu'} iconBg="from-indigo-500/30 to-blue-500/30" onClick={() => navigate('language-selection')} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <SectionLabel text={t.account} />
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/10">
              <SettingRow icon={<User />} label={t.manageAccount} subtitle={t.manageAccountDesc} iconBg="from-slate-500/30 to-gray-500/30" />
              <SettingRow icon={<Award />} label={translations[currentLanguage].generalHome.achievements} subtitle={t.achievementsDesc} iconBg="from-yellow-500/30 to-amber-500/30" />
              <SettingRow icon={<Heart />} label={t.favorites} subtitle={t.favoritesDesc} iconBg="from-red-500/30 to-pink-500/30" />
            </div>
          </div>

          <div className="space-y-4">
            <SectionLabel text={t.support} />
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/10">
              <SettingRow icon={<HelpCircle />} label={t.helpCenter} subtitle={t.helpCenterDesc} iconBg="from-cyan-500/30 to-teal-500/30" />
              <SettingRow icon={<Mail />} label={t.contactSupport} subtitle={t.contactDesc} iconBg="from-blue-500/30 to-indigo-500/30" />
            </div>
          </div>

          <div className="space-y-4">
            <SectionLabel text={t.legal} />
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/10">
              <SettingRow icon={<Shield />} label={t.privacyPolicy} subtitle={t.yourDataSafe} iconBg="from-green-500/30 to-teal-500/30" />
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
  return <p className="text-white/40 text-xs font-semibold uppercase tracking-wider pl-4">{text}</p>;
}

function SettingRow({ icon, label, subtitle, iconBg, badge, hideArrow = false, onClick }: { icon: any, label: string, subtitle?: string, iconBg: string, badge?: string, hideArrow?: boolean, onClick?: () => void }) {
  return (
    <button className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left" onClick={onClick}>
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center text-white flex-shrink-0 shadow-sm`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-base mb-0.5">{label}</p>
        {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
      </div>
      {badge && <div className="px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold">{badge}</div>}
      {!hideArrow && <ChevronRight className="w-5 h-5 text-white/30 flex-shrink-0" />}
    </button>
  );
}