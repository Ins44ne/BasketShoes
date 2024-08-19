import { fetchShoesData, dataArray } from '../components/fetchShoesData.js'

document.addEventListener('DOMContentLoaded', async function () {
  await fetchShoesData()

  const cartItems = JSON.parse(localStorage.getItem('cart')) || []

  const itemShoesBlock = document.querySelector('.main-wrapper')

  cartItems.forEach((itemId) => {
    dataArray.forEach((data) => {
      Object.values(data).forEach((shoes) => {
        shoes.forEach((shoe) => {
          if (shoe.id === itemId) {
            const shoeItem = document.createElement('div')
            shoeItem.classList.add('main-shoe-cart-item')
            shoeItem.id = shoe.id

            const shoeImage = document.createElement('img')
            shoeImage.src = `../../${shoe.images[0]}`
            shoeImage.classList.add('main-shoe-cart-item-img')
            shoeImage.alt = `${shoe.shoe_name}`
            shoeItem.appendChild(shoeImage)

            const shoeName = document.createElement('h3')
            shoeName.textContent = shoe.shoe_name
            shoeName.classList.add('main-shoe-cart-item-name')
            shoeItem.appendChild(shoeName)

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

            buttonDelete.addEventListener('click', function () {
              const parentElement = this.parentElement
              const itemId = parentElement.id
              parentElement.remove()

              let cartItems = JSON.parse(localStorage.getItem('cart')) || []
              const updatedcartItems = cartItems.filter((id) => id !== itemId)
              localStorage.setItem('cart', JSON.stringify(updatedcartItems))
            })

            itemShoesBlock.appendChild(shoeItem)
          }
        })
      })
    })
  })
})
