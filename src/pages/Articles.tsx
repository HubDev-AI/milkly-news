import { Layout } from "@/components/Layout";
import { NewsletterGrid, type Newsletter } from "@/components/NewsletterGrid";
import { useState } from "react";

const ALL_ARTICLES: Newsletter[] = [
    {
        id: "1",
        sequence: "042",
        title: "THE RISE OF AGENTIC WORKFLOWS",
        date: "JAN 28, 2026",
        excerpt: "Agents are not just tools; they are becoming colleagues.",
        tags: ["AI", "CODE"],
        slug: "agentic-workflows-042"
    },
    {
        id: "2",
        sequence: "041",
        title: "BRUTALISM IS BACK (DID IT LEAVE?)",
        date: "JAN 21, 2026",
        excerpt: "Why modern web design is shifting back to raw aesthetics.",
        tags: ["DESIGN"],
        slug: "brutalism-back-041"
    },
    {
        id: "5",
        sequence: "043",
        title: "QUANTUM COMPUTING FOR DESIGNERS",
        date: "FEB 04, 2026",
        excerpt: "How qubits will redefine the way we think about layout algorithms.",
        tags: ["TECH", "DESIGN"],
        slug: "quantum-design-043"
    },
    {
        id: "6",
        sequence: "044",
        title: "THE END OF THE GRID",
        date: "FEB 11, 2026",
        excerpt: "Fluid dynamics in UI design. Why we are moving away from boxes.",
        tags: ["MATH", "UI"],
        slug: "end-of-grid-044"
    }
];

export default function Articles() {
    const [activeTag, setActiveTag] = useState("ALL");
    const tags = ["ALL", "AI", "CODE", "DESIGN", "TECH", "MATH"];

    const filteredItems = activeTag === "ALL" 
        ? ALL_ARTICLES 
        : ALL_ARTICLES.filter(item => item.tags.includes(activeTag));

    return (
        <Layout>
            <section className="mb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-primary/20 pb-4">
                    <div>
                        <span className="text-xs font-mono text-accent uppercase tracking-widest">[ KNOWLEDGE BASE ]</span>
                        <h1 className="text-5xl md:text-7xl font-display mt-2">ARTICLES</h1>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 md:mb-1">
                        {tags.map(tag => (
                            <button 
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`text-[10px] font-mono px-3 py-1 border transition-colors ${
                                    activeTag === tag 
                                    ? "bg-primary text-background border-primary" 
                                    : "border-primary/20 text-muted-foreground hover:border-primary/50"
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <NewsletterGrid items={filteredItems} />
            
            {filteredItems.length === 0 && (
                <div className="py-24 text-center border-b-2 border-l-2 border-r-2 border-primary/20">
                    <span className="text-xs font-mono text-muted-foreground uppercase opacity-50">
                        [ NO_RESULTS_FOUND ]
                    </span>
                </div>
            )}
        </Layout>
    );
}
