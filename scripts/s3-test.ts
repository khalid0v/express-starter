import { getPresignedUrl, uploadObject } from "../apps/config/s3-client.js";

async function main(): Promise<void> {
  const key = "test.txt";
  await uploadObject(key, "Hello World!", "text/plain");
  console.info(`[uploaded] ${key}`);
  console.info(`[view] ${await getPresignedUrl(key)}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
