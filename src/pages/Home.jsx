import React, { useEffect, useState } from "react";
import { LocationsAPI, RoomsAPI } from "../services/api";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    // load tất cả phòng
    RoomsAPI.list().then((res) => {
      setRooms(res.data.content);
      setFilteredRooms(res.data.content);
    });

    // load danh sách vị trí
    LocationsAPI.list().then((res) => {
      setLocations(res.data.content);
    });
  }, []);

  const handleSearch = (keyword) => {
    const result = rooms.filter(
      (room) =>
        room.tenPhong.toLowerCase().includes(keyword.toLowerCase()) ||
        room.moTa.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredRooms(result);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <h2 className="text-xl font-bold mb-4">Danh sách phòng</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Link
            to={`/rooms/${room.id}`}
            key={room.id}
            className="bg-white rounded-lg shadow hover:shadow-xl overflow-hidden"
          >
            <img
              src={room.hinhAnh}
              alt={room.tenPhong}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold">{room.tenPhong}</h3>
              <p className="text-sm text-gray-600">{room.khach} khách</p>
              <p className="text-red-500 font-semibold">{room.giaTien} VND / đêm</p>
              <p className="text-yellow-500">⭐ {room.danhGia || 4.5}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
