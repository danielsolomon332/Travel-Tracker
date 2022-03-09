// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import dayjs from 'dayjs'
import {
  travelersData,
  tripsData,
  destinationsData,
  getData,
  postData
} from './apiCalls';
import {updateDOM, hide, show, showHide, bookTrip, goHome, tripCost} from './domUpdates';
import Traveler from './js/travelers';
import Trip from './js/trips';
import Destination from './js/destinations';
import TravelersRepository from './js/TravelersRepository';

// Variables
let allTravelers;
let currentTraveler;
let newRepository;

// Query Selectors
const travelerTitle = document.querySelector('#travelerTitle');
const before2022TripsList = document.querySelector('#before2022TripsList');
const during2022TripsList = document.querySelector('#during2022TripsList');
const totalSpentValue = document.querySelector('#totalSpentValue');
const bookingForm = document.querySelector('#bookingForm');
const destinationDropdown = document.querySelector('#destinationDropdown');
const mainPage = document.querySelector('#mainPage');
const totalSpentSection = document.querySelector('#totalSpentSection');
const bookingView = document.querySelector('#bookingView');
const showTripCostButton = document.querySelector('#showTripCostButton');
const homeButton = document.querySelector('#homeButton');
const newTripCost = document.querySelector('#newTripCost');
const usernameField = document.querySelector('#usernameField');
const passwordField = document.querySelector('#passwordField');
const loginSubmitButton = document.querySelector('#loginSubmitButton');
const loginPage = document.querySelector('#loginPage');
const header = document.querySelector('#header');
const bookTripButton = document.querySelector('#bookTripButton');
const submitButton = document.querySelector('#submitButton');

// Functions
const fetchData = (id) => {
  Promise.all([travelersData, tripsData, destinationsData]).then(data => {
    handleData(data, id);
  });
};

const handleData = (data, id) => {
  newRepository = new TravelersRepository(data);
  allTravelers = newRepository.allTravelers.travelers.map(traveler => new Traveler(traveler))
  currentTraveler = new Traveler(allTravelers[id - 1]);
  const travelerTrips = newRepository.allTrips.trips.filter(trip => trip.userID === currentTraveler.id);
  currentTraveler.sortTrips(travelerTrips);
  const approvedTrips = currentTraveler.thisYearsApproved.map(trip => new Trip(trip));
  const pendingTrips = currentTraveler.thisYearsPending.map(trip => new Trip(trip));
  const allDestinations = newRepository.allDestinations.destinations;
  updateDOM(currentTraveler, allDestinations)

  const sendData = (e) => {
    let formData = new FormData(e.target);
      let newTrip = {
        id: Date.now(),
        userID: currentTraveler.id,
        destinationID: parseInt(destinationDropdown.value),
        travelers: parseInt(formData.get('travelers')),
        date: dayjs(formData.get('date')).format('YYYY/MM/DD'),
        duration: parseInt(formData.get('duration')),
        status: 'pending',
        suggestedActivities: []
      }
      before2022TripsList.innerHTML = '';
      during2022TripsList.innerHTML = '';
      postData('trips', newTrip);
      getData('trips');
      updateDOM(currentTraveler, allDestinations);
      tripCost(newTrip, allDestinations);
    }

  bookingForm.onsubmit = sendData;
};

const login = (event) => {
  event.preventDefault()
  const userID = parseInt(usernameField.value.charAt(8) + usernameField.value.charAt(9));
  if (usernameField.value === `traveler${userID}` && passwordField.value === 'travel') {
    fetchData(userID)
    showHide([mainPage, header, totalSpentSection], [loginPage])
  }
}

const submitRequest = (e) => {
  e.preventDefault()
  sendData(e)
}

loginSubmitButton.addEventListener('click', event => {
  login(event)
})
// window.onload = fetchData;
