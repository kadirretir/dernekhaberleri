import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Duyuru tipi
interface Announcement {
  type: string,
  id: number;
  konu: string;
  icerik: string;
  gecerliliktarihi: string;
  resim: string,
}


const AnnouncementsAdminPanel: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState<Partial<Announcement>>({});
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();
  

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value, files } = e.target as HTMLInputElement;
  if (files) {
    setFile(files[0]);
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

   useEffect(() => {
      const fetchAnnouncements = async () => {
        try {
          const response = await fetch("http://localhost:8080/etkinlikler?type=ANNOUNCEMENT");
          if (!response.ok) {
            throw new Error("Sunucu hatası!");
          }
          const data = await response.json();
    
          setAnnouncements(data);
        } catch (error) {
          console.error("Duyurular yüklenirken hata oluştu:", error);
        }
      }
  
      fetchAnnouncements();
    }, []);

  // Yeni duyuru ekle
  const handleCreate = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!formData.konu || !formData.icerik || !file) {
      alert("Lütfen gerekli alanları doldurun.");
      return;
    }

  
    const newAnnouncement: Announcement = {
      type: "ANNOUNCEMENT",
      id: Date.now(),
      konu: formData.konu!,
      icerik: formData.icerik!,
      resim: formData.resim || "",
      gecerliliktarihi: new Date().toISOString(),
    };

    


  const formValues = {
    type: "ANNOUNCEMENT",
    konu: formData.konu!,
    icerik: formData.icerik!,
    resim: formData.resim || "",
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
  // 2️⃣ Resim dosyasını upload et
    const formDataFile = new FormData();
    formDataFile.append("file", file);
      formDataFile.append("etkinlikId", data.id);

    const uploadResponse = await fetch("http://localhost:8080/etkinlikler/upload", {
      method: "POST",
      body: formDataFile,
    });
  const uploadedAnnouncement = await uploadResponse.json();
     console.log("Kaydedilen duyuru:", uploadedAnnouncement);
  } catch (error) {
    console.error("Hata:", error);
  }

     navigate("/kullanici/duyurular");
    
    setAnnouncements((prev) => [...prev, newAnnouncement]);
    setFormData({});
    alert("Duyuru kaydedildi!");
  };

  // Duyuru güncelle
 const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!selected) return;
  if (!formData.konu || !formData.icerik) {
    alert("Lütfen gerekli alanları doldurun.");
    return;
  }

  try {
    // 1) JSON verisini güncelle
    const response = await fetch(`http://localhost:8080/etkinlikler/${selected.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...selected,
        konu: formData.konu,
        icerik: formData.icerik,
        gecerliliktarihi: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error("Sunucu hatası!");

    const updatedAnnouncement = await response.json();

    // 2) Resim değiştiyse upload et
    if (file) {
      const formDataFile = new FormData();
      formDataFile.append("file", file);
      formDataFile.append("etkinlikId", String(updatedAnnouncement.id));

      const uploadResponse = await fetch("http://localhost:8080/etkinlikler/upload", {
        method: "POST",
        body: formDataFile,
      });

      if (!uploadResponse.ok) throw new Error("Resim yükleme hatası!");

      const uploaded = await uploadResponse.json();
      updatedAnnouncement.resim = uploaded.resim;
    }

    // 3) State güncelle
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === updatedAnnouncement.id ? updatedAnnouncement : a))
    );

    setSelected(null);
    setFormData({});
    setFile(null);
    alert("Duyuru güncellendi!");
  } catch (error) {
    console.error("Hata:", error);
    alert("Duyuru güncellenirken hata oluştu!");
  }
};

 // Duyuru sil
const handleDelete = async (id: number) => {
  if (!window.confirm("Duyuru silinsin mi?")) return;

  try {
    const response = await fetch(`http://localhost:8080/etkinlikler/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Sunucu hatası!");
    }

    // Backend’den başarılı yanıt geldiyse local state’i güncelle
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    alert("Duyuru silindi!");
  } catch (error) {
    console.error("Hata:", error);
    alert("Duyuru silinirken bir hata oluştu!");
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
      <form onSubmit={handleCreate} className="border p-4 rounded mb-6 shadow">
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
            <button type="submit" className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
              Kaydet
            </button>
          )}
          <button
            onClick={() => {
              setFormData({});
              setSelected(null);
            }}
            className="cursor-pointer bg-gray-300 px-4 py-2 rounded"
          >
            İptal
          </button>
        </div>
      </form>

      {/* Liste */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Duyuru Listesi</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Konu</th>
              <th className="border px-2 py-1">Geçerlilik Tarihi</th>
               <th className="border px-2 py-1">Resim</th>
              <th className="border px-2 py-1">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a) => (
           
              <tr key={a.id}>
                <td className="border px-2 py-1">{a.konu}</td>
                <td className="border px-2 py-1">{new Date(a.gecerliliktarihi).toLocaleDateString()}</td>
                  <td className="border px-2 py-1">
                    <img
                    className="w-25 h-25 w-full object-cover"
                    src={`${import.meta.env.VITE_BACKEND_URL}/${a.resim}`} alt={a.konu} />
                    
                    </td>
                
                <td className="border px-2 py-1 flex gap-2">
                  <button
                    onClick={() => handleSelect(a)}
                    className="cursor-pointer bg-yellow-400 px-2 py-1 rounded"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="cursor-pointer bg-red-500 text-white px-2 py-1 rounded"
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
