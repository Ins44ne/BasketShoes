let dataArray = []

async function fetchShoesData() {
  const jsonFiles = [
    './data/shoesData/Antetokounmpo.json',
    './data/shoesData/Doncic.json',
    './data/shoesData/Durant.json',
    './data/shoesData/Ionescu.json',
    './data/shoesData/Jordan.json',
    './data/shoesData/Morant.json',
    './data/shoesData/Tatum.json',
    './data/shoesData/Williamson.json',
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
