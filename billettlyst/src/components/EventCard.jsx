import '../styles/EventCard.scss';

export default function EventCard({ name, date, image, link }) {
    return (
      <article className="event-card">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>{date}</p>
        <a href={`/event/${link}`}>Les mer</a>
      </article>
    );
  }
  