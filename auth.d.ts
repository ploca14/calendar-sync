// auth.d.ts
declare module "#auth-utils" {
  interface User {
    name: string;
    givenName: string;
    familyName: string;
    email: string;
    picture: string;
  }

  interface UserSession {
    user: User;
  }

  interface SecureSessionData {
    accessToken: string;
  }
}

export {};
