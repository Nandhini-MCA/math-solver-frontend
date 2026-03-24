import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { api } from '../services/api';
import { 
  BarChart3, Award, Sparkles, ChevronRight, Activity, Target, Book, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, historyRes] = await Promise.all([
          api.get('/analytics/report'),
          api.get('/history')
        ]);
        setStats(statsRes.data);
        setHistory(historyRes.data.history || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12 pb-32">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-5xl font-black tracking-tighter">Personal <span className="text-primary italic">Mastery</span></h1>
          <p className="text-lg text-muted-foreground mt-2 font-medium">Track your growth and progress across all subjects.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Current Level" value={stats?.level || 1} subtext="EXPERT" icon={Award} color="text-amber-500" bg="bg-amber-500/10" />
          <StatCard label="Experience" value={stats?.total_xp || 0} subtext="XP TOTAL" icon={Sparkles} color="text-primary" bg="bg-primary/10" />
          <StatCard label="Subject Streak" value={stats?.streak_count || 0} subtext="DAYS" icon={Target} color="text-red-500" bg="bg-red-500/10" />
          <StatCard label="Solved Issues" value={history.length} subtext="DOCS" icon={Activity} color="text-violet-500" bg="bg-violet-500/10" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Mastery Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card/40 glass border border-border/50 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
               <h2 className="text-3xl font-black tracking-tight flex items-center gap-4 mb-10 text-foreground">
                  <BarChart3 className="w-10 h-10 text-primary" /> Learning Progress
               </h2>
               <div className="space-y-8">
                  {stats?.subject_mastery && Object.entries(stats.subject_mastery).map(([subject, val]: [string, any], idx: number) => (
                    <div key={subject} className="space-y-3">
                       <div className="flex justify-between items-end">
                          <span className="text-xl font-bold text-foreground">{subject}</span>
                          <span className="text-sm font-black text-primary">{val}%</span>
                       </div>
                       <div className="h-4 bg-secondary rounded-full overflow-hidden border border-border/50">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${val}%` }}
                            transition={{ duration: 1, delay: idx * 0.2 }}
                            className={`h-full bg-gradient-to-r ${idx % 2 === 0 ? 'from-primary to-violet-500' : 'from-orange-500 to-red-500'}`} 
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* History Feed */}
            <div className="space-y-6">
               <h2 className="text-2xl font-black px-4">Recent solved problems</h2>
               <div className="grid gap-4">
                  {history.slice(0, 4).map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 10 }}
                      className="p-6 bg-card/20 glass border border-border/50 rounded-3xl flex items-center justify-between group cursor-pointer"
                    >
                       <div className="flex gap-4 items-center overflow-hidden">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                             <Book className="w-6 h-6 text-primary" />
                          </div>
                          <div className="truncate">
                             <p className="font-bold truncate text-foreground">{item.question_text}</p>
                             <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mt-1">Managed By AI Tutor</p>
                          </div>
                       </div>
                       <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Sidebar - Weak Topics & Planner */}
          <div className="space-y-8">
             <div className="p-8 rounded-[2.5rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                <h3 className="text-2xl font-black mb-4">Focus Mode</h3>
                <p className="text-sm font-medium opacity-90 leading-relaxed mb-6">
                  Our AI has identified {stats?.weak_topics?.length || 0} areas where you can improve your mastery.
                </p>
                <div className="space-y-3">
                   {stats?.weak_topics?.map((topic: string) => (
                      <div key={topic} className="px-4 py-2 bg-white/20 rounded-xl text-xs font-black uppercase tracking-[0.2em]">{topic}</div>
                   ))}
                </div>
             </div>

             <div className="p-8 rounded-[2.5rem] bg-card/40 glass border border-border/50 shadow-xl space-y-6">
                <h3 className="text-xl font-black">Daily Activity</h3>
                <div className="flex justify-between items-end h-32 gap-3">
                   {stats?.weekly_progress?.map((p: number, i: number) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                         <motion.div 
                           initial={{ height: 0 }}
                           animate={{ height: `${p}%` }}
                           className="w-full bg-primary/20 rounded-t-lg group relative"
                         >
                            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
                         </motion.div>
                         <span className="text-[10px] font-black opacity-30 uppercase tracking-tighter">Day {i+1}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StatCard = ({ label, value, subtext, icon: Icon, color, bg }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-[2.5rem] border border-border/50 bg-card/40 glass shadow-2xl relative overflow-hidden group"
  >
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
    <div className="flex items-center justify-between mb-6 relative">
      <div className={`p-4 ${bg} ${color} rounded-2xl`}>
        <Icon className="w-8 h-8" />
      </div>
    </div>
    <p className="text-lg font-bold text-muted-foreground">{label}</p>
    <div className="flex items-end gap-2 mt-2">
      <h3 className="text-5xl font-black text-foreground">{value}</h3>
      <span className="text-[10px] font-black text-primary mb-2 uppercase tracking-[0.2em] leading-none">{subtext}</span>
    </div>
  </motion.div>
);

export default DashboardPage;
