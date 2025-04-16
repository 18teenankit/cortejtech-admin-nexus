
import { useState } from "react";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const Testimonials = () => {
  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStart",
      role: "CEO",
      quote: "CortejTech transformed our outdated website into a powerful sales tool. Their team was professional, creative, and delivered beyond our expectations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Michael Wong",
      company: "InnovateCo",
      role: "Founder",
      quote: "Working with CortejTech on our mobile app was a game-changer. Their attention to detail and user-focused approach resulted in an app that our customers love.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "GrowthBiz",
      role: "Marketing Director",
      quote: "The branding and design work from CortejTech helped us stand out in a crowded market. Their team understood our vision and delivered exceptional results.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "David Kim",
      company: "FinTech Solutions",
      role: "CTO",
      quote: "The development team at CortejTech is exceptional. They built a complex financial dashboard for us that is both powerful and easy to use. Highly recommended!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Sophia Martinez",
      company: "StyleHouse",
      role: "Creative Director",
      quote: "CortejTech's graphic design work for our brand was simply outstanding. They captured our essence perfectly and translated it into beautiful visuals.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "James Wilson",
      company: "HealthConnect",
      role: "Product Manager",
      quote: "We needed a complex healthcare platform built on a tight schedule. CortejTech not only delivered on time but exceeded our expectations on functionality.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Featured testimonials - first 3 for the hero section
  const featuredTestimonials = testimonials.slice(0, 3);
  
  // State for testimonial pagination
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 3;
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage);
  
  // Get current testimonials
  const getCurrentTestimonials = () => {
    const start = currentPage * testimonialsPerPage;
    const end = start + testimonialsPerPage;
    return testimonials.slice(start, end);
  };

  // Navigation functions
  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount);
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-cortejtech-black py-20 text-white md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Client <span className="text-cortejtech-purple">Testimonials</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              Don't just take our word for it. See what our clients have to say about working with CortejTech.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Featured Reviews</h2>
            <p className="mt-4 text-lg text-gray-600">
              Here's what some of our satisfied clients have to say about our services.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {featuredTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="flex flex-col rounded-lg bg-white p-8 shadow-lg"
              >
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="h-20 w-20 overflow-hidden rounded-full">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-cortejtech-purple text-white">
                      <Quote className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="mb-4 flex justify-center">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="mb-6 text-center text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="mt-auto text-center">
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-cortejtech-purple">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">More Success Stories</h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore more feedback from our valued clients about their experience working with us.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid gap-8 md:grid-cols-3">
              {getCurrentTestimonials().map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex flex-col rounded-lg bg-white p-8 shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="mb-4 flex">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="mb-6 text-gray-600 italic">"{testimonial.quote}"</p>
                  <div className="mt-auto flex items-center">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-cortejtech-purple">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12 flex justify-center space-x-4">
              <Button 
                variant="outline" 
                onClick={goToPrevPage}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                {Array(pageCount).fill(0).map((_, i) => (
                  <Button 
                    key={i}
                    variant={i === currentPage ? "default" : "outline"}
                    className={i === currentPage ? "bg-cortejtech-purple hover:bg-cortejtech-purple/90" : ""}
                    onClick={() => setCurrentPage(i)}
                    size="icon"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button 
                variant="outline" 
                onClick={goToNextPage}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cortejtech-purple py-20 text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to Join Our Success Stories?
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              Let's work together to create something amazing that exceeds your expectations.
            </p>
            <div className="mt-10">
              <Button 
                asChild 
                size="lg"
                className="bg-white text-cortejtech-purple hover:bg-white/90"
              >
                <Link to="/contact">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Testimonials;
