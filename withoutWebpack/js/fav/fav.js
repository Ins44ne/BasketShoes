import { fetchShoesData, dataArray } from '../components/fetchShoesData.js'

document.addEventListener('DOMContentLoaded', async function () {
  await fetchShoesData()

  const favItems = JSON.parse(localStorage.getItem('fav')) || []

  const itemShoesBlock = document.querySelector('.main-wrapper')

  favItems.forEach((item) => {
    const itemId = item.itemId

    dataArray.forEach((data) => {
      Object.values(data).forEach((shoes) => {
        shoes.forEach((shoe) => {
          if (shoe.id === itemId) {
            const shoeItem = document.createElement('div')
            shoeItem.classList.add('main-shoe-fav-item')
            shoeItem.id = shoe.id

            const shoeImage = document.createElement('img')
            shoeImage.src = `../../${shoe.images[0]}`
            shoeImage.classList.add('main-shoe-fav-item-img')
            shoeImage.alt = `${shoe.shoe_name}`
            shoeItem.appendChild(shoeImage)

            const shoeName = document.createElement('h3')
            shoeName.textContent = shoe.shoe_name
            shoeName.classList.add('main-shoe-fav-item-name')
            shoeItem.appendChild(shoeName)

            const shoePriceWrapper = document.createElement('div')
            shoePriceWrapper.classList.add('main-shoe-fav-item-price-wrapper')
            shoeItem.appendChild(shoePriceWrapper)

            if (shoe.discounted_price !== 0) {
              const shoeDiscountedPrice = document.createElement('p')
              shoeDiscountedPrice.textContent = `$${shoe.discounted_price}`
              shoeDiscountedPrice.classList.add('main-shoe-fav-item-discount')
              shoePriceWrapper.appendChild(shoeDiscountedPrice)
            } else {
              const shoePrice = document.createElement('p')
              shoePrice.textContent = `$${shoe.price}`
              shoePrice.classList.add('main-shoe-fav-item-price')
              shoePriceWrapper.appendChild(shoePrice)
            }

            const buttonDelete = document.createElement('button')
            buttonDelete.textContent = 'delete'
            buttonDelete.classList.add(
              'main-shoe-fav-item-button',
              'button',
              'button-delete'
            )
            shoeItem.appendChild(buttonDelete)

            buttonDelete.addEventListener('click', function () {
              const parentElement = this.parentElement
              const itemId = parentElement.id
              parentElement.remove()

              let favItems = JSON.parse(localStorage.getItem('fav')) || []
              const updatedFavItems = favItems.filter(
                (item) => item.itemId !== itemId
              )
              localStorage.setItem('fav', JSON.stringify(updatedFavItems))
            })

            itemShoesBlock.appendChild(shoeItem)
          }
        })
      })
    })

    const items = document.querySelectorAll('.main-shoe-fav-item')
    items.forEach(function (item) {
      item.addEventListener('click', function () {
        const itemId = this.id
        window.location.href = `../../pages/itemPage/itemPage.html?id=${itemId}`
      })
      const deleteButton = item.querySelector('.button-delete')
      deleteButton.addEventListener('click', function (event) {
        event.stopPropagation()
        item.remove()
      })
    })
  })
})
