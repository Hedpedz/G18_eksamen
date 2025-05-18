import '../styles/EventCard.scss';
import regularHeartIcon from '../website_images/heart-regular.svg';
import solidHeartIcon from '../website_images/heart-solid.svg';

export default function EventCard({ id, name, date, image, link, showHeart, isSaved, onToggleSave}) {
  const heartIcon = isSaved ? solidHeartIcon : regularHeartIcon;
    return (
      <article className="event-card">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        {showHeart &&(
        <button
        onClick={() => onToggleSave(id)}
        className="heart-button"
        >
          <img src={heartIcon} 
          alt="Legg til i ønskeliste"
          className="heart-icon"/>
        </button>
      )}
        <p>{date}</p>
        <a href={`/event/${link}`}>Les mer</a>
      </article>
    );
  }
  