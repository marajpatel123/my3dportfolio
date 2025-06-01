import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
      "https://threed-portfolio-backend-de0c.onrender.com/contact",
      formData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
    console.error('Full error details:', {
      message: error.message,
      config: error.config,
      response: error.response?.data
    });
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }

};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-2 mt-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Contact Us
        </h1>
        
        <form onSubmit={handleSubmit} className="max-w-lg">
          {/* Name Field */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              className={`w-full p-3 rounded-lg bg-gray-700 border-2 ${
                errors.name ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
              } transition-colors`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-400 mt-1 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full p-3 rounded-lg bg-gray-700 border-2 ${
                errors.email ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
              } transition-colors`}
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-400 mt-1 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.email}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              name="message"
              className={`w-full p-3 rounded-lg bg-gray-700 border-2 ${
                errors.message ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
              } transition-colors`}
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
            />
            {errors.message && (
              <p className="text-red-400 mt-1 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                isSubmitting
                  ? 'bg-blue-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              } transition-all`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="mr-2" /> Send Message
                </>
              )}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="ml-4 text-green-400 flex items-center">
                <FiCheckCircle className="mr-2" /> Message sent successfully!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="ml-4 text-red-400 flex items-center">
                <FiAlertCircle className="mr-2" /> Failed to send. Please try again.
              </div>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
