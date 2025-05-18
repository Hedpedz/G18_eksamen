import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AttractionCard from "../components/AttractionCard";
import EventCard from "../components/EventCard";
import VenueCard from "../components/VenueCard";
import "../styles/CategoryPage.scss";

const API_Key = "An0Gfh3JYmKpW5rJIqCetXQuRadlfUhp";

const clasificationMap = {
  sport: {
    segmentId: "KZFzniwnSyZfZ7v7nE",
    classificationName: "Sports",
  },
  musikk: {
    segmentId: "KZFzniwnSyZfZ7v7nJ",
    classificationName: "Music",
  },
  teater: {
    segmentId: "KZFzniwnSyZfZ7v7na",
    classificationName: "Theatre",
  },
};

const countryCities = {
  Norge: ["Oslo", "Bergen", "Trondheim", "Stavanger"],
  Sverige: ["Stockholm", "Gøteborg", "Malmö"],
  Danmark: ["København", "Aarhus", "Odense"],
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [search, setSearch] = useState("");
  const [Date, setDate] = useState("");
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");

  const isFormValid = City !== "" && Country !== "";



  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const handleWishlistClick = (id) => {
    let updated;

    if (wishlist.includes(id)) {
      updated = wishlist.filter((item) => item !== id);
    } else {
      updated = [...wishlist, id]
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };



  useEffect(() => {
    const category = clasificationMap[slug?.toLowerCase()] || slug;
    const classification = category.classificationName || slug;

    const fetchAttractions = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/attractions.json?classificationName=${classification}&size=12&apikey=${API_Key}`
        );
        const data = await response.json();

        if (data._embedded?.attractions) {
          setAttractions(data._embedded.attractions);
        } else {
          setAttractions([]);
        }
      } catch (error) {
        console.error("Fant ingen attraksjoner");
        setAttractions([]);
      }
    };

    fetchAttractions();
  }, [slug]);

  useEffect(() => {
    const category = clasificationMap[slug?.toLowerCase()] || slug;
    const classification = category.classificationName || slug;

    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${classification}&size=12&apikey=${API_Key}`
        );
        const data = await res.json();

        if (data._embedded?.events) {
          setEvents(data._embedded.events);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Fant ingen eventer");
        setEvents([]);
      }
    };

    fetchEvents();
  }, [slug]);

  useEffect(() => {
    const category = clasificationMap[slug?.toLowerCase()] || slug;
    const classification = category.classificationName || slug;

    const fetchVenues = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/venues.json?classificationName=${classification}&size=12&apikey=${API_Key}`
        );
        const data = await response.json();

        if (data._embedded?.venues) {
          setVenues(data._embedded.venues);
        } else {
          setVenues([]);
        }
      } catch (error) {
        console.error("Something went wrong!");
        setVenues([]);
      }
    };

    fetchVenues();
  }, [slug]);

  const filterEvents = async (event) => {
    event.preventDefault;

    let fetchURL = `https://app.ticketmaster.com/discovery/v2/events?city=${City}&apikey=${API_Key}&locale=*&sort=date,asc`;

    if (search != "") {
      fetchURL = `https://app.ticketmaster.com/discovery/v2/events?city=${City}&keyword=${search}&apikey=${API_Key}&locale=*&sort=date,asc`;
    }

    if (Date != "") {
      const dateString = Date + "T01:00:00Z";
      fetchURL = `https://app.ticketmaster.com/discovery/v2/events?city=${City}&startDateTime=${dateString}&apikey=${API_Key}&locale=*&sort=date,asc`;

      if (search != "") {
        fetchURL = `https://app.ticketmaster.com/discovery/v2/events?city=${City}&startDateTime=${dateString}&keyword=${search}&apikey=${API_Key}&locale=*&sort=date,asc`;
      }
    }

  try {
    const response = await fetch(
      fetchURL
    );
    const data = await response.json();

    setEvents(data._embedded.events);

  } catch (error) {
    console.error("Fant ingen events");
    setEvents([]);
  }

  console.log(events);
}


return (
  <>
    <h1>Søkefelt</h1>
    <section className="EventContainer">
      <input
        type="text"
        placeholder="Søk..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      ></input>

      <input
        type="date"
        value={Date}
        onChange={(event) => setDate(event.target.value)}
      />
      <section>
        <label>Velg et land: </label>
        <select value={Country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Velg et land</option>
          {Object.keys(countryCities).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <label>Velg en by: </label>
        <select
          value={City}
          onChange={(e) => setCity(e.target.value)}
          disabled={!Country}
        >
          <option value="">Velg en by</option>
          {Country &&
            countryCities[Country].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
      </section>
      <button onClick={filterEvents} disabled={!isFormValid}>Filter</button>
    </section>
    <h1>Attraksjoner</h1>
    <section className="EventContainer">
      {attractions.map((attraction) => (
        <AttractionCard
          key={attraction.id}
          id={attraction.id}
          name={attraction.name}
          image={attraction.images?.[0]?.url}
          showHeart={true}
          isSaved={wishlist.includes(attraction.id)}
          onToggleSave={handleWishlistClick}

        />
      ))}
    </section>
    <h1>Arrangementer</h1>
    <section className="EventContainer">
      {events.length > 0 ? (
        <>
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              name={event.name}
              date={event.dates?.start?.localDate}
              image={event.images?.[0]?.url}
              link={event.id}
              showHeart={true}
              isSaved={wishlist.includes(event.id)}
              onToggleSave={handleWishlistClick}

            />
          ))}
        </>
      ) : (
        <p>Ingen arrangementer funnet.</p>
      )}
    </section>
    <section></section>
    <h1>Spillesteder:</h1>
    <section className="EventContainer">
      {venues.map((venue) => (
        <VenueCard
          key={venue.id}
          id={venue.id}
          name={venue.name}
          image={venue.images?.[0]?.url}
          country={venue.country?.name}
          city={venue.city?.name}
          showHeart={true}
          isSaved={wishlist.includes(venue.id)}
          onToggleSave={handleWishlistClick}

        />
      ))}
    </section>
  </>
);
  }

