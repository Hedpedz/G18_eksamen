import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (slug === "teater") {
      setCategory("Theatre");
    } else if (slug === "sport") {
      setCategory("Sport");
    } else if (slug === "musikk") {
      setCategory("Music");
    } else {
      setCategory(null);
    }
  }, [slug]);

  useEffect(() => {
    if (category) {
      async function fetchEvents() {
        try {
          const response = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events?apikey=An0Gfh3JYmKpW5rJIqCetXQuRadlfUhp&countryCode=NO&classificationName=${category}&size=10`
          );
          const json = await response.json();
          setEvents(json);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }

      fetchEvents();
    }
  }, [category]);

  return (
    <div
      className="EventContainer"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        overflow: "auto",
      }}
    >
      {events._embedded?.events ? (
        events._embedded.events.map((event) => (
          <EventCard
            key={event.id}
            name={event.name}
            date={event.dates.start.localDate}
            image={event.images[0]?.url}
            link={event.url}
          />
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}
