document.addEventListener('DOMContentLoaded', () => {
  const scrollUpButton = document.createElement('div')
  scrollUpButton.id = 'scrollUp'
  scrollUpButton.textContent = '↑'

  scrollUpButton.style.display = 'none'
  document.body.appendChild(scrollUpButton)

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleScroll() {
    if (window.scrollY >= 1000) {
      scrollUpButton.style.display = 'block'
    } else {
      scrollUpButton.style.display = 'none'
    }
  }

  handleScroll()

  window.addEventListener('scroll', handleScroll)
  scrollUpButton.addEventListener('click', scrollToTop)
})
