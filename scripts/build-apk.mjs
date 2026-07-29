import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.resolve(__dirname, "..");
const ANDROID_DIR = path.join(PROJECT_DIR, "android");
const KEYSTORE_PATH = path.join(PROJECT_DIR, "release.keystore");

const APP_HOST = process.env.APP_HOST || "personal-notes-teal-six.vercel.app";
const APP_URL = process.env.APP_URL || "https://personal-notes-teal-six.vercel.app";

async function main() {
  console.log(`Building RELEASE APK for ${APP_HOST}`);

  // Удаляем старую android папку
  if (fs.existsSync(ANDROID_DIR)) {
    fs.rmSync(ANDROID_DIR, { recursive: true, force: true });
  }

  // Создаём релизный ключ
  if (!fs.existsSync(KEYSTORE_PATH)) {
    console.log("Creating release keystore...");
    execSync(
      `keytool -genkey -v -keystore "${KEYSTORE_PATH}" -alias release -keyalg RSA -keysize 2048 -validity 10000 -storepass rustore123 -keypass rustore123 -dname "CN=MBDOU, OU=Admin, O=MBDOU, L=Vyborg, ST=Lenobl, C=RU"`,
      { stdio: "inherit" }
    );
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

  // Подписываем APK
  console.log("Signing APK...");
  const apkPath = path.join(ANDROID_DIR, "app", "build", "outputs", "apk", "release");
  if (fs.existsSync(apkPath)) {
    const apkFiles = fs.readdirSync(apkPath).filter((f) => f.endsWith(".apk"));
    for (const apk of apkFiles) {
      const unsignedApk = path.join(apkPath, apk);
      const signedApk = path.join(apkPath, "app-release-signed.apk");
      
      execSync(
        `"${process.env.JAVA_HOME || 'C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.14.7-hotspot'}\\bin\\apksigner" sign --ks "${KEYSTORE_PATH}" --ks-pass pass:rustore123 --ks-key-alias release --out "${signedApk}" "${unsignedApk}"`,
        { stdio: "inherit" }
      );
      
      console.log(`\nSigned APK: ${signedApk}`);
    }
  }

  console.log("\nRELEASE APK build completed!");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
