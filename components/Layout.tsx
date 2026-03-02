import React from 'react';
import { ChevronDown, Mail, Facebook, Twitter, Instagram, Youtube, Music } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white pt-4 pb-2 px-6 md:px-12 sticky top-0 z-50 border-b border-transparent transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">MoMA</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 text-sm font-medium cursor-pointer hover:underline">
            Membership <ChevronDown size={16} />
          </div>
          <button className="bg-[#009ae4] text-white px-5 py-2 text-sm font-bold hover:bg-[#0077b3] transition-colors">
            Tickets
          </button>
        </div>
      </div>
      
      <nav className="flex items-center gap-8 text-lg font-bold">
        <a href="#" className="hover:underline">Visit</a>
        <a href="#" className="hover:underline">Exhibitions and events</a>
        <a href="#" className="hover:underline">Art and artists</a>
        <a href="#" className="hover:underline">Store</a>
      </nav>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#333] text-white py-12 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center border-b border-gray-600 pb-8 mb-8">
          <nav className="flex gap-8 text-sm font-bold">
            <a href="#" className="hover:text-gray-300">About us</a>
            <a href="#" className="hover:text-gray-300">Support</a>
            <a href="#" className="hover:text-gray-300">Research</a>
            <a href="#" className="hover:text-gray-300">Teaching</a>
            <a href="#" className="hover:text-gray-300">Magazine</a>
            <a href="#" className="hover:text-gray-300 ml-auto">Log out</a>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
             <div>
                <h3 className="font-bold text-lg mb-1">MoMA</h3>
                <p className="text-sm">11 West 53 Street, Manhattan</p>
                <p className="text-sm mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Open today, 10:30 a.m.–5:30 p.m.
                </p>
             </div>
             <div>
                <h3 className="font-bold text-lg mb-1">MoMA PS1</h3>
                <p className="text-sm">22–25 Jackson Avenue, Queens</p>
                <p className="text-sm mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Closed today
                </p>
             </div>
             <div className="flex gap-4 mt-6">
                <Instagram size={20} />
                <Facebook size={20} />
                <Twitter size={20} />
                <span className="font-serif italic text-lg">G</span> {/* Google placeholder */}
                <Music size={20} /> {/* Spotify placeholder */}
                <Youtube size={20} />
             </div>
          </div>

          <div className="flex flex-col justify-end">
            <div className="border-b border-white pb-2 flex justify-between items-center cursor-pointer">
               <span className="text-xl font-bold">Art and ideas in your inbox</span>
               <Mail size={24} />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between text-xs font-medium text-gray-400">
          <div className="flex gap-6">
             <a href="#" className="hover:text-white">Privacy Policy</a>
             <a href="#" className="hover:text-white">Terms of use</a>
             <a href="#" className="hover:text-white flex items-center gap-1">Use high-contrast text <div className="w-3 h-3 rounded-full border border-gray-400"></div></a>
          </div>
          <div className="mt-4 md:mt-0">
             © 2025 The Museum of Modern Art
          </div>
        </div>
      </div>
    </footer>
  );
};