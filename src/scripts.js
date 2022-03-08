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
import {updateDOM, hide, show, hideShow} from './domUpdates';
import Traveler from './js/travelers';
import Trip from './js/trips';
import Destination from './js/destinations';
import TravelersRepository from './js/TravelersRepository';

// Variables
let allTravelers;
let currentTraveler;
let randomIndex;
let newRepository;

// Query Selectors
const travelerTitle = document.querySelector('#travelerTitle');
const before2022TripsList = document.querySelector('#before2022TripsList');
const during2022TripsList = document.querySelector('#during2022TripsList');
const totalSpentValue = document.querySelector('#totalSpentValue');
const bookingForm = document.querySelector('#bookingForm');
const destinationDropdown = document.querySelector('#destinationDropdown')


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
    e.preventDefault();
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
      console.log(pendingTrips)

      currentTraveler.thisYearsTrips.push(newTrip);
      currentTraveler.thisYearsPending.push(newTrip)
      postData('trips', newTrip);
      updateDOM(currentTraveler, allDestinations);
      e.target.reset();
    }

  bookingForm.onsubmit = sendData;
};

window.onload = fetchData;
