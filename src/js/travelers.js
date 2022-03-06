class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.thisYearsTrips = [];
    this.lastYearsTrips = [];
  };

  getTraveler(id) {
    return this.users.find(user => user.id === id);
  }
};

export default Traveler;
