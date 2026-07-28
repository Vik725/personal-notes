"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Calendar, FileCheck, Pencil, X, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEditMode } from "@/components/edit-mode-provider";

interface BasicInfo {
  councilName: string;
  institutionName: string;
  createdYear: string;
  keyFacts: string[];
  additionalText: string;
}

const defaultInfo: BasicInfo = {
  councilName: "Управляющий совет",
  institutionName: "МБДОУ «Детский сад №25 г. Выборга»",
  createdYear: "2020",
  keyFacts: [
    "В составе 15 человек",
    "Заседания проводятся ежеквартально",
  ],
  additionalText: "",
};

const DATA_FILE = "basic-info.json";

async function loadFromDisk(): Promise<BasicInfo | null> {
  try {
    const res = await fetch(`/api/disk?file=${DATA_FILE}`);
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  return null;
}

async function saveToDisk(data: BasicInfo) {
  try {
    await fetch("/api/disk", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: DATA_FILE, data }),
    });
  } catch {}
}

export default function AboutPage() {
  const { isEditMode } = useEditMode();
  const [info, setInfo] = useState<BasicInfo>(defaultInfo);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...defaultInfo, keyFactsText: defaultInfo.keyFacts.join("\n") });

  useEffect(() => {
    loadFromDisk().then((data) => {
      if (data) {
        setInfo(data);
        setForm({ ...data, keyFactsText: data.keyFacts.join("\n") });
      }
      setLoaded(true);
    });
  }, []);

  const handleSave = async () => {
    const newInfo: BasicInfo = {
      councilName: form.councilName,
      institutionName: form.institutionName,
      createdYear: form.createdYear,
      keyFacts: form.keyFactsText.split("\n").filter((f) => f.trim()),
      additionalText: form.additionalText,
    };
    setInfo(newInfo);
    await saveToDisk(newInfo);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...info, keyFactsText: info.keyFacts.join("\n") });
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
              <Label>Название совета (жирным шрифтом)</Label>
              <Input value={form.councilName} onChange={(e) => setForm({ ...form, councilName: e.target.value })} />
            </div>
            <div>
              <Label>Название учреждения (обычным шрифтом)</Label>
              <Input value={form.institutionName} onChange={(e) => setForm({ ...form, institutionName: e.target.value })} />
            </div>
            <div>
              <Label>Создан в (год)</Label>
              <Input value={form.createdYear} onChange={(e) => setForm({ ...form, createdYear: e.target.value })} />
            </div>
            <div>
              <Label>Ключевые факты (каждый с новой строки)</Label>
              <Textarea value={form.keyFactsText} onChange={(e) => setForm({ ...form, keyFactsText: e.target.value })} rows={5} />
            </div>
            <div>
              <Label>Дополнительный текст и ссылки</Label>
              <p className="text-xs text-gray-400 mb-1">Можно писать текст, вставлять ссылки в формате HTML. Каждый блок с новой строки — будет разделён пустой строкой.</p>
              <Textarea
                value={form.additionalText}
                onChange={(e) => setForm({ ...form, additionalText: e.target.value })}
                rows={8}
                placeholder={'Ссылка на положение: <a href="https://example.com">Положение об Управляющем совете</a>\n\nСсылка на приказ: <a href="https://example.com">Приказ о создании</a>'}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}><Check className="h-4 w-4" /> Сохранить</Button>
              <Button variant="outline" onClick={handleCancel}><X className="h-4 w-4" /> Отмена</Button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{info.councilName}</h2>
                <p className="text-base text-gray-500 mt-0.5">{info.institutionName}</p>
              </div>
            </div>

            <div className="rounded-lg border bg-gray-50 p-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Calendar className="h-4 w-4" />
                Создан в
              </div>
              <p className="font-medium text-gray-900 text-lg">{info.createdYear} году</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <FileCheck className="h-4 w-4" />
                Ключевые факты
              </div>
              <ul className="space-y-2">
                {info.keyFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 rounded-lg border bg-white p-3">
                    <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <span className="text-gray-700">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {info.additionalText && (
              <div
                className="rounded-lg border bg-blue-50 p-5 text-sm text-blue-800 prose prose-blue max-w-none [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800 [&_br]:block [&_br]:content-[''] [&_br]:my-2"
                dangerouslySetInnerHTML={{ __html: info.additionalText.replace(/\n\n/g, "<br/><br/>").replace(/\n/g, "<br/>") }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
