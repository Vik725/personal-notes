import Link from "next/link";
import { ArrowLeft, Lightbulb, ExternalLink, ShieldCheck, Sparkles, PiggyBank } from "lucide-react";

const PROJECTS_URL = "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/proekty/";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <div className="flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-blue-200" />
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Проекты</h1>
              <p className="mt-1 text-sm text-blue-200">
                Реализованные проекты Управляющего совета
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <a
          href={PROJECTS_URL}
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
                Проекты на сайте детского сада
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Нажмите, чтобы перейти на официальный сайт и посмотреть все проекты
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 group-hover:bg-blue-200 transition-colors">
                <ShieldCheck className="h-3.5 w-3.5" />
                Официальный сайт
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </div>
            </div>
          </div>
        </a>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900">Основные проекты</h3>
            </div>
            <p className="text-sm text-gray-500">
              Проекты, реализованные Управляющим советом детского сада
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <PiggyBank className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900">Проекты с привлечением средств</h3>
            </div>
            <p className="text-sm text-gray-500">
              Проекты, реализованные с привлечением дополнительных средств
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-medium">📌 Актуальные проекты</p>
          <p className="mt-1 text-blue-600">
            Все проекты публикуются на официальном сайте детского сада. Нажмите на карточку выше, чтобы перейти к полному списку.
          </p>
        </div>
      </div>
    </div>
  );
}
