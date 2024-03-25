// Définition des images avec leur ID
const images = [
    { id: 1, src: "assets/css.png" },
    { id: 2, src: "assets/git.png" },
    { id: 3, src: "assets/html.png" },
    { id: 4, src: "assets/js.png" },
    { id: 5, src: "assets/node.png" },
    { id: 6, src: "assets/php.png" },
    { id: 7, src: "assets/react.png" },
    { id: 8, src: "assets/symfony.png" },
  ];
  
  // Création d'un jeu de cartes en doublant les images et en les mélangeant
  const cards = [...images, ...images]; // Création d'un tableau de cartes en doublant les images
  cards.sort(() => Math.random() - 0.5); // Mélange du tableau de cartes de manière aléatoire
  
  const gridContainer = document.getElementById("memory-grid");
  const countDisplay = document.getElementById("count"); // Sélection de l'élément HTML pour afficher le compteur
  let clickCount = 0; // Initialisation du compteur de clics
  
  cards.forEach((image) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = image.id; // Utilisation de l'ID de l'image comme identifiant de la carte
    cardElement.dataset.src = image.src; // Sauvegarde de la source de l'image pour chaque carte
    cardElement.innerHTML = `<img src="assets/default.png" alt="card">`; // Utilisation de l'image par défaut dans la carte
    cardElement.addEventListener("click", flipCard);
    gridContainer.appendChild(cardElement);
  });
  
  let firstCard = null;
  let secondCard = null;
  
  function flipCard() {
    if (secondCard || this === firstCard) return; // Ignorer si déjà retourné ou si c'est la même carte
  
    const imgElement = this.querySelector("img");
    imgElement.src = this.dataset.src; // Utilisation de la source d'image sauvegardée pour la carte cliquée
    imgElement.alt = `Card ${this.dataset.id}`;
  
    if (!firstCard) {
      firstCard = this;
    } else {
      secondCard = this;
      clickCount++; // Incrément du compteur de clics à chaque paire de cartes retournée
      countDisplay.textContent = `Compteur : ${clickCount}`; // Mise à jour de l'affichage du compteur
      checkMatch();
    }
  }
  
  function checkMatch() {
    const id1 = firstCard.dataset.id;
    const id2 = secondCard.dataset.id;
  
    if (id1 === id2) {
      setTimeout(() => {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetCards();
      }, 1000);
    } else {
      setTimeout(() => {
        const imgElement1 = firstCard.querySelector("img");
        const imgElement2 = secondCard.querySelector("img");
        imgElement1.src = "assets/default.png";
        imgElement2.src = "assets/default.png";
        resetCards();
      }, 1000);
    }
  }
  
  function resetCards() {
    firstCard = null;
    secondCard = null;
  }

// Sélection de l'élément du bouton de réinitialisation
const resetButton = document.getElementById("reset");

// Écouteur d'événement pour le clic sur le bouton de réinitialisation
resetButton.addEventListener("click", resetGame);

function resetGame() {
    // Réinitialisation des variables
    firstCard = null;
    secondCard = null;
    clickCount = 0;
    countDisplay.textContent = "Compteur : 0";

    // Masquage de toutes les cartes
    const cardImages = document.querySelectorAll(".card img");
    cardImages.forEach(img => {
        img.src = "assets/default.png";
    });

    // Mélange des cartes
    cards.sort(() => Math.random() - 0.5);
    gridContainer.innerHTML = ""; // Effacer le contenu de la grille

    // Recréation des cartes
    cards.forEach((image) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.id = image.id;
        cardElement.dataset.src = image.src;
        cardElement.innerHTML = `<img src="assets/default.png" alt="card">`;
        cardElement.addEventListener("click", flipCard);
        gridContainer.appendChild(cardElement);
    });
}
