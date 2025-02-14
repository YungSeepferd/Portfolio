import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-scroll';

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const projects = [
    { id: 1, title: 'Fitness Tracker UX Design', description: 'User-centered design for fitness tracking apps.' },
    { id: 2, title: 'Remote Team Food Delivery Concept', description: 'Video prototype for work-from-home teams.' },
    { id: 3, title: 'VR Audio Meditation Experience', description: 'Immersive soundscapes for mindfulness.' },
    { id: 4, title: 'Haptic Feedback Prototyping Kit', description: 'Creating tools for haptic experience designers.' },
    { id: 5, title: 'Smart Home Audio Controls', description: 'Context-aware audio systems for smart living.' },
    { id: 6, title: 'Podcast Production Studio UX', description: 'Redesigning the workflow for podcast creators.' }
  ];

  const handleShowModal = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  return (
    <header className="bg-dark text-white py-3 sticky-top">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="text-orange">Vincent Göke</h1>
        <nav className="d-flex align-items-center">
          <Link to="hero" smooth={true} duration={800} className="text-white mx-3">Home</Link>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              My Work
            </button>
            <ul className="dropdown-menu">
              {projects.map((project) => (
                <li key={project.id}>
                  <button className="dropdown-item" onClick={() => handleShowModal(project)}>
                    {project.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Link to="about" smooth={true} duration={800} className="text-white mx-3">About</Link>
          <Link to="contact" smooth={true} duration={800} className="text-white mx-3">Contact</Link>
        </nav>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{currentProject?.description}</p>
          <p>In this project, I focused on user-centered design principles to deliver impactful solutions.</p>
        </Modal.Body>
      </Modal>
    </header>
  );
}

export default Header;
