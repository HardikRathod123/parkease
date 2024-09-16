import type { Config } from 'tailwindcss'
import {
  animationConfig,
  colorsConfig,
  keyframesConfig,
  spacingConfig,
} from './src/styles/config'
const config: Config = {
  darkMode: 'class',
  important: true,
  content: ['./src/components/**/*.{js,ts,jsx,tsx}'],

  theme: {
    colors: colorsConfig,
    extend: {
      ringColor: {
        DEFAULT: colorsConfig.primary.DEFAULT,
      },
      outlineColor: {
        DEFAULT: colorsConfig.primary.DEFAULT,
      },
      borderRadius: {
        DEFAULT: '0',
      },
      spacing: spacingConfig,
      animation: animationConfig,
      keyframes: keyframesConfig,
    },
  },
  plugins: [],
}
export default config
