import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
  cases: {
    hex: '#cc1034',
    multiplier: 160000,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 240000,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 400000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => b.cases - a.cases);
};

export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={Math.sqrt(
        country[casesType] * casesTypeColors[casesType].multiplier
      )}
    >
      <Popup>
        <div className="info-container">
          <div
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            className="info-flag"
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
