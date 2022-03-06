class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.thisYearsTrips = [];
    this.lastYearsTrips = [];
  };
};

export default Traveler;
