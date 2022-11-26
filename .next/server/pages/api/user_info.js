"use strict";
(() => {
var exports = {};
exports.id = 550;
exports.ids = [550];
exports.modules = {

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 8545:
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ 5660:
/***/ ((module) => {

module.exports = require("pino-caller");

/***/ }),

/***/ 3009:
/***/ ((module) => {

module.exports = require("pino-pretty");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 2489:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _library_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1441);
/* harmony import */ var _library_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6686);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])({
    onError: (err, req, res, next)=>{
        console.log("api/user_info::Error ");
        console.error(err.stack);
        res.status(500).end("api/user_info:: Something broke!");
    },
    onNoMatch: (req, res)=>{
        res.status(404).end("api/user_info:: Page is not found");
    }
}).post(async (req, res)=>{
    console.log("api/user_info::POST request");
    //console.log(req.body) // req body 가 자동으로 바뀌네 ㅎ....
    const { token  } = req.body;
    const id = (0,_library_cookie__WEBPACK_IMPORTED_MODULE_2__/* .decodeJWT */ .xp)(token);
    const data = await (0,_library_mongodb__WEBPACK_IMPORTED_MODULE_1__/* .findUser */ .oe)(id);
    const detail = await (0,_library_mongodb__WEBPACK_IMPORTED_MODULE_1__/* .findDetail */ .SL)(id);
    if (!data && !detail) {
        res.json({
            data: "no matching"
        });
    }
    return res.json({
        data,
        detail
    });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [686,441], () => (__webpack_exec__(2489)));
module.exports = __webpack_exports__;

})();