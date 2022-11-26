"use strict";
(() => {
var exports = {};
exports.id = 645;
exports.ids = [645];
exports.modules = {

/***/ 233:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rQ": () => (/* binding */ fetchData),
/* harmony export */   "uh": () => (/* binding */ parseCookie)
/* harmony export */ });
/* unused harmony exports getIDwithCookie, decodeJWT, createJWT */
let FRONT_URL = "http://localhost:3000";
const SECRET_KEY = process.env.JWT_SECRET;
async function fetchData(token) {
    if (token) {
        const result = await fetch(FRONT_URL + "/api/signin");
        const result_id = await result.json();
        return result_id.data;
    }
}
const parseCookie = (cookie)=>cookie.split(";").map((v)=>v.split("=")).reduce((acc, v)=>{
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
    }, {});
const getIDwithCookie = (cookie)=>{
    const token = parseCookie(cookie);
    return fetchData(token);
};
const decodeJWT = (token)=>{
    const jwt = __webpack_require__(9344);
    var decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
};
const createJWT = (object)=>{
    const jwt = __webpack_require__(9344);
    return jwt.sign(object, SECRET_KEY);
};


/***/ }),

/***/ 8092:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Information),
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
;// CONCATENATED MODULE: ./components/RadioGroup.tsx

function RadioGroup({ stringArray , setIndex , name , disabled , default_idx  }) {
    const radios = stringArray.map((val, index, a)=>{
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    type: "radio",
                    id: `${index}`,
                    name: name,
                    disabled: disabled,
                    checked: index == default_idx ? true : false,
                    onChange: (e)=>{
                        if (e.target.checked) {
                            setIndex(index);
                        }
                    }
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("label", {
                    children: val
                })
            ]
        }, val);
    });
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        style: {
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row"
        },
        children: radios
    });
}
RadioGroup.defaultProps = {
    disabled: false,
    default_idx: -1
};

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./library/cookie.ts
var library_cookie = __webpack_require__(233);
;// CONCATENATED MODULE: ./pages/information.tsx








