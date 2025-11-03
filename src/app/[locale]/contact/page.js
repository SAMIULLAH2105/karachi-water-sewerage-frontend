"use client";
import React, { useState, useEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Set page title and meta description dynamically
  useEffect(() => {
    document.title = "Contact | Blog Website";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Get in touch with us at Blog Website."
      );
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content = "Get in touch with us at Blog Website.";
      document.head.appendChild(metaDescription);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted! (This is just a dummy form)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-[#0f0f1a] text-white py-16 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center mb-12">
        Contact <span className="text-yellow-400">Us</span>
      </h1>

      <div className="max-w-2xl mx-auto bg-[#1a1a2e] rounded-xl p-8 shadow-lg border border-white/10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-md bg-[#0f0f1a] border border-gray-600 text-white focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-md bg-[#0f0f1a] border border-gray-600 text-white focus:outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="p-3 rounded-md bg-[#0f0f1a] border border-gray-600 text-white focus:outline-none"
            rows={5}
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black font-bold py-3 rounded-md hover:bg-yellow-500 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
