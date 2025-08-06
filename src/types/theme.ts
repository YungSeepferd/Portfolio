import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface ZIndex {
    heroBackground: number;
    heroContent: number;
    scrollIndicator: number;
  }

  interface Shape {
    radius: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      default: number;
    };
  }

  interface Theme extends MuiTheme {
    custom: {
      animations: {
        durations: {
          shortest: number;
          shorter: number;
          short: number;
          standard: number;
          complex: number;
          enteringScreen: number;
          leavingScreen: number;
        };
        easings: {
          easeInOut: string;
          easeOut: string;
          easeIn: string;
          sharp: string;
        };
        transitions: {
          create: (
            props?: string | string[],
            options?: {
              duration?: string | number;
              easing?: string;
              delay?: number;
            }
          ) => string;
        };
      };
      sections: {
        layout: {
          spacing: {
            xs: number;
            sm: number;
            md: number;
            lg: number;
          };
          padding: {
            xs: number;
            sm: number;
            md: number;
            lg: number;
          };
          maxWidth: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
          };
        };
      };
      projectCard: {
        height: string;
        borderWidth: string;
        variants: {
          primary: {
            color: string;
            focusRing: string;
          };
          secondary: {
            color: string;
            focusRing: string;
          };
          success: {
            color: string;
            focusRing: string;
          };
          warning: {
            color: string;
            focusRing: string;
          };
          error: {
            color: string;
            focusRing: string;
          };
          info: {
            color: string;
            focusRing: string;
          };
        };
      };
      media: {
        ratios: {
          portrait: string;
          square: string;
          landscape: string;
          widescreen: string;
        };
        placeholders: {
          image: string;
          project: string;
          avatar: string;
          video: string;
        };
      };
      overlays: {
        header: {
          light: string;
          dark: string;
        };
        aboutImage: {
          default: string;
          hover: string;
        };
        contactCard: {
          background: string;
          border: string;
        };
        socialIcon: {
          base: string;
          hover: string;
        };
      };
      header: {
        burgerMenuOffset: {
          top: number;
          right: {
            xs: number;
            sm: number;
            md: number;
          };
        };
      };
      zIndex: {
        header: number;
        modal: number;
        notification: number;
        tooltip: number;
        popover: number;
      };
    };
  }
}

export {};
