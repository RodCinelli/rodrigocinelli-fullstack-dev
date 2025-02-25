'use client'

import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { FaPython, FaJs, FaNodeJs, FaReact, FaDocker, FaGitAlt, FaBrain } from 'react-icons/fa'
import { SiTypescript, SiDjango } from 'react-icons/si'

const SkillsSection = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(75, 0, 130, 0.05)' 
      : '#151515'
  };
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(75, 0, 130, 0.1)' 
      : 'rgba(255, 255, 255, 0.05)'
  };
  border-bottom: 1px solid ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(75, 0, 130, 0.1)' 
      : 'rgba(255, 255, 255, 0.05)'
  };
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

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 1000px;
  width: 100%;
`

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`

const SkillInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 180px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`

const SkillIcon = styled.div<{ bgColor: string }>`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${({ bgColor }) => bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
`

const SkillName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const ProgressWrapper = styled.div`
  flex: 1;
  position: relative;
`

const ProgressBarBackground = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(75, 0, 130, 0.15)' 
      : 'rgba(255, 255, 255, 0.1)'
  };
  border-radius: 10px;
  overflow: hidden;
`

const ProgressBar = styled(motion.div)<{ percentage: number; barColor: string }>`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background: ${({ barColor }) => barColor};
  border-radius: 10px;
`

const PercentageText = styled.span`
  position: absolute;
  right: 0;
  top: -25px;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

interface SkillItemProps {
  name: string;
  percentage: number;
  icon: JSX.Element;
  color: string;
  index: number;
  inView: boolean;
}

const SkillItemComponent = ({ name, percentage, icon, color, index, inView }: SkillItemProps) => {
  return (
    <SkillItem
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <SkillInfo>
        <SkillIcon 
          bgColor={color}
          as={motion.div}
          whileHover={{ 
            y: -5, 
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
            rotate: [0, -5, 5, -5, 0]
          }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </SkillIcon>
        <SkillName>{name}</SkillName>
      </SkillInfo>
      <ProgressWrapper>
        <PercentageText>{percentage}%</PercentageText>
        <ProgressBarBackground>
          <ProgressBar 
            percentage={percentage} 
            barColor={color}
            initial={{ width: 0 }}
            animate={inView ? { width: `${percentage}%` } : { width: 0 }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
          />
        </ProgressBarBackground>
      </ProgressWrapper>
    </SkillItem>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  const skills = [
    { 
      name: 'Python', 
      percentage: 90, 
      icon: <FaPython />, 
      color: '#306998' 
    },
    { 
      name: 'Inteligência Artificial', 
      percentage: 95, 
      icon: <FaBrain />, 
      color: '#9C27B0' 
    },
    { 
      name: 'JavaScript', 
      percentage: 90, 
      icon: <FaJs />, 
      color: '#F7DF1E', 
    },
    { 
      name: 'TypeScript', 
      percentage: 90, 
      icon: <SiTypescript />, 
      color: '#3178C6' 
    },
    { 
      name: 'Node.js', 
      percentage: 90, 
      icon: <FaNodeJs />, 
      color: '#339933' 
    },
    { 
      name: 'React', 
      percentage: 90, 
      icon: <FaReact />, 
      color: '#61DAFB' 
    },
    { 
      name: 'Django', 
      percentage: 80, 
      icon: <SiDjango />, 
      color: '#092E20' 
    },
    { 
      name: 'Docker', 
      percentage: 80, 
      icon: <FaDocker />, 
      color: '#2496ED' 
    },
    { 
      name: 'Git', 
      percentage: 95, 
      icon: <FaGitAlt />, 
      color: '#F05032' 
    }
  ]

  return (
    <SkillsSection id="skills" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        Minhas Skills
      </SectionTitle>
      
      <SkillsContainer>
        {skills.map((skill, index) => (
          <SkillItemComponent 
            key={skill.name}
            name={skill.name}
            percentage={skill.percentage}
            icon={skill.icon}
            color={skill.color}
            index={index}
            inView={isInView}
          />
        ))}
      </SkillsContainer>
    </SkillsSection>
  )
} 