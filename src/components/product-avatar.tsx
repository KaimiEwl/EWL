import type { CSSProperties, ReactNode } from "react";
import { getProductInitial } from "@/lib/products";

type IconKey =
  | "apple"
  | "banana"
  | "berries"
  | "citrus"
  | "avocado"
  | "leafy"
  | "tomato"
  | "cucumber"
  | "carrot"
  | "broccoli"
  | "potato"
  | "grain"
  | "rice"
  | "pasta"
  | "bread"
  | "bean"
  | "meat"
  | "chicken"
  | "sausage"
  | "fish"
  | "shrimp"
  | "egg"
  | "milk"
  | "cheese"
  | "yogurt"
  | "sweet"
  | "chocolate"
  | "cake"
  | "pizza"
  | "burger"
  | "oil"
  | "nut"
  | "drink"
  | "coffee"
  | "tea"
  | "juice"
  | "neutral";

type IconTone =
  | "fruit"
  | "vegetable"
  | "protein"
  | "fish"
  | "dairy"
  | "grain"
  | "bread"
  | "sweet"
  | "fat"
  | "drink"
  | "nuts"
  | "neutral";

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M12 7.2c1.6-1.7 3.7-1.4 4.8-.4.8.7 1.2 1.8 1.2 2.9 0 4.7-2.5 8.7-6 8.7s-6-4-6-8.7c0-1.1.4-2.2 1.2-2.9 1.1-1 3.2-1.3 4.8.4Z" fill="currentColor" opacity="0.9" />
      <path d="M13 5.3c.1-1.2.9-2.2 2.1-2.6.1 1.2-.7 2.4-2.1 2.6Z" fill="currentColor" opacity="0.75" />
      <path d="M10.2 4.2c.7-.8 1.9-1.4 3.2-1.2-.5 1.1-1.7 1.8-3 1.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BananaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M6.2 14.7c3.1.7 6.9-.8 9.4-3.6 1.5-1.7 2.4-3.6 2.7-5.3.8 2.3.1 5.3-2 7.6-2.7 2.9-6.7 4.3-10.1 3.5-.8-.2-1.1-1.1-.6-1.8.1-.2.3-.4.6-.4Z" fill="currentColor" opacity="0.92" />
      <path d="M17.9 6.1c-.9.2-1.7.6-2.3 1.1" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

function BerryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <circle cx="9" cy="13.5" r="4.2" fill="currentColor" opacity="0.9" />
      <circle cx="15.2" cy="13.4" r="4" fill="currentColor" opacity="0.65" />
      <path d="M10.2 8.2c.8-1.3 1.9-2 3.2-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12.6 8.3c.8-.8 1.7-1.2 2.8-1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CitrusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <circle cx="12" cy="12" r="6.2" fill="currentColor" opacity="0.22" />
      <circle cx="12" cy="12" r="5.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 6.7v10.6M7.4 9.2l9.2 5.6M7.4 14.8l9.2-5.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function AvocadoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M12 3.2c3 0 6.4 3.2 6.4 8.4 0 4-2.6 7.2-6.4 7.2s-6.4-3.2-6.4-7.2C5.6 6.4 9 3.2 12 3.2Z" fill="currentColor" opacity="0.28" />
      <path d="M12 5.4c2.3 0 4.7 2.5 4.7 6.2 0 2.9-1.8 5.2-4.7 5.2s-4.7-2.3-4.7-5.2c0-3.7 2.4-6.2 4.7-6.2Z" fill="currentColor" opacity="0.92" />
      <circle cx="12" cy="12.2" r="2.2" fill="currentColor" opacity="0.46" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M18 6c-6.3.4-10.8 4.5-12 11 6.4-.2 11.2-4.7 12-11Z" fill="currentColor" opacity="0.9" />
      <path d="M8 16c1.4-2.7 3.6-4.9 6.6-6.6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function TomatoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <circle cx="12" cy="12.8" r="5.6" fill="currentColor" opacity="0.9" />
      <path d="M12 6.2c1.3 0 2.6.4 3.8 1.3-1.1.3-2.2.9-3 1.8-.8-.9-1.8-1.5-3-1.8C9.4 6.6 10.7 6.2 12 6.2Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function CucumberIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <rect x="5.2" y="9.2" width="13.6" height="5.6" rx="2.8" fill="currentColor" opacity="0.92" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

function CarrotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M14.4 7.8c2.7 2.1 2.5 6.5-.5 8.3l-3.7 2.2c-.8.5-1.8-.2-1.6-1.1l.9-4.2c.8-3.7 3.5-6 4.9-5.2Z" fill="currentColor" opacity="0.92" />
      <path d="M13 7c-.2-1.3.2-2.5 1.2-3.5M15.3 7.5c.4-1 .4-2.2-.1-3.4M11.3 7.4c-1-.7-2.2-1-3.6-.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BroccoliIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <circle cx="10" cy="9.2" r="3.1" fill="currentColor" opacity="0.85" />
      <circle cx="14.5" cy="9" r="3.4" fill="currentColor" opacity="0.95" />
      <circle cx="12.2" cy="6.8" r="3.1" fill="currentColor" opacity="0.7" />
      <path d="M11.4 12.2v4.8h1.6v-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PotatoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M7.2 9.2c0-2.7 2.1-4.8 4.8-4.8h.6c2.8 0 4.9 2.1 4.9 4.8v4.1c0 2.5-1.9 4.3-4.5 4.3h-1c-2.7 0-4.8-1.8-4.8-4.3V9.2Z" fill="currentColor" opacity="0.92" />
      <path d="M10 9.5h.01M14.6 11.2h.01M11.5 14.2h.01" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function GrainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 7c-1.8.2-3.2 1.7-3.4 3.5 1.8-.2 3.2-1.7 3.4-3.5Zm0 3.6c-1.8.2-3.2 1.7-3.4 3.5 1.8-.2 3.2-1.7 3.4-3.5Zm0 0c1.8.2 3.2 1.7 3.4 3.5-1.8-.2-3.2-1.7-3.4-3.5Zm0-3.6c1.8.2 3.2 1.7 3.4 3.5-1.8-.2-3.2-1.7-3.4-3.5Z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function RiceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M6.5 13.5h11l-.8 3.1a2.8 2.8 0 0 1-2.7 2H10a2.8 2.8 0 0 1-2.7-2l-.8-3.1Z" fill="currentColor" opacity="0.24" />
      <g fill="currentColor" opacity="0.9">
        <ellipse cx="8.8" cy="11.5" rx="1.1" ry="1.8" transform="rotate(-28 8.8 11.5)" />
        <ellipse cx="12" cy="10.9" rx="1.1" ry="1.8" transform="rotate(-18 12 10.9)" />
        <ellipse cx="15.2" cy="11.5" rx="1.1" ry="1.8" transform="rotate(22 15.2 11.5)" />
      </g>
    </svg>
  );
}

function PastaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M7 15c1.4-1.4 2.6-2 5-2s3.6.6 5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7.4 11.6c1.2-1.1 2.4-1.6 4.6-1.6s3.4.5 4.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.78" />
      <path d="M8 8.4C9 7.6 10.1 7.2 12 7.2s3 .4 4 1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.56" />
    </svg>
  );
}

function BreadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M6.2 9.4A4.8 4.8 0 0 1 11 5h2a4.8 4.8 0 0 1 4.8 4.4v5.6a2.2 2.2 0 0 1-2.2 2.2H8.4A2.2 2.2 0 0 1 6.2 15Z" fill="currentColor" opacity="0.92" />
      <path d="M9.3 9.1h.01M12 8.2h.01M14.8 9.1h.01" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

function BeanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M10.6 6.2c2.7 0 4.8 2.2 4.8 4.9 0 2.9-2.2 5.2-4.8 5.2S6 14 6 11.1c0-2.7 1.9-4.9 4.6-4.9Z" fill="currentColor" opacity="0.9" />
      <path d="M11.5 7.6c-1.4 1.1-2 2.5-1.7 4.3" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function MeatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M8.2 6.5c2.5-2.2 6.8-2.4 9.3.1 2.4 2.4 2.1 6.4-.2 8.7-2.2 2.2-5.2 3.3-7.3 3.1-2.1-.2-3.7-1.8-3.9-3.9-.2-2.1.9-5.1 2.1-6.4Z" fill="currentColor" opacity="0.92" />
      <circle cx="9.1" cy="14.6" r="1.4" fill="currentColor" opacity="0.38" />
    </svg>
  );
}

function ChickenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M8.2 11.2c.5-2.4 2.6-4.2 5.1-4.2 2.8 0 5 2.2 5 5 0 2.5-1.7 4.6-4 5.1-1.3.3-2.8.2-4-.1l-2.6.8.8-2.4c-.5-1.2-.6-2.8-.3-4.2Z" fill="currentColor" opacity="0.92" />
      <circle cx="17.1" cy="9.1" r="1.6" fill="currentColor" opacity="0.48" />
    </svg>
  );
}

function SausageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M7 10.3c1.6-1.6 4.4-1.6 10 0 1.2 1.2 1.2 3.2 0 4.4-5.6 1.6-8.4 1.6-10 0-1.2-1.2-1.2-3.2 0-4.4Z" fill="currentColor" opacity="0.92" />
      <path d="M6.3 11.2 5 10m13.7 3L20 14.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function FishIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M5 12c2.7-3.7 7-5.2 11.5-4.6-.4 1.1-.6 2.2-.6 3.3s.2 2.2.6 3.3C12 14.6 7.7 13 5 12Z" fill="currentColor" opacity="0.9" />
      <path d="M16 7.5 19.5 5v5.2M16 14.5 19.5 17v-5.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12.4" cy="10.8" r="0.8" fill="currentColor" />
    </svg>
  );
}

function ShrimpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M16.6 8.6a4.7 4.7 0 0 0-8.7 2.4c0 3.2 2.3 5.6 5.7 5.6 1.6 0 2.8-.4 4-1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11.4 8.3c2.2 0 4 1.8 4 4v2.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      <circle cx="16.8" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

function EggIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M12 5c2.6 0 4.5 3.8 4.5 7.1 0 2.8-1.8 4.9-4.5 4.9s-4.5-2.1-4.5-4.9C7.5 8.8 9.4 5 12 5Z" fill="currentColor" opacity="0.92" />
      <path d="M10.1 9.4c.5-.8 1.2-1.4 2.1-1.7" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

function BottleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M10 4.5h4M11 4.5v3l-2.2 3.4c-.5.7-.8 1.6-.8 2.5v3.6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.6c0-.9-.3-1.8-.8-2.5L13 7.5v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.4 13h5.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function CheeseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M6 15.8 8.7 8h8.6l.7 7.8H6Z" fill="currentColor" opacity="0.92" />
      <circle cx="10.4" cy="11.4" r="1" fill="currentColor" opacity="0.38" />
      <circle cx="14.6" cy="13.1" r="1.4" fill="currentColor" opacity="0.38" />
    </svg>
  );
}

function YogurtIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M7.2 9h9.6l-.9 6.2A2.3 2.3 0 0 1 13.6 17h-3.2a2.3 2.3 0 0 1-2.3-1.8L7.2 9Z" fill="currentColor" opacity="0.92" />
      <path d="M8.5 7.2h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

function CandyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M7.5 10.4 5 8.8l-.6 3 1.6 1.4M16.5 10.4 19 8.8l.6 3-1.6 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7.5" y="8.5" width="9" height="7" rx="3.5" fill="currentColor" opacity="0.92" />
      <path d="M10 11h4M10.7 13h2.6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

function ChocolateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <rect x="7" y="6.5" width="10" height="11" rx="2" fill="currentColor" opacity="0.92" />
      <path d="M10.3 6.5v11M13.7 6.5v11M7 10.2h10M7 13.8h10" stroke="#fff" strokeWidth="1.1" opacity="0.55" />
    </svg>
  );
}

function CakeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M7 11h10l-.9 5H7.9L7 11Z" fill="currentColor" opacity="0.92" />
      <path d="M7.6 11c1-.9 2.1-1.4 3.3-1.4S13.1 10 14 11c.8-.7 1.7-1.1 3-1.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.72" />
    </svg>
  );
}

function PizzaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M6.4 8.7c3.6-1.8 7.6-1.8 11.2 0L12 18.4 6.4 8.7Z" fill="currentColor" opacity="0.92" />
      <circle cx="10.2" cy="11.3" r="0.9" fill="#fff" opacity="0.65" />
      <circle cx="13.8" cy="12.6" r="0.9" fill="#fff" opacity="0.65" />
      <path d="M7.8 11h8.4" stroke="#fff" strokeWidth="1.1" opacity="0.45" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M7 11.2A5 5 0 0 1 12 7a5 5 0 0 1 5 4.2H7Z" fill="currentColor" opacity="0.92" />
      <path d="M6.6 12.8h10.8v1.7H6.6z" fill="currentColor" opacity="0.55" />
      <path d="M7.3 15.3h9.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function OilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M12 4.3c1.8 2.5 4.4 5 4.4 8 0 2.7-2 4.7-4.4 4.7s-4.4-2-4.4-4.7c0-3 2.6-5.5 4.4-8Z" fill="currentColor" opacity="0.92" />
      <path d="M10.4 13.2c.3.9 1 1.5 2 1.7" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

function NutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M12 5.5c2.8 0 4.9 2.3 4.9 5.1 0 3-2.1 6-4.9 6s-4.9-3-4.9-6c0-2.8 2.1-5.1 4.9-5.1Z" fill="currentColor" opacity="0.92" />
      <path d="M12 5.5c-.6 1-1 2.1-1 3.3 0 1.4.5 2.7 1 3.8.5-1.1 1-2.4 1-3.8 0-1.2-.4-2.3-1-3.3Z" fill="currentColor" opacity="0.38" />
    </svg>
  );
}

function CupIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M7 9h8.5v3.8A4.2 4.2 0 0 1 11.3 17H11A4 4 0 0 1 7 13V9Z" fill="currentColor" opacity="0.92" />
      <path d="M15.5 10h1a2 2 0 0 1 0 4h-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 19h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M7.2 10h8.2v3.3A3.7 3.7 0 0 1 11.7 17H11a3.8 3.8 0 0 1-3.8-3.8V10Z" fill="currentColor" opacity="0.92" />
      <path d="M15.4 10.8h1a1.9 1.9 0 0 1 0 3.8h-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9.4 7.5c-.7-.6-.8-1.4-.3-2.4M12.2 7.5c-.7-.6-.8-1.4-.3-2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

function TeaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M7 10h8v3.2A3.8 3.8 0 0 1 11.2 17H11A4 4 0 0 1 7 13v-3Z" fill="currentColor" opacity="0.92" />
      <path d="M15 10.8h1a1.8 1.8 0 0 1 0 3.6h-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10.2 7.3c0-.9.4-1.7 1.2-2.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.62" />
    </svg>
  );
}

function JuiceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M8.2 8.3h7.6l-.9 8.3H9.1l-.9-8.3Z" fill="currentColor" opacity="0.92" />
      <path d="M10.4 5.8h3.2M13.6 5.8l2-1.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function NeutralFoodIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M7 9h10l-1 5.6A2.7 2.7 0 0 1 13.3 17h-2.6A2.7 2.7 0 0 1 8 14.6L7 9Z" fill="currentColor" opacity="0.9" />
      <path d="M9 6.8c.4-1.2 1.5-2 2.9-2s2.5.8 2.9 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function getSource(name: string, icon?: string) {
  return `${name} ${icon ?? ""}`.toLowerCase().replaceAll("ё", "е");
}

