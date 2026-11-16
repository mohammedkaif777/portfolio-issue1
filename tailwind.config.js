/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        bangers: ['Bangers', 'cursive'],
        comic: ['"Comic Neue"', 'sans-serif'],
        arcade: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        // Marvel Universe (Light Mode) Palette
        marvel: {
          red: '#E62429',       // Classic Marvel Bold Red
          yellow: '#FFD200',    // Comic Goldenrod Yellow
          blue: '#0266B3',      // Avengers Cobalt Blue
          dark: '#111111',      // Pure Ink
          paper: '#FFFDF8',     // Vintage Comic Paper
          card: '#FFFFFF',
          border: '#E62429',
        },
        // DC Universe / Gotham Noir (Dark Mode) Palette
        dc: {
          slate: '#0B0E14',     // Gotham Night Sky
          dark: '#12151D',      // Deep Inked Slate
          card: '#161B26',      // Detective Card Base
          gold: '#F5A623',      // Bat-Gold / Amber
          cyan: '#00D2FF',      // Krypton / Knight Cyan
          chalk: '#F3F4F6',     // Chalk White Text
          border: '#F5A623',
        },
        comic: {
          ink: '#111111',
          paper: '#FFFDF8',
        }
      },
      boxShadow: {
        'comic': '5px 5px 0px #111111',
        'comic-sm': '3px 3px 0px #111111',
        'comic-lg': '8px 8px 0px #111111',
        'comic-marvel-red': '5px 5px 0px #E62429',
        'comic-marvel-yellow': '5px 5px 0px #FFD200',
        'comic-dc-gold': '5px 5px 0px #F5A623',
        'comic-dc-cyan': '5px 5px 0px #00D2FF',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
      }
    },
  },
  plugins: [],
}
