import { useParams, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

interface News {
  id: number;
  konu: string;
  icerik: string;
  haberLinki: string;
  gecerliliktarihi: string;
}

export default function NewsDetail() {
  const { id } = useParams(); // URL'den id al
  const location = useLocation();
  const navigate = useNavigate();
  
  // Öncelikli olarak location state'den al
  const stateNews = location.state?.news;

  const [news, setNews] = useState<News | null>(stateNews || null);
  const [loading, setLoading] = useState(!stateNews);

  useEffect(() => {
    if (!news && id) {
      // URL'den gelmiş ama state yoksa backend'den fetch et
      const fetchNews = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8080/etkinlikler/${id}`);
          setNews(response.data);
        } catch (error) {
          console.error("Haber fetch hatası:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchNews();
    }
  }, [id, news]);

  const closeModal = () => {
    navigate(location.state?.backgroundLocation?.pathname || "/kullanici/haberler");
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (!news) return <p>Haber bulunamadı</p>;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh] p-8">
        <button
          onClick={closeModal}
          className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold transition-colors"
          aria-label="Kapat"
        >
          &times;
        </button>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">{news.konu}</h2>
        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{news.icerik}</p>
        {news.haberLinki && (
          <div className="mt-6 text-right">
            <a
              href={news.haberLinki}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Haberi Dışarıda Gör
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