// export async function getStaticProps() {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
let FRONT_URL = "http://localhost:3000";
// if (typeof window !== "undefined") {
//   FRONT_URL = window.location.origin;
// }
const API = "/api/information";
async function getServerSideProps({ req , res  }) {
    async function initialize() {
        console.log("Information Page::initialize - exec");
        const cookie = req.headers.cookie;
        const token = (0,library_cookie/* parseCookie */.uh)(cookie).token;
        const fetchResponse = await fetch(FRONT_URL + "/api/user_info", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                token
            })
        });
        if (fetchResponse.status == 500) {
            console.log("Information SSG Page::initialize - internal error");
            return {
                userInfo: "no",
                detail: "no"
            };
        }
        const tmp = await fetchResponse.json();
        if (tmp.data == "no matching") {
            return {
                userInfo: "no",
                detail: "no"
            };
        }
        const { data , detail  } = tmp;
        const userInfo = data;
        console.log(data, detail);
        return {
            userInfo,
            detail
        };
    }
    const { userInfo , detail  } = await initialize();
    if (userInfo == "no") {
        return {
            props: {}
        };
    }
    return {
        props: {
            userInfo,
            detail
        }
    };
}
//const FRONT_URL = "http://localhost:3000/api/hello"
// const FRONT_URL = "https://pet-finder-zeta.vercel.app//api/hello"
function Information({ userInfo , detail  }) {
    const router = (0,router_.useRouter)();
    const [ageCategory, setAgeCategory] = (0,external_react_.useState)(null);
    const [mbti, setMbti] = (0,external_react_.useState)(null);
    const [majorCategory, setMajorCategory] = (0,external_react_.useState)(null);
    const [gender, setGender] = (0,external_react_.useState)(0);
    const [lifePattern, setLifePattern] = (0,external_react_.useState)(null);
    const [numberInvitation, setNumberInvitation] = (0,external_react_.useState)(null);
    const [favoriteFoodCategory, setFavoriteFoodCategory] = (0,external_react_.useState)(null);
    const [schoolYear, setSchoolYear] = (0,external_react_.useState)(null);
    const [religionCategory, setRelegionCategory] = (0,external_react_.useState)(false);
    const [description, setDescription] = (0,external_react_.useState)("");
    const [disable, setDisable] = (0,external_react_.useState)(false);
    const [name, setName] = (0,external_react_.useState)("");
    function initialize() {
        setAgeCategory(userInfo.age);
        setMbti(userInfo.MBTI);
        setMajorCategory(userInfo.sex);
        setLifePattern(userInfo.m_n);
        setNumberInvitation(userInfo.friend);
        setFavoriteFoodCategory(userInfo.food);
        setSchoolYear(userInfo.year);
        setRelegionCategory(userInfo.religion);
        setDescription(detail.content);
        setName(userInfo.name);
    }
    (0,external_react_.useEffect)(()=>{
        if (userInfo) {
            initialize();
        }
    }, []);
    function test() {
        console.log(ageCategory);
        console.log(description);
    }
    async function handleClick() {
        console.log("information handleClick()");
        const json = JSON.stringify({
            name,
            ageCategory,
            mbti,
            majorCategory,
            gender,
            lifePattern,
            numberInvitation,
            favoriteFoodCategory,
            schoolYear,
            religionCategory,
            description
        });
        // setResult({loading:true,})
        await fetch(FRONT_URL + API, {
            method: "post",
            body: json
        }).then((result)=>{
            console.log("결과값: " + result);
            //setDisable(true)
            router.push("/");
        }).catch((e)=>{
            console.log("error in information.tsx fetch");
        });
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
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                        className: (Home_module_default()).question,
                        children: "Name"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                        type: "text",
                        onChange: (e)=>{
                            setName(e.target.value);
                        },
                        placeholder: "이름을 입력해주세요",
                        disabled: disable,
                        defaultValue: name
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                        className: (Home_module_default()).question,
                        children: "Age"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(RadioGroup, {
                        stringArray: [
                            "18-20",
                            "21-23",
                            "24-26",
                            "27 +"
                        ],
                        setIndex: setAgeCategory,
                        name: "age",
                        disabled: disable,
                        default_idx: ageCategory
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                        className: (Home_module_default()).question,
                        children: "MBTI"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(RadioGroup, {
                        stringArray: [
                            "E",
                            "I",
                            "not sure"
                        ],
                        setIndex: setMbti,
                        name: "MBTI",
                        disabled: disable,
                        default_idx: mbti
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                        className: (Home_module_default()).question,
                        children: "Major"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(RadioGroup, {
                        stringArray: [
                            "LAS",
                            "BUSINESS",
                            "ENGINEERING",
                            "OTHER"
                        ],
                        setIndex: setMajorCategory,
                        name: "Major",
                        disabled: disable,
                        default_idx: majorCategory
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                        className: (Home_module_default()).question,
                        children: "Gender"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(RadioGroup, {
                        stringArray: [
                            "Male",
                            "Female"
                        ],
                        setIndex: setGender,
                        name: "Gender",
                        disabled: disable,
                        default_idx: gender
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                        className: (Home_module_default()).question,
                        children: " Morning / Night Person"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(RadioGroup, {
                        stringArray: [
                            "Morning",
                            "Night"
                        ],
                        setIndex: setLifePattern,
                        name: "morning/night",
                        disabled: disable,
                        default_idx: lifePattern
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        className: (Home_module_default()).question,
                        children: [
                            " ",
                            "친구 데려오는 여부 일주일에 몇회..?"
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                        type: "number",
                        onChange: (e)=>{
                            setNumberInvitation(parseInt(e.target.value));
                        },
                        placeholder: "invite",
                        disabled: disable,
                        defaultValue: String(numberInvitation)
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                        className: (Home_module_default()).question,
                        children: " 좋아하는 음식 "
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(RadioGroup, {
                        stringArray: [
                            "한식",
                            "중식",
                            "양식"
                        ],
                        setIndex: setFavoriteFoodCategory,
                        name: "food",
                        disabled: disable,
                        default_idx: favoriteFoodCategory
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                        className: (Home_module_default()).question,
                        children: " 학년 "
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(RadioGroup, {
                        stringArray: [
                            "Freshman",
                            "Sophomore",
                            "Junior",
                            "Senior",
                            "Grad"
                        ],
                        setIndex: setSchoolYear,
                        name: "year",
                        disabled: disable,
                        default_idx: schoolYear
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                        className: (Home_module_default()).question,
                        children: " 종교 "
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(RadioGroup, {
                        stringArray: [
                            "기독교",
                            "천주교",
                            "불교",
                            "무교"
                        ],
                        setIndex: setRelegionCategory,
                        name: "religion",
                        disabled: disable,
                        default_idx: Number(religionCategory)
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                        className: (Home_module_default()).question,
                        children: "간단한 자기소개"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                        onChange: (e)=>{
                            setDescription(e.target.value);
                        },
                        rows: 4,
                        cols: 50,
                        placeholder: "음식 취향, 알러지, 좋아하는 노래 등",
                        disabled: disable,
                        defaultValue: description
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        onClick: handleClick,
                        disabled: disable,
                        children: [
                            " ",
                            "Save",
                            " "
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("br", {})
                ]
            })
        ]
    });
}


/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [946], () => (__webpack_exec__(8092)));
module.exports = __webpack_exports__;

})();