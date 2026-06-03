import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import { 
  Code2, 
  Layers, 
  Sparkles, 
  Terminal, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  BookOpen, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ComponentDoc {
  name: string;
  description: string;
  location: string;
  props: { name: string; type: string; required: boolean; desc: string }[];
  codeUsage: string;
  interactive?: React.ReactNode;
}

export const ComponentsShowcase: React.FC = () => {
  const { products, showToast, openQuickView } = useApp();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Use the first watch product for demonstration
  const demoProduct = products.find(p => p.category === 'watches') || products[0];

  const toggleSection = (name: string) => {
    setExpandedSections(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const triggerToast = (type: 'success' | 'info' | 'error') => {
    if (type === 'success') {
      showToast('Product successfully added to cart!', 'success');
    } else if (type === 'info') {
      showToast('Item saved to wishlist collection.', 'info');
    } else {
      showToast('Payment processing failed. Please check credentials.', 'error');
    }
  };

  const componentsList: ComponentDoc[] = [
    {
      name: 'ProductCard',
      description: 'An interactive product listing card component with rating indicators, dual-image hover transition, wishlist toggling, and Quick View integration.',
      location: 'src/components/ProductCard.tsx',
      props: [
        { name: 'product', type: 'Product', required: true, desc: 'The product data structure containing catalog specifications.' }
      ],
      codeUsage: `import { ProductCard } from '../components/ProductCard';\n\n// Usage in Grid layout:\n<div className="grid grid-cols-2 md:grid-cols-4 gap-6">\n  {products.map(product => (\n    <ProductCard key={product.id} product={product} />\n  ))}\n</div>`,
      interactive: (
        <div className="w-full max-w-[280px] mx-auto border border-border rounded-3xl p-3 glass-level-1 card-hover">
          <h4 className="text-xs text-on-surface-variant font-semibold tracking-wider uppercase mb-2 text-center">Interactive Live Preview</h4>
          {demoProduct && <ProductCard product={demoProduct} />}
        </div>
      )
    },
    {
      name: 'QuickViewModal',
      description: 'An immersive glassmorphic product preview HUD that overlays detail specs, rating metrics, image sliders, color/size swatches, and cart options instantly.',
      location: 'src/components/QuickViewModal.tsx',
      props: [
        { name: 'None (Global State Trigger)', type: 'State Managed', required: true, desc: 'Launched globally via useApp context controllers.' }
      ],
      codeUsage: `import { useApp } from '../context/AppContext';\n\nconst MyComponent = () => {\n  const { openQuickView } = useApp();\n  \n  return (\n    <button onClick={() => openQuickView(product)}>\n      Quick View HUD\n    </button>\n  );\n};`,
      interactive: (
        <div className="flex flex-col items-center justify-center p-6 bg-surface-container rounded-2xl border border-border space-y-4">
          <p className="text-xs text-on-surface-variant text-center max-w-xs">
            Triggers the global premium frosted modal. Select size, choose colorway swatches, and add to bag directly.
          </p>
          <button
            onClick={() => demoProduct && openQuickView(demoProduct)}
            className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-full font-display font-semibold hover:scale-[1.03] active:scale-95 transition-all duration-300 text-sm cursor-pointer"
          >
            <Play className="w-4 h-4" /> Trigger Quick View Modal
          </button>
        </div>
      )
    },
    {
      name: 'Toast Alert HUD',
      description: 'Floating notification alerts confirming cart actions, error logs, and user notifications. Implements auto-fade dismissals after 3 seconds.',
      location: 'src/components/Toast.tsx',
      props: [
        { name: 'None (Global State)', type: 'State Managed', required: true, desc: 'Managed globally by the AppContext Toast feed.' }
      ],
      codeUsage: `import { useApp } from '../context/AppContext';\n\nconst MyComponent = () => {\n  const { showToast } = useApp();\n  \n  return (\n    <button onClick={() => showToast('Saved!', 'success')}>\n      Trigger Success Notification\n    </button>\n  );\n};`,
      interactive: (
        <div className="flex flex-col items-center justify-center p-6 bg-surface-container rounded-2xl border border-border w-full space-y-4">
          <p className="text-xs text-on-surface-variant text-center mb-2">
            Click to trigger the active toast notification HUD in the upper corner of your window:
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            <button
              onClick={() => triggerToast('success')}
              className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full font-semibold text-xs hover:bg-emerald-500/20 transition-all cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" /> Success Toast
            </button>
            <button
              onClick={() => triggerToast('info')}
              className="flex items-center gap-1.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 px-4 py-2 rounded-full font-semibold text-xs hover:bg-sky-500/20 transition-all cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" /> Info Toast
            </button>
            <button
              onClick={() => triggerToast('error')}
              className="flex items-center gap-1.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 px-4 py-2 rounded-full font-semibold text-xs hover:bg-rose-500/20 transition-all cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Error Toast
            </button>
          </div>
        </div>
      )
    },
    {
      name: 'DemoSwitcher',
      description: 'An off-canvas utility drawer permitting users to switch homepage variants, toggle LTR/RTL layouts, and switch light/dark modes.',
      location: 'src/components/DemoSwitcher.tsx',
      props: [
        { name: 'None', type: 'Static Overlay', required: true, desc: 'Mounted globally in src/App.tsx.' }
      ],
      codeUsage: `// Mounted globally at root element level:\n<Router>\n  <NavBar />\n  <Routes>...</Routes>\n  <DemoSwitcher />\n</Router>`,
      interactive: (
        <div className="p-5 bg-surface-container rounded-2xl border border-border text-center">
          <p className="text-xs text-on-surface-variant max-w-xs mx-auto leading-relaxed">
            This component runs persistently in the lower-right corner of the layout, exposing theme switching dials and storefront previews to testing users.
          </p>
        </div>
      )
    },
    {
      name: 'SEO Head Tag Wrapper',
      description: 'Updates document headers and metadata properties dynamically on route mountings to optimize SEO page-ranking index metrics.',
      location: 'src/components/SEO.tsx',
      props: [
        { name: 'title', type: 'string', required: true, desc: 'Document tab header name suffix.' },
        { name: 'description', type: 'string', required: false, desc: 'HTML meta element description excerpt.' },
        { name: 'keywords', type: 'string', required: false, desc: 'HTML keywords search queries tags.' }
      ],
      codeUsage: `import { SEO } from '../components/SEO';\n\nconst PageView = () => {\n  return (\n    <>\n      <SEO \n        title="Luxury Handbags" \n        description="Curated high-end Italian leather designs." \n      />\n      <div>Page content...</div>\n    </>\n  );\n};`,
      interactive: (
        <div className="p-5 bg-surface-container rounded-2xl border border-border space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono bg-surface-container-high p-2.5 rounded-lg border border-border text-on-surface-variant">
            <span className="text-primary font-bold">&lt;title&gt;</span> Components Showcase | Aetheria Luxe <span className="text-primary font-bold">&lt;/title&gt;</span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-relaxed">
            This component coordinates dynamic meta-tag injections automatically without template overhead.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface pb-24 pt-28">
      <SEO 
        title="Component Showcase" 
        description="Explore the interactive React design system elements and luxury UI component catalog of Aetheria Luxe."
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        {/* Header Section */}
        <div className="relative border-b border-border pb-10 space-y-4">
          <div className="absolute inset-0 -top-20 z-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent blur-3xl rounded-full opacity-60 w-1/2 h-full pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center gap-2 text-primary font-display font-semibold text-xs tracking-[0.2em] uppercase">
            <Layers className="w-4 h-4" /> Design System Catalog
          </div>
          <h1 className="relative z-10 text-4xl sm:text-5xl font-display font-extrabold tracking-tight">
            Interactive <span className="text-gradient-primary">Components</span>
          </h1>
          <p className="relative z-10 text-on-surface-variant max-w-3xl leading-relaxed text-base sm:text-lg">
            Aetheria Luxe leverages unified React components coupled with a responsive Tailwind CSS v4 design token hierarchy. Review code implementations, check layout specs, and interact with live instances below.
          </p>
        </div>

        {/* CSS Glassmorphism Quick Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-level-1 p-6 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg">Glass Level 1</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Standard light frosted overlay used for product cards, menus, and testimonial containers. Uses micro shadow overlays.
            </p>
            <div className="mt-4 text-xs font-mono bg-on-surface/5 p-2 rounded-lg text-on-surface-variant inline-block">
              .glass-level-1
            </div>
          </div>

          <div className="glass-level-2 p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg">Glass Level 2</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Deeper backdrop blur filter preset used for overlay panels, active drawers, and sticky dropdown selections.
            </p>
            <div className="mt-4 text-xs font-mono bg-on-surface/5 p-2 rounded-lg text-on-surface-variant inline-block">
              .glass-level-2
            </div>
          </div>

          <div className="premium-glass p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg">Premium Glass</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Frosted glass with thin inline highlights, engineered for hero showcase elements, quick-view cards, and details menus.
            </p>
            <div className="mt-4 text-xs font-mono bg-on-surface/5 p-2 rounded-lg text-on-surface-variant inline-block">
              .premium-glass
            </div>
          </div>
        </div>

        {/* Components Interactive Accordions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold border-l-4 border-primary pl-4">Components Library</h2>
          
          <div className="space-y-6">
            {componentsList.map((comp) => {
              const isExpanded = expandedSections[comp.name];
              return (
                <div 
                  key={comp.name} 
                  className="bg-surface border border-border rounded-3xl overflow-hidden transition-all shadow-sm"
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => toggleSection(comp.name)}
                    className="w-full flex items-center justify-between p-6 hover:bg-surface-dim transition-colors text-left"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3.5">
                        <h3 className="font-display font-bold text-xl text-on-surface">{comp.name}</h3>
                        <span className="text-[10px] font-mono font-semibold bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded">
                          {comp.location.split('/').pop()}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant max-w-2xl">{comp.description}</p>
                    </div>
                    <div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-on-surface-variant" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-on-surface-variant" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isExpanded && (
                    <div className="border-t border-border p-6 bg-surface-dim/40 grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left: Props & API details */}
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h4 className="font-display font-semibold text-sm flex items-center gap-2 text-on-surface">
                            <BookOpen className="w-4 h-4 text-primary" /> Properties (Props API)
                          </h4>
                          <div className="overflow-x-auto rounded-xl border border-border bg-surface">
                            <table className="min-w-full divide-y divide-border text-xs">
                              <thead className="bg-surface-container">
                                <tr>
                                  <th className="px-4 py-2.5 font-semibold text-left">Property</th>
                                  <th className="px-4 py-2.5 font-semibold text-left">Type</th>
                                  <th className="px-4 py-2.5 font-semibold text-center">Required</th>
                                  <th className="px-4 py-2.5 font-semibold text-left">Description</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                {comp.props.map((prop) => (
                                  <tr key={prop.name}>
                                    <td className="px-4 py-3 font-mono font-bold text-primary">{prop.name}</td>
                                    <td className="px-4 py-3 font-mono text-on-surface-variant">{prop.type}</td>
                                    <td className="px-4 py-3 text-center text-on-surface-variant">
                                      {prop.required ? (
                                        <span className="text-rose-500 font-bold">Yes</span>
                                      ) : (
                                        <span>No</span>
                                      )}
                                    </td>
                                    <td className="px-4 py-3 text-on-surface-variant leading-relaxed">{prop.desc}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Code Usage block */}
                        <div className="space-y-3">
                          <h4 className="font-display font-semibold text-sm flex items-center gap-2 text-on-surface">
                            <Code2 className="w-4 h-4 text-primary" /> Implementation Usage
                          </h4>
                          <div className="relative group">
                            <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl overflow-x-auto text-[11px] font-mono leading-relaxed border border-slate-800">
                              <code>{comp.codeUsage}</code>
                            </pre>
                            <div className="absolute top-2.5 right-2.5 bg-slate-800 text-[9px] text-slate-400 font-bold px-2 py-0.5 rounded border border-slate-700 uppercase tracking-widest">
                              TypeScript
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Live Interactive Sandbox */}
                      <div className="flex flex-col justify-center space-y-4">
                        <h4 className="font-display font-semibold text-sm flex items-center gap-2 text-on-surface mb-1">
                          <Terminal className="w-4 h-4 text-primary" /> Live Interaction Sandbox
                        </h4>
                        {comp.interactive ? (
                          comp.interactive
                        ) : (
                          <div className="p-8 bg-surface-container rounded-2xl border border-border text-center text-xs text-on-surface-variant">
                            Interactive simulation is run globally across the general template hierarchy.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Concierge Pointer Banner */}
        <div className="premium-glass rounded-3xl p-8 md:p-12 text-center border border-white/10 shadow-2xl relative overflow-hidden flex flex-col items-center space-y-4">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 blur-3xl opacity-40 z-0"></div>
          <h2 className="relative z-10 text-2xl font-display font-bold">Need Custom Component Layouts?</h2>
          <p className="relative z-10 text-on-surface-variant max-w-xl text-sm leading-relaxed">
            Our luxury e-commerce code supports complete component adaptability. For support and integration queries, consult our offline documentation or email our desk.
          </p>
          <a
            href="/documentation.html"
            target="_blank"
            className="relative z-10 flex items-center gap-1.5 bg-transparent border border-border hover:bg-on-surface/5 text-on-surface font-display font-bold py-2.5 px-6 rounded-full transition-all text-xs cursor-pointer"
          >
            Open Offline Docs <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComponentsShowcase;
