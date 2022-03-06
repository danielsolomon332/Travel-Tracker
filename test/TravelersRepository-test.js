import { expect } from 'chai';
import TravelersRepository from '../src/js/TravelersRepository';
import travelersTestData from '../src/data/travelers-test-data';
import Traveler from '../src/js/travelers';

describe('Travelers Repository', () => {
  let travelersRepository;
  let traveler1;
  let traveler2;
  let traveler3;

  beforeEach(() => {
    travelersRepository = new TravelersRepository(travelersTestData);
    traveler1 = new Traveler(travelersTestData[0]);
    traveler2 = new Traveler(travelersTestData[1]);
    traveler3 = new Traveler(travelersTestData[2]);
  });

  it('should be a function', () => {
    expect(TravelersRepository).to.be.a('function');
  });

  it('should be an instance of TravelerRepsitory', () => {
    expect(travelersRepository).to.be.an.instanceof(TravelersRepository);
  });

  it('should hold the users', () => {
    expect(travelersRepository.travelers).to.be.an('array');
  });

  it('should hold an instance of Traveler', () => {
    expect(traveler1).to.eql(travelersRepository.travelers[0]);
  });

  it('should be able to return the user by id', () => {
    expect(travelersRepository.getTraveler(traveler1.id)).to.eql(traveler1);
  });

  it('should be able to sort this year\'s trips', () => {
    expect(travelersRepository.sortThisYearsTrips(traveler3)).to.eql(
      {
        "id": 3,
        "userID": 3,
        "destinationID": 22,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      });
  });

  it('should be able to sort previous year\'s trips', () => {
    expect(travelersRepository.sortLastYearsTrips(traveler3)).to.eql(
      {
        "id": 41,
        "userID": 3,
        "destinationID": 25,
        "travelers": 3,
        "date": "2020/08/30",
        "duration": 11,
        "status": "approved",
        "suggestedActivities": []
      });
  });
};
