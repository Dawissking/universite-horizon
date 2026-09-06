import React, { useState, useRef, useEffect } from 'react';
import { FAQ, INSTITUTION, COURSES, DOMAINS } from '../data/horizonData';
import { MessageSquare, X, Send, Sparkles, AlertCircle, Bot, User, ChevronRight } from 'lucide-react';

export const HorizonAssist = ({ onOpenApply, onOpenPortals }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Bonjour ! Je suis Horizon Assist, votre assistant officiel d'orientation. Comment puis-je vous renseigner aujourd'hui sur l'Université Horizon ?",
      time: 'Maintenant'
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "Les diplômes sont-ils reconnus ?",
    "Quelles sont les formations accélérées ?",
    "Où se situent les campus ?",
    "Comment candidater en ligne ?"
  ];

  const handleSend = (textToSend) => {
    const query = (textToSend || inputMessage).trim().toLowerCase();
    if (!query) return;

    // Ajouter message utilisateur
    const userMsg = {
      sender: 'user',
      text: textToSend || inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    // Réponse déterministe basée EXCLUSIVEMENT sur les données officielles
    setTimeout(() => {
      let botResponse = "";

      if (query.includes('reconnu') || query.includes('etat') || query.includes('diplome') || query.includes('agrément')) {
        botResponse = "Oui, les diplômes et filières de l'Université Horizon sont reconnus par l'État malien et conformes aux exigences du schéma LMD.";
      } else if (query.includes('campus') || query.includes('adresse') || query.includes('localisation') || query.includes('bamako') || query.includes('golf')) {
        botResponse = "L'Université Horizon dispose de deux campus : le Campus Principal à Bamako et le Campus Horizon Golf, dotés d'amphithéâtres et de laboratoires technologiques.";
      } else if (query.includes('accélérée') || query.includes('certificat') || query.includes('transit') || query.includes('qhse') || query.includes('court')) {
        botResponse = "L'Université Horizon dispense 6 formations certifiantes accélérées : Transit Douane, QHSE & RSE, Informatique Bureautique, Assistante Comptable, Action Humanitaire et Logistique Humanitaire.";
      } else if (query.includes('candidater') || query.includes('inscription') || query.includes('postuler') || query.includes('dossier')) {
        botResponse = "Vous pouvez candidater directement en ligne via notre plateforme en 7 étapes simples (Bouton 'Candidater' en haut de page), ou déposer votre dossier physique auprès du service de scolarité.";
      } else if (query.includes('prix') || query.includes('frais') || query.includes('tarif') || query.includes('coût') || query.includes('combien')) {
        botResponse = "Les informations financières officielles et grilles tarifaires sont communiquées par le service des admissions lors du dépôt de votre dossier [INFORMATION OFFICIELLE À FOURNIR].";
      } else if (query.includes('portail') || query.includes('connexion') || query.includes('espace')) {
        botResponse = "Les portails dédiés (Espace Étudiant, Espace Enseignant et Administration RBAC) sont accessibles via le bouton 'Portails & Espaces' situé en haut de page.";
      } else {
        // RÈGLE STRICTE ZÉRO HALLUCINATION DU CAHIER DES CHARGES
        botResponse = "Cette information n'est pas disponible dans notre base officielle. Veuillez contacter l'administration de l'Université Horizon via notre rubrique Contact ou nos guichets de Bamako.";
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 400);
  };

  return (
    <>
      {/* Bouton Flottant Déclencheur */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn"
        aria-label="Assistant Horizon Assist"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1500,
          background: 'linear-gradient(135deg, var(--hz-navy-900) 0%, var(--hz-navy-800) 100%)',
          color: '#FFFFFF',
          border: '2px solid var(--hz-gold-primary)',
          borderRadius: 'var(--radius-full)',
          padding: '12px 20px',
          boxShadow: 'var(--shadow-gold)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'var(--hz-gold-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#071526'
        }}>
          {isOpen ? <X size={16} /> : <Bot size={16} />}
        </div>
        <span style={{ fontWeight: '700', fontSize: '0.875rem' }}>
          {isOpen ? "Fermer l'aide" : "Horizon Assist™"}
        </span>
      </button>

      {/* Fenêtre de Discussion */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '84px',
            right: '24px',
            width: '380px',
            maxWidth: 'calc(100vw - 48px)',
            height: '520px',
            background: 'var(--bg-surface)',
            border: '2px solid var(--hz-gold-border)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 1500,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 200ms ease-out'
          }}
        >
          {/* Header de la discussion */}
          <div style={{
            background: 'linear-gradient(135deg, var(--hz-navy-900) 0%, var(--hz-navy-800) 100%)',
            color: '#FFFFFF',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--hz-gold-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--hz-gold-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#071526'
              }}>
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '0.9375rem' }}>HORIZON ASSIST™</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--hz-gold-light)' }}>
                  Base Officielle • Zéro Hallucination
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ color: '#FFFFFF', opacity: 0.8 }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Corps des messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: 'var(--bg-main)'
          }}>
            {messages.map((msg, idx) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isBot ? 'flex-start' : 'flex-end'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: isBot ? 'var(--bg-surface)' : 'var(--hz-navy-900)',
                      color: isBot ? 'var(--text-primary)' : '#FFFFFF',
                      border: isBot ? '1px solid var(--border-subtle)' : '1px solid var(--hz-gold-primary)',
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '3px', padding: '0 4px' }}>
                    {msg.time}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions d'amorces rapides */}
          <div style={{
            padding: '8px 12px',
            background: 'var(--bg-subtle)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                style={{
                  fontSize: '0.6875rem',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-secondary)'
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Barre de saisie */}
          <div style={{
            padding: '10px',
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              placeholder="Posez votre question officielle..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-main)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleSend()}
              className="btn btn-gold btn-sm"
              style={{ padding: '8px 12px' }}
            >
              <Send size={16} />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
