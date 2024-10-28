import type { SecureSessionData } from "#auth-utils";
import { prefixStorage } from "unstorage";

export const authStorage = () =>
  prefixStorage<SecureSessionData>(hubKV(), "auth");
