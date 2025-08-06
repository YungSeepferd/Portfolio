import '@mui/material/styles';

export interface CustomParts {
  animations: {
    durations: Record<string, number>;
    easings: Record<string, string>;
    transitions: {
      create: (
        props?: string | string[],
        options?: { duration?: string | number; easing?: string | any; delay?: number }
      ) => string;
    };
  };
  sections: {
    layout: {
      spacing: Record<string, string>;
      padding: Record<string, string>;
      maxWidth: Record<string, string>;
    };
  };
  projectCard: {
    height: string;
    borderWidth: string;
    variants: Record<string, { color: string; focusRing: string }>;
  };
  media: {
    ratios: Record<string, string>;
    placeholders: Record<string, string>;
  };
  overlays: {
    header: { light: string; dark: string };
    aboutImage: { default: string; hover: string };
    contactCard: { background: string; border: string };
    socialIcon: { base: string; hover: string };
  };
  header: {
    burgerMenuOffset: {
      top: number;
      right: { xs: number; sm: number; md: number };
    };
  };
  zIndex: {
    header: number;
    modal: number;
    notification: number;
    tooltip: number;
    popover: number;
  };
}

declare module '@mui/material/styles' {
  interface Theme {
    custom: CustomParts;
  }

  interface ThemeOptions {
    custom?: Partial<CustomParts>;
  }
}
