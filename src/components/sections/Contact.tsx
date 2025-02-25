'use client'

import { useState, useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const ContactSection = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
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

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 2rem;
  }
`

const ContactInfoTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`

const ContactItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`

const ContactItemIcon = styled.div<{ color: string }>`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
`

const ContactItemContent = styled.div`
  display: flex;
  flex-direction: column;
`

const ContactItemTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.colors.text};
`

const ContactItemText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`

const ContactForm = styled(motion.form)`
  background: ${({ theme }) => theme.colors.card};
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.05);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`

const FormInput = styled(motion.input)<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid ${({ hasError, theme }) => 
    hasError 
      ? '#ff5252' 
      : theme.colors.background === '#F8F8FF' 
        ? 'rgba(75, 0, 130, 0.2)' 
        : 'rgba(255, 255, 255, 0.1)'
  };
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}30;
  }
`

const FormTextarea = styled(motion.textarea)<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid ${({ hasError, theme }) => 
    hasError 
      ? '#ff5252' 
      : theme.colors.background === '#F8F8FF' 
        ? 'rgba(75, 0, 130, 0.2)' 
        : 'rgba(255, 255, 255, 0.1)'
  };
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  min-height: 150px;
  resize: vertical;
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}30;
  }
`

const ErrorText = styled(motion.span)`
  display: block;
  color: #ff5252;
  font-size: 0.8rem;
  margin-top: 0.3rem;
`

const SubmitButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const SuccessMessage = styled(motion.div)`
  background: #66BB6A20;
  border: 1px solid #66BB6A;
  color: #66BB6A;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 1rem;
`

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Remove error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof FormErrors]
        return newErrors
      })
    }
  }
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      // Simulando uma requisição de API
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        
        // Reset submitted state after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      }, 1500)
    }
  }
  
  const formAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  }
  
  const contactInfoAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  }
  
  const contactItems = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Localização',
      content: 'São Paulo, SP - Brasil',
      color: '#4B0082'
    },
    {
      icon: <FaEnvelope />,
      title: 'E-mail',
      content: 'contato@rodrigocinelli.com',
      color: '#6A5ACD'
    },
    {
      icon: <FaPhoneAlt />,
      title: 'Telefone',
      content: '+55 (11) 98765-4321',
      color: '#9370DB'
    }
  ]

  return (
    <ContactSection id="contact" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        Entre em Contato
      </SectionTitle>
      
      <SectionDescription
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Tem um projeto em mente ou quer conversar? Preencha o formulário abaixo ou entre em contato 
        através de um dos canais disponíveis.
      </SectionDescription>
      
      <ContactContainer>
        <ContactInfo
          variants={contactInfoAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <ContactInfoTitle>Informações de Contato</ContactInfoTitle>
          
          <ContactItems>
            {contactItems.map((item, index) => (
              <ContactItem
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <ContactItemIcon color={item.color}>{item.icon}</ContactItemIcon>
                <ContactItemContent>
                  <ContactItemTitle>{item.title}</ContactItemTitle>
                  <ContactItemText>{item.content}</ContactItemText>
                </ContactItemContent>
              </ContactItem>
            ))}
          </ContactItems>
        </ContactInfo>
        
        <ContactForm
          onSubmit={handleSubmit}
          variants={formAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <FormGroup>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <FormInput
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              hasError={!!errors.name}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            {errors.name && (
              <ErrorText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.name}
              </ErrorText>
            )}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <FormInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              hasError={!!errors.email}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            {errors.email && (
              <ErrorText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.email}
              </ErrorText>
            )}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="subject">Assunto</FormLabel>
            <FormInput
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              hasError={!!errors.subject}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            {errors.subject && (
              <ErrorText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.subject}
              </ErrorText>
            )}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="message">Mensagem</FormLabel>
            <FormTextarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              hasError={!!errors.message}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            {errors.message && (
              <ErrorText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.message}
              </ErrorText>
            )}
          </FormGroup>
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? (
              'Enviando...'
            ) : (
              <>
                <FaPaperPlane /> Enviar Mensagem
              </>
            )}
          </SubmitButton>
          
          {isSubmitted && (
            <SuccessMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Sua mensagem foi enviada com sucesso! Em breve entrarei em contato.
            </SuccessMessage>
          )}
        </ContactForm>
      </ContactContainer>
    </ContactSection>
  )
} 