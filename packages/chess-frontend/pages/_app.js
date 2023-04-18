"use strict";
exports.__esModule = true;
var head_1 = require("next/head");
require("./styles.css");
function CustomApp(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return (<>
      <head_1["default"]>
        <title>Welcome to chess-frontend!</title>
      </head_1["default"]>
      <main className="app">
        <Component {...pageProps}/>
      </main>
    </>);
}
exports["default"] = CustomApp;
