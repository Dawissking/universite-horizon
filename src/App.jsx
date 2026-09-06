import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Differentiators } from './components/Differentiators';
import { DomainsSection } from './components/DomainsSection';
import { OrientationWizard } from './components/OrientationWizard';
import { CoursesExplorer } from './components/CoursesExplorer';
import { PathSimulator } from './components/PathSimulator';
import { CompassSection } from './components/CompassSection';
import { ApplicationTracker } from './components/ApplicationTracker';
import { CampusTour } from './components/CampusTour';
import { HorizonLive } from './components/HorizonLive';
import { HorizonStories } from './components/HorizonStories';
import { ContactSection } from './components/ContactSection';
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
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
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

                {/* 02. L'Horizon (Philosophie, Vision, Mission, Valeurs) */}
                <Philosophy />

                {/* 03. Pourquoi Horizon ? (Différenciateurs Interactifs) */}
                <Differentiators />

                {/* 04. Nos Domaines Académiques */}
                <DomainsSection
                  onSelectDomain={() => handleNavigate('formations')}
                  onOpenDetails={(course) => setSelectedCourseDetails(course)}
                />

                {/* 05. Assistant Intelligent d'Orientation : Horizon Match™ */}
                <OrientationWizard
                  onOpenApply={() => handleOpenApply()}
                  onOpenCourseDetails={(course) => setSelectedCourseDetails(course)}
                />

                {/* 06. Explorateur de Formations */}
                <CoursesExplorer
                  onOpenApply={(course) => handleOpenApply(course)}
                  selectedCourseModal={selectedCourseDetails}
                  setSelectedCourseModal={setSelectedCourseDetails}
                />

                {/* 07. Simulateur de Parcours : Mon Horizon Architect™ */}
                <PathSimulator
                  onOpenApply={(course) => handleOpenApply(course)}
                />

                {/* 19. Boussole Universitaire : Horizon Compass™ */}
                <CompassSection />

                {/* 09. Suivi de Candidature : Où en est ma candidature ? */}
                <ApplicationTracker
                  searchCode={trackerSearchCode}
                />

                {/* 14. Campus Numérique : Bamako & Golf */}
                <CampusTour />

                {/* 15. Horizon Live : Conférences & Événements */}
                <HorizonLive />

                {/* 16. Horizon Stories : Récits d'Étudiants & Alumni */}
                <HorizonStories />

                {/* 28. Contact Intelligent & Aiguillage */}
                <ContactSection />
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
          onSelectCourse={(course) => setSelectedCourseDetails(course)}
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
