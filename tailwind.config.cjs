/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				error: { 500: "hsl(0, 100%, 66%)" },
				primary: {
					100: "hsl(270, 3%, 87%)",
					300: "hsl(279, 6%, 55%)",
					900: "hsl(278, 68%, 11%)",
				},
				lg: {
					from: "hsl(249, 99%, 64%)",
					to: "hsl(278, 94%, 30%)",
				},
			},
		},
		screens: {
			xs: "376px",
			...defaultTheme.screens,
		},
	},
	plugins: [],
};
