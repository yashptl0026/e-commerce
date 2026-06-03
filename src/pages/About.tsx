import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Eye, MapPin } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <main className="flex-grow">
      {/* Hero Banner Header */}
      <header className="relative pt-24 pb-10 md:pt-[120px] md:pb-20 px-4 md:px-6 max-w-7xl mx-auto text-center space-y-6">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-transparent blur-3xl rounded-full opacity-50 w-3/4 h-3/4 left-[12.5%] top-[12.5%] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-4 max-w-3xl mx-auto"
        >
          <span className="text-xs tracking-[0.2em] font-semibold text-primary">The Aetheria Story</span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-on-surface">
            Define. Design. Deliver.
          </h1>
          <p className="text-body-lg text-on-surface-variant leading-relaxed text-sm sm:text-base">
            Aetheria Luxe was born out of a desire to create a silent, sophisticated gallery for premium digital artifacts and luxury physical wear. The aesthetic merges clean SaaS utility with the evocative warmth of high fashion.
          </p>
        </motion.div>
      </header>

      {/* Visual Showcase (Using generated high quality campaign image!) */}
      <section className="px-4 md:px-6 max-w-7xl mx-auto my-6 md:my-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="aspect-[21/9] rounded-3xl overflow-hidden glass-level-1 border border-border shadow-2xl relative"
        >
          <img
            src="/about_campaign.png"
            alt="Aetheria Luxe Campaign"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40"></div>
          <div className="absolute bottom-8 left-8 max-w-md space-y-2 hidden md:block text-left">
            <h3 className="text-lg font-display font-bold text-on-surface tracking-wider">A Cinematic Universe</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Every detail in our collections represents hours of tailored design, high-contrast imagery, and premium technical fabric selection.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Mission / Value Cards Grid */}
      <section className="w-full bg-surface-container-lowest border-y border-border py-12 md:py-24 my-8 md:my-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10 md:space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-level-1 p-8 rounded-3xl space-y-4 border border-border shadow-xl flex flex-col justify-center card-hover"
            >
              <div className="w-12 h-12 rounded-full glass-level-2 flex items-center justify-center text-primary border border-primary/20">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold tracking-wide text-on-surface">Our Vision</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                We envision a future where high-end commerce feels fluid, responsive, and alive. By leveraging Apple-inspired hardware-software aesthetics, we construct translucent, glowing user interfaces that focus completely on showcasing premium product craftsmanship.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-level-1 p-8 rounded-3xl space-y-4 border border-border shadow-xl flex flex-col justify-center card-hover"
            >
              <div className="w-12 h-12 rounded-full glass-level-2 flex items-center justify-center text-primary border border-primary/20">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold tracking-wide text-on-surface">Creative Philosophy</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                We employ the "Frosted Obsidian" design theme—deep midnight blues layered with translucency rather than heavy drop shadows. Generous vertical spacing prevents visual clutter, giving each product segment breathing room to highlight its lifestyle design.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-12 md:py-20 bg-gradient-dynamic relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10 flex flex-col items-center">
          <Award className="w-12 h-12 text-white animate-pulse" />
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Sustainability & Responsibility
          </h2>
          <p className="text-white/80 leading-relaxed text-sm sm:text-base max-w-2xl">
            We are dedicated to building a zero-waste supply chain. All Aetheria garments use certified organic fibers, GOTS non-toxic dyes, and Bluesign processing. By manufacturing in small, bespoke drops, we reduce excess stock waste, preserving raw materials and respecting our environment.
          </p>
        </div>
      </section>

      {/* Showroom timeline */}
      <section className="w-full bg-surface-container-lowest border-t border-border py-12 md:py-24 mt-8 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 md:space-y-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-on-surface text-center tracking-wider">
            Global Showrooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="glass-level-1 p-8 rounded-3xl border border-border shadow-xl space-y-3 card-hover flex flex-col items-center">
              <div className="w-10 h-10 rounded-full glass-level-2 border border-white/10 flex items-center justify-center text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-primary">SOHO, NYC</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                742 Frost Obsidian Boulevard<br />
                New York, NY 10001
              </p>
            </div>
            <div className="glass-level-1 p-8 rounded-3xl border border-border shadow-xl space-y-3 card-hover flex flex-col items-center">
              <div className="w-10 h-10 rounded-full glass-level-2 border border-white/10 flex items-center justify-center text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-primary">MAYFAIR, LONDON</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                18 Aetheria Lane, Mayfair<br />
                London, W1S 4PP
              </p>
            </div>
            <div className="glass-level-1 p-8 rounded-3xl border border-border shadow-xl space-y-3 card-hover flex flex-col items-center">
              <div className="w-10 h-10 rounded-full glass-level-2 border border-white/10 flex items-center justify-center text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-primary">GINZA, TOKYO</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                4-9-1 Ginza, Chuo-ku<br />
                Tokyo, 104-0061
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default About;
