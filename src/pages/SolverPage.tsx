import React, { useState } from 'react';
import Layout from '../components/Layout';
import { api } from '../services/api';
import { Upload, Camera, Send, Loader2, FileText, Image as ImageIcon, Sparkles, Volume2, MessageSquare, HelpCircle } from 'lucide-react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

const SolverPage = () => {
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [explanationMode, setExplanationMode] = useState('standard');
  const [languageOverride, setLanguageOverride] = useState('');
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  const handleSolve = async () => {
    if (mode === 'text' && !textInput.trim()) return;
    if (mode === 'image' && !file) return;

    setLoading(true);
    setSolution('');
    setDetectedLanguage(null);
    try {
      let finalQuestionText = textInput;
      
      if (mode === 'image' && file) {
        const formData = new FormData();
        formData.append('file', file);
        const { data: uploadData } = await api.post('/solver/upload-image', formData);
        finalQuestionText = uploadData.extracted_text;
        setTextInput(finalQuestionText);
      }

      const { data } = await api.post('/solver/solve', { 
        text: finalQuestionText, 
        explanation_mode: explanationMode,
        language: languageOverride || undefined 
      });
      setSolution(data.solution_text);
      if (data.detected_language) {
          setDetectedLanguage(data.detected_language);
      }
      if (data.xp_earned) {
        setXp(prev => prev + data.xp_earned);
        if (data.levels_up) setLevel(l => l + 1);
      }
    } catch (err) {
      console.error(err);
      setSolution('An error occurred while generating the solution. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex justify-between items-start"
        >
          <div>
            <h1 className="text-4xl font-black tracking-tight">AI Problem Solver</h1>
            <p className="text-muted-foreground mt-2 font-medium">Get step-by-step explanations for your complex STEM questions.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="bg-primary/10 border border-primary/30 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-sm">
               <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs leading-none">LVL {level}</div>
               <div className="text-xs font-black uppercase tracking-widest text-primary">{xp} XP Earned</div>
            </div>
          </div>
        </motion.div>

        <div className="flex bg-secondary p-1.5 rounded-2xl gap-1 w-full max-w-sm border border-border/50 glass">
          <button 
            onClick={() => setMode('text')} 
            className={clsx(
              "flex-1 py-3 rounded-xl font-bold transition-all relative z-10", 
              mode === 'text' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {mode === 'text' && (
              <motion.div layoutId="solver-mode" className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
            )}
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" /> Text
            </div>
          </button>
          <button 
            onClick={() => setMode('image')} 
            className={clsx(
                "flex-1 py-3 rounded-xl font-bold transition-all relative z-10", 
                mode === 'image' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {mode === 'image' && (
              <motion.div layoutId="solver-mode" className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
            )}
            <div className="flex items-center justify-center gap-2">
              <Camera className="w-4 h-4" /> Image
            </div>
          </button>
        </div>

        <motion.div 
          layout
          className="bg-card/50 glass border border-border/50 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="w-32 h-32 text-primary" />
          </div>

          <AnimatePresence mode="wait">
            {mode === 'text' ? (
              <motion.div
                key="text-mode"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <textarea 
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="e.g. Find the derivative of f(x) = x³ * ln(x)"
                  className="w-full h-48 px-6 py-5 bg-background/50 border border-border/50 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all resize-none font-medium placeholder:text-muted-foreground/50 text-lg"
                />
              </motion.div>
            ) : (
              <motion.div
                key="image-mode"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="border-3 border-dashed border-primary/20 rounded-[2rem] h-48 flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 cursor-pointer transition-all group overflow-hidden relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)} 
                    className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                  />
                  <div className="flex flex-col items-center justify-center text-center p-6 transition-transform group-hover:scale-110 duration-500">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 text-primary">
                      <Upload className="w-8 h-8" />
                    </div>
                    <span className="text-lg font-bold text-foreground">
                      {file ? file.name : "Drop your image here"}
                    </span>
                    <span className="text-sm text-muted-foreground mt-1">or click to browse files</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">Explanation Depth</label>
                <select 
                  value={explanationMode} 
                  onChange={(e) => setExplanationMode(e.target.value)}
                  className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-2xl focus:outline-none font-bold text-sm h-12"
                >
                  <option value="standard">Academic Standard</option>
                  <option value="eli5">Explain Like I'm 10</option>
                  <option value="shortcut">Shortcuts & Methods</option>
                  <option value="concept_first">Concept-First Deep-Dive</option>
                  <option value="derivation">Formula Derivations</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">Force Language</label>
                <select 
                  value={languageOverride} 
                  onChange={(e) => setLanguageOverride(e.target.value)}
                  className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-2xl focus:outline-none font-bold text-sm h-12"
                >
                  <option value="">Auto-Detect (Smart)</option>
                  <option value="en">English Only</option>
                  <option value="ta">Tamil Only</option>
                  <option value="hi">Hindi Only</option>
                </select>
             </div>
          </div>

          <div className="mt-8 flex justify-end">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSolve}
              disabled={loading || (mode === 'text' && !textInput.trim()) || (mode === 'image' && !file)}
              className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 transition-all flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-primary/30"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
              {loading ? 'Thinking...' : 'Solve Problem'}
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {solution && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/30 glass border border-border/50 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden prose-neutral dark:prose-invert max-w-none"
            >
               <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border/50">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black m-0 tracking-tight text-foreground">AI Master Solution</h2>
                  {/* Language Badge */}
                  {detectedLanguage && (
                    <div className="ml-auto flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 text-xs font-bold uppercase tracking-widest shadow-sm">
                       <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 animate-pulse"></span>
                       {detectedLanguage}
                    </div>
                  )}
               </div>
               <div className="text-lg leading-relaxed font-sans">
                <ReactMarkdown>{solution}</ReactMarkdown>
               </div>
               
               <div className="mt-10 pt-6 border-t border-border/50 flex flex-wrap gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(solution.replace(/[#*`$]/g, ''));
                        window.speechSynthesis.speak(utterance);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-secondary rounded-xl font-bold text-sm"
                  >
                     <Volume2 className="w-4 h-4 text-primary" /> Read Aloud
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-6 py-3 bg-secondary rounded-xl font-bold text-sm"
                  >
                     <HelpCircle className="w-4 h-4 text-primary" /> Why this step?
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => window.location.href = '/chat'}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
                  >
                     <MessageSquare className="w-4 h-4" /> Ask Follow-up Doubt
                  </motion.button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default SolverPage;
