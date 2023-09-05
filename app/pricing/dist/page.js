"use strict";
exports.__esModule = true;
var card_1 = require("@/components/ui/card");
var react_1 = require("react");
function page() {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: 'flex items-center justify-center h-screen' },
            react_1["default"].createElement("div", { className: 'flex gap-2' },
                react_1["default"].createElement(card_1["default"], { title: 'Basic', desc: 'Free tier up to 1 mb file upload and up to 3 file selection', price: 0 }),
                react_1["default"].createElement(card_1["default"], { title: 'Premium', desc: 'Premium version up to 100 mb file upload and up to unlimited file selection', price: 7 }),
                react_1["default"].createElement(card_1["default"], { title: 'Super', desc: 'Super version up to 1 gb file upload and up to unlimited file selection', price: 14 })))));
}
exports["default"] = page;
