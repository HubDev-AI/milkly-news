import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const Header = () => {
    const location = useLocation();
    const { soundEnabled, setSoundEnabled } = useAudio();

    const navItems = [
        { label: "WORK", path: "/" },
        { label: "ARTICLES", path: "/articles" },
        { label: "ABOUT", path: "/about" },
    ];

    const isActive = (path: string) => {
        if (path === "/" && location.pathname !== "/") return false;
        return location.pathname.startsWith(path);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-background border-b-2 border-primary/20 backdrop-blur-sm">
            <div className="flex justify-between items-center h-16 md:h-20 px-4 md:px-8 max-w-[1920px] mx-auto">
                {/* Logo */}
                <Link to="/" className="flex flex-col gap-0 group">
                    <h1 className="text-3xl md:text-4xl font-display leading-[0.85] group-hover:text-accent transition-colors">
                        MILKLY
                    </h1>
                    <span className="text-[10px] font-mono tracking-widest text-muted-foreground group-hover:text-foreground">
                        NEWS [v2.0]
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex gap-8">
                    {navItems.map((item) => (
                        <Link 
                            key={item.path} 
                            to={item.path}
                            className={cn(
                                "text-sm font-mono tracking-wider transition-colors hover:text-accent",
                                isActive(item.path) ? "text-foreground font-bold" : "text-muted-foreground"
                            )}
                        >
                            {isActive(item.path) ? `[ ${item.label} ]` : item.label}
                        </Link>
                    ))}
                </nav>

                {/* Controls */}
                <div className="flex items-center gap-4 font-mono text-xs">
                    <button 
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={cn(
                            "w-8 h-8 flex items-center justify-center border transition-colors",
                            soundEnabled ? "border-accent bg-accent/10 text-accent" : "border-primary/20 text-muted-foreground hover:bg-primary/10"
                        )}
                        title={soundEnabled ? "Mute audio" : "Enable audio"}
                    >
                        {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                    </button>
                    <div className="hidden md:block px-2 py-1 border border-primary/20 uppercase">
                        EN
                    </div>
                </div>
            </div>
        </header>
    );
};

