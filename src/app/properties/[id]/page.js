export default function PropertyPage({ params }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Property ID: {params.id}
      </h1>
      <p>This is the dynamic property details page 🚀</p>
    </div>
  );
}
