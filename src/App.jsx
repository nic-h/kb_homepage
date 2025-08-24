import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Download, ArrowUpRight } from 'lucide-react';

const Portfolio = () => {
  const [expandedRole, setExpandedRole] = useState(null);
  const [expandedEducation, setExpandedEducation] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredParagraph, setHoveredParagraph] = useState(null);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Refs
  const barRef = useRef(null);
  const pubRef = useRef(null);
  const expRef = useRef(null);
  const eduRef = useRef(null);
  const contactRef = useRef(null);

  // Data arrays for cleaner code
  const publications = [
    { 
      href: 'https://kirstenbevin.com/Building-buffers', 
      text: 'Building buffers', 
      tip: 'View full presentation', 
      meta: "Talk for the DADo Film Society (Sept '24)" 
    },
    { 
      href: 'https://www.ahuri.edu.au/research/final-reports/390', 
      text: 'Housing aspirations for precariously housed older Australians', 
      tip: 'AHURI Final Report No. 390', 
      meta: 'James, A., Crowe, A., Tually, S., et al. AHURI Final Report No. 390 (2022)' 
    },
    { 
      href: 'https://www.ahuri.edu.au/research/final-reports/378', 
      text: 'Alternative housing models for precariously housed older Australians', 
      tip: 'AHURI Final Report No. 378', 
      meta: 'Tually, S., Coram, V., Faulkner, D., et al. AHURI Final Report No. 378 (2022)' 
    },
    { 
      href: 'https://researchrepository.rmit.edu.au/articles/thesis/Making_housing_shaping_old_age_industry_engagement_in_older_persons_housing/27595770?file=50762304', 
      text: 'Making housing, shaping old age', 
      tip: 'Full PhD Thesis', 
      meta: 'PhD Thesis, RMIT University (2021)' 
    },
    { 
      href: 'https://kirstenbevin.com/Making-housing-shaping-old-age', 
      text: 'Summary of PhD thesis', 
      tip: 'Accessible summary', 
      meta: null 
    },
    { 
      href: 'https://doi.org/10.1080/08111146.2017.1369039', 
      text: 'Shaping the Housing Grey Zone', 
      tip: 'Urban Policy and Research', 
      meta: 'Urban Policy and Research, 36(2), 215-229 (2018)' 
    },
    { 
      href: 'https://kirstenbevin.com/The-story-of-retirement-housing-in-Victoria', 
      text: 'The story of retirement housing in Victoria', 
      tip: 'Case study excerpt', 
      meta: 'Case study within the thesis' 
    },
    { 
      href: 'http://architecturemps.com/wp-content/uploads/2016/12/Architecture-MPS-7-Future-Housing_GloablCities_Regional-Problems-2.pdf', 
      text: 'Diversity and disparity: Retirement housing in age-friendly cities', 
      tip: 'Book chapter', 
      meta: 'In Future Housing: Global Cities and Regional Problems, pp. 93-99 (2016)' 
    }
  ];

  const experiences = [
    {
      id: 'dv',
      period: '2018–present',
      org: 'Development Victoria',
      role: 'Senior Design Manager',
      description: 'Design lead working across investment cases, precinct development strategies, and competitive tender processes to meet state government sustainability, employment and housing policy. Experience in project and consultant management, state and local government stakeholder engagement, brief preparation, problem definition and succinct communication of project objectives and impacts.',
      expandable: true
    },
    {
      id: 'rmit',
      period: '2015–2022',
      org: 'RMIT and AHURI',
      role: 'Researcher / Lecturer',
      description: '<strong>Researcher:</strong> Part time research role in an Australia-wide team conducting an inquiry for the Australian Housing and Urban Research Institute (AHURI)<br/><br/><strong>Lecturer:</strong> Course coordination of the Housing Policy module, part of the School of Global, Urban and Social Studies\' Masters of Environment and Planning.',
      expandable: true
    },
    {
      id: 'unsigned',
      period: '2016–2018',
      org: 'Unsigned Studio, Aurecon',
      role: 'Project Director',
      description: 'Client-facing role in creative technology studio operating within engineering firm Aurecon. Direction of digital communication tools to help explain built environment and infrastructure projects to industry, government, and community stakeholders.',
      expandable: true
    },
    {
      period: '2012–2016',
      org: 'Fender Katsalidis Architects',
      role: 'Urban Designer',
      expandable: false
    },
    {
      period: '2011',
      org: 'Architecture for Humanity',
      role: 'London (pro bono)',
      expandable: false
    },
    {
      period: '2008–2011',
      org: 'Studio Egret West',
      role: 'Urban Designer, London',
      expandable: false
    }
  ];

  useEffect(() => {
    setIsClient(true);
    setTitleAnimated(true);

    let raf = 0;
    const handleScrollRaw = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }

      const sections = [
        { ref: pubRef, name: 'publications' },
        { ref: expRef, name: 'experience' },
        { ref: eduRef, name: 'education' },
        { ref: contactRef, name: 'contact' }
      ];

      for (const s of sections) {
        const el = s.ref.current;
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 200 && r.bottom >= 200) {
          setActiveSection(s.name);
          break;
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(handleScrollRaw);
    };

    let rafMouse = 0;
    const onMouseMove = (e) => {
      cancelAnimationFrame(rafMouse);
      rafMouse = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouseY', `${e.clientY - 50}px`);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    handleScrollRaw();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafMouse);
    };
  }, []);

  const toggleRole = (role) => {
    setExpandedRole(expandedRole === role ? null : role);
  };

  const toggleEducation = (edu) => {
    setExpandedEducation(expandedEducation === edu ? null : edu);
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8E8E8', position: 'relative' }}>
      {/* Scroll Progress Bar */}
      <div
        ref={barRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          backgroundColor: '#FF6B35',
          width: '0%',
          zIndex: 100,
          transition: 'width 100ms ease'
        }}
      />

      {/* Reading Indicator */}
      {isClient && (
        <div
          className="reading-indicator"
          style={{
            position: 'fixed',
            left: 0,
            top: 'var(--mouseY, 0px)',
            width: '100%',
            height: '100px',
            background: 'linear-gradient(90deg, rgba(255,107,53,0.03) 0%, transparent 10%)',
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'top 100ms ease'
          }}
        />
      )}

      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --kb-orange: #FF6B35;
          --kb-text: #1A1A1A;
          --kb-grey: #666;
          --kb-light-grey: #999;
          --kb-bg: #E8E8E8;
          --kb-divider: #DDD;
        }

        * {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }

        .reading-indicator { display: block; }
        @media (max-width: 768px) { .reading-indicator { display: none; } }
        
        /* Kirsten Bevin title animations */
        .title-text-animated {
          position: relative;
          display: inline-block;
          cursor: default;
          transition: letter-spacing 300ms ease;
        }

        .title-text-animated:hover {
          letter-spacing: 0.02em;
        }

        .title-text-animated::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--kb-orange);
          transition: width 400ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .title-text-animated:hover::after {
          width: 100%;
        }

        @keyframes letterFadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .letter {
          display: inline-block;
          animation: letterFadeIn 0.5s ease forwards;
          opacity: 0;
        }

        /* Section titles */
        .section-title {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--kb-orange);
          margin-bottom: 1.5rem;
          position: relative;
          display: inline-block;
          cursor: pointer;
          transition: all 300ms ease;
        }

        .section-title:hover {
          transform: translateX(5px);
        }

        .section-title.active::before {
          content: '';
          position: absolute;
          left: -15px;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--kb-orange);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translateY(-50%) scale(1); }
          50% { opacity: 1; transform: translateY(-50%) scale(1.2); }
        }
        
        .cv-button {
          transition: all 200ms ease;
          font-weight: 500;
        }
        
        .cv-button:hover {
          transform: scale(1.05);
          color: var(--kb-orange);
        }
        
        .expand-icon {
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.5;
          color: var(--kb-grey);
        }
        
        .expanded {
          transform: rotate(180deg);
          opacity: 0.7;
        }
        
        .expandable {
          transition: all 150ms ease;
          border-radius: 4px;
          margin-left: -8px;
          margin-right: -8px;
          padding: 8px;
        }
        
        .expandable:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
        
        .expandable:hover .expand-icon {
          opacity: 0.8;
        }

        .expandable-content {
          overflow: hidden;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes contentFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .expanded-text {
          animation: contentFadeIn 0.4s ease forwards;
        }
        
        .pub-link {
          color: var(--kb-text);
          text-decoration: none;
          transition: all 150ms ease;
          position: relative;
          font-weight: 500;
        }
        
        .pub-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--kb-orange);
          transition: width 200ms ease;
        }
        
        .pub-link:hover {
          color: var(--kb-orange);
        }
        
        .pub-link:hover::after {
          width: 100%;
        }

        .pub-link-wrapper {
          position: relative;
        }

        .pub-link-tooltip {
          position: absolute;
          bottom: 100%;
          left: 0;
          background: #333;
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transform: translateY(5px);
          transition: all 200ms ease;
          z-index: 10;
        }

        .pub-link-wrapper:hover .pub-link-tooltip {
          opacity: 1;
          transform: translateY(-5px);
        }
        
        .divider {
          height: 1px;
          background: var(--kb-divider);
          margin: 3rem 0;
        }

        .divider-header {
          margin: 1.5rem 0 2rem 0;
        }
        
        .statement {
          font-size: 22px;
          line-height: 1.55;
          font-weight: 400;
          color: #000;
          letter-spacing: -0.02em;
        }
        
        .statement p {
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInUp 0.6s ease forwards;
          position: relative;
          padding-left: 0;
          transition: all 300ms ease;
        }

        .statement p::before {
          content: '';
          position: absolute;
          left: -15px;
          top: 0;
          height: 100%;
          width: 2px;
          background-color: var(--kb-orange);
          opacity: 0;
          transition: opacity 300ms ease;
        }

        .statement p:hover::before {
          opacity: 0.5;
        }

        .statement p.dimmed {
          opacity: 0.5;
        }

        .statement p.highlighted {
          opacity: 1 !important;
        }
        
        .statement p:nth-child(1) {
          animation-delay: 0.1s;
        }
        
        .statement p:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .statement p:nth-child(3) {
          animation-delay: 0.3s;
        }
        
        .statement p:last-child {
          margin-bottom: 0;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .contact-link {
          color: var(--kb-text);
          text-decoration: none;
          transition: color 150ms ease;
        }
        
        .contact-link:hover {
          color: var(--kb-orange);
        }
        
        @media (max-width: 640px) {
          .container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          
          .statement {
            font-size: 18px;
          }
          
          .pub-link {
            font-size: 15px;
          }
          
          .title-text {
            font-size: 15px;
          }
          
          .meta-text {
            font-size: 13px;
          }
          
          .pub-link-tooltip {
            display: none;
          }
          
          .section-title:hover {
            transform: none;
          }
          
          .section-title.active::before {
            left: -12px;
            width: 4px;
            height: 4px;
          }
        }
        
        .year-label {
          color: var(--kb-light-grey);
          font-size: 14px;
          display: block;
          margin-bottom: 4px;
        }
        
        .title-text {
          color: var(--kb-text);
          font-size: 16px;
          font-weight: 500;
        }
        
        .subtitle-text {
          color: var(--kb-grey);
          font-size: 16px;
          font-weight: 400;
        }
        
        .meta-text {
          color: var(--kb-grey);
          font-size: 14px;
          margin-top: 4px;
        }
      `}} />

      {/* Header */}
      <header className="pt-12 pb-6">
        <div className="max-w-3xl mx-auto px-8 container">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-light tracking-tight title-text-animated" style={{ 
              color: 'var(--kb-orange)', 
              fontWeight: 400
            }}>
              {titleAnimated ? (
                <>
                  {'Kirsten Bevin'.split('').map((letter, i) => (
                    <span key={i} className="letter" style={{ animationDelay: `${i * 0.05}s` }}>
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </>
              ) : (
                'Kirsten Bevin'
              )}
            </h1>
            <a 
              href="/kirsten-bevin-cv.pdf" 
              download
              className="cv-button mt-2 text-sm flex items-center gap-2 px-2 py-1 hover:text-orange-500"
            >
              <Download size={14} aria-hidden="true" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-8 container">
        <div className="divider divider-header"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-8 pb-16 container">
        {/* Statement */}
        <section className="mb-12">
          <div className="statement">
            <p 
              className={hoveredParagraph && hoveredParagraph !== 1 ? 'dimmed' : hoveredParagraph === 1 ? 'highlighted' : ''}
              onMouseEnter={() => setHoveredParagraph(1)}
              onMouseLeave={() => setHoveredParagraph(null)}
            >
              I research and write about social and urban issues and their theory, policy, and industry intersections.
            </p>
            
            <p 
              className={hoveredParagraph && hoveredParagraph !== 2 ? 'dimmed' : hoveredParagraph === 2 ? 'highlighted' : ''}
              onMouseEnter={() => setHoveredParagraph(2)}
              onMouseLeave={() => setHoveredParagraph(null)}
            >
              Alongside my research I work in urban renewal, helping government shape the strategies and outcomes of 
              long-term large-scale precinct development to achieve economic, social and sustainability goals.
            </p>
            
            <p 
              className={hoveredParagraph && hoveredParagraph !== 3 ? 'dimmed' : hoveredParagraph === 3 ? 'highlighted' : ''}
              onMouseEnter={() => setHoveredParagraph(3)}
              onMouseLeave={() => setHoveredParagraph(null)}
            >
              In both my research and practice I transform complex projects and problems into clear ideas and directions.
            </p>
          </div>
        </section>

        {/* Publications Section */}
        <section className="mb-12" ref={pubRef}>
          <h2 
            className={`section-title ${activeSection === 'publications' ? 'active' : ''}`}
            onClick={() => scrollToSection(pubRef)}
          >
            Publications
          </h2>
          <div className="space-y-4">
            {publications.map((pub, idx) => (
              <div key={idx} className="mb-1">
                <div className="pub-link-wrapper" style={{ display: 'inline-block' }}>
                  <a 
                    href={pub.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="pub-link inline-flex items-center gap-1"
                  >
                    {pub.text}
                    <ArrowUpRight size={13} style={{ marginLeft: '2px' }} aria-hidden="true" />
                  </a>
                  <div className="pub-link-tooltip">{pub.tip}</div>
                </div>
                {pub.meta && <div className="meta-text">{pub.meta}</div>}
              </div>
            ))}
          </div>
        </section>

        <div className="divider"></div>

        {/* Experience Section */}
        <section className="mb-12" ref={expRef}>
          <h2 
            className={`section-title ${activeSection === 'experience' ? 'active' : ''}`}
            onClick={() => scrollToSection(expRef)}
          >
            Experience
          </h2>
          <div className="space-y-2">
            {experiences.map((exp, idx) => (
              <div key={idx}>
                {exp.expandable ? (
                  <>
                    <button
                      onClick={() => toggleRole(exp.id)}
                      className="w-full text-left expandable"
                      aria-expanded={expandedRole === exp.id}
                      aria-controls={`exp-${exp.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="year-label">{exp.period}</span>
                          <div>
                            <span className="title-text">{exp.org}</span>
                          </div>
                          <div className="meta-text">{exp.role}</div>
                        </div>
                        <ChevronDown 
                          size={18} 
                          className={`expand-icon mt-1 ${expandedRole === exp.id ? 'expanded' : ''}`}
                          aria-hidden="true"
                        />
                      </div>
                    </button>
                    <div 
                      id={`exp-${exp.id}`}
                      role="region"
                      aria-label={`${exp.org} details`}
                      className="expandable-content"
                      style={{
                        maxHeight: expandedRole === exp.id ? '500px' : '0',
                        opacity: expandedRole === exp.id ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <div 
                        className={`mt-3 text-sm leading-relaxed pl-0 ${expandedRole === exp.id ? 'expanded-text' : ''}`} 
                        style={{ color: 'var(--kb-grey)', paddingRight: '2rem' }}
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    </div>
                  </>
                ) : (
                  <div className={idx === 3 ? 'mt-3' : ''}>
                    <span className="year-label">{exp.period}</span>
                    <div>
                      <span className="title-text">{exp.org}</span>
                    </div>
                    <div className="meta-text">{exp.role}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="divider"></div>

        {/* Education Section */}
        <section className="mb-12" ref={eduRef}>
          <h2 
            className={`section-title ${activeSection === 'education' ? 'active' : ''}`}
            onClick={() => scrollToSection(eduRef)}
          >
            Education
          </h2>
          <div className="space-y-2">
            <div>
              <button
                onClick={() => toggleEducation('phd')}
                className="w-full text-left expandable"
                aria-expanded={expandedEducation === 'phd'}
                aria-controls="edu-phd"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="year-label">2021</span>
                    <div>
                      <span className="title-text">PhD, RMIT Melbourne</span>
                    </div>
                    <div className="meta-text">Housing & Ageing Research</div>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`expand-icon mt-1 ${expandedEducation === 'phd' ? 'expanded' : ''}`}
                    aria-hidden="true"
                  />
                </div>
              </button>
              <div 
                id="edu-phd"
                role="region"
                aria-label="PhD details"
                className="expandable-content"
                style={{
                  maxHeight: expandedEducation === 'phd' ? '500px' : '0',
                  opacity: expandedEducation === 'phd' ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className={`mt-3 text-sm leading-relaxed pl-0 ${expandedEducation === 'phd' ? 'expanded-text' : ''}`} 
                     style={{ color: 'var(--kb-grey)', paddingRight: '2rem' }}>
                  The thesis <em>Making housing, shaping old age: Industry engagement in older persons housing</em> 
                  explored the housing industry response to an ageing population and the mechanisms of
                  housing provision that shape expectations and options for old age.
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="year-label">2015</span>
                <div>
                  <span className="title-text">Graduate Certificate</span>
                </div>
                <div className="meta-text">Environment and Planning, RMIT</div>
              </div>

              <div>
                <span className="year-label">2005</span>
                <div>
                  <span className="title-text">Masters of Architecture</span>
                </div>
                <div className="meta-text">University of Tasmania</div>
              </div>

              <div>
                <span className="year-label">2001</span>
                <div>
                  <span className="title-text">Bachelor of Environmental Design</span>
                </div>
                <div className="meta-text">University of Tasmania</div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* Contact Section */}
        <section ref={contactRef}>
          <h2 
            className={`section-title ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => scrollToSection(contactRef)}
          >
            Contact
          </h2>
          <div className="space-y-2">
            <div>
              <a href="mailto:kirsten@kirstenbevin.com" 
                 className="contact-link text-base">
                kirsten@kirstenbevin.com
              </a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/kirstenjbevin/" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="contact-link text-base">
                LinkedIn
              </a>
            </div>
            <div>
              <span className="text-base" style={{ color: 'var(--kb-text)' }}>
                0410 772 545
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t" style={{ borderColor: 'var(--kb-divider)' }}>
        <div className="max-w-3xl mx-auto px-8 py-6 container">
          <p className="text-sm" style={{ color: 'var(--kb-light-grey)' }}>
            © Kirsten Bevin 2025
          </p>
        </div>
      </footer>
        </div>
  );
};

export default Portfolio;