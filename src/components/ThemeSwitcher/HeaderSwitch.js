import React from "react";
import { Form } from "react-bootstrap";
import { theme as baseTheme } from "../../utils";
import { useTranslations } from "next-intl";


const HeaderSwitch = ({
  headerAlignment,
  setHeaderAlignment,
  headerTheme,
  setHeaderTheme,
  headerButton,
  setHeaderButton,
  headerFluid,
  setHeaderFluid,
}) => {
  const handleAlignmentChange = (e) => setHeaderAlignment(e.target.value);
  const handleThemeChange = (e) => setHeaderTheme(e.target.value);
  const handleButtonChange = (e) => setHeaderButton(!headerButton);
  const handleFluidChange = (e) => setHeaderFluid(!headerFluid);
  let t = useTranslations();

  return (
    <div className="mb-12" style={{ fontFamily: "Circular Std, sans-serif" }}>
      <div className="header-switcher-wrapper">
        <fieldset>
          <legend className="title heading-text-7 mb-6 fw-bold">
            {t("header_switcher")}
          </legend>
          <label className="name heading-text-9 mb-2 fw-light">
            {t("theme")}
          </label>
          <div className="mb-3">
            <Form.Check
              label={t("dark")}
              name="group2"
              value="dark"
              type="radio"
              id="headerDark"
              className="header-switcher__check-box"
              checked={headerTheme === baseTheme.headerVariants.theme.dark}
              onChange={handleThemeChange}
            />
            <Form.Check
              label={t("light")}
              name="group2"
              value="light"
              type="radio"
              id="headerLight"
              className="header-switcher__check-box"
              checked={headerTheme === baseTheme.headerVariants.theme.light}
              onChange={handleThemeChange}
            />
          </div>
          <label className="name heading-text-9 mb-2 fw-light">
            {t("alignment")}
          </label>
          <div className="mb-3">
            <Form.Check
              label={t("left")}
              name="groupAlign"
              value={baseTheme.headerVariants.align.left}
              type="radio"
              id="left"
              className="header-switcher__check-box"
              checked={headerAlignment === baseTheme.headerVariants.align.left}
              onChange={handleAlignmentChange}
            />
            <Form.Check
              label={t("center")}
              name="groupAlign"
              value={baseTheme.headerVariants.align.center}
              type="radio"
              id="center"
              className="header-switcher__check-box"
              checked={
                headerAlignment === baseTheme.headerVariants.align.center
              }
              onChange={handleAlignmentChange}
            />
            <Form.Check
              label={t("right")}
              name="groupAlign"
              value={baseTheme.headerVariants.align.right}
              type="radio"
              id="right"
              className="header-switcher__check-box"
              checked={headerAlignment === baseTheme.headerVariants.align.right}
              onChange={handleAlignmentChange}
            />
          </div>
          <label className="name heading-text-9 mb-2 fw-light">
            Button
          </label>
          <div className="mb-3">
            <Form.Check
              label={t("contact_button")}
              name="groupButton"
              defaultChecked={headerButton}
              type="checkbox"
              id="isButton"
              className="header-switcher__check-box"
              onChange={handleButtonChange}
            />
          </div>
          <label className="name heading-text-9 mb-2 fw-light">
            Fluid
          </label>
          <div className="mb-3">
            <Form.Check
              label="is Fluid"
              name="groupFluid"
              defaultChecked={headerFluid}
              type="checkbox"
              id="isFluid"
              className="header-switcher__check-box"
              onChange={handleFluidChange}
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default HeaderSwitch;
