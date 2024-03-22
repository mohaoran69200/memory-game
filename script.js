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

function createCard(image) {
    return `
    <div class="card">
        <div class="card-off"><img src="assets/default.png" alt="Card Back"></div>
        <div class="card-on"><img src="${image}" alt="Card Front"></div>
    </div>
    `;
}

const gridContainer = document.getElementById('memory-grid');

cards.forEach(image => {
    const cardElement = document.createElement('div'); // Créer un élément de carte
    cardElement.classList.add('card'); // Ajouter la classe 'card' à l'élément de carte
    cardElement.innerHTML = createCard(image); // Ajouter le contenu de la carte avec l'image
    gridContainer.appendChild(cardElement); // Ajouter l'élément de carte au conteneur de cartes
});