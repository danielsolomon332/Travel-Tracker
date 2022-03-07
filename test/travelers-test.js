import { expect } from 'chai';
import dayjs from 'dayjs'
import travelersTestData from '../src/data/travelers-test-data';
import tripsTestData from '../src/data/trips-test-data';
import Traveler from '../src/js/travelers';
import TravelersRepository from '../src/js/TravelersRepository';

describe('Travelers', () => {
  let traveler1;
  let traveler2;
  let traveler3;
  let traveler3Trips;

  beforeEach(() => {
    traveler1 = new Traveler(travelersTestData[0]);
    traveler2 = new Traveler(travelersTestData[1]);
    traveler3 = new Traveler(travelersTestData[2]);
    traveler3Trips = tripsTestData.filter(trip => trip.userID === traveler3.id)
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler1).to.be.an.instanceof(Traveler);
    expect(traveler2).to.be.an.instanceof(Traveler);
  });

  it('should have an id', () => {
    expect(traveler1.id).to.eql(1);
    expect(traveler2.id).to.eql(2);
  });

  it('should have a name', () => {
    expect(traveler1.name).to.eql("Ham Leadbeater");
    expect(traveler2.name).to.eql("Rachael Vaughten");
  });

  it('should have a travelerType', () => {
    expect(traveler1.travelerType).to.eql("relaxer");
    expect(traveler2.travelerType).to.eql("thrill-seeker");
  });

  it('should have a travelerType', () => {
    expect(traveler1.thisYearsTrips).to.eql([]);
    expect(traveler2.thisYearsTrips).to.eql([]);
  });

  it('should hold all of previous year\s trips', () => {
    expect(traveler1.previousYearsTrips).to.eql([]);
    expect(traveler2.previousYearsTrips).to.eql([]);
  });

  it('should be able to sort trips', () => {
    traveler3.sortTrips(traveler3Trips)
    expect(traveler3.previousYearsTrips).to.eql([
      {
        "id": 41,
        "userID": 3,
        "destinationID": 25,
        "travelers": 3,
        "date": "2020/08/30",
        "duration": 11,
        "status": "approved",
        "suggestedActivities": []
      }]);
    expect(traveler3.thisYearsTrips).to.eql([
      {
        "id": 3,
        "userID": 3,
        "destinationID": 22,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      }]);
    expect(traveler3.thisYearsApproved).to.eql([
      {
        "id": 3,
        "userID": 3,
        "destinationID": 22,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      }]);
    expect(traveler3.thisYearsPending).to.eql([]);
  });
});
