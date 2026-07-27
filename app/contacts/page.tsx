import Link from "next/link";
import { ArrowLeft, Phone, Mail, User } from "lucide-react";

const defaultContacts = [
  {
    id: "1",
    name: "Иванова Мария Сергеевна",
    position: "Председатель совета",
    phone: "+7 (999) 123-45-67",
    email: "ivanova@example.com",
  },
  {
    id: "2",
    name: "Петров Алексей Владимирович",
    position: "Заместитель председателя",
    phone: "+7 (999) 234-56-78",
    email: "petrov@example.com",
  },
  {
    id: "3",
    name: "Сидорова Елена Николаевна",
    position: "Секретарь совета",
    phone: "+7 (999) 345-67-89",
    email: "sidorova@example.com",
  },
];

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="gradient-hero-vibrant pattern-grid text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <h1 className="text-2xl font-bold sm:text-3xl">Контакты</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-4">
          {defaultContacts.map((contact) => (
            <div key={contact.id} className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <User className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.position}</p>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
