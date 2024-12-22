document.addEventListener('DOMContentLoaded', () => {
    let players = [];
    let playerPoints = {};
    let currentChallengeIndex = 0;

    // Liste des défis à réaliser
    const challenges = [
        "Faire une pyramide humaine ⛰️",
        "Danser sur un morceau de musique 🎶",
        "Trouver un objet rouge 🔴",
        "Mets toi en caleçon",
        "Aligner 10 objets de la même taille et les prendre en photo.",
        "Poser avec la position la plus épique que tu puisses imaginer.",
        "Construire une tour avec des objets trouvés autour de toi.",
        "Mimer une scène de film culte et prendre une photo.",
        "Repérer quelque chose avec le chiffre 7 dessus.",
        "Capturer ton reflet dans un objet qui n'est pas un miroir.",
        "Faire une roue (ou une tentative rigolote).",
        "Tenir la pose planche pendant 15 secondes et prendre une photo.",
        "Réaliser une pose de yoga originale 🧘",
        "Créer un dessin avec des objets trouvés autour de toi ✍️",
        "Manger quelque chose avec les yeux fermés 👀",
        "Faire une sculpture en pâte à modeler ou argile 🏺",
        "Organiser une mini chasse au trésor pour tes amis 🔍",
        "Faire une course en arrière 🏃‍♂️",
        "Dessiner un portrait à l'aveugle 👤",
        "Trouver un objet rond 🟠",
        "Sauter sur place 10 fois sans s’arrêter 🤸",
        "Faire un maquillage créatif 🖌️",
        "Trouver un objet qui commence par la lettre 'B' 🅱️",
        "Prendre une photo en noir et blanc 📸",
        "Réaliser un animal avec des légumes 🥕",
        "Te déguiser en ton personnage préféré 🎭",
        "Lire un texte à l'envers 📝",
        "Mimer une profession et faire deviner aux autres 🧑‍⚕️",
        "Faire une imitation de ton animal préféré 🐱",
        "Saute comme un kangourou pendant 30 secondes 🦘",
        "Fabriquer un chapeau rigolo avec du papier 🎩",
        "Construire un château de cartes 🏰",
        "Choisir un mot et l'écrire en lettres géantes avec des objets 🖋️",
        "Créer un origami 🦢",
        "Inventer un nouveau sport et le démontrer ⚽",
        "Remplacer un mot d'une chanson populaire par un autre mot 🤪",
        "Créer une mini exposition d'objets bizarres 👀",
        "Trouver un objet avec une texture douce 🤲",
        "Imiter un cri d'animal 🦓",
        "Regarder un livre à l’envers 📚",
        "Essayer de faire 5 saltos en arrière 🌀",
        "Prendre une photo dans une pose de super-héros 🦸",
        "Construire un véhicule avec des Lego 🚗",
        "Trouver un objet avec la lettre 'A' 👓",
        "Créer un collier avec des pâtes 🍝",
        "Faire un dessin avec les yeux fermés 👁️",
        "Réaliser un tableau avec des épices 🌶️",
        "Essayer de faire une figure acrobatique en duo 👫",
        "Fabriquer un chapeau de Noël avec du papier cadeau 🎁",
        "Faire une danse d’improvisation 🕺",
        "Trouver un objet plus grand que toi 🏢",
        "Regarder dans un télescope et imaginer une histoire d'astronaute 🌟",
        "Essayer de faire une figure acrobatique en duo 👫",
        "Créer un dessin géant sur une grande feuille 🖍️",
        "Poser comme un mannequin pendant 30 secondes 💃",
        "Créer un costume avec des accessoires maison 👑",
        "Faire une démonstration de magie simple 🪄",
        "Fabriquer une maquette d’un parc d’attractions 🎢",
        "Sauter dans une flaque d'eau sans se mouiller 💦",
        "Regarder un livre avec une loupe 🔍",
        "Réussir à faire une figure de gymnastique sans tomber 🤸‍♂️",
        "Créer un objet en recyclant des matériaux du quotidien ♻️",
        "Faire une photo dans un endroit surprenant 📸",
        "Réussir à marcher sur les mains pendant 10 secondes 🤸‍♀️",
        "Faire une série de poses de danse en suivant un rythme 🎵",
        "Faire un origami avec une feuille géante 🦢",
        "Construire un bonhomme de neige (ou un bonhomme avec des objets) ☃️",
        "Créer une œuvre d'art à partir de graines de différentes sortes 🌾",
        "Chanter un air d'opéra de manière exagérée 🎤",
        "Faire un dessin avec les pieds 🦶",
        "Mettre des vêtements à l’envers pendant 10 minutes ⏱️",
        "Créer une poésie avec des mots aléatoires 📖",
        "Faire une danse avec un balai à la place d’un partenaire 🧹",
        "Dessiner un paysage avec des crayons de couleur 🏞️",
        "Jouer à faire des ombres chinoises avec tes mains 🖤",
        "Créer un masque à partir d’éléments naturels comme des feuilles 🍃",
        "Prendre une photo en sautant en l’air 📸",
        "Faire un montage photo rigolo avec des filtres amusants 📱",
        "Essayer de construire un radeau avec des matériaux trouvés autour de toi 🌊",
        "Jouer à un jeu de rôle en improvisant des personnages 🎭",
        "Construire une cabane dans le salon avec des coussins 🛋️",
        "Imiter un personnage historique avec ta voix 👩‍🎤",
        "Organiser une course de sacs en toile avec tes amis 🏁",
        "Créer une création artistique en utilisant des autocollants 🎟️",
        "Faire une course de chaises à roulettes dans un couloir 🪑",
        "Faire un tableau avec des bouchons de liège 🍾",
        "Créer une maquette d’un animal en papier mâché 🦄",
        "Essayer de jongler avec des balles en mousse 🎈",
        "Faire un défi de danse avec des lunettes de soleil 😎",
        "Trouver un objet en forme de cœur ❤️",
        "Représenter ton personnage imaginaire préféré 🦄",
        "Créer un diorama miniature avec des objets de ta maison 🏡",
        "Réorganiser ta chambre en 10 minutes ⏳",
        "Créer une série de dessins représentant une histoire 📚",
        "Tenter de faire un équilibre sur une jambe pendant 1 minute 🦵",
        "Réaliser une performance artistique en utilisant des ombres 👤",
    ];

    // Mélanger le tableau des défis de manière aléatoire
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Échanger les éléments
        }
    }

    // Mélanger les défis et en prendre 10 au maximum
    shuffleArray(challenges);
    const limitedChallenges = challenges.slice(0, 10);

    const playerNameInput = document.getElementById('player-name');
    const playersList = document.getElementById('players-list');
    const addPlayerBtn = document.getElementById('add-player-btn');
    const startGameBtn = document.getElementById('start-game-btn');
    const nextChallengeBtn = document.getElementById('next-challenge');
    const currentChallengeText = document.getElementById('current-challenge');
    const playerButtonsDiv = document.getElementById('player-buttons');
    const scoreBoard = document.getElementById('score-board');
    const scoresTableBody = document.getElementById('scores');
    const restartBtn = document.getElementById('restart-btn');

    // Ajouter un joueur
    function addPlayer() {
        const playerName = playerNameInput.value.trim();
        if (playerName && !players.includes(playerName)) {
            players.push(playerName);
            playerPoints[playerName] = 0;
            const playerItem = document.createElement('li');
            playerItem.textContent = playerName;
            playersList.appendChild(playerItem);
        }
        playerNameInput.value = '';
        if (players.length > 0) {
            startGameBtn.style.display = 'inline-block';
        }
    }

    // Démarrer le jeu
    function startGame() {
        addPlayerBtn.style.display = 'none';
        startGameBtn.style.display = 'none';
        nextChallengeBtn.style.display = 'inline-block';
        currentChallengeText.textContent = "Clique sur 'C'est parti !' pour voir le défi.";
    }

    // Afficher le prochain défi
    function showNextChallenge() {
        if (currentChallengeIndex < limitedChallenges.length) {
            const currentChallenge = limitedChallenges[currentChallengeIndex];
            currentChallengeText.textContent = currentChallenge;

            // Afficher les boutons pour chaque joueur
            playerButtonsDiv.innerHTML = ''; // Réinitialiser les boutons
            players.forEach(player => {
                const buttonContainer = document.createElement('div');
                const playerText = document.createElement('span');
                playerText.textContent = player;

                const successButton = document.createElement('button');
                successButton.textContent = "Réussi";
                successButton.onclick = () => handlePlayerResult(player, true, successButton);

                const failButton = document.createElement('button');
                failButton.textContent = "Échoué";
                failButton.onclick = () => handlePlayerResult(player, false, failButton);

                buttonContainer.appendChild(playerText);
                buttonContainer.appendChild(successButton);
                buttonContainer.appendChild(failButton);

                playerButtonsDiv.appendChild(buttonContainer);
            });

            // Masquer le bouton "C'est parti" et passer au défi suivant
            nextChallengeBtn.style.display = 'none';
            currentChallengeIndex++;
        } else {
            showScoreBoard();
        }
    }

    // Gérer les résultats des joueurs
    function handlePlayerResult(player, success, button) {
        if (success) {
            playerPoints[player]++; // Si le joueur réussit, on lui ajoute un point
            button.style.backgroundColor = 'green'; // Couleur de réussite
        } else {
            button.style.backgroundColor = 'red'; // Couleur d'échec
        }

        // Désactiver tous les boutons après un choix
        const buttons = button.parentElement.querySelectorAll('button');
        buttons.forEach(btn => btn.disabled = true);

        // Vérifier si tous les joueurs ont répondu
        if (playerButtonsDiv.querySelectorAll('button:disabled').length === players.length * 2) {
            nextChallengeBtn.style.display = 'inline-block'; // Afficher le bouton pour passer au défi suivant
        }
    }

    // Afficher le tableau des scores
    function showScoreBoard() {
        scoreBoard.style.display = 'block';

        // Vider le tableau avant d'ajouter les scores
        scoresTableBody.innerHTML = '';

        players.forEach(player => {
            const row = document.createElement('tr');
            const playerCell = document.createElement('td');
            playerCell.textContent = player;
            const scoreCell = document.createElement('td');
            scoreCell.textContent = playerPoints[player];
            row.appendChild(playerCell);
            row.appendChild(scoreCell);
            scoresTableBody.appendChild(row);
        });
    }

    // Recommencer le jeu
    function restartGame() {
        // Rediriger vers la page de sélection du niveau (par exemple index.html)
        window.location.href = 'niveaux.html';  // Remplace 'index.html' par le nom de la page de sélection du niveau
    }

    addPlayerBtn.addEventListener('click', addPlayer);
    startGameBtn.addEventListener('click', startGame);
    nextChallengeBtn.addEventListener('click', showNextChallenge);
    restartBtn.addEventListener('click', restartGame);
});
