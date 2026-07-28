import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  try {
    // Получаем прямую ссылку на скачивание
    const res = await fetch(
      `https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=https://disk.yandex.ru/i/${key}`
    );
    const data = await res.json();

    if (!data.href) {
      return NextResponse.json({ error: "Failed to get download URL" }, { status: 500 });
    }

    // Скачиваем и проксируем изображение
    const imageRes = await fetch(data.href);
    const headers = new Headers();
    headers.set("Content-Type", imageRes.headers.get("Content-Type") || "image/jpeg");
    headers.set("Cache-Control", "public, max-age=3600");

    return new NextResponse(imageRes.body, {
      status: 200,
      headers,
    });
  } catch {
    return NextResponse.json({ error: "Failed to proxy image" }, { status: 500 });
  }
}
