"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var index_1 = require("../pages/index");
describe('Index', function () {
    it('should render successfully', function () {
        var baseElement = (0, react_2.render)(<index_1["default"] />).baseElement;
        expect(baseElement).toBeTruthy();
    });
});
