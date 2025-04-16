
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";

const Portfolio = () => {
  // Categories for filtering
  const categories = ["All", "Web Development", "App Development", "UI/UX Design", "Graphic Design"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Sample portfolio projects data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      client: "ShopEase",
      category: "Web Development",
      description: "A fully responsive e-commerce platform with secure payment integration.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Food Delivery App",
      client: "QuickBite",
      category: "App Development",
      description: "A cross-platform mobile app for food ordering and delivery tracking.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Corporate Brand Identity",
      client: "NexusCore",
      category: "Graphic Design",
      description: "Complete brand identity package including logo, business cards, and marketing materials.",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Financial Dashboard",
      client: "WealthTrack",
      category: "UI/UX Design",
      description: "Intuitive dashboard interface for personal financial management.",
      image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Healthcare Platform",
      client: "MediCare",
      category: "Web Development",
      description: "Accessible healthcare platform connecting patients with doctors.",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Smart Home App",
      client: "HomeControl",
      category: "App Development",
      description: "IoT mobile application for controlling smart home devices.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Filter projects by category
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-cortejtech-black py-20 text-white md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Our <span className="text-cortejtech-purple">Portfolio</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              Explore our latest work and see how we've helped businesses transform their digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          {/* Category Tabs */}
          <Tabs defaultValue="All" className="mb-12">
            <TabsList className="mx-auto flex justify-center">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-6"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-cortejtech-purple/70 p-6 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <p className="mt-2">{project.description}</p>
                      <Button 
                        asChild 
                        className="mt-4 bg-white text-cortejtech-purple hover:bg-white/90"
                      >
                        <Link to={`/portfolio/${project.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-xl font-bold">{project.title}</h3>
                  <p className="mb-3 text-cortejtech-purple">{project.client}</p>
                  <p className="text-gray-600">{project.category}</p>
                </div>
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
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              Let's build something amazing together. Contact us to discuss your project requirements.
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

export default Portfolio;
