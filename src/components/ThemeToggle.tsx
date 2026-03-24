import React from 'react';
import { Moon, Sun, Palette, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, colorTheme, toggleTheme, setColorTheme } = useTheme();
  const [showPicker, setShowPicker] = React.useState(false);

  const colors: { name: string; value: 'default' | 'violet' | 'rose' | 'amber'; class: string }[] = [
    { name: 'Blue', value: 'default', class: 'bg-blue-500' },
    { name: 'Violet', value: 'violet', class: 'bg-violet-500' },
    { name: 'Rose', value: 'rose', class: 'bg-rose-500' },
    { name: 'Amber', value: 'amber', class: 'bg-amber-500' },
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="p-3 bg-card glass rounded-2xl shadow-2xl flex flex-col gap-2 mb-2"
          >
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setColorTheme(c.value)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-accent transition group"
              >
                <div className={`w-4 h-4 rounded-full ${c.class} ring-offset-2 ring-primary ${colorTheme === c.value ? 'ring-2' : ''}`} />
                <span className="text-sm font-medium">{c.name}</span>
                {colorTheme === c.value && <Check className="w-4 h-4 text-primary ml-auto" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="p-3 rounded-2xl bg-card glass shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all text-foreground"
          title="Color Theme"
        >
          <Palette className="w-6 h-6" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-card glass shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all text-foreground overflow-hidden relative"
          title="Toggle Dark Mode"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            {theme === 'light' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </motion.div>
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;
