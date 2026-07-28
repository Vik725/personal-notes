import Link from "next/link";
import { ArrowLeft, Newspaper, ExternalLink, ShieldCheck, Calendar } from "lucide-react";

const GOSUSLUGI_URL = "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/smi-o-nas/";

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
                Нажмите, чтобы перейти на официальный сайт и посмотреть все актуальные новости и события
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 group-hover:bg-blue-200 transition-colors">
                <ShieldCheck className="h-3.5 w-3.5" />
                Официальный сайт
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </div>
            </div>
          </div>
        </a>

        <div className="rounded-xl border bg-white p-8 shadow-sm text-center">
          <Newspaper className="h-12 w-12 text-blue-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Новости на официальном сайте
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Все актуальные новости и события Управляющего совета публикуются на официальном сайте детского сада. Нажмите на карточку выше, чтобы перейти к ним.
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-medium">📌 Актуальные новости</p>
          <p className="mt-1 text-blue-600">
            Все новости и события публикуются на официальном сайте детского сада. Переходите по ссылке, чтобы быть в курсе последних событий.
          </p>
        </div>
      </div>
    </div>
  );
}
