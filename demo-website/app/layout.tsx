import type { Metadata } from "next";
import { SlopProvider } from "./components/SlopContext";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anti-Slop | Tools for intentional web design",
  description: "Identify AI-generated design patterns, learn why they fail, and build distinctive websites with purpose.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink">
        <SlopProvider>
          {/* Skip link for keyboard users */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          
          <div className="min-h-screen flex flex-col">
            {/* Header - sharp edges, thick border */}
            <header className="sticky top-0 z-50 bg-paper border-b-3 border-ink">
              <div className="max-w-[1400px] mx-auto">
                <div className="h-14 flex items-center justify-between px-6 lg:px-8">
                  {/* Logo */}
                  <Link 
                    href="/" 
                    className="flex items-center gap-3 font-display text-xl hover:text-vermilion transition-colors"
                  >
                    <span className="w-8 h-8 bg-ink text-paper flex items-center justify-center font-mono text-xs font-bold">
                      AS
                    </span>
                    <span className="hidden sm:block">Anti-Slop</span>
                  </Link>
                  
                  {/* Navigation */}
                  <nav className="flex items-center" role="navigation" aria-label="Main">
                    <Link 
                      href="/patterns" 
                      className="px-3 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink hover:bg-paper-bright transition-colors"
                    >
                      Patterns
                    </Link>
                    <Link 
                      href="/prompts" 
                      className="px-3 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink hover:bg-paper-bright transition-colors"
                    >
                      Prompts
                    </Link>
                    <Link 
                      href="/microinteractions" 
                      className="px-3 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink hover:bg-paper-bright transition-colors hidden md:block"
                    >
                      Micro
                    </Link>
                    <Link 
                      href="/gallery" 
                      className="px-3 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink hover:bg-paper-bright transition-colors"
                    >
                      Gallery
                    </Link>
                    <a 
                      href="https://github.com/rohunvora/anti-slop-lib" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 lg:ml-4 px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wider border-3 border-ink hover:bg-ink hover:text-paper transition-colors"
                      aria-label="View source on GitHub"
                    >
                      GitHub
                    </a>
                  </nav>
                </div>
              </div>
            </header>
            
            {/* Main content */}
            <main id="main-content" className="flex-1">
              {children}
            </main>
            
            {/* Footer - minimal */}
            <footer className="border-t-3 border-ink">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-ink-60">
                  <p>
                    Anti-Slop is open source. Gallery data from{" "}
                    <a 
                      href="https://godly.website" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline hover:text-ink"
                    >
                      godly.website
                    </a>.
                  </p>
                  <p>
                    No rounded corners. No shadows. No gradients.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </SlopProvider>
      </body>
    </html>
  );
}
