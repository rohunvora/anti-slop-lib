'use client';

import { useState, useEffect } from 'react';

// Loading spinner example
function LoadingExample() {
  const [isLoading, setIsLoading] = useState(false);
  
  const simulate = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };
  
  return (
    <div className="border-3 border-ink p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Loading Indicator</h3>
        <button onClick={simulate} disabled={isLoading} className="btn btn-small">
          {isLoading ? 'Loading...' : 'Simulate'}
        </button>
      </div>
      
      <div className="h-20 border-2 border-ink flex items-center justify-center bg-paper-bright">
        {isLoading ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-3 border-ink border-t-transparent animate-spin" />
            <span className="text-sm text-ink-60">Loading content...</span>
          </div>
        ) : (
          <span className="text-sm text-ink-40">Content loaded</span>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-paper border-l-3 border-teal">
        <p className="text-xs text-ink-60">
          <strong className="text-ink">Why it works:</strong> The spinner + text confirms the action 
          was received. Users know to wait rather than clicking again.
        </p>
      </div>
      
      <details className="mt-4">
        <summary className="text-sm font-semibold cursor-pointer">View code</summary>
        <div className="code-block p-3 mt-2 text-xs">
          <pre>{`<div className="w-5 h-5 border-3 border-ink 
  border-t-transparent animate-spin" />

/* CSS */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}`}</pre>
        </div>
      </details>
    </div>
  );
}

// Form validation example
function ValidationExample() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && !isValid && email.length > 0;
  const showSuccess = touched && isValid;
  
  return (
    <div className="border-3 border-ink p-6">
      <h3 className="font-semibold mb-4">Inline Validation</h3>
      
      <div className="space-y-2">
        <label className="block text-sm font-semibold">Email address</label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="you@example.com"
            className={`w-full pr-10 transition-colors ${
              showError ? 'border-vermilion' : showSuccess ? 'border-teal' : ''
            }`}
          />
          {showError && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-vermilion">✗</span>
          )}
          {showSuccess && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-teal">✓</span>
          )}
        </div>
        {showError && (
          <p className="text-sm text-vermilion animate-fade-in">
            Please enter a valid email address
          </p>
        )}
        {showSuccess && (
          <p className="text-sm text-teal animate-fade-in">
            Looks good!
          </p>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-paper border-l-3 border-teal">
        <p className="text-xs text-ink-60">
          <strong className="text-ink">Why it works:</strong> Validates on blur (not every keystroke) 
          to avoid annoyance. Shows error state + message + icon—redundant signals aid comprehension.
        </p>
      </div>
      
      <details className="mt-4">
        <summary className="text-sm font-semibold cursor-pointer">View code</summary>
        <div className="code-block p-3 mt-2 text-xs">
          <pre>{`const [touched, setTouched] = useState(false);
const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
const showError = touched && !isValid && email.length > 0;

<input
  onBlur={() => setTouched(true)}
  className={\`\${showError ? 'border-vermilion' : ''}\`}
/>
{showError && (
  <p className="text-vermilion animate-fade-in">
    Please enter a valid email
  </p>
)}`}</pre>
        </div>
      </details>
    </div>
  );
}

// Button states example
function ButtonStatesExample() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const handleClick = () => {
    setState('loading');
    setTimeout(() => {
      setState(Math.random() > 0.3 ? 'success' : 'error');
      setTimeout(() => setState('idle'), 2000);
    }, 1500);
  };
  
  return (
    <div className="border-3 border-ink p-6">
      <h3 className="font-semibold mb-4">Button State Transitions</h3>
      
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handleClick}
          disabled={state === 'loading'}
          className={`btn transition-all duration-200 min-w-[140px] ${
            state === 'loading' ? 'opacity-70' :
            state === 'success' ? 'bg-teal border-teal' :
            state === 'error' ? 'bg-vermilion border-vermilion' : ''
          }`}
        >
          {state === 'idle' && 'Submit'}
          {state === 'loading' && (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-paper border-t-transparent animate-spin" />
              Saving...
            </span>
          )}
          {state === 'success' && '✓ Saved'}
          {state === 'error' && '✗ Failed'}
        </button>
        
        <span className="text-sm text-ink-60">
          Current: <code className="font-mono">{state}</code>
        </span>
      </div>
      
      <div className="p-3 bg-paper border-l-3 border-teal">
        <p className="text-xs text-ink-60">
          <strong className="text-ink">Why it works:</strong> Each state has distinct visual feedback. 
          Loading disables re-clicks. Success/error auto-reset after 2s.
        </p>
      </div>
      
      <details className="mt-4">
        <summary className="text-sm font-semibold cursor-pointer">View code</summary>
        <div className="code-block p-3 mt-2 text-xs">
          <pre>{`type State = 'idle' | 'loading' | 'success' | 'error';
const [state, setState] = useState<State>('idle');

const handleClick = async () => {
  setState('loading');
  try {
    await submitForm();
    setState('success');
  } catch {
    setState('error');
  }
  setTimeout(() => setState('idle'), 2000);
};`}</pre>
        </div>
      </details>
    </div>
  );
}

