// src/components/NotFound.tsx
import { Link, useLocation } from "react-router";

const NotFound: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center">
        <p className="text-sm uppercase tracking-widest text-slate-400">Hata</p>
        <h1 className="mt-2 text-7xl font-extrabold tracking-tight text-slate-800 dark:text-white">
          404
        </h1>
        <h2 className="mt-3 text-2xl font-semibold text-slate-700 dark:text-slate-200">
          Sayfa bulunamadı
        </h2>

        <p className="mt-4 text-slate-500 dark:text-slate-400">
          <span className="font-mono text-xs bg-slate-200/70 dark:bg-slate-800/60 rounded px-2 py-1">
            {pathname}
          </span>{" "}
          adresine ulaşılamadı ya da taşınmış olabilir.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold shadow-sm border border-slate-300 bg-white hover:bg-slate-50 active:scale-[.99] dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
          >
            Ana Sayfa
          </Link>

          <Link
            to="/admin/haberekle"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold shadow-sm bg-blue-600 text-white hover:bg-blue-700 active:scale-[.99]"
          >
            Admin / Haber Ekle
          </Link>

          <Link
            to="/kullanici/haberler"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold shadow-sm bg-slate-900 text-white hover:bg-black active:scale-[.99]"
          >
            Kullanıcı / Haberler
          </Link>
        </div>

        <div className="mt-10">
          <div className="mx-auto h-px w-24 bg-slate-300/70 dark:bg-slate-700/60" />
          <p className="mt-3 text-xs text-slate-400">
            Eğer bunun bir hata olduğunu düşünüyorsanız lütfen yönlendirmeleri kontrol edin.
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
