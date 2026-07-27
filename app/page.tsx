import Link from "next/link";
import {
  Building2,
  Phone,
  Video,
  ScrollText,
  FileText,
  FolderOpen,
  Share2,
  Users,
  GitBranch,
  Archive,
  Lightbulb,
  Award,
  Newspaper,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    title: "Основные сведения",
    description: "Информация о детском саде и Управляющем совете",
    icon: Building2,
    href: "/about",
    count: null,
  },
  {
    title: "Контакты",
    description: "Контакты членов Управляющего совета",
    icon: Phone,
    href: "/contacts",
    count: null,
  },
  {
    title: "Видеоролик",
    description: "Презентационный видеоролик о работе совета",
    icon: Video,
    href: "/video",
    count: null,
  },
  {
    title: "Нормативно-правовая база",
    description: "Федеральные, региональные и муниципальные документы",
    icon: ScrollText,
    href: "/regulations",
    count: null,
  },
  {
    title: "Локальные акты",
    description: "Акты, принятые с учётом мнения совета",
    icon: FileText,
    href: "/local-acts",
    count: null,
  },
  {
    title: "Документы",
    description: "Положение, регламенты, приказы, планы, отчёты",
    icon: FolderOpen,
    href: "/documents",
    count: null,
  },
  {
    title: "Структура совета",
    description: "Организационная структура Управляющего совета",
    icon: Share2,
    href: "/structure",
    count: null,
  },
  {
    title: "Состав совета",
    description: "Поименный состав с категориями и фото",
    icon: Users,
    href: "/members",
    count: null,
  },
  {
    title: "Комиссии",
    description: "Постоянные и временные комиссии при совете",
    icon: GitBranch,
    href: "/commissions",
    count: null,
  },
  {
    title: "Архив документов",
    description: "Документы за предыдущие годы",
    icon: Archive,
    href: "/archive",
    count: null,
  },
  {
    title: "Проекты",
    description: "Реализованные проекты Управляющего совета",
    icon: Lightbulb,
    href: "/projects",
    count: null,
  },
  {
    title: "Благодарности и награды",
    description: "Дипломы, грамоты, благодарственные письма",
    icon: Award,
    href: "/awards",
    count: null,
  },
  {
    title: "Новости",
    description: "Лента новостей и событий совета",
    icon: Newspaper,
    href: "/news",
    count: null,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="h-8 w-8 text-blue-200" />
            <span className="text-sm font-bold uppercase tracking-widest text-blue-200">
              Детский сад
            </span>
          </div>
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Управляющий совет
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg font-medium text-blue-100">
            Вся информация о работе Управляющего совета в одном месте
          </p>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="mx-auto max-w-6xl px-4 -mt-8 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="card-hover group relative rounded-xl border bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {section.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {section.description}
                    </p>
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
