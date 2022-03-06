import { expect } from 'chai';
import TravelersRepository from '../src/js/TravelersRepository';
import travelersTestData from '../src/data/travelers-test-data';
import Traveler from '../src/js/travelers';

describe('Travelers Repository', () => {
  let travelersRepository;
  let traveler1;
  let traveler2;

  beforeEach(() => {
    travelersRepository = new TravelersRepository(travelersTestData);
    traveler1 = new Traveler(travelersTestData[0]);
    traveler2 = new Traveler(travelersTestData[1]);
  });

  it('should be a function', () => {
    expect(TravelerRepository).to.be.a('function');
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
};
