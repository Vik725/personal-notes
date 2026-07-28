"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FolderOpen, ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOSUSLUGI_URL = "https://vsad25.gosuslugi.ru/svedeniya-ob-obrazovatelnoy-organizatsii/struktura-i-organy-upravleniya-obrazovatelnoy-organizatsii/upravlyayuschiy-sovet/dokumenty/";

export default function DocumentsPage() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FolderOpen className="h-8 w-8 text-blue-200" />
              <h1 className="text-2xl font-bold sm:text-3xl">Документы</h1>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setFullscreen(!fullscreen)}
              className="bg-white/20 text-white hover:bg-white/30"
            >
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
          <p className="mt-2 text-sm text-blue-200">
            Документы Управляющего совета загружаются с официального сайта
          </p>
        </div>
      </div>

      <div className={`mx-auto px-4 py-8 ${fullscreen ? "max-w-7xl" : "max-w-4xl"}`}>
        <div className={`rounded-xl border bg-white shadow-sm overflow-hidden ${fullscreen ? "" : "p-4"}`}>
          <div className="flex items-center justify-between mb-3 px-2">
            <p className="text-sm text-gray-500">
              Документы с сайта детского сада
            </p>
            <a
              href={GOSUSLUGI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Открыть в браузере
            </a>
          </div>
          <div className={`w-full ${fullscreen ? "h-[80vh]" : "h-[500px]"} rounded-lg overflow-hidden border`}>
            <iframe
              src={GOSUSLUGI_URL}
              width="100%"
              height="100%"
              className="border-0"
              title="Документы Управляющего совета"
              sandbox="allow-same-origin allow-forms allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
