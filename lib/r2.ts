import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

let _client: S3Client | null = null;

export function getR2Client() {
  if (_client) return _client;
  const accountId = requireEnv("R2_ACCOUNT_ID");
  _client = new S3Client({
    region: "auto",
    endpoint: process.env.S3_API_ENDPOINT ?? `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    },
  });
  return _client;
}

export function r2PublicUrl(key: string): string {
  const base = requireEnv("R2_PUBLIC_URL").replace(/\/$/, "");
  return `${base}/${key.replace(/^\//, "")}`;
}

export async function uploadToR2(opts: {
  key: string;
  body: Buffer | Uint8Array | Blob | string;
  contentType: string;
}): Promise<string> {
  const client = getR2Client();
  const bucket = requireEnv("R2_BUCKET");
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: opts.key,
      Body: opts.body,
      ContentType: opts.contentType,
    }),
  );
  return r2PublicUrl(opts.key);
}
