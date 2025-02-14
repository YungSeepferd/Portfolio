import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Contact() {
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        'service_5yids6s',
        'template_x0uio0w',
        data,
        'u71C5a82B1v2MCrE9'
      );
      toast.success('Message sent successfully!', { position: 'top-center' });
      reset();
      handleClose();
    } catch (error) {
      toast.error('Failed to send message. Please try again.', { position: 'top-center' });
    }
  };

  return (
    <section id="contact" className="bg-dark text-white py-5">
      <div className="container text-center">
        <h2 className="display-4 text-orange">Contact Me</h2>
        <p className="lead">Want to collaborate or just say hi? Reach out!</p>
        <Button variant="primary" size="lg" onClick={handleShow} className="mt-4">
          Get in Touch
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Contact Me</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="formName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" {...register('name', { required: 'Name is required' })} />
                {errors.name && <small className="text-danger">{errors.name.message}</small>}
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && <small className="text-danger">{errors.email.message}</small>}
              </Form.Group>

              <Form.Group controlId="formMessage" className="mt-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Write your message here..." {...register('message', { required: 'Message is required' })} />
                {errors.message && <small className="text-danger">{errors.message.message}</small>}
              </Form.Group>

              <Button variant="success" className="mt-4" type="submit">
                <FontAwesomeIcon icon={faPaperPlane} className="me-2" /> Send Message
              </Button>
            </Form>

            <hr className="my-4" />
            <div className="text-center">
              <p>Or connect with me on:</p>
              <a href="mailto:your-email@example.com" className="text-dark mx-3">
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
              </a>
              <a href="https://linkedin.com/in/your-profile" className="text-dark mx-3">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a href="https://github.com/your-github" className="text-dark mx-3">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
            </div>
          </Modal.Body>
        </Modal>
      </motion.div>

      <ToastContainer />
    </section>
  );
}

export default Contact;
