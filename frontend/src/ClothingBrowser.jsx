// src/ClothingBrowser.jsx
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5010";

const ClothingBrowser = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");

        fetch(`${API_BASE}/api/fakestore-test`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                // data = { count, items: [...] }
                setItems(data.items || []);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load products");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p>Loading clothing…</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!items.length) {
        return <p>No products found.</p>;
    }

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Clothing from Fake Store</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "1rem",
                }}
            >
                {items.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "0.5rem",
                        }}
                    >
                        <img
                            src={p.image}
                            alt={p.title}
                            style={{
                                width: "100%",
                                height: "180px",
                                objectFit: "contain",
                                marginBottom: "0.5rem",
                            }}
                        />
                        <h4 style={{ fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                            {p.title}
                        </h4>
                        <p style={{ margin: 0, fontWeight: "bold" }}>${p.price}</p>
                        <p style={{ fontSize: "0.8rem", color: "#666" }}>{p.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClothingBrowser;
