import React, { useState, useEffect, useRef } from "react";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import GraniteLogo from "./GraniteLogo";

const NavBar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef();
  const userName = getFromLocalStorage("authUserName");
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <header className="bg-primary-white sticky top-0 z-20 w-full border-b border-gray-200 transition-all duration-500">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="w-max flex-shrink-0">
            <Link className="h-full w-auto" to="/">
              <GraniteLogo className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            <Link
              to="/"
              className={classnames("text-sm font-medium text-gray-800", {
                "text-indigo-600": location.pathname === "/",
              })}
            >
              Todos
            </Link>
            <Link
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:shadow"
              to="/tasks/create"
            >
              Add new task
            </Link>
            <div className="relative" ref={menuRef}>
              <Link
                className="flex items-center gap-x-1 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:shadow"
                onClick={toggleMenu}
              >
                <span className="block">{userName}</span>
                <i className="ri-arrow-down-s-line" />
              </Link>
              {isMenuVisible && (
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-gray-300 bg-white py-1 shadow-xl">
                  <Link
                    className="block px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-100"
                    to="/my/preferences"
                  >
                    Preferences
                  </Link>
                  <Link
                    className="block px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-100"
                    to="/tasks/report"
                  >
                    Download Report
                  </Link>
                  <Link
                    className="block cursor-pointer px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Log out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
