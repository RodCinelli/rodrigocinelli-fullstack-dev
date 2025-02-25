'use client'

import { useState, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  githubUrl: string
  liveUrl: string
  features: string[]
}

const ProjectsSection = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => theme.colors.background === '#F8F8FF' 
    ? '#F0F0FF' 
    : '#0c0c0c'
  };
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
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

const SectionDescription = styled(motion.p)`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.6;
`

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`

const ProjectImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
`

const ProjectContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
`

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.9;
  margin-bottom: 1.2rem;
  flex: 1;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`

const Tag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.background === '#F8F8FF' ? '#4B0082' : theme.colors.primary};
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF'
      ? 'rgba(75, 0, 130, 0.15)'
      : 'rgba(147, 112, 219, 0.15)'
  };
  transition: all 0.3s ease;
`

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`

const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 200px;
  }
`

const ModalBody = styled.div`
  padding: 2rem;
`

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const ModalDescription = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`

const FeaturesTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const FeaturesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
`

const FeatureItem = styled(motion.li)`
  padding: 0.8rem 0;
  border-bottom: 1px solid ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(75, 0, 130, 0.1)' 
      : 'rgba(255, 255, 255, 0.05)'
  };
  display: flex;
  align-items: center;
  
  &:before {
    content: '•';
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    margin-right: 0.8rem;
  }
`

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const ActionButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
`

const PrimaryButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`

const SecondaryButton = styled(ActionButton)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
`

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 10;
`

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce App",
      description: "Aplicação completa de e-commerce com painel administrativo e pagamentos integrados.",
      longDescription: "Uma plataforma completa de comércio eletrônico construída com Next.js, Node.js e MongoDB. Inclui sistema de autenticação, carrinho de compras, processo de checkout, integração com gateway de pagamento, painel de controle administrativo e sistema de gerenciamento de conteúdo.",
      image: "/assets/vectors/ecommerce.jpg",
      tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "https://github.com/username/ecommerce",
      liveUrl: "https://ecommerce-demo.com",
      features: [
        "Autenticação e autorização com NextAuth.js",
        "Design responsivo para todas as plataformas",
        "Painel admin para gerenciamento de produtos",
        "Integração com Stripe para processamento de pagamentos",
        "Sistema de filtros e busca avançada",
        "Armazenamento de imagens na nuvem"
      ]
    },
    {
      id: 2,
      title: "Task Manager",
      description: "Aplicativo de gerenciamento de tarefas com recursos de colaboração em tempo real.",
      longDescription: "Aplicativo de gerenciamento de tarefas inspirado no Trello, com recursos de arrastar e soltar, colaboração em tempo real, notificações e muito mais. Construído usando React, TypeScript e Firebase.",
      image: "/assets/vectors/taskmanager.jpg",
      tags: ["React", "Firebase", "TypeScript", "DnD"],
      githubUrl: "https://github.com/username/taskmanager",
      liveUrl: "https://taskmanager-demo.com",
      features: [
        "Arrastar e soltar para reordenar tarefas",
        "Colaboração em tempo real com Firebase Realtime DB",
        "Comentários e anexos em tarefas",
        "Sistema de notificações",
        "Tema claro/escuro personalizável"
      ]
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      description: "Dashboard interativo com visualização de dados e relatórios personalizados.",
      longDescription: "Dashboard de análise de dados com gráficos interativos, filtros avançados e relatórios personalizados. Ideal para acompanhamento de métricas de negócios, estatísticas de vendas e comportamento do usuário.",
      image: "/assets/vectors/dashboard.jpg",
      tags: ["React", "D3.js", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/username/analytics",
      liveUrl: "https://analytics-demo.com",
      features: [
        "Gráficos interativos com D3.js",
        "Exportação de dados em CSV e PDF",
        "Relatórios personalizados e agendados",
        "Análise preditiva usando algoritmos de ML",
        "Integração com múltiplas fontes de dados"
      ]
    },
  ]
  
  const handleOpenModal = (project: Project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }
  
  const handleCloseModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'auto'
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
  
  const modalAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }
  
  const overlayAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        delay: 0.1
      }
    }
  }
  
  const featureAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <ProjectsSection id="projects" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        Meus Projetos
      </SectionTitle>
      
      <SectionDescription
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Aqui estão alguns dos projetos que desenvolvi. Cada um representa um desafio único
        e demonstra minhas habilidades em diferentes tecnologias.
      </SectionDescription>
      
      <ProjectsGrid
        variants={containerAnimation}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            variants={itemAnimation}
            whileHover={{ 
              y: -10, 
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' 
            }}
            onClick={() => handleOpenModal(project)}
          >
            <ProjectImageWrapper>
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </ProjectImageWrapper>
            
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              
              <TagsContainer>
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagsContainer>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
      
      <AnimatePresence>
        {selectedProject && (
          <ModalOverlay
            variants={overlayAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleCloseModal}
          >
            <ModalContent
              variants={modalAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton 
                onClick={handleCloseModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Fechar"
              >
                <FaTimes />
              </CloseButton>
              
              <ModalHeader>
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </ModalHeader>
              
              <ModalBody>
                <ModalTitle>{selectedProject.title}</ModalTitle>
                <ModalDescription>{selectedProject.longDescription}</ModalDescription>
                
                <FeaturesTitle>Principais Funcionalidades</FeaturesTitle>
                <FeaturesList>
                  {selectedProject.features.map((feature, index) => (
                    <FeatureItem
                      key={index}
                      variants={featureAnimation}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      {feature}
                    </FeatureItem>
                  ))}
                </FeaturesList>
                
                <ModalActions>
                  <PrimaryButton
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt /> Ver Projeto
                  </PrimaryButton>
                  
                  <SecondaryButton
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub /> Ver Código
                  </SecondaryButton>
                </ModalActions>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </ProjectsSection>
  )
}
