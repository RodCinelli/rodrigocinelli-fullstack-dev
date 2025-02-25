'use client'

import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaArrowDown, FaGithub, FaLinkedin } from 'react-icons/fa'
import Image from 'next/image'

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.hero};
  padding: 0 2rem;
`

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  z-index: 2;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`

const HeroContent = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding-right: 2rem;
  
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    padding-right: 0;
  }
`

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #fff;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 320px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 320px) {
    font-size: 1.2rem;
  }
`

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin-bottom: 3rem;
  
  @media (max-width: 320px) {
    font-size: 1rem;
  }
`

const ButtonsContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 320px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const PrimaryButton = styled(motion.a)`
  background: #fff;
  color: #4B0082;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px solid #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: transparent;
    color: #fff;
    border-color: #fff;
  }
`

const SecondaryButton = styled(motion.a)`
  background: transparent;
  color: #fff;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px solid #fff;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

const SocialLinks = styled(motion.div)`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    left: 1rem;
    top: auto;
    bottom: 8rem;
    transform: none;
    flex-direction: row;
    gap: 1rem;
  }
`

const SocialLink = styled(motion.a)`
  color: white;
  font-size: 2rem;
  transition: all 0.3s ease;
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.3));
  
  &:hover {
    color: rgba(255, 255, 255, 0.8);
    transform: translateY(-3px);
    filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.4));
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
`

// Container simplificado da foto
const PhotoContainer = styled(motion.div)`
  flex: 0.8;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    width: 80%;
    max-width: 350px;
  }
`

// Efeito simplificado para a foto
const PhotoFrame = styled(motion.div)`
  position: relative;
  width: 380px;
  height: 380px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
  
  @media (max-width: 320px) {
    width: 250px;
    height: 250px;
  }
`

const NameHighlight = styled.span`
  position: relative;
  display: inline-block;
  color: white;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    height: 8px;
    background: rgba(155, 106, 235, 0.7);
    z-index: -1;
  }
`

// Círculos de fundo estáticos para substituir as partículas animadas
const BackgroundCircle = styled.div<{ size: string; top: string; left: string; opacity: number }>`
  position: absolute;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  background: white;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  opacity: ${({ opacity }) => opacity};
  z-index: 1;
`

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const handleScrollClick = () => {
    const nextSection = document.getElementById('about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  // Círculos de fundo estáticos (substituindo as partículas animadas)
  const backgroundCircles = [
    { size: '300px', top: '20%', left: '10%', opacity: 0.1 },
    { size: '200px', top: '60%', left: '80%', opacity: 0.1 },
    { size: '150px', top: '10%', left: '70%', opacity: 0.1 },
    { size: '100px', top: '30%', left: '60%', opacity: 0.05 },
    { size: '80px', top: '70%', left: '20%', opacity: 0.05 },
    { size: '50px', top: '40%', left: '30%', opacity: 0.05 },
  ]
  
  const titleAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2
      }
    }
  }
  
  const subtitleAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  }
  
  const descriptionAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.4
      }
    }
  }
  
  const buttonsAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5
      }
    }
  }
  
  const photoAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        delay: 0.2
      }
    }
  }
  
  const socialAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.8
      }
    }
  }

  return (
    <HeroSection ref={containerRef}>
      {/* Círculos de fundo estáticos */}
      {backgroundCircles.map((circle, index) => (
        <BackgroundCircle
          key={index}
          size={circle.size}
          top={circle.top}
          left={circle.left}
          opacity={circle.opacity}
        />
      ))}
      
      <HeroContainer>
        <HeroContent
          initial="hidden"
          animate="visible"
        >
          <Title
            variants={titleAnimation}
          >
            Olá, sou <NameHighlight>Rodrigo Cinelli</NameHighlight>
          </Title>
          
          <Subtitle
            variants={subtitleAnimation}
          >
            Desenvolvedor Full-Stack
          </Subtitle>
          
          <Description
            variants={descriptionAnimation}
          >
            Criando experiências digitais modernas e impactantes com foco em desempenho,
            acessibilidade e design centrado no usuário.
          </Description>
          
          <ButtonsContainer
            variants={buttonsAnimation}
          >
            <PrimaryButton
              href="#projects"
              whileHover={{ scale: 1.05, backgroundColor: 'transparent', color: 'white' }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Projetos
            </PrimaryButton>
            
            <SecondaryButton
              href="#contact"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              Entre em Contato
            </SecondaryButton>
          </ButtonsContainer>
        </HeroContent>
        
        <PhotoContainer
          initial="hidden"
          animate="visible"
          variants={photoAnimation}
        >
          <PhotoFrame
            whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)' }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <Image 
              src="/assets/vectors/profile.jpg"
              alt="Rodrigo Cinelli - Desenvolvedor Full-Stack"
              fill
              style={{ 
                objectFit: 'cover',
                borderRadius: '12px'
              }}
              sizes="(max-width: 768px) 300px, 380px"
              priority
            />
          </PhotoFrame>
        </PhotoContainer>
      </HeroContainer>
      
      <SocialLinks
        initial="hidden"
        animate="visible"
        variants={socialAnimation}
      >
        <SocialLink 
          href="https://github.com/RodCinelli" 
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          aria-label="GitHub"
        >
          <FaGithub />
        </SocialLink>
        
        <SocialLink 
          href="https://www.linkedin.com/in/rodrigo-cinelli" 
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </SocialLink>
      </SocialLinks>
      
      <ScrollIndicator
        onClick={handleScrollClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.span
          style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}
        >
          Rolar para baixo
        </motion.span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FaArrowDown />
        </motion.div>
      </ScrollIndicator>
    </HeroSection>
  )
}
