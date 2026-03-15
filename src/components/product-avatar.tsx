import type { CSSProperties, ReactNode } from "react";
import { getProductInitial } from "@/lib/products";

type IconCategory =
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

function AvocadoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M12 3.2c3 0 6.4 3.2 6.4 8.4 0 4-2.6 7.2-6.4 7.2s-6.4-3.2-6.4-7.2C5.6 6.4 9 3.2 12 3.2Z" fill="currentColor" opacity="0.28" />
      <path d="M12 5.4c2.3 0 4.7 2.5 4.7 6.2 0 2.9-1.8 5.2-4.7 5.2s-4.7-2.3-4.7-5.2c0-3.7 2.4-6.2 4.7-6.2Z" fill="currentColor" opacity="0.92" />
      <circle cx="12" cy="12.2" r="2.2" fill="currentColor" opacity="0.46" />
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

function GrainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 7c-1.8.2-3.2 1.7-3.4 3.5 1.8-.2 3.2-1.7 3.4-3.5Zm0 3.6c-1.8.2-3.2 1.7-3.4 3.5 1.8-.2 3.2-1.7 3.4-3.5Zm0 0c1.8.2 3.2 1.7 3.4 3.5-1.8-.2-3.2-1.7-3.4-3.5Zm0-3.6c1.8.2 3.2 1.7 3.4 3.5-1.8-.2-3.2-1.7-3.4-3.5Z" fill="currentColor" opacity="0.9" />
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

function FishIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M5 12c2.7-3.7 7-5.2 11.5-4.6-.4 1.1-.6 2.2-.6 3.3s.2 2.2.6 3.3C12 14.6 7.7 13 5 12Z" fill="currentColor" opacity="0.9" />
      <path d="M16 7.5 19.5 5v5.2M16 14.5 19.5 17v-5.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12.4" cy="10.8" r="0.8" fill="currentColor" />
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

function BreadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M6.2 9.4A4.8 4.8 0 0 1 11 5h2a4.8 4.8 0 0 1 4.8 4.4v5.6a2.2 2.2 0 0 1-2.2 2.2H8.4A2.2 2.2 0 0 1 6.2 15Z" fill="currentColor" opacity="0.92" />
      <path d="M9.3 9.1h.01M12 8.2h.01M14.8 9.1h.01" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
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

function EggIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[1.2em] w-[1.2em]" aria-hidden="true">
      <path d="M12 5c2.6 0 4.5 3.8 4.5 7.1 0 2.8-1.8 4.9-4.5 4.9s-4.5-2.1-4.5-4.9C7.5 8.8 9.4 5 12 5Z" fill="currentColor" opacity="0.92" />
      <path d="M10.1 9.4c.5-.8 1.2-1.4 2.1-1.7" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

function getCategory(name: string): IconCategory {
  const source = name.toLowerCase();

  if (source.includes("авок")) return "fruit";
  if (source.includes("банан") || source.includes("яблок") || source.includes("груш") || source.includes("апельс") || source.includes("мандарин") || source.includes("киви") || source.includes("ягод") || source.includes("вишн") || source.includes("клубн") || source.includes("черник") || source.includes("малин")) return "fruit";
  if (source.includes("огур") || source.includes("помид") || source.includes("овощ") || source.includes("салат") || source.includes("капуст") || source.includes("морков") || source.includes("перец") || source.includes("брокк") || source.includes("кабач") || source.includes("лук") || source.includes("гриб")) return "vegetable";
  if (source.includes("яйц")) return "dairy";
  if (source.includes("твор") || source.includes("йогур") || source.includes("кеф") || source.includes("молок") || source.includes("сыр") || source.includes("ряж") || source.includes("смет")) return "dairy";
  if (source.includes("лосос") || source.includes("тунец") || source.includes("рыб") || source.includes("сельд") || source.includes("кревет") || source.includes("форел")) return "fish";
  if (source.includes("кур") || source.includes("индей") || source.includes("говя") || source.includes("свин") || source.includes("мяс") || source.includes("ветчин") || source.includes("колбас") || source.includes("сосиск")) return "protein";
  if (source.includes("рис") || source.includes("греч") || source.includes("овся") || source.includes("круп") || source.includes("макарон") || source.includes("паст") || source.includes("булгур") || source.includes("чечев") || source.includes("фасол") || source.includes("нут")) return "grain";
  if (source.includes("хлеб") || source.includes("тост") || source.includes("лаваш")) return "bread";
  if (source.includes("масл")) return "fat";
  if (source.includes("орех") || source.includes("миндал") || source.includes("фисташ") || source.includes("арахис") || source.includes("семеч")) return "nuts";
  if (source.includes("кофе") || source.includes("чай") || source.includes("какао") || source.includes("сок") || source.includes("напит")) return "drink";
  if (source.includes("пиц") || source.includes("чоко") || source.includes("шокол") || source.includes("батон") || source.includes("печень") || source.includes("конф") || source.includes("морожен") || source.includes("торт")) return "sweet";

  return "neutral";
}

function getToneClass(category: IconCategory) {
  switch (category) {
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

function getCategoryIcon(name: string): ReactNode {
  const category = getCategory(name);

  switch (category) {
    case "fruit":
      return name.toLowerCase().includes("авок") ? <AvocadoIcon /> : <AppleIcon />;
    case "vegetable":
      return <CarrotIcon />;
    case "protein":
      return <MeatIcon />;
    case "fish":
      return <FishIcon />;
    case "dairy":
      return name.toLowerCase().includes("яйц") ? <EggIcon /> : <BottleIcon />;
    case "grain":
      return <GrainIcon />;
    case "bread":
      return <BreadIcon />;
    case "sweet":
      return <CandyIcon />;
    case "fat":
      return <OilIcon />;
    case "drink":
      return <CupIcon />;
    case "nuts":
      return <NutIcon />;
    default:
      return null;
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
  const category = getCategory(name);
  const toneClass = getToneClass(category);
  const categoryIcon = getCategoryIcon(name);
  const customEmoji = preferCustomIcon && icon?.trim() && isProbablyEmoji(icon) ? icon : null;
  const style = { color: "var(--avatar-icon)" } satisfies CSSProperties;

  if (customEmoji) {
    return (
      <div className={`product-avatar-shell ${toneClass} flex ${sizeClass} items-center justify-center rounded-full shadow-sm text-xl`}>
        <span className="translate-y-[1px]">{customEmoji}</span>
      </div>
    );
  }

  if (categoryIcon) {
    return (
      <div
        className={`product-avatar-shell ${toneClass} flex ${sizeClass} items-center justify-center rounded-full shadow-sm text-[1.25rem]`}
        style={style}
      >
        {categoryIcon}
      </div>
    );
  }

  if (icon?.trim()) {
    return (
      <div className={`product-avatar-shell ${toneClass} flex ${sizeClass} items-center justify-center rounded-full shadow-sm text-xl`}>
        {icon}
      </div>
    );
  }

  return (
    <div
      className={`product-avatar-shell ${toneClass} flex ${sizeClass} items-center justify-center rounded-full font-semibold shadow-sm`}
      style={style}
    >
      {getProductInitial(name)}
    </div>
  );
}
