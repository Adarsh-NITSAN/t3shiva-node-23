import _ from "lodash";
import getAPIData from "./API";

export const getRoute = ({ lang, langPages, defaultLocale }) => {
  let path;
  langPages.map((langPage) => {
    if (lang === langPage.twoLetterIsoCode) {
      if (lang === defaultLocale) {
        path = langPage.link;
      } else {
        path = langPage.link.substring(3);
      }
    }
  });
  return path;
};

const getRoutes = (menuData, lang, defaultLocale) => {
  var mainMenu = [];

  const mainNavMenu = menuData?.data?.navigation[0]?.children.map(
    (article) => {
      const link =
        lang === defaultLocale
          ? article.link.substring(1)
          : article.link.replace(`/${lang}/`, "");
      return {
        params: {
          slug: link.split("/"),
        },
        locale: lang,
      };
    }
  );

  var menuChildren = [];
  var subMenuChildren = [];

  menuData?.data?.navigation[0]?.children.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    var spreadMenuChildren = menus.children.map((child) => {
      let tempSubMenuChildren = [];
      if (child.children && child.children.length) {
        tempSubMenuChildren = child.children.map((subChildren) => {
          const subChildLink =
            lang === defaultLocale
              ? subChildren.link.substring(1)
              : subChildren.link.replace(`/${lang}/`, "");
          return {
            params: {
              slug: subChildLink.split("/"),
            },
            locale: lang,
          };
        });
      }
      subMenuChildren = [...subMenuChildren, ...tempSubMenuChildren];

      const subLink =
        lang === defaultLocale
          ? child.link.substring(1)
          : child.link.replace(`/${lang}/`, "");
      return {
        params: {
          slug: subLink.split("/"),
        },
        locale: lang,
      };
    });
    menuChildren = [...menuChildren, ...subMenuChildren, ...spreadMenuChildren];
  });

  if((mainNavMenu && mainNavMenu.length) || (menuChildren && menuChildren.length)){
    mainMenu = [...mainNavMenu, ...menuChildren];
    return mainMenu;
  }
};

const getNewsRoutes = (newsData, lang, defaultLocale) => {
  let allNews = [];

  var newsMenu =
    newsData.data["content"]["colPos0"][0]["content"]["data"]["list"];
  if (newsMenu) {
    var news = newsMenu.map((article) => {
      let newsArr;
      if (lang === defaultLocale) {
        newsArr = article.slug.substring(1).split("/");
      } else {
        newsArr = article.slug.substring(4).split("/");
      }
      return {
        params: {
          slug: newsArr,
        },
        locale: lang,
      };
    });
    allNews = [...allNews, ...news];
  }

  return allNews;
};

export const Routes = async ({locale,defaultLocale}) => {
  let menuData = await getAPIData(
    `${locale === defaultLocale ? "?type=834" : locale + "?type=834"}`
  );

  let newsData = await getAPIData(
    `${locale === defaultLocale ? "news" : locale + "/news"}`
  );

  let allNews = [];

  let pages = [];

  let getLNRoutes = [];
  getLNRoutes = getRoutes(menuData, locale, defaultLocale);

  if(getLNRoutes && getLNRoutes.length !== 0){
    pages = [...pages, ...getLNRoutes];
  }

  let getLNNewsRoutes = [];
  if (newsData && newsData.data) {
    getLNNewsRoutes = getNewsRoutes(newsData, locale, defaultLocale);
  }

  allNews = [...allNews, ...getLNNewsRoutes];

  var paths = allNews ? pages.concat(allNews) : pages;
  return paths;
};

export default Routes;
