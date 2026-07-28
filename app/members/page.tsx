"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Pencil, X, Check, Plus, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditMode } from "@/components/edit-mode-provider";

interface Member {
  id: string;
  number: number;
  name: string;
  photo: string;
  position: string;
  category: string;
}

const defaultMembers: Member[] = [
  { id: "1", number: 1, name: "Иванова Мария Сергеевна", photo: "", position: "Председатель", category: "Председатель" },
  { id: "2", number: 2, name: "Петров Алексей Владимирович", photo: "", position: "Заместитель председателя", category: "Заместитель председателя" },
  { id: "3", number: 3, name: "Сидорова Елена Николаевна", photo: "", position: "Секретарь", category: "Родители" },
  { id: "4", number: 4, name: "Кузнецов Дмитрий Сергеевич", photo: "", position: "Член совета", category: "Родители" },
  { id: "5", number: 5, name: "Смирнова Ольга Ивановна", photo: "", position: "Член совета", category: "Педагоги" },
  { id: "6", number: 6, name: "Белова Татьяна Михайловна", photo: "", position: "Член совета", category: "Представители учредителя" },
];

const DATA_FILE = "members.json";

async function loadFromDisk(): Promise<Member[] | null> {
  try {
    const res = await fetch(`/api/disk?file=${DATA_FILE}`);
    if (res.ok) {
      const data = await res.json();
      return data.members || null;
    }
  } catch {}
  return null;
}

async function saveToDisk(members: Member[]) {
  try {
    await fetch("/api/disk", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: DATA_FILE, data: { members } }),
    });
  } catch {}
}

// Преобразует ссылку Яндекс.Диска в прямую ссылку на изображение
function getPhotoUrl(url: string): string {
  if (!url) return "";
  const match = url.match(/disk\.yandex\.ru\/i\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `/api/photo-proxy?key=${match[1]}`;
  }
  return url;
}

export default function MembersPage() {
  const { isEditMode } = useEditMode();
  const [members, setMembers] = useState<Member[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ number: 0, name: "", photo: "", position: "", category: "" });

  useEffect(() => {
    loadFromDisk().then((data) => {
      if (data && data.length > 0) {
        setMembers(data);
      } else {
        setMembers(defaultMembers);
      }
      setLoaded(true);
    });
  }, []);

  const save = async (newMembers: Member[]) => {
    setMembers(newMembers);
    await saveToDisk(newMembers);
  };

  const resetForm = () => setForm({ number: members.length + 1, name: "", photo: "", position: "", category: "" });

  const handleAdd = async () => {
    const newMember: Member = { id: String(Date.now()), ...form };
    await save([...members, newMember]);
    setAdding(false);
    resetForm();
  };

  const handleEdit = (member: Member) => {
    setEditingId(member.id);
    setForm({ number: member.number, name: member.name, photo: member.photo, position: member.position, category: member.category });
  };

  const handleSave = async () => {
    await save(members.map((m) => (m.id === editingId ? { ...m, ...form } : m)));
    setEditingId(null);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    await save(members.filter((m) => m.id !== id));
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
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-200" />
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">Состав совета</h1>
                <p className="mt-1 text-sm text-blue-200">
                  Поименный состав Управляющего совета
                </p>
              </div>
            </div>
            {isEditMode && !adding && (
              <Button variant="secondary" size="sm" onClick={() => { setAdding(true); resetForm(); }} className="bg-white/20 text-white hover:bg-white/30">
                <Plus className="h-4 w-4" />
                Добавить
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-3">
          {adding && (
            <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
              <h3 className="font-semibold text-gray-900">Новый член совета</h3>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>№ п/п</Label><Input type="number" value={form.number} onChange={(e) => setForm({ ...form, number: parseInt(e.target.value) || 0 })} /></div>
                <div><Label>Категория</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Например: Председатель, Родители, Педагоги" /></div>
              </div>
              <div><Label>ФИО</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>Должность в совете</Label><Input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} /></div>
              <div><Label>Ссылка на фото (можно ссылку с Яндекс.Диска)</Label><Input value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} placeholder="https://disk.yandex.ru/i/..." /></div>
              <div className="flex gap-2">
                <Button onClick={handleAdd}><Check className="h-4 w-4" /> Добавить</Button>
                <Button variant="outline" onClick={() => { setAdding(false); resetForm(); }}><X className="h-4 w-4" /> Отмена</Button>
              </div>
            </div>
          )}

          {members.sort((a, b) => a.number - b.number).map((member) => (
            <div key={member.id} className="rounded-xl border bg-white p-5 shadow-sm">
              {editingId === member.id ? (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Редактировать</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>№ п/п</Label><Input type="number" value={form.number} onChange={(e) => setForm({ ...form, number: parseInt(e.target.value) || 0 })} /></div>
                    <div><Label>Категория</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
                  </div>
                  <div><Label>ФИО</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                  <div><Label>Должность</Label><Input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} /></div>
                  <div><Label>Ссылка на фото</Label><Input value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} /></div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}><Check className="h-4 w-4" /> Сохранить</Button>
                    <Button variant="outline" onClick={() => { setEditingId(null); resetForm(); }}><X className="h-4 w-4" /> Отмена</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 overflow-hidden">
                    {member.photo ? (
                      <img src={getPhotoUrl(member.photo)} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-7 w-7" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">#{member.number}</span>
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500">{member.position}</p>
                      </div>
                      {isEditMode && (
                        <div className="flex gap-1 shrink-0">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(member)}><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(member.id)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      )}
                    </div>
                    <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {member.category}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
