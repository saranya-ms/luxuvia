import Reveal from '../components/Reveal';
import InquiryForm from '../components/InquiryForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const contactItems = [
  {
    icon: Phone,
    label: 'PHONE',
    value: '+91 8877 555 999',
    href: 'tel:+918877555999',
  },
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'support@luxuvia.in',
    href: 'mailto:support@luxuvia.in',
  },
  {
    icon: MapPin,
    label: 'ADDRESS',
    value: 'Peerzadiguda, East Hyderabad, Telangana 500039',
  },
  {
    icon: Clock,
    label: 'WORKING HOURS',
    value: 'Mon - Sat: 9:00 AM - 7:00 PM',
  },
];

export default function ContactPage() {
  return (
    <main data-testid="contact-page" className="bg-dark-base text-text-white min-h-screen pt-32">
      <section className="bg-[#0d1220] border-b border-[#1e2d50] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="font-body text-[11px] uppercase tracking-[0.35em] text-[#f59218] mb-2">CONTACT US</p>
            <div className="accent-line mx-auto mb-5" />
            <h1 className="font-heading text-4xl sm:text-5xl text-white mb-3">Get in Touch</h1>
            <p className="font-body text-sm text-[#6b7fa0] mx-auto max-w-2xl leading-7">
              Ready to find your dream home? Book a free site visit or request a callback. Our team is here to help.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <div className="mb-10">
                  <h2 className="font-heading text-3xl text-white mb-1">Our Office</h2>
                  <div className="accent-line mb-8" />
                </div>

                <div className="space-y-6">
                  {contactItems.map((item, index) => {
                    const Icon = item.icon;
                    const content = (
                      <div className="flex flex-col">
                        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-[#6b7fa0] mb-1">
                          {item.label}
                        </p>
                        <p className="font-heading text-lg text-white">{item.value}</p>
                      </div>
                    );

                    return (
                      <div
                        key={item.label}
                        data-testid={`contact-info-${index}`}
                        className="flex items-start gap-4 rounded-3xl border border-[#1e2d50] bg-[#08162f] p-6"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f1e3d] text-[#f59218]">
                          <Icon className="h-4 w-4" />
                        </div>
                        {item.href ? (
                          <a href={item.href} className="text-white hover:text-[#f59218] transition-colors">
                            {content}
                          </a>
                        ) : (
                          content
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-3xl border border-[#1e2d50] bg-[#0f1628] p-6">
                  <h3 className="font-heading text-xl text-white mb-2">WhatsApp Us</h3>
                  <p className="font-body text-sm text-[#6b7fa0] mb-5">
                    Connect with us instantly on WhatsApp for quick responses.
                  </p>
                  <a
                    href="https://wa.me/918877555999?text=Hi%2C%20I'm%20interested%20in%20Luxuvia%20projects"
                    data-testid="whatsapp-link"
                    className="inline-flex items-center gap-2 rounded-md bg-[#25d366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
                  >
                    <Phone className="h-4 w-4" />
                    CHAT ON WHATSAPP
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div data-testid="inquiry-form" className="rounded-3xl border border-[#1e2d50] bg-[#0f1628] p-8">
                <h2 className="font-heading text-2xl text-white mb-1">Book a Site Visit</h2>
                <p className="font-body text-sm text-[#6b7fa0] mb-8">
                  Fill in your details and we'll arrange a free visit.
                </p>
                <InquiryForm
                  inquiryType="general"
                  testIds={{
                    name: 'inquiry-name',
                    phone: 'inquiry-phone',
                    email: 'inquiry-email',
                    message: 'inquiry-message',
                    submit: 'inquiry-submit',
                  }}
                />
                <p className="font-body text-xs text-[#6b7fa0] text-center mt-4">
                  or call <a href="tel:+918877555999" className="text-[#f59218] hover:underline">+91 8877 555 999</a>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
