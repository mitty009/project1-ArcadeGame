const grid = document.querySelector('.grid')
const width = 5
const cells = []
const playerChoice = []
const availableChoice = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

// Create grid pattern
for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cells')
  div.setAttribute('id', i + 1)
  grid.appendChild(div)
  cells.push(div)
}

function playerChooses(){
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (playerChoice.length < 12) {
        playerChoice.push(Number(cell.id))
        console.log(playerChoice)
        for (let i = 0; i < availableChoice.length; i++) {
          if (availableChoice[i] === Number(cell.id)) {
            availableChoice.splice(i, 1)
            console.log(availableChoice)
            console.log(playerChoice)
          }
        }
      }
    })
  })
}
// Set player choices and remove available choices
