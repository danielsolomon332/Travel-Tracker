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
import Traveler from './js/travelers';
import Trip from './js/trips';
import Destination from './js/destinations';
import TravelersRepository from './js/TravelersRepository';

// Variables
let currentTraveler;

// Query Selectors


// Functions
const fetchData = () => {
  Promise.all([travelersData, tripsData, destinationsData]).then(data => {
    handleData(data);
  });
};

const handleData = (data) => {
  const newRepository = new TravelerRepository(data);
  currentTraveler = new Traveler(getRandomTraveler(newRepository.allTravelers));
  const travelerTrips = newRepository.allTrips.filter(trip => trip.userID === currentTraveler.id);
  currentTraveler.sortTrips(travelerTrips);
  const approvedTrips = currentTraveler.thisYearsApproved.map(trip => new Trip(trip));
  const pendingTrips = currentTraveler.thisYearsPending.map(trip => new Trip(trip));
  const destinations = newRepository.allDestinations;
};

const getRandomTraveler = (travelers) => {
  return travelers.getTraveler(Math.floor(Math.random() * travelers.allTravelers.length - 1));
};

window.onload = fetchData;
