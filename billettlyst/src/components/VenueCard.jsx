import '../styles/EventCard.scss';

export default function VenueCard({ name, image, country, city }) {
  return (
    <article className='event-card'>
      
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{country}</p>
      <p>{city}</p>
    </article>
  );
}