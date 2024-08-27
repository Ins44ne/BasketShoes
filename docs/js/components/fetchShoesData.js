let dataArray = []

const getBasePath = () => {
  const path = window.location.pathname
  const depth = path.split('/').length - 3
  return '../'.repeat(depth)
}

const basePath = getBasePath()

async function fetchShoesData() {
  const jsonFiles = [
    `${basePath}data/shoesData/Antetokounmpo.json`,
    `${basePath}data/shoesData/Doncic.json`,
    `${basePath}data/shoesData/Durant.json`,
    `${basePath}data/shoesData/Ionescu.json`,
    `${basePath}data/shoesData/Jordan.json`,
    `${basePath}data/shoesData/Morant.json`,
    `${basePath}data/shoesData/Tatum.json`,
    `${basePath}data/shoesData/Williamson.json`,
  ]

  try {
    const dataPromises = jsonFiles.map((file) =>
      fetch(file)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch data from: ${file}, status: ${response.status}`
            )
          }
          return response.json()
        })
        .catch((error) => console.error(error))
    )

    dataArray = await Promise.all(dataPromises)
    console.log(dataArray)
  } catch (error) {
    console.error('Error fetching shoe data:', error)
  }
}

export { fetchShoesData, dataArray }
