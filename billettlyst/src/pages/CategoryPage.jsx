import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AttractionCard from "../components/AttractionCard";
import EventCard from "../components/EventCard";
import VenueCard from "../components/VenueCard";

const API_Key = "An0Gfh3JYmKpW5rJIqCetXQuRadlfUhp";

const clasificationMap = {
    sport: {
      segmentId:"KZFzniwnSyZfZ7v7nE",
      classificationName: "Sports"

    },
    musikk: {
      segmentId: "KZFzniwnSyZfZ7v7nJ",
      classificationName: "Music"

    },
    teater: {
      segmentId: "KZFzniwnSyZfZ7v7na",
      classificationName: "Theatre"
    }
  };

export default function CategoryPage() {
  const { slug } = useParams();
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [attractions, setAttractions] = useState([]);


  useEffect (() => {
    const category = clasificationMap[slug?.toLowerCase()] || slug;
    const classification = category.classificationName || slug;
    const segmentId = category.segmentId;

      const fetchAttractions = async() =>{
      try{
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/attractions.json?classificationName=${classification}&size=12&apikey=${API_Key}`
        );
        const data = await response.json();

        if(data._embedded?.attractions){
          setAttractions(data._embedded.attractions);
        } else{
          setAttractions([]);
        }
      }
      catch(error){
        console.error("Fant ingen attraksjoner")
        setAttractions([]);
    }
  }

    const fetchEvents = async () => {
      try{
        const res = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${classification}&size=12&apikey=${API_Key}`
        );
        const data = await res.json();
        if(data._embedded?.events){
          setEvents(data._embedded.events);
        } else{
          setEvents([]);
        }
      }
      catch (error){
        console.error("Fant ingen eventer")
        setEvents([]);
      }
    };

    const fetchVenues = async() => {
      try{
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/venues.json?classifcicationName=${classification}&size=12&apikey=${API_Key}`
        );
        const data = await response.json();

        if(data._embedded?.venues){
          setVenues(data._embedded.venues);
        }else{
          setVenues([]);
        }
      }
      catch(error){
        console.error("Something went wrong!");
        setVenues([]);
      }
    }
    
    fetchAttractions();
    fetchEvents();
    fetchVenues();
  }, [slug]);
      
  return (
    <>
    <section>
      <h1>Attraksjoner</h1>
      {attractions.map((attraction) => (
        <AttractionCard
        key={attraction.id}
        name={attraction.name}
        image={attraction.images?.[0]?.url}
        />
      ))}
    </section>

      <section>
        <h1>Arrangementer</h1>
      {events.length > 0 ? (
        <article>
          {events.map((event) => (
            <EventCard 
            key={event.id}
            name={event.name}
            date={event.dates?.start?.localDate}
            image={event.images?.[0]?.url}
            link={event.url}/>
          ))}
        </article>
      ) : (
        <p>Ingen arrangementer funnet.</p>
      )}
    </section>
    <section>

    </section>
    <section>
      <h1>Spillesteder:</h1>
      <article>
        {venues.map((venue) =>(
          <VenueCard
          name={venue.name}
          image={venue.images?.[0]?.url}
          country={venue.country?.name}
          city={venue.city?.name}
          />
        ))}
      </article>
    </section>
    </>
  );
}
