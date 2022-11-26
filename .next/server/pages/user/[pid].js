"use strict";
(() => {
var exports = {};
exports.id = 985;
exports.ids = [985];
exports.modules = {

/***/ 1201:
/***/ ((module, exports, __webpack_require__) => {

var __webpack_unused_export__;
// logger.js for server

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "ZP", ({
    enumerable: true,
    get: ()=>_default
}));
const _interopRequireDefault = (__webpack_require__(2648)/* ["default"] */ .Z);
const _pinoCaller = /*#__PURE__*/ _interopRequireDefault(__webpack_require__(5660));
const pino = __webpack_require__(8545);
const pretty = __webpack_require__(3009);
const path = __webpack_require__(1017);
const stream = pretty({
    colorize: true,
    //crlf: true,
    //singleLine : true
    messageFormat: "\nMessage: {msg}"
});
// Create a logging instance
const logger = (0, _pinoCaller.default)(pino(stream), {
    relativeTo: path.basename(__dirname)
});
__webpack_unused_export__ = logger;
const _default = logger;


/***/ }),

/***/ 7982:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ID),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./styles/Home.module.css
var Home_module = __webpack_require__(9399);
var Home_module_default = /*#__PURE__*/__webpack_require__.n(Home_module);
// EXTERNAL MODULE: ./components/NavBar.tsx
var NavBar = __webpack_require__(3280);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./components/SignoutButton.tsx


function SignoutButton({ children  }) {
    const router = (0,router_.useRouter)();
    function handleClick() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/");
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
            onClick: handleClick,
            children: "Sign Out"
        })
    });
}

;// CONCATENATED MODULE: external "mongodb"
const external_mongodb_namespaceObject = require("mongodb");
// EXTERNAL MODULE: ./library/logger.ts
var library_logger = __webpack_require__(1201);
;// CONCATENATED MODULE: ./library/mongodb.ts


const mongodb_crypto = __webpack_require__(6113);
var sha512 = function(password, salt) {
    var hash = mongodb_crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */ 
    hash.update(password);
    var value = hash.digest("hex");
    return {
        salt: salt,
        passwordHash: value
    };
};
function hashPassword(password) {
    const salt2 = mongodb_crypto.randomBytes(128).toString("base64");
    const { salt , passwordHash  } = sha512(password, salt2);
    return {
        salt: salt,
        passwordHash: passwordHash
    };
}
const DB = process.env.DB_NAME;
const DETAIL = "Details";
const MATCH = "Match";
const USER = "Users";
const LOGIN = "Login";
const URL = String(process.env.DB_HOST);
const insertUser = async (user, id)=>{
    logger.info({
        user,
        id
    }, "insertUser::exec");
    let result;
    const client = new MongoClient(URL);
    const userCollection = client.db(DB).collection(USER);
    try {
        const doesUserExist = await userExist(id);
        if (!doesUserExist) {
            console.log("insertUser::insert initiate...");
            const insert = await userCollection.insertOne(user);
            result = insert.insertedId;
            console.log("insertUser::new user inserted : " + result.toString());
        } else {
            console.log("insertUser::update initiate...");
            const update = await userCollection.replaceOne({
                _id: user._id
            }, user, {
                upsert: true
            });
            console.log(update);
            result = user._id;
        //console.log("insertUser::user updated : " + result.toString() )
        }
    } catch (e) {
        console.log("error while insertUser");
        console.log(e);
    } finally{
        await client.close();
        return result;
    }
};
const userExist = async (id)=>{
    logger.info({
        id
    }, "userExist::exec");
    const client = new MongoClient(URL);
    const userCollection = client.db(DB).collection(USER);
    const result = await userCollection.find({
        _id: new ObjectId(id)
    });
    if (!result) {
        console.log("userExist:: false");
        await client.close();
        return false;
    }
    console.log("userExist:: true");
    await client.close();
    return true;
};
const insertDetail = async (id, detail)=>{
    logger.info({
        id,
        detail
    }, "insertDetail::exec");
    let result;
    const client = new MongoClient(URL);
    const detailCollection = client.db(DB).collection(DETAIL);
    try {
        result = await detailCollection.insertOne({
            _id: new ObjectId(id),
            content: detail
        });
    } catch (e) {
        result = await detailCollection.updateOne({
            _id: id
        }, {
            content: detail
        });
    } finally{
        await client.close();
        return result;
    }
};
const insertLogIn = async (email, pw)=>{
    logger.info({
        email,
        pw
    }, "insertLogIn::exec (email, pw)");
    let result;
    const client = new MongoClient(URL);
    const loginCollection = client.db(DB).collection(LOGIN);
    const { salt , passwordHash  } = hashPassword(pw);
    try {
        result = await loginCollection.insertOne({
            email: email,
            passwordHash: passwordHash,
            salt: salt
        });
    } catch (e) {
        console.log(e);
    } finally{
        await client.close();
        return result;
    }
};
const matchExist = async (id)=>{
    logger.info({
        id
    }, "matchExist::exec (id)");
    const client = new MongoClient(URL);
    const matchCollection = client.db(DB).collection(MATCH);
    const result = await matchCollection.find({
        _id: new ObjectId(id)
    });
    if (!result) {
        logger.info("matchExist::no match");
        await client.close();
        return false;
    }
    console.log("matchExist:: true");
    await client.close();
    return true;
};
const insertMatch = async (id, array, name)=>{
    logger.info({
        id,
        array,
        name
    }, `insertMatch:: Exec (id, array, name)`);
    let result;
    const client = new MongoClient(URL);
    const matchCollection = client.db(DB).collection(MATCH);
    try {
        if (id == undefined) throw "id is undefined";
        const idExist = await matchExist(id);
        if (!idExist) {
            result = await matchCollection.insertOne({
                _id: new ObjectId(id),
                match: array,
                name: name
            });
        } else {
            result = await matchCollection.replaceOne({
                _id: new ObjectId(id)
            }, {
                _id: new ObjectId(id),
                match: array,
                name: name
            }, {
                upsert: true
            });
        }
    } catch (e) {
        console.log("error while insertMatch");
        console.log(e);
        result = null;
    } finally{
        await client.close();
        console.log(result);
        return result;
    }
};
const findMatchUsers = async (id)=>{
    library_logger/* default.info */.ZP.info({
        id
    }, `findMatchUsers::Exec (id)`);
    const client = new external_mongodb_namespaceObject.MongoClient(URL);
    const matchCollection = client.db(DB).collection(MATCH);
    const detailCollection = client.db(DB).collection(DETAIL);
    let users = [];
    try {
        const result = await matchCollection.findOne({
            _id: new external_mongodb_namespaceObject.ObjectId(id)
        });
        if (!result) {
            library_logger/* default.info */.ZP.info({
                result
            }, "findMatchUsers:: No matching id in Match Collection");
            await client.close();
            return "no info";
        }
        const query_strings = result?.match.map((id)=>{
            return new external_mongodb_namespaceObject.ObjectId(id);
        });
        library_logger/* default.info */.ZP.info({
            query_strings
        }, "findMatchUsers:: result");
        await detailCollection.find({
            _id: {
                $in: query_strings
            }
        }).forEach((doc)=>{
            users.push(doc);
        });
    } catch (e) {
        library_logger/* default.error */.ZP.error("findMatchUsers:: Catch Error");
        await client.close();
        return "Error";
    } finally{
        await client.close();
        return users;
    }
};
const EmailExist = async (email)=>{
    const client = new MongoClient(URL);
    const loginCollection = client.db(DB).collection(LOGIN);
    const result = await loginCollection.findOne({
        email: email
    });
    console.log(result);
    if (result) return true;
    else return false;
};
const verifyPassword = async (email, password)=>{
    console.log(`verifyPassword:: exec - email : ${email}, pw : ${password}`);
    const client = new MongoClient(URL);
    const loginCollection = client.db(DB).collection(LOGIN);
    const result = await loginCollection.findOne({
        email: email
    });
    client.close();
    if (!result) {
        return "no matching id";
    }
    const input = sha512(password, result?.salt).passwordHash;
    const actual = result?.passwordHash;
    if (input == actual) {
        return result?._id.toString();
    }
    return "wrong";
};
const findUser = async (id)=>{
    console.log("findUser::Exec - id" + id);
    let result;
    const client = new MongoClient(URL);
    const userCollection = client.db(DB).collection(USER);
    result = await userCollection.findOne({
        _id: new ObjectId(id)
    });
    client.close();
    return result;
};
const findDetail = async (id)=>{
    console.log("findDetail::Exec - id" + id);
    let result;
    const client = new MongoClient(URL);
    const detailCollection = client.db(DB).collection(DETAIL);
    result = await detailCollection.findOne({
        _id: new ObjectId(id)
    });
    client.close();
    return result;
};

