import { fetchShoesData, dataArray } from '../components/fetchShoesData.js'

document.addEventListener('DOMContentLoaded', async function () {
  await fetchShoesData()

  const cartItems = JSON.parse(localStorage.getItem('cart')) || []
  const itemShoesBlock = document.querySelector('.main-wrapper')

  cartItems.forEach((cartItem) => {
    dataArray.forEach((data) => {
      Object.values(data).forEach((shoes) => {
        shoes.forEach((shoe) => {
          if (shoe.id === cartItem.itemId) {
            const shoeItem = document.createElement('div')
            shoeItem.classList.add('main-shoe-cart-item')
            shoeItem.id = `${shoe.id}-${cartItem.size}`

            const shoeImage = document.createElement('img')
            shoeImage.src = `../../${shoe.images[0]}`
            shoeImage.classList.add('main-shoe-cart-item-img')
            shoeImage.alt = `${shoe.shoe_name}`
            shoeItem.appendChild(shoeImage)

            const shoeName = document.createElement('h3')
            shoeName.textContent = shoe.shoe_name
            shoeName.classList.add('main-shoe-cart-item-name')
            shoeItem.appendChild(shoeName)

            const shoeSize = document.createElement('p')
            shoeSize.textContent = `Size: ${cartItem.size}`
            shoeSize.classList.add('main-shoe-cart-item-size')
            shoeItem.appendChild(shoeSize)

            const shoeQuantityWrapper = document.createElement('div')
            shoeQuantityWrapper.classList.add(
              'main-shoe-cart-item-quantity-wrapper'
            )
            shoeItem.appendChild(shoeQuantityWrapper)

            const buttonMinus = document.createElement('button')
            buttonMinus.textContent = '-'
            buttonMinus.classList.add(
              'quantity-button',
              'button',
              'button-minus'
            )
            shoeQuantityWrapper.appendChild(buttonMinus)

            const shoeQuantity = document.createElement('p')
            shoeQuantity.textContent = cartItem.quantity
            shoeQuantity.classList.add('main-shoe-cart-item-quantity')
            shoeQuantityWrapper.appendChild(shoeQuantity)

            const buttonPlus = document.createElement('button')
            buttonPlus.textContent = '+'
            buttonPlus.classList.add('quantity-button', 'button', 'button-plus')
            shoeQuantityWrapper.appendChild(buttonPlus)

            const shoePriceWrapper = document.createElement('div')
            shoePriceWrapper.classList.add('main-shoe-cart-item-price-wrapper')
            shoeItem.appendChild(shoePriceWrapper)

            if (shoe.discounted_price !== 0) {
              const shoeDiscountedPrice = document.createElement('p')
              shoeDiscountedPrice.textContent = `$${shoe.discounted_price}`
              shoeDiscountedPrice.classList.add('main-shoe-cart-item-discount')
              shoePriceWrapper.appendChild(shoeDiscountedPrice)
            } else {
              const shoePrice = document.createElement('p')
              shoePrice.textContent = `$${shoe.price}`
              shoePrice.classList.add('main-shoe-cart-item-price')
              shoePriceWrapper.appendChild(shoePrice)
            }

            const buttonDelete = document.createElement('button')
            buttonDelete.textContent = 'delete'
            buttonDelete.classList.add(
              'main-shoe-cart-item-button',
              'button',
              'button-delete'
            )
            shoeItem.appendChild(buttonDelete)

            buttonMinus.addEventListener('click', function () {
              let cartItems = JSON.parse(localStorage.getItem('cart')) || []
              const updatedCartItems = cartItems
                .map((item) => {
                  if (
                    item.itemId === cartItem.itemId &&
                    item.size === cartItem.size
                  ) {
                    const newQuantity = item.quantity - 1
                    if (newQuantity > 0) {
                      return {
                        ...item,
                        quantity: newQuantity,
                      }
                    } else {
                      return null
                    }
                  }
                  return item
                })
                .filter((item) => item !== null)

              localStorage.setItem('cart', JSON.stringify(updatedCartItems))

              if (
                updatedCartItems.some(
                  (item) =>
                    item.itemId === cartItem.itemId &&
                    item.size === cartItem.size
                )
              ) {
                shoeQuantity.textContent = `${
                  updatedCartItems.find(
                    (item) =>
                      item.itemId === cartItem.itemId &&
                      item.size === cartItem.size
                  ).quantity
                }`
              } else {
                shoeItem.remove()
              }
            })

            buttonPlus.addEventListener('click', function () {
              let cartItems = JSON.parse(localStorage.getItem('cart')) || []
              const updatedCartItems = cartItems.map((item) => {
                if (
                  item.itemId === cartItem.itemId &&
                  item.size === cartItem.size
                ) {
                  return {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                }
                return item
              })

              localStorage.setItem('cart', JSON.stringify(updatedCartItems))
              shoeQuantity.textContent = `${
                updatedCartItems.find(
                  (item) =>
                    item.itemId === cartItem.itemId &&
                    item.size === cartItem.size
                ).quantity
              }`
            })

            buttonDelete.addEventListener('click', function () {
              const parentElement = this.parentElement
              const [itemId, size] = parentElement.id.split('-')

              let cartItems = JSON.parse(localStorage.getItem('cart')) || []
              const updatedCartItems = cartItems.filter(
                (item) => !(item.itemId === itemId && item.size === size)
              )

              localStorage.setItem('cart', JSON.stringify(updatedCartItems))
              parentElement.remove()
            })

            itemShoesBlock.appendChild(shoeItem)
          }
        })
      })
    })
  })
})
