import dayjs from 'dayjs'
import Traveler from './js/travelers';
import Trip from './js/trips';
import Destination from './js/destinations';
import TravelersRepository from './js/TravelersRepository';

let updateDOM = (currentTraveler, allDestinations) => {
  updateTraveler(currentTraveler);
  updatePreviousYearsTrips(currentTraveler, allDestinations);
  updateThisYearsTrips(currentTraveler, allDestinations);
  updateTotalSpent(currentTraveler, allDestinations);
  populateDestinationDropdown(allDestinations);
};

const updateTraveler = (currentTraveler) => {
  travelerTitle.innerText = `Welcome ${currentTraveler.getName()}`
};

const updatePreviousYearsTrips = (currentTraveler, allDestinations) => {
  currentTraveler.previousYearsTrips.forEach(trip => {
    let cost = tripCost(trip, allDestinations)
    before2022TripsList.innerHTML += `
  <section class="individual-trip" id="individualTrip">
    <article>Date: ${dayjs(trip.date).format('M/D/YYYY')}</article>
    <article>Destination: ${allDestinations.find(destination => destination.id === trip.destinationID).destination}</article>
    <article># Travelers: ${trip.travelers}</article>
    <article>Duration: ${trip.duration} days</article>
    <article>Lodging Cost Per Day: $${allDestinations.find(destination => destination.id === trip.destinationID).estimatedLodgingCostPerDay}</article>
    <article>Flight Cost Per Person: $${allDestinations.find(destination => destination.id === trip.destinationID).estimatedFlightCostPerPerson}</article>
    <article>Status: ${trip.status}</article>
    <article>Total Trip Cost: $${cost}</article>
  </section>`
  })
};

const updateThisYearsTrips = (currentTraveler, allDestinations, trip) => {
  currentTraveler.thisYearsTrips.forEach(trip => {
    let cost = tripCost(trip, allDestinations)
    during2022TripsList.innerHTML += `
  <section class="individual-trip" id="individualTrip">
    <article>Date: ${dayjs(trip.date).format('M/D/YYYY')}</article>
    <article>Destination: ${allDestinations.find(destination => destination.id === trip.destinationID).destination}</article>
    <article># Travelers: ${trip.travelers}</article>
    <article>Duration: ${trip.duration} days</article>
    <article>Lodging Cost Per Day: $${allDestinations.find(destination => destination.id === trip.destinationID).estimatedLodgingCostPerDay}</article>
    <article>Flight Cost Per Person: $${allDestinations.find(destination => destination.id === trip.destinationID).estimatedFlightCostPerPerson}</article>
    <article>Status: ${trip.status}</article>
    <article>Total Trip Cost: $${cost}</article>
  </section>`
  })
};

const updateTotalSpent = (currentTraveler, allDestinations) => {
  const totalSpent = currentTraveler.thisYearsApproved.reduce((acc, trip) => {
    const totalLodgingCost = allDestinations.find(destination => destination.id === trip.destinationID).estimatedLodgingCostPerDay * trip.duration
    const totalFlightsCost = allDestinations.find(destination => destination.id === trip.destinationID).estimatedFlightCostPerPerson * trip.travelers
    acc += totalLodgingCost + totalFlightsCost
    return acc
  }, 0) * 1.1
  totalSpentValue.innerText = `Total Spent in 2022: $${totalSpent.toFixed(0)}`
};

const populateDestinationDropdown = (allDestinations) => {
  allDestinations.forEach(destination => {
    destinationDropdown.innerHTML += `
    <option value="${destination.id}">${destination.destination}</option>`
  });
};

const bookTrip = () => {
  showHide([bookingView, homeButton], [mainPage, bookTripButton]);
};

const goHome = (event) => {
  showHide([mainPage, bookTripButton], [bookingView, homeButton, loginPage]);
};

const hide = (toHide) => {
  toHide.forEach(element => {
    element.classList.add('hidden');
  })
};

const show = (toShow) => {
  toShow.forEach(element => {
    element.classList.remove('hidden');
  });
};

const showHide = (toShow, toHide) => {
  hide(toHide);
  show(toShow);
};

const tripCost = (trip, allDestinations) => {
    const tripDestination = allDestinations.find(destination => destination.id === trip.destinationID)
    const dayCost = trip.duration * tripDestination.estimatedLodgingCostPerDay
    const flightCost = trip.travelers * tripDestination.estimatedFlightCostPerPerson
    const totalCost = (flightCost + dayCost) * 1.1
    return totalCost.toFixed(0)
}

// EVENT LISTENERS
bookTripButton.addEventListener('click', bookTrip);
homeButton.addEventListener('click', goHome);

export {updateDOM, hide, show, showHide, bookTrip, goHome, tripCost};
