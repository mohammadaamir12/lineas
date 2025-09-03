'use client'
export default function PropertyDetails({ params }) {
  const { id } = params;
  console.log('ssdsds',id);
  
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Property Details</h1>
      <p className="text-lg">Property ID: {id}</p>
    </div>
  );
}
