import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { theme as baseTheme } from "../../utils";
import GlobalContext from "../../context/GlobalContext";
import { useTranslations } from "next-intl";

const LayoutSwitch = () => {
  const { boxedLayout, setBoxedLayout } = useContext(GlobalContext);

  const handleLayout = (type) => {
    setBoxedLayout(type === baseTheme.layouts.boxed ? 1 : 0);
  };

  const t = useTranslations();

  return (
    <div
      className="mb-12 header-switcher__layout-switcher"
      style={{ fontFamily: "Circular Std, sans-serif" }}
    >
      <h3 className="title heading-text-7 mb-6">{t("layout_switcher")}</h3>
      <div className="color-picker-wrapper">
        <div className="color-box-wrapper mb-5">
          <label className="name heading-text-9 mb-2 fw-light">
            {t("layout_style")}
          </label>
          <div className="btn-wrapper">
            <Button
              variant={boxedLayout === 0 ? "primary" : "dark"}
              className="px-4 py-1 mr-3 layout-switcher__button"
              onClick={(e) => handleLayout(baseTheme.layouts.wide)}
              // style={{ backgroundColor: "#473bf0", borderColor: "#473bf0" }}
            >
              {t("wide")}
            </Button>
            <Button
              variant={boxedLayout === 0 ? "dark" : "primary"}
              className="px-4 py-1 layout-switcher__button"
              onClick={(e) => handleLayout(baseTheme.layouts.boxed)}
            >
              {t("boxed")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSwitch;
