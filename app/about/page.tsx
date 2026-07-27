"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Calendar, Users, FileCheck, Pencil, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEditMode } from "@/components/edit-mode-provider";

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
  const { isEditMode } = useEditMode();
  const [info, setInfo] = useState(defaultInfo);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...info, keyFactsText: info.keyFacts.join("\n") });

  const handleSave = () => {
    setInfo({
      institutionName: form.institutionName,
      councilStatus: form.councilStatus,
      termStart: form.termStart,
      termEnd: form.termEnd,
      keyFacts: form.keyFactsText.split("\n").filter((f) => f.trim()),
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...info, keyFactsText: info.keyFacts.join("\n") });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold sm:text-3xl">Основные сведения</h1>
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
        {editing ? (
          <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
            <div>
              <Label>Название учреждения</Label>
              <Input value={form.institutionName} onChange={(e) => setForm({ ...form, institutionName: e.target.value })} />
            </div>
            <div>
              <Label>Статус совета</Label>
              <Input value={form.councilStatus} onChange={(e) => setForm({ ...form, councilStatus: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Срок с</Label>
                <Input value={form.termStart} onChange={(e) => setForm({ ...form, termStart: e.target.value })} />
              </div>
              <div>
                <Label>Срок по</Label>
                <Input value={form.termEnd} onChange={(e) => setForm({ ...form, termEnd: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Ключевые факты (каждый с новой строки)</Label>
              <Textarea value={form.keyFactsText} onChange={(e) => setForm({ ...form, keyFactsText: e.target.value })} rows={5} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}><Check className="h-4 w-4" /> Сохранить</Button>
              <Button variant="outline" onClick={handleCancel}><X className="h-4 w-4" /> Отмена</Button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{info.institutionName}</h2>
                <p className="text-sm text-gray-500">{info.councilStatus}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar className="h-4 w-4" />
                  Срок полномочий
                </div>
                <p className="font-medium text-gray-900">{info.termStart} — {info.termEnd}</p>
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
                  <li key={i} className="flex items-start gap-2 rounded-lg border bg-white p-3">
                    <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <span className="text-gray-700">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
