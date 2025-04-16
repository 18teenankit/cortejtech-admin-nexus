
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Briefcase } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";

interface JobListing {
  id: number;
  title: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  apply_link: string;
  created_at: string;
}

const Career = () => {
  const { toast } = useToast();
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noJobsMessage, setNoJobsMessage] = useState("No openings currently, check back later. Email careers@cortejtech.com.");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Try to get jobs from supabase
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setJobListings(data || []);
        
        // Try to get the no jobs message from settings
        const { data: settings } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'no_jobs_message')
          .single();
        
        if (settings) {
          setNoJobsMessage(settings.value);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        // If there's an error, use mock data as fallback
        setJobListings([
          {
            id: 1,
            title: "Senior Frontend Developer",
            type: "Full-time",
            location: "Gurgaon, India (Hybrid)",
            salary: "₹18-25 LPA",
            description: "We're looking for a skilled Senior Frontend Developer to join our team and help create stunning web experiences for our clients.",
            requirements: [
              "5+ years of experience with React, TypeScript",
              "Experience with state management libraries (Redux, Zustand)",
              "Strong UI/UX sensibilities and attention to detail",
              "Experience with CSS frameworks like Tailwind CSS"
            ],
            apply_link: "mailto:careers@cortejtech.com?subject=Application for Senior Frontend Developer",
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            title: "UI/UX Designer",
            type: "Full-time",
            location: "Remote (India)",
            salary: "₹12-18 LPA",
            description: "We're seeking a creative UI/UX Designer to craft beautiful, intuitive interfaces for web and mobile applications.",
            requirements: [
              "3+ years of experience in UI/UX design",
              "Proficiency in Figma, Sketch, or Adobe XD",
              "Strong portfolio demonstrating user-centered design",
              "Understanding of design systems and component libraries"
            ],
            apply_link: "mailto:careers@cortejtech.com?subject=Application for UI/UX Designer",
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-cortejtech-purple py-20 text-white md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Join Our <span className="text-white">Team</span>
            </h1>
            <p className="mt-6 text-lg text-gray-100 md:text-xl">
              Explore exciting career opportunities at CortejTech and be part of our innovative digital solutions journey.
            </p>
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Current Openings</h2>
              <p className="mt-4 text-gray-600">
                Join our team of creative professionals and help us build amazing digital experiences.
              </p>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-7 w-1/3 rounded-md bg-gray-200"></div>
                      <div className="h-5 w-1/4 rounded-md bg-gray-200"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 w-full rounded-md bg-gray-200"></div>
                        <div className="h-4 w-full rounded-md bg-gray-200"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : jobListings.length > 0 ? (
              <div className="space-y-6">
                {jobListings.map((job) => (
                  <Card key={job.id} className="overflow-hidden border shadow-sm transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl text-cortejtech-purple">{job.title}</CardTitle>
                        <Badge variant="outline" className="bg-cortejtech-purple/10 text-cortejtech-purple">
                          {job.type}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        <div className="flex flex-wrap items-center gap-3">
                          <span>{job.location}</span>
                          {job.salary && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span>{job.salary}</span>
                            </>
                          )}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{job.description}</p>
                      <div>
                        <h4 className="mb-2 font-semibold">Requirements:</h4>
                        <ul className="list-inside list-disc space-y-1 text-gray-700">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end bg-gray-50 px-6 py-4">
                      <Button 
                        className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                        onClick={() => {
                          window.open(job.apply_link, "_blank");
                          toast({
                            title: "Application Started",
                            description: "Good luck with your application!",
                          });
                        }}
                      >
                        Apply Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertDescription className="text-center text-lg">
                  {noJobsMessage}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </section>

      {/* Work Culture Section */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Briefcase className="mx-auto mb-6 h-12 w-12 text-cortejtech-purple" />
            <h2 className="text-3xl font-bold md:text-4xl">Our Work Culture</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              At CortejTech, we believe in fostering a culture of innovation, collaboration, and continuous learning. Join us to experience a workplace that values creativity and professional growth.
            </p>
            
            <Separator className="my-12 bg-gray-200" />
            
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-semibold text-cortejtech-purple">Innovation</h3>
                <p className="text-gray-600">We encourage thinking outside the box and exploring new ideas to create cutting-edge solutions.</p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-semibold text-cortejtech-purple">Collaboration</h3>
                <p className="text-gray-600">We believe in the power of teamwork and open communication to achieve exceptional results.</p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-semibold text-cortejtech-purple">Growth</h3>
                <p className="text-gray-600">We invest in our team's professional development and provide opportunities for continuous learning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="bg-cortejtech-purple py-20 text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Can't Find the Right Role?</h2>
            <p className="mt-4 text-lg">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button 
              size="lg" 
              className="mt-8 bg-white text-cortejtech-purple hover:bg-white/90"
              onClick={() => window.open("mailto:careers@cortejtech.com?subject=Open Application", "_blank")}
            >
              Send Open Application
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Career;