function pickIconKey(name: string, icon?: string): IconKey {
  const source = getSource(name, icon);

  if (source.includes("авок")) return "avocado";
  if (source.includes("банан")) return "banana";
  if (source.includes("апельс") || source.includes("мандари") || source.includes("лимон") || source.includes("грейпф")) return "citrus";
  if (source.includes("клубн") || source.includes("малин") || source.includes("черник") || source.includes("ягод") || source.includes("вишн")) return "berries";
  if (source.includes("яблок") || source.includes("груш") || source.includes("персик") || source.includes("слив")) return "apple";

  if (source.includes("салат") || source.includes("шпинат") || source.includes("руккол") || source.includes("капуст")) return "leafy";
  if (source.includes("помид") || source.includes("томат")) return "tomato";
  if (source.includes("огур")) return "cucumber";
  if (source.includes("морков")) return "carrot";
  if (source.includes("брокк")) return "broccoli";
  if (source.includes("карто")) return "potato";
  if (source.includes("кабач") || source.includes("перец") || source.includes("тыкв") || source.includes("редис") || source.includes("свекл")) return "carrot";

  if (source.includes("рис")) return "rice";
  if (source.includes("макарон") || source.includes("паст")) return "pasta";
  if (source.includes("нут") || source.includes("фасол") || source.includes("чечев") || source.includes("горох")) return "bean";
  if (source.includes("овся") || source.includes("греч") || source.includes("круп") || source.includes("булгур") || source.includes("киноа")) return "grain";
  if (source.includes("хлеб") || source.includes("тост") || source.includes("лаваш") || source.includes("булк")) return "bread";

  if (source.includes("кревет")) return "shrimp";
  if (source.includes("лосос") || source.includes("тунец") || source.includes("рыб") || source.includes("форел") || source.includes("селед") || source.includes("сельд") || source.includes("скумбр")) return "fish";
  if (source.includes("кур")) return "chicken";
  if (source.includes("колбас") || source.includes("сосиск") || source.includes("ветчин")) return "sausage";
  if (source.includes("индей") || source.includes("говя") || source.includes("свин") || source.includes("мяс") || source.includes("котлет")) return "meat";
  if (source.includes("бургер")) return "burger";

  if (source.includes("яйц")) return "egg";
  if (source.includes("сыр")) return "cheese";
  if (source.includes("йогур") || source.includes("твор") || source.includes("кеф") || source.includes("смет")) return "yogurt";
  if (source.includes("молок") || source.includes("сливк")) return "milk";

  if (source.includes("пиц")) return "pizza";
  if (source.includes("шокол") || source.includes("чоко") || source.includes("какао")) return "chocolate";
  if (source.includes("торт") || source.includes("пирож") || source.includes("ваф")) return "cake";
  if (source.includes("печен") || source.includes("конф") || source.includes("морож") || source.includes("халв") || source.includes("батон")) return "sweet";

  if (source.includes("масл")) return "oil";
  if (source.includes("орех") || source.includes("миндал") || source.includes("фисташ") || source.includes("арахис") || source.includes("семеч") || source.includes("кешью") || source.includes("грецк")) return "nut";

  if (source.includes("кофе")) return "coffee";
  if (source.includes("чай")) return "tea";
  if (source.includes("сок") || source.includes("морс") || source.includes("компот")) return "juice";
  if (source.includes("вода") || source.includes("напит")) return "drink";

  return "neutral";
}

function getToneByIconKey(iconKey: IconKey): IconTone {
  switch (iconKey) {
    case "apple":
    case "banana":
    case "berries":
    case "citrus":
    case "avocado":
      return "fruit";
    case "leafy":
    case "tomato":
    case "cucumber":
    case "carrot":
    case "broccoli":
    case "potato":
    case "bean":
      return "vegetable";
    case "meat":
    case "chicken":
    case "sausage":
    case "burger":
      return "protein";
    case "fish":
    case "shrimp":
      return "fish";
    case "egg":
    case "milk":
    case "cheese":
    case "yogurt":
      return "dairy";
    case "grain":
    case "rice":
    case "pasta":
      return "grain";
    case "bread":
      return "bread";
    case "sweet":
    case "chocolate":
    case "cake":
    case "pizza":
      return "sweet";
    case "oil":
      return "fat";
    case "drink":
    case "coffee":
    case "tea":
    case "juice":
      return "drink";
    case "nut":
      return "nuts";
    default:
      return "neutral";
  }
}

