"use client";

import React, { useState, useContext } from "react";
import { ListGroup, Collapse } from "react-bootstrap";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import GlobalContext from "../../context/GlobalContext";
import SearchForm from "../Search/SearchForm";
import { usePathname } from "next/navigation";

const MenuItem = ({
  title,
  isExternal = false,
  link,
  children,
  depthStep = 20,
  depth = 0,
  is_disable,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const gContext = useContext(GlobalContext);
  const pathname = usePathname();
  const hasSubItems = children && children.length ? true : false;

  const checkIsActive = (children) => {
    let isActive = false;

    children.map((child, id) => {
      if (child.children && child.children.length) {
        child.children.map((subChild, subId) => {
          if (
            subChild.link === pathname ||
            subChild.link === `/de${pathname}`
          ) {
            isActive = true;
          }
        });
      }

      if (child.link === pathname || child.link === `/de${pathname}`) {
        isActive = true;
      }
    });

    return isActive;
  };

  return (
    <>
      {hasSubItems ? (
        <ListGroup.Item
          {...rest}
          style={{
            padding: `0px ${depth * depthStep}px !important`,
            cursor: "pointer",
          }}
          className={`d-flex align-items-center justify-content-between  display-item-${is_disable} ${
            open ? "sub-menu-open" : ""
          }`}
        >
          <Link
            href={`${link}`}
            className={`pl-3 ${checkIsActive(children) ? "text-blue" : ""}`}
            onClick={() => {
              if (gContext.visibleOffCanvas) {
                gContext.toggleOffCanvas();
              }
            }}
          >
            {title}
          </Link>
          <span onClick={() => setOpen(!open)}>
            {open ? <FaAngleDown /> : <FaAngleRight />}
          </span>
        </ListGroup.Item>
      ) : (
        <ListGroup.Item
          {...rest}
          style={{
            paddingLeft: `${depth * depthStep}px !important`,
          }}
        >
          {isExternal ? (
            <a
              href={`${link}`}
              onClick={() => {
                if (gContext.visibleOffCanvas) {
                  gContext.toggleOffCanvas();
                }
              }}
              className="pl-3 py-3"
            >
              {title}
            </a>
          ) : (
            <Link
              href={`${link}`}
              onClick={() => {
                if (gContext.visibleOffCanvas) {
                  gContext.toggleOffCanvas();
                }
              }}
              className={`pl-3 py-3 ${
                link === pathname || link === `/de${pathname}`
                  ? "text-blue"
                  : ""
              }`}
            >
              {title}
            </Link>
          )}
        </ListGroup.Item>
      )}

      {hasSubItems ? (
        <Collapse in={open}>
          <ListGroup>
            {children.map((subItem) => (
              <MenuItem
                key={subItem.title}
                depth={depth + 1}
                depthStep={depthStep}
                title={subItem.title}
                link={subItem.link}
                {...subItem}
              />
            ))}
          </ListGroup>
        </Collapse>
      ) : null}
    </>
  );
};

const NestedMenu = ({ menuItems, setShowSearchForm }) => {
  return (
    <div className="nested-menu-container">
      <ListGroup variant="flush">
        {menuItems &&
          menuItems["data"]["navigation"][0]["children"].map(
            (menuItem, index) => (
              <MenuItem
                key={`${menuItem.title}${index}`}
                depthStep={20}
                depth={0}
                {...menuItem}
              />
            )
          )}
        <ListGroup.Item>
          <SearchForm setShowSearchForm={setShowSearchForm} />
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default NestedMenu;
