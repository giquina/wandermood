/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base system colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        
        // Mood-responsive color palettes
        'mood-calm': {
          primary: 'hsl(var(--mood-calm-primary))',
          secondary: 'hsl(var(--mood-calm-secondary))',
          accent: 'hsl(var(--mood-calm-accent))',
          bg: 'hsl(var(--mood-calm-bg))'
        },
        'mood-adventure': {
          primary: 'hsl(var(--mood-adventure-primary))',
          secondary: 'hsl(var(--mood-adventure-secondary))',
          accent: 'hsl(var(--mood-adventure-accent))',
          bg: 'hsl(var(--mood-adventure-bg))'
        },
        'mood-romantic': {
          primary: 'hsl(var(--mood-romantic-primary))',
          secondary: 'hsl(var(--mood-romantic-secondary))',
          accent: 'hsl(var(--mood-romantic-accent))',
          bg: 'hsl(var(--mood-romantic-bg))'
        },
        'mood-creative': {
          primary: 'hsl(var(--mood-creative-primary))',
          secondary: 'hsl(var(--mood-creative-secondary))',
          accent: 'hsl(var(--mood-creative-accent))',
          bg: 'hsl(var(--mood-creative-bg))'
        },
        'mood-social': {
          primary: 'hsl(var(--mood-social-primary))',
          secondary: 'hsl(var(--mood-social-secondary))',
          accent: 'hsl(var(--mood-social-accent))',
          bg: 'hsl(var(--mood-social-bg))'
        },
        'mood-celebrate': {
          primary: 'hsl(var(--mood-celebrate-primary))',
          secondary: 'hsl(var(--mood-celebrate-secondary))',
          accent: 'hsl(var(--mood-celebrate-accent))',
          bg: 'hsl(var(--mood-celebrate-bg))'
        },
        'mood-reflective': {
          primary: 'hsl(var(--mood-reflective-primary))',
          secondary: 'hsl(var(--mood-reflective-secondary))',
          accent: 'hsl(var(--mood-reflective-accent))',
          bg: 'hsl(var(--mood-reflective-bg))'
        },
        'mood-luxury': {
          primary: 'hsl(var(--mood-luxury-primary))',
          secondary: 'hsl(var(--mood-luxury-secondary))',
          accent: 'hsl(var(--mood-luxury-accent))',
          bg: 'hsl(var(--mood-luxury-bg))'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist Sans', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'Geist Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Cinematic typography scale
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.005em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
        'xl': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.015em' }],
        '3xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      spacing: {
        // Cinematic spacing system
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      boxShadow: {
        // Cinematic shadows - soft and layered
        'cinematic-sm': '0 4px 16px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02)',
        'cinematic-md': '0 8px 32px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.03)',
        'cinematic-lg': '0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04)',
        'cinematic-xl': '0 32px 64px rgba(0, 0, 0, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        // Cinematic animations - slow and gentle
        'gentle-pulse': 'gentle-pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        'cinematic': '20px',
      },
      screens: {
        // Mobile-first breakpoints
        'xs': '475px',
      }
    }
  },
  plugins: [],
}