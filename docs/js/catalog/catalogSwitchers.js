document.addEventListener('DOMContentLoaded', function () {
  function toggleIconSwitcher(event) {
    const iconSwitcher = event.currentTarget.querySelector('.icon-switcher')
    if (iconSwitcher) {
      iconSwitcher.classList.toggle('active')
    }

    const targetId = event.currentTarget.getAttribute('data-target')
    if (targetId) {
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.classList.toggle('hide-item')
        targetElement.classList.toggle('show-item')
      }
    }
  }

  function sizeBlockChoose(event) {
    event.target.classList.toggle('chosen')
  }

  const filterBlocks = document.querySelectorAll('.filter')
  filterBlocks.forEach(function (filterBlock) {
    filterBlock.addEventListener('click', toggleIconSwitcher)
  })

  document.body.addEventListener('click', function (event) {
    if (
      event.target.classList.contains('main-shoes-field-nav-filters-sizes-item')
    ) {
      sizeBlockChoose(event)
    }
  })
})
