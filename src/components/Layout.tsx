import { Header } from "./Header";
import { cn } from "@/lib/utils";

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-background flex flex-col font-mono selection:bg-accent selection:text-accent-foreground">
            {/* Global Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("/noise.svg")' }} />
            
            <Header />
            
            <main className={cn("flex-1 px-4 md:px-8 py-8 md:py-12 max-w-[1920px] mx-auto w-full", className)}>
                {children}
            </main>
            
            {/* Minimal Footer for now */}
            <footer className="border-t-2 border-primary/20 py-8 px-4 md:px-8">
                 <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-end gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">[ SYSTEM STATUS: ONLINE ]</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">© 2026 MILKLY INC.</span>
                    </div>
                    <h2 className="text-[12vw] leading-[0.75] font-display opacity-5 select-none pointer-events-none">
                        MILKLY
                    </h2>
                 </div>
            </footer>
        </div>
    );
};
