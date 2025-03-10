import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';

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
    <section id="contact" className="py-5 text-white">
      <div className="container text-center">
        <h2 className="display-4 text-orange">After you contacted me you can rest.</h2>
        <p className="lead">Want to collaborate or just say hi? Reach out!</p>
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0px 4px 15px rgba(0,0,0,0.3)' }}
          className="btn btn-primary mt-4"
          onClick={handleShow}
        >
          Get in Touch
        </motion.button>
      </div>

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
            {/* ... (rest of the form fields) */}
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </section>
  );
}

export default Contact;
