import { expect } from 'chai';
import travelersTestData from '../src/data/travelers-test-data';
import Traveler from '../src/js/travelers';

describe('Travelers', () => {
  let traveler1;
  let traveler2;

  beforeEach(() => {
    traveler1 = new Traveler(travelersTestData[0]);
    traveler2 = new Traveler(travelersTestData[1]);
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
});
