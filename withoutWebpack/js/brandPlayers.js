const brandnameBlock = document.getElementById('brandname_wrapper')
const backBrandImages = [
  'img/images/main/brandLine/shoe1.webp',
  'img/images/main/brandLine/shoe2.webp',
  'img/images/main/brandLine/shoe3.webp',
  'img/images/main/brandLine/shoe4.webp',
  'img/images/main/brandLine/shoe5.webp',
]

function showBrandNames() {
  let brandCardWrapper = null

  for (let i = 0; i < backBrandImages.length; i++) {
    if (i === 0 || i === 1 || i === 3) {
      brandCardWrapper = document.createElement('div')
      brandCardWrapper.classList.add('main-brandname-item-wrapper')
      brandnameBlock.appendChild(brandCardWrapper)
    }

    const brandCard = document.createElement('div')
    brandCard.classList.add('main-brandname-item', `brandname-item${i + 1}`)
    brandCard.style.backgroundImage = `url(${backBrandImages[i]})`

    const buttonShop = document.createElement('div')
    buttonShop.classList.add(
      'main-brandname-item-button',
      'button-brandname',
      'button'
    )
    buttonShop.textContent = 'Shop Now'
    brandCard.appendChild(buttonShop)

    if (brandCardWrapper) {
      brandCardWrapper.appendChild(brandCard)
    } else {
      brandnameBlock.appendChild(brandCard)
    }
  }
}

document.addEventListener('DOMContentLoaded', showBrandNames)
