import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact | TROOPZ",
  description: "Contact TROOPZ for orders and inquiries.",
};

export default function ContactPage() {
  return (
    <main className="page-section">
      <div className="shell contact-grid">
        <div>
          <p className="eyebrow">Contact TROOPZ</p>
          <h1>Orders, questions, and direct brand inquiries.</h1>
          <p className="lead">
            Use the form for product questions, custom requests, or sizing help.
          </p>
          <div className="contact-info">
            <p>
              Email: <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
