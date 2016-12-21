/* @flow */
require('source-map-support').install();
import 'babel-polyfill';
import {assert} from 'chai';

import {shareMemory} from '../lib/index.js';

describe('shareMemory', function () {
    it('should work with primitives'
       , function () {
           assert.isFalse(shareMemory(0, 0));
           assert.isFalse(shareMemory(0, 1));
           assert.isFalse(shareMemory(true, true));
           assert.isFalse(shareMemory(true, false));
           assert.isFalse(shareMemory(3, 1/0));
           assert.isFalse(shareMemory(undefined, null));
           assert.isFalse(shareMemory(NaN, NaN));
           assert.isFalse(shareMemory(null, null));
       });
    it('case 0'
       , function () {
           assert.isFalse(shareMemory({}, {}));
           assert.isFalse(shareMemory({v:1}, {v:1}));
           const o = {};
           assert.isTrue(shareMemory(o, o));
       });
    it('case 1'
       , function () {
           const o = {};
           const a = {v: o};
           const b = {i: 1, j:2, foo: a};
           assert.isTrue(shareMemory(a, b));
           const b2 = {i: 1, j:2, zoo: {foo: a}};
           assert.isTrue(shareMemory(a, b2));
       });
    it('case 2'
       , function () {
           const o = {};
           const a = [o];
           assert.isTrue(shareMemory(o, a));
       });
    it('case 3'
       , function () {
           const o = {};
           const a = [o];
           assert.isTrue(shareMemory(o, a));
       });
    it('case 4'
       , function () {
           this.timeout(20000);
           const o = {};
           const a1 = {a1: {a2: {v:1, y:2}, a3: o}, a4: [1,2,3,4]};
           const a2 = {a1: {a2: [1, 2,3, [1, 3, [1, 2, o]]]}, a4: [1,2,3,4]};
           assert.isTrue(shareMemory(o, o));
           assert.isTrue(shareMemory(o, a1));
           assert.isTrue(shareMemory(o, a2));
           assert.isTrue(shareMemory(a1, a2));
           assert.isTrue(shareMemory(a1, a1));
           assert.isFalse(shareMemory(a1, JSON.parse(JSON.stringify(a2))));
           assert.isFalse(shareMemory(o, JSON.parse(JSON.stringify(o))));
           assert.isFalse(shareMemory(a1, JSON.parse(JSON.stringify(a1))));
           assert.isFalse(shareMemory(a2, JSON.parse(JSON.stringify(a2))));                      
       });
});


