
const grid = document.querySelector('.grid')
const startButton = document.querySelector('#button')
const restartButton = document.querySelector('#restart')
const score = document.querySelector('#score')
const lives = document.querySelector('#lives')
const timer = document.querySelector('.timer')
const output = document.querySelector('#output')
const highScore = document.querySelector('#highscore')
let playerHighScore = 0
let carsRight = []
let carsLeft = []
const logsRight = []
const logsLeft = []
let playerScore = 0
let playerLives = 3
let countdown = 30
const cells = []
const width = 9
let currentIndex = 76
let carsIndex = 0
let logsIndexLeft = 26
let logsIndexRight = 9

lives.innerHTML = `Player Lives: ${playerLives}`
score.innerHTML = `Player Score: ${playerScore}`

for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cells')
  div.classList.add('grass')
  div.setAttribute('id', i)
  grid.appendChild(div)
  cells.push(div)
}

function setTimer() {
  const timerId = setInterval(() => {
    if (countdown) {
      countdown--
      timer.innerHTML = `Time Remaining: ${countdown}`
    } else {
      checkLoser()
    }
  }, 1000);
}

function frogMovement() {
  cells[currentIndex].classList.add('frog')
  document.addEventListener('keypress', (event) => {
    const key = event.key
    if (key === 'w' && !(currentIndex < width)) {
      cells[currentIndex].classList.remove('frog')
      currentIndex -= width
      cells[currentIndex].classList.add('frog')
      checkLoser()
    } else if (key === 's' && !(currentIndex > (width ** 2) - width - 1)) {
      cells[currentIndex].classList.remove('frog')
      currentIndex += width
      cells[currentIndex].classList.add('frog')
      checkLoser()
    } else if (key === 'a' && !(currentIndex % width === 0)) {
      cells[currentIndex].classList.remove('frog')
      currentIndex -= 1
      cells[currentIndex].classList.add('frog')
      checkLoser()
    } else if (key === 'd' && !(currentIndex % width === width - 1)) {
      cells[currentIndex].classList.remove('frog')
      currentIndex += 1
      cells[currentIndex].classList.add('frog')
      checkLoser()
    }
    checkWinner()

  })
}

class RenderObjects {
  constructor(cells, width) {
    this.cells = cells
    this.width = width
  }
  renderObjects() {
    for (let i = 1; i < width; i = i + 2) {
      cells[i].classList.add('lillypad')
      cells[i].classList.remove('grass')
    }
    for (let i = width; i < 27; i++) {
      cells[i].classList.add('river')
      cells[i].classList.remove('grass')
    }
    for (let i = 0; i < width; i += 2) {
      cells[i].classList.add('river')
      cells[i].classList.remove('grass')
    }
    for (let i = 45; i < 63; i++) {
      cells[i].classList.add('road')
      cells[i].classList.remove('grass')
    }
    for (let i = width * 3 - 1; i >= width * 3 - 3; i--) {
      cells[i].classList.add('logs')
      cells[i].classList.remove('grass')
      logsLeft.push(cells[i])
      logsIndexLeft--
    }
    for (let i = width; i < width + 3; i++) {
      cells[i].classList.add('logs')
      cells[i].classList.remove('grass')
      logsRight.push(cells[i])
      logsIndexRight++
    }
  }
}

function renderCarsLeft() {
  for (let i = 56; i < 63; i = i + 3) {
    cells[i].classList.add('cars')
    cells[i].classList.remove('grass')
    carsLeft.push(cells[i])
  }
}
function renderCarsRight() {
  for (let i = 45; i < 54; i = i + 3) {
    cells[i].classList.add('cars')
    cells[i].classList.remove('grass')
    carsRight.push(cells[i])
  }
}


