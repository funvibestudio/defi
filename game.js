document.addEventListener('DOMContentLoaded', () => {
    let players = [];
    let playerPoints = {};
    let currentChallengeIndex = 0;

    // Liste des défis à réaliser
    const challenges = [
        "Faire une pyramide humaine ⛰️",
        "Danser sur un morceau de musique 🎶",
        "Trouver un objet rouge 🔴",
        "Mets toi en calecon",
        "Aligner 10 objets de la même taille et les prendre en photo.",
        "Poser avec la position la plus épique que tu puisses imaginer.",
        "Construire une tour avec des objets trouvés autour de toi.",
        "Mimer une scène de film culte et prendre une photo.",
        "Repérer quelque chose avec le chiffre 7 dessus.",
        "Capturer ton reflet dans un objet qui n'est pas un miroir.",
        "Faire une roue (ou une tentative rigolote).",
        "Tenir la pose planche pendant 15 secondes et prendre une photo.",
        
        
    ];

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
        if (currentChallengeIndex < challenges.length) {
            const currentChallenge = challenges[currentChallengeIndex];
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
