
import { ChevronRight, Code, Palette, PenTool, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";

const Index = () => {
  // Sample services data
  const services = [
    {
      icon: <Code className="h-10 w-10 text-cortejtech-purple" />,
      title: "Web Development",
      description: "Custom websites, e-commerce platforms, and web applications designed to perform and convert."
    },
    {
      icon: <Smartphone className="h-10 w-10 text-cortejtech-purple" />,
      title: "App Development",
      description: "Native and cross-platform mobile applications that engage users and drive business growth."
    },
    {
      icon: <PenTool className="h-10 w-10 text-cortejtech-purple" />,
      title: "UI/UX Design",
      description: "User-centered design solutions that create seamless, intuitive digital experiences."
    },
    {
      icon: <Palette className="h-10 w-10 text-cortejtech-purple" />,
      title: "Graphic Design",
      description: "Captivating visual identities, marketing materials, and brand assets that stand out."
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-cortejtech-black py-20 text-white md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Transforming Ideas Into <span className="text-cortejtech-purple">Digital Reality</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              We're a modern digital agency specializing in web development, app development, 
              graphic design, and UI/UX design. Let's build something amazing together.
            </p>
            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Button 
                asChild 
                size="lg"
                className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
              >
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              We offer a wide range of digital services to help your business grow and succeed online.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div 
                key={index}
                className="rounded-lg bg-white p-8 shadow-lg transition-transform hover:translate-y-[-8px]"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button 
              asChild 
              className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
            >
              <Link to="/services" className="inline-flex items-center">
                View All Services <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cortejtech-purple py-20 text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to Start Your Next Project?
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              Get in touch with us today and let's create something extraordinary together.
            </p>
            <div className="mt-10">
              <Button 
                asChild 
                size="lg"
                className="bg-white text-cortejtech-purple hover:bg-white/90"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (simplified) */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-gray-600">
              Don't just take our word for it. Hear what our clients have to say about working with us.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-cortejtech-gray"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">CEO, TechStart</p>
                </div>
              </div>
              <p className="text-gray-600">
                "CortejTech transformed our outdated website into a powerful sales tool. 
                Their team was professional, creative, and delivered beyond our expectations."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-cortejtech-gray"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Michael Wong</h4>
                  <p className="text-sm text-gray-600">Founder, InnovateCo</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Working with CortejTech on our mobile app was a game-changer. 
                Their attention to detail and user-focused approach resulted in an 
                app that our customers love."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-cortejtech-gray"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-600">Marketing Director, GrowthBiz</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The branding and design work from CortejTech helped us stand out 
                in a crowded market. Their team understood our vision and delivered 
                exceptional results."
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
