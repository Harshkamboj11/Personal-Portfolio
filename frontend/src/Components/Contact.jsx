import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Globe from './lightswind/globe.js';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Invalid email.';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate();
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length === 0) {
      setLoading(true); // 1. Loading start karo
      try {
        // 2. "await" zaroori hai response ka intezar karne ke liye
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/create-new-contact`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          }
        );

        if (response.ok) {
          console.log('Data submitted successfully');
          setSubmitted(true);
          setForm({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
          // 3. 3-4 seconds baad "Thank you" message gayab karne ke liye (Optional)
          setTimeout(() => setSubmitted(false), 5000);
        } else {
          console.error('Server error:', response.statusText);
          alert('Server error! Please try again.');
        }
      } catch (error) {
        console.error('Connection error:', error);
        alert('Could not connect to server. Is your backend running?');
      } finally {
        setLoading(false); // 4. Loading khatam (chahe success ho ya error)
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8 bg-black">
      {/* Glowing, Animated Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, boxShadow: '0 0 0px #e99b63' }}
        whileInView={{
          opacity: 1,
          scale: 1,
          boxShadow: [
            '0 0 20px 4px #e99b63',
            '0 0 30px 6px #fa8128',
            '0 0 20px 4px #e99b63',
          ],
        }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.8,
          type: 'spring',
          bounce: 0.3,
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
        }}
        // Responsive grid: 1-column on mobile, 2-column on md+ screens
        className="bg-[#181818] text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 md:gap-8 max-w-4xl w-full"
        style={{
          border: '2px solid #e99b63',
        }}
      >
        {/* Form (Left) */}
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl font-bold mb-6 text-[#e99b63] text-center">
            Contact Me
          </h2>
          {submitted && (
            <div className="mb-4 text-green-400 text-center font-semibold">
              Thank you! Your message was sent.
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                className="block mb-2 text-lg font-semibold"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full py-2 px-3 rounded bg-[#282828] border border-[#e99b63] outline-none focus:ring-2 focus:ring-[#e99b63] text-white"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-lg font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full py-2 px-3 rounded bg-[#282828] border border-[#e99b63] outline-none focus:ring-2 focus:ring-[#e99b63] text-white"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-lg font-semibold"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                className="w-full py-2 px-3 rounded bg-[#282828] border border-[#e99b63] outline-none focus:ring-2 focus:ring-[#e99b63] text-white"
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-lg font-semibold"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full py-2 px-3 rounded bg-[#282828] border border-[#e99b63] outline-none focus:ring-2 focus:ring-[#e99b63] text-white"
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <motion.button
              type="submit"
              disabled={loading} // Button disable ho jayega jab loading true hoga
              whileHover={
                !loading ? { scale: 1.05, boxShadow: '0 0 16px #e99b63' } : {}
              }
              className={`w-full py-2 px-6 rounded-xl font-bold text-lg transition-all ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                  : 'bg-[#e99b63] text-black'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </form>
        </div>
        {/* Globe (Right) */}
        <div className="flex-1 flex items-center justify-center">
          <Globe
            theta={0.2}
            dark={1}
            scale={1.2}
            diffuse={1.5}
            baseColor="#1a1a1a"
            markerColor="#ff0000"
            glowColor="#444444"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
