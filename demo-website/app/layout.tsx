import type { Metadata } from "next";
import { SlopProvider } from "./components/SlopContext";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anti-Slop | A manifesto against homogenized web design",
  description: "Stop building websites that look like every other AI-generated template. Learn to make distinctive, intentional design choices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">
        <SlopProvider>
          {/* Skip link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          
          <div className="min-h-screen flex flex-col">
            {/* Header - Sharp, minimal, intentional */}
            <header className="sticky top-0 z-50 bg-paper border-b-2 border-ink">
              <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
                <div className="h-16 flex items-center justify-between">
                  {/* Logo + Nav */}
                  <div className="flex items-center gap-12">
                    <Link 
                      href="/" 
                      className="flex items-center gap-3 group"
                      aria-label="Anti-Slop home"
                    >
                      {/* Custom logo mark - not an emoji */}
                      <div className="w-8 h-8 bg-ink flex items-center justify-center group-hover:bg-vermilion transition-colors duration-150">
                        <span className="text-paper font-mono text-xs font-bold">AS</span>
                      </div>
                      <span className="font-display text-xl tracking-tight hidden sm:block">
                        Anti-Slop
                      </span>
                    </Link>
                    
                    <nav className="hidden md:flex items-center" role="navigation" aria-label="Main navigation">
                      <Link 
                        href="/" 
                        className="px-4 py-2 text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink border-b-2 border-transparent hover:border-ink transition-all"
                      >
                        Gallery
                      </Link>
                      <Link 
                        href="/patterns" 
                        className="px-4 py-2 text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink border-b-2 border-transparent hover:border-ink transition-all"
                      >
                        Patterns
                      </Link>
                      <Link 
                        href="/prompts" 
                        className="px-4 py-2 text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink border-b-2 border-transparent hover:border-ink transition-all"
                      >
                        Prompt Lab
                      </Link>
                    </nav>
                  </div>
                  
                  {/* Right side */}
                  <div className="flex items-center gap-6">
                    <a 
                      href="https://github.com/rohunvora/anti-slop-lib" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-ink-60 hover:text-ink transition-colors"
                      aria-label="View source on GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      <span className="hidden sm:inline">Source</span>
                    </a>
                    
                    {/* Mobile menu button */}
                    <button 
                      className="md:hidden p-2 hover:bg-ink hover:text-paper transition-colors"
                      aria-label="Open menu"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Main content */}
            <main id="main-content" className="flex-1">
              {children}
            </main>
            
            {/* Footer - With mission statement */}
            <footer className="border-t-2 border-ink bg-ink text-paper">
              <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16">
                <div className="grid lg:grid-cols-[2fr,1fr,1fr] gap-12 lg:gap-16">
                  {/* Mission */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-vermilion flex items-center justify-center">
                        <span className="text-paper font-mono text-xs font-bold">AS</span>
                      </div>
                      <span className="font-display text-xl">Anti-Slop</span>
                    </div>
                    <p className="text-paper/70 max-w-md leading-relaxed mb-6">
                      A resource for designers and developers who refuse to build 
                      websites that look like every other AI-generated template. 
                      We believe distinctive design requires intentional choices, 
                      not default settings.
                    </p>
                    <p className="text-sm text-paper/50">
                      Site data curated from{" "}
                      <a 
                        href="https://godly.website" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="underline hover:text-paper transition-colors"
                      >
                        godly.website
                      </a>
                      {" "}with original analysis and tooling.
                    </p>
                  </div>
                  
                  {/* Navigation */}
                  <div>
                    <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-paper/50">
                      Explore
                    </h3>
                    <nav className="flex flex-col gap-3">
                      <Link href="/" className="text-paper/70 hover:text-paper transition-colors">
                        Design Gallery
                      </Link>
                      <Link href="/patterns" className="text-paper/70 hover:text-paper transition-colors">
                        Pattern Library
                      </Link>
                      <Link href="/prompts" className="text-paper/70 hover:text-paper transition-colors">
                        Prompt Lab
                      </Link>
                    </nav>
                  </div>
                  
                  {/* Resources */}
                  <div>
                    <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-paper/50">
                      Resources
                    </h3>
                    <nav className="flex flex-col gap-3">
                      <a 
                        href="https://github.com/rohunvora/anti-slop-lib" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-paper/70 hover:text-paper transition-colors"
                      >
                        GitHub Repository
                      </a>
                      <a 
                        href="https://www.npmjs.com/package/anti-slop" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-paper/70 hover:text-paper transition-colors"
                      >
                        NPM Package
                      </a>
                    </nav>
                  </div>
                </div>
                
                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-paper/20 flex flex-col sm:flex-row justify-between gap-4">
                  <p className="text-sm text-paper/40">
                    Built with intention, not defaults.
                  </p>
                  <p className="text-sm text-paper/40">
                    Keyboard accessible. Color contrast compliant.
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
