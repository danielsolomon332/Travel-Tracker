import {expect} from 'chai';
import destinationsTestData from '../src/data/destinations-test-data';
import Destination from '../src/js/Destinations';

describe('Destinations', () => {
  let destination1;
  let destination2;

  beforeEach(() => {
    destination1 = new Destination(destinationsTestData[0]);
    destination2 = new Destination(destinationsTestData[1]);
  });

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of Destination', () => {
    expect(destination1).to.be.an.instanceof(Destination);
    expect(destination2).to.be.an.instanceof(Destination);
  });

  it('should have an id', () => {
    expect(destination1.id).to.eql(1);
    expect(destination2.id).to.eql(2);
  });

  it('should have a destination city', () => {
    expect(destination1.destination).to.eql("Lima, Peru");
    expect(destination2.destination).to.eql("Stockholm, Sweden");
  });

  it('should have an estimatedLodgingCostPerDay', () => {
    expect(destination1.estimatedLodgingCostPerDay).to.eql(70);
    expect(destination2.estimatedLodgingCostPerDay).to.eql(100);
  });

  it('should have an estimatedFlightCostPerPerson', () => {
    expect(destination1.estimatedFlightCostPerPerson).to.eql(400);
    expect(destination2.estimatedFlightCostPerPerson).to.eql(780);
  });

  it('should have a location image', () => {
    expect(destination1.image).to.eql("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
    expect(destination2.image).to.eql("https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
  });

  it('should have image alt text', () => {
    expect(destination1.alt).to.eql("overview of city buildings with a clear sky");
    expect(destination2.alt).to.eql("city with boats on the water during the day time");
  });
})
