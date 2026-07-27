import { NextRequest, NextResponse } from "next/server";

const YA_DISK_TOKEN = process.env.YA_DISK_TOKEN || "";
const BASE_URL = "https://cloud-api.yandex.net/v1/disk";
const APP_FOLDER = "app/data";

async function ensureFolder() {
  const res = await fetch(`${BASE_URL}/resources?path=/${APP_FOLDER}`, {
    headers: { Authorization: `OAuth ${YA_DISK_TOKEN}` },
  });
  if (res.status === 404) {
    await fetch(`${BASE_URL}/resources?path=/${APP_FOLDER}`, {
      method: "PUT",
      headers: { Authorization: `OAuth ${YA_DISK_TOKEN}` },
    });
  }
}

export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get("file");
  if (!file) {
    return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
  }

  try {
    const downloadRes = await fetch(
      `${BASE_URL}/resources/download?path=/${APP_FOLDER}/${file}`,
      { headers: { Authorization: `OAuth ${YA_DISK_TOKEN}` } }
    );

    if (downloadRes.status === 404) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const downloadData = await downloadRes.json();
    const fileRes = await fetch(downloadData.href);
    const data = await fileRes.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Failed to load file" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { file, data } = await request.json();
  if (!file || !data) {
    return NextResponse.json({ error: "Missing file or data" }, { status: 400 });
  }

  try {
    await ensureFolder();

    const uploadRes = await fetch(
      `${BASE_URL}/resources/upload?path=/${APP_FOLDER}/${file}&overwrite=true`,
      { headers: { Authorization: `OAuth ${YA_DISK_TOKEN}` } }
    );

    const uploadData = await uploadRes.json();
    const jsonString = JSON.stringify(data, null, 2);

    await fetch(uploadData.href, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: jsonString,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}
