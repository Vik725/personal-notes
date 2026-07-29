import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.resolve(__dirname, "..");
const ANDROID_DIR = path.join(PROJECT_DIR, "android");

const APP_HOST = process.env.APP_HOST || "personal-notes-teal-six.vercel.app";
const APP_URL = process.env.APP_URL || "https://personal-notes-teal-six.vercel.app";

async function main() {
  console.log(`Building RELEASE APK for ${APP_HOST}`);

  // Удаляем старую android папку
  if (fs.existsSync(ANDROID_DIR)) {
    fs.rmSync(ANDROID_DIR, { recursive: true, force: true });
  }

  // Создаём Android проект через Bubblewrap
  console.log("Creating TWA project...");
  execSync(`npx @bubblewrap/cli init --manifest="${APP_URL}/manifest.webmanifest" --directory="${ANDROID_DIR}"`, {
    stdio: "inherit",
    cwd: PROJECT_DIR,
  });

  // Собираем релизный APK
  console.log("Building RELEASE APK...");
  execSync(`"${ANDROID_DIR}/gradlew" assembleRelease`, {
    cwd: ANDROID_DIR,
    stdio: "inherit",
  });

  const apkPath = path.join(ANDROID_DIR, "app", "build", "outputs", "apk", "release");
  if (fs.existsSync(apkPath)) {
    const files = fs.readdirSync(apkPath).filter((f) => f.endsWith(".apk"));
    console.log("\nAPK files:");
    files.forEach((f) => console.log(`  ${path.join(apkPath, f)}`));
  }

  console.log("\nRELEASE APK build completed!");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
