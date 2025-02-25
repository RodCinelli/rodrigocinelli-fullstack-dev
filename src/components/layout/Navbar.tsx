'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'
import { useTheme } from '../providers/ThemeContainer'

interface NavLinkProps {
  href: string
  label: string
  delay: number
}

const NavbarContainer = styled(motion.nav)<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  background: ${({ isScrolled, theme }) => 
    isScrolled 
      ? theme.colors.background === '#F8F8FF' 
        ? 'rgba(248, 248, 255, 0.95)' 
        : 'rgba(18, 18, 18, 0.95)' 
      : theme.colors.background === '#F8F8FF'
        ? 'rgba(75, 0, 130, 0.8)'
        : 'rgba(25, 25, 25, 0.8)'
  };
  backdrop-filter: ${({ isScrolled }) => isScrolled ? 'blur(10px)' : 'blur(5px)'};
  box-shadow: ${({ isScrolled }) => isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
`

const Logo = styled(motion.div)<{ isScrolled?: boolean }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme, isScrolled }) => theme.colors.background === '#F8F8FF' 
    ? isScrolled ? '#4B0082' : '#FFFFFF'
    : isScrolled ? theme.colors.primary : '#FFFFFF'
  };
  cursor: pointer;
  transition: color 0.3s ease;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

const MobileMenu = styled(motion.div)<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 90;
  padding: 6rem 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`

const MobileNavLink = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: 0.5rem 1rem;
`

const NavLink = styled(motion.a)<{ isScrolled?: boolean }>`
  font-weight: 500;
  color: ${({ theme, isScrolled }) => theme.colors.background === '#F8F8FF' 
    ? isScrolled ? '#4B0082' : '#FFFFFF'
    : isScrolled ? theme.colors.text : '#FFFFFF'
  };
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme, isScrolled }) => theme.colors.background === '#F8F8FF' 
      ? isScrolled ? '#4B0082' : '#FFFFFF'
      : isScrolled ? theme.colors.primary : '#FFFFFF'
    };
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`

const IconButton = styled(motion.button)<{ isScrolled?: boolean }>`
  background: none;
  border: none;
  color: ${({ theme, isScrolled }) => theme.colors.background === '#F8F8FF' 
    ? isScrolled ? '#4B0082' : '#FFFFFF'
    : isScrolled ? theme.colors.text : '#FFFFFF'
  };
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
`

const MobileMenuButton = styled(IconButton)`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`

const NavLinkItem = ({ href, label, delay, isScrolled }: NavLinkProps & { isScrolled?: boolean }) => {
  return (
    <NavLink 
      href={href} 
      isScrolled={isScrolled}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
    >
      {label}
    </NavLink>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Evita rolagem do corpo quando o menu móvel está aberto
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { href: '#about', label: 'Sobre', delay: 1 },
    { href: '#skills', label: 'Habilidades', delay: 2 },
    { href: '#projects', label: 'Projetos', delay: 3 },
    { href: '#experience', label: 'Experiência', delay: 4 },
    { href: '#contact', label: 'Contato', delay: 5 },
  ]

  return (
    <>
      <NavbarContainer 
        isScrolled={isScrolled}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo
          isScrolled={isScrolled}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          Rodrigo Cinelli
        </Logo>

        <NavLinks>
          {navLinks.map((link) => (
            <NavLinkItem 
              key={link.href} 
              href={link.href} 
              label={link.label} 
              delay={link.delay}
              isScrolled={isScrolled}
            />
          ))}
          
          <IconButton 
            isScrolled={isScrolled}
            onClick={toggleTheme}
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            aria-label={isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro"}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </IconButton>
        </NavLinks>

        <MobileMenuButton 
          isScrolled={isScrolled}
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </NavbarContainer>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu 
            isOpen={isOpen}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <MobileNavLink 
                key={link.href} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
              >
                {link.label}
              </MobileNavLink>
            ))}
            
            <IconButton 
              isScrolled={isScrolled}
              onClick={toggleTheme}
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              aria-label={isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro"}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </IconButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  )
}
