"use strict";
(() => {
var exports = {};
exports.id = 372;
exports.ids = [372];
exports.modules = {

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

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

/***/ 3122:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ requireAuth)
/* harmony export */ });
/* harmony import */ var _library_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6686);

function requireAuth(req, res, next) {
    if (req.cookies.token) {
        //console.log('hi')   
        console.log("MW requireAuth::");
        var decoded = (0,_library_cookie__WEBPACK_IMPORTED_MODULE_0__/* .decodeJWT */ .xp)(req.cookies.token);
        if (req.method == "GET") {
            return res.json({
                data: decoded.id
            });
        }
        req.idd = decoded.id;
    }
    next();
}


/***/ }),

/***/ 7271:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8013);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5616);
/* harmony import */ var _library_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1441);
/* harmony import */ var _middleware_requireAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3122);
/* harmony import */ var _library_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2694);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_1__]);
next_connect__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction





const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;
//const BACK_URL = "http://illinoiskorean.web.illinois.edu/predict";
async function getMatchList(id) {
    _library_logger__WEBPACK_IMPORTED_MODULE_4__/* ["default"].info */ .ZP.info({
        id
    }, "getMatchList::exec - Request to BackEnd server Result Below");
    var axios = __webpack_require__(2167);
    var config = {
        method: "post",
        url: BACK_URL,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            id
        })
    };
    let axiosResult = await axios(config);
    const final = axiosResult.data;
    _library_logger__WEBPACK_IMPORTED_MODULE_4__/* ["default"].info */ .ZP.info({
        final
    }, "getMatchList:: Retrieved Data");
    return final;
}
const handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_1__["default"])({
    onError: (err, req, res, next)=>{
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res)=>{
        res.status(404).end("Page is not found");
    }
}).use(_middleware_requireAuth__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z).post(async (req, res)=>{
    try {
        const parsedBody = JSON.parse(req.body);
        _library_logger__WEBPACK_IMPORTED_MODULE_4__/* ["default"].info */ .ZP.info({
            reqbody: parsedBody
        }, "api/information:: POST request");
        const objectToInsert = {
            _id: new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId(req.idd),
            name: parsedBody.name,
            MBTI: parsedBody.mbti,
            sex: parsedBody.gender,
            m_n: parsedBody.lifePattern,
            major: parsedBody.majorCategory,
            friend: parsedBody.numberInvitation,
            food: parsedBody.favoriteFoodCategory,
            age: parsedBody.ageCategory,
            year: parsedBody.schoolYear,
            religion: parsedBody.religionCategory
        };
        const inserted_id = await (0,_library_mongodb__WEBPACK_IMPORTED_MODULE_2__/* .insertUser */ ._Y)(objectToInsert, req.idd);
        const id_string = inserted_id?.toString();
        await (0,_library_mongodb__WEBPACK_IMPORTED_MODULE_2__/* .insertDetail */ .aO)(id_string, parsedBody.description);
        const matchList = await getMatchList(id_string);
        console.log(matchList);
        const listId = matchList.id;
        const listName = matchList.names;
        await (0,_library_mongodb__WEBPACK_IMPORTED_MODULE_2__/* .insertMatch */ .vy)(id_string, listId, listName);
        return res.send("success");
    } catch (e) {
        _library_logger__WEBPACK_IMPORTED_MODULE_4__/* ["default"].error */ .ZP.error(e, "api/information:: ERROR occured");
        //console.log(e);
        return res.send("fail");
    }
}).get(async (_req, res)=>{
    return res.send("hello");
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
var __webpack_exports__ = __webpack_require__.X(0, [686,441], () => (__webpack_exec__(7271)));
module.exports = __webpack_exports__;

})();