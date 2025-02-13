import React from 'react';

function Work() {
  return (
    <section id="work-intro" className="text-center py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-8">My UX Design & Audio Portfolio</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">A selection of case studies showcasing my approach to user-centered design, audio integration, and problem-solving across UX and audio domains.</p>
      </div>

      <section id="case-studies" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-16 max-w-6xl mx-auto">
        <article className="case-study-item bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transform hover:translate-y-minus-2 transition-transform duration-300">
          <img src="/images/case-study-1-thumb.jpg" alt="Fitness Application UX Design Thumbnail" className="rounded-lg mb-4" />
          <h3 className="text-2xl font-bold text-orange-500 mb-2"><a href="/case-study-1" className="hover:text-gray-300">Fitness Application UX Design</a></h3>
          <p className="text-gray-300">Ideation, sketching, research, wireframing, and prototyping for a fitness application developed during the LMU UX1 course.</p>
        </article>

        <article className="case-study-item bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transform hover:translate-y-minus-2 transition-transform duration-300">
          <img src="/images/case-study-2-thumb.jpg" alt="Home Office Food Delivery Concept Thumbnail" className="rounded-lg mb-4" />
          <h3 className="text-2xl font-bold text-orange-500 mb-2"><a href="/case-study-2" className="hover:text-gray-300">Home Office Food Delivery Concept</a></h3>
          <p className="text-gray-300">Video prototype for a food delivery concept tailored for home office teams, created during the LMU UX3 workshop.</p>
        </article>

        <article className="case-study-item bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transform hover:translate-y-minus-2 transition-transform duration-300">
          <img src="/images/case-study-3-thumb.jpg" alt="Breakout Audio Integration Prototype Thumbnail" className="rounded-lg mb-4" />
          <h3 className="text-2xl font-bold text-orange-500 mb-2"><a href="/case-study-3" className="hover:text-gray-300">Breakout Audio Integration Prototype</a></h3>
          <p className="text-gray-300">Prototyping boundaries of Adobe XD and Figma for audio integration in the "Breakout" project during a UX design internship.</p>
        </article>
      </section>
    </section>
  );
}

export default Work;