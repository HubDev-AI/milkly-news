import { Layout } from "@/components/Layout";
import { NewsletterGrid, type Newsletter } from "@/components/NewsletterGrid";
import { Link } from "react-router-dom";

// Mock Data - In a real app, this would come from an API/CMS
const MOCK_NEWSLETTERS: Newsletter[] = [
    {
        id: "1",
        sequence: "042",
        title: "THE RISE OF AGENTIC WORKFLOWS",
        date: "JAN 28, 2026",
        excerpt: "Agents are not just tools; they are becoming colleagues. We explore how deepmind's latest research changes the coding landscape.",
        tags: ["AI", "CODE", "FUTURE"],
        slug: "agentic-workflows-042"
    },
    {
        id: "2",
        sequence: "041",
        title: "BRUTALISM IS BACK (DID IT LEAVE?)",
        date: "JAN 21, 2026",
        excerpt: "Why modern web design is shifting back to raw, unpolished, and structural aesthetics. A deep dive into neo-brutalism.",
        tags: ["DESIGN", "TRENDS"],
        slug: "brutalism-back-041"
    },
    {
        id: "3",
        sequence: "040",
        title: "REACT 19: THE AFTERMATH",
        date: "JAN 14, 2026",
        excerpt: "Six months in, how has the ecosystem adapted? We look at the winners and losers of the server components era.",
        tags: ["DEV", "REACT"],
        slug: "react-19-aftermath-040"
    },
    {
        id: "4",
        sequence: "039",
        title: "COLORS ARE OVERRATED",
        date: "JAN 07, 2026",
        excerpt: "A monochrome manifesto. How limiting your palette can unblock your creativity and improve accessibility.",
        tags: ["DESIGN", "COLOR"],
        slug: "colors-overrated-039"
    }
];

export default function Home() {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="mb-12 md:mb-24 flex flex-col items-start gap-4 md:gap-8">
                <div className="border border-primary/20 px-3 py-1 text-xs font-mono tracking-widest text-accent uppercase bg-accent/5">
                    [ LATEST INTELLIGENCE ]
                </div>
                <h1 className="text-6xl md:text-[8vw] leading-[0.85] font-display text-foreground max-w-4xl">
                    CURATED CHAOS FOR<br/>
                    <span className="text-muted-foreground">DIGITAL NATIVES.</span>
                </h1>
                <p className="max-w-xl text-muted-foreground font-mono text-sm md:text-base leading-relaxed">
                    Milkly News delivers unfiltered insights into design, code, and the future of creation. No filler, just raw signal.
                </p>
                <div className="flex gap-4">
                    <Link to="/subscribe" className="btn-brutal px-8 py-4 text-sm md:text-base bg-primary text-background hover:bg-transparent hover:text-primary border-primary">
                        SUBSCRIBE NOW
                    </Link>
                </div>
            </section>

            {/* Newsletter Grid */}
            <section>
                 <div className="flex justify-between items-end mb-4 border-b border-primary/20 pb-2">
                     <h2 className="text-2xl font-display">ARCHIVE</h2>
                     <span className="font-mono text-xs text-muted-foreground">[ 4 EDITIONS ]</span>
                 </div>
                 <NewsletterGrid items={MOCK_NEWSLETTERS} />
            </section>
        </Layout>
    );
}
