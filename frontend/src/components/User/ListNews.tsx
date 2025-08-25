import { NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

interface News {
  id: number;
  konu: string;
  icerik: string;
  // Backend’den başka alan geliyorsa buraya ekleyebilirsin
}

export default function ListNews() {
  const location = useLocation();
  const [data, setData] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<News[]>(
          "http://localhost:8080/etkinlikler?type=NEWS"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-8">
      <div className="w-full max-w-5xl space-y-8">
        <h2 className="text-5xl font-bold text-gray-800 text-center mb-8">
          Haberler
        </h2>
        <ul className="space-y-6">
          {data.length > 0 ? (
            data.map((news) => (
              <NavLink
                key={news.id}
                to={`/kullanici/haberler/${news.id}`}
                state={{ news, backgroundLocation: location }}
                className="block p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-300 hover:border-blue-500"
              >
                <h3 className="text-2xl text-center font-semibold text-gray-900 mb-4">
                  {news.konu}
                </h3>
                <p className="text-gray-700 text-lg line-clamp-5">
                  {news.icerik}
                </p>
              </NavLink>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Henüz haber bulunamadı.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
