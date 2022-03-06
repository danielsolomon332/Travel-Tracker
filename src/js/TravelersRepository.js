import Traveler from './travelers';

class TravelersRepository {
  constructor(travelers) {
    this.travelers = travelers.reduce((acc, traveler) => {
      return [...acc, new Traveler(traveler)];
    }, []);
  };

  getTraveler(id) {
    return this.travelers.find(traveler => traveler.id === id);
  };
};
