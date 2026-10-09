import {
  useEffect, useRef, useState, useCallback,
  type ReactNode,
} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowRight, Baby, Check, ChevronDown, ExternalLink,
  Eye, HeartPulse, MapPin, Menu, Phone,
  ShieldCheck, Star, Stethoscope, UserRoundCheck, X, Clock,
  Award, Building2, Users, Maximize2, ChevronLeft, ChevronRight,
} from 'lucide-react';
import {
  doctors, faqs, googleRating, googleReviews, hospital,
  patientJourney, serviceCategories, trustCards, whyChooseUs, galleryImages, insurancePartners,
} from './data/hospital';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Constants Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const callUrl = 'tel:08819225123';
const eyeCareCallUrl = 'tel:+919885225123';
const callMobileUrl = `tel:+919246744123`;
const directionUrl = hospital.directionsUrl;
const queryClient = new QueryClient();

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Navigation Items Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const navItems: Array<[string, string]> = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Gallery', '#gallery'],
  ['Doctors', '#team'],
  ['Reviews', '#reviews'],
  ['Contact', '#contact'],
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Scroll Reveal Hook Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
        .forEach(el => el.classList.add('visible'));
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    targets.forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [prefersReducedMotion]);
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Animated Counter Hook Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Stats Section Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const statsData = [
  { icon: Award,      label: 'Years of Trusted Healthcare', value: hospital.yearsOfTrust, qualitative: null,       suffix: '' },
  { icon: Users,      label: 'Specialist Doctors',          value: doctors.length,        qualitative: null,       suffix: '' },
  { icon: Building2,  label: 'Areas of Care',               value: 3,                     qualitative: null,       suffix: '' },
  { icon: ShieldCheck,label: 'Insurance Facilities',        value: null,                  qualitative: 'Cashless', suffix: '' },
];

