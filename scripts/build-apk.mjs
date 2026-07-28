import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.resolve(__dirname, "..");
const ANDROID_DIR = path.join(PROJECT_DIR, "android");
const KEYSTORE_PATH = path.join(PROJECT_DIR, "android.keystore");

const APP_HOST = process.env.APP_HOST || "personal-notes-teal-six.vercel.app";
const APP_URL = process.env.APP_URL || "https://personal-notes-teal-six.vercel.app";

async function main() {
  console.log(`Building APK for ${APP_HOST}`);

  // Создаём Android проект через Bubblewrap
  console.log("Creating TWA project...");
  execSync(`npx @bubblewrap/cli init --manifest="${APP_URL}/manifest.webmanifest" --directory="${ANDROID_DIR}"`, {
    stdio: "inherit",
    cwd: PROJECT_DIR,
  });

  // Создаём ключ
  if (!fs.existsSync(KEYSTORE_PATH)) {
    console.log("Creating keystore...");
    execSync(
      `keytool -genkey -v -keystore "${KEYSTORE_PATH}" -alias android -keyalg RSA -keysize 2048 -validity 10000 -storepass android -keypass android -dname "CN=Developer, OU=Dev, O=Organization, L=City, ST=State, C=RU"`,
      { stdio: "inherit" }
    );
  }

  // Собираем APK
  console.log("Building APK...");
  execSync(`"${ANDROID_DIR}/gradlew" assembleDebug`, {
    cwd: ANDROID_DIR,
    stdio: "inherit",
  });

  const apkPath = path.join(ANDROID_DIR, "app", "build", "outputs", "apk", "debug");
  if (fs.existsSync(apkPath)) {
    const files = fs.readdirSync(apkPath).filter((f) => f.endsWith(".apk"));
    console.log("\nAPK files:");
    files.forEach((f) => console.log(`  ${path.join(apkPath, f)}`));
  }

  console.log("\nAPK build completed!");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
