import React from 'react';

function Hero() {
  return (
    <section id="hero" className="bg-transparent py-36 text-center">
      <div className="hero-content max-w-2xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-orange-500 mb-5 text-shadow">Vincent Göke</h1>
        <p className="text-gray-300 text-xl max-w-xl mx-auto mb-8">Audio Design / UX Design & Research / Frontend Dev</p>
        <a href="/work" className="button bg-orange-500 text-gray-100 px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-transparent hover:text-orange-500 border-2 border-orange-500 transition-colors duration-300 transform hover:scale-105 shadow-md">See My Work</a>
      </div>
    </section>
  );
}

export default Hero;