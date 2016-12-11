# js-structural-sharing
Tests whether two objects (recursively) have structural sharing. In other words, whether they access a common memory location.
If the exported method *shareMemory* returns *false* then each of the objects can be modified, anywhere in its graph,
without affecting the other.

## Installation


    npm install structural-sharing --save


## Usage

```javascript

  import {shareMemory} from 'structural-sharing'

```

## Examples
```javascript

   import {shareMemory} from 'structural-sharing'
   const o = {};
   const a1 = {a1: {a2: {v:1, y:2}, a3: o}, a4: [1,2,3,4]};
   const a2 = {a1: {a2: [1, 2,3, [1, 3, [1, 2, o]]]}, a4: [1,2,3,4]};           
   assert.isTrue(shareMemory(o, a1));
   assert.isTrue(shareMemory(o, a2));
   assert.isTrue(shareMemory(a1, a2));           

```

For more examples look in file *test.js*


## Tests

    npm test

