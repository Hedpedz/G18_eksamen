import '../styles/EventCard.scss';

export default function AttractionCard({ name, image }) {
  return (
    <article className="event-card">
    <img src={image} alt={name} />
      <h1>{name}</h1>
    </article>
  );
}
