import Link from "next/link";
import { ArrowLeft, Building2, Calendar, Users, FileCheck } from "lucide-react";

const defaultInfo = {
  institutionName: "МБДОУ «Детский сад №...»",
  councilStatus: "Управляющий совет",
  termStart: "2024",
  termEnd: "2026",
  keyFacts: [
    "Создан в 2020 году",
    "В составе 15 человек",
    "Заседания проводятся ежеквартально",
  ],
};

export default function AboutPage() {
  const info = defaultInfo;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="gradient-hero-vibrant pattern-grid text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <h1 className="text-2xl font-bold sm:text-3xl">Основные сведения</h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {info.institutionName}
              </h2>
              <p className="text-sm text-gray-500">{info.councilStatus}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Calendar className="h-4 w-4" />
                Срок полномочий
              </div>
              <p className="font-medium text-gray-900">
                {info.termStart} — {info.termEnd}
              </p>
            </div>
            <div className="rounded-lg border bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Users className="h-4 w-4" />
                Статус
              </div>
              <p className="font-medium text-gray-900">{info.councilStatus}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <FileCheck className="h-4 w-4" />
              Ключевые факты
            </div>
            <ul className="space-y-2">
              {info.keyFacts.map((fact, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-lg border bg-white p-3"
                >
                  <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  <span className="text-gray-700">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
