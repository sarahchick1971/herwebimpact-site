"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Building2, Leaf, Heart, CheckCircle, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

export default function Component() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    // Ensure smooth scrolling is enabled
    document.documentElement.style.scrollBehavior = "smooth"

    // Load Google Font
    // const link = document.createElement("link")
    // link.href = "https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap"
    // link.rel = "stylesheet"
    // document.head.appendChild(link)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Account for header height
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-yellow-400 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="text-2xl font-bold text-green-800 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Her Web Impact CIC
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button onClick={() => scrollToSection("about")} className="text-black hover:text-green-800 font-medium">
              About
            </button>
            <button onClick={() => scrollToSection("impact-areas")} className="text-black hover:text-green-800 font-medium">
              What We Do
            </button>
            <button onClick={() => scrollToSection("projects")} className="text-black hover:text-green-800 font-medium">
              Focus Areas
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900 font-medium transition-colors"
            >
              Contact Us
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button className="md:hidden text-green-900" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {menuOpen && (
          <div className="md:hidden bg-yellow-300 px-4 py-4 space-y-4 text-center">
            <button onClick={() => scrollToSection("about")} className="block w-full text-lg text-green-900 font-semibold">
              About
            </button>
            <button onClick={() => scrollToSection("impact-areas")} className="block w-full text-lg text-green-900 font-semibold">
              What We Do
            </button>
            <button onClick={() => scrollToSection("projects")} className="block w-full text-lg text-green-900 font-semibold">
              Focus Areas
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full bg-green-800 text-white py-2 rounded-lg font-medium"
            >
              Contact Us
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-yellow-400 py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Digital tools made with communities, not just for them
              </h1>
              <p className="text-lg text-black font-medium max-w-lg mt-2">
                A Community Interest Company supporting digital inclusion and women-led tech.
                We are rooted in lived experience, and powered by purpose.
              </p>
            </div>
            <div className="relative">
              <div className="text-center">
                <div className="bg-green-800 rounded-2xl mx-auto mb-4 overflow-hidden w-full max-w-sm aspect-[4/3]">
                  <img
                    src="/images/hands.jpg"
                    alt="Empowering Women"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-green-800 font-semibold">Empowering Women</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-green-800 py-12" id="about">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-yellow-400 text-sm mb-2">Why choose Her Web Impact</div>
              <h2 className="text-3xl font-bold text-white mb-2">Newly launched, proudly purpose-driven.</h2>
              <p className="text-green-200 max-w-md">
                We build easy-to-use, multilingual tools that help people access housing, healthcare and support, all
                shaped with the communities they're for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas Section */}
      <section className="py-16 bg-gray-50" id="impact-areas">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-pink-300 border-0 p-8 text-center">
              <CardContent className="p-0">
                <Users className="w-12 h-12 mx-auto mb-4 text-pink-800" />
                <h3 className="text-xl font-bold text-pink-800 mb-4">Digital Confidence</h3>
                <p className="text-pink-700 text-sm">
                  Hands-on learning, 1:1 support and workshops to help women thrive in digital spaces.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-300 border-0 p-8 text-center">
              <CardContent className="p-0">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-green-800" />
                <h3 className="text-xl font-bold text-green-800 mb-4">Inclusive Design</h3>
                <p className="text-green-700 text-sm">
                  Building accessible, community-first websites and platforms that reflect the people they serve.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-teal-300 border-0 p-8 text-center">
              <CardContent className="p-0">
                <Leaf className="w-12 h-12 mx-auto mb-4 text-teal-800" />
                <h3 className="text-xl font-bold text-teal-800 mb-4">Creative Collaboration</h3>
                <p className="text-teal-700 text-sm">
                  Connecting creators, mentors and organisations to co-design tools that matter.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-300 border-0 p-8 text-center">
              <CardContent className="p-0">
                <Heart className="w-12 h-12 mx-auto mb-4 text-yellow-800" />
                <h3 className="text-xl font-bold text-yellow-800 mb-4">Real-World Impact</h3>
                <p className="text-yellow-700 text-sm">
                  Amplifying unheard voices and empowering communities that need digital support the most.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16" id="projects">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Focus Areas</h2>
              <p className="text-lg text-gray-600 mb-8">
                We concentrate our efforts on four key areas that drive meaningful change in digital accessibility and
                inclusion.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-pink-800" />
                  </div>
                  <div>
                    <span className="font-semibold">Accessibility</span>
                    <br />
                    <span>Creating digital experiences that work for everyone.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-800" />
                  </div>
                  <div>
                    <span className="font-semibold">Community-led Design</span>
                    <br />
                    <span>Involving communities in the design process.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-teal-800" />
                  </div>
                  <div>
                    <span className="font-semibold">Open Source</span>
                    <br />
                    <span>Building transparent, collaborative solutions.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-yellow-800" />
                  </div>
                  <div>
                    <span className="font-semibold">Digital Inclusion</span>
                    <br />
                    <span>Bridging the digital divide.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-[500px] bg-black rounded-[2rem] p-2">
                  <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden">
                    <div className="bg-yellow-400 p-4">
                      <div className="text-center font-bold">Discover</div>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="w-full h-24 bg-green-200 rounded mb-2"></div>
                        <div className="font-semibold text-sm">LOCAL</div>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="w-full h-24 bg-blue-200 rounded mb-2"></div>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="w-full h-24 bg-orange-200 rounded mb-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-16 bg-gray-50" id="platform">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The feel-good digital empowerment platform your community will love.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-teal-400 rounded-lg p-4 text-center text-white">
                <div className="text-lg font-bold">Digital skills made simple</div>
              </div>
              <div className="bg-yellow-400 rounded-lg p-4 text-center">
                <div className="text-lg font-bold">Creative collaboration</div>
              </div>
              <div className="bg-green-400 rounded-lg p-4 text-center text-white">
                <div className="text-lg font-bold">Local community impact</div>
              </div>
              <div className="bg-pink-400 rounded-lg p-4 text-center text-white">
                <div className="text-lg font-bold">Inclusive engagement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Contact Section */}
      <section className="py-16 bg-white" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-xl text-gray-600">
                Want to support the mission, propose a collaboration, or simply say hi?
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* LEFT SIDE – info */}
              <div className="lg:pr-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-700">Email: hello@herwebimpact.org.uk</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-700">Based in Cardiff, Wales, UK</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Ways to Connect</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start space-x-4">
                        <div className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-green-800" />
                        </div>
                        <span>Collaborate on a digital inclusion project in your community</span>
                      </li>
                      <li className="flex items-start space-x-4">
                        <div className="w-6 h-6 bg-teal-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-teal-800" />
                        </div>
                        <span>Share your lived experience to help shape our work</span>
                      </li>
                      <li className="flex items-start space-x-4">
                        <div className="w-6 h-6 bg-pink-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-pink-800" />
                        </div>
                        <span>Help us test and improve new tools before they launch</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE – email button */}
              <div className="bg-teal-300 rounded-2xl shadow-md p-8 text-center ">
              {/* Icon circle in bright pink */}
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>

              {/* Heading and paragraph */}
              <h3 className="text-2xl font-bold text-green-900 mt-3">Send us an Email</h3>
              <p className="text-green-800 max-w-sm mx-auto mt-3 mb-5">
                Prefer to reach out directly? We’d love to hear from you.
              </p>

              {/* Bright yellow button */}
              <a
                href="mailto:hello@herwebimpact.org.uk"
                className="bg-yellow-400 text-black py-3 px-6 rounded-lg hover:bg-yellow-500 font-medium transition-colors"
              >
                Email Us
              </a>
            </div>
            </div>
          </div>
        </div>
      </section>

    {/* Footer */}
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">

        {/* Top row: 3 evenly spaced sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center text-sm mb-4 text-center md:text-left">
          
          {/* Left: Company name */}
          <div className="font-semibold text-lg mb-4 md:mb-0">
            Her Web Impact CIC
          </div>

          {/* Middle: Section links */}
          <div className="flex justify-center space-x-4 mb-4 md:mb-0">
            <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-yellow-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
          </div>
        </div>

        {/* Bottom row: copyright */}
        <div className="text-sm text-green-200 text-center md:text-left">
          © 2025 Her Web Impact CIC. All rights reserved.
        </div>

        <div className="text-xs text-green-200 text-center md:text-left mt-2">
          Registered in England & Wales as a Community Interest Company.  
          Company No. 16524652.  
          Registered Office: 47a Glebe street, Penarth, South Glamorgan, Wales, UK.
          <br />
          <span className="block mt-1">Her Web Impact CIC exists to support digital inclusion and accessibility through community-designed technology.</span>
        </div>
        
      </div>
    </footer>
    </div>
  )
}
