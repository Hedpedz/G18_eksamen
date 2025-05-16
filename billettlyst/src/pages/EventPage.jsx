import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/EventPage.scss';

export default function EventPage() {
  const [event, setEvent] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=An0Gfh3JYmKpW5rJIqCetXQuRadlfUhp`
        );
        const json = await response.json();
        setEvent(json);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchEvent();
    
  }, [id]);
  
  return (
    <section>
      
      <img src={event?.images?.[0]?.url} alt={event.name} />
      <article>
      <h1>{event?.name}</h1>
      </article>
      

      
    </section>
  );
}
