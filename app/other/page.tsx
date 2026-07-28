import Link from "next/link";
import { ArrowLeft, MoreHorizontal, ExternalLink, ShieldCheck, GraduationCap, BookOpen, BarChart3, Globe, Share2, Calendar, Building2 } from "lucide-react";

const links = [
  { title: "Уровень квалификации членов Управляющего совета", url: "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/uroven-kvalifikatsii-chlenov-upravlyayuschego-soveta/", icon: GraduationCap, color: "bg-blue-50 text-blue-600" },
  { title: "Стажировка", url: "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/stazhirovka/", icon: BookOpen, color: "bg-emerald-50 text-emerald-600" },
  { title: "Опросы / Мониторинг", url: "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/oprosymonitoring/", icon: BarChart3, color: "bg-violet-50 text-violet-600" },
  { title: "Цифровые ресурсы", url: "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/tsifrovye-resursy/", icon: Globe, color: "bg-cyan-50 text-cyan-600" },
  { title: "Трансляция опыта", url: "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/translyatsiya-opyta/", icon: Share2, color: "bg-amber-50 text-amber-600" },
  { title: "Мероприятия, посвящённые Году единства народов", url: "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/meropriyatiya-posvyaschennye-godu-edinstva-narodov/", icon: Calendar, color: "bg-rose-50 text-rose-600" },
  { title: "Региональная стажировочная площадка", url: "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/regionalnaya-stazhirovochnaya-ploschadka/", icon: Building2, color: "bg-indigo-50 text-indigo-600" },
];

export default function OtherPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <div className="flex items-center gap-3">
            <MoreHorizontal className="h-8 w-8 text-blue-200" />
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Прочее</h1>
              <p className="mt-1 text-sm text-blue-200">
                Дополнительные материалы и ресурсы
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 mb-6 text-sm text-blue-800">
          <p className="flex items-center gap-2 font-medium">
            <ShieldCheck className="h-4 w-4" />
            Информация с официального сайта
          </p>
          <p className="mt-1 text-blue-600">
            Все материалы и ресурсы публикуются на официальном сайте детского сада. Нажмите на ссылку, чтобы перейти к соответствующему разделу.
          </p>
        </div>

        <div className="space-y-3">
          {links.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <ExternalLink className="h-5 w-5 shrink-0 text-gray-300 group-hover:text-blue-500 transition-colors" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
