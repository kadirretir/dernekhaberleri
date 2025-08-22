import React, { useState } from "react";

// Duyuru tipi
interface Announcement {
  id: number;
  konu: string;
  icerik: string;
  gecerliliktarihi: string;
  resim: string,
}

// Dummy veri
const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    konu: "Örnek Duyuru",
    icerik: "Bu bir örnek duyuru içeriğidir.",
    resim: "https://example.com/announcement/1",
    gecerliliktarihi: new Date().toISOString(),
  },
];

const AnnouncementsAdminPanel: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState<Partial<Announcement>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Yeni duyuru ekle
  const handleCreate = () => {
    if (!formData.konu || !formData.icerik) {
      alert("Lütfen gerekli alanları doldurun.");
      return;
    }
    const newAnnouncement: Announcement = {
      id: Date.now(),
      konu: formData.konu!,
      icerik: formData.icerik!,
      resim: formData.resim || "",
      gecerliliktarihi: new Date().toISOString(),
    };
    setAnnouncements((prev) => [...prev, newAnnouncement]);
    setFormData({});
    alert("Duyuru kaydedildi!");
  };

  // Duyuru güncelle
  const handleUpdate = () => {
    if (!selected) return;
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === selected.id ? { ...a, ...formData, updatedAt: new Date().toISOString() } : a))
    );
    setSelected(null);
    setFormData({});
    alert("Duyuru güncellendi!");
  };

  // Duyuru sil
  const handleDelete = (id: number) => {
    if (window.confirm("Duyuru silinsin mi?")) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      alert("Duyuru silindi!");
    }
  };

  const handleSelect = (a: Announcement) => {
    setSelected(a);
    setFormData(a);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Duyuru Yönetim Paneli</h1>

      {/* Form */}
      <div className="border p-4 rounded mb-6 shadow">
        <h2 className="text-xl font-semibold mb-2">{selected ? "Duyuru Güncelle" : "Yeni Duyuru Ekle"}</h2>
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

            <div className="mb-2">
          <label className="block font-medium">Resim Yükle *</label>

<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
<input 
  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
  aria-describedby="file_input_help"
  id="file_input" 
  name="resim"
  value={formData.resim || ""}
  onChange={handleChange}
  type="file" />
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

        </div>

        <div className="flex gap-2">
          {selected ? (
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
              Güncelle
            </button>
          ) : (
            <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded">
              Kaydet
            </button>
          )}
          <button
            onClick={() => {
              setFormData({});
              setSelected(null);
            }}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            İptal
          </button>
        </div>
      </div>

      {/* Liste */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Duyuru Listesi</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Başlık</th>
              <th className="border px-2 py-1">Geçerlilik Tarihi</th>
              <th className="border px-2 py-1">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a) => (
              <tr key={a.id}>
                <td className="border px-2 py-1">{a.konu}</td>
                       <td className="border px-2 py-1">{a.gecerliliktarihi}</td>
                <td className="border px-2 py-1 flex gap-2">
                  <button
                    onClick={() => handleSelect(a)}
                    className="bg-yellow-400 px-2 py-1 rounded"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
            {announcements.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-2">
                  Duyuru bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnnouncementsAdminPanel;
