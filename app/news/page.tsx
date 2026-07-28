import Link from "next/link";
import { ArrowLeft, Newspaper, ExternalLink, ShieldCheck, Calendar } from "lucide-react";

const GOSUSLUGI_URL = "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/smi-o-nas/";

const newsItems = [
  { title: "Заседание Управляющего совета", date: "Декабрь 2025", description: "Очередное заседание Управляющего совета детского сада" },
  { title: "Итоги конкурса проектов", date: "Ноябрь 2025", description: "Подведены итоги конкурса проектов Управляющего совета" },
  { title: "День открытых дверей", date: "Октябрь 2025", description: "Управляющий совет провёл день открытых дверей для родителей" },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <div className="flex items-center gap-3">
            <Newspaper className="h-8 w-8 text-blue-200" />
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Новости</h1>
              <p className="mt-1 text-sm text-blue-200">
                Новости и события Управляющего совета
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <a
          href={GOSUSLUGI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <ExternalLink className="h-7 w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                Все новости на сайте детского сада
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Нажмите, чтобы перейти на официальный сайт и посмотреть все новости и события
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 group-hover:bg-blue-200 transition-colors">
                <ShieldCheck className="h-3.5 w-3.5" />
                Официальный сайт
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </div>
            </div>
          </div>
        </a>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Последние новости
          </h3>
          {newsItems.map((item, i) => (
            <div key={i} className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Newspaper className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-medium">📌 Актуальные новости</p>
          <p className="mt-1 text-blue-600">
            Все новости и события публикуются на официальном сайте детского сада.
          </p>
        </div>
      </div>
    </div>
  );
}
