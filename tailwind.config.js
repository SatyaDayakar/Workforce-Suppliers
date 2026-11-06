export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAF9F6', card: '#FFFFFF', primary: '#527A60', deep: '#243D30',
        ink: '#292D29', muted: '#6F746D', accent: '#E9B66B', line: '#E8EAE4',
        sage: { 50: '#F4F8F4', 100: '#E8F0EA', 200: '#D5E3D9' },
        sand: '#F3EEE2', danger: '#B4513F',
      },
      fontFamily: { heading: ['Manrope', 'sans-serif'], body: ['Inter', 'sans-serif'] },
      boxShadow: {
        soft: '0 1px 2px rgba(36,61,48,.04), 0 8px 24px -8px rgba(36,61,48,.10)',
        lift: '0 2px 4px rgba(36,61,48,.05), 0 20px 40px -12px rgba(36,61,48,.18)',
      },
    },
  },
  plugins: [],
}
