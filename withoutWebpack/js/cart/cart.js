import { fetchShoesData, dataArray } from '../components/fetchShoesData.js'

document.addEventListener('DOMContentLoaded', async function () {
  await fetchShoesData()

  const cartItems = JSON.parse(localStorage.getItem('cart')) || []
  const itemShoesBlock = document.querySelector('.main-wrapper')

  let totalSumm = 0
  let oldTotalSumm = 0
  let promoUsed = false
  const promoCode = 'YR24'
  const promoDiscount = 20

  function updateTotalSumm() {
    const totalSummElement = document.getElementById('total-summ')
    totalSummElement.innerText = `$ ${totalSumm.toFixed(2)}`
  }

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

            const pricePerItem = shoe.discounted_price || shoe.price
            totalSumm += pricePerItem * cartItem.quantity

            const shoePriceElement = document.createElement('p')
            shoePriceElement.textContent = `$${pricePerItem.toFixed(2)}`
            shoePriceElement.classList.add('main-shoe-cart-item-price')
            shoePriceWrapper.appendChild(shoePriceElement)

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
                      totalSumm -= pricePerItem
                      return {
                        ...item,
                        quantity: newQuantity,
                      }
                    } else {
                      totalSumm -= pricePerItem * item.quantity
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
              updateTotalSumm()
            })

            buttonPlus.addEventListener('click', function () {
              let cartItems = JSON.parse(localStorage.getItem('cart')) || []
              const updatedCartItems = cartItems.map((item) => {
                if (
                  item.itemId === cartItem.itemId &&
                  item.size === cartItem.size
                ) {
                  totalSumm += pricePerItem
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
              updateTotalSumm()
            })

            buttonDelete.addEventListener('click', function () {
              const parentElement = this.parentElement
              const [itemId, size] = parentElement.id.split('-')

              let cartItems = JSON.parse(localStorage.getItem('cart')) || []
              const currentQuantity = parseInt(shoeQuantity.textContent)
              totalSumm -= pricePerItem * currentQuantity

              const updatedCartItems = cartItems.filter(
                (item) => !(item.itemId === itemId && item.size === size)
              )

              localStorage.setItem('cart', JSON.stringify(updatedCartItems))
              parentElement.remove()
              updateTotalSumm()
            })

            itemShoesBlock.appendChild(shoeItem)
          }
        })
      })
    })
  })

  const totalSummBlock = document.createElement('div')
  totalSummBlock.classList.add('main-totalSumm-wrapper')

  const totalSummText = document.createElement('div')
  totalSummText.classList.add('main-totalSumm-text')
  totalSummText.innerText = 'Total:'
  totalSummBlock.appendChild(totalSummText)

  const totalSummSumm = document.createElement('div')
  totalSummSumm.classList.add('main-totalSumm-summ')
  totalSummSumm.id = 'total-summ'
  totalSummSumm.innerText = `$ ${totalSumm.toFixed(2)}`
  totalSummBlock.appendChild(totalSummSumm)

  itemShoesBlock.appendChild(totalSummBlock)

  const promoBlock = document.createElement('div')
  promoBlock.classList.add('main-promo-wrapper')

  const promoInputBlock = document.createElement('div')
  promoInputBlock.classList.add('main-promo-input-wrapper')
  promoBlock.appendChild(promoInputBlock)

  const promoTextBlock = document.createElement('div')
  promoTextBlock.classList.add('main-promo-text-wrapper')
  promoBlock.appendChild(promoTextBlock)

  const promoInput = document.createElement('input')
  promoInput.classList.add('main-promo-input')
  promoInput.type = 'text'
  promoInputBlock.appendChild(promoInput)

  const promoButton = document.createElement('button')
  promoButton.classList.add('main-promo-button', 'button', 'promo-button')
  promoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" data-testid="icon" class=""><path xmlns="http://www.w3.org/2000/svg" d="M13 6L19 12M19 12L13 18M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`

  promoButton.addEventListener('click', function () {
    promoTextBlock.innerHTML = ''

    function showAppliedButton() {
      const appliedPromoButton = document.createElement('button')
      appliedPromoButton.classList.add(
        'main-promo-button-apply',
        'button',
        'button-promo-apply'
      )
      appliedPromoButton.textContent = `${promoCode}   ✕`
      promoTextBlock.appendChild(appliedPromoButton)

      appliedPromoButton.addEventListener('click', function () {
        totalSumm = oldTotalSumm
        promoUsed = false
        promoInput.value = ''
        updateTotalSumm()
        appliedPromoButton.remove()
      })
    }

    if (promoInput.value.trim() === promoCode) {
      if (!promoUsed) {
        oldTotalSumm = totalSumm
        totalSumm = totalSumm * ((100 - promoDiscount) / 100)
        promoUsed = true
        updateTotalSumm()

        promoInput.value = ''

        showAppliedButton()
      } else {
        const alreadyAppliedText = document.createElement('p')
        alreadyAppliedText.classList.add('promo-already-applied-text')
        alreadyAppliedText.textContent = 'Promo code already applied'
        promoTextBlock.appendChild(alreadyAppliedText)

        setTimeout(() => {
          alreadyAppliedText.remove()
        }, 2000)
        showAppliedButton()
      }
    } else {
      const errorText = document.createElement('p')
      errorText.classList.add('promo-error-text')
      errorText.textContent = 'Invalid promo code'
      promoTextBlock.appendChild(errorText)
    }
  })

  promoInputBlock.appendChild(promoButton)

  itemShoesBlock.appendChild(promoBlock)

  const orderBlock = document.createElement('div')
  orderBlock.classList.add('main-order-wrapper')

  const orderButton = document.createElement('button')
  orderButton.classList.add('main-order-button', 'button', 'order-button')
  orderButton.innerHTML = 'Order'

  orderButton.addEventListener('click', function () {
    window.location.href = `../order/order.html?Summ=${totalSumm.toFixed(2)}`
  })

  orderBlock.appendChild(orderButton)

  itemShoesBlock.appendChild(orderBlock)
})