function StatItem({ icon: Icon, label, value, qualitative, suffix, start }: typeof statsData[0] & { start: boolean }) {
  const count = useCounter(value ?? 0, 1600, start && value !== null);
  return (
    <div className="stat-item reveal">
      <Icon className="stat-icon" size={24} />
      <span className="stat-number">
        {value !== null ? count : qualitative}{value !== null && suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function StatsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="stats-section section-pad" aria-label="Nisa Hospital at a glance">
      <div className="wrap">
        <div className="stats-grid stagger">
          {statsData.map(s => <StatItem key={s.label} {...s} start={inView} />)}
        </div>
      </div>
    </section>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Brand Lockup Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function BrandLockup({ footer = false }: { footer?: boolean }) {
  return (
    <a className="brand" href="#home" aria-label="Nisa Hospital home">
      <img
        src="/nisa-logo.jpg"
        alt="Nisa Hospital Ã¢â‚¬â€ Eye Care, Women & Child Care"
        className={footer ? 'brand-logo-footer' : 'brand-logo'}
      />
    </a>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Section Heading Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function SectionHeading({
  kicker, title, description, light = false, center = false,
}: {
  kicker?: string; title: string | ReactNode; description?: string; light?: boolean; center?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? 'light' : ''} ${center ? 'center' : ''}`.trim()}>
      {kicker && <span className="eyebrow">{kicker}</span>}
      <h2 className="display-font">{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Service Icon Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function DeptIcon({ icon }: { icon: string }) {
  if (icon === 'eye')
    return <div className="department-icon gold"><Eye size={24} /></div>;
  if (icon === 'heart')
    return <div className="department-icon red"><HeartPulse size={24} /></div>;
  if (icon === 'baby')
    return <div className="department-icon gold"><Baby size={24} /></div>;
  return <div className="department-icon red"><ShieldCheck size={24} /></div>;
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Main Hospital Page Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function HospitalHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : prev));
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : prev));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else if (!menuOpen) {
      document.body.style.overflow = '';
    }
  }, [lightboxIndex, menuOpen]);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [lang, setLang] = useState<'en' | 'te'>('en');
  const heroRef = useRef<HTMLElement>(null);

  useScrollReveal();

  // Navbar transparency logic
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setHeroVisible(heroBottom > 0);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Re-trigger scroll reveal on mount for any already-visible elements
  useEffect(() => {
    window.dispatchEvent(new Event('scroll'));
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const headerClass = [
    'site-header',
    isScrolled ? 'scrolled' : '',
    isScrolled && !heroVisible ? 'hero-passed' : '',
  ].filter(Boolean).join(' ');

  const te = lang === 'te';

  return (
    <main id="main-content">
      <a className="skip-link" href="#home">Skip to main content</a>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ TOP BAR Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <div className="topline">
        <div className="wrap topline-inner">
          <span>
            <MapPin size={13} aria-hidden="true" />
            {hospital.location}
            <i aria-hidden="true">|</i>
            <a href={directionUrl} target="_blank" rel="noreferrer">Get Directions</a>
          </span>
          <span>
            {/* Language switcher */}
            <span className="lang-toggle" role="group" aria-label="Language selection">
              <button
                type="button"
                className={`lang-btn${lang === 'en' ? ' active' : ''}`}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                aria-label="Switch to English"
              >
                English
              </button>
              <button
                type="button"
                className={`lang-btn telugu${lang === 'te' ? ' active' : ''}`}
                onClick={() => setLang('te')}
                aria-pressed={lang === 'te'}
                aria-label="Switch to Telugu"
              >
                తెలుగు
              </button>
            </span>
            <i aria-hidden="true">|</i>
            <Phone size={13} aria-hidden="true" />
            <a href={callUrl}>{hospital.phone}</a>
            <i aria-hidden="true">|</i>
            <a href={callMobileUrl}>{hospital.phoneMobile}</a>
          </span>
        </div>
      </div>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ HEADER Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <header className={headerClass}>
        <div className="wrap nav-row">
          <BrandLockup />
          <nav id="primary-navigation" className="main-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href={hospital.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Follow Nisa Hospital on Instagram" style={{ color: '#2E1F24', display: 'flex', alignItems: 'center' }} className="hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href={callUrl} className="nav-cta" aria-label={`Call Nisa Hospital ${hospital.phone}`}>
              <Phone size={15} aria-hidden="true" /> Call Hospital
            </a>
          </div>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(o => !o)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ MOBILE MENU Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      {menuOpen && (
        <div className="mobile-menu-overlay" role="dialog" aria-label="Navigation menu" aria-modal="true">
          <div className="mobile-menu-top">
            <BrandLockup />
            <button
              className="menu-toggle"
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <nav className="mobile-menu-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="nav-link"
                onClick={closeMenu}
              >
                <span>{label}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <div className="mobile-menu-actions">
            <a href={callUrl} className="mobile-menu-cta" onClick={closeMenu}>
              <Phone size={18} aria-hidden="true" />
              {te ? 'హాస్పిటల్ కు కాల్ చేయండి' : 'Call Hospital'}
            </a>
            <div className="mobile-contact-row">
              <a
                href={directionUrl}
                target="_blank"
                rel="noreferrer"
                className="button button-outline"
                style={{ justifyContent: 'center' }}
              >
                <MapPin size={16} aria-hidden="true" /> Get Directions
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ HERO Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <section
        id="home"
        className="hero-section relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FEF0F2 0%, #FDF5F6 40%, #FEF0F2 70%, #FBE8EC 100%)', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        ref={heroRef}
        aria-label="Welcome to Nisa Hospital"
      >
        {/* Rich layered background glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,190,202,0.55) 0%, transparent 65%)' }}></div>
          <div style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,190,202,0.4) 0%, transparent 65%)' }}></div>
          <div style={{ position: 'absolute', top: '40%', left: '40%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,16,46,0.04) 0%, transparent 65%)' }}></div>
        </div>

        {/* Dotted grid - top right */}
        <div className="absolute top-6 hidden lg:block pointer-events-none" style={{ right: '5%', zIndex: 0, opacity: 0.18 }}>
          <svg width="140" height="120" viewBox="0 0 140 120">
            {[0,1,2,3,4,5,6].map(row => [0,1,2,3,4,5,6,7].map(col => (
              <circle key={`${row}-${col}`} cx={col * 18 + 6} cy={row * 16 + 6} r="2.5" fill="#C8102E" />
            )))}
          </svg>
        </div>
        {/* Dotted grid - bottom left */}
        <div className="absolute bottom-10 left-4 hidden lg:block pointer-events-none" style={{ zIndex: 0, opacity: 0.12 }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            {[0,1,2,3,4].map(row => [0,1,2,3,4].map(col => (
              <circle key={`l${row}-${col}`} cx={col * 16 + 6} cy={row * 16 + 6} r="2.5" fill="#C8102E" />
            )))}
          </svg>
        </div>

        {/* Main container */}
        <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-0" style={{ zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] items-center gap-12 lg:gap-8">

            {/* â”€â”€ LEFT COLUMN â”€â”€ */}
            <div className="flex flex-col items-start">

              {/* Location badge */}
              <div
                className="inline-flex items-center gap-2 mb-6"
                style={{
                  border: '1px solid #E0A0AB',
                  borderRadius: '999px',
                  padding: '7px 16px',
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(6px)',
                  boxShadow: '0 2px 12px rgba(200,16,46,0.06)',
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#C8102E', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 0 3px rgba(200,16,46,0.15)' }} aria-hidden="true"></span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#C8102E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>NISA HOSPITAL  TANUKU</span>
              </div>

              {/* Main heading */}
              <h1
                style={{
                  fontSize: 'clamp(44px, 5.2vw, 72px)',
                  fontWeight: 900,
                  lineHeight: te ? 1.35 : 1.0,
                  letterSpacing: te ? '0' : '-0.03em',
                  color: '#2E1118',
                  marginBottom: '22px',
                  maxWidth: '480px',
                  fontFamily: te ? "'Noto Sans Telugu', sans-serif" : 'inherit',
                }}
              >
                {te ? (
                  <>నిసా హాస్పిటల్<br /><span style={{ color: '#C8102E' }}>నమ్మకమైన వైద్య సేవ</span><br />ప్రతి కుటుంబానికి</>
                ) : (
                  <>Nisa<br /><span style={{ color: '#C8102E' }}>Hospital</span><br /><span style={{ fontSize: '58%', color: '#6B3040', fontWeight: 700, letterSpacing: '-0.01em' }}>Trusted Care for Every Family</span></>
                )}
              </h1>

              {/* Subtitle */}
              <p style={{ fontSize: '17px', color: '#6B5258', lineHeight: 1.7, maxWidth: '400px', marginBottom: '28px', fontFamily: te ? "'Noto Sans Telugu', sans-serif" : 'inherit' }}>
                {te
                  ? 'తణుకులో కళ్ళు, మహిళలు మరియు పిల్లల కోసం ఆప్యాయతతో కూడిన వైద్య సేవలు.'
                  : 'Compassionate specialist healthcare for eyes, women and children - right here in Tanuku.'}
              </p>

              {/* Trust stat card */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '16px 22px',
                  marginBottom: '28px',
                  maxWidth: '380px',
                  width: '100%',
                  border: '1px solid rgba(220,160,170,0.3)',
                  boxShadow: '0 4px 24px rgba(200,16,46,0.07), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
              >
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: '48px', fontWeight: 900, color: '#C8102E', lineHeight: 1, letterSpacing: '-0.04em' }}>{hospital.yearsOfTrust}</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#C8102E', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>Years</div>
                </div>
                <div style={{ width: 1, height: 50, background: 'rgba(200,16,46,0.15)', flexShrink: 0 }}></div>
                <div>
                  <strong style={{ fontSize: '14px', fontWeight: 700, color: '#2E1F24', display: 'block', lineHeight: 1.3, marginBottom: '3px' }}>
                    {te ? 'సంవత్సరాల నమ్మకమైన వైద్య సేవ' : 'Trusted Healthcare'}
                  </strong>
                  <span style={{ fontSize: '12px', color: '#8A6C70' }}>
                    {te ? 'తణుకులోని కుటుంబాలకు సేవలో' : 'Serving families in Tanuku'}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 w-full sm:w-auto">
                <a
                  href={callUrl}
                  className="inline-flex items-center justify-center gap-3 text-white font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #C8102E 0%, #A00C24 100%)',
                    height: '54px',
                    paddingLeft: '24px',
                    paddingRight: '20px',
                    borderRadius: '999px',
                    fontSize: '15px',
                    fontWeight: 700,
                    boxShadow: '0 10px 28px rgba(200,16,46,0.32)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 14px 34px rgba(200,16,46,0.40)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = '0 10px 28px rgba(200,16,46,0.32)'; }}
                >
                  <Phone size={17} aria-hidden="true" />
                  <span>{te ? 'హాస్పిటల్‌కు కాల్ చేయండి' : 'Call Hospital'}</span>
                  <span className="flex items-center justify-center rounded-full bg-white text-[#C8102E]" style={{ width: 30, height: 30, flexShrink: 0 }}>
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </span>
                </a>
                <a
                  href={directionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 font-semibold"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(6px)',
                    color: '#C8102E',
                    border: '1.5px solid rgba(200,16,46,0.3)',
                    height: '54px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    borderRadius: '999px',
                    fontSize: '15px',
                    fontWeight: 700,
                    boxShadow: '0 2px 12px rgba(200,16,46,0.08)',
                    transition: 'background 0.2s, transform 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#FDF1F3'; el.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.85)'; el.style.transform = 'none'; }}
                >
                  <MapPin size={17} aria-hidden="true" />
                  {te ? 'దారి చూపండి' : 'Get Directions'}
                </a>
              </div>

              {/* Specialties pills */}
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <Eye size={15} />, label: te ? 'కంటి వైద్యం' : 'Eye Care' },
                  { icon: <HeartPulse size={15} />, label: te ? 'మహిళల & గైనకాలజీ' : "Women's Health" },
                  { icon: <Baby size={15} />, label: te ? 'పిల్లల వైద్యం' : 'Paediatric Care' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(4px)', border: '1px solid rgba(200,16,46,0.12)', borderRadius: '999px', padding: '7px 14px 7px 10px', fontSize: '13px', fontWeight: 600, color: '#3D2025' }}>
                    <span className="flex items-center justify-center rounded-full text-[#C8102E]" style={{ width: 28, height: 28, background: '#FDF1F3', flexShrink: 0 }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

            </div>
            {/* â”€â”€ END LEFT â”€â”€ */}

            {/* â”€â”€ RIGHT: Large hospital image â”€â”€ */}
            <div className="relative flex items-center justify-center lg:justify-end" style={{ minHeight: '520px' }}>

              {/* Ambient glow */}
              <div className="absolute pointer-events-none" style={{ inset: '-50px', background: 'radial-gradient(ellipse at 60% 50%, rgba(244,192,200,0.65) 0%, rgba(251,232,236,0.3) 50%, transparent 70%)', borderRadius: '50%', zIndex: 0 }}></div>

              {/* Dashed outer ring */}
              <div className="absolute pointer-events-none hidden lg:block" style={{ inset: '-14px', border: '1px dashed rgba(200,16,46,0.12)', borderRadius: '44px', zIndex: 0 }}></div>

              {/* Image frame */}
              <div className="relative w-full" style={{ maxWidth: '720px', zIndex: 1 }}>

                <div
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: '36px',
                    border: '7px solid rgba(255,255,255,0.95)',
                    boxShadow: '0 40px 90px rgba(60,10,18,0.2), 0 10px 35px rgba(200,16,46,0.1), inset 0 1px 0 rgba(255,255,255,0.7)',
                    transform: 'rotate(-1deg)',
                    background: 'white',
                  }}
                >
                  {hospital.heroImage ? (
                    <img
                      src={hospital.heroImage}
                      alt="Nisa Hospital building in Tanuku"
                      fetchPriority="high"
                      className="w-full block"
                      style={{ borderRadius: '30px', display: 'block', minHeight: '360px', objectFit: 'cover', maxHeight: '520px' }}
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] flex items-center justify-center" style={{ background: '#F5EEF0', borderRadius: '30px' }}>
                      <img src="/nisa-logo.jpg" alt="Logo" style={{ width: '50%', opacity: 0.3 }} />
                    </div>
                  )}
                  {/* Depth overlay at bottom of image */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, rgba(50,8,15,0.15) 0%, transparent 100%)', borderRadius: '0 0 30px 30px', pointerEvents: 'none' }}></div>
                </div>

                {/* Red accent bar - left edge */}
                <div className="absolute hidden lg:block pointer-events-none" style={{ top: '20%', left: '-5px', width: '5px', height: '38%', background: 'linear-gradient(180deg, #C8102E, #E0A0AB)', borderRadius: '4px', zIndex: 2, opacity: 0.65 }}></div>

                {/* Floating Card: Compassion - top-left */}
                <div
                  className="absolute animate-float hidden lg:flex"
                  style={{ top: '8%', left: '-9%', zIndex: 10, animationDelay: '0s', animationDuration: '4.5s', width: '172px' }}
                >
                  <div style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(14px)', borderRadius: '18px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px', width: '100%', boxShadow: '0 12px 36px rgba(60,10,18,0.13)', border: '1px solid rgba(255,255,255,0.9)' }}>
                    <div style={{ background: '#FDF1F3', color: '#C8102E', padding: '8px', borderRadius: '12px', flexShrink: 0, display: 'flex', boxShadow: '0 2px 8px rgba(200,16,46,0.12)' }}>
                      <ShieldCheck size={18} strokeWidth={2.5} />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#2E1F24', lineHeight: 1.35 }}>
                      Compassion<br />Care Always
                    </div>
                  </div>
                  <svg className="absolute pointer-events-none" style={{ top: '-24px', right: '-50px', width: 70, height: 40, overflow: 'visible', opacity: 0.25 }}>
                    <path d="M 0 36 Q 36 -6 70 8" fill="none" stroke="#C8102E" strokeWidth="1.5" strokeDasharray="4 3" />
                    <circle cx="70" cy="8" r="3" fill="#C8102E" />
                  </svg>
                </div>

                {/* Floating Badge: Heart - top-right */}
                <div
                  className="absolute animate-float hidden lg:flex items-center justify-center"
                  style={{ top: '-7%', right: '10%', zIndex: 10, animationDelay: '1s', animationDuration: '5s', width: '64px', height: '64px' }}
                >
                  <div style={{ background: 'white', borderRadius: '50%', padding: '5px', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(60,10,18,0.13)' }}>
                    <div style={{ background: 'linear-gradient(135deg, #C8102E 0%, #A00C24 100%)', borderRadius: '50%', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                      <HeartPulse size={24} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                {/* Floating Card: Healthier Tomorrow - right edge */}
                <div
                  className="absolute animate-float hidden lg:flex"
                  style={{ bottom: '14%', right: '-12%', zIndex: 10, animationDelay: '0.7s', animationDuration: '5.5s', width: '118px' }}
                >
                  <div style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(14px)', borderRadius: '18px', padding: '14px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center', width: '100%', boxShadow: '0 12px 36px rgba(60,10,18,0.13)', border: '1px solid rgba(255,255,255,0.9)' }}>
                    <div style={{ background: '#FDF1F3', color: '#C8102E', padding: '9px', borderRadius: '12px', display: 'flex', boxShadow: '0 2px 8px rgba(200,16,46,0.12)' }}>
                      <UserRoundCheck size={20} strokeWidth={2.5} />
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#2E1F24', lineHeight: 1.4 }}>
                      For a<br />Healthier<br />Tomorrow
                    </div>
                  </div>
                </div>

                {/* Accent dots */}
                <div className="absolute hidden lg:block rounded-full pointer-events-none" style={{ top: '-4%', right: '-1%', width: 12, height: 12, background: '#C8102E', opacity: 0.18, zIndex: 5 }}></div>
                <div className="absolute hidden lg:block rounded-full pointer-events-none" style={{ bottom: '5%', left: '-3%', width: 8, height: 8, background: '#C8102E', opacity: 0.12, zIndex: 5 }}></div>

              </div>
            </div>
            {/* â”€â”€ END RIGHT â”€â”€ */}

          </div>
        </div>
      </section>





      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SERVICES DIRECTORY Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <section id="services" aria-labelledby="services-heading" style={{ background: '#FDFCFD', padding: '100px 0' }}>
        <div className="relative w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12">
          
          {/* Section Header */}
          <div className="mb-14 text-center max-w-[700px] mx-auto">
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#C8102E', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              Our Services
            </span>
            <h2 id="services-heading" style={{ fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 800, color: '#2E1F24', lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
              Services at Nisa Hospital
            </h2>
            <p style={{ fontSize: '18px', color: '#6B5C60', lineHeight: 1.6 }}>
              Specialist healthcare for eyes, women, children and families in Tanuku.
            </p>
          </div>

          {/* Service Directory Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {serviceCategories.map((cat, i) => {
              const isEyeCare = i === 0;
              const indexNumber = `0${i + 1}`;
              
              // Map icons precisely
              const IconComp = 
                cat.icon === 'eye' ? Eye :
                cat.icon === 'heart' ? HeartPulse :
                cat.icon === 'baby' ? Baby : ShieldCheck;

              return (
                <article 
                  key={cat.name} 
                  style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '36px 32px',
                    border: isEyeCare ? '1px solid rgba(200,16,46,0.1)' : '1px solid rgba(26,18,23,0.05)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  className="group translate-y-0 transition-all duration-500 ease-out hover:-translate-y-2 shadow-[0_20px_50px_-10px_rgba(200,16,46,0.12),0_10px_30px_-15px_rgba(200,16,46,0.08)] hover:shadow-[0_30px_60px_-10px_rgba(200,16,46,0.18),0_15px_35px_-15px_rgba(200,16,46,0.12)]"
                >
                  {/* Subtle top accent line for featured category */}
                  {isEyeCare && (
                    <div style={{ position: 'absolute', top: 0, left: 32, right: 32, height: '3px', background: 'linear-gradient(90deg, #C8102E, #E0A0AB)', borderRadius: '0 0 4px 4px' }}></div>
                  )}

                  {/* Header Row: Icon + Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      style={{ 
                        width: '46px', 
                        height: '46px', 
                        borderRadius: '14px', 
                        background: isEyeCare ? '#FDF1F3' : '#F9F5F6', 
                        color: isEyeCare ? '#C8102E' : '#C8102E', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        border: isEyeCare ? '1px solid rgba(200,16,46,0.1)' : 'none'
                      }}
                    >
                      <IconComp size={22} strokeWidth={isEyeCare ? 2.5 : 2} />
                    </div>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#E0BBBF', fontFamily: 'var(--app-font-serif)' }}>
                      {indexNumber}
                    </span>
                  </div>

                  {/* Title & Short Desc */}
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#2E1F24', marginBottom: '8px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                    {cat.name.includes('/') ? (
                      <>
                        {cat.name.split('/')[0].trim()} <br />
                        <span style={{ fontSize: '18px', color: '#8A6C70', fontWeight: 600 }}>{cat.name.split('/')[1].trim()}</span>
                      </>
                    ) : (
                      cat.name
                    )}
                  </h3>

                  <div style={{ width: '40px', height: '2px', background: '#F0D5D9', margin: '20px 0' }}></div>

                  {/* Services List as compact pills/rows */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {cat.items.map(item => (
                      <li key={item} className="flex items-start gap-3">
                        <div style={{ marginTop: '5px', flexShrink: 0 }}>
                          <Check size={14} color="#C8102E" strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '15px', color: '#4A3B3F', fontWeight: 500, lineHeight: 1.4 }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {/* Eye Care dedicated phone CTA */}
                  {isEyeCare && (
                    <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #F0D5D9' }}>
                      <a
                        href="tel:+919885225123"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          fontSize: '14px', fontWeight: 700, color: '#C8102E',
                          textDecoration: 'none',
                        }}
                      >
                        <Phone size={14} aria-hidden="true" />
                        Call Eye Care: 09885 225123
                      </a>
                    </div>
                  )}

                  {/* Insurance: Empanelled partners block */}
                  {cat.icon === 'shield' && (
                    <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #F0D5D9' }}>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: '#8A6C70', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                        Selected Empanelled Partners
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 8px', marginBottom: '14px' }}>
                        {insurancePartners.companies.slice(0, 10).map(name => (
                          <span key={name} style={{ fontSize: '12px', fontWeight: 600, color: '#4A3B3F', background: '#F9F5F6', border: '1px solid #EEE4E6', borderRadius: '6px', padding: '3px 9px' }}>
                            {name}
                          </span>
                        ))}
                      </div>
                      <p style={{ fontSize: '11px', color: '#9A8488', lineHeight: 1.6, margin: 0 }}>
                        Also associated with TPAs including Medi Assist, FHPL, Paramount Health, MD India &amp; others.
                        <br />
                        <em>{insurancePartners.disclaimer}</em>
                      </p>
                    </div>
                  )}


                </article>
              );
            })}
          </div>

        </div>
      </section>

      

<section id="about" className="about-section section-pad" aria-labelledby="about-heading">
        <div className="wrap about-grid">
          <div className="about-visual reveal-left">
            {hospital.aboutImage ? (
              <img
                src={hospital.aboutImage}
                alt="Nisa Hospital building in Tanuku"
                loading="lazy"
                width={480}
                height={540}
              />
            ) : (
              <div className="brand-panel brand-panel-about">
                <img
                  src="/nisa-logo.jpg"
                  alt="Nisa Hospital Ã¢â‚¬â€ Eye Care, Women & Child Care"
                  loading="lazy"
                  width={280}
                  height={280}
                />
                <div className="about-years">
                  <span>{hospital.yearsOfTrust}</span>
                  <strong>Years of Trusted Healthcare</strong>
                </div>
              </div>
            )}
          </div>
          <div className="about-copy reveal-right">
            <SectionHeading kicker="Who We Are" title="About Nisa Hospital" />
            <p>{hospital.aboutDescription}</p>
            <div className="about-cards stagger">
              {['Specialist Eye Care', 'Women & Child Health', 'Patient-Centered Approach', 'Well-Trained & Compassionate Staff'].map(f => (
                <div className="about-card" key={f}>
                  <Check size={16} aria-hidden="true" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <a href="#team" className="button button-primary">
              Meet Our Doctors <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      

{/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ ABOUT Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}


      {/* ─── DOCTORS DIRECTORY ─────────────────────────────────────── */}
      <section
        id="team"
        aria-labelledby="team-heading"
        style={{
          background: 'linear-gradient(180deg, #FDFCF9 0%, #FAF8F4 100%)',
          padding: '120px 0 140px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle background decoration */}
        <div style={{
          position: 'absolute', top: '-120px', right: '-80px',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,16,46,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-60px',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

          {/* Section Header */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '80px', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '620px' }}>
              <span style={{
                fontSize: '11px', fontWeight: 800, color: '#C8102E',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                display: 'block', marginBottom: '16px',
              }}>
                Our Specialists
              </span>
              <h2 id="team-heading" style={{
                fontSize: 'clamp(34px, 3.8vw, 52px)',
                fontWeight: 800, color: '#1E1015',
                lineHeight: 1.08, letterSpacing: '-0.025em',
                margin: '0 0 18px 0',
              }}>
                Meet Our<br />Specialist Doctors
              </h2>
              <p style={{ fontSize: '18px', color: '#7A6268', lineHeight: 1.7, margin: 0, maxWidth: '500px' }}>
                Specialist doctors dedicated to your care and well-being.
              </p>
            </div>
            <a
              href={callUrl}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontSize: '14px', fontWeight: 700, color: '#2E1F24',
                textDecoration: 'none', paddingBottom: '2px',
                borderBottom: '1.5px solid #C8102E',
                transition: 'color 0.2s ease, gap 0.2s ease',
                flexShrink: 0, marginBottom: '6px',
              }}
              className="group"
              onMouseEnter={e => { e.currentTarget.style.color = '#C8102E'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#2E1F24'; }}
            >
              Contact the hospital
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Doctor Profiles — Alternating Editorial Layout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {doctors.map((doc, i) => {
              const isReversed = i % 2 !== 0;
              const isEyeCare = doc.badge === 'Eye Care';
              const accentColor = isEyeCare ? '#B8860B' : '#C8102E';
              const captionIcons = ['HeartPulse', 'Baby', 'Eye'];

              return (
                <div key={doc.name}>
                  {/* Divider between profiles */}
                  {i > 0 && (
                    <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #E8E0D8 30%, #E8E0D8 70%, transparent)', margin: '0' }} />
                  )}

                  <article
                    className="group reveal"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isReversed ? '1fr 460px' : '460px 1fr',
                      gap: '0',
                      minHeight: '520px',
                      padding: '72px 0',
                      transition: 'background 0.4s ease',
                    }}
                  >
                    {/* Photo Zone */}
                    <div
                      className="doc-photo"
                      style={{
                        order: isReversed ? 2 : 1,
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        background: '#F2EDE8',
                        margin: isReversed ? '0 0 0 64px' : '0 64px 0 0',
                        minHeight: '460px',
                        boxShadow: '0 8px 40px rgba(30,16,21,0.08), 0 2px 8px rgba(30,16,21,0.04)',
                      }}
                    >
                      {doc.image ? (
                        <img
                          src={doc.image}
                          alt={doc.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                            display: 'block',
                            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease',
                          }}
                          className=""
                        />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%', minHeight: '460px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '64px', fontWeight: 900, color: '#C8102E', opacity: 0.15,
                        }}>
                          {doc.initials}
                        </div>
                      )}
                      {/* Subtle accent on hover */}
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                        opacity: 0, transition: 'opacity 0.4s ease',
                      }} className="group-hover:opacity-100" />
                    </div>

                    {/* Info Zone */}
                    <div
                      className="doc-info"
                      style={{
                        order: isReversed ? 1 : 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: isReversed ? '0 64px 0 0' : '0 0 0 64px',
                      }}
                    >
                      {/* Specialty badge */}
                      <span style={{
                        fontSize: '11px', fontWeight: 800,
                        color: isEyeCare ? '#8B6914' : '#C8102E',
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                        display: 'block', marginBottom: '20px',
                      }}>
                        {doc.specialty}
                      </span>

                      {/* Doctor Name */}
                      <h3 style={{
                        fontSize: 'clamp(28px, 2.8vw, 38px)',
                        fontWeight: 800, color: '#1E1015',
                        lineHeight: 1.1, letterSpacing: '-0.02em',
                        margin: '0 0 16px 0',
                      }}>
                        {doc.name}
                      </h3>

                      {/* Thin accent line under name */}
                      <div style={{
                        width: '48px', height: '3px',
                        background: isEyeCare
                          ? 'linear-gradient(90deg, #D4AF37, #B8860B)'
                          : 'linear-gradient(90deg, #C8102E, #E8657A)',
                        borderRadius: '2px',
                        marginBottom: '24px',
                      }} />

                      {/* Qualifications */}
                      <div style={{ marginBottom: '32px' }}>
                        <p style={{
                          fontSize: '15px', color: '#5C4A4E',
                          fontWeight: 600, margin: '0 0 6px 0', lineHeight: 1.5,
                        }}>
                          {doc.qualification}
                        </p>
                        <p style={{
                          fontSize: '13px', color: '#9A8288',
                          margin: 0, letterSpacing: '0.02em',
                        }}>
                          Medical Registration No. {doc.regNo}
                        </p>
                      </div>

                      {/* Patient Connection Caption */}
                      <div style={{
                        background: '#FFF7F8',
                        border: '1px solid #F5DEE2',
                        borderLeft: `3px solid ${accentColor}`,
                        borderRadius: '0 12px 12px 0',
                        padding: '20px 24px',
                        marginBottom: '36px',
                      }}>
                        <p style={{
                          fontSize: '15px', color: '#6B4E54',
                          lineHeight: 1.7, margin: 0,
                          fontStyle: 'italic', fontWeight: 500,
                        }}>
                          "{doc.description}"
                        </p>
                      </div>

                      {/* Key Services */}
                      <div style={{ marginBottom: '40px' }}>
                        <h4 style={{
                          fontSize: '11px', fontWeight: 800,
                          color: '#9A8288', letterSpacing: '0.15em',
                          textTransform: 'uppercase', margin: '0 0 16px 0',
                        }}>
                          Key Services
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {doc.services.map((item, si) => (
                            <li
                              key={item}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '10px 0',
                                borderBottom: si < doc.services.length - 1 ? '1px solid #F0EAE5' : 'none',
                              }}
                            >
                              <div style={{
                                width: '20px', height: '20px', borderRadius: '50%',
                                background: '#FFF0F2', flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}>
                                <Check size={11} color="#C8102E" strokeWidth={3} />
                              </div>
                              <span style={{
                                fontSize: '14px', color: '#3E2E32',
                                fontWeight: 500, lineHeight: 1.4,
                              }}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div>
                        <a
                          href={callUrl}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            fontSize: '13px', fontWeight: 800,
                            color: '#C8102E', textDecoration: 'none',
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            transition: 'gap 0.2s ease',
                          }}
                          className="group/cta"
                        >
                          Contact Hospital
                          <span style={{ transition: 'transform 0.2s ease' }} className="group-hover/cta:translate-x-1">
                            <ArrowRight size={14} strokeWidth={2.5} />
                          </span>
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      

{/* ═══════ GALLERY ═══════ */}
      <section id="gallery" className="gallery-section section-pad" aria-labelledby="gallery-heading">
        <div className="gallery-glow" aria-hidden="true" />
        <div className="wrap gallery-wrap">
          <div className="gallery-head reveal">
            <div className="gallery-head-copy">
              <span className="eyebrow">Our Gallery</span>
              <h2 id="gallery-heading" className="display-font">Inside Nisa Hospital</h2>
              <p>
                A closer look at the spaces where families in Tanuku are welcomed,
                cared for and looked after — with the same warmth you feel on arrival.
              </p>
            </div>
            <div className="gallery-head-meta">
              <span className="gallery-count">{String(galleryImages.length).padStart(2, '0')}</span>
              <span className="gallery-count-label">Photographs<br />of the Hospital</span>
            </div>
          </div>

          <div className="gallery-mosaic stagger">
            {galleryImages.map((img, idx) => (
              <button
                type="button"
                key={img.url}
                className={`gallery-frame reveal gallery-frame-${idx + 1}`}
                onClick={() => setLightboxIndex(idx)}
                aria-label={`View ${img.alt}`}
              >
                <span className="gallery-mat">
                  <img src={img.url} alt={img.alt} loading="lazy" />
                  <span className="gallery-veil" aria-hidden="true" />
                  <span className="gallery-caption">
                    <span className="gallery-index">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="gallery-caption-text">
                      <strong>{img.caption || img.alt}</strong>
                      <em>View photograph</em>
                    </span>
                    <span className="gallery-expand" aria-hidden="true">
                      <Maximize2 size={16} strokeWidth={2.25} />
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ GOOGLE REVIEWS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ EYE CARE Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <section id="eye-care" className="eye-care-section section-pad" aria-labelledby="eye-care-heading">
        <div className="wrap feature-layout">
          <div className="feature-copy reveal-left">
            <span className="eyebrow">Eye Care</span>
            <h2 className="display-font" id="eye-care-heading">Eye Care</h2>
            <p>
              Eye care designed around your vision, comfort and long-term eye health,
              with consultations by our ophthalmologist.
            </p>
            <ul className="feature-list" role="list">
              {[
                'Ophthalmology consultations',
                'Cataract operations and phaco surgery',
                'Refractive surgery',
                'Cornea & anterior segment care',
              ].map(item => (
                <li key={item}>
                  <Eye size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a href={eyeCareCallUrl} className="button button-primary">
              <Phone size={16} aria-hidden="true" /> Call Eye Care
            </a>
          </div>
          <div className="feature-photo reveal-right">
            <img
              src="/eye-exam-new-hq.png"
              alt="Doctor performing an eye examination with a slit lamp"
              loading="lazy"
              width={560}
              height={420}
            />
          </div>
        </div>
      </section>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ WOMEN & CHILD CARE Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <section id="women-child-care" className="women-section section-pad" aria-labelledby="women-heading">
        <div className="wrap feature-layout">
          <div className="feature-photo reveal-left">
            <img
              src="/WOMEN-1.jpg"
              alt="Doctor examining a pregnant woman in a bright, welcoming consultation room"
              loading="lazy"
              width={560}
              height={420}
            />
          </div>
          <div className="feature-copy reveal-right">
            <span className="eyebrow" style={{ color: 'var(--nisa-red)' }}>Women & Child Care</span>
            <h2 className="display-font" id="women-heading">Women & Child Care</h2>
            <p className="women-headline">Care for Women. Care for Children. Care for Families.</p>
            <div className="women-cards stagger">
              <div className="women-card">
                <div className="women-card-icon red" aria-hidden="true"><HeartPulse size={22} /></div>
                <h3>Obstetrics & Gynaecology</h3>
                <p>Compassionate support through pregnancy and specialist care for women's health.</p>
              </div>
              <div className="women-card">
                <div className="women-card-icon gold" aria-hidden="true"><Baby size={22} /></div>
                <h3>Paediatrics</h3>
                <p>Dedicated healthcare for the growth, health and wellbeing of infants and children.</p>
              </div>
            </div>
            <a href={callUrl} className="button button-primary">
              <Phone size={16} aria-hidden="true" /> Call Hospital
            </a>
          </div>
        </div>
      </section>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ WHY CHOOSE NISA Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <section className="why-section section-pad" aria-labelledby="why-heading">
        <div className="wrap">
          <div className="reveal">
            <SectionHeading
              kicker="Why Choose Nisa"
              title="Why Families Choose Nisa"
              description="Specialist healthcare designed around your family's needs in Tanuku."
            />
          </div>
          <div className="why-grid stagger">
            {whyChooseUs.map((benefit, i) => {
              const icons = [Stethoscope, Eye, HeartPulse, UserRoundCheck, Award];
              const Icon = icons[i] ?? ShieldCheck;
              return (
                <article className="why-item reveal" key={benefit.title}>
                  <Icon className="why-icon" size={22} aria-hidden="true" />
                  <span>0{i + 1}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ DOCTORS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      {/* â”€â”€â”€ DOCTORS DIRECTORY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="reviews" className="testimonials-section section-pad" aria-labelledby="reviews-heading">
        <div className="wrap">
          <div className="reviews-head reveal">
            <div>
              <SectionHeading kicker="Google Reviews" title="What Patients Say" />
              <p className="reviews-intro">
                Read what patients have shared about their experience at Nisa Hospital, Tanuku.
              </p>
            </div>
            <div className="reviews-summary">
              {googleReviews.length > 0 && (
                <div className="reviews-score">
                  <strong>{googleRating.score.toFixed(1)}</strong>
                  <span className="review-stars" role="img" aria-label={`Rated ${googleRating.score} out of 5 on Google`}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <Star key={n} size={17} className={n <= Math.round(googleRating.score) ? 'on' : ''} aria-hidden="true" />
                    ))}
                  </span>
                  <small>{googleRating.count} Google reviews</small>
                </div>
              )}
              <a href={hospital.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="button button-outline">
                View All Google Reviews <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          {googleReviews.length > 0 && (
            <div className="review-grid stagger">
              {googleReviews.map((r, i) => (
                <blockquote className="testimonial reveal" key={i}>
                  <div className="review-head">
                    <span className="review-stars" role="img" aria-label={`${r.rating} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map(n => (
                        <Star key={n} size={16} className={n <= r.rating ? 'on' : ''} aria-hidden="true" />
                      ))}
                    </span>
                    <span className="review-source">Google</span>
                  </div>
                  <p className="review-text">{r.text}</p>
                  <footer>
                    <span className="patient-initial" aria-hidden="true">{r.name.charAt(0).toUpperCase()}</span>
                    <span>
                      <strong>{r.name}</strong>
                      {r.date && <small>{r.date}</small>}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ FAQ Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <section id="faqs" className="faq-section section-pad" aria-labelledby="faq-heading">
        <div className="wrap faq-layout">
          <div className="reveal-left">
            <SectionHeading kicker="Good to Know" title="Frequently Asked Questions" />
            <p style={{ color: 'var(--nisa-muted)', lineHeight: 1.76, marginTop: 0 }}>
              Still have questions? Call the hospital directly on{' '}
              <a href={callUrl} style={{ color: 'var(--nisa-red)', fontWeight: 700 }}>{hospital.phone}</a>.
            </p>
          </div>
          <div className="faq-list reveal-right" role="list">
            {faqs.map((faq, i) => (
              <div
                className={`faq-item${openFaq === i ? ' expanded' : ''}`}
                key={faq.question}
                role="listitem"
              >
                <button
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-btn-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-testid={`button-faq-${i}`}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={18} aria-hidden="true" />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ CONTACT Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <section id="contact" className="contact-section section-pad" aria-labelledby="contact-heading">
        <div className="wrap contact-layout">
          <div className="reveal-left">
            <SectionHeading
              kicker="Reach Us"
              title={<>Contact <em style={{ fontStyle: 'normal', color: 'var(--nisa-red)' }}>Nisa Hospital</em></>}
            />
            <p style={{ color: 'var(--nisa-muted)', lineHeight: 1.78, marginBottom: 32 }}>
              We're here to help. Call the hospital or get directions to visit us in Tanuku.
            </p>
            <div className="contact-card-stack">
              <div className="contact-block">
                <h4 className="red">Hospital Contact</h4>
                <div className="contact-line">
                  <span className="contact-icon red" aria-hidden="true"><Phone size={17} /></span>
                  <div>
                    <strong><a href={callUrl} className="contact-value-link">{hospital.phone}</a></strong>
                    <p>Main hospital number</p>
                  </div>
                </div>
                <div className="contact-line">
                  <span className="contact-icon red" aria-hidden="true"><Phone size={17} /></span>
                  <div>
                    <strong><a href={callMobileUrl} className="contact-value-link">{hospital.phoneMobile}</a></strong>
                    <p>Mobile</p>
                  </div>
                </div>
                <div className="contact-line">
                  <span className="contact-icon red" aria-hidden="true"><MapPin size={17} /></span>
                  <div>
                    <strong>{hospital.address}</strong>
                    <p>
                      <a href={directionUrl} target="_blank" rel="noreferrer" className="contact-value-link">
                        Get Directions &rarr;
                      </a>
                    </p>
                  </div>
                </div>
                <div className="contact-line">
                  <span className="contact-icon red" aria-hidden="true"><Clock size={17} /></span>
                  <div>
                    <strong>Timings</strong>
                    <p>{hospital.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <div className="map-embed-wrap" style={{ height: 420 }}>
              <iframe
                title="Map showing Nisa Hospital, Tanuku"
                src={hospital.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
              <a href={callUrl} className="button button-primary" style={{ flex: 1, justifyContent: 'center', minWidth: 160 }}>
                <Phone size={16} aria-hidden="true" /> Call Hospital
              </a>
              <a href={directionUrl} target="_blank" rel="noreferrer" className="button button-outline" style={{ flex: 1, justifyContent: 'center', minWidth: 160 }}>
                <MapPin size={16} aria-hidden="true" /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ FOOTER Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <footer className="site-footer">
        <div className="wrap footer-main">
          <div className="footer-brand">
            <BrandLockup footer />
            <p>{hospital.tagline}<br />{hospital.location}</p>
          </div>
          <div className="footer-column">
            <h3>Navigation</h3>
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <p className="footer-address">
              <strong>{hospital.name}</strong>
              <span>{hospital.location}</span>
            </p>
            <div className="footer-phones">
              <strong><a href={callUrl} style={{ color: '#fff', textDecoration: 'none' }}>{hospital.phone}</a></strong>
              <strong style={{ marginTop: 10 }}>
                <a href={callMobileUrl} style={{ color: '#fff', textDecoration: 'none' }}>{hospital.phoneMobile}</a>
              </strong>
            </div>
            <div className="footer-actions">
              <a href={callUrl} className="footer-btn"><Phone size={14} aria-hidden="true" /> Call Hospital</a>
              <a href={directionUrl} target="_blank" rel="noreferrer" className="footer-btn footer-btn-outline">
                <MapPin size={14} aria-hidden="true" /> Get Directions
              </a>
            </div>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>&copy; 2026 Nisa Hospital, Tanuku</span>
        </div>
      </footer>

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ MOBILE STICKY ACTION BAR Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <div className="mobile-actions" aria-label="Quick contact actions">
        <a href={callUrl} className="call-btn" aria-label="Call the hospital">
          <Phone size={17} aria-hidden="true" /> Call Hospital
        </a>
        <a href={directionUrl} className="dir-btn" target="_blank" rel="noreferrer" aria-label="Get directions to the hospital">
          <MapPin size={17} aria-hidden="true" /> Directions
        </a>
        <a href="#contact" className="contact-btn" aria-label="Go to contact section">
          <ArrowRight size={17} aria-hidden="true" /> Contact
        </a>
      </div>
    
      {/* ═══════ LIGHTBOX ═══════ */}
      {lightboxIndex !== null && (
        <div 
          className="lightbox" 
          onClick={(e) => e.target === e.currentTarget && setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery fullscreen view"
        >
          <button 
            className="lightbox-close" 
            onClick={() => setLightboxIndex(null)}
            aria-label="Close gallery"
          >
            <X size={32} />
          </button>
          
          <div className="lightbox-counter">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>

          <div className="lightbox-content">
            <div className="lightbox-controls">
              <button 
                className="lightbox-btn" 
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => prev! > 0 ? prev! - 1 : prev); }}
                style={{ visibility: lightboxIndex > 0 ? 'visible' : 'hidden' }}
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
              <button 
                className="lightbox-btn" 
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => prev! < galleryImages.length - 1 ? prev! + 1 : prev); }}
                style={{ visibility: lightboxIndex < galleryImages.length - 1 ? 'visible' : 'hidden' }}
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </div>
            
            <img 
              src={galleryImages[lightboxIndex].url} 
              alt={galleryImages[lightboxIndex].alt} 
              className="lightbox-img" 
              key={lightboxIndex} /* Force re-render for animation */
            />
            {galleryImages[lightboxIndex].caption && (
              <div className="lightbox-caption">
                {galleryImages[lightboxIndex].caption}
              </div>
            )}
          </div>
        </div>
      )}

    </main>
  );
}

function Home() {
  return <HospitalHome />;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function App({ ssrPath }: { ssrPath?: string } = {}) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter
          base={import.meta.env.BASE_URL.replace(/\/$/, '')}
          ssrPath={ssrPath}
        >
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
