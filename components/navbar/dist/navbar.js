"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_1 = require("react");
function Navbar() {
    return (react_1["default"].createElement("header", { className: 'fixed w-full z-50' },
        react_1["default"].createElement("div", { className: 'flex items-center gap-4 justify-between py-7 lg:px-14 px-2' },
            react_1["default"].createElement(link_1["default"], { href: '/', className: 'text-[1.5rem] text-[#f9c3c3] font-bold' }, "Pi"),
            react_1["default"].createElement("nav", null,
                react_1["default"].createElement("ul", { className: 'flex items-center lg:gap-8 gap-4 bg-white p-4 px-4 rounded-md' },
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement(link_1["default"], { href: '/pricing' }, "pricing")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement(link_1["default"], { href: '/features' }, "features")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement(link_1["default"], { href: '/guide' }, "guide")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement(link_1["default"], { href: '/login' }, "login")))))));
}
exports["default"] = Navbar;