function getToneClass(tone: IconTone) {
  switch (tone) {
    case "fruit":
      return "product-avatar-tone-fruit";
    case "vegetable":
      return "product-avatar-tone-vegetable";
    case "protein":
      return "product-avatar-tone-protein";
    case "fish":
      return "product-avatar-tone-fish";
    case "dairy":
      return "product-avatar-tone-dairy";
    case "grain":
      return "product-avatar-tone-grain";
    case "bread":
      return "product-avatar-tone-bread";
    case "sweet":
      return "product-avatar-tone-sweet";
    case "fat":
      return "product-avatar-tone-fat";
    case "drink":
      return "product-avatar-tone-drink";
    case "nuts":
      return "product-avatar-tone-nuts";
    default:
      return "product-avatar-tone-neutral";
  }
}

function getIconNode(iconKey: IconKey): ReactNode {
  switch (iconKey) {
    case "apple":
      return <AppleIcon />;
    case "banana":
      return <BananaIcon />;
    case "berries":
      return <BerryIcon />;
    case "citrus":
      return <CitrusIcon />;
    case "avocado":
      return <AvocadoIcon />;
    case "leafy":
      return <LeafIcon />;
    case "tomato":
      return <TomatoIcon />;
    case "cucumber":
      return <CucumberIcon />;
    case "carrot":
      return <CarrotIcon />;
    case "broccoli":
      return <BroccoliIcon />;
    case "potato":
      return <PotatoIcon />;
    case "grain":
      return <GrainIcon />;
    case "rice":
      return <RiceIcon />;
    case "pasta":
      return <PastaIcon />;
    case "bread":
      return <BreadIcon />;
    case "bean":
      return <BeanIcon />;
    case "meat":
      return <MeatIcon />;
    case "chicken":
      return <ChickenIcon />;
    case "sausage":
      return <SausageIcon />;
    case "fish":
      return <FishIcon />;
    case "shrimp":
      return <ShrimpIcon />;
    case "egg":
      return <EggIcon />;
    case "milk":
      return <BottleIcon />;
    case "cheese":
      return <CheeseIcon />;
    case "yogurt":
      return <YogurtIcon />;
    case "sweet":
      return <CandyIcon />;
    case "chocolate":
      return <ChocolateIcon />;
    case "cake":
      return <CakeIcon />;
    case "pizza":
      return <PizzaIcon />;
    case "burger":
      return <BurgerIcon />;
    case "oil":
      return <OilIcon />;
    case "nut":
      return <NutIcon />;
    case "drink":
      return <CupIcon />;
    case "coffee":
      return <CoffeeIcon />;
    case "tea":
      return <TeaIcon />;
    case "juice":
      return <JuiceIcon />;
    default:
      return <NeutralFoodIcon />;
  }
}

function isProbablyEmoji(value?: string) {
  if (!value) {
    return false;
  }

  return /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u.test(value);
}

export function ProductAvatar({
  icon,
  name,
  size = "md",
  preferCustomIcon = false,
}: {
  icon?: string;
  name: string;
  size?: "sm" | "md";
  preferCustomIcon?: boolean;
}) {
  const sizeClass = size === "sm" ? "h-9 w-9 text-sm" : "h-11 w-11 text-base";
  const customEmoji = preferCustomIcon && icon?.trim() && isProbablyEmoji(icon) ? icon : null;
  const iconKey = pickIconKey(name, icon);
  const toneClass = getToneClass(getToneByIconKey(iconKey));
  const style = { color: "var(--avatar-icon)" } satisfies CSSProperties;

  if (customEmoji) {
    return (
      <div className={`product-avatar-shell ${toneClass} flex ${sizeClass} items-center justify-center rounded-full text-xl shadow-sm`}>
        <span className="translate-y-[1px]">{customEmoji}</span>
      </div>
    );
  }

  return (
    <div
      className={`product-avatar-shell ${toneClass} flex ${sizeClass} items-center justify-center rounded-full ${
        iconKey === "neutral" ? "font-semibold" : "text-[1.25rem]"
      } shadow-sm`}
      style={style}
    >
      {iconKey === "neutral" ? getProductInitial(name) : getIconNode(iconKey)}
    </div>
  );
}
