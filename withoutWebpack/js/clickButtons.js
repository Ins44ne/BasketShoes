import { itemId } from './renderShoe.js'

function addToStorage(key, itemId) {
  let items = JSON.parse(localStorage.getItem(key)) || []

  if (!items.includes(itemId)) {
    items.push(itemId)
  }

  localStorage.setItem(key, JSON.stringify(items))
}

document.getElementById('button-fav').addEventListener('click', function () {
  addToStorage('fav', itemId)
})

document.getElementById('button-cart').addEventListener('click', function () {
  addToStorage('cart', itemId)
})
