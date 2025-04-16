
import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItems, setOpenItems] = useState<number[]>([]);

  // Sample FAQ categories
  const categories = ["All", "Services", "Process", "Pricing", "Technical"];

  // Sample FAQ data
  const faqData: FAQItem[] = [
    {
      question: "What services does CortejTech offer?",
      answer: "CortejTech offers a range of digital services including Web Development, App Development, UI/UX Design, and Graphic Design. We also provide Web Hosting, Digital Marketing, SEO Services, and ongoing Maintenance & Support.",
      category: "Services"
    },
    {
      question: "How long does it take to complete a typical project?",
      answer: "Project timelines vary depending on the scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months. During our initial consultation, we'll provide a detailed timeline based on your specific requirements.",
      category: "Process"
    },
    {
      question: "What is your pricing structure?",
      answer: "We offer flexible pricing models including fixed-price quotes for well-defined projects and hourly rates for ongoing work. We tailor our approach to fit your budget and project needs. For a specific quote, please contact us with your project details.",
      category: "Pricing"
    },
    {
      question: "Do you offer website maintenance services?",
      answer: "Yes, we provide comprehensive website maintenance services including security updates, performance optimization, content updates, and technical support. We offer monthly maintenance packages to keep your website secure, up-to-date, and performing optimally.",
      category: "Services"
    },
    {
      question: "What is your design process like?",
      answer: "Our design process starts with understanding your business goals and target audience. We then create wireframes, followed by design mockups for your approval. After revisions, we move to development. Throughout the process, we maintain open communication and regular updates.",
      category: "Process"
    },
    {
      question: "Can you help with an existing website or app?",
      answer: "Absolutely! We can take over existing projects for updates, redesigns, or ongoing maintenance. Our team will assess the current state of your website or app and recommend improvements or fixes as needed.",
      category: "Services"
    },
    {
      question: "What technologies do you use for development?",
      answer: "We use modern, industry-standard technologies for our projects. For web development, we work with React, Angular, Vue.js, Node.js, PHP, and more. For mobile apps, we develop using React Native, Flutter, Swift, and Kotlin. We select the best technology stack based on your specific project requirements.",
      category: "Technical"
    },
    {
      question: "Do you provide hosting for websites?",
      answer: "Yes, we offer reliable, secure, and scalable hosting solutions for websites and applications. Our hosting services include regular backups, security monitoring, and technical support to ensure your website remains fast, secure, and always online.",
      category: "Services"
    },
    {
      question: "How do you handle revisions during the project?",
      answer: "We include a set number of revision rounds in our project quotes. During each milestone (wireframes, designs, development), you'll have the opportunity to provide feedback and request changes. Additional revisions beyond the included rounds can be accommodated at our hourly rate.",
      category: "Process"
    },
    {
      question: "What is your payment schedule?",
      answer: "For most projects, we require a 50% deposit to begin work, with the remaining balance due upon project completion. For larger projects, we may establish a milestone-based payment schedule. We accept payments via bank transfer, credit card, and PayPal.",
      category: "Pricing"
    },
    {
      question: "Do you sign NDAs for confidential projects?",
      answer: "Yes, we're happy to sign Non-Disclosure Agreements (NDAs) to protect your confidential information and project details. Client confidentiality is something we take very seriously.",
      category: "Process"
    },
    {
      question: "What happens after my website or app is launched?",
      answer: "After launch, we provide a handover document with all necessary information. We offer a warranty period to fix any issues and can provide ongoing maintenance and support packages to ensure your digital assets continue to perform optimally.",
      category: "Technical"
    }
  ];

  // Toggle FAQ item open/closed
  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index) 
        : [...prev, index]
    );
  };

  // Filter FAQ items based on search query and active category
  const filteredFAQs = faqData.filter(item => 
    (activeCategory === "All" || item.category === activeCategory) &&
    (item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-cortejtech-black py-20 text-white md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Frequently Asked <span className="text-cortejtech-purple">Questions</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              Find answers to common questions about our services, process, and more.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            {/* Search and Filter */}
            <div className="mb-12 rounded-lg bg-white p-6 shadow-md">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={activeCategory === category ? "bg-cortejtech-purple hover:bg-cortejtech-purple/90" : ""}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="rounded-lg border border-gray-200 bg-white transition-all"
                  >
                    <button
                      className="flex w-full items-center justify-between p-6 text-left font-semibold"
                      onClick={() => toggleItem(index)}
                    >
                      <span>{faq.question}</span>
                      {openItems.includes(index) ? (
                        <ChevronUp className="h-5 w-5 text-cortejtech-purple" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-cortejtech-purple" />
                      )}
                    </button>
                    {openItems.includes(index) && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-white p-10 text-center shadow-md">
                <h3 className="mb-3 text-xl font-semibold">No results found</h3>
                <p className="text-gray-600">
                  We couldn't find any questions matching your search. Try using different keywords or browsing by category.
                </p>
                <Button 
                  className="mt-4 bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                >
                  View All Questions
                </Button>
              </div>
            )}

            {/* Still Have Questions */}
            <div className="mt-16 rounded-lg bg-gray-50 p-8 text-center">
              <h3 className="text-xl font-bold md:text-2xl">Still Have Questions?</h3>
              <p className="mt-2 text-gray-600">
                If you couldn't find the answer you were looking for, please contact us directly.
              </p>
              <Button 
                asChild 
                className="mt-6 bg-cortejtech-purple hover:bg-cortejtech-purple/90"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FAQ;
