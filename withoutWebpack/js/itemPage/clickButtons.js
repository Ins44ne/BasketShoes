import { itemId } from './renderShoe.js'

function addToStorage(key, itemId) {
  let items = JSON.parse(localStorage.getItem(key)) || []

  if (!items.includes(itemId)) {
    items.push(itemId)
  }

  localStorage.setItem(key, JSON.stringify(items))
}

function sizeBlockClick(event) {
  const item = event.target
  if (item.classList.contains('chosen')) {
    item.classList.remove('chosen')
  } else {
    item.classList.add('chosen')
  }
}

function checkSizeSelection() {
  const sizeItems = document.querySelectorAll('.main-shoe-info-size-item')
  return Array.from(sizeItems).some((item) => item.classList.contains('chosen'))
}

function showSizeWarning() {
  const warningDiv = document.createElement('div')
  warningDiv.classList.add('service-alert')
  warningDiv.textContent = 'Please select shoe size'

  document.body.appendChild(warningDiv)

  setTimeout(() => {
    warningDiv.remove()
  }, 2000)
}

document.getElementById('button-fav').addEventListener('click', function () {
  addToStorage('fav', itemId)
})

document.getElementById('button-cart').addEventListener('click', function () {
  if (checkSizeSelection()) {
    addToStorage('cart', itemId)
  } else {
    showSizeWarning()
  }
})

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      const sizeItems = document.querySelectorAll('.main-shoe-info-size-item')
      sizeItems.forEach((item) => {
        item.addEventListener('click', sizeBlockClick)
      })
    }
  })
})

const targetNode = document.getElementById('info-size')
const config = { childList: true, subtree: true }

if (targetNode) {
  observer.observe(targetNode, config)
}
