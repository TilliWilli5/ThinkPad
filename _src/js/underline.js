"use strict";
var BaseCtrl = require("./framework/base_ctrl.js");
class Underline extends BaseCtrl
{
    constructor(pCore){
        super(pCore);
        this.animDuration = 0.6;
    }
}
module.exports = Underline;