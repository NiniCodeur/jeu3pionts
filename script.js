const cells = document.querySelectorAll('.cell');
let currentPlayer = "X";

const playerText = document.getElementById("player");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");

function startGame() {
    const playerXName = playerXInput.value;
    const playerOName = playerOInput.value;

    if (playerXName && playerOName) {
        playerXInput.disabled = true;
        playerOInput.disabled = true;
        playerXInput.style.display = "none";
        playerOInput.style.display = "none";
        playerXInput.value = "";
        playerOInput.value = "";

        currentPlayer = "X";
        updatePlayerText(playerXName, playerOName);
    } else {
        alert("Veuillez entrer les noms des joueurs !");
    }
}

function placeMark(cellIndex) {
    const cell = cells[cellIndex];
    if (!cell.textContent) {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        if (checkWin()) {
            alert("Le joueur " + getPlayerName(currentPlayer) + " a gagné !");
            resetBoard();
        } else if (checkTie()) {
            alert("Match nul !");
            resetBoard();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updatePlayerText();
        }
    }
}

function updatePlayerText(playerXName, playerOName) {
    if (playerXName && playerOName) {
        playerText.textContent = "C'est le tour de " + getPlayerName(currentPlayer);
    } else {
        playerText.textContent = "Entrez les noms des joueurs";
    }
}

function getPlayerName(player) {
    return player === "X" ? playerXInput.value : playerOInput.value;
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
        [0, 4, 8], [2, 4, 6] // diagonales
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer
        ) {
            return true;
        }
    }

    return false;
}

function checkTie() {
    return [...cells].every(cell => cell.textContent !== "");
}

function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
    playerXInput.disabled = false;
    playerOInput.disabled = false;
    playerXInput.style.display = "inline";
    playerOInput.style.display = "inline";
    updatePlayerText();
}