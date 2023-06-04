const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('#restartBtn');
const infoText = document.querySelector('#sideText');
const windConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const turnDiv = document.querySelector('#turnDiv');
const sideDiv = document.querySelector('#sideDiv');
const sidePicker = document.querySelectorAll('.sidePicker');

let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer;
let running = false;
let canPick = false;

let player;
let computer;
let choice;
let computerChoice;

initializeGame();

function initializeGame(){
    sidePicker.forEach(side => side.addEventListener('click', ()=>{
        choice = side.getAttribute('id');
        chooseSide(choice);
    }))
}

function chooseSide(choice){
    if(choice == 'sideX'){
        player = 'X';
        computer = 'O';
        currentPlayer = player;
    } else if (choice == 'sideO'){
        player = 'O';
        computer = 'X';
        currentPlayer = computer;
    }
    startGame();
}

function startGame(){
    sideDiv.style.display = 'none';
    turnDiv.style.display = 'grid';
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    running = true;
    playTurn();
}

function playTurn(){
    if(choice == 'sideX'){
        playerTurn();
    } else if (choice == 'sideO'){
        computerTurn();
    }
}

function playerTurn(){
    canPick = true;
    infoText.textContent = 'Your Turn';
    currentPlayer = player;
}

function computerTurn(){
    canPick = false;
    infoText.textContent = 'Computers Turn';
    currentPlayer = computer;

    let computerOptions = [];
    for(i = 0; i < options.length; i++){
        if(options[i] == ''){
            computerOptions.push(i);
        }
    }
    
    console.log(computerOptions);
    computerIndex = Math.floor(Math.random() * computerOptions.length);
    computerChoice = computerOptions[computerIndex];
    console.log(computerChoice);
    cellClicked(computerChoice);
}

function cellClicked(computerChoice){
    let cellIndex;
    if(computerChoice >= 0){
        options[computerChoice] = currentPlayer;
        document.querySelector(`div[cellIndex='${computerChoice}']`).textContent = currentPlayer;
        console.log(options);
    } else {
        cellIndex = this.getAttribute('cellIndex');

        if(options[cellIndex] != '' || !running || !canPick){
            return;
        }
    
        updateCell(this, cellIndex);
    }

    
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = player;
}

function changePlayer(){
    if(currentPlayer == player){
        computerTurn();
    } else if (currentPlayer == computer){
        playerTurn();
    }
}

function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < windConditions.length; i++){
        const condition = windConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == '' || cellB == '' || cellC == ''){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        infoText.textContent = `${currentPlayer} Wins!`;
        running = false;
    } else if(!options.includes('')){
        infoText.textContent = 'Draw!';
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame(){
    sideDiv.style.display = 'grid';
    turnDiv.style.display = 'none';
    cells.forEach(cell => cell.textContent = '');

    options = ['', '', '', '', '', '', '', '', ''];
    currentPlayer;
    running = false;
    canPick = false;
    player;
    computer;
    choice;
    computerChoice;
}