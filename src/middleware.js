import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { i18n } from "../i18n-config";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

export default createMiddleware(i18n);

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

const locales = i18n.locales;

const getLocale = (request) => {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
};

export function middleware(req) {
  //   // const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl;
  const searchParams = req.nextUrl.search;
  // console.log("url", url);
  const pathnameHasLocale = locales.some(
    (locale) =>
      url.pathname.startsWith(`/${locale}/`) || url.pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;
  const locale = getLocale(req);
  req.nextUrl.pathname = `/${locale}${url.pathname}`;
  return NextResponse.rewrite(
    new URL(`${req.nextUrl.pathname}${searchParams}`, req.url)
  );
}
