import * as React from "react";
import { Icon, IconProps } from "./Icon";

export function IconAcne(props: IconProps) {
  return (
    <Icon title="Acne & Chronic Conditions" {...props}>
      <path d="M8.2 20.1c1.1.6 2.4.9 3.8.9s2.7-.3 3.8-.9" />
      <path d="M6.2 18.1c-1.1-1.6-1.7-3.5-1.7-5.6A7.5 7.5 0 0 1 12 5a7.5 7.5 0 0 1 7.5 7.5c0 2.1-.6 4-1.7 5.6" />
      <circle cx="9" cy="13" r="0.9" />
      <circle cx="12" cy="14.2" r="0.9" />
      <circle cx="15" cy="12.8" r="0.9" />
    </Icon>
  );
}

export function IconHair(props: IconProps) {
  return (
    <Icon title="Hair & Scalp Disorders" {...props}>
      <path d="M7 12.5c.2-3.7 2.4-6.5 5-6.5s4.8 2.8 5 6.5" />
      <path d="M9 13.5c0 2.2 1.3 3.8 3 4.6" />
      <path d="M12 13c0 2.6 1.6 4.4 3.6 5" />
      <path d="M15 13.8c-.1 1.9-1.1 3.3-2.6 4.1" />
      <circle cx="9" cy="13.5" r="0.6" />
      <circle cx="12" cy="13" r="0.6" />
      <circle cx="15" cy="13.8" r="0.6" />
    </Icon>
  );
}

export function IconPigmentation(props: IconProps) {
  return (
    <Icon title="Pigmentation & Melasma" {...props}>
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 3.5v1.3M8 11.2v1.3M3.5 8h1.3M11.2 8h1.3" />
      <path d="M4.8 4.8l.9.9M10.3 10.3l.9.9M11.2 4.8l-.9.9M5.7 10.3l-.9.9" />
      <path d="M13.2 12.3c1.2-1.2 2.6-1.8 4-1.8 1.7 0 3.3.9 4.3 2.6-1 1.7-2.6 2.6-4.3 2.6-1.4 0-2.8-.6-4-1.8" />
      <path d="M13.2 12.3v3.6" />
      <path d="M13.2 15.9c0 2.3-1.8 4.1-4.1 4.1-1.7 0-3.1-.8-3.8-2.1" />
    </Icon>
  );
}

export function IconScreening(props: IconProps) {
  return (
    <Icon title="Skin Cancer Screening" {...props}>
      <path d="M12 3l7 3v6c0 5-3.2 8.6-7 9-3.8-.4-7-4-7-9V6l7-3z" />
      <circle cx="10" cy="11" r="2.2" />
      <path d="M11.7 12.7l2.3 2.3" />
    </Icon>
  );
}

export function IconPediatrics(props: IconProps) {
  return (
    <Icon title="Dermatology for Children & Adults" {...props}>
      <path d="M8.2 10.2c-.9-.8-1.1-2.1-.3-3.1.8-.9 2.1-1.1 3.1-.3" />
      <path d="M15.8 10.2c.9-.8 1.1-2.1.3-3.1-.8-.9-2.1-1.1-3.1-.3" />
      <path d="M7 14.2c0-3 2.2-5.2 5-5.2s5 2.2 5 5.2c0 2.8-2.2 4.8-5 4.8s-5-2-5-4.8z" />
      <circle cx="10.4" cy="14" r="0.6" />
      <circle cx="13.6" cy="14" r="0.6" />
      <path d="M11 16.1c.7.4 1.3.4 2 0" />
    </Icon>
  );
}

export function IconAesthetic(props: IconProps) {
  return (
    <Icon title="Refined Aesthetic Dermatology" {...props}>
      <path d="M12 3l.7 2.3L15 6l-2.3.7L12 9l-.7-2.3L9 6l2.3-.7L12 3z" />
      <path d="M16.5 10.5l4 4" />
      <path d="M14.8 12.2l3.1-3.1" />
      <path d="M13 13.9l1.8-1.7" />
      <path d="M9.8 17.2l3.2-3.3" />
      <path d="M8 19c.6-.3 1.3-.8 1.8-1.4" />
      <path d="M6 18l2 2" />
    </Icon>
  );
}
