import React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import './FeedbackForm.css';

const FeedbackForm = ({ onFeedbackSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const onSubmit = (data) => {
    onFeedbackSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="feedback-form">
      <h3>Your Feedback</h3>
      <label htmlFor="feedbackComments">Comments</label>
      <textarea 
        id="feedbackComments"
        {...register('comments', { required: 'Please enter your comments.' })}
        placeholder="Enter your feedback here"
      />
      {errors.comments && <span className="error">{errors.comments.message}</span>}
      
      <label htmlFor="feedbackRating">Rating (1-5)</label>
      <input 
        type="number" 
        id="feedbackRating" 
        min="1" 
        max="5" 
        {...register('rating', { required: 'Rating is required.' })}
      />
      {errors.rating && <span className="error">{errors.rating.message}</span>}
      
      <Button type="submit">Submit Feedback</Button>
    </form>
  );
};

export default FeedbackForm;