import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const SEARCH_WORDS = [
    "Tons of Rock",
    "Findings festival",
    "Neon festival",
    "Skeikampenfestivalen"
];
const API_Key = "An0Gfh3JYmKpW5rJIqCetXQuRadlfUhp";

export default function Home() {
    const [items, setItems] = useState(null);

    useEffect(() => {
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        (async () => {
            const results = [];
            for (const term of SEARCH_WORDS) {
                await wait(100); 
                
                const apiUrl = `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${API_Key}&preferredCountry=NO&keyword=${term}&size=1&sort=relevance,desc`;
                
                const response = await fetch(apiUrl);
                
                if (response.ok) { 
                    const jsonData = await response.json();
                    if (jsonData?._embedded?.attractions?.[0]) {
                        results.push(jsonData._embedded.attractions[0]);
                    }
                }
            }
            setItems(results);
        })();
    }, []);

    if (!items) {
        return (
            <>
                <h1>Utvalgte Festivaler</h1>
                <p>Laster...</p>
            </>
        );
    }
    
    return (
        <>
            <h1>Utvalgte Festivaler</h1>
            {items.map((item) => {
                const img = item.images?.[0]?.url; 
                const dateInfo = item.upcomingEvents?._total > 0
                    ? `Kommende: ${item.upcomingEvents._total}`
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
            })}
        </>
    );
}