import { expect } from 'chai';
import travelersTestData from '../src/data/travelers-test-data';
import tripsTestData from '../src/data/trips-test-data';
import destinationsTestData from '../src/data/destinations-test-data';
import TravelersRepository from '../src/js/TravelersRepository';
import Traveler from '../src/js/travelers';
import Trip from '../src/js/trips';
import Destination from '../src/js/destinations';

describe('Travelers Repository', () => {
  let data;
  let travelersRepository;
  let traveler1;
  let traveler2;
  let traveler3;
  let trip1;
  let destination1;

  beforeEach(() => {
    data = [travelersTestData, tripsTestData, destinationsTestData]
    travelersRepository = new TravelersRepository(data);
    traveler1 = new Traveler(travelersTestData[0]);
    traveler2 = new Traveler(travelersTestData[1]);
    traveler3 = new Traveler(travelersTestData[2]);
    trip1 = new Trip(tripsTestData[0]);
    destination1 = new Destination(destinationsTestData[0]);
  });

  it('should be a function', () => {
    expect(TravelersRepository).to.be.a('function');
  });

  it('should be an instance of TravelerRepsitory', () => {
    expect(travelersRepository).to.be.an.instanceof(TravelersRepository);
  });

  it('should hold all Travelers', () => {
    expect(travelersRepository.allTravelers).to.be.an('array');
  });

  it('should hold all Trips', () => {
    expect(travelersRepository.allTrips).to.be.an('array');
  });

  it('should hold all Destinations', () => {
    expect(travelersRepository.allDestinations).to.be.an('array');
  });

  it('should hold an instance of Traveler', () => {
    expect(traveler1.id).to.eql(travelersRepository.allTravelers[0].id);
    expect(traveler1.name).to.eql(travelersRepository.allTravelers[0].name);
    expect(traveler1.travelerType).to.eql(travelersRepository.allTravelers[0].travelerType);
  });

  it('should be able to return the traveler by id', () => {
    expect(travelersRepository.getTraveler(traveler1.id).name).to.eql(traveler1.name);
  });

  it('should be able to return the trip by id', () => {
    expect(travelersRepository.getTrip(trip1.id).id).to.eql(trip1.id);
  });

  it('should be able to return the destination by id', () => {
    expect(travelersRepository.getDestination(destination1.id).id).to.eql(destination1.id);
  });
});
