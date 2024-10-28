import { prefixStorage } from "unstorage";

interface GoogleTokens {
  refresh_token: string;
}

export const authStorage = () => prefixStorage<GoogleTokens>(hubKV(), "auth");
