import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";

interface SubscribeFormProps {
  newsletterId: string;
  newsletterTitle: string;
}

export default function SubscribeForm({ newsletterId, newsletterTitle }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: (email: string) => api.subscribeToNewsletter(newsletterId, email),
    onSuccess: (data) => {
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    },
    onError: (error: Error) => {
      setStatus("error");
      setMessage(error.message || "Failed to subscribe. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("idle");
    subscribeMutation.mutate(email.trim());
  };

  return (
    <div className="cream-card p-6">
      <h3 className="text-lg font-semibold mb-2">
        Get notified of new issues
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Subscribe to receive "{newsletterTitle}" directly in your inbox.
      </p>

      {status === "success" ? (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-300 text-sm">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus-glow bg-background"
          />
          <button
            type="submit"
            disabled={subscribeMutation.isPending}
            className="btn-espresso px-6 py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-3 text-sm text-destructive">{message}</p>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        You can unsubscribe at any time. No spam, ever.
      </p>
    </div>
  );
}
