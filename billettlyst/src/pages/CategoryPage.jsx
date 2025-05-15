import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard"

const API_Key = "An0Gfh3JYmKpW5rJIqCetXQuRadlfUhp"

export default function CategoryPage() {
  const { slug } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    const fetchEvents = async () => {
      try{
        const res = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${slug}&size=12&apikey=${API_Key}`
        );
        const data = await res.json();

        if(data._embedded?.events){
          setEvents(data._embedded.events);
        } else{
          setEvents([]);
        }
      }
      catch (error){
        console.error("Something went wrong")
        setEvents([]);
      }
    };
    fetchEvents();
  }, [slug]);
      
      

  return (
    <section>
      <h1> Kategori: {slug}</h1>
  
      {events.length > 0 ? (
        <article className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <p>No events found.</p>
      )}
    </section>
  );
  
}
