export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arjan Chaudhary",
    alternateName: "arjanchaudharyy",
    description:
      "One of the youngest security researchers globally, ethical hacker, and tech entrepreneur from Nepal",
    url: "https://arjan.lol",
    image: "https://arjan.lol/profile.jpg",
    sameAs: [
      "https://www.instagram.com/arjanchaudharyy",
      "https://twitter.com/arjanchaudharyy",
      "https://www.linkedin.com/in/arjan-chaudhary-7a3108361/",
      "https://arjanchaudharyy.netlify.app",
      "https://arjanchaudharyy.lol",
      "https://github.com/arjanchaudharyy",
    ],
    jobTitle: "Security Engineer",
    worksFor: [
      {
        "@type": "Organization",
        name: "Stealth",
      },
    ],
    foundingMember: [
      {
        "@type": "Organization",
        name: "Arniko Hack Club",
        url: "https://daydreambiratnagar.com",
        description: "Tech community with 400+ active teen members",
      },
      {
        "@type": "Organization",
        name: "Glow Tech",
        description: "Digital marketing agency with 20M+ views and five-figure monthly revenue",
      },
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Cyber Alert Nepal",
    },
    knowsAbout: [
      "Offensive Security",
      "Penetration Testing",
      "Web Application Security",
      "API Security",
      "Ethical Hacking",
      "Bug Bounty Hunting",
      "Vulnerability Research",
      "Security Engineering",
      "Digital Marketing",
      "Entrepreneurship",
      "Community Building",
    ],
    award: [
      "Google Security Credits - Hacked Google at age 14",
      "Twitch Security Hall of Fame - Rank #2",
      "CVE Researcher - Youngest researcher assigned a CVE",
      "Youngest Security Researcher of Nepal",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "ACP - API Security Certified Professional",
        credentialCategory: "Professional Certification",
        recognizedBy: {
          "@type": "Organization",
          name: "APIsec University",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "CASA Certification",
        credentialCategory: "Professional Certification",
      },
    ],
    nationality: {
      "@type": "Country",
      name: "Nepal",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Arjan Chaudhary - Bio Links",
    url: "https://arjan.lol",
    description: "Official bio link page of Arjan Chaudhary, security researcher and entrepreneur",
    author: {
      "@type": "Person",
      name: "Arjan Chaudhary",
    },
    inLanguage: "en-US",
    copyrightYear: 2024,
  }

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntity: {
      "@type": "Person",
      name: "Arjan Chaudhary",
      description:
        "One of the youngest security researchers globally. Hacked Google at 14, #2 in Twitch Hall of Fame, youngest CVE researcher from Nepal.",
    },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Arniko Hack Club",
    url: "https://daydreambiratnagar.com",
    founder: {
      "@type": "Person",
      name: "Arjan Chaudhary",
    },
    description: "Tech community with 400+ active teen members, organizing Asia's largest teen hackathon",
    memberOf: {
      "@type": "Organization",
      name: "APIsec University",
      description: "Partnership to provide free $325+ certifications to members",
    },
    event: {
      "@type": "Event",
      name: "Day Dream Biratnagar",
      description: "Asia's largest teen hackathon",
      url: "https://daydreambiratnagar.com",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://arjan.lol",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
