/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/entry.server.jsx":
/*!*************************************!*\
  !*** ./src/client/entry.server.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ \"./src/client/router/index.jsx\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ \"./src/client/store/index.js\");\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ctx => {\n  return new Promise(resolve => {\n    const store = (0,_store__WEBPACK_IMPORTED_MODULE_4__.createServerStore)();\n    const promises = [];\n    let stime = new Date().getTime(); // 记录当前时间戳\n\n    _router__WEBPACK_IMPORTED_MODULE_2__.routes.some(route => {\n      if (route.path === ctx.request.path && route.loadData) {\n        promises.push(route.loadData());\n      }\n    });\n    Promise.all(promises).then(res => {\n      res[0] && (ctx.window = res[0].data.data);\n      let endTime = new Date().getTime(); // 所有中间件执行完成后记录当前时间\n\n      console.log(`****接口请求响应时间：${endTime - stime}ms*****`);\n      resolve( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__.Provider, {\n        store: store\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.StaticRouter, {\n        location: ctx.request.url\n      }, (0,_router__WEBPACK_IMPORTED_MODULE_2__.Routes)())));\n    });\n  });\n});\n\n//# sourceURL=webpack://hiker-react-hooks-ssr/./src/client/entry.server.jsx?");

/***/ }),

/***/ "./src/client/pages/About/about.jsx":
/*!******************************************!*\
  !*** ./src/client/pages/About/about.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _about_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about.css */ \"./src/client/pages/About/about.css\");\n/* harmony import */ var _about_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_about_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst getData = () => {\n  return axios__WEBPACK_IMPORTED_MODULE_3___default().get(\"https://www.fastmock.site/mock/fe630c05191ce3c5fa2274f2830f2e74/api/getUserInfo\");\n};\n\nconst About = () => {\n  let dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();\n  const name = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)(state => {\n    return state.name;\n  });\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    //判断服务端渲染有没有请求到数据，如果没有，则重新发起请求\n    if (name === \"\" && typeof window !== \"undefined\") {\n      console.log(\"客户端重新请求数据\");\n      getData().then(res => {\n        dispatch({\n          type: \"ACTION_TYPE\",\n          payload: res.data.data\n        });\n      });\n    }\n  }, []); // console.log(name,\"name---\")\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"about\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", null, \"about\\u9875\\u9762\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h3\", null, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {\n    to: \"/\"\n  }, \"\\u8DF3\\u8F6Chome\\u9875\\u9762\"));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (About);\n\n//# sourceURL=webpack://hiker-react-hooks-ssr/./src/client/pages/About/about.jsx?");

/***/ }),

/***/ "./src/client/pages/Home/home.jsx":
/*!****************************************!*\
  !*** ./src/client/pages/Home/home.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _home_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.css */ \"./src/client/pages/Home/home.css\");\n/* harmony import */ var _home_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_home_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst Home = () => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"home\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", null, \"Home\\u9875\\u9762\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.NavLink, {\n    to: \"/about\"\n  }, \"\\u8DF3\\u8F6Cabout\\u9875\\u9762\"));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);\n\n//# sourceURL=webpack://hiker-react-hooks-ssr/./src/client/pages/Home/home.jsx?");

/***/ }),

/***/ "./src/client/router/index.jsx":
/*!*************************************!*\
  !*** ./src/client/router/index.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"routes\": () => (/* binding */ routes),\n/* harmony export */   \"Routes\": () => (/* binding */ Routes)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _pages_About_about__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/About/about */ \"./src/client/pages/About/about.jsx\");\n/* harmony import */ var _pages_Home_home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/Home/home */ \"./src/client/pages/Home/home.jsx\");\n\n\n\n\n\nconst routes = [{\n  path: \"/\",\n  exact: true,\n  component: _pages_Home_home__WEBPACK_IMPORTED_MODULE_3__.default\n}, {\n  path: \"/about\",\n  exact: true,\n  component: _pages_About_about__WEBPACK_IMPORTED_MODULE_2__.default,\n  loadData: _pages_About_about__WEBPACK_IMPORTED_MODULE_2__.getData\n}];\nconst Routes = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Switch, null, routes.map((r, index) => {\n  const {\n    path,\n    exact,\n    component\n  } = r;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    key: index,\n    exact: exact,\n    path: path,\n    component: component\n  });\n}));\n\n//# sourceURL=webpack://hiker-react-hooks-ssr/./src/client/router/index.jsx?");

/***/ }),

/***/ "./src/client/pages/About/about.css":
/*!******************************************!*\
  !*** ./src/client/pages/About/about.css ***!
  \******************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://hiker-react-hooks-ssr/./src/client/pages/About/about.css?");

/***/ }),

/***/ "./src/client/pages/Home/home.css":
/*!****************************************!*\
  !*** ./src/client/pages/Home/home.css ***!
  \****************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://hiker-react-hooks-ssr/./src/client/pages/Home/home.css?");

/***/ }),

/***/ "./src/client/store/index.js":
/*!***********************************!*\
  !*** ./src/client/store/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createClientStore\": () => (/* binding */ createClientStore),\n/* harmony export */   \"createServerStore\": () => (/* binding */ createServerStore)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n\nconst initState={\n    name:\"\"\n};\nconst reducer = (state = initState, action) => {\n    switch (action.type) {\n        case 'ACTION_TYPE':\n            return {\n                ...state,\n                ...action.payload\n            }\n        default:\n            return {...state}\n    }\n}\n\nconst createClientStore=()=>{\n    console.log(window.REDUX_STATE,\"window\")\n    return (0,redux__WEBPACK_IMPORTED_MODULE_0__.createStore)(reducer,window.REDUX_STATE);\n}\nconst createServerStore=()=>{\n    return (0,redux__WEBPACK_IMPORTED_MODULE_0__.createStore)(reducer);\n}\n\n//# sourceURL=webpack://hiker-react-hooks-ssr/./src/client/store/index.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("axios");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");;

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-router-dom");;

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/entry.server.jsx");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;