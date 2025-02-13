import React from 'react';

function About() {
  return (
    <section id="about-me-intro" className="text-center py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-12">About Me</h2>
        <img src="/images/profile-picture.jpg" alt="Vincent Göke Profile Picture" className="profile-pic rounded-full shadow-lg mx-auto mb-10 w-64 h-64 object-cover" />
      </div>

      <section id="about-me-content" className="max-w-3xl mx-auto px-4 text-gray-300">
        <p className="mb-6">Hello! I'm Vincent Göke, a diploma Audio Designer with a B.Sc in Media Informatics, currently pursuing a joint Master's in Human-Computer Interaction at the FH Salzburg and Paris Lodron University Salzburg in Austria.</p>
        <p className="mb-6">My journey began with music and podcast production, evolving into UX Design and software engineering. This path has highlighted the significant impact of acoustic cues and context-based design on user experience. I am passionate about creating technology that is not only functional but also seamlessly integrates into users' lives, becoming "invisible and indispensable" through thoughtful design and usability.</p>
        <p className="mb-6">My academic background includes media informatics at LMU Munich, focusing on human-machine interaction, and audio design training at Deutsche Pop in Munich. My bachelor's seminar paper explored the guiding function of audio in human perception, particularly for VR-based guided audio-meditation.</p>
        <p className="mb-6">From January 2020 to December 2022, I worked as a research assistant in the nuclear medicine department at the University Hospital of Munich, providing IT support and developing a podcast environment focused on women in medicine.</p>
        <p className="mb-6">In early 2022, I interned as a UX researcher and prototyper at the DJ company "DJay" in Munich. Now, I am eager to join a larger professional UX design team to expand my practical experience and contribute my unique skills and perspectives.</p>

        <h3 className="text-3xl font-bold text-orange-500 mt-12 mb-6">Skills</h3>
        <ul className="list-none pl-0">
          <li className="mb-2 relative pl-5 before:content-['\25AA'] before:absolute before:left-0 before:top-1 before:text-orange-500 before:text-sm">Audio Design & Sound Engineering</li>
          <li className="mb-2 relative pl-5 before:content-['\25AA'] before:absolute before:left-0 before:top-1 before:text-orange-500 before:text-sm">User Experience (UX) Research & UI Design</li>
          <li className="mb-2 relative pl-5 before:content-['\25AA'] before:absolute before:left-0 before:top-1 before:text-orange-500 before:text-sm">Human-Computer Interaction (HCI)</li>
          <li className="mb-2 relative pl-5 before:content-['\25AA'] before:absolute before:left-0 before:top-1 before:text-orange-500 before:text-sm">Hardware & Software Prototyping</li>
          <li className="mb-2 relative pl-5 before:content-['\25AA'] before:absolute before:left-0 before:top-1 before:text-orange-500 before:text-sm">Frontend Development Basics</li>
          <li className="mb-2 relative pl-5 before:content-['\25AA'] before:absolute before:left-0 before:top-1 before:text-orange-500 before:text-sm">Proficient in MacOS, Linux, and Windows</li>
          <li className="mb-2 relative pl-5 before:content-['\25AA'] before:absolute before:left-0 before:top-1 before:text-orange-500 before:text-sm">Tools: Figma, Adobe XD, Adobe Creative Suite, Ableton Live, Fresco, Mockup, Chart.js, D3.js</li>
        </ul>

        <h3 className="text-3xl font-bold text-orange-500 mt-12 mb-6">Experience</h3>
        <ul className="list-none pl-0">
          <li className="mb-4">
            <strong className="block text-gray-100">UX Design Intern</strong>, DJay (Munich) - Early 2022 (3 months)
            <ul className="list-disc pl-5 mt-2">
              <li>UX Research and Prototyping for audio integration.</li>
            </ul>
          </li>
          <li className="mb-4">
            <strong className="block text-gray-100">Research Assistant</strong>, University Hospital of Munich (Nuclear Medicine Dept.) - 01.2020 - 12.2022
            <ul className="list-disc pl-5 mt-2">
              <li>Basic IT Support.</li>
              <li>Podcast environment setup for "Women in Medicine" podcast.</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-3xl font-bold text-orange-500 mt-12 mb-6">Education</h3>
        <ul className="list-none pl-0">
          <li className="mb-4">
            <strong className="block text-gray-100">M.Sc. Human-Computer Interaction (Joint Masters)</strong>, FH Salzburg & Paris Lodron University Salzburg (Austria) - Current</li>
          <li className="mb-4">
            <strong className="block text-gray-100">B.Sc. Media Informatics</strong>, Ludwig Maximilian University of Munich (LMU Munich)</li>
          <li className="mb-4">
            <strong className="block text-gray-100">Diploma Audio Designer</strong>, Deutsche Pop (Munich)</li>
        </ul>

        <h3 className="text-3xl font-bold text-orange-500 mt-12 mb-6">Hobbies & Interests</h3>
        <p className="mb-6">Beyond UX and Audio, I am passionate about music production as Din-Z, creating HipHop for other artists, and playing various instruments. I enjoy staying active with Fussball (soccer), am a dedicated FC Schalke 04 fan, and value time with my large family across Germany.</p>
      </section>
    </section>
  );
}

export default About;