'use client'

import dynamic from 'next/dynamic'

// Componentes de layout
const Navbar = dynamic(() => import('../components/layout/Navbar'), { ssr: true })
const Footer = dynamic(() => import('../components/layout/Footer'), { ssr: true })

// Componentes de seção
const Hero = dynamic(() => import('../components/sections/Hero'), { ssr: true })
const About = dynamic(() => import('../components/sections/About'), { ssr: true })
const Skills = dynamic(() => import('../components/sections/Skills'), { ssr: true })
const Projects = dynamic(() => import('../components/sections/Projects'), { ssr: true })
const Experience = dynamic(() => import('../components/sections/Experience'), { ssr: true })
const Contact = dynamic(() => import('../components/sections/Contact'), { ssr: true })

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
