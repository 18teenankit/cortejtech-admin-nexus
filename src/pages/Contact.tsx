
import MainLayout from "@/components/layout/MainLayout";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "info@cortejtech.com",
    phone: "+91 9868-555-0123",
    address: "123 Tech Park, Sector 42, Gurgaon, Haryana 122001, India"
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      const { data: settingsData, error } = await supabase
        .from('settings')
        .select('key, value')
        .in('key', ['contact_email', 'contact_phone', 'contact_address']);

      if (!error && settingsData) {
        const newContactInfo = settingsData.reduce((acc: any, { key, value }) => {
          if (key === 'contact_email') acc.email = value;
          if (key === 'contact_phone') acc.phone = value;
          if (key === 'contact_address') acc.address = value;
          return acc;
        }, { ...contactInfo });

        setContactInfo(newContactInfo);
      }
    };

    fetchContactInfo();
  }, []);

  // Contact information
  const contactDetails = [
    {
      icon: <Phone className="h-5 w-5 text-cortejtech-purple" />,
      title: "Phone",
      details: [contactInfo.phone]
    },
    {
      icon: <Mail className="h-5 w-5 text-cortejtech-purple" />,
      title: "Email",
      details: [contactInfo.email]
    },
    {
      icon: <MapPin className="h-5 w-5 text-cortejtech-purple" />,
      title: "Address",
      details: [contactInfo.address]
    },
    {
      icon: <Clock className="h-5 w-5 text-cortejtech-purple" />,
      title: "Working Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 2:00 PM"]
    }
  ];

  // Social media links
  const socialMedia = [
    { icon: <Facebook className="h-5 w-5" />, url: "https://facebook.com", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, url: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, url: "https://instagram.com", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com", label: "LinkedIn" }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-cortejtech-black py-20 text-white md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Contact <span className="text-cortejtech-purple">Us</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              Have questions or want to discuss your project? Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold md:text-3xl">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="mb-6 text-2xl font-bold md:text-3xl">Contact Information</h2>
              <div className="mb-10 space-y-6">
                {contactDetails.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-cortejtech-purple hover:text-white"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map (Placeholder) */}
              <div className="mt-10 h-64 rounded-lg bg-gray-200">
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-500">Map will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cortejtech-purple py-20 text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              Let's work together to bring your vision to life. Our team is ready to help.
            </p>
            <div className="mt-10">
              <Button 
                size="lg"
                className="bg-white text-cortejtech-purple hover:bg-white/90"
                onClick={() => {
                  const formElement = document.querySelector('form');
                  formElement?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
