import React, { useState } from "react";
import { motion } from "framer-motion";
import Globe from "./lightswind/Globe.jsx"; // ✅ exact case + extension

/* ------------------ Component ------------------ */

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ------------------ Validation ------------------ */

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email.";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";

    return newErrors;
  };

  /* ------------------ Handlers ------------------ */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldErrors = validate();
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length !== 0) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-new-contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ JSX ------------------ */

  return (
    <div className="flex items-center justify-center min-h-screen py-8 bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, boxShadow: "0 0 0px #e99b63" }}
        whileInView={{
          opacity: 1,
          scale: 1,
          boxShadow: [
            "0 0 20px 4px #e99b63",
            "0 0 30px 6px #fa8128",
            "0 0 20px 4px #e99b63",
          ],
        }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.8,
          type: "spring",
          bounce: 0.3,
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
        className="bg-[#181818] text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 max-w-4xl w-full border-2 border-[#e99b63]"
      >
        {/* ------------------ Form ------------------ */}
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl font-bold mb-6 text-[#e99b63] text-center">
            Contact Me
          </h2>

          {submitted && (
            <p className="mb-4 text-green-400 text-center font-semibold">
              Thank you! Your message was sent.
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {["name", "email", "subject"].map((field) => (
              <div key={field} className="mb-4">
                <label
                  htmlFor={field}
                  className="block mb-2 text-lg font-semibold capitalize"
                >
                  {field}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full py-2 px-3 rounded bg-[#282828] border border-[#e99b63] outline-none focus:ring-2 focus:ring-[#e99b63]"
                  autoComplete="off"
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-lg font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full py-2 px-3 rounded bg-[#282828] border border-[#e99b63] outline-none focus:ring-2 focus:ring-[#e99b63]"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={
                !loading
                  ? { scale: 1.05, boxShadow: "0 0 16px #e99b63" }
                  : {}
              }
              className={`w-full py-2 rounded-xl font-bold text-lg transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed text-gray-400"
                  : "bg-[#e99b63] text-black"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </div>

        {/* ------------------ Globe ------------------ */}
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
