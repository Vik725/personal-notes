import Link from "next/link";
import { ArrowLeft, Sitemap, ExternalLink, Maximize2 } from "lucide-react";

const STRUCTURE_IMAGE_URL = "https://vsad25.gosuslugi.ru/netcat_files/userfiles/US/2026/model_novaya.JPG";

export default function StructurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <div className="flex items-center gap-3">
            <Sitemap className="h-8 w-8 text-blue-200" />
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Структура совета</h1>
              <p className="mt-1 text-sm text-blue-200">
                Организационная структура Управляющего совета
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4 px-2">
            <p className="text-sm text-gray-500">
              Структура Управляющего совета
            </p>
            <a
              href={STRUCTURE_IMAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              Открыть в полном размере
            </a>
          </div>
          <div className="rounded-lg overflow-hidden bg-gray-50">
            <a href={STRUCTURE_IMAGE_URL} target="_blank" rel="noopener noreferrer">
              <img
                src={STRUCTURE_IMAGE_URL}
                alt="Структура Управляющего совета"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-medium">💡 Нажмите на изображение или кнопку «Открыть в полном размере», чтобы рассмотреть структуру подробнее</p>
        </div>
      </div>
    </div>
  );
}
