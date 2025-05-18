export default function CityEventCard({ name, image, country, city, date }) {
    return (
      <article className="event-card">
        {image && <img src={image} alt={name} />}
        <h3>{name}</h3>
        <p>{date}</p>
        <p>{city}, {country}</p>
      </article>
    );
  }