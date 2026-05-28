import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
