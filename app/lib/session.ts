import jwt from "jsonwebtoken";

export const getSession = (cookies: Partial<Record<string, string>>) => {
  const session = cookies.wp_session;

  if (session) {
    const sessionData = jwt.verify(
      session,
      process.env.ACCESS_TOKEN_SECRET,
      (err, user) => {
        if (err) return false;
        return user;
      }
    );

    return sessionData;
  }
};
