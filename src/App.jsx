import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Differentiators } from './components/Differentiators';
import { HorizonStories } from './components/HorizonStories';
import { Footer } from './components/Footer';
import { ApplicationWizard } from './components/ApplicationWizard';
import { PortalsModal } from './components/PortalsModal';
import { SearchModal } from './components/SearchModal';
import { HorizonAssist } from './components/HorizonAssist';
import FormationsPage from './pages/FormationsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import CampusPage from './pages/CampusPage';
import ActualitesPage from './pages/ActualitesPage';
import ContactPage from './pages/ContactPage';
import UniversitePage from './pages/UniversitePage';

export default function App() {
  // États des modales et interactions transversales
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedCourseForApply, setSelectedCourseForApply] = useState(null);

  const [portalsModalOpen, setPortalsModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [trackerSearchCode, setTrackerSearchCode] = useState('');

  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenApply = (course = null) => {
    setSelectedCourseForApply(course);
    setApplyModalOpen(true);
  };

  const handleGoToTracker = (dossierId) => {
    setTrackerSearchCode(dossierId);
    handleNavigate('tracker');
  };

  return (
    <ThemeProvider>
      <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* En-tête Principal */}
        <Header
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenPortals={() => setPortalsModalOpen(true)}
          onOpenApply={() => handleOpenApply()}
          onNavigate={handleNavigate}
        />

        {/* Corps de l'Expérience Numérique */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={
              <>
                {/* 01. Hero Immersif */}
                <Hero 
                  onOpenApply={() => handleOpenApply()} 
                  onNavigate={handleNavigate} 
                />

                {/* 02. Philosophie, Vision, Mission, Valeurs */}
                <Philosophy />

                {/* 03. Pourquoi Horizon — Différenciateurs */}
                <Differentiators />

                {/* 04. Bandeau CTA — Appel à l'action */}
                <section style={{
                  background:'linear-gradient(135deg,#0D2240 0%,#15315B 100%)',
                  padding:'5rem 0',
                  position:'relative',
                  overflow:'hidden'
                }}>
                  <div className='hero-bg-orb animate-float' style={{ width:'400px', height:'400px', top:'-100px', right:'-80px', background:'radial-gradient(circle, rgba(201,151,38,0.14) 0%, transparent 70%)', opacity:0.5 }}/>
                  <div className='hz-container' style={{ position:'relative', zIndex:1, textAlign:'center' }}>
                    <div style={{ opacity:0, transform:'translateY(32px)', animation:'fadeInUp 0.6s ease-out 0.2s both' }}>
                      <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.75rem,3vw,2.5rem)', color:'#fff', marginBottom:'1rem' }}>
                        Votre Horizon commence <span style={{ color:'var(--hz-gold-400)' }}>maintenant.</span>
                      </h2>
                      <p style={{ fontSize:'1.0625rem', color:'rgba(255,255,255,0.78)', marginBottom:'2.5rem', maxWidth:'580px', margin:'0 auto 2.5rem' }}>
                        Rejoignez les étudiantes et étudiants Horizon qui bâtissent leur avenir avec des diplômes reconnus et un encadrement d'excellence.
                      </p>
                      <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'1rem' }}>
                        <button onClick={() => handleOpenApply()} className='btn btn-gold btn-lg'>
                          Candidater maintenant
                        </button>
                        <Link to='/formations' className='btn btn-ghost-white btn-lg'>
                          Explorer les formations
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 05. Témoignages & Réussites */}
                <HorizonStories />
              </>
            } />
            <Route path="/universite" element={<UniversitePage />} />
            <Route path="/formations" element={<FormationsPage onOpenApply={handleOpenApply} />} />
            <Route path="/admissions" element={<AdmissionsPage onOpenApply={handleOpenApply} />} />
            <Route path="/campus" element={<CampusPage onOpenApply={handleOpenApply} />} />
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer Institutionnel */}
        <Footer
          onNavigate={handleNavigate}
          onOpenPortals={() => setPortalsModalOpen(true)}
          onOpenApply={() => handleOpenApply()}
        />

        {/* Modale de Candidature Officielle en 7 étapes */}
        <ApplicationWizard
          isOpen={applyModalOpen}
          onClose={() => setApplyModalOpen(false)}
          initialCourse={selectedCourseForApply}
          onGoToTracker={handleGoToTracker}
        />

        {/* Modale des Portails (Étudiant, Enseignant, Administration RBAC) */}
        <PortalsModal
          isOpen={portalsModalOpen}
          onClose={() => setPortalsModalOpen(false)}
        />

        {/* Modale de Recherche Globale */}
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSelectCourse={(course) => { setSelectedCourseForApply(course); setApplyModalOpen(true); }}
          onNavigate={handleNavigate}
        />

        {/* Assistant Flottant Zéro Hallucination : Horizon Assist™ */}
        <HorizonAssist
          onOpenApply={() => handleOpenApply()}
          onOpenPortals={() => setPortalsModalOpen(true)}
        />

      </div>
    </ThemeProvider>
  );
}
