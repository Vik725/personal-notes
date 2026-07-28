import { NextRequest, NextResponse } from "next/server";

const YA_DISK_TOKEN = process.env.YA_DISK_TOKEN || "";
const BASE_URL = "https://cloud-api.yandex.net/v1/disk";
const APP_FOLDER = "uprav-sovet/data";

export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get("file");
  console.log("GET /api/disk called, file:", file);
  console.log("Token exists:", !!YA_DISK_TOKEN);

  if (!file) {
    return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
  }

  try {
    // Проверяем токен
    const diskRes = await fetch(`${BASE_URL}`, {
      headers: { Authorization: `OAuth ${YA_DISK_TOKEN}` },
    });
    console.log("Disk API status:", diskRes.status);

    if (!diskRes.ok) {
      const errText = await diskRes.text();
      console.error("Disk API error:", errText);
      return NextResponse.json({ error: "Disk API error: " + diskRes.status }, { status: 500 });
    }

    // Пробуем скачать файл
    const downloadRes = await fetch(
      `${BASE_URL}/resources/download?path=/${APP_FOLDER}/${file}`,
      { headers: { Authorization: `OAuth ${YA_DISK_TOKEN}` } }
    );
    console.log("Download URL status:", downloadRes.status);

    if (downloadRes.status === 404) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const downloadData = await downloadRes.json();
    const fileRes = await fetch(downloadData.href);
    const data = await fileRes.json();
    return NextResponse.json(data);
  } catch (e: any) {
    console.error("GET error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  console.log("PUT /api/disk called");
  console.log("Token exists:", !!YA_DISK_TOKEN);

  try {
    const body = await request.json();
    const { file, data } = body;
    console.log("File:", file, "Data keys:", Object.keys(data));

    if (!file || !data) {
      return NextResponse.json({ error: "Missing file or data" }, { status: 400 });
    }

    // Проверяем токен
    const diskRes = await fetch(`${BASE_URL}`, {
      headers: { Authorization: `OAuth ${YA_DISK_TOKEN}` },
    });
    console.log("Disk API status:", diskRes.status);

    if (!diskRes.ok) {
      const errText = await diskRes.text();
      console.error("Disk API error:", errText);
      return NextResponse.json({ error: "Disk API error: " + diskRes.status }, { status: 500 });
    }

    // Создаём папку если нужно
    const folderRes = await fetch(`${BASE_URL}/resources?path=/${APP_FOLDER}`, {
      headers: { Authorization: `OAuth ${YA_DISK_TOKEN}` },
    });
    if (folderRes.status === 404) {
      console.log("Creating folder...");
      await fetch(`${BASE_URL}/resources?path=/${APP_FOLDER}`, {
        method: "PUT",
        headers: { Authorization: `OAuth ${YA_DISK_TOKEN}` },
      });
    }

    // Получаем ссылку для загрузки
    const uploadRes = await fetch(
      `${BASE_URL}/resources/upload?path=/${APP_FOLDER}/${file}&overwrite=true`,
      { headers: { Authorization: `OAuth ${YA_DISK_TOKEN}` } }
    );
    console.log("Upload URL status:", uploadRes.status);

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error("Upload URL error:", errText);
      return NextResponse.json({ error: "Upload URL error" }, { status: 500 });
    }

    const uploadData = await uploadRes.json();
    const jsonString = JSON.stringify(data, null, 2);

    const uploadFileRes = await fetch(uploadData.href, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: jsonString,
    });
    console.log("Upload file status:", uploadFileRes.status);

    if (!uploadFileRes.ok) {
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("PUT error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
