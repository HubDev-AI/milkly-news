import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Mock Data Type
export interface Newsletter {
    id: string;
    sequence: string; // e.g., "001"
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    slug: string;
}

export const NewsletterGrid = ({ items }: { items: Newsletter[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t-2 border-l-2 border-primary/20">
            {items.map((item) => (
                <Link 
                    key={item.id} 
                    to={`/newsletter/${item.id}`}
                    className="group relative border-r-2 border-b-2 border-primary/20 bg-background hover:bg-muted/5 transition-colors p-6 md:p-8 flex flex-col h-[400px]"
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-auto">
                        <div className="flex flex-col">
                           <span className="text-xs font-mono text-muted-foreground group-hover:text-accent transition-colors">
                                No. {item.sequence}
                           </span>
                           <span className="text-[10px] font-mono text-muted-foreground/50 uppercase">
                                {item.date}
                           </span>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center border border-primary/20 rounded-full group-hover:bg-accent group-hover:border-accent transition-all">
                            <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-background" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mt-8">
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {item.tags.map(tag => (
                                <span key={tag} className="text-[10px] uppercase border border-primary/20 px-2 py-0.5 text-muted-foreground">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-4xl md:text-5xl font-display leading-[0.9] text-foreground mb-4 line-clamp-3 group-hover:underline decoration-2 underline-offset-4 decoration-accent">
                            {item.title}
                        </h3>
                    </div>

                    {/* Footer / Hover Reveal */}
                    <div className="mt-auto pt-6 border-t border-dashed border-primary/10 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                         <span className="text-xs font-mono lowercase">[ read_article ]</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};
