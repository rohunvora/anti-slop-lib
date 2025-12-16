import type { Metadata } from "next";
import { SlopProvider } from "./components/SlopContext";
import { ToastProvider } from "./components/Toast";
import Link from "next/link";
import { LabsNav } from "./components/LabsNav";
import { DarkModeToggle } from "./components/DarkModeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anti-Slop | Remove the tells that make your site look mass-produced",
  description: "Detect template signals in your UI. Get minimal patches. Verify the fix. Built for vibecoders who ship fast and still want design credibility.",
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
          <ToastProvider>
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
                  
                  {/* Navigation - Updated to match new IA */}
                  <nav className="flex items-center" role="navigation" aria-label="Main">
                    <Link 
                      href="/signals" 
                      className="px-3 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink hover:bg-paper-bright transition-colors"
                    >
                      Signals
                    </Link>
                    <Link 
                      href="/#install" 
                      className="px-3 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink hover:bg-paper-bright transition-colors"
                    >
                      Install
                    </Link>
                    <LabsNav />
                    <Link 
                      href="/gallery" 
                      className="px-3 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink hover:bg-paper-bright transition-colors"
                    >
                      Gallery
                    </Link>
                    <DarkModeToggle />
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
            
            {/* Footer - Updated with new structure */}
            <footer className="border-t-3 border-ink">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                  {/* Product */}
                  <div>
                    <p className="font-mono text-xs text-ink-40 mb-3">PRODUCT</p>
                    <ul className="space-y-2 text-sm">
                      <li><Link href="/" className="text-ink-60 hover:text-ink">Home</Link></li>
                      <li><Link href="/signals" className="text-ink-60 hover:text-ink">Signals Index</Link></li>
                      <li><Link href="/#install" className="text-ink-60 hover:text-ink">Install</Link></li>
                      <li><Link href="/#verify" className="text-ink-60 hover:text-ink">Verify Fix</Link></li>
                    </ul>
                  </div>
                  
                  {/* Resources */}
                  <div>
                    <p className="font-mono text-xs text-ink-40 mb-3">RESOURCES</p>
                    <ul className="space-y-2 text-sm">
                      <li><Link href="/gallery" className="text-ink-60 hover:text-ink">Gallery</Link></li>
                      <li><Link href="/patterns" className="text-ink-60 hover:text-ink">Pattern Lab</Link></li>
                      <li><Link href="/prompts" className="text-ink-60 hover:text-ink">Prompt Builder</Link></li>
                    </ul>
                  </div>
                  
                  {/* Escape Hatches */}
                  <div>
                    <p className="font-mono text-xs text-ink-40 mb-3">ESCAPE HATCHES</p>
                    <ul className="space-y-2 text-sm text-ink-60">
                      <li>Editorial grammar</li>
                      <li>Technical grammar</li>
                      <li>Playful grammar</li>
                    </ul>
                    <p className="text-xs text-ink-40 mt-2">Use when stuck, not as defaults</p>
                  </div>
                  
                  {/* Links */}
                  <div>
                    <p className="font-mono text-xs text-ink-40 mb-3">LINKS</p>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href="https://github.com/rohunvora/anti-slop-lib" target="_blank" rel="noopener noreferrer" className="text-ink-60 hover:text-ink">
                          GitHub →
                        </a>
                      </li>
                      <li>
                        <a href="https://npmjs.com/package/anti-slop" target="_blank" rel="noopener noreferrer" className="text-ink-60 hover:text-ink">
                          npm →
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-6 border-t-3 border-ink flex flex-col sm:flex-row justify-between gap-4 text-sm text-ink-60">
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
                  <p className="font-mono text-xs">
                    We don't generate design — we remove the tells.
                  </p>
                </div>
              </div>
            </footer>
          </div>
          </ToastProvider>
        </SlopProvider>
      </body>
    </html>
  );
}
