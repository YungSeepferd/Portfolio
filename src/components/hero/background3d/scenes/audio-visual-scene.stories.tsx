import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import TorusGardenScene from './TorusGardenScene';
import { Canvas } from '@react-three/fiber';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00bcd4' },
    secondary: { main: '#ff4081' },
    text: { primary: '#ffffff' },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    text: { primary: '#000000' },
  },
});

const meta: Meta<typeof TorusGardenScene> = {
  title: 'Components/Hero/TorusGardenScene',
  component: TorusGardenScene,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive 3D audio-visual scene with musical torus rings',
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas>
          <Story {...context} />
        </Canvas>
      </div>
    ),
  ],
  argTypes: {
    _color: {
      control: 'color',
      description: 'Primary color for the scene elements',
    },
    isTransitioning: {
      control: 'boolean',
      description: 'Whether the scene is in transition state',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      mapping: {
        dark: darkTheme,
        light: lightTheme,
      },
      description: 'Theme for the scene',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TorusGardenScene>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Canvas>
            <Story />
          </Canvas>
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    _color: '#00bcd4',
    _mousePosition: { x: 0, y: 0 },
    isTransitioning: false,
    theme: darkTheme,
  },
};

export const LightTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Canvas>
            <Story />
          </Canvas>
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    _color: '#1976d2',
    _mousePosition: { x: 0, y: 0 },
    isTransitioning: false,
    theme: lightTheme,
  },
};

export const Transitioning: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Canvas>
            <Story />
          </Canvas>
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    _color: '#00bcd4',
    _mousePosition: { x: 0, y: 0 },
    isTransitioning: true,
    theme: darkTheme,
  },
};

export const Interactive: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Canvas camera={{ position: [0, 0, 10] }}>
            <Story />
          </Canvas>
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    _color: '#ff4081',
    _mousePosition: { x: 0.5, y: 0.5 },
    isTransitioning: false,
    theme: darkTheme,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive version with mouse position affecting the scene',
      },
    },
  },
};
