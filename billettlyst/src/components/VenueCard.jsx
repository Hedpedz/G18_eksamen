import '../styles/EventCard.scss';
import regularHeartIcon from '../website_images/heart-regular.svg';
import solidHeartIcon from '../website_images/heart-solid.svg';

export default function VenueCard({ id, name, image, country, city, showHeart, isSaved, onToggleSave }) {
  
  const heartIcon = isSaved ? solidHeartIcon : regularHeartIcon;


  return (
    <article className='event-card'>
      
      <img src={image} alt={name} />
      <h2>{name}</h2>
      {showHeart &&(
        <button
        onClick={() => onToggleSave(id)}
        className="heart-button"
        >
          <img 
          src={heartIcon} 
          alt="Legg til i ønskeliste"
          className="heart-icon"/>
        </button>
      )}
      
      <p>{country}</p>
      <p>{city}</p>
    </article>
  );
}