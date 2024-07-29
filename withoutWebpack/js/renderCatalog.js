import { fetchShoesData, dataArray } from './fetchShoesData.js'

async function renderShoes() {
  await fetchShoesData()
  const itemShoesBlock = document.getElementById('items-field')
  const shoesNumberElement = document.getElementById('main-shoes-header-number')
  const colorFilterBlock = document.getElementById('color-filter')
  const sizeFilterBlock = document.getElementById('size-filter')

  let numberOfShoes = 0
  let colorsArr = []
  let sizesArr = []

  dataArray.forEach((data) => {
    Object.values(data).forEach((shoes) => {
      shoes.forEach((shoe) => {
        const shoeItem = document.createElement('div')
        shoeItem.classList.add('main-shoes-field-items-item')
        shoeItem.id = shoe.id

        const shoeImage = document.createElement('img')
        shoeImage.src = `../../${shoe.images[0]}`
        shoeImage.classList.add('main-shoes-field-items-item-img')
        shoeImage.alt = `${shoe.shoe_name}`
        shoeItem.appendChild(shoeImage)

        const shoeName = document.createElement('h3')
        shoeName.textContent = shoe.shoe_name
        shoeName.classList.add('main-shoes-field-items-item-name')
        shoeItem.appendChild(shoeName)

        const shoePriceWrapper = document.createElement('div')
        shoePriceWrapper.classList.add(
          'main-shoes-field-items-item-price-wrapper'
        )
        shoeItem.appendChild(shoePriceWrapper)

        if (shoe.discounted_price !== 0) {
          const shoePrice = document.createElement('p')
          shoePrice.textContent = `$${shoe.price}`
          shoePrice.classList.add(
            'main-shoes-field-items-item-price',
            'old_price'
          )
          shoePriceWrapper.appendChild(shoePrice)

          const shoeDiscountedPrice = document.createElement('p')
          shoeDiscountedPrice.textContent = `$${shoe.discounted_price}`
          shoeDiscountedPrice.classList.add(
            'main-shoes-field-items-item-discount'
          )
          shoePriceWrapper.appendChild(shoeDiscountedPrice)
        } else {
          const shoePrice = document.createElement('p')
          shoePrice.textContent = `$${shoe.price}`
          shoePrice.classList.add('main-shoes-field-items-item-price')
          shoePriceWrapper.appendChild(shoePrice)
        }
        numberOfShoes += 1
        shoe.color.forEach((col) => {
          colorsArr.push(col)
        })
        shoe.sizes.forEach((size) => {
          sizesArr.push(size)
        })
        itemShoesBlock.appendChild(shoeItem)
      })
    })
  })

  function renderFilters(arr, block) {
    arr.sort((a, b) => {
      return a - b
    })
    arr.forEach((el) => {
      if (block === sizeFilterBlock) {
        const sizeItem = document.createElement('div')
        sizeItem.classList.add('main-shoes-field-nav-filters-sizes-item')
        sizeItem.id = el
        sizeItem.textContent = el
        block.appendChild(sizeItem)
      }
      if (block === colorFilterBlock) {
        const label = document.createElement('label')
        label.classList.add('main-shoes-field-nav-filters-colors-item-label')

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.classList.add('main-shoes-field-nav-filters-colors-item-item')
        checkbox.id = `filters-colors-${el}`

        label.appendChild(checkbox)
        label.appendChild(document.createTextNode(el))

        block.appendChild(label)
      }
    })
  }

  let uniqueSizes = [...new Set(sizesArr)]
  let uniquecolor = [...new Set(colorsArr)]

  renderFilters(uniqueSizes, sizeFilterBlock)
  renderFilters(uniquecolor, colorFilterBlock)
  shoesNumberElement.textContent = `(${numberOfShoes})`
}

document.addEventListener('DOMContentLoaded', renderShoes)
/*main-shoes-field-nav-filters-colors-item*/
