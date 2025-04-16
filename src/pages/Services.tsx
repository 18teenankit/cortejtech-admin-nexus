
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { Code, Smartphone, PenTool, Palette, Server, BarChart, Globe, Clock } from "lucide-react";

const Services = () => {
  // Sample services data
  const services = [
    {
      icon: <Code className="h-12 w-12 text-cortejtech-purple" />,
      title: "Web Development",
      description: "Custom websites, e-commerce platforms, and web applications designed to perform and convert.",
      features: ["Responsive Design", "Custom CMS Integration", "E-commerce Solutions", "API Development"]
    },
    {
      icon: <Smartphone className="h-12 w-12 text-cortejtech-purple" />,
      title: "App Development",
      description: "Native and cross-platform mobile applications that engage users and drive business growth.",
      features: ["iOS & Android Apps", "Cross-platform Development", "UI/UX Design", "App Maintenance"]
    },
    {
      icon: <PenTool className="h-12 w-12 text-cortejtech-purple" />,
      title: "UI/UX Design",
      description: "User-centered design solutions that create seamless, intuitive digital experiences.",
      features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"]
    },
    {
      icon: <Palette className="h-12 w-12 text-cortejtech-purple" />,
      title: "Graphic Design",
      description: "Captivating visual identities, marketing materials, and brand assets that stand out.",
      features: ["Logo Design", "Brand Identity", "Print Materials", "Digital Assets"]
    },
    {
      icon: <Server className="h-12 w-12 text-cortejtech-purple" />,
      title: "Web Hosting",
      description: "Reliable, secure, and scalable hosting solutions for websites and web applications.",
      features: ["Cloud Hosting", "Server Management", "Security Updates", "Performance Optimization"]
    },
    {
      icon: <BarChart className="h-12 w-12 text-cortejtech-purple" />,
      title: "Digital Marketing",
      description: "Strategic digital marketing services to help you reach and engage your target audience.",
      features: ["SEO", "Content Marketing", "Social Media", "Email Campaigns"]
    },
    {
      icon: <Globe className="h-12 w-12 text-cortejtech-purple" />,
      title: "SEO Services",
      description: "Improve your online visibility and drive organic traffic to your website.",
      features: ["Keyword Research", "On-page SEO", "Link Building", "SEO Audits"]
    },
    {
      icon: <Clock className="h-12 w-12 text-cortejtech-purple" />,
      title: "Maintenance & Support",
      description: "Ongoing maintenance and support to keep your digital assets running smoothly.",
      features: ["Security Updates", "Bug Fixes", "Performance Optimization", "24/7 Support"]
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-cortejtech-black py-20 text-white md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Our <span className="text-cortejtech-purple">Services</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              We offer a comprehensive range of digital services to help your business
              thrive in the online world. From web development to design, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-cortejtech-purple"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-cortejtech-purple hover:bg-cortejtech-purple/90">
                    <Link to="/contact">Request Service</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Process</h2>
            <p className="mt-4 text-lg text-gray-600">
              We follow a proven process to ensure every project is completed efficiently and effectively.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cortejtech-purple text-white">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="mb-3 text-xl font-bold">Discovery</h3>
              <p className="text-gray-600">
                We start by understanding your business, goals, and requirements to create a tailored strategy.
              </p>
              <div className="hidden lg:block absolute top-8 left-full h-0.5 w-full transform -translate-x-8 bg-gray-300"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cortejtech-purple text-white">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="mb-3 text-xl font-bold">Planning</h3>
              <p className="text-gray-600">
                We create a detailed plan, including timelines, deliverables, and key milestones.
              </p>
              <div className="hidden lg:block absolute top-8 left-full h-0.5 w-full transform -translate-x-8 bg-gray-300"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cortejtech-purple text-white">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="mb-3 text-xl font-bold">Execution</h3>
              <p className="text-gray-600">
                Our team gets to work, developing and designing your project with regular updates.
              </p>
              <div className="hidden lg:block absolute top-8 left-full h-0.5 w-full transform -translate-x-8 bg-gray-300"></div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cortejtech-purple text-white">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="mb-3 text-xl font-bold">Delivery</h3>
              <p className="text-gray-600">
                We finalize and launch your project, followed by support and maintenance as needed.
              </p>
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
              Contact us today to discuss your requirements and get a custom quote.
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
    </MainLayout>
  );
};

export default Services;
