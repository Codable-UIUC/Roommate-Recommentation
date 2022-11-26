(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 100:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ App)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(6764);
;// CONCATENATED MODULE: external "react-particles"
const external_react_particles_namespaceObject = require("react-particles");
var external_react_particles_default = /*#__PURE__*/__webpack_require__.n(external_react_particles_namespaceObject);
;// CONCATENATED MODULE: external "tsparticles"
const external_tsparticles_namespaceObject = require("tsparticles");
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./components/ParticlesWrapper.tsx




function ParticlesWrapper({ children  }) {
    const particlesInit = (0,external_react_.useCallback)(async (engine)=>{
        console.log(engine);
        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await (0,external_tsparticles_namespaceObject.loadFull)(engine);
    }, []);
    const particlesLoaded = (0,external_react_.useCallback)(async (container)=>{
        await console.log(container);
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((external_react_particles_default()), {
                init: particlesInit,
                loaded: particlesLoaded,
                options: {
                    background: {
                        color: {
                            value: "#C1D5DD"
                        }
                    },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: false,
                                mode: "repulse"
                            },
                            //   onHover: {
                            //       enable: true,
                            //       mode: ["grab", "bubble"],
                            //   },
                            resize: true
                        },
                        modes: {
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 200,
                                duration: 1
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: [
                                "random",
                                "random"
                            ]
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: false,
                            opacity: 0.5,
                            width: 1
                        },
                        collisions: {
                            enable: true
                        },
                        move: {
                            enable: true,
                            outModes: {
                                default: "bounce"
                            },
                            random: false,
                            speed: 0.3,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800
                            },
                            value: 80
                        },
                        opacity: {
                            value: 0.5
                        },
                        shape: {
                            type: "circle"
                        },
                        size: {
                            value: {
                                min: 1,
                                max: 3
                            }
                        }
                    },
                    detectRetina: true
                }
            }),
            children
        ]
    });
}

;// CONCATENATED MODULE: ./pages/_app.tsx



function App({ Component , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(ParticlesWrapper, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    });
}


/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(100));
module.exports = __webpack_exports__;

})();