import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Home from "./pages/Home";
import Newsletter from "./pages/Newsletter";
import Stream from "./pages/Stream";
import Unsubscribe from "./pages/Unsubscribe";
import Subscribe from "./pages/Subscribe";
import Articles from "./pages/Articles";
import About from "./pages/About";
import UserNewsletter from "./pages/UserNewsletter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

import { AudioProvider } from "./context/AudioContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/about" element={<About />} />
          
          {/* Main Newsletter Routes */}
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/unsubscribe/:token" element={<Unsubscribe />} />
          
          {/* User Specific Routes */}
          <Route path="/u/:username/subscribe" element={<Subscribe />} />
          <Route path="/u/:username/unsubscribe" element={<Unsubscribe />} />

          <Route path="/newsletter/:id" element={<Newsletter />} />
          <Route path="/stream/:id" element={<Stream />} />
          
          {/* Temporary Route for Dev - User Newsletter Display */}
          <Route path="/users/:userId/:newsletterId" element={<UserNewsletter />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AudioProvider>
  </QueryClientProvider>
);
}

export default App;
