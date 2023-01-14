const { colors } = require("tailwindcss/colors")
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
        "./components/**/*.{js,ts,jsx,tsx}",
        "./ui/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "1.5rem",
            screens: {
                "2xl": "1440px",
            },
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-poppins)', ...fontFamily.sans],
                mono: ['var(--font-roboto)', ...fontFamily.mono],
                serif: ['var(--font-satoshi)', ...fontFamily.serif],
                satoshi: ['var(--font-satoshi)', ...fontFamily.serif],
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
