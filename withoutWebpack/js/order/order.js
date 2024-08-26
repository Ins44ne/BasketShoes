const form = document.getElementById('orderForm')
const amount = document.getElementById('amount')
const buttonSubmit = document.getElementById('button-submit')
const goods = document.getElementById('goods')
const summAmount = JSON.parse(localStorage.getItem('cartSumm')) || 0
const cartData = JSON.parse(localStorage.getItem('cart'))

amount.value = `$${summAmount}`

form.addEventListener('submit', function (event) {
  let isValid = true
  let firstErrorElement = null

  const name = document.getElementById('name').value
  if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(name)) {
    document.getElementById('nameError').style.display = 'block'
    isValid = false
    if (!firstErrorElement)
      firstErrorElement = document.getElementById('nameError')
  } else {
    document.getElementById('nameError').style.display = 'none'
  }

  const phone = document.getElementById('phone').value
  if (!/^\+\d[\d\s()]+$/.test(phone)) {
    document.getElementById('phoneError').style.display = 'block'
    isValid = false
    if (!firstErrorElement)
      firstErrorElement = document.getElementById('phoneError')
  } else {
    document.getElementById('phoneError').style.display = 'none'
  }

  const city = document.getElementById('city').value
  if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(city)) {
    document.getElementById('cityError').style.display = 'block'
    isValid = false
    if (!firstErrorElement)
      firstErrorElement = document.getElementById('cityError')
  } else {
    document.getElementById('cityError').style.display = 'none'
  }

  const street = document.getElementById('street').value
  if (!/^[A-Za-zА-Яа-яЁё\s0-9\s]*$/.test(street)) {
    document.getElementById('streetError').style.display = 'block'
    isValid = false
    if (!firstErrorElement)
      firstErrorElement = document.getElementById('streetError')
  } else {
    document.getElementById('streetError').style.display = 'none'
  }

  const house = document.getElementById('house').value
  if (!/^\d+[A-Za-zА-Яа-яЁё]?$/.test(house)) {
    document.getElementById('houseError').style.display = 'block'
    isValid = false
    if (!firstErrorElement)
      firstErrorElement = document.getElementById('houseError')
  } else {
    document.getElementById('houseError').style.display = 'none'
  }

  const entrance = document.getElementById('entrance').value
  if (!/^\d{1,3}$/.test(entrance)) {
    document.getElementById('entranceError').style.display = 'block'
    isValid = false
    if (!firstErrorElement)
      firstErrorElement = document.getElementById('entranceError')
  } else {
    document.getElementById('entranceError').style.display = 'none'
  }

  const floor = document.getElementById('floor').value
  if (!/^\d{1,3}$/.test(floor)) {
    document.getElementById('floorError').style.display = 'block'
    isValid = false
    if (!firstErrorElement)
      firstErrorElement = document.getElementById('floorError')
  } else {
    document.getElementById('floorError').style.display = 'none'
  }

  const comments = document.getElementById('comments').value
  if (comments && !/^[A-Za-zА-Яа-яЁё\s.,'?!-]*$/.test(comments)) {
    document.getElementById('commentsError').style.display = 'block'
    isValid = false
    if (!firstErrorElement)
      firstErrorElement = document.getElementById('commentsError')
  } else {
    document.getElementById('commentsError').style.display = 'none'
  }

  const email = document.getElementById('email').value
  if (!/\S+@\S+\.\S+/.test(email)) {
    document.getElementById('emailError').style.display = 'block'
    isValid = false
    if (!firstErrorElement)
      firstErrorElement = document.getElementById('emailError')
  } else {
    document.getElementById('emailError').style.display = 'none'
  }

  let goodsString = ''
  if (cartData && Array.isArray(cartData)) {
    cartData.forEach((item) => {
      goodsString += `${item.itemId} size:${item.size} quantity:${item.quantity}\n`
    })
  }
  goods.value = goodsString.trim()

  if (!isValid) {
    event.preventDefault()
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  } else {
    localStorage.setItem('cartCount', '0')
    localStorage.setItem('cart', '[]')
    window.open('../../index.html', '_blank')
  }
})
