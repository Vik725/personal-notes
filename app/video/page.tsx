"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Video, Pencil, X, Check, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditMode } from "@/components/edit-mode-provider";

interface VideoData {
  videoUrl: string;
  title: string;
  description: string;
}

const defaultVideo: VideoData = {
  videoUrl: "https://vk.com/video_ext.php?oid=-123456789&id=123456789&hash=abc123",
  title: "Презентационный видеоролик",
  description: "О деятельности Управляющего совета",
};

const DATA_FILE = "video.json";

async function loadFromDisk(): Promise<VideoData | null> {
  try {
    const res = await fetch(`/api/disk?file=${DATA_FILE}`);
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  return null;
}

async function saveToDisk(data: VideoData) {
  try {
    await fetch("/api/disk", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: DATA_FILE, data }),
    });
  } catch {}
}

export default function VideoPage() {
  const { isEditMode } = useEditMode();
  const [video, setVideo] = useState<VideoData>(defaultVideo);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...defaultVideo });

  useEffect(() => {
    loadFromDisk().then((data) => {
      if (data) {
        setVideo(data);
        setForm(data);
      }
      setLoaded(true);
    });
  }, []);

  const handleSave = async () => {
    setVideo({ ...form });
    await saveToDisk(form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...video });
    setEditing(false);
  };

  if (!loaded) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold sm:text-3xl">Видеоролик</h1>
            {isEditMode && !editing && (
              <Button variant="secondary" size="sm" onClick={() => setEditing(true)} className="bg-white/20 text-white hover:bg-white/30">
                <Pencil className="h-4 w-4" />
                Изменить
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Video className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{video.title}</h2>
              <p className="text-sm text-gray-500">{video.description}</p>
            </div>
          </div>

          {editing ? (
            <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
              <div>
                <Label>Ссылка на видео (URL)</Label>
                <Input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://vk.com/video_ext.php?..." />
              </div>
              <div>
                <Label>Название</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <Label>Описание</Label>
                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave}><Check className="h-4 w-4" /> Сохранить</Button>
                <Button variant="outline" onClick={handleCancel}><X className="h-4 w-4" /> Отмена</Button>
              </div>
            </div>
          ) : (
            <div>
              {/* Превью с кнопкой воспроизведения */}
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all group-hover:scale-110">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-medium text-white/90">Нажмите, чтобы открыть видео</p>
                </div>
              </a>
              <div className="mt-4 flex justify-center">
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Play className="h-4 w-4" />
                  Смотреть видео
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
