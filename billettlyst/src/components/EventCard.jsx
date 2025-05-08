export default function EventCard({ name, date, image, link }) {
    return (
      <div className="event-card" style={{ width: "25%", height: "auto" }}>
        <img src={image} alt={name} style={{ width: "100%", height: "auto" }} />
        <h3>{name}</h3>
        <p>{date}</p>
        <a href={link} target="_blank" >Les mer</a>
      </div>
    );
  }
  