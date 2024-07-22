document.addEventListener('DOMContentLoaded', () => {
  function loadHtml(url, elementId) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(elementId).innerHTML = data
      })
      .catch((error) => console.error('Error loading HTML:', error))
  }

  function loadSvg(url, elementId) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(elementId).insertAdjacentHTML('beforeend', data)
      })
      .catch((error) => console.error('Error loading SVG:', error))
  }

  loadHtml('./pages/components/header.html', 'header')
  loadSvg('./img/icons/header/account/cart.svg', 'fav')
  loadSvg('./img/icons/header/account/fav.svg', 'cart')
  loadSvg('./img/icons/header/account/login.svg', 'account')

  loadHtml('./pages/components/footer.html', 'footer')
  loadSvg('./img/icons/footer/facebook.svg', 'facebook')
  loadSvg('./img/icons/footer/instagram.svg', 'instagram')
  loadSvg('./img/icons/footer/linkedIn.svg', 'linkedIn')
  loadSvg('./img/icons/footer/x.svg', 'x')
  loadSvg('./img/icons/footer/youtube.svg', 'youtube')
})
