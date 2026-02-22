import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/crop-info";

export default function CropInfo() {
  const [crops, setCrops] = useState([]);
  const [editId, setEditId] = useState(null);

  const [cropName, setCropName] = useState("");
  const [season, setSeason] = useState("");
  const [soilType, setSoilType] = useState("");
  const [irrigation, setIrrigation] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [diseaseControl, setDiseaseControl] = useState("");

  const loadCrops = async () => {
    const res = await axios.get(`${API}/all`);
    setCrops(res.data);
  };

  useEffect(() => {
    loadCrops();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      cropName,
      season,
      soilType,
      irrigation,
      fertilizer,
      diseaseControl,
    };

    if (editId) {
      await axios.put(`${API}/update/${editId}`, data);
      alert("Crop updated ✅");
    } else {
      await axios.post(`${API}/add`, data);
      alert("Crop added ✅");
    }

    setEditId(null);
    setCropName("");
    setSeason("");
    setSoilType("");
    setIrrigation("");
    setFertilizer("");
    setDiseaseControl("");

    loadCrops();
  };

  const editCrop = (c) => {
    setEditId(c.id);
    setCropName(c.cropName);
    setSeason(c.season);
    setSoilType(c.soilType);
    setIrrigation(c.irrigation);
    setFertilizer(c.fertilizer);
    setDiseaseControl(c.diseaseControl);
  };

  const deleteCrop = async (id) => {
    if (window.confirm("Delete this crop info?")) {
      await axios.delete(`${API}/delete/${id}`);
      loadCrops();
    }
  };

  return (
    <section className="card card-pad">
      <h3>🌾 Crop Information (Admin)</h3>

      <form onSubmit={submit}>
        <input className="input" placeholder="Crop Name"
          value={cropName} onChange={(e) => setCropName(e.target.value)} />

        <input className="input" placeholder="Season"
          value={season} onChange={(e) => setSeason(e.target.value)} />

        <input className="input" placeholder="Soil Type"
          value={soilType} onChange={(e) => setSoilType(e.target.value)} />

        <input className="input" placeholder="Irrigation"
          value={irrigation} onChange={(e) => setIrrigation(e.target.value)} />

        <input className="input" placeholder="Fertilizer"
          value={fertilizer} onChange={(e) => setFertilizer(e.target.value)} />

        <input className="input" placeholder="Disease Control"
          value={diseaseControl} onChange={(e) => setDiseaseControl(e.target.value)} />

        <button className="btn btn-green">
          {editId ? "Update Crop" : "Add Crop"}
        </button>
      </form>

      <hr />

      <h4>📋 Existing Crops</h4>

      {crops.map((c) => (
        <div key={c.id} className="list-item">
          <strong>{c.cropName}</strong>
          <p>Season: {c.season}</p>
          <p>Soil: {c.soilType}</p>
          <p>Irrigation: {c.irrigation}</p>
          <p>Fertilizer: {c.fertilizer}</p>
          <p>Disease Control: {c.diseaseControl}</p>

          <button className="btn" onClick={() => editCrop(c)}>Edit</button>
          <button className="btn btn-red" onClick={() => deleteCrop(c.id)}>
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}
