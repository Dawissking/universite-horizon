import React from 'react';
import {
  Target, Rocket, Star, Handshake, Trophy, Users, Lightbulb,
  Globe, Wrench, GraduationCap, Library, Laptop, Briefcase, CalendarDays,
  CheckCircle2, FolderOpen, MonitorPlay, BarChart3, Ship, Settings,
  Building2, UserCog, MapPinned, HeartPulse, BookOpen, Microscope,
  Activity, ShieldPlus, Stethoscope, Syringe
} from 'lucide-react';

/**
 * Catalogue d'icônes institutionnelles.
 * Remplace les emojis par des icônes vectorielles lucide-react
 * afin de garantir un rendu professionnel et cohérent.
 */
export const ICON_MAP = {
  target: Target,
  rocket: Rocket,
  star: Star,
  handshake: Handshake,
  trophy: Trophy,
  users: Users,
  bulb: Lightbulb,
  globe: Globe,
  wrench: Wrench,
  graduation: GraduationCap,
  library: Library,
  laptop: Laptop,
  briefcase: Briefcase,
  calendar: CalendarDays,
  check: CheckCircle2,
  folder: FolderOpen,
  monitor: MonitorPlay,
  chart: BarChart3,
  ship: Ship,
  settings: Settings,
  building: Building2,
  usercog: UserCog,
  mappin: MapPinned,
  health: HeartPulse,
  book: BookOpen,
  microscope: Microscope,
  activity: Activity,
  shieldplus: ShieldPlus,
  stethoscope: Stethoscope,
  syringe: Syringe
};

/**
 * Rend une icône à partir de sa clé, avec une taille et une couleur
 * cohérentes sur tout le site.
 */
export const Icon = ({ name, size = 30, color = 'var(--hz-gold-primary)', strokeWidth = 1.75, className, style }) => {
  const Cmp = ICON_MAP[name] || Target;
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size * 1.9}px`,
        height: `${size * 1.9}px`,
        borderRadius: 'var(--radius-md)',
        background: 'var(--hz-gold-bg)',
        border: '1px solid var(--hz-gold-border)',
        color,
        flexShrink: 0,
        ...style
      }}
    >
      <Cmp size={size} strokeWidth={strokeWidth} />
    </span>
  );
};

export default Icon;
