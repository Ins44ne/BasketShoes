import { itemId } from './renderShoe.js'

function addToStorage(key, itemId, selectedSizes = null) {
  let items = JSON.parse(localStorage.getItem(key)) || []

  if (selectedSizes === null) {
    if (!items.some((item) => item.itemId === itemId)) {
      items.push({ itemId })
    }
  } else {
    selectedSizes.forEach((size) => {
      const existingItem = items.find(
        (item) => item.itemId === itemId && item.size === size
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        items.push({ itemId, size, quantity: 1 })
      }
    })
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

function getSelectedSizes() {
  const sizeItems = document.querySelectorAll(
    '.main-shoe-info-size-item.chosen'
  )
  return Array.from(sizeItems).map((item) => item.id)
}

function checkSizeSelection() {
  return getSelectedSizes().length > 0
}

function showWarning(cartBool, favBool) {
  const warningDiv = document.createElement('div')
  warningDiv.classList.add('service-alert')

  if (favBool) {
    warningDiv.textContent = 'Added to favorites'
  } else {
    if (cartBool) {
      const chosenSizes = document.querySelectorAll('.chosen')
      chosenSizes.forEach((el) => {
        el.classList.remove('chosen')
      })
      warningDiv.textContent = 'Added to cart'
    } else {
      warningDiv.textContent = 'Please select shoe size'
    }
  }
  document.body.appendChild(warningDiv)

  setTimeout(() => {
    warningDiv.remove()
  }, 2000)
}

function addToCart(quantity) {
  let cartCount = parseInt(localStorage.getItem('cartCount')) || 0
  cartCount += quantity
  localStorage.setItem('cartCount', cartCount)
  const cartCountElement = document.getElementById('cart-count')
  if (cartCountElement) {
    cartCountElement.textContent = cartCount
  } else {
    console.error('Element with id="cart-count" not found')
  }
}

document.getElementById('button-fav').addEventListener('click', function () {
  addToStorage('fav', itemId, null)
  showWarning('', true)
})

document.getElementById('button-cart').addEventListener('click', function () {
  if (checkSizeSelection()) {
    const selectedSizes = getSelectedSizes()
    addToStorage('cart', itemId, selectedSizes)
    addToCart(selectedSizes.length)
    showWarning(true)
  } else {
    showWarning(false)
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
