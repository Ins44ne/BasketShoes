document.addEventListener('DOMContentLoaded', function () {
  const observer = new MutationObserver(function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const items = document.querySelectorAll('.main-shoes-field-items-item')

        items.forEach(function (item) {
          if (!item.dataset.clickAttached) {
            item.addEventListener('click', function () {
              const itemId = this.id

              window.location.href = `../itemPage/itemPage.html?id=${itemId}`
            })

            item.dataset.clickAttached = true
          }
        })
      }
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })
})
