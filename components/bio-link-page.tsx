"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Calendar, FileText, Linkedin, Instagram, Facebook, Twitter, ChevronRight, Globe } from "lucide-react"

interface LinkData {
  name: string
  url: string
  icon: React.ReactNode
}

const links: LinkData[] = [
  {
    name: "Portfolio",
    url: "https://arjanchaudharyy.netlify.app/",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/arjan-chaudhary-7a3108361/",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/arjanchaudharyy",
    icon: <Twitter className="w-5 h-5" />,
  },
  {
    name: "Blogs (Medium)",
    url: "https://medium.com/@arjanchaudharyy",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/arjanchaudharyy",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=100082398134972",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    name: "Calendly",
    url: "https://calendly.com/arjanchaudharyy",
    icon: <Calendar className="w-5 h-5" />,
  },
]

export function BioLinkPage() {
  const [clickedLinks, setClickedLinks] = useState<Set<string>>(new Set())
  const [age, setAge] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const torchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateAge = () => {
      const birthDate = new Date(2010, 8, 23) // September 23, 2010 (month is 0-indexed)
      const now = new Date()
      const ageInMilliseconds = now.getTime() - birthDate.getTime()
      const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
      return ageInYears.toFixed(8) // Increased decimal places to 8 for more visible changes
    }

    setAge(calculateAge())

    const interval = setInterval(() => {
      setAge(calculateAge())
    }, 50) // Update every 50ms instead of 1000ms for constantly changing age

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const trackPageVisit = async () => {
      try {
        await fetch("/api/track-visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
        })
      } catch (error) {}
    }

    trackPageVisit()
  }, [])

  const handleLinkClick = (linkName: string, url: string) => {
    setClickedLinks((prev) => new Set(prev).add(linkName))

    fetch("/api/track-click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        linkName,
        url,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      }),
    }).catch(() => {})
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:arjanchaudharyy@gmail.com"
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div
        ref={torchRef}
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
        }}
      />
      <div className="container mx-auto px-4 py-8 max-w-md relative z-10">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src="/profile.jpg"
              alt="Arjan Chaudhary"
              fill
              className="rounded-full object-cover border-4 border-gray-800"
              priority
            />
          </div>

          <h1 className="text-2xl font-bold mb-2 text-balance">Arjan Chaudhary</h1>

          <p className="text-gray-400 text-sm leading-relaxed text-pretty">
            Just Turned {age} yo | security engineer @ stealth | into startups | bug bounty hunter | co founder @ glowtech | ACP | CASA | COSJ | CCEP | 1x CVE | braces suck sm !!! 
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {links.map((link) => (
            <Card
              key={link.name}
              className="bg-gray-900 border-gray-800 p-0 overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 no-underline"
                onClick={(e) => {
                  handleLinkClick(link.name, link.url)
                }}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="flex-shrink-0 text-white">{link.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white">{link.name}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </a>
            </Card>
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-400 text-sm mb-4">I love reading emails!</p>
          <Button
            onClick={handleEmailClick}
            className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-800 px-6 py-3 rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            Drop me a line
          </Button>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">© 2025 Arjan Chaudhary. Made with love</p>
        </div>
      </div>
    </div>
  )
}
