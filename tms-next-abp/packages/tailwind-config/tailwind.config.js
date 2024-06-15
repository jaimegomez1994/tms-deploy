module.exports = {
    theme: {
        extend: {
            spacing: {
                140: '35rem'
            }
        }
    },
    content: [
        // app content
        `src/**/*.{js,ts,jsx,tsx}`
        // include packages if not transpiling
        // "../../packages/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [require('daisyui')],
    daisyui: {
        styled: true,
        themes: ['light', 'dark', 'cupcake', 'dracula'],
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: '',
        darkTheme: 'dark'
    }
};
