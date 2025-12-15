import type { Metadata } from "next";
import { SlopProvider } from "./components/SlopContext";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anti-Slop | Design Inspiration Without the AI Slop",
  description: "Browse award-winning web designs and get prompts to avoid generic AI aesthetics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">
        <SlopProvider>
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
              <div className="max-w-[1800px] mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo + Nav */}
                <div className="flex items-center gap-8">
                  <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
                    <span className="text-2xl">🚫</span>
                    <span>Anti-Slop</span>
                  </Link>
                  <nav className="hidden md:flex items-center gap-1">
                    <Link href="/" className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
                      Sites
                    </Link>
                    <Link href="/patterns" className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
                      Patterns
                    </Link>
                    <Link href="/prompts" className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
                      Prompts
                    </Link>
                  </nav>
                </div>
                
                {/* Right side */}
                <div className="flex items-center gap-4">
                  <a 
                    href="https://github.com/rohunvora/anti-slop-lib" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </header>
            
            {/* Main content */}
            <main className="flex-1">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="border-t border-neutral-200 bg-neutral-50">
              <div className="max-w-[1800px] mx-auto px-6 py-8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <span className="text-lg">🚫</span>
                  <span>Anti-Slop</span>
                </div>
                <p className="text-sm text-neutral-400">
                  Curated from <a href="https://godly.website" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-600">godly.website</a>
                </p>
              </div>
            </footer>
          </div>
        </SlopProvider>
      </body>
    </html>
  );
}
