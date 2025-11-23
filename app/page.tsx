"use client";

import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Terminal,
  Code2,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Server,
  Database,
  Brain,
  MapPin,
  Send,
  Loader2
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import ContactForm from '@/components/ContactForm';
import ResumeModal from '@/components/ResumeModal';
import { useHaptic } from '@/hooks/useHaptic';
import { useCursorGlow } from '@/hooks/useCursorGlow';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { triggerHaptic } = useHaptic();
  const mousePosition = useCursorGlow();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* iOS-Style Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.06), transparent 40%)`
        }}
      />

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/5 dark:bg-black/20 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/30 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold text-white tracking-tight flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
            <div className="p-2.5 rounded-full bg-white/5 border border-white/10">
              <Terminal className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <span>VISHVA<span className="text-white/60">.VP</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  scrollTo(link.href.substring(1));
                  triggerHaptic();
                }}
                suppressHydrationWarning={true}
                className={`text-sm font-medium transition-all duration-300 px-4 py-2.5 rounded-full hover:bg-white/10 hover:scale-105 active:scale-95 ${activeSection === link.href.substring(1) ? 'text-white bg-white/10 backdrop-blur-sm' : 'text-white/60 hover:text-white'}`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                setShowResume(true);
                triggerHaptic();
              }}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 shadow-lg shadow-black/20 border border-white/20 backdrop-blur-xl tracking-tight"
            >
              Resume
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} suppressHydrationWarning={true}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800/50 p-6 md:hidden flex flex-col gap-4 shadow-2xl">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href.substring(1))}
                className="text-left text-slate-300 hover:text-cyan-400 py-2"
                suppressHydrationWarning={true}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setShowResume(true);
              }}
              className="w-full mt-2 px-4 py-3 text-center font-medium text-slate-900 bg-cyan-400 rounded hover:bg-cyan-300 transition-colors block"
            >
              Download Resume
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for hire
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-100 leading-tight">
            Building <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Intelligent</span><br />
            Web & App Solutions
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            I'm Vishva Patel, a Full Stack & AI Engineer specialized in building scalable infrastructure and systems. Previously tech information provider at <span className="text-slate-200">Manav Telecom</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button onClick={() => {
              scrollTo('projects');
              triggerHaptic();
            }} className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-full font-semibold hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 ease-out flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg shadow-black/20 border border-white/20 tracking-tight" suppressHydrationWarning={true}>
              View Projects <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <a href="https://github.com/VP1918/Manavtelecom" target="_blank" rel="noopener noreferrer" onClick={triggerHaptic} className="px-8 py-4 bg-white/5 backdrop-blur-xl text-white border-2 border-white/10 rounded-full font-semibold hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 ease-out flex items-center gap-2 w-full sm:w-auto justify-center group shadow-lg shadow-black/20 tracking-tight">
              <Github className="w-4 h-4" strokeWidth={1.5} />
              GitHub Profile
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1" strokeWidth={1.5} />
            </a>
          </div>

          <div className="pt-16 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Tech Logos Text */}
            <span className="text-xl font-bold tracking-widest text-slate-500">PYTHON</span>
            <span className="text-xl font-bold tracking-widest text-slate-500">REACT</span>
            <span className="text-xl font-bold tracking-widest text-slate-500">SQL</span>
            <span className="text-xl font-bold tracking-widest text-slate-500">NODE</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-100 mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-cyan-500 rounded-full"></span>
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-400 leading-relaxed">
              <p>
                I am an engineer who loves diving deep into low-level systems while keeping the user experience seamless. My journey started with <strong>Python</strong> and evolved into architecting full-stack solutions.
              </p>
              <p>
                Currently, I'm obsessed with <strong>developing web and mobile apps</strong> that solve real-world problems. I believe the future of software lies in performant, user-centric applications.
              </p>
              <p>
                When I'm not coding, I enjoy exploring new technologies and optimizing workflows for efficiency.
              </p>
            </div>
            <div className="bg-white/5 dark:bg-black/20 border border-white/10 p-8 rounded-[32px] backdrop-blur-2xl shadow-2xl shadow-black/40">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-3 tracking-tight">
                <div className="p-2 rounded-full bg-white/5 border border-white/10">
                  <Code2 className="text-white w-4 h-4" strokeWidth={1.5} />
                </div>
                Current Stack
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Frontend', val: 'React, Next.js, Tailwind' },
                  { label: 'Backend', val: 'Go, Python, Node.js' },
                  { label: 'Cloud', val: 'AWS, Kubernetes, Terraform' },
                  { label: 'AI/ML', val: 'PyTorch, LangChain, HuggingFace' },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-slate-300 font-medium">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-slate-900/20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-3">
            <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
            Work Experience
          </h2>

          <div className="relative border-l-2 border-slate-800 ml-3 space-y-12">
            {[
              {
                role: "Tech Information Provider / IT Support",
                company: "Manav Telecom",
                period: "2021 - Present (Part-time)",
                description: "Providing technical information and comprehensive IT support. Responsible for helping users define their requirements and delivering tailored technical solutions.",
                tech: ["Python", "SQL", "HTML", "CSS", "JavaScript"]
              }
            ].map((job, idx) => (
              <div key={idx} className="relative pl-8 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-600 group-hover:border-cyan-400 group-hover:bg-cyan-400/20 transition-colors"></div>

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">{job.role}</h3>
                  <span className="text-sm font-mono text-slate-500">{job.period}</span>
                </div>
                <p className="text-lg text-slate-300 font-medium mb-2">{job.company}</p>
                <p className="text-slate-400 mb-4 max-w-2xl">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map(t => (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-3">
            <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Custom Web Architecture",
                desc: "Designed and developed responsive web applications tailored to client specifications, focusing on clean UI and efficient code structure.",
                tags: ["HTML", "CSS", "JavaScript", "React"],
                icon: <Brain className="w-8 h-8 text-purple-400" />,
                color: "hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)]"
              },
              {
                title: "Client Requirement System",
                desc: "A Python-based solution that analyzes user inputs to suggest technical configurations, helping automate the requirements gathering process.",
                tags: ["Python", "SQL", "Automation"],
                icon: <Database className="w-8 h-8 text-cyan-400" />,
                color: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)]"
              },
              {
                title: "Telecom Data Manager",
                desc: "An internal tool created to manage and retrieve technical information efficiently, streamlining support operations.",
                tags: ["Python", "Data Processing", "SQL"],
                icon: <Server className="w-8 h-8 text-blue-400" />,
                color: "hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]"
              }
            ].map((project, i) => (
              <div key={i} className={`group bg-slate-900/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-2xl ${project.color}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <div className="flex gap-2">
                    <a href="https://github.com/VP1918/Manavtelecom" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><ExternalLink className="w-5 h-5" /></a>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{project.desc}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-cyan-200/70 bg-cyan-900/10 px-2 py-1 rounded border border-cyan-900/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-slate-900/30 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-3">
            <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
            Technical Arsenal
          </h2>

          <div className="space-y-8">
            {[
              { category: "Languages", items: ["Python", "JavaScript/TypeScript", "Go", "C++", "Rust", "SQL"] },
              { category: "Frameworks & Libraries", items: ["React", "Next.js", "PyTorch", "TensorFlow", "FastAPI", "Node.js"] },
              { category: "Infrastructure & Tools", items: ["Docker", "Kubernetes", "AWS", "GCP", "Terraform", "Git", "Linux"] },
              { category: "Concepts", items: ["Distributed Systems", "System Design", "Microservices", "CI/CD", "Agile"] }
            ].map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill) => (
                    <div key={skill} className="px-4 py-2 bg-slate-800/40 border border-white/5 rounded-lg text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-colors cursor-default backdrop-blur-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative z-10">
        {/* Glassmorphism Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 backdrop-blur-sm pointer-events-none" />
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-100 mb-6">Ready to Build Something Amazing?</h2>
            <p className="text-slate-400 text-lg">
              I'm currently looking for new opportunities.
              Whether you have a question or just want to say hi, my inbox is always open.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-slate-900/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Terminal className="text-cyan-400 w-5 h-5" /> Contact Details
                </h3>
                <div className="space-y-4">
                  <a href="mailto:vishvapatel.1918@gmail.com" className="flex items-center gap-4 text-slate-400 hover:text-cyan-400 transition-colors group">
                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>vishvapatel.1918@gmail.com</span>
                  </a>
                  <a href="https://tinyurl.com/vishvalinkdinacc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-400 hover:text-cyan-400 transition-colors group">
                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <span>Connect on LinkedIn</span>
                  </a>
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span>Anand Vvn, Gujarat, India</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-xl">
                <p className="text-slate-400 text-sm leading-relaxed">
                  "The best way to predict the future is to invent it."
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm bg-slate-950 relative z-10 border-t border-slate-900">
        <p>© {new Date().getFullYear()} Vishva Patel. Built with React & Tailwind.</p>
      </footer>

      <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
    </div>
  );
};

export default Portfolio;
