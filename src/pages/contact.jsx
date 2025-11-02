'use client';

import { useState } from 'react';
import Head from 'next/head';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // FormSubmit configuration
  const FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/your-email@chronoteller.com';

  // Structured data for better search engine visibility
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ChronoTeller - Get Help with Age Calculation",
    "description": "Contact our team for support with our age calculator tool, feature requests, or partnership opportunities. We're here to help with all your age calculation needs.",
    "url": "https://www.ageranker.com/contact",
    "publisher": {
      "@type": "Organization",
      "name": "ChronoTeller",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ageranker.com/logo.png"
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error on input
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.message.trim()) newErrors.message = 'Message cannot be empty';
    if (form.message.trim().length < 10) newErrors.message = 'Message should be at least 10 characters long';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New Contact Message from ${form.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('FormSubmit error:', error);
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      <Head>
        <title>Contact ChronoTeller | Support & Inquiries</title>
        <meta name="description" content="Get in touch with the ChronoTeller team for support, feature requests, or partnership opportunities. We're here to help with all your age calculation needs." />
        <meta name="keywords" content="contact age calculator, age calculator support, ChronoTeller contact, age calculation help, calculator tool inquiry" />
        <meta property="og:title" content="Contact ChronoTeller | Support & Inquiries" />
        <meta property="og:description" content="Get in touch with the ChronoTeller team for support, feature requests, or partnership opportunities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ageranker.com/contact" />
        <meta property="og:image" content="https://www.ageranker.com/contact-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact ChronoTeller | Support & Inquiries" />
        <meta name="twitter:description" content="Get in touch with the ChronoTeller team for support, feature requests, or partnership opportunities." />
        <meta name="twitter:image" content="https://www.ageranker.com/contact-twitter-image.jpg" />
        <link rel="canonical" href="https://www.ageranker.com/contact" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <header className={styles.contactHeader}>
        <div className={styles.headerContent}>
          <p className={styles.headerSubtitle}>
            We'd love to hear from you! Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>
      </header>

      <main className={styles.contactMain}>
        <div className={styles.contactContainer}>
          {/* Contact Information Cards */}
          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>💬</div>
              <h3 className={styles.infoTitle}>Quick Support</h3>
              <p className={styles.infoText}>
                Get help with our age calculator tools, report issues, or suggest improvements.
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🚀</div>
              <h3 className={styles.infoTitle}>Feature Requests</h3>
              <p className={styles.infoText}>
                Have an idea to make our age tools better? We'd love to hear it!
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🤝</div>
              <h3 className={styles.infoTitle}>Partnerships</h3>
              <p className={styles.infoText}>
                Interested in collaborating? Let's discuss potential partnerships.
              </p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className={styles.formSection}>
            <div className={styles.contactCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Send us a Message</h2>
                <p className={styles.cardSubtitle}>
                  Fill out the form below and we'll respond within 24 hours.
                </p>
              </div>

              {/* Alert Messages */}
              {isSuccess && (
                <div className={styles.alertSuccess}>
                  <span className={styles.alertIcon}>✅</span>
                  <div className={styles.alertContent}>
                    <strong>Message sent successfully!</strong>
                    <p>We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {isError && (
                <div className={styles.alertError}>
                  <span className={styles.alertIcon}>❌</span>
                  <div className={styles.alertContent}>
                    <strong>Failed to send message</strong>
                    <p>Please try again later or contact us directly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    <span className={styles.labelIcon}>👤</span>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    <span className={styles.labelIcon}>📧</span>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    <span className={styles.labelIcon}>💭</span>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    className={`${styles.formTextarea} ${errors.message ? styles.inputError : ''}`}
                    placeholder="How can we help you with our age calculator tools? Please provide as much detail as possible..."
                    disabled={isSubmitting}
                  />
                  {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.btnSpinner}></span>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <span className={styles.btnIcon}>🚀</span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;