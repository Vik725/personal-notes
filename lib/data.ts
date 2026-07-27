export interface BasicInfo {
  id: string;
  institutionName: string;
  councilStatus: string;
  termStart: string;
  termEnd: string;
  keyFacts: string[];
}

export const defaultBasicInfo: BasicInfo = {
  id: "default",
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

export interface Contact {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
}

export const defaultContacts: Contact[] = [
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

export interface Video {
  id: string;
  videoUrl: string;
  title: string;
  description: string;
}

export const defaultVideo: Video = {
  id: "default",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  title: "Презентационный видеоролик",
  description: "Видеоролик о деятельности Управляющего совета",
};

export interface RegulatoryDocument {
  id: string;
  title: string;
  category: "federal" | "regional" | "municipal";
  documentNumber: string;
  dateAdopted: string;
  text: string;
}

export const defaultRegulations: RegulatoryDocument[] = [
  {
    id: "1",
    title: "Федеральный закон «Об образовании в Российской Федерации»",
    category: "federal",
    documentNumber: "№ 273-ФЗ",
    dateAdopted: "29.12.2012",
    text: "Текст федерального закона...",
  },
  {
    id: "2",
    title: "Устав детского сада",
    category: "municipal",
    documentNumber: "№ 1",
    dateAdopted: "01.09.2020",
    text: "Текст устава...",
  },
];

export interface LocalAct {
  id: string;
  title: string;
  documentNumber: string;
  dateAdopted: string;
  text: string;
}

export const defaultLocalActs: LocalAct[] = [
  {
    id: "1",
    title: "Положение о режиме занятий воспитанников",
    documentNumber: "№ 15",
    dateAdopted: "01.09.2023",
    text: "Текст положения...",
  },
  {
    id: "2",
    title: "Правила внутреннего распорядка",
    documentNumber: "№ 12",
    dateAdopted: "01.09.2023",
    text: "Текст правил...",
  },
];

export interface CouncilDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileSize: string;
}

export const defaultDocuments: CouncilDocument[] = [
  {
    id: "1",
    title: "Положение об Управляющем совете",
    description: "Основной документ, регламентирующий деятельность совета",
    category: "Положение",
    fileUrl: "#",
    fileSize: "245 КБ",
  },
  {
    id: "2",
    title: "План работы на 2024-2025 учебный год",
    description: "Годовой план заседаний и мероприятий",
    category: "План работы",
    fileUrl: "#",
    fileSize: "180 КБ",
  },
];

export interface CouncilStructure {
  id: string;
  chairman: string;
  deputy: string;
  secretary: string;
  commissions: { name: string; members: string[] }[];
  categories: { name: string; representatives: string[] }[];
}

export const defaultStructure: CouncilStructure = {
  id: "default",
  chairman: "Иванова Мария Сергеевна",
  deputy: "Петров Алексей Владимирович",
  secretary: "Сидорова Елена Николаевна",
  commissions: [
    {
      name: "Комиссия по учебно-воспитательной работе",
      members: ["Петров А.В.", "Смирнова О.И."],
    },
    {
      name: "Комиссия по финансово-хозяйственной деятельности",
      members: ["Кузнецов Д.С.", "Белова Т.М."],
    },
  ],
  categories: [
    {
      name: "Родители",
      representatives: ["Иванова М.С.", "Петров А.В.", "Кузнецов Д.С."],
    },
    {
      name: "Педагоги",
      representatives: ["Сидорова Е.Н.", "Смирнова О.И."],
    },
    {
      name: "Представители учредителя",
      representatives: ["Белова Т.М."],
    },
  ],
};

export interface CouncilMember {
  id: string;
  name: string;
  category: "parents" | "teachers" | "founder";
  position: string;
  photo: string;
  termStart: string;
  termEnd: string;
}

export const defaultMembers: CouncilMember[] = [
  {
    id: "1",
    name: "Иванова Мария Сергеевна",
    category: "parents",
    position: "Председатель",
    photo: "",
    termStart: "2024",
    termEnd: "2026",
  },
  {
    id: "2",
    name: "Петров Алексей Владимирович",
    category: "parents",
    position: "Заместитель председателя",
    photo: "",
    termStart: "2024",
    termEnd: "2026",
  },
  {
    id: "3",
    name: "Сидорова Елена Николаевна",
    category: "teachers",
    position: "Секретарь",
    photo: "",
    termStart: "2024",
    termEnd: "2026",
  },
  {
    id: "4",
    name: "Белова Татьяна Михайловна",
    category: "founder",
    position: "Представитель учредителя",
    photo: "",
    termStart: "2024",
    termEnd: "2026",
  },
];

export interface Commission {
  id: string;
  name: string;
  type: "permanent" | "temporary";
  description: string;
  direction: string;
  members: string[];
}

export const defaultCommissions: Commission[] = [
  {
    id: "1",
    name: "Комиссия по учебно-воспитательной работе",
    type: "permanent",
    description: "Контроль и содействие учебно-воспитательному процессу",
    direction: "Учебно-воспитательная работа",
    members: ["Петров А.В.", "Смирнова О.И."],
  },
  {
    id: "2",
    name: "Комиссия по финансово-хозяйственной деятельности",
    type: "permanent",
    description: "Контроль финансовой и хозяйственной деятельности",
    direction: "Финансово-хозяйственная деятельность",
    members: ["Кузнецов Д.С.", "Белова Т.М."],
  },
];

export interface ArchiveDocument {
  id: string;
  title: string;
  description: string;
  year: number;
  fileUrl: string;
  fileSize: string;
}

export const defaultArchive: ArchiveDocument[] = [
  {
    id: "1",
    title: "Отчёт о работе за 2023-2024 учебный год",
    description: "Годовой отчёт о деятельности совета",
    year: 2024,
    fileUrl: "#",
    fileSize: "320 КБ",
  },
  {
    id: "2",
    title: "План работы на 2023-2024 учебный год",
    description: "Годовой план заседаний",
    year: 2023,
    fileUrl: "#",
    fileSize: "180 КБ",
  },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  timeline: string;
  photo: string;
  results: string;
}

export const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Благоустройство территории",
    description: "Проект по озеленению и благоустройству территории детского сада",
    timeline: "2024",
    photo: "",
    results: "Обустроены цветники, установлены малые архитектурные формы",
  },
  {
    id: "2",
    title: "Здоровое питание",
    description: "Проект по улучшению качества питания в детском саду",
    timeline: "2023-2024",
    photo: "",
    results: "Обновлено меню, проведены дегустации для родителей",
  },
];

export interface Award {
  id: string;
  title: string;
  description: string;
  photo: string;
}

export const defaultAwards: Award[] = [
  {
    id: "1",
    title: "Благодарственное письмо",
    description: "От Департамента образования за активную работу",
    photo: "",
  },
  {
    id: "2",
    title: "Диплом победителя",
    description: "Конкурс «Лучший управляющий совет — 2024»",
    photo: "",
  },
];

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  text: string;
  photo: string;
}

export const defaultNews: NewsArticle[] = [
  {
    id: "1",
    title: "Заседание Управляющего совета",
    date: "2024-12-15",
    text: "Состоялось очередное заседание Управляющего совета. На повестке дня: утверждение плана работы на второе полугодие, отчёт комиссии по питанию, обсуждение подготовки к новогодним мероприятиям.",
    photo: "",
  },
  {
    id: "2",
    title: "Итоги конкурса проектов",
    date: "2024-11-20",
    text: "Подведены итоги конкурса проектов Управляющего совета. Победителем признан проект «Благоустройство территории». Благодарим всех участников за активность!",
    photo: "",
  },
];
