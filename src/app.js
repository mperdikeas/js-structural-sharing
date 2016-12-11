// @flow
require('source-map-support').install();

'use strict';

// The rationale behind using this idiom is described in:
//     http://stackoverflow.com/a/36628148/274677
//
if (!global._babelPolyfill) // https://github.com/s-panferov/awesome-typescript-loader/issues/121
    require('babel-polyfill');
// The above is important as Babel only transforms syntax (e.g. arrow functions)
// so you need this in order to support new globals or (in my experience) well-known Symbols, e.g. the following:
//
//     console.log(Object[Symbol.hasInstance]);
//
// ... will print 'undefined' without the the babel-polyfill being required.


import {assert} from 'chai';
import _        from 'lodash';
import {properties} from 'obj-properties';

function isValue(x) {
    if ((x===null) || (x===undefined))
        return true;
    else
        return (typeof x === typeof true) || (typeof x === typeof '') || (typeof x === typeof 0);
}


// returns true if the second object has a reference to the first object anywhere in its graph tree
function referencesAnywhereInItsGraph(obj1: any, obj2: any) {
    if (isValue(obj1) || isValue(obj2))
        return false;
    if (obj1===obj2)
        return true;
    const obj2Props = properties(obj2, "enumerable && height>=1", (x)=>{return {prop: x.prop, value: x.value}});
    
    for (let i = 0; i < obj2Props.length ; i++) {
        const vb = obj2Props[i].value;
        if (isValue(vb))
            continue;
        if (obj1 === vb) {
            return true;
        } else {
            const subTreeReferences = referencesAnywhereInItsGraph(obj1, vb);
            if (subTreeReferences)
                return true;
        }
    }
    return false;
}

function _shareMemory(obj1: any, obj2: any) {
    const b = referencesAnywhereInItsGraph(obj1, obj2);
    if (b)
        return true;
    const obj1Props = properties(obj1, "enumerable && height>=1", (x)=>{return {prop: x.prop, value: x.value}});
    for (let i = 0; i < obj1Props.length ; i++) {
        const va = obj1Props[i].value;
        let b = referencesAnywhereInItsGraph(va, obj2);
        if (b)
            return true;
        else {
            b = _shareMemory(va, obj2);
            if (b)
                return true;
        }
    }
    return false;
}

function shareMemory(obj1: any, obj2: any) {
    const b1 = _shareMemory(obj1, obj2);
    const b2 = _shareMemory(obj2, obj1);
    if (b1!==b2)
        throw new Error('this is most assuredly a bug');
    else
        return b1;
}

exports.shareMemory = shareMemory;

