/** @type {import('tailwindcss').Config} */

import { heroui } from "@heroui/react";
const config = {
    darkMode: 'class',
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
        // './node_modules/@hero-ui/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [heroui()]
}

export default config;