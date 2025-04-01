"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query";
import { onGetUser } from "@/actions/auth";
// import { cn } from "@/lib/utils";
import { CheckCircle, Award, FileCheck, Users } from "lucide-react"
import Image from "next/image";

const Home = ({ session }: { session: any }) => {

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => onGetUser(),
  })

  // console.log("user", user)
  return (
  <>
    {/* Hero section with background image */}
    <section className="relative min-h-[70vh]">
          {/* Background image with opacity - using Next.js Image for better performance */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-background.png"
              alt="Graduation ceremony"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
                opacity: 0.6,
              }}
              priority
            />
          </div>

          {/* Colored overlay */}
          <div className="absolute inset-0 bg-blue-900/60 z-1"></div>

          {/* Content container */}
          <div className="relative z-10 flex items-center min-h-[70vh]">
            <div className="container px-4 md:px-6 py-12 md:py-24">
              <div className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                  Verify Your Qualifications with Confidence
                </h1>
                <p className="text-xl text-white mb-8 max-w-2xl">
                  The UKQS E-Certificate System provides secure verification of educational achievements and
                  professional qualifications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/verify">
                  <Button size="lg" className="px-8 bg-white text-blue-900 hover:bg-white/90">
                    Verify Certificate
                  </Button>
                </Link>
                {session ? (
                  <Link href="/admin/dashboard">
                    <Button variant="outline" size="lg" className="px-8 text-blue-900 hover:text-white border-white hover:bg-white/10">
                      Admin Dashboard
                    </Button>
                  </Link> 
                ): (
                  <Link href="/sign-in">
                    <Button variant="outline" size="lg" className="px-8 text-blue-900 hover:text-white border-white hover:bg-white/10">
                      Admin Login
                    </Button>
                  </Link>
                )}
                  {/* <Link href="/verify">
                    <Button size="lg" className="px-8 bg-white text-blue-900 hover:bg-white/90">
                      Verify Certificate
                    </Button>
                  </Link>
                  <Link href="/admin/dashboard">
                    <Button variant="outline" size="lg" className="px-8 text-blue-900 hover:text-white border-white hover:bg-white/10">
                      Admin Login
                    </Button>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Why Choose UKQS E-Certificates?
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Our digital certification system offers numerous benefits for students, institutions, and employers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Instant Verification</h3>
                <p className="text-gray-600">
                  Verify certificates instantly online without waiting for manual processing.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Award className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tamper-Proof</h3>
                <p className="text-gray-600">Secure digital certificates that cannot be forged or altered.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <FileCheck className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">PDF Downloads</h3>
                <p className="text-gray-600">Download and share your certificates as professional PDF documents.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Users className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">For All Stakeholders</h3>
                <p className="text-gray-600">Benefits students, educational institutions, and employers alike.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How It Works</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Our certificate verification process is simple, secure, and efficient.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative pl-16 md:pl-0 md:text-center">
                <div className="absolute left-0 md:relative md:inline-flex md:justify-center md:w-full md:mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-white font-bold">
                    1
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Enter Your Details</h3>
                <p className="text-gray-600">
                  Provide your name, certificate number, or learner reference number in our verification form.
                </p>
              </div>

              <div className="relative pl-16 md:pl-0 md:text-center">
                <div className="absolute left-0 md:relative md:inline-flex md:justify-center md:w-full md:mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-white font-bold">
                    2
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Instant Verification</h3>
                <p className="text-gray-600">
                  Our system instantly checks your details against our secure database of issued certificates.
                </p>
              </div>

              <div className="relative pl-16 md:pl-0 md:text-center">
                <div className="absolute left-0 md:relative md:inline-flex md:justify-center md:w-full md:mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-white font-bold">
                    3
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">View & Download</h3>
                <p className="text-gray-600">
                  View your certificate details online and download a PDF copy for your records or to share.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/verify">
                <Button size="lg">Verify Your Certificate Now</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonial section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12">What Our Users Say</h2>

              <blockquote className="relative">
                <div className="relative z-10">
                  <p className="text-xl text-gray-600 italic mb-4">
                    "The UKQS E-Certificate system has streamlined our verification process completely. What used to
                    take days now takes seconds, and our students love the professional PDF certificates they can
                    download instantly."
                  </p>
                  <footer className="text-gray-900 font-medium">
                    Sarah Johnson, Training Director at Cambridge Technical Institute
                  </footer>
                </div>
                <svg
                  className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 z-0"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </blockquote>
            </div>
          </div>
        </section>
        </>

    // <div className="container px-4 md:px-6">
    //   <div className="flex flex-col items-center space-y-4 text-center">
    //     <div className="space-y-2">
    //       <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
    //         Welcome to UKQS E-Certificate System
    //       </h1>
    //       <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
    //         Verify your certificate or check your course completion status.
    //       </p>
    //     </div>
    //     <div className="space-x-4">
    //       <Link href="/verify">
    //         <Button>Verify Certificate</Button>
    //       </Link>
    //       {session ? (
    //         <Link href="/admin/dashboard">
    //           <Button variant="outline">Admin Dashboard</Button>
    //         </Link>
    //       ): (
    //         <Link href="/sign-in">
    //           <Button variant="outline">Admin Login</Button>
    //         </Link>
    //       )}
    //       {/* {(user?.user?.role === "ADMIN" || user?.user?.role === "AGENT") && (
    //         <Link href="/admin/dashboard">
    //           <Button variant="outline">Admin Dashboard</Button>
    //         </Link>
    //       )}
    //         <Link href="/sign-in" className={cn(user?.user && "hidden")}>
    //           <Button variant="outline">Admin Login</Button>
    //         </Link> */}
    //     </div>
    //   </div>
    // </div>
  )
};

export default Home;
