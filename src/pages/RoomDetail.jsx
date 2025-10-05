import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoomsAPI, BookingAPI } from "../services/api";

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    ngayDen: "",
    ngayDi: "",
    soLuongKhach: 1,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    RoomsAPI.get(id).then((res) => setRoom(res.data.content));
  }, [id]);

  // Tính tổng tiền mỗi khi thay đổi ngày hoặc số khách
  useEffect(() => {
    if (room && bookingData.ngayDen && bookingData.ngayDi) {
      const checkIn = new Date(bookingData.ngayDen);
      const checkOut = new Date(bookingData.ngayDi);
      const nights = Math.max(
        (checkOut - checkIn) / (1000 * 60 * 60 * 24),
        0
      ); // số ngày
      setTotalPrice(nights * room.giaTien);
    }
  }, [bookingData, room]);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBook = () => {
    if (!bookingData.ngayDen || !bookingData.ngayDi) {
      alert("Vui lòng chọn ngày nhận phòng và trả phòng!");
      return;
    }

    BookingAPI.create({
      maPhong: id,
      ngayDen: bookingData.ngayDen,
      ngayDi: bookingData.ngayDi,
      soLuongKhach: bookingData.soLuongKhach,
    })
      .then(() => alert("Đặt phòng thành công!"))
      .catch(() => alert("Đặt phòng thất bại!"));
  };

  if (!room) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <img
        src={room.hinhAnh}
        alt={room.tenPhong}
        className="w-full h-60 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{room.tenPhong}</h1>
      <p className="text-gray-700">{room.moTa}</p>

      {/* Giá & đánh giá */}
      <p className="mt-2 text-lg font-semibold text-red-500">
        Giá: {room.giaTien.toLocaleString()} VND / đêm
      </p>
      <p className="mt-1 text-yellow-500">⭐ {room.danhGia || 4.5}</p>

      {/* Tiện nghi */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Tiện nghi</h3>
        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          {room.wifi && <li>📶 Wifi</li>}
          {room.bep && <li>🍳 Bếp</li>}
          {room.dieuHoa && <li>❄️ Điều hòa</li>}
          {room.mayGiat && <li>🧺 Máy giặt</li>}
          {room.tv && <li>📺 TV</li>}
          {room.hoBoi && <li>🏊 Hồ bơi</li>}
          {room.doXe && <li>🚗 Chỗ đỗ xe</li>}
        </ul>
      </div>

      {/* Form đặt phòng */}
      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold mb-2">Đặt phòng</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Ngày nhận phòng</label>
            <input
              type="date"
              name="ngayDen"
              value={bookingData.ngayDen}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Ngày trả phòng</label>
            <input
              type="date"
              name="ngayDi"
              value={bookingData.ngayDi}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Số lượng khách</label>
            <input
              type="number"
              name="soLuongKhach"
              min="1"
              value={bookingData.soLuongKhach}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Tổng tiền */}
        {totalPrice > 0 && (
          <p className="mt-4 text-lg font-bold text-green-600">
            Tổng tiền: {totalPrice.toLocaleString()} VND
          </p>
        )}

        <button
          onClick={handleBook}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Đặt phòng
        </button>
      </div>
    </div>
  );
}
