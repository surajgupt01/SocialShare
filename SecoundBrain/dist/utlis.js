"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = random;
function random(len) {
    let options = "qwertyuiopasdfghjklzxcvbnm1234564567890";
    let ans = "";
    for (let i = 0; i < options.length; i++) {
        ans += options[Math.floor(Math.random() * options.length)];
    }
    return ans;
}
