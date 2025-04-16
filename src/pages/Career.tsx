
import { useState } from "react";
import { ChevronDown, ChevronUp, Briefcase, MapPin, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "@/components/layout/MainLayout";

interface JobListing {
  id: number;
  title: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  location: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
}

const Career = () => {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("All");
  const [filterDepartment, setFilterDepartment] = useState<string>("All");

  // Sample job listings data
  const jobListings: JobListing[] = [
    {
      id: 1,
      title: "Senior React Developer",
      type: "Full-time",
      location: "Gurgaon, India (Hybrid)",
      department: "Development",
      description: "We're looking for a skilled Senior React Developer to join our development team. You'll work on cutting-edge web applications for our clients across various industries.",
      responsibilities: [
        "Develop high-quality web applications using React.js and related technologies",
        "Collaborate with designers, product managers, and other developers",
        "Write clean, scalable, and maintainable code",
        "Troubleshoot and debug applications",
        "Implement responsive design and ensure cross-browser compatibility"
      ],
      requirements: [
        "4+ years of experience with React.js",
        "Strong proficiency in JavaScript, HTML, and CSS",
        "Experience with state management libraries (Redux, Context API)",
        "Understanding of RESTful APIs and integration",
        "Knowledge of modern front-end build pipelines and tools",
        "Bachelor's degree in Computer Science or related field (or equivalent experience)"
      ],
      postedDate: "2023-04-10"
    },
    {
      id: 2,
      title: "UI/UX Designer",
      type: "Full-time",
      location: "Gurgaon, India (On-site)",
      department: "Design",
      description: "We're seeking a talented UI/UX Designer to create engaging and intuitive user experiences for our clients' digital products.",
      responsibilities: [
        "Create user flows, wireframes, prototypes, and mockups",
        "Translate requirements into style guides, design systems, and UI components",
        "Design UI elements and mockups that clearly illustrate product functionality",
        "Collaborate with developers to implement designs",
        "Conduct user research and testing"
      ],
      requirements: [
        "3+ years of experience in UI/UX design",
        "Proficiency in design tools (Figma, Adobe XD, Sketch)",
        "Strong portfolio demonstrating UI/UX projects",
        "Understanding of user-centered design principles",
        "Knowledge of HTML/CSS/JavaScript is a plus",
        "Bachelor's degree in Design, Computer Science, or related field"
      ],
      postedDate: "2023-04-05"
    },
    {
      id: 3,
      title: "Digital Marketing Specialist",
      type: "Full-time",
      location: "Remote (India)",
      department: "Marketing",
      description: "Join our marketing team to plan and execute digital marketing campaigns that drive results for our clients.",
      responsibilities: [
        "Develop and manage digital marketing campaigns",
        "Manage social media accounts and content strategy",
        "Analyze campaign performance and optimize for better results",
        "Conduct keyword research and implement SEO strategies",
        "Create and manage PPC campaigns"
      ],
      requirements: [
        "2+ years of experience in digital marketing",
        "Knowledge of SEO, SEM, and social media marketing",
        "Experience with analytics tools (Google Analytics, Facebook Insights)",
        "Strong copywriting and communication skills",
        "Understanding of conversion rate optimization",
        "Bachelor's degree in Marketing, Business, or related field"
      ],
      postedDate: "2023-03-28"
    },
    {
      id: 4,
      title: "Backend Developer (Node.js)",
      type: "Full-time",
      location: "Gurgaon, India (Hybrid)",
      department: "Development",
      description: "We're looking for a Backend Developer with Node.js expertise to build scalable and efficient server-side applications.",
      responsibilities: [
        "Design and develop scalable backend services and APIs",
        "Integrate with database systems and external services",
        "Implement security and data protection",
        "Optimize applications for performance and scalability",
        "Collaborate with frontend developers and other team members"
      ],
      requirements: [
        "3+ years of experience with Node.js",
        "Proficiency with databases (MongoDB, MySQL, PostgreSQL)",
        "Experience with RESTful API design",
        "Knowledge of server security and performance tuning",
        "Understanding of containerization and cloud services",
        "Bachelor's degree in Computer Science or related field"
      ],
      postedDate: "2023-03-25"
    },
    {
      id: 5,
      title: "Graphic Designer",
      type: "Part-time",
      location: "Remote (India)",
      department: "Design",
      description: "We're looking for a creative Graphic Designer to create visual content for digital and print media.",
      responsibilities: [
        "Create graphics for websites, social media, and marketing materials",
        "Design logos, icons, and other brand assets",
        "Maintain brand consistency across all materials",
        "Collaborate with marketing and web development teams",
        "Stay up-to-date with design trends and technologies"
      ],
      requirements: [
        "2+ years of experience in graphic design",
        "Proficiency in Adobe Creative Suite",
        "Strong portfolio demonstrating graphic design projects",
        "Understanding of design principles and typography",
        "Ability to work independently and meet deadlines",
        "Degree or diploma in Graphic Design or related field"
      ],
      postedDate: "2023-03-20"
    },
    {
      id: 6,
      title: "Mobile App Developer (Flutter)",
      type: "Contract",
      location: "Remote (Worldwide)",
      department: "Development",
      description: "We're seeking a Flutter Developer to build cross-platform mobile applications for our clients.",
      responsibilities: [
        "Develop mobile applications using Flutter framework",
        "Implement UI/UX designs into functional apps",
        "Integrate with backend services and APIs",
        "Test and debug applications on different devices",
        "Work with team members to plan and execute development projects"
      ],
      requirements: [
        "2+ years of experience with Flutter development",
        "Strong knowledge of Dart programming language",
        "Experience with state management in Flutter",
        "Understanding of native Android and iOS development",
        "Ability to optimize application performance",
        "Bachelor's degree in Computer Science or related field"
      ],
      postedDate: "2023-03-15"
    },
    {
      id: 7,
      title: "Content Writer",
      type: "Internship",
      location: "Remote (India)",
      department: "Marketing",
      description: "Join our team as a Content Writing Intern to create engaging content for websites, blogs, and social media.",
      responsibilities: [
        "Research and write blog posts, articles, and website content",
        "Create copy for social media posts and advertisements",
        "Assist with content strategy and planning",
        "Edit and proofread content for grammar and clarity",
        "Collaborate with designers and marketers"
      ],
      requirements: [
        "Excellent writing and editing skills",
        "Strong research abilities",
        "Knowledge of SEO principles",
        "Creativity and attention to detail",
        "Currently pursuing or recently completed degree in English, Communications, or related field",
        "Writing samples or portfolio"
      ],
      postedDate: "2023-03-10"
    }
  ];

  // Filter job listings based on selected filters
  const filteredJobs = jobListings.filter(job => 
    (filterType === "All" || job.type === filterType) &&
    (filterDepartment === "All" || job.department === filterDepartment)
  );

  // Get unique departments for filter dropdown
  const departments = ["All", ...new Set(jobListings.map(job => job.department))];
  
  // Get unique job types for filter dropdown
  const jobTypes = ["All", ...new Set(jobListings.map(job => job.type))];

  // Toggle job details expansion
  const toggleJobExpansion = (jobId: number) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-cortejtech-black py-20 text-white md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Join Our <span className="text-cortejtech-purple">Team</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              Explore exciting career opportunities at CortejTech and be part of a team that's building the future of digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Career Content Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            {/* Job Listings Header */}
            <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
              <h2 className="text-2xl font-bold md:text-3xl">Current Openings</h2>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Filter by:</span>
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Listings */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                  >
                    {/* Job Header - Always visible */}
                    <div 
                      className="flex cursor-pointer flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center"
                      onClick={() => toggleJobExpansion(job.id)}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-cortejtech-purple/10 px-3 py-1 text-xs font-medium text-cortejtech-purple">
                            {job.type}
                          </span>
                          <span className="text-sm text-gray-500">
                            Posted: {formatDate(job.postedDate)}
                          </span>
                        </div>
                        <h3 className="mt-2 text-xl font-bold">{job.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Briefcase className="h-4 w-4 text-gray-400" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button 
                          asChild
                          className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                        >
                          <Link to={`/careers/${job.id}`}>Apply Now</Link>
                        </Button>
                        {expandedJob === job.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Job Details - Expandable */}
                    {expandedJob === job.id && (
                      <div className="border-t border-gray-200 p-6">
                        <div className="mb-6">
                          <h4 className="mb-2 font-semibold">Job Description</h4>
                          <p className="text-gray-600">{job.description}</p>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="mb-2 font-semibold">Responsibilities</h4>
                          <ul className="list-inside list-disc space-y-1 text-gray-600">
                            {job.responsibilities.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="mb-2 font-semibold">Requirements</h4>
                          <ul className="list-inside list-disc space-y-1 text-gray-600">
                            {job.requirements.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button 
                          asChild 
                          className="mt-4 bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                        >
                          <Link to={`/careers/${job.id}`}>Apply for this Position</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-10 text-center shadow-md">
                <h3 className="mb-4 text-xl font-semibold">No Current Openings</h3>
                <p className="text-gray-600">
                  We don't have any open positions matching your filters at the moment. Please check back later or send your resume for future opportunities.
                </p>
                <Button 
                  asChild 
                  className="mt-6 bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            )}

            {/* No Suitable Positions */}
            <div className="mt-16 rounded-lg bg-gray-50 p-8 text-center">
              <h3 className="text-xl font-bold md:text-2xl">Don't See a Suitable Position?</h3>
              <p className="mt-2 text-gray-600">
                We're always looking for talented professionals to join our team. Send us your resume, and we'll keep it on file for future opportunities.
              </p>
              <Button 
                asChild 
                className="mt-6 bg-cortejtech-purple hover:bg-cortejtech-purple/90"
              >
                <Link to="/contact">Send Your Resume</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Life at CortejTech</h2>
            <p className="mt-4 text-lg text-gray-600">
              We believe in creating a positive and collaborative environment where talent thrives and innovation flourishes.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Culture Point 1 */}
            <div className="rounded-lg bg-white p-8 text-center shadow-lg">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cortejtech-purple text-white">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Flexible Work</h3>
              <p className="text-gray-600">
                We offer flexible working arrangements, including remote work options and flexible hours, to help you maintain work-life balance.
              </p>
            </div>

            {/* Culture Point 2 */}
            <div className="rounded-lg bg-white p-8 text-center shadow-lg">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cortejtech-purple text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Growth & Learning</h3>
              <p className="text-gray-600">
                We invest in continuous learning and professional development, helping our team members stay at the cutting edge of technology.
              </p>
            </div>

            {/* Culture Point 3 */}
            <div className="rounded-lg bg-white p-8 text-center shadow-lg">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cortejtech-purple text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Collaborative Culture</h3>
              <p className="text-gray-600">
                We foster a collaborative environment where ideas are shared freely and every team member contributes to our success.
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
              Ready to Grow With Us?
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              Explore our current openings and take the next step in your career at CortejTech.
            </p>
            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Button 
                size="lg"
                className="bg-white text-cortejtech-purple hover:bg-white/90"
                onClick={() => {
                  const jobListingsElement = document.querySelector('h2');
                  jobListingsElement?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Openings
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/contact">Contact HR</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Career;
