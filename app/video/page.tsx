"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Video, Pencil, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditMode } from "@/components/edit-mode-provider";

const defaultVideo = {
  videoUrl: "https://vk.com/video_ext.php?oid=-123456789&id=123456789&hash=abc123",
  title: "Презентационный видеоролик",
  description: "О деятельности Управляющего совета",
};

export default function VideoPage() {
  const { isEditMode } = useEditMode();
  const [video, setVideo] = useState(defaultVideo);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...video });

  const handleSave = () => {
    setVideo({ ...form });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...video });
    setEditing(false);
  };

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
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Video className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{video.title}</h2>
                <p className="text-sm text-gray-500">{video.description}</p>
              </div>
            </div>
            {isEditMode && (
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                <Pencil className="h-4 w-4" />
                Изменить
              </Button>
            )}
          </div>

          {editing ? (
            <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
              <div>
                <Label>Ссылка на видео (URL)</Label>
                <Input
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  placeholder="https://vk.com/video_ext.php?..."
                />
              </div>
              <div>
                <Label>Название</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Описание</Label>
                <Input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave}>
                  <Check className="h-4 w-4" />
                  Сохранить
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
              <iframe
                src={video.videoUrl}
                width="100%"
                height="100%"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="border-0"
                title={video.title}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
