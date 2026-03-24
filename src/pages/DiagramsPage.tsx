import React, { useState } from 'react';
import Layout from '../components/Layout';
import { api } from '../services/api';
import { Activity, Loader2, Sparkles, Download, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DiagramsPage = () => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setImageUrl('');
    setDetectedLanguage(null);
    try {
      const { data } = await api.post('/diagrams/generate', { description });
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      setImageUrl(data.image_url.startsWith('http') ? data.image_url : `${backendUrl}${data.image_url}`);
      if (data.detected_language) {
          setDetectedLanguage(data.detected_language);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `stem-diagram-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handleFullscreen = () => {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 pb-20">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black tracking-tight">Dynamic Diagrams</h1>
          <p className="text-muted-foreground mt-2 font-medium">Describe a complex structure or workflow, and AI will blueprint it instantly.</p>
        </motion.div>

        <motion.div 
          layout
          className="bg-card/50 glass border border-border/50 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
        >
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Create a flowchart for a photosynthesis cycle with light-dependent and independent reactions..."
            className="w-full h-40 px-6 py-5 bg-background/50 border border-border/50 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all resize-none font-medium placeholder:text-muted-foreground/50 text-lg"
          />

          <div className="mt-6 flex justify-end">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerate}
              disabled={loading || !description.trim()}
              className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 transition-all flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-primary/30"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Activity className="w-6 h-6" />}
              {loading ? 'Sketching...' : 'Generate Diagram'}
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {imageUrl && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  Visual Architecture
                  {detectedLanguage && (
                    <div className="ml-4 flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                       <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 animate-pulse"></span>
                       {detectedLanguage}
                    </div>
                  )}
                </h2>
                <div className="flex gap-2">
                  <button 
                    onClick={handleDownload}
                    className="p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition shadow-sm border border-border/50"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleFullscreen}
                    className="p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition shadow-sm border border-border/50"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-border/50 flex flex-col items-center justify-center group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src={imageUrl} 
                  alt="AI Generated Diagram" 
                  className="max-w-full h-auto rounded-2xl object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Layout>
  );
};

export default DiagramsPage;
