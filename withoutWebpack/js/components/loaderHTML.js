document.addEventListener('DOMContentLoaded', () => {
  const getBasePath = () => {
    const path = window.location.pathname
    const depth = path.split('/').length - 3
    return '../'.repeat(depth)
  }

  const basePath = getBasePath()

  function loadHtml(url, elementId, callback) {
    fetch(basePath + url)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(elementId).innerHTML = data
        if (callback) callback()
      })
      .catch((error) => console.error('Error loading HTML:', error))
  }

  function loadSvg(url, elementId) {
    fetch(basePath + url)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(elementId).insertAdjacentHTML('beforeend', data)
      })
      .catch((error) => console.error('Error loading SVG:', error))
  }

  loadHtml('pages/components/header.html', 'header', () => {
    const logoElement = document.querySelector('.header-menu-logo')
    if (logoElement) {
      logoElement.addEventListener('click', (event) => {
        event.preventDefault()
        window.location.href = basePath + 'index.html'
      })
    } else {
      console.error('Element .header-menu-logo not found')
    }

    const favElement = document.getElementById('fav')
    if (favElement) {
      favElement.addEventListener('click', (event) => {
        event.preventDefault()
        window.location.href = `${basePath}pages/fav/fav.html`
      })
    } else {
      console.error('Element with id="fav" not found')
    }
    const cartElement = document.getElementById('cart')
    if (cartElement) {
      cartElement.addEventListener('click', (event) => {
        event.preventDefault()
        window.location.href = `${basePath}pages/cart/cart.html`
      })
    } else {
      console.error('Element with id="cart" not found')
    }
  })

  loadSvg('img/icons/header/account/cart.svg', 'cart')
  loadSvg('img/icons/header/account/fav.svg', 'fav')

  loadHtml('pages/components/footer.html', 'footer')
  loadSvg('img/icons/footer/facebook.svg', 'facebook')
  loadSvg('img/icons/footer/instagram.svg', 'instagram')
  loadSvg('img/icons/footer/linkedIn.svg', 'linkedIn')
  loadSvg('img/icons/footer/x.svg', 'x')
  loadSvg('img/icons/footer/youtube.svg', 'youtube')
})
