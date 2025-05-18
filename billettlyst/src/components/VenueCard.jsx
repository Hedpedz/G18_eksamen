export default function VenueCard({ name, image, country, city }) {
  return (
    <article className="event-card">
      <h1>{name}</h1>
      <img src={image} alt={name}/>
      <p>{country}</p>
      <p>{city}</p>
    </article>
  );
}
