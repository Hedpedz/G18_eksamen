import '../styles/EventCard.scss';
import regularHeartIcon from '../website_images/heart-regular.svg';
import solidHeartIcon from '../website_images/heart-solid.svg';

export default function VenueCard({ id, name, image, country, city, showHeart, isSaved, onToggleSave }) {
  
  const heartIcon = isSaved ? solidHeartIcon : regularHeartIcon;


  return (
    <article className="event-card"
    aria-label={`Spillested: ${name}`}
    >
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {showHeart &&(
        <button
        onClick={() => onToggleSave(id)}
        className="heart-button"
        aria-label={
          isSaved 
          ? `Fjern ${name} fra ønskelisten`
          : `Legg til ${name} i ønskelisten`
        }
        >
          <img 
          src={heartIcon} 
          alt="Ikon for å legge til i ønskeliste"
          className="heart-icon"/>
        </button>
      )}
      <p>{country}</p>
      <p>{city}</p>
    </article>
  );
}