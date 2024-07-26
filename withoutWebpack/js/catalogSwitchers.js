document.addEventListener('DOMContentLoaded', function () {
  const iconSwitchers = document.querySelectorAll('.icon-switcher')
  iconSwitchers.forEach(function (iconSwitcher) {
    iconSwitcher.addEventListener('click', function () {
      iconSwitcher.classList.toggle('active')
    })
  })
})