// Hover transition example
function HoverTransitionExample() {
  const [mode, setMode] = useState<'instant' | 'smooth'>('smooth');
  
  return (
    <div className="border-3 border-ink p-6">
      <h3 className="font-semibold mb-4">Hover Transitions</h3>
      
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setMode('instant')}
          className={`btn btn-small ${mode === 'instant' ? '' : 'btn-outline'}`}
        >
          Instant
        </button>
        <button 
          onClick={() => setMode('smooth')}
          className={`btn btn-small ${mode === 'smooth' ? '' : 'btn-outline'}`}
        >
          Smooth (150ms)
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className={`border-3 border-ink p-4 cursor-pointer ${
              mode === 'smooth' ? 'transition-all duration-150' : ''
            } hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0_#0d0c0b]`}
          >
            <p className="font-semibold">Card {i}</p>
            <p className="text-sm text-ink-60">Hover me</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-paper border-l-3 border-teal">
        <p className="text-xs text-ink-60">
          <strong className="text-ink">Why it works:</strong> 150ms is fast enough to feel responsive 
          but slow enough to be perceptible. Instant changes feel broken; too slow feels sluggish.
        </p>
      </div>
    </div>
  );
}

// Progress indicator example
function ProgressExample() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setIsRunning(false);
          return 0;
        }
        return p + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isRunning]);
  
  return (
    <div className="border-3 border-ink p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Progress Indicator</h3>
        <button 
          onClick={() => { setProgress(0); setIsRunning(true); }} 
          disabled={isRunning}
          className="btn btn-small"
        >
          {isRunning ? 'Running...' : 'Start'}
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Determinate progress */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Uploading file...</span>
            <span className="font-mono">{progress}%</span>
          </div>
          <div className="h-3 border-2 border-ink bg-paper-bright">
            <div 
              className="h-full bg-teal transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Indeterminate progress */}
        <div>
          <p className="text-sm mb-1">Processing (unknown duration)...</p>
          <div className="h-3 border-2 border-ink bg-paper-bright overflow-hidden">
            <div className="h-full w-1/3 bg-ink animate-[shimmer_1s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-paper border-l-3 border-teal">
        <p className="text-xs text-ink-60">
          <strong className="text-ink">Why it works:</strong> Determinate progress (%) for known durations. 
          Indeterminate shimmer when duration is unknown. Both confirm "working, please wait."
        </p>
      </div>
    </div>
  );
}

export default function MicrointeractionsPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl lg:text-4xl mb-4">
            Microinteraction Lab
          </h1>
          <p className="text-ink-60 max-w-2xl">
            Microinteractions are small trigger-feedback loops that make interfaces feel alive.
            They communicate status, prevent errors, and guide users. Here are patterns with 
            code you can copy.
          </p>
        </div>
      </section>
      
      {/* Theory section */}
      <section className="border-b-3 border-ink bg-paper-bright">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div>
              <p className="font-mono text-xs text-ink-40 mb-2">TRIGGER</p>
              <p className="text-sm">User action (click, hover, scroll) or system event (load complete, error)</p>
            </div>
            <div>
              <p className="font-mono text-xs text-ink-40 mb-2">RULE</p>
              <p className="text-sm">What happens when triggered (show spinner, validate input, animate element)</p>
            </div>
            <div>
              <p className="font-mono text-xs text-ink-40 mb-2">FEEDBACK</p>
              <p className="text-sm">Visual/audio response confirming the action was received and processed</p>
            </div>
            <div>
              <p className="font-mono text-xs text-ink-40 mb-2">LOOP/MODE</p>
              <p className="text-sm">Duration and end state (auto-dismiss, persist until action, cycle)</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Examples */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-6">
          <LoadingExample />
          <ValidationExample />
          <ButtonStatesExample />
          <HoverTransitionExample />
          <ProgressExample />
          
          {/* Usability reminder */}
          <div className="border-3 border-vermilion p-6 bg-vermilion/5">
            <p className="font-mono text-xs text-vermilion mb-3">USABILITY REMINDER</p>
            <h3 className="font-semibold mb-3">Microinteractions ≠ Animations</h3>
            <p className="text-sm text-ink-60 mb-4">
              Don't add motion for decoration. Each microinteraction should answer one of these:
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-vermilion">→</span>
                <span><strong>Status:</strong> Did it work? Is it loading?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-vermilion">→</span>
                <span><strong>Prevention:</strong> Is this input valid? Can I submit?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-vermilion">→</span>
                <span><strong>Guidance:</strong> What's clickable? What changed?</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Animation timing guide */}
      <section className="border-t-3 border-ink dark-section">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
          <h2 className="font-display text-xl mb-6">Timing Guidelines</h2>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="border-3 border-paper/30 p-4">
              <p className="font-mono text-2xl text-paper mb-2">100ms</p>
              <p className="text-sm text-paper/70">Instant feedback (button press, toggle)</p>
            </div>
            <div className="border-3 border-paper/30 p-4">
              <p className="font-mono text-2xl text-paper mb-2">150-200ms</p>
              <p className="text-sm text-paper/70">Hover/focus transitions, micro-animations</p>
            </div>
            <div className="border-3 border-paper/30 p-4">
              <p className="font-mono text-2xl text-paper mb-2">300-500ms</p>
              <p className="text-sm text-paper/70">Content reveals, panel slides</p>
            </div>
            <div className="border-3 border-paper/30 p-4">
              <p className="font-mono text-2xl text-paper mb-2">1000ms+</p>
              <p className="text-sm text-paper/70">Page transitions, complex sequences</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

