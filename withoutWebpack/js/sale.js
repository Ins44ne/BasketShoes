/*
    dataArray.forEach((data) => {
      if (data && data.Antetokounmpo) {
        data.Antetokounmpo.forEach((shoe) => {
          if (shoe.discounted_price > 0) {
            const shoeCard = document.createElement('div')
            shoeCard.classList.add('shoe-card')

            const shoeImage = document.createElement('img')
            shoeImage.src = shoe.images[0]
            shoeCard.appendChild(shoeImage)

            const shoeName = document.createElement('h3')
            shoeName.textContent = shoe.shoe_name
            shoeCard.appendChild(shoeName)

            const shoePrice = document.createElement('p')
            shoePrice.textContent = `Price: $${shoe.price}`
            shoeCard.appendChild(shoePrice)

            const shoeDiscountedPrice = document.createElement('p')
            shoeDiscountedPrice.textContent = `Discounted Price: $${shoe.discounted_price}`
            shoeCard.appendChild(shoeDiscountedPrice)

            shoeContainer.appendChild(shoeCard)
          }
        })
      } else {
        console.error('Invalid data format:', data)
    }
  })
  */
