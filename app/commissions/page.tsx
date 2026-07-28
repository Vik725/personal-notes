"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, GitBranch, Pencil, X, Check, Plus, Trash2, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEditMode } from "@/components/edit-mode-provider";

interface Member {
  role: string;
  name: string;
}

interface Commission {
  id: string;
  name: string;
  description: string;
  members: Member[];
}

const defaultCommissions: Commission[] = [
  {
    id: "1",
    name: "Комиссия по учебно-воспитательной работе",
    description: "Контроль и содействие учебно-воспитательному процессу",
    members: [
      { role: "Председатель", name: "Петров А.В." },
      { role: "Член комиссии", name: "Смирнова О.И." },
    ],
  },
  {
    id: "2",
    name: "Комиссия по финансово-хозяйственной деятельности",
    description: "Контроль финансовой и хозяйственной деятельности",
    members: [
      { role: "Председатель", name: "Кузнецов Д.С." },
      { role: "Член комиссии", name: "Белова Т.М." },
    ],
  },
  {
    id: "3",
    name: "Комиссия по питанию",
    description: "Контроль качества питания воспитанников",
    members: [
      { role: "Председатель", name: "Сидорова Е.Н." },
      { role: "Член комиссии", name: "Иванова М.С." },
    ],
  },
];

const DATA_FILE = "commissions.json";

async function loadFromDisk(): Promise<Commission[] | null> {
  try {
    const res = await fetch(`/api/disk?file=${DATA_FILE}`);
    if (res.ok) {
      const data = await res.json();
      return data.commissions || null;
    }
  } catch {}
  return null;
}

async function saveToDisk(commissions: Commission[]) {
  try {
    await fetch("/api/disk", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: DATA_FILE, data: { commissions } }),
    });
  } catch {}
}

export default function CommissionsPage() {
  const { isEditMode } = useEditMode();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", membersStr: "" });

  useEffect(() => {
    loadFromDisk().then((data) => {
      if (data && data.length > 0) {
        setCommissions(data);
      } else {
        setCommissions(defaultCommissions);
      }
      setLoaded(true);
    });
  }, []);

  const save = async (newCommissions: Commission[]) => {
    setCommissions(newCommissions);
    await saveToDisk(newCommissions);
  };

  const membersToString = (members: Member[]) =>
    members.map((m) => `${m.role}: ${m.name}`).join("\n");

  const stringToMembers = (str: string): Member[] =>
    str
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        const parts = line.split(":");
        if (parts.length >= 2) {
          return { role: parts[0].trim(), name: parts.slice(1).join(":").trim() };
        }
        return { role: "Член комиссии", name: line.trim() };
      });

  const resetForm = () => setForm({ name: "", description: "", membersStr: "" });

  const handleAdd = async () => {
    const newCommission: Commission = {
      id: String(Date.now()),
      name: form.name,
      description: form.description,
      members: stringToMembers(form.membersStr),
    };
    await save([...commissions, newCommission]);
    setAdding(false);
    resetForm();
  };

  const handleEdit = (commission: Commission) => {
    setEditingId(commission.id);
    setForm({
      name: commission.name,
      description: commission.description,
      membersStr: membersToString(commission.members),
    });
  };

  const handleSave = async () => {
    await save(
      commissions.map((c) =>
        c.id === editingId
          ? { ...c, name: form.name, description: form.description, members: stringToMembers(form.membersStr) }
          : c
      )
    );
    setEditingId(null);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    await save(commissions.filter((c) => c.id !== id));
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
              <GitBranch className="h-8 w-8 text-blue-200" />
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">Комиссии</h1>
                <p className="mt-1 text-sm text-blue-200">
                  Постоянные и временные комиссии при Управляющем совете
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
        <div className="space-y-4">
          {adding && (
            <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
              <h3 className="font-semibold text-gray-900">Новая комиссия</h3>
              <div><Label>Название комиссии</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>Описание / направление работы</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div>
                <Label>Участники (каждый с новой строки, формат: Должность: ФИО)</Label>
                <Textarea
                  value={form.membersStr}
                  onChange={(e) => setForm({ ...form, membersStr: e.target.value })}
                  rows={4}
                  placeholder="Председатель: Иванов И.И.&#10;Член комиссии: Петров П.П.&#10;Член комиссии: Сидоров С.С."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAdd}><Check className="h-4 w-4" /> Добавить</Button>
                <Button variant="outline" onClick={() => { setAdding(false); resetForm(); }}><X className="h-4 w-4" /> Отмена</Button>
              </div>
            </div>
          )}

          {commissions.map((commission) => (
            <div key={commission.id} className="rounded-xl border bg-white p-5 shadow-sm">
              {editingId === commission.id ? (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Редактировать</h3>
                  <div><Label>Название комиссии</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                  <div><Label>Описание</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                  <div>
                    <Label>Участники</Label>
                    <Textarea value={form.membersStr} onChange={(e) => setForm({ ...form, membersStr: e.target.value })} rows={4} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}><Check className="h-4 w-4" /> Сохранить</Button>
                    <Button variant="outline" onClick={() => { setEditingId(null); resetForm(); }}><X className="h-4 w-4" /> Отмена</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <GitBranch className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{commission.name}</h3>
                        <p className="text-sm text-gray-500">{commission.description}</p>
                      </div>
                    </div>
                    {isEditMode && (
                      <div className="flex gap-1 shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(commission)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(commission.id)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    )}
                  </div>
                  <div className="ml-15 space-y-2">
                    {commission.members.map((member, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-2.5">
                        <User className="h-4 w-4 text-blue-500 shrink-0" />
                        <span className="text-sm font-medium text-gray-700 min-w-[120px]">{member.role}:</span>
                        <span className="text-sm text-gray-600">{member.name}</span>
                      </div>
                    ))}
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