function moveCars() {
  const intervalCars = setInterval(() => {
    carsLeft.forEach(car => {
      carsIndex = Number(car.id)
      if (carsIndex === 54 || carsIndex === 57 || carsIndex === 60) {
        car.classList.remove('cars')
        carsLeft = []
        renderCarsLeft()
      } else {
        car.classList.remove('cars')
        carsIndex -= 1
        cells[carsIndex].classList.add('cars')
        carsLeft.push(cells[carsIndex])
      }
    })
    carsRight.forEach(car => {
      carsIndex = Number(car.id)
      if (carsIndex === 47 || carsIndex === 50 || carsIndex === 53) {
        car.classList.remove('cars')
        carsRight = []
        renderCarsRight()
      } else {
        car.classList.remove('cars')
        carsIndex += 1
        cells[carsIndex].classList.add('cars')
        carsRight.push(cells[carsIndex])
      }
    })
    checkLoser()
  }, 700);
  
}

function moveLogs() {
  intervalLogsLeft = setInterval(() => {
    if (logsIndexLeft > 17) {
      cells[logsIndexLeft].classList.add('logs')
      logsLeft.push(cells[logsIndexLeft])
      logsIndexLeft--
      logsLeft[0].classList.remove('logs')
      logsLeft.shift()
    } else {
      logsIndexLeft = 26
      logsLeft[0].classList.remove('logs')
    }
    if ((currentIndex === logsIndexLeft + 2 || currentIndex === logsIndexLeft + 3 || currentIndex === logsIndexLeft + 4) && (currentIndex > 17 && currentIndex < 27)) {
      cells[currentIndex].classList.remove('frog')
      currentIndex -= 1
      cells[currentIndex].classList.add('frog')
    }
    if (logsIndexRight < 18) {
      cells[logsIndexRight].classList.add('logs')
      logsRight.push(cells[logsIndexRight])
      logsIndexRight++
      logsRight[0].classList.remove('logs')
      logsRight.shift()
    } else {
      logsIndexRight = 9
      logsRight[0].classList.remove('logs')
    }
    if ((currentIndex === logsIndexRight - 2 || currentIndex === logsIndexRight - 3 || currentIndex === logsIndexRight - 4) && (currentIndex > 9 && currentIndex < 18)) {
      cells[currentIndex].classList.remove('frog')
      currentIndex += 1
      cells[currentIndex].classList.add('frog')
    }
  }, 300);
}


function checkWinner() {
  if (cells[1].classList.contains('frog') ||
    cells[3].classList.contains('frog') ||
    cells[5].classList.contains('frog') ||
    cells[7].classList.contains('frog')) {
    countdown = 30
    playerScore += 100
    score.innerHTML = `Player Score: ${playerScore}`
    cells[currentIndex].classList.remove('frog')
    currentIndex = 76
    cells[currentIndex].classList.add('frog')
    output.innerHTML = 'WELL DONE! You made it! Keep going.'
  }
}

function checkLoser() {
  if ((cells[currentIndex].classList.contains('frog') && cells[currentIndex].classList.contains('cars')) || (cells[currentIndex].classList.contains('river') && cells[currentIndex].classList.contains('frog')) && !cells[currentIndex].classList.contains('logs') || !countdown) {
    if (playerLives <= 1) {
      playerLives -= 1
      currentIndex = -1
      lives.innerHTML = `Player Lives: ${playerLives}`
      output.innerHTML = `Your final score is: ${playerScore}`
      clearInterval(1)
      clearInterval(2)
      clearInterval(3)
      clearInterval(4)
    } else {
      playerLives -= 1
      lives.innerHTML = `Player Lives: ${playerLives}`
      cells[currentIndex].classList.remove('frog')
      currentIndex = 76
      output.innerHTML = 'Oh no you died! Try again...'
      cells[currentIndex].classList.add('frog')
      countdown = 30
    }
  }
}

startButton.addEventListener('click', () => {
  const playerName = prompt('Please insert your name')
  frogMovement()
  let play = new RenderObjects(cells, width)
  play.renderObjects()
  renderCarsLeft()
  renderCarsRight()
  moveLogs()
  moveCars()
  clearInterval(3)
  setTimer()
  startButton.style.visibility = 'hidden'
  cells[currentIndex].classList.add('frog')
})

restartButton.addEventListener('click', () => {
  location.reload()
})