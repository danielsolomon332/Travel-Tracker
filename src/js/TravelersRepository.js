import Traveler from './travelers';
import Trip from './trips';
import Destination from './destinations';

class TravelersRepository {
  constructor(travelers, trips, destinations) {
    this.allTravelers = travelers.reduce((acc, traveler) => {
      return [...acc, new Traveler(traveler)];
    }, []);
    this.allTrips = trips.reduce((acc, trip) => {
      return [...acc, new Trip(trip)];
    }, []);
    this.allDestinations = destinations.reduce((acc, destination) => {
      return [...acc, new Destination(destination)];
    }, []);
  };

  getTraveler(id) {
    return this.allTravelers.find(traveler => traveler.id === id);
  };

  sortThisYearsTrips(traveler) {
    let currentTraveler = new Traveler(traveler)
    this.allTrips.forEach(trip => {
      if (dayjs(trip.date).format('YYYY') >= 2022 && currentTraveler.id === trip.userID) {
        currentTraveler.thisYearsTrips.push(trip);
      };
    });
    return currentTraveler.thisYearsTrips;
  };

  sortPreviousYearsTrips(traveler) {
    let currentTraveler = new Traveler(traveler)
    this.allTrips.forEach(trip => {
      if (dayjs(trip.date).format('YYYY') < 2022 && currentTraveler.id === trip.userID) {
        currentTraveler.lastYearsTrips.push(trip);
      };
    });
    return currentTraveler.lastYearsTrips;
  };
};


export default TravelersRepository;
