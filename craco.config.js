module.exports = {
    babel: {
        plugins: [
            process.env.NODE_ENV === 'development' && "babel-plugin-styled-components"
        ].filter(Boolean)
    }
}