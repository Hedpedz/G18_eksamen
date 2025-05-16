export default function VenueCard({ name, image, country, city }) {
  return (
    <article>
      <h1>{name}</h1>
      <img src={image} alt={name} style={{ width: "25%", height: "auto" }} />
      <p>{country}</p>
      <p>{city}</p>
    </article>
  );
}
