'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaHeart, 
  FaArrowUp 
} from 'react-icons/fa'

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 4rem 2rem 2rem;
  position: relative;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 40px;
    height: 3px;
    background: white;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

const FooterText = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
  opacity: 0.8;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`

const SocialLink = styled(motion.a)`
  font-size: 1.3rem;
  color: white;
  transition: color 0.3s ease;
`

const QuickLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const QuickLinkItem = styled.li`
  margin-bottom: 0.8rem;
`

const QuickLink = styled(motion.a)`
  color: white;
  opacity: 0.8;
  text-decoration: none;
  transition: opacity 0.3s ease;
  display: inline-block;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: white;
    transition: width 0.3s ease;
  }
  
  &:hover {
    opacity: 1;
    
    &:after {
      width: 100%;
    }
  }
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`

const ContactIcon = styled.div`
  font-size: 1.2rem;
`

const ContactText = styled.span`
  opacity: 0.8;
`

const FooterBottom = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Copyright = styled.p`
  opacity: 0.7;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const HeartIcon = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ff6b6b;
  margin: 0 0.3rem;
`

const ScrollToTop = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  position: absolute;
  top: -22.5px;
  left: 50%;
  transform: translateX(-50%);
`

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear())
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <FooterContainer>
      <ScrollToTop
        onClick={handleScrollToTop}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Rolar para o topo"
      >
        <FaArrowUp />
      </ScrollToTop>
      
      <FooterContent>
        <FooterSection>
          <FooterTitle>Sobre</FooterTitle>
          <FooterText>
            Desenvolvedor Full-Stack apaixonado por criar experiências digitais modernas, 
            com foco em desempenho, acessibilidade e design centrado no usuário.
          </FooterText>
          
          <SocialLinks>
            <SocialLink 
              href="https://github.com/username" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: '#f0f6fc' }}
              aria-label="GitHub"
            >
              <FaGithub />
            </SocialLink>
            
            <SocialLink 
              href="https://linkedin.com/in/username" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: '#6A5ACD' }}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </SocialLink>
            
            <SocialLink 
              href="https://twitter.com/username" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: '#9370DB' }}
              aria-label="Twitter"
            >
              <FaTwitter />
            </SocialLink>
            
            <SocialLink 
              href="https://instagram.com/username" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: '#8A2BE2' }}
              aria-label="Instagram"
            >
              <FaInstagram />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Links Rápidos</FooterTitle>
          <QuickLinks>
            <QuickLinkItem>
              <QuickLink href="#about">Sobre Mim</QuickLink>
            </QuickLinkItem>
            <QuickLinkItem>
              <QuickLink href="#skills">Habilidades</QuickLink>
            </QuickLinkItem>
            <QuickLinkItem>
              <QuickLink href="#projects">Projetos</QuickLink>
            </QuickLinkItem>
            <QuickLinkItem>
              <QuickLink href="#experience">Experiência</QuickLink>
            </QuickLinkItem>
            <QuickLinkItem>
              <QuickLink href="#contact">Contato</QuickLink>
            </QuickLinkItem>
          </QuickLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contato</FooterTitle>
          <ContactItem>
            <ContactIcon>📍</ContactIcon>
            <ContactText>São Paulo, Brasil</ContactText>
          </ContactItem>
          <ContactItem>
            <ContactIcon>📧</ContactIcon>
            <ContactText>email@example.com</ContactText>
          </ContactItem>
          <ContactItem>
            <ContactIcon>📱</ContactIcon>
            <ContactText>+55 (11) 98765-4321</ContactText>
          </ContactItem>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          &copy; {year} Rodrigo Cinelli. Todos os direitos reservados. Feito com
          <HeartIcon
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <FaHeart />
          </HeartIcon>
          no Brasil
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  )
}
