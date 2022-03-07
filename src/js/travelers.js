import dayjs from 'dayjs'

class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.thisYearsTrips = [];
    this.previousYearsTrips = [];
    this.thisYearsApproved = [];
    this.thisYearsPending = [];
  };

  getName() {
    let name = this.name.split(' ');
    return name[0];
  };

  sortTrips(trips) {
    trips.forEach(trip => {
      if (dayjs(trip.date).year() === 2022) {
        this.thisYearsTrips.push(trip);
        if (trip.status === 'approved') {
          this.thisYearsApproved.push(trip)
        } else {
          this.thisYearsPending.push(trip)
        }
      } else {
        this.previousYearsTrips.push(trip);
      };
    });
  };
};

export default Traveler;
