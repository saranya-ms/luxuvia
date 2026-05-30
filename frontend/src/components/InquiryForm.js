import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function InquiryForm({
  projectSlug,
  projectName,
  inquiryType = 'general',
  compact = false,
  testIds = {},
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        project_slug: projectSlug,
        project_name: projectName,
        inquiry_type: inquiryType,
      };

      const res = await fetch(
        "https://jnbjqxvkqqsccurwrclu.supabase.co/functions/v1/resend-email-luxuvia",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Unknown error");
      }

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      toast.success('Inquiry submitted! Our team will contact you soon.');

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle size={48} className="text-[#075e54] mx-auto mb-4" />
        <h3 className="font-heading text-2xl text-[#eef1f6] mb-2">Thank You!</h3>
        <p className="font-body text-[#8090b0] mb-4">Our team will contact you shortly.</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="font-body text-[#f59218] hover:text-[#f5b862] transition-colors text-sm"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          data-testid={testIds.name}
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-[#1e2d50] text-white font-body text-sm py-3 placeholder-[#3a4a6a] focus:outline-none focus:border-[#f59218] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="tel"
          name="phone"
          data-testid={testIds.phone}
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-[#1e2d50] text-white font-body text-sm py-3 placeholder-[#3a4a6a] focus:outline-none focus:border-[#f59218] transition-colors"
        />
        {!compact && (
          <input
            type="email"
            name="email"
            data-testid={testIds.email}
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-[#1e2d50] text-white font-body text-sm py-3 placeholder-[#3a4a6a] focus:outline-none focus:border-[#f59218] transition-colors"
          />
        )}
      </div>

      {!compact && (
        <div>
          <textarea
            name="message"
            data-testid={testIds.message}
            placeholder="Your Message (optional)"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full bg-transparent border-b border-[#1e2d50] text-white font-body text-sm py-3 placeholder-[#3a4a6a] focus:outline-none focus:border-[#f59218] transition-colors resize-none"
          />
        </div>
      )}

      <button
        type="submit"
        data-testid={testIds.submit}
        disabled={loading}
        className="w-full btn-primary py-4 font-body font-semibold uppercase tracking-[0.2em] text-sm rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'SUBMIT'}
      </button>
    </form>
  );
}
