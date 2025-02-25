'use client'

import { useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { FaCode, FaServer, FaMobileAlt, FaDatabase } from 'react-icons/fa'

const AboutSection = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    transform: translateX(-50%);
  }
`

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const ImageContainer = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  &:before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.1;
    z-index: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -30px;
    right: -30px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.1;
    z-index: 1;
  }
  
  img {
    border-radius: 10px;
    position: relative;
    z-index: 2;
  }
`

const AboutTextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AboutMeTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`

const SkillsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
`

const SkillCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const SkillIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`

const SkillText = styled.div`
  display: flex;
  flex-direction: column;
`

const SkillName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`

const SkillDescription = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  const skills = [
    { 
      icon: <FaCode />,
      name: 'Front-End',
      description: 'React, Next.js, TypeScript',
      color: '#4B0082' // Indigo
    },
    { 
      icon: <FaServer />,
      name: 'Back-End',
      description: 'Node.js, Express, NestJS',
      color: '#6A5ACD' // Slate Blue
    },
    { 
      icon: <FaMobileAlt />,
      name: 'Desenvolvimento Mobile',
      description: 'React Native, Flutter',
      color: '#9370DB' // Medium Purple
    },
    { 
      icon: <FaDatabase />,
      name: 'Banco de Dados',
      description: 'MongoDB, PostgreSQL',
      color: '#7B68EE' // Medium Slate Blue
    }
  ]
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  }
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  return (
    <AboutSection id="about" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
      >
        Sobre Mim
      </SectionTitle>
      
      <AboutContent>
        <ImageContainer
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/assets/vectors/profile.jpg"
            alt="Rodrigo Cinelli - Desenvolvedor Full-Stack"
            width={500}
            height={500}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            priority
          />
        </ImageContainer>
        
        <AboutTextContent
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <AboutMeTitle>
            Desenvolvedor Full-Stack com Foco em Experiências Modernas
          </AboutMeTitle>
          
          <AboutText>
            Olá! Sou Rodrigo, um desenvolvedor apaixonado por criar soluções digitais que combinam design elegante e funcionalidades poderosas. Tenho mais de 5 anos de experiência trabalhando com tecnologias web modernas.
          </AboutText>
          
          <AboutText>
            Minha abordagem é focada em código limpo, padrões de design escaláveis e entrega de produtos que realmente fazem a diferença. Adoro enfrentar novos desafios e aprender constantemente.
          </AboutText>
          
          <motion.h4
            style={{ marginBottom: '1rem', marginTop: '1rem' }}
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Minhas principais competências:
          </motion.h4>
          
          <SkillsContainer
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
              >
                <SkillIcon color={skill.color}>{skill.icon}</SkillIcon>
                <SkillText>
                  <SkillName>{skill.name}</SkillName>
                  <SkillDescription>{skill.description}</SkillDescription>
                </SkillText>
              </SkillCard>
            ))}
          </SkillsContainer>
        </AboutTextContent>
      </AboutContent>
    </AboutSection>
  )
}
