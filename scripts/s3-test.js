const { uploadObject, getPresignedUrl } = require("../apps/config/s3-client.js");

async function main() {
	const key = "test.txt";
	await uploadObject(key, "Hello World!", "text/plain");
	console.log(`[uploaded] ${key}`);
	console.log(`[view] ${await getPresignedUrl(key)}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
