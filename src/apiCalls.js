const getData = (fetchAPI) => {
  return fetch(`http://localhost:3001/api/v1/${fetchAPI}`)
    .then(response => response.json())
    .catch(e => console.log(e));
}

const travelersData = getData('travelers');
const tripsData = getData('trips');
const destinationsData = getData('destinations');

export {
  travelersData,
  tripsData,
  destinationsData,
  getData
};
