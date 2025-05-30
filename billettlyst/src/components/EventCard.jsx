import '../styles/EventCard.scss';
import regularHeartIcon from '../website_images/heart-regular.svg';
import solidHeartIcon from '../website_images/heart-solid.svg';

export default function EventCard({ id, name, date, image, country, city, showHeart, isSaved, onToggleSave}) {
  const heartIcon = isSaved ? solidHeartIcon : regularHeartIcon;
    return (
      <article className="event-card"
      aria-label={`Event: ${name}`}
      >
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <h3>{city}</h3>
        <h3>{country}</h3>
        <h3>{date}</h3>
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
          <img src={heartIcon} 
          alt="Legg til i ønskeliste"
          className="heart-icon"/>
        </button>
      )}
        
      </article>
    );
  }
  