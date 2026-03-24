import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Image as ImageIcon, MessageSquare, Activity, User, LogOut, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const navItems = [
    { label: 'Dashboard', icon: Home, path: '/dashboard' },
    { label: 'AI Solver', icon: ImageIcon, path: '/solver' },
    { label: 'Diagrams', icon: Activity, path: '/diagrams' },
    { label: 'Chat Tutor', icon: MessageSquare, path: '/chat' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-500">
      {/* Sidebar */}
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
        <header className="md:hidden flex items-center justify-between p-6 glass sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold">STEM Copilot</h2>
          </div>
          <button onClick={handleLogout} className="p-2 bg-secondary rounded-xl text-muted-foreground"><LogOut className="w-5 h-5" /></button>
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
