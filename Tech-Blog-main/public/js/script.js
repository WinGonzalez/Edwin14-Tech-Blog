document.addEventListener('DOMContentLoaded', initColorChanger);

function initColorChanger() {
    const changeColorButton = document.getElementById('changeColorButton');
    const targetParagraph = document.getElementById('targetParagraph');

    setupColorChangeButton(changeColorButton, targetParagraph);
}

function setupColorChangeButton(button, target) {
    // Ensure both the button and the target paragraph exist before adding the event listener
    if (!button || !target) {
        console.warn('Button or target paragraph not found.');
        return;
    }

    button.addEventListener('click', () => handleColorChange(target));
}

function handleColorChange(target) {
    // Directly use the target element passed to the function
    target.style.color = getRandomColor();
}

function getRandomColor() {
    // Simplified function to generate a random color
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}
