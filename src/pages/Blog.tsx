
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample blog posts data
  const posts = [
    {
      id: 1,
      title: "10 UI/UX Trends to Watch in 2023",
      excerpt: "Explore the latest trends in user interface and experience design that are shaping the digital landscape in 2023.",
      date: "May 15, 2023",
      author: "Priya Patel",
      tags: ["UI/UX", "Design", "Trends"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "The Future of Web Development with AI",
      excerpt: "How artificial intelligence is revolutionizing web development practices and what this means for developers and businesses.",
      date: "April 28, 2023",
      author: "Ankit Sharma",
      tags: ["AI", "Web Development", "Technology"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Mobile-First Approach: Why It Matters",
      excerpt: "Understanding the importance of designing for mobile users first and how it impacts your overall digital strategy.",
      date: "April 12, 2023",
      author: "Dev Kapoor",
      tags: ["Mobile", "Design", "Strategy"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Optimizing Website Performance: Best Practices",
      excerpt: "Learn essential techniques to improve your website's speed, responsiveness, and overall performance.",
      date: "March 25, 2023",
      author: "Zara Khan",
      tags: ["Performance", "Web Development", "Optimization"],
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "E-commerce UX: Converting Visitors to Customers",
      excerpt: "Effective user experience strategies that can help increase conversion rates on your e-commerce platform.",
      date: "March 10, 2023",
      author: "Priya Patel",
      tags: ["E-commerce", "UX", "Conversion"],
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "The Power of Visual Storytelling in Branding",
      excerpt: "How effective visual narratives can strengthen your brand identity and connect with your audience on a deeper level.",
      date: "February 28, 2023",
      author: "Ankit Sharma",
      tags: ["Branding", "Design", "Marketing"],
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get all unique tags for the tag cloud
  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-cortejtech-black py-20 text-white md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Our <span className="text-cortejtech-purple">Blog</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              Insights, tips, and news from the world of digital technology, design, and development.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
            {/* Main Content - Blog Posts */}
            <div className="lg:col-span-2">
              {/* Search Bar (Mobile) */}
              <div className="mb-8 lg:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
              </div>

              {/* Blog Posts Grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2">
                  {filteredPosts.map((post) => (
                    <article 
                      key={post.id} 
                      className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl"
                    >
                      <Link to={`/blog/${post.id}`} className="block">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="h-48 w-full object-cover transition-transform hover:scale-105" 
                        />
                      </Link>
                      <div className="p-6">
                        <div className="mb-4 flex items-center text-sm text-gray-500">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.author}</span>
                        </div>
                        <Link to={`/blog/${post.id}`} className="block">
                          <h2 className="mb-3 text-xl font-bold hover:text-cortejtech-purple">{post.title}</h2>
                        </Link>
                        <p className="mb-4 text-gray-600">{post.excerpt}</p>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          asChild 
                          variant="link"
                          className="p-0 text-cortejtech-purple hover:text-cortejtech-purple/80"
                        >
                          <Link to={`/blog/${post.id}`}>Read More</Link>
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg bg-white p-10 text-center shadow-md">
                  <h3 className="mb-3 text-xl font-semibold">No results found</h3>
                  <p className="text-gray-600">
                    We couldn't find any posts matching your search. Try using different keywords or browse all our posts.
                  </p>
                  <Button 
                    className="mt-4 bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                    onClick={() => setSearchQuery("")}
                  >
                    View All Posts
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Search Bar (Desktop) */}
              <div className="hidden rounded-lg bg-white p-6 shadow-md lg:block">
                <h3 className="mb-4 text-lg font-semibold">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
              </div>

              {/* Recent Posts */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-4 text-lg font-semibold">Recent Posts</h3>
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-start gap-3">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="h-16 w-16 rounded-md object-cover" 
                      />
                      <div>
                        <Link 
                          to={`/blog/${post.id}`}
                          className="font-medium hover:text-cortejtech-purple"
                        >
                          {post.title}
                        </Link>
                        <p className="text-sm text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-4 text-lg font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className="cursor-pointer bg-gray-100 hover:bg-cortejtech-purple hover:text-white"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Subscribe */}
              <div className="rounded-lg bg-cortejtech-purple p-6 text-white shadow-md">
                <h3 className="mb-4 text-lg font-semibold text-white">Subscribe to Our Newsletter</h3>
                <p className="mb-4">Get the latest articles and news delivered to your inbox.</p>
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="mb-3 border-white bg-cortejtech-purple/50 text-white placeholder:text-white/70"
                />
                <Button className="w-full bg-white text-cortejtech-purple hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Blog;
