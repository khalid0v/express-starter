require("dotenv").config();
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const required = [
	"AWS_REGION",
	"AWS_ENDPOINT_URL_S3",
	"AWS_ACCESS_KEY_ID",
	"AWS_SECRET_ACCESS_KEY",
	"AWS_BUCKET_NAME",
];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
	throw new Error(`Missing env vars: ${missing.join(", ")}`);
}

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	endpoint: process.env.AWS_ENDPOINT_URL_S3,
	forcePathStyle: true,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const bucket = process.env.AWS_BUCKET_NAME;

async function uploadObject(key, body, contentType = "application/octet-stream") {
	await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }));
	return { bucket, key };
}

async function getPresignedUrl(key, expiresIn = 3600) {
	return getSignedUrl(s3, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn });
}

module.exports = { s3, bucket, uploadObject, getPresignedUrl };
