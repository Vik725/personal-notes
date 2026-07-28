import Link from "next/link";
import { ArrowLeft, Award, Heart, ExternalLink, ShieldCheck } from "lucide-react";

const AWARDS_URL = "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/nagrady/";
const THANKS_URL = "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/blagodarnosti/";

export default function AwardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8 text-blue-200" />
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Награды и благодарности</h1>
              <p className="mt-1 text-sm text-blue-200">
                Достижения и признание Управляющего совета
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Награды */}
          <a
            href={AWARDS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border-2 border-amber-100 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm hover:shadow-md hover:border-amber-300 transition-all"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-sm group-hover:bg-amber-600 transition-colors">
                <Award className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                  Награды
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Дипломы, грамоты и другие награды Управляющего совета
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-700 group-hover:bg-amber-200 transition-colors">
                <ShieldCheck className="h-3.5 w-3.5" />
                Официальный сайт
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </div>
            </div>
          </a>

          {/* Благодарности */}
          <a
            href={THANKS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border-2 border-rose-100 bg-gradient-to-br from-rose-50 to-white p-6 shadow-sm hover:shadow-md hover:border-rose-300 transition-all"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-sm group-hover:bg-rose-600 transition-colors">
                <Heart className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                  Благодарности
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Благодарственные письма и признание заслуг совета
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-4 py-1.5 text-sm font-medium text-rose-700 group-hover:bg-rose-200 transition-colors">
                <ShieldCheck className="h-3.5 w-3.5" />
                Официальный сайт
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </div>
            </div>
          </a>
        </div>

        <div className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-medium">📌 Актуальные награды и благодарности</p>
          <p className="mt-1 text-blue-600">
            Все награды и благодарственные письма публикуются на официальном сайте детского сада. Нажмите на карточку, чтобы перейти к соответствующему разделу.
          </p>
        </div>
      </div>
    </div>
  );
}
