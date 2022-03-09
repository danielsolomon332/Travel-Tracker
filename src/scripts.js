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
let userID;
let allDestinations;

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
const errorMessage = document.querySelector('#errorMessage');
const bookingDate = document.querySelector('#bookingDate');
const bookingDuration = document.querySelector('#bookingDuration');
const bookingTravelers = document.querySelector('#bookingTravelers');

// Functions
const fetchData = (id) => {
  Promise.all([travelersData, tripsData, destinationsData]).then(data => {
    handleData(data, id);
  });
};

const handleData = (data, id) => {
  newRepository = new TravelersRepository(data);
  allTravelers = newRepository.allTravelers.travelers.map(traveler => new Traveler(traveler));
  currentTraveler = new Traveler(allTravelers[id - 1]);
  allDestinations = newRepository.allDestinations.destinations;
  handleTrips(newRepository.allTrips.trips);
};

const sendData = (e) => {
  let formData = new FormData(bookingForm);
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

    postData('trips', newTrip);
    tripCost(newTrip, allDestinations);
    getData('trips').then(data => handleTrips(data.trips));
  }

const login = (event) => {
  event.preventDefault();
  userID = parseInt(usernameField.value.charAt(8) + usernameField.value.charAt(9));
  if (usernameField.value === `traveler${userID}` && passwordField.value === 'travel') {
    fetchData(userID);
    showHide([mainPage, header, totalSpentSection], [loginPage]);
  }
}

loginSubmitButton.addEventListener('click', event => {
  if (usernameField.value === '' || passwordField.value === '') {
    show([errorMessage]);
  } else {
    hide([errorMessage]);
    login(event);
  }
})

submitButton.addEventListener('click', (e) => {
  e.preventDefault()
  if (bookingDate.value === '' || bookingDuration.value === '' || bookingTravelers.value === '') {
    show([errorMessage]);
  } else {
    hide([errorMessage]);
    goHome(e);
    sendData(e);
  }
  bookingForm.reset();
});

const handleTrips = (trips) => {
  const travelerTrips = trips.filter(trip => trip.userID === currentTraveler.id);
  currentTraveler.sortTrips(travelerTrips);
  const approvedTrips = currentTraveler.thisYearsApproved.map(trip => new Trip(trip));
  const pendingTrips = currentTraveler.thisYearsPending.map(trip => new Trip(trip));
  updateDOM(currentTraveler, allDestinations);
}
