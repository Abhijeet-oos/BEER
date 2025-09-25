import React, { useEffect, useState } from "react";

export default function App() {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.sampleapis.com/beers/ale")
      .then((res) => res.json())
      .then((data) => {
        setBeers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching beers:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-bold mt-10">Loading beers...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-8">🍺 Ale Beers List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beers.map((beer) => (
          <div
            key={beer.id}
            className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl transition"
          >
            <img
              src={beer.image || "https://via.placeholder.com/150"}
              alt={beer.name}
              className="w-full h-48 object-contain rounded-md mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{beer.name}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Price:</span> {beer.price}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">ABV:</span> {beer.abv}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Type:</span> {beer.type}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Rating:</span>{" "}
              {beer.rating?.average} ⭐ ({beer.rating?.reviews})
            </p>
            {beer.brewery && (
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Brewery:</span> {beer.brewery}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-3">{beer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
