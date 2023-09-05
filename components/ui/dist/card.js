'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("./button");
var link_1 = require("next/link");
function CardComponent(_a) {
    var title = _a.title, desc = _a.desc, price = _a.price;
    return (react_1["default"].createElement("div", { className: 'w-[340px]  min-h-[340px] bg-red-300 text-zinc-700 px-2 py-6 rounded-lg' },
        react_1["default"].createElement("h1", { className: 'text-[2rem]' }, title),
        react_1["default"].createElement("p", { className: 'py-5 font-light h-[200px]' }, desc),
        react_1["default"].createElement("div", { className: 'text-center' },
            react_1["default"].createElement("p", { className: ' text-[1.5rem] text-center' },
                "$ ",
                price),
            react_1["default"].createElement(button_1.Button, { asChild: true, className: 'px-16 py-6', disabled: true },
                react_1["default"].createElement(link_1["default"], { "aria-disabled": true, href: '/login' }, "Comin soon")))));
}
exports["default"] = CardComponent;
