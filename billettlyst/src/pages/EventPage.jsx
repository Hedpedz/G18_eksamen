import { useEffect, useState } from "react";

export default function EventPage() {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(
          'https://app.ticketmaster.com/discovery/v2/events/G5vVZbowlaVz5?apikey=An0Gfh3JYmKpW5rJIqCetXQuRadlfUhp'
        );
        const json = await response.json();
        setEvent(json);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchEvent();
    
  }, []);

  console.log("Fetched event:", event);
  
  return (
    <div>
      {event ? (
        <pre>{JSON.stringify(event, null, 2)}</pre>
      ) : (
        <p>Loading event...</p>
      )}
    </div>
  );
}
