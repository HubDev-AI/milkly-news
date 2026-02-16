import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { api } from "../lib/api";
import { APP_URL } from "../lib/config";
import SubscribeForm from "../components/SubscribeForm";

export default function Newsletter() {
  const { id } = useParams<{ id: string }>();

  const { data: newsletter, isLoading, error } = useQuery({
    queryKey: ["newsletter", id],
    queryFn: () => api.getNewsletter(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen cream-gradient text-foreground relative safe-area-top safe-area-bottom">
        <div className="absolute inset-0 milk-swirl pointer-events-none" />
        <header className="sticky top-0 z-40 glass border-b border-border/50">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🥛</span>
              <span className="milkly-logo text-xl text-gradient-espresso">milkly.news</span>
            </Link>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="cream-card p-6 animate-pulse">
            <div className="h-4 bg-muted/40 rounded w-24 mb-4" />
            <div className="h-10 bg-muted/40 rounded w-3/4 mb-6" />
            <div className="h-4 bg-muted/40 rounded w-48 mb-12" />
            <div className="space-y-4">
              <div className="h-4 bg-muted/40 rounded" />
              <div className="h-4 bg-muted/40 rounded w-5/6" />
              <div className="h-4 bg-muted/40 rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !newsletter) {
    return (
      <div className="min-h-screen cream-gradient text-foreground relative safe-area-top safe-area-bottom">
        <div className="absolute inset-0 milk-swirl pointer-events-none" />
        <header className="sticky top-0 z-40 glass border-b border-border/50">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🥛</span>
              <span className="milkly-logo text-xl text-gradient-espresso">milkly.news</span>
            </Link>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <span className="text-4xl mb-4 block">{error ? "⚠️" : "😕"}</span>
          <h1 className="text-2xl font-semibold mb-2">
            {error ? "Something went wrong" : "Newsletter not found"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {error
              ? "We couldn't load this newsletter. Please check your connection and try again."
              : "This newsletter may have been removed or doesn't exist."}
          </p>
          <Link
            to="/"
            className="btn-espresso inline-flex px-6 py-3 rounded-lg font-medium"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cream-gradient text-foreground relative safe-area-top safe-area-bottom">
      <div className="absolute inset-0 milk-swirl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
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

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Meta */}
        <div className="mb-8">
          <div className="text-sm text-muted-foreground font-medium mb-3">
            {newsletter.streamName}
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            {newsletter.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>By {newsletter.author}</span>
            <span>•</span>
            <span>
              {newsletter.publishedAt
                ? new Date(newsletter.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </span>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsletter.content) }}
        />

        {/* Subscribe Form */}
        <div className="mt-12">
          <SubscribeForm newsletterId={id!} newsletterTitle={newsletter.title} />
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border/50 glass mt-16">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Enjoyed this newsletter? Create your own with Milkly.
            </p>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-espresso inline-flex px-6 py-3 rounded-lg font-medium"
            >
              Get started free →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
