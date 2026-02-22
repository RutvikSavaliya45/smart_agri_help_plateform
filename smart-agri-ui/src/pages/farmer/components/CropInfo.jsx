import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CropInfo() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/crop-info/all")
      .then(res => setCrops(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading crop information...</p>;

  return (
    <section className="card card-pad">
      <h3>🌾 પાક માહિતી (Crop Information)</h3>

      {crops.map((c) => (
        <div key={c.id} className="crop-card">
          <h4>{c.cropName}</h4>
          <p>Season: {c.season}</p>
          <p>Soil: {c.soilType}</p>
          <p>Irrigation: {c.irrigation}</p>
          <p>Fertilizer: {c.fertilizer}</p>
          <p>Disease Control: {c.diseaseControl}</p>
        </div>
      ))}
    </section>
  );
}
