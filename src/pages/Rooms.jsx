import React, { useEffect, useState } from "react";
import { RoomsAPI } from "../services/api";
import { Link } from "react-router-dom";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    RoomsAPI.list().then((res) => setRooms(res.data.content));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Link
            to={`/rooms/${room.id}`}
            key={room.id}
            className="bg-white rounded shadow hover:shadow-xl"
          >
            <img src={room.hinhAnh} alt={room.tenPhong} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-bold">{room.tenPhong}</h3>
              <p className="text-sm">{room.khach} guests</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
