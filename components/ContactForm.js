"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to send request.");
      }

      event.currentTarget.reset();
      setStatus(data.message);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Name</span>
        <input name="name" type="text" placeholder="Your name" required />
      </label>
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" placeholder="you@example.com" required />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea
          name="message"
          rows="5"
          placeholder="Tell us what jacket you want, size, and quantity."
          required
        />
      </label>
      <button type="submit" className="button" disabled={loading}>
        {loading ? "Sending..." : "Send Request"}
      </button>
      {status ? <p className="helper-text">{status}</p> : null}
    </form>
  );
}
