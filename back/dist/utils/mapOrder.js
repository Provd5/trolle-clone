"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapOrder = void 0;
const mapOrder = (array, order) => {
    array.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    return array;
};
exports.mapOrder = mapOrder;
