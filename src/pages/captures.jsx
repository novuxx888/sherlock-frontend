import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Captures() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "captures"), orderBy("createdAt", "desc"));

    return onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          url: data.url,                // ← ⭐ Use URL directly from Firestore
          createdAt: data.createdAt,
        };
      });

      setImages(list);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Captured Images</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="border rounded shadow">
            <img
              src={img.url}
              className="w-full h-40 object-cover"
              alt="captured"
            />
            <p className="text-xs text-gray-500 p-1">
              {img.createdAt?.toDate().toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
