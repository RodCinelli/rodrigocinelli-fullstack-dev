'use client'

import { useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { FaBriefcase, FaGraduationCap, FaCode, FaAward } from 'react-icons/fa'

interface ExperienceItem {
  id: number
  title: string
  company: string
  period: string
  description: string
  type: 'work' | 'education' | 'project' | 'award'
}

const ExperienceSection = styled.section`
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

const TimelineContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: ${({ theme }) => 
      theme.colors.background === '#f5f5f5'
        ? 'rgba(0, 0, 0, 0.1)'
        : 'rgba(255, 255, 255, 0.1)'
    };
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: 20px;
    }
  }
`

const TimelineItem = styled(motion.div)<{ isEven: boolean }>`
  display: flex;
  justify-content: ${({ isEven }) => isEven ? 'flex-start' : 'flex-end'};
  padding-bottom: 4rem;
  width: 100%;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-end;
    padding-left: 40px;
  }
  
  &:last-child {
    padding-bottom: 0;
  }
`

const TimelineContent = styled(motion.div)`
  width: calc(50% - 40px);
  position: relative;
  background: ${({ theme }) => theme.colors.card};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: calc(100% - 40px);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 24px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.card};
    border: 3px solid ${({ theme }) => theme.colors.primary};
    z-index: 1;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: -50px;
    }
  }
`

const TimelineContentLeft = styled(TimelineContent)`
  &:before {
    right: -51px;
  }
`

const TimelineContentRight = styled(TimelineContent)`
  &:before {
    left: -51px;
  }
`

const TimelineIcon = styled.div<{ type: 'work' | 'education' | 'project' | 'award' }>`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  background: ${({ type, theme }) => {
    switch (type) {
      case 'work':
        return '#4B0082'; // Indigo
      case 'education':
        return '#6A5ACD'; // Slate Blue
      case 'project':
        return '#9370DB'; // Medium Purple
      case 'award':
        return '#7B68EE'; // Medium Slate Blue
      default:
        return theme.colors.primary;
    }
  }};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: -65px;
  }
`

const TimelineIconLeft = styled(TimelineIcon)`
  right: -80px;
`

const TimelineIconRight = styled(TimelineIcon)`
  left: -80px;
`

const ItemTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`

const ItemCompany = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
`

const ItemPeriod = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  display: block;
  margin-bottom: 1rem;
`

const ItemDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Desenvolvedor Full-stack Senior",
      company: "Tech Solutions Inc.",
      period: "2021 - Presente",
      description: "Liderança técnica em projetos de e-commerce e fintech, desenvolvendo soluções escaláveis com React, Next.js, Node.js e AWS. Responsável pela arquitetura de sistemas e mentoria de desenvolvedores júnior.",
      type: "work"
    },
    {
      id: 2,
      title: "Desenvolvedor Front-end",
      company: "Digital Innovations",
      period: "2018 - 2021",
      description: "Desenvolvimento de interfaces modernas com React e TypeScript. Implementação de design systems e otimização de performance. Colaboração com designers e equipe de back-end.",
      type: "work"
    },
    {
      id: 3,
      title: "Bacharelado em Ciência da Computação",
      company: "Universidade Federal de Tecnologia",
      period: "2014 - 2018",
      description: "Formação com foco em desenvolvimento de software, algoritmos e estruturas de dados. Projeto de conclusão de curso em sistemas distribuídos e computação em nuvem.",
      type: "education"
    },
    {
      id: 4,
      title: "Contribuição Open Source",
      company: "Projeto React Components",
      period: "2020",
      description: "Contribuição para biblioteca de componentes React de código aberto, implementando novas funcionalidades e melhorando a acessibilidade dos componentes existentes.",
      type: "project"
    },
    {
      id: 5,
      title: "Desenvolvedor Back-end Júnior",
      company: "StartupX",
      period: "2016 - 2018",
      description: "Desenvolvimento de APIs RESTful com Node.js e Express. Implementação de bancos de dados SQL e NoSQL. Integração com serviços de terceiros via APIs.",
      type: "work"
    },
  ]
  
  const getIcon = (type: 'work' | 'education' | 'project' | 'award') => {
    switch (type) {
      case 'work':
        return <FaBriefcase />;
      case 'education':
        return <FaGraduationCap />;
      case 'project':
        return <FaCode />;
      case 'award':
        return <FaAward />;
      default:
        return <FaBriefcase />;
    }
  }
  
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  }
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <ExperienceSection id="experience" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        Experiência Profissional
      </SectionTitle>
      
      <TimelineContainer>
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          const ContentComponent = isEven ? TimelineContentLeft : TimelineContentRight;
          const IconComponent = isEven ? TimelineIconLeft : TimelineIconRight;
          
          return (
            <TimelineItem 
              key={exp.id} 
              isEven={isEven}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              animate={isInView 
                ? { opacity: 1, x: 0 } 
                : { opacity: 0, x: isEven ? -50 : 50 }
              }
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <ContentComponent
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <IconComponent type={exp.type}>
                  {getIcon(exp.type)}
                </IconComponent>
                <ItemTitle>{exp.title}</ItemTitle>
                <ItemCompany>{exp.company}</ItemCompany>
                <ItemPeriod>{exp.period}</ItemPeriod>
                <ItemDescription>{exp.description}</ItemDescription>
              </ContentComponent>
            </TimelineItem>
          )
        })}
      </TimelineContainer>
    </ExperienceSection>
  )
} 