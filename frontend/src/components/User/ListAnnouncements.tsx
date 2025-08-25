import React, { useEffect, useState } from "react";

interface Announcement {
  id: number;
  konu: string;
  icerik: string;
  resim: string;
  gecerliliktarihi: string;
}

const ListAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/etkinlikler?type=ANNOUNCEMENT"
        );
        if (!response.ok) throw new Error("Sunucu hatası!");
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Hata:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
  <>
  <div className="flex justify-center items-start min-h-screen bg-gray-50 p-8">
    <div className="w-full max-w-6xl space-y-8">
      <h2 className="text-5xl font-bold text-gray-800 text-center mb-8">Duyurular</h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {announcements.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            Henüz duyuru bulunamadı.
          </p>
        )}

        {announcements.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-300 hover:border-blue-500 overflow-hidden"
          >
            {a.resim && (
              <img
                src={`http://localhost:8080/${a.resim}`}
                alt={a.konu}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                {a.konu}
              </h3>
              <p className="text-gray-700 text-lg line-clamp-5 mb-3">
                {a.icerik}
              </p>
              <p className="text-gray-400 text-sm text-center">
                Geçerlilik:{" "}
                {new Date(a.gecerliliktarihi).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</>

  );
};

export default ListAnnouncements;
