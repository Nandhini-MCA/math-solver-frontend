import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { api } from '../services/api';
import { Settings, Globe, Volume2, Shield, User, Save, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    preferred_language: 'en',
    auto_detect_language: true,
    simplification_level: 'standard',
    voice_enabled: false,
    mastery_goal: 100
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/analytics/settings');
        setSettings(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12 pb-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-4">
             <Settings className="w-10 h-10 text-primary" /> Settings
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Customize your AI STEM Copilot experience.</p>
        </motion.div>

        <div className="space-y-8">
           <SettingSection title="Language & Input" icon={Globe}>
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="font-bold">Auto Language Detection</p>
                       <p className="text-sm text-muted-foreground font-medium">Automatically detect input language (Tanglish/Hinglish supported)</p>
                    </div>
                    <Switch checked={settings.auto_detect_language} />
                 </div>
                 <div className="space-y-2">
                    <p className="font-bold">Preferred Response Language</p>
                    <select className="w-full h-12 bg-background border border-border rounded-xl px-4 font-bold">
                       <option value="en">English (default)</option>
                       <option value="ta">Tamil</option>
                       <option value="hi">Hindi</option>
                    </select>
                 </div>
              </div>
           </SettingSection>

           <SettingSection title="Voice & Accessibility" icon={Volume2}>
               <div className="flex items-center justify-between">
                  <div>
                     <p className="font-bold">Voice Output (Text-to-Speech)</p>
                     <p className="text-sm text-muted-foreground font-medium">Hear AI solutions read aloud in regional voices</p>
                  </div>
                  <Switch checked={settings.voice_enabled} />
               </div>
           </SettingSection>

           <SettingSection title="Learning Intelligence" icon={Shield}>
               <div className="space-y-4">
                  <p className="font-bold">Mastery Difficulty Goal</p>
                  <input type="range" className="w-full accent-primary" />
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground">
                     <span>Beginner</span>
                     <span>Master</span>
                  </div>
               </div>
           </SettingSection>
        </div>

        <div className="flex justify-end">
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg shadow-xl shadow-primary/20 flex items-center gap-3"
           >
             <Save className="w-6 h-6" /> Save Configuration
           </motion.button>
        </div>
      </div>
    </Layout>
  );
};

const SettingSection = ({ title, icon: Icon, children }: any) => (
  <div className="bg-card/30 glass border border-border/50 rounded-[2.5rem] p-10 space-y-8">
     <div className="flex items-center gap-4 border-b border-border/50 pb-6">
        <div className="p-3 bg-primary/10 text-primary rounded-xl">
           <Icon className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-black tracking-tight">{title}</h2>
     </div>
     {children}
  </div>
);

const Switch = ({ checked }: { checked: boolean }) => (
  <div className={`w-14 h-8 rounded-full p-1 transition-colors ${checked ? 'bg-primary' : 'bg-muted'}`}>
     <div className={`w-6 h-6 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : ''}`} />
  </div>
);

export default SettingsPage;
