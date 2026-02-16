import { Layout } from "@/components/Layout";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Subscribe() {
    const { username } = useParams<{ username?: string }>();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setTimeout(() => setStatus("success"), 1500); // Simulate API call
    };

    return (
        <Layout>
            <div className="min-h-[60vh] flex flex-col justify-center items-center">
                <div className="w-full max-w-2xl border-2 border-primary/20 p-8 md:p-12 relative bg-background/50 backdrop-blur-sm">
                    {/* Decorative Corner Squares */}
                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-primary" />
                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-primary" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-primary" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-primary" />

                    <div className="text-center mb-8">
                        <span className="text-xs font-mono text-accent tracking-widest uppercase mb-2 block">
                            [ {username ? `JOIN ${username.toUpperCase()}'S NETWORK` : "JOIN THE NETWORK"} ]
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display leading-[0.9] mb-4">
                            {username ? "SUBSCRIBE" : "STAY CONNECTED"}
                        </h1>
                        <p className="text-muted-foreground font-mono text-sm max-w-md mx-auto">
                            {username 
                                ? `Get updates directly from ${username} via Milkly News.` 
                                : "Weekly updates on the bleeding edge of design and technology. Zero spam."}
                        </p>
                    </div>

                    {status === "success" ? (
                        <div className="text-center py-12 border border-primary/20 bg-primary/5">
                            <span className="text-4xl block mb-4">✅</span>
                            <h2 className="text-2xl font-display mb-2">WELCOME ABOARD</h2>
                            <p className="font-mono text-sm text-muted-foreground">Check your inbox for confirmation.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="font-mono text-xs uppercase text-muted-foreground">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="YOU@EXAMPLE.COM"
                                    className="input-brutal w-full p-4 text-lg border-2 border-primary/20 focus:border-accent bg-background"
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={status === "loading"}
                                className="btn-brutal w-full py-4 text-lg bg-primary text-background hover:bg-transparent hover:text-primary transition-colors border-2 border-primary disabled:opacity-50"
                            >
                                {status === "loading" ? "PROCESSING..." : "SUBSCRIBE"}
                            </button>
                        </form>
                    )}
                    
                    <div className="mt-8 text-center">
                         <span className="text-[10px] font-mono text-muted-foreground/50 uppercase">
                             By subscribing you agree to receive milkly updates.
                         </span>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
