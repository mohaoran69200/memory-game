// Définition des images avec leur ID
const images = [
    { id: 1, src: "assets/css.png" }, // Image CSS avec ID 1
    { id: 2, src: "assets/git.png" }, // Image Git avec ID 2
    { id: 3, src: "assets/html.png" }, // Image HTML avec ID 3
    { id: 4, src: "assets/js.png" }, // Image JavaScript avec ID 4
    { id: 5, src: "assets/node.png" }, // Image Node.js avec ID 5
    { id: 6, src: "assets/php.png" }, // Image PHP avec ID 6
    { id: 7, src: "assets/react.png" }, // Image React avec ID 7
    { id: 8, src: "assets/symfony.png" }, // Image Symfony avec ID 8
];

// Création d'un jeu de cartes en doublant les images et en les mélangeant
let cards = [...images, ...images]; // Doublage des images pour créer un jeu de cartes
cards.sort(() => Math.random() - 0.5); // Mélange aléatoire du jeu de cartes

// Sélection des éléments HTML nécessaires
const gridContainer = document.getElementById("memory-grid"); // Sélection de la grille du jeu
const countDisplay = document.getElementById("count"); // Sélection de l'élément pour afficher le compteur
const timerDisplay = document.getElementById("timer"); // Sélection de l'élément pour afficher le timer

// Initialisation des variables
let clickCount = 0; // Initialisation du compteur de clics
let minutes = 0; // Initialisation des minutes
let secondes = 0; // Initialisation des secondes
let timerInterval; // Initialisation de l'intervalle de temps
let firstCard = null; // Initialisation de la première carte retournée
let secondCard = null; // Initialisation de la deuxième carte retournée
let pairsFound = 0; // Initialisation du nombre de paires trouvées

// Fonction pour démarrer le timer
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000); // Démarrage du timer
}

// Fonction pour mettre à jour le timer
function updateTimer() {
    secondes++; // Incrément des secondes

    // Réinitialisation des secondes et incrémentation des minutes si nécessaire
    if (secondes === 60) {
        minutes++;
        secondes = 0;
    }

    // Formatage de l'affichage du timer
    const minutesDisplay = minutes < 10 ? "0" + minutes : minutes;
    const secondesDisplay = secondes < 10 ? "0" + secondes : secondes;

    timerDisplay.textContent = `${minutesDisplay}:${secondesDisplay}`; // Affichage du timer
}

// Fonction pour retourner une carte
function flipCard() {
    // Initialiser le timer au premier clic
    if (!timerInterval) {
        startTimer();
    }

    // Ignorer si déjà retourné ou si c'est la même carte
    if (secondCard || this === firstCard) return;

    // Ajouter la classe flipped pour retourner la carte
    this.classList.add("flipped");

    // Sélectionner l'image à l'intérieur de la carte et lui ajouter une classe
    const imgElement = this.querySelector("img");
    imgElement.src = this.dataset.src; // Utilisation de la source d'image sauvegardée pour la carte cliquée
    imgElement.alt = `Card ${this.dataset.id}`; // Définition de l'attribut alt de l'image

    if (!firstCard) {
        firstCard = this; // Attribution de la première carte si aucune n'est sélectionnée
    } else {
        secondCard = this; // Attribution de la deuxième carte
        clickCount++; // Incrément du compteur de clics à chaque paire de cartes retournée
        countDisplay.textContent = `Compteur : ${clickCount}`; // Mise à jour de l'affichage du compteur
        checkMatch(); // Vérification si les cartes correspondent
    }
}

// Fonction pour vérifier si les deux cartes retournées correspondent
function checkMatch() {
    const id1 = firstCard.dataset.id; // ID de la première carte
    const id2 = secondCard.dataset.id; // ID de la deuxième carte

    if (id1 === id2) {
        setTimeout(() => {
            // Suppression des événements de clic si les cartes correspondent
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard);
            resetCards(); // Réinitialisation des cartes
            pairsFound++; // Incrément du nombre de paires trouvées
            // Vérification si toutes les paires ont été trouvées pour terminer le jeu
            if (pairsFound === cards.length / 2) {
                endGame(); // Fin du jeu
            }
        }, 1000);
    } else {
        setTimeout(() => {
            // Retour à l'image par défaut si les cartes ne correspondent pas
            const imgElement1 = firstCard.querySelector("img");
            const imgElement2 = secondCard.querySelector("img");
            imgElement1.src = "assets/default.png";
            imgElement2.src = "assets/default.png";
            resetCards(); // Réinitialisation des cartes
        }, 1000);
    }
}

// Fonction pour réinitialiser les variables de carte
function resetCards() {
    firstCard.classList.remove("flipped"); // Retirer la classe flipped de la première carte
    secondCard.classList.remove("flipped"); // Retirer la classe flipped de la deuxième carte
    firstCard = null; // Réinitialisation de la première carte
    secondCard = null; // Réinitialisation de la deuxième carte
}


