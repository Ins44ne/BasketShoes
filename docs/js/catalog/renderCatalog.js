import { fetchShoesData, dataArray } from '../components/fetchShoesData.js'

document.addEventListener('DOMContentLoaded', function () {
  async function renderSortShoes(
    playerId,
    selectedColors = [],
    selectedSizes = [],
    sortOrder = null
  ) {
    await fetchShoesData()
    const itemShoesBlock = document.getElementById('items-field')

    const shoesNumberElement = document.getElementById(
      'main-shoes-header-number'
    )
    const colorFilterBlock = document.getElementById('color-filter')
    const sizeFilterBlock = document.getElementById('size-filter')

    itemShoesBlock.innerHTML = ''
    colorFilterBlock.innerHTML = ''
    sizeFilterBlock.innerHTML = ''

    let numberOfShoes = 0
    let colorsArr = []
    let sizesArr = []

    let filteredShoes = []

    dataArray.forEach((data) => {
      Object.values(data).forEach((shoes) => {
        shoes.forEach((shoe) => {
          const matchesPlayer = !playerId || playerId === shoe.shoe_line_name
          const matchesColors =
            selectedColors.length === 0 ||
            selectedColors.some((color) => shoe.color.includes(color))
          const matchesSizes =
            selectedSizes.length === 0 ||
            selectedSizes.some((size) => shoe.sizes.includes(parseInt(size)))

          if (matchesPlayer && matchesColors && matchesSizes) {
            filteredShoes.push(shoe)
            colorsArr.push(...shoe.color)
            sizesArr.push(...shoe.sizes)
          }
        })
      })
    })

    if (sortOrder) {
      filteredShoes.sort((a, b) => {
        if (sortOrder === 'highLow') {
          return (
            (b.discounted_price || b.price) - (a.discounted_price || a.price)
          )
        } else if (sortOrder === 'lowHigh') {
          return (
            (a.discounted_price || a.price) - (b.discounted_price || b.price)
          )
        }
      })
    }

    filteredShoes.forEach((shoe) => {
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

      itemShoesBlock.appendChild(shoeItem)
      numberOfShoes += 1
    })

    function renderFilters(arr, block) {
      arr.sort((a, b) => (typeof a === 'string' ? a.localeCompare(b) : a - b))
      arr.forEach((el) => {
        if (block === sizeFilterBlock) {
          const sizeItem = document.createElement('div')
          sizeItem.classList.add('main-shoes-field-nav-filters-sizes-item')
          sizeItem.id = el
          sizeItem.textContent = el
          if (selectedSizes.includes(el.toString())) {
            sizeItem.classList.add('chosen')
          }
          block.appendChild(sizeItem)
        }
        if (block === colorFilterBlock) {
          const label = document.createElement('label')
          label.classList.add('main-shoes-field-nav-filters-colors-item-label')

          const checkbox = document.createElement('input')
          checkbox.type = 'checkbox'
          checkbox.classList.add(
            'main-shoes-field-nav-filters-colors-item-item'
          )
          checkbox.id = `filters-colors-${el}`
          checkbox.value = el

          if (selectedColors.includes(el)) {
            checkbox.checked = true
          }

          label.appendChild(checkbox)
          label.appendChild(document.createTextNode(el))

          block.appendChild(label)
        }
      })
    }

    function checkSelectedColors(selectedColors) {
      const colorCheckboxes = document.querySelectorAll(
        '.main-shoes-field-nav-filters-colors-item-item'
      )
      colorCheckboxes.forEach((checkbox) => {
        if (selectedColors.includes(checkbox.value)) {
          checkbox.checked = true
        }
      })
    }

    let uniqueSizes = [...new Set(sizesArr)]
    let uniqueColors = [...new Set(colorsArr)]

    renderFilters(uniqueSizes, sizeFilterBlock)
    renderFilters(uniqueColors, colorFilterBlock)
    shoesNumberElement.textContent = `(${numberOfShoes})`

    checkSelectedColors(selectedColors)
    addColorFilterEventListeners()
    addSizeFilterEventListeners()
  }

  function showReset(bool) {
    const resetButton = document.getElementById('button-reset')
    if (bool) {
      resetButton.style.display = 'block'
    } else {
      resetButton.style.display = 'none'
    }
  }

  function resetShoes(playerId, sortOrder = null) {
    const selectedColors = Array.from(
      document.querySelectorAll(
        '.main-shoes-field-nav-filters-colors-item-item:checked'
      )
    ).map((checkbox) => checkbox.value)
    const selectedSizes = Array.from(
      document.querySelectorAll(
        '.main-shoes-field-nav-filters-sizes-item.chosen'
      )
    ).map((item) => item.id)
    renderSortShoes(playerId, selectedColors, selectedSizes, sortOrder)
  }

  function addPlayerEventListeners() {
    const playerBlocks = document.querySelectorAll('.main-players-item')
    playerBlocks.forEach((block) => {
      block.addEventListener('click', () => {
        playerBlocks.forEach((item) => item.classList.remove('chosenPlayer'))
        block.classList.add('chosenPlayer')
        showReset(true)
        resetShoes(block.id)
      })
    })
  }

  function addColorFilterEventListeners() {
    const colorCheckboxes = document.querySelectorAll(
      '.main-shoes-field-nav-filters-colors-item-item'
    )
    colorCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        resetShoes()
      })
    })
  }

  function addSizeFilterEventListeners() {
    const sizeItems = document.querySelectorAll(
      '.main-shoes-field-nav-filters-sizes-item'
    )
    sizeItems.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.classList.contains('chosen')) {
          item.classList.remove('chosen')
        } else {
          item.classList.add('chosen')
        }
        resetShoes()
      })
    })
  }

  function addSortEventListeners() {
    const highLowButton = document.getElementById('highLow')
    const lowHighButton = document.getElementById('lowHigh')
    const resetButton = document.getElementById('button-reset')

    highLowButton.addEventListener('click', () => {
      resetShoes(null, 'highLow')
    })

    lowHighButton.addEventListener('click', () => {
      resetShoes(null, 'lowHigh')
    })

    resetButton.addEventListener('click', () => {
      showReset(false)
      resetShoes()
    })
  }

  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        addPlayerEventListeners()
      }
    }
  })

  const playersList = document.getElementById('players-list')
  observer.observe(playersList, { childList: true })

  addPlayerEventListeners()
  addSortEventListeners()
  renderSortShoes()
})
