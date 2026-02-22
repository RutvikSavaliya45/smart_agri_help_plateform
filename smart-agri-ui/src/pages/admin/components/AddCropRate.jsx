import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddCropRates() {

  // ---------- STATIC OPTIONS ----------
  const defaultYards = ["Rajkot", "Gondal", "Jetpur"];
  const defaultCrops = ["Wheat", "Cotton", "Groundnut"];

  // ---------- STATES ----------
  const [yards, setYards] = useState(defaultYards);
  const [crops, setCrops] = useState(defaultCrops);

  const [selectedYard, setSelectedYard] = useState("Rajkot");
  const [rates, setRates] = useState([]);

  const [newRate, setNewRate] = useState({
    cropName: "",
    highPrice: "",
    lowPrice: "",
    market: "Rajkot",
    rateDate: ""
  });

  const [newCrop, setNewCrop] = useState("");
  const [newYard, setNewYard] = useState("");

  const [editRate, setEditRate] = useState(null);

  // ---------- LOAD ----------
  useEffect(() => {
    fetchRates();
  }, [selectedYard]);

  const fetchRates = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/crop-rates/${selectedYard}`
    );
    setRates(res.data);
  };

  // ---------- ADD ----------
  const handleAdd = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8080/api/crop-rates/add",
      newRate
    );

    setNewRate({
      cropName: "",
      highPrice: "",
      lowPrice: "",
      market: selectedYard,
      rateDate: ""
    });

    fetchRates();
    alert("Crop rate added ✅");
  };

  // ---------- UPDATE ----------
  const handleUpdate = async () => {
    await axios.put(
      `http://localhost:8080/api/crop-rates/update/${editRate.id}`,
      editRate
    );
    setEditRate(null);
    fetchRates();
    alert("Updated successfully ✅");
  };

  // ---------- ADD NEW CROP ----------
  const addNewCrop = () => {
    if (newCrop && !crops.includes(newCrop)) {
      setCrops([...crops, newCrop]);
      setNewRate({ ...newRate, cropName: newCrop });
      setNewCrop("");
    }
  };

  // ---------- ADD NEW YARD ----------
  const addNewYard = () => {
    if (newYard && !yards.includes(newYard)) {
      setYards([...yards, newYard]);
      setSelectedYard(newYard);
      setNewRate({ ...newRate, market: newYard });
      setNewYard("");
    }
  };

  return (
    <section className="card card-pad">

      <h3>🌾 Crop Market Rates (Admin)</h3>

      {/* SELECT YARD (Farmer Style) */}
      <div style={{ marginBottom: 15 }}>
        <b>Select Yard:</b>{" "}
        <select
          value={selectedYard}
          onChange={(e) => {
            setSelectedYard(e.target.value);
            setNewRate({ ...newRate, market: e.target.value });
          }}
        >
          {yards.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>

        <input
          placeholder="Add new yard"
          value={newYard}
          onChange={(e) => setNewYard(e.target.value)}
          style={{ marginLeft: 10 }}
        />
        <button onClick={addNewYard}>➕</button>
      </div>

      {/* ADD FORM */}
      <form onSubmit={handleAdd} style={{ marginBottom: 25 }}>

        {/* CROP SELECT */}
        <b>Select Yard:</b>{" "}
        <select
          value={newRate.cropName}
          onChange={(e) =>
            setNewRate({ ...newRate, cropName: e.target.value })
          }
          required
        >
          <option value="">Select Crop</option>
          {crops.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          placeholder="Add new crop"
          value={newCrop}
          onChange={(e) => setNewCrop(e.target.value)}
        />
        <button type="button" onClick={addNewCrop}>➕</button>

        <br /><br />

        <input
          type="number"
          placeholder="High Price"
          value={newRate.highPrice}
          onChange={(e) =>
            setNewRate({ ...newRate, highPrice: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Low Price"
          value={newRate.lowPrice}
          onChange={(e) =>
            setNewRate({ ...newRate, lowPrice: e.target.value })
          }
          required
        />

        <input
          type="date"
          value={newRate.rateDate}
          onChange={(e) =>
            setNewRate({ ...newRate, rateDate: e.target.value })
          }
          required
        />

        <button type="submit">Add Rate</button>
      </form>

      {/* TABLE (Same as Farmer) */}
      <table className="table">
        <thead>
          <tr>
            <th>Crop</th>
            <th>High ₹</th>
            <th>Low ₹</th>
            <th>Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((r) => (
            <tr key={r.id}>
              <td>{r.cropName}</td>
              <td>₹{r.highPrice}</td>
              <td>₹{r.lowPrice}</td>
              <td>{r.rateDate}</td>
              <td>
                <button onClick={() => setEditRate(r)}>✏️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT */}
      {editRate && (
        <div style={{ marginTop: 20 }}>
          <h4>Edit Crop Rate</h4>

          <input
            value={editRate.cropName}
            onChange={(e) =>
              setEditRate({ ...editRate, cropName: e.target.value })
            }
          />

          <input
            type="number"
            value={editRate.highPrice}
            onChange={(e) =>
              setEditRate({ ...editRate, highPrice: e.target.value })
            }
          />

          <input
            type="number"
            value={editRate.lowPrice}
            onChange={(e) =>
              setEditRate({ ...editRate, lowPrice: e.target.value })
            }
          />

          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditRate(null)}>Cancel</button>
        </div>
      )}
    </section>
  );
}
