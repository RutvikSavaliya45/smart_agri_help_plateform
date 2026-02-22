import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CropRates() {
  const [selectedYard, setSelectedYard] = useState("Rajkot");
  const [cropRates, setCropRates] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 API CALL whenever yard changes
  useEffect(() => {
    fetchCropRates();
  }, [selectedYard]);

  const fetchCropRates = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/crop-rates/${selectedYard}`
      );
      setCropRates(res.data);
    } catch (error) {
      console.error("Error fetching crop rates", error);
      setCropRates([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card card-pad">
      <h3 style={{ marginBottom: 10 }}>🌾 Crop Market Rates</h3>

      {/* Yard Select */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>
          Select Yard:
        </label>
        <select
          value={selectedYard}
          onChange={(e) => setSelectedYard(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="Rajkot">Rajkot</option>
          <option value="Gondal">Gondal</option>
          <option value="Jetpur">Jetpur</option>
          <option value="Morbi">Morbi</option>
          <option value="Junagadh">Junagadh</option>
          <option value="Amreli">Amreli</option>
          <option value="Bhavnagar">Bhavnagar</option>
          <option value="Surendranagar">Surendranagar</option>
          
        </select>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Crop</th>
              <th>High Price (₹)</th>
              <th>Low Price (₹)</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : cropRates.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No crop rates available
                </td>
              </tr>
            ) : (
              cropRates.map((item) => (
                <tr key={item.id}>
                  <td>{item.cropName}</td>
                  <td>₹{item.highPrice}</td>
                  <td>₹{item.lowPrice}</td>
                  <td>{item.rateDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
