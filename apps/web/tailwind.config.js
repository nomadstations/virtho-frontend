/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          light: 'hsl(var(--primary-light))',
          lighter: 'hsl(var(--primary-lighter))',
          dark: 'hsl(var(--primary-dark))',
          darkest: 'hsl(var(--primary-darkest))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          light: 'hsl(var(--secondary-light))',
          lighter: 'hsl(var(--secondary-lighter))',
          dark: 'hsl(var(--secondary-dark))',
          darkest: 'hsl(var(--secondary-darkest))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--destructive))',
        info: 'hsl(var(--info))',
        
        // Zone Accent Wayfinding System
        zone: 'hsl(var(--zone))',
        'zone-soft': 'hsl(var(--zone-soft))',
        'zone-ink': 'hsl(var(--zone-ink))',
        
        'zone-health': 'hsl(var(--zone-health) / <alpha-value>)',
        'zone-health-soft': 'hsl(var(--zone-health-soft) / <alpha-value>)',
        'zone-health-ink': 'hsl(var(--zone-health-ink) / <alpha-value>)',
        
        'zone-knowledge': 'hsl(var(--zone-knowledge) / <alpha-value>)',
        'zone-knowledge-soft': 'hsl(var(--zone-knowledge-soft) / <alpha-value>)',
        'zone-knowledge-ink': 'hsl(var(--zone-knowledge-ink) / <alpha-value>)',
        
        'zone-social': 'hsl(var(--zone-social) / <alpha-value>)',
        'zone-social-soft': 'hsl(var(--zone-social-soft) / <alpha-value>)',
        'zone-social-ink': 'hsl(var(--zone-social-ink) / <alpha-value>)',
        
        'zone-economy': 'hsl(var(--zone-economy) / <alpha-value>)',
        'zone-economy-soft': 'hsl(var(--zone-economy-soft) / <alpha-value>)',
        'zone-economy-ink': 'hsl(var(--zone-economy-ink) / <alpha-value>)',
        
        'zone-culture': 'hsl(var(--zone-culture) / <alpha-value>)',
        'zone-culture-soft': 'hsl(var(--zone-culture-soft) / <alpha-value>)',
        'zone-culture-ink': 'hsl(var(--zone-culture-ink) / <alpha-value>)',
        
        'zone-settings': 'hsl(var(--zone-settings) / <alpha-value>)',
        'zone-settings-soft': 'hsl(var(--zone-settings-soft) / <alpha-value>)',
        'zone-settings-ink': 'hsl(var(--zone-settings-ink) / <alpha-value>)',

        // Alias legacy classes used in the project to our new pastel palette
        lavender: {
          primary: 'hsl(var(--primary))',
          light: 'hsl(var(--primary-light))',
          lighter: 'hsl(var(--primary-lighter))',
          lightest: 'hsl(var(--muted))',
          dark: 'hsl(var(--primary-dark))',
          darkest: 'hsl(var(--primary-darkest))',
        },
        purple: {
          50: 'hsl(var(--primary-lighter))',
          100: 'hsl(var(--primary-light))',
          200: 'hsl(var(--primary-light))',
          300: 'hsl(var(--primary))',
          400: 'hsl(var(--primary))',
          500: 'hsl(var(--primary))',
          600: 'hsl(var(--primary-dark))',
          700: 'hsl(var(--primary-dark))',
          800: 'hsl(var(--primary-darkest))',
          900: 'hsl(var(--primary-darkest))',
        },
        teal: {
          50: 'hsl(var(--secondary-lighter))',
          100: 'hsl(var(--secondary-light))',
          600: 'hsl(var(--secondary-dark))',
          700: 'hsl(var(--secondary-darkest))',
        }
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`,
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};