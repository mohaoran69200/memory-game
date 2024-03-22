const images = [
    { id: 1, src: "assets/css.png" },
    { id: 2, src: "assets/git.png" },
    { id: 3, src: "assets/html.png" },
    { id: 4, src: "assets/js.png" },
    { id: 5, src: "assets/node.png" },
    { id: 6, src: "assets/php.png" },
    { id: 7, src: "assets/react.png" },
    { id: 8, src: "assets/symfony.png" }
];
const cards = [...images, ...images];
cards.sort(() => Math.random() - 0.5);

let previousCard = null; // Variable pour stocker la carte précédemment cliquée

function createCard(image) {
    return `
        <div class="card-off"><img src="assets/default.png" alt="Card Back"></div>
        <div class="card-on hidden"><img src="${image.src}" alt=""></div>   
    `;
}

const gridContainer = document.getElementById('memory-grid');

cards.forEach(image => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = createCard(image);
    gridContainer.appendChild(cardElement);
});

const cardsElements = document.querySelectorAll('.card');
let clicks = 0;

function flipCard() {
    clicks++;
    document.getElementById('count').textContent = `Compteur : ${clicks}`;

    const cardOn = this.querySelector('.card-on');
    const cardOff = this.querySelector('.card-off');

    cardOn.classList.remove('hidden');
    cardOff.classList.add('hidden');

    if (previousCard && previousCard !== this) {
        const previousCardOn = previousCard.querySelector('.card-on');
        const previousCardOff = previousCard.querySelector('.card-off');

        previousCardOn.classList.add('hidden');
        previousCardOff.classList.remove('card-on');
        previousCard.addEventListener('click', flipCard); // Rétablir l'écouteur sur la carte précédente
    }

    previousCard = this;
    this.removeEventListener('click', flipCard); // Désactiver le clic sur la carte actuelle
}

cardsElements.forEach(card => card.addEventListener('click', flipCard));
