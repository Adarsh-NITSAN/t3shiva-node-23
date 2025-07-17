import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: await (locale === "en"
    ? import("./assets/localization/en.json")
    : import(`./assets/localization/${locale}.json`)
  ).default,
}));
