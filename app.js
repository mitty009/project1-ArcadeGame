const grid = document.querySelector('.grid')
const width = 10
const cells = []
const battleShip1 = []
const battleShip2 = []
const battleShip3 = []
const availableChoice = []

for (let i = 1; i < width ** 2 + 1; i++) {
  availableChoice.push(i)
}

console.log(availableChoice)

// Create grid pattern
for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cells')
  div.classList.add('available')
  div.setAttribute('id', i + 1)
  grid.appendChild(div)
  cells.push(div)
}

let cellNumber = 0
// Set player choices and remove available choices
function playerChooses() {
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      cellNumber = Number(cell.id)

      if (battleShip1.length < 3) {
        battleShip1.push(cellNumber)
        cell.classList.add('selected')
        console.log('battleship 1 ' + battleShip1)
        removeChoices()
        console.log(availableChoice)

      } else if (battleShip2.length < 4) {
        battleShip2.push(cellNumber)
        cell.classList.add('selected')
        console.log('battleship 2 ' + battleShip2)
        removeChoices()


      } else if (battleShip3.length < 5) {
        battleShip3.push(cellNumber)
        cell.classList.add('selected')
        console.log('battleship 3 ' + battleShip3)
        removeChoices()

      } else {
        console.log('All battleship positions taken')
      }
    })
  })
}

function removeChoices() {
  for (let i = 0; i < availableChoice.length; i++) {
    if (availableChoice[i] === cellNumber) {
      availableChoice.splice(i, 1)   
    }
  }
}

function checkDiagonal() {

}

function checkLocation() {

}

playerChooses()