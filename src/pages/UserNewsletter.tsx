import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { api } from "../lib/api";

export default function UserNewsletter() {
  const { newsletterId } = useParams<{ userId: string; newsletterId: string }>();

  const { data: newsletter, isLoading, error } = useQuery({
    queryKey: ["newsletter", newsletterId],
    queryFn: () => api.getNewsletter(newsletterId!),
    enabled: !!newsletterId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-slate-900 relative safe-area-top safe-area-bottom flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 bg-slate-200 rounded w-24 mb-4" />
          <div className="h-10 bg-slate-200 rounded w-64 mb-6" />
        </div>
      </div>
    );
  }

  if (error || !newsletter) {
    return (
      <div className="min-h-screen bg-white text-slate-900 relative safe-area-top safe-area-bottom flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl mb-4 block">😕</span>
          <h1 className="text-2xl font-semibold mb-2">
            Newsletter not found
          </h1>
          <p className="text-slate-500 mb-6">
            This newsletter may have been removed or doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 relative safe-area-top safe-area-bottom font-sans">
      
      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Meta */}
        <div className="mb-10 text-center">
           {newsletter.streamName && (
            <div className="text-sm text-slate-500 font-medium tracking-wide uppercase mb-3">
              {newsletter.streamName}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
            {newsletter.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <span className="font-medium text-slate-700">By {newsletter.author}</span>
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
          className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsletter.content) }}
        />
        
         {/* Footer / Branding */}
        <div className="mt-20 pt-10 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-sm">
                Published with <span className="font-bold text-slate-600">Milkly</span>
            </p>
        </div>
      </article>
    </div>
  );
}
