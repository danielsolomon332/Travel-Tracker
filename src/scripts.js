// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import dayjs from 'dayjs'
import {
  travelersData,
  tripsData,
  destinationsData,
  getData
} from './apiCalls';
import {updateDOM} from './domUpdates';
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


// Functions
const fetchData = () => {
  Promise.all([travelersData, tripsData, destinationsData]).then(data => {
    handleData(data);
  });
};

const handleData = (data) => {
  // console.log('DATA >>>', data)
  newRepository = new TravelersRepository(data);
  allTravelers = newRepository.allTravelers.travelers.map(traveler => new Traveler(traveler))
  // console.log("ALLTRAVELERS >>>", allTravelers)
  currentTraveler = new Traveler(allTravelers[2]);
  // console.log('CURRENT TRAVELER >>>', currentTraveler)
  // console.log('ALLTRIPS >>>', newRepository.allTrips)
  const travelerTrips = newRepository.allTrips.trips.filter(trip => trip.userID === currentTraveler.id);
  // console.log('TRAVELER TRIPS >>>', travelerTrips)
  currentTraveler.sortTrips(travelerTrips);
  // console.log('PAST TRIPS >>>', currentTraveler.previousYearsTrips)
  const approvedTrips = currentTraveler.thisYearsApproved.map(trip => new Trip(trip));
  // console.log('THIS YEARS APPROVED TRIPS >>>', currentTraveler.thisYearsApproved)
  const pendingTrips = currentTraveler.thisYearsPending.map(trip => new Trip(trip));
  // console.log('THIS YEARS PENDING TRIPS >>>', currentTraveler.thisYearsPending)
  const allDestinations = newRepository.allDestinations.destinations;
  // console.log('ALLL DESTINATIONS', allDestinations)
  updateDOM(currentTraveler, allDestinations)
};



window.onload = fetchData;
