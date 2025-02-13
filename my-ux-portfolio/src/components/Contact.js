import React from 'react';

function Contact() {
  return (
    <section id="contact-intro" className="text-center py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-8">Contact Me</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">I'd love to hear from you! Feel free to reach out for collaborations, job opportunities, or just to say hello.</p>
      </div>

      <section id="contact-details" className="py-12">
        <ul className="list-none pl-0 max-w-lg mx-auto">
          <li className="mb-8 text-center">
            <strong className="block text-gray-100 mb-2">Email:</strong>
            <a href="mailto:your-email@example.com" className="text-orange-500 text-lg font-bold hover:text-gray-300">your-email@example.com</a>
          </li>
          <li className="mb-8 text-center">
            <strong className="block text-gray-100 mb-2">LinkedIn:</strong>
            <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" className="text-orange-500 text-lg font-bold hover:text-gray-300">LinkedIn Profile</a>
          </li>
        </ul>
      </section>
    </section>
  );
}

export default Contact;