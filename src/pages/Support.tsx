import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Headphones, ChevronDown, Loader2 } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export const Support: React.FC = () => {

  // FAQs lists
  const faqs = [
    {
      q: 'What is your shipping and delivery policy?',
      a: 'Aetheria Luxe offers complimentary express delivery on all orders over $1,000 globally. For orders under $1,000, express delivery is available for a flat rate of $25. Delivery typically takes 5-7 business days, fully insured with real-time digital tracking.'
    },
    {
      q: 'How do I request a return or exchange?',
      a: 'We accept secure returns on all pristine, unworn pieces within 30 days of shipment receipt. Signature packaging, security tags, and receipt slips must be present. You can request a prepaid return shipping label via your dashboard or by initiating a chat here with our Support Desk.'
    },
    {
      q: 'Do you offer custom tailoring services?',
      a: 'Yes, custom tailoring adjustments are available at our Soho, London, and Tokyo physical showrooms. Simply bring your luxury garment and purchase proof to book an appointment with our master tailors.'
    },
    {
      q: 'How do I care for technical silk and cashmere?',
      a: 'We recommend professional dry clean only for technical silk items, and gentle hand-washing in cool water using cashmere wool detergent for knitwear. Lay dry flat to preserve material fibers and prevent shape warping.'
    }
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Chatbot State
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Greetings. I am your Aetheria digital support assistant. How may I guide your luxury acquisition experience today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollChatToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { sender: 'user', text: textToSend, time: timestamp };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      let botResponseText = "Thank you for reaching out. A premium support agent is reviewing your query and will connect shortly. For immediate automated tracking, try typing 'track order'.";
      const q = textToSend.toLowerCase();

      if (q.includes('track') || q.includes('order') || q.includes('status')) {
        botResponseText = "To track your order, please log in to your account dashboard under 'Order History' or provide your order ID (e.g. ORD-123456) so I can verify its real-time shipping status.";
      } else if (q.includes('return') || q.includes('exchange') || q.includes('refund')) {
        botResponseText = "Returns are accepted within 30 days of delivery. You can review our full guidelines or initiate a return directly on our Return Policy page (available at /return-policy or in the footer). Ensure original security labels remain attached.";
      } else if (q.includes('size') || q.includes('fit') || q.includes('tailor')) {
        botResponseText = "Our items follow a standard architectural drape. We offer bespoke sizing calibrations at our physical showrooms in Soho and Tokyo. Let me know if you would like me to schedule a showroom slot.";
      } else if (q.includes('hours') || q.includes('store') || q.includes('showroom')) {
        botResponseText = "Aetheria Luxe showrooms are located in Soho (NYC), Mayfair (London), and Ginza (Tokyo). Hours are Monday to Saturday: 10:00 AM - 8:00 PM, and Sunday: 11:00 AM - 6:00 PM.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <main className="flex-grow">
      {/* Header */}
      <header className="pt-24 pb-10 md:pt-[120px] md:pb-16 px-4 md:px-6 max-w-7xl mx-auto space-y-4">
        <span className="text-xs tracking-[0.2em] font-semibold text-primary uppercase">Support Desk</span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-on-surface uppercase tracking-tight">
          Support Center
        </h1>
        <p className="text-body-md text-on-surface-variant max-w-lg text-sm sm:text-base leading-relaxed">
          Find answers to frequently asked questions regarding shipping, returns, tailoring, and care routines, or connect with our digital live support agent.
        </p>
      </header>

      <section className="w-full bg-surface-container-lowest border-t border-border py-12 md:py-24 mt-8 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* FAQs list Side */}
          <div className="lg:col-span-6 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="premium-glass rounded-2xl overflow-hidden shadow-lg">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 flex justify-between items-center text-left hover:text-primary transition-colors group"
                  >
                    <span className="font-display font-bold text-sm text-on-surface group-hover:text-primary leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform shrink-0 ml-4 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <p className="px-5 pb-5 text-xs text-on-surface-variant leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Live Chat Concierge Side */}
          <div className="lg:col-span-6 lg:sticky lg:top-32">
            <div className="premium-glass rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[550px]">
              {/* Header */}
              <div className="bg-surface-container-low p-5 border-b border-border flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary relative animate-pulse">
                  <Headphones className="w-5 h-5" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 absolute bottom-0 right-0 border border-background"></span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-on-surface">Aetheria Support</h3>
                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Live Automated Support</span>
                </div>
              </div>

              {/* Message window */}
              <div
                ref={chatContainerRef}
                className="flex-grow p-5 overflow-y-auto space-y-4 custom-scrollbar bg-surface-container-lowest"
              >
                {messages.map((msg, idx) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 max-w-[85%] ${isBot ? '' : 'ml-auto flex-row-reverse'}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border shrink-0 text-xs ${
                        isBot ? 'bg-primary/15 border-primary/20 text-primary' : 'bg-white/10 border-white/20 text-on-surface'
                      }`}>
                        {isBot ? <Headphones className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                      </div>
                      
                      <div className={`p-4 rounded-2xl text-xs leading-relaxed space-y-1 shadow-lg ${
                        isBot
                          ? 'premium-glass rounded-tl-sm text-on-surface-variant'
                          : 'accent-gradient text-white rounded-tr-sm'
                      }`}>
                        <p>{msg.text}</p>
                        <span className="block text-[9px] text-right opacity-40 font-display">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Headphones className="w-3.5 h-3.5 animate-spin" />
                    </div>
                    <div className="premium-glass p-4 rounded-2xl rounded-tl-sm text-xs text-on-surface-variant flex items-center gap-2 shadow-lg">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                      <span>Assistant is drafting...</span>
                    </div>
                  </div>
                )}


              </div>

              {/* Quick helper buttons */}
              <div className="px-5 py-3 border-t border-border flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap bg-surface-container-low">
                {['Track order', 'Return policy', 'Showroom hours'].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleSendMessage(btn)}
                    className="bg-surface-container border border-border hover:border-primary/30 rounded-full px-4 py-1.5 text-[10px] font-display font-semibold uppercase tracking-wider hover:text-primary transition-all duration-300"
                  >
                    {btn}
                  </button>
                ))}
              </div>

              {/* Input fields */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputVal);
                }}
                className="p-4 bg-surface-container-low border-t border-border flex gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask support a question..."
                  className="flex-grow bg-surface-container border border-border rounded-full px-5 py-2.5 text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />

                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-primary text-on-primary hover:scale-102 active:scale-95 duration-150 transition-all flex items-center justify-center btn-primary-glow border border-primary/25 shrink-0"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Support;
