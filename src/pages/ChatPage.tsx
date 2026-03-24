import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { api } from '../services/api';
import { Send, Bot, User, Loader2, Sparkles, Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'ai';
  content: string;
  language?: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hello! I'm your AI STEM Tutor. I specialize in physics, math, and chemistry. What can we master today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post('/chat', { message: userMsg });
      setMessages(prev => [...prev, { role: 'ai', content: data.message, language: data.detected_language }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I'm having trouble connecting to the brain right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto h-[calc(100vh-10rem)] flex flex-col pt-4">
        <motion.div 
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-6 flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              STEM Tutor <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </h1>
            <p className="text-muted-foreground font-medium mt-1">AI-powered personalized learning session</p>
          </div>
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-secondary rounded-2xl border border-border/50">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-70">Turbo Brain Active</span>
          </div>
        </motion.div>

        <div className="flex-1 bg-card/40 glass border border-border/50 rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl relative">
          <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
            {messages.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                key={i} 
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border/50 text-primary'}`}>
                  {msg.role === 'user' ? <User className="w-6 h-6" /> : <Brain className="w-6 h-6" />}
                </div>
                <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 sm:p-6 rounded-[2rem] text-lg font-medium leading-relaxed ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none shadow-xl shadow-primary/20' : 'bg-background/80 border border-border/30 rounded-tl-none shadow-sm prose prose-neutral dark:prose-invert max-w-none'}`}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <div className="markdown-container">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mt-2 px-2 flex items-center gap-1.5">
                    {msg.role === 'user' ? 'You' : 'AI Tutor'} • Just now
                    {msg.language && (
                      <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
                        <span className="w-1 h-1 bg-primary rounded-full animate-pulse"></span>
                        {msg.language}
                      </span>
                    )}
                  </span>
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-card border border-border/50 text-primary shadow-sm">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="bg-background/50 glass border border-border/30 px-6 py-4 rounded-[2rem] rounded-tl-none flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 rounded-full bg-primary" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 rounded-full bg-primary" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm font-bold text-primary animate-pulse uppercase tracking-wider">Processing...</span>
                </div>
              </motion.div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          <div className="p-6 md:p-8 bg-background/50 border-t border-border/50 backdrop-blur-md">
            <div className="flex gap-3 max-w-4xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message your STEM tutor..."
                className="flex-1 px-8 py-5 rounded-3xl border border-border/50 bg-background/50 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-medium text-lg placeholder:text-muted-foreground/30 shadow-inner"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="p-5 rounded-3xl bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50 shadow-xl shadow-primary/30"
              >
                <Send className="w-7 h-7" />
              </motion.button>
            </div>
            <p className="text-center text-[10px] text-muted-foreground/40 mt-4 font-bold uppercase tracking-[0.2em]">
              Powered by advanced STEM brain models • Zarra AI 2026
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