;// CONCATENATED MODULE: ./pages/user/[pid].tsx








let FRONT_URL = "http://localhost:3000";
if (false) {}
//const FRONT_URL = "http://localhost:3000/api/hello"
// const FRONT_URL = "https://pet-finder-zeta.vercel.app//api/hello"
async function getServerSideProps({ req , res , resolvedUrl  }) {
    const url = resolvedUrl;
    const id = url.split("/")[2];
    console.log("PID exec & url id : " + id);
    const result = await findMatchUsers(id);
    if (result == "Error") return {
        props: {
            contents: []
        }
    };
    if (result == "no info") {
        return {
            props: {
                contents: []
            }
        };
    }
    const contents = result.map((elem)=>{
        if (elem.content == undefined || elem == undefined) elem.content = "empty descripttion";
        return {
            id: elem._id.toString(),
            content: elem.content
        };
    });
    console.log(contents);
    return {
        props: {
            contents
        }
    };
}
function ID({ contents  }) {
    const router = (0,router_.useRouter)();
    const { pid  } = router.query;
    const map = ()=>{
        const yo = contents.map((e, index)=>{
            return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "card",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        children: `${index + 1} 등`
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        children: e.content
                    })
                ]
            }, e.id);
        });
        return yo;
    };
    async function handleClickMatch() {
    //console.log(result)
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (Home_module_default()).container,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Roomie"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "yay"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: "/house1.ico",
                        type: "image/x-icon"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
                className: (Home_module_default()).main,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(NavBar/* default */.Z, {}),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h1", {
                                children: [
                                    "안녕하세요! ",
                                    pid,
                                    " 님"
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                children: "당신과 가장 잘 어울리는 룸메이트는"
                            }),
                            contents.length == 0 ? /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                children: "아래 버튼을 클릭하여 정보를 입력해주세요"
                            }) : null
                        ]
                    }),
                    map(),
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/information",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            children: "내 정보"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(SignoutButton, {})
                ]
            })
        ]
    });
}


/***/ }),

/***/ 9888:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

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

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,664,946], () => (__webpack_exec__(7982)));
module.exports = __webpack_exports__;

})();