import {expect} from 'chai';
import tripsTestData from '../src/data/travelers-test-data';
import Trip from '../src/js/Trips';

describe('Trips', () => {
  let trip1;
  let trip2;

  beforeEach(() => {
    trip1 = new Traveler(tripsTestData[0]);
    trip2 = new Traveler(tripsTestData[1]);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceof(Trip);
    expect(trip2).to.be.an.instanceof(Trip);
  });

  it('should have an id', () => {
    expect(trip1.id).to.eql(1);
    expect(trip2.id).to.eql(2);
  });

  it('should have a userID', () => {
    expect(trip1.userID).to.eql(44);
    expect(trip2.userID).to.eql(35);
  });

  it('should have a destinationID', () => {
    expect(trip1.destinationID).to.eql(49);
    expect(trip2.destinationID).to.eql(35);
  });

  it('should have tell the number of travelers', () => {
    expect(trip1.travelers).to.eql(1);
    expect(trip2.travelers).to.eql(5);
  });

  it('should have a travel date', () => {
    expect(trip1.date).to.eql("2022/09/16");
    expect(trip2.date).to.eql("2022/10/04");
  });

  it('should have a travel duration', () => {
    expect(trip1.duration).to.eql(8);
    expect(trip2.duration).to.eql(18);
  });

  it('should have a status', () => {
    expect(trip1.status).to.eql("approved");
    expect(trip2.status).to.eql("approved");
  });

  it('should hold an array of suggestedActivities', () => {
    expect(trip1.suggestedActivities).to.eql([]);
    expect(trip2.suggestedActivities).to.eql([]);
  });
}
