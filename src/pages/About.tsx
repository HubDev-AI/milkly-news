import { Layout } from "@/components/Layout";

export default function About() {
    return (
        <Layout>
            <div className="max-w-4xl">
                <section className="mb-16 md:mb-24">
                    <span className="text-xs font-mono text-accent uppercase tracking-widest">[ MANIFESTO ]</span>
                    <h1 className="text-6xl md:text-[10vw] leading-[0.8] font-display mt-4 mb-8">
                        RAW SIGNAL.<br/>
                        <span className="text-muted-foreground text-[0.8em]">ZERO NOISE.</span>
                    </h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-display text-accent">OUR MISSION</h2>
                            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                                MILKLY NEWS WAS FOUNDED IN 2026 WITH A SINGLE PURPOSE: TO STRIP AWAY THE POLISH OF PRE-PACKAGED TECH NEWS AND DELIVER THE RAW, UNREFINED TRUTH ABOUT THE TOOLS WE USE AND THE SYSTEMS WE BUILD.
                            </p>
                            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                                IN AN ERA OF AI-GENERATED SLOP, WE PROVIDE HUMAN-CENTRIC ANALYTICS FOR THE DISCERNING DEVELOPER AND DESIGNER.
                            </p>
                        </div>
                        
                        <div className="border-2 border-primary/20 p-8 bg-accent/5">
                             <h3 className="text-xl font-display mb-4">[ SYSTEM_SPEC ]</h3>
                             <ul className="space-y-4 font-mono text-[10px] tracking-wider uppercase">
                                 <li className="flex justify-between border-b border-primary/10 pb-2">
                                     <span>Established</span>
                                     <span className="text-foreground">2026.01.28</span>
                                 </li>
                                 <li className="flex justify-between border-b border-primary/10 pb-2">
                                     <span>Protocols</span>
                                     <span className="text-foreground">Neo-Brutalism v2.4</span>
                                 </li>
                                 <li className="flex justify-between border-b border-primary/10 pb-2">
                                     <span>Uptime</span>
                                     <span className="text-foreground">99.99%</span>
                                 </li>
                                 <li className="flex justify-between">
                                     <span>Location</span>
                                     <span className="text-foreground">EDGE_NODE_04</span>
                                 </li>
                             </ul>
                        </div>
                    </div>
                </section>

                <section className="border-t-2 border-primary/20 pt-16">
                    <h2 className="text-4xl font-display mb-8">THE TEAM</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {[1, 2, 3].map(i => (
                             <div key={i} className="border border-primary/20 p-6 group hover:border-accent transition-colors">
                                 <div className="w-full aspect-square bg-muted/20 border border-primary/10 mb-4 grayscale group-hover:grayscale-0 transition-all overflow-hidden relative">
                                     {/* Simple animated pattern for placeholders */}
                                     <div className="absolute inset-0 opacity-10 bg-grid-pattern animate-pulse" />
                                 </div>
                                 <h4 className="font-display text-xl">CONTRIBUTOR_{i}</h4>
                                 <span className="font-mono text-[10px] text-muted-foreground uppercase">[ field_operative ]</span>
                             </div>
                         ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
