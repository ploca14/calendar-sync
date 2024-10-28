import { prefixStorage } from "unstorage";

interface GoogleTokens {
  refresh_token: string;
  access_token: string;
  expires_at: number;
}

export const authStorage = () => prefixStorage<GoogleTokens>(hubKV(), "auth");
