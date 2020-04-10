const Color = {
    LIGHT: "light",
    DARK: "dark"
};

function toggleColor(currColor) {
    return (currColor === Color.LIGHT) ? Color.DARK : Color.LIGHT;
}
