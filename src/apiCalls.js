const getData = (fetchAPI) => {
  return fetch(`http://localhost:3001/api/v1/${fetchAPI}`)
    .then(response => response.json())
    .catch(e => console.log(e));
}

const postData = (fetchAPI, formData) => {
  return fetch(`http://localhost:3001/api/v1/${fetchAPI}`,
    {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) throw new Error('Please fill out all fields.');
    return response.json()
  })
  .catch(e => console.log(e))
}

const travelersData = getData('travelers');
const tripsData = getData('trips');
const destinationsData = getData('destinations');

export {
  travelersData,
  tripsData,
  destinationsData,
  getData,
  postData
};
