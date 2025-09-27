module.exports = {
    content: [
        './layouts/**/*.html',
        './content/**/*.md'
    ],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                'display': ['Oswald', 'sans-serif'],
                'body': ['Montserrat', 'sans-serif'],
                'mono': ['Courier New', 'monospace'],
                'pixel': ['Monaco', 'Menlo', 'monospace'],
            },
            colors: {
                'retro': {
                    'bg': '#c0c0c0',
                    'window': '#e5e7eb',
                    'titlebar': '#000080',
                    'titletext': '#ffffff',
                    'border': '#000000',
                    'highlight': '#0000ff',
                    'shadow': '#808080',
                    'button': '#c0c0c0',
                    'buttonhover': '#a0a0a0',
                    'text': '#000000',
                    'post': '#ffffff',
                }
            },
            boxShadow: {
                'retro': 'inset -1px -1px 0 #000, inset 1px 1px 0 #dfdfdf, inset -2px -2px 0 #808080, inset 2px 2px 0 #fff',
                'retro-inset': 'inset -1px -1px 0 #fff, inset 1px 1px 0 #808080',
                'retro-button': '1px 1px 0 #000',
            },
            spacing: {
                'titlebar': '1.75rem',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],
}
