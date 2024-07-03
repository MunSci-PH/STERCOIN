import { StorageClient } from "@supabase/storage-js";

const STORAGE_URL = "https://dhhujdbejybtdrgutooo.supabase.co/storage/v1";
const SERVICE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; //! service key, not anon key

export const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});
