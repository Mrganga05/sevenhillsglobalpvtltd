import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://wa.me/918500336668?text=Hello%20Seven%20Hills%20Global%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center justify-center p-0.5 rounded-full hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      {/* Outer glow aura */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/60 to-[#128C7E]/60 rounded-full blur-md opacity-80 group-hover:opacity-100 group-hover:animate-pulse transition duration-500"></div>

      {/* Button body */}
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.5)] border border-white/20 overflow-hidden">
        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[30deg] group-hover:animate-[shimmer_2s_infinite]" />

        <MessageCircle className="w-7 h-7 text-white drop-shadow-md z-10" />
      </div>

      {/* Notification dot */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-background"></span>
      </span>
    </a>
  );
};

export default WhatsAppButton;
