
import { Users, Award, Lightbulb, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";

const About = () => {
  // Sample values data
  const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-cortejtech-purple" />,
      title: "Innovation",
      description: "We embrace new technologies and creative approaches to deliver cutting-edge solutions."
    },
    {
      icon: <Target className="h-8 w-8 text-cortejtech-purple" />,
      title: "Excellence",
      description: "We strive for excellence in every project, focusing on quality and attention to detail."
    },
    {
      icon: <Users className="h-8 w-8 text-cortejtech-purple" />,
      title: "Collaboration",
      description: "We work closely with our clients, treating their goals as our own."
    },
    {
      icon: <Award className="h-8 w-8 text-cortejtech-purple" />,
      title: "Integrity",
      description: "We operate with transparency, honesty, and accountability in all our interactions."
    }
  ];

  // Sample team data
  const team = [
    {
      name: "Ankit Sharma",
      role: "Founder & CEO",
      bio: "With over 15 years of experience in digital innovation, Ankit leads our team with vision and expertise."
    },
    {
      name: "Priya Patel",
      role: "Creative Director",
      bio: "Priya brings creative excellence to every project, ensuring our designs are both beautiful and functional."
    },
    {
      name: "Dev Kapoor",
      role: "Lead Developer",
      bio: "Dev's technical knowledge and problem-solving abilities help bring complex digital projects to life."
    },
    {
      name: "Zara Khan",
      role: "UX Specialist",
      bio: "Zara's keen understanding of user behavior helps create intuitive and engaging digital experiences."
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-cortejtech-black py-20 text-white md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              About <span className="text-cortejtech-purple">CortejTech</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              We're a team of passionate digital experts dedicated to helping businesses grow through 
              innovative technology solutions and creative design.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Our Mission</h2>
              <p className="mt-6 text-lg text-gray-600 md:text-xl">
                At CortejTech, our mission is to empower businesses through transformative digital solutions 
                that connect, engage, and inspire. We bridge the gap between technical expertise and creative design, 
                helping our clients thrive in the digital landscape.
              </p>
            </div>

            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Our Story</h2>
              <p className="mt-6 text-lg text-gray-600">
                Founded in 2018, CortejTech began with a simple vision: to create digital experiences that make 
                a difference. What started as a small team of passionate developers and designers has grown into 
                a full-service digital agency serving clients across multiple industries.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                We believe that great technology should be accessible to businesses of all sizes. That's why we 
                combine technical excellence with strategic thinking to deliver solutions that are not only visually 
                stunning but also drive real business results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-gray-600">
              These core principles guide everything we do at CortejTech.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div 
                key={index}
                className="rounded-lg bg-white p-8 shadow-lg transition-all hover:border-t-4 hover:border-cortejtech-purple"
              >
                <div className="mb-6">{value.icon}</div>
                <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">
              Meet the talented professionals behind CortejTech's success.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div 
                key={index}
                className="rounded-lg bg-white p-8 shadow-lg text-center"
              >
                <div className="mx-auto mb-6 h-32 w-32 rounded-full bg-cortejtech-gray"></div>
                <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                <p className="mb-4 text-cortejtech-purple">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cortejtech-purple py-20 text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Want to Work With Us?
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              Let's collaborate to bring your digital vision to life. Contact us today to get started.
            </p>
            <div className="mt-10">
              <Button 
                asChild 
                size="lg"
                className="bg-white text-cortejtech-purple hover:bg-white/90"
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
