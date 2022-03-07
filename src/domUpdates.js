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
};

const updateTraveler = (currentTraveler) => {
  travelerTitle.innerText = `Welcome ${currentTraveler.getName()}`
};

const updatePreviousYearsTrips = (currentTraveler, allDestinations) => {
  currentTraveler.previousYearsTrips.forEach(trip => {
    before2022TripsList.innerHTML += `
  <section class="individual-trip" id="individualTrip">
    <article>Date: ${dayjs(trip.date).format('M/D/YYYY')}</article>
    <article>Destination: ${allDestinations.find(destination => destination.id === trip.destinationID).destination}</article>
    <article>Total Travelers: ${trip.travelers}</article>
    <article>Duration: ${trip.duration} days</article>
    <article>Lodging Cost Per Day: $${allDestinations.find(destination => destination.id === trip.destinationID).estimatedLodgingCostPerDay}</article>
    <article>Flight Cost Per Person: $${allDestinations.find(destination => destination.id === trip.destinationID).estimatedFlightCostPerPerson}</article>
    <article>Status: ${trip.status}</article>
  </section>`
  })
};

const updateThisYearsTrips = (currentTraveler, allDestinations) => {
  currentTraveler.thisYearsTrips.forEach(trip => {
    during2022TripsList.innerHTML += `
  <section class="individual-trip" id="individualTrip">
    <article>Date: ${dayjs(trip.date).format('M/D/YYYY')}</article>
    <article>Destination: ${allDestinations.find(destination => destination.id === trip.destinationID).destination}</article>
    <article>Total Travelers: ${trip.travelers}</article>
    <article>Duration: ${trip.duration} days</article>
    <article>Lodging Cost Per Day: $${allDestinations.find(destination => destination.id === trip.destinationID).estimatedLodgingCostPerDay}</article>
    <article>Flight Cost Per Person: $${allDestinations.find(destination => destination.id === trip.destinationID).estimatedFlightCostPerPerson}</article>
    <article>Status: ${trip.status}</article>
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

export {updateDOM};
