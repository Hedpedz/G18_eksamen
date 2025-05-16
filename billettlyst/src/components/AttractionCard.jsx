export default function AttractionCard({ name, image }) {
  return (
    <article>
    <img src={image} alt={name} style={{ width: "25%", height: "auto" }} />
      <h1>{name}</h1>
    </article>
  );
}
