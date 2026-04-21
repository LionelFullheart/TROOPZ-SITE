"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export function ContactForm({
  initialInterest = "Drop updates",
  initialMessage = "",
  submitLabel = "Send to TROOPZ",
}) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      if (!payload.name || !payload.email || !payload.phone || !payload.message) {
        throw new Error("Please complete all fields before sending your request.");
      }

      const interest = payload.interest || "General inquiry";
      const subject = encodeURIComponent(`TROOPZ ${interest}`);
      const body = encodeURIComponent(
        [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone}`,
          `Interest: ${interest}`,
          "",
          "Message:",
          payload.message,
        ].join("\n")
      );

      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      event.currentTarget.reset();
      setStatus(
        `Your email app should open with your request addressed to ${site.email}. If it does not, email us directly and include your phone number for drop updates.`
      );
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
        <span>Phone</span>
        <input name="phone" type="tel" placeholder="Your best number" required />
      </label>
      <label className="field">
        <span>Interest</span>
        <select name="interest" defaultValue={initialInterest}>
          <option>Drop updates</option>
          <option>Order inquiry</option>
          <option>Sizing help</option>
          <option>Wholesale inquiry</option>
          <option>General inquiry</option>
        </select>
      </label>
      <label className="field">
        <span>Message</span>
        <textarea
          name="message"
          rows="5"
          placeholder="Tell us what item you want, your size, and whether you want drop alerts."
          defaultValue={initialMessage}
          required
        />
      </label>
      <button type="submit" className="button" disabled={loading}>
        {loading ? "Opening..." : submitLabel}
      </button>
      {status ? <p className="helper-text">{status}</p> : null}
    </form>
  );
}
