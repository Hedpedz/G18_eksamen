import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/EventPage.scss";
import ArtistCard from "../components/ArtistCard";
import EventCard from "../components/EventCard"; 

export default function EventPage() {
  const [event, setEvent] = useState([]);
  const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const [artistGenre, setArtistGenre] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=An0Gfh3JYmKpW5rJIqCetXQuRadlfUhp&locale=no-NO`
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
    async function fetchTickets() {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=An0Gfh3JYmKpW5rJIqCetXQuRadlfUhp&attractionId=${id}&countryCode=NO&locale=no-NO`
        );
        const json = await response.json();
        const events = json?._embedded?.events || [];
        setTickets(events);

        const artistList = events[0]?._embedded?.attractions?.filter(a => a.id !== id) || [];
        setArtists(artistList);

        const firstGenre = artistList[0]?.classifications?.[0]?.genre?.name;
        if (firstGenre) {
          setArtistGenre(firstGenre);
        }
      } catch (error) {
        console.error("Ticket fetch error:", error);
      }
    }

    fetchTickets();
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


  return (
    <>
      <section>
        <img src={event?.images?.[0]?.url} alt={event?.name} />
        <article>
          <h1>{event?.name}</h1>
          <p>Genre: {genre}</p>
          <p>Date: {event?.dates?.start?.localDate || tickets[0]?.dates?.start?.localDate}</p>
          <p>City: {event?._embedded?.venues?.[0]?.city?.name || tickets[0]?._embedded?.venues?.[0]?.city?.name}</p>
          <p>Country: {event?._embedded?.venues?.[0]?.country?.name || tickets[0]?._embedded?.venues?.[0]?.country?.name}</p>

      
          <a href={event?.url} target="_blank">
            Ticketmaster LINK
          </a>
        </article>
      </section>

      <section>
        <article>
          <h2>Festivalpass</h2>
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <EventCard
                key={ticket.id}
                name={ticket.name}
                image={ticket?.images?.[0]?.url}
                date={ticket?.dates?.start?.localDate}
                link={ticket?.url}
              />
            ))
          ) : (
            <p>Ingen festivalpass funnet.</p>
          )}
        </article>
      </section>

      <section>
        <article>
          <h2>Artister</h2>
          {artists.length > 0 ? (
            artists.map((a) => (
              <ArtistCard
                key={a?.id}
                name={a?.name}
                image={a?.images?.[0]?.url}
                genre={artistGenre}
              />
            ))
          ) : (
            <p>Ingen artister funnet.</p>
          )}

        </article>
      </section>
    </>
  );
}

