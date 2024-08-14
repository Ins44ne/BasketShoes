const inchButton = document.querySelector('.main-shoe-size-table-button-inch')
const cmButton = document.querySelector('.main-shoe-size-table-button-cm')

const imperialRow = document.getElementById('IMPERIAL')
const metricRow = document.getElementById('METRIC')

function toggleActive(
  buttonToActivate,
  buttonToDeactivate,
  rowToShow,
  rowToHide
) {
  buttonToActivate.classList.add('chosen')
  buttonToDeactivate.classList.remove('chosen')
  rowToShow.style.display = 'table-row'
  rowToHide.style.display = 'none'
}

inchButton.addEventListener('click', function () {
  toggleActive(inchButton, cmButton, imperialRow, metricRow)
})

cmButton.addEventListener('click', function () {
  toggleActive(cmButton, inchButton, metricRow, imperialRow)
})
