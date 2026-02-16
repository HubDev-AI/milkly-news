import { Layout } from "@/components/Layout";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function Unsubscribe() {
  const { token, username } = useParams<{ token?: string, username?: string }>();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (token) {
      setStatus("loading");
      // Simulate API call for direct unsubscribe via link
      setTimeout(() => {
          setStatus("success");
          setMessage("You have been successfully unsubscribed from the network.");
      }, 1500);
    }
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call for email-based unsubscribe
    setTimeout(() => {
        setStatus("success");
        setMessage(`Unsubscribe request received for ${email}. Check your inbox to confirm.`);
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
         <div className="w-full max-w-xl border-2 border-destructive/20 p-8 relative bg-background/50 backdrop-blur-sm">
            
            {/* Corner Markers */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-destructive" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-destructive" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-destructive" />

            {/* Status Content */}
            {(status === "loading") && (
                <div className="text-center py-12">
                   <div className="font-mono text-lg animate-pulse mb-4 text-destructive">TERMINATING_CONNECTION...</div>
                </div>
            )}

            {(status === "idle") && (
                <div className="text-center">
                    <span className="text-xs font-mono text-destructive uppercase tracking-widest block mb-4">
                        [ {username ? `EXIT ${username.toUpperCase()}'S NETWORK` : "LEAVE THE NETWORK"} ]
                    </span>
                    <h1 className="text-5xl font-display mb-6">UNSUBSCRIBE</h1>
                    <p className="font-mono text-muted-foreground mb-8 text-xs leading-relaxed">
                        ENTER YOUR REGISTERED EMAIL TO INITIATE THE DECOUPLING SEQUENCE.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="USER@STATION.NET"
                            className="input-brutal w-full p-4 border-2 border-destructive/20 focus:border-destructive bg-background text-destructive"
                        />
                        <button 
                            type="submit"
                            className="btn-brutal w-full py-4 bg-destructive text-white hover:bg-transparent hover:text-destructive border-2 border-destructive"
                        >
                            CONFIRM EXIT
                        </button>
                    </form>
                </div>
            )}

            {status === "success" && (
                <div className="text-center">
                    <span className="text-4xl block mb-6">👋</span>
                    <h1 className="text-4xl font-display mb-4 text-foreground">BYE BYE.</h1>
                    <p className="font-mono text-muted-foreground mb-8 text-sm">{message}</p>
                    <Link to="/" className="btn-brutal px-6 py-3 text-sm inline-block">
                        RETURN TO HUB
                    </Link>
                </div>
            )}

            {status === "error" && (
                <div className="text-center">
                    <span className="text-4xl block mb-6">⚠️</span>
                    <h1 className="text-4xl font-display mb-4 text-destructive">PROTOCOL_ERROR</h1>
                    <p className="font-mono text-muted-foreground mb-8 text-sm">{message}</p>
                    <Link to="/" className="btn-brutal px-6 py-3 text-sm inline-block border-destructive text-destructive hover:bg-destructive hover:text-white">
                        RETRY CONNECTION
                    </Link>
                </div>
            )}
         </div>
      </div>
    </Layout>
  );
}
