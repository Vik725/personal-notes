import Link from "next/link";
import { ArrowLeft, Video } from "lucide-react";

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="gradient-hero-vibrant pattern-grid text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <h1 className="text-2xl font-bold sm:text-3xl">Видеоролик</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Video className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Презентационный видеоролик
              </h2>
              <p className="text-sm text-gray-500">
                О деятельности Управляющего совета
              </p>
            </div>
          </div>

          {/* Видеоплеер */}
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            <iframe
              src="https://vk.com/video_ext.php?oid=-123456789&id=123456789&hash=abc123"
              width="100%"
              height="100%"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              className="border-0"
              title="Презентационный видеоролик"
            />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Здесь будет отображаться видеоролик о работе Управляющего совета.
            Чтобы добавить своё видео из ВКонтакте, нужно заменить ссылку в коде.
          </p>
        </div>
      </div>
    </div>
  );
}
