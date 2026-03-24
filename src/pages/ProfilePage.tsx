import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { api } from '../services/api';
import { User, Mail, Calendar, Shield, BadgeCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/profile');
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-10 pb-20">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground mt-2 font-medium">Manage your personal information and preferences.</p>
        </motion.div>

        {user ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card/40 glass border border-border/50 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative">
                <div className="w-32 h-32 bg-primary rounded-3xl flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/40 relative z-10">
                  <span className="text-5xl font-black">{user.name?.[0].toUpperCase()}</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-xl shadow-lg border-4 border-card z-20">
                  <BadgeCheck className="w-6 h-6" />
                </div>
              </div>
              
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Full Name</label>
                    <div className="flex items-center gap-3 text-xl font-bold">
                      <User className="w-5 h-5 text-primary" />
                      {user.name}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Email Address</label>
                    <div className="flex items-center gap-3 text-xl font-bold">
                      <Mail className="w-5 h-5 text-primary" />
                      {user.email}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Member Since</label>
                    <div className="flex items-center gap-3 text-xl font-bold">
                      <Calendar className="w-5 h-5 text-primary" />
                      {new Date(user.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Account Status</label>
                    <div className="flex items-center gap-3 text-xl font-bold text-green-500">
                      <Shield className="w-5 h-5" />
                      Verified
                    </div>
                  </div>
                </div>

                {user.google_id && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-3xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                      </div>
                      <div>
                        <p className="font-bold">Google Connected</p>
                        <p className="text-xs text-muted-foreground font-medium">Your account is linked with Google OAuth</p>
                      </div>
                    </div>
                    <div className="px-4 py-1.5 bg-green-500/10 text-green-500 rounded-full text-xs font-black uppercase tracking-wider">Active</div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center gap-4 bg-card/20 glass rounded-[3rem] border border-border/50">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Accessing profile data...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <button className="p-8 rounded-[2.5rem] bg-secondary border border-border/50 text-left hover:scale-[1.02] transition-all group">
             <h3 className="text-xl font-black mb-2 flex items-center justify-between">
               Notification Settings
               <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
             </h3>
             <p className="text-sm text-muted-foreground font-medium">Manage how you receive alerts and updates.</p>
           </button>
           <button className="p-8 rounded-[2.5rem] bg-secondary border border-border/50 text-left hover:scale-[1.02] transition-all group">
             <h3 className="text-xl font-black mb-2 flex items-center justify-between font-sans">
               Security & Privacy
               <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
             </h3>
             <p className="text-sm text-muted-foreground font-medium font-sans">Update your password and manage sessions.</p>
           </button>
        </div>
      </div>
    </Layout>
  );
};

// Helper component for chevron
const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" /></svg>
);

export default ProfilePage;
