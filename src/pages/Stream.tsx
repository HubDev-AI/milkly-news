import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { api } from "../lib/api";
import { APP_URL } from "../lib/config";
import type { PublicNewsletter } from "../lib/api";

export default function Stream() {
  const { id } = useParams<{ id: string }>();

  const { data: newsletters, isLoading, error } = useQuery({
    queryKey: ["stream-newsletters", id],
    queryFn: () => api.getStreamNewsletters(id!),
    enabled: !!id,
  });

  const { data: streams } = useQuery({
    queryKey: ["streams"],
    queryFn: () => api.getStreams(),
  });

  const currentStream = streams?.find((s) => s.id === id);
  const streamName = currentStream?.name || "Stream";

  return (
    <div className="min-h-screen cream-gradient text-foreground relative safe-area-top safe-area-bottom">
      <div className="absolute inset-0 milk-swirl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🥛</span>
            <span className="milkly-logo text-xl text-gradient-espresso">milkly.news</span>
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← All newsletters
          </Link>
        </div>
      </header>

      {/* Stream Header */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-sm text-muted-foreground font-medium mb-2">Stream</div>
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          {streamName}
        </h1>
        <p className="text-muted-foreground">
          {newsletters?.length || 0} newsletter{newsletters?.length !== 1 ? "s" : ""} published
        </p>
      </section>

      {/* Newsletters */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        {error ? (
          <div className="text-center py-16 cream-card">
            <span className="text-4xl mb-4 block">⚠️</span>
            <h3 className="text-lg font-semibold mb-2">
              Failed to load newsletters
            </h3>
            <p className="text-muted-foreground mb-6">
              Please check your connection and try again.
            </p>
            <Link
              to="/"
              className="btn-espresso inline-flex px-6 py-3 rounded-lg font-medium"
            >
              Back to home
            </Link>
          </div>
        ) : isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="cream-card p-6 animate-pulse"
              >
                <div className="h-6 bg-muted/40 rounded w-2/3 mb-4" />
                <div className="h-3 bg-muted/40 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : newsletters && newsletters.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {newsletters.map((newsletter: PublicNewsletter) => (
              <Link
                key={newsletter.id}
                to={`/newsletter/${newsletter.id}`}
                className="cream-card p-6 hover:border-primary/30 transition-all group"
              >
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-3">
                  {newsletter.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>By {newsletter.author}</span>
                  <span>
                    {newsletter.publishedAt
                      ? new Date(newsletter.publishedAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 cream-card">
            <span className="text-4xl mb-4 block">📰</span>
            <h3 className="text-lg font-semibold mb-2">
              No newsletters for this stream yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Check back soon for fresh content!
            </p>
            <Link
              to="/"
              className="btn-espresso inline-flex px-6 py-3 rounded-lg font-medium"
            >
              Browse all newsletters
            </Link>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 glass">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by{" "}
            <a
              href={APP_URL}
              className="text-primary hover:underline font-medium"
            >
              Milkly
            </a>
            {" "}— Turn the internet into your daily newsletter
          </p>
        </div>
      </footer>
    </div>
  );
}
