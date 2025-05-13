import { useEffect, useState } from "react";
export default function Home() {

    const [events, setEvents] = useState([]);
    const [city, setCity] = useState(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
              const response = await fetch(
                `https://app.ticketmaster.com/discovery/v2/events?apikey=An0Gfh3JYmKpW5rJIqCetXQuRadlfUhp&city=Paris&size=10`
              );
              const json = await response.json();
              setEvents(json);
              console.log(events);
            } catch (error) {
              console.error("Fetch error:", error);
            }
          }
    
          fetchEvents();
      }, []);

    return (
    <>
        {events ? (
        
        <pre>{JSON.stringify(events, null, 2)}</pre>
      ) : (
        <p>Loading event...</p>
      )}
    </>  
    )
}
