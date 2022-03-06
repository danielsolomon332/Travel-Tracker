// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import {
  travelersData,
  tripsData,
  destinationsData,
  getData
} from './apiCalls';
import Traveler from './js/Traveler';
import Trip from './js/Trip';
import Destination from './js/Destination';

// Query Selectors


// Functions

const getRandomUser = (users) => {
  return users.getUser(Math.floor(Math.random() * users.users.length - 1));
};

const fetchData = () => {
  Promise.all([travelersData, tripsData, destinationsData]).then(data => {
    handleData(data);
  });
};

const handleData = (data) => {
  const users = new TravelerRepository(data[0].userData);
  const currentUser = getRandomUser(users);
};

window.onload = fetchData;
