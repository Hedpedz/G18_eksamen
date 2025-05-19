import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/EventPage.scss";
import ArtistCard from "../components/ArtistCard";

export default function EventPage() {
  const [event, setEvent] = useState([]);
  const { id } = useParams();
  const [Start, setStart] = useState("Unknown");
  const [End, setEnd] = useState("Unknown");
  const [genre, setGenre] = useState(null);
  const [artistGenre, setArtistGenre] = useState(null);
 
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

  
  useEffect(() => {
    if (event?.classifications?.[0]?.genre?.name) {
      setGenre(event.classifications[0].genre.name);
    }
  
    const attraction = event?._embedded?.attractions?.[0];
    const artistGenre = attraction?.classifications?.[0]?.genre?.name;
    if (artistGenre) {
      setArtistGenre(artistGenre);
    }
  }, [event]);

  
  
  useEffect(() => {
    const start = event.sales?.public?.startDateTime;
    const end = event.sales?.public?.endDateTime;
  
    if (start) {
      setStart(new Date(start).toLocaleString("no-NO"));
    }
    if (end) {
      setEnd(new Date(end).toLocaleString("no-NO"));
    }
  }, [event]);

  useEffect(() => {
    const start = event.sales?.public?.startDateTime;
    const end = event.sales?.public?.endDateTime;
  
    if (start) {
      setStart(new Date(start).toLocaleString("no-NO"));
    }
    if (end) {
      setEnd(new Date(end).toLocaleString("no-NO"));
    }
  }, [event]);


      
  return (
    <>
    <section>
      <img src={event?.images?.[0]?.url} alt={event.name} />
      <article>
        <h1>{event?.name}</h1>
        <p>Genre: {genre}</p>
        <p>Date: {event?.dates?.start?.localDate}</p>
        <p>City: {event?._embedded?.venues[0]?.city?.name}</p>
        <p>Country: {event?._embedded?.venues[0]?.country?.name}</p>
        
        <h2>Ticket sales from:</h2>
        <p>Sale starts:{Start}</p>
        <p>Sale stops: {End}</p>

        <a href={event.url} target="_blank">
          Ticketmaster LINK
        </a>
      </article>
      </section>

      <section>
       
      <article>
      <h2>Artister</h2>
      {event?._embedded?.attractions?.length > 0 ? (
                  <>
                    {event?._embedded?.attractions?.map((event) => (
                      <ArtistCard 
                      key={event?.id}
                      name={event?.name}
                      image={event?.images[0].url}
                      genre={artistGenre}
                     />
                    ))}
                  </>
                ) : (
                  <p>Ingen arrangementer funnet.</p>
                )}
        
      </article>
    </section>
    </>
  );
}

