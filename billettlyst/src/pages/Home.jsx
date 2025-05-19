import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import CityEventCard from "../components/CityEventCard";
import "../styles/CategoryPage.scss";

const FESTIVAL_SEARCH_WORDS = [
    "Tons of Rock",
    "Findings festival",
    "Neon festival",
    "Skeikampenfestivalen"
];
const API_Key = "An0Gfh3JYmKpW5rJIqCetXQuRadlfUhp";

export default function Home() {
    const [festivalItems, setFestivalItems] = useState(null);
    const [cityEvents, setCityEvents] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        (async () => {
            const results = [];
            for (const term of FESTIVAL_SEARCH_WORDS) {
                await wait(100);
                
                const apiUrl = `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${API_Key}&preferredCountry=NO&keyword=${term}&size=1`;
                
                const response = await fetch(apiUrl);
                
                if (response.ok) { 
                    const jsonData = await response.json();
                    if (jsonData?._embedded?.attractions?.[0]) {
                        results.push(jsonData._embedded.attractions[0]);
                    }
                }
            }
            setFestivalItems(results);
        })();
    }, []);

    const fetchCityEvents = async (city) => {
        setSelectedCity(city);
        setCityEvents([]);
        const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_Key}&city=${city}&size=10&sort=date,asc`;
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const jsonData = await response.json();
                setCityEvents(jsonData?._embedded?.events || []);
            } else {
                setCityEvents([]);
            }
        } catch (error) {
            setCityEvents([]);
        }
    };

    return (
        <>
        <h1>Utvalgte Festivaler</h1>
        <section className="EventContainer">
            {!festivalItems ? (
                <p>Laster festivaler...</p>
            ) : (
                festivalItems.map((item) => {
                    const img = item.images?.[0]?.url; 
                    const dateInfo = item.upcomingEvents?._total > 0
                        ? `Kommende arrangementer: ${item.upcomingEvents._total}`
                        : null;

                    return (
                        <EventCard
                            key={item.id} 
                            name={item.name}
                            image={img}
                            link={item.id}
                            date={dateInfo}
                        />
                    );
                })
            )}
            </section>


            
            <h2>Opplevelser i Storbyer</h2>
            <article className="city-buttons">
                <button onClick={() => fetchCityEvents("Oslo")}>Oslo</button>
                <button onClick={() => fetchCityEvents("Berlin")}>Berlin</button>
                <button onClick={() => fetchCityEvents("London")}>London</button>
                <button onClick={() => fetchCityEvents("Paris")}>Paris</button>
            </article>

            {selectedCity && (
                <h3>I {selectedCity} kan du oppleve:</h3>
            )}
            <section className="EventContainer">
            {cityEvents.length > 0 ? (
                cityEvents.map((event) => {
                    const imageUrl = event.images?.[0]?.url;
                    const eventDate = event.dates?.start?.localDate;
                    const eventCity = event._embedded?.venues?.[0]?.city?.name;
                    const eventCountry = event._embedded?.venues?.[0]?.country?.name;

                    return (
                        <CityEventCard
                            key={event.id}
                            name={event.name}
                            image={imageUrl}
                            date={eventDate}
                            city={eventCity}
                            country={eventCountry}
                        />
                    );
                })
            ) : (
                selectedCity && <p>Laster arrangementer for {selectedCity} eller ingen funnet...</p>
            )}
            </section>
        </>
    );
}