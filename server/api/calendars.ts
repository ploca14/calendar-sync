import { google } from "googleapis";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);

  if (!session.secure) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const oauthClient = useOAuthClient(session.secure);

  const calendars = google.calendar({ version: "v3", auth: oauthClient });

  const res = await calendars.calendarList.list();

  return res.data.items?.map((item) => ({
    id: item.id,
    summary: item.summaryOverride ?? item.summary,
  }));
});
