import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv/config";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

const region = requiredEnv("AWS_REGION");
const endpoint = requiredEnv("AWS_ENDPOINT_URL_S3");
const accessKeyId = requiredEnv("AWS_ACCESS_KEY_ID");
const secretAccessKey = requiredEnv("AWS_SECRET_ACCESS_KEY");
const bucket = requiredEnv("AWS_BUCKET_NAME");
const s3 = new S3Client({ region, endpoint, forcePathStyle: true, credentials: { accessKeyId, secretAccessKey } });

export async function uploadObject(key: string, body: NonNullable<ConstructorParameters<typeof PutObjectCommand>[0]["Body"]>, contentType = "application/octet-stream") {
  await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }));
  return { bucket, key };
}

export async function getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
  return getSignedUrl(s3, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn });
}

export { s3, bucket };
