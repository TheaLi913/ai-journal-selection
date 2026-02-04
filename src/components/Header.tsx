import { BookOpen, History, FileOutput } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  disableResults?: boolean;
}

const Header = ({ disableResults = false }: HeaderProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Core Function", icon: BookOpen, disabled: false },
    { path: "/results", label: "Results", icon: FileOutput, disabled: disableResults },
    { path: "/records", label: "Records", icon: History, disabled: false },
  ];

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-foreground">JournalAI</h1>
              <p className="text-xs text-muted-foreground">Smart Journal Selection</p>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              if (item.disabled) {
                return (
                  <span
                    key={item.path}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-muted-foreground/50 cursor-not-allowed"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{item.label}</span>
                  </span>
                );
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
