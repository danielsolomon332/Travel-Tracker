class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.lastYearsTrips = tripData.lastYearsTrips;
    this.thisYearsTrips = tripData.thisYearsTrips;
  };

  getTraveler(id) {
    return this.users.find(user => user.id === id);
  }
};

export default Traveler;
