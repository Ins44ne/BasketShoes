import { fetchShoesData, dataArray } from './fetchShoesData.js'

export async function playerNames() {
  await fetchShoesData()
  const playersBlock = document.getElementById('players-list')
  const playersSet = new Set()

  dataArray.forEach((data) => {
    Object.values(data).forEach((shoes) => {
      shoes.forEach((shoe) => {
        playersSet.add(shoe.shoe_line_name)
      })
    })
  })
  const playersArr = Array.from(playersSet).map((player) =>
    player.replace(/_/g, ' ')
  )

  playersArr.forEach((el) => {
    const playerElement = document.createElement('div')
    playerElement.classList.add('main-players-item')
    playerElement.id = el.replace(' ', '')
    playerElement.textContent = el
    playersBlock.appendChild(playerElement)
  })
}

document.addEventListener('DOMContentLoaded', playerNames)
