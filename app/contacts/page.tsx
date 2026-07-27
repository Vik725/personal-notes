"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, User, Pencil, X, Check, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditMode } from "@/components/edit-mode-provider";

interface Contact {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
}

const defaultContacts: Contact[] = [
  { id: "1", name: "Иванова Мария Сергеевна", position: "Председатель совета", phone: "+7 (999) 123-45-67", email: "ivanova@example.com" },
  { id: "2", name: "Петров Алексей Владимирович", position: "Заместитель председателя", phone: "+7 (999) 234-56-78", email: "petrov@example.com" },
  { id: "3", name: "Сидорова Елена Николаевна", position: "Секретарь совета", phone: "+7 (999) 345-67-89", email: "sidorova@example.com" },
];

const DATA_FILE = "contacts.json";

async function loadFromDisk(): Promise<Contact[] | null> {
  try {
    const res = await fetch(`/api/disk?file=${DATA_FILE}`);
    if (res.ok) {
      const data = await res.json();
      return data.contacts || null;
    }
  } catch (e) {
    console.log("Failed to load from disk:", e);
  }
  return null;
}

async function saveToDisk(contacts: Contact[]) {
  try {
    await fetch("/api/disk", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: DATA_FILE, data: { contacts } }),
    });
  } catch (e) {
    console.log("Failed to save to disk:", e);
  }
}

export default function ContactsPage() {
  const { isEditMode } = useEditMode();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", position: "", phone: "", email: "" });

  useEffect(() => {
    loadFromDisk().then((data) => {
      if (data && data.length > 0) {
        setContacts(data);
      } else {
        setContacts(defaultContacts);
      }
      setLoaded(true);
    });
  }, []);

  const save = async (newContacts: Contact[]) => {
    setContacts(newContacts);
    await saveToDisk(newContacts);
  };

  const resetForm = () => setForm({ name: "", position: "", phone: "", email: "" });

  const handleAdd = async () => {
    const newContact: Contact = { id: String(Date.now()), ...form };
    await save([...contacts, newContact]);
    setAdding(false);
    resetForm();
  };

  const handleEdit = (contact: Contact) => {
    setEditingId(contact.id);
    setForm({ name: contact.name, position: contact.position, phone: contact.phone, email: contact.email });
  };

  const handleSave = async () => {
    await save(contacts.map((c) => (c.id === editingId ? { ...c, ...form } : c)));
    setEditingId(null);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    await save(contacts.filter((c) => c.id !== id));
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
            <h1 className="text-2xl font-bold sm:text-3xl">Контакты</h1>
            {isEditMode && !adding && (
              <Button variant="secondary" size="sm" onClick={() => setAdding(true)} className="bg-white/20 text-white hover:bg-white/30">
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
              <h3 className="font-semibold text-gray-900">Новый контакт</h3>
              <div><Label>ФИО</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>Должность в совете</Label><Input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} /></div>
              <div><Label>Телефон</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              <div><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div className="flex gap-2">
                <Button onClick={handleAdd}><Check className="h-4 w-4" /> Добавить</Button>
                <Button variant="outline" onClick={() => { setAdding(false); resetForm(); }}><X className="h-4 w-4" /> Отмена</Button>
              </div>
            </div>
          )}

          {contacts.map((contact) => (
            <div key={contact.id} className="rounded-xl border bg-white p-5 shadow-sm">
              {editingId === contact.id ? (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Редактировать</h3>
                  <div><Label>ФИО</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                  <div><Label>Должность</Label><Input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} /></div>
                  <div><Label>Телефон</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                  <div><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}><Check className="h-4 w-4" /> Сохранить</Button>
                    <Button variant="outline" onClick={() => { setEditingId(null); resetForm(); }}><X className="h-4 w-4" /> Отмена</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-500">{contact.position}</p>
                      </div>
                      {isEditMode && (
                        <div className="flex gap-1 shrink-0">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(contact)}><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(contact.id)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-100 transition-colors">
                        <Phone className="h-3.5 w-3.5" />
                        {contact.phone}
                      </a>
                      <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors">
                        <Mail className="h-3.5 w-3.5" />
                        {contact.email}
                      </a>
                    </div>
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
