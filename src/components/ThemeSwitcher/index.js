import { useRef, useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { BsFillGearFill } from "react-icons/bs";
import GlobalContext from "../../context/GlobalContext";
import HeaderSwitch from "./HeaderSwitch";
import LayoutSwitch from "./LayoutSwitch";
import FontFamilySwitch from "./FontFamilySwitch";
import TypographySwitch from "./TypographySwitch";
import ColorSwitch from "./ColorSwitch";
import { useTranslations } from "next-intl";

const ThemeSwitcher = ({ pageData }) => {
  const { menu_align, is_fluid, is_dark, is_button } =
    pageData.data.page.appearance;
  const { primaryColor, secondaryColor, tertiaryColor, textColor } =
    pageData.data.page.constants.ns_style;
  const {
    header,
    setHeader,
    themeSwitcher,
    setThemeSwitcher,
    boxedLayout,
    setBoxedLayout,
  } = useContext(GlobalContext);

  const [primary, setPrimary] = useState({
    visible: false,
    color: primaryColor.value,
  });
  const [secondary, setSecondary] = useState({
    visible: false,
    color: secondaryColor.value,
  });
  const [tertiary, setTertiary] = useState({
    visible: false,
    color: tertiaryColor.value,
  });
  const [text, setText] = useState({
    visible: false,
    color: textColor.value,
  });
  const [typography, setTypography] = useState({
    fontSize: pageData.data.page.constants.ns_style.fontSize.value,
    lineHeight: pageData.data.page.constants.ns_style.lineHeight.value,
  });
  const [headerAlignment, setHeaderAlignment] = useState(menu_align);
  const [headerTheme, setHeaderTheme] = useState(
    parseInt(is_dark) ? "dark" : "light"
  );
  const [headerButton, setHeaderButton] = useState(parseInt(is_button));
  const [headerFluid, setHeaderFluid] = useState(parseInt(is_fluid));

  const t = useTranslations();
  useEffect(() => {
    // if (typeof document !== undefined) {
    //   document.addEventListener("click", function (e) {
    //     const themeInfo = JSON.parse(localStorage.getItem("theme"));
    //     setThemeSwitcher({
    //       ...themeSwitcher,
    //       sideBarVisible: false,
    //       fontFamilyName: themeInfo?.fontFamilyName,
    //       fontFamilyLink: themeInfo?.fontFamilyLink,
    //     });
    //   });
    // }

    function getThemeVariable(themeVar) {
      const theme = JSON.parse(localStorage.getItem("theme"));

      if (theme && theme[themeVar]) {
        return theme[themeVar];
      } else {
        return false;
      }
    }

    setPrimary({
      ...primary,
      color: getThemeVariable("primary")
        ? getThemeVariable("primary")
        : primaryColor.value,
    });
    setSecondary({
      ...secondary,
      color: getThemeVariable("secondary")
        ? getThemeVariable("secondary")
        : secondaryColor.value,
    });
    setTertiary({
      ...tertiary,
      color: getThemeVariable("tertiary")
        ? getThemeVariable("tertiary")
        : tertiaryColor.value,
    });
    setText({
      ...text,
      color: getThemeVariable("text")
        ? getThemeVariable("text")
        : getComputedStyle(document.body).getPropertyValue("--color-headings"),
    });
    setTypography({
      ...typography,
      fontSize: getThemeVariable("fontSize")
        ? getThemeVariable("fontSize")
        : pageData.data.page.constants.ns_style.fontSize.value,
      lineHeight: getThemeVariable("lineHeight")
        ? getThemeVariable("lineHeight")
        : pageData.data.page.constants.ns_style.lineHeight.value,
    });
  }, []);

  useEffect(() => {
    setHeader({
      ...header,
      align: headerAlignment,
      theme: headerTheme,
      button: headerButton,
      isFluid: headerFluid,
    });
  }, [headerAlignment, headerTheme, headerButton, headerFluid]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-size",
      `${typography.fontSize}px`
    );
    document.documentElement.style.setProperty(
      "--line-height",
      `${typography.lineHeight}px`
    );
  }, [typography]);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", `${primary.color}`);
    document.documentElement.style.setProperty(
      "--secondary",
      `${secondary.color}`
    );
    document.documentElement.style.setProperty(
      "--tertiary",
      `${tertiary.color}`
    );
    document.body.style.setProperty("--color-headings", `${text.color}`);
  }, [primary, secondary, tertiary, text]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const theme = {
      primary: primary.color,
      secondary: secondary.color,
      tertiary: tertiary.color,
      text: text.color,
      fontSize: typography.fontSize,
      lineHeight: typography.lineHeight,
      fontFamilyLink: themeSwitcher.fontFamilyLink,
      fontFamilyName: themeSwitcher.fontFamilyName,
      boxedLayout,
    };

    localStorage.setItem("theme", JSON.stringify(theme));

    handleSettingsBar();
  };

  const resetTheme = (e) => {
    localStorage.removeItem("theme");

    setPrimary({
      ...primary,
      color: primaryColor.value,
    });
    setSecondary({
      ...secondary,
      color: secondaryColor.value,
    });
    setTertiary({
      ...tertiary,
      color: tertiaryColor.value,
    });
    setText({
      ...text,
      color: textColor.value,
    });
    setTypography({
      ...typography,
      fontSize: pageData.data.page.constants.ns_style.fontSize.value,
      lineHeight: pageData.data.page.constants.ns_style.lineHeight.value,
    });
    setThemeSwitcher({
      ...themeSwitcher,
      fontFamilyLink: pageData.data.page.constants.ns_style.siteFonts.value,
      fontFamilyName: "",
      sideBarVisible: !themeSwitcher.sideBarVisible,
    });

    setBoxedLayout(0);
  };

  const handleSettingsBar = () => {
    setThemeSwitcher({
      ...themeSwitcher,
      sideBarVisible: !themeSwitcher.sideBarVisible,
    });
  };

  const handleTypographyChange = (e) => {
    const { name, value } = e.target;
    const regValue = value.replace(/[^\d]/, "");
    if (parseInt(regValue) !== 0 && parseInt(regValue) <= 50) {
      setTypography({ ...typography, [name]: regValue });
    }
  };

  return (
    <div
      // ref={themeSwitcherContainer}
      className={`${
        themeSwitcher.sideBarVisible ? "active" : ""
      } d-none d-sm-flex theme-switcher-container`}
      // onClick={(e) => e.stopPropagation()}
    >
      <div className="theme-switcher__inner">
        <div className="px-10 py-7 d-flex brand-wrapper align-items-center">
          <BsFillGearFill className="mr-5" />
          <div
            className="brand-in"
            style={{ fontFamily: "Circular Std, sans-serif" }}
          >
            T3Shiva 2.0
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-inner px-10 py-10">
            <div
              className="mb-12"
              style={{ fontFamily: "Circular Std, sans-serif" }}
            >
              <legend className="title heading-text-7 mb-6 fw-bold">
                {t("theme_color")}
              </legend>
              <div className="color-picker-wrapper">
                <div className="color-box-wrapper mb-5">
                  <ColorSwitch
                    title={t("primary_color")}
                    color={primary}
                    setColor={setPrimary}
                  />
                </div>
                <div className="color-box-wrapper mb-5">
                  <ColorSwitch
                    title={t("secondary_color")}
                    color={secondary}
                    setColor={setSecondary}
                  />
                </div>
                <div className="color-box-wrapper mb-5">
                  <ColorSwitch
                    title={t("tertiary_color")}
                    color={tertiary}
                    setColor={setTertiary}
                  />
                </div>
                <div className="color-box-wrapper">
                  <ColorSwitch
                    title={t("text_color")}
                    color={text}
                    setColor={setText}
                  />
                </div>
              </div>
            </div>
            <TypographySwitch
              typography={typography}
              handleTypographyChange={handleTypographyChange}
            />
            <LayoutSwitch />
            <HeaderSwitch
              setHeaderAlignment={setHeaderAlignment}
              headerAlignment={headerAlignment}
              headerTheme={headerTheme}
              setHeaderTheme={setHeaderTheme}
              headerButton={headerButton}
              setHeaderButton={setHeaderButton}
              headerFluid={headerFluid}
              setHeaderFluid={setHeaderFluid}
            />
            <FontFamilySwitch
            // fonts={fonts} setFonts={setFonts}
            />
            <div
              className="btn-wrapper"
              style={{ fontFamily: "Circular Std, sans-serif" }}
            >
              <Button
                type="submit"
                className="blue-btn mr-2 control-btn "
                variant="primary"
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="light"
                className="control-btn "
                onClick={resetTheme}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div
        onClick={() => {
          handleSettingsBar();
        }}
        className="theme-switcher__settings-bar"
      >
        <BsFillGearFill />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
