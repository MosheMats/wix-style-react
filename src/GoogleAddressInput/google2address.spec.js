import {google2address} from './google2Address';

describe('google 2 address', () => {
  const aComponent = (long_name, short_name, ...types) => ({
    long_name, short_name, types
  });

  const aGeometry = (lng, lat) => ({
    location: {
      lat: () => lng,
      lng: () => lat
    }
  });

  const aGoogleResponse = ({components, formatted, geometry, types}) => ({
    geometry: geometry || aGeometry(1, 2),
    address_components: components || [],
    formatted_address: formatted || '',
    types: types || []
  });

  it('should set state according to administrative_area_level_1', () => {
    const someState = 'some-state';
    const component = aComponent(null, someState, 'administrative_area_level_1');

    expect(google2address(aGoogleResponse({components: [component]})).state).toEqual(someState);
  });

  it('should set city according to locality and ignore sublocality', () => {
    const someLocality = 'some-locality';
    const someSublocality = 'some-sublocality';
    const components = [
      aComponent(someLocality, null, 'locality'),
      aComponent(someSublocality, null, 'sublocality')
    ];

    expect(google2address(aGoogleResponse({components})).city).toEqual(someLocality);
  });

  it('should set city according to sublocality if locality is missing', () => {
    const someCity = 'some-city';
    const component = aComponent(someCity, null, 'sublocality');

    expect(google2address(aGoogleResponse({components: [component]})).city).toEqual(someCity);
  });

  it('should set street according to route', () => {
    const someStreet = 'some-street';
    const component = aComponent(someStreet, null, 'route');

    expect(google2address(aGoogleResponse({components: [component]})).street).toEqual(someStreet);
  });

  it('should set country according to country - long name', () => {
    const someCountry = 'some-country';
    const component = aComponent(someCountry, null, 'country');

    expect(google2address(aGoogleResponse({components: [component]})).country).toEqual(someCountry);
  });

  it('should set country code according to country - short name', () => {
    const someCountryCode = 'some-country-code';
    const component = aComponent(null, someCountryCode, 'country');

    expect(google2address(aGoogleResponse({components: [component]})).countryCode).toEqual(someCountryCode);
  });

  it('should set postal code according to postal_code', () => {
    const somePostalCode = 'some-postal-code';
    const component = aComponent(somePostalCode, null, 'postal_code');

    expect(google2address(aGoogleResponse({components: [component]})).postalCode).toEqual(somePostalCode);
  });

  it('should set street number according to street_number', () => {
    const someStreetNumber = 'some-street-number';
    const component = aComponent(someStreetNumber, null, 'street_number');

    expect(google2address(aGoogleResponse({components: [component]})).number).toEqual(someStreetNumber);
  });

  it('should set formatted according to formatted_address', () => {
    const someFormattedAddress = 'some-formatted-address';
    expect(google2address(aGoogleResponse({formatted: someFormattedAddress})).formatted).toEqual(someFormattedAddress);
  });

  it('should set latLng according to geometry', () => {
    const someGeometry = aGeometry(100, 22);
    expect(google2address(aGoogleResponse({geometry: someGeometry})).latLng).toEqual({lng: 22, lat: 100});
  });

  it('should set approximate if street_address is not in types', () => {
    expect(google2address(aGoogleResponse({types: ['street_address']})).approximate).toBe(false);
    expect(google2address(aGoogleResponse({types: ['anything else']})).approximate).toBe(true);
  });

  it('should set approximate if premise is not in types', () => {
    expect(google2address(aGoogleResponse({types: ['premise']})).approximate).toBe(false);
    expect(google2address(aGoogleResponse({types: ['anything else']})).approximate).toBe(true);
  });
});
