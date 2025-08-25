import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

// Haber tipi
interface News {
  id: number;
  konu: string;
  icerik: string;
  gecerliliktarihi: string;
  haberLinki: string,
}

// Dummy veri
// const initialNews: News[] = [
//   {
//     id: 1,
//     konu: "Örnek Haber",
//     icerik: "Bu bir örnek haber içeriğidir.",
//     gecerliliktarihi: new Date().toISOString(),
//     haberLinki: "https://example.com/news/1",
//   },
// ];

const NewsAdminPanel: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [formData, setFormData] = useState<Partial<News>>({});

  // Input değişimlerini yönet
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Haberleri listeleme için backend’den çek ve state'ye aktar
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:8080/etkinlikler?type=NEWS");
        if (!response.ok) {
          throw new Error("Sunucu hatası!");
        }
        const data = await response.json();
        setNewsList(data);
      } catch (error) {
        console.error("Hata:", error);
      }
    }

    fetchNews();
  }, []);


  // Yeni haber ekle
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.konu || !formData.icerik) {
      alert("Lütfen gerekli alanları doldurun.");
      return;
    }

      const formValues = {
    type: "NEWS",
    konu: formData.konu!,
    icerik: formData.icerik!,
    haberLinki: "", // boş gönder
    gecerliliktarihi: new Date().toISOString(),
  }

     try {
    const response = await fetch("http://localhost:8080/etkinlikler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      throw new Error("Sunucu hatası!");
    }

    const data = await response.json();
    const updatedNews = { ...data, haberLinki: `http://localhost:5173/kullanici/haberler/${data.id}` };

        // 3️⃣ PUT isteği ile haberLinki’yi güncelle
    const updateResponse = await fetch(`http://localhost:8080/etkinlikler/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNews),
    });

    const finalSavedNews = await updateResponse.json();

        const newNews: News = {
      id: Date.now(),
      konu: data.konu!,
      icerik: data.icerik!,
      gecerliliktarihi: new Date().toISOString(),
      haberLinki: `http://localhost:5173/kullanici/haberler/${finalSavedNews.id}`,
    };
    
    setNewsList((prev) => [...prev, newNews]);
  } catch (error) {
    console.error("Hata:", error);
  }

    setFormData({});
    alert("Haber kaydedildi!");
  };

  // Haber güncelle
  const handleUpdate = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!selectedNews) return;
     // Backend için gönderilecek obje
  const updatedValues = {
    type: "NEWS", // backend single-table inheritance için
    konu: formData.konu!,
    icerik: formData.icerik!,
    haberLinki: `http://localhost:5173/kullanici/haberler/${selectedNews.id}`,
    gecerliliktarihi: new Date().toISOString(),
  };

    try {
    const response = await fetch(`http://localhost:8080/etkinlikler/${selectedNews.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedValues),
    });
     const data = await response.json();
    console.log("Backend yanıtı:", data);

    if (!response.ok) {
      throw new Error("Sunucu hatası!");
    }
    } catch (error) {
    console.error("Hata:", error);
  }


   

    setNewsList((prev) =>
      prev.map((n) => (n.id === selectedNews.id ? { ...n, ...formData, updatedAt: new Date().toISOString() } : n))
    );
    setSelectedNews(null);
    setFormData({});
    alert("Haber güncellendi!");
  };

  // Haber sil
 const handleDelete = async (id: number) => {
  if (!window.confirm("Haber silinsin mi?")) return;

  try {
    const response = await fetch(`http://localhost:8080/etkinlikler/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Sunucu hatası!");
    }

    // Backend’den başarılı yanıt geldiyse local state’i güncelle
    setNewsList((prev) => prev.filter((n) => n.id !== id));
    alert("Haber silindi!");
  } catch (error) {
    console.error("Hata:", error);
    alert("Haber silinirken bir hata oluştu!");
  }
};
  // Haber seç
  const handleSelect = (news: News) => {
    setSelectedNews(news);
    setFormData(news);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Haber Yönetim Paneli</h1>

      {/* Create / Update Form */}
      <form onSubmit={handleCreate} className="border p-4 rounded mb-6 shadow">
        <h2 className="text-xl font-semibold mb-2">{selectedNews ? "Haber Güncelle" : "Yeni Haber Ekle"}</h2>
        <div className="mb-2">
          <label className="block font-medium">Başlık *</label>
          <input
            type="text"
            name="konu"
            value={formData.konu || ""}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium">İçerik *</label>
          <textarea
            name="icerik"
            value={formData.icerik || ""}
            onChange={handleChange}
            className="border rounded w-full p-2 h-32"
          />
        </div>

        <div className="flex gap-2">
          {selectedNews ? (
            <button onClick={handleUpdate} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
              Güncelle
            </button>
          ) : (
            <button type="submit" className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
              Kaydet
            </button>
          )}
          <button
            onClick={() => {
              setFormData({});
              setSelectedNews(null);
            }}
            className="cursor-pointer bg-gray-300 px-4 py-2 rounded"
          >
            İptal
          </button>
        </div>
      </form>

      {/* Haber Listesi */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Haber Listesi</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Başlık</th>
              <th className="border px-2 py-1">Geçerlilik Tarihi</th>
              <th className="border px-2 py-1">Haber Linki</th>
              <th className="border px-2 py-1">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr key={news.id}>
                <td className="border px-2 py-1">{news.konu}</td>
                <td className="border px-2 py-1">{new Date(news.gecerliliktarihi).toLocaleDateString()}</td>
                <td className="border px-2 py-1">
                  <NavLink to={news.haberLinki}  className="text-blue-600 hover:underline">
                    Haberi Gör
                  </NavLink>
                </td>
                <td className="border px-2 py-1 flex gap-2">
                  <button
                    onClick={() => handleSelect(news)}
                    className="cursor-pointer bg-yellow-400 px-2 py-1 rounded"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(news.id)}
                    className="cursor-pointer bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
            {newsList.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-2">
                  Haber bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsAdminPanel;
