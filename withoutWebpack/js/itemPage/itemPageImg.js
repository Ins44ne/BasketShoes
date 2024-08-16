document.addEventListener('DOMContentLoaded', function () {
  function initGalleryHover() {
    const mainImageBlock = document.getElementById('mainImageBlock')

    if (mainImageBlock) {
      const mainImage = mainImageBlock.querySelector('img')

      const galleryItems = document.querySelectorAll(
        '.main-shoe-images-gallery-item'
      )

      galleryItems.forEach((item) => {
        item.addEventListener('mouseenter', function () {
          const newSrc = this.querySelector('img').getAttribute('src')
          this.querySelector('img').style.border = '1px solid black'
          mainImage.setAttribute('src', newSrc)
        })
        item.addEventListener('mouseout', function () {
          this.querySelector('img').style.border = 'none'
        })
      })
    }
  }

  const observer = new MutationObserver(function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        if (document.getElementById('mainImageBlock')) {
          initGalleryHover()
          observer.disconnect()
          break
        }
      }
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })
})
