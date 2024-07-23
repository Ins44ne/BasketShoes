import { displayNewArrivals } from './newArrivals.js'

const leftArr = document.getElementById('left-arrow')
const rightArr = document.getElementById('right-arrow')
const arrWrapper = document.getElementById('newArrivalsWrapper')
let currentPosition = 0
const itemWidth = 350
const timeTransition = '1s'
let items, maxPosition

function updateItems() {
  items = arrWrapper.children
  const visibleItems = Math.floor(arrWrapper.offsetWidth / itemWidth)
  maxPosition = -(itemWidth * (items.length - visibleItems))
}

function moveArrivals(direction) {
  return function () {
    if (direction === 'left') {
      currentPosition += itemWidth
      if (currentPosition > 0) {
        currentPosition = maxPosition
        arrWrapper.style.transition = 'none'
        arrWrapper.style.transform = `translateX(${currentPosition}px)`
        setTimeout(() => {
          arrWrapper.style.transition = timeTransition
        }, 20)
      }
    } else {
      currentPosition -= itemWidth
      if (currentPosition < maxPosition) {
        currentPosition = 0
        arrWrapper.style.transition = 'none'
        arrWrapper.style.transform = `translateX(${currentPosition}px)`
        setTimeout(() => {
          arrWrapper.style.transition = timeTransition
        }, 20)
      }
    }
    arrWrapper.style.transform = `translateX(${currentPosition}px)`
    arrWrapper.style.transition = timeTransition
  }
}

leftArr.addEventListener('click', moveArrivals('left'))
rightArr.addEventListener('click', moveArrivals('right'))

window.addEventListener('resize', () => {
  updateItems()
})

document.addEventListener('DOMContentLoaded', async () => {
  await displayNewArrivals()
  updateItems()
})