// Fonction pour terminer le jeu
function endGame() {
    // Arrêt du timer
    clearInterval(timerInterval);

    // Affichage du message de félicitations
    alert(`Félicitations ! Vous avez terminé le jeu en ${clickCount} tentatives et ${minutes}:${secondes} !`);
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    // Arrêt du timer
    clearInterval(timerInterval);

    window.location.reload(true);
    // Réinitialisation des variables de temps
    minutes = 0;
    secondes = 0;

    // Réinitialisation de l'affichage du timer
    timerDisplay.textContent = "00:00";

    // Réinitialisation des variables de carte
    firstCard = null;
    secondCard = null;
    pairsFound = 0; // Réinitialisation du nombre de paires trouvées
    clickCount = 0;
    countDisplay.textContent = "Compteur : 0";

    // Masquage de toutes les cartes
    const cardImages = document.querySelectorAll(".card img");
    cardImages.forEach((img) => {
        img.src = "assets/default.png";
    });

    // Mélange des cartes
    cards.sort(() => Math.random() - 0.5);
    gridContainer.innerHTML = ""; // Effacement du contenu de la grille

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

    // Démarrage du timer à nouveau
    startTimer();
}

// Sélection de l'élément du bouton de réinitialisation
const resetButton = document.getElementById("reset");

// Écouteur d'événement pour le clic sur le bouton de réinitialisation
resetButton.addEventListener("click", resetGame);

// Sélection de l'élément du bouton de sauvegarde
const saveButton = document.getElementById("save");

// Écouteur d'événement pour le clic sur le bouton de sauvegarde
saveButton.addEventListener("click", saveGameState);


function saveGameState() {
    clearInterval(timerInterval); // Arrêt du timer

    const gameState = {
        cards: [], // Initialise un tableau pour stocker les paires de cartes
        pairsFound: pairsFound,
        minutes: minutes,
        secondes: secondes,
        clickCount: clickCount
    };

    // Parcours de toutes les cartes pour sauvegarder leur ID et leur placement
    cards.forEach(card => {
        gameState.cards.push({
            id: card.dataset.id,
            src: card.dataset.src,
            flipped: card.classList.contains("flipped") // Indique si la carte est retournée ou non
        });
    });

    // Efface l'ancienne sauvegarde
    if(localStorage.getItem("memoryGameState")) {
        localStorage.removeItem("memoryGameState");
    }

    localStorage.setItem("memoryGameState", JSON.stringify(gameState)); // Enregistrement de l'état du jeu dans le localStorage
    alert("État du jeu sauvegardé avec succès!"); // Affichage d'un message de confirmation

    startTimer(); // Reprend le timer là où il s'était arrêté
}





// Sélection de l'élément du bouton de chargement
const loadButton = document.getElementById("load");

// Écouteur d'événement pour le clic sur le bouton de chargement
loadButton.addEventListener("click", loadGameState);

function loadGameState() {
    const savedState = localStorage.getItem("memoryGameState"); // Récupération de l'état sauvegardé depuis le localStorage
    if (savedState) { // Vérifie si une sauvegarde existe
        const gameState = JSON.parse(savedState); // Conversion de la chaîne JSON en objet JavaScript
        
        // Mise à jour des variables globales avec les données chargées depuis gameState
        pairsFound = gameState.pairsFound;
        minutes = gameState.minutes;
        secondes = gameState.secondes;
        clickCount = gameState.clickCount;

        // Mettre à jour l'affichage du compteur
        countDisplay.textContent = `Compteur : ${clickCount}`;

        // Mettre à jour l'affichage du temps écoulé
        timerDisplay.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${secondes < 10 ? "0" + secondes : secondes}`;
        
        // Reprendre le timer là où il s'était arrêté
        startTimer();

        // Réinitialisation du jeu avec les paires de cartes chargées
        gridContainer.innerHTML = ""; // Effacement du contenu de la grille
        cards = []; // Réinitialisation des cartes

        gameState.cards.forEach(savedCard => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.dataset.id = savedCard.id;
            cardElement.dataset.src = savedCard.src;
            if (savedCard.flipped) {
                cardElement.classList.add("flipped");
                const imgElement = document.createElement("img");
                imgElement.src = savedCard.src;
                imgElement.alt = `Card ${savedCard.id}`;
                cardElement.appendChild(imgElement);
            } else {
                const imgElement = document.createElement("img");
                imgElement.src = "assets/default.png";
                imgElement.alt = "card";
                cardElement.appendChild(imgElement);
            }
            cardElement.addEventListener("click", flipCard);
            gridContainer.appendChild(cardElement);
            cards.push(cardElement);
        });
    } else {
        alert("Aucun état de jeu sauvegardé trouvé."); // Avertissement si aucun état de jeu n'est trouvé dans le localStorage
    }
}

cards.forEach((image) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = image.id; // Vérifiez que image.id est défini correctement
    cardElement.dataset.src = image.src; // Vérifiez que image.src est défini correctement
    cardElement.innerHTML = `<img src="assets/default.png" alt="card">`;
    cardElement.addEventListener("click", flipCard);
    gridContainer.appendChild(cardElement);
});

