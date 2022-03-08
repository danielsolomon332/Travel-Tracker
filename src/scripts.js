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
const mainView = document.querySelector('#mainView');
const totalSpentSection = document.querySelector('#totalSpentSection');
const bookingView = document.querySelector('#bookingView');
const showTripCostButton = document.querySelector('#showTripCostButton');
const homeButton = document.querySelector('#homeButton');
const newTripCost = document.querySelector('#newTripCost');

// Functions
const fetchData = () => {
  Promise.all([travelersData, tripsData, destinationsData]).then(data => {
    handleData(data);
  });
};

const handleData = (data) => {
  newRepository = new TravelersRepository(data);
  allTravelers = newRepository.allTravelers.travelers.map(traveler => new Traveler(traveler))
  currentTraveler = new Traveler(allTravelers[2]);
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
      // e.target.reset();
    }


  bookingForm.onsubmit = sendData;
};

window.onload = fetchData;
