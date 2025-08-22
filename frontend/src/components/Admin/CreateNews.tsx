import React, { useState } from "react";

// Haber tipi
interface News {
  id: number;
  konu: string;
  icerik: string;
  gecerliliktarihi: string;
  haberlinki: string,
}

// Dummy veri
const initialNews: News[] = [
  {
    id: 1,
    konu: "Örnek Haber",
    icerik: "Bu bir örnek haber içeriğidir.",
    gecerliliktarihi: new Date().toISOString(),
    haberlinki: "https://example.com/news/1",
  },
];

const NewsAdminPanel: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>(initialNews);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [formData, setFormData] = useState<Partial<News>>({});

  // Input değişimlerini yönet
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Yeni haber ekle
  const handleCreate = () => {
    if (!formData.konu || !formData.icerik) {
      alert("Lütfen gerekli alanları doldurun.");
      return;
    }
    const newNews: News = {
      id: Date.now(),
      konu: formData.konu!,
      icerik: formData.icerik!,
      gecerliliktarihi: formData.gecerliliktarihi!,
      haberlinki: formData.haberlinki || "",
    };
    setNewsList((prev) => [...prev, newNews]);
    setFormData({});
    alert("Haber kaydedildi!");
  };

  // Haber güncelle
  const handleUpdate = () => {
    if (!selectedNews) return;
    setNewsList((prev) =>
      prev.map((n) => (n.id === selectedNews.id ? { ...n, ...formData, updatedAt: new Date().toISOString() } : n))
    );
    setSelectedNews(null);
    setFormData({});
    alert("Haber güncellendi!");
  };

  // Haber sil
  const handleDelete = (id: number) => {
    if (window.confirm("Haber silinsin mi?")) {
      setNewsList((prev) => prev.filter((n) => n.id !== id));
      alert("Haber silindi!");
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
      <div className="border p-4 rounded mb-6 shadow">
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
            <button onClick={handleCreate} className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
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
      </div>

      {/* Haber Listesi */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Haber Listesi</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Başlık</th>
              <th className="border px-2 py-1">Geçerlilik Tarihi</th>
              <th className="border px-2 py-1">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr key={news.id}>
                <td className="border px-2 py-1">{news.konu}</td>
                <td className="border px-2 py-1">{news.gecerliliktarihi}</td>
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
