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
  // postData
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
  console.log(newRepository.allTrips.trips.length + 1)
  console.log(currentTraveler.id)

  // const sendData = (e) => {
  //   e.preventDefault();
  //   let formData = new FormData(e.target);
  //     let newTrip = {
  //       id: newRepository.alltrips.trips.length + 1,
  //       userID: currentTraveler.id,
  //parseINT??????       destinationID: formData.get(['destination'].index),
  //       travelers: parseInt(formData.get('travelers')),
  //       date: dayjs(formData.get('date')).format('YYYY/MM/DD'),
  //       duration: parseInt(formData.get('duration')),
  //       status: 'pending',
  //       suggestedActivities: []
  //     }

  // TRY THIS if .index doesn't work ////////////
  //     allDestinations.forEach(destination => {
//         if (newTrip.destinationID === destination.destination) {
//            newTrip.destinationID = destination.id;
//         }
//       })
  //     currentTraveler.thisYearsTrips.push(newTrip);
  //     currentTraveler.thisYearsPending.push(newTrip)
  //     postData(e.target.name, newTrip);
  //     updateDOM(currentTraveler, allDestinations);
  //     e.target.reset();
  //   }
  //
  // bookingForm.onsubmit = sendData;
};

window.onload = fetchData;
