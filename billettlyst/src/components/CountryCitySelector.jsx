import React from "react";

const data = {
  Norge: ["Oslo", "Bergen", "Trondheim", "Stavanger"],
  Sverige: ["Stockholm", "Gøteborg", "Malmö"],
  Danmark: ["København", "Aarhus", "Odense"],
};

function CountryCitySelector({ selectedCountry, selectedCity, onCountryChange, onCityChange }) {
  return (
    <>
      <section>
        <label>Velg et land: </label>
        <select value={selectedCountry} onChange={(e) => onCountryChange(e.target.value)}>
          <option value="">Velg et land</option>
          {Object.keys(data).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </section>

      <section style={{ marginTop: "10px" }}>
        <label>Velg en by: </label>
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Velg en by</option>
          {selectedCountry &&
            data[selectedCountry].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
      </section>
    </>
  );
}

export default CountryCitySelector;
