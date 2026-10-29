// src/components/ContactSection.tsx

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

// ========================================
// EMAILJS CONFIGURATION
// Verify these values in your EmailJS dashboard.
// ========================================

const SERVICE_ID = 'service_48nn0vf';
const TEMPLATE_ID = 'template_49r7rnp';
const PUBLIC_KEY = 'plHOOwrsr6OWYXe6Q';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // ========================================
  // HANDLE INPUT CHANGES
  // ========================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  // ========================================
  // SEND CONTACT MESSAGE
  // ========================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (status === 'sending') return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name,
          email,
          message,
          title: 'Portfolio Contact Message',
          time: new Date().toLocaleString(),
        },
        {
          publicKey: PUBLIC_KEY,
        }
      );

      console.log('EmailJS success:', response.status, response.text);

      setStatus('success');

      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error: unknown) {
      console.error('EmailJS error:', error);

      const emailError = error as {
        status?: number;
        text?: string;
        message?: string;
      };

      console.error('EmailJS status:', emailError.status);
      console.error('EmailJS details:', emailError.text);

      setStatus('error');

      if (emailError.status === 404) {
        setErrorMessage(
          'Email configuration not found. Please verify your EmailJS Public Key, Service ID, and Template ID.'
        );
      } else if (emailError.status === 400) {
        setErrorMessage(
          'Invalid email configuration or template parameters. Please check your EmailJS template.'
        );
      } else if (emailError.status === 401 || emailError.status === 403) {
        setErrorMessage(
          'EmailJS authorization failed. Please verify your Public Key and account settings.'
        );
      } else if (!navigator.onLine) {
        setErrorMessage(
          'You are offline. Please check your internet connection and try again.'
        );
      } else {
        setErrorMessage(
          'Message could not be sent. Please try again.'
        );
      }
    }
  };

  // ========================================
  // RESET FORM
  // ========================================

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });

    setStatus('idle');
    setErrorMessage('');
  };

  // ========================================
  // UI
  // ========================================

  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden bg-black px-6 pt-16 pb-16 font-sans text-[#E8DFD8] sm:px-12 lg:px-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">

          {/* LEFT SECTION */}

          <div className="flex flex-col lg:col-span-5">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-5 flex items-center gap-4"
            >
              <span
                className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#D4AF37]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                05 / CONTACT
              </span>

              <div className="h-px w-16 bg-gradient-to-r from-[#D4AF37]/80 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h2
                className="select-none text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block bg-gradient-to-b from-white via-[#D5CBC0] to-[#605448] bg-clip-text text-transparent">
                  LET&apos;S CONNECT.
                </span>

                <span className="mt-2 block bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] bg-clip-text text-transparent">
                  BUILD SOMETHING GREAT.
                </span>
              </h2>
            </motion.div>

            <p
              className="max-w-md text-sm font-light leading-relaxed text-[#A8988B]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Have a project idea, internship opportunity, or collaboration
              in mind? I&apos;d love to hear from you.
            </p>

          </div>

          {/* RIGHT SECTION: CONTACT FORM */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full overflow-hidden border border-[#8C6D4F]/40 bg-[#0A0806] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] sm:p-10 lg:col-span-7"
          >

            {/* GOLD TOP BORDER */}

            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

            {/* CORNER DETAILS */}

            <div className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[#D4AF37]/60" />
            <div className="absolute right-0 top-0 h-3 w-3 border-r border-t border-[#D4AF37]/60" />
            <div className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[#D4AF37]/60" />
            <div className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[#D4AF37]/60" />

            {/* SUCCESS MESSAGE */}

            {status === 'success' ? (

              <div
                className="space-y-4 py-16 text-center"
                role="status"
                aria-live="polite"
              >

                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37] text-xl text-[#D4AF37]">
                  ✓
                </div>

                <h3
                  className="text-3xl uppercase text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  MESSAGE SENT SUCCESSFULLY
                </h3>

                <p
                  className="text-sm font-light text-[#A8988B]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Thank you for contacting me. Your message has been
                  submitted successfully.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 border border-[#8C6D4F]/50 px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:border-[#D4AF37] hover:text-[#F7E7C4]"
                >
                  SEND ANOTHER MESSAGE
                </button>

              </div>

            ) : (

              /* CONTACT FORM */

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* NAME AND EMAIL */}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  {/* NAME */}

                  <div>

                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#8C6D4F]"
                    >
                      // SENDER
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={100}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter name"
                      className="w-full rounded-sm border border-[#8C6D4F]/30 bg-[#120F0C] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#8C6D4F]/50 focus:border-[#D4AF37]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#8C6D4F]"
                    >
                      // CHANNEL
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="w-full rounded-sm border border-[#8C6D4F]/30 bg-[#120F0C] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#8C6D4F]/50 focus:border-[#D4AF37]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />

                  </div>

                </div>

                {/* MESSAGE */}

                <div>

                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#8C6D4F]"
                  >
                    // PAYLOAD
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={5}
                    maxLength={5000}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message..."
                    className="w-full resize-y rounded-sm border border-[#8C6D4F]/30 bg-[#120F0C] p-4 text-sm text-white outline-none transition-colors placeholder:text-[#8C6D4F]/50 focus:border-[#D4AF37]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />

                </div>

                {/* ERROR MESSAGE */}

                {status === 'error' && (

                  <div
                    className="border border-red-500/30 bg-red-950/20 p-4 text-sm leading-relaxed text-red-400"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errorMessage}
                  </div>

                )}

                {/* SUBMIT BUTTON */}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full border border-[#8C6D4F]/50 bg-[#14100D] py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#E8DFD8] shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#1A1510] hover:text-[#F7E7C4] disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {status === 'sending'
                    ? 'TRANSMITTING...'
                    : 'EXECUTE DISPATCH ↗'}
                </button>

              </form>

            )}

          </motion.div>

        </div>

        {/* FOOTER */}

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#8C6D4F]/15 pt-10 text-center sm:flex-row sm:text-left">

          <span className="text-[10px] uppercase tracking-widest text-[#8C6D4F]">
            MAGENDRAN P. // PORTFOLIO
          </span>

          <span className="text-[10px] text-[#8C6D4F]">
            © {new Date().getFullYear()} • BUILT WITH PASSION
          </span>

        </div>

      </div>

    </footer>
  );
};

export default ContactSection;
