import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Image as ImageIcon, MessageSquare, Activity, User, LogOut, Brain, Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSidebar();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [closeSidebar]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const navItems = [
    { label: 'Home', icon: Home, path: '/dashboard' },
    { label: 'AI Solver', icon: ImageIcon, path: '/solver' },
    { label: 'Diagrams', icon: Activity, path: '/diagrams' },
    { label: 'Chat Tutor', icon: MessageSquare, path: '/chat' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-500">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 h-full w-[80%] max-w-[280px] bg-card/95 backdrop-blur-xl border-r border-border/50 z-50 md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">STEM Copilot</h2>
              </div>
              <button
                onClick={closeSidebar}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                        : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive(item.path) ? '' : ''}`} />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-4 border-t border-border/50">
              <button
                onClick={() => {
                  closeSidebar();
                  handleLogout();
                }}
                className="flex items-center gap-3 px-4 py-3.5 w-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-xl transition-all font-semibold"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="w-72 p-6 flex flex-col hidden md:flex h-screen sticky top-0 bg-card/50 backdrop-blur-xl border-r border-border/50">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">STEM Copilot</h2>
        </motion.div>

        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item, idx) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to={item.path} 
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 relative group ${location.pathname === item.path ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' : 'text-muted-foreground hover:bg-secondary'}`}
              >
                <item.icon className={`w-5 h-5 ${location.pathname === item.path ? '' : 'group-hover:text-primary transition-colors'}`} />
                <span className="font-bold">{item.label}</span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary rounded-2xl -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-6 border-t border-border/50"
        >
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-5 py-3.5 w-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-2xl transition-all font-bold group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </motion.div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 glass sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Open menu"
              aria-expanded={isSidebarOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
            <Brain className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-bold">STEM Copilot</h2>
          </div>
          <button onClick={handleLogout} className="p-2 bg-secondary rounded-lg text-muted-foreground"><LogOut className="w-5 h-5" /></button>
        </header>

        <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-auto max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
