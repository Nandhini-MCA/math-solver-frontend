import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Globe, Brain, Camera, Calculator, Search, BarChart3, 
  Gamepad2, MessageSquare, Zap, FlaskConical, Target, 
  Settings, Award, Sparkles, ChevronRight, Mic, BookOpen, Activity, ArrowRight
} from 'lucide-react';

const LandingPage = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const featureCategories = [
    {
      title: "Language & Personalization",
      icon: Globe,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      features: ["Auto Language Detection", "Tanglish Support", "Voice in Regional Languages", "Explain in My Native Language"]
    },
    {
      title: "AI Learning Intelligence",
      icon: Brain,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      features: ["Adaptive Learning Engine", "Weak Topic Detection", "AI Revision Planner", "Concept Mastery Tracking"]
    },
    {
      title: "OCR & Input Systems",
      icon: Camera,
      color: "text-green-500",
      bg: "bg-green-500/10",
      features: ["Real-time Camera Solver", "Handwritten Text Recognition", "Diagram Text Extraction", "PDF Question Solver"]
    },
    {
      title: "Solver & Explanations",
      icon: Calculator,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      features: ["ELI5 Mode", "Shortcut Methods", "Visual Explanations", "Step-by-Step Logic"]
    },
    {
      title: "Gamification & Progress",
      icon: Gamepad2,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      features: ["XP Points System", "Achievement Badges", "Daily Challenges", "Boss-Level Problems"]
    },
    {
      title: "Deep Understanding",
      icon: Search,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      features: ["Why this step?", "What if scenario testing", "Concept Dependency Graph", "Real-world Applications"]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />

      <header className="fixed top-0 w-full z-50 glass border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 rotate-3 group hover:rotate-12 transition-transform duration-500">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter">AI STEM <span className="text-primary italic">Copilot</span></h1>
          </motion.div>
          <motion.nav 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <Link to="/auth" className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30">
              Enter Platform
            </Link>
          </motion.nav>
        </div>
      </header>

      <main className="relative pt-52 pb-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-black mb-10 border border-primary/20 tracking-widest uppercase shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>100+ Advanced Features Live</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-black tracking-tighter text-center max-w-5xl mb-12 leading-[0.85] text-foreground"
          >
            Master STEM With <br />
            <span className="text-primary italic">Absolute</span> Certainty.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground text-center max-w-3xl mb-16 leading-relaxed font-medium"
          >
            An elite level AI assistant for complex physics, chemistry, and math. 
            Experience visual logic, native language tutoring, and adaptive intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 mb-32"
          >
            <Link to="/auth" className="group px-12 py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-xl flex items-center gap-4 hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-primary/40">
              Start Solving
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* New Workflow Architecture Section */}
          <section className="w-full max-w-6xl mx-auto py-24 px-8 bg-card/20 glass border border-border/50 rounded-[4rem] relative overflow-hidden mb-40">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-30" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-30" />
            
            <div className="text-center mb-20">
               <span className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-4 block underline underline-offset-8 decoration-2 opacity-50">System Architecture</span>
               <h3 className="text-5xl font-black tracking-tighter">Elite Processing Flow</h3>
               <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto font-medium">How we turn complex math into instant mastery in 1.4 seconds.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
               {/* Vertical Connecting Lines for Mobile, Horizontal for Desktop */}
               <div className="hidden md:block absolute top-12 left-24 right-24 h-0.5 bg-gradient-to-r from-primary/5 via-primary/40 to-primary/5 z-0" />
               
               <WorkflowStep 
                 num="01" 
                 icon={Camera} 
                 title="Input Capture" 
                 desc="Ultra-High Precision OCR extracts handwritten math & STEM text." 
                 color="text-blue-500"
               />
               <WorkflowStep 
                 num="02" 
                 icon={Zap} 
                 title="AI Logic Trace" 
                 desc="Groq Llama 3 executes Chain-of-Thought reasoning steps." 
                 color="text-violet-500"
               />
               <WorkflowStep 
                 num="03" 
                 icon={BarChart3} 
                 title="Visual Blueprint" 
                 desc="QuickChart renders interactive dynamic diagrams instantly." 
                 color="text-orange-500"
               />
               <WorkflowStep 
                 num="04" 
                 icon={Award} 
                 title="Mastery Gain" 
                 desc="XP points added and concepts updated in your profile." 
                 color="text-emerald-500"
               />
            </div>
          </section>
        </div>


        {/* The 100 Features Grid moved from Dashboard */}
        <div className="space-y-20">
          <div className="text-center space-y-4">
             <h2 className="text-5xl font-black tracking-tight text-foreground">Complete Feature Ecosystem</h2>
             <p className="text-muted-foreground text-lg font-medium">Modular AI capabilities designed for every learning scenario.</p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featureCategories.map((cat, i) => (
              <FeatureCategoryCard key={i} category={cat} index={i} />
            ))}
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-border/50 py-20 px-6 backdrop-blur-sm bg-card/10">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
               <Brain className="w-8 h-8 text-primary" />
               <span className="text-xl font-black">AI STEM Copilot</span>
            </div>
            <div className="text-muted-foreground text-sm font-bold uppercase tracking-widest">
               © 2026 Advanced AI Research Lab
            </div>
         </div>
      </footer>
    </div>
  );
};

const WorkflowStep = ({ num, icon: Icon, title, desc, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center relative z-10 group"
  >
    <div className={`w-24 h-24 rounded-[2rem] bg-card border border-border/50 flex items-center justify-center mb-6 shadow-2xl relative group-hover:border-primary/50 transition-all duration-500`}>
       <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-[10px] font-black text-primary-foreground shadow-lg">{num}</div>
       <Icon className={`w-10 h-10 ${color} group-hover:scale-110 transition-transform duration-500`} />
    </div>
    <h4 className="text-xl font-black mb-2 tracking-tight group-hover:text-primary transition-colors">{title}</h4>
    <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-[180px]">{desc}</p>
  </motion.div>
);

const FeatureCategoryCard = ({ category: cat, index }: any) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 40, scale: 0.95 },
      show: { opacity: 1, y: 0, scale: 1 }
    }}
    className="bg-card/40 glass border border-border/50 p-10 rounded-[3rem] shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all group relative overflow-hidden"
  >
    <div className={`absolute -right-4 -top-4 w-32 h-32 ${cat.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
    
    <div className="flex items-center gap-6 mb-10 relative">
      <div className={`w-16 h-16 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
        <cat.icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-black tracking-tight text-foreground">{cat.title}</h3>
    </div>
    <ul className="space-y-5 relative">
      {cat.features.map((f: string, idx: number) => (
        <li key={idx} className="flex items-start gap-4 group/item">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <span className="text-[13px] font-black text-muted-foreground group-hover/item:text-foreground transition-colors uppercase tracking-widest leading-relaxed">
            {f}
          </span>
        </li>
      ))}
    </ul>
    <div className="mt-10 pt-8 border-t border-border/30 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-all transform group-hover:translate-x-2">
       <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Discover More</span>
       <ArrowRight className="w-4 h-4 text-primary" />
    </div>
  </motion.div>
);

export default LandingPage;


