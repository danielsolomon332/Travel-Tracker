import dayjs from 'dayjs'
import Traveler from './travelers';
import Trip from './trips';
import Destination from './destinations';

class TravelersRepository {
  constructor(data) {
    this.allTravelers = data[0];
    this.allTrips = data[1];
    this.allDestinations = data[2].map(destination => new Destination(destination));
  };

  getTraveler(id) {
    return this.allTravelers.find(traveler => traveler.id === id);
  };

  getTrip(id) {
    return this.allTrips.find(trip => trip.id === id);
  };

  getDestination(id) {
    return this.allDestinations.find(destination => destination.id === id);
  };
};


export default TravelersRepository;
