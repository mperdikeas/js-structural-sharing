// for this approach see:
//     http://stackoverflow.com/q/40668097/274677

declare module "chai" {

    declare class AssertClass {
         static isBoolean     (o: any)        : void;
         static isFalse       (o: any)        : void;
         static instanceOf    (x: any, t: any): void;
         static isNumber      (x: any)        : void;
         static isString      (x: any)        : void;
         static isTrue        (x: any)        : void;
         static isNull        (x: any)        : void;
         static throws        (f:   F)        : void;
    }

     declare export var assert: typeof AssertClass
 }

