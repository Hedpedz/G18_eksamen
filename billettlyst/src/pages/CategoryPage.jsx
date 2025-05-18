import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AttractionCard from "../components/AttractionCard";
import EventCard from "../components/EventCard";
import VenueCard from "../components/VenueCard";
import "../styles/CategoryPage.scss";
import SearchBar from "../components/SearchBar";
import CountryCitySelector from "../components/CountryCitySelector"; // tilpass path om nødvendig


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

export default function CategoryPage() {
  const { slug } = useParams();
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [originalAttractions, setOriginalAttractions] = useState([]);
  const [originalEvents, setOriginalEvents] = useState([]);
  const [originalVenues, setOriginalVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [Date, setDate] = useState("");
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");

    //ønskeliste
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    if(savedWishlist){
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const handleWishlistClick = (id) => {
    let updated;

    if(wishlist.includes(id)){
      updated = wishlist.filter((item) => item !==id);
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
          setOriginalAttractions(data._embedded.attractions);
        } else {
          setAttractions([]);
          setOriginalAttractions([]);
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
          setOriginalEvents(data._embedded.events);
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
          setOriginalVenues(data._embedded.venues);
        } else {
          setVenues([]);
          setOriginalVenues([]);
        }
      } catch (error) {
        console.error("Something went wrong!");
        setVenues([]);
      }
    };

    fetchVenues();
  }, [slug]);

  useEffect(() => {
    const filteredAttractions = originalAttractions.filter((attraction) =>
      attraction.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredEvents = originalEvents.filter((events) =>
      events.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredVenues = originalVenues.filter((venues) =>
      venues.city?.name?.toLowerCase().includes(City.toLowerCase())
    );

    setAttractions(filteredAttractions);
    setVenues(filteredVenues);
    setEvents(filteredEvents);

  }, [search, City, Country, originalEvents, originalAttractions, originalVenues]);

  useEffect(() => {
   

    const filteredEvents = originalEvents.filter((events) =>
      events._embedded?.venues[0]?.country.name.toLowerCase().includes(Country.toLowerCase())
    );

    const filteredVenues = originalVenues.filter((venues) =>
      venues.country?.name?.toLowerCase().includes(Country.toLowerCase())
    );

    setVenues(filteredVenues);
    setEvents(filteredEvents);

  }, [Country, originalEvents, originalVenues]);

  useEffect(() => {
    const filtered = originalEvents.filter(
      (event) => event.dates?.start?.localDate === Date
    
    );

    setEvents(filtered);
  
  }, [Date, originalEvents]);

  
  return (
    <>
    <h1>Søkefelt</h1>
    <section className="EventContainer">

      <SearchBar search={search} setSearch={setSearch} />

      <input
        type="date"
        value={Date}
        onChange={(event) => setDate(event.target.value)}
      />
      <CountryCitySelector
  selectedCountry={Country}
  selectedCity={City}
  onCountryChange={setCountry}
  onCityChange={setCity}
/>

      
</section>
      <h1>Attraksjoner</h1>
      <section className="EventContainer">
        {attractions.map((attraction) => (
          <AttractionCard
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
