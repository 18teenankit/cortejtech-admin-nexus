
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";

const Process = () => {
  // Sample process steps data
  const processSteps = [
    {
      number: 1,
      title: "Discovery",
      description: "We start by understanding your business, goals, target audience, and requirements to create a tailored strategy.",
      features: [
        "Initial consultation",
        "Business analysis",
        "Goal setting",
        "Requirements gathering"
      ]
    },
    {
      number: 2,
      title: "Planning",
      description: "We create a detailed plan that includes timelines, deliverables, and key milestones for your project.",
      features: [
        "Project scope definition",
        "Timeline planning",
        "Resource allocation",
        "Technology selection"
      ]
    },
    {
      number: 3,
      title: "Design",
      description: "Our design team creates mockups and prototypes to visualize the project before development begins.",
      features: [
        "Wireframing",
        "UI/UX design",
        "Prototype development", 
        "Client approval process"
      ]
    },
    {
      number: 4,
      title: "Development",
      description: "Our development team brings the designs to life with clean, efficient, and scalable code.",
      features: [
        "Frontend development",
        "Backend implementation",
        "API integration",
        "Regular progress updates"
      ]
    },
    {
      number: 5,
      title: "Testing",
      description: "We rigorously test all aspects of your project to ensure it works perfectly across all devices and browsers.",
      features: [
        "Quality assurance",
        "Compatibility testing",
        "Performance testing",
        "Security testing"
      ]
    },
    {
      number: 6,
      title: "Deployment",
      description: "We handle the launch of your project, ensuring a smooth transition to your new digital solution.",
      features: [
        "Deployment preparation",
        "Server configuration",
        "Domain setup",
        "Go-live support"
      ]
    },
    {
      number: 7,
      title: "Support & Maintenance",
      description: "Our relationship doesn't end at launch. We provide ongoing support and maintenance to keep your project running smoothly.",
      features: [
        "Post-launch monitoring",
        "Regular updates",
        "Performance optimization",
        "Ongoing technical support"
      ]
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-cortejtech-black py-20 text-white md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Our <span className="text-cortejtech-purple">Process</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              We follow a proven process to ensure every project is completed efficiently and effectively.
              Here's how we turn your vision into reality.
            </p>
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            {processSteps.map((step, index) => (
              <div 
                key={step.number} 
                className={`relative mb-16 flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 md:gap-16`}
              >
                {/* Number Circle */}
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-cortejtech-purple text-white">
                  <span className="text-2xl font-bold">{step.number}</span>
                </div>

                {/* Line connector (hidden on mobile) */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-[39px] top-20 hidden h-[calc(100%+4rem)] w-0.5 bg-gray-200 md:block"></div>
                )}

                {/* Content */}
                <div className={`w-full rounded-lg bg-white p-8 shadow-lg ${
                  index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                }`}>
                  <h2 className="text-2xl font-bold md:text-3xl">{step.title}</h2>
                  <p className="mt-4 text-gray-600">{step.description}</p>
                  
                  {/* Features */}
                  <div className={`mt-6 grid gap-3 sm:grid-cols-2 ${
                    index % 2 === 0 ? '' : 'md:justify-items-end'
                  }`}>
                    {step.features.map((feature, i) => (
                      <div 
                        key={i} 
                        className={`flex items-center gap-2 ${
                          index % 2 === 1 ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        <CheckCircle className="h-5 w-5 text-cortejtech-purple" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Process Works Section */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Why Our Process Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our process is designed to deliver results while keeping you informed and involved every step of the way.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Benefit 1 */}
            <div className="rounded-lg bg-white p-8 text-center shadow-lg">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cortejtech-purple text-white">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="mb-3 text-xl font-bold">Transparent Communication</h3>
              <p className="text-gray-600">
                We maintain open and honest communication throughout the project, keeping you informed at every stage.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="rounded-lg bg-white p-8 text-center shadow-lg">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cortejtech-purple text-white">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="mb-3 text-xl font-bold">Client Involvement</h3>
              <p className="text-gray-600">
                We believe in collaborative development, involving you in key decisions to ensure the final product meets your vision.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="rounded-lg bg-white p-8 text-center shadow-lg">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cortejtech-purple text-white">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="mb-3 text-xl font-bold">Iterative Approach</h3>
              <p className="text-gray-600">
                Our process allows for refinement and improvement throughout development, ensuring the best possible outcome.
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
              Let's work together to bring your vision to life. Our proven process ensures a successful outcome.
            </p>
            <div className="mt-10">
              <Button 
                asChild 
                size="lg"
                className="bg-white text-cortejtech-purple hover:bg-white/90"
              >
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Process;
