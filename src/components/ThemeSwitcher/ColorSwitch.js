import React from "react";
import { SketchPicker } from "react-color";

const ColorSwitch = ({ title, color, setColor, isRGBA }) => {
  return (
    <>
      <label className="name heading-text-9 mb-2 fw-light">{title}</label>
      <div className="border mb-2 header-switcher__color-box">
        <div className="color-in px-2 py-2 border-right">
          <span
            className="color"
            style={{ backgroundColor: color.color }}
            onClick={() => setColor({ ...color, visible: !color.visible })}
          ></span>
        </div>
        <div className="hexa-in px-4 py-4">{color.color}</div>
      </div>
      {color.visible && (
        <>
          <div
            onClick={() => setColor({ ...color, visible: false })}
            className="color-box__cover"
          ></div>
          <SketchPicker
            color={color.color}
            onChange={({ rgb, hex, ...props }) => {
              setColor({
                ...color,
                visible: true,
                color: isRGBA
                  ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
                  : hex,
              });
            }}
          />
        </>
      )}
    </>
  );
};

export default ColorSwitch;
