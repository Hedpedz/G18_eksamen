import "../styles/EventCard.scss";
import regularHeartIcon from "../website_images/heart-regular.svg";
import solidHeartIcon from "../website_images/heart-solid.svg";
import "../pages/Home"

export default function AttractionCard({ id, name, image, showHeart, isSaved, onToggleSave }) {

  const heartIcon = isSaved ? solidHeartIcon : regularHeartIcon;

  return (
    <article className="event-card"
    aria-label={`Attraksjon: ${name}`}
    >
    <img src={image} alt={name}/>
      <h3>{name}</h3>
      {showHeart &&(
        <button
        onClick={() => onToggleSave(id)}
        className= "heart-button"
         aria-label={
          isSaved 
          ? `Fjern ${name} fra ønskelisten`
          : `Legg til ${name} i ønskelisten`
        }
        
        >
          <img src={heartIcon} 
          alt="Legg til i ønskeliste"
          className = "heart-icon"/>
        </button>
      )}
    </article>
  );
}
