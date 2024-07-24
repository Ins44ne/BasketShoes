import { fetchShoesData, dataArray } from './fetchShoesData.js'

export async function displayNewArrivals() {
  await fetchShoesData()
  const newArrBlock = document.getElementById('newArrivalsWrapper')

  dataArray.forEach((data) => {
    Object.values(data).forEach((shoes) => {
      shoes.forEach((shoe) => {
        if (shoe.new === true) {
          const shoeCard = document.createElement('div')
          shoeCard.classList.add('main-newArrivals-items-item')
          shoeCard.id = shoe.id

          const shoeImage = document.createElement('img')
          shoeImage.src = shoe.images[0]
          shoeImage.classList.add('main-newArrivals-items-item-image')
          shoeImage.alt = `${shoe.shoe_name}`
          shoeCard.appendChild(shoeImage)

          const shoeName = document.createElement('h3')
          shoeName.textContent = shoe.shoe_name
          shoeName.classList.add('main-newArrivals-items-item-name')
          shoeCard.appendChild(shoeName)

          const shoePriceWrapper = document.createElement('div')
          shoePriceWrapper.classList.add(
            'main-newArrivals-items-item-price-wrapper'
          )
          shoeCard.appendChild(shoePriceWrapper)

          if (shoe.discounted_price !== 0) {
            const shoePrice = document.createElement('p')
            shoePrice.textContent = `$${shoe.price}`
            shoePrice.classList.add(
              'main-newArrivals-items-item-price',
              'old_price'
            )
            shoePriceWrapper.appendChild(shoePrice)

            const shoeDiscountedPrice = document.createElement('p')
            shoeDiscountedPrice.textContent = `$${shoe.discounted_price}`
            shoeDiscountedPrice.classList.add(
              'main-newArrivals-items-item-price_discount'
            )
            shoePriceWrapper.appendChild(shoeDiscountedPrice)
          } else {
            const shoePrice = document.createElement('p')
            shoePrice.textContent = `$${shoe.price}`
            shoePrice.classList.add('main-newArrivals-items-item-price')
            shoePriceWrapper.appendChild(shoePrice)
          }
          newArrBlock.appendChild(shoeCard)
        }
      })
    })
  })
}

document.addEventListener('DOMContentLoaded', displayNewArrivals)
