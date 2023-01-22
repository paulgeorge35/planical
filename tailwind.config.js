const { red } = require("@radix-ui/colors")
const { blue } = require("@radix-ui/colors")
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
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            fontFamily: {
                sans: ['var(--font-poppins)', ...fontFamily.sans],
                mono: ['var(--font-roboto)', ...fontFamily.mono],
                serif: ['var(--font-satoshi)', ...fontFamily.serif],
                satoshi: ['var(--font-satoshi)', ...fontFamily.serif],
            },
            colors: {
                ...colors,
                primary: {
                    50: blue.blue1,
                    100: blue.blue2,
                    200: blue.blue4,
                    300: blue.blue6,
                    400: blue.blue8,
                    500: blue.blue9,
                    600: blue.blue10,
                    700: blue.blue11,
                    800: blue.blue12,
                    DEFAULT: blue.blue10,
                },
                secondary: {
                    50: red.red1,
                    100: red.red2,
                    200: red.red4,
                    300: red.red6,
                    400: red.red8,
                    500: red.red9,
                    600: red.red10,
                    700: red.red11,
                    800: red.red12,
                    DEFAULT: red.red10,
                },
            }
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
