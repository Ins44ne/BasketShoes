import { fetchShoesData, dataArray } from './fetchShoesData.js'

document.addEventListener('DOMContentLoaded', async function () {
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
  }

  const itemId = getQueryParam('id')

  document.title += `. ${itemId}`

  await fetchShoesData()

  dataArray.forEach((data) => {
    Object.values(data).forEach((shoes) => {
      shoes.forEach((shoe) => {
        if (shoe.id === itemId) {
          console.log('Совпадение найдено!', shoe)
          displayShoeData(shoe)
        }
      })
    })
  })
})

function displayShoeData(shoe) {
  const gallery = document.getElementById('gallery-shoe')
  const imageShoe = document.getElementById('image-shoe')
  const nameBlock = document.getElementById('info-name')
  const priceBlock = document.getElementById('info-price')
  const sizeBlock = document.getElementById('info-size')
  const colorBlock = document.getElementById('info-color')

  gallery.innerHTML = ''

  shoe.images.forEach((imageSrc, index) => {
    const imageDiv = document.createElement('div')
    imageDiv.id = `gallery-item-${index}`
    imageDiv.classList.add('main-shoe-images-gallery-item')

    const img = document.createElement('img')
    img.src = `../../${imageSrc}`
    img.alt = `Shoe Image ${index + 1}`

    imageDiv.appendChild(img)

    gallery.appendChild(imageDiv)

    if (index === 0) {
      const mainImageDiv = document.createElement('div')
      mainImageDiv.id = `mainImageBlock`
      mainImageDiv.classList.add('main-shoe-images-image-main')

      const mainImg = document.createElement('img')
      mainImg.src = `../../${imageSrc}`
      mainImg.alt = `Shoe Image Main`

      mainImageDiv.appendChild(mainImg)

      imageShoe.appendChild(mainImageDiv)
    }
  })

  const nameDiv = document.createElement('div')
  nameDiv.classList.add('main-shoe-info-name-text')
  nameDiv.innerText = shoe.shoe_name
  nameBlock.appendChild(nameDiv)

  if (shoe.discounted_price !== 0) {
    const priceDiv = document.createElement('div')
    priceDiv.classList.add('main-shoe-info-price-text', 'old_price')
    priceDiv.textContent = '$' + shoe.price
    priceBlock.appendChild(priceDiv)

    const priceDivDiscount = document.createElement('div')
    priceDivDiscount.classList.add('main-shoe-info-price-text-discount')
    priceDivDiscount.textContent = '$' + shoe.discounted_price
    priceBlock.appendChild(priceDivDiscount)
  } else {
    const priceDiv = document.createElement('div')
    priceDiv.classList.add('main-shoe-info-price-text')
    priceDiv.textContent = '$' + shoe.price
    priceBlock.appendChild(priceDiv)
  }

  shoe.sizes.forEach((el) => {
    const sizeItem = document.createElement('div')
    sizeItem.classList.add('main-shoe-info-size-item')
    sizeItem.id = el
    sizeItem.textContent = el
    sizeBlock.appendChild(sizeItem)
  })
  shoe.color.forEach((elcolor) => {
    colorBlock.innerText += ` ${elcolor}`
  })
}
