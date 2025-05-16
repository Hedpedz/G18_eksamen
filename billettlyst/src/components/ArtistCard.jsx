import '../styles/EventCard.scss';

export default function ArtistCard({ name, image, genre }) {
  return (
    <article className="event-card">
    <img src={image} alt={name} />
      <h2>{name}</h2>
      <h4>{genre}</h4>
    </article>
  );
}
