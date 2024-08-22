const form = document.getElementById('orderForm')

form.addEventListener('submit', function (event) {
  let isValid = true

  const name = document.getElementById('name').value
  if (!/^[A-Za-zА-Яа-яЁё]+$/.test(name)) {
    document.getElementById('nameError').style.display = 'block'
    isValid = false
  } else {
    document.getElementById('nameError').style.display = 'none'
  }

  const phone = document.getElementById('phone').value
  if (!/^\+\d+$/.test(phone)) {
    document.getElementById('phoneError').style.display = 'block'
    isValid = false
  } else {
    document.getElementById('phoneError').style.display = 'none'
  }

  const city = document.getElementById('city').value
  if (!/^[A-Za-zА-Яа-яЁё]+$/.test(city)) {
    document.getElementById('cityError').style.display = 'block'
    isValid = false
  } else {
    document.getElementById('cityError').style.display = 'none'
  }

  const street = document.getElementById('street').value
  if (!/^[A-Za-zА-Яа-яЁё\s0-9]*$/.test(street)) {
    document.getElementById('streetError').style.display = 'block'
    isValid = false
  } else {
    document.getElementById('streetError').style.display = 'none'
  }

  const house = document.getElementById('house').value
  if (!/^\d+[A-Za-zА-Яа-яЁё]?$/.test(house)) {
    document.getElementById('houseError').style.display = 'block'
    isValid = false
  } else {
    document.getElementById('houseError').style.display = 'none'
  }

  const entrance = document.getElementById('entrance').value
  if (!/^\d{1,3}$/.test(entrance)) {
    document.getElementById('entranceError').style.display = 'block'
    isValid = false
  } else {
    document.getElementById('entranceError').style.display = 'none'
  }

  const floor = document.getElementById('floor').value
  if (!/^\d{1,3}$/.test(floor)) {
    document.getElementById('floorError').style.display = 'block'
    isValid = false
  } else {
    document.getElementById('floorError').style.display = 'none'
  }

  const comments = document.getElementById('comments').value
  if (comments && !/^[A-Za-zА-Яа-яЁё\s]*$/.test(comments)) {
    document.getElementById('commentsError').style.display = 'block'
    isValid = false
  } else {
    document.getElementById('commentsError').style.display = 'none'
  }

  const email = document.getElementById('email').value
  if (!/\S+@\S+\.\S+/.test(email)) {
    document.getElementById('emailError').style.display = 'block'
    isValid = false
  } else {
    document.getElementById('emailError').style.display = 'none'
  }

  if (!isValid) {
    event.preventDefault()
  }
})
