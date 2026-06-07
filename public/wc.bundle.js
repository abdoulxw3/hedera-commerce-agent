var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod3) => function __require() {
  return mod3 || (0, cb[__getOwnPropNames(cb)[0]])((mod3 = { exports: {} }).exports, mod3), mod3.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to3, from8, except, desc) => {
  if (from8 && typeof from8 === "object" || typeof from8 === "function") {
    for (let key of __getOwnPropNames(from8))
      if (!__hasOwnProp.call(to3, key) && key !== except)
        __defProp(to3, key, { get: () => from8[key], enumerable: !(desc = __getOwnPropDesc(from8, key)) || desc.enumerable });
  }
  return to3;
};
var __reExport = (target, mod3, secondTarget) => (__copyProps(target, mod3, "default"), secondTarget && __copyProps(secondTarget, mod3, "default"));
var __toESM = (mod3, isNodeMode, target) => (target = mod3 != null ? __create(__getProtoOf(mod3)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod3 || !mod3.__esModule ? __defProp(target, "default", { value: mod3, enumerable: true }) : target,
  mod3
));
var __toCommonJS = (mod3) => __copyProps(__defProp({}, "__esModule", { value: true }), mod3);

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    var R4 = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R4 && typeof R4.apply === "function" ? R4.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R4 && typeof R4.ownKeys === "function") {
      ReflectOwnKeys = R4.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;
    module.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n4) {
      if (typeof n4 !== "number" || n4 < 0 || NumberIsNaN(n4)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n4 + ".");
      }
      this._maxListeners = n4;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i3 = 1; i3 < arguments.length; i3++) args.push(arguments[i3]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er3;
        if (args.length > 0)
          er3 = args[0];
        if (er3 instanceof Error) {
          throw er3;
        }
        var err = new Error("Unhandled error." + (er3 ? " (" + er3.message + ")" : ""));
        err.context = er3;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i3 = 0; i3 < len; ++i3)
          ReflectApply(listeners[i3], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m3;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m3 = _getMaxListeners(target);
        if (m3 > 0 && existing.length > m3 && !existing.warned) {
          existing.warned = true;
          var w6 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w6.name = "MaxListenersExceededWarning";
          w6.emitter = target;
          w6.type = type;
          w6.count = existing.length;
          ProcessEmitWarning(w6);
        }
      }
      return target;
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i3, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i3 = list.length - 1; i3 >= 0; i3--) {
          if (list[i3] === listener || list[i3].listener === listener) {
            originalListener = list[i3].listener;
            position = i3;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i3;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys2 = Object.keys(events);
        var key;
        for (i3 = 0; i3 < keys2.length; ++i3) {
          key = keys2[i3];
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i3 = listeners.length - 1; i3 >= 0; i3--) {
          this.removeListener(type, listeners[i3]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n4) {
      var copy = new Array(n4);
      for (var i3 = 0; i3 < n4; ++i3)
        copy[i3] = arr[i3];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i3 = 0; i3 < ret.length; ++i3) {
        ret[i3] = arr[i3].listener || arr[i3];
      }
      return ret;
    }
    function once(emitter, name2) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name2, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name2, resolver, { once: true });
        if (name2 !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name2, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name2, listener);
        } else {
          emitter.on(name2, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name2, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name2, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __read: () => __read,
  __rest: () => __rest,
  __spread: () => __spread,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values
});
function __extends(d5, b5) {
  extendStatics(d5, b5);
  function __() {
    this.constructor = d5;
  }
  d5.prototype = b5 === null ? Object.create(b5) : (__.prototype = b5.prototype, new __());
}
function __rest(s2, e2) {
  var t = {};
  for (var p5 in s2) if (Object.prototype.hasOwnProperty.call(s2, p5) && e2.indexOf(p5) < 0)
    t[p5] = s2[p5];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i3 = 0, p5 = Object.getOwnPropertySymbols(s2); i3 < p5.length; i3++) {
      if (e2.indexOf(p5[i3]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p5[i3]))
        t[p5[i3]] = s2[p5[i3]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c5 = arguments.length, r3 = c5 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d5;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
  else for (var i3 = decorators.length - 1; i3 >= 0; i3--) if (d5 = decorators[i3]) r3 = (c5 < 3 ? d5(r3) : c5 > 3 ? d5(target, key, r3) : d5(target, key)) || r3;
  return c5 > 3 && r3 && Object.defineProperty(target, key, r3), r3;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P6, generator) {
  function adopt(value) {
    return value instanceof P6 ? value : new P6(function(resolve) {
      resolve(value);
    });
  }
  return new (P6 || (P6 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _3 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f3, y7, t, g5;
  return g5 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g5[Symbol.iterator] = function() {
    return this;
  }), g5;
  function verb(n4) {
    return function(v9) {
      return step([n4, v9]);
    };
  }
  function step(op) {
    if (f3) throw new TypeError("Generator is already executing.");
    while (_3) try {
      if (f3 = 1, y7 && (t = op[0] & 2 ? y7["return"] : op[0] ? y7["throw"] || ((t = y7["return"]) && t.call(y7), 0) : y7.next) && !(t = t.call(y7, op[1])).done) return t;
      if (y7 = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _3.label++;
          return { value: op[1], done: false };
        case 5:
          _3.label++;
          y7 = op[1];
          op = [0];
          continue;
        case 7:
          op = _3.ops.pop();
          _3.trys.pop();
          continue;
        default:
          if (!(t = _3.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _3 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _3.label = op[1];
            break;
          }
          if (op[0] === 6 && _3.label < t[1]) {
            _3.label = t[1];
            t = op;
            break;
          }
          if (t && _3.label < t[2]) {
            _3.label = t[2];
            _3.ops.push(op);
            break;
          }
          if (t[2]) _3.ops.pop();
          _3.trys.pop();
          continue;
      }
      op = body.call(thisArg, _3);
    } catch (e2) {
      op = [6, e2];
      y7 = 0;
    } finally {
      f3 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding(o5, m3, k6, k22) {
  if (k22 === void 0) k22 = k6;
  o5[k22] = m3[k6];
}
function __exportStar(m3, exports) {
  for (var p5 in m3) if (p5 !== "default" && !exports.hasOwnProperty(p5)) exports[p5] = m3[p5];
}
function __values(o5) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m3 = s2 && o5[s2], i3 = 0;
  if (m3) return m3.call(o5);
  if (o5 && typeof o5.length === "number") return {
    next: function() {
      if (o5 && i3 >= o5.length) o5 = void 0;
      return { value: o5 && o5[i3++], done: !o5 };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o5, n4) {
  var m3 = typeof Symbol === "function" && o5[Symbol.iterator];
  if (!m3) return o5;
  var i3 = m3.call(o5), r3, ar3 = [], e2;
  try {
    while ((n4 === void 0 || n4-- > 0) && !(r3 = i3.next()).done) ar3.push(r3.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r3 && !r3.done && (m3 = i3["return"])) m3.call(i3);
    } finally {
      if (e2) throw e2.error;
    }
  }
  return ar3;
}
function __spread() {
  for (var ar3 = [], i3 = 0; i3 < arguments.length; i3++)
    ar3 = ar3.concat(__read(arguments[i3]));
  return ar3;
}
function __spreadArrays() {
  for (var s2 = 0, i3 = 0, il = arguments.length; i3 < il; i3++) s2 += arguments[i3].length;
  for (var r3 = Array(s2), k6 = 0, i3 = 0; i3 < il; i3++)
    for (var a3 = arguments[i3], j6 = 0, jl = a3.length; j6 < jl; j6++, k6++)
      r3[k6] = a3[j6];
  return r3;
}
function __await(v9) {
  return this instanceof __await ? (this.v = v9, this) : new __await(v9);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g5 = generator.apply(thisArg, _arguments || []), i3, q4 = [];
  return i3 = {}, verb("next"), verb("throw"), verb("return"), i3[Symbol.asyncIterator] = function() {
    return this;
  }, i3;
  function verb(n4) {
    if (g5[n4]) i3[n4] = function(v9) {
      return new Promise(function(a3, b5) {
        q4.push([n4, v9, a3, b5]) > 1 || resume(n4, v9);
      });
    };
  }
  function resume(n4, v9) {
    try {
      step(g5[n4](v9));
    } catch (e2) {
      settle(q4[0][3], e2);
    }
  }
  function step(r3) {
    r3.value instanceof __await ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q4[0][2], r3);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f3, v9) {
    if (f3(v9), q4.shift(), q4.length) resume(q4[0][0], q4[0][1]);
  }
}
function __asyncDelegator(o5) {
  var i3, p5;
  return i3 = {}, verb("next"), verb("throw", function(e2) {
    throw e2;
  }), verb("return"), i3[Symbol.iterator] = function() {
    return this;
  }, i3;
  function verb(n4, f3) {
    i3[n4] = o5[n4] ? function(v9) {
      return (p5 = !p5) ? { value: __await(o5[n4](v9)), done: n4 === "return" } : f3 ? f3(v9) : v9;
    } : f3;
  }
}
function __asyncValues(o5) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m3 = o5[Symbol.asyncIterator], i3;
  return m3 ? m3.call(o5) : (o5 = typeof __values === "function" ? __values(o5) : o5[Symbol.iterator](), i3 = {}, verb("next"), verb("throw"), verb("return"), i3[Symbol.asyncIterator] = function() {
    return this;
  }, i3);
  function verb(n4) {
    i3[n4] = o5[n4] && function(v9) {
      return new Promise(function(resolve, reject) {
        v9 = o5[n4](v9), settle(resolve, reject, v9.done, v9.value);
      });
    };
  }
  function settle(resolve, reject, d5, v9) {
    Promise.resolve(v9).then(function(v10) {
      resolve({ value: v10, done: d5 });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod3) {
  if (mod3 && mod3.__esModule) return mod3;
  var result = {};
  if (mod3 != null) {
    for (var k6 in mod3) if (Object.hasOwnProperty.call(mod3, k6)) result[k6] = mod3[k6];
  }
  result.default = mod3;
  return result;
}
function __importDefault(mod3) {
  return mod3 && mod3.__esModule ? mod3 : { default: mod3 };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics, __assign;
var init_tslib_es6 = __esm({
  "node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js"() {
    extendStatics = function(d5, b5) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d6, b6) {
        d6.__proto__ = b6;
      } || function(d6, b6) {
        for (var p5 in b6) if (b6.hasOwnProperty(p5)) d6[p5] = b6[p5];
      };
      return extendStatics(d5, b5);
    };
    __assign = function() {
      __assign = Object.assign || function __assign3(t) {
        for (var s2, i3 = 1, n4 = arguments.length; i3 < n4; i3++) {
          s2 = arguments[i3];
          for (var p5 in s2) if (Object.prototype.hasOwnProperty.call(s2, p5)) t[p5] = s2[p5];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/delay.js
var require_delay = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/delay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.delay = void 0;
    function delay(timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, timeout);
      });
    }
    exports.delay = delay;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/misc.js
var require_misc = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/misc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
    exports.ONE_HUNDRED = 100;
    exports.ONE_THOUSAND = 1e3;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/time.js
var require_time = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
    exports.ONE_SECOND = 1;
    exports.FIVE_SECONDS = 5;
    exports.TEN_SECONDS = 10;
    exports.THIRTY_SECONDS = 30;
    exports.SIXTY_SECONDS = 60;
    exports.ONE_MINUTE = exports.SIXTY_SECONDS;
    exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
    exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
    exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
    exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
    exports.ONE_HOUR = exports.SIXTY_MINUTES;
    exports.THREE_HOURS = exports.ONE_HOUR * 3;
    exports.SIX_HOURS = exports.ONE_HOUR * 6;
    exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
    exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
    exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
    exports.THREE_DAYS = exports.ONE_DAY * 3;
    exports.FIVE_DAYS = exports.ONE_DAY * 5;
    exports.SEVEN_DAYS = exports.ONE_DAY * 7;
    exports.THIRTY_DAYS = exports.ONE_DAY * 30;
    exports.ONE_WEEK = exports.SEVEN_DAYS;
    exports.TWO_WEEKS = exports.ONE_WEEK * 2;
    exports.THREE_WEEKS = exports.ONE_WEEK * 3;
    exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
    exports.ONE_YEAR = exports.ONE_DAY * 365;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/index.js
var require_constants = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_misc(), exports);
    tslib_1.__exportStar(require_time(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/convert.js
var require_convert = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/convert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromMiliseconds = exports.toMiliseconds = void 0;
    var constants_1 = require_constants();
    function toMiliseconds(seconds) {
      return seconds * constants_1.ONE_THOUSAND;
    }
    exports.toMiliseconds = toMiliseconds;
    function fromMiliseconds(miliseconds) {
      return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
    }
    exports.fromMiliseconds = fromMiliseconds;
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/index.js
var require_utils = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_delay(), exports);
    tslib_1.__exportStar(require_convert(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/watch.js
var require_watch = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Watch = void 0;
    var Watch = class {
      constructor() {
        this.timestamps = /* @__PURE__ */ new Map();
      }
      start(label) {
        if (this.timestamps.has(label)) {
          throw new Error(`Watch already started for label: ${label}`);
        }
        this.timestamps.set(label, { started: Date.now() });
      }
      stop(label) {
        const timestamp = this.get(label);
        if (typeof timestamp.elapsed !== "undefined") {
          throw new Error(`Watch already stopped for label: ${label}`);
        }
        const elapsed = Date.now() - timestamp.started;
        this.timestamps.set(label, { started: timestamp.started, elapsed });
      }
      get(label) {
        const timestamp = this.timestamps.get(label);
        if (typeof timestamp === "undefined") {
          throw new Error(`No timestamp found for label: ${label}`);
        }
        return timestamp;
      }
      elapsed(label) {
        const timestamp = this.get(label);
        const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
        return elapsed;
      }
    };
    exports.Watch = Watch;
    exports.default = Watch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/watch.js
var require_watch2 = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IWatch = void 0;
    var IWatch = class {
    };
    exports.IWatch = IWatch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/index.js
var require_types = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_watch2(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_utils(), exports);
    tslib_1.__exportStar(require_watch(), exports);
    tslib_1.__exportStar(require_types(), exports);
    tslib_1.__exportStar(require_constants(), exports);
  }
});

// node_modules/@walletconnect/window-getters/dist/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/@walletconnect/window-getters/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
    function getFromWindow(name2) {
      let res = void 0;
      if (typeof window !== "undefined" && typeof window[name2] !== "undefined") {
        res = window[name2];
      }
      return res;
    }
    exports.getFromWindow = getFromWindow;
    function getFromWindowOrThrow(name2) {
      const res = getFromWindow(name2);
      if (!res) {
        throw new Error(`${name2} is not defined in Window`);
      }
      return res;
    }
    exports.getFromWindowOrThrow = getFromWindowOrThrow;
    function getDocumentOrThrow() {
      return getFromWindowOrThrow("document");
    }
    exports.getDocumentOrThrow = getDocumentOrThrow;
    function getDocument() {
      return getFromWindow("document");
    }
    exports.getDocument = getDocument;
    function getNavigatorOrThrow() {
      return getFromWindowOrThrow("navigator");
    }
    exports.getNavigatorOrThrow = getNavigatorOrThrow;
    function getNavigator() {
      return getFromWindow("navigator");
    }
    exports.getNavigator = getNavigator;
    function getLocationOrThrow() {
      return getFromWindowOrThrow("location");
    }
    exports.getLocationOrThrow = getLocationOrThrow;
    function getLocation() {
      return getFromWindow("location");
    }
    exports.getLocation = getLocation;
    function getCryptoOrThrow() {
      return getFromWindowOrThrow("crypto");
    }
    exports.getCryptoOrThrow = getCryptoOrThrow;
    function getCrypto() {
      return getFromWindow("crypto");
    }
    exports.getCrypto = getCrypto;
    function getLocalStorageOrThrow() {
      return getFromWindowOrThrow("localStorage");
    }
    exports.getLocalStorageOrThrow = getLocalStorageOrThrow;
    function getLocalStorage() {
      return getFromWindow("localStorage");
    }
    exports.getLocalStorage = getLocalStorage;
  }
});

// node_modules/@walletconnect/window-metadata/dist/cjs/index.js
var require_cjs3 = __commonJS({
  "node_modules/@walletconnect/window-metadata/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWindowMetadata = void 0;
    var window_getters_1 = require_cjs2();
    function getWindowMetadata() {
      let doc;
      let loc;
      try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
      } catch (e2) {
        return null;
      }
      function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons2 = [];
        for (let i3 = 0; i3 < links.length; i3++) {
          const link = links[i3];
          const rel = link.getAttribute("rel");
          if (rel) {
            if (rel.toLowerCase().indexOf("icon") > -1) {
              const href = link.getAttribute("href");
              if (href) {
                if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                  let absoluteHref = loc.protocol + "//" + loc.host;
                  if (href.indexOf("/") === 0) {
                    absoluteHref += href;
                  } else {
                    const path = loc.pathname.split("/");
                    path.pop();
                    const finalPath = path.join("/");
                    absoluteHref += finalPath + "/" + href;
                  }
                  icons2.push(absoluteHref);
                } else if (href.indexOf("//") === 0) {
                  const absoluteUrl = loc.protocol + href;
                  icons2.push(absoluteUrl);
                } else {
                  icons2.push(href);
                }
              }
            }
          }
        }
        return icons2;
      }
      function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for (let i3 = 0; i3 < metaTags.length; i3++) {
          const tag = metaTags[i3];
          const attributes = ["itemprop", "property", "name"].map((target) => tag.getAttribute(target)).filter((attr) => {
            if (attr) {
              return args.includes(attr);
            }
            return false;
          });
          if (attributes.length && attributes) {
            const content = tag.getAttribute("content");
            if (content) {
              return content;
            }
          }
        }
        return "";
      }
      function getName() {
        let name3 = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name3) {
          name3 = doc.title;
        }
        return name3;
      }
      function getDescription() {
        const description2 = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description2;
      }
      const name2 = getName();
      const description = getDescription();
      const url = loc.origin;
      const icons = getIcons();
      const meta = {
        description,
        url,
        icons,
        name: name2
      };
      return meta;
    }
    exports.getWindowMetadata = getWindowMetadata;
  }
});

// node_modules/blakejs/util.js
var require_util = __commonJS({
  "node_modules/blakejs/util.js"(exports, module) {
    var ERROR_MSG_INPUT = "Input must be an string, Buffer or Uint8Array";
    function normalizeInput(input) {
      let ret;
      if (input instanceof Uint8Array) {
        ret = input;
      } else if (typeof input === "string") {
        const encoder2 = new TextEncoder();
        ret = encoder2.encode(input);
      } else {
        throw new Error(ERROR_MSG_INPUT);
      }
      return ret;
    }
    function toHex3(bytes) {
      return Array.prototype.map.call(bytes, function(n4) {
        return (n4 < 16 ? "0" : "") + n4.toString(16);
      }).join("");
    }
    function uint32ToHex(val) {
      return (4294967296 + val).toString(16).substring(1);
    }
    function debugPrint(label, arr, size3) {
      let msg = "\n" + label + " = ";
      for (let i3 = 0; i3 < arr.length; i3 += 2) {
        if (size3 === 32) {
          msg += uint32ToHex(arr[i3]).toUpperCase();
          msg += " ";
          msg += uint32ToHex(arr[i3 + 1]).toUpperCase();
        } else if (size3 === 64) {
          msg += uint32ToHex(arr[i3 + 1]).toUpperCase();
          msg += uint32ToHex(arr[i3]).toUpperCase();
        } else throw new Error("Invalid size " + size3);
        if (i3 % 6 === 4) {
          msg += "\n" + new Array(label.length + 4).join(" ");
        } else if (i3 < arr.length - 2) {
          msg += " ";
        }
      }
      console.log(msg);
    }
    function testSpeed(hashFn, N11, M6) {
      let startMs = (/* @__PURE__ */ new Date()).getTime();
      const input = new Uint8Array(N11);
      for (let i3 = 0; i3 < N11; i3++) {
        input[i3] = i3 % 256;
      }
      const genMs = (/* @__PURE__ */ new Date()).getTime();
      console.log("Generated random input in " + (genMs - startMs) + "ms");
      startMs = genMs;
      for (let i3 = 0; i3 < M6; i3++) {
        const hashHex = hashFn(input);
        const hashMs = (/* @__PURE__ */ new Date()).getTime();
        const ms = hashMs - startMs;
        startMs = hashMs;
        console.log("Hashed in " + ms + "ms: " + hashHex.substring(0, 20) + "...");
        console.log(
          Math.round(N11 / (1 << 20) / (ms / 1e3) * 100) / 100 + " MB PER SECOND"
        );
      }
    }
    module.exports = {
      normalizeInput,
      toHex: toHex3,
      debugPrint,
      testSpeed
    };
  }
});

// node_modules/blakejs/blake2b.js
var require_blake2b = __commonJS({
  "node_modules/blakejs/blake2b.js"(exports, module) {
    var util = require_util();
    function ADD64AA(v10, a3, b5) {
      const o0 = v10[a3] + v10[b5];
      let o1 = v10[a3 + 1] + v10[b5 + 1];
      if (o0 >= 4294967296) {
        o1++;
      }
      v10[a3] = o0;
      v10[a3 + 1] = o1;
    }
    function ADD64AC(v10, a3, b0, b1) {
      let o0 = v10[a3] + b0;
      if (b0 < 0) {
        o0 += 4294967296;
      }
      let o1 = v10[a3 + 1] + b1;
      if (o0 >= 4294967296) {
        o1++;
      }
      v10[a3] = o0;
      v10[a3 + 1] = o1;
    }
    function B2B_GET32(arr, i3) {
      return arr[i3] ^ arr[i3 + 1] << 8 ^ arr[i3 + 2] << 16 ^ arr[i3 + 3] << 24;
    }
    function B2B_G(a3, b5, c5, d5, ix, iy) {
      const x0 = m3[ix];
      const x1 = m3[ix + 1];
      const y0 = m3[iy];
      const y1 = m3[iy + 1];
      ADD64AA(v9, a3, b5);
      ADD64AC(v9, a3, x0, x1);
      let xor0 = v9[d5] ^ v9[a3];
      let xor1 = v9[d5 + 1] ^ v9[a3 + 1];
      v9[d5] = xor1;
      v9[d5 + 1] = xor0;
      ADD64AA(v9, c5, d5);
      xor0 = v9[b5] ^ v9[c5];
      xor1 = v9[b5 + 1] ^ v9[c5 + 1];
      v9[b5] = xor0 >>> 24 ^ xor1 << 8;
      v9[b5 + 1] = xor1 >>> 24 ^ xor0 << 8;
      ADD64AA(v9, a3, b5);
      ADD64AC(v9, a3, y0, y1);
      xor0 = v9[d5] ^ v9[a3];
      xor1 = v9[d5 + 1] ^ v9[a3 + 1];
      v9[d5] = xor0 >>> 16 ^ xor1 << 16;
      v9[d5 + 1] = xor1 >>> 16 ^ xor0 << 16;
      ADD64AA(v9, c5, d5);
      xor0 = v9[b5] ^ v9[c5];
      xor1 = v9[b5 + 1] ^ v9[c5 + 1];
      v9[b5] = xor1 >>> 31 ^ xor0 << 1;
      v9[b5 + 1] = xor0 >>> 31 ^ xor1 << 1;
    }
    var BLAKE2B_IV32 = new Uint32Array([
      4089235720,
      1779033703,
      2227873595,
      3144134277,
      4271175723,
      1013904242,
      1595750129,
      2773480762,
      2917565137,
      1359893119,
      725511199,
      2600822924,
      4215389547,
      528734635,
      327033209,
      1541459225
    ]);
    var SIGMA8 = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3,
      11,
      8,
      12,
      0,
      5,
      2,
      15,
      13,
      10,
      14,
      3,
      6,
      7,
      1,
      9,
      4,
      7,
      9,
      3,
      1,
      13,
      12,
      11,
      14,
      2,
      6,
      5,
      10,
      4,
      0,
      15,
      8,
      9,
      0,
      5,
      7,
      2,
      4,
      10,
      15,
      14,
      1,
      11,
      12,
      6,
      8,
      3,
      13,
      2,
      12,
      6,
      10,
      0,
      11,
      8,
      3,
      4,
      13,
      7,
      5,
      15,
      14,
      1,
      9,
      12,
      5,
      1,
      15,
      14,
      13,
      4,
      10,
      0,
      7,
      6,
      3,
      9,
      2,
      8,
      11,
      13,
      11,
      7,
      14,
      12,
      1,
      3,
      9,
      5,
      0,
      15,
      4,
      8,
      6,
      2,
      10,
      6,
      15,
      14,
      9,
      11,
      3,
      0,
      8,
      12,
      2,
      13,
      7,
      1,
      4,
      10,
      5,
      10,
      2,
      8,
      4,
      7,
      6,
      1,
      5,
      15,
      11,
      9,
      14,
      3,
      12,
      13,
      0,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3
    ];
    var SIGMA82 = new Uint8Array(
      SIGMA8.map(function(x8) {
        return x8 * 2;
      })
    );
    var v9 = new Uint32Array(32);
    var m3 = new Uint32Array(32);
    function blake2bCompress(ctx, last) {
      let i3 = 0;
      for (i3 = 0; i3 < 16; i3++) {
        v9[i3] = ctx.h[i3];
        v9[i3 + 16] = BLAKE2B_IV32[i3];
      }
      v9[24] = v9[24] ^ ctx.t;
      v9[25] = v9[25] ^ ctx.t / 4294967296;
      if (last) {
        v9[28] = ~v9[28];
        v9[29] = ~v9[29];
      }
      for (i3 = 0; i3 < 32; i3++) {
        m3[i3] = B2B_GET32(ctx.b, 4 * i3);
      }
      for (i3 = 0; i3 < 12; i3++) {
        B2B_G(0, 8, 16, 24, SIGMA82[i3 * 16 + 0], SIGMA82[i3 * 16 + 1]);
        B2B_G(2, 10, 18, 26, SIGMA82[i3 * 16 + 2], SIGMA82[i3 * 16 + 3]);
        B2B_G(4, 12, 20, 28, SIGMA82[i3 * 16 + 4], SIGMA82[i3 * 16 + 5]);
        B2B_G(6, 14, 22, 30, SIGMA82[i3 * 16 + 6], SIGMA82[i3 * 16 + 7]);
        B2B_G(0, 10, 20, 30, SIGMA82[i3 * 16 + 8], SIGMA82[i3 * 16 + 9]);
        B2B_G(2, 12, 22, 24, SIGMA82[i3 * 16 + 10], SIGMA82[i3 * 16 + 11]);
        B2B_G(4, 14, 16, 26, SIGMA82[i3 * 16 + 12], SIGMA82[i3 * 16 + 13]);
        B2B_G(6, 8, 18, 28, SIGMA82[i3 * 16 + 14], SIGMA82[i3 * 16 + 15]);
      }
      for (i3 = 0; i3 < 16; i3++) {
        ctx.h[i3] = ctx.h[i3] ^ v9[i3] ^ v9[i3 + 16];
      }
    }
    var parameterBlock = new Uint8Array([
      0,
      0,
      0,
      0,
      //  0: outlen, keylen, fanout, depth
      0,
      0,
      0,
      0,
      //  4: leaf length, sequential mode
      0,
      0,
      0,
      0,
      //  8: node offset
      0,
      0,
      0,
      0,
      // 12: node offset
      0,
      0,
      0,
      0,
      // 16: node depth, inner length, rfu
      0,
      0,
      0,
      0,
      // 20: rfu
      0,
      0,
      0,
      0,
      // 24: rfu
      0,
      0,
      0,
      0,
      // 28: rfu
      0,
      0,
      0,
      0,
      // 32: salt
      0,
      0,
      0,
      0,
      // 36: salt
      0,
      0,
      0,
      0,
      // 40: salt
      0,
      0,
      0,
      0,
      // 44: salt
      0,
      0,
      0,
      0,
      // 48: personal
      0,
      0,
      0,
      0,
      // 52: personal
      0,
      0,
      0,
      0,
      // 56: personal
      0,
      0,
      0,
      0
      // 60: personal
    ]);
    function blake2bInit(outlen, key, salt, personal) {
      if (outlen === 0 || outlen > 64) {
        throw new Error("Illegal output length, expected 0 < length <= 64");
      }
      if (key && key.length > 64) {
        throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
      }
      if (salt && salt.length !== 16) {
        throw new Error("Illegal salt, expected Uint8Array with length is 16");
      }
      if (personal && personal.length !== 16) {
        throw new Error("Illegal personal, expected Uint8Array with length is 16");
      }
      const ctx = {
        b: new Uint8Array(128),
        h: new Uint32Array(16),
        t: 0,
        // input count
        c: 0,
        // pointer within buffer
        outlen
        // output length in bytes
      };
      parameterBlock.fill(0);
      parameterBlock[0] = outlen;
      if (key) parameterBlock[1] = key.length;
      parameterBlock[2] = 1;
      parameterBlock[3] = 1;
      if (salt) parameterBlock.set(salt, 32);
      if (personal) parameterBlock.set(personal, 48);
      for (let i3 = 0; i3 < 16; i3++) {
        ctx.h[i3] = BLAKE2B_IV32[i3] ^ B2B_GET32(parameterBlock, i3 * 4);
      }
      if (key) {
        blake2bUpdate(ctx, key);
        ctx.c = 128;
      }
      return ctx;
    }
    function blake2bUpdate(ctx, input) {
      for (let i3 = 0; i3 < input.length; i3++) {
        if (ctx.c === 128) {
          ctx.t += ctx.c;
          blake2bCompress(ctx, false);
          ctx.c = 0;
        }
        ctx.b[ctx.c++] = input[i3];
      }
    }
    function blake2bFinal(ctx) {
      ctx.t += ctx.c;
      while (ctx.c < 128) {
        ctx.b[ctx.c++] = 0;
      }
      blake2bCompress(ctx, true);
      const out = new Uint8Array(ctx.outlen);
      for (let i3 = 0; i3 < ctx.outlen; i3++) {
        out[i3] = ctx.h[i3 >> 2] >> 8 * (i3 & 3);
      }
      return out;
    }
    function blake2b2(input, key, outlen, salt, personal) {
      outlen = outlen || 64;
      input = util.normalizeInput(input);
      if (salt) {
        salt = util.normalizeInput(salt);
      }
      if (personal) {
        personal = util.normalizeInput(personal);
      }
      const ctx = blake2bInit(outlen, key, salt, personal);
      blake2bUpdate(ctx, input);
      return blake2bFinal(ctx);
    }
    function blake2bHex(input, key, outlen, salt, personal) {
      const output = blake2b2(input, key, outlen, salt, personal);
      return util.toHex(output);
    }
    module.exports = {
      blake2b: blake2b2,
      blake2bHex,
      blake2bInit,
      blake2bUpdate,
      blake2bFinal
    };
  }
});

// node_modules/blakejs/blake2s.js
var require_blake2s = __commonJS({
  "node_modules/blakejs/blake2s.js"(exports, module) {
    var util = require_util();
    function B2S_GET32(v10, i3) {
      return v10[i3] ^ v10[i3 + 1] << 8 ^ v10[i3 + 2] << 16 ^ v10[i3 + 3] << 24;
    }
    function B2S_G(a3, b5, c5, d5, x8, y7) {
      v9[a3] = v9[a3] + v9[b5] + x8;
      v9[d5] = ROTR32(v9[d5] ^ v9[a3], 16);
      v9[c5] = v9[c5] + v9[d5];
      v9[b5] = ROTR32(v9[b5] ^ v9[c5], 12);
      v9[a3] = v9[a3] + v9[b5] + y7;
      v9[d5] = ROTR32(v9[d5] ^ v9[a3], 8);
      v9[c5] = v9[c5] + v9[d5];
      v9[b5] = ROTR32(v9[b5] ^ v9[c5], 7);
    }
    function ROTR32(x8, y7) {
      return x8 >>> y7 ^ x8 << 32 - y7;
    }
    var BLAKE2S_IV = new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    var SIGMA = new Uint8Array([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3,
      11,
      8,
      12,
      0,
      5,
      2,
      15,
      13,
      10,
      14,
      3,
      6,
      7,
      1,
      9,
      4,
      7,
      9,
      3,
      1,
      13,
      12,
      11,
      14,
      2,
      6,
      5,
      10,
      4,
      0,
      15,
      8,
      9,
      0,
      5,
      7,
      2,
      4,
      10,
      15,
      14,
      1,
      11,
      12,
      6,
      8,
      3,
      13,
      2,
      12,
      6,
      10,
      0,
      11,
      8,
      3,
      4,
      13,
      7,
      5,
      15,
      14,
      1,
      9,
      12,
      5,
      1,
      15,
      14,
      13,
      4,
      10,
      0,
      7,
      6,
      3,
      9,
      2,
      8,
      11,
      13,
      11,
      7,
      14,
      12,
      1,
      3,
      9,
      5,
      0,
      15,
      4,
      8,
      6,
      2,
      10,
      6,
      15,
      14,
      9,
      11,
      3,
      0,
      8,
      12,
      2,
      13,
      7,
      1,
      4,
      10,
      5,
      10,
      2,
      8,
      4,
      7,
      6,
      1,
      5,
      15,
      11,
      9,
      14,
      3,
      12,
      13,
      0
    ]);
    var v9 = new Uint32Array(16);
    var m3 = new Uint32Array(16);
    function blake2sCompress(ctx, last) {
      let i3 = 0;
      for (i3 = 0; i3 < 8; i3++) {
        v9[i3] = ctx.h[i3];
        v9[i3 + 8] = BLAKE2S_IV[i3];
      }
      v9[12] ^= ctx.t;
      v9[13] ^= ctx.t / 4294967296;
      if (last) {
        v9[14] = ~v9[14];
      }
      for (i3 = 0; i3 < 16; i3++) {
        m3[i3] = B2S_GET32(ctx.b, 4 * i3);
      }
      for (i3 = 0; i3 < 10; i3++) {
        B2S_G(0, 4, 8, 12, m3[SIGMA[i3 * 16 + 0]], m3[SIGMA[i3 * 16 + 1]]);
        B2S_G(1, 5, 9, 13, m3[SIGMA[i3 * 16 + 2]], m3[SIGMA[i3 * 16 + 3]]);
        B2S_G(2, 6, 10, 14, m3[SIGMA[i3 * 16 + 4]], m3[SIGMA[i3 * 16 + 5]]);
        B2S_G(3, 7, 11, 15, m3[SIGMA[i3 * 16 + 6]], m3[SIGMA[i3 * 16 + 7]]);
        B2S_G(0, 5, 10, 15, m3[SIGMA[i3 * 16 + 8]], m3[SIGMA[i3 * 16 + 9]]);
        B2S_G(1, 6, 11, 12, m3[SIGMA[i3 * 16 + 10]], m3[SIGMA[i3 * 16 + 11]]);
        B2S_G(2, 7, 8, 13, m3[SIGMA[i3 * 16 + 12]], m3[SIGMA[i3 * 16 + 13]]);
        B2S_G(3, 4, 9, 14, m3[SIGMA[i3 * 16 + 14]], m3[SIGMA[i3 * 16 + 15]]);
      }
      for (i3 = 0; i3 < 8; i3++) {
        ctx.h[i3] ^= v9[i3] ^ v9[i3 + 8];
      }
    }
    function blake2sInit(outlen, key) {
      if (!(outlen > 0 && outlen <= 32)) {
        throw new Error("Incorrect output length, should be in [1, 32]");
      }
      const keylen = key ? key.length : 0;
      if (key && !(keylen > 0 && keylen <= 32)) {
        throw new Error("Incorrect key length, should be in [1, 32]");
      }
      const ctx = {
        h: new Uint32Array(BLAKE2S_IV),
        // hash state
        b: new Uint8Array(64),
        // input block
        c: 0,
        // pointer within block
        t: 0,
        // input count
        outlen
        // output length in bytes
      };
      ctx.h[0] ^= 16842752 ^ keylen << 8 ^ outlen;
      if (keylen > 0) {
        blake2sUpdate(ctx, key);
        ctx.c = 64;
      }
      return ctx;
    }
    function blake2sUpdate(ctx, input) {
      for (let i3 = 0; i3 < input.length; i3++) {
        if (ctx.c === 64) {
          ctx.t += ctx.c;
          blake2sCompress(ctx, false);
          ctx.c = 0;
        }
        ctx.b[ctx.c++] = input[i3];
      }
    }
    function blake2sFinal(ctx) {
      ctx.t += ctx.c;
      while (ctx.c < 64) {
        ctx.b[ctx.c++] = 0;
      }
      blake2sCompress(ctx, true);
      const out = new Uint8Array(ctx.outlen);
      for (let i3 = 0; i3 < ctx.outlen; i3++) {
        out[i3] = ctx.h[i3 >> 2] >> 8 * (i3 & 3) & 255;
      }
      return out;
    }
    function blake2s(input, key, outlen) {
      outlen = outlen || 32;
      input = util.normalizeInput(input);
      const ctx = blake2sInit(outlen, key);
      blake2sUpdate(ctx, input);
      return blake2sFinal(ctx);
    }
    function blake2sHex(input, key, outlen) {
      const output = blake2s(input, key, outlen);
      return util.toHex(output);
    }
    module.exports = {
      blake2s,
      blake2sHex,
      blake2sInit,
      blake2sUpdate,
      blake2sFinal
    };
  }
});

// node_modules/blakejs/index.js
var require_blakejs = __commonJS({
  "node_modules/blakejs/index.js"(exports, module) {
    var b2b = require_blake2b();
    var b2s = require_blake2s();
    module.exports = {
      blake2b: b2b.blake2b,
      blake2bHex: b2b.blake2bHex,
      blake2bInit: b2b.blake2bInit,
      blake2bUpdate: b2b.blake2bUpdate,
      blake2bFinal: b2b.blake2bFinal,
      blake2s: b2s.blake2s,
      blake2sHex: b2s.blake2sHex,
      blake2sInit: b2s.blake2sInit,
      blake2sUpdate: b2s.blake2sUpdate,
      blake2sFinal: b2s.blake2sFinal
    };
  }
});

// node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js
var tslib_es6_exports2 = {};
__export(tslib_es6_exports2, {
  __assign: () => __assign2,
  __asyncDelegator: () => __asyncDelegator2,
  __asyncGenerator: () => __asyncGenerator2,
  __asyncValues: () => __asyncValues2,
  __await: () => __await2,
  __awaiter: () => __awaiter2,
  __classPrivateFieldGet: () => __classPrivateFieldGet2,
  __classPrivateFieldSet: () => __classPrivateFieldSet2,
  __createBinding: () => __createBinding2,
  __decorate: () => __decorate2,
  __exportStar: () => __exportStar2,
  __extends: () => __extends2,
  __generator: () => __generator2,
  __importDefault: () => __importDefault2,
  __importStar: () => __importStar2,
  __makeTemplateObject: () => __makeTemplateObject2,
  __metadata: () => __metadata2,
  __param: () => __param2,
  __read: () => __read2,
  __rest: () => __rest2,
  __spread: () => __spread2,
  __spreadArrays: () => __spreadArrays2,
  __values: () => __values2
});
function __extends2(d5, b5) {
  extendStatics2(d5, b5);
  function __() {
    this.constructor = d5;
  }
  d5.prototype = b5 === null ? Object.create(b5) : (__.prototype = b5.prototype, new __());
}
function __rest2(s2, e2) {
  var t = {};
  for (var p5 in s2) if (Object.prototype.hasOwnProperty.call(s2, p5) && e2.indexOf(p5) < 0)
    t[p5] = s2[p5];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i3 = 0, p5 = Object.getOwnPropertySymbols(s2); i3 < p5.length; i3++) {
      if (e2.indexOf(p5[i3]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p5[i3]))
        t[p5[i3]] = s2[p5[i3]];
    }
  return t;
}
function __decorate2(decorators, target, key, desc) {
  var c5 = arguments.length, r3 = c5 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d5;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
  else for (var i3 = decorators.length - 1; i3 >= 0; i3--) if (d5 = decorators[i3]) r3 = (c5 < 3 ? d5(r3) : c5 > 3 ? d5(target, key, r3) : d5(target, key)) || r3;
  return c5 > 3 && r3 && Object.defineProperty(target, key, r3), r3;
}
function __param2(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata2(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter2(thisArg, _arguments, P6, generator) {
  function adopt(value) {
    return value instanceof P6 ? value : new P6(function(resolve) {
      resolve(value);
    });
  }
  return new (P6 || (P6 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator2(thisArg, body) {
  var _3 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f3, y7, t, g5;
  return g5 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g5[Symbol.iterator] = function() {
    return this;
  }), g5;
  function verb(n4) {
    return function(v9) {
      return step([n4, v9]);
    };
  }
  function step(op) {
    if (f3) throw new TypeError("Generator is already executing.");
    while (_3) try {
      if (f3 = 1, y7 && (t = op[0] & 2 ? y7["return"] : op[0] ? y7["throw"] || ((t = y7["return"]) && t.call(y7), 0) : y7.next) && !(t = t.call(y7, op[1])).done) return t;
      if (y7 = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _3.label++;
          return { value: op[1], done: false };
        case 5:
          _3.label++;
          y7 = op[1];
          op = [0];
          continue;
        case 7:
          op = _3.ops.pop();
          _3.trys.pop();
          continue;
        default:
          if (!(t = _3.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _3 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _3.label = op[1];
            break;
          }
          if (op[0] === 6 && _3.label < t[1]) {
            _3.label = t[1];
            t = op;
            break;
          }
          if (t && _3.label < t[2]) {
            _3.label = t[2];
            _3.ops.push(op);
            break;
          }
          if (t[2]) _3.ops.pop();
          _3.trys.pop();
          continue;
      }
      op = body.call(thisArg, _3);
    } catch (e2) {
      op = [6, e2];
      y7 = 0;
    } finally {
      f3 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding2(o5, m3, k6, k22) {
  if (k22 === void 0) k22 = k6;
  o5[k22] = m3[k6];
}
function __exportStar2(m3, exports) {
  for (var p5 in m3) if (p5 !== "default" && !exports.hasOwnProperty(p5)) exports[p5] = m3[p5];
}
function __values2(o5) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m3 = s2 && o5[s2], i3 = 0;
  if (m3) return m3.call(o5);
  if (o5 && typeof o5.length === "number") return {
    next: function() {
      if (o5 && i3 >= o5.length) o5 = void 0;
      return { value: o5 && o5[i3++], done: !o5 };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read2(o5, n4) {
  var m3 = typeof Symbol === "function" && o5[Symbol.iterator];
  if (!m3) return o5;
  var i3 = m3.call(o5), r3, ar3 = [], e2;
  try {
    while ((n4 === void 0 || n4-- > 0) && !(r3 = i3.next()).done) ar3.push(r3.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r3 && !r3.done && (m3 = i3["return"])) m3.call(i3);
    } finally {
      if (e2) throw e2.error;
    }
  }
  return ar3;
}
function __spread2() {
  for (var ar3 = [], i3 = 0; i3 < arguments.length; i3++)
    ar3 = ar3.concat(__read2(arguments[i3]));
  return ar3;
}
function __spreadArrays2() {
  for (var s2 = 0, i3 = 0, il = arguments.length; i3 < il; i3++) s2 += arguments[i3].length;
  for (var r3 = Array(s2), k6 = 0, i3 = 0; i3 < il; i3++)
    for (var a3 = arguments[i3], j6 = 0, jl = a3.length; j6 < jl; j6++, k6++)
      r3[k6] = a3[j6];
  return r3;
}
function __await2(v9) {
  return this instanceof __await2 ? (this.v = v9, this) : new __await2(v9);
}
function __asyncGenerator2(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g5 = generator.apply(thisArg, _arguments || []), i3, q4 = [];
  return i3 = {}, verb("next"), verb("throw"), verb("return"), i3[Symbol.asyncIterator] = function() {
    return this;
  }, i3;
  function verb(n4) {
    if (g5[n4]) i3[n4] = function(v9) {
      return new Promise(function(a3, b5) {
        q4.push([n4, v9, a3, b5]) > 1 || resume(n4, v9);
      });
    };
  }
  function resume(n4, v9) {
    try {
      step(g5[n4](v9));
    } catch (e2) {
      settle(q4[0][3], e2);
    }
  }
  function step(r3) {
    r3.value instanceof __await2 ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q4[0][2], r3);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f3, v9) {
    if (f3(v9), q4.shift(), q4.length) resume(q4[0][0], q4[0][1]);
  }
}
function __asyncDelegator2(o5) {
  var i3, p5;
  return i3 = {}, verb("next"), verb("throw", function(e2) {
    throw e2;
  }), verb("return"), i3[Symbol.iterator] = function() {
    return this;
  }, i3;
  function verb(n4, f3) {
    i3[n4] = o5[n4] ? function(v9) {
      return (p5 = !p5) ? { value: __await2(o5[n4](v9)), done: n4 === "return" } : f3 ? f3(v9) : v9;
    } : f3;
  }
}
function __asyncValues2(o5) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m3 = o5[Symbol.asyncIterator], i3;
  return m3 ? m3.call(o5) : (o5 = typeof __values2 === "function" ? __values2(o5) : o5[Symbol.iterator](), i3 = {}, verb("next"), verb("throw"), verb("return"), i3[Symbol.asyncIterator] = function() {
    return this;
  }, i3);
  function verb(n4) {
    i3[n4] = o5[n4] && function(v9) {
      return new Promise(function(resolve, reject) {
        v9 = o5[n4](v9), settle(resolve, reject, v9.done, v9.value);
      });
    };
  }
  function settle(resolve, reject, d5, v9) {
    Promise.resolve(v9).then(function(v10) {
      resolve({ value: v10, done: d5 });
    }, reject);
  }
}
function __makeTemplateObject2(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar2(mod3) {
  if (mod3 && mod3.__esModule) return mod3;
  var result = {};
  if (mod3 != null) {
    for (var k6 in mod3) if (Object.hasOwnProperty.call(mod3, k6)) result[k6] = mod3[k6];
  }
  result.default = mod3;
  return result;
}
function __importDefault2(mod3) {
  return mod3 && mod3.__esModule ? mod3 : { default: mod3 };
}
function __classPrivateFieldGet2(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet2(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics2, __assign2;
var init_tslib_es62 = __esm({
  "node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js"() {
    extendStatics2 = function(d5, b5) {
      extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d6, b6) {
        d6.__proto__ = b6;
      } || function(d6, b6) {
        for (var p5 in b6) if (b6.hasOwnProperty(p5)) d6[p5] = b6[p5];
      };
      return extendStatics2(d5, b5);
    };
    __assign2 = function() {
      __assign2 = Object.assign || function __assign3(t) {
        for (var s2, i3 = 1, n4 = arguments.length; i3 < n4; i3++) {
          s2 = arguments[i3];
          for (var p5 in s2) if (Object.prototype.hasOwnProperty.call(s2, p5)) t[p5] = s2[p5];
        }
        return t;
      };
      return __assign2.apply(this, arguments);
    };
  }
});

// node_modules/@walletconnect/environment/dist/cjs/crypto.js
var require_crypto = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
    function getBrowerCrypto() {
      return (global === null || global === void 0 ? void 0 : global.crypto) || (global === null || global === void 0 ? void 0 : global.msCrypto) || {};
    }
    exports.getBrowerCrypto = getBrowerCrypto;
    function getSubtleCrypto() {
      const browserCrypto = getBrowerCrypto();
      return browserCrypto.subtle || browserCrypto.webkitSubtle;
    }
    exports.getSubtleCrypto = getSubtleCrypto;
    function isBrowserCryptoAvailable() {
      return !!getBrowerCrypto() && !!getSubtleCrypto();
    }
    exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/env.js
var require_env = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/env.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
    function isReactNative() {
      return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
    }
    exports.isReactNative = isReactNative;
    function isNode2() {
      return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
    }
    exports.isNode = isNode2;
    function isBrowser() {
      return !isReactNative() && !isNode2();
    }
    exports.isBrowser = isBrowser;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/index.js
var require_cjs4 = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es62(), __toCommonJS(tslib_es6_exports2));
    tslib_1.__exportStar(require_crypto(), exports);
    tslib_1.__exportStar(require_env(), exports);
  }
});

// node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/ws/browser.js
var require_browser = __commonJS({
  "node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/cross-fetch/dist/browser-ponyfill.js
var require_browser_ponyfill = __commonJS({
  "node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
    var __global__ = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof global !== "undefined" && global;
    var __globalThis__ = (function() {
      function F4() {
        this.fetch = false;
        this.DOMException = __global__.DOMException;
      }
      F4.prototype = __global__;
      return new F4();
    })();
    (function(globalThis2) {
      var irrelevant = (function(exports2) {
        var g5 = typeof globalThis2 !== "undefined" && globalThis2 || typeof self !== "undefined" && self || // eslint-disable-next-line no-undef
        typeof global !== "undefined" && global || {};
        var support = {
          searchParams: "URLSearchParams" in g5,
          iterable: "Symbol" in g5 && "iterator" in Symbol,
          blob: "FileReader" in g5 && "Blob" in g5 && (function() {
            try {
              new Blob();
              return true;
            } catch (e2) {
              return false;
            }
          })(),
          formData: "FormData" in g5,
          arrayBuffer: "ArrayBuffer" in g5
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name2) {
          if (typeof name2 !== "string") {
            name2 = String(name2);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name2) || name2 === "") {
            throw new TypeError('Invalid character in header field name: "' + name2 + '"');
          }
          return name2.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers(headers) {
          this.map = {};
          if (headers instanceof Headers) {
            headers.forEach(function(value, name2) {
              this.append(name2, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              if (header.length != 2) {
                throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + header.length);
              }
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name2) {
              this.append(name2, headers[name2]);
            }, this);
          }
        }
        Headers.prototype.append = function(name2, value) {
          name2 = normalizeName(name2);
          value = normalizeValue(value);
          var oldValue = this.map[name2];
          this.map[name2] = oldValue ? oldValue + ", " + value : value;
        };
        Headers.prototype["delete"] = function(name2) {
          delete this.map[normalizeName(name2)];
        };
        Headers.prototype.get = function(name2) {
          name2 = normalizeName(name2);
          return this.has(name2) ? this.map[name2] : null;
        };
        Headers.prototype.has = function(name2) {
          return this.map.hasOwnProperty(normalizeName(name2));
        };
        Headers.prototype.set = function(name2, value) {
          this.map[normalizeName(name2)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name2 in this.map) {
            if (this.map.hasOwnProperty(name2)) {
              callback.call(thisArg, this.map[name2], name2, this);
            }
          }
        };
        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name2) {
            items.push(name2);
          });
          return iteratorFor(items);
        };
        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name2) {
            items.push([name2, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }
        function consumed(body) {
          if (body._noBody) return;
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
          var encoding = match ? match[1] : "utf-8";
          reader.readAsText(blob, encoding);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);
          for (var i3 = 0; i3 < view.length; i3++) {
            chars[i3] = String.fromCharCode(view[i3]);
          }
          return chars.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this.bodyUsed = this.bodyUsed;
            this._bodyInit = body;
            if (!body) {
              this._noBody = true;
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
          }
          this.arrayBuffer = function() {
            if (this._bodyArrayBuffer) {
              var isConsumed = consumed(this);
              if (isConsumed) {
                return isConsumed;
              } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
                return Promise.resolve(
                  this._bodyArrayBuffer.buffer.slice(
                    this._bodyArrayBuffer.byteOffset,
                    this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                  )
                );
              } else {
                return Promise.resolve(this._bodyArrayBuffer);
              }
            } else if (support.blob) {
              return this.blob().then(readBlobAsArrayBuffer);
            } else {
              throw new Error("could not read as ArrayBuffer");
            }
          };
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode7);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
          if (!(this instanceof Request)) {
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          }
          options = options || {};
          var body = options.body;
          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "same-origin";
          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal || (function() {
            if ("AbortController" in g5) {
              var ctrl = new AbortController();
              return ctrl.signal;
            }
          })();
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
          if (this.method === "GET" || this.method === "HEAD") {
            if (options.cache === "no-store" || options.cache === "no-cache") {
              var reParamSearch = /([?&])_=[^&]*/;
              if (reParamSearch.test(this.url)) {
                this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
              } else {
                var reQueryString = /\?/;
                this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
              }
            }
          }
        }
        Request.prototype.clone = function() {
          return new Request(this, { body: this._bodyInit });
        };
        function decode7(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split2 = bytes.split("=");
              var name2 = split2.shift().replace(/\+/g, " ");
              var value = split2.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name2), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split("\r").map(function(header) {
            return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
          }).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(":").trim();
              try {
                headers.append(key, value);
              } catch (error) {
                console.warn("Response " + error.message);
              }
            }
          });
          return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
          if (!(this instanceof Response)) {
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          }
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          if (this.status < 200 || this.status > 599) {
            throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
          }
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = options.statusText === void 0 ? "" : "" + options.statusText;
          this.headers = new Headers(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          });
        };
        Response.error = function() {
          var response = new Response(null, { status: 200, statusText: "" });
          response.ok = false;
          response.status = 0;
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response(null, { status, headers: { location: url } });
        };
        exports2.DOMException = g5.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name2) {
            this.message = message;
            this.name = name2;
            var error = Error(message);
            this.stack = error.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch2(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request(input, init);
            if (request.signal && request.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options = {
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              if (request.url.indexOf("file://") === 0 && (xhr.status < 200 || xhr.status > 599)) {
                options.status = 200;
              } else {
                options.status = xhr.status;
              }
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              setTimeout(function() {
                resolve(new Response(body, options));
              }, 0);
            };
            xhr.onerror = function() {
              setTimeout(function() {
                reject(new TypeError("Network request failed"));
              }, 0);
            };
            xhr.ontimeout = function() {
              setTimeout(function() {
                reject(new TypeError("Network request timed out"));
              }, 0);
            };
            xhr.onabort = function() {
              setTimeout(function() {
                reject(new exports2.DOMException("Aborted", "AbortError"));
              }, 0);
            };
            function fixUrl(url) {
              try {
                return url === "" && g5.location.href ? g5.location.href : url;
              } catch (e2) {
                return url;
              }
            }
            xhr.open(request.method, fixUrl(request.url), true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr) {
              if (support.blob) {
                xhr.responseType = "blob";
              } else if (support.arrayBuffer) {
                xhr.responseType = "arraybuffer";
              }
            }
            if (init && typeof init.headers === "object" && !(init.headers instanceof Headers || g5.Headers && init.headers instanceof g5.Headers)) {
              var names = [];
              Object.getOwnPropertyNames(init.headers).forEach(function(name2) {
                names.push(normalizeName(name2));
                xhr.setRequestHeader(name2, normalizeValue(init.headers[name2]));
              });
              request.headers.forEach(function(value, name2) {
                if (names.indexOf(name2) === -1) {
                  xhr.setRequestHeader(name2, value);
                }
              });
            } else {
              request.headers.forEach(function(value, name2) {
                xhr.setRequestHeader(name2, value);
              });
            }
            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        }
        fetch2.polyfill = true;
        if (!g5.fetch) {
          g5.fetch = fetch2;
          g5.Headers = Headers;
          g5.Request = Request;
          g5.Response = Response;
        }
        exports2.Headers = Headers;
        exports2.Request = Request;
        exports2.Response = Response;
        exports2.fetch = fetch2;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      })({});
    })(__globalThis__);
    __globalThis__.fetch.ponyfill = true;
    delete __globalThis__.fetch.polyfill;
    var ctx = __global__.fetch ? __global__ : __globalThis__;
    exports = ctx.fetch;
    exports.default = ctx.fetch;
    exports.fetch = ctx.fetch;
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
  }
});

// node_modules/@walletconnect/sign-client/dist/index.js
var import_events8 = __toESM(require_events(), 1);

// node_modules/@walletconnect/core/dist/index.js
var import_events7 = __toESM(require_events(), 1);

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var import_events = __toESM(require_events());
var import_time = __toESM(require_cjs());

// node_modules/@walletconnect/events/dist/esm/events.js
var IEvents = class {
};

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var n = class extends IEvents {
  constructor(e2) {
    super();
  }
};
var s = import_time.FIVE_SECONDS;
var r = { pulse: "heartbeat_pulse" };
var i = class _i extends n {
  constructor(e2) {
    super(e2), this.events = new import_events.EventEmitter(), this.interval = s, this.interval = e2?.interval || s;
  }
  static async init(e2) {
    const t = new _i(e2);
    return await t.init(), t;
  }
  async init() {
    await this.initialize();
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async initialize() {
    this.intervalRef = setInterval(() => this.pulse(), (0, import_time.toMiliseconds)(this.interval));
  }
  pulse() {
    this.events.emit(r.pulse);
  }
};

// node_modules/destr/dist/index.mjs
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

// node_modules/unstorage/dist/shared/unstorage.zVDD2mZo.mjs
function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
var BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c5) => c5.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}
function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys2) {
  return normalizeKey(keys2.join(":"));
}
function normalizeBaseKey(base3) {
  base3 = normalizeKey(base3);
  return base3 ? base3 + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base3) {
  if (base3) {
    return key.startsWith(base3) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

// node_modules/unstorage/dist/index.mjs
function defineDriver(factory) {
  return factory;
}
var DRIVER_NAME = "memory";
var memory = defineDriver(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});
function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base3 of context.mountpoints) {
      if (key.startsWith(base3)) {
        return {
          base: base3,
          relativeKey: key.slice(base3.length),
          driver: context.mounts[base3]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base3, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base3) || includeParent && base3.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base3.length > mountpoint.length ? base3.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r3) => r3.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r3) => r3.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base3, opts = {}) {
      base3 = normalizeBaseKey(base3);
      const mounts = getMounts(base3, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey(key);
          if (!maskedMounts.some((p5) => fullKey.startsWith(p5))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p5) => !p5.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base3)
      );
    },
    // Utils
    async clear(base3, opts = {}) {
      base3 = normalizeBaseKey(base3);
      await Promise.all(
        getMounts(base3, false).map(async (m3) => {
          if (m3.driver.clear) {
            return asyncCall(m3.driver.clear, m3.relativeBase, opts);
          }
          if (m3.driver.removeItem) {
            const keys2 = await m3.driver.getKeys(m3.relativeBase || "", opts);
            return Promise.all(
              keys2.map((key) => m3.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base3, driver) {
      base3 = normalizeBaseKey(base3);
      if (base3 && context.mounts[base3]) {
        throw new Error(`already mounted at ${base3}`);
      }
      if (base3) {
        context.mountpoints.push(base3);
        context.mountpoints.sort((a3, b5) => b5.length - a3.length);
      }
      context.mounts[base3] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base3)).then((unwatcher) => {
          context.unwatch[base3] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base3, _dispose = true) {
      base3 = normalizeBaseKey(base3);
      if (!base3 || !context.mounts[base3]) {
        return;
      }
      if (context.watching && base3 in context.unwatch) {
        context.unwatch[base3]?.();
        delete context.unwatch[base3];
      }
      if (_dispose) {
        await dispose(context.mounts[base3]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base3);
      delete context.mounts[base3];
    },
    getMount(key = "") {
      key = normalizeKey(key) + ":";
      const m3 = getMount(key);
      return {
        driver: m3.driver,
        base: m3.base
      };
    },
    getMounts(base3 = "", opts = {}) {
      base3 = normalizeKey(base3);
      const mounts = getMounts(base3, opts.parents);
      return mounts.map((m3) => ({
        driver: m3.driver,
        base: m3.mountpoint
      }));
    },
    // Aliases
    keys: (base3, opts = {}) => storage.getKeys(base3, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base3) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base3 + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

// node_modules/idb-keyval/dist/index.js
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  const request = indexedDB.open(dbName);
  request.onupgradeneeded = () => request.result.createObjectStore(storeName);
  const dbp = promisifyRequest(request);
  return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
var defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
function set(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}
function del(key, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.delete(key);
    return promisifyRequest(store.transaction);
  });
}
function clear(customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.clear();
    return promisifyRequest(store.transaction);
  });
}
function eachCursor(store, callback) {
  store.openCursor().onsuccess = function() {
    if (!this.result)
      return;
    callback(this.result);
    this.result.continue();
  };
  return promisifyRequest(store.transaction);
}
function keys(customStore = defaultGetStore()) {
  return customStore("readonly", (store) => {
    if (store.getAllKeys) {
      return promisifyRequest(store.getAllKeys());
    }
    const items = [];
    return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
  });
}

// node_modules/@walletconnect/safe-json/dist/esm/index.js
var JSONStringify = (data) => JSON.stringify(data, (_3, value) => typeof value === "bigint" ? value.toString() + "n" : value);
var JSONParse = (json) => {
  const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
  const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
  return JSON.parse(serializedData, (_3, value) => {
    const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
    if (isCustomFormatBigInt)
      return BigInt(value.substring(0, value.length - 1));
    return value;
  });
};
function safeJsonParse(value) {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  try {
    return JSONParse(value);
  } catch (_a) {
    return value;
  }
}
function safeJsonStringify(value) {
  return typeof value === "string" ? value : JSONStringify(value) || "";
}

// node_modules/@walletconnect/keyvaluestorage/dist/index.es.js
var x = "idb-keyval";
var z = (i3 = {}) => {
  const t = i3.base && i3.base.length > 0 ? `${i3.base}:` : "", e2 = (s2) => t + s2;
  let n4;
  return i3.dbName && i3.storeName && (n4 = createStore(i3.dbName, i3.storeName)), { name: x, options: i3, async hasItem(s2) {
    return !(typeof await get(e2(s2), n4) > "u");
  }, async getItem(s2) {
    return await get(e2(s2), n4) ?? null;
  }, setItem(s2, a3) {
    return set(e2(s2), a3, n4);
  }, removeItem(s2) {
    return del(e2(s2), n4);
  }, getKeys() {
    return keys(n4);
  }, clear() {
    return clear(n4);
  } };
};
var D = "WALLET_CONNECT_V2_INDEXED_DB";
var E = "keyvaluestorage";
var _ = class {
  constructor() {
    this.indexedDb = createStorage({ driver: z({ dbName: D, storeName: E }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((t) => [t.key, t.value]);
  }
  async getItem(t) {
    const e2 = await this.indexedDb.getItem(t);
    if (e2 !== null) return e2;
  }
  async setItem(t, e2) {
    await this.indexedDb.setItem(t, safeJsonStringify(e2));
  }
  async removeItem(t) {
    await this.indexedDb.removeItem(t);
  }
};
var l2 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var c = { exports: {} };
(function() {
  let i3;
  function t() {
  }
  i3 = t, i3.prototype.getItem = function(e2) {
    return this.hasOwnProperty(e2) ? String(this[e2]) : null;
  }, i3.prototype.setItem = function(e2, n4) {
    this[e2] = String(n4);
  }, i3.prototype.removeItem = function(e2) {
    delete this[e2];
  }, i3.prototype.clear = function() {
    const e2 = this;
    Object.keys(e2).forEach(function(n4) {
      e2[n4] = void 0, delete e2[n4];
    });
  }, i3.prototype.key = function(e2) {
    return e2 = e2 || 0, Object.keys(this)[e2];
  }, i3.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof l2 < "u" && l2.localStorage ? c.exports = l2.localStorage : typeof window < "u" && window.localStorage ? c.exports = window.localStorage : c.exports = new t();
})();
function k(i3) {
  var t;
  return [i3[0], safeJsonParse((t = i3[1]) != null ? t : "")];
}
var K = class {
  constructor() {
    this.localStorage = c.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(k);
  }
  async getItem(t) {
    const e2 = this.localStorage.getItem(t);
    if (e2 !== null) return safeJsonParse(e2);
  }
  async setItem(t, e2) {
    this.localStorage.setItem(t, safeJsonStringify(e2));
  }
  async removeItem(t) {
    this.localStorage.removeItem(t);
  }
};
var N = "wc_storage_version";
var y = 1;
var O = async (i3, t, e2) => {
  const n4 = N, s2 = await t.getItem(n4);
  if (s2 && s2 >= y) {
    e2(t);
    return;
  }
  const a3 = await i3.getKeys();
  if (!a3.length) {
    e2(t);
    return;
  }
  const m3 = [];
  for (; a3.length; ) {
    const r3 = a3.shift();
    if (!r3) continue;
    const o5 = r3.toLowerCase();
    if (o5.includes("wc@") || o5.includes("walletconnect") || o5.includes("wc_") || o5.includes("wallet_connect")) {
      const f3 = await i3.getItem(r3);
      await t.setItem(r3, f3), m3.push(r3);
    }
  }
  await t.setItem(n4, y), e2(t), j(i3, m3);
};
var j = async (i3, t) => {
  t.length && t.forEach(async (e2) => {
    await i3.removeItem(e2);
  });
};
var h = class {
  constructor() {
    this.initialized = false, this.setInitialized = (e2) => {
      this.storage = e2, this.initialized = true;
    };
    const t = new K();
    this.storage = t;
    try {
      const e2 = new _();
      O(t, e2, this.setInitialized);
    } catch {
      this.initialized = true;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(t) {
    return await this.initialize(), this.storage.getItem(t);
  }
  async setItem(t, e2) {
    return await this.initialize(), this.storage.setItem(t, e2);
  }
  async removeItem(t) {
    return await this.initialize(), this.storage.removeItem(t);
  }
  async initialize() {
    this.initialized || await new Promise((t) => {
      const e2 = setInterval(() => {
        this.initialized && (clearInterval(e2), t());
      }, 20);
    });
  }
};

// node_modules/@walletconnect/logger/dist/index.es.js
var b = { exports: {} };
function se(e2) {
  try {
    return JSON.stringify(e2);
  } catch {
    return '"[Circular]"';
  }
}
var ie = oe;
function oe(e2, t, r3) {
  var s2 = r3 && r3.stringify || se, i3 = 1;
  if (typeof e2 == "object" && e2 !== null) {
    var f3 = t.length + i3;
    if (f3 === 1) return e2;
    var h4 = new Array(f3);
    h4[0] = s2(e2);
    for (var u3 = 1; u3 < f3; u3++) h4[u3] = s2(t[u3]);
    return h4.join(" ");
  }
  if (typeof e2 != "string") return e2;
  var c5 = t.length;
  if (c5 === 0) return e2;
  for (var n4 = "", o5 = 1 - i3, l5 = -1, L3 = e2 && e2.length || 0, a3 = 0; a3 < L3; ) {
    if (e2.charCodeAt(a3) === 37 && a3 + 1 < L3) {
      switch (l5 = l5 > -1 ? l5 : 0, e2.charCodeAt(a3 + 1)) {
        case 100:
        case 102:
          if (o5 >= c5 || t[o5] == null) break;
          l5 < a3 && (n4 += e2.slice(l5, a3)), n4 += Number(t[o5]), l5 = a3 + 2, a3++;
          break;
        case 105:
          if (o5 >= c5 || t[o5] == null) break;
          l5 < a3 && (n4 += e2.slice(l5, a3)), n4 += Math.floor(Number(t[o5])), l5 = a3 + 2, a3++;
          break;
        case 79:
        case 111:
        case 106:
          if (o5 >= c5 || t[o5] === void 0) break;
          l5 < a3 && (n4 += e2.slice(l5, a3));
          var _3 = typeof t[o5];
          if (_3 === "string") {
            n4 += "'" + t[o5] + "'", l5 = a3 + 2, a3++;
            break;
          }
          if (_3 === "function") {
            n4 += t[o5].name || "<anonymous>", l5 = a3 + 2, a3++;
            break;
          }
          n4 += s2(t[o5]), l5 = a3 + 2, a3++;
          break;
        case 115:
          if (o5 >= c5) break;
          l5 < a3 && (n4 += e2.slice(l5, a3)), n4 += String(t[o5]), l5 = a3 + 2, a3++;
          break;
        case 37:
          l5 < a3 && (n4 += e2.slice(l5, a3)), n4 += "%", l5 = a3 + 2, a3++, o5--;
          break;
      }
      ++o5;
    }
    ++a3;
  }
  return l5 === -1 ? e2 : (l5 < L3 && (n4 += e2.slice(l5)), n4);
}
var G = ie;
b.exports = v;
var E2 = Le().console || {};
var le = { mapHttpRequest: T, mapHttpResponse: T, wrapRequestSerializer: $, wrapResponseSerializer: $, wrapErrorSerializer: $, req: T, res: T, err: U, errWithCause: U };
function m(e2, t) {
  return e2 === "silent" ? 1 / 0 : t.levels.values[e2];
}
var A = /* @__PURE__ */ Symbol("pino.logFuncs");
var P = /* @__PURE__ */ Symbol("pino.hierarchy");
var ae = { error: "log", fatal: "error", warn: "error", info: "log", debug: "log", trace: "log" };
function R(e2, t) {
  const r3 = { logger: t, parent: e2[P] };
  t[P] = r3;
}
function ue(e2, t, r3) {
  const s2 = {};
  t.forEach((i3) => {
    s2[i3] = r3[i3] ? r3[i3] : E2[i3] || E2[ae[i3] || "log"] || z2;
  }), e2[A] = s2;
}
function ce(e2, t) {
  return Array.isArray(e2) ? e2.filter(function(s2) {
    return s2 !== "!stdSerializers.err";
  }) : e2 === true ? Object.keys(t) : false;
}
function v(e2) {
  e2 = e2 || {}, e2.browser = e2.browser || {};
  const t = e2.browser.transmit;
  if (t && typeof t.send != "function") throw Error("pino: transmit option must have a send function");
  const r3 = e2.browser.write || E2;
  e2.browser.write && (e2.browser.asObject = true);
  const s2 = e2.serializers || {}, i3 = ce(e2.browser.serialize, s2);
  let f3 = e2.browser.serialize;
  Array.isArray(e2.browser.serialize) && e2.browser.serialize.indexOf("!stdSerializers.err") > -1 && (f3 = false);
  const h4 = Object.keys(e2.customLevels || {}), u3 = ["error", "fatal", "warn", "info", "debug", "trace"].concat(h4);
  typeof r3 == "function" && u3.forEach(function(g5) {
    r3[g5] = r3;
  }), (e2.enabled === false || e2.browser.disabled) && (e2.level = "silent");
  const c5 = e2.level || "info", n4 = Object.create(r3);
  n4.log || (n4.log = z2), ue(n4, u3, r3), R({}, n4), Object.defineProperty(n4, "levelVal", { get: l5 }), Object.defineProperty(n4, "level", { get: L3, set: a3 });
  const o5 = { transmit: t, serialize: i3, asObject: e2.browser.asObject, asObjectBindingsOnly: e2.browser.asObjectBindingsOnly, formatters: e2.browser.formatters, levels: u3, timestamp: ye(e2), messageKey: e2.messageKey || "msg", onChild: e2.onChild || z2 };
  n4.levels = fe(e2), n4.level = c5, n4.isLevelEnabled = function(g5) {
    return this.levels.values[g5] ? this.levels.values[g5] >= this.levels.values[this.level] : false;
  }, n4.setMaxListeners = n4.getMaxListeners = n4.emit = n4.addListener = n4.on = n4.prependListener = n4.once = n4.prependOnceListener = n4.removeListener = n4.removeAllListeners = n4.listeners = n4.listenerCount = n4.eventNames = n4.write = n4.flush = z2, n4.serializers = s2, n4._serialize = i3, n4._stdErrSerialize = f3, n4.child = function(...g5) {
    return _3.call(this, o5, ...g5);
  }, t && (n4._logEvent = N2());
  function l5() {
    return m(this.level, this);
  }
  function L3() {
    return this._level;
  }
  function a3(g5) {
    if (g5 !== "silent" && !this.levels.values[g5]) throw Error("unknown level " + g5);
    this._level = g5, O2(this, o5, n4, "error"), O2(this, o5, n4, "fatal"), O2(this, o5, n4, "warn"), O2(this, o5, n4, "info"), O2(this, o5, n4, "debug"), O2(this, o5, n4, "trace"), h4.forEach((d5) => {
      O2(this, o5, n4, d5);
    });
  }
  function _3(g5, d5, j6) {
    if (!d5) throw new Error("missing bindings for child Pino");
    j6 = j6 || {}, i3 && d5.serializers && (j6.serializers = d5.serializers);
    const F4 = j6.serializers;
    if (i3 && F4) {
      var C4 = Object.assign({}, s2, F4), M6 = e2.browser.serialize === true ? Object.keys(C4) : i3;
      delete d5.serializers, V([d5], M6, C4, this._stdErrSerialize);
    }
    function D5(I3) {
      this._childLevel = (I3._childLevel | 0) + 1, this.bindings = d5, C4 && (this.serializers = C4, this._serialize = M6), t && (this._logEvent = N2([].concat(I3._logEvent.bindings, d5)));
    }
    D5.prototype = this;
    const S5 = new D5(this);
    return R(this, S5), S5.child = function(...I3) {
      return _3.call(this, g5, ...I3);
    }, S5.level = j6.level || this.level, g5.onChild(S5), S5;
  }
  return n4;
}
function fe(e2) {
  const t = e2.customLevels || {}, r3 = Object.assign({}, v.levels.values, t), s2 = Object.assign({}, v.levels.labels, he(t));
  return { values: r3, labels: s2 };
}
function he(e2) {
  const t = {};
  return Object.keys(e2).forEach(function(r3) {
    t[e2[r3]] = r3;
  }), t;
}
v.levels = { values: { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 }, labels: { 10: "trace", 20: "debug", 30: "info", 40: "warn", 50: "error", 60: "fatal" } }, v.stdSerializers = le, v.stdTimeFunctions = Object.assign({}, { nullTime: X, epochTime: Y, unixTime: pe, isoTime: we });
function ge(e2) {
  const t = [];
  e2.bindings && t.push(e2.bindings);
  let r3 = e2[P];
  for (; r3.parent; ) r3 = r3.parent, r3.logger.bindings && t.push(r3.logger.bindings);
  return t.reverse();
}
function O2(e2, t, r3, s2) {
  if (Object.defineProperty(e2, s2, { value: m(e2.level, r3) > m(s2, r3) ? z2 : r3[A][s2], writable: true, enumerable: true, configurable: true }), e2[s2] === z2) {
    if (!t.transmit) return;
    const f3 = t.transmit.level || e2.level, h4 = m(f3, r3);
    if (m(s2, r3) < h4) return;
  }
  e2[s2] = de(e2, t, r3, s2);
  const i3 = ge(e2);
  i3.length !== 0 && (e2[s2] = be(i3, e2[s2]));
}
function be(e2, t) {
  return function() {
    return t.apply(this, [...e2, ...arguments]);
  };
}
function de(e2, t, r3, s2) {
  return /* @__PURE__ */ (function(i3) {
    return function() {
      const h4 = t.timestamp(), u3 = new Array(arguments.length), c5 = Object.getPrototypeOf && Object.getPrototypeOf(this) === E2 ? E2 : this;
      for (var n4 = 0; n4 < u3.length; n4++) u3[n4] = arguments[n4];
      var o5 = false;
      if (t.serialize && (V(u3, this._serialize, this.serializers, this._stdErrSerialize), o5 = true), t.asObject || t.formatters ? i3.call(c5, ...ve(this, s2, u3, h4, t)) : i3.apply(c5, u3), t.transmit) {
        const l5 = t.transmit.level || e2._level, L3 = m(l5, r3), a3 = m(s2, r3);
        if (a3 < L3) return;
        me(this, { ts: h4, methodLevel: s2, methodValue: a3, transmitLevel: l5, transmitValue: r3.levels.values[t.transmit.level || e2._level], send: t.transmit.send, val: m(e2._level, r3) }, u3, o5);
      }
    };
  })(e2[A][s2]);
}
function ve(e2, t, r3, s2, i3) {
  const { level: f3, log: h4 = (l5) => l5 } = i3.formatters || {}, u3 = r3.slice();
  let c5 = u3[0];
  const n4 = {};
  let o5 = (e2._childLevel | 0) + 1;
  if (o5 < 1 && (o5 = 1), s2 && (n4.time = s2), f3) {
    const l5 = f3(t, e2.levels.values[t]);
    Object.assign(n4, l5);
  } else n4.level = e2.levels.values[t];
  if (i3.asObjectBindingsOnly) {
    if (c5 !== null && typeof c5 == "object") for (; o5-- && typeof u3[0] == "object"; ) Object.assign(n4, u3.shift());
    return [h4(n4), ...u3];
  } else {
    if (c5 !== null && typeof c5 == "object") {
      for (; o5-- && typeof u3[0] == "object"; ) Object.assign(n4, u3.shift());
      c5 = u3.length ? G(u3.shift(), u3) : void 0;
    } else typeof c5 == "string" && (c5 = G(u3.shift(), u3));
    return c5 !== void 0 && (n4[i3.messageKey] = c5), [h4(n4)];
  }
}
function V(e2, t, r3, s2) {
  for (const i3 in e2) if (s2 && e2[i3] instanceof Error) e2[i3] = v.stdSerializers.err(e2[i3]);
  else if (typeof e2[i3] == "object" && !Array.isArray(e2[i3]) && t) for (const f3 in e2[i3]) t.indexOf(f3) > -1 && f3 in r3 && (e2[i3][f3] = r3[f3](e2[i3][f3]));
}
function me(e2, t, r3, s2 = false) {
  const i3 = t.send, f3 = t.ts, h4 = t.methodLevel, u3 = t.methodValue, c5 = t.val, n4 = e2._logEvent.bindings;
  s2 || V(r3, e2._serialize || Object.keys(e2.serializers), e2.serializers, e2._stdErrSerialize === void 0 ? true : e2._stdErrSerialize), e2._logEvent.ts = f3, e2._logEvent.messages = r3.filter(function(o5) {
    return n4.indexOf(o5) === -1;
  }), e2._logEvent.level.label = h4, e2._logEvent.level.value = u3, i3(h4, e2._logEvent, c5), e2._logEvent = N2(n4);
}
function N2(e2) {
  return { ts: 0, messages: [], bindings: e2 || [], level: { label: "", value: 0 } };
}
function U(e2) {
  const t = { type: e2.constructor.name, msg: e2.message, stack: e2.stack };
  for (const r3 in e2) t[r3] === void 0 && (t[r3] = e2[r3]);
  return t;
}
function ye(e2) {
  return typeof e2.timestamp == "function" ? e2.timestamp : e2.timestamp === false ? X : Y;
}
function T() {
  return {};
}
function $(e2) {
  return e2;
}
function z2() {
}
function X() {
  return false;
}
function Y() {
  return Date.now();
}
function pe() {
  return Math.round(Date.now() / 1e3);
}
function we() {
  return new Date(Date.now()).toISOString();
}
function Le() {
  function e2(t) {
    return typeof t < "u" && t;
  }
  try {
    return typeof globalThis < "u" || Object.defineProperty(Object.prototype, "globalThis", { get: function() {
      return delete Object.prototype.globalThis, this.globalThis = this;
    }, configurable: true }), globalThis;
  } catch {
    return e2(self) || e2(window) || e2(this) || {};
  }
}
b.exports.default = v;
var Oe = b.exports.pino = v;
var Z = { level: "info" };
var k2 = "custom_context";
var x2 = 1e3 * 1024;
var ze = Object.defineProperty;
var _e = (e2, t, r3) => t in e2 ? ze(e2, t, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[t] = r3;
var y2 = (e2, t, r3) => _e(e2, typeof t != "symbol" ? t + "" : t, r3);
var je = class {
  constructor(t) {
    y2(this, "nodeValue"), y2(this, "sizeInBytes"), y2(this, "next"), this.nodeValue = t, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
};
var q = class {
  constructor(t) {
    y2(this, "lengthInNodes"), y2(this, "sizeInBytes"), y2(this, "head"), y2(this, "tail"), y2(this, "maxSizeInBytes"), this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = t, this.sizeInBytes = 0;
  }
  append(t) {
    const r3 = new je(t);
    if (r3.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${t} with size ${r3.size}`);
    for (; this.size + r3.size > this.maxSizeInBytes; ) this.shift();
    this.head ? (this.tail && (this.tail.next = r3), this.tail = r3) : (this.head = r3, this.tail = r3), this.lengthInNodes++, this.sizeInBytes += r3.size;
  }
  shift() {
    if (!this.head) return;
    const t = this.head;
    this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= t.size;
  }
  toArray() {
    const t = [];
    let r3 = this.head;
    for (; r3 !== null; ) t.push(r3.value), r3 = r3.next;
    return t;
  }
  get length() {
    return this.lengthInNodes;
  }
  get size() {
    return this.sizeInBytes;
  }
  toOrderedArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let t = this.head;
    return { next: () => {
      if (!t) return { done: true, value: null };
      const r3 = t.value;
      return t = t.next, { done: false, value: r3 };
    } };
  }
};
var Se = (e2) => JSON.stringify(e2, (t, r3) => typeof r3 == "bigint" ? r3.toString() + "n" : r3);
function K2(e2) {
  return typeof e2 == "string" ? e2 : Se(e2) || "";
}
var Ee = Object.defineProperty;
var ke = (e2, t, r3) => t in e2 ? Ee(e2, t, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[t] = r3;
var B = (e2, t, r3) => ke(e2, typeof t != "symbol" ? t + "" : t, r3);
var J = class {
  constructor(t, r3 = x2) {
    B(this, "logs"), B(this, "level"), B(this, "levelValue"), B(this, "MAX_LOG_SIZE_IN_BYTES"), this.level = t ?? "error", this.levelValue = b.exports.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = r3, this.logs = new q(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(t, r3) {
    r3 === b.exports.levels.values.error ? console.error(t) : r3 === b.exports.levels.values.warn ? console.warn(t) : r3 === b.exports.levels.values.debug ? console.debug(t) : r3 === b.exports.levels.values.trace ? console.trace(t) : console.log(t);
  }
  appendToLogs(t) {
    this.logs.append(K2({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: t }));
    const r3 = typeof t == "string" ? JSON.parse(t).level : t.level;
    r3 >= this.levelValue && this.forwardToConsole(t, r3);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new q(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(t) {
    const r3 = this.getLogArray();
    return r3.push(K2({ extraMetadata: t })), new Blob(r3, { type: "application/json" });
  }
};
var Ce = Object.defineProperty;
var Ie = (e2, t, r3) => t in e2 ? Ce(e2, t, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[t] = r3;
var Te = (e2, t, r3) => Ie(e2, typeof t != "symbol" ? t + "" : t, r3);
var xe = class {
  constructor(t, r3 = x2) {
    Te(this, "baseChunkLogger"), this.baseChunkLogger = new J(t, r3);
  }
  write(t) {
    this.baseChunkLogger.appendToLogs(t);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(t) {
    return this.baseChunkLogger.logsToBlob(t);
  }
  downloadLogsBlobInBrowser(t) {
    const r3 = URL.createObjectURL(this.logsToBlob(t)), s2 = document.createElement("a");
    s2.href = r3, s2.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(s2), s2.click(), document.body.removeChild(s2), URL.revokeObjectURL(r3);
  }
};
var Be = Object.defineProperty;
var Ae = (e2, t, r3) => t in e2 ? Be(e2, t, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[t] = r3;
var Pe = (e2, t, r3) => Ae(e2, typeof t != "symbol" ? t + "" : t, r3);
var Ve = class {
  constructor(t, r3 = x2) {
    Pe(this, "baseChunkLogger"), this.baseChunkLogger = new J(t, r3);
  }
  write(t) {
    this.baseChunkLogger.appendToLogs(t);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(t) {
    return this.baseChunkLogger.logsToBlob(t);
  }
};
var Ne = Object.defineProperty;
var $e = Object.defineProperties;
var Fe = Object.getOwnPropertyDescriptors;
var H = Object.getOwnPropertySymbols;
var Me = Object.prototype.hasOwnProperty;
var De = Object.prototype.propertyIsEnumerable;
var W = (e2, t, r3) => t in e2 ? Ne(e2, t, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[t] = r3;
var p = (e2, t) => {
  for (var r3 in t || (t = {})) Me.call(t, r3) && W(e2, r3, t[r3]);
  if (H) for (var r3 of H(t)) De.call(t, r3) && W(e2, r3, t[r3]);
  return e2;
};
var w = (e2, t) => $e(e2, Fe(t));
function Ge(e2) {
  return w(p({}, e2), { level: e2?.level || Z.level });
}
function Q(e2, t, r3 = k2) {
  return e2[r3] = t, e2;
}
function ee(e2, t = k2) {
  return e2[t] || "";
}
function te(e2, t, r3 = k2) {
  const s2 = ee(e2, r3);
  return s2.trim() ? `${s2}/${t}` : t;
}
function Re(e2, t, r3 = k2) {
  const s2 = te(e2, t, r3), i3 = e2.child({ context: s2 });
  return Q(i3, s2, r3);
}
function re(e2) {
  var t, r3;
  const s2 = new xe((t = e2.opts) == null ? void 0 : t.level, e2.maxSizeInBytes);
  return { logger: b.exports(w(p({}, e2.opts), { level: "trace", browser: w(p({}, (r3 = e2.opts) == null ? void 0 : r3.browser), { write: (i3) => s2.write(i3) }) })), chunkLoggerController: s2 };
}
function ne(e2) {
  var t, r3;
  const s2 = new Ve((t = e2.opts) == null ? void 0 : t.level, e2.maxSizeInBytes);
  return { logger: b.exports(w(p({}, e2.opts), { level: "trace", browser: w(p({}, (r3 = e2.opts) == null ? void 0 : r3.browser), { write: (i3) => s2.write(i3) }) }), s2), chunkLoggerController: s2 };
}
function Ue(e2) {
  var t;
  if (typeof e2.loggerOverride < "u" && typeof e2.loggerOverride != "string") return { logger: e2.loggerOverride, chunkLoggerController: null };
  const r3 = w(p({}, e2.opts), { level: typeof e2.loggerOverride == "string" ? e2.loggerOverride : (t = e2.opts) == null ? void 0 : t.level });
  return typeof window < "u" ? re(w(p({}, e2), { opts: r3 })) : ne(w(p({}, e2), { opts: r3 }));
}

// node_modules/@walletconnect/types/dist/index.js
var import_events4 = __toESM(require_events());
var n2 = class extends IEvents {
  constructor(s2) {
    super(), this.opts = s2, this.protocol = "wc", this.version = 2;
  }
};
var h2 = class extends IEvents {
  constructor(s2, t) {
    super(), this.core = s2, this.logger = t, this.records = /* @__PURE__ */ new Map();
  }
};
var a2 = class {
  constructor(s2, t) {
    this.logger = s2, this.core = t;
  }
};
var g = class extends IEvents {
  constructor(s2, t) {
    super(), this.relayer = s2, this.logger = t;
  }
};
var u = class extends IEvents {
  constructor(s2) {
    super();
  }
};
var p2 = class {
  constructor(s2, t, e2, f3) {
    this.core = s2, this.logger = t, this.name = e2;
  }
};
var d = class extends IEvents {
  constructor(s2, t) {
    super(), this.relayer = s2, this.logger = t;
  }
};
var x3 = class extends IEvents {
  constructor(s2, t) {
    super(), this.core = s2, this.logger = t;
  }
};
var y3 = class {
  constructor(s2, t, e2) {
    this.core = s2, this.logger = t, this.store = e2;
  }
};
var v2 = class {
  constructor(s2, t) {
    this.projectId = s2, this.logger = t;
  }
};
var C = class {
  constructor(s2, t, e2) {
    this.core = s2, this.logger = t, this.telemetryEnabled = e2;
  }
};
var S = class {
  constructor(s2) {
    this.opts = s2, this.protocol = "wc", this.version = 2;
  }
};
var M = class {
  constructor(s2) {
    this.client = s2;
  }
};

// node_modules/@walletconnect/core/dist/index.js
var import_time4 = __toESM(require_cjs(), 1);

// node_modules/@walletconnect/relay-auth/dist/index.es.js
var import_time2 = __toESM(require_cjs());
function En(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function fe2(t, ...e2) {
  if (!En(t)) throw new Error("Uint8Array expected");
  if (e2.length > 0 && !e2.includes(t.length)) throw new Error("Uint8Array expected of length " + e2 + ", got length=" + t.length);
}
function De2(t, e2 = true) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e2 && t.finished) throw new Error("Hash#digest() has already been called");
}
function gn(t, e2) {
  fe2(t);
  const n4 = e2.outputLen;
  if (t.length < n4) throw new Error("digestInto() expects output buffer of length at least " + n4);
}
var it = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
var _t = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength);
function yn(t) {
  if (typeof t != "string") throw new Error("utf8ToBytes expected string, got " + typeof t);
  return new Uint8Array(new TextEncoder().encode(t));
}
function de2(t) {
  return typeof t == "string" && (t = yn(t)), fe2(t), t;
}
var xn = class {
  clone() {
    return this._cloneInto();
  }
};
function Bn(t) {
  const e2 = (r3) => t().update(de2(r3)).digest(), n4 = t();
  return e2.outputLen = n4.outputLen, e2.blockLen = n4.blockLen, e2.create = () => t(), e2;
}
function he2(t = 32) {
  if (it && typeof it.getRandomValues == "function") return it.getRandomValues(new Uint8Array(t));
  if (it && typeof it.randomBytes == "function") return it.randomBytes(t);
  throw new Error("crypto.getRandomValues must be defined");
}
function Cn(t, e2, n4, r3) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e2, n4, r3);
  const o5 = BigInt(32), s2 = BigInt(4294967295), a3 = Number(n4 >> o5 & s2), u3 = Number(n4 & s2), i3 = r3 ? 4 : 0, D5 = r3 ? 0 : 4;
  t.setUint32(e2 + i3, a3, r3), t.setUint32(e2 + D5, u3, r3);
}
var An = class extends xn {
  constructor(e2, n4, r3, o5) {
    super(), this.blockLen = e2, this.outputLen = n4, this.padOffset = r3, this.isLE = o5, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e2), this.view = _t(this.buffer);
  }
  update(e2) {
    De2(this);
    const { view: n4, buffer: r3, blockLen: o5 } = this;
    e2 = de2(e2);
    const s2 = e2.length;
    for (let a3 = 0; a3 < s2; ) {
      const u3 = Math.min(o5 - this.pos, s2 - a3);
      if (u3 === o5) {
        const i3 = _t(e2);
        for (; o5 <= s2 - a3; a3 += o5) this.process(i3, a3);
        continue;
      }
      r3.set(e2.subarray(a3, a3 + u3), this.pos), this.pos += u3, a3 += u3, this.pos === o5 && (this.process(n4, 0), this.pos = 0);
    }
    return this.length += e2.length, this.roundClean(), this;
  }
  digestInto(e2) {
    De2(this), gn(e2, this), this.finished = true;
    const { buffer: n4, view: r3, blockLen: o5, isLE: s2 } = this;
    let { pos: a3 } = this;
    n4[a3++] = 128, this.buffer.subarray(a3).fill(0), this.padOffset > o5 - a3 && (this.process(r3, 0), a3 = 0);
    for (let l5 = a3; l5 < o5; l5++) n4[l5] = 0;
    Cn(r3, o5 - 8, BigInt(this.length * 8), s2), this.process(r3, 0);
    const u3 = _t(e2), i3 = this.outputLen;
    if (i3 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const D5 = i3 / 4, c5 = this.get();
    if (D5 > c5.length) throw new Error("_sha2: outputLen bigger than state");
    for (let l5 = 0; l5 < D5; l5++) u3.setUint32(4 * l5, c5[l5], s2);
  }
  digest() {
    const { buffer: e2, outputLen: n4 } = this;
    this.digestInto(e2);
    const r3 = e2.slice(0, n4);
    return this.destroy(), r3;
  }
  _cloneInto(e2) {
    e2 || (e2 = new this.constructor()), e2.set(...this.get());
    const { blockLen: n4, buffer: r3, length: o5, finished: s2, destroyed: a3, pos: u3 } = this;
    return e2.length = o5, e2.pos = u3, e2.finished = s2, e2.destroyed = a3, o5 % n4 && e2.buffer.set(r3), e2;
  }
};
var wt = BigInt(2 ** 32 - 1);
var St = BigInt(32);
function le2(t, e2 = false) {
  return e2 ? { h: Number(t & wt), l: Number(t >> St & wt) } : { h: Number(t >> St & wt) | 0, l: Number(t & wt) | 0 };
}
function mn(t, e2 = false) {
  let n4 = new Uint32Array(t.length), r3 = new Uint32Array(t.length);
  for (let o5 = 0; o5 < t.length; o5++) {
    const { h: s2, l: a3 } = le2(t[o5], e2);
    [n4[o5], r3[o5]] = [s2, a3];
  }
  return [n4, r3];
}
var _n = (t, e2) => BigInt(t >>> 0) << St | BigInt(e2 >>> 0);
var Sn = (t, e2, n4) => t >>> n4;
var vn = (t, e2, n4) => t << 32 - n4 | e2 >>> n4;
var In = (t, e2, n4) => t >>> n4 | e2 << 32 - n4;
var Un = (t, e2, n4) => t << 32 - n4 | e2 >>> n4;
var Tn = (t, e2, n4) => t << 64 - n4 | e2 >>> n4 - 32;
var Fn = (t, e2, n4) => t >>> n4 - 32 | e2 << 64 - n4;
var Nn = (t, e2) => e2;
var Ln = (t, e2) => t;
var On = (t, e2, n4) => t << n4 | e2 >>> 32 - n4;
var Hn = (t, e2, n4) => e2 << n4 | t >>> 32 - n4;
var zn = (t, e2, n4) => e2 << n4 - 32 | t >>> 64 - n4;
var Mn = (t, e2, n4) => t << n4 - 32 | e2 >>> 64 - n4;
function qn(t, e2, n4, r3) {
  const o5 = (e2 >>> 0) + (r3 >>> 0);
  return { h: t + n4 + (o5 / 2 ** 32 | 0) | 0, l: o5 | 0 };
}
var $n = (t, e2, n4) => (t >>> 0) + (e2 >>> 0) + (n4 >>> 0);
var kn = (t, e2, n4, r3) => e2 + n4 + r3 + (t / 2 ** 32 | 0) | 0;
var Rn = (t, e2, n4, r3) => (t >>> 0) + (e2 >>> 0) + (n4 >>> 0) + (r3 >>> 0);
var jn = (t, e2, n4, r3, o5) => e2 + n4 + r3 + o5 + (t / 2 ** 32 | 0) | 0;
var Zn = (t, e2, n4, r3, o5) => (t >>> 0) + (e2 >>> 0) + (n4 >>> 0) + (r3 >>> 0) + (o5 >>> 0);
var Gn = (t, e2, n4, r3, o5, s2) => e2 + n4 + r3 + o5 + s2 + (t / 2 ** 32 | 0) | 0;
var x4 = { fromBig: le2, split: mn, toBig: _n, shrSH: Sn, shrSL: vn, rotrSH: In, rotrSL: Un, rotrBH: Tn, rotrBL: Fn, rotr32H: Nn, rotr32L: Ln, rotlSH: On, rotlSL: Hn, rotlBH: zn, rotlBL: Mn, add: qn, add3L: $n, add3H: kn, add4L: Rn, add4H: jn, add5H: Gn, add5L: Zn };
var [Vn, Yn] = (() => x4.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((t) => BigInt(t))))();
var P2 = new Uint32Array(80);
var Q2 = new Uint32Array(80);
var Jn = class extends An {
  constructor() {
    super(128, 64, 16, false), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  get() {
    const { Ah: e2, Al: n4, Bh: r3, Bl: o5, Ch: s2, Cl: a3, Dh: u3, Dl: i3, Eh: D5, El: c5, Fh: l5, Fl: p5, Gh: w6, Gl: h4, Hh: g5, Hl: S5 } = this;
    return [e2, n4, r3, o5, s2, a3, u3, i3, D5, c5, l5, p5, w6, h4, g5, S5];
  }
  set(e2, n4, r3, o5, s2, a3, u3, i3, D5, c5, l5, p5, w6, h4, g5, S5) {
    this.Ah = e2 | 0, this.Al = n4 | 0, this.Bh = r3 | 0, this.Bl = o5 | 0, this.Ch = s2 | 0, this.Cl = a3 | 0, this.Dh = u3 | 0, this.Dl = i3 | 0, this.Eh = D5 | 0, this.El = c5 | 0, this.Fh = l5 | 0, this.Fl = p5 | 0, this.Gh = w6 | 0, this.Gl = h4 | 0, this.Hh = g5 | 0, this.Hl = S5 | 0;
  }
  process(e2, n4) {
    for (let d5 = 0; d5 < 16; d5++, n4 += 4) P2[d5] = e2.getUint32(n4), Q2[d5] = e2.getUint32(n4 += 4);
    for (let d5 = 16; d5 < 80; d5++) {
      const m3 = P2[d5 - 15] | 0, F4 = Q2[d5 - 15] | 0, q4 = x4.rotrSH(m3, F4, 1) ^ x4.rotrSH(m3, F4, 8) ^ x4.shrSH(m3, F4, 7), z5 = x4.rotrSL(m3, F4, 1) ^ x4.rotrSL(m3, F4, 8) ^ x4.shrSL(m3, F4, 7), I3 = P2[d5 - 2] | 0, O5 = Q2[d5 - 2] | 0, ot3 = x4.rotrSH(I3, O5, 19) ^ x4.rotrBH(I3, O5, 61) ^ x4.shrSH(I3, O5, 6), tt3 = x4.rotrSL(I3, O5, 19) ^ x4.rotrBL(I3, O5, 61) ^ x4.shrSL(I3, O5, 6), st3 = x4.add4L(z5, tt3, Q2[d5 - 7], Q2[d5 - 16]), at3 = x4.add4H(st3, q4, ot3, P2[d5 - 7], P2[d5 - 16]);
      P2[d5] = at3 | 0, Q2[d5] = st3 | 0;
    }
    let { Ah: r3, Al: o5, Bh: s2, Bl: a3, Ch: u3, Cl: i3, Dh: D5, Dl: c5, Eh: l5, El: p5, Fh: w6, Fl: h4, Gh: g5, Gl: S5, Hh: v9, Hl: L3 } = this;
    for (let d5 = 0; d5 < 80; d5++) {
      const m3 = x4.rotrSH(l5, p5, 14) ^ x4.rotrSH(l5, p5, 18) ^ x4.rotrBH(l5, p5, 41), F4 = x4.rotrSL(l5, p5, 14) ^ x4.rotrSL(l5, p5, 18) ^ x4.rotrBL(l5, p5, 41), q4 = l5 & w6 ^ ~l5 & g5, z5 = p5 & h4 ^ ~p5 & S5, I3 = x4.add5L(L3, F4, z5, Yn[d5], Q2[d5]), O5 = x4.add5H(I3, v9, m3, q4, Vn[d5], P2[d5]), ot3 = I3 | 0, tt3 = x4.rotrSH(r3, o5, 28) ^ x4.rotrBH(r3, o5, 34) ^ x4.rotrBH(r3, o5, 39), st3 = x4.rotrSL(r3, o5, 28) ^ x4.rotrBL(r3, o5, 34) ^ x4.rotrBL(r3, o5, 39), at3 = r3 & s2 ^ r3 & u3 ^ s2 & u3, Ct2 = o5 & a3 ^ o5 & i3 ^ a3 & i3;
      v9 = g5 | 0, L3 = S5 | 0, g5 = w6 | 0, S5 = h4 | 0, w6 = l5 | 0, h4 = p5 | 0, { h: l5, l: p5 } = x4.add(D5 | 0, c5 | 0, O5 | 0, ot3 | 0), D5 = u3 | 0, c5 = i3 | 0, u3 = s2 | 0, i3 = a3 | 0, s2 = r3 | 0, a3 = o5 | 0;
      const At2 = x4.add3L(ot3, st3, Ct2);
      r3 = x4.add3H(At2, O5, tt3, at3), o5 = At2 | 0;
    }
    ({ h: r3, l: o5 } = x4.add(this.Ah | 0, this.Al | 0, r3 | 0, o5 | 0)), { h: s2, l: a3 } = x4.add(this.Bh | 0, this.Bl | 0, s2 | 0, a3 | 0), { h: u3, l: i3 } = x4.add(this.Ch | 0, this.Cl | 0, u3 | 0, i3 | 0), { h: D5, l: c5 } = x4.add(this.Dh | 0, this.Dl | 0, D5 | 0, c5 | 0), { h: l5, l: p5 } = x4.add(this.Eh | 0, this.El | 0, l5 | 0, p5 | 0), { h: w6, l: h4 } = x4.add(this.Fh | 0, this.Fl | 0, w6 | 0, h4 | 0), { h: g5, l: S5 } = x4.add(this.Gh | 0, this.Gl | 0, g5 | 0, S5 | 0), { h: v9, l: L3 } = x4.add(this.Hh | 0, this.Hl | 0, v9 | 0, L3 | 0), this.set(r3, o5, s2, a3, u3, i3, D5, c5, l5, p5, w6, h4, g5, S5, v9, L3);
  }
  roundClean() {
    P2.fill(0), Q2.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var Kn = Bn(() => new Jn());
var vt = BigInt(0);
var be2 = BigInt(1);
var Wn = BigInt(2);
function It(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function Ut(t) {
  if (!It(t)) throw new Error("Uint8Array expected");
}
function Tt(t, e2) {
  if (typeof e2 != "boolean") throw new Error(t + " boolean expected, got " + e2);
}
var Xn = Array.from({ length: 256 }, (t, e2) => e2.toString(16).padStart(2, "0"));
function Ft(t) {
  Ut(t);
  let e2 = "";
  for (let n4 = 0; n4 < t.length; n4++) e2 += Xn[t[n4]];
  return e2;
}
function pe2(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  return t === "" ? vt : BigInt("0x" + t);
}
var K3 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function we2(t) {
  if (t >= K3._0 && t <= K3._9) return t - K3._0;
  if (t >= K3.A && t <= K3.F) return t - (K3.A - 10);
  if (t >= K3.a && t <= K3.f) return t - (K3.a - 10);
}
function Ee2(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  const e2 = t.length, n4 = e2 / 2;
  if (e2 % 2) throw new Error("hex string expected, got unpadded hex of length " + e2);
  const r3 = new Uint8Array(n4);
  for (let o5 = 0, s2 = 0; o5 < n4; o5++, s2 += 2) {
    const a3 = we2(t.charCodeAt(s2)), u3 = we2(t.charCodeAt(s2 + 1));
    if (a3 === void 0 || u3 === void 0) {
      const i3 = t[s2] + t[s2 + 1];
      throw new Error('hex string expected, got non-hex character "' + i3 + '" at index ' + s2);
    }
    r3[o5] = a3 * 16 + u3;
  }
  return r3;
}
function Pn(t) {
  return pe2(Ft(t));
}
function Et(t) {
  return Ut(t), pe2(Ft(Uint8Array.from(t).reverse()));
}
function ge2(t, e2) {
  return Ee2(t.toString(16).padStart(e2 * 2, "0"));
}
function Nt(t, e2) {
  return ge2(t, e2).reverse();
}
function W2(t, e2, n4) {
  let r3;
  if (typeof e2 == "string") try {
    r3 = Ee2(e2);
  } catch (s2) {
    throw new Error(t + " must be hex string or Uint8Array, cause: " + s2);
  }
  else if (It(e2)) r3 = Uint8Array.from(e2);
  else throw new Error(t + " must be hex string or Uint8Array");
  const o5 = r3.length;
  if (typeof n4 == "number" && o5 !== n4) throw new Error(t + " of length " + n4 + " expected, got " + o5);
  return r3;
}
function ye2(...t) {
  let e2 = 0;
  for (let r3 = 0; r3 < t.length; r3++) {
    const o5 = t[r3];
    Ut(o5), e2 += o5.length;
  }
  const n4 = new Uint8Array(e2);
  for (let r3 = 0, o5 = 0; r3 < t.length; r3++) {
    const s2 = t[r3];
    n4.set(s2, o5), o5 += s2.length;
  }
  return n4;
}
var Lt = (t) => typeof t == "bigint" && vt <= t;
function Qn(t, e2, n4) {
  return Lt(t) && Lt(e2) && Lt(n4) && e2 <= t && t < n4;
}
function ft(t, e2, n4, r3) {
  if (!Qn(e2, n4, r3)) throw new Error("expected valid " + t + ": " + n4 + " <= n < " + r3 + ", got " + e2);
}
function tr(t) {
  let e2;
  for (e2 = 0; t > vt; t >>= be2, e2 += 1) ;
  return e2;
}
var er = (t) => (Wn << BigInt(t - 1)) - be2;
var nr = { bigint: (t) => typeof t == "bigint", function: (t) => typeof t == "function", boolean: (t) => typeof t == "boolean", string: (t) => typeof t == "string", stringOrUint8Array: (t) => typeof t == "string" || It(t), isSafeInteger: (t) => Number.isSafeInteger(t), array: (t) => Array.isArray(t), field: (t, e2) => e2.Fp.isValid(t), hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen) };
function Ot(t, e2, n4 = {}) {
  const r3 = (o5, s2, a3) => {
    const u3 = nr[s2];
    if (typeof u3 != "function") throw new Error("invalid validator function");
    const i3 = t[o5];
    if (!(a3 && i3 === void 0) && !u3(i3, t)) throw new Error("param " + String(o5) + " is invalid. Expected " + s2 + ", got " + i3);
  };
  for (const [o5, s2] of Object.entries(e2)) r3(o5, s2, false);
  for (const [o5, s2] of Object.entries(n4)) r3(o5, s2, true);
  return t;
}
function xe2(t) {
  const e2 = /* @__PURE__ */ new WeakMap();
  return (n4, ...r3) => {
    const o5 = e2.get(n4);
    if (o5 !== void 0) return o5;
    const s2 = t(n4, ...r3);
    return e2.set(n4, s2), s2;
  };
}
var M2 = BigInt(0);
var N3 = BigInt(1);
var nt = BigInt(2);
var rr = BigInt(3);
var Ht = BigInt(4);
var Be2 = BigInt(5);
var Ce2 = BigInt(8);
function H2(t, e2) {
  const n4 = t % e2;
  return n4 >= M2 ? n4 : e2 + n4;
}
function or(t, e2, n4) {
  if (e2 < M2) throw new Error("invalid exponent, negatives unsupported");
  if (n4 <= M2) throw new Error("invalid modulus");
  if (n4 === N3) return M2;
  let r3 = N3;
  for (; e2 > M2; ) e2 & N3 && (r3 = r3 * t % n4), t = t * t % n4, e2 >>= N3;
  return r3;
}
function J2(t, e2, n4) {
  let r3 = t;
  for (; e2-- > M2; ) r3 *= r3, r3 %= n4;
  return r3;
}
function Ae2(t, e2) {
  if (t === M2) throw new Error("invert: expected non-zero number");
  if (e2 <= M2) throw new Error("invert: expected positive modulus, got " + e2);
  let n4 = H2(t, e2), r3 = e2, o5 = M2, s2 = N3;
  for (; n4 !== M2; ) {
    const u3 = r3 / n4, i3 = r3 % n4, D5 = o5 - s2 * u3;
    r3 = n4, n4 = i3, o5 = s2, s2 = D5;
  }
  if (r3 !== N3) throw new Error("invert: does not exist");
  return H2(o5, e2);
}
function sr(t) {
  const e2 = (t - N3) / nt;
  let n4, r3, o5;
  for (n4 = t - N3, r3 = 0; n4 % nt === M2; n4 /= nt, r3++) ;
  for (o5 = nt; o5 < t && or(o5, e2, t) !== t - N3; o5++) if (o5 > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (r3 === 1) {
    const a3 = (t + N3) / Ht;
    return function(i3, D5) {
      const c5 = i3.pow(D5, a3);
      if (!i3.eql(i3.sqr(c5), D5)) throw new Error("Cannot find square root");
      return c5;
    };
  }
  const s2 = (n4 + N3) / nt;
  return function(u3, i3) {
    if (u3.pow(i3, e2) === u3.neg(u3.ONE)) throw new Error("Cannot find square root");
    let D5 = r3, c5 = u3.pow(u3.mul(u3.ONE, o5), n4), l5 = u3.pow(i3, s2), p5 = u3.pow(i3, n4);
    for (; !u3.eql(p5, u3.ONE); ) {
      if (u3.eql(p5, u3.ZERO)) return u3.ZERO;
      let w6 = 1;
      for (let g5 = u3.sqr(p5); w6 < D5 && !u3.eql(g5, u3.ONE); w6++) g5 = u3.sqr(g5);
      const h4 = u3.pow(c5, N3 << BigInt(D5 - w6 - 1));
      c5 = u3.sqr(h4), l5 = u3.mul(l5, h4), p5 = u3.mul(p5, c5), D5 = w6;
    }
    return l5;
  };
}
function ir(t) {
  if (t % Ht === rr) {
    const e2 = (t + N3) / Ht;
    return function(r3, o5) {
      const s2 = r3.pow(o5, e2);
      if (!r3.eql(r3.sqr(s2), o5)) throw new Error("Cannot find square root");
      return s2;
    };
  }
  if (t % Ce2 === Be2) {
    const e2 = (t - Be2) / Ce2;
    return function(r3, o5) {
      const s2 = r3.mul(o5, nt), a3 = r3.pow(s2, e2), u3 = r3.mul(o5, a3), i3 = r3.mul(r3.mul(u3, nt), a3), D5 = r3.mul(u3, r3.sub(i3, r3.ONE));
      if (!r3.eql(r3.sqr(D5), o5)) throw new Error("Cannot find square root");
      return D5;
    };
  }
  return sr(t);
}
var ur = (t, e2) => (H2(t, e2) & N3) === N3;
var cr = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function ar(t) {
  const e2 = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, n4 = cr.reduce((r3, o5) => (r3[o5] = "function", r3), e2);
  return Ot(t, n4);
}
function fr(t, e2, n4) {
  if (n4 < M2) throw new Error("invalid exponent, negatives unsupported");
  if (n4 === M2) return t.ONE;
  if (n4 === N3) return e2;
  let r3 = t.ONE, o5 = e2;
  for (; n4 > M2; ) n4 & N3 && (r3 = t.mul(r3, o5)), o5 = t.sqr(o5), n4 >>= N3;
  return r3;
}
function Dr(t, e2) {
  const n4 = new Array(e2.length), r3 = e2.reduce((s2, a3, u3) => t.is0(a3) ? s2 : (n4[u3] = s2, t.mul(s2, a3)), t.ONE), o5 = t.inv(r3);
  return e2.reduceRight((s2, a3, u3) => t.is0(a3) ? s2 : (n4[u3] = t.mul(s2, n4[u3]), t.mul(s2, a3)), o5), n4;
}
function me2(t, e2) {
  const n4 = e2 !== void 0 ? e2 : t.toString(2).length, r3 = Math.ceil(n4 / 8);
  return { nBitLength: n4, nByteLength: r3 };
}
function _e2(t, e2, n4 = false, r3 = {}) {
  if (t <= M2) throw new Error("invalid field: expected ORDER > 0, got " + t);
  const { nBitLength: o5, nByteLength: s2 } = me2(t, e2);
  if (s2 > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let a3;
  const u3 = Object.freeze({ ORDER: t, isLE: n4, BITS: o5, BYTES: s2, MASK: er(o5), ZERO: M2, ONE: N3, create: (i3) => H2(i3, t), isValid: (i3) => {
    if (typeof i3 != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof i3);
    return M2 <= i3 && i3 < t;
  }, is0: (i3) => i3 === M2, isOdd: (i3) => (i3 & N3) === N3, neg: (i3) => H2(-i3, t), eql: (i3, D5) => i3 === D5, sqr: (i3) => H2(i3 * i3, t), add: (i3, D5) => H2(i3 + D5, t), sub: (i3, D5) => H2(i3 - D5, t), mul: (i3, D5) => H2(i3 * D5, t), pow: (i3, D5) => fr(u3, i3, D5), div: (i3, D5) => H2(i3 * Ae2(D5, t), t), sqrN: (i3) => i3 * i3, addN: (i3, D5) => i3 + D5, subN: (i3, D5) => i3 - D5, mulN: (i3, D5) => i3 * D5, inv: (i3) => Ae2(i3, t), sqrt: r3.sqrt || ((i3) => (a3 || (a3 = ir(t)), a3(u3, i3))), invertBatch: (i3) => Dr(u3, i3), cmov: (i3, D5, c5) => c5 ? D5 : i3, toBytes: (i3) => n4 ? Nt(i3, s2) : ge2(i3, s2), fromBytes: (i3) => {
    if (i3.length !== s2) throw new Error("Field.fromBytes: expected " + s2 + " bytes, got " + i3.length);
    return n4 ? Et(i3) : Pn(i3);
  } });
  return Object.freeze(u3);
}
var Se2 = BigInt(0);
var gt = BigInt(1);
function zt(t, e2) {
  const n4 = e2.negate();
  return t ? n4 : e2;
}
function ve2(t, e2) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e2) throw new Error("invalid window size, expected [1.." + e2 + "], got W=" + t);
}
function Mt(t, e2) {
  ve2(t, e2);
  const n4 = Math.ceil(e2 / t) + 1, r3 = 2 ** (t - 1);
  return { windows: n4, windowSize: r3 };
}
function dr(t, e2) {
  if (!Array.isArray(t)) throw new Error("array expected");
  t.forEach((n4, r3) => {
    if (!(n4 instanceof e2)) throw new Error("invalid point at index " + r3);
  });
}
function hr(t, e2) {
  if (!Array.isArray(t)) throw new Error("array of scalars expected");
  t.forEach((n4, r3) => {
    if (!e2.isValid(n4)) throw new Error("invalid scalar at index " + r3);
  });
}
var qt = /* @__PURE__ */ new WeakMap();
var Ie2 = /* @__PURE__ */ new WeakMap();
function $t(t) {
  return Ie2.get(t) || 1;
}
function lr(t, e2) {
  return { constTimeNegate: zt, hasPrecomputes(n4) {
    return $t(n4) !== 1;
  }, unsafeLadder(n4, r3, o5 = t.ZERO) {
    let s2 = n4;
    for (; r3 > Se2; ) r3 & gt && (o5 = o5.add(s2)), s2 = s2.double(), r3 >>= gt;
    return o5;
  }, precomputeWindow(n4, r3) {
    const { windows: o5, windowSize: s2 } = Mt(r3, e2), a3 = [];
    let u3 = n4, i3 = u3;
    for (let D5 = 0; D5 < o5; D5++) {
      i3 = u3, a3.push(i3);
      for (let c5 = 1; c5 < s2; c5++) i3 = i3.add(u3), a3.push(i3);
      u3 = i3.double();
    }
    return a3;
  }, wNAF(n4, r3, o5) {
    const { windows: s2, windowSize: a3 } = Mt(n4, e2);
    let u3 = t.ZERO, i3 = t.BASE;
    const D5 = BigInt(2 ** n4 - 1), c5 = 2 ** n4, l5 = BigInt(n4);
    for (let p5 = 0; p5 < s2; p5++) {
      const w6 = p5 * a3;
      let h4 = Number(o5 & D5);
      o5 >>= l5, h4 > a3 && (h4 -= c5, o5 += gt);
      const g5 = w6, S5 = w6 + Math.abs(h4) - 1, v9 = p5 % 2 !== 0, L3 = h4 < 0;
      h4 === 0 ? i3 = i3.add(zt(v9, r3[g5])) : u3 = u3.add(zt(L3, r3[S5]));
    }
    return { p: u3, f: i3 };
  }, wNAFUnsafe(n4, r3, o5, s2 = t.ZERO) {
    const { windows: a3, windowSize: u3 } = Mt(n4, e2), i3 = BigInt(2 ** n4 - 1), D5 = 2 ** n4, c5 = BigInt(n4);
    for (let l5 = 0; l5 < a3; l5++) {
      const p5 = l5 * u3;
      if (o5 === Se2) break;
      let w6 = Number(o5 & i3);
      if (o5 >>= c5, w6 > u3 && (w6 -= D5, o5 += gt), w6 === 0) continue;
      let h4 = r3[p5 + Math.abs(w6) - 1];
      w6 < 0 && (h4 = h4.negate()), s2 = s2.add(h4);
    }
    return s2;
  }, getPrecomputes(n4, r3, o5) {
    let s2 = qt.get(r3);
    return s2 || (s2 = this.precomputeWindow(r3, n4), n4 !== 1 && qt.set(r3, o5(s2))), s2;
  }, wNAFCached(n4, r3, o5) {
    const s2 = $t(n4);
    return this.wNAF(s2, this.getPrecomputes(s2, n4, o5), r3);
  }, wNAFCachedUnsafe(n4, r3, o5, s2) {
    const a3 = $t(n4);
    return a3 === 1 ? this.unsafeLadder(n4, r3, s2) : this.wNAFUnsafe(a3, this.getPrecomputes(a3, n4, o5), r3, s2);
  }, setWindowSize(n4, r3) {
    ve2(r3, e2), Ie2.set(n4, r3), qt.delete(n4);
  } };
}
function br(t, e2, n4, r3) {
  if (dr(n4, t), hr(r3, e2), n4.length !== r3.length) throw new Error("arrays of points and scalars must have equal length");
  const o5 = t.ZERO, s2 = tr(BigInt(n4.length)), a3 = s2 > 12 ? s2 - 3 : s2 > 4 ? s2 - 2 : s2 ? 2 : 1, u3 = (1 << a3) - 1, i3 = new Array(u3 + 1).fill(o5), D5 = Math.floor((e2.BITS - 1) / a3) * a3;
  let c5 = o5;
  for (let l5 = D5; l5 >= 0; l5 -= a3) {
    i3.fill(o5);
    for (let w6 = 0; w6 < r3.length; w6++) {
      const h4 = r3[w6], g5 = Number(h4 >> BigInt(l5) & BigInt(u3));
      i3[g5] = i3[g5].add(n4[w6]);
    }
    let p5 = o5;
    for (let w6 = i3.length - 1, h4 = o5; w6 > 0; w6--) h4 = h4.add(i3[w6]), p5 = p5.add(h4);
    if (c5 = c5.add(p5), l5 !== 0) for (let w6 = 0; w6 < a3; w6++) c5 = c5.double();
  }
  return c5;
}
function pr(t) {
  return ar(t.Fp), Ot(t, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...me2(t.n, t.nBitLength), ...t, p: t.Fp.ORDER });
}
var G2 = BigInt(0);
var j2 = BigInt(1);
var yt = BigInt(2);
var wr = BigInt(8);
var Er = { zip215: true };
function gr(t) {
  const e2 = pr(t);
  return Ot(t, { hash: "function", a: "bigint", d: "bigint", randomBytes: "function" }, { adjustScalarBytes: "function", domain: "function", uvRatio: "function", mapToCurve: "function" }), Object.freeze({ ...e2 });
}
function yr(t) {
  const e2 = gr(t), { Fp: n4, n: r3, prehash: o5, hash: s2, randomBytes: a3, nByteLength: u3, h: i3 } = e2, D5 = yt << BigInt(u3 * 8) - j2, c5 = n4.create, l5 = _e2(e2.n, e2.nBitLength), p5 = e2.uvRatio || ((y7, f3) => {
    try {
      return { isValid: true, value: n4.sqrt(y7 * n4.inv(f3)) };
    } catch {
      return { isValid: false, value: G2 };
    }
  }), w6 = e2.adjustScalarBytes || ((y7) => y7), h4 = e2.domain || ((y7, f3, b5) => {
    if (Tt("phflag", b5), f3.length || b5) throw new Error("Contexts/pre-hash are not supported");
    return y7;
  });
  function g5(y7, f3) {
    ft("coordinate " + y7, f3, G2, D5);
  }
  function S5(y7) {
    if (!(y7 instanceof d5)) throw new Error("ExtendedPoint expected");
  }
  const v9 = xe2((y7, f3) => {
    const { ex: b5, ey: E6, ez: B4 } = y7, C4 = y7.is0();
    f3 == null && (f3 = C4 ? wr : n4.inv(B4));
    const A4 = c5(b5 * f3), U4 = c5(E6 * f3), _3 = c5(B4 * f3);
    if (C4) return { x: G2, y: j2 };
    if (_3 !== j2) throw new Error("invZ was invalid");
    return { x: A4, y: U4 };
  }), L3 = xe2((y7) => {
    const { a: f3, d: b5 } = e2;
    if (y7.is0()) throw new Error("bad point: ZERO");
    const { ex: E6, ey: B4, ez: C4, et: A4 } = y7, U4 = c5(E6 * E6), _3 = c5(B4 * B4), T7 = c5(C4 * C4), $5 = c5(T7 * T7), R4 = c5(U4 * f3), V4 = c5(T7 * c5(R4 + _3)), Y4 = c5($5 + c5(b5 * c5(U4 * _3)));
    if (V4 !== Y4) throw new Error("bad point: equation left != right (1)");
    const Z4 = c5(E6 * B4), X3 = c5(C4 * A4);
    if (Z4 !== X3) throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class d5 {
    constructor(f3, b5, E6, B4) {
      this.ex = f3, this.ey = b5, this.ez = E6, this.et = B4, g5("x", f3), g5("y", b5), g5("z", E6), g5("t", B4), Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(f3) {
      if (f3 instanceof d5) throw new Error("extended point not allowed");
      const { x: b5, y: E6 } = f3 || {};
      return g5("x", b5), g5("y", E6), new d5(b5, E6, j2, c5(b5 * E6));
    }
    static normalizeZ(f3) {
      const b5 = n4.invertBatch(f3.map((E6) => E6.ez));
      return f3.map((E6, B4) => E6.toAffine(b5[B4])).map(d5.fromAffine);
    }
    static msm(f3, b5) {
      return br(d5, l5, f3, b5);
    }
    _setWindowSize(f3) {
      q4.setWindowSize(this, f3);
    }
    assertValidity() {
      L3(this);
    }
    equals(f3) {
      S5(f3);
      const { ex: b5, ey: E6, ez: B4 } = this, { ex: C4, ey: A4, ez: U4 } = f3, _3 = c5(b5 * U4), T7 = c5(C4 * B4), $5 = c5(E6 * U4), R4 = c5(A4 * B4);
      return _3 === T7 && $5 === R4;
    }
    is0() {
      return this.equals(d5.ZERO);
    }
    negate() {
      return new d5(c5(-this.ex), this.ey, this.ez, c5(-this.et));
    }
    double() {
      const { a: f3 } = e2, { ex: b5, ey: E6, ez: B4 } = this, C4 = c5(b5 * b5), A4 = c5(E6 * E6), U4 = c5(yt * c5(B4 * B4)), _3 = c5(f3 * C4), T7 = b5 + E6, $5 = c5(c5(T7 * T7) - C4 - A4), R4 = _3 + A4, V4 = R4 - U4, Y4 = _3 - A4, Z4 = c5($5 * V4), X3 = c5(R4 * Y4), et3 = c5($5 * Y4), pt4 = c5(V4 * R4);
      return new d5(Z4, X3, pt4, et3);
    }
    add(f3) {
      S5(f3);
      const { a: b5, d: E6 } = e2, { ex: B4, ey: C4, ez: A4, et: U4 } = this, { ex: _3, ey: T7, ez: $5, et: R4 } = f3;
      if (b5 === BigInt(-1)) {
        const re5 = c5((C4 - B4) * (T7 + _3)), oe5 = c5((C4 + B4) * (T7 - _3)), mt2 = c5(oe5 - re5);
        if (mt2 === G2) return this.double();
        const se5 = c5(A4 * yt * R4), ie5 = c5(U4 * yt * $5), ue5 = ie5 + se5, ce4 = oe5 + re5, ae5 = ie5 - se5, Dn = c5(ue5 * mt2), dn = c5(ce4 * ae5), hn = c5(ue5 * ae5), ln = c5(mt2 * ce4);
        return new d5(Dn, dn, ln, hn);
      }
      const V4 = c5(B4 * _3), Y4 = c5(C4 * T7), Z4 = c5(U4 * E6 * R4), X3 = c5(A4 * $5), et3 = c5((B4 + C4) * (_3 + T7) - V4 - Y4), pt4 = X3 - Z4, ee5 = X3 + Z4, ne5 = c5(Y4 - b5 * V4), un = c5(et3 * pt4), cn = c5(ee5 * ne5), an = c5(et3 * ne5), fn = c5(pt4 * ee5);
      return new d5(un, cn, fn, an);
    }
    subtract(f3) {
      return this.add(f3.negate());
    }
    wNAF(f3) {
      return q4.wNAFCached(this, f3, d5.normalizeZ);
    }
    multiply(f3) {
      const b5 = f3;
      ft("scalar", b5, j2, r3);
      const { p: E6, f: B4 } = this.wNAF(b5);
      return d5.normalizeZ([E6, B4])[0];
    }
    multiplyUnsafe(f3, b5 = d5.ZERO) {
      const E6 = f3;
      return ft("scalar", E6, G2, r3), E6 === G2 ? F4 : this.is0() || E6 === j2 ? this : q4.wNAFCachedUnsafe(this, E6, d5.normalizeZ, b5);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(i3).is0();
    }
    isTorsionFree() {
      return q4.unsafeLadder(this, r3).is0();
    }
    toAffine(f3) {
      return v9(this, f3);
    }
    clearCofactor() {
      const { h: f3 } = e2;
      return f3 === j2 ? this : this.multiplyUnsafe(f3);
    }
    static fromHex(f3, b5 = false) {
      const { d: E6, a: B4 } = e2, C4 = n4.BYTES;
      f3 = W2("pointHex", f3, C4), Tt("zip215", b5);
      const A4 = f3.slice(), U4 = f3[C4 - 1];
      A4[C4 - 1] = U4 & -129;
      const _3 = Et(A4), T7 = b5 ? D5 : n4.ORDER;
      ft("pointHex.y", _3, G2, T7);
      const $5 = c5(_3 * _3), R4 = c5($5 - j2), V4 = c5(E6 * $5 - B4);
      let { isValid: Y4, value: Z4 } = p5(R4, V4);
      if (!Y4) throw new Error("Point.fromHex: invalid y coordinate");
      const X3 = (Z4 & j2) === j2, et3 = (U4 & 128) !== 0;
      if (!b5 && Z4 === G2 && et3) throw new Error("Point.fromHex: x=0 and x_0=1");
      return et3 !== X3 && (Z4 = c5(-Z4)), d5.fromAffine({ x: Z4, y: _3 });
    }
    static fromPrivateKey(f3) {
      return O5(f3).point;
    }
    toRawBytes() {
      const { x: f3, y: b5 } = this.toAffine(), E6 = Nt(b5, n4.BYTES);
      return E6[E6.length - 1] |= f3 & j2 ? 128 : 0, E6;
    }
    toHex() {
      return Ft(this.toRawBytes());
    }
  }
  d5.BASE = new d5(e2.Gx, e2.Gy, j2, c5(e2.Gx * e2.Gy)), d5.ZERO = new d5(G2, j2, j2, G2);
  const { BASE: m3, ZERO: F4 } = d5, q4 = lr(d5, u3 * 8);
  function z5(y7) {
    return H2(y7, r3);
  }
  function I3(y7) {
    return z5(Et(y7));
  }
  function O5(y7) {
    const f3 = n4.BYTES;
    y7 = W2("private key", y7, f3);
    const b5 = W2("hashed private key", s2(y7), 2 * f3), E6 = w6(b5.slice(0, f3)), B4 = b5.slice(f3, 2 * f3), C4 = I3(E6), A4 = m3.multiply(C4), U4 = A4.toRawBytes();
    return { head: E6, prefix: B4, scalar: C4, point: A4, pointBytes: U4 };
  }
  function ot3(y7) {
    return O5(y7).pointBytes;
  }
  function tt3(y7 = new Uint8Array(), ...f3) {
    const b5 = ye2(...f3);
    return I3(s2(h4(b5, W2("context", y7), !!o5)));
  }
  function st3(y7, f3, b5 = {}) {
    y7 = W2("message", y7), o5 && (y7 = o5(y7));
    const { prefix: E6, scalar: B4, pointBytes: C4 } = O5(f3), A4 = tt3(b5.context, E6, y7), U4 = m3.multiply(A4).toRawBytes(), _3 = tt3(b5.context, U4, C4, y7), T7 = z5(A4 + _3 * B4);
    ft("signature.s", T7, G2, r3);
    const $5 = ye2(U4, Nt(T7, n4.BYTES));
    return W2("result", $5, n4.BYTES * 2);
  }
  const at3 = Er;
  function Ct2(y7, f3, b5, E6 = at3) {
    const { context: B4, zip215: C4 } = E6, A4 = n4.BYTES;
    y7 = W2("signature", y7, 2 * A4), f3 = W2("message", f3), b5 = W2("publicKey", b5, A4), C4 !== void 0 && Tt("zip215", C4), o5 && (f3 = o5(f3));
    const U4 = Et(y7.slice(A4, 2 * A4));
    let _3, T7, $5;
    try {
      _3 = d5.fromHex(b5, C4), T7 = d5.fromHex(y7.slice(0, A4), C4), $5 = m3.multiplyUnsafe(U4);
    } catch {
      return false;
    }
    if (!C4 && _3.isSmallOrder()) return false;
    const R4 = tt3(B4, T7.toRawBytes(), _3.toRawBytes(), f3);
    return T7.add(_3.multiplyUnsafe(R4)).subtract($5).clearCofactor().equals(d5.ZERO);
  }
  return m3._setWindowSize(8), { CURVE: e2, getPublicKey: ot3, sign: st3, verify: Ct2, ExtendedPoint: d5, utils: { getExtendedPublicKey: O5, randomPrivateKey: () => a3(n4.BYTES), precompute(y7 = 8, f3 = d5.BASE) {
    return f3._setWindowSize(y7), f3.multiply(BigInt(3)), f3;
  } } };
}
BigInt(0), BigInt(1);
var kt = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
var Ue2 = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
var xr = BigInt(1);
var Te2 = BigInt(2);
BigInt(3);
var Br = BigInt(5);
var Cr = BigInt(8);
function Ar(t) {
  const e2 = BigInt(10), n4 = BigInt(20), r3 = BigInt(40), o5 = BigInt(80), s2 = kt, u3 = t * t % s2 * t % s2, i3 = J2(u3, Te2, s2) * u3 % s2, D5 = J2(i3, xr, s2) * t % s2, c5 = J2(D5, Br, s2) * D5 % s2, l5 = J2(c5, e2, s2) * c5 % s2, p5 = J2(l5, n4, s2) * l5 % s2, w6 = J2(p5, r3, s2) * p5 % s2, h4 = J2(w6, o5, s2) * w6 % s2, g5 = J2(h4, o5, s2) * w6 % s2, S5 = J2(g5, e2, s2) * c5 % s2;
  return { pow_p_5_8: J2(S5, Te2, s2) * t % s2, b2: u3 };
}
function mr(t) {
  return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
function _r(t, e2) {
  const n4 = kt, r3 = H2(e2 * e2 * e2, n4), o5 = H2(r3 * r3 * e2, n4), s2 = Ar(t * o5).pow_p_5_8;
  let a3 = H2(t * r3 * s2, n4);
  const u3 = H2(e2 * a3 * a3, n4), i3 = a3, D5 = H2(a3 * Ue2, n4), c5 = u3 === t, l5 = u3 === H2(-t, n4), p5 = u3 === H2(-t * Ue2, n4);
  return c5 && (a3 = i3), (l5 || p5) && (a3 = D5), ur(a3, n4) && (a3 = H2(-a3, n4)), { isValid: c5 || l5, value: a3 };
}
var Sr = (() => _e2(kt, void 0, true))();
var vr = (() => ({ a: BigInt(-1), d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"), Fp: Sr, n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"), h: Cr, Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"), Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"), hash: Kn, randomBytes: he2, adjustScalarBytes: mr, uvRatio: _r }))();
var Rt = (() => yr(vr))();
var jt = "EdDSA";
var Zt = "JWT";
var ut = ".";
var Dt = "base64url";
var Gt = "utf8";
var xt = "utf8";
var Vt = ":";
var Yt = "did";
var Jt = "key";
var dt = "base58btc";
var Kt = "z";
var Wt = "K36";
var Ne2 = 32;
function Xt(t) {
  return globalThis.Buffer != null ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t;
}
function Le2(t = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Xt(globalThis.Buffer.allocUnsafe(t)) : new Uint8Array(t);
}
function Oe2(t, e2) {
  e2 || (e2 = t.reduce((o5, s2) => o5 + s2.length, 0));
  const n4 = Le2(e2);
  let r3 = 0;
  for (const o5 of t) n4.set(o5, r3), r3 += o5.length;
  return Xt(n4);
}
function Ir(t, e2) {
  if (t.length >= 255) throw new TypeError("Alphabet too long");
  for (var n4 = new Uint8Array(256), r3 = 0; r3 < n4.length; r3++) n4[r3] = 255;
  for (var o5 = 0; o5 < t.length; o5++) {
    var s2 = t.charAt(o5), a3 = s2.charCodeAt(0);
    if (n4[a3] !== 255) throw new TypeError(s2 + " is ambiguous");
    n4[a3] = o5;
  }
  var u3 = t.length, i3 = t.charAt(0), D5 = Math.log(u3) / Math.log(256), c5 = Math.log(256) / Math.log(u3);
  function l5(h4) {
    if (h4 instanceof Uint8Array || (ArrayBuffer.isView(h4) ? h4 = new Uint8Array(h4.buffer, h4.byteOffset, h4.byteLength) : Array.isArray(h4) && (h4 = Uint8Array.from(h4))), !(h4 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (h4.length === 0) return "";
    for (var g5 = 0, S5 = 0, v9 = 0, L3 = h4.length; v9 !== L3 && h4[v9] === 0; ) v9++, g5++;
    for (var d5 = (L3 - v9) * c5 + 1 >>> 0, m3 = new Uint8Array(d5); v9 !== L3; ) {
      for (var F4 = h4[v9], q4 = 0, z5 = d5 - 1; (F4 !== 0 || q4 < S5) && z5 !== -1; z5--, q4++) F4 += 256 * m3[z5] >>> 0, m3[z5] = F4 % u3 >>> 0, F4 = F4 / u3 >>> 0;
      if (F4 !== 0) throw new Error("Non-zero carry");
      S5 = q4, v9++;
    }
    for (var I3 = d5 - S5; I3 !== d5 && m3[I3] === 0; ) I3++;
    for (var O5 = i3.repeat(g5); I3 < d5; ++I3) O5 += t.charAt(m3[I3]);
    return O5;
  }
  function p5(h4) {
    if (typeof h4 != "string") throw new TypeError("Expected String");
    if (h4.length === 0) return new Uint8Array();
    var g5 = 0;
    if (h4[g5] !== " ") {
      for (var S5 = 0, v9 = 0; h4[g5] === i3; ) S5++, g5++;
      for (var L3 = (h4.length - g5) * D5 + 1 >>> 0, d5 = new Uint8Array(L3); h4[g5]; ) {
        var m3 = n4[h4.charCodeAt(g5)];
        if (m3 === 255) return;
        for (var F4 = 0, q4 = L3 - 1; (m3 !== 0 || F4 < v9) && q4 !== -1; q4--, F4++) m3 += u3 * d5[q4] >>> 0, d5[q4] = m3 % 256 >>> 0, m3 = m3 / 256 >>> 0;
        if (m3 !== 0) throw new Error("Non-zero carry");
        v9 = F4, g5++;
      }
      if (h4[g5] !== " ") {
        for (var z5 = L3 - v9; z5 !== L3 && d5[z5] === 0; ) z5++;
        for (var I3 = new Uint8Array(S5 + (L3 - z5)), O5 = S5; z5 !== L3; ) I3[O5++] = d5[z5++];
        return I3;
      }
    }
  }
  function w6(h4) {
    var g5 = p5(h4);
    if (g5) return g5;
    throw new Error(`Non-${e2} character`);
  }
  return { encode: l5, decodeUnsafe: p5, decode: w6 };
}
var Ur = Ir;
var Tr = Ur;
var He = (t) => {
  if (t instanceof Uint8Array && t.constructor.name === "Uint8Array") return t;
  if (t instanceof ArrayBuffer) return new Uint8Array(t);
  if (ArrayBuffer.isView(t)) return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  throw new Error("Unknown type, must be binary type");
};
var Fr = (t) => new TextEncoder().encode(t);
var Nr = (t) => new TextDecoder().decode(t);
var Lr = class {
  constructor(e2, n4, r3) {
    this.name = e2, this.prefix = n4, this.baseEncode = r3;
  }
  encode(e2) {
    if (e2 instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e2)}`;
    throw Error("Unknown type, must be binary type");
  }
};
var Or = class {
  constructor(e2, n4, r3) {
    if (this.name = e2, this.prefix = n4, n4.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = n4.codePointAt(0), this.baseDecode = r3;
  }
  decode(e2) {
    if (typeof e2 == "string") {
      if (e2.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e2.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e2) {
    return ze2(this, e2);
  }
};
var Hr = class {
  constructor(e2) {
    this.decoders = e2;
  }
  or(e2) {
    return ze2(this, e2);
  }
  decode(e2) {
    const n4 = e2[0], r3 = this.decoders[n4];
    if (r3) return r3.decode(e2);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e2)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
var ze2 = (t, e2) => new Hr({ ...t.decoders || { [t.prefix]: t }, ...e2.decoders || { [e2.prefix]: e2 } });
var zr = class {
  constructor(e2, n4, r3, o5) {
    this.name = e2, this.prefix = n4, this.baseEncode = r3, this.baseDecode = o5, this.encoder = new Lr(e2, n4, r3), this.decoder = new Or(e2, n4, o5);
  }
  encode(e2) {
    return this.encoder.encode(e2);
  }
  decode(e2) {
    return this.decoder.decode(e2);
  }
};
var Bt = ({ name: t, prefix: e2, encode: n4, decode: r3 }) => new zr(t, e2, n4, r3);
var ht = ({ prefix: t, name: e2, alphabet: n4 }) => {
  const { encode: r3, decode: o5 } = Tr(n4, e2);
  return Bt({ prefix: t, name: e2, encode: r3, decode: (s2) => He(o5(s2)) });
};
var Mr = (t, e2, n4, r3) => {
  const o5 = {};
  for (let c5 = 0; c5 < e2.length; ++c5) o5[e2[c5]] = c5;
  let s2 = t.length;
  for (; t[s2 - 1] === "="; ) --s2;
  const a3 = new Uint8Array(s2 * n4 / 8 | 0);
  let u3 = 0, i3 = 0, D5 = 0;
  for (let c5 = 0; c5 < s2; ++c5) {
    const l5 = o5[t[c5]];
    if (l5 === void 0) throw new SyntaxError(`Non-${r3} character`);
    i3 = i3 << n4 | l5, u3 += n4, u3 >= 8 && (u3 -= 8, a3[D5++] = 255 & i3 >> u3);
  }
  if (u3 >= n4 || 255 & i3 << 8 - u3) throw new SyntaxError("Unexpected end of data");
  return a3;
};
var qr = (t, e2, n4) => {
  const r3 = e2[e2.length - 1] === "=", o5 = (1 << n4) - 1;
  let s2 = "", a3 = 0, u3 = 0;
  for (let i3 = 0; i3 < t.length; ++i3) for (u3 = u3 << 8 | t[i3], a3 += 8; a3 > n4; ) a3 -= n4, s2 += e2[o5 & u3 >> a3];
  if (a3 && (s2 += e2[o5 & u3 << n4 - a3]), r3) for (; s2.length * n4 & 7; ) s2 += "=";
  return s2;
};
var k3 = ({ name: t, prefix: e2, bitsPerChar: n4, alphabet: r3 }) => Bt({ prefix: e2, name: t, encode(o5) {
  return qr(o5, r3, n4);
}, decode(o5) {
  return Mr(o5, r3, n4, t);
} });
var $r = Bt({ prefix: "\0", name: "identity", encode: (t) => Nr(t), decode: (t) => Fr(t) });
var kr = Object.freeze({ __proto__: null, identity: $r });
var Rr = k3({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var jr = Object.freeze({ __proto__: null, base2: Rr });
var Zr = k3({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Gr = Object.freeze({ __proto__: null, base8: Zr });
var Vr = ht({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Yr = Object.freeze({ __proto__: null, base10: Vr });
var Jr = k3({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
var Kr = k3({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Wr = Object.freeze({ __proto__: null, base16: Jr, base16upper: Kr });
var Xr = k3({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
var Pr = k3({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
var Qr = k3({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
var to = k3({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
var eo = k3({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
var no = k3({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
var ro = k3({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
var oo = k3({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
var so = k3({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var io = Object.freeze({ __proto__: null, base32: Xr, base32upper: Pr, base32pad: Qr, base32padupper: to, base32hex: eo, base32hexupper: no, base32hexpad: ro, base32hexpadupper: oo, base32z: so });
var uo = ht({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
var co = ht({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var ao = Object.freeze({ __proto__: null, base36: uo, base36upper: co });
var fo = ht({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
var Do = ht({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var ho = Object.freeze({ __proto__: null, base58btc: fo, base58flickr: Do });
var lo = k3({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
var bo = k3({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
var po = k3({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
var wo = k3({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Eo = Object.freeze({ __proto__: null, base64: lo, base64pad: bo, base64url: po, base64urlpad: wo });
var Me2 = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var go = Me2.reduce((t, e2, n4) => (t[n4] = e2, t), []);
var yo = Me2.reduce((t, e2, n4) => (t[e2.codePointAt(0)] = n4, t), []);
function xo(t) {
  return t.reduce((e2, n4) => (e2 += go[n4], e2), "");
}
function Bo(t) {
  const e2 = [];
  for (const n4 of t) {
    const r3 = yo[n4.codePointAt(0)];
    if (r3 === void 0) throw new Error(`Non-base256emoji character: ${n4}`);
    e2.push(r3);
  }
  return new Uint8Array(e2);
}
var Co = Bt({ prefix: "\u{1F680}", name: "base256emoji", encode: xo, decode: Bo });
var Ao = Object.freeze({ __proto__: null, base256emoji: Co });
var mo = $e2;
var qe = 128;
var _o = 127;
var So = ~_o;
var vo = Math.pow(2, 31);
function $e2(t, e2, n4) {
  e2 = e2 || [], n4 = n4 || 0;
  for (var r3 = n4; t >= vo; ) e2[n4++] = t & 255 | qe, t /= 128;
  for (; t & So; ) e2[n4++] = t & 255 | qe, t >>>= 7;
  return e2[n4] = t | 0, $e2.bytes = n4 - r3 + 1, e2;
}
var Io = Pt;
var Uo = 128;
var ke2 = 127;
function Pt(t, r3) {
  var n4 = 0, r3 = r3 || 0, o5 = 0, s2 = r3, a3, u3 = t.length;
  do {
    if (s2 >= u3) throw Pt.bytes = 0, new RangeError("Could not decode varint");
    a3 = t[s2++], n4 += o5 < 28 ? (a3 & ke2) << o5 : (a3 & ke2) * Math.pow(2, o5), o5 += 7;
  } while (a3 >= Uo);
  return Pt.bytes = s2 - r3, n4;
}
var To = Math.pow(2, 7);
var Fo = Math.pow(2, 14);
var No = Math.pow(2, 21);
var Lo = Math.pow(2, 28);
var Oo = Math.pow(2, 35);
var Ho = Math.pow(2, 42);
var zo = Math.pow(2, 49);
var Mo = Math.pow(2, 56);
var qo = Math.pow(2, 63);
var $o = function(t) {
  return t < To ? 1 : t < Fo ? 2 : t < No ? 3 : t < Lo ? 4 : t < Oo ? 5 : t < Ho ? 6 : t < zo ? 7 : t < Mo ? 8 : t < qo ? 9 : 10;
};
var ko = { encode: mo, decode: Io, encodingLength: $o };
var Re2 = ko;
var je2 = (t, e2, n4 = 0) => (Re2.encode(t, e2, n4), e2);
var Ze = (t) => Re2.encodingLength(t);
var Qt = (t, e2) => {
  const n4 = e2.byteLength, r3 = Ze(t), o5 = r3 + Ze(n4), s2 = new Uint8Array(o5 + n4);
  return je2(t, s2, 0), je2(n4, s2, r3), s2.set(e2, o5), new Ro(t, n4, e2, s2);
};
var Ro = class {
  constructor(e2, n4, r3, o5) {
    this.code = e2, this.size = n4, this.digest = r3, this.bytes = o5;
  }
};
var Ge2 = ({ name: t, code: e2, encode: n4 }) => new jo(t, e2, n4);
var jo = class {
  constructor(e2, n4, r3) {
    this.name = e2, this.code = n4, this.encode = r3;
  }
  digest(e2) {
    if (e2 instanceof Uint8Array) {
      const n4 = this.encode(e2);
      return n4 instanceof Uint8Array ? Qt(this.code, n4) : n4.then((r3) => Qt(this.code, r3));
    } else throw Error("Unknown type, must be binary type");
  }
};
var Ve2 = (t) => async (e2) => new Uint8Array(await crypto.subtle.digest(t, e2));
var Zo = Ge2({ name: "sha2-256", code: 18, encode: Ve2("SHA-256") });
var Go = Ge2({ name: "sha2-512", code: 19, encode: Ve2("SHA-512") });
var Vo = Object.freeze({ __proto__: null, sha256: Zo, sha512: Go });
var Ye = 0;
var Yo = "identity";
var Je = He;
var Jo = (t) => Qt(Ye, Je(t));
var Ko = { code: Ye, name: Yo, encode: Je, digest: Jo };
var Wo = Object.freeze({ __proto__: null, identity: Ko });
new TextEncoder(), new TextDecoder();
var Ke = { ...kr, ...jr, ...Gr, ...Yr, ...Wr, ...io, ...ao, ...ho, ...Eo, ...Ao };
({ ...Vo, ...Wo });
function We(t, e2, n4, r3) {
  return { name: t, prefix: e2, encoder: { name: t, prefix: e2, encode: n4 }, decoder: { decode: r3 } };
}
var Xe = We("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1)));
var te2 = We("ascii", "a", (t) => {
  let e2 = "a";
  for (let n4 = 0; n4 < t.length; n4++) e2 += String.fromCharCode(t[n4]);
  return e2;
}, (t) => {
  t = t.substring(1);
  const e2 = Le2(t.length);
  for (let n4 = 0; n4 < t.length; n4++) e2[n4] = t.charCodeAt(n4);
  return e2;
});
var Pe2 = { utf8: Xe, "utf-8": Xe, hex: Ke.base16, latin1: te2, ascii: te2, binary: te2, ...Ke };
function ct(t, e2 = "utf8") {
  const n4 = Pe2[e2];
  if (!n4) throw new Error(`Unsupported encoding "${e2}"`);
  return (e2 === "utf8" || e2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("utf8") : n4.encoder.encode(t).substring(1);
}
function rt(t, e2 = "utf8") {
  const n4 = Pe2[e2];
  if (!n4) throw new Error(`Unsupported encoding "${e2}"`);
  return (e2 === "utf8" || e2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Xt(globalThis.Buffer.from(t, "utf-8")) : n4.decoder.decode(`${n4.prefix}${t}`);
}
function lt(t) {
  return safeJsonParse(ct(rt(t, Dt), Gt));
}
function bt(t) {
  return ct(rt(safeJsonStringify(t), Gt), Dt);
}
function Qe(t) {
  const e2 = rt(Wt, dt), n4 = Kt + ct(Oe2([e2, t]), dt);
  return [Yt, Jt, n4].join(Vt);
}
function en(t) {
  return ct(t, Dt);
}
function nn(t) {
  return rt(t, Dt);
}
function rn(t) {
  return rt([bt(t.header), bt(t.payload)].join(ut), xt);
}
function on(t) {
  return [bt(t.header), bt(t.payload), en(t.signature)].join(ut);
}
function sn(t) {
  const e2 = t.split(ut), n4 = lt(e2[0]), r3 = lt(e2[1]), o5 = nn(e2[2]), s2 = rt(e2.slice(0, 2).join(ut), xt);
  return { header: n4, payload: r3, signature: o5, data: s2 };
}
function Po(t = he2(Ne2)) {
  const e2 = Rt.getPublicKey(t);
  return { secretKey: Oe2([t, e2]), publicKey: e2 };
}
async function Qo(t, e2, n4, r3, o5 = (0, import_time2.fromMiliseconds)(Date.now())) {
  const s2 = { alg: jt, typ: Zt }, a3 = Qe(r3.publicKey), u3 = o5 + n4, i3 = { iss: a3, sub: t, aud: e2, iat: o5, exp: u3 }, D5 = rn({ header: s2, payload: i3 }), c5 = Rt.sign(D5, r3.secretKey.slice(0, 32));
  return on({ header: s2, payload: i3, signature: c5 });
}

// node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});

// node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j6 = 0; j6 < BASE_MAP.length; j6++) {
    BASE_MAP[j6] = 255;
  }
  for (var i3 = 0; i3 < ALPHABET.length; i3++) {
    var x8 = ALPHABET.charAt(i3);
    var xc = x8.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x8 + " is ambiguous");
    }
    BASE_MAP[xc] = i3;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode6(source) {
    if (source instanceof Uint8Array) ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size3 = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size3);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i4 = 0;
      for (var it1 = size3 - 1; (carry !== 0 || i4 < length2) && it1 !== -1; it1--, i4++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i4;
      pbegin++;
    }
    var it22 = size3 - length2;
    while (it22 !== size3 && b58[it22] === 0) {
      it22++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it22 < size3; ++it22) {
      str += ALPHABET.charAt(b58[it22]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size3 = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size3);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i4 = 0;
      for (var it32 = size3 - 1; (carry !== 0 || i4 < length2) && it32 !== -1; it32--, i4++) {
        carry += BASE * b256[it32] >>> 0;
        b256[it32] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i4;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it42 = size3 - length2;
    while (it42 !== size3 && b256[it42] === 0) {
      it42++;
    }
    var vch = new Uint8Array(zeroes + (size3 - it42));
    var j7 = zeroes;
    while (it42 !== size3) {
      vch[j7++] = b256[it42++];
    }
    return vch;
  }
  function decode7(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode6,
    decodeUnsafe,
    decode: decode7
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/multiformats/esm/src/bytes.js
var empty = new Uint8Array(0);
var equals = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
var coerce = (o5) => {
  if (o5 instanceof Uint8Array && o5.constructor.name === "Uint8Array")
    return o5;
  if (o5 instanceof ArrayBuffer)
    return new Uint8Array(o5);
  if (ArrayBuffer.isView(o5)) {
    return new Uint8Array(o5.buffer, o5.byteOffset, o5.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString = (str) => new TextEncoder().encode(str);
var toString = (b5) => new TextDecoder().decode(b5);

// node_modules/multiformats/esm/src/bases/base.js
var Encoder = class {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or2(this, decoder);
  }
};
var ComposedDecoder = class {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder) {
    return or2(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or2 = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
var Codec = class {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from = ({ name: name2, prefix, encode: encode6, decode: decode7 }) => new Codec(name2, prefix, encode6, decode7);
var baseX = ({ prefix, name: name2, alphabet: alphabet3 }) => {
  const { encode: encode6, decode: decode7 } = base_x_default(alphabet3, name2);
  return from({
    prefix,
    name: name2,
    encode: encode6,
    decode: (text) => coerce(decode7(text))
  });
};
var decode = (string2, alphabet3, bitsPerChar, name2) => {
  const codes = {};
  for (let i3 = 0; i3 < alphabet3.length; ++i3) {
    codes[alphabet3[i3]] = i3;
  }
  let end = string2.length;
  while (string2[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i3 = 0; i3 < end; ++i3) {
    const value = codes[string2[i3]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode = (data, alphabet3, bitsPerChar) => {
  const pad3 = alphabet3[alphabet3.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i3 = 0; i3 < data.length; ++i3) {
    buffer = buffer << 8 | data[i3];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet3[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet3[mask & buffer << bitsPerChar - bits];
  }
  if (pad3) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet3 }) => {
  return from({
    prefix,
    name: name2,
    encode(input) {
      return encode(input, alphabet3, bitsPerChar);
    },
    decode(input) {
      return decode(input, alphabet3, bitsPerChar, name2);
    }
  });
};

// node_modules/multiformats/esm/src/bases/identity.js
var identity = from({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString(buf),
  decode: (str) => fromString(str)
});

// node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars = alphabet.reduce((p5, c5, i3) => {
  p5[i3] = c5;
  return p5;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p5, c5, i3) => {
  p5[c5.codePointAt(0)] = i3;
  return p5;
}, []);
function encode2(data) {
  return data.reduce((p5, c5) => {
    p5 += alphabetBytesToChars[c5];
    return p5;
  }, "");
}
function decode2(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode2,
  decode: decode2
});

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});

// node_modules/multiformats/esm/vendor/varint.js
var encode_1 = encode3;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode3(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode3.bytes = offset - oldOffset + 1;
  return out;
}
var decode3 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b5, l5 = buf.length;
  do {
    if (counter >= l5) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b5 = buf[counter++];
    res += shift < 28 ? (b5 & REST$1) << shift : (b5 & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b5 >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N22 = Math.pow(2, 14);
var N32 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N22 ? 2 : value < N32 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode3,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/multiformats/esm/src/varint.js
var decode4 = (data, offset = 0) => {
  const code2 = varint_default.decode(data, offset);
  return [
    code2,
    varint_default.decode.bytes
  ];
};
var encodeTo = (int, target, offset = 0) => {
  varint_default.encode(int, target, offset);
  return target;
};
var encodingLength = (int) => {
  return varint_default.encodingLength(int);
};

// node_modules/multiformats/esm/src/hashes/digest.js
var create = (code2, digest2) => {
  const size3 = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size3);
  const bytes = new Uint8Array(digestOffset + size3);
  encodeTo(code2, bytes, 0);
  encodeTo(size3, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest(code2, size3, digest2, bytes);
};
var decode5 = (multihash) => {
  const bytes = coerce(multihash);
  const [code2, sizeOffset] = decode4(bytes);
  const [size3, digestOffset] = decode4(bytes.subarray(sizeOffset));
  const digest2 = bytes.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size3) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size3, digest2, bytes);
};
var equals2 = (a3, b5) => {
  if (a3 === b5) {
    return true;
  } else {
    return a3.code === b5.code && a3.size === b5.size && equals(a3.bytes, b5.bytes);
  }
};
var Digest = class {
  constructor(code2, size3, digest2, bytes) {
    this.code = code2;
    this.size = size3;
    this.digest = digest2;
    this.bytes = bytes;
  }
};

// node_modules/multiformats/esm/src/hashes/hasher.js
var from2 = ({ name: name2, code: code2, encode: encode6 }) => new Hasher(name2, code2, encode6);
var Hasher = class {
  constructor(name2, code2, encode6) {
    this.name = name2;
    this.code = code2;
    this.encode = encode6;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
var sha256 = from2({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from2({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code = 0;
var name = "identity";
var encode4 = coerce;
var digest = (input) => create(code, encode4(input));
var identity2 = {
  code,
  name,
  encode: encode4,
  digest
};

// node_modules/multiformats/esm/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/multiformats/esm/src/cid.js
var CID = class _CID {
  constructor(version3, code2, multihash, bytes) {
    this.code = code2;
    this.version = version3;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly,
      version: readonly,
      multihash: readonly,
      bytes: readonly,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create(code2, digest2);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version3, _baseCache } = this;
    switch (version3) {
      case 0:
        return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes, _baseCache, base3 || base32.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof _CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version3, code: code2, multihash, bytes } = value;
      return new _CID(version3, code2, multihash, bytes || encodeCID(version3, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version3, multihash, code: code2 } = value;
      const digest2 = decode5(multihash);
      return _CID.create(version3, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version3, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version3) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new _CID(version3, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version3, code2, digest2.bytes);
        return new _CID(version3, code2, digest2, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return _CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code2, digest2) {
    return _CID.create(1, code2, digest2);
  }
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest2) : _CID.createV1(specs.codec, digest2);
    return [
      cid,
      bytes.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i3, length2] = decode4(initialBytes.subarray(offset));
      offset += length2;
      return i3;
    };
    let version3 = next();
    let codec = DAG_PB_CODE;
    if (version3 === 18) {
      version3 = 0;
      offset = 0;
    } else if (version3 === 1) {
      codec = next();
    }
    if (version3 !== 0 && version3 !== 1) {
      throw new RangeError(`Invalid CID version ${version3}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size3 = offset + digestSize;
    const multihashSize = size3 - prefixSize;
    return {
      version: version3,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size: size3
    };
  }
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes(source, base3);
    const cid = _CID.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder = base3 || base32;
      return [
        base32.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
var toStringV0 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version3, code2, multihash) => {
  const codeOffset = encodingLength(version3);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version3, bytes, 0);
  encodeTo(code2, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
var cidSymbol = /* @__PURE__ */ Symbol.for("@ipld/js-cid/CID");
var readonly = {
  writable: false,
  configurable: false,
  enumerable: true
};
var hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
var version = "0.0.0-dev";
var deprecate = (range, message) => {
  if (range.test(version)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

// node_modules/multiformats/esm/src/basics.js
var bases = {
  ...identity_exports,
  ...base2_exports,
  ...base8_exports,
  ...base10_exports,
  ...base16_exports,
  ...base32_exports,
  ...base36_exports,
  ...base58_exports,
  ...base64_exports,
  ...base256emoji_exports
};
var hashes = {
  ...sha2_browser_exports,
  ...identity_exports2
};

// node_modules/uint8arrays/esm/src/util/as-uint8array.js
function asUint8Array(buf) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  return buf;
}

// node_modules/uint8arrays/esm/src/alloc.js
function allocUnsafe(size3 = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return asUint8Array(globalThis.Buffer.allocUnsafe(size3));
  }
  return new Uint8Array(size3);
}

// node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode6, decode7) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode6
    },
    decoder: { decode: decode7 }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder2 = new TextEncoder();
  return encoder2.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i3 = 0; i3 < buf.length; i3++) {
    string2 += String.fromCharCode(buf[i3]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i3 = 0; i3 < str.length; i3++) {
    buf[i3] = str.charCodeAt(i3);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// node_modules/uint8arrays/esm/src/from-string.js
function fromString2(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array(globalThis.Buffer.from(string2, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}

// node_modules/detect-browser/es/index.js
var __spreadArray = function(to3, from8, pack) {
  if (pack || arguments.length === 2) for (var i3 = 0, l5 = from8.length, ar3; i3 < l5; i3++) {
    if (ar3 || !(i3 in from8)) {
      if (!ar3) ar3 = Array.prototype.slice.call(from8, 0, i3);
      ar3[i3] = from8[i3];
    }
  }
  return to3.concat(ar3 || Array.prototype.slice.call(from8));
};
var BrowserInfo = (
  /** @class */
  /* @__PURE__ */ (function() {
    function BrowserInfo2(name2, version3, os) {
      this.name = name2;
      this.version = version3;
      this.os = os;
      this.type = "browser";
    }
    return BrowserInfo2;
  })()
);
var NodeInfo = (
  /** @class */
  /* @__PURE__ */ (function() {
    function NodeInfo2(version3) {
      this.version = version3;
      this.type = "node";
      this.name = "node";
      this.os = process.platform;
    }
    return NodeInfo2;
  })()
);
var SearchBotDeviceInfo = (
  /** @class */
  /* @__PURE__ */ (function() {
    function SearchBotDeviceInfo2(name2, version3, os, bot) {
      this.name = name2;
      this.version = version3;
      this.os = os;
      this.bot = bot;
      this.type = "bot-device";
    }
    return SearchBotDeviceInfo2;
  })()
);
var BotInfo = (
  /** @class */
  /* @__PURE__ */ (function() {
    function BotInfo2() {
      this.type = "bot";
      this.bot = true;
      this.name = "bot";
      this.version = null;
      this.os = null;
    }
    return BotInfo2;
  })()
);
var ReactNativeInfo = (
  /** @class */
  /* @__PURE__ */ (function() {
    function ReactNativeInfo2() {
      this.type = "react-native";
      this.name = "react-native";
      this.version = null;
      this.os = null;
    }
    return ReactNativeInfo2;
  })()
);
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX]
];
var operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent(navigator.userAgent);
  }
  return getNodeVersion();
}
function matchUserAgent(ua) {
  return ua !== "" && userAgentRules.reduce(function(matched, _a) {
    var browser = _a[0], regex = _a[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua);
    return !!uaMatch && [browser, uaMatch];
  }, false);
}
function parseUserAgent(ua) {
  var matchedRule = matchUserAgent(ua);
  if (!matchedRule) {
    return null;
  }
  var name2 = matchedRule[0], match = matchedRule[1];
  if (name2 === "searchbot") {
    return new BotInfo();
  }
  var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    }
  } else {
    versionParts = [];
  }
  var version3 = versionParts.join(".");
  var os = detectOS(ua);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name2, version3, os, searchBotMatch[1]);
  }
  return new BrowserInfo(name2, version3, os);
}
function detectOS(ua) {
  for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
    var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
    var match = regex.exec(ua);
    if (match) {
      return os;
    }
  }
  return null;
}
function getNodeVersion() {
  var isNode2 = typeof process !== "undefined" && process.version;
  return isNode2 ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
  var output = [];
  for (var ii = 0; ii < count; ii++) {
    output.push("0");
  }
  return output;
}

// node_modules/@walletconnect/utils/dist/index.js
var import_time3 = __toESM(require_cjs(), 1);
var import_window_getters = __toESM(require_cjs2(), 1);
var import_window_metadata = __toESM(require_cjs3(), 1);

// node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n4, le5 = false) {
  if (le5)
    return { h: Number(n4 & U32_MASK64), l: Number(n4 >> _32n & U32_MASK64) };
  return { h: Number(n4 >> _32n & U32_MASK64) | 0, l: Number(n4 & U32_MASK64) | 0 };
}
function split(lst, le5 = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i3 = 0; i3 < len; i3++) {
    const { h: h4, l: l5 } = fromBig(lst[i3], le5);
    [Ah[i3], Al[i3]] = [h4, l5];
  }
  return [Ah, Al];
}
var shrSH = (h4, _l, s2) => h4 >>> s2;
var shrSL = (h4, l5, s2) => h4 << 32 - s2 | l5 >>> s2;
var rotrSH = (h4, l5, s2) => h4 >>> s2 | l5 << 32 - s2;
var rotrSL = (h4, l5, s2) => h4 << 32 - s2 | l5 >>> s2;
var rotrBH = (h4, l5, s2) => h4 << 64 - s2 | l5 >>> s2 - 32;
var rotrBL = (h4, l5, s2) => h4 >>> s2 - 32 | l5 << 64 - s2;
var rotr32H = (_h, l5) => l5;
var rotr32L = (h4, _l) => h4;
var rotlSH = (h4, l5, s2) => h4 << s2 | l5 >>> 32 - s2;
var rotlSL = (h4, l5, s2) => l5 << s2 | h4 >>> 32 - s2;
var rotlBH = (h4, l5, s2) => l5 << s2 - 32 | h4 >>> 64 - s2;
var rotlBL = (h4, l5, s2) => h4 << s2 - 32 | l5 >>> 64 - s2;
function add(Ah, Al, Bh, Bl) {
  const l5 = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l5 / 2 ** 32 | 0) | 0, l: l5 | 0 };
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;

// node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/crypto.js
var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

// node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/utils.js
function isBytes(a3) {
  return a3 instanceof Uint8Array || ArrayBuffer.isView(a3) && a3.constructor.name === "Uint8Array";
}
function anumber(n4) {
  if (!Number.isSafeInteger(n4) || n4 < 0)
    throw new Error("positive integer expected, got " + n4);
}
function abytes(b5, ...lengths) {
  if (!isBytes(b5))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b5.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b5.length);
}
function ahash(h4) {
  if (typeof h4 !== "function" || typeof h4.create !== "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  anumber(h4.outputLen);
  anumber(h4.blockLen);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i3 = 0; i3 < arrays.length; i3++) {
    arrays[i3].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
var swap8IfBE = isLE ? (n4) => n4 : (n4) => byteSwap(n4);
function byteSwap32(arr) {
  for (let i3 = 0; i3 < arr.length; i3++) {
    arr[i3] = byteSwap(arr[i3]);
  }
  return arr;
}
var swap32IfBE = isLE ? (u3) => u3 : byteSwap32;
var hasHexBuiltin = /* @__PURE__ */ (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_3, i3) => i3.toString(16).padStart(2, "0"));
function bytesToHex(bytes) {
  abytes(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex = "";
  for (let i3 = 0; i3 < bytes.length; i3++) {
    hex += hexes[bytes[i3]];
  }
  return hex;
}
var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9)
    return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F)
    return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f)
    return ch - (asciis.a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin)
    return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n22 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n22 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n22;
  }
  return array;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i3 = 0; i3 < arrays.length; i3++) {
    const a3 = arrays[i3];
    abytes(a3);
    sum += a3.length;
  }
  const res = new Uint8Array(sum);
  for (let i3 = 0, pad3 = 0; i3 < arrays.length; i3++) {
    const a3 = arrays[i3];
    res.set(a3, pad3);
    pad3 += a3.length;
  }
  return res;
}
var Hash = class {
};
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function createOptHasher(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto2 && typeof crypto2.getRandomValues === "function") {
    return crypto2.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto2 && typeof crypto2.randomBytes === "function") {
    return Uint8Array.from(crypto2.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}

// node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/sha3.js
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var _7n = BigInt(7);
var _256n = BigInt(256);
var _0x71n = BigInt(113);
var SHA3_PI = [];
var SHA3_ROTL = [];
var _SHA3_IOTA = [];
for (let round = 0, R4 = _1n, x8 = 1, y7 = 0; round < 24; round++) {
  [x8, y7] = [y7, (2 * x8 + 3 * y7) % 5];
  SHA3_PI.push(2 * (5 * y7 + x8));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j6 = 0; j6 < 7; j6++) {
    R4 = (R4 << _1n ^ (R4 >> _7n) * _0x71n) % _256n;
    if (R4 & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j6)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
var IOTAS = split(_SHA3_IOTA, true);
var SHA3_IOTA_H = IOTAS[0];
var SHA3_IOTA_L = IOTAS[1];
var rotlH = (h4, l5, s2) => s2 > 32 ? rotlBH(h4, l5, s2) : rotlSH(h4, l5, s2);
var rotlL = (h4, l5, s2) => s2 > 32 ? rotlBL(h4, l5, s2) : rotlSL(h4, l5, s2);
function keccakP(s2, rounds = 24) {
  const B4 = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x8 = 0; x8 < 10; x8++)
      B4[x8] = s2[x8] ^ s2[x8 + 10] ^ s2[x8 + 20] ^ s2[x8 + 30] ^ s2[x8 + 40];
    for (let x8 = 0; x8 < 10; x8 += 2) {
      const idx1 = (x8 + 8) % 10;
      const idx0 = (x8 + 2) % 10;
      const B0 = B4[idx0];
      const B1 = B4[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B4[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B4[idx1 + 1];
      for (let y7 = 0; y7 < 50; y7 += 10) {
        s2[x8 + y7] ^= Th;
        s2[x8 + y7 + 1] ^= Tl;
      }
    }
    let curH = s2[2];
    let curL = s2[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s2[PI];
      curL = s2[PI + 1];
      s2[PI] = Th;
      s2[PI + 1] = Tl;
    }
    for (let y7 = 0; y7 < 50; y7 += 10) {
      for (let x8 = 0; x8 < 10; x8++)
        B4[x8] = s2[y7 + x8];
      for (let x8 = 0; x8 < 10; x8++)
        s2[y7 + x8] ^= ~B4[(x8 + 2) % 10] & B4[(x8 + 4) % 10];
    }
    s2[0] ^= SHA3_IOTA_H[round];
    s2[1] ^= SHA3_IOTA_L[round];
  }
  clean(B4);
}
var Keccak = class _Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    this.enableXOF = false;
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    anumber(outputLen);
    if (!(0 < blockLen && blockLen < 200))
      throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    swap32IfBE(this.state32);
    keccakP(this.state32, this.rounds);
    swap32IfBE(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { blockLen, state } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i3 = 0; i3 < take; i3++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    clean(this.state);
  }
  _cloneInto(to3) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to3 || (to3 = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to3.state32.set(this.state32);
    to3.pos = this.pos;
    to3.posOut = this.posOut;
    to3.finished = this.finished;
    to3.rounds = rounds;
    to3.suffix = suffix;
    to3.outputLen = outputLen;
    to3.enableXOF = enableXOF;
    to3.destroyed = this.destroyed;
    return to3;
  }
};
var gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
var keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/version.js
var version2 = "0.1.1";

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/internal/errors.js
function getVersion() {
  return version2;
}

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Errors.js
var BaseError = class _BaseError extends Error {
  constructor(shortMessage, options = {}) {
    const details = (() => {
      if (options.cause instanceof _BaseError) {
        if (options.cause.details)
          return options.cause.details;
        if (options.cause.shortMessage)
          return options.cause.shortMessage;
      }
      if (options.cause && "details" in options.cause && typeof options.cause.details === "string")
        return options.cause.details;
      if (options.cause?.message)
        return options.cause.message;
      return options.details;
    })();
    const docsPath = (() => {
      if (options.cause instanceof _BaseError)
        return options.cause.docsPath || options.docsPath;
      return options.docsPath;
    })();
    const docsBaseUrl = "https://oxlib.sh";
    const docs = `${docsBaseUrl}${docsPath ?? ""}`;
    const message = [
      shortMessage || "An error occurred.",
      ...options.metaMessages ? ["", ...options.metaMessages] : [],
      ...details || docsPath ? [
        "",
        details ? `Details: ${details}` : void 0,
        docsPath ? `See: ${docs}` : void 0
      ] : []
    ].filter((x8) => typeof x8 === "string").join("\n");
    super(message, options.cause ? { cause: options.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: `ox@${getVersion()}`
    });
    this.cause = options.cause;
    this.details = details;
    this.docs = docs;
    this.docsPath = docsPath;
    this.shortMessage = shortMessage;
  }
  walk(fn) {
    return walk(this, fn);
  }
};
function walk(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk(err.cause, fn);
  return fn ? null : err;
}

// node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE3) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE3);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h4 = isLE3 ? 4 : 0;
  const l5 = isLE3 ? 0 : 4;
  view.setUint32(byteOffset + h4, wh, isLE3);
  view.setUint32(byteOffset + l5, wl, isLE3);
}
function Chi(a3, b5, c5) {
  return a3 & b5 ^ ~a3 & c5;
}
function Maj(a3, b5, c5) {
  return a3 & b5 ^ a3 & c5 ^ b5 & c5;
}
var HashMD = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE3) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE3;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE3 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i3 = pos; i3 < blockLen; i3++)
      buffer[i3] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE3);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i3 = 0; i3 < outLen; i3++)
      oview.setUint32(4 * i3, state[i3], isLE3);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to3) {
    to3 || (to3 = new this.constructor());
    to3.set(...this.get());
    const { blockLen, buffer, length: length2, finished, destroyed, pos } = this;
    to3.destroyed = destroyed;
    to3.finished = finished;
    to3.length = length2;
    to3.pos = pos;
    if (length2 % blockLen)
      to3.buffer.set(buffer);
    return to3;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var SHA384_IV = /* @__PURE__ */ Uint32Array.from([
  3418070365,
  3238371032,
  1654270250,
  914150663,
  2438529370,
  812702999,
  355462360,
  4144912697,
  1731405415,
  4290775857,
  2394180231,
  1750603025,
  3675008525,
  1694076839,
  1203062813,
  3204075428
]);
var SHA512_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  4089235720,
  3144134277,
  2227873595,
  1013904242,
  4271175723,
  2773480762,
  1595750129,
  1359893119,
  2917565137,
  2600822924,
  725511199,
  528734635,
  4215389547,
  1541459225,
  327033209
]);

// node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/sha2.js
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA256 = class extends HashMD {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A: A4, B: B4, C: C4, D: D5, E: E6, F: F4, G: G5, H: H6 } = this;
    return [A4, B4, C4, D5, E6, F4, G5, H6];
  }
  // prettier-ignore
  set(A4, B4, C4, D5, E6, F4, G5, H6) {
    this.A = A4 | 0;
    this.B = B4 | 0;
    this.C = C4 | 0;
    this.D = D5 | 0;
    this.E = E6 | 0;
    this.F = F4 | 0;
    this.G = G5 | 0;
    this.H = H6 | 0;
  }
  process(view, offset) {
    for (let i3 = 0; i3 < 16; i3++, offset += 4)
      SHA256_W[i3] = view.getUint32(offset, false);
    for (let i3 = 16; i3 < 64; i3++) {
      const W15 = SHA256_W[i3 - 15];
      const W22 = SHA256_W[i3 - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W22, 17) ^ rotr(W22, 19) ^ W22 >>> 10;
      SHA256_W[i3] = s1 + SHA256_W[i3 - 7] + s0 + SHA256_W[i3 - 16] | 0;
    }
    let { A: A4, B: B4, C: C4, D: D5, E: E6, F: F4, G: G5, H: H6 } = this;
    for (let i3 = 0; i3 < 64; i3++) {
      const sigma1 = rotr(E6, 6) ^ rotr(E6, 11) ^ rotr(E6, 25);
      const T1 = H6 + sigma1 + Chi(E6, F4, G5) + SHA256_K[i3] + SHA256_W[i3] | 0;
      const sigma0 = rotr(A4, 2) ^ rotr(A4, 13) ^ rotr(A4, 22);
      const T22 = sigma0 + Maj(A4, B4, C4) | 0;
      H6 = G5;
      G5 = F4;
      F4 = E6;
      E6 = D5 + T1 | 0;
      D5 = C4;
      C4 = B4;
      B4 = A4;
      A4 = T1 + T22 | 0;
    }
    A4 = A4 + this.A | 0;
    B4 = B4 + this.B | 0;
    C4 = C4 + this.C | 0;
    D5 = D5 + this.D | 0;
    E6 = E6 + this.E | 0;
    F4 = F4 + this.F | 0;
    G5 = G5 + this.G | 0;
    H6 = H6 + this.H | 0;
    this.set(A4, B4, C4, D5, E6, F4, G5, H6);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var K512 = /* @__PURE__ */ (() => split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n4) => BigInt(n4))))();
var SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
var SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
var SHA512 = class extends HashMD {
  constructor(outputLen = 64) {
    super(128, outputLen, 16, false);
    this.Ah = SHA512_IV[0] | 0;
    this.Al = SHA512_IV[1] | 0;
    this.Bh = SHA512_IV[2] | 0;
    this.Bl = SHA512_IV[3] | 0;
    this.Ch = SHA512_IV[4] | 0;
    this.Cl = SHA512_IV[5] | 0;
    this.Dh = SHA512_IV[6] | 0;
    this.Dl = SHA512_IV[7] | 0;
    this.Eh = SHA512_IV[8] | 0;
    this.El = SHA512_IV[9] | 0;
    this.Fh = SHA512_IV[10] | 0;
    this.Fl = SHA512_IV[11] | 0;
    this.Gh = SHA512_IV[12] | 0;
    this.Gl = SHA512_IV[13] | 0;
    this.Hh = SHA512_IV[14] | 0;
    this.Hl = SHA512_IV[15] | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset) {
    for (let i3 = 0; i3 < 16; i3++, offset += 4) {
      SHA512_W_H[i3] = view.getUint32(offset);
      SHA512_W_L[i3] = view.getUint32(offset += 4);
    }
    for (let i3 = 16; i3 < 80; i3++) {
      const W15h = SHA512_W_H[i3 - 15] | 0;
      const W15l = SHA512_W_L[i3 - 15] | 0;
      const s0h = rotrSH(W15h, W15l, 1) ^ rotrSH(W15h, W15l, 8) ^ shrSH(W15h, W15l, 7);
      const s0l = rotrSL(W15h, W15l, 1) ^ rotrSL(W15h, W15l, 8) ^ shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i3 - 2] | 0;
      const W2l = SHA512_W_L[i3 - 2] | 0;
      const s1h = rotrSH(W2h, W2l, 19) ^ rotrBH(W2h, W2l, 61) ^ shrSH(W2h, W2l, 6);
      const s1l = rotrSL(W2h, W2l, 19) ^ rotrBL(W2h, W2l, 61) ^ shrSL(W2h, W2l, 6);
      const SUMl = add4L(s0l, s1l, SHA512_W_L[i3 - 7], SHA512_W_L[i3 - 16]);
      const SUMh = add4H(SUMl, s0h, s1h, SHA512_W_H[i3 - 7], SHA512_W_H[i3 - 16]);
      SHA512_W_H[i3] = SUMh | 0;
      SHA512_W_L[i3] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i3 = 0; i3 < 80; i3++) {
      const sigma1h = rotrSH(Eh, El, 14) ^ rotrSH(Eh, El, 18) ^ rotrBH(Eh, El, 41);
      const sigma1l = rotrSL(Eh, El, 14) ^ rotrSL(Eh, El, 18) ^ rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = add5L(Hl, sigma1l, CHIl, SHA512_Kl[i3], SHA512_W_L[i3]);
      const T1h = add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i3], SHA512_W_H[i3]);
      const T1l = T1ll | 0;
      const sigma0h = rotrSH(Ah, Al, 28) ^ rotrBH(Ah, Al, 34) ^ rotrBH(Ah, Al, 39);
      const sigma0l = rotrSL(Ah, Al, 28) ^ rotrBL(Ah, Al, 34) ^ rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = add3L(T1l, sigma0l, MAJl);
      Ah = add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    clean(SHA512_W_H, SHA512_W_L);
  }
  destroy() {
    clean(this.buffer);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var SHA384 = class extends SHA512 {
  constructor() {
    super(48);
    this.Ah = SHA384_IV[0] | 0;
    this.Al = SHA384_IV[1] | 0;
    this.Bh = SHA384_IV[2] | 0;
    this.Bl = SHA384_IV[3] | 0;
    this.Ch = SHA384_IV[4] | 0;
    this.Cl = SHA384_IV[5] | 0;
    this.Dh = SHA384_IV[6] | 0;
    this.Dl = SHA384_IV[7] | 0;
    this.Eh = SHA384_IV[8] | 0;
    this.El = SHA384_IV[9] | 0;
    this.Fh = SHA384_IV[10] | 0;
    this.Fl = SHA384_IV[11] | 0;
    this.Gh = SHA384_IV[12] | 0;
    this.Gl = SHA384_IV[13] | 0;
    this.Hh = SHA384_IV[14] | 0;
    this.Hl = SHA384_IV[15] | 0;
  }
};
var T256_IV = /* @__PURE__ */ Uint32Array.from([
  573645204,
  4230739756,
  2673172387,
  3360449730,
  596883563,
  1867755857,
  2520282905,
  1497426621,
  2519219938,
  2827943907,
  3193839141,
  1401305490,
  721525244,
  746961066,
  246885852,
  2177182882
]);
var SHA512_256 = class extends SHA512 {
  constructor() {
    super(32);
    this.Ah = T256_IV[0] | 0;
    this.Al = T256_IV[1] | 0;
    this.Bh = T256_IV[2] | 0;
    this.Bl = T256_IV[3] | 0;
    this.Ch = T256_IV[4] | 0;
    this.Cl = T256_IV[5] | 0;
    this.Dh = T256_IV[6] | 0;
    this.Dl = T256_IV[7] | 0;
    this.Eh = T256_IV[8] | 0;
    this.El = T256_IV[9] | 0;
    this.Fh = T256_IV[10] | 0;
    this.Fl = T256_IV[11] | 0;
    this.Gh = T256_IV[12] | 0;
    this.Gl = T256_IV[13] | 0;
    this.Hh = T256_IV[14] | 0;
    this.Hl = T256_IV[15] | 0;
  }
};
var sha2562 = /* @__PURE__ */ createHasher(() => new SHA256());
var sha5122 = /* @__PURE__ */ createHasher(() => new SHA512());
var sha384 = /* @__PURE__ */ createHasher(() => new SHA384());
var sha512_256 = /* @__PURE__ */ createHasher(() => new SHA512_256());

// node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/sha256.js
var sha2563 = sha2562;

// node_modules/@walletconnect/utils/node_modules/ox/node_modules/@noble/curves/esm/abstract/utils.js
var _0n2 = /* @__PURE__ */ BigInt(0);
var _1n2 = /* @__PURE__ */ BigInt(1);
function isBytes2(a3) {
  return a3 instanceof Uint8Array || ArrayBuffer.isView(a3) && a3.constructor.name === "Uint8Array";
}
function abytes2(item) {
  if (!isBytes2(item))
    throw new Error("Uint8Array expected");
}
function abool(title, value) {
  if (typeof value !== "boolean")
    throw new Error(title + " boolean expected, got " + value);
}
function numberToHexUnpadded(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? "0" + hex : hex;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n2 : BigInt("0x" + hex);
}
var hasHexBuiltin2 = (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
);
var hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_3, i3) => i3.toString(16).padStart(2, "0"));
function bytesToHex2(bytes) {
  abytes2(bytes);
  if (hasHexBuiltin2)
    return bytes.toHex();
  let hex = "";
  for (let i3 = 0; i3 < bytes.length; i3++) {
    hex += hexes2[bytes[i3]];
  }
  return hex;
}
var asciis2 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase162(ch) {
  if (ch >= asciis2._0 && ch <= asciis2._9)
    return ch - asciis2._0;
  if (ch >= asciis2.A && ch <= asciis2.F)
    return ch - (asciis2.A - 10);
  if (ch >= asciis2.a && ch <= asciis2.f)
    return ch - (asciis2.a - 10);
  return;
}
function hexToBytes2(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin2)
    return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase162(hex.charCodeAt(hi));
    const n22 = asciiToBase162(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n22 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n22;
  }
  return array;
}
function bytesToNumberBE(bytes) {
  return hexToNumber(bytesToHex2(bytes));
}
function bytesToNumberLE(bytes) {
  abytes2(bytes);
  return hexToNumber(bytesToHex2(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n4, len) {
  return hexToBytes2(n4.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n4, len) {
  return numberToBytesBE(n4, len).reverse();
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes2(hex);
    } catch (e2) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e2);
    }
  } else if (isBytes2(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
function concatBytes2(...arrays) {
  let sum = 0;
  for (let i3 = 0; i3 < arrays.length; i3++) {
    const a3 = arrays[i3];
    abytes2(a3);
    sum += a3.length;
  }
  const res = new Uint8Array(sum);
  for (let i3 = 0, pad3 = 0; i3 < arrays.length; i3++) {
    const a3 = arrays[i3];
    res.set(a3, pad3);
    pad3 += a3.length;
  }
  return res;
}
var isPosBig = (n4) => typeof n4 === "bigint" && _0n2 <= n4;
function inRange(n4, min, max) {
  return isPosBig(n4) && isPosBig(min) && isPosBig(max) && min <= n4 && n4 < max;
}
function aInRange(title, n4, min, max) {
  if (!inRange(n4, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n4);
}
function bitLen(n4) {
  let len;
  for (len = 0; n4 > _0n2; n4 >>= _1n2, len += 1)
    ;
  return len;
}
var bitMask = (n4) => (_1n2 << BigInt(n4)) - _1n2;
var u8n = (len) => new Uint8Array(len);
var u8fr = (arr) => Uint8Array.from(arr);
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  let v9 = u8n(hashLen);
  let k6 = u8n(hashLen);
  let i3 = 0;
  const reset = () => {
    v9.fill(1);
    k6.fill(0);
    i3 = 0;
  };
  const h4 = (...b5) => hmacFn(k6, v9, ...b5);
  const reseed = (seed = u8n(0)) => {
    k6 = h4(u8fr([0]), seed);
    v9 = h4();
    if (seed.length === 0)
      return;
    k6 = h4(u8fr([1]), seed);
    v9 = h4();
  };
  const gen2 = () => {
    if (i3++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v9 = h4();
      const sl = v9.slice();
      out.push(sl);
      len += v9.length;
    }
    return concatBytes2(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen2())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
var validatorFns = {
  bigint: (val) => typeof val === "bigint",
  function: (val) => typeof val === "function",
  boolean: (val) => typeof val === "boolean",
  string: (val) => typeof val === "string",
  stringOrUint8Array: (val) => typeof val === "string" || isBytes2(val),
  isSafeInteger: (val) => Number.isSafeInteger(val),
  array: (val) => Array.isArray(val),
  field: (val, object) => object.Fp.isValid(val),
  hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
};
function validateObject(object, validators, optValidators = {}) {
  const checkField = (fieldName, type, isOptional) => {
    const checkVal = validatorFns[type];
    if (typeof checkVal !== "function")
      throw new Error("invalid validator function");
    const val = object[fieldName];
    if (isOptional && val === void 0)
      return;
    if (!checkVal(val, object)) {
      throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
    }
  };
  for (const [fieldName, type] of Object.entries(validators))
    checkField(fieldName, type, false);
  for (const [fieldName, type] of Object.entries(optValidators))
    checkField(fieldName, type, true);
  return object;
}
function memoized(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/internal/bytes.js
function assertSize(bytes, size_) {
  if (size(bytes) > size_)
    throw new SizeOverflowError({
      givenSize: size(bytes),
      maxSize: size_
    });
}
var charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function pad(bytes, options = {}) {
  const { dir, size: size3 = 32 } = options;
  if (size3 === 0)
    return bytes;
  if (bytes.length > size3)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size3,
      type: "Bytes"
    });
  const paddedBytes = new Uint8Array(size3);
  for (let i3 = 0; i3 < size3; i3++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i3 : size3 - i3 - 1] = bytes[padEnd ? i3 : bytes.length - i3 - 1];
  }
  return paddedBytes;
}

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/internal/hex.js
function assertSize2(hex, size_) {
  if (size2(hex) > size_)
    throw new SizeOverflowError2({
      givenSize: size2(hex),
      maxSize: size_
    });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size2(value) - 1)
    throw new SliceOffsetOutOfBoundsError2({
      offset: start,
      position: "start",
      size: size2(value)
    });
}
function assertEndOffset(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size2(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError2({
      offset: end,
      position: "end",
      size: size2(value)
    });
  }
}
function pad2(hex_, options = {}) {
  const { dir, size: size3 = 32 } = options;
  if (size3 === 0)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size3 * 2)
    throw new SizeExceedsPaddingSizeError2({
      size: Math.ceil(hex.length / 2),
      targetSize: size3,
      type: "Hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size3 * 2, "0")}`;
}
function trim(value, options = {}) {
  const { dir = "left" } = options;
  let data = value.replace("0x", "");
  let sliceLength = 0;
  for (let i3 = 0; i3 < data.length - 1; i3++) {
    if (data[dir === "left" ? i3 : data.length - i3 - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (data === "0")
    return "0x";
  if (dir === "right" && data.length % 2 === 1)
    return `0x${data}0`;
  return `0x${data}`;
}

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Json.js
var bigIntSuffix = "#__bigint";
function stringify2(value, replacer, space) {
  return JSON.stringify(value, (key, value2) => {
    if (typeof replacer === "function")
      return replacer(key, value2);
    if (typeof value2 === "bigint")
      return value2.toString() + bigIntSuffix;
    return value2;
  }, space);
}

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Hex.js
var hexes3 = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i3) => i3.toString(16).padStart(2, "0"));
function assert(value, options = {}) {
  const { strict = false } = options;
  if (!value)
    throw new InvalidHexTypeError(value);
  if (typeof value !== "string")
    throw new InvalidHexTypeError(value);
  if (strict) {
    if (!/^0x[0-9a-fA-F]*$/.test(value))
      throw new InvalidHexValueError(value);
  }
  if (!value.startsWith("0x"))
    throw new InvalidHexValueError(value);
}
function concat(...values) {
  return `0x${values.reduce((acc, x8) => acc + x8.replace("0x", ""), "")}`;
}
function from3(value) {
  if (value instanceof Uint8Array)
    return fromBytes(value);
  if (Array.isArray(value))
    return fromBytes(new Uint8Array(value));
  return value;
}
function fromBytes(value, options = {}) {
  let string2 = "";
  for (let i3 = 0; i3 < value.length; i3++)
    string2 += hexes3[value[i3]];
  const hex = `0x${string2}`;
  if (typeof options.size === "number") {
    assertSize2(hex, options.size);
    return padRight(hex, options.size);
  }
  return hex;
}
function fromNumber(value, options = {}) {
  const { signed, size: size3 } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size3) {
    if (signed)
      maxValue = (1n << BigInt(size3) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size3) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size3,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? (1n << BigInt(size3 * 8)) + BigInt(value_) : value_).toString(16);
  const hex = `0x${stringValue}`;
  if (size3)
    return padLeft(hex, size3);
  return hex;
}
function padLeft(value, size3) {
  return pad2(value, { dir: "left", size: size3 });
}
function padRight(value, size3) {
  return pad2(value, { dir: "right", size: size3 });
}
function slice(value, start, end, options = {}) {
  const { strict } = options;
  assertStartOffset(value, start);
  const value_ = `0x${value.replace("0x", "").slice((start ?? 0) * 2, (end ?? value.length) * 2)}`;
  if (strict)
    assertEndOffset(value_, start, end);
  return value_;
}
function size2(value) {
  return Math.ceil((value.length - 2) / 2);
}
function trimLeft(value) {
  return trim(value, { dir: "left" });
}
function validate(value, options = {}) {
  const { strict = false } = options;
  try {
    assert(value, { strict });
    return true;
  } catch {
    return false;
  }
}
var IntegerOutOfRangeError = class extends BaseError {
  constructor({ max, min, signed, size: size3, value }) {
    super(`Number \`${value}\` is not in safe${size3 ? ` ${size3 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
};
var InvalidHexTypeError = class extends BaseError {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify2(value) : value}\` of type \`${typeof value}\` is an invalid hex type.`, {
      metaMessages: ['Hex types must be represented as `"0x${string}"`.']
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexTypeError"
    });
  }
};
var InvalidHexValueError = class extends BaseError {
  constructor(value) {
    super(`Value \`${value}\` is an invalid hex value.`, {
      metaMessages: [
        'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexValueError"
    });
  }
};
var SizeOverflowError2 = class extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeOverflowError"
    });
  }
};
var SliceOffsetOutOfBoundsError2 = class extends BaseError {
  constructor({ offset, position, size: size3 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size3}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SliceOffsetOutOfBoundsError"
    });
  }
};
var SizeExceedsPaddingSizeError2 = class extends BaseError {
  constructor({ size: size3, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size3}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
};

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Bytes.js
var encoder = /* @__PURE__ */ new TextEncoder();
function assert2(value) {
  if (value instanceof Uint8Array)
    return;
  if (!value)
    throw new InvalidBytesTypeError(value);
  if (typeof value !== "object")
    throw new InvalidBytesTypeError(value);
  if (!("BYTES_PER_ELEMENT" in value))
    throw new InvalidBytesTypeError(value);
  if (value.BYTES_PER_ELEMENT !== 1 || value.constructor.name !== "Uint8Array")
    throw new InvalidBytesTypeError(value);
}
function from4(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex(value);
  return fromArray(value);
}
function fromArray(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromHex(value, options = {}) {
  const { size: size3 } = options;
  let hex = value;
  if (size3) {
    assertSize2(value, size3);
    hex = padRight(value, size3);
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length2 = hexString.length / 2;
  const bytes = new Uint8Array(length2);
  for (let index = 0, j6 = 0; index < length2; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j6++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j6++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError(`Invalid byte sequence ("${hexString[j6 - 2]}${hexString[j6 - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function fromString3(value, options = {}) {
  const { size: size3 } = options;
  const bytes = encoder.encode(value);
  if (typeof size3 === "number") {
    assertSize(bytes, size3);
    return padRight2(bytes, size3);
  }
  return bytes;
}
function padRight2(value, size3) {
  return pad(value, { dir: "right", size: size3 });
}
function size(value) {
  return value.length;
}
function validate2(value) {
  try {
    assert2(value);
    return true;
  } catch {
    return false;
  }
}
var InvalidBytesTypeError = class extends BaseError {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify2(value) : value}\` of type \`${typeof value}\` is an invalid Bytes value.`, {
      metaMessages: ["Bytes values must be of type `Bytes`."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.InvalidBytesTypeError"
    });
  }
};
var SizeOverflowError = class extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeOverflowError"
    });
  }
};
var SizeExceedsPaddingSizeError = class extends BaseError {
  constructor({ size: size3, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size3}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeExceedsPaddingSizeError"
    });
  }
};

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Hash.js
function keccak256(value, options = {}) {
  const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = keccak_256(from4(value));
  if (as === "Bytes")
    return bytes;
  return fromBytes(bytes);
}

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/internal/lru.js
var LruMap = class extends Map {
  constructor(size3) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size3;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
};

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Caches.js
var caches = {
  checksum: /* @__PURE__ */ new LruMap(8192)
};
var checksum = caches.checksum;

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/PublicKey.js
function assert3(publicKey, options = {}) {
  const { compressed } = options;
  const { prefix, x: x8, y: y7 } = publicKey;
  if (compressed === false || typeof x8 === "bigint" && typeof y7 === "bigint") {
    if (prefix !== 4)
      throw new InvalidPrefixError({
        prefix,
        cause: new InvalidUncompressedPrefixError()
      });
    return;
  }
  if (compressed === true || typeof x8 === "bigint" && typeof y7 === "undefined") {
    if (prefix !== 3 && prefix !== 2)
      throw new InvalidPrefixError({
        prefix,
        cause: new InvalidCompressedPrefixError()
      });
    return;
  }
  throw new InvalidError({ publicKey });
}
function from5(value) {
  const publicKey = (() => {
    if (validate(value))
      return fromHex2(value);
    if (validate2(value))
      return fromBytes2(value);
    const { prefix, x: x8, y: y7 } = value;
    if (typeof x8 === "bigint" && typeof y7 === "bigint")
      return { prefix: prefix ?? 4, x: x8, y: y7 };
    return { prefix, x: x8 };
  })();
  assert3(publicKey);
  return publicKey;
}
function fromBytes2(publicKey) {
  return fromHex2(fromBytes(publicKey));
}
function fromHex2(publicKey) {
  if (publicKey.length !== 132 && publicKey.length !== 130 && publicKey.length !== 68)
    throw new InvalidSerializedSizeError({ publicKey });
  if (publicKey.length === 130) {
    const x9 = BigInt(slice(publicKey, 0, 32));
    const y7 = BigInt(slice(publicKey, 32, 64));
    return {
      prefix: 4,
      x: x9,
      y: y7
    };
  }
  if (publicKey.length === 132) {
    const prefix2 = Number(slice(publicKey, 0, 1));
    const x9 = BigInt(slice(publicKey, 1, 33));
    const y7 = BigInt(slice(publicKey, 33, 65));
    return {
      prefix: prefix2,
      x: x9,
      y: y7
    };
  }
  const prefix = Number(slice(publicKey, 0, 1));
  const x8 = BigInt(slice(publicKey, 1, 33));
  return {
    prefix,
    x: x8
  };
}
function toBytes2(publicKey, options = {}) {
  return fromHex(toHex(publicKey, options));
}
function toHex(publicKey, options = {}) {
  assert3(publicKey);
  const { prefix, x: x8, y: y7 } = publicKey;
  const { includePrefix = true } = options;
  const publicKey_ = concat(
    includePrefix ? fromNumber(prefix, { size: 1 }) : "0x",
    fromNumber(x8, { size: 32 }),
    // If the public key is not compressed, add the y coordinate.
    typeof y7 === "bigint" ? fromNumber(y7, { size: 32 }) : "0x"
  );
  return publicKey_;
}
var InvalidError = class extends BaseError {
  constructor({ publicKey }) {
    super(`Value \`${stringify2(publicKey)}\` is not a valid public key.`, {
      metaMessages: [
        "Public key must contain:",
        "- an `x` and `prefix` value (compressed)",
        "- an `x`, `y`, and `prefix` value (uncompressed)"
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidError"
    });
  }
};
var InvalidPrefixError = class extends BaseError {
  constructor({ prefix, cause }) {
    super(`Prefix "${prefix}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidPrefixError"
    });
  }
};
var InvalidCompressedPrefixError = class extends BaseError {
  constructor() {
    super("Prefix must be 2 or 3 for compressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidCompressedPrefixError"
    });
  }
};
var InvalidUncompressedPrefixError = class extends BaseError {
  constructor() {
    super("Prefix must be 4 for uncompressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidUncompressedPrefixError"
    });
  }
};
var InvalidSerializedSizeError = class extends BaseError {
  constructor({ publicKey }) {
    super(`Value \`${publicKey}\` is an invalid public key size.`, {
      metaMessages: [
        "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
        `Received ${size2(from3(publicKey))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidSerializedSizeError"
    });
  }
};

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Address.js
var addressRegex = /^0x[a-fA-F0-9]{40}$/;
function assert4(value, options = {}) {
  const { strict = true } = options;
  if (!addressRegex.test(value))
    throw new InvalidAddressError({
      address: value,
      cause: new InvalidInputError()
    });
  if (strict) {
    if (value.toLowerCase() === value)
      return;
    if (checksum2(value) !== value)
      throw new InvalidAddressError({
        address: value,
        cause: new InvalidChecksumError()
      });
  }
}
function checksum2(address) {
  if (checksum.has(address))
    return checksum.get(address);
  assert4(address, { strict: false });
  const hexAddress = address.substring(2).toLowerCase();
  const hash = keccak256(fromString3(hexAddress), { as: "Bytes" });
  const characters = hexAddress.split("");
  for (let i3 = 0; i3 < 40; i3 += 2) {
    if (hash[i3 >> 1] >> 4 >= 8 && characters[i3]) {
      characters[i3] = characters[i3].toUpperCase();
    }
    if ((hash[i3 >> 1] & 15) >= 8 && characters[i3 + 1]) {
      characters[i3 + 1] = characters[i3 + 1].toUpperCase();
    }
  }
  const result = `0x${characters.join("")}`;
  checksum.set(address, result);
  return result;
}
function from6(address, options = {}) {
  const { checksum: checksumVal = false } = options;
  assert4(address);
  if (checksumVal)
    return checksum2(address);
  return address;
}
function fromPublicKey(publicKey, options = {}) {
  const address = keccak256(`0x${toHex(publicKey).slice(4)}`).substring(26);
  return from6(`0x${address}`, options);
}
function isEqual(addressA, addressB) {
  assert4(addressA, { strict: false });
  assert4(addressB, { strict: false });
  return addressA.toLowerCase() === addressB.toLowerCase();
}
var InvalidAddressError = class extends BaseError {
  constructor({ address, cause }) {
    super(`Address "${address}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidAddressError"
    });
  }
};
var InvalidInputError = class extends BaseError {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidInputError"
    });
  }
};
var InvalidChecksumError = class extends BaseError {
  constructor() {
    super("Address does not match its checksum counterpart.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidChecksumError"
    });
  }
};

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Solidity.js
var maxInt8 = 2n ** (8n - 1n) - 1n;
var maxInt16 = 2n ** (16n - 1n) - 1n;
var maxInt24 = 2n ** (24n - 1n) - 1n;
var maxInt32 = 2n ** (32n - 1n) - 1n;
var maxInt40 = 2n ** (40n - 1n) - 1n;
var maxInt48 = 2n ** (48n - 1n) - 1n;
var maxInt56 = 2n ** (56n - 1n) - 1n;
var maxInt64 = 2n ** (64n - 1n) - 1n;
var maxInt72 = 2n ** (72n - 1n) - 1n;
var maxInt80 = 2n ** (80n - 1n) - 1n;
var maxInt88 = 2n ** (88n - 1n) - 1n;
var maxInt96 = 2n ** (96n - 1n) - 1n;
var maxInt104 = 2n ** (104n - 1n) - 1n;
var maxInt112 = 2n ** (112n - 1n) - 1n;
var maxInt120 = 2n ** (120n - 1n) - 1n;
var maxInt128 = 2n ** (128n - 1n) - 1n;
var maxInt136 = 2n ** (136n - 1n) - 1n;
var maxInt144 = 2n ** (144n - 1n) - 1n;
var maxInt152 = 2n ** (152n - 1n) - 1n;
var maxInt160 = 2n ** (160n - 1n) - 1n;
var maxInt168 = 2n ** (168n - 1n) - 1n;
var maxInt176 = 2n ** (176n - 1n) - 1n;
var maxInt184 = 2n ** (184n - 1n) - 1n;
var maxInt192 = 2n ** (192n - 1n) - 1n;
var maxInt200 = 2n ** (200n - 1n) - 1n;
var maxInt208 = 2n ** (208n - 1n) - 1n;
var maxInt216 = 2n ** (216n - 1n) - 1n;
var maxInt224 = 2n ** (224n - 1n) - 1n;
var maxInt232 = 2n ** (232n - 1n) - 1n;
var maxInt240 = 2n ** (240n - 1n) - 1n;
var maxInt248 = 2n ** (248n - 1n) - 1n;
var maxInt256 = 2n ** (256n - 1n) - 1n;
var minInt8 = -(2n ** (8n - 1n));
var minInt16 = -(2n ** (16n - 1n));
var minInt24 = -(2n ** (24n - 1n));
var minInt32 = -(2n ** (32n - 1n));
var minInt40 = -(2n ** (40n - 1n));
var minInt48 = -(2n ** (48n - 1n));
var minInt56 = -(2n ** (56n - 1n));
var minInt64 = -(2n ** (64n - 1n));
var minInt72 = -(2n ** (72n - 1n));
var minInt80 = -(2n ** (80n - 1n));
var minInt88 = -(2n ** (88n - 1n));
var minInt96 = -(2n ** (96n - 1n));
var minInt104 = -(2n ** (104n - 1n));
var minInt112 = -(2n ** (112n - 1n));
var minInt120 = -(2n ** (120n - 1n));
var minInt128 = -(2n ** (128n - 1n));
var minInt136 = -(2n ** (136n - 1n));
var minInt144 = -(2n ** (144n - 1n));
var minInt152 = -(2n ** (152n - 1n));
var minInt160 = -(2n ** (160n - 1n));
var minInt168 = -(2n ** (168n - 1n));
var minInt176 = -(2n ** (176n - 1n));
var minInt184 = -(2n ** (184n - 1n));
var minInt192 = -(2n ** (192n - 1n));
var minInt200 = -(2n ** (200n - 1n));
var minInt208 = -(2n ** (208n - 1n));
var minInt216 = -(2n ** (216n - 1n));
var minInt224 = -(2n ** (224n - 1n));
var minInt232 = -(2n ** (232n - 1n));
var minInt240 = -(2n ** (240n - 1n));
var minInt248 = -(2n ** (248n - 1n));
var minInt256 = -(2n ** (256n - 1n));
var maxUint8 = 2n ** 8n - 1n;
var maxUint16 = 2n ** 16n - 1n;
var maxUint24 = 2n ** 24n - 1n;
var maxUint32 = 2n ** 32n - 1n;
var maxUint40 = 2n ** 40n - 1n;
var maxUint48 = 2n ** 48n - 1n;
var maxUint56 = 2n ** 56n - 1n;
var maxUint64 = 2n ** 64n - 1n;
var maxUint72 = 2n ** 72n - 1n;
var maxUint80 = 2n ** 80n - 1n;
var maxUint88 = 2n ** 88n - 1n;
var maxUint96 = 2n ** 96n - 1n;
var maxUint104 = 2n ** 104n - 1n;
var maxUint112 = 2n ** 112n - 1n;
var maxUint120 = 2n ** 120n - 1n;
var maxUint128 = 2n ** 128n - 1n;
var maxUint136 = 2n ** 136n - 1n;
var maxUint144 = 2n ** 144n - 1n;
var maxUint152 = 2n ** 152n - 1n;
var maxUint160 = 2n ** 160n - 1n;
var maxUint168 = 2n ** 168n - 1n;
var maxUint176 = 2n ** 176n - 1n;
var maxUint184 = 2n ** 184n - 1n;
var maxUint192 = 2n ** 192n - 1n;
var maxUint200 = 2n ** 200n - 1n;
var maxUint208 = 2n ** 208n - 1n;
var maxUint216 = 2n ** 216n - 1n;
var maxUint224 = 2n ** 224n - 1n;
var maxUint232 = 2n ** 232n - 1n;
var maxUint240 = 2n ** 240n - 1n;
var maxUint248 = 2n ** 248n - 1n;
var maxUint256 = 2n ** 256n - 1n;

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Signature.js
var Signature_exports = {};
__export(Signature_exports, {
  InvalidRError: () => InvalidRError,
  InvalidSError: () => InvalidSError,
  InvalidSerializedSizeError: () => InvalidSerializedSizeError2,
  InvalidVError: () => InvalidVError,
  InvalidYParityError: () => InvalidYParityError,
  MissingPropertiesError: () => MissingPropertiesError,
  assert: () => assert5,
  extract: () => extract,
  from: () => from7,
  fromBytes: () => fromBytes3,
  fromDerBytes: () => fromDerBytes,
  fromDerHex: () => fromDerHex,
  fromHex: () => fromHex3,
  fromLegacy: () => fromLegacy,
  fromRpc: () => fromRpc,
  fromTuple: () => fromTuple,
  toBytes: () => toBytes3,
  toDerBytes: () => toDerBytes,
  toDerHex: () => toDerHex,
  toHex: () => toHex2,
  toLegacy: () => toLegacy,
  toRpc: () => toRpc,
  toTuple: () => toTuple,
  vToYParity: () => vToYParity,
  validate: () => validate3,
  yParityToV: () => yParityToV
});

// node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/hmac.js
var HMAC = class extends Hash {
  constructor(hash, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    ahash(hash);
    const key = toBytes(_key);
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad3 = new Uint8Array(blockLen);
    pad3.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i3 = 0; i3 < pad3.length; i3++)
      pad3[i3] ^= 54;
    this.iHash.update(pad3);
    this.oHash = hash.create();
    for (let i3 = 0; i3 < pad3.length; i3++)
      pad3[i3] ^= 54 ^ 92;
    this.oHash.update(pad3);
    clean(pad3);
  }
  update(buf) {
    aexists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists(this);
    abytes(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to3) {
    to3 || (to3 = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to3 = to3;
    to3.finished = finished;
    to3.destroyed = destroyed;
    to3.blockLen = blockLen;
    to3.outputLen = outputLen;
    to3.oHash = oHash._cloneInto(to3.oHash);
    to3.iHash = iHash._cloneInto(to3.iHash);
    return to3;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
hmac.create = (hash, key) => new HMAC(hash, key);

// node_modules/@walletconnect/utils/node_modules/ox/node_modules/@noble/curves/esm/abstract/modular.js
var _0n3 = BigInt(0);
var _1n3 = BigInt(1);
var _2n2 = /* @__PURE__ */ BigInt(2);
var _3n = /* @__PURE__ */ BigInt(3);
var _4n = /* @__PURE__ */ BigInt(4);
var _5n = /* @__PURE__ */ BigInt(5);
var _8n = /* @__PURE__ */ BigInt(8);
function mod(a3, b5) {
  const result = a3 % b5;
  return result >= _0n3 ? result : b5 + result;
}
function pow2(x8, power, modulo) {
  let res = x8;
  while (power-- > _0n3) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number, modulo) {
  if (number === _0n3)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n3)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a3 = mod(number, modulo);
  let b5 = modulo;
  let x8 = _0n3, y7 = _1n3, u3 = _1n3, v9 = _0n3;
  while (a3 !== _0n3) {
    const q4 = b5 / a3;
    const r3 = b5 % a3;
    const m3 = x8 - u3 * q4;
    const n4 = y7 - v9 * q4;
    b5 = a3, a3 = r3, x8 = u3, y7 = v9, u3 = m3, v9 = n4;
  }
  const gcd2 = b5;
  if (gcd2 !== _1n3)
    throw new Error("invert: does not exist");
  return mod(x8, modulo);
}
function sqrt3mod4(Fp2, n4) {
  const p1div4 = (Fp2.ORDER + _1n3) / _4n;
  const root = Fp2.pow(n4, p1div4);
  if (!Fp2.eql(Fp2.sqr(root), n4))
    throw new Error("Cannot find square root");
  return root;
}
function sqrt5mod8(Fp2, n4) {
  const p5div8 = (Fp2.ORDER - _5n) / _8n;
  const n22 = Fp2.mul(n4, _2n2);
  const v9 = Fp2.pow(n22, p5div8);
  const nv = Fp2.mul(n4, v9);
  const i3 = Fp2.mul(Fp2.mul(nv, _2n2), v9);
  const root = Fp2.mul(nv, Fp2.sub(i3, Fp2.ONE));
  if (!Fp2.eql(Fp2.sqr(root), n4))
    throw new Error("Cannot find square root");
  return root;
}
function tonelliShanks(P6) {
  if (P6 < BigInt(3))
    throw new Error("sqrt is not defined for small field");
  let Q4 = P6 - _1n3;
  let S5 = 0;
  while (Q4 % _2n2 === _0n3) {
    Q4 /= _2n2;
    S5++;
  }
  let Z4 = _2n2;
  const _Fp = Field(P6);
  while (FpLegendre(_Fp, Z4) === 1) {
    if (Z4++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S5 === 1)
    return sqrt3mod4;
  let cc = _Fp.pow(Z4, Q4);
  const Q1div2 = (Q4 + _1n3) / _2n2;
  return function tonelliSlow(Fp2, n4) {
    if (Fp2.is0(n4))
      return n4;
    if (FpLegendre(Fp2, n4) !== 1)
      throw new Error("Cannot find square root");
    let M6 = S5;
    let c5 = Fp2.mul(Fp2.ONE, cc);
    let t = Fp2.pow(n4, Q4);
    let R4 = Fp2.pow(n4, Q1div2);
    while (!Fp2.eql(t, Fp2.ONE)) {
      if (Fp2.is0(t))
        return Fp2.ZERO;
      let i3 = 1;
      let t_tmp = Fp2.sqr(t);
      while (!Fp2.eql(t_tmp, Fp2.ONE)) {
        i3++;
        t_tmp = Fp2.sqr(t_tmp);
        if (i3 === M6)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n3 << BigInt(M6 - i3 - 1);
      const b5 = Fp2.pow(c5, exponent);
      M6 = i3;
      c5 = Fp2.sqr(b5);
      t = Fp2.mul(t, c5);
      R4 = Fp2.mul(R4, b5);
    }
    return R4;
  };
}
function FpSqrt(P6) {
  if (P6 % _4n === _3n)
    return sqrt3mod4;
  if (P6 % _8n === _5n)
    return sqrt5mod8;
  return tonelliShanks(P6);
}
var FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  return validateObject(field, opts);
}
function FpPow(Fp2, num, power) {
  if (power < _0n3)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n3)
    return Fp2.ONE;
  if (power === _1n3)
    return num;
  let p5 = Fp2.ONE;
  let d5 = num;
  while (power > _0n3) {
    if (power & _1n3)
      p5 = Fp2.mul(p5, d5);
    d5 = Fp2.sqr(d5);
    power >>= _1n3;
  }
  return p5;
}
function FpInvertBatch(Fp2, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp2.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i3) => {
    if (Fp2.is0(num))
      return acc;
    inverted[i3] = acc;
    return Fp2.mul(acc, num);
  }, Fp2.ONE);
  const invertedAcc = Fp2.inv(multipliedAcc);
  nums.reduceRight((acc, num, i3) => {
    if (Fp2.is0(num))
      return acc;
    inverted[i3] = Fp2.mul(acc, inverted[i3]);
    return Fp2.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp2, n4) {
  const p1mod2 = (Fp2.ORDER - _1n3) / _2n2;
  const powered = Fp2.pow(n4, p1mod2);
  const yes = Fp2.eql(powered, Fp2.ONE);
  const zero = Fp2.eql(powered, Fp2.ZERO);
  const no3 = Fp2.eql(powered, Fp2.neg(Fp2.ONE));
  if (!yes && !zero && !no3)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength(n4, nBitLength) {
  if (nBitLength !== void 0)
    anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n4.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLen3, isLE3 = false, redef = {}) {
  if (ORDER <= _0n3)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen3);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f3 = Object.freeze({
    ORDER,
    isLE: isLE3,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n3,
    ONE: _1n3,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n3 <= num && num < ORDER;
    },
    is0: (num) => num === _0n3,
    isOdd: (num) => (num & _1n3) === _1n3,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f3, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: redef.sqrt || ((n4) => {
      if (!sqrtP)
        sqrtP = FpSqrt(ORDER);
      return sqrtP(f3, n4);
    }),
    toBytes: (num) => isLE3 ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes) => {
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      return isLE3 ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch(f3, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a3, b5, c5) => c5 ? b5 : a3
  });
  return Object.freeze(f3);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length2 = getFieldBytesLength(fieldOrder);
  return length2 + Math.ceil(length2 / 2);
}
function mapHashToField(key, fieldOrder, isLE3 = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE3 ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num, fieldOrder - _1n3) + _1n3;
  return isLE3 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}

// node_modules/@walletconnect/utils/node_modules/ox/node_modules/@noble/curves/esm/abstract/curve.js
var _0n4 = BigInt(0);
var _1n4 = BigInt(1);
function constTimeNegate(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function validateW(W5, bits) {
  if (!Number.isSafeInteger(W5) || W5 <= 0 || W5 > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W5);
}
function calcWOpts(W5, scalarBits) {
  validateW(W5, scalarBits);
  const windows = Math.ceil(scalarBits / W5) + 1;
  const windowSize = 2 ** (W5 - 1);
  const maxNumber = 2 ** W5;
  const mask = bitMask(W5);
  const shiftBy = BigInt(W5);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n4, window2, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n4 & mask);
  let nextN = n4 >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n4;
  }
  const offsetStart = window2 * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window2 % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints(points, c5) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p5, i3) => {
    if (!(p5 instanceof c5))
      throw new Error("invalid point at index " + i3);
  });
}
function validateMSMScalars(scalars, field) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s2, i3) => {
    if (!field.isValid(s2))
      throw new Error("invalid scalar at index " + i3);
  });
}
var pointPrecomputes = /* @__PURE__ */ new WeakMap();
var pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P6) {
  return pointWindowSizes.get(P6) || 1;
}
function wNAF(c5, bits) {
  return {
    constTimeNegate,
    hasPrecomputes(elm) {
      return getW(elm) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(elm, n4, p5 = c5.ZERO) {
      let d5 = elm;
      while (n4 > _0n4) {
        if (n4 & _1n4)
          p5 = p5.add(d5);
        d5 = d5.double();
        n4 >>= _1n4;
      }
      return p5;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(elm, W5) {
      const { windows, windowSize } = calcWOpts(W5, bits);
      const points = [];
      let p5 = elm;
      let base3 = p5;
      for (let window2 = 0; window2 < windows; window2++) {
        base3 = p5;
        points.push(base3);
        for (let i3 = 1; i3 < windowSize; i3++) {
          base3 = base3.add(p5);
          points.push(base3);
        }
        p5 = base3.double();
      }
      return points;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(W5, precomputes, n4) {
      let p5 = c5.ZERO;
      let f3 = c5.BASE;
      const wo2 = calcWOpts(W5, bits);
      for (let window2 = 0; window2 < wo2.windows; window2++) {
        const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n4, window2, wo2);
        n4 = nextN;
        if (isZero) {
          f3 = f3.add(constTimeNegate(isNegF, precomputes[offsetF]));
        } else {
          p5 = p5.add(constTimeNegate(isNeg, precomputes[offset]));
        }
      }
      return { p: p5, f: f3 };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(W5, precomputes, n4, acc = c5.ZERO) {
      const wo2 = calcWOpts(W5, bits);
      for (let window2 = 0; window2 < wo2.windows; window2++) {
        if (n4 === _0n4)
          break;
        const { nextN, offset, isZero, isNeg } = calcOffsets(n4, window2, wo2);
        n4 = nextN;
        if (isZero) {
          continue;
        } else {
          const item = precomputes[offset];
          acc = acc.add(isNeg ? item.negate() : item);
        }
      }
      return acc;
    },
    getPrecomputes(W5, P6, transform) {
      let comp = pointPrecomputes.get(P6);
      if (!comp) {
        comp = this.precomputeWindow(P6, W5);
        if (W5 !== 1)
          pointPrecomputes.set(P6, transform(comp));
      }
      return comp;
    },
    wNAFCached(P6, n4, transform) {
      const W5 = getW(P6);
      return this.wNAF(W5, this.getPrecomputes(W5, P6, transform), n4);
    },
    wNAFCachedUnsafe(P6, n4, transform, prev) {
      const W5 = getW(P6);
      if (W5 === 1)
        return this.unsafeLadder(P6, n4, prev);
      return this.wNAFUnsafe(W5, this.getPrecomputes(W5, P6, transform), n4, prev);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(P6, W5) {
      validateW(W5, bits);
      pointWindowSizes.set(P6, W5);
      pointPrecomputes.delete(P6);
    }
  };
}
function pippenger(c5, fieldN, points, scalars) {
  validateMSMPoints(points, c5);
  validateMSMScalars(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength)
    throw new Error("arrays of points and scalars must have equal length");
  const zero = c5.ZERO;
  const wbits = bitLen(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12)
    windowSize = wbits - 3;
  else if (wbits > 4)
    windowSize = wbits - 2;
  else if (wbits > 0)
    windowSize = 2;
  const MASK = bitMask(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i3 = lastBits; i3 >= 0; i3 -= windowSize) {
    buckets.fill(zero);
    for (let j6 = 0; j6 < slength; j6++) {
      const scalar = scalars[j6];
      const wbits2 = Number(scalar >> BigInt(i3) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j6]);
    }
    let resI = zero;
    for (let j6 = buckets.length - 1, sumI = zero; j6 > 0; j6--) {
      sumI = sumI.add(buckets[j6]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i3 !== 0)
      for (let j6 = 0; j6 < windowSize; j6++)
        sum = sum.double();
  }
  return sum;
}
function validateBasic(curve) {
  validateField(curve.Fp);
  validateObject(curve, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  });
  return Object.freeze({
    ...nLength(curve.n, curve.nBitLength),
    ...curve,
    ...{ p: curve.Fp.ORDER }
  });
}

// node_modules/@walletconnect/utils/node_modules/ox/node_modules/@noble/curves/esm/abstract/weierstrass.js
function validateSigVerOpts(opts) {
  if (opts.lowS !== void 0)
    abool("lowS", opts.lowS);
  if (opts.prehash !== void 0)
    abool("prehash", opts.prehash);
}
function validatePointOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    a: "field",
    b: "field"
  }, {
    allowInfinityPoint: "boolean",
    allowedPrivateKeyLengths: "array",
    clearCofactor: "function",
    fromBytes: "function",
    isTorsionFree: "function",
    toBytes: "function",
    wrapPrivateKey: "boolean"
  });
  const { endo, Fp: Fp2, a: a3 } = opts;
  if (endo) {
    if (!Fp2.eql(a3, Fp2.ZERO)) {
      throw new Error("invalid endo: CURVE.a must be 0");
    }
    if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
      throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
    }
  }
  return Object.freeze({ ...opts });
}
var DERErr = class extends Error {
  constructor(m3 = "") {
    super(m3);
  }
};
var DER = {
  // asn.1 DER encoding utils
  Err: DERErr,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (tag, data) => {
      const { Err: E6 } = DER;
      if (tag < 0 || tag > 256)
        throw new E6("tlv.encode: wrong tag");
      if (data.length & 1)
        throw new E6("tlv.encode: unpadded data");
      const dataLen = data.length / 2;
      const len = numberToHexUnpadded(dataLen);
      if (len.length / 2 & 128)
        throw new E6("tlv.encode: long form length too big");
      const lenLen = dataLen > 127 ? numberToHexUnpadded(len.length / 2 | 128) : "";
      const t = numberToHexUnpadded(tag);
      return t + lenLen + len + data;
    },
    // v - value, l - left bytes (unparsed)
    decode(tag, data) {
      const { Err: E6 } = DER;
      let pos = 0;
      if (tag < 0 || tag > 256)
        throw new E6("tlv.encode: wrong tag");
      if (data.length < 2 || data[pos++] !== tag)
        throw new E6("tlv.decode: wrong tlv");
      const first = data[pos++];
      const isLong = !!(first & 128);
      let length2 = 0;
      if (!isLong)
        length2 = first;
      else {
        const lenLen = first & 127;
        if (!lenLen)
          throw new E6("tlv.decode(long): indefinite length not supported");
        if (lenLen > 4)
          throw new E6("tlv.decode(long): byte length is too big");
        const lengthBytes = data.subarray(pos, pos + lenLen);
        if (lengthBytes.length !== lenLen)
          throw new E6("tlv.decode: length bytes not complete");
        if (lengthBytes[0] === 0)
          throw new E6("tlv.decode(long): zero leftmost byte");
        for (const b5 of lengthBytes)
          length2 = length2 << 8 | b5;
        pos += lenLen;
        if (length2 < 128)
          throw new E6("tlv.decode(long): not minimal encoding");
      }
      const v9 = data.subarray(pos, pos + length2);
      if (v9.length !== length2)
        throw new E6("tlv.decode: wrong value length");
      return { v: v9, l: data.subarray(pos + length2) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(num) {
      const { Err: E6 } = DER;
      if (num < _0n5)
        throw new E6("integer: negative integers are not allowed");
      let hex = numberToHexUnpadded(num);
      if (Number.parseInt(hex[0], 16) & 8)
        hex = "00" + hex;
      if (hex.length & 1)
        throw new E6("unexpected DER parsing assertion: unpadded hex");
      return hex;
    },
    decode(data) {
      const { Err: E6 } = DER;
      if (data[0] & 128)
        throw new E6("invalid signature integer: negative");
      if (data[0] === 0 && !(data[1] & 128))
        throw new E6("invalid signature integer: unnecessary leading zero");
      return bytesToNumberBE(data);
    }
  },
  toSig(hex) {
    const { Err: E6, _int: int, _tlv: tlv } = DER;
    const data = ensureBytes("signature", hex);
    const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
    if (seqLeftBytes.length)
      throw new E6("invalid signature: left bytes after parsing");
    const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
    const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
    if (sLeftBytes.length)
      throw new E6("invalid signature: left bytes after parsing");
    return { r: int.decode(rBytes), s: int.decode(sBytes) };
  },
  hexFromSig(sig) {
    const { _tlv: tlv, _int: int } = DER;
    const rs = tlv.encode(2, int.encode(sig.r));
    const ss = tlv.encode(2, int.encode(sig.s));
    const seq = rs + ss;
    return tlv.encode(48, seq);
  }
};
function numToSizedHex(num, size3) {
  return bytesToHex2(numberToBytesBE(num, size3));
}
var _0n5 = BigInt(0);
var _1n5 = BigInt(1);
var _2n3 = BigInt(2);
var _3n2 = BigInt(3);
var _4n2 = BigInt(4);
function weierstrassPoints(opts) {
  const CURVE = validatePointOpts(opts);
  const { Fp: Fp2 } = CURVE;
  const Fn4 = Field(CURVE.n, CURVE.nBitLength);
  const toBytes5 = CURVE.toBytes || ((_c, point, _isCompressed) => {
    const a3 = point.toAffine();
    return concatBytes2(Uint8Array.from([4]), Fp2.toBytes(a3.x), Fp2.toBytes(a3.y));
  });
  const fromBytes4 = CURVE.fromBytes || ((bytes) => {
    const tail = bytes.subarray(1);
    const x8 = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
    const y7 = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
    return { x: x8, y: y7 };
  });
  function weierstrassEquation(x8) {
    const { a: a3, b: b5 } = CURVE;
    const x22 = Fp2.sqr(x8);
    const x32 = Fp2.mul(x22, x8);
    return Fp2.add(Fp2.add(x32, Fp2.mul(x8, a3)), b5);
  }
  function isValidXY(x8, y7) {
    const left = Fp2.sqr(y7);
    const right = weierstrassEquation(x8);
    return Fp2.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp2.mul(Fp2.pow(CURVE.a, _3n2), _4n2);
  const _27b2 = Fp2.mul(Fp2.sqr(CURVE.b), BigInt(27));
  if (Fp2.is0(Fp2.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function isWithinCurveOrder(num) {
    return inRange(num, _1n5, CURVE.n);
  }
  function normPrivateKeyToScalar(key) {
    const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N11 } = CURVE;
    if (lengths && typeof key !== "bigint") {
      if (isBytes2(key))
        key = bytesToHex2(key);
      if (typeof key !== "string" || !lengths.includes(key.length))
        throw new Error("invalid private key");
      key = key.padStart(nByteLength * 2, "0");
    }
    let num;
    try {
      num = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
    } catch (error) {
      throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
    }
    if (wrapPrivateKey)
      num = mod(num, N11);
    aInRange("private key", num, _1n5, N11);
    return num;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ProjectivePoint expected");
  }
  const toAffineMemo = memoized((p5, iz) => {
    const { px: x8, py: y7, pz: z5 } = p5;
    if (Fp2.eql(z5, Fp2.ONE))
      return { x: x8, y: y7 };
    const is0 = p5.is0();
    if (iz == null)
      iz = is0 ? Fp2.ONE : Fp2.inv(z5);
    const ax = Fp2.mul(x8, iz);
    const ay = Fp2.mul(y7, iz);
    const zz = Fp2.mul(z5, iz);
    if (is0)
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    if (!Fp2.eql(zz, Fp2.ONE))
      throw new Error("invZ was invalid");
    return { x: ax, y: ay };
  });
  const assertValidMemo = memoized((p5) => {
    if (p5.is0()) {
      if (CURVE.allowInfinityPoint && !Fp2.is0(p5.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: x8, y: y7 } = p5.toAffine();
    if (!Fp2.isValid(x8) || !Fp2.isValid(y7))
      throw new Error("bad point: x or y not FE");
    if (!isValidXY(x8, y7))
      throw new Error("bad point: equation left != right");
    if (!p5.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  class Point {
    constructor(px, py, pz) {
      if (px == null || !Fp2.isValid(px))
        throw new Error("x required");
      if (py == null || !Fp2.isValid(py) || Fp2.is0(py))
        throw new Error("y required");
      if (pz == null || !Fp2.isValid(pz))
        throw new Error("z required");
      this.px = px;
      this.py = py;
      this.pz = pz;
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(p5) {
      const { x: x8, y: y7 } = p5 || {};
      if (!p5 || !Fp2.isValid(x8) || !Fp2.isValid(y7))
        throw new Error("invalid affine point");
      if (p5 instanceof Point)
        throw new Error("projective point not allowed");
      const is0 = (i3) => Fp2.eql(i3, Fp2.ZERO);
      if (is0(x8) && is0(y7))
        return Point.ZERO;
      return new Point(x8, y7, Fp2.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(points) {
      const toInv = FpInvertBatch(Fp2, points.map((p5) => p5.pz));
      return points.map((p5, i3) => p5.toAffine(toInv[i3])).map(Point.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(hex) {
      const P6 = Point.fromAffine(fromBytes4(ensureBytes("pointHex", hex)));
      P6.assertValidity();
      return P6;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(privateKey) {
      return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
    }
    // Multiscalar Multiplication
    static msm(points, scalars) {
      return pippenger(Point, Fn4, points, scalars);
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      wnaf.setWindowSize(this, windowSize);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y: y7 } = this.toAffine();
      if (Fp2.isOdd)
        return !Fp2.isOdd(y7);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(other) {
      aprjpoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X22, py: Y22, pz: Z22 } = other;
      const U1 = Fp2.eql(Fp2.mul(X1, Z22), Fp2.mul(X22, Z1));
      const U22 = Fp2.eql(Fp2.mul(Y1, Z22), Fp2.mul(Y22, Z1));
      return U1 && U22;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new Point(this.px, Fp2.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: a3, b: b5 } = CURVE;
      const b32 = Fp2.mul(b5, _3n2);
      const { px: X1, py: Y1, pz: Z1 } = this;
      let X3 = Fp2.ZERO, Y32 = Fp2.ZERO, Z32 = Fp2.ZERO;
      let t0 = Fp2.mul(X1, X1);
      let t1 = Fp2.mul(Y1, Y1);
      let t2 = Fp2.mul(Z1, Z1);
      let t3 = Fp2.mul(X1, Y1);
      t3 = Fp2.add(t3, t3);
      Z32 = Fp2.mul(X1, Z1);
      Z32 = Fp2.add(Z32, Z32);
      X3 = Fp2.mul(a3, Z32);
      Y32 = Fp2.mul(b32, t2);
      Y32 = Fp2.add(X3, Y32);
      X3 = Fp2.sub(t1, Y32);
      Y32 = Fp2.add(t1, Y32);
      Y32 = Fp2.mul(X3, Y32);
      X3 = Fp2.mul(t3, X3);
      Z32 = Fp2.mul(b32, Z32);
      t2 = Fp2.mul(a3, t2);
      t3 = Fp2.sub(t0, t2);
      t3 = Fp2.mul(a3, t3);
      t3 = Fp2.add(t3, Z32);
      Z32 = Fp2.add(t0, t0);
      t0 = Fp2.add(Z32, t0);
      t0 = Fp2.add(t0, t2);
      t0 = Fp2.mul(t0, t3);
      Y32 = Fp2.add(Y32, t0);
      t2 = Fp2.mul(Y1, Z1);
      t2 = Fp2.add(t2, t2);
      t0 = Fp2.mul(t2, t3);
      X3 = Fp2.sub(X3, t0);
      Z32 = Fp2.mul(t2, t1);
      Z32 = Fp2.add(Z32, Z32);
      Z32 = Fp2.add(Z32, Z32);
      return new Point(X3, Y32, Z32);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X22, py: Y22, pz: Z22 } = other;
      let X3 = Fp2.ZERO, Y32 = Fp2.ZERO, Z32 = Fp2.ZERO;
      const a3 = CURVE.a;
      const b32 = Fp2.mul(CURVE.b, _3n2);
      let t0 = Fp2.mul(X1, X22);
      let t1 = Fp2.mul(Y1, Y22);
      let t2 = Fp2.mul(Z1, Z22);
      let t3 = Fp2.add(X1, Y1);
      let t4 = Fp2.add(X22, Y22);
      t3 = Fp2.mul(t3, t4);
      t4 = Fp2.add(t0, t1);
      t3 = Fp2.sub(t3, t4);
      t4 = Fp2.add(X1, Z1);
      let t5 = Fp2.add(X22, Z22);
      t4 = Fp2.mul(t4, t5);
      t5 = Fp2.add(t0, t2);
      t4 = Fp2.sub(t4, t5);
      t5 = Fp2.add(Y1, Z1);
      X3 = Fp2.add(Y22, Z22);
      t5 = Fp2.mul(t5, X3);
      X3 = Fp2.add(t1, t2);
      t5 = Fp2.sub(t5, X3);
      Z32 = Fp2.mul(a3, t4);
      X3 = Fp2.mul(b32, t2);
      Z32 = Fp2.add(X3, Z32);
      X3 = Fp2.sub(t1, Z32);
      Z32 = Fp2.add(t1, Z32);
      Y32 = Fp2.mul(X3, Z32);
      t1 = Fp2.add(t0, t0);
      t1 = Fp2.add(t1, t0);
      t2 = Fp2.mul(a3, t2);
      t4 = Fp2.mul(b32, t4);
      t1 = Fp2.add(t1, t2);
      t2 = Fp2.sub(t0, t2);
      t2 = Fp2.mul(a3, t2);
      t4 = Fp2.add(t4, t2);
      t0 = Fp2.mul(t1, t4);
      Y32 = Fp2.add(Y32, t0);
      t0 = Fp2.mul(t5, t4);
      X3 = Fp2.mul(t3, X3);
      X3 = Fp2.sub(X3, t0);
      t0 = Fp2.mul(t3, t1);
      Z32 = Fp2.mul(t5, Z32);
      Z32 = Fp2.add(Z32, t0);
      return new Point(X3, Y32, Z32);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    wNAF(n4) {
      return wnaf.wNAFCached(this, n4, Point.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2, n: N11 } = CURVE;
      aInRange("scalar", sc, _0n5, N11);
      const I3 = Point.ZERO;
      if (sc === _0n5)
        return I3;
      if (this.is0() || sc === _1n5)
        return this;
      if (!endo2 || wnaf.hasPrecomputes(this))
        return wnaf.wNAFCachedUnsafe(this, sc, Point.normalizeZ);
      let { k1neg, k1, k2neg, k2: k22 } = endo2.splitScalar(sc);
      let k1p = I3;
      let k2p = I3;
      let d5 = this;
      while (k1 > _0n5 || k22 > _0n5) {
        if (k1 & _1n5)
          k1p = k1p.add(d5);
        if (k22 & _1n5)
          k2p = k2p.add(d5);
        d5 = d5.double();
        k1 >>= _1n5;
        k22 >>= _1n5;
      }
      if (k1neg)
        k1p = k1p.negate();
      if (k2neg)
        k2p = k2p.negate();
      k2p = new Point(Fp2.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
      return k1p.add(k2p);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2, n: N11 } = CURVE;
      aInRange("scalar", scalar, _1n5, N11);
      let point, fake;
      if (endo2) {
        const { k1neg, k1, k2neg, k2: k22 } = endo2.splitScalar(scalar);
        let { p: k1p, f: f1p } = this.wNAF(k1);
        let { p: k2p, f: f2p } = this.wNAF(k22);
        k1p = wnaf.constTimeNegate(k1neg, k1p);
        k2p = wnaf.constTimeNegate(k2neg, k2p);
        k2p = new Point(Fp2.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
        point = k1p.add(k2p);
        fake = f1p.add(f2p);
      } else {
        const { p: p5, f: f3 } = this.wNAF(scalar);
        point = p5;
        fake = f3;
      }
      return Point.normalizeZ([point, fake])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(Q4, a3, b5) {
      const G5 = Point.BASE;
      const mul = (P6, a4) => a4 === _0n5 || a4 === _1n5 || !P6.equals(G5) ? P6.multiplyUnsafe(a4) : P6.multiply(a4);
      const sum = mul(this, a3).add(mul(Q4, b5));
      return sum.is0() ? void 0 : sum;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(iz) {
      return toAffineMemo(this, iz);
    }
    isTorsionFree() {
      const { h: cofactor, isTorsionFree } = CURVE;
      if (cofactor === _1n5)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: cofactor, clearCofactor } = CURVE;
      if (cofactor === _1n5)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(CURVE.h);
    }
    toRawBytes(isCompressed = true) {
      abool("isCompressed", isCompressed);
      this.assertValidity();
      return toBytes5(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      abool("isCompressed", isCompressed);
      return bytesToHex2(this.toRawBytes(isCompressed));
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp2.ONE);
  Point.ZERO = new Point(Fp2.ZERO, Fp2.ONE, Fp2.ZERO);
  const { endo, nBitLength } = CURVE;
  const wnaf = wNAF(Point, endo ? Math.ceil(nBitLength / 2) : nBitLength);
  return {
    CURVE,
    ProjectivePoint: Point,
    normPrivateKeyToScalar,
    weierstrassEquation,
    isWithinCurveOrder
  };
}
function validateOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  });
  return Object.freeze({ lowS: true, ...opts });
}
function weierstrass(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { Fp: Fp2, n: CURVE_ORDER, nByteLength, nBitLength } = CURVE;
  const compressedLen = Fp2.BYTES + 1;
  const uncompressedLen = 2 * Fp2.BYTES + 1;
  function modN(a3) {
    return mod(a3, CURVE_ORDER);
  }
  function invN(a3) {
    return invert(a3, CURVE_ORDER);
  }
  const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
    ...CURVE,
    toBytes(_c, point, isCompressed) {
      const a3 = point.toAffine();
      const x8 = Fp2.toBytes(a3.x);
      const cat = concatBytes2;
      abool("isCompressed", isCompressed);
      if (isCompressed) {
        return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x8);
      } else {
        return cat(Uint8Array.from([4]), x8, Fp2.toBytes(a3.y));
      }
    },
    fromBytes(bytes) {
      const len = bytes.length;
      const head = bytes[0];
      const tail = bytes.subarray(1);
      if (len === compressedLen && (head === 2 || head === 3)) {
        const x8 = bytesToNumberBE(tail);
        if (!inRange(x8, _1n5, Fp2.ORDER))
          throw new Error("Point is not on curve");
        const y22 = weierstrassEquation(x8);
        let y7;
        try {
          y7 = Fp2.sqrt(y22);
        } catch (sqrtError) {
          const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
          throw new Error("Point is not on curve" + suffix);
        }
        const isYOdd = (y7 & _1n5) === _1n5;
        const isHeadOdd = (head & 1) === 1;
        if (isHeadOdd !== isYOdd)
          y7 = Fp2.neg(y7);
        return { x: x8, y: y7 };
      } else if (len === uncompressedLen && head === 4) {
        const x8 = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
        const y7 = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
        return { x: x8, y: y7 };
      } else {
        const cl = compressedLen;
        const ul = uncompressedLen;
        throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
      }
    }
  });
  function isBiggerThanHalfOrder(number) {
    const HALF = CURVE_ORDER >> _1n5;
    return number > HALF;
  }
  function normalizeS(s2) {
    return isBiggerThanHalfOrder(s2) ? modN(-s2) : s2;
  }
  const slcNum = (b5, from8, to3) => bytesToNumberBE(b5.slice(from8, to3));
  class Signature {
    constructor(r3, s2, recovery) {
      aInRange("r", r3, _1n5, CURVE_ORDER);
      aInRange("s", s2, _1n5, CURVE_ORDER);
      this.r = r3;
      this.s = s2;
      if (recovery != null)
        this.recovery = recovery;
      Object.freeze(this);
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(hex) {
      const l5 = nByteLength;
      hex = ensureBytes("compactSignature", hex, l5 * 2);
      return new Signature(slcNum(hex, 0, l5), slcNum(hex, l5, 2 * l5));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(hex) {
      const { r: r3, s: s2 } = DER.toSig(ensureBytes("DER", hex));
      return new Signature(r3, s2);
    }
    /**
     * @todo remove
     * @deprecated
     */
    assertValidity() {
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(msgHash) {
      const { r: r3, s: s2, recovery: rec } = this;
      const h4 = bits2int_modN(ensureBytes("msgHash", msgHash));
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const radj = rec === 2 || rec === 3 ? r3 + CURVE.n : r3;
      if (radj >= Fp2.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const prefix = (rec & 1) === 0 ? "02" : "03";
      const R4 = Point.fromHex(prefix + numToSizedHex(radj, Fp2.BYTES));
      const ir3 = invN(radj);
      const u1 = modN(-h4 * ir3);
      const u22 = modN(s2 * ir3);
      const Q4 = Point.BASE.multiplyAndAddUnsafe(R4, u1, u22);
      if (!Q4)
        throw new Error("point at infinify");
      Q4.assertValidity();
      return Q4;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return hexToBytes2(this.toDERHex());
    }
    toDERHex() {
      return DER.hexFromSig(this);
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return hexToBytes2(this.toCompactHex());
    }
    toCompactHex() {
      const l5 = nByteLength;
      return numToSizedHex(this.r, l5) + numToSizedHex(this.s, l5);
    }
  }
  const utils = {
    isValidPrivateKey(privateKey) {
      try {
        normPrivateKeyToScalar(privateKey);
        return true;
      } catch (error) {
        return false;
      }
    },
    normPrivateKeyToScalar,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const length2 = getMinHashLength(CURVE.n);
      return mapHashToField(CURVE.randomBytes(length2), CURVE.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(windowSize = 8, point = Point.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  function getPublicKey2(privateKey, isCompressed = true) {
    return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
  }
  function isProbPub(item) {
    if (typeof item === "bigint")
      return false;
    if (item instanceof Point)
      return true;
    const arr = ensureBytes("key", item);
    const len = arr.length;
    const fpl = Fp2.BYTES;
    const compLen = fpl + 1;
    const uncompLen = 2 * fpl + 1;
    if (CURVE.allowedPrivateKeyLengths || nByteLength === compLen) {
      return void 0;
    } else {
      return len === compLen || len === uncompLen;
    }
  }
  function getSharedSecret2(privateA, publicB, isCompressed = true) {
    if (isProbPub(privateA) === true)
      throw new Error("first arg must be private key");
    if (isProbPub(publicB) === false)
      throw new Error("second arg must be public key");
    const b5 = Point.fromHex(publicB);
    return b5.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
  }
  const bits2int = CURVE.bits2int || function(bytes) {
    if (bytes.length > 8192)
      throw new Error("input is too large");
    const num = bytesToNumberBE(bytes);
    const delta = bytes.length * 8 - nBitLength;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
    return modN(bits2int(bytes));
  };
  const ORDER_MASK = bitMask(nBitLength);
  function int2octets(num) {
    aInRange("num < 2^" + nBitLength, num, _0n5, ORDER_MASK);
    return numberToBytesBE(num, nByteLength);
  }
  function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
    if (["recovered", "canonical"].some((k6) => k6 in opts))
      throw new Error("sign() legacy options not supported");
    const { hash, randomBytes: randomBytes2 } = CURVE;
    let { lowS, prehash, extraEntropy: ent } = opts;
    if (lowS == null)
      lowS = true;
    msgHash = ensureBytes("msgHash", msgHash);
    validateSigVerOpts(opts);
    if (prehash)
      msgHash = ensureBytes("prehashed msgHash", hash(msgHash));
    const h1int = bits2int_modN(msgHash);
    const d5 = normPrivateKeyToScalar(privateKey);
    const seedArgs = [int2octets(d5), int2octets(h1int)];
    if (ent != null && ent !== false) {
      const e2 = ent === true ? randomBytes2(Fp2.BYTES) : ent;
      seedArgs.push(ensureBytes("extraEntropy", e2));
    }
    const seed = concatBytes2(...seedArgs);
    const m3 = h1int;
    function k2sig(kBytes) {
      const k6 = bits2int(kBytes);
      if (!isWithinCurveOrder(k6))
        return;
      const ik = invN(k6);
      const q4 = Point.BASE.multiply(k6).toAffine();
      const r3 = modN(q4.x);
      if (r3 === _0n5)
        return;
      const s2 = modN(ik * modN(m3 + r3 * d5));
      if (s2 === _0n5)
        return;
      let recovery = (q4.x === r3 ? 0 : 2) | Number(q4.y & _1n5);
      let normS = s2;
      if (lowS && isBiggerThanHalfOrder(s2)) {
        normS = normalizeS(s2);
        recovery ^= 1;
      }
      return new Signature(r3, normS, recovery);
    }
    return { seed, k2sig };
  }
  const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
  const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
  function sign2(msgHash, privKey, opts = defaultSigOpts) {
    const { seed, k2sig } = prepSig(msgHash, privKey, opts);
    const C4 = CURVE;
    const drbg = createHmacDrbg(C4.hash.outputLen, C4.nByteLength, C4.hmac);
    return drbg(seed, k2sig);
  }
  Point.BASE._setWindowSize(8);
  function verify2(signature, msgHash, publicKey, opts = defaultVerOpts) {
    const sg = signature;
    msgHash = ensureBytes("msgHash", msgHash);
    publicKey = ensureBytes("publicKey", publicKey);
    const { lowS, prehash, format } = opts;
    validateSigVerOpts(opts);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    if (format !== void 0 && format !== "compact" && format !== "der")
      throw new Error("format must be compact or der");
    const isHex = typeof sg === "string" || isBytes2(sg);
    const isObj = !isHex && !format && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
    if (!isHex && !isObj)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let _sig = void 0;
    let P6;
    try {
      if (isObj)
        _sig = new Signature(sg.r, sg.s);
      if (isHex) {
        try {
          if (format !== "compact")
            _sig = Signature.fromDER(sg);
        } catch (derError) {
          if (!(derError instanceof DER.Err))
            throw derError;
        }
        if (!_sig && format !== "der")
          _sig = Signature.fromCompact(sg);
      }
      P6 = Point.fromHex(publicKey);
    } catch (error) {
      return false;
    }
    if (!_sig)
      return false;
    if (lowS && _sig.hasHighS())
      return false;
    if (prehash)
      msgHash = CURVE.hash(msgHash);
    const { r: r3, s: s2 } = _sig;
    const h4 = bits2int_modN(msgHash);
    const is = invN(s2);
    const u1 = modN(h4 * is);
    const u22 = modN(r3 * is);
    const R4 = Point.BASE.multiplyAndAddUnsafe(P6, u1, u22)?.toAffine();
    if (!R4)
      return false;
    const v9 = modN(R4.x);
    return v9 === r3;
  }
  return {
    CURVE,
    getPublicKey: getPublicKey2,
    getSharedSecret: getSharedSecret2,
    sign: sign2,
    verify: verify2,
    ProjectivePoint: Point,
    Signature,
    utils
  };
}

// node_modules/@walletconnect/utils/node_modules/ox/node_modules/@noble/curves/esm/_shortw_utils.js
function getHash(hash) {
  return {
    hash,
    hmac: (key, ...msgs) => hmac(hash, key, concatBytes(...msgs)),
    randomBytes
  };
}
function createCurve(curveDef, defHash) {
  const create2 = (hash) => weierstrass({ ...curveDef, ...getHash(hash) });
  return { ...create2(defHash), create: create2 };
}

// node_modules/@walletconnect/utils/node_modules/ox/node_modules/@noble/curves/esm/secp256k1.js
var secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
var secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var _0n6 = BigInt(0);
var _1n6 = BigInt(1);
var _2n4 = BigInt(2);
var divNearest = (a3, b5) => (a3 + b5 / _2n4) / b5;
function sqrtMod(y7) {
  const P6 = secp256k1P;
  const _3n6 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
  const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
  const b22 = y7 * y7 * y7 % P6;
  const b32 = b22 * b22 * y7 % P6;
  const b6 = pow2(b32, _3n6, P6) * b32 % P6;
  const b9 = pow2(b6, _3n6, P6) * b32 % P6;
  const b11 = pow2(b9, _2n4, P6) * b22 % P6;
  const b222 = pow2(b11, _11n, P6) * b11 % P6;
  const b44 = pow2(b222, _22n, P6) * b222 % P6;
  const b88 = pow2(b44, _44n, P6) * b44 % P6;
  const b176 = pow2(b88, _88n, P6) * b88 % P6;
  const b220 = pow2(b176, _44n, P6) * b44 % P6;
  const b223 = pow2(b220, _3n6, P6) * b32 % P6;
  const t1 = pow2(b223, _23n, P6) * b222 % P6;
  const t2 = pow2(t1, _6n, P6) * b22 % P6;
  const root = pow2(t2, _2n4, P6);
  if (!Fpk1.eql(Fpk1.sqr(root), y7))
    throw new Error("Cannot find square root");
  return root;
}
var Fpk1 = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
var secp256k1 = createCurve({
  a: _0n6,
  b: BigInt(7),
  Fp: Fpk1,
  n: secp256k1N,
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  lowS: true,
  // Allow only low-S signatures by default in sign() and verify()
  endo: {
    // Endomorphism, see above
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (k6) => {
      const n4 = secp256k1N;
      const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
      const b1 = -_1n6 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
      const a22 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
      const b22 = a1;
      const POW_2_128 = BigInt("0x100000000000000000000000000000000");
      const c1 = divNearest(b22 * k6, n4);
      const c22 = divNearest(-b1 * k6, n4);
      let k1 = mod(k6 - c1 * a1 - c22 * a22, n4);
      let k22 = mod(-c1 * b1 - c22 * b22, n4);
      const k1neg = k1 > POW_2_128;
      const k2neg = k22 > POW_2_128;
      if (k1neg)
        k1 = n4 - k1;
      if (k2neg)
        k22 = n4 - k22;
      if (k1 > POW_2_128 || k22 > POW_2_128) {
        throw new Error("splitScalar: Endomorphism failed, k=" + k6);
      }
      return { k1neg, k1, k2neg, k2: k22 };
    }
  }
}, sha2562);

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Signature.js
function assert5(signature, options = {}) {
  const { recovered } = options;
  if (typeof signature.r === "undefined")
    throw new MissingPropertiesError({ signature });
  if (typeof signature.s === "undefined")
    throw new MissingPropertiesError({ signature });
  if (recovered && typeof signature.yParity === "undefined")
    throw new MissingPropertiesError({ signature });
  if (signature.r < 0n || signature.r > maxUint256)
    throw new InvalidRError({ value: signature.r });
  if (signature.s < 0n || signature.s > maxUint256)
    throw new InvalidSError({ value: signature.s });
  if (typeof signature.yParity === "number" && signature.yParity !== 0 && signature.yParity !== 1)
    throw new InvalidYParityError({ value: signature.yParity });
}
function fromBytes3(signature) {
  return fromHex3(fromBytes(signature));
}
function fromHex3(signature) {
  if (signature.length !== 130 && signature.length !== 132)
    throw new InvalidSerializedSizeError2({ signature });
  const r3 = BigInt(slice(signature, 0, 32));
  const s2 = BigInt(slice(signature, 32, 64));
  const yParity = (() => {
    const yParity2 = Number(`0x${signature.slice(130)}`);
    if (Number.isNaN(yParity2))
      return void 0;
    try {
      return vToYParity(yParity2);
    } catch {
      throw new InvalidYParityError({ value: yParity2 });
    }
  })();
  if (typeof yParity === "undefined")
    return {
      r: r3,
      s: s2
    };
  return {
    r: r3,
    s: s2,
    yParity
  };
}
function extract(value) {
  if (typeof value.r === "undefined")
    return void 0;
  if (typeof value.s === "undefined")
    return void 0;
  return from7(value);
}
function from7(signature) {
  const signature_ = (() => {
    if (typeof signature === "string")
      return fromHex3(signature);
    if (signature instanceof Uint8Array)
      return fromBytes3(signature);
    if (typeof signature.r === "string")
      return fromRpc(signature);
    if (signature.v)
      return fromLegacy(signature);
    return {
      r: signature.r,
      s: signature.s,
      ...typeof signature.yParity !== "undefined" ? { yParity: signature.yParity } : {}
    };
  })();
  assert5(signature_);
  return signature_;
}
function fromDerBytes(signature) {
  return fromDerHex(fromBytes(signature));
}
function fromDerHex(signature) {
  const { r: r3, s: s2 } = secp256k1.Signature.fromDER(from3(signature).slice(2));
  return { r: r3, s: s2 };
}
function fromLegacy(signature) {
  return {
    r: signature.r,
    s: signature.s,
    yParity: vToYParity(signature.v)
  };
}
function fromRpc(signature) {
  const yParity = (() => {
    const v9 = signature.v ? Number(signature.v) : void 0;
    let yParity2 = signature.yParity ? Number(signature.yParity) : void 0;
    if (typeof v9 === "number" && typeof yParity2 !== "number")
      yParity2 = vToYParity(v9);
    if (typeof yParity2 !== "number")
      throw new InvalidYParityError({ value: signature.yParity });
    return yParity2;
  })();
  return {
    r: BigInt(signature.r),
    s: BigInt(signature.s),
    yParity
  };
}
function fromTuple(tuple) {
  const [yParity, r3, s2] = tuple;
  return from7({
    r: r3 === "0x" ? 0n : BigInt(r3),
    s: s2 === "0x" ? 0n : BigInt(s2),
    yParity: yParity === "0x" ? 0 : Number(yParity)
  });
}
function toBytes3(signature) {
  return fromHex(toHex2(signature));
}
function toHex2(signature) {
  assert5(signature);
  const r3 = signature.r;
  const s2 = signature.s;
  const signature_ = concat(
    fromNumber(r3, { size: 32 }),
    fromNumber(s2, { size: 32 }),
    // If the signature is recovered, add the recovery byte to the signature.
    typeof signature.yParity === "number" ? fromNumber(yParityToV(signature.yParity), { size: 1 }) : "0x"
  );
  return signature_;
}
function toDerBytes(signature) {
  const sig = new secp256k1.Signature(signature.r, signature.s);
  return sig.toDERRawBytes();
}
function toDerHex(signature) {
  const sig = new secp256k1.Signature(signature.r, signature.s);
  return `0x${sig.toDERHex()}`;
}
function toLegacy(signature) {
  return {
    r: signature.r,
    s: signature.s,
    v: yParityToV(signature.yParity)
  };
}
function toRpc(signature) {
  const { r: r3, s: s2, yParity } = signature;
  return {
    r: fromNumber(r3, { size: 32 }),
    s: fromNumber(s2, { size: 32 }),
    yParity: yParity === 0 ? "0x0" : "0x1"
  };
}
function toTuple(signature) {
  const { r: r3, s: s2, yParity } = signature;
  return [
    yParity ? "0x01" : "0x",
    r3 === 0n ? "0x" : trimLeft(fromNumber(r3)),
    s2 === 0n ? "0x" : trimLeft(fromNumber(s2))
  ];
}
function validate3(signature, options = {}) {
  try {
    assert5(signature, options);
    return true;
  } catch {
    return false;
  }
}
function vToYParity(v9) {
  if (v9 === 0 || v9 === 27)
    return 0;
  if (v9 === 1 || v9 === 28)
    return 1;
  if (v9 >= 35)
    return v9 % 2 === 0 ? 1 : 0;
  throw new InvalidVError({ value: v9 });
}
function yParityToV(yParity) {
  if (yParity === 0)
    return 27;
  if (yParity === 1)
    return 28;
  throw new InvalidYParityError({ value: yParity });
}
var InvalidSerializedSizeError2 = class extends BaseError {
  constructor({ signature }) {
    super(`Value \`${signature}\` is an invalid signature size.`, {
      metaMessages: [
        "Expected: 64 bytes or 65 bytes.",
        `Received ${size2(from3(signature))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSerializedSizeError"
    });
  }
};
var MissingPropertiesError = class extends BaseError {
  constructor({ signature }) {
    super(`Signature \`${stringify2(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.MissingPropertiesError"
    });
  }
};
var InvalidRError = class extends BaseError {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidRError"
    });
  }
};
var InvalidSError = class extends BaseError {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSError"
    });
  }
};
var InvalidYParityError = class extends BaseError {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidYParityError"
    });
  }
};
var InvalidVError = class extends BaseError {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidVError"
    });
  }
};

// node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/_blake.js
var BSIGMA = /* @__PURE__ */ Uint8Array.from([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9,
  12,
  5,
  1,
  15,
  14,
  13,
  4,
  10,
  0,
  7,
  6,
  3,
  9,
  2,
  8,
  11,
  13,
  11,
  7,
  14,
  12,
  1,
  3,
  9,
  5,
  0,
  15,
  4,
  8,
  6,
  2,
  10,
  6,
  15,
  14,
  9,
  11,
  3,
  0,
  8,
  12,
  2,
  13,
  7,
  1,
  4,
  10,
  5,
  10,
  2,
  8,
  4,
  7,
  6,
  1,
  5,
  15,
  11,
  9,
  14,
  3,
  12,
  13,
  0,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  // Blake1, unused in others
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9
]);

// node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/blake2.js
var B2B_IV = /* @__PURE__ */ Uint32Array.from([
  4089235720,
  1779033703,
  2227873595,
  3144134277,
  4271175723,
  1013904242,
  1595750129,
  2773480762,
  2917565137,
  1359893119,
  725511199,
  2600822924,
  4215389547,
  528734635,
  327033209,
  1541459225
]);
var BBUF = /* @__PURE__ */ new Uint32Array(32);
function G1b(a3, b5, c5, d5, msg, x8) {
  const Xl = msg[x8], Xh = msg[x8 + 1];
  let Al = BBUF[2 * a3], Ah = BBUF[2 * a3 + 1];
  let Bl = BBUF[2 * b5], Bh = BBUF[2 * b5 + 1];
  let Cl = BBUF[2 * c5], Ch = BBUF[2 * c5 + 1];
  let Dl = BBUF[2 * d5], Dh = BBUF[2 * d5 + 1];
  let ll = add3L(Al, Bl, Xl);
  Ah = add3H(ll, Ah, Bh, Xh);
  Al = ll | 0;
  ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
  ({ Dh, Dl } = { Dh: rotr32H(Dh, Dl), Dl: rotr32L(Dh, Dl) });
  ({ h: Ch, l: Cl } = add(Ch, Cl, Dh, Dl));
  ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
  ({ Bh, Bl } = { Bh: rotrSH(Bh, Bl, 24), Bl: rotrSL(Bh, Bl, 24) });
  BBUF[2 * a3] = Al, BBUF[2 * a3 + 1] = Ah;
  BBUF[2 * b5] = Bl, BBUF[2 * b5 + 1] = Bh;
  BBUF[2 * c5] = Cl, BBUF[2 * c5 + 1] = Ch;
  BBUF[2 * d5] = Dl, BBUF[2 * d5 + 1] = Dh;
}
function G2b(a3, b5, c5, d5, msg, x8) {
  const Xl = msg[x8], Xh = msg[x8 + 1];
  let Al = BBUF[2 * a3], Ah = BBUF[2 * a3 + 1];
  let Bl = BBUF[2 * b5], Bh = BBUF[2 * b5 + 1];
  let Cl = BBUF[2 * c5], Ch = BBUF[2 * c5 + 1];
  let Dl = BBUF[2 * d5], Dh = BBUF[2 * d5 + 1];
  let ll = add3L(Al, Bl, Xl);
  Ah = add3H(ll, Ah, Bh, Xh);
  Al = ll | 0;
  ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
  ({ Dh, Dl } = { Dh: rotrSH(Dh, Dl, 16), Dl: rotrSL(Dh, Dl, 16) });
  ({ h: Ch, l: Cl } = add(Ch, Cl, Dh, Dl));
  ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
  ({ Bh, Bl } = { Bh: rotrBH(Bh, Bl, 63), Bl: rotrBL(Bh, Bl, 63) });
  BBUF[2 * a3] = Al, BBUF[2 * a3 + 1] = Ah;
  BBUF[2 * b5] = Bl, BBUF[2 * b5 + 1] = Bh;
  BBUF[2 * c5] = Cl, BBUF[2 * c5 + 1] = Ch;
  BBUF[2 * d5] = Dl, BBUF[2 * d5 + 1] = Dh;
}
function checkBlake2Opts(outputLen, opts = {}, keyLen, saltLen, persLen) {
  anumber(keyLen);
  if (outputLen < 0 || outputLen > keyLen)
    throw new Error("outputLen bigger than keyLen");
  const { key, salt, personalization } = opts;
  if (key !== void 0 && (key.length < 1 || key.length > keyLen))
    throw new Error("key length must be undefined or 1.." + keyLen);
  if (salt !== void 0 && salt.length !== saltLen)
    throw new Error("salt must be undefined or " + saltLen);
  if (personalization !== void 0 && personalization.length !== persLen)
    throw new Error("personalization must be undefined or " + persLen);
}
var BLAKE2 = class extends Hash {
  constructor(blockLen, outputLen) {
    super();
    this.finished = false;
    this.destroyed = false;
    this.length = 0;
    this.pos = 0;
    anumber(blockLen);
    anumber(outputLen);
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.buffer = new Uint8Array(blockLen);
    this.buffer32 = u32(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { blockLen, buffer, buffer32 } = this;
    const len = data.length;
    const offset = data.byteOffset;
    const buf = data.buffer;
    for (let pos = 0; pos < len; ) {
      if (this.pos === blockLen) {
        swap32IfBE(buffer32);
        this.compress(buffer32, 0, false);
        swap32IfBE(buffer32);
        this.pos = 0;
      }
      const take = Math.min(blockLen - this.pos, len - pos);
      const dataOffset = offset + pos;
      if (take === blockLen && !(dataOffset % 4) && pos + take < len) {
        const data32 = new Uint32Array(buf, dataOffset, Math.floor((len - pos) / 4));
        swap32IfBE(data32);
        for (let pos32 = 0; pos + blockLen < len; pos32 += buffer32.length, pos += blockLen) {
          this.length += blockLen;
          this.compress(data32, pos32, false);
        }
        swap32IfBE(data32);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      this.length += take;
      pos += take;
    }
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    const { pos, buffer32 } = this;
    this.finished = true;
    clean(this.buffer.subarray(pos));
    swap32IfBE(buffer32);
    this.compress(buffer32, 0, true);
    swap32IfBE(buffer32);
    const out32 = u32(out);
    this.get().forEach((v9, i3) => out32[i3] = swap8IfBE(v9));
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to3) {
    const { buffer, length: length2, finished, destroyed, outputLen, pos } = this;
    to3 || (to3 = new this.constructor({ dkLen: outputLen }));
    to3.set(...this.get());
    to3.buffer.set(buffer);
    to3.destroyed = destroyed;
    to3.finished = finished;
    to3.length = length2;
    to3.pos = pos;
    to3.outputLen = outputLen;
    return to3;
  }
  clone() {
    return this._cloneInto();
  }
};
var BLAKE2b = class extends BLAKE2 {
  constructor(opts = {}) {
    const olen = opts.dkLen === void 0 ? 64 : opts.dkLen;
    super(128, olen);
    this.v0l = B2B_IV[0] | 0;
    this.v0h = B2B_IV[1] | 0;
    this.v1l = B2B_IV[2] | 0;
    this.v1h = B2B_IV[3] | 0;
    this.v2l = B2B_IV[4] | 0;
    this.v2h = B2B_IV[5] | 0;
    this.v3l = B2B_IV[6] | 0;
    this.v3h = B2B_IV[7] | 0;
    this.v4l = B2B_IV[8] | 0;
    this.v4h = B2B_IV[9] | 0;
    this.v5l = B2B_IV[10] | 0;
    this.v5h = B2B_IV[11] | 0;
    this.v6l = B2B_IV[12] | 0;
    this.v6h = B2B_IV[13] | 0;
    this.v7l = B2B_IV[14] | 0;
    this.v7h = B2B_IV[15] | 0;
    checkBlake2Opts(olen, opts, 64, 16, 16);
    let { key, personalization, salt } = opts;
    let keyLength = 0;
    if (key !== void 0) {
      key = toBytes(key);
      keyLength = key.length;
    }
    this.v0l ^= this.outputLen | keyLength << 8 | 1 << 16 | 1 << 24;
    if (salt !== void 0) {
      salt = toBytes(salt);
      const slt = u32(salt);
      this.v4l ^= swap8IfBE(slt[0]);
      this.v4h ^= swap8IfBE(slt[1]);
      this.v5l ^= swap8IfBE(slt[2]);
      this.v5h ^= swap8IfBE(slt[3]);
    }
    if (personalization !== void 0) {
      personalization = toBytes(personalization);
      const pers = u32(personalization);
      this.v6l ^= swap8IfBE(pers[0]);
      this.v6h ^= swap8IfBE(pers[1]);
      this.v7l ^= swap8IfBE(pers[2]);
      this.v7h ^= swap8IfBE(pers[3]);
    }
    if (key !== void 0) {
      const tmp = new Uint8Array(this.blockLen);
      tmp.set(key);
      this.update(tmp);
    }
  }
  // prettier-ignore
  get() {
    let { v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h } = this;
    return [v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h];
  }
  // prettier-ignore
  set(v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h) {
    this.v0l = v0l | 0;
    this.v0h = v0h | 0;
    this.v1l = v1l | 0;
    this.v1h = v1h | 0;
    this.v2l = v2l | 0;
    this.v2h = v2h | 0;
    this.v3l = v3l | 0;
    this.v3h = v3h | 0;
    this.v4l = v4l | 0;
    this.v4h = v4h | 0;
    this.v5l = v5l | 0;
    this.v5h = v5h | 0;
    this.v6l = v6l | 0;
    this.v6h = v6h | 0;
    this.v7l = v7l | 0;
    this.v7h = v7h | 0;
  }
  compress(msg, offset, isLast) {
    this.get().forEach((v9, i3) => BBUF[i3] = v9);
    BBUF.set(B2B_IV, 16);
    let { h: h4, l: l5 } = fromBig(BigInt(this.length));
    BBUF[24] = B2B_IV[8] ^ l5;
    BBUF[25] = B2B_IV[9] ^ h4;
    if (isLast) {
      BBUF[28] = ~BBUF[28];
      BBUF[29] = ~BBUF[29];
    }
    let j6 = 0;
    const s2 = BSIGMA;
    for (let i3 = 0; i3 < 12; i3++) {
      G1b(0, 4, 8, 12, msg, offset + 2 * s2[j6++]);
      G2b(0, 4, 8, 12, msg, offset + 2 * s2[j6++]);
      G1b(1, 5, 9, 13, msg, offset + 2 * s2[j6++]);
      G2b(1, 5, 9, 13, msg, offset + 2 * s2[j6++]);
      G1b(2, 6, 10, 14, msg, offset + 2 * s2[j6++]);
      G2b(2, 6, 10, 14, msg, offset + 2 * s2[j6++]);
      G1b(3, 7, 11, 15, msg, offset + 2 * s2[j6++]);
      G2b(3, 7, 11, 15, msg, offset + 2 * s2[j6++]);
      G1b(0, 5, 10, 15, msg, offset + 2 * s2[j6++]);
      G2b(0, 5, 10, 15, msg, offset + 2 * s2[j6++]);
      G1b(1, 6, 11, 12, msg, offset + 2 * s2[j6++]);
      G2b(1, 6, 11, 12, msg, offset + 2 * s2[j6++]);
      G1b(2, 7, 8, 13, msg, offset + 2 * s2[j6++]);
      G2b(2, 7, 8, 13, msg, offset + 2 * s2[j6++]);
      G1b(3, 4, 9, 14, msg, offset + 2 * s2[j6++]);
      G2b(3, 4, 9, 14, msg, offset + 2 * s2[j6++]);
    }
    this.v0l ^= BBUF[0] ^ BBUF[16];
    this.v0h ^= BBUF[1] ^ BBUF[17];
    this.v1l ^= BBUF[2] ^ BBUF[18];
    this.v1h ^= BBUF[3] ^ BBUF[19];
    this.v2l ^= BBUF[4] ^ BBUF[20];
    this.v2h ^= BBUF[5] ^ BBUF[21];
    this.v3l ^= BBUF[6] ^ BBUF[22];
    this.v3h ^= BBUF[7] ^ BBUF[23];
    this.v4l ^= BBUF[8] ^ BBUF[24];
    this.v4h ^= BBUF[9] ^ BBUF[25];
    this.v5l ^= BBUF[10] ^ BBUF[26];
    this.v5h ^= BBUF[11] ^ BBUF[27];
    this.v6l ^= BBUF[12] ^ BBUF[28];
    this.v6h ^= BBUF[13] ^ BBUF[29];
    this.v7l ^= BBUF[14] ^ BBUF[30];
    this.v7h ^= BBUF[15] ^ BBUF[31];
    clean(BBUF);
  }
  destroy() {
    this.destroyed = true;
    clean(this.buffer32);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var blake2b = /* @__PURE__ */ createOptHasher((opts) => new BLAKE2b(opts));

// node_modules/@scure/base/lib/esm/index.js
function isBytes3(a3) {
  return a3 instanceof Uint8Array || ArrayBuffer.isView(a3) && a3.constructor.name === "Uint8Array";
}
function isArrayOf(isString, arr) {
  if (!Array.isArray(arr))
    return false;
  if (arr.length === 0)
    return true;
  if (isString) {
    return arr.every((item) => typeof item === "string");
  } else {
    return arr.every((item) => Number.isSafeInteger(item));
  }
}
function astr(label, input) {
  if (typeof input !== "string")
    throw new Error(`${label}: string expected`);
  return true;
}
function anumber2(n4) {
  if (!Number.isSafeInteger(n4))
    throw new Error(`invalid integer: ${n4}`);
}
function aArr(input) {
  if (!Array.isArray(input))
    throw new Error("array expected");
}
function astrArr(label, input) {
  if (!isArrayOf(true, input))
    throw new Error(`${label}: array of strings expected`);
}
function anumArr(label, input) {
  if (!isArrayOf(false, input))
    throw new Error(`${label}: array of numbers expected`);
}
// @__NO_SIDE_EFFECTS__
function chain(...args) {
  const id = (a3) => a3;
  const wrap = (a3, b5) => (c5) => a3(b5(c5));
  const encode6 = args.map((x8) => x8.encode).reduceRight(wrap, id);
  const decode7 = args.map((x8) => x8.decode).reduce(wrap, id);
  return { encode: encode6, decode: decode7 };
}
// @__NO_SIDE_EFFECTS__
function alphabet2(letters) {
  const lettersA = typeof letters === "string" ? letters.split("") : letters;
  const len = lettersA.length;
  astrArr("alphabet", lettersA);
  const indexes = new Map(lettersA.map((l5, i3) => [l5, i3]));
  return {
    encode: (digits) => {
      aArr(digits);
      return digits.map((i3) => {
        if (!Number.isSafeInteger(i3) || i3 < 0 || i3 >= len)
          throw new Error(`alphabet.encode: digit index outside alphabet "${i3}". Allowed: ${letters}`);
        return lettersA[i3];
      });
    },
    decode: (input) => {
      aArr(input);
      return input.map((letter) => {
        astr("alphabet.decode", letter);
        const i3 = indexes.get(letter);
        if (i3 === void 0)
          throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
        return i3;
      });
    }
  };
}
// @__NO_SIDE_EFFECTS__
function join(separator = "") {
  astr("join", separator);
  return {
    encode: (from8) => {
      astrArr("join.decode", from8);
      return from8.join(separator);
    },
    decode: (to3) => {
      astr("join.decode", to3);
      return to3.split(separator);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function padding(bits, chr = "=") {
  anumber2(bits);
  astr("padding", chr);
  return {
    encode(data) {
      astrArr("padding.encode", data);
      while (data.length * bits % 8)
        data.push(chr);
      return data;
    },
    decode(input) {
      astrArr("padding.decode", input);
      let end = input.length;
      if (end * bits % 8)
        throw new Error("padding: invalid, string should have whole number of bytes");
      for (; end > 0 && input[end - 1] === chr; end--) {
        const last = end - 1;
        const byte = last * bits;
        if (byte % 8 === 0)
          throw new Error("padding: invalid, string has too much padding");
      }
      return input.slice(0, end);
    }
  };
}
function convertRadix(data, from8, to3) {
  if (from8 < 2)
    throw new Error(`convertRadix: invalid from=${from8}, base cannot be less than 2`);
  if (to3 < 2)
    throw new Error(`convertRadix: invalid to=${to3}, base cannot be less than 2`);
  aArr(data);
  if (!data.length)
    return [];
  let pos = 0;
  const res = [];
  const digits = Array.from(data, (d5) => {
    anumber2(d5);
    if (d5 < 0 || d5 >= from8)
      throw new Error(`invalid integer: ${d5}`);
    return d5;
  });
  const dlen = digits.length;
  while (true) {
    let carry = 0;
    let done = true;
    for (let i3 = pos; i3 < dlen; i3++) {
      const digit = digits[i3];
      const fromCarry = from8 * carry;
      const digitBase = fromCarry + digit;
      if (!Number.isSafeInteger(digitBase) || fromCarry / from8 !== carry || digitBase - digit !== fromCarry) {
        throw new Error("convertRadix: carry overflow");
      }
      const div = digitBase / to3;
      carry = digitBase % to3;
      const rounded = Math.floor(div);
      digits[i3] = rounded;
      if (!Number.isSafeInteger(rounded) || rounded * to3 + carry !== digitBase)
        throw new Error("convertRadix: carry overflow");
      if (!done)
        continue;
      else if (!rounded)
        pos = i3;
      else
        done = false;
    }
    res.push(carry);
    if (done)
      break;
  }
  for (let i3 = 0; i3 < data.length - 1 && data[i3] === 0; i3++)
    res.push(0);
  return res.reverse();
}
var gcd = (a3, b5) => b5 === 0 ? a3 : gcd(b5, a3 % b5);
var radix2carry = /* @__NO_SIDE_EFFECTS__ */ (from8, to3) => from8 + (to3 - gcd(from8, to3));
var powers = /* @__PURE__ */ (() => {
  let res = [];
  for (let i3 = 0; i3 < 40; i3++)
    res.push(2 ** i3);
  return res;
})();
function convertRadix2(data, from8, to3, padding2) {
  aArr(data);
  if (from8 <= 0 || from8 > 32)
    throw new Error(`convertRadix2: wrong from=${from8}`);
  if (to3 <= 0 || to3 > 32)
    throw new Error(`convertRadix2: wrong to=${to3}`);
  if (/* @__PURE__ */ radix2carry(from8, to3) > 32) {
    throw new Error(`convertRadix2: carry overflow from=${from8} to=${to3} carryBits=${/* @__PURE__ */ radix2carry(from8, to3)}`);
  }
  let carry = 0;
  let pos = 0;
  const max = powers[from8];
  const mask = powers[to3] - 1;
  const res = [];
  for (const n4 of data) {
    anumber2(n4);
    if (n4 >= max)
      throw new Error(`convertRadix2: invalid data word=${n4} from=${from8}`);
    carry = carry << from8 | n4;
    if (pos + from8 > 32)
      throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from8}`);
    pos += from8;
    for (; pos >= to3; pos -= to3)
      res.push((carry >> pos - to3 & mask) >>> 0);
    const pow = powers[pos];
    if (pow === void 0)
      throw new Error("invalid carry");
    carry &= pow - 1;
  }
  carry = carry << to3 - pos & mask;
  if (!padding2 && pos >= from8)
    throw new Error("Excess padding");
  if (!padding2 && carry > 0)
    throw new Error(`Non-zero padding: ${carry}`);
  if (padding2 && pos > 0)
    res.push(carry >>> 0);
  return res;
}
// @__NO_SIDE_EFFECTS__
function radix(num) {
  anumber2(num);
  const _256 = 2 ** 8;
  return {
    encode: (bytes) => {
      if (!isBytes3(bytes))
        throw new Error("radix.encode input should be Uint8Array");
      return convertRadix(Array.from(bytes), _256, num);
    },
    decode: (digits) => {
      anumArr("radix.decode", digits);
      return Uint8Array.from(convertRadix(digits, num, _256));
    }
  };
}
// @__NO_SIDE_EFFECTS__
function radix2(bits, revPadding = false) {
  anumber2(bits);
  if (bits <= 0 || bits > 32)
    throw new Error("radix2: bits should be in (0..32]");
  if (/* @__PURE__ */ radix2carry(8, bits) > 32 || /* @__PURE__ */ radix2carry(bits, 8) > 32)
    throw new Error("radix2: carry overflow");
  return {
    encode: (bytes) => {
      if (!isBytes3(bytes))
        throw new Error("radix2.encode input should be Uint8Array");
      return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
    },
    decode: (digits) => {
      anumArr("radix2.decode", digits);
      return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
    }
  };
}
var base322 = /* @__PURE__ */ chain(/* @__PURE__ */ radix2(5), /* @__PURE__ */ alphabet2("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), /* @__PURE__ */ padding(5), /* @__PURE__ */ join(""));
var genBase58 = /* @__NO_SIDE_EFFECTS__ */ (abc) => /* @__PURE__ */ chain(/* @__PURE__ */ radix(58), /* @__PURE__ */ alphabet2(abc), /* @__PURE__ */ join(""));
var base58 = /* @__PURE__ */ genBase58("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Secp256k1.js
var Secp256k1_exports = {};
__export(Secp256k1_exports, {
  createKeyPair: () => createKeyPair,
  getPublicKey: () => getPublicKey,
  getSharedSecret: () => getSharedSecret,
  noble: () => noble,
  randomPrivateKey: () => randomPrivateKey,
  recoverAddress: () => recoverAddress,
  recoverPublicKey: () => recoverPublicKey,
  sign: () => sign,
  verify: () => verify
});

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/internal/entropy.js
var extraEntropy = false;

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Secp256k1.js
var noble = secp256k1;
function createKeyPair(options = {}) {
  const { as = "Hex" } = options;
  const privateKey = randomPrivateKey({ as });
  const publicKey = getPublicKey({ privateKey });
  return {
    privateKey,
    publicKey
  };
}
function getPublicKey(options) {
  const { privateKey } = options;
  const point = secp256k1.ProjectivePoint.fromPrivateKey(from3(privateKey).slice(2));
  return from5(point);
}
function getSharedSecret(options) {
  const { as = "Hex", privateKey, publicKey } = options;
  const point = secp256k1.ProjectivePoint.fromHex(toHex(publicKey).slice(2));
  const sharedPoint = point.multiply(secp256k1.utils.normPrivateKeyToScalar(from3(privateKey).slice(2)));
  const sharedSecret = sharedPoint.toRawBytes(true);
  if (as === "Hex")
    return fromBytes(sharedSecret);
  return sharedSecret;
}
function randomPrivateKey(options = {}) {
  const { as = "Hex" } = options;
  const bytes = secp256k1.utils.randomPrivateKey();
  if (as === "Hex")
    return fromBytes(bytes);
  return bytes;
}
function recoverAddress(options) {
  return fromPublicKey(recoverPublicKey(options));
}
function recoverPublicKey(options) {
  const { payload, signature } = options;
  const { r: r3, s: s2, yParity } = signature;
  const signature_ = new secp256k1.Signature(BigInt(r3), BigInt(s2)).addRecoveryBit(yParity);
  const point = signature_.recoverPublicKey(from3(payload).substring(2));
  return from5(point);
}
function sign(options) {
  const { extraEntropy: extraEntropy2 = extraEntropy, hash, payload, privateKey } = options;
  const { r: r3, s: s2, recovery } = secp256k1.sign(from4(payload), from4(privateKey), {
    extraEntropy: typeof extraEntropy2 === "boolean" ? extraEntropy2 : from3(extraEntropy2).slice(2),
    lowS: true,
    ...hash ? { prehash: true } : {}
  });
  return {
    r: r3,
    s: s2,
    yParity: recovery
  };
}
function verify(options) {
  const { address, hash, payload, publicKey, signature } = options;
  if (address)
    return isEqual(address, recoverAddress({ payload, signature }));
  return secp256k1.verify(signature, from4(payload), toBytes2(publicKey), ...hash ? [{ prehash: true, lowS: true }] : []);
}

// node_modules/@noble/ciphers/esm/utils.js
function isBytes4(a3) {
  return a3 instanceof Uint8Array || ArrayBuffer.isView(a3) && a3.constructor.name === "Uint8Array";
}
function abool2(b5) {
  if (typeof b5 !== "boolean")
    throw new Error(`boolean expected, not ${b5}`);
}
function anumber3(n4) {
  if (!Number.isSafeInteger(n4) || n4 < 0)
    throw new Error("positive integer expected, got " + n4);
}
function abytes3(b5, ...lengths) {
  if (!isBytes4(b5))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b5.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b5.length);
}
function aexists2(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput2(out, instance) {
  abytes3(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u322(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean2(...arrays) {
  for (let i3 = 0; i3 < arrays.length; i3++) {
    arrays[i3].fill(0);
  }
}
function createView2(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
var isLE2 = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes4(data) {
  if (typeof data === "string")
    data = utf8ToBytes2(data);
  else if (isBytes4(data))
    data = copyBytes(data);
  else
    throw new Error("Uint8Array expected, got " + typeof data);
  return data;
}
function checkOpts(defaults, opts) {
  if (opts == null || typeof opts !== "object")
    throw new Error("options must be defined");
  const merged = Object.assign(defaults, opts);
  return merged;
}
function equalBytes(a3, b5) {
  if (a3.length !== b5.length)
    return false;
  let diff = 0;
  for (let i3 = 0; i3 < a3.length; i3++)
    diff |= a3[i3] ^ b5[i3];
  return diff === 0;
}
var wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, constructor) => {
  function wrappedCipher(key, ...args) {
    abytes3(key);
    if (!isLE2)
      throw new Error("Non little-endian hardware is not yet supported");
    if (params.nonceLength !== void 0) {
      const nonce = args[0];
      if (!nonce)
        throw new Error("nonce / iv required");
      if (params.varSizeNonce)
        abytes3(nonce);
      else
        abytes3(nonce, params.nonceLength);
    }
    const tagl = params.tagLength;
    if (tagl && args[1] !== void 0) {
      abytes3(args[1]);
    }
    const cipher = constructor(key, ...args);
    const checkOutput = (fnLength, output) => {
      if (output !== void 0) {
        if (fnLength !== 2)
          throw new Error("cipher output not supported");
        abytes3(output);
      }
    };
    let called = false;
    const wrCipher = {
      encrypt(data, output) {
        if (called)
          throw new Error("cannot encrypt() twice with same key + nonce");
        called = true;
        abytes3(data);
        checkOutput(cipher.encrypt.length, output);
        return cipher.encrypt(data, output);
      },
      decrypt(data, output) {
        abytes3(data);
        if (tagl && data.length < tagl)
          throw new Error("invalid ciphertext length: smaller than tagLength=" + tagl);
        checkOutput(cipher.decrypt.length, output);
        return cipher.decrypt(data, output);
      }
    };
    return wrCipher;
  }
  Object.assign(wrappedCipher, params);
  return wrappedCipher;
};
function getOutput(expectedLength, out, onlyAligned = true) {
  if (out === void 0)
    return new Uint8Array(expectedLength);
  if (out.length !== expectedLength)
    throw new Error("invalid output length, expected " + expectedLength + ", got: " + out.length);
  if (onlyAligned && !isAligned32(out))
    throw new Error("invalid output, must be aligned");
  return out;
}
function setBigUint642(view, byteOffset, value, isLE3) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE3);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h4 = isLE3 ? 4 : 0;
  const l5 = isLE3 ? 0 : 4;
  view.setUint32(byteOffset + h4, wh, isLE3);
  view.setUint32(byteOffset + l5, wl, isLE3);
}
function u64Lengths(dataLength, aadLength, isLE3) {
  abool2(isLE3);
  const num = new Uint8Array(16);
  const view = createView2(num);
  setBigUint642(view, 0, BigInt(aadLength), isLE3);
  setBigUint642(view, 8, BigInt(dataLength), isLE3);
  return num;
}
function isAligned32(bytes) {
  return bytes.byteOffset % 4 === 0;
}
function copyBytes(bytes) {
  return Uint8Array.from(bytes);
}

// node_modules/@msgpack/msgpack/dist.esm/utils/utf8.mjs
function utf8Count(str) {
  const strLength = str.length;
  let byteLength = 0;
  let pos = 0;
  while (pos < strLength) {
    let value = str.charCodeAt(pos++);
    if ((value & 4294967168) === 0) {
      byteLength++;
      continue;
    } else if ((value & 4294965248) === 0) {
      byteLength += 2;
    } else {
      if (value >= 55296 && value <= 56319) {
        if (pos < strLength) {
          const extra = str.charCodeAt(pos);
          if ((extra & 64512) === 56320) {
            ++pos;
            value = ((value & 1023) << 10) + (extra & 1023) + 65536;
          }
        }
      }
      if ((value & 4294901760) === 0) {
        byteLength += 3;
      } else {
        byteLength += 4;
      }
    }
  }
  return byteLength;
}
function utf8EncodeJs(str, output, outputOffset) {
  const strLength = str.length;
  let offset = outputOffset;
  let pos = 0;
  while (pos < strLength) {
    let value = str.charCodeAt(pos++);
    if ((value & 4294967168) === 0) {
      output[offset++] = value;
      continue;
    } else if ((value & 4294965248) === 0) {
      output[offset++] = value >> 6 & 31 | 192;
    } else {
      if (value >= 55296 && value <= 56319) {
        if (pos < strLength) {
          const extra = str.charCodeAt(pos);
          if ((extra & 64512) === 56320) {
            ++pos;
            value = ((value & 1023) << 10) + (extra & 1023) + 65536;
          }
        }
      }
      if ((value & 4294901760) === 0) {
        output[offset++] = value >> 12 & 15 | 224;
        output[offset++] = value >> 6 & 63 | 128;
      } else {
        output[offset++] = value >> 18 & 7 | 240;
        output[offset++] = value >> 12 & 63 | 128;
        output[offset++] = value >> 6 & 63 | 128;
      }
    }
    output[offset++] = value & 63 | 128;
  }
}
var sharedTextEncoder = new TextEncoder();
var TEXT_ENCODER_THRESHOLD = 50;
function utf8EncodeTE(str, output, outputOffset) {
  sharedTextEncoder.encodeInto(str, output.subarray(outputOffset));
}
function utf8Encode(str, output, outputOffset) {
  if (str.length > TEXT_ENCODER_THRESHOLD) {
    utf8EncodeTE(str, output, outputOffset);
  } else {
    utf8EncodeJs(str, output, outputOffset);
  }
}
var CHUNK_SIZE = 4096;
function utf8DecodeJs(bytes, inputOffset, byteLength) {
  let offset = inputOffset;
  const end = offset + byteLength;
  const units = [];
  let result = "";
  while (offset < end) {
    const byte1 = bytes[offset++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = bytes[offset++] & 63;
      units.push((byte1 & 31) << 6 | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = bytes[offset++] & 63;
      const byte3 = bytes[offset++] & 63;
      units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = bytes[offset++] & 63;
      const byte3 = bytes[offset++] & 63;
      const byte4 = bytes[offset++] & 63;
      let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(unit >>> 10 & 1023 | 55296);
        unit = 56320 | unit & 1023;
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= CHUNK_SIZE) {
      result += String.fromCharCode(...units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += String.fromCharCode(...units);
  }
  return result;
}
var sharedTextDecoder = new TextDecoder();
var TEXT_DECODER_THRESHOLD = 200;
function utf8DecodeTD(bytes, inputOffset, byteLength) {
  const stringBytes = bytes.subarray(inputOffset, inputOffset + byteLength);
  return sharedTextDecoder.decode(stringBytes);
}
function utf8Decode(bytes, inputOffset, byteLength) {
  if (byteLength > TEXT_DECODER_THRESHOLD) {
    return utf8DecodeTD(bytes, inputOffset, byteLength);
  } else {
    return utf8DecodeJs(bytes, inputOffset, byteLength);
  }
}

// node_modules/@msgpack/msgpack/dist.esm/ExtData.mjs
var ExtData = class {
  type;
  data;
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/DecodeError.mjs
var DecodeError = class _DecodeError extends Error {
  constructor(message) {
    super(message);
    const proto = Object.create(_DecodeError.prototype);
    Object.setPrototypeOf(this, proto);
    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: _DecodeError.name
    });
  }
};

// node_modules/@msgpack/msgpack/dist.esm/utils/int.mjs
var UINT32_MAX = 4294967295;
function setUint64(view, offset, value) {
  const high = value / 4294967296;
  const low = value;
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}
function setInt64(view, offset, value) {
  const high = Math.floor(value / 4294967296);
  const low = value;
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}
function getInt64(view, offset) {
  const high = view.getInt32(offset);
  const low = view.getUint32(offset + 4);
  return high * 4294967296 + low;
}
function getUint64(view, offset) {
  const high = view.getUint32(offset);
  const low = view.getUint32(offset + 4);
  return high * 4294967296 + low;
}

// node_modules/@msgpack/msgpack/dist.esm/timestamp.mjs
var EXT_TIMESTAMP = -1;
var TIMESTAMP32_MAX_SEC = 4294967296 - 1;
var TIMESTAMP64_MAX_SEC = 17179869184 - 1;
function encodeTimeSpecToTimestamp({ sec, nsec }) {
  if (sec >= 0 && nsec >= 0 && sec <= TIMESTAMP64_MAX_SEC) {
    if (nsec === 0 && sec <= TIMESTAMP32_MAX_SEC) {
      const rv = new Uint8Array(4);
      const view = new DataView(rv.buffer);
      view.setUint32(0, sec);
      return rv;
    } else {
      const secHigh = sec / 4294967296;
      const secLow = sec & 4294967295;
      const rv = new Uint8Array(8);
      const view = new DataView(rv.buffer);
      view.setUint32(0, nsec << 2 | secHigh & 3);
      view.setUint32(4, secLow);
      return rv;
    }
  } else {
    const rv = new Uint8Array(12);
    const view = new DataView(rv.buffer);
    view.setUint32(0, nsec);
    setInt64(view, 4, sec);
    return rv;
  }
}
function encodeDateToTimeSpec(date) {
  const msec = date.getTime();
  const sec = Math.floor(msec / 1e3);
  const nsec = (msec - sec * 1e3) * 1e6;
  const nsecInSec = Math.floor(nsec / 1e9);
  return {
    sec: sec + nsecInSec,
    nsec: nsec - nsecInSec * 1e9
  };
}
function encodeTimestampExtension(object) {
  if (object instanceof Date) {
    const timeSpec = encodeDateToTimeSpec(object);
    return encodeTimeSpecToTimestamp(timeSpec);
  } else {
    return null;
  }
}
function decodeTimestampToTimeSpec(data) {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  switch (data.byteLength) {
    case 4: {
      const sec = view.getUint32(0);
      const nsec = 0;
      return { sec, nsec };
    }
    case 8: {
      const nsec30AndSecHigh2 = view.getUint32(0);
      const secLow32 = view.getUint32(4);
      const sec = (nsec30AndSecHigh2 & 3) * 4294967296 + secLow32;
      const nsec = nsec30AndSecHigh2 >>> 2;
      return { sec, nsec };
    }
    case 12: {
      const sec = getInt64(view, 4);
      const nsec = view.getUint32(0);
      return { sec, nsec };
    }
    default:
      throw new DecodeError(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${data.length}`);
  }
}
function decodeTimestampExtension(data) {
  const timeSpec = decodeTimestampToTimeSpec(data);
  return new Date(timeSpec.sec * 1e3 + timeSpec.nsec / 1e6);
}
var timestampExtension = {
  type: EXT_TIMESTAMP,
  encode: encodeTimestampExtension,
  decode: decodeTimestampExtension
};

// node_modules/@msgpack/msgpack/dist.esm/ExtensionCodec.mjs
var ExtensionCodec = class _ExtensionCodec {
  static defaultCodec = new _ExtensionCodec();
  // ensures ExtensionCodecType<X> matches ExtensionCodec<X>
  // this will make type errors a lot more clear
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __brand;
  // built-in extensions
  builtInEncoders = [];
  builtInDecoders = [];
  // custom extensions
  encoders = [];
  decoders = [];
  constructor() {
    this.register(timestampExtension);
  }
  register({ type, encode: encode6, decode: decode7 }) {
    if (type >= 0) {
      this.encoders[type] = encode6;
      this.decoders[type] = decode7;
    } else {
      const index = -1 - type;
      this.builtInEncoders[index] = encode6;
      this.builtInDecoders[index] = decode7;
    }
  }
  tryToEncode(object, context) {
    for (let i3 = 0; i3 < this.builtInEncoders.length; i3++) {
      const encodeExt = this.builtInEncoders[i3];
      if (encodeExt != null) {
        const data = encodeExt(object, context);
        if (data != null) {
          const type = -1 - i3;
          return new ExtData(type, data);
        }
      }
    }
    for (let i3 = 0; i3 < this.encoders.length; i3++) {
      const encodeExt = this.encoders[i3];
      if (encodeExt != null) {
        const data = encodeExt(object, context);
        if (data != null) {
          const type = i3;
          return new ExtData(type, data);
        }
      }
    }
    if (object instanceof ExtData) {
      return object;
    }
    return null;
  }
  decode(data, type, context) {
    const decodeExt = type < 0 ? this.builtInDecoders[-1 - type] : this.decoders[type];
    if (decodeExt) {
      return decodeExt(data, type, context);
    } else {
      return new ExtData(type, data);
    }
  }
};

// node_modules/@msgpack/msgpack/dist.esm/utils/typedArrays.mjs
function isArrayBufferLike(buffer) {
  return buffer instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && buffer instanceof SharedArrayBuffer;
}
function ensureUint8Array(buffer) {
  if (buffer instanceof Uint8Array) {
    return buffer;
  } else if (ArrayBuffer.isView(buffer)) {
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  } else if (isArrayBufferLike(buffer)) {
    return new Uint8Array(buffer);
  } else {
    return Uint8Array.from(buffer);
  }
}

// node_modules/@msgpack/msgpack/dist.esm/Encoder.mjs
var DEFAULT_MAX_DEPTH = 100;
var DEFAULT_INITIAL_BUFFER_SIZE = 2048;
var Encoder2 = class _Encoder {
  extensionCodec;
  context;
  useBigInt64;
  maxDepth;
  initialBufferSize;
  sortKeys;
  forceFloat32;
  ignoreUndefined;
  forceIntegerToFloat;
  pos;
  view;
  bytes;
  entered = false;
  constructor(options) {
    this.extensionCodec = options?.extensionCodec ?? ExtensionCodec.defaultCodec;
    this.context = options?.context;
    this.useBigInt64 = options?.useBigInt64 ?? false;
    this.maxDepth = options?.maxDepth ?? DEFAULT_MAX_DEPTH;
    this.initialBufferSize = options?.initialBufferSize ?? DEFAULT_INITIAL_BUFFER_SIZE;
    this.sortKeys = options?.sortKeys ?? false;
    this.forceFloat32 = options?.forceFloat32 ?? false;
    this.ignoreUndefined = options?.ignoreUndefined ?? false;
    this.forceIntegerToFloat = options?.forceIntegerToFloat ?? false;
    this.pos = 0;
    this.view = new DataView(new ArrayBuffer(this.initialBufferSize));
    this.bytes = new Uint8Array(this.view.buffer);
  }
  clone() {
    return new _Encoder({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      maxDepth: this.maxDepth,
      initialBufferSize: this.initialBufferSize,
      sortKeys: this.sortKeys,
      forceFloat32: this.forceFloat32,
      ignoreUndefined: this.ignoreUndefined,
      forceIntegerToFloat: this.forceIntegerToFloat
    });
  }
  reinitializeState() {
    this.pos = 0;
  }
  /**
   * This is almost equivalent to {@link Encoder#encode}, but it returns an reference of the encoder's internal buffer and thus much faster than {@link Encoder#encode}.
   *
   * @returns Encodes the object and returns a shared reference the encoder's internal buffer.
   */
  encodeSharedRef(object) {
    if (this.entered) {
      const instance = this.clone();
      return instance.encodeSharedRef(object);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.doEncode(object, 1);
      return this.bytes.subarray(0, this.pos);
    } finally {
      this.entered = false;
    }
  }
  /**
   * @returns Encodes the object and returns a copy of the encoder's internal buffer.
   */
  encode(object) {
    if (this.entered) {
      const instance = this.clone();
      return instance.encode(object);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.doEncode(object, 1);
      return this.bytes.slice(0, this.pos);
    } finally {
      this.entered = false;
    }
  }
  doEncode(object, depth) {
    if (depth > this.maxDepth) {
      throw new Error(`Too deep objects in depth ${depth}`);
    }
    if (object == null) {
      this.encodeNil();
    } else if (typeof object === "boolean") {
      this.encodeBoolean(object);
    } else if (typeof object === "number") {
      if (!this.forceIntegerToFloat) {
        this.encodeNumber(object);
      } else {
        this.encodeNumberAsFloat(object);
      }
    } else if (typeof object === "string") {
      this.encodeString(object);
    } else if (this.useBigInt64 && typeof object === "bigint") {
      this.encodeBigInt64(object);
    } else {
      this.encodeObject(object, depth);
    }
  }
  ensureBufferSizeToWrite(sizeToWrite) {
    const requiredSize = this.pos + sizeToWrite;
    if (this.view.byteLength < requiredSize) {
      this.resizeBuffer(requiredSize * 2);
    }
  }
  resizeBuffer(newSize) {
    const newBuffer = new ArrayBuffer(newSize);
    const newBytes = new Uint8Array(newBuffer);
    const newView = new DataView(newBuffer);
    newBytes.set(this.bytes);
    this.view = newView;
    this.bytes = newBytes;
  }
  encodeNil() {
    this.writeU8(192);
  }
  encodeBoolean(object) {
    if (object === false) {
      this.writeU8(194);
    } else {
      this.writeU8(195);
    }
  }
  encodeNumber(object) {
    if (!this.forceIntegerToFloat && Number.isSafeInteger(object)) {
      if (object >= 0) {
        if (object < 128) {
          this.writeU8(object);
        } else if (object < 256) {
          this.writeU8(204);
          this.writeU8(object);
        } else if (object < 65536) {
          this.writeU8(205);
          this.writeU16(object);
        } else if (object < 4294967296) {
          this.writeU8(206);
          this.writeU32(object);
        } else if (!this.useBigInt64) {
          this.writeU8(207);
          this.writeU64(object);
        } else {
          this.encodeNumberAsFloat(object);
        }
      } else {
        if (object >= -32) {
          this.writeU8(224 | object + 32);
        } else if (object >= -128) {
          this.writeU8(208);
          this.writeI8(object);
        } else if (object >= -32768) {
          this.writeU8(209);
          this.writeI16(object);
        } else if (object >= -2147483648) {
          this.writeU8(210);
          this.writeI32(object);
        } else if (!this.useBigInt64) {
          this.writeU8(211);
          this.writeI64(object);
        } else {
          this.encodeNumberAsFloat(object);
        }
      }
    } else {
      this.encodeNumberAsFloat(object);
    }
  }
  encodeNumberAsFloat(object) {
    if (this.forceFloat32) {
      this.writeU8(202);
      this.writeF32(object);
    } else {
      this.writeU8(203);
      this.writeF64(object);
    }
  }
  encodeBigInt64(object) {
    if (object >= BigInt(0)) {
      this.writeU8(207);
      this.writeBigUint64(object);
    } else {
      this.writeU8(211);
      this.writeBigInt64(object);
    }
  }
  writeStringHeader(byteLength) {
    if (byteLength < 32) {
      this.writeU8(160 + byteLength);
    } else if (byteLength < 256) {
      this.writeU8(217);
      this.writeU8(byteLength);
    } else if (byteLength < 65536) {
      this.writeU8(218);
      this.writeU16(byteLength);
    } else if (byteLength < 4294967296) {
      this.writeU8(219);
      this.writeU32(byteLength);
    } else {
      throw new Error(`Too long string: ${byteLength} bytes in UTF-8`);
    }
  }
  encodeString(object) {
    const maxHeaderSize = 1 + 4;
    const byteLength = utf8Count(object);
    this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
    this.writeStringHeader(byteLength);
    utf8Encode(object, this.bytes, this.pos);
    this.pos += byteLength;
  }
  encodeObject(object, depth) {
    const ext = this.extensionCodec.tryToEncode(object, this.context);
    if (ext != null) {
      this.encodeExtension(ext);
    } else if (Array.isArray(object)) {
      this.encodeArray(object, depth);
    } else if (ArrayBuffer.isView(object)) {
      this.encodeBinary(object);
    } else if (typeof object === "object") {
      this.encodeMap(object, depth);
    } else {
      throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(object)}`);
    }
  }
  encodeBinary(object) {
    const size3 = object.byteLength;
    if (size3 < 256) {
      this.writeU8(196);
      this.writeU8(size3);
    } else if (size3 < 65536) {
      this.writeU8(197);
      this.writeU16(size3);
    } else if (size3 < 4294967296) {
      this.writeU8(198);
      this.writeU32(size3);
    } else {
      throw new Error(`Too large binary: ${size3}`);
    }
    const bytes = ensureUint8Array(object);
    this.writeU8a(bytes);
  }
  encodeArray(object, depth) {
    const size3 = object.length;
    if (size3 < 16) {
      this.writeU8(144 + size3);
    } else if (size3 < 65536) {
      this.writeU8(220);
      this.writeU16(size3);
    } else if (size3 < 4294967296) {
      this.writeU8(221);
      this.writeU32(size3);
    } else {
      throw new Error(`Too large array: ${size3}`);
    }
    for (const item of object) {
      this.doEncode(item, depth + 1);
    }
  }
  countWithoutUndefined(object, keys2) {
    let count = 0;
    for (const key of keys2) {
      if (object[key] !== void 0) {
        count++;
      }
    }
    return count;
  }
  encodeMap(object, depth) {
    const keys2 = Object.keys(object);
    if (this.sortKeys) {
      keys2.sort();
    }
    const size3 = this.ignoreUndefined ? this.countWithoutUndefined(object, keys2) : keys2.length;
    if (size3 < 16) {
      this.writeU8(128 + size3);
    } else if (size3 < 65536) {
      this.writeU8(222);
      this.writeU16(size3);
    } else if (size3 < 4294967296) {
      this.writeU8(223);
      this.writeU32(size3);
    } else {
      throw new Error(`Too large map object: ${size3}`);
    }
    for (const key of keys2) {
      const value = object[key];
      if (!(this.ignoreUndefined && value === void 0)) {
        this.encodeString(key);
        this.doEncode(value, depth + 1);
      }
    }
  }
  encodeExtension(ext) {
    if (typeof ext.data === "function") {
      const data = ext.data(this.pos + 6);
      const size4 = data.length;
      if (size4 >= 4294967296) {
        throw new Error(`Too large extension object: ${size4}`);
      }
      this.writeU8(201);
      this.writeU32(size4);
      this.writeI8(ext.type);
      this.writeU8a(data);
      return;
    }
    const size3 = ext.data.length;
    if (size3 === 1) {
      this.writeU8(212);
    } else if (size3 === 2) {
      this.writeU8(213);
    } else if (size3 === 4) {
      this.writeU8(214);
    } else if (size3 === 8) {
      this.writeU8(215);
    } else if (size3 === 16) {
      this.writeU8(216);
    } else if (size3 < 256) {
      this.writeU8(199);
      this.writeU8(size3);
    } else if (size3 < 65536) {
      this.writeU8(200);
      this.writeU16(size3);
    } else if (size3 < 4294967296) {
      this.writeU8(201);
      this.writeU32(size3);
    } else {
      throw new Error(`Too large extension object: ${size3}`);
    }
    this.writeI8(ext.type);
    this.writeU8a(ext.data);
  }
  writeU8(value) {
    this.ensureBufferSizeToWrite(1);
    this.view.setUint8(this.pos, value);
    this.pos++;
  }
  writeU8a(values) {
    const size3 = values.length;
    this.ensureBufferSizeToWrite(size3);
    this.bytes.set(values, this.pos);
    this.pos += size3;
  }
  writeI8(value) {
    this.ensureBufferSizeToWrite(1);
    this.view.setInt8(this.pos, value);
    this.pos++;
  }
  writeU16(value) {
    this.ensureBufferSizeToWrite(2);
    this.view.setUint16(this.pos, value);
    this.pos += 2;
  }
  writeI16(value) {
    this.ensureBufferSizeToWrite(2);
    this.view.setInt16(this.pos, value);
    this.pos += 2;
  }
  writeU32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setUint32(this.pos, value);
    this.pos += 4;
  }
  writeI32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setInt32(this.pos, value);
    this.pos += 4;
  }
  writeF32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setFloat32(this.pos, value);
    this.pos += 4;
  }
  writeF64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setFloat64(this.pos, value);
    this.pos += 8;
  }
  writeU64(value) {
    this.ensureBufferSizeToWrite(8);
    setUint64(this.view, this.pos, value);
    this.pos += 8;
  }
  writeI64(value) {
    this.ensureBufferSizeToWrite(8);
    setInt64(this.view, this.pos, value);
    this.pos += 8;
  }
  writeBigUint64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setBigUint64(this.pos, value);
    this.pos += 8;
  }
  writeBigInt64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setBigInt64(this.pos, value);
    this.pos += 8;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/encode.mjs
function encode5(value, options) {
  const encoder2 = new Encoder2(options);
  return encoder2.encodeSharedRef(value);
}

// node_modules/@msgpack/msgpack/dist.esm/utils/prettyByte.mjs
function prettyByte(byte) {
  return `${byte < 0 ? "-" : ""}0x${Math.abs(byte).toString(16).padStart(2, "0")}`;
}

// node_modules/@msgpack/msgpack/dist.esm/CachedKeyDecoder.mjs
var DEFAULT_MAX_KEY_LENGTH = 16;
var DEFAULT_MAX_LENGTH_PER_KEY = 16;
var CachedKeyDecoder = class {
  hit = 0;
  miss = 0;
  caches;
  maxKeyLength;
  maxLengthPerKey;
  constructor(maxKeyLength = DEFAULT_MAX_KEY_LENGTH, maxLengthPerKey = DEFAULT_MAX_LENGTH_PER_KEY) {
    this.maxKeyLength = maxKeyLength;
    this.maxLengthPerKey = maxLengthPerKey;
    this.caches = [];
    for (let i3 = 0; i3 < this.maxKeyLength; i3++) {
      this.caches.push([]);
    }
  }
  canBeCached(byteLength) {
    return byteLength > 0 && byteLength <= this.maxKeyLength;
  }
  find(bytes, inputOffset, byteLength) {
    const records = this.caches[byteLength - 1];
    FIND_CHUNK: for (const record of records) {
      const recordBytes = record.bytes;
      for (let j6 = 0; j6 < byteLength; j6++) {
        if (recordBytes[j6] !== bytes[inputOffset + j6]) {
          continue FIND_CHUNK;
        }
      }
      return record.str;
    }
    return null;
  }
  store(bytes, value) {
    const records = this.caches[bytes.length - 1];
    const record = { bytes, str: value };
    if (records.length >= this.maxLengthPerKey) {
      records[Math.random() * records.length | 0] = record;
    } else {
      records.push(record);
    }
  }
  decode(bytes, inputOffset, byteLength) {
    const cachedValue = this.find(bytes, inputOffset, byteLength);
    if (cachedValue != null) {
      this.hit++;
      return cachedValue;
    }
    this.miss++;
    const str = utf8DecodeJs(bytes, inputOffset, byteLength);
    const slicedCopyOfBytes = Uint8Array.prototype.slice.call(bytes, inputOffset, inputOffset + byteLength);
    this.store(slicedCopyOfBytes, str);
    return str;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/Decoder.mjs
var STATE_ARRAY = "array";
var STATE_MAP_KEY = "map_key";
var STATE_MAP_VALUE = "map_value";
var mapKeyConverter = (key) => {
  if (typeof key === "string" || typeof key === "number") {
    return key;
  }
  throw new DecodeError("The type of key must be string or number but " + typeof key);
};
var StackPool = class {
  stack = [];
  stackHeadPosition = -1;
  get length() {
    return this.stackHeadPosition + 1;
  }
  top() {
    return this.stack[this.stackHeadPosition];
  }
  pushArrayState(size3) {
    const state = this.getUninitializedStateFromPool();
    state.type = STATE_ARRAY;
    state.position = 0;
    state.size = size3;
    state.array = new Array(size3);
  }
  pushMapState(size3) {
    const state = this.getUninitializedStateFromPool();
    state.type = STATE_MAP_KEY;
    state.readCount = 0;
    state.size = size3;
    state.map = {};
  }
  getUninitializedStateFromPool() {
    this.stackHeadPosition++;
    if (this.stackHeadPosition === this.stack.length) {
      const partialState = {
        type: void 0,
        size: 0,
        array: void 0,
        position: 0,
        readCount: 0,
        map: void 0,
        key: null
      };
      this.stack.push(partialState);
    }
    return this.stack[this.stackHeadPosition];
  }
  release(state) {
    const topStackState = this.stack[this.stackHeadPosition];
    if (topStackState !== state) {
      throw new Error("Invalid stack state. Released state is not on top of the stack.");
    }
    if (state.type === STATE_ARRAY) {
      const partialState = state;
      partialState.size = 0;
      partialState.array = void 0;
      partialState.position = 0;
      partialState.type = void 0;
    }
    if (state.type === STATE_MAP_KEY || state.type === STATE_MAP_VALUE) {
      const partialState = state;
      partialState.size = 0;
      partialState.map = void 0;
      partialState.readCount = 0;
      partialState.type = void 0;
    }
    this.stackHeadPosition--;
  }
  reset() {
    this.stack.length = 0;
    this.stackHeadPosition = -1;
  }
};
var HEAD_BYTE_REQUIRED = -1;
var EMPTY_VIEW = new DataView(new ArrayBuffer(0));
var EMPTY_BYTES = new Uint8Array(EMPTY_VIEW.buffer);
try {
  EMPTY_VIEW.getInt8(0);
} catch (e2) {
  if (!(e2 instanceof RangeError)) {
    throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
  }
}
var MORE_DATA = new RangeError("Insufficient data");
var sharedCachedKeyDecoder = new CachedKeyDecoder();
var Decoder2 = class _Decoder {
  extensionCodec;
  context;
  useBigInt64;
  rawStrings;
  maxStrLength;
  maxBinLength;
  maxArrayLength;
  maxMapLength;
  maxExtLength;
  keyDecoder;
  mapKeyConverter;
  totalPos = 0;
  pos = 0;
  view = EMPTY_VIEW;
  bytes = EMPTY_BYTES;
  headByte = HEAD_BYTE_REQUIRED;
  stack = new StackPool();
  entered = false;
  constructor(options) {
    this.extensionCodec = options?.extensionCodec ?? ExtensionCodec.defaultCodec;
    this.context = options?.context;
    this.useBigInt64 = options?.useBigInt64 ?? false;
    this.rawStrings = options?.rawStrings ?? false;
    this.maxStrLength = options?.maxStrLength ?? UINT32_MAX;
    this.maxBinLength = options?.maxBinLength ?? UINT32_MAX;
    this.maxArrayLength = options?.maxArrayLength ?? UINT32_MAX;
    this.maxMapLength = options?.maxMapLength ?? UINT32_MAX;
    this.maxExtLength = options?.maxExtLength ?? UINT32_MAX;
    this.keyDecoder = options?.keyDecoder !== void 0 ? options.keyDecoder : sharedCachedKeyDecoder;
    this.mapKeyConverter = options?.mapKeyConverter ?? mapKeyConverter;
  }
  clone() {
    return new _Decoder({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      rawStrings: this.rawStrings,
      maxStrLength: this.maxStrLength,
      maxBinLength: this.maxBinLength,
      maxArrayLength: this.maxArrayLength,
      maxMapLength: this.maxMapLength,
      maxExtLength: this.maxExtLength,
      keyDecoder: this.keyDecoder
    });
  }
  reinitializeState() {
    this.totalPos = 0;
    this.headByte = HEAD_BYTE_REQUIRED;
    this.stack.reset();
  }
  setBuffer(buffer) {
    const bytes = ensureUint8Array(buffer);
    this.bytes = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    this.pos = 0;
  }
  appendBuffer(buffer) {
    if (this.headByte === HEAD_BYTE_REQUIRED && !this.hasRemaining(1)) {
      this.setBuffer(buffer);
    } else {
      const remainingData = this.bytes.subarray(this.pos);
      const newData = ensureUint8Array(buffer);
      const newBuffer = new Uint8Array(remainingData.length + newData.length);
      newBuffer.set(remainingData);
      newBuffer.set(newData, remainingData.length);
      this.setBuffer(newBuffer);
    }
  }
  hasRemaining(size3) {
    return this.view.byteLength - this.pos >= size3;
  }
  createExtraByteError(posToShow) {
    const { view, pos } = this;
    return new RangeError(`Extra ${view.byteLength - pos} of ${view.byteLength} byte(s) found at buffer[${posToShow}]`);
  }
  /**
   * @throws {@link DecodeError}
   * @throws {@link RangeError}
   */
  decode(buffer) {
    if (this.entered) {
      const instance = this.clone();
      return instance.decode(buffer);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.setBuffer(buffer);
      const object = this.doDecodeSync();
      if (this.hasRemaining(1)) {
        throw this.createExtraByteError(this.pos);
      }
      return object;
    } finally {
      this.entered = false;
    }
  }
  *decodeMulti(buffer) {
    if (this.entered) {
      const instance = this.clone();
      yield* instance.decodeMulti(buffer);
      return;
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.setBuffer(buffer);
      while (this.hasRemaining(1)) {
        yield this.doDecodeSync();
      }
    } finally {
      this.entered = false;
    }
  }
  async decodeAsync(stream) {
    if (this.entered) {
      const instance = this.clone();
      return instance.decodeAsync(stream);
    }
    try {
      this.entered = true;
      let decoded = false;
      let object;
      for await (const buffer of stream) {
        if (decoded) {
          this.entered = false;
          throw this.createExtraByteError(this.totalPos);
        }
        this.appendBuffer(buffer);
        try {
          object = this.doDecodeSync();
          decoded = true;
        } catch (e2) {
          if (!(e2 instanceof RangeError)) {
            throw e2;
          }
        }
        this.totalPos += this.pos;
      }
      if (decoded) {
        if (this.hasRemaining(1)) {
          throw this.createExtraByteError(this.totalPos);
        }
        return object;
      }
      const { headByte, pos, totalPos } = this;
      throw new RangeError(`Insufficient data in parsing ${prettyByte(headByte)} at ${totalPos} (${pos} in the current buffer)`);
    } finally {
      this.entered = false;
    }
  }
  decodeArrayStream(stream) {
    return this.decodeMultiAsync(stream, true);
  }
  decodeStream(stream) {
    return this.decodeMultiAsync(stream, false);
  }
  async *decodeMultiAsync(stream, isArray) {
    if (this.entered) {
      const instance = this.clone();
      yield* instance.decodeMultiAsync(stream, isArray);
      return;
    }
    try {
      this.entered = true;
      let isArrayHeaderRequired = isArray;
      let arrayItemsLeft = -1;
      for await (const buffer of stream) {
        if (isArray && arrayItemsLeft === 0) {
          throw this.createExtraByteError(this.totalPos);
        }
        this.appendBuffer(buffer);
        if (isArrayHeaderRequired) {
          arrayItemsLeft = this.readArraySize();
          isArrayHeaderRequired = false;
          this.complete();
        }
        try {
          while (true) {
            yield this.doDecodeSync();
            if (--arrayItemsLeft === 0) {
              break;
            }
          }
        } catch (e2) {
          if (!(e2 instanceof RangeError)) {
            throw e2;
          }
        }
        this.totalPos += this.pos;
      }
    } finally {
      this.entered = false;
    }
  }
  doDecodeSync() {
    DECODE: while (true) {
      const headByte = this.readHeadByte();
      let object;
      if (headByte >= 224) {
        object = headByte - 256;
      } else if (headByte < 192) {
        if (headByte < 128) {
          object = headByte;
        } else if (headByte < 144) {
          const size3 = headByte - 128;
          if (size3 !== 0) {
            this.pushMapState(size3);
            this.complete();
            continue DECODE;
          } else {
            object = {};
          }
        } else if (headByte < 160) {
          const size3 = headByte - 144;
          if (size3 !== 0) {
            this.pushArrayState(size3);
            this.complete();
            continue DECODE;
          } else {
            object = [];
          }
        } else {
          const byteLength = headByte - 160;
          object = this.decodeString(byteLength, 0);
        }
      } else if (headByte === 192) {
        object = null;
      } else if (headByte === 194) {
        object = false;
      } else if (headByte === 195) {
        object = true;
      } else if (headByte === 202) {
        object = this.readF32();
      } else if (headByte === 203) {
        object = this.readF64();
      } else if (headByte === 204) {
        object = this.readU8();
      } else if (headByte === 205) {
        object = this.readU16();
      } else if (headByte === 206) {
        object = this.readU32();
      } else if (headByte === 207) {
        if (this.useBigInt64) {
          object = this.readU64AsBigInt();
        } else {
          object = this.readU64();
        }
      } else if (headByte === 208) {
        object = this.readI8();
      } else if (headByte === 209) {
        object = this.readI16();
      } else if (headByte === 210) {
        object = this.readI32();
      } else if (headByte === 211) {
        if (this.useBigInt64) {
          object = this.readI64AsBigInt();
        } else {
          object = this.readI64();
        }
      } else if (headByte === 217) {
        const byteLength = this.lookU8();
        object = this.decodeString(byteLength, 1);
      } else if (headByte === 218) {
        const byteLength = this.lookU16();
        object = this.decodeString(byteLength, 2);
      } else if (headByte === 219) {
        const byteLength = this.lookU32();
        object = this.decodeString(byteLength, 4);
      } else if (headByte === 220) {
        const size3 = this.readU16();
        if (size3 !== 0) {
          this.pushArrayState(size3);
          this.complete();
          continue DECODE;
        } else {
          object = [];
        }
      } else if (headByte === 221) {
        const size3 = this.readU32();
        if (size3 !== 0) {
          this.pushArrayState(size3);
          this.complete();
          continue DECODE;
        } else {
          object = [];
        }
      } else if (headByte === 222) {
        const size3 = this.readU16();
        if (size3 !== 0) {
          this.pushMapState(size3);
          this.complete();
          continue DECODE;
        } else {
          object = {};
        }
      } else if (headByte === 223) {
        const size3 = this.readU32();
        if (size3 !== 0) {
          this.pushMapState(size3);
          this.complete();
          continue DECODE;
        } else {
          object = {};
        }
      } else if (headByte === 196) {
        const size3 = this.lookU8();
        object = this.decodeBinary(size3, 1);
      } else if (headByte === 197) {
        const size3 = this.lookU16();
        object = this.decodeBinary(size3, 2);
      } else if (headByte === 198) {
        const size3 = this.lookU32();
        object = this.decodeBinary(size3, 4);
      } else if (headByte === 212) {
        object = this.decodeExtension(1, 0);
      } else if (headByte === 213) {
        object = this.decodeExtension(2, 0);
      } else if (headByte === 214) {
        object = this.decodeExtension(4, 0);
      } else if (headByte === 215) {
        object = this.decodeExtension(8, 0);
      } else if (headByte === 216) {
        object = this.decodeExtension(16, 0);
      } else if (headByte === 199) {
        const size3 = this.lookU8();
        object = this.decodeExtension(size3, 1);
      } else if (headByte === 200) {
        const size3 = this.lookU16();
        object = this.decodeExtension(size3, 2);
      } else if (headByte === 201) {
        const size3 = this.lookU32();
        object = this.decodeExtension(size3, 4);
      } else {
        throw new DecodeError(`Unrecognized type byte: ${prettyByte(headByte)}`);
      }
      this.complete();
      const stack = this.stack;
      while (stack.length > 0) {
        const state = stack.top();
        if (state.type === STATE_ARRAY) {
          state.array[state.position] = object;
          state.position++;
          if (state.position === state.size) {
            object = state.array;
            stack.release(state);
          } else {
            continue DECODE;
          }
        } else if (state.type === STATE_MAP_KEY) {
          if (object === "__proto__") {
            throw new DecodeError("The key __proto__ is not allowed");
          }
          state.key = this.mapKeyConverter(object);
          state.type = STATE_MAP_VALUE;
          continue DECODE;
        } else {
          state.map[state.key] = object;
          state.readCount++;
          if (state.readCount === state.size) {
            object = state.map;
            stack.release(state);
          } else {
            state.key = null;
            state.type = STATE_MAP_KEY;
            continue DECODE;
          }
        }
      }
      return object;
    }
  }
  readHeadByte() {
    if (this.headByte === HEAD_BYTE_REQUIRED) {
      this.headByte = this.readU8();
    }
    return this.headByte;
  }
  complete() {
    this.headByte = HEAD_BYTE_REQUIRED;
  }
  readArraySize() {
    const headByte = this.readHeadByte();
    switch (headByte) {
      case 220:
        return this.readU16();
      case 221:
        return this.readU32();
      default: {
        if (headByte < 160) {
          return headByte - 144;
        } else {
          throw new DecodeError(`Unrecognized array type byte: ${prettyByte(headByte)}`);
        }
      }
    }
  }
  pushMapState(size3) {
    if (size3 > this.maxMapLength) {
      throw new DecodeError(`Max length exceeded: map length (${size3}) > maxMapLengthLength (${this.maxMapLength})`);
    }
    this.stack.pushMapState(size3);
  }
  pushArrayState(size3) {
    if (size3 > this.maxArrayLength) {
      throw new DecodeError(`Max length exceeded: array length (${size3}) > maxArrayLength (${this.maxArrayLength})`);
    }
    this.stack.pushArrayState(size3);
  }
  decodeString(byteLength, headerOffset) {
    if (!this.rawStrings || this.stateIsMapKey()) {
      return this.decodeUtf8String(byteLength, headerOffset);
    }
    return this.decodeBinary(byteLength, headerOffset);
  }
  /**
   * @throws {@link RangeError}
   */
  decodeUtf8String(byteLength, headerOffset) {
    if (byteLength > this.maxStrLength) {
      throw new DecodeError(`Max length exceeded: UTF-8 byte length (${byteLength}) > maxStrLength (${this.maxStrLength})`);
    }
    if (this.bytes.byteLength < this.pos + headerOffset + byteLength) {
      throw MORE_DATA;
    }
    const offset = this.pos + headerOffset;
    let object;
    if (this.stateIsMapKey() && this.keyDecoder?.canBeCached(byteLength)) {
      object = this.keyDecoder.decode(this.bytes, offset, byteLength);
    } else {
      object = utf8Decode(this.bytes, offset, byteLength);
    }
    this.pos += headerOffset + byteLength;
    return object;
  }
  stateIsMapKey() {
    if (this.stack.length > 0) {
      const state = this.stack.top();
      return state.type === STATE_MAP_KEY;
    }
    return false;
  }
  /**
   * @throws {@link RangeError}
   */
  decodeBinary(byteLength, headOffset) {
    if (byteLength > this.maxBinLength) {
      throw new DecodeError(`Max length exceeded: bin length (${byteLength}) > maxBinLength (${this.maxBinLength})`);
    }
    if (!this.hasRemaining(byteLength + headOffset)) {
      throw MORE_DATA;
    }
    const offset = this.pos + headOffset;
    const object = this.bytes.subarray(offset, offset + byteLength);
    this.pos += headOffset + byteLength;
    return object;
  }
  decodeExtension(size3, headOffset) {
    if (size3 > this.maxExtLength) {
      throw new DecodeError(`Max length exceeded: ext length (${size3}) > maxExtLength (${this.maxExtLength})`);
    }
    const extType = this.view.getInt8(this.pos + headOffset);
    const data = this.decodeBinary(
      size3,
      headOffset + 1
      /* extType */
    );
    return this.extensionCodec.decode(data, extType, this.context);
  }
  lookU8() {
    return this.view.getUint8(this.pos);
  }
  lookU16() {
    return this.view.getUint16(this.pos);
  }
  lookU32() {
    return this.view.getUint32(this.pos);
  }
  readU8() {
    const value = this.view.getUint8(this.pos);
    this.pos++;
    return value;
  }
  readI8() {
    const value = this.view.getInt8(this.pos);
    this.pos++;
    return value;
  }
  readU16() {
    const value = this.view.getUint16(this.pos);
    this.pos += 2;
    return value;
  }
  readI16() {
    const value = this.view.getInt16(this.pos);
    this.pos += 2;
    return value;
  }
  readU32() {
    const value = this.view.getUint32(this.pos);
    this.pos += 4;
    return value;
  }
  readI32() {
    const value = this.view.getInt32(this.pos);
    this.pos += 4;
    return value;
  }
  readU64() {
    const value = getUint64(this.view, this.pos);
    this.pos += 8;
    return value;
  }
  readI64() {
    const value = getInt64(this.view, this.pos);
    this.pos += 8;
    return value;
  }
  readU64AsBigInt() {
    const value = this.view.getBigUint64(this.pos);
    this.pos += 8;
    return value;
  }
  readI64AsBigInt() {
    const value = this.view.getBigInt64(this.pos);
    this.pos += 8;
    return value;
  }
  readF32() {
    const value = this.view.getFloat32(this.pos);
    this.pos += 4;
    return value;
  }
  readF64() {
    const value = this.view.getFloat64(this.pos);
    this.pos += 8;
    return value;
  }
};

// node_modules/@msgpack/msgpack/dist.esm/decode.mjs
function decode6(buffer, options) {
  const decoder = new Decoder2(options);
  return decoder.decode(buffer);
}

// node_modules/uint8arrays/esm/src/concat.js
function concat2(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array(output);
}

// node_modules/uint8arrays/esm/src/to-string.js
function toString2(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}

// node_modules/@noble/ciphers/esm/_arx.js
var _utf8ToBytes = (str) => Uint8Array.from(str.split("").map((c5) => c5.charCodeAt(0)));
var sigma16 = _utf8ToBytes("expand 16-byte k");
var sigma32 = _utf8ToBytes("expand 32-byte k");
var sigma16_32 = u322(sigma16);
var sigma32_32 = u322(sigma32);
function rotl(a3, b5) {
  return a3 << b5 | a3 >>> 32 - b5;
}
function isAligned322(b5) {
  return b5.byteOffset % 4 === 0;
}
var BLOCK_LEN = 64;
var BLOCK_LEN32 = 16;
var MAX_COUNTER = 2 ** 32 - 1;
var U32_EMPTY = new Uint32Array();
function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
  const len = data.length;
  const block = new Uint8Array(BLOCK_LEN);
  const b32 = u322(block);
  const isAligned = isAligned322(data) && isAligned322(output);
  const d32 = isAligned ? u322(data) : U32_EMPTY;
  const o32 = isAligned ? u322(output) : U32_EMPTY;
  for (let pos = 0; pos < len; counter++) {
    core(sigma, key, nonce, b32, counter, rounds);
    if (counter >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    const take = Math.min(BLOCK_LEN, len - pos);
    if (isAligned && take === BLOCK_LEN) {
      const pos32 = pos / 4;
      if (pos % 4 !== 0)
        throw new Error("arx: invalid block position");
      for (let j6 = 0, posj; j6 < BLOCK_LEN32; j6++) {
        posj = pos32 + j6;
        o32[posj] = d32[posj] ^ b32[j6];
      }
      pos += BLOCK_LEN;
      continue;
    }
    for (let j6 = 0, posj; j6 < take; j6++) {
      posj = pos + j6;
      output[posj] = data[posj] ^ block[j6];
    }
    pos += take;
  }
}
function createCipher(core, opts) {
  const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = checkOpts({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, opts);
  if (typeof core !== "function")
    throw new Error("core must be a function");
  anumber3(counterLength);
  anumber3(rounds);
  abool2(counterRight);
  abool2(allowShortKeys);
  return (key, nonce, data, output, counter = 0) => {
    abytes3(key);
    abytes3(nonce);
    abytes3(data);
    const len = data.length;
    if (output === void 0)
      output = new Uint8Array(len);
    abytes3(output);
    anumber3(counter);
    if (counter < 0 || counter >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    if (output.length < len)
      throw new Error(`arx: output (${output.length}) is shorter than data (${len})`);
    const toClean = [];
    let l5 = key.length;
    let k6;
    let sigma;
    if (l5 === 32) {
      toClean.push(k6 = copyBytes(key));
      sigma = sigma32_32;
    } else if (l5 === 16 && allowShortKeys) {
      k6 = new Uint8Array(32);
      k6.set(key);
      k6.set(key, 16);
      sigma = sigma16_32;
      toClean.push(k6);
    } else {
      throw new Error(`arx: invalid 32-byte key, got length=${l5}`);
    }
    if (!isAligned322(nonce))
      toClean.push(nonce = copyBytes(nonce));
    const k32 = u322(k6);
    if (extendNonceFn) {
      if (nonce.length !== 24)
        throw new Error(`arx: extended nonce must be 24 bytes`);
      extendNonceFn(sigma, k32, u322(nonce.subarray(0, 16)), k32);
      nonce = nonce.subarray(16);
    }
    const nonceNcLen = 16 - counterLength;
    if (nonceNcLen !== nonce.length)
      throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
    if (nonceNcLen !== 12) {
      const nc = new Uint8Array(12);
      nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
      nonce = nc;
      toClean.push(nonce);
    }
    const n32 = u322(nonce);
    runCipher(core, sigma, k32, n32, data, output, counter, rounds);
    clean2(...toClean);
    return output;
  };
}

// node_modules/@noble/ciphers/esm/_poly1305.js
var u8to16 = (a3, i3) => a3[i3++] & 255 | (a3[i3++] & 255) << 8;
var Poly1305 = class {
  constructor(key) {
    this.blockLen = 16;
    this.outputLen = 16;
    this.buffer = new Uint8Array(16);
    this.r = new Uint16Array(10);
    this.h = new Uint16Array(10);
    this.pad = new Uint16Array(8);
    this.pos = 0;
    this.finished = false;
    key = toBytes4(key);
    abytes3(key, 32);
    const t0 = u8to16(key, 0);
    const t1 = u8to16(key, 2);
    const t2 = u8to16(key, 4);
    const t3 = u8to16(key, 6);
    const t4 = u8to16(key, 8);
    const t5 = u8to16(key, 10);
    const t6 = u8to16(key, 12);
    const t7 = u8to16(key, 14);
    this.r[0] = t0 & 8191;
    this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
    this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
    this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
    this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
    this.r[5] = t4 >>> 1 & 8190;
    this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
    this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
    this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
    this.r[9] = t7 >>> 5 & 127;
    for (let i3 = 0; i3 < 8; i3++)
      this.pad[i3] = u8to16(key, 16 + 2 * i3);
  }
  process(data, offset, isLast = false) {
    const hibit = isLast ? 0 : 1 << 11;
    const { h: h4, r: r3 } = this;
    const r0 = r3[0];
    const r1 = r3[1];
    const r22 = r3[2];
    const r32 = r3[3];
    const r4 = r3[4];
    const r5 = r3[5];
    const r6 = r3[6];
    const r7 = r3[7];
    const r8 = r3[8];
    const r9 = r3[9];
    const t0 = u8to16(data, offset + 0);
    const t1 = u8to16(data, offset + 2);
    const t2 = u8to16(data, offset + 4);
    const t3 = u8to16(data, offset + 6);
    const t4 = u8to16(data, offset + 8);
    const t5 = u8to16(data, offset + 10);
    const t6 = u8to16(data, offset + 12);
    const t7 = u8to16(data, offset + 14);
    let h0 = h4[0] + (t0 & 8191);
    let h1 = h4[1] + ((t0 >>> 13 | t1 << 3) & 8191);
    let h22 = h4[2] + ((t1 >>> 10 | t2 << 6) & 8191);
    let h32 = h4[3] + ((t2 >>> 7 | t3 << 9) & 8191);
    let h42 = h4[4] + ((t3 >>> 4 | t4 << 12) & 8191);
    let h5 = h4[5] + (t4 >>> 1 & 8191);
    let h6 = h4[6] + ((t4 >>> 14 | t5 << 2) & 8191);
    let h7 = h4[7] + ((t5 >>> 11 | t6 << 5) & 8191);
    let h8 = h4[8] + ((t6 >>> 8 | t7 << 8) & 8191);
    let h9 = h4[9] + (t7 >>> 5 | hibit);
    let c5 = 0;
    let d0 = c5 + h0 * r0 + h1 * (5 * r9) + h22 * (5 * r8) + h32 * (5 * r7) + h42 * (5 * r6);
    c5 = d0 >>> 13;
    d0 &= 8191;
    d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r32) + h8 * (5 * r22) + h9 * (5 * r1);
    c5 += d0 >>> 13;
    d0 &= 8191;
    let d1 = c5 + h0 * r1 + h1 * r0 + h22 * (5 * r9) + h32 * (5 * r8) + h42 * (5 * r7);
    c5 = d1 >>> 13;
    d1 &= 8191;
    d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r32) + h9 * (5 * r22);
    c5 += d1 >>> 13;
    d1 &= 8191;
    let d22 = c5 + h0 * r22 + h1 * r1 + h22 * r0 + h32 * (5 * r9) + h42 * (5 * r8);
    c5 = d22 >>> 13;
    d22 &= 8191;
    d22 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r32);
    c5 += d22 >>> 13;
    d22 &= 8191;
    let d32 = c5 + h0 * r32 + h1 * r22 + h22 * r1 + h32 * r0 + h42 * (5 * r9);
    c5 = d32 >>> 13;
    d32 &= 8191;
    d32 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
    c5 += d32 >>> 13;
    d32 &= 8191;
    let d42 = c5 + h0 * r4 + h1 * r32 + h22 * r22 + h32 * r1 + h42 * r0;
    c5 = d42 >>> 13;
    d42 &= 8191;
    d42 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
    c5 += d42 >>> 13;
    d42 &= 8191;
    let d5 = c5 + h0 * r5 + h1 * r4 + h22 * r32 + h32 * r22 + h42 * r1;
    c5 = d5 >>> 13;
    d5 &= 8191;
    d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
    c5 += d5 >>> 13;
    d5 &= 8191;
    let d6 = c5 + h0 * r6 + h1 * r5 + h22 * r4 + h32 * r32 + h42 * r22;
    c5 = d6 >>> 13;
    d6 &= 8191;
    d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
    c5 += d6 >>> 13;
    d6 &= 8191;
    let d7 = c5 + h0 * r7 + h1 * r6 + h22 * r5 + h32 * r4 + h42 * r32;
    c5 = d7 >>> 13;
    d7 &= 8191;
    d7 += h5 * r22 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
    c5 += d7 >>> 13;
    d7 &= 8191;
    let d8 = c5 + h0 * r8 + h1 * r7 + h22 * r6 + h32 * r5 + h42 * r4;
    c5 = d8 >>> 13;
    d8 &= 8191;
    d8 += h5 * r32 + h6 * r22 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
    c5 += d8 >>> 13;
    d8 &= 8191;
    let d9 = c5 + h0 * r9 + h1 * r8 + h22 * r7 + h32 * r6 + h42 * r5;
    c5 = d9 >>> 13;
    d9 &= 8191;
    d9 += h5 * r4 + h6 * r32 + h7 * r22 + h8 * r1 + h9 * r0;
    c5 += d9 >>> 13;
    d9 &= 8191;
    c5 = (c5 << 2) + c5 | 0;
    c5 = c5 + d0 | 0;
    d0 = c5 & 8191;
    c5 = c5 >>> 13;
    d1 += c5;
    h4[0] = d0;
    h4[1] = d1;
    h4[2] = d22;
    h4[3] = d32;
    h4[4] = d42;
    h4[5] = d5;
    h4[6] = d6;
    h4[7] = d7;
    h4[8] = d8;
    h4[9] = d9;
  }
  finalize() {
    const { h: h4, pad: pad3 } = this;
    const g5 = new Uint16Array(10);
    let c5 = h4[1] >>> 13;
    h4[1] &= 8191;
    for (let i3 = 2; i3 < 10; i3++) {
      h4[i3] += c5;
      c5 = h4[i3] >>> 13;
      h4[i3] &= 8191;
    }
    h4[0] += c5 * 5;
    c5 = h4[0] >>> 13;
    h4[0] &= 8191;
    h4[1] += c5;
    c5 = h4[1] >>> 13;
    h4[1] &= 8191;
    h4[2] += c5;
    g5[0] = h4[0] + 5;
    c5 = g5[0] >>> 13;
    g5[0] &= 8191;
    for (let i3 = 1; i3 < 10; i3++) {
      g5[i3] = h4[i3] + c5;
      c5 = g5[i3] >>> 13;
      g5[i3] &= 8191;
    }
    g5[9] -= 1 << 13;
    let mask = (c5 ^ 1) - 1;
    for (let i3 = 0; i3 < 10; i3++)
      g5[i3] &= mask;
    mask = ~mask;
    for (let i3 = 0; i3 < 10; i3++)
      h4[i3] = h4[i3] & mask | g5[i3];
    h4[0] = (h4[0] | h4[1] << 13) & 65535;
    h4[1] = (h4[1] >>> 3 | h4[2] << 10) & 65535;
    h4[2] = (h4[2] >>> 6 | h4[3] << 7) & 65535;
    h4[3] = (h4[3] >>> 9 | h4[4] << 4) & 65535;
    h4[4] = (h4[4] >>> 12 | h4[5] << 1 | h4[6] << 14) & 65535;
    h4[5] = (h4[6] >>> 2 | h4[7] << 11) & 65535;
    h4[6] = (h4[7] >>> 5 | h4[8] << 8) & 65535;
    h4[7] = (h4[8] >>> 8 | h4[9] << 5) & 65535;
    let f3 = h4[0] + pad3[0];
    h4[0] = f3 & 65535;
    for (let i3 = 1; i3 < 8; i3++) {
      f3 = (h4[i3] + pad3[i3] | 0) + (f3 >>> 16) | 0;
      h4[i3] = f3 & 65535;
    }
    clean2(g5);
  }
  update(data) {
    aexists2(this);
    data = toBytes4(data);
    abytes3(data);
    const { buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(data, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(buffer, 0, false);
        this.pos = 0;
      }
    }
    return this;
  }
  destroy() {
    clean2(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(out) {
    aexists2(this);
    aoutput2(out, this);
    this.finished = true;
    const { buffer, h: h4 } = this;
    let { pos } = this;
    if (pos) {
      buffer[pos++] = 1;
      for (; pos < 16; pos++)
        buffer[pos] = 0;
      this.process(buffer, 0, true);
    }
    this.finalize();
    let opos = 0;
    for (let i3 = 0; i3 < 8; i3++) {
      out[opos++] = h4[i3] >>> 0;
      out[opos++] = h4[i3] >>> 8;
    }
    return out;
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
};
function wrapConstructorWithKey(hashCons) {
  const hashC = (msg, key) => hashCons(key).update(toBytes4(msg)).digest();
  const tmp = hashCons(new Uint8Array(32));
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (key) => hashCons(key);
  return hashC;
}
var poly1305 = wrapConstructorWithKey((key) => new Poly1305(key));

// node_modules/@noble/ciphers/esm/chacha.js
function chachaCore(s2, k6, n4, out, cnt, rounds = 20) {
  let y00 = s2[0], y01 = s2[1], y02 = s2[2], y03 = s2[3], y04 = k6[0], y05 = k6[1], y06 = k6[2], y07 = k6[3], y08 = k6[4], y09 = k6[5], y10 = k6[6], y11 = k6[7], y12 = cnt, y13 = n4[0], y14 = n4[1], y15 = n4[2];
  let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
  for (let r3 = 0; r3 < rounds; r3 += 2) {
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 16);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 12);
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 8);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 7);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 16);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 12);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 8);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 7);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 16);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 12);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 8);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 7);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 16);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 12);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 8);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 7);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 16);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 12);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 8);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 7);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 16);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 12);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 8);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 7);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 16);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 12);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 8);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 7);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 16);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 12);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 8);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 7);
  }
  let oi = 0;
  out[oi++] = y00 + x00 | 0;
  out[oi++] = y01 + x01 | 0;
  out[oi++] = y02 + x02 | 0;
  out[oi++] = y03 + x03 | 0;
  out[oi++] = y04 + x04 | 0;
  out[oi++] = y05 + x05 | 0;
  out[oi++] = y06 + x06 | 0;
  out[oi++] = y07 + x07 | 0;
  out[oi++] = y08 + x08 | 0;
  out[oi++] = y09 + x09 | 0;
  out[oi++] = y10 + x10 | 0;
  out[oi++] = y11 + x11 | 0;
  out[oi++] = y12 + x12 | 0;
  out[oi++] = y13 + x13 | 0;
  out[oi++] = y14 + x14 | 0;
  out[oi++] = y15 + x15 | 0;
}
function hchacha(s2, k6, i3, o32) {
  let x00 = s2[0], x01 = s2[1], x02 = s2[2], x03 = s2[3], x04 = k6[0], x05 = k6[1], x06 = k6[2], x07 = k6[3], x08 = k6[4], x09 = k6[5], x10 = k6[6], x11 = k6[7], x12 = i3[0], x13 = i3[1], x14 = i3[2], x15 = i3[3];
  for (let r3 = 0; r3 < 20; r3 += 2) {
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 16);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 12);
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 8);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 7);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 16);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 12);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 8);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 7);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 16);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 12);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 8);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 7);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 16);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 12);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 8);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 7);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 16);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 12);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 8);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 7);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 16);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 12);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 8);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 7);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 16);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 12);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 8);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 7);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 16);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 12);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 8);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 7);
  }
  let oi = 0;
  o32[oi++] = x00;
  o32[oi++] = x01;
  o32[oi++] = x02;
  o32[oi++] = x03;
  o32[oi++] = x12;
  o32[oi++] = x13;
  o32[oi++] = x14;
  o32[oi++] = x15;
}
var chacha20 = /* @__PURE__ */ createCipher(chachaCore, {
  counterRight: false,
  counterLength: 4,
  allowShortKeys: false
});
var xchacha20 = /* @__PURE__ */ createCipher(chachaCore, {
  counterRight: false,
  counterLength: 8,
  extendNonceFn: hchacha,
  allowShortKeys: false
});
var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
var updatePadded = (h4, msg) => {
  h4.update(msg);
  const left = msg.length % 16;
  if (left)
    h4.update(ZEROS16.subarray(left));
};
var ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
function computeTag(fn, key, nonce, data, AAD) {
  const authKey = fn(key, nonce, ZEROS32);
  const h4 = poly1305.create(authKey);
  if (AAD)
    updatePadded(h4, AAD);
  updatePadded(h4, data);
  const num = u64Lengths(data.length, AAD ? AAD.length : 0, true);
  h4.update(num);
  const res = h4.digest();
  clean2(authKey, num);
  return res;
}
var _poly1305_aead = (xorStream) => (key, nonce, AAD) => {
  const tagLength = 16;
  return {
    encrypt(plaintext, output) {
      const plength = plaintext.length;
      output = getOutput(plength + tagLength, output, false);
      output.set(plaintext);
      const oPlain = output.subarray(0, -tagLength);
      xorStream(key, nonce, oPlain, oPlain, 1);
      const tag = computeTag(xorStream, key, nonce, oPlain, AAD);
      output.set(tag, plength);
      clean2(tag);
      return output;
    },
    decrypt(ciphertext, output) {
      output = getOutput(ciphertext.length - tagLength, output, false);
      const data = ciphertext.subarray(0, -tagLength);
      const passedTag = ciphertext.subarray(-tagLength);
      const tag = computeTag(xorStream, key, nonce, data, AAD);
      if (!equalBytes(passedTag, tag))
        throw new Error("invalid tag");
      output.set(ciphertext.subarray(0, -tagLength));
      xorStream(key, nonce, output, output, 1);
      clean2(tag);
      return output;
    }
  };
};
var chacha20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 12, tagLength: 16 }, _poly1305_aead(chacha20));
var xchacha20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 24, tagLength: 16 }, _poly1305_aead(xchacha20));

// node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/hkdf.js
function extract2(hash, ikm, salt) {
  ahash(hash);
  if (salt === void 0)
    salt = new Uint8Array(hash.outputLen);
  return hmac(hash, toBytes(salt), toBytes(ikm));
}
var HKDF_COUNTER = /* @__PURE__ */ Uint8Array.from([0]);
var EMPTY_BUFFER = /* @__PURE__ */ Uint8Array.of();
function expand(hash, prk, info, length2 = 32) {
  ahash(hash);
  anumber(length2);
  const olen = hash.outputLen;
  if (length2 > 255 * olen)
    throw new Error("Length should be <= 255*HashLen");
  const blocks = Math.ceil(length2 / olen);
  if (info === void 0)
    info = EMPTY_BUFFER;
  const okm = new Uint8Array(blocks * olen);
  const HMAC2 = hmac.create(hash, prk);
  const HMACTmp = HMAC2._cloneInto();
  const T7 = new Uint8Array(HMAC2.outputLen);
  for (let counter = 0; counter < blocks; counter++) {
    HKDF_COUNTER[0] = counter + 1;
    HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T7).update(info).update(HKDF_COUNTER).digestInto(T7);
    okm.set(T7, olen * counter);
    HMAC2._cloneInto(HMACTmp);
  }
  HMAC2.destroy();
  HMACTmp.destroy();
  clean(T7, HKDF_COUNTER);
  return okm.slice(0, length2);
}
var hkdf = (hash, ikm, salt, info, length2) => expand(hash, extract2(hash, ikm, salt), info, length2);

// node_modules/@walletconnect/utils/node_modules/@noble/curves/esm/utils.js
var _0n7 = /* @__PURE__ */ BigInt(0);
var _1n7 = /* @__PURE__ */ BigInt(1);
function _abool2(value, title = "") {
  if (typeof value !== "boolean") {
    const prefix = title && `"${title}"`;
    throw new Error(prefix + "expected boolean, got type=" + typeof value);
  }
  return value;
}
function _abytes2(value, length2, title = "") {
  const bytes = isBytes(value);
  const len = value?.length;
  const needsLen = length2 !== void 0;
  if (!bytes || needsLen && len !== length2) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length2}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value;
}
function numberToHexUnpadded2(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? "0" + hex : hex;
}
function hexToNumber2(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n7 : BigInt("0x" + hex);
}
function bytesToNumberBE2(bytes) {
  return hexToNumber2(bytesToHex(bytes));
}
function bytesToNumberLE2(bytes) {
  abytes(bytes);
  return hexToNumber2(bytesToHex(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE2(n4, len) {
  return hexToBytes(n4.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE2(n4, len) {
  return numberToBytesBE2(n4, len).reverse();
}
function ensureBytes2(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e2) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e2);
    }
  } else if (isBytes(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
function equalBytes2(a3, b5) {
  if (a3.length !== b5.length)
    return false;
  let diff = 0;
  for (let i3 = 0; i3 < a3.length; i3++)
    diff |= a3[i3] ^ b5[i3];
  return diff === 0;
}
function copyBytes2(bytes) {
  return Uint8Array.from(bytes);
}
var isPosBig2 = (n4) => typeof n4 === "bigint" && _0n7 <= n4;
function inRange2(n4, min, max) {
  return isPosBig2(n4) && isPosBig2(min) && isPosBig2(max) && min <= n4 && n4 < max;
}
function aInRange2(title, n4, min, max) {
  if (!inRange2(n4, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n4);
}
function bitLen2(n4) {
  let len;
  for (len = 0; n4 > _0n7; n4 >>= _1n7, len += 1)
    ;
  return len;
}
var bitMask2 = (n4) => (_1n7 << BigInt(n4)) - _1n7;
function createHmacDrbg2(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  const u8n2 = (len) => new Uint8Array(len);
  const u8of = (byte) => Uint8Array.of(byte);
  let v9 = u8n2(hashLen);
  let k6 = u8n2(hashLen);
  let i3 = 0;
  const reset = () => {
    v9.fill(1);
    k6.fill(0);
    i3 = 0;
  };
  const h4 = (...b5) => hmacFn(k6, v9, ...b5);
  const reseed = (seed = u8n2(0)) => {
    k6 = h4(u8of(0), seed);
    v9 = h4();
    if (seed.length === 0)
      return;
    k6 = h4(u8of(1), seed);
    v9 = h4();
  };
  const gen2 = () => {
    if (i3++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v9 = h4();
      const sl = v9.slice();
      out.push(sl);
      len += v9.length;
    }
    return concatBytes(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen2())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
function _validateObject(object, fields, optFields = {}) {
  if (!object || typeof object !== "object")
    throw new Error("expected valid options object");
  function checkField(fieldName, expectedType, isOpt) {
    const val = object[fieldName];
    if (isOpt && val === void 0)
      return;
    const current = typeof val;
    if (current !== expectedType || val === null)
      throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
  }
  Object.entries(fields).forEach(([k6, v9]) => checkField(k6, v9, false));
  Object.entries(optFields).forEach(([k6, v9]) => checkField(k6, v9, true));
}
var notImplemented = () => {
  throw new Error("not implemented");
};
function memoized2(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}

// node_modules/@walletconnect/utils/node_modules/@noble/curves/esm/abstract/modular.js
var _0n8 = BigInt(0);
var _1n8 = BigInt(1);
var _2n5 = /* @__PURE__ */ BigInt(2);
var _3n3 = /* @__PURE__ */ BigInt(3);
var _4n3 = /* @__PURE__ */ BigInt(4);
var _5n2 = /* @__PURE__ */ BigInt(5);
var _7n2 = /* @__PURE__ */ BigInt(7);
var _8n2 = /* @__PURE__ */ BigInt(8);
var _9n = /* @__PURE__ */ BigInt(9);
var _16n = /* @__PURE__ */ BigInt(16);
function mod2(a3, b5) {
  const result = a3 % b5;
  return result >= _0n8 ? result : b5 + result;
}
function pow22(x8, power, modulo) {
  let res = x8;
  while (power-- > _0n8) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert2(number, modulo) {
  if (number === _0n8)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n8)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a3 = mod2(number, modulo);
  let b5 = modulo;
  let x8 = _0n8, y7 = _1n8, u3 = _1n8, v9 = _0n8;
  while (a3 !== _0n8) {
    const q4 = b5 / a3;
    const r3 = b5 % a3;
    const m3 = x8 - u3 * q4;
    const n4 = y7 - v9 * q4;
    b5 = a3, a3 = r3, x8 = u3, y7 = v9, u3 = m3, v9 = n4;
  }
  const gcd2 = b5;
  if (gcd2 !== _1n8)
    throw new Error("invert: does not exist");
  return mod2(x8, modulo);
}
function assertIsSquare(Fp2, root, n4) {
  if (!Fp2.eql(Fp2.sqr(root), n4))
    throw new Error("Cannot find square root");
}
function sqrt3mod42(Fp2, n4) {
  const p1div4 = (Fp2.ORDER + _1n8) / _4n3;
  const root = Fp2.pow(n4, p1div4);
  assertIsSquare(Fp2, root, n4);
  return root;
}
function sqrt5mod82(Fp2, n4) {
  const p5div8 = (Fp2.ORDER - _5n2) / _8n2;
  const n22 = Fp2.mul(n4, _2n5);
  const v9 = Fp2.pow(n22, p5div8);
  const nv = Fp2.mul(n4, v9);
  const i3 = Fp2.mul(Fp2.mul(nv, _2n5), v9);
  const root = Fp2.mul(nv, Fp2.sub(i3, Fp2.ONE));
  assertIsSquare(Fp2, root, n4);
  return root;
}
function sqrt9mod16(P6) {
  const Fp_ = Field2(P6);
  const tn2 = tonelliShanks2(P6);
  const c1 = tn2(Fp_, Fp_.neg(Fp_.ONE));
  const c22 = tn2(Fp_, c1);
  const c32 = tn2(Fp_, Fp_.neg(c1));
  const c42 = (P6 + _7n2) / _16n;
  return (Fp2, n4) => {
    let tv1 = Fp2.pow(n4, c42);
    let tv2 = Fp2.mul(tv1, c1);
    const tv3 = Fp2.mul(tv1, c22);
    const tv4 = Fp2.mul(tv1, c32);
    const e1 = Fp2.eql(Fp2.sqr(tv2), n4);
    const e2 = Fp2.eql(Fp2.sqr(tv3), n4);
    tv1 = Fp2.cmov(tv1, tv2, e1);
    tv2 = Fp2.cmov(tv4, tv3, e2);
    const e3 = Fp2.eql(Fp2.sqr(tv2), n4);
    const root = Fp2.cmov(tv1, tv2, e3);
    assertIsSquare(Fp2, root, n4);
    return root;
  };
}
function tonelliShanks2(P6) {
  if (P6 < _3n3)
    throw new Error("sqrt is not defined for small field");
  let Q4 = P6 - _1n8;
  let S5 = 0;
  while (Q4 % _2n5 === _0n8) {
    Q4 /= _2n5;
    S5++;
  }
  let Z4 = _2n5;
  const _Fp = Field2(P6);
  while (FpLegendre2(_Fp, Z4) === 1) {
    if (Z4++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S5 === 1)
    return sqrt3mod42;
  let cc = _Fp.pow(Z4, Q4);
  const Q1div2 = (Q4 + _1n8) / _2n5;
  return function tonelliSlow(Fp2, n4) {
    if (Fp2.is0(n4))
      return n4;
    if (FpLegendre2(Fp2, n4) !== 1)
      throw new Error("Cannot find square root");
    let M6 = S5;
    let c5 = Fp2.mul(Fp2.ONE, cc);
    let t = Fp2.pow(n4, Q4);
    let R4 = Fp2.pow(n4, Q1div2);
    while (!Fp2.eql(t, Fp2.ONE)) {
      if (Fp2.is0(t))
        return Fp2.ZERO;
      let i3 = 1;
      let t_tmp = Fp2.sqr(t);
      while (!Fp2.eql(t_tmp, Fp2.ONE)) {
        i3++;
        t_tmp = Fp2.sqr(t_tmp);
        if (i3 === M6)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n8 << BigInt(M6 - i3 - 1);
      const b5 = Fp2.pow(c5, exponent);
      M6 = i3;
      c5 = Fp2.sqr(b5);
      t = Fp2.mul(t, c5);
      R4 = Fp2.mul(R4, b5);
    }
    return R4;
  };
}
function FpSqrt2(P6) {
  if (P6 % _4n3 === _3n3)
    return sqrt3mod42;
  if (P6 % _8n2 === _5n2)
    return sqrt5mod82;
  if (P6 % _16n === _9n)
    return sqrt9mod16(P6);
  return tonelliShanks2(P6);
}
var isNegativeLE = (num, modulo) => (mod2(num, modulo) & _1n8) === _1n8;
var FIELD_FIELDS2 = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField2(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "number",
    BITS: "number"
  };
  const opts = FIELD_FIELDS2.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  _validateObject(field, opts);
  return field;
}
function FpPow2(Fp2, num, power) {
  if (power < _0n8)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n8)
    return Fp2.ONE;
  if (power === _1n8)
    return num;
  let p5 = Fp2.ONE;
  let d5 = num;
  while (power > _0n8) {
    if (power & _1n8)
      p5 = Fp2.mul(p5, d5);
    d5 = Fp2.sqr(d5);
    power >>= _1n8;
  }
  return p5;
}
function FpInvertBatch2(Fp2, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp2.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i3) => {
    if (Fp2.is0(num))
      return acc;
    inverted[i3] = acc;
    return Fp2.mul(acc, num);
  }, Fp2.ONE);
  const invertedAcc = Fp2.inv(multipliedAcc);
  nums.reduceRight((acc, num, i3) => {
    if (Fp2.is0(num))
      return acc;
    inverted[i3] = Fp2.mul(acc, inverted[i3]);
    return Fp2.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre2(Fp2, n4) {
  const p1mod2 = (Fp2.ORDER - _1n8) / _2n5;
  const powered = Fp2.pow(n4, p1mod2);
  const yes = Fp2.eql(powered, Fp2.ONE);
  const zero = Fp2.eql(powered, Fp2.ZERO);
  const no3 = Fp2.eql(powered, Fp2.neg(Fp2.ONE));
  if (!yes && !zero && !no3)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength2(n4, nBitLength) {
  if (nBitLength !== void 0)
    anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n4.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field2(ORDER, bitLenOrOpts, isLE3 = false, opts = {}) {
  if (ORDER <= _0n8)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  let _nbitLength = void 0;
  let _sqrt = void 0;
  let modFromBytes = false;
  let allowedLengths = void 0;
  if (typeof bitLenOrOpts === "object" && bitLenOrOpts != null) {
    if (opts.sqrt || isLE3)
      throw new Error("cannot specify opts in two arguments");
    const _opts = bitLenOrOpts;
    if (_opts.BITS)
      _nbitLength = _opts.BITS;
    if (_opts.sqrt)
      _sqrt = _opts.sqrt;
    if (typeof _opts.isLE === "boolean")
      isLE3 = _opts.isLE;
    if (typeof _opts.modFromBytes === "boolean")
      modFromBytes = _opts.modFromBytes;
    allowedLengths = _opts.allowedLengths;
  } else {
    if (typeof bitLenOrOpts === "number")
      _nbitLength = bitLenOrOpts;
    if (opts.sqrt)
      _sqrt = opts.sqrt;
  }
  const { nBitLength: BITS, nByteLength: BYTES } = nLength2(ORDER, _nbitLength);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f3 = Object.freeze({
    ORDER,
    isLE: isLE3,
    BITS,
    BYTES,
    MASK: bitMask2(BITS),
    ZERO: _0n8,
    ONE: _1n8,
    allowedLengths,
    create: (num) => mod2(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n8 <= num && num < ORDER;
    },
    is0: (num) => num === _0n8,
    // is valid and invertible
    isValidNot0: (num) => !f3.is0(num) && f3.isValid(num),
    isOdd: (num) => (num & _1n8) === _1n8,
    neg: (num) => mod2(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod2(num * num, ORDER),
    add: (lhs, rhs) => mod2(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod2(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod2(lhs * rhs, ORDER),
    pow: (num, power) => FpPow2(f3, num, power),
    div: (lhs, rhs) => mod2(lhs * invert2(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert2(num, ORDER),
    sqrt: _sqrt || ((n4) => {
      if (!sqrtP)
        sqrtP = FpSqrt2(ORDER);
      return sqrtP(f3, n4);
    }),
    toBytes: (num) => isLE3 ? numberToBytesLE2(num, BYTES) : numberToBytesBE2(num, BYTES),
    fromBytes: (bytes, skipValidation = true) => {
      if (allowedLengths) {
        if (!allowedLengths.includes(bytes.length) || bytes.length > BYTES) {
          throw new Error("Field.fromBytes: expected " + allowedLengths + " bytes, got " + bytes.length);
        }
        const padded = new Uint8Array(BYTES);
        padded.set(bytes, isLE3 ? 0 : padded.length - bytes.length);
        bytes = padded;
      }
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      let scalar = isLE3 ? bytesToNumberLE2(bytes) : bytesToNumberBE2(bytes);
      if (modFromBytes)
        scalar = mod2(scalar, ORDER);
      if (!skipValidation) {
        if (!f3.isValid(scalar))
          throw new Error("invalid field element: outside of range 0..ORDER");
      }
      return scalar;
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch2(f3, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a3, b5, c5) => c5 ? b5 : a3
  });
  return Object.freeze(f3);
}
function getFieldBytesLength2(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength2(fieldOrder) {
  const length2 = getFieldBytesLength2(fieldOrder);
  return length2 + Math.ceil(length2 / 2);
}
function mapHashToField2(key, fieldOrder, isLE3 = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength2(fieldOrder);
  const minLen = getMinHashLength2(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE3 ? bytesToNumberLE2(key) : bytesToNumberBE2(key);
  const reduced = mod2(num, fieldOrder - _1n8) + _1n8;
  return isLE3 ? numberToBytesLE2(reduced, fieldLen) : numberToBytesBE2(reduced, fieldLen);
}

// node_modules/@walletconnect/utils/node_modules/@noble/curves/esm/abstract/curve.js
var _0n9 = BigInt(0);
var _1n9 = BigInt(1);
function negateCt(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function normalizeZ(c5, points) {
  const invertedZs = FpInvertBatch2(c5.Fp, points.map((p5) => p5.Z));
  return points.map((p5, i3) => c5.fromAffine(p5.toAffine(invertedZs[i3])));
}
function validateW2(W5, bits) {
  if (!Number.isSafeInteger(W5) || W5 <= 0 || W5 > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W5);
}
function calcWOpts2(W5, scalarBits) {
  validateW2(W5, scalarBits);
  const windows = Math.ceil(scalarBits / W5) + 1;
  const windowSize = 2 ** (W5 - 1);
  const maxNumber = 2 ** W5;
  const mask = bitMask2(W5);
  const shiftBy = BigInt(W5);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets2(n4, window2, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n4 & mask);
  let nextN = n4 >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n9;
  }
  const offsetStart = window2 * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window2 % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints2(points, c5) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p5, i3) => {
    if (!(p5 instanceof c5))
      throw new Error("invalid point at index " + i3);
  });
}
function validateMSMScalars2(scalars, field) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s2, i3) => {
    if (!field.isValid(s2))
      throw new Error("invalid scalar at index " + i3);
  });
}
var pointPrecomputes2 = /* @__PURE__ */ new WeakMap();
var pointWindowSizes2 = /* @__PURE__ */ new WeakMap();
function getW2(P6) {
  return pointWindowSizes2.get(P6) || 1;
}
function assert0(n4) {
  if (n4 !== _0n9)
    throw new Error("invalid wNAF");
}
var wNAF2 = class {
  // Parametrized with a given Point class (not individual point)
  constructor(Point, bits) {
    this.BASE = Point.BASE;
    this.ZERO = Point.ZERO;
    this.Fn = Point.Fn;
    this.bits = bits;
  }
  // non-const time multiplication ladder
  _unsafeLadder(elm, n4, p5 = this.ZERO) {
    let d5 = elm;
    while (n4 > _0n9) {
      if (n4 & _1n9)
        p5 = p5.add(d5);
      d5 = d5.double();
      n4 >>= _1n9;
    }
    return p5;
  }
  /**
   * Creates a wNAF precomputation window. Used for caching.
   * Default window size is set by `utils.precompute()` and is equal to 8.
   * Number of precomputed points depends on the curve size:
   * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
   * - 𝑊 is the window size
   * - 𝑛 is the bitlength of the curve order.
   * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
   * @param point Point instance
   * @param W window size
   * @returns precomputed point tables flattened to a single array
   */
  precomputeWindow(point, W5) {
    const { windows, windowSize } = calcWOpts2(W5, this.bits);
    const points = [];
    let p5 = point;
    let base3 = p5;
    for (let window2 = 0; window2 < windows; window2++) {
      base3 = p5;
      points.push(base3);
      for (let i3 = 1; i3 < windowSize; i3++) {
        base3 = base3.add(p5);
        points.push(base3);
      }
      p5 = base3.double();
    }
    return points;
  }
  /**
   * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
   * More compact implementation:
   * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
   * @returns real and fake (for const-time) points
   */
  wNAF(W5, precomputes, n4) {
    if (!this.Fn.isValid(n4))
      throw new Error("invalid scalar");
    let p5 = this.ZERO;
    let f3 = this.BASE;
    const wo2 = calcWOpts2(W5, this.bits);
    for (let window2 = 0; window2 < wo2.windows; window2++) {
      const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets2(n4, window2, wo2);
      n4 = nextN;
      if (isZero) {
        f3 = f3.add(negateCt(isNegF, precomputes[offsetF]));
      } else {
        p5 = p5.add(negateCt(isNeg, precomputes[offset]));
      }
    }
    assert0(n4);
    return { p: p5, f: f3 };
  }
  /**
   * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
   * @param acc accumulator point to add result of multiplication
   * @returns point
   */
  wNAFUnsafe(W5, precomputes, n4, acc = this.ZERO) {
    const wo2 = calcWOpts2(W5, this.bits);
    for (let window2 = 0; window2 < wo2.windows; window2++) {
      if (n4 === _0n9)
        break;
      const { nextN, offset, isZero, isNeg } = calcOffsets2(n4, window2, wo2);
      n4 = nextN;
      if (isZero) {
        continue;
      } else {
        const item = precomputes[offset];
        acc = acc.add(isNeg ? item.negate() : item);
      }
    }
    assert0(n4);
    return acc;
  }
  getPrecomputes(W5, point, transform) {
    let comp = pointPrecomputes2.get(point);
    if (!comp) {
      comp = this.precomputeWindow(point, W5);
      if (W5 !== 1) {
        if (typeof transform === "function")
          comp = transform(comp);
        pointPrecomputes2.set(point, comp);
      }
    }
    return comp;
  }
  cached(point, scalar, transform) {
    const W5 = getW2(point);
    return this.wNAF(W5, this.getPrecomputes(W5, point, transform), scalar);
  }
  unsafe(point, scalar, transform, prev) {
    const W5 = getW2(point);
    if (W5 === 1)
      return this._unsafeLadder(point, scalar, prev);
    return this.wNAFUnsafe(W5, this.getPrecomputes(W5, point, transform), scalar, prev);
  }
  // We calculate precomputes for elliptic curve point multiplication
  // using windowed method. This specifies window size and
  // stores precomputed values. Usually only base point would be precomputed.
  createCache(P6, W5) {
    validateW2(W5, this.bits);
    pointWindowSizes2.set(P6, W5);
    pointPrecomputes2.delete(P6);
  }
  hasCache(elm) {
    return getW2(elm) !== 1;
  }
};
function mulEndoUnsafe(Point, point, k1, k22) {
  let acc = point;
  let p1 = Point.ZERO;
  let p22 = Point.ZERO;
  while (k1 > _0n9 || k22 > _0n9) {
    if (k1 & _1n9)
      p1 = p1.add(acc);
    if (k22 & _1n9)
      p22 = p22.add(acc);
    acc = acc.double();
    k1 >>= _1n9;
    k22 >>= _1n9;
  }
  return { p1, p2: p22 };
}
function pippenger2(c5, fieldN, points, scalars) {
  validateMSMPoints2(points, c5);
  validateMSMScalars2(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength)
    throw new Error("arrays of points and scalars must have equal length");
  const zero = c5.ZERO;
  const wbits = bitLen2(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12)
    windowSize = wbits - 3;
  else if (wbits > 4)
    windowSize = wbits - 2;
  else if (wbits > 0)
    windowSize = 2;
  const MASK = bitMask2(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i3 = lastBits; i3 >= 0; i3 -= windowSize) {
    buckets.fill(zero);
    for (let j6 = 0; j6 < slength; j6++) {
      const scalar = scalars[j6];
      const wbits2 = Number(scalar >> BigInt(i3) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j6]);
    }
    let resI = zero;
    for (let j6 = buckets.length - 1, sumI = zero; j6 > 0; j6--) {
      sumI = sumI.add(buckets[j6]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i3 !== 0)
      for (let j6 = 0; j6 < windowSize; j6++)
        sum = sum.double();
  }
  return sum;
}
function createField(order, field, isLE3) {
  if (field) {
    if (field.ORDER !== order)
      throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    validateField2(field);
    return field;
  } else {
    return Field2(order, { isLE: isLE3 });
  }
}
function _createCurveFields(type, CURVE, curveOpts = {}, FpFnLE) {
  if (FpFnLE === void 0)
    FpFnLE = type === "edwards";
  if (!CURVE || typeof CURVE !== "object")
    throw new Error(`expected valid ${type} CURVE object`);
  for (const p5 of ["p", "n", "h"]) {
    const val = CURVE[p5];
    if (!(typeof val === "bigint" && val > _0n9))
      throw new Error(`CURVE.${p5} must be positive bigint`);
  }
  const Fp2 = createField(CURVE.p, curveOpts.Fp, FpFnLE);
  const Fn4 = createField(CURVE.n, curveOpts.Fn, FpFnLE);
  const _b = type === "weierstrass" ? "b" : "d";
  const params = ["Gx", "Gy", "a", _b];
  for (const p5 of params) {
    if (!Fp2.isValid(CURVE[p5]))
      throw new Error(`CURVE.${p5} must be valid field element of CURVE.Fp`);
  }
  CURVE = Object.freeze(Object.assign({}, CURVE));
  return { CURVE, Fp: Fp2, Fn: Fn4 };
}

// node_modules/@walletconnect/utils/node_modules/@noble/curves/esm/abstract/edwards.js
var _0n10 = BigInt(0);
var _1n10 = BigInt(1);
var _2n6 = BigInt(2);
var _8n3 = BigInt(8);
function isEdValidXY(Fp2, CURVE, x8, y7) {
  const x22 = Fp2.sqr(x8);
  const y22 = Fp2.sqr(y7);
  const left = Fp2.add(Fp2.mul(CURVE.a, x22), y22);
  const right = Fp2.add(Fp2.ONE, Fp2.mul(CURVE.d, Fp2.mul(x22, y22)));
  return Fp2.eql(left, right);
}
function edwards(params, extraOpts = {}) {
  const validated = _createCurveFields("edwards", params, extraOpts, extraOpts.FpFnLE);
  const { Fp: Fp2, Fn: Fn4 } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor } = CURVE;
  _validateObject(extraOpts, {}, { uvRatio: "function" });
  const MASK = _2n6 << BigInt(Fn4.BYTES * 8) - _1n10;
  const modP = (n4) => Fp2.create(n4);
  const uvRatio2 = extraOpts.uvRatio || ((u3, v9) => {
    try {
      return { isValid: true, value: Fp2.sqrt(Fp2.div(u3, v9)) };
    } catch (e2) {
      return { isValid: false, value: _0n10 };
    }
  });
  if (!isEdValidXY(Fp2, CURVE, CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  function acoord(title, n4, banZero = false) {
    const min = banZero ? _1n10 : _0n10;
    aInRange2("coordinate " + title, n4, min, MASK);
    return n4;
  }
  function aextpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ExtendedPoint expected");
  }
  const toAffineMemo = memoized2((p5, iz) => {
    const { X: X3, Y: Y4, Z: Z4 } = p5;
    const is0 = p5.is0();
    if (iz == null)
      iz = is0 ? _8n3 : Fp2.inv(Z4);
    const x8 = modP(X3 * iz);
    const y7 = modP(Y4 * iz);
    const zz = Fp2.mul(Z4, iz);
    if (is0)
      return { x: _0n10, y: _1n10 };
    if (zz !== _1n10)
      throw new Error("invZ was invalid");
    return { x: x8, y: y7 };
  });
  const assertValidMemo = memoized2((p5) => {
    const { a: a3, d: d5 } = CURVE;
    if (p5.is0())
      throw new Error("bad point: ZERO");
    const { X: X3, Y: Y4, Z: Z4, T: T7 } = p5;
    const X22 = modP(X3 * X3);
    const Y22 = modP(Y4 * Y4);
    const Z22 = modP(Z4 * Z4);
    const Z42 = modP(Z22 * Z22);
    const aX2 = modP(X22 * a3);
    const left = modP(Z22 * modP(aX2 + Y22));
    const right = modP(Z42 + modP(d5 * modP(X22 * Y22)));
    if (left !== right)
      throw new Error("bad point: equation left != right (1)");
    const XY = modP(X3 * Y4);
    const ZT = modP(Z4 * T7);
    if (XY !== ZT)
      throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class Point {
    constructor(X3, Y4, Z4, T7) {
      this.X = acoord("x", X3);
      this.Y = acoord("y", Y4);
      this.Z = acoord("z", Z4, true);
      this.T = acoord("t", T7);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    static fromAffine(p5) {
      if (p5 instanceof Point)
        throw new Error("extended point not allowed");
      const { x: x8, y: y7 } = p5 || {};
      acoord("x", x8);
      acoord("y", y7);
      return new Point(x8, y7, _1n10, modP(x8 * y7));
    }
    // Uses algo from RFC8032 5.1.3.
    static fromBytes(bytes, zip215 = false) {
      const len = Fp2.BYTES;
      const { a: a3, d: d5 } = CURVE;
      bytes = copyBytes2(_abytes2(bytes, len, "point"));
      _abool2(zip215, "zip215");
      const normed = copyBytes2(bytes);
      const lastByte = bytes[len - 1];
      normed[len - 1] = lastByte & ~128;
      const y7 = bytesToNumberLE2(normed);
      const max = zip215 ? MASK : Fp2.ORDER;
      aInRange2("point.y", y7, _0n10, max);
      const y22 = modP(y7 * y7);
      const u3 = modP(y22 - _1n10);
      const v9 = modP(d5 * y22 - a3);
      let { isValid, value: x8 } = uvRatio2(u3, v9);
      if (!isValid)
        throw new Error("bad point: invalid y coordinate");
      const isXOdd = (x8 & _1n10) === _1n10;
      const isLastByteOdd = (lastByte & 128) !== 0;
      if (!zip215 && x8 === _0n10 && isLastByteOdd)
        throw new Error("bad point: x=0 and x_0=1");
      if (isLastByteOdd !== isXOdd)
        x8 = modP(-x8);
      return Point.fromAffine({ x: x8, y: y7 });
    }
    static fromHex(bytes, zip215 = false) {
      return Point.fromBytes(ensureBytes2("point", bytes), zip215);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy)
        this.multiply(_2n6);
      return this;
    }
    // Useful in fromAffine() - not for fromBytes(), which always created valid points.
    assertValidity() {
      assertValidMemo(this);
    }
    // Compare one point to another.
    equals(other) {
      aextpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X22, Y: Y22, Z: Z22 } = other;
      const X1Z2 = modP(X1 * Z22);
      const X2Z1 = modP(X22 * Z1);
      const Y1Z2 = modP(Y1 * Z22);
      const Y2Z1 = modP(Y22 * Z1);
      return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    negate() {
      return new Point(modP(-this.X), this.Y, this.Z, modP(-this.T));
    }
    // Fast algo for doubling Extended Point.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
    // Cost: 4M + 4S + 1*a + 6add + 1*2.
    double() {
      const { a: a3 } = CURVE;
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const A4 = modP(X1 * X1);
      const B4 = modP(Y1 * Y1);
      const C4 = modP(_2n6 * modP(Z1 * Z1));
      const D5 = modP(a3 * A4);
      const x1y1 = X1 + Y1;
      const E6 = modP(modP(x1y1 * x1y1) - A4 - B4);
      const G5 = D5 + B4;
      const F4 = G5 - C4;
      const H6 = D5 - B4;
      const X3 = modP(E6 * F4);
      const Y32 = modP(G5 * H6);
      const T32 = modP(E6 * H6);
      const Z32 = modP(F4 * G5);
      return new Point(X3, Y32, Z32, T32);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(other) {
      aextpoint(other);
      const { a: a3, d: d5 } = CURVE;
      const { X: X1, Y: Y1, Z: Z1, T: T1 } = this;
      const { X: X22, Y: Y22, Z: Z22, T: T22 } = other;
      const A4 = modP(X1 * X22);
      const B4 = modP(Y1 * Y22);
      const C4 = modP(T1 * d5 * T22);
      const D5 = modP(Z1 * Z22);
      const E6 = modP((X1 + Y1) * (X22 + Y22) - A4 - B4);
      const F4 = D5 - C4;
      const G5 = D5 + C4;
      const H6 = modP(B4 - a3 * A4);
      const X3 = modP(E6 * F4);
      const Y32 = modP(G5 * H6);
      const T32 = modP(E6 * H6);
      const Z32 = modP(F4 * G5);
      return new Point(X3, Y32, Z32, T32);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    // Constant-time multiplication.
    multiply(scalar) {
      if (!Fn4.isValidNot0(scalar))
        throw new Error("invalid scalar: expected 1 <= sc < curve.n");
      const { p: p5, f: f3 } = wnaf.cached(this, scalar, (p6) => normalizeZ(Point, p6));
      return normalizeZ(Point, [p5, f3])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    // Accepts optional accumulator to merge with multiply (important for sparse scalars)
    multiplyUnsafe(scalar, acc = Point.ZERO) {
      if (!Fn4.isValid(scalar))
        throw new Error("invalid scalar: expected 0 <= sc < curve.n");
      if (scalar === _0n10)
        return Point.ZERO;
      if (this.is0() || scalar === _1n10)
        return this;
      return wnaf.unsafe(this, scalar, (p5) => normalizeZ(Point, p5), acc);
    }
    // Checks if point is of small order.
    // If you add something to small order point, you will have "dirty"
    // point with torsion component.
    // Multiplies point by cofactor and checks if the result is 0.
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    // Multiplies point by curve order and checks if the result is 0.
    // Returns `false` is the point is dirty.
    isTorsionFree() {
      return wnaf.unsafe(this, CURVE.n).is0();
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    clearCofactor() {
      if (cofactor === _1n10)
        return this;
      return this.multiplyUnsafe(cofactor);
    }
    toBytes() {
      const { x: x8, y: y7 } = this.toAffine();
      const bytes = Fp2.toBytes(y7);
      bytes[bytes.length - 1] |= x8 & _1n10 ? 128 : 0;
      return bytes;
    }
    toHex() {
      return bytesToHex(this.toBytes());
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    // TODO: remove
    get ex() {
      return this.X;
    }
    get ey() {
      return this.Y;
    }
    get ez() {
      return this.Z;
    }
    get et() {
      return this.T;
    }
    static normalizeZ(points) {
      return normalizeZ(Point, points);
    }
    static msm(points, scalars) {
      return pippenger2(Point, Fn4, points, scalars);
    }
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    toRawBytes() {
      return this.toBytes();
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, _1n10, modP(CURVE.Gx * CURVE.Gy));
  Point.ZERO = new Point(_0n10, _1n10, _1n10, _0n10);
  Point.Fp = Fp2;
  Point.Fn = Fn4;
  const wnaf = new wNAF2(Point, Fn4.BITS);
  Point.BASE.precompute(8);
  return Point;
}
var PrimeEdwardsPoint = class {
  constructor(ep) {
    this.ep = ep;
  }
  // Static methods that must be implemented by subclasses
  static fromBytes(_bytes) {
    notImplemented();
  }
  static fromHex(_hex) {
    notImplemented();
  }
  get x() {
    return this.toAffine().x;
  }
  get y() {
    return this.toAffine().y;
  }
  // Common implementations
  clearCofactor() {
    return this;
  }
  assertValidity() {
    this.ep.assertValidity();
  }
  toAffine(invertedZ) {
    return this.ep.toAffine(invertedZ);
  }
  toHex() {
    return bytesToHex(this.toBytes());
  }
  toString() {
    return this.toHex();
  }
  isTorsionFree() {
    return true;
  }
  isSmallOrder() {
    return false;
  }
  add(other) {
    this.assertSame(other);
    return this.init(this.ep.add(other.ep));
  }
  subtract(other) {
    this.assertSame(other);
    return this.init(this.ep.subtract(other.ep));
  }
  multiply(scalar) {
    return this.init(this.ep.multiply(scalar));
  }
  multiplyUnsafe(scalar) {
    return this.init(this.ep.multiplyUnsafe(scalar));
  }
  double() {
    return this.init(this.ep.double());
  }
  negate() {
    return this.init(this.ep.negate());
  }
  precompute(windowSize, isLazy) {
    return this.init(this.ep.precompute(windowSize, isLazy));
  }
  /** @deprecated use `toBytes` */
  toRawBytes() {
    return this.toBytes();
  }
};
function eddsa(Point, cHash, eddsaOpts = {}) {
  if (typeof cHash !== "function")
    throw new Error('"hash" function param is required');
  _validateObject(eddsaOpts, {}, {
    adjustScalarBytes: "function",
    randomBytes: "function",
    domain: "function",
    prehash: "function",
    mapToCurve: "function"
  });
  const { prehash } = eddsaOpts;
  const { BASE, Fp: Fp2, Fn: Fn4 } = Point;
  const randomBytes2 = eddsaOpts.randomBytes || randomBytes;
  const adjustScalarBytes2 = eddsaOpts.adjustScalarBytes || ((bytes) => bytes);
  const domain = eddsaOpts.domain || ((data, ctx, phflag) => {
    _abool2(phflag, "phflag");
    if (ctx.length || phflag)
      throw new Error("Contexts/pre-hash are not supported");
    return data;
  });
  function modN_LE(hash) {
    return Fn4.create(bytesToNumberLE2(hash));
  }
  function getPrivateScalar(key) {
    const len = lengths.secretKey;
    key = ensureBytes2("private key", key, len);
    const hashed = ensureBytes2("hashed private key", cHash(key), 2 * len);
    const head = adjustScalarBytes2(hashed.slice(0, len));
    const prefix = hashed.slice(len, 2 * len);
    const scalar = modN_LE(head);
    return { head, prefix, scalar };
  }
  function getExtendedPublicKey(secretKey) {
    const { head, prefix, scalar } = getPrivateScalar(secretKey);
    const point = BASE.multiply(scalar);
    const pointBytes = point.toBytes();
    return { head, prefix, scalar, point, pointBytes };
  }
  function getPublicKey2(secretKey) {
    return getExtendedPublicKey(secretKey).pointBytes;
  }
  function hashDomainToScalar(context = Uint8Array.of(), ...msgs) {
    const msg = concatBytes(...msgs);
    return modN_LE(cHash(domain(msg, ensureBytes2("context", context), !!prehash)));
  }
  function sign2(msg, secretKey, options = {}) {
    msg = ensureBytes2("message", msg);
    if (prehash)
      msg = prehash(msg);
    const { prefix, scalar, pointBytes } = getExtendedPublicKey(secretKey);
    const r3 = hashDomainToScalar(options.context, prefix, msg);
    const R4 = BASE.multiply(r3).toBytes();
    const k6 = hashDomainToScalar(options.context, R4, pointBytes, msg);
    const s2 = Fn4.create(r3 + k6 * scalar);
    if (!Fn4.isValid(s2))
      throw new Error("sign failed: invalid s");
    const rs = concatBytes(R4, Fn4.toBytes(s2));
    return _abytes2(rs, lengths.signature, "result");
  }
  const verifyOpts = { zip215: true };
  function verify2(sig, msg, publicKey, options = verifyOpts) {
    const { context, zip215 } = options;
    const len = lengths.signature;
    sig = ensureBytes2("signature", sig, len);
    msg = ensureBytes2("message", msg);
    publicKey = ensureBytes2("publicKey", publicKey, lengths.publicKey);
    if (zip215 !== void 0)
      _abool2(zip215, "zip215");
    if (prehash)
      msg = prehash(msg);
    const mid = len / 2;
    const r3 = sig.subarray(0, mid);
    const s2 = bytesToNumberLE2(sig.subarray(mid, len));
    let A4, R4, SB;
    try {
      A4 = Point.fromBytes(publicKey, zip215);
      R4 = Point.fromBytes(r3, zip215);
      SB = BASE.multiplyUnsafe(s2);
    } catch (error) {
      return false;
    }
    if (!zip215 && A4.isSmallOrder())
      return false;
    const k6 = hashDomainToScalar(context, R4.toBytes(), A4.toBytes(), msg);
    const RkA = R4.add(A4.multiplyUnsafe(k6));
    return RkA.subtract(SB).clearCofactor().is0();
  }
  const _size = Fp2.BYTES;
  const lengths = {
    secretKey: _size,
    publicKey: _size,
    signature: 2 * _size,
    seed: _size
  };
  function randomSecretKey(seed = randomBytes2(lengths.seed)) {
    return _abytes2(seed, lengths.seed, "seed");
  }
  function keygen(seed) {
    const secretKey = utils.randomSecretKey(seed);
    return { secretKey, publicKey: getPublicKey2(secretKey) };
  }
  function isValidSecretKey(key) {
    return isBytes(key) && key.length === Fn4.BYTES;
  }
  function isValidPublicKey(key, zip215) {
    try {
      return !!Point.fromBytes(key, zip215);
    } catch (error) {
      return false;
    }
  }
  const utils = {
    getExtendedPublicKey,
    randomSecretKey,
    isValidSecretKey,
    isValidPublicKey,
    /**
     * Converts ed public key to x public key. Uses formula:
     * - ed25519:
     *   - `(u, v) = ((1+y)/(1-y), sqrt(-486664)*u/x)`
     *   - `(x, y) = (sqrt(-486664)*u/v, (u-1)/(u+1))`
     * - ed448:
     *   - `(u, v) = ((y-1)/(y+1), sqrt(156324)*u/x)`
     *   - `(x, y) = (sqrt(156324)*u/v, (1+u)/(1-u))`
     */
    toMontgomery(publicKey) {
      const { y: y7 } = Point.fromBytes(publicKey);
      const size3 = lengths.publicKey;
      const is25519 = size3 === 32;
      if (!is25519 && size3 !== 57)
        throw new Error("only defined for 25519 and 448");
      const u3 = is25519 ? Fp2.div(_1n10 + y7, _1n10 - y7) : Fp2.div(y7 - _1n10, y7 + _1n10);
      return Fp2.toBytes(u3);
    },
    toMontgomerySecret(secretKey) {
      const size3 = lengths.secretKey;
      _abytes2(secretKey, size3);
      const hashed = cHash(secretKey.subarray(0, size3));
      return adjustScalarBytes2(hashed).subarray(0, size3);
    },
    /** @deprecated */
    randomPrivateKey: randomSecretKey,
    /** @deprecated */
    precompute(windowSize = 8, point = Point.BASE) {
      return point.precompute(windowSize, false);
    }
  };
  return Object.freeze({
    keygen,
    getPublicKey: getPublicKey2,
    sign: sign2,
    verify: verify2,
    utils,
    Point,
    lengths
  });
}
function _eddsa_legacy_opts_to_new(c5) {
  const CURVE = {
    a: c5.a,
    d: c5.d,
    p: c5.Fp.ORDER,
    n: c5.n,
    h: c5.h,
    Gx: c5.Gx,
    Gy: c5.Gy
  };
  const Fp2 = c5.Fp;
  const Fn4 = Field2(CURVE.n, c5.nBitLength, true);
  const curveOpts = { Fp: Fp2, Fn: Fn4, uvRatio: c5.uvRatio };
  const eddsaOpts = {
    randomBytes: c5.randomBytes,
    adjustScalarBytes: c5.adjustScalarBytes,
    domain: c5.domain,
    prehash: c5.prehash,
    mapToCurve: c5.mapToCurve
  };
  return { CURVE, curveOpts, hash: c5.hash, eddsaOpts };
}
function _eddsa_new_output_to_legacy(c5, eddsa2) {
  const Point = eddsa2.Point;
  const legacy = Object.assign({}, eddsa2, {
    ExtendedPoint: Point,
    CURVE: c5,
    nBitLength: Point.Fn.BITS,
    nByteLength: Point.Fn.BYTES
  });
  return legacy;
}
function twistedEdwards(c5) {
  const { CURVE, curveOpts, hash, eddsaOpts } = _eddsa_legacy_opts_to_new(c5);
  const Point = edwards(CURVE, curveOpts);
  const EDDSA = eddsa(Point, hash, eddsaOpts);
  return _eddsa_new_output_to_legacy(c5, EDDSA);
}

// node_modules/@walletconnect/utils/node_modules/@noble/curves/esm/abstract/montgomery.js
var _0n11 = BigInt(0);
var _1n11 = BigInt(1);
var _2n7 = BigInt(2);
function validateOpts2(curve) {
  _validateObject(curve, {
    adjustScalarBytes: "function",
    powPminus2: "function"
  });
  return Object.freeze({ ...curve });
}
function montgomery(curveDef) {
  const CURVE = validateOpts2(curveDef);
  const { P: P6, type, adjustScalarBytes: adjustScalarBytes2, powPminus2, randomBytes: rand } = CURVE;
  const is25519 = type === "x25519";
  if (!is25519 && type !== "x448")
    throw new Error("invalid type");
  const randomBytes_ = rand || randomBytes;
  const montgomeryBits = is25519 ? 255 : 448;
  const fieldLen = is25519 ? 32 : 56;
  const Gu = is25519 ? BigInt(9) : BigInt(5);
  const a24 = is25519 ? BigInt(121665) : BigInt(39081);
  const minScalar = is25519 ? _2n7 ** BigInt(254) : _2n7 ** BigInt(447);
  const maxAdded = is25519 ? BigInt(8) * _2n7 ** BigInt(251) - _1n11 : BigInt(4) * _2n7 ** BigInt(445) - _1n11;
  const maxScalar = minScalar + maxAdded + _1n11;
  const modP = (n4) => mod2(n4, P6);
  const GuBytes = encodeU(Gu);
  function encodeU(u3) {
    return numberToBytesLE2(modP(u3), fieldLen);
  }
  function decodeU(u3) {
    const _u = ensureBytes2("u coordinate", u3, fieldLen);
    if (is25519)
      _u[31] &= 127;
    return modP(bytesToNumberLE2(_u));
  }
  function decodeScalar(scalar) {
    return bytesToNumberLE2(adjustScalarBytes2(ensureBytes2("scalar", scalar, fieldLen)));
  }
  function scalarMult(scalar, u3) {
    const pu = montgomeryLadder(decodeU(u3), decodeScalar(scalar));
    if (pu === _0n11)
      throw new Error("invalid private or public key received");
    return encodeU(pu);
  }
  function scalarMultBase(scalar) {
    return scalarMult(scalar, GuBytes);
  }
  function cswap(swap, x_2, x_3) {
    const dummy = modP(swap * (x_2 - x_3));
    x_2 = modP(x_2 - dummy);
    x_3 = modP(x_3 + dummy);
    return { x_2, x_3 };
  }
  function montgomeryLadder(u3, scalar) {
    aInRange2("u", u3, _0n11, P6);
    aInRange2("scalar", scalar, minScalar, maxScalar);
    const k6 = scalar;
    const x_1 = u3;
    let x_2 = _1n11;
    let z_2 = _0n11;
    let x_3 = u3;
    let z_3 = _1n11;
    let swap = _0n11;
    for (let t = BigInt(montgomeryBits - 1); t >= _0n11; t--) {
      const k_t = k6 >> t & _1n11;
      swap ^= k_t;
      ({ x_2, x_3 } = cswap(swap, x_2, x_3));
      ({ x_2: z_2, x_3: z_3 } = cswap(swap, z_2, z_3));
      swap = k_t;
      const A4 = x_2 + z_2;
      const AA = modP(A4 * A4);
      const B4 = x_2 - z_2;
      const BB = modP(B4 * B4);
      const E6 = AA - BB;
      const C4 = x_3 + z_3;
      const D5 = x_3 - z_3;
      const DA = modP(D5 * A4);
      const CB = modP(C4 * B4);
      const dacb = DA + CB;
      const da_cb = DA - CB;
      x_3 = modP(dacb * dacb);
      z_3 = modP(x_1 * modP(da_cb * da_cb));
      x_2 = modP(AA * BB);
      z_2 = modP(E6 * (AA + modP(a24 * E6)));
    }
    ({ x_2, x_3 } = cswap(swap, x_2, x_3));
    ({ x_2: z_2, x_3: z_3 } = cswap(swap, z_2, z_3));
    const z22 = powPminus2(z_2);
    return modP(x_2 * z22);
  }
  const lengths = {
    secretKey: fieldLen,
    publicKey: fieldLen,
    seed: fieldLen
  };
  const randomSecretKey = (seed = randomBytes_(fieldLen)) => {
    abytes(seed, lengths.seed);
    return seed;
  };
  function keygen(seed) {
    const secretKey = randomSecretKey(seed);
    return { secretKey, publicKey: scalarMultBase(secretKey) };
  }
  const utils = {
    randomSecretKey,
    randomPrivateKey: randomSecretKey
  };
  return {
    keygen,
    getSharedSecret: (secretKey, publicKey) => scalarMult(secretKey, publicKey),
    getPublicKey: (secretKey) => scalarMultBase(secretKey),
    scalarMult,
    scalarMultBase,
    utils,
    GuBytes: GuBytes.slice(),
    lengths
  };
}

// node_modules/@walletconnect/utils/node_modules/@noble/curves/esm/ed25519.js
var _0n12 = /* @__PURE__ */ BigInt(0);
var _1n12 = BigInt(1);
var _2n8 = BigInt(2);
var _3n4 = BigInt(3);
var _5n3 = BigInt(5);
var _8n4 = BigInt(8);
var ed25519_CURVE_p = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed");
var ed25519_CURVE = /* @__PURE__ */ (() => ({
  p: ed25519_CURVE_p,
  n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
  h: _8n4,
  a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
  d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
  Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
  Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
}))();
function ed25519_pow_2_252_3(x8) {
  const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
  const P6 = ed25519_CURVE_p;
  const x22 = x8 * x8 % P6;
  const b22 = x22 * x8 % P6;
  const b42 = pow22(b22, _2n8, P6) * b22 % P6;
  const b5 = pow22(b42, _1n12, P6) * x8 % P6;
  const b10 = pow22(b5, _5n3, P6) * b5 % P6;
  const b20 = pow22(b10, _10n, P6) * b10 % P6;
  const b40 = pow22(b20, _20n, P6) * b20 % P6;
  const b80 = pow22(b40, _40n, P6) * b40 % P6;
  const b160 = pow22(b80, _80n, P6) * b80 % P6;
  const b240 = pow22(b160, _80n, P6) * b80 % P6;
  const b250 = pow22(b240, _10n, P6) * b10 % P6;
  const pow_p_5_8 = pow22(b250, _2n8, P6) * x8 % P6;
  return { pow_p_5_8, b2: b22 };
}
function adjustScalarBytes(bytes) {
  bytes[0] &= 248;
  bytes[31] &= 127;
  bytes[31] |= 64;
  return bytes;
}
var ED25519_SQRT_M1 = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
function uvRatio(u3, v9) {
  const P6 = ed25519_CURVE_p;
  const v32 = mod2(v9 * v9 * v9, P6);
  const v72 = mod2(v32 * v32 * v9, P6);
  const pow = ed25519_pow_2_252_3(u3 * v72).pow_p_5_8;
  let x8 = mod2(u3 * v32 * pow, P6);
  const vx2 = mod2(v9 * x8 * x8, P6);
  const root1 = x8;
  const root2 = mod2(x8 * ED25519_SQRT_M1, P6);
  const useRoot1 = vx2 === u3;
  const useRoot2 = vx2 === mod2(-u3, P6);
  const noRoot = vx2 === mod2(-u3 * ED25519_SQRT_M1, P6);
  if (useRoot1)
    x8 = root1;
  if (useRoot2 || noRoot)
    x8 = root2;
  if (isNegativeLE(x8, P6))
    x8 = mod2(-x8, P6);
  return { isValid: useRoot1 || useRoot2, value: x8 };
}
var Fp = /* @__PURE__ */ (() => Field2(ed25519_CURVE.p, { isLE: true }))();
var Fn2 = /* @__PURE__ */ (() => Field2(ed25519_CURVE.n, { isLE: true }))();
var ed25519Defaults = /* @__PURE__ */ (() => ({
  ...ed25519_CURVE,
  Fp,
  hash: sha5122,
  adjustScalarBytes,
  // dom2
  // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
  // Constant-time, u/√v
  uvRatio
}))();
var ed25519 = /* @__PURE__ */ (() => twistedEdwards(ed25519Defaults))();
var x25519 = /* @__PURE__ */ (() => {
  const P6 = Fp.ORDER;
  return montgomery({
    P: P6,
    type: "x25519",
    powPminus2: (x8) => {
      const { pow_p_5_8, b2: b22 } = ed25519_pow_2_252_3(x8);
      return mod2(pow22(pow_p_5_8, _3n4, P6) * b22, P6);
    },
    adjustScalarBytes
  });
})();
var SQRT_M1 = ED25519_SQRT_M1;
var SQRT_AD_MINUS_ONE = /* @__PURE__ */ BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
var INVSQRT_A_MINUS_D = /* @__PURE__ */ BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
var ONE_MINUS_D_SQ = /* @__PURE__ */ BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
var D_MINUS_ONE_SQ = /* @__PURE__ */ BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
var invertSqrt = (number) => uvRatio(_1n12, number);
var MAX_255B = /* @__PURE__ */ BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var bytes255ToNumberLE = (bytes) => ed25519.Point.Fp.create(bytesToNumberLE2(bytes) & MAX_255B);
function calcElligatorRistrettoMap(r0) {
  const { d: d5 } = ed25519_CURVE;
  const P6 = ed25519_CURVE_p;
  const mod3 = (n4) => Fp.create(n4);
  const r3 = mod3(SQRT_M1 * r0 * r0);
  const Ns = mod3((r3 + _1n12) * ONE_MINUS_D_SQ);
  let c5 = BigInt(-1);
  const D5 = mod3((c5 - d5 * r3) * mod3(r3 + d5));
  let { isValid: Ns_D_is_sq, value: s2 } = uvRatio(Ns, D5);
  let s_ = mod3(s2 * r0);
  if (!isNegativeLE(s_, P6))
    s_ = mod3(-s_);
  if (!Ns_D_is_sq)
    s2 = s_;
  if (!Ns_D_is_sq)
    c5 = r3;
  const Nt3 = mod3(c5 * (r3 - _1n12) * D_MINUS_ONE_SQ - D5);
  const s22 = s2 * s2;
  const W0 = mod3((s2 + s2) * D5);
  const W1 = mod3(Nt3 * SQRT_AD_MINUS_ONE);
  const W22 = mod3(_1n12 - s22);
  const W32 = mod3(_1n12 + s22);
  return new ed25519.Point(mod3(W0 * W32), mod3(W22 * W1), mod3(W1 * W32), mod3(W0 * W22));
}
function ristretto255_map(bytes) {
  abytes(bytes, 64);
  const r1 = bytes255ToNumberLE(bytes.subarray(0, 32));
  const R1 = calcElligatorRistrettoMap(r1);
  const r22 = bytes255ToNumberLE(bytes.subarray(32, 64));
  const R22 = calcElligatorRistrettoMap(r22);
  return new _RistrettoPoint(R1.add(R22));
}
var _RistrettoPoint = class __RistrettoPoint extends PrimeEdwardsPoint {
  constructor(ep) {
    super(ep);
  }
  static fromAffine(ap) {
    return new __RistrettoPoint(ed25519.Point.fromAffine(ap));
  }
  assertSame(other) {
    if (!(other instanceof __RistrettoPoint))
      throw new Error("RistrettoPoint expected");
  }
  init(ep) {
    return new __RistrettoPoint(ep);
  }
  /** @deprecated use `import { ristretto255_hasher } from '@noble/curves/ed25519.js';` */
  static hashToCurve(hex) {
    return ristretto255_map(ensureBytes2("ristrettoHash", hex, 64));
  }
  static fromBytes(bytes) {
    abytes(bytes, 32);
    const { a: a3, d: d5 } = ed25519_CURVE;
    const P6 = ed25519_CURVE_p;
    const mod3 = (n4) => Fp.create(n4);
    const s2 = bytes255ToNumberLE(bytes);
    if (!equalBytes2(Fp.toBytes(s2), bytes) || isNegativeLE(s2, P6))
      throw new Error("invalid ristretto255 encoding 1");
    const s22 = mod3(s2 * s2);
    const u1 = mod3(_1n12 + a3 * s22);
    const u22 = mod3(_1n12 - a3 * s22);
    const u1_2 = mod3(u1 * u1);
    const u2_2 = mod3(u22 * u22);
    const v9 = mod3(a3 * d5 * u1_2 - u2_2);
    const { isValid, value: I3 } = invertSqrt(mod3(v9 * u2_2));
    const Dx = mod3(I3 * u22);
    const Dy = mod3(I3 * Dx * v9);
    let x8 = mod3((s2 + s2) * Dx);
    if (isNegativeLE(x8, P6))
      x8 = mod3(-x8);
    const y7 = mod3(u1 * Dy);
    const t = mod3(x8 * y7);
    if (!isValid || isNegativeLE(t, P6) || y7 === _0n12)
      throw new Error("invalid ristretto255 encoding 2");
    return new __RistrettoPoint(new ed25519.Point(x8, y7, _1n12, t));
  }
  /**
   * Converts ristretto-encoded string to ristretto point.
   * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-decode).
   * @param hex Ristretto-encoded 32 bytes. Not every 32-byte string is valid ristretto encoding
   */
  static fromHex(hex) {
    return __RistrettoPoint.fromBytes(ensureBytes2("ristrettoHex", hex, 32));
  }
  static msm(points, scalars) {
    return pippenger2(__RistrettoPoint, ed25519.Point.Fn, points, scalars);
  }
  /**
   * Encodes ristretto point to Uint8Array.
   * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-encode).
   */
  toBytes() {
    let { X: X3, Y: Y4, Z: Z4, T: T7 } = this.ep;
    const P6 = ed25519_CURVE_p;
    const mod3 = (n4) => Fp.create(n4);
    const u1 = mod3(mod3(Z4 + Y4) * mod3(Z4 - Y4));
    const u22 = mod3(X3 * Y4);
    const u2sq = mod3(u22 * u22);
    const { value: invsqrt } = invertSqrt(mod3(u1 * u2sq));
    const D1 = mod3(invsqrt * u1);
    const D22 = mod3(invsqrt * u22);
    const zInv = mod3(D1 * D22 * T7);
    let D5;
    if (isNegativeLE(T7 * zInv, P6)) {
      let _x = mod3(Y4 * SQRT_M1);
      let _y = mod3(X3 * SQRT_M1);
      X3 = _x;
      Y4 = _y;
      D5 = mod3(D1 * INVSQRT_A_MINUS_D);
    } else {
      D5 = D22;
    }
    if (isNegativeLE(X3 * zInv, P6))
      Y4 = mod3(-Y4);
    let s2 = mod3((Z4 - Y4) * D5);
    if (isNegativeLE(s2, P6))
      s2 = mod3(-s2);
    return Fp.toBytes(s2);
  }
  /**
   * Compares two Ristretto points.
   * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-equals).
   */
  equals(other) {
    this.assertSame(other);
    const { X: X1, Y: Y1 } = this.ep;
    const { X: X22, Y: Y22 } = other.ep;
    const mod3 = (n4) => Fp.create(n4);
    const one = mod3(X1 * Y22) === mod3(Y1 * X22);
    const two = mod3(Y1 * Y22) === mod3(X1 * X22);
    return one || two;
  }
  is0() {
    return this.equals(__RistrettoPoint.ZERO);
  }
};
_RistrettoPoint.BASE = /* @__PURE__ */ (() => new _RistrettoPoint(ed25519.Point.BASE))();
_RistrettoPoint.ZERO = /* @__PURE__ */ (() => new _RistrettoPoint(ed25519.Point.ZERO))();
_RistrettoPoint.Fp = /* @__PURE__ */ (() => Fp)();
_RistrettoPoint.Fn = /* @__PURE__ */ (() => Fn2)();

// node_modules/@walletconnect/utils/node_modules/@noble/curves/esm/abstract/weierstrass.js
var divNearest2 = (num, den) => (num + (num >= 0 ? den : -den) / _2n9) / den;
function _splitEndoScalar(k6, basis, n4) {
  const [[a1, b1], [a22, b22]] = basis;
  const c1 = divNearest2(b22 * k6, n4);
  const c22 = divNearest2(-b1 * k6, n4);
  let k1 = k6 - c1 * a1 - c22 * a22;
  let k22 = -c1 * b1 - c22 * b22;
  const k1neg = k1 < _0n13;
  const k2neg = k22 < _0n13;
  if (k1neg)
    k1 = -k1;
  if (k2neg)
    k22 = -k22;
  const MAX_NUM = bitMask2(Math.ceil(bitLen2(n4) / 2)) + _1n13;
  if (k1 < _0n13 || k1 >= MAX_NUM || k22 < _0n13 || k22 >= MAX_NUM) {
    throw new Error("splitScalar (endomorphism): failed, k=" + k6);
  }
  return { k1neg, k1, k2neg, k2: k22 };
}
function validateSigFormat(format) {
  if (!["compact", "recovered", "der"].includes(format))
    throw new Error('Signature format must be "compact", "recovered", or "der"');
  return format;
}
function validateSigOpts(opts, def) {
  const optsn = {};
  for (let optName of Object.keys(def)) {
    optsn[optName] = opts[optName] === void 0 ? def[optName] : opts[optName];
  }
  _abool2(optsn.lowS, "lowS");
  _abool2(optsn.prehash, "prehash");
  if (optsn.format !== void 0)
    validateSigFormat(optsn.format);
  return optsn;
}
var DERErr2 = class extends Error {
  constructor(m3 = "") {
    super(m3);
  }
};
var DER2 = {
  // asn.1 DER encoding utils
  Err: DERErr2,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (tag, data) => {
      const { Err: E6 } = DER2;
      if (tag < 0 || tag > 256)
        throw new E6("tlv.encode: wrong tag");
      if (data.length & 1)
        throw new E6("tlv.encode: unpadded data");
      const dataLen = data.length / 2;
      const len = numberToHexUnpadded2(dataLen);
      if (len.length / 2 & 128)
        throw new E6("tlv.encode: long form length too big");
      const lenLen = dataLen > 127 ? numberToHexUnpadded2(len.length / 2 | 128) : "";
      const t = numberToHexUnpadded2(tag);
      return t + lenLen + len + data;
    },
    // v - value, l - left bytes (unparsed)
    decode(tag, data) {
      const { Err: E6 } = DER2;
      let pos = 0;
      if (tag < 0 || tag > 256)
        throw new E6("tlv.encode: wrong tag");
      if (data.length < 2 || data[pos++] !== tag)
        throw new E6("tlv.decode: wrong tlv");
      const first = data[pos++];
      const isLong = !!(first & 128);
      let length2 = 0;
      if (!isLong)
        length2 = first;
      else {
        const lenLen = first & 127;
        if (!lenLen)
          throw new E6("tlv.decode(long): indefinite length not supported");
        if (lenLen > 4)
          throw new E6("tlv.decode(long): byte length is too big");
        const lengthBytes = data.subarray(pos, pos + lenLen);
        if (lengthBytes.length !== lenLen)
          throw new E6("tlv.decode: length bytes not complete");
        if (lengthBytes[0] === 0)
          throw new E6("tlv.decode(long): zero leftmost byte");
        for (const b5 of lengthBytes)
          length2 = length2 << 8 | b5;
        pos += lenLen;
        if (length2 < 128)
          throw new E6("tlv.decode(long): not minimal encoding");
      }
      const v9 = data.subarray(pos, pos + length2);
      if (v9.length !== length2)
        throw new E6("tlv.decode: wrong value length");
      return { v: v9, l: data.subarray(pos + length2) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(num) {
      const { Err: E6 } = DER2;
      if (num < _0n13)
        throw new E6("integer: negative integers are not allowed");
      let hex = numberToHexUnpadded2(num);
      if (Number.parseInt(hex[0], 16) & 8)
        hex = "00" + hex;
      if (hex.length & 1)
        throw new E6("unexpected DER parsing assertion: unpadded hex");
      return hex;
    },
    decode(data) {
      const { Err: E6 } = DER2;
      if (data[0] & 128)
        throw new E6("invalid signature integer: negative");
      if (data[0] === 0 && !(data[1] & 128))
        throw new E6("invalid signature integer: unnecessary leading zero");
      return bytesToNumberBE2(data);
    }
  },
  toSig(hex) {
    const { Err: E6, _int: int, _tlv: tlv } = DER2;
    const data = ensureBytes2("signature", hex);
    const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
    if (seqLeftBytes.length)
      throw new E6("invalid signature: left bytes after parsing");
    const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
    const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
    if (sLeftBytes.length)
      throw new E6("invalid signature: left bytes after parsing");
    return { r: int.decode(rBytes), s: int.decode(sBytes) };
  },
  hexFromSig(sig) {
    const { _tlv: tlv, _int: int } = DER2;
    const rs = tlv.encode(2, int.encode(sig.r));
    const ss = tlv.encode(2, int.encode(sig.s));
    const seq = rs + ss;
    return tlv.encode(48, seq);
  }
};
var _0n13 = BigInt(0);
var _1n13 = BigInt(1);
var _2n9 = BigInt(2);
var _3n5 = BigInt(3);
var _4n4 = BigInt(4);
function _normFnElement(Fn4, key) {
  const { BYTES: expected } = Fn4;
  let num;
  if (typeof key === "bigint") {
    num = key;
  } else {
    let bytes = ensureBytes2("private key", key);
    try {
      num = Fn4.fromBytes(bytes);
    } catch (error) {
      throw new Error(`invalid private key: expected ui8a of size ${expected}, got ${typeof key}`);
    }
  }
  if (!Fn4.isValidNot0(num))
    throw new Error("invalid private key: out of range [1..N-1]");
  return num;
}
function weierstrassN(params, extraOpts = {}) {
  const validated = _createCurveFields("weierstrass", params, extraOpts);
  const { Fp: Fp2, Fn: Fn4 } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor, n: CURVE_ORDER } = CURVE;
  _validateObject(extraOpts, {}, {
    allowInfinityPoint: "boolean",
    clearCofactor: "function",
    isTorsionFree: "function",
    fromBytes: "function",
    toBytes: "function",
    endo: "object",
    wrapPrivateKey: "boolean"
  });
  const { endo } = extraOpts;
  if (endo) {
    if (!Fp2.is0(CURVE.a) || typeof endo.beta !== "bigint" || !Array.isArray(endo.basises)) {
      throw new Error('invalid endo: expected "beta": bigint and "basises": array');
    }
  }
  const lengths = getWLengths(Fp2, Fn4);
  function assertCompressionIsSupported() {
    if (!Fp2.isOdd)
      throw new Error("compression is not supported: Field does not have .isOdd()");
  }
  function pointToBytes(_c, point, isCompressed) {
    const { x: x8, y: y7 } = point.toAffine();
    const bx = Fp2.toBytes(x8);
    _abool2(isCompressed, "isCompressed");
    if (isCompressed) {
      assertCompressionIsSupported();
      const hasEvenY = !Fp2.isOdd(y7);
      return concatBytes(pprefix(hasEvenY), bx);
    } else {
      return concatBytes(Uint8Array.of(4), bx, Fp2.toBytes(y7));
    }
  }
  function pointFromBytes(bytes) {
    _abytes2(bytes, void 0, "Point");
    const { publicKey: comp, publicKeyUncompressed: uncomp } = lengths;
    const length2 = bytes.length;
    const head = bytes[0];
    const tail = bytes.subarray(1);
    if (length2 === comp && (head === 2 || head === 3)) {
      const x8 = Fp2.fromBytes(tail);
      if (!Fp2.isValid(x8))
        throw new Error("bad point: is not on curve, wrong x");
      const y22 = weierstrassEquation(x8);
      let y7;
      try {
        y7 = Fp2.sqrt(y22);
      } catch (sqrtError) {
        const err = sqrtError instanceof Error ? ": " + sqrtError.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + err);
      }
      assertCompressionIsSupported();
      const isYOdd = Fp2.isOdd(y7);
      const isHeadOdd = (head & 1) === 1;
      if (isHeadOdd !== isYOdd)
        y7 = Fp2.neg(y7);
      return { x: x8, y: y7 };
    } else if (length2 === uncomp && head === 4) {
      const L3 = Fp2.BYTES;
      const x8 = Fp2.fromBytes(tail.subarray(0, L3));
      const y7 = Fp2.fromBytes(tail.subarray(L3, L3 * 2));
      if (!isValidXY(x8, y7))
        throw new Error("bad point: is not on curve");
      return { x: x8, y: y7 };
    } else {
      throw new Error(`bad point: got length ${length2}, expected compressed=${comp} or uncompressed=${uncomp}`);
    }
  }
  const encodePoint = extraOpts.toBytes || pointToBytes;
  const decodePoint = extraOpts.fromBytes || pointFromBytes;
  function weierstrassEquation(x8) {
    const x22 = Fp2.sqr(x8);
    const x32 = Fp2.mul(x22, x8);
    return Fp2.add(Fp2.add(x32, Fp2.mul(x8, CURVE.a)), CURVE.b);
  }
  function isValidXY(x8, y7) {
    const left = Fp2.sqr(y7);
    const right = weierstrassEquation(x8);
    return Fp2.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp2.mul(Fp2.pow(CURVE.a, _3n5), _4n4);
  const _27b2 = Fp2.mul(Fp2.sqr(CURVE.b), BigInt(27));
  if (Fp2.is0(Fp2.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function acoord(title, n4, banZero = false) {
    if (!Fp2.isValid(n4) || banZero && Fp2.is0(n4))
      throw new Error(`bad point coordinate ${title}`);
    return n4;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ProjectivePoint expected");
  }
  function splitEndoScalarN(k6) {
    if (!endo || !endo.basises)
      throw new Error("no endo");
    return _splitEndoScalar(k6, endo.basises, Fn4.ORDER);
  }
  const toAffineMemo = memoized2((p5, iz) => {
    const { X: X3, Y: Y4, Z: Z4 } = p5;
    if (Fp2.eql(Z4, Fp2.ONE))
      return { x: X3, y: Y4 };
    const is0 = p5.is0();
    if (iz == null)
      iz = is0 ? Fp2.ONE : Fp2.inv(Z4);
    const x8 = Fp2.mul(X3, iz);
    const y7 = Fp2.mul(Y4, iz);
    const zz = Fp2.mul(Z4, iz);
    if (is0)
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    if (!Fp2.eql(zz, Fp2.ONE))
      throw new Error("invZ was invalid");
    return { x: x8, y: y7 };
  });
  const assertValidMemo = memoized2((p5) => {
    if (p5.is0()) {
      if (extraOpts.allowInfinityPoint && !Fp2.is0(p5.Y))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: x8, y: y7 } = p5.toAffine();
    if (!Fp2.isValid(x8) || !Fp2.isValid(y7))
      throw new Error("bad point: x or y not field elements");
    if (!isValidXY(x8, y7))
      throw new Error("bad point: equation left != right");
    if (!p5.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  function finishEndo(endoBeta, k1p, k2p, k1neg, k2neg) {
    k2p = new Point(Fp2.mul(k2p.X, endoBeta), k2p.Y, k2p.Z);
    k1p = negateCt(k1neg, k1p);
    k2p = negateCt(k2neg, k2p);
    return k1p.add(k2p);
  }
  class Point {
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    constructor(X3, Y4, Z4) {
      this.X = acoord("x", X3);
      this.Y = acoord("y", Y4, true);
      this.Z = acoord("z", Z4);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    static fromAffine(p5) {
      const { x: x8, y: y7 } = p5 || {};
      if (!p5 || !Fp2.isValid(x8) || !Fp2.isValid(y7))
        throw new Error("invalid affine point");
      if (p5 instanceof Point)
        throw new Error("projective point not allowed");
      if (Fp2.is0(x8) && Fp2.is0(y7))
        return Point.ZERO;
      return new Point(x8, y7, Fp2.ONE);
    }
    static fromBytes(bytes) {
      const P6 = Point.fromAffine(decodePoint(_abytes2(bytes, void 0, "point")));
      P6.assertValidity();
      return P6;
    }
    static fromHex(hex) {
      return Point.fromBytes(ensureBytes2("pointHex", hex));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     *
     * @param windowSize
     * @param isLazy true will defer table computation until the first multiplication
     * @returns
     */
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy)
        this.multiply(_3n5);
      return this;
    }
    // TODO: return `this`
    /** A point on curve is valid if it conforms to equation. */
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y: y7 } = this.toAffine();
      if (!Fp2.isOdd)
        throw new Error("Field doesn't support isOdd");
      return !Fp2.isOdd(y7);
    }
    /** Compare one point to another. */
    equals(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X22, Y: Y22, Z: Z22 } = other;
      const U1 = Fp2.eql(Fp2.mul(X1, Z22), Fp2.mul(X22, Z1));
      const U22 = Fp2.eql(Fp2.mul(Y1, Z22), Fp2.mul(Y22, Z1));
      return U1 && U22;
    }
    /** Flips point to one corresponding to (x, -y) in Affine coordinates. */
    negate() {
      return new Point(this.X, Fp2.neg(this.Y), this.Z);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: a3, b: b5 } = CURVE;
      const b32 = Fp2.mul(b5, _3n5);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      let X3 = Fp2.ZERO, Y32 = Fp2.ZERO, Z32 = Fp2.ZERO;
      let t0 = Fp2.mul(X1, X1);
      let t1 = Fp2.mul(Y1, Y1);
      let t2 = Fp2.mul(Z1, Z1);
      let t3 = Fp2.mul(X1, Y1);
      t3 = Fp2.add(t3, t3);
      Z32 = Fp2.mul(X1, Z1);
      Z32 = Fp2.add(Z32, Z32);
      X3 = Fp2.mul(a3, Z32);
      Y32 = Fp2.mul(b32, t2);
      Y32 = Fp2.add(X3, Y32);
      X3 = Fp2.sub(t1, Y32);
      Y32 = Fp2.add(t1, Y32);
      Y32 = Fp2.mul(X3, Y32);
      X3 = Fp2.mul(t3, X3);
      Z32 = Fp2.mul(b32, Z32);
      t2 = Fp2.mul(a3, t2);
      t3 = Fp2.sub(t0, t2);
      t3 = Fp2.mul(a3, t3);
      t3 = Fp2.add(t3, Z32);
      Z32 = Fp2.add(t0, t0);
      t0 = Fp2.add(Z32, t0);
      t0 = Fp2.add(t0, t2);
      t0 = Fp2.mul(t0, t3);
      Y32 = Fp2.add(Y32, t0);
      t2 = Fp2.mul(Y1, Z1);
      t2 = Fp2.add(t2, t2);
      t0 = Fp2.mul(t2, t3);
      X3 = Fp2.sub(X3, t0);
      Z32 = Fp2.mul(t2, t1);
      Z32 = Fp2.add(Z32, Z32);
      Z32 = Fp2.add(Z32, Z32);
      return new Point(X3, Y32, Z32);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X22, Y: Y22, Z: Z22 } = other;
      let X3 = Fp2.ZERO, Y32 = Fp2.ZERO, Z32 = Fp2.ZERO;
      const a3 = CURVE.a;
      const b32 = Fp2.mul(CURVE.b, _3n5);
      let t0 = Fp2.mul(X1, X22);
      let t1 = Fp2.mul(Y1, Y22);
      let t2 = Fp2.mul(Z1, Z22);
      let t3 = Fp2.add(X1, Y1);
      let t4 = Fp2.add(X22, Y22);
      t3 = Fp2.mul(t3, t4);
      t4 = Fp2.add(t0, t1);
      t3 = Fp2.sub(t3, t4);
      t4 = Fp2.add(X1, Z1);
      let t5 = Fp2.add(X22, Z22);
      t4 = Fp2.mul(t4, t5);
      t5 = Fp2.add(t0, t2);
      t4 = Fp2.sub(t4, t5);
      t5 = Fp2.add(Y1, Z1);
      X3 = Fp2.add(Y22, Z22);
      t5 = Fp2.mul(t5, X3);
      X3 = Fp2.add(t1, t2);
      t5 = Fp2.sub(t5, X3);
      Z32 = Fp2.mul(a3, t4);
      X3 = Fp2.mul(b32, t2);
      Z32 = Fp2.add(X3, Z32);
      X3 = Fp2.sub(t1, Z32);
      Z32 = Fp2.add(t1, Z32);
      Y32 = Fp2.mul(X3, Z32);
      t1 = Fp2.add(t0, t0);
      t1 = Fp2.add(t1, t0);
      t2 = Fp2.mul(a3, t2);
      t4 = Fp2.mul(b32, t4);
      t1 = Fp2.add(t1, t2);
      t2 = Fp2.sub(t0, t2);
      t2 = Fp2.mul(a3, t2);
      t4 = Fp2.add(t4, t2);
      t0 = Fp2.mul(t1, t4);
      Y32 = Fp2.add(Y32, t0);
      t0 = Fp2.mul(t5, t4);
      X3 = Fp2.mul(t3, X3);
      X3 = Fp2.sub(X3, t0);
      t0 = Fp2.mul(t3, t1);
      Z32 = Fp2.mul(t5, Z32);
      Z32 = Fp2.add(Z32, t0);
      return new Point(X3, Y32, Z32);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2 } = extraOpts;
      if (!Fn4.isValidNot0(scalar))
        throw new Error("invalid scalar: out of range");
      let point, fake;
      const mul = (n4) => wnaf.cached(this, n4, (p5) => normalizeZ(Point, p5));
      if (endo2) {
        const { k1neg, k1, k2neg, k2: k22 } = splitEndoScalarN(scalar);
        const { p: k1p, f: k1f } = mul(k1);
        const { p: k2p, f: k2f } = mul(k22);
        fake = k1f.add(k2f);
        point = finishEndo(endo2.beta, k1p, k2p, k1neg, k2neg);
      } else {
        const { p: p5, f: f3 } = mul(scalar);
        point = p5;
        fake = f3;
      }
      return normalizeZ(Point, [point, fake])[0];
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed secret key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2 } = extraOpts;
      const p5 = this;
      if (!Fn4.isValid(sc))
        throw new Error("invalid scalar: out of range");
      if (sc === _0n13 || p5.is0())
        return Point.ZERO;
      if (sc === _1n13)
        return p5;
      if (wnaf.hasCache(this))
        return this.multiply(sc);
      if (endo2) {
        const { k1neg, k1, k2neg, k2: k22 } = splitEndoScalarN(sc);
        const { p1, p2: p22 } = mulEndoUnsafe(Point, p5, k1, k22);
        return finishEndo(endo2.beta, p1, p22, k1neg, k2neg);
      } else {
        return wnaf.unsafe(p5, sc);
      }
    }
    multiplyAndAddUnsafe(Q4, a3, b5) {
      const sum = this.multiplyUnsafe(a3).add(Q4.multiplyUnsafe(b5));
      return sum.is0() ? void 0 : sum;
    }
    /**
     * Converts Projective point to affine (x, y) coordinates.
     * @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
     */
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    /**
     * Checks whether Point is free of torsion elements (is in prime subgroup).
     * Always torsion-free for cofactor=1 curves.
     */
    isTorsionFree() {
      const { isTorsionFree } = extraOpts;
      if (cofactor === _1n13)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      return wnaf.unsafe(this, CURVE_ORDER).is0();
    }
    clearCofactor() {
      const { clearCofactor } = extraOpts;
      if (cofactor === _1n13)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(cofactor);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    toBytes(isCompressed = true) {
      _abool2(isCompressed, "isCompressed");
      this.assertValidity();
      return encodePoint(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex(this.toBytes(isCompressed));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    // TODO: remove
    get px() {
      return this.X;
    }
    get py() {
      return this.X;
    }
    get pz() {
      return this.Z;
    }
    toRawBytes(isCompressed = true) {
      return this.toBytes(isCompressed);
    }
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    static normalizeZ(points) {
      return normalizeZ(Point, points);
    }
    static msm(points, scalars) {
      return pippenger2(Point, Fn4, points, scalars);
    }
    static fromPrivateKey(privateKey) {
      return Point.BASE.multiply(_normFnElement(Fn4, privateKey));
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp2.ONE);
  Point.ZERO = new Point(Fp2.ZERO, Fp2.ONE, Fp2.ZERO);
  Point.Fp = Fp2;
  Point.Fn = Fn4;
  const bits = Fn4.BITS;
  const wnaf = new wNAF2(Point, extraOpts.endo ? Math.ceil(bits / 2) : bits);
  Point.BASE.precompute(8);
  return Point;
}
function pprefix(hasEvenY) {
  return Uint8Array.of(hasEvenY ? 2 : 3);
}
function getWLengths(Fp2, Fn4) {
  return {
    secretKey: Fn4.BYTES,
    publicKey: 1 + Fp2.BYTES,
    publicKeyUncompressed: 1 + 2 * Fp2.BYTES,
    publicKeyHasPrefix: true,
    signature: 2 * Fn4.BYTES
  };
}
function ecdh(Point, ecdhOpts = {}) {
  const { Fn: Fn4 } = Point;
  const randomBytes_ = ecdhOpts.randomBytes || randomBytes;
  const lengths = Object.assign(getWLengths(Point.Fp, Fn4), { seed: getMinHashLength2(Fn4.ORDER) });
  function isValidSecretKey(secretKey) {
    try {
      return !!_normFnElement(Fn4, secretKey);
    } catch (error) {
      return false;
    }
  }
  function isValidPublicKey(publicKey, isCompressed) {
    const { publicKey: comp, publicKeyUncompressed } = lengths;
    try {
      const l5 = publicKey.length;
      if (isCompressed === true && l5 !== comp)
        return false;
      if (isCompressed === false && l5 !== publicKeyUncompressed)
        return false;
      return !!Point.fromBytes(publicKey);
    } catch (error) {
      return false;
    }
  }
  function randomSecretKey(seed = randomBytes_(lengths.seed)) {
    return mapHashToField2(_abytes2(seed, lengths.seed, "seed"), Fn4.ORDER);
  }
  function getPublicKey2(secretKey, isCompressed = true) {
    return Point.BASE.multiply(_normFnElement(Fn4, secretKey)).toBytes(isCompressed);
  }
  function keygen(seed) {
    const secretKey = randomSecretKey(seed);
    return { secretKey, publicKey: getPublicKey2(secretKey) };
  }
  function isProbPub(item) {
    if (typeof item === "bigint")
      return false;
    if (item instanceof Point)
      return true;
    const { secretKey, publicKey, publicKeyUncompressed } = lengths;
    if (Fn4.allowedLengths || secretKey === publicKey)
      return void 0;
    const l5 = ensureBytes2("key", item).length;
    return l5 === publicKey || l5 === publicKeyUncompressed;
  }
  function getSharedSecret2(secretKeyA, publicKeyB, isCompressed = true) {
    if (isProbPub(secretKeyA) === true)
      throw new Error("first arg must be private key");
    if (isProbPub(publicKeyB) === false)
      throw new Error("second arg must be public key");
    const s2 = _normFnElement(Fn4, secretKeyA);
    const b5 = Point.fromHex(publicKeyB);
    return b5.multiply(s2).toBytes(isCompressed);
  }
  const utils = {
    isValidSecretKey,
    isValidPublicKey,
    randomSecretKey,
    // TODO: remove
    isValidPrivateKey: isValidSecretKey,
    randomPrivateKey: randomSecretKey,
    normPrivateKeyToScalar: (key) => _normFnElement(Fn4, key),
    precompute(windowSize = 8, point = Point.BASE) {
      return point.precompute(windowSize, false);
    }
  };
  return Object.freeze({ getPublicKey: getPublicKey2, getSharedSecret: getSharedSecret2, keygen, Point, utils, lengths });
}
function ecdsa(Point, hash, ecdsaOpts = {}) {
  ahash(hash);
  _validateObject(ecdsaOpts, {}, {
    hmac: "function",
    lowS: "boolean",
    randomBytes: "function",
    bits2int: "function",
    bits2int_modN: "function"
  });
  const randomBytes2 = ecdsaOpts.randomBytes || randomBytes;
  const hmac2 = ecdsaOpts.hmac || ((key, ...msgs) => hmac(hash, key, concatBytes(...msgs)));
  const { Fp: Fp2, Fn: Fn4 } = Point;
  const { ORDER: CURVE_ORDER, BITS: fnBits } = Fn4;
  const { keygen, getPublicKey: getPublicKey2, getSharedSecret: getSharedSecret2, utils, lengths } = ecdh(Point, ecdsaOpts);
  const defaultSigOpts = {
    prehash: false,
    lowS: typeof ecdsaOpts.lowS === "boolean" ? ecdsaOpts.lowS : false,
    format: void 0,
    //'compact' as ECDSASigFormat,
    extraEntropy: false
  };
  const defaultSigOpts_format = "compact";
  function isBiggerThanHalfOrder(number) {
    const HALF = CURVE_ORDER >> _1n13;
    return number > HALF;
  }
  function validateRS(title, num) {
    if (!Fn4.isValidNot0(num))
      throw new Error(`invalid signature ${title}: out of range 1..Point.Fn.ORDER`);
    return num;
  }
  function validateSigLength(bytes, format) {
    validateSigFormat(format);
    const size3 = lengths.signature;
    const sizer = format === "compact" ? size3 : format === "recovered" ? size3 + 1 : void 0;
    return _abytes2(bytes, sizer, `${format} signature`);
  }
  class Signature {
    constructor(r3, s2, recovery) {
      this.r = validateRS("r", r3);
      this.s = validateRS("s", s2);
      if (recovery != null)
        this.recovery = recovery;
      Object.freeze(this);
    }
    static fromBytes(bytes, format = defaultSigOpts_format) {
      validateSigLength(bytes, format);
      let recid;
      if (format === "der") {
        const { r: r4, s: s3 } = DER2.toSig(_abytes2(bytes));
        return new Signature(r4, s3);
      }
      if (format === "recovered") {
        recid = bytes[0];
        format = "compact";
        bytes = bytes.subarray(1);
      }
      const L3 = Fn4.BYTES;
      const r3 = bytes.subarray(0, L3);
      const s2 = bytes.subarray(L3, L3 * 2);
      return new Signature(Fn4.fromBytes(r3), Fn4.fromBytes(s2), recid);
    }
    static fromHex(hex, format) {
      return this.fromBytes(hexToBytes(hex), format);
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(messageHash) {
      const FIELD_ORDER = Fp2.ORDER;
      const { r: r3, s: s2, recovery: rec } = this;
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const hasCofactor = CURVE_ORDER * _2n9 < FIELD_ORDER;
      if (hasCofactor && rec > 1)
        throw new Error("recovery id is ambiguous for h>1 curve");
      const radj = rec === 2 || rec === 3 ? r3 + CURVE_ORDER : r3;
      if (!Fp2.isValid(radj))
        throw new Error("recovery id 2 or 3 invalid");
      const x8 = Fp2.toBytes(radj);
      const R4 = Point.fromBytes(concatBytes(pprefix((rec & 1) === 0), x8));
      const ir3 = Fn4.inv(radj);
      const h4 = bits2int_modN(ensureBytes2("msgHash", messageHash));
      const u1 = Fn4.create(-h4 * ir3);
      const u22 = Fn4.create(s2 * ir3);
      const Q4 = Point.BASE.multiplyUnsafe(u1).add(R4.multiplyUnsafe(u22));
      if (Q4.is0())
        throw new Error("point at infinify");
      Q4.assertValidity();
      return Q4;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    toBytes(format = defaultSigOpts_format) {
      validateSigFormat(format);
      if (format === "der")
        return hexToBytes(DER2.hexFromSig(this));
      const r3 = Fn4.toBytes(this.r);
      const s2 = Fn4.toBytes(this.s);
      if (format === "recovered") {
        if (this.recovery == null)
          throw new Error("recovery bit must be present");
        return concatBytes(Uint8Array.of(this.recovery), r3, s2);
      }
      return concatBytes(r3, s2);
    }
    toHex(format) {
      return bytesToHex(this.toBytes(format));
    }
    // TODO: remove
    assertValidity() {
    }
    static fromCompact(hex) {
      return Signature.fromBytes(ensureBytes2("sig", hex), "compact");
    }
    static fromDER(hex) {
      return Signature.fromBytes(ensureBytes2("sig", hex), "der");
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, Fn4.neg(this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return this.toBytes("der");
    }
    toDERHex() {
      return bytesToHex(this.toBytes("der"));
    }
    toCompactRawBytes() {
      return this.toBytes("compact");
    }
    toCompactHex() {
      return bytesToHex(this.toBytes("compact"));
    }
  }
  const bits2int = ecdsaOpts.bits2int || function bits2int_def(bytes) {
    if (bytes.length > 8192)
      throw new Error("input is too large");
    const num = bytesToNumberBE2(bytes);
    const delta = bytes.length * 8 - fnBits;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = ecdsaOpts.bits2int_modN || function bits2int_modN_def(bytes) {
    return Fn4.create(bits2int(bytes));
  };
  const ORDER_MASK = bitMask2(fnBits);
  function int2octets(num) {
    aInRange2("num < 2^" + fnBits, num, _0n13, ORDER_MASK);
    return Fn4.toBytes(num);
  }
  function validateMsgAndHash(message, prehash) {
    _abytes2(message, void 0, "message");
    return prehash ? _abytes2(hash(message), void 0, "prehashed message") : message;
  }
  function prepSig(message, privateKey, opts) {
    if (["recovered", "canonical"].some((k6) => k6 in opts))
      throw new Error("sign() legacy options not supported");
    const { lowS, prehash, extraEntropy: extraEntropy2 } = validateSigOpts(opts, defaultSigOpts);
    message = validateMsgAndHash(message, prehash);
    const h1int = bits2int_modN(message);
    const d5 = _normFnElement(Fn4, privateKey);
    const seedArgs = [int2octets(d5), int2octets(h1int)];
    if (extraEntropy2 != null && extraEntropy2 !== false) {
      const e2 = extraEntropy2 === true ? randomBytes2(lengths.secretKey) : extraEntropy2;
      seedArgs.push(ensureBytes2("extraEntropy", e2));
    }
    const seed = concatBytes(...seedArgs);
    const m3 = h1int;
    function k2sig(kBytes) {
      const k6 = bits2int(kBytes);
      if (!Fn4.isValidNot0(k6))
        return;
      const ik = Fn4.inv(k6);
      const q4 = Point.BASE.multiply(k6).toAffine();
      const r3 = Fn4.create(q4.x);
      if (r3 === _0n13)
        return;
      const s2 = Fn4.create(ik * Fn4.create(m3 + r3 * d5));
      if (s2 === _0n13)
        return;
      let recovery = (q4.x === r3 ? 0 : 2) | Number(q4.y & _1n13);
      let normS = s2;
      if (lowS && isBiggerThanHalfOrder(s2)) {
        normS = Fn4.neg(s2);
        recovery ^= 1;
      }
      return new Signature(r3, normS, recovery);
    }
    return { seed, k2sig };
  }
  function sign2(message, secretKey, opts = {}) {
    message = ensureBytes2("message", message);
    const { seed, k2sig } = prepSig(message, secretKey, opts);
    const drbg = createHmacDrbg2(hash.outputLen, Fn4.BYTES, hmac2);
    const sig = drbg(seed, k2sig);
    return sig;
  }
  function tryParsingSig(sg) {
    let sig = void 0;
    const isHex = typeof sg === "string" || isBytes(sg);
    const isObj = !isHex && sg !== null && typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint";
    if (!isHex && !isObj)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    if (isObj) {
      sig = new Signature(sg.r, sg.s);
    } else if (isHex) {
      try {
        sig = Signature.fromBytes(ensureBytes2("sig", sg), "der");
      } catch (derError) {
        if (!(derError instanceof DER2.Err))
          throw derError;
      }
      if (!sig) {
        try {
          sig = Signature.fromBytes(ensureBytes2("sig", sg), "compact");
        } catch (error) {
          return false;
        }
      }
    }
    if (!sig)
      return false;
    return sig;
  }
  function verify2(signature, message, publicKey, opts = {}) {
    const { lowS, prehash, format } = validateSigOpts(opts, defaultSigOpts);
    publicKey = ensureBytes2("publicKey", publicKey);
    message = validateMsgAndHash(ensureBytes2("message", message), prehash);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    const sig = format === void 0 ? tryParsingSig(signature) : Signature.fromBytes(ensureBytes2("sig", signature), format);
    if (sig === false)
      return false;
    try {
      const P6 = Point.fromBytes(publicKey);
      if (lowS && sig.hasHighS())
        return false;
      const { r: r3, s: s2 } = sig;
      const h4 = bits2int_modN(message);
      const is = Fn4.inv(s2);
      const u1 = Fn4.create(h4 * is);
      const u22 = Fn4.create(r3 * is);
      const R4 = Point.BASE.multiplyUnsafe(u1).add(P6.multiplyUnsafe(u22));
      if (R4.is0())
        return false;
      const v9 = Fn4.create(R4.x);
      return v9 === r3;
    } catch (e2) {
      return false;
    }
  }
  function recoverPublicKey2(signature, message, opts = {}) {
    const { prehash } = validateSigOpts(opts, defaultSigOpts);
    message = validateMsgAndHash(message, prehash);
    return Signature.fromBytes(signature, "recovered").recoverPublicKey(message).toBytes();
  }
  return Object.freeze({
    keygen,
    getPublicKey: getPublicKey2,
    getSharedSecret: getSharedSecret2,
    utils,
    lengths,
    Point,
    sign: sign2,
    verify: verify2,
    recoverPublicKey: recoverPublicKey2,
    Signature,
    hash
  });
}
function _weierstrass_legacy_opts_to_new(c5) {
  const CURVE = {
    a: c5.a,
    b: c5.b,
    p: c5.Fp.ORDER,
    n: c5.n,
    h: c5.h,
    Gx: c5.Gx,
    Gy: c5.Gy
  };
  const Fp2 = c5.Fp;
  let allowedLengths = c5.allowedPrivateKeyLengths ? Array.from(new Set(c5.allowedPrivateKeyLengths.map((l5) => Math.ceil(l5 / 2)))) : void 0;
  const Fn4 = Field2(CURVE.n, {
    BITS: c5.nBitLength,
    allowedLengths,
    modFromBytes: c5.wrapPrivateKey
  });
  const curveOpts = {
    Fp: Fp2,
    Fn: Fn4,
    allowInfinityPoint: c5.allowInfinityPoint,
    endo: c5.endo,
    isTorsionFree: c5.isTorsionFree,
    clearCofactor: c5.clearCofactor,
    fromBytes: c5.fromBytes,
    toBytes: c5.toBytes
  };
  return { CURVE, curveOpts };
}
function _ecdsa_legacy_opts_to_new(c5) {
  const { CURVE, curveOpts } = _weierstrass_legacy_opts_to_new(c5);
  const ecdsaOpts = {
    hmac: c5.hmac,
    randomBytes: c5.randomBytes,
    lowS: c5.lowS,
    bits2int: c5.bits2int,
    bits2int_modN: c5.bits2int_modN
  };
  return { CURVE, curveOpts, hash: c5.hash, ecdsaOpts };
}
function _ecdsa_new_output_to_legacy(c5, _ecdsa) {
  const Point = _ecdsa.Point;
  return Object.assign({}, _ecdsa, {
    ProjectivePoint: Point,
    CURVE: Object.assign({}, c5, nLength2(Point.Fn.ORDER, Point.Fn.BITS))
  });
}
function weierstrass2(c5) {
  const { CURVE, curveOpts, hash, ecdsaOpts } = _ecdsa_legacy_opts_to_new(c5);
  const Point = weierstrassN(CURVE, curveOpts);
  const signs = ecdsa(Point, hash, ecdsaOpts);
  return _ecdsa_new_output_to_legacy(c5, signs);
}

// node_modules/@walletconnect/utils/node_modules/@noble/curves/esm/_shortw_utils.js
function createCurve2(curveDef, defHash) {
  const create2 = (hash) => weierstrass2({ ...curveDef, hash });
  return { ...create2(defHash), create: create2 };
}

// node_modules/@walletconnect/utils/node_modules/@noble/curves/esm/nist.js
var p256_CURVE = {
  p: BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"),
  n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
  h: BigInt(1),
  a: BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"),
  b: BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"),
  Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
  Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5")
};
var p384_CURVE = {
  p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"),
  n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"),
  h: BigInt(1),
  a: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"),
  b: BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"),
  Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"),
  Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f")
};
var p521_CURVE = {
  p: BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
  n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"),
  h: BigInt(1),
  a: BigInt("0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"),
  b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"),
  Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"),
  Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650")
};
var Fp256 = Field2(p256_CURVE.p);
var Fp384 = Field2(p384_CURVE.p);
var Fp521 = Field2(p521_CURVE.p);
var p256 = createCurve2({ ...p256_CURVE, Fp: Fp256, lowS: false }, sha2562);
var p384 = createCurve2({ ...p384_CURVE, Fp: Fp384, lowS: false }, sha384);
var p521 = createCurve2({ ...p521_CURVE, Fp: Fp521, lowS: false, allowedPrivateKeyLengths: [130, 131, 132] }, sha5122);

// node_modules/@walletconnect/utils/node_modules/@noble/curves/esm/p256.js
var p2562 = p256;

// node_modules/@walletconnect/relay-api/dist/index.es.js
var C2 = { waku: { publish: "waku_publish", batchPublish: "waku_batchPublish", subscribe: "waku_subscribe", batchSubscribe: "waku_batchSubscribe", subscription: "waku_subscription", unsubscribe: "waku_unsubscribe", batchUnsubscribe: "waku_batchUnsubscribe", batchFetchMessages: "waku_batchFetchMessages" }, irn: { publish: "irn_publish", batchPublish: "irn_batchPublish", subscribe: "irn_subscribe", batchSubscribe: "irn_batchSubscribe", subscription: "irn_subscription", unsubscribe: "irn_unsubscribe", batchUnsubscribe: "irn_batchUnsubscribe", batchFetchMessages: "irn_batchFetchMessages" }, iridium: { publish: "iridium_publish", batchPublish: "iridium_batchPublish", subscribe: "iridium_subscribe", batchSubscribe: "iridium_batchSubscribe", subscription: "iridium_subscription", unsubscribe: "iridium_unsubscribe", batchUnsubscribe: "iridium_batchUnsubscribe", batchFetchMessages: "iridium_batchFetchMessages" } };

// node_modules/@walletconnect/utils/dist/index.js
var import_blakejs = __toESM(require_blakejs(), 1);
var G3 = ":";
function ae2(e2) {
  const [t, n4] = e2.split(G3);
  return { namespace: t, reference: n4 };
}
function Y2(e2, t) {
  return e2.includes(":") ? [e2] : t.chains || [];
}
var Ke2 = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } };
var Fe2 = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function N10(e2, t) {
  const { message: n4, code: r3 } = Fe2[e2];
  return { message: t ? `${n4} ${t}` : n4, code: r3 };
}
function $2(e2, t) {
  const { message: n4, code: r3 } = Ke2[e2];
  return { message: t ? `${n4} ${t}` : n4, code: r3 };
}
var qe2 = "ReactNative";
var g2 = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" };
var Be3 = "js";
function fe3() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function A2() {
  return !(0, import_window_getters.getDocument)() && !!(0, import_window_getters.getNavigator)() && navigator.product === qe2;
}
function An2() {
  return A2() && typeof global < "u" && typeof global?.Platform < "u" && global?.Platform.OS === "android";
}
function In2() {
  return A2() && typeof global < "u" && typeof global?.Platform < "u" && global?.Platform.OS === "ios";
}
function x5() {
  return !fe3() && !!(0, import_window_getters.getNavigator)() && !!(0, import_window_getters.getDocument)();
}
function j3() {
  return A2() ? g2.reactNative : fe3() ? g2.node : x5() ? g2.browser : g2.unknown;
}
function Tn2() {
  try {
    return A2() && typeof global < "u" && typeof global?.Application < "u" ? global.Application?.applicationId : void 0;
  } catch {
    return;
  }
}
function We2(e2, t) {
  const n4 = new URLSearchParams(e2);
  return Object.entries(t).sort(([r3], [o5]) => r3.localeCompare(o5)).forEach(([r3, o5]) => {
    o5 != null && n4.set(r3, String(o5));
  }), n4.toString();
}
function Rn2(e2) {
  const t = Je2();
  try {
    return e2?.url && t.url && new URL(e2.url).host !== new URL(t.url).host && (console.warn(`The configured WalletConnect 'metadata.url':${e2.url} differs from the actual page url:${t.url}. This is probably unintended and can lead to issues.`), e2.url = t.url), e2?.icons?.length && e2.icons.length > 0 && (e2.icons = e2.icons.filter((n4) => n4 !== "")), { ...t, ...e2, url: e2?.url || t.url, name: e2?.name || t.name, description: e2?.description || t.description, icons: e2?.icons?.length && e2.icons.length > 0 ? e2.icons : t.icons };
  } catch (n4) {
    return console.warn("Error populating app metadata", n4), e2 || t;
  }
}
function Je2() {
  return (0, import_window_metadata.getWindowMetadata)() || { name: "", description: "", url: "", icons: [""] };
}
function ze3() {
  if (j3() === g2.reactNative && typeof global < "u" && typeof global?.Platform < "u") {
    const { OS: n4, Version: r3 } = global.Platform;
    return [n4, r3].join("-");
  }
  const e2 = detect();
  if (e2 === null) return "unknown";
  const t = e2.os ? e2.os.replace(" ", "").toLowerCase() : "unknown";
  return e2.type === "browser" ? [t, e2.name, e2.version].join("-") : [t, e2.version].join("-");
}
function Ge3() {
  const e2 = j3();
  return e2 === g2.browser ? [e2, (0, import_window_getters.getLocation)()?.host || "unknown"].join(":") : e2;
}
function Ye2(e2, t, n4) {
  const r3 = ze3(), o5 = Ge3();
  return [[e2, t].join("-"), [Be3, n4].join("-"), r3, o5].join("/");
}
function $n2({ protocol: e2, version: t, relayUrl: n4, sdkVersion: r3, auth: o5, projectId: s2, useOnCloseEvent: i3, bundleId: a3, packageName: l5 }) {
  const c5 = n4.split("?"), d5 = Ye2(e2, t, r3), u3 = { auth: o5, ua: d5, projectId: s2, useOnCloseEvent: i3 || void 0, packageName: l5 || void 0, bundleId: a3 || void 0 }, p5 = We2(c5[1] || "", u3);
  return c5[0] + "?" + p5;
}
function I(e2, t) {
  return e2.filter((n4) => t.includes(n4)).length === e2.length;
}
function xn2(e2) {
  return Object.fromEntries(e2.entries());
}
function kn2(e2) {
  return new Map(Object.entries(e2));
}
function Mn2(e2 = import_time3.FIVE_MINUTES, t) {
  const n4 = (0, import_time3.toMiliseconds)(e2 || import_time3.FIVE_MINUTES);
  let r3, o5, s2, i3;
  return { resolve: (a3) => {
    s2 && r3 && (clearTimeout(s2), r3(a3), i3 = Promise.resolve(a3));
  }, reject: (a3) => {
    s2 && o5 && (clearTimeout(s2), o5(a3));
  }, done: () => new Promise((a3, l5) => {
    if (i3) return a3(i3);
    s2 = setTimeout(() => {
      const c5 = N10("EXPIRED"), d5 = new Error(t || c5.message);
      d5.code = c5.code, l5(d5);
    }, n4), r3 = a3, o5 = l5;
  }) };
}
function Ln2(e2, t, n4) {
  return new Promise(async (r3, o5) => {
    const s2 = setTimeout(() => o5(new Error(n4)), t);
    try {
      const i3 = await e2;
      r3(i3);
    } catch (i3) {
      o5(i3);
    }
    clearTimeout(s2);
  });
}
function pe3(e2, t) {
  if (typeof t == "string" && t.startsWith(`${e2}:`)) return t;
  if (e2.toLowerCase() === "topic") {
    if (typeof t != "string") throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${t}`;
  } else if (e2.toLowerCase() === "id") {
    if (typeof t != "number") throw new Error('Value must be "number" for expirer target type: id');
    return `id:${t}`;
  }
  throw new Error(`Unknown expirer target type: ${e2}`);
}
function Kn2(e2) {
  return pe3("topic", e2);
}
function Fn3(e2) {
  return pe3("id", e2);
}
function qn2(e2) {
  const [t, n4] = e2.split(":"), r3 = { id: void 0, topic: void 0 };
  if (t === "topic" && typeof n4 == "string") r3.topic = n4;
  else if (t === "id" && Number.isInteger(Number(n4))) r3.id = Number(n4);
  else throw new Error(`Invalid target, expected id:number or topic:string, got ${t}:${n4}`);
  return r3;
}
function Hn2(e2, t) {
  return (0, import_time3.fromMiliseconds)((t || Date.now()) + (0, import_time3.toMiliseconds)(e2));
}
function Bn2(e2) {
  return Date.now() >= (0, import_time3.toMiliseconds)(e2);
}
function Wn2(e2, t) {
  return `${e2}${t ? `:${t}` : ""}`;
}
function w2(e2 = [], t = []) {
  return [.../* @__PURE__ */ new Set([...e2, ...t])];
}
async function Jn2({ id: e2, topic: t, wcDeepLink: n4 }) {
  try {
    if (!n4) return;
    const r3 = (typeof n4 == "string" ? JSON.parse(n4) : n4)?.href;
    if (typeof r3 != "string") return;
    const o5 = et(r3, e2, t), s2 = j3();
    if (s2 === g2.browser) {
      if (!(0, import_window_getters.getDocument)()?.hasFocus()) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      tt(o5);
    } else s2 === g2.reactNative && typeof global?.Linking < "u" && await global.Linking.openURL(o5);
  } catch (r3) {
    console.error(r3);
  }
}
function et(e2, t, n4) {
  const r3 = `requestId=${t}&sessionTopic=${n4}`;
  e2.endsWith("/") && (e2 = e2.slice(0, -1));
  let o5 = `${e2}`;
  if (e2.startsWith("https://t.me")) {
    const s2 = e2.includes("?") ? "&startapp=" : "?startapp=";
    o5 = `${o5}${s2}${ot(r3, true)}`;
  } else o5 = `${o5}/wc?${r3}`;
  return o5;
}
function tt(e2) {
  let t = "_self";
  rt2() ? t = "_top" : (nt2() || e2.startsWith("https://") || e2.startsWith("http://")) && (t = "_blank"), window.open(e2, t, "noreferrer noopener");
}
async function zn2(e2, t) {
  let n4 = "";
  try {
    if (x5() && (n4 = localStorage.getItem(t), n4)) return n4;
    n4 = await e2.getItem(t);
  } catch (r3) {
    console.error(r3);
  }
  return n4;
}
function Gn2(e2, t) {
  if (!e2.includes(t)) return null;
  const n4 = e2.split(/([&,?,=])/), r3 = n4.indexOf(t);
  return n4[r3 + 2];
}
function Yn2() {
  return typeof crypto < "u" && crypto?.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e2) => {
    const t = Math.random() * 16 | 0;
    return (e2 === "x" ? t : t & 3 | 8).toString(16);
  });
}
function Qn2() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
function nt2() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function rt2() {
  try {
    return window.self !== window.top;
  } catch {
    return false;
  }
}
function ot(e2, t = false) {
  const n4 = new TextEncoder().encode(e2), r3 = new Array(n4.length);
  for (let s2 = 0; s2 < n4.length; s2++) r3[s2] = String.fromCharCode(n4[s2]);
  const o5 = btoa(r3.join(""));
  return t ? o5.replace(/[=]/g, "") : o5;
}
function he3(e2) {
  const t = e2 + "=".repeat((4 - e2.length % 4) % 4), n4 = atob(t), r3 = new Uint8Array(n4.length);
  for (let o5 = 0; o5 < n4.length; o5++) r3[o5] = n4.charCodeAt(o5);
  return new TextDecoder().decode(r3);
}
function Xn2(e2) {
  return new Promise((t) => setTimeout(t, e2));
}
var Zn2 = class {
  constructor({ limit: t }) {
    this.limit = t, this.set = /* @__PURE__ */ new Set();
  }
  add(t) {
    if (!this.set.has(t)) {
      if (this.set.size >= this.limit) {
        const n4 = this.set.values().next().value;
        n4 && this.set.delete(n4);
      }
      this.set.add(t);
    }
  }
  has(t) {
    return this.set.has(t);
  }
};
var er2 = "https://rpc.walletconnect.org/v1";
function k4(e2) {
  const t = e2 + "=".repeat((4 - e2.length % 4) % 4), n4 = atob(t), r3 = new Uint8Array(n4.length);
  for (let o5 = 0; o5 < n4.length; o5++) r3[o5] = n4.charCodeAt(o5);
  return r3;
}
function ge3(e2) {
  const t = `Ethereum Signed Message:
${e2.length}`, n4 = new TextEncoder().encode(t + e2);
  return "0x" + toString2(keccak_256(n4), "base16");
}
async function st(e2, t, n4, r3, o5, s2) {
  switch (n4.t) {
    case "eip191":
      return await it2(e2, t, n4.s);
    case "eip1271":
      return await ct2(e2, t, n4.s, r3, o5, s2);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${n4.t}`);
  }
}
function it2(e2, t, n4) {
  const r3 = Signature_exports.fromHex(n4);
  return Secp256k1_exports.recoverAddress({ payload: ge3(t), signature: r3 }).toLowerCase() === e2.toLowerCase();
}
async function ct2(e2, t, n4, r3, o5, s2) {
  const i3 = ae2(r3);
  if (!i3.namespace || !i3.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r3}`);
  try {
    const a3 = "0x1626ba7e", l5 = "0000000000000000000000000000000000000000000000000000000000000040", c5 = n4.substring(2), d5 = (c5.length / 2).toString(16).padStart(64, "0"), u3 = (t.startsWith("0x") ? t : ge3(t)).substring(2), p5 = a3 + u3 + l5 + d5 + c5, b5 = await fetch(`${s2 || er2}/?chainId=${r3}&projectId=${o5}`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ id: tr2(), jsonrpc: "2.0", method: "eth_call", params: [{ to: e2, data: p5 }, "latest"] }) }), { result: f3 } = await b5.json();
    return f3 ? f3.slice(0, a3.length).toLowerCase() === a3.toLowerCase() : false;
  } catch (a3) {
    return console.error("isValidEip1271Signature: ", a3), false;
  }
}
function tr2() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
function nr2(e2) {
  const t = k4(e2), n4 = t[0];
  if (n4 === 0) throw new Error("No signatures found");
  const r3 = 1 + n4 * 64;
  if (t.length < r3) throw new Error("Transaction data too short for claimed signature count");
  if (t.length < 100) throw new Error("Transaction too short");
  const o5 = t.slice(1, 65);
  return base58.encode(o5);
}
function rr2(e2) {
  const t = k4(e2), n4 = new TextEncoder().encode("TransactionData::"), r3 = new Uint8Array(n4.length + t.length);
  r3.set(n4), r3.set(t, n4.length);
  const o5 = blake2b(r3, { dkLen: 32 });
  return base58.encode(o5);
}
function or3(e2) {
  const t = new Uint8Array(sha2562(at(e2)));
  return base58.encode(t);
}
function at(e2) {
  if (e2 instanceof Uint8Array) return e2;
  if (Array.isArray(e2)) return new Uint8Array(e2);
  if (typeof e2 == "object" && e2?.data) return new Uint8Array(Object.values(e2.data));
  if (typeof e2 == "object" && e2) return new Uint8Array(Object.values(e2));
  throw new Error("getNearUint8ArrayFromBytes: Unexpected result type from bytes array");
}
function sr2(e2) {
  const t = k4(e2), n4 = decode6(t).txn;
  if (!n4) throw new Error("Invalid signed transaction: missing 'txn' field");
  const r3 = encode5(n4), o5 = new TextEncoder().encode("TX"), s2 = concat2([o5, new Uint8Array(r3)]), i3 = sha512_256(s2);
  return base322.encode(i3).replace(/=+$/, "");
}
function ye3(e2) {
  const t = [];
  let n4 = BigInt(e2);
  for (; n4 >= 0x80n; ) t.push(Number(n4 & 0x7fn | 0x80n)), n4 >>= 7n;
  return t.push(Number(n4)), new Uint8Array(t);
}
function ir2(e2) {
  const t = k4(e2.signed.bodyBytes), n4 = k4(e2.signed.authInfoBytes), r3 = k4(e2.signature.signature), o5 = [];
  o5.push(new Uint8Array([10])), o5.push(ye3(t.length)), o5.push(t), o5.push(new Uint8Array([18])), o5.push(ye3(n4.length)), o5.push(n4), o5.push(new Uint8Array([26])), o5.push(ye3(r3.length)), o5.push(r3);
  const s2 = concat2(o5), i3 = sha2562(s2);
  return toString2(i3, "base16").toUpperCase();
}
function cr2(e2) {
  const t = [];
  try {
    if (typeof e2 == "string") return t.push(e2), t;
    if (typeof e2 != "object") return t;
    e2?.id && t.push(e2.id);
    const n4 = e2?.capabilities?.caip345?.transactionHashes;
    n4 && t.push(...n4);
  } catch (n4) {
    console.warn("getWalletSendCallsHashes failed: ", n4);
  }
  return t;
}
var ut2 = "did:pkh:";
var ar2 = { eip155: "Ethereum", solana: "Solana", bip122: "Bitcoin" };
var ur2 = (e2) => e2 ? ar2[e2] || e2 : "";
var K4 = (e2) => e2?.split(":");
var lt2 = (e2) => {
  const t = e2 && K4(e2);
  if (t) return e2.includes(ut2) ? t[3] : t[1];
};
var dt2 = (e2) => {
  const t = e2 && K4(e2);
  if (t) return e2.includes(ut2) ? t[2] : t[0];
};
var ft2 = (e2) => {
  const t = e2 && K4(e2);
  if (t) return t[2] + ":" + t[3];
};
var Ee3 = (e2) => {
  const t = e2 && K4(e2);
  if (t) return t.pop();
};
async function lr2(e2) {
  const { cacao: t, projectId: n4 } = e2, { s: r3, p: o5 } = t, s2 = pt(o5, o5.iss), i3 = Ee3(o5.iss);
  return await st(i3, s2, r3, ft2(o5.iss), n4);
}
var pt = (e2, t) => {
  const n4 = dt2(t);
  if (!n4) throw new Error("Invalid issuer: " + t);
  const r3 = `${e2.domain} wants you to sign in with your ${ur2(n4)} account:`, o5 = Ee3(t);
  if (!e2.aud && !e2.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
  let s2 = e2.statement || void 0;
  const i3 = `URI: ${e2.aud || e2.uri}`, a3 = `Version: ${e2.version}`, l5 = `Chain ID: ${lt2(t)}`, c5 = `Nonce: ${e2.nonce}`, d5 = `Issued At: ${e2.iat}`, u3 = e2.exp ? `Expiration Time: ${e2.exp}` : void 0, p5 = e2.nbf ? `Not Before: ${e2.nbf}` : void 0, b5 = e2.requestId ? `Request ID: ${e2.requestId}` : void 0, f3 = e2.resources ? `Resources:${e2.resources.map((V4) => `
- ${V4}`).join("")}` : void 0, O5 = Z2(e2.resources);
  if (O5) {
    const V4 = T2(O5);
    s2 = Ne3(s2, V4);
  }
  return [r3, o5, "", s2, "", i3, a3, l5, c5, d5, u3, p5, b5, f3].filter((V4) => V4 != null).join(`
`);
};
function yt2(e2) {
  const t = JSON.stringify(e2), n4 = new TextEncoder().encode(t), r3 = new Array(n4.length);
  for (let o5 = 0; o5 < n4.length; o5++) r3[o5] = String.fromCharCode(n4[o5]);
  return btoa(r3.join(""));
}
function Et2(e2) {
  const t = e2 + "=".repeat((4 - e2.length % 4) % 4), n4 = atob(t), r3 = new Uint8Array(n4.length);
  for (let o5 = 0; o5 < n4.length; o5++) r3[o5] = n4.charCodeAt(o5);
  return JSON.parse(new TextDecoder().decode(r3));
}
function v3(e2) {
  if (!e2) throw new Error("No recap provided, value is undefined");
  if (!e2.att) throw new Error("No `att` property found");
  const t = Object.keys(e2.att);
  if (!t?.length) throw new Error("No resources found in `att` property");
  t.forEach((n4) => {
    const r3 = e2.att[n4];
    if (Array.isArray(r3)) throw new Error(`Resource must be an object: ${n4}`);
    if (typeof r3 != "object") throw new Error(`Resource must be an object: ${n4}`);
    if (!Object.keys(r3).length) throw new Error(`Resource object is empty: ${n4}`);
    Object.keys(r3).forEach((o5) => {
      const s2 = r3[o5];
      if (!Array.isArray(s2)) throw new Error(`Ability limits ${o5} must be an array of objects, found: ${s2}`);
      if (!s2.length) throw new Error(`Value of ${o5} is empty array, must be an array with objects`);
      s2.forEach((i3) => {
        if (typeof i3 != "object") throw new Error(`Ability limits (${o5}) must be an array of objects, found: ${i3}`);
      });
    });
  });
}
function bt2(e2, t, n4, r3 = {}) {
  return n4?.sort((o5, s2) => o5.localeCompare(s2)), { att: { [e2]: be3(t, n4, r3) } };
}
function be3(e2, t, n4 = {}) {
  t = t?.sort((o5, s2) => o5.localeCompare(s2));
  const r3 = t.map((o5) => ({ [`${e2}/${o5}`]: [n4] }));
  return Object.assign({}, ...r3);
}
function X2(e2) {
  return v3(e2), `urn:recap:${yt2(e2).replace(/=/g, "")}`;
}
function T2(e2) {
  const t = Et2(e2.replace("urn:recap:", ""));
  return v3(t), t;
}
function hr2(e2, t, n4) {
  const r3 = bt2(e2, t, n4);
  return X2(r3);
}
function we3(e2) {
  return e2 && e2.includes("urn:recap:");
}
function gr2(e2, t) {
  const n4 = T2(e2), r3 = T2(t), o5 = Nt2(n4, r3);
  return X2(o5);
}
function Nt2(e2, t) {
  v3(e2), v3(t);
  const n4 = Object.keys(e2.att).concat(Object.keys(t.att)).sort((o5, s2) => o5.localeCompare(s2)), r3 = { att: {} };
  return n4.forEach((o5) => {
    Object.keys(e2.att?.[o5] || {}).concat(Object.keys(t.att?.[o5] || {})).sort((s2, i3) => s2.localeCompare(i3)).forEach((s2) => {
      r3.att[o5] = { ...r3.att[o5], [s2]: e2.att[o5]?.[s2] || t.att[o5]?.[s2] };
    });
  }), r3;
}
function Ne3(e2 = "", t) {
  v3(t);
  const n4 = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (e2.includes(n4)) return e2;
  const r3 = [];
  let o5 = 0;
  Object.keys(t.att).forEach((a3) => {
    const l5 = Object.keys(t.att[a3]).map((u3) => ({ ability: u3.split("/")[0], action: u3.split("/")[1] }));
    l5.sort((u3, p5) => u3.action.localeCompare(p5.action));
    const c5 = {};
    l5.forEach((u3) => {
      c5[u3.ability] || (c5[u3.ability] = []), c5[u3.ability].push(u3.action);
    });
    const d5 = Object.keys(c5).map((u3) => (o5++, `(${o5}) '${u3}': '${c5[u3].join("', '")}' for '${a3}'.`));
    r3.push(d5.join(", ").replace(".,", "."));
  });
  const s2 = r3.join(" "), i3 = `${n4}${s2}`;
  return `${e2 ? e2 + " " : ""}${i3}`;
}
function yr2(e2) {
  const t = T2(e2);
  v3(t);
  const n4 = t.att?.eip155;
  return n4 ? Object.keys(n4).map((r3) => r3.split("/")[1]) : [];
}
function Er2(e2) {
  const t = T2(e2);
  v3(t);
  const n4 = [];
  return Object.values(t.att).forEach((r3) => {
    Object.values(r3).forEach((o5) => {
      o5?.[0]?.chains && n4.push(o5[0].chains);
    });
  }), [...new Set(n4.flat())];
}
function Z2(e2) {
  if (!e2) return;
  const t = e2?.[e2.length - 1];
  return we3(t) ? t : void 0;
}
var ve3 = "base10";
var y4 = "base16";
var S2 = "base64pad";
var ee2 = "base64url";
var _2 = "utf8";
var Se3 = 0;
var D2 = 1;
var F = 2;
var br2 = 0;
var St2 = 1;
var q2 = 12;
var Oe3 = 32;
function wr2() {
  const e2 = x25519.utils.randomPrivateKey(), t = x25519.getPublicKey(e2);
  return { privateKey: toString2(e2, y4), publicKey: toString2(t, y4) };
}
function Nr2() {
  const e2 = randomBytes(Oe3);
  return toString2(e2, y4);
}
function vr2(e2, t) {
  const n4 = x25519.getSharedSecret(fromString2(e2, y4), fromString2(t, y4)), r3 = hkdf(sha2563, n4, void 0, void 0, Oe3);
  return toString2(r3, y4);
}
function Sr2(e2) {
  const t = sha2563(fromString2(e2, y4));
  return toString2(t, y4);
}
function Or2(e2) {
  const t = sha2563(fromString2(e2, _2));
  return toString2(t, y4);
}
function Ae3(e2) {
  return fromString2(`${e2}`, ve3);
}
function C3(e2) {
  return Number(toString2(e2, ve3));
}
function Ot2(e2) {
  return e2.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function te3(e2) {
  const t = e2.replace(/-/g, "+").replace(/_/g, "/"), n4 = (4 - t.length % 4) % 4;
  return t + "=".repeat(n4);
}
function Ar2(e2) {
  const t = Ae3(typeof e2.type < "u" ? e2.type : Se3);
  if (C3(t) === D2 && typeof e2.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
  const n4 = typeof e2.senderPublicKey < "u" ? fromString2(e2.senderPublicKey, y4) : void 0, r3 = typeof e2.iv < "u" ? fromString2(e2.iv, y4) : randomBytes(q2), o5 = fromString2(e2.symKey, y4), s2 = chacha20poly1305(o5, r3).encrypt(fromString2(e2.message, _2)), i3 = Ie3({ type: t, sealed: s2, iv: r3, senderPublicKey: n4 });
  return e2.encoding === ee2 ? Ot2(i3) : i3;
}
function Ir2(e2) {
  const t = fromString2(e2.symKey, y4), { sealed: n4, iv: r3 } = ne2({ encoded: e2.encoded, encoding: e2.encoding }), o5 = chacha20poly1305(t, r3).decrypt(n4);
  if (o5 === null) throw new Error("Failed to decrypt");
  return toString2(o5, _2);
}
function Tr2(e2, t) {
  const n4 = Ae3(F), r3 = randomBytes(q2), o5 = fromString2(e2, _2), s2 = Ie3({ type: n4, sealed: o5, iv: r3 });
  return t === ee2 ? Ot2(s2) : s2;
}
function Rr2(e2, t) {
  const { sealed: n4 } = ne2({ encoded: e2, encoding: t });
  return toString2(n4, _2);
}
function Ie3(e2) {
  if (C3(e2.type) === F) return toString2(concat2([e2.type, e2.sealed]), S2);
  if (C3(e2.type) === D2) {
    if (typeof e2.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    return toString2(concat2([e2.type, e2.senderPublicKey, e2.iv, e2.sealed]), S2);
  }
  return toString2(concat2([e2.type, e2.iv, e2.sealed]), S2);
}
function ne2(e2) {
  const t = (e2.encoding || S2) === ee2 ? te3(e2.encoded) : e2.encoded, n4 = fromString2(t, S2), r3 = n4.slice(br2, St2), o5 = St2;
  if (C3(r3) === D2) {
    const l5 = o5 + Oe3, c5 = l5 + q2, d5 = n4.slice(o5, l5), u3 = n4.slice(l5, c5), p5 = n4.slice(c5);
    return { type: r3, sealed: p5, iv: u3, senderPublicKey: d5 };
  }
  if (C3(r3) === F) {
    const l5 = n4.slice(o5), c5 = randomBytes(q2);
    return { type: r3, sealed: l5, iv: c5 };
  }
  const s2 = o5 + q2, i3 = n4.slice(o5, s2), a3 = n4.slice(s2);
  return { type: r3, sealed: a3, iv: i3 };
}
function Ur2(e2, t) {
  const n4 = ne2({ encoded: e2, encoding: t?.encoding });
  return At({ type: C3(n4.type), senderPublicKey: typeof n4.senderPublicKey < "u" ? toString2(n4.senderPublicKey, y4) : void 0, receiverPublicKey: t?.receiverPublicKey });
}
function At(e2) {
  const t = e2?.type || Se3;
  if (t === D2) {
    if (typeof e2?.senderPublicKey > "u") throw new Error("missing sender public key");
    if (typeof e2?.receiverPublicKey > "u") throw new Error("missing receiver public key");
  }
  return { type: t, senderPublicKey: e2?.senderPublicKey, receiverPublicKey: e2?.receiverPublicKey };
}
function $r2(e2) {
  return e2.type === D2 && typeof e2.senderPublicKey == "string" && typeof e2.receiverPublicKey == "string";
}
function jr2(e2) {
  return e2.type === F;
}
function It2(e2) {
  const t = fromString2(te3(e2.x), S2), n4 = fromString2(te3(e2.y), S2);
  return concat2([new Uint8Array([4]), t, n4]);
}
function Cr2(e2, t) {
  const [n4, r3, o5] = e2.split("."), s2 = fromString2(te3(o5), S2);
  if (s2.length !== 64) throw new Error("Invalid signature length");
  const i3 = s2.slice(0, 32), a3 = s2.slice(32, 64), l5 = `${n4}.${r3}`, c5 = sha2563(l5), d5 = It2(t);
  if (!p2562.verify(concat2([i3, a3]), c5, d5)) throw new Error("Invalid signature");
  return sn(e2).payload;
}
var Tt2 = "irn";
function Pr2(e2) {
  return e2?.relay || { protocol: Tt2 };
}
function xr2(e2) {
  const t = C2[e2];
  if (typeof t > "u") throw new Error(`Relay Protocol not supported: ${e2}`);
  return t;
}
function Rt2(e2, t = "-") {
  const n4 = {}, r3 = "relay" + t;
  return Object.keys(e2).forEach((o5) => {
    if (o5.startsWith(r3)) {
      const s2 = o5.replace(r3, ""), i3 = e2[o5];
      n4[s2] = i3;
    }
  }), n4;
}
function kr2(e2) {
  if (!e2.includes("wc:")) {
    const c5 = he3(e2);
    c5?.includes("wc:") && (e2 = c5);
  }
  e2 = e2.includes("wc://") ? e2.replace("wc://", "") : e2, e2 = e2.includes("wc:") ? e2.replace("wc:", "") : e2;
  const t = e2.indexOf(":"), n4 = e2.indexOf("?") !== -1 ? e2.indexOf("?") : void 0, r3 = e2.substring(0, t), o5 = e2.substring(t + 1, n4).split("@"), s2 = typeof n4 < "u" ? e2.substring(n4) : "", i3 = new URLSearchParams(s2), a3 = Object.fromEntries(i3.entries()), l5 = typeof a3.methods == "string" ? a3.methods.split(",") : void 0;
  return { protocol: r3, topic: Ut2(o5[0]), version: parseInt(o5[1], 10), symKey: a3.symKey, relay: Rt2(a3), methods: l5, expiryTimestamp: a3.expiryTimestamp ? parseInt(a3.expiryTimestamp, 10) : void 0 };
}
function Ut2(e2) {
  return e2.startsWith("//") ? e2.substring(2) : e2;
}
function $t2(e2, t = "-") {
  const n4 = "relay", r3 = {};
  return Object.keys(e2).forEach((o5) => {
    const s2 = o5, i3 = n4 + t + s2;
    e2[s2] && (r3[i3] = e2[s2]);
  }), r3;
}
function _r2(e2) {
  const t = new URLSearchParams(), n4 = { ...$t2(e2.relay), symKey: e2.symKey, ...e2.expiryTimestamp && { expiryTimestamp: e2.expiryTimestamp.toString() }, ...e2.methods && { methods: e2.methods.join(",") } };
  return Object.entries(n4).sort(([r3], [o5]) => r3.localeCompare(o5)).forEach(([r3, o5]) => {
    o5 !== void 0 && t.append(r3, String(o5));
  }), `${e2.protocol}:${e2.topic}@${e2.version}?${t}`;
}
function Dr2(e2, t, n4) {
  return `${e2}?wc_ev=${n4}&topic=${t}`;
}
function P3(e2) {
  const t = [];
  return e2.forEach((n4) => {
    const [r3, o5] = n4.split(":");
    t.push(`${r3}:${o5}`);
  }), t;
}
function jt2(e2) {
  const t = [];
  return Object.values(e2).forEach((n4) => {
    t.push(...P3(n4.accounts));
  }), [...new Set(t)];
}
function Vr2(e2) {
  const t = [];
  return Object.values(e2).forEach((n4) => {
    t.push(...n4.methods);
  }), [...new Set(t)];
}
function Mr2(e2) {
  const t = [];
  return Object.values(e2).forEach((n4) => {
    t.push(...n4.events);
  }), [...new Set(t)];
}
function Ct(e2, t) {
  const n4 = [];
  return Object.values(e2).forEach((r3) => {
    P3(r3.accounts).includes(t) && n4.push(...r3.methods);
  }), n4;
}
function Pt2(e2, t) {
  const n4 = [];
  return Object.values(e2).forEach((r3) => {
    P3(r3.accounts).includes(t) && n4.push(...r3.events);
  }), n4;
}
function Te3(e2) {
  return e2.includes(":");
}
function xt2(e2) {
  return Te3(e2) ? e2.split(":")[0] : e2;
}
function H3(e2) {
  const t = {};
  if (!re2(e2)) return t;
  for (const [n4, r3] of Object.entries(e2)) {
    const o5 = Te3(n4) ? [n4] : r3.chains, s2 = r3.methods || [], i3 = r3.events || [], a3 = xt2(n4);
    t[a3] = { ...t[a3], chains: w2(o5, t[a3]?.chains), methods: w2(s2, t[a3]?.methods), events: w2(i3, t[a3]?.events) };
  }
  return t;
}
function kt2(e2) {
  const t = {};
  return e2?.forEach((n4) => {
    const [r3, o5] = n4.split(":");
    t[r3] || (t[r3] = { accounts: [], chains: [], events: [], methods: [] }), t[r3].accounts.push(n4), t[r3].chains?.push(`${r3}:${o5}`);
  }), t;
}
function Fr2(e2, t) {
  t = t.map((r3) => r3.replace("did:pkh:", ""));
  const n4 = kt2(t);
  for (const [r3, o5] of Object.entries(n4)) o5.methods ? o5.methods = w2(o5.methods, e2) : o5.methods = e2, o5.events = ["chainChanged", "accountsChanged"];
  return n4;
}
function qr2(e2, t) {
  const n4 = H3(e2), r3 = H3(t), o5 = {}, s2 = Object.keys(n4).concat(Object.keys(r3));
  for (const i3 of s2) o5[i3] = { chains: w2(n4[i3]?.chains, r3[i3]?.chains), methods: w2(n4[i3]?.methods, r3[i3]?.methods), events: w2(n4[i3]?.events, r3[i3]?.events) };
  return o5;
}
function B2(e2, t) {
  return Array.isArray(e2) ? typeof t < "u" && e2.length ? e2.every(t) : true : false;
}
function re2(e2) {
  return Object.getPrototypeOf(e2) === Object.prototype && Object.keys(e2).length;
}
function R2(e2) {
  return typeof e2 > "u";
}
function E3(e2, t) {
  return t && R2(e2) ? true : typeof e2 == "string" && !!e2.trim().length;
}
function oe2(e2, t) {
  return t && R2(e2) ? true : typeof e2 == "number" && !isNaN(e2);
}
function Hr2(e2, t) {
  const { requiredNamespaces: n4 } = t, r3 = Object.keys(e2.namespaces), o5 = Object.keys(n4);
  let s2 = true;
  return I(o5, r3) ? (r3.forEach((i3) => {
    const { accounts: a3, methods: l5, events: c5 } = e2.namespaces[i3], d5 = P3(a3), u3 = n4[i3];
    (!I(Y2(i3, u3), d5) || !I(u3.methods, l5) || !I(u3.events, c5)) && (s2 = false);
  }), s2) : false;
}
function W3(e2) {
  return E3(e2, false) && e2.includes(":") ? e2.split(":").length === 2 : false;
}
function _t2(e2) {
  if (E3(e2, false) && e2.includes(":")) {
    const t = e2.split(":");
    if (t.length === 3) {
      const n4 = t[0] + ":" + t[1];
      return !!t[2] && W3(n4);
    }
  }
  return false;
}
function Br2(e2) {
  function t(n4) {
    try {
      return typeof new URL(n4) < "u";
    } catch {
      return false;
    }
  }
  try {
    if (E3(e2, false)) {
      if (t(e2)) return true;
      const n4 = he3(e2);
      return t(n4);
    }
  } catch {
  }
  return false;
}
function Wr2(e2) {
  return e2?.proposer?.publicKey;
}
function Jr2(e2) {
  return e2?.topic;
}
function zr2(e2, t) {
  let n4 = null;
  return E3(e2?.publicKey, false) || (n4 = N10("MISSING_OR_INVALID", `${t} controller public key should be a string`)), n4;
}
function Re3(e2) {
  let t = true;
  return B2(e2) ? e2.length && (t = e2.every((n4) => E3(n4, false))) : t = false, t;
}
function Dt2(e2, t, n4) {
  let r3 = null;
  return B2(t) && t.length ? t.forEach((o5) => {
    r3 || W3(o5) || (r3 = $2("UNSUPPORTED_CHAINS", `${n4}, chain ${o5} should be a string and conform to "namespace:chainId" format`));
  }) : W3(e2) || (r3 = $2("UNSUPPORTED_CHAINS", `${n4}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r3;
}
function Vt2(e2, t, n4) {
  let r3 = null;
  return Object.entries(e2).forEach(([o5, s2]) => {
    if (r3) return;
    const i3 = Dt2(o5, Y2(o5, s2), `${t} ${n4}`);
    i3 && (r3 = i3);
  }), r3;
}
function Mt2(e2, t) {
  let n4 = null;
  return B2(e2) ? e2.forEach((r3) => {
    n4 || _t2(r3) || (n4 = $2("UNSUPPORTED_ACCOUNTS", `${t}, account ${r3} should be a string and conform to "namespace:chainId:address" format`));
  }) : n4 = $2("UNSUPPORTED_ACCOUNTS", `${t}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), n4;
}
function Lt2(e2, t) {
  let n4 = null;
  return Object.values(e2).forEach((r3) => {
    if (n4) return;
    const o5 = Mt2(r3?.accounts, `${t} namespace`);
    o5 && (n4 = o5);
  }), n4;
}
function Kt2(e2, t) {
  let n4 = null;
  return Re3(e2?.methods) ? Re3(e2?.events) || (n4 = $2("UNSUPPORTED_EVENTS", `${t}, events should be an array of strings or empty array for no events`)) : n4 = $2("UNSUPPORTED_METHODS", `${t}, methods should be an array of strings or empty array for no methods`), n4;
}
function Ue3(e2, t) {
  let n4 = null;
  return Object.values(e2).forEach((r3) => {
    if (n4) return;
    const o5 = Kt2(r3, `${t}, namespace`);
    o5 && (n4 = o5);
  }), n4;
}
function Gr2(e2, t, n4) {
  let r3 = null;
  if (e2 && re2(e2)) {
    const o5 = Ue3(e2, t);
    o5 && (r3 = o5);
    const s2 = Vt2(e2, t, n4);
    s2 && (r3 = s2);
  } else r3 = N10("MISSING_OR_INVALID", `${t}, ${n4} should be an object with data`);
  return r3;
}
function Ft2(e2, t) {
  let n4 = null;
  if (e2 && re2(e2)) {
    const r3 = Ue3(e2, t);
    r3 && (n4 = r3);
    const o5 = Lt2(e2, t);
    o5 && (n4 = o5);
  } else n4 = N10("MISSING_OR_INVALID", `${t}, namespaces should be an object with data`);
  return n4;
}
function qt2(e2) {
  return E3(e2.protocol, true);
}
function Yr2(e2, t) {
  let n4 = false;
  return t && !e2 ? n4 = true : e2 && B2(e2) && e2.length && e2.forEach((r3) => {
    n4 = qt2(r3);
  }), n4;
}
function Qr2(e2) {
  return typeof e2 == "number";
}
function Xr2(e2) {
  return typeof e2 < "u" && typeof e2 !== null;
}
function Zr2(e2) {
  return !(!e2 || typeof e2 != "object" || !e2.code || !oe2(e2.code, false) || !e2.message || !E3(e2.message, false));
}
function eo2(e2) {
  return !(R2(e2) || !E3(e2.method, false));
}
function to2(e2) {
  return !(R2(e2) || R2(e2.result) && R2(e2.error) || !oe2(e2.id, false) || !E3(e2.jsonrpc, false));
}
function no2(e2) {
  return !(R2(e2) || !E3(e2.name, false));
}
function ro2(e2, t) {
  return !(!W3(t) || !jt2(e2).includes(t));
}
function oo2(e2, t, n4) {
  return E3(n4, false) ? Ct(e2, t).includes(n4) : false;
}
function so2(e2, t, n4) {
  return E3(n4, false) ? Pt2(e2, t).includes(n4) : false;
}
function Ht2(e2, t, n4) {
  let r3 = null;
  const o5 = io2(e2), s2 = co2(t), i3 = Object.keys(o5), a3 = Object.keys(s2), l5 = Bt2(Object.keys(e2)), c5 = Bt2(Object.keys(t)), d5 = l5.filter((u3) => !c5.includes(u3));
  return d5.length && (r3 = N10("NON_CONFORMING_NAMESPACES", `${n4} namespaces keys don't satisfy requiredNamespaces.
      Required: ${d5.toString()}
      Received: ${Object.keys(t).toString()}`)), I(i3, a3) || (r3 = N10("NON_CONFORMING_NAMESPACES", `${n4} namespaces chains don't satisfy required namespaces.
      Required: ${i3.toString()}
      Approved: ${a3.toString()}`)), Object.keys(t).forEach((u3) => {
    if (!u3.includes(":") || r3) return;
    const p5 = P3(t[u3].accounts);
    p5.includes(u3) || (r3 = N10("NON_CONFORMING_NAMESPACES", `${n4} namespaces accounts don't satisfy namespace accounts for ${u3}
        Required: ${u3}
        Approved: ${p5.toString()}`));
  }), i3.forEach((u3) => {
    r3 || (I(o5[u3].methods, s2[u3].methods) ? I(o5[u3].events, s2[u3].events) || (r3 = N10("NON_CONFORMING_NAMESPACES", `${n4} namespaces events don't satisfy namespace events for ${u3}`)) : r3 = N10("NON_CONFORMING_NAMESPACES", `${n4} namespaces methods don't satisfy namespace methods for ${u3}`));
  }), r3;
}
function io2(e2) {
  const t = {};
  return Object.keys(e2).forEach((n4) => {
    n4.includes(":") ? t[n4] = e2[n4] : e2[n4].chains?.forEach((r3) => {
      t[r3] = { methods: e2[n4].methods, events: e2[n4].events };
    });
  }), t;
}
function Bt2(e2) {
  return [...new Set(e2.map((t) => t.includes(":") ? t.split(":")[0] : t))];
}
function co2(e2) {
  const t = {};
  return Object.keys(e2).forEach((n4) => {
    n4.includes(":") ? t[n4] = e2[n4] : P3(e2[n4].accounts)?.forEach((r3) => {
      t[r3] = { accounts: e2[n4].accounts.filter((o5) => o5.includes(`${r3}:`)), methods: e2[n4].methods, events: e2[n4].events };
    });
  }), t;
}
function ao2(e2, t) {
  return oe2(e2, false) && e2 <= t.max && e2 >= t.min;
}
function uo2() {
  const e2 = j3();
  return new Promise((t) => {
    switch (e2) {
      case g2.browser:
        t(Wt2());
        break;
      case g2.reactNative:
        t(Jt2());
        break;
      case g2.node:
        t(zt2());
        break;
      default:
        t(true);
    }
  });
}
function Wt2() {
  return x5() && navigator?.onLine;
}
async function Jt2() {
  return A2() && typeof global < "u" && global?.NetInfo ? (await global?.NetInfo.fetch())?.isConnected : true;
}
function zt2() {
  return true;
}
function lo2(e2) {
  switch (j3()) {
    case g2.browser:
      Gt2(e2);
      break;
    case g2.reactNative:
      Yt2(e2);
      break;
    case g2.node:
      break;
  }
}
function Gt2(e2) {
  !A2() && x5() && (window.addEventListener("online", () => e2(true)), window.addEventListener("offline", () => e2(false)));
}
function Yt2(e2) {
  A2() && typeof global < "u" && global?.NetInfo && global?.NetInfo.addEventListener((t) => e2(t?.isConnected));
}
function fo2() {
  return x5() && (0, import_window_getters.getDocument)() ? (0, import_window_getters.getDocument)()?.visibilityState === "visible" : true;
}
var $e3 = {};
var po2 = class {
  static get(t) {
    return $e3[t];
  }
  static set(t, n4) {
    $e3[t] = n4;
  }
  static delete(t) {
    delete $e3[t];
  }
};
function Qt2(e2) {
  const t = base58.decode(e2);
  if (t.length < 33) throw new Error("Too short to contain a public key");
  return t.slice(1, 33);
}
function Xt2({ publicKey: e2, signature: t, payload: n4 }) {
  const r3 = se2(n4.method), o5 = 128 | parseInt(n4.version?.toString() || "4"), s2 = ho2(n4.address), i3 = n4.era === "00" ? new Uint8Array([0]) : se2(n4.era);
  if (i3.length !== 1 && i3.length !== 2) throw new Error("Invalid era length");
  const a3 = parseInt(n4.nonce, 16), l5 = new Uint8Array([a3 & 255, a3 >> 8 & 255]), c5 = BigInt(`0x${mo2(n4.tip)}`), d5 = yo2(c5), u3 = new Uint8Array([0, ...e2, s2, ...t, ...i3, ...l5, ...d5, ...r3]), p5 = go2(u3.length + 1);
  return new Uint8Array([...p5, o5, ...u3]);
}
function Zt2(e2) {
  const t = se2(e2), n4 = (0, import_blakejs.blake2b)(t, void 0, 32);
  return "0x" + toString2(n4, "base16");
}
function se2(e2) {
  return new Uint8Array(e2.replace(/^0x/, "").match(/.{1,2}/g).map((t) => parseInt(t, 16)));
}
function mo2(e2) {
  return e2.startsWith("0x") ? e2.slice(2) : e2;
}
function ho2(e2) {
  const t = base58.decode(e2)[0];
  return t === 42 ? 0 : t === 60 ? 2 : 1;
}
function go2(e2) {
  if (e2 < 64) return new Uint8Array([e2 << 2]);
  if (e2 < 16384) {
    const t = e2 << 2 | 1;
    return new Uint8Array([t & 255, t >> 8 & 255]);
  } else if (e2 < 1 << 30) {
    const t = e2 << 2 | 2;
    return new Uint8Array([t & 255, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255]);
  } else throw new Error("Compact encoding > 2^30 not supported");
}
function yo2(e2) {
  if (e2 < 1n << 6n) return new Uint8Array([Number(e2 << 2n)]);
  if (e2 < 1n << 14n) {
    const t = e2 << 2n | 0x01n;
    return new Uint8Array([Number(t & 0xffn), Number(t >> 8n & 0xffn)]);
  } else if (e2 < 1n << 30n) {
    const t = e2 << 2n | 0x02n;
    return new Uint8Array([Number(t & 0xffn), Number(t >> 8n & 0xffn), Number(t >> 16n & 0xffn), Number(t >> 24n & 0xffn)]);
  } else throw new Error("BigInt compact encoding not supported > 2^30");
}
function Eo2(e2) {
  const t = se2(e2.signature), n4 = Qt2(e2.transaction.address), r3 = Xt2({ publicKey: n4, signature: t, payload: e2.transaction }), o5 = toString2(r3, "base16");
  return Zt2(o5);
}
function bo2({ logger: e2, name: t }) {
  const n4 = typeof e2 == "string" ? Ue({ opts: { level: e2, name: t } }).logger : e2;
  return n4.level = typeof e2 == "string" ? e2 : e2.level, n4;
}

// node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var import_events5 = __toESM(require_events());

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  DEFAULT_ERROR: () => DEFAULT_ERROR,
  IBaseJsonRpcProvider: () => n3,
  IEvents: () => e,
  IJsonRpcConnection: () => o2,
  IJsonRpcProvider: () => r2,
  INTERNAL_ERROR: () => INTERNAL_ERROR,
  INVALID_PARAMS: () => INVALID_PARAMS,
  INVALID_REQUEST: () => INVALID_REQUEST,
  METHOD_NOT_FOUND: () => METHOD_NOT_FOUND,
  PARSE_ERROR: () => PARSE_ERROR,
  RESERVED_ERROR_CODES: () => RESERVED_ERROR_CODES,
  SERVER_ERROR: () => SERVER_ERROR,
  SERVER_ERROR_CODE_RANGE: () => SERVER_ERROR_CODE_RANGE,
  STANDARD_ERROR_MAP: () => STANDARD_ERROR_MAP,
  formatErrorMessage: () => formatErrorMessage,
  formatJsonRpcError: () => formatJsonRpcError,
  formatJsonRpcRequest: () => formatJsonRpcRequest,
  formatJsonRpcResult: () => formatJsonRpcResult,
  getBigIntRpcId: () => getBigIntRpcId,
  getError: () => getError,
  getErrorByCode: () => getErrorByCode,
  isHttpUrl: () => isHttpUrl,
  isJsonRpcError: () => isJsonRpcError,
  isJsonRpcPayload: () => isJsonRpcPayload,
  isJsonRpcRequest: () => isJsonRpcRequest,
  isJsonRpcResponse: () => isJsonRpcResponse,
  isJsonRpcResult: () => isJsonRpcResult,
  isJsonRpcValidationInvalid: () => isJsonRpcValidationInvalid,
  isLocalhostUrl: () => isLocalhostUrl,
  isNodeJs: () => isNodeJs,
  isReservedErrorCode: () => isReservedErrorCode,
  isServerErrorCode: () => isServerErrorCode,
  isValidDefaultRoute: () => isValidDefaultRoute,
  isValidErrorCode: () => isValidErrorCode,
  isValidLeadingWildcardRoute: () => isValidLeadingWildcardRoute,
  isValidRoute: () => isValidRoute,
  isValidTrailingWildcardRoute: () => isValidTrailingWildcardRoute,
  isValidWildcardRoute: () => isValidWildcardRoute,
  isWsUrl: () => isWsUrl,
  parseConnectionError: () => parseConnectionError,
  payloadId: () => payloadId,
  validateJsonRpcError: () => validateJsonRpcError
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js
var PARSE_ERROR = "PARSE_ERROR";
var INVALID_REQUEST = "INVALID_REQUEST";
var METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
var INVALID_PARAMS = "INVALID_PARAMS";
var INTERNAL_ERROR = "INTERNAL_ERROR";
var SERVER_ERROR = "SERVER_ERROR";
var RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603];
var SERVER_ERROR_CODE_RANGE = [-32e3, -32099];
var STANDARD_ERROR_MAP = {
  [PARSE_ERROR]: { code: -32700, message: "Parse error" },
  [INVALID_REQUEST]: { code: -32600, message: "Invalid Request" },
  [METHOD_NOT_FOUND]: { code: -32601, message: "Method not found" },
  [INVALID_PARAMS]: { code: -32602, message: "Invalid params" },
  [INTERNAL_ERROR]: { code: -32603, message: "Internal error" },
  [SERVER_ERROR]: { code: -32e3, message: "Server error" }
};
var DEFAULT_ERROR = SERVER_ERROR;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js
function isServerErrorCode(code2) {
  return code2 <= SERVER_ERROR_CODE_RANGE[0] && code2 >= SERVER_ERROR_CODE_RANGE[1];
}
function isReservedErrorCode(code2) {
  return RESERVED_ERROR_CODES.includes(code2);
}
function isValidErrorCode(code2) {
  return typeof code2 === "number";
}
function getError(type) {
  if (!Object.keys(STANDARD_ERROR_MAP).includes(type)) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return STANDARD_ERROR_MAP[type];
}
function getErrorByCode(code2) {
  const match = Object.values(STANDARD_ERROR_MAP).find((e2) => e2.code === code2);
  if (!match) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return match;
}
function validateJsonRpcError(response) {
  if (typeof response.error.code === "undefined") {
    return { valid: false, error: "Missing code for JSON-RPC error" };
  }
  if (typeof response.error.message === "undefined") {
    return { valid: false, error: "Missing message for JSON-RPC error" };
  }
  if (!isValidErrorCode(response.error.code)) {
    return {
      valid: false,
      error: `Invalid error code type for JSON-RPC: ${response.error.code}`
    };
  }
  if (isReservedErrorCode(response.error.code)) {
    const error = getErrorByCode(response.error.code);
    if (error.message !== STANDARD_ERROR_MAP[DEFAULT_ERROR].message && response.error.message === error.message) {
      return {
        valid: false,
        error: `Invalid error code message for JSON-RPC: ${response.error.code}`
      };
    }
  }
  return { valid: true };
}
function parseConnectionError(e2, url, type) {
  return e2.message.includes("getaddrinfo ENOTFOUND") || e2.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e2;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js
var env_exports = {};
__export(env_exports, {
  isNodeJs: () => isNodeJs
});
var import_environment = __toESM(require_cjs4());
__reExport(env_exports, __toESM(require_cjs4()));
var isNodeJs = import_environment.isNode;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
__reExport(esm_exports, env_exports);

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js
function payloadId(entropy = 3) {
  const date = Date.now() * Math.pow(10, entropy);
  const extra = Math.floor(Math.random() * Math.pow(10, entropy));
  return date + extra;
}
function getBigIntRpcId(entropy = 6) {
  return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
  return {
    id: id || payloadId(),
    jsonrpc: "2.0",
    method,
    params
  };
}
function formatJsonRpcResult(id, result) {
  return {
    id,
    jsonrpc: "2.0",
    result
  };
}
function formatJsonRpcError(id, error, data) {
  return {
    id,
    jsonrpc: "2.0",
    error: formatErrorMessage(error, data)
  };
}
function formatErrorMessage(error, data) {
  if (typeof error === "undefined") {
    return getError(INTERNAL_ERROR);
  }
  if (typeof error === "string") {
    error = Object.assign(Object.assign({}, getError(SERVER_ERROR)), { message: error });
  }
  if (typeof data !== "undefined") {
    error.data = data;
  }
  if (isReservedErrorCode(error.code)) {
    error = getErrorByCode(error.code);
  }
  return error;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js
function isValidRoute(route) {
  if (route.includes("*")) {
    return isValidWildcardRoute(route);
  }
  if (/\W/g.test(route)) {
    return false;
  }
  return true;
}
function isValidDefaultRoute(route) {
  return route === "*";
}
function isValidWildcardRoute(route) {
  if (isValidDefaultRoute(route)) {
    return true;
  }
  if (!route.includes("*")) {
    return false;
  }
  if (route.split("*").length !== 2) {
    return false;
  }
  if (route.split("*").filter((x8) => x8.trim() === "").length !== 1) {
    return false;
  }
  return true;
}
function isValidLeadingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}
function isValidTrailingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
}

// node_modules/@walletconnect/jsonrpc-types/dist/index.es.js
var e = class {
};
var o2 = class extends e {
  constructor(c5) {
    super();
  }
};
var n3 = class extends e {
  constructor() {
    super();
  }
};
var r2 = class extends n3 {
  constructor(c5) {
    super();
  }
};

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js
var HTTP_REGEX = "^https?:";
var WS_REGEX = "^wss?:";
function getUrlProtocol(url) {
  const matches = url.match(new RegExp(/^\w+:/, "gi"));
  if (!matches || !matches.length)
    return;
  return matches[0];
}
function matchRegexProtocol(url, regex) {
  const protocol = getUrlProtocol(url);
  if (typeof protocol === "undefined")
    return false;
  return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
  return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
  return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(url);
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js
function isJsonRpcPayload(payload) {
  return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
  return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
  return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
  return "result" in payload;
}
function isJsonRpcError(payload) {
  return "error" in payload;
}
function isJsonRpcValidationInvalid(validation) {
  return "error" in validation && validation.valid === false;
}

// node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var o3 = class extends r2 {
  constructor(t) {
    super(t), this.events = new import_events5.EventEmitter(), this.hasRegisteredEventListeners = false, this.connection = this.setConnection(t), this.connection.connected && this.registerEventListeners();
  }
  async connect(t = this.connection) {
    await this.open(t);
  }
  async disconnect() {
    await this.close();
  }
  on(t, e2) {
    this.events.on(t, e2);
  }
  once(t, e2) {
    this.events.once(t, e2);
  }
  off(t, e2) {
    this.events.off(t, e2);
  }
  removeListener(t, e2) {
    this.events.removeListener(t, e2);
  }
  async request(t, e2) {
    return this.requestStrict(formatJsonRpcRequest(t.method, t.params || [], t.id || getBigIntRpcId().toString()), e2);
  }
  async requestStrict(t, e2) {
    return new Promise(async (i3, s2) => {
      if (!this.connection.connected) try {
        await this.open();
      } catch (n4) {
        s2(n4);
      }
      this.events.on(`${t.id}`, (n4) => {
        isJsonRpcError(n4) ? s2(n4.error) : i3(n4.result);
      });
      try {
        await this.connection.send(t, e2);
      } catch (n4) {
        s2(n4);
      }
    });
  }
  setConnection(t = this.connection) {
    return t;
  }
  onPayload(t) {
    this.events.emit("payload", t), isJsonRpcResponse(t) ? this.events.emit(`${t.id}`, t) : this.events.emit("message", { type: t.method, data: t.params });
  }
  onClose(t) {
    t && t.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason ? `(${t.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(t = this.connection) {
    this.connection === t && this.connection.connected || (this.connection.connected && this.close(), typeof t == "string" && (await this.connection.open(t), t = this.connection), this.connection = this.setConnection(t), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (t) => this.onPayload(t)), this.connection.on("close", (t) => this.onClose(t)), this.connection.on("error", (t) => this.events.emit("error", t)), this.connection.on("register_error", (t) => this.onClose()), this.hasRegisteredEventListeners = true);
  }
};

// node_modules/@walletconnect/jsonrpc-ws-connection/dist/index.es.js
var import_events6 = __toESM(require_events());
var v4 = () => typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof global.WebSocket < "u" ? global.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require_browser();
var w3 = () => typeof WebSocket < "u" || typeof global < "u" && typeof global.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u";
var d2 = (r3) => r3.split("?")[0];
var h3 = 10;
var b2 = v4();
var f = class {
  constructor(e2) {
    if (this.url = e2, this.events = new import_events6.EventEmitter(), this.registering = false, !isWsUrl(e2)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e2}`);
    this.url = e2;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async open(e2 = this.url) {
    await this.register(e2);
  }
  async close() {
    return new Promise((e2, t) => {
      if (typeof this.socket > "u") {
        t(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (n4) => {
        this.onClose(n4), e2();
      }, this.socket.close();
    });
  }
  async send(e2) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(safeJsonStringify(e2));
    } catch (t) {
      this.onError(e2.id, t);
    }
  }
  register(e2 = this.url) {
    if (!isWsUrl(e2)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e2}`);
    if (this.registering) {
      const t = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= t || this.events.listenerCount("open") >= t) && this.events.setMaxListeners(t + 1), new Promise((n4, s2) => {
        this.events.once("register_error", (o5) => {
          this.resetMaxListeners(), s2(o5);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u") return s2(new Error("WebSocket connection is missing or invalid"));
          n4(this.socket);
        });
      });
    }
    return this.url = e2, this.registering = true, new Promise((t, n4) => {
      const s2 = (0, esm_exports.isReactNative)() ? void 0 : { rejectUnauthorized: !isLocalhostUrl(e2) }, o5 = new b2(e2, [], s2);
      w3() ? o5.onerror = (i3) => {
        const a3 = i3;
        n4(this.emitError(a3.error));
      } : o5.on("error", (i3) => {
        n4(this.emitError(i3));
      }), o5.onopen = () => {
        this.onOpen(o5), t(o5);
      };
    });
  }
  onOpen(e2) {
    e2.onmessage = (t) => this.onPayload(t), e2.onclose = (t) => this.onClose(t), this.socket = e2, this.registering = false, this.events.emit("open");
  }
  onClose(e2) {
    this.socket = void 0, this.registering = false, this.events.emit("close", e2);
  }
  onPayload(e2) {
    if (typeof e2.data > "u") return;
    const t = typeof e2.data == "string" ? safeJsonParse(e2.data) : e2.data;
    this.events.emit("payload", t);
  }
  onError(e2, t) {
    const n4 = this.parseError(t), s2 = n4.message || n4.toString(), o5 = formatJsonRpcError(e2, s2);
    this.events.emit("payload", o5);
  }
  parseError(e2, t = this.url) {
    return parseConnectionError(e2, d2(t), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > h3 && this.events.setMaxListeners(h3);
  }
  emitError(e2) {
    const t = this.parseError(new Error(e2?.message || `WebSocket connection failed for host: ${d2(this.url)}`));
    return this.events.emit("register_error", t), t;
  }
};

// node_modules/es-toolkit/dist/predicate/isLength.mjs
function isLength(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

// node_modules/es-toolkit/dist/compat/predicate/isArrayLike.mjs
function isArrayLike(value) {
  return value != null && typeof value !== "function" && isLength(value.length);
}

// node_modules/es-toolkit/dist/_internal/isUnsafeProperty.mjs
function isUnsafeProperty(key) {
  return key === "__proto__";
}

// node_modules/es-toolkit/dist/predicate/isPrimitive.mjs
function isPrimitive2(value) {
  return value == null || typeof value !== "object" && typeof value !== "function";
}

// node_modules/es-toolkit/dist/_internal/isEqualsSameValueZero.mjs
function isEqualsSameValueZero(value, other) {
  return value === other || Number.isNaN(value) && Number.isNaN(other);
}

// node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function getSymbols(object) {
  return Object.getOwnPropertySymbols(object).filter((symbol) => Object.prototype.propertyIsEnumerable.call(object, symbol));
}

// node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function getTag(value) {
  if (value == null) {
    return value === void 0 ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}

// node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var regexpTag = "[object RegExp]";
var stringTag = "[object String]";
var numberTag = "[object Number]";
var booleanTag = "[object Boolean]";
var argumentsTag = "[object Arguments]";
var symbolTag = "[object Symbol]";
var dateTag = "[object Date]";
var mapTag = "[object Map]";
var setTag = "[object Set]";
var arrayTag = "[object Array]";
var functionTag = "[object Function]";
var arrayBufferTag = "[object ArrayBuffer]";
var objectTag = "[object Object]";
var errorTag = "[object Error]";
var dataViewTag = "[object DataView]";
var uint8ArrayTag = "[object Uint8Array]";
var uint8ClampedArrayTag = "[object Uint8ClampedArray]";
var uint16ArrayTag = "[object Uint16Array]";
var uint32ArrayTag = "[object Uint32Array]";
var bigUint64ArrayTag = "[object BigUint64Array]";
var int8ArrayTag = "[object Int8Array]";
var int16ArrayTag = "[object Int16Array]";
var int32ArrayTag = "[object Int32Array]";
var bigInt64ArrayTag = "[object BigInt64Array]";
var float32ArrayTag = "[object Float32Array]";
var float64ArrayTag = "[object Float64Array]";

// node_modules/es-toolkit/dist/predicate/isTypedArray.mjs
function isTypedArray(x8) {
  return ArrayBuffer.isView(x8) && !(x8 instanceof DataView);
}

// node_modules/es-toolkit/dist/object/cloneDeepWith.mjs
function cloneDeepWith(obj, cloneValue) {
  return cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), cloneValue);
}
function cloneDeepWithImpl(valueToClone, keyToClone, objectToClone, stack = /* @__PURE__ */ new Map(), cloneValue = void 0) {
  const cloned = cloneValue?.(valueToClone, keyToClone, objectToClone, stack);
  if (cloned !== void 0) {
    return cloned;
  }
  if (isPrimitive2(valueToClone)) {
    return valueToClone;
  }
  if (stack.has(valueToClone)) {
    return stack.get(valueToClone);
  }
  if (Array.isArray(valueToClone)) {
    const result = new Array(valueToClone.length);
    stack.set(valueToClone, result);
    for (let i3 = 0; i3 < valueToClone.length; i3++) {
      result[i3] = cloneDeepWithImpl(valueToClone[i3], i3, objectToClone, stack, cloneValue);
    }
    if (Object.hasOwn(valueToClone, "index")) {
      result.index = valueToClone.index;
    }
    if (Object.hasOwn(valueToClone, "input")) {
      result.input = valueToClone.input;
    }
    return result;
  }
  if (valueToClone instanceof Date) {
    return new Date(valueToClone.getTime());
  }
  if (valueToClone instanceof RegExp) {
    const result = new RegExp(valueToClone.source, valueToClone.flags);
    result.lastIndex = valueToClone.lastIndex;
    return result;
  }
  if (valueToClone instanceof Map) {
    const result = /* @__PURE__ */ new Map();
    stack.set(valueToClone, result);
    for (const [key, value] of valueToClone) {
      result.set(key, cloneDeepWithImpl(value, key, objectToClone, stack, cloneValue));
    }
    return result;
  }
  if (valueToClone instanceof Set) {
    const result = /* @__PURE__ */ new Set();
    stack.set(valueToClone, result);
    for (const value of valueToClone) {
      result.add(cloneDeepWithImpl(value, void 0, objectToClone, stack, cloneValue));
    }
    return result;
  }
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(valueToClone)) {
    return valueToClone.subarray();
  }
  if (isTypedArray(valueToClone)) {
    const result = new (Object.getPrototypeOf(valueToClone)).constructor(valueToClone.length);
    stack.set(valueToClone, result);
    for (let i3 = 0; i3 < valueToClone.length; i3++) {
      result[i3] = cloneDeepWithImpl(valueToClone[i3], i3, objectToClone, stack, cloneValue);
    }
    return result;
  }
  if (valueToClone instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && valueToClone instanceof SharedArrayBuffer) {
    return valueToClone.slice(0);
  }
  if (valueToClone instanceof DataView) {
    const result = new DataView(valueToClone.buffer.slice(0), valueToClone.byteOffset, valueToClone.byteLength);
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (typeof File !== "undefined" && valueToClone instanceof File) {
    const result = new File([valueToClone], valueToClone.name, {
      type: valueToClone.type
    });
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (typeof Blob !== "undefined" && valueToClone instanceof Blob) {
    const result = new Blob([valueToClone], { type: valueToClone.type });
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (valueToClone instanceof Error) {
    const result = new valueToClone.constructor();
    stack.set(valueToClone, result);
    result.message = valueToClone.message;
    result.name = valueToClone.name;
    result.stack = valueToClone.stack;
    result.cause = valueToClone.cause;
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (valueToClone instanceof Boolean) {
    const result = new Boolean(valueToClone.valueOf());
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (valueToClone instanceof Number) {
    const result = new Number(valueToClone.valueOf());
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (valueToClone instanceof String) {
    const result = new String(valueToClone.valueOf());
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  if (typeof valueToClone === "object" && isCloneableObject(valueToClone)) {
    const result = Object.create(Object.getPrototypeOf(valueToClone));
    stack.set(valueToClone, result);
    copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
    return result;
  }
  return valueToClone;
}
function copyProperties(target, source, objectToClone = target, stack, cloneValue) {
  const keys2 = [...Object.keys(source), ...getSymbols(source)];
  for (let i3 = 0; i3 < keys2.length; i3++) {
    const key = keys2[i3];
    const descriptor = Object.getOwnPropertyDescriptor(target, key);
    if (descriptor == null || descriptor.writable) {
      target[key] = cloneDeepWithImpl(source[key], key, objectToClone, stack, cloneValue);
    }
  }
}
function isCloneableObject(object) {
  switch (getTag(object)) {
    case argumentsTag:
    case arrayTag:
    case arrayBufferTag:
    case dataViewTag:
    case booleanTag:
    case dateTag:
    case float32ArrayTag:
    case float64ArrayTag:
    case int8ArrayTag:
    case int16ArrayTag:
    case int32ArrayTag:
    case mapTag:
    case numberTag:
    case objectTag:
    case regexpTag:
    case setTag:
    case stringTag:
    case symbolTag:
    case uint8ArrayTag:
    case uint8ClampedArrayTag:
    case uint16ArrayTag:
    case uint32ArrayTag: {
      return true;
    }
    default: {
      return false;
    }
  }
}

// node_modules/es-toolkit/dist/compat/object/cloneDeepWith.mjs
function cloneDeepWith2(obj, customizer) {
  return cloneDeepWith(obj, (value, key, object, stack) => {
    const cloned = customizer?.(value, key, object, stack);
    if (cloned !== void 0) {
      return cloned;
    }
    if (typeof obj !== "object") {
      return void 0;
    }
    if (getTag(obj) === objectTag && typeof obj.constructor !== "function") {
      const result = {};
      stack.set(obj, result);
      copyProperties(result, obj, object, stack);
      return result;
    }
    switch (Object.prototype.toString.call(obj)) {
      case numberTag:
      case stringTag:
      case booleanTag: {
        const result = new obj.constructor(obj?.valueOf());
        copyProperties(result, obj);
        return result;
      }
      case argumentsTag: {
        const result = {};
        copyProperties(result, obj);
        result.length = obj.length;
        result[Symbol.iterator] = obj[Symbol.iterator];
        return result;
      }
      default: {
        return void 0;
      }
    }
  });
}

// node_modules/es-toolkit/dist/compat/object/cloneDeep.mjs
function cloneDeep(obj) {
  return cloneDeepWith2(obj);
}

// node_modules/es-toolkit/dist/compat/predicate/isArguments.mjs
function isArguments(value) {
  return value !== null && typeof value === "object" && getTag(value) === "[object Arguments]";
}

// node_modules/es-toolkit/dist/compat/predicate/isObjectLike.mjs
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}

// node_modules/es-toolkit/dist/compat/predicate/isArrayLikeObject.mjs
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

// node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
function isPlainObject(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  const hasObjectPrototype = proto === null || proto === Object.prototype || Object.getPrototypeOf(proto) === null;
  if (!hasObjectPrototype) {
    return false;
  }
  return Object.prototype.toString.call(value) === "[object Object]";
}

// node_modules/es-toolkit/dist/predicate/isEqualWith.mjs
function isEqualWith(a3, b5, areValuesEqual) {
  return isEqualWithImpl(a3, b5, void 0, void 0, void 0, void 0, areValuesEqual);
}
function isEqualWithImpl(a3, b5, property, aParent, bParent, stack, areValuesEqual) {
  const result = areValuesEqual(a3, b5, property, aParent, bParent, stack);
  if (result !== void 0) {
    return result;
  }
  if (typeof a3 === typeof b5) {
    switch (typeof a3) {
      case "bigint":
      case "string":
      case "boolean":
      case "symbol":
      case "undefined": {
        return a3 === b5;
      }
      case "number": {
        return a3 === b5 || Object.is(a3, b5);
      }
      case "function": {
        return a3 === b5;
      }
      case "object": {
        return areObjectsEqual(a3, b5, stack, areValuesEqual);
      }
    }
  }
  return areObjectsEqual(a3, b5, stack, areValuesEqual);
}
function areObjectsEqual(a3, b5, stack, areValuesEqual) {
  if (Object.is(a3, b5)) {
    return true;
  }
  let aTag = getTag(a3);
  let bTag = getTag(b5);
  if (aTag === argumentsTag) {
    aTag = objectTag;
  }
  if (bTag === argumentsTag) {
    bTag = objectTag;
  }
  if (aTag !== bTag) {
    return false;
  }
  switch (aTag) {
    case stringTag:
      return a3.toString() === b5.toString();
    case numberTag: {
      const x8 = a3.valueOf();
      const y7 = b5.valueOf();
      return isEqualsSameValueZero(x8, y7);
    }
    case booleanTag:
    case dateTag:
    case symbolTag:
      return Object.is(a3.valueOf(), b5.valueOf());
    case regexpTag: {
      return a3.source === b5.source && a3.flags === b5.flags;
    }
    case functionTag: {
      return a3 === b5;
    }
  }
  stack = stack ?? /* @__PURE__ */ new Map();
  const aStack = stack.get(a3);
  const bStack = stack.get(b5);
  if (aStack != null && bStack != null) {
    return aStack === b5;
  }
  stack.set(a3, b5);
  stack.set(b5, a3);
  try {
    switch (aTag) {
      case mapTag: {
        if (a3.size !== b5.size) {
          return false;
        }
        for (const [key, value] of a3.entries()) {
          if (!b5.has(key) || !isEqualWithImpl(value, b5.get(key), key, a3, b5, stack, areValuesEqual)) {
            return false;
          }
        }
        return true;
      }
      case setTag: {
        if (a3.size !== b5.size) {
          return false;
        }
        const aValues = Array.from(a3.values());
        const bValues = Array.from(b5.values());
        for (let i3 = 0; i3 < aValues.length; i3++) {
          const aValue = aValues[i3];
          const index = bValues.findIndex((bValue) => {
            return isEqualWithImpl(aValue, bValue, void 0, a3, b5, stack, areValuesEqual);
          });
          if (index === -1) {
            return false;
          }
          bValues.splice(index, 1);
        }
        return true;
      }
      case arrayTag:
      case uint8ArrayTag:
      case uint8ClampedArrayTag:
      case uint16ArrayTag:
      case uint32ArrayTag:
      case bigUint64ArrayTag:
      case int8ArrayTag:
      case int16ArrayTag:
      case int32ArrayTag:
      case bigInt64ArrayTag:
      case float32ArrayTag:
      case float64ArrayTag: {
        if (typeof Buffer !== "undefined" && Buffer.isBuffer(a3) !== Buffer.isBuffer(b5)) {
          return false;
        }
        if (a3.length !== b5.length) {
          return false;
        }
        for (let i3 = 0; i3 < a3.length; i3++) {
          if (!isEqualWithImpl(a3[i3], b5[i3], i3, a3, b5, stack, areValuesEqual)) {
            return false;
          }
        }
        return true;
      }
      case arrayBufferTag: {
        if (a3.byteLength !== b5.byteLength) {
          return false;
        }
        return areObjectsEqual(new Uint8Array(a3), new Uint8Array(b5), stack, areValuesEqual);
      }
      case dataViewTag: {
        if (a3.byteLength !== b5.byteLength || a3.byteOffset !== b5.byteOffset) {
          return false;
        }
        return areObjectsEqual(new Uint8Array(a3), new Uint8Array(b5), stack, areValuesEqual);
      }
      case errorTag: {
        return a3.name === b5.name && a3.message === b5.message;
      }
      case objectTag: {
        const areEqualInstances = areObjectsEqual(a3.constructor, b5.constructor, stack, areValuesEqual) || isPlainObject(a3) && isPlainObject(b5);
        if (!areEqualInstances) {
          return false;
        }
        const aKeys = [...Object.keys(a3), ...getSymbols(a3)];
        const bKeys = [...Object.keys(b5), ...getSymbols(b5)];
        if (aKeys.length !== bKeys.length) {
          return false;
        }
        for (let i3 = 0; i3 < aKeys.length; i3++) {
          const propKey = aKeys[i3];
          const aProp = a3[propKey];
          if (!Object.hasOwn(b5, propKey)) {
            return false;
          }
          const bProp = b5[propKey];
          if (!isEqualWithImpl(aProp, bProp, propKey, a3, b5, stack, areValuesEqual)) {
            return false;
          }
        }
        return true;
      }
      default: {
        return false;
      }
    }
  } finally {
    stack.delete(a3);
    stack.delete(b5);
  }
}

// node_modules/es-toolkit/dist/function/noop.mjs
function noop() {
}

// node_modules/es-toolkit/dist/predicate/isEqual.mjs
function isEqual2(a3, b5) {
  return isEqualWith(a3, b5, noop);
}

// node_modules/es-toolkit/dist/compat/predicate/isTypedArray.mjs
function isTypedArray2(x8) {
  return isTypedArray(x8);
}

// node_modules/es-toolkit/dist/compat/predicate/isPlainObject.mjs
function isPlainObject2(object) {
  if (typeof object !== "object") {
    return false;
  }
  if (object == null) {
    return false;
  }
  if (Object.getPrototypeOf(object) === null) {
    return true;
  }
  if (Object.prototype.toString.call(object) !== "[object Object]") {
    const tag = object[Symbol.toStringTag];
    if (tag == null) {
      return false;
    }
    const isTagReadonly = !Object.getOwnPropertyDescriptor(object, Symbol.toStringTag)?.writable;
    if (isTagReadonly) {
      return false;
    }
    return object.toString() === `[object ${tag}]`;
  }
  let proto = object;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(object) === proto;
}

// node_modules/es-toolkit/dist/object/clone.mjs
function clone(obj) {
  if (isPrimitive2(obj)) {
    return obj;
  }
  if (Array.isArray(obj) || isTypedArray(obj) || obj instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && obj instanceof SharedArrayBuffer) {
    return obj.slice(0);
  }
  const prototype = Object.getPrototypeOf(obj);
  if (prototype == null) {
    return Object.assign(Object.create(prototype), obj);
  }
  const Constructor = prototype.constructor;
  if (obj instanceof Date || obj instanceof Map || obj instanceof Set) {
    return new Constructor(obj);
  }
  if (obj instanceof RegExp) {
    const newRegExp = new Constructor(obj);
    newRegExp.lastIndex = obj.lastIndex;
    return newRegExp;
  }
  if (obj instanceof DataView) {
    return new Constructor(obj.buffer.slice(0));
  }
  if (obj instanceof Error) {
    let newError;
    if (obj instanceof AggregateError) {
      newError = new Constructor(obj.errors, obj.message, { cause: obj.cause });
    } else {
      newError = new Constructor(obj.message, { cause: obj.cause });
    }
    newError.stack = obj.stack;
    Object.assign(newError, obj);
    return newError;
  }
  if (typeof File !== "undefined" && obj instanceof File) {
    const newFile = new Constructor([obj], obj.name, { type: obj.type, lastModified: obj.lastModified });
    return newFile;
  }
  if (typeof obj === "object") {
    const newObject = Object.create(prototype);
    return Object.assign(newObject, obj);
  }
  return obj;
}

// node_modules/es-toolkit/dist/compat/object/mergeWith.mjs
function mergeWith(object, ...otherArgs) {
  const sources = otherArgs.slice(0, -1);
  const merge2 = otherArgs[otherArgs.length - 1];
  let result = object;
  for (let i3 = 0; i3 < sources.length; i3++) {
    const source = sources[i3];
    result = mergeWithDeep(result, source, merge2, /* @__PURE__ */ new Map());
  }
  return result;
}
function mergeWithDeep(target, source, merge2, stack) {
  if (isPrimitive2(target)) {
    target = Object(target);
  }
  if (source == null || typeof source !== "object") {
    return target;
  }
  if (stack.has(source)) {
    return clone(stack.get(source));
  }
  stack.set(source, target);
  if (Array.isArray(source)) {
    source = source.slice();
    for (let i3 = 0; i3 < source.length; i3++) {
      source[i3] = source[i3] ?? void 0;
    }
  }
  const sourceKeys = [...Object.keys(source), ...getSymbols(source)];
  for (let i3 = 0; i3 < sourceKeys.length; i3++) {
    const key = sourceKeys[i3];
    if (isUnsafeProperty(key)) {
      continue;
    }
    let sourceValue = source[key];
    let targetValue = target[key];
    if (isArguments(sourceValue)) {
      sourceValue = { ...sourceValue };
    }
    if (isArguments(targetValue)) {
      targetValue = { ...targetValue };
    }
    if (typeof Buffer !== "undefined" && Buffer.isBuffer(sourceValue)) {
      sourceValue = cloneDeep(sourceValue);
    }
    if (Array.isArray(sourceValue)) {
      if (Array.isArray(targetValue)) {
        const cloned = [];
        const targetKeys = Reflect.ownKeys(targetValue);
        for (let i4 = 0; i4 < targetKeys.length; i4++) {
          const targetKey = targetKeys[i4];
          cloned[targetKey] = targetValue[targetKey];
        }
        targetValue = cloned;
      } else if (isArrayLikeObject(targetValue)) {
        const cloned = [];
        for (let i4 = 0; i4 < targetValue.length; i4++) {
          cloned[i4] = targetValue[i4];
        }
        targetValue = cloned;
      } else {
        targetValue = [];
      }
    }
    const merged = merge2(targetValue, sourceValue, key, target, source, stack);
    if (merged !== void 0) {
      target[key] = merged;
    } else if (Array.isArray(sourceValue)) {
      target[key] = mergeWithDeep(targetValue, sourceValue, merge2, stack);
    } else if (isObjectLike(targetValue) && isObjectLike(sourceValue) && (isPlainObject2(targetValue) || isPlainObject2(sourceValue) || isTypedArray2(targetValue) || isTypedArray2(sourceValue))) {
      target[key] = mergeWithDeep(targetValue, sourceValue, merge2, stack);
    } else if (targetValue == null && isPlainObject2(sourceValue)) {
      target[key] = mergeWithDeep({}, sourceValue, merge2, stack);
    } else if (targetValue == null && isTypedArray2(sourceValue)) {
      target[key] = cloneDeep(sourceValue);
    } else if (targetValue === void 0 || sourceValue !== void 0) {
      target[key] = sourceValue;
    }
  }
  return target;
}

// node_modules/es-toolkit/dist/compat/object/merge.mjs
function merge(object, ...sources) {
  return mergeWith(object, ...sources, noop);
}

// node_modules/@walletconnect/core/dist/index.js
var import_window_getters2 = __toESM(require_cjs2(), 1);
var ct3 = "wc";
var lt3 = 2;
var W4 = "core";
var S3 = `${ct3}@2:${W4}:`;
var Dt3 = { name: W4, logger: "error" };
var zt3 = { database: ":memory:" };
var Kt3 = "crypto";
var gt2 = "client_ed25519_seed";
var Mt3 = import_time4.ONE_DAY;
var $t3 = "keychain";
var Ut3 = "0.3";
var qt3 = "messages";
var Vt3 = "0.3";
var Bt3 = import_time4.SIX_HOURS;
var Ft3 = "publisher";
var Gt3 = "irn";
var Wt3 = "error";
var pt2 = "wss://relay.walletconnect.org";
var Ht3 = "relayer";
var p3 = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" };
var Yt3 = "_subscription";
var v5 = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" };
var Jt3 = 0.1;
var Q3 = "2.23.9";
var D3 = { link_mode: "link_mode", relay: "relay" };
var H4 = { inbound: "inbound", outbound: "outbound" };
var jt3 = "0.3";
var Xt3 = "WALLETCONNECT_CLIENT_ID";
var dt3 = "WALLETCONNECT_LINK_MODE_APPS";
var b3 = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" };
var Zt3 = "subscription";
var Qt3 = "0.3";
var Mi = import_time4.FIVE_SECONDS * 1e3;
var te4 = "pairing";
var ee3 = "0.3";
var U2 = { wc_pairingDelete: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 0 } } };
var q3 = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" };
var T3 = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" };
var ie3 = "history";
var se3 = "0.3";
var re3 = "expirer";
var P4 = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" };
var oe3 = "0.3";
var ne3 = "verify-api";
var qi = "https://verify.walletconnect.com";
var ae3 = "https://verify.walletconnect.org";
var Y3 = ae3;
var he4 = `${Y3}/v3`;
var ce2 = [qi, ae3];
var le3 = "echo";
var ge4 = "https://echo.walletconnect.com";
var x6 = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" };
var O3 = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" };
var Bi = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success", session_request_response_started: "session_request_response_started", session_request_response_validation_success: "session_request_response_validation_success", session_request_response_publish_started: "session_request_response_publish_started" };
var Fi = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found", session_request_response_validation_failure: "session_request_response_validation_failure", session_request_response_publish_failure: "session_request_response_publish_failure" };
var Gi = { authenticated_session_approve_started: "authenticated_session_approve_started", authenticated_session_not_expired: "authenticated_session_not_expired", chains_caip2_compliant: "chains_caip2_compliant", chains_evm_compliant: "chains_evm_compliant", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve", authenticated_session_approve_publish_success: "authenticated_session_approve_publish_success" };
var Wi = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", missing_session_authenticate_request: "missing_session_authenticate_request", session_authenticate_request_expired: "session_authenticate_request_expired", chains_caip2_compliant_failure: "chains_caip2_compliant_failure", chains_evm_compliant_failure: "chains_evm_compliant_failure", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" };
var pe4 = 0.1;
var de3 = "event-client";
var ue2 = 86400;
var ye4 = "https://pulse.walletconnect.org/batch";
var me3 = class {
  constructor(t, s2) {
    this.core = t, this.logger = s2, this.keychain = /* @__PURE__ */ new Map(), this.name = $t3, this.version = Ut3, this.initialized = false, this.storagePrefix = S3, this.init = async () => {
      if (!this.initialized) {
        const i3 = await this.getKeyChain();
        typeof i3 < "u" && (this.keychain = i3), this.initialized = true;
      }
    }, this.has = (i3) => (this.isInitialized(), this.keychain.has(i3)), this.set = async (i3, e2) => {
      this.isInitialized(), this.keychain.set(i3, e2), await this.persist();
    }, this.get = (i3) => {
      this.isInitialized();
      const e2 = this.keychain.get(i3);
      if (typeof e2 > "u") {
        const { message: r3 } = N10("NO_MATCHING_KEY", `${this.name}: ${i3}`);
        throw new Error(r3);
      }
      return e2;
    }, this.del = async (i3) => {
      this.isInitialized(), this.keychain.delete(i3), await this.persist();
    }, this.core = t, this.logger = Re(s2, this.name);
  }
  get context() {
    return ee(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(t) {
    await this.core.storage.setItem(this.storageKey, xn2(t));
  }
  async getKeyChain() {
    const t = await this.core.storage.getItem(this.storageKey);
    return typeof t < "u" ? kn2(t) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = N10("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
};
var _e3 = class {
  constructor(t, s2, i3) {
    this.core = t, this.logger = s2, this.name = Kt3, this.randomSessionIdentifier = Nr2(), this.initialized = false, this.init = async () => {
      this.initialized || (await this.keychain.init(), this.initialized = true);
    }, this.hasKeys = (e2) => (this.isInitialized(), this.keychain.has(e2)), this.getClientId = async () => {
      if (this.isInitialized(), this.clientId) return this.clientId;
      const e2 = await this.getClientSeed(), r3 = Po(e2), o5 = Qe(r3.publicKey);
      return this.clientId = o5, o5;
    }, this.generateKeyPair = () => {
      this.isInitialized();
      const e2 = wr2();
      return this.setPrivateKey(e2.publicKey, e2.privateKey);
    }, this.signJWT = async (e2) => {
      this.isInitialized();
      const r3 = await this.getClientSeed(), o5 = Po(r3), n4 = this.randomSessionIdentifier, a3 = Mt3;
      return await Qo(n4, e2, a3, o5);
    }, this.generateSharedKey = (e2, r3, o5) => {
      this.isInitialized();
      const n4 = this.getPrivateKey(e2), a3 = vr2(n4, r3);
      return this.setSymKey(a3, o5);
    }, this.setSymKey = async (e2, r3) => {
      this.isInitialized();
      const o5 = r3 || Sr2(e2);
      return await this.keychain.set(o5, e2), o5;
    }, this.deleteKeyPair = async (e2) => {
      this.isInitialized(), await this.keychain.del(e2);
    }, this.deleteSymKey = async (e2) => {
      this.isInitialized(), await this.keychain.del(e2);
    }, this.encode = async (e2, r3, o5) => {
      this.isInitialized();
      const n4 = At(o5), a3 = safeJsonStringify(r3);
      if (jr2(n4)) return Tr2(a3, o5?.encoding);
      if ($r2(n4)) {
        const g5 = n4.senderPublicKey, _3 = n4.receiverPublicKey;
        e2 = await this.generateSharedKey(g5, _3);
      }
      const h4 = this.getSymKey(e2), { type: d5, senderPublicKey: l5 } = n4;
      return Ar2({ type: d5, symKey: h4, message: a3, senderPublicKey: l5, encoding: o5?.encoding });
    }, this.decode = async (e2, r3, o5) => {
      this.isInitialized();
      const n4 = Ur2(r3, o5);
      if (jr2(n4)) {
        const a3 = Rr2(r3, o5?.encoding);
        return safeJsonParse(a3);
      }
      if ($r2(n4)) {
        const a3 = n4.receiverPublicKey, h4 = n4.senderPublicKey;
        e2 = await this.generateSharedKey(a3, h4);
      }
      try {
        const a3 = this.getSymKey(e2), h4 = Ir2({ symKey: a3, encoded: r3, encoding: o5?.encoding });
        return safeJsonParse(h4);
      } catch (a3) {
        this.logger.error(`Failed to decode message from topic: '${e2}', clientId: '${await this.getClientId()}'`), this.logger.error(a3);
      }
    }, this.getPayloadType = (e2, r3 = S2) => {
      const o5 = ne2({ encoded: e2, encoding: r3 });
      return C3(o5.type);
    }, this.getPayloadSenderPublicKey = (e2, r3 = S2) => {
      const o5 = ne2({ encoded: e2, encoding: r3 });
      return o5.senderPublicKey ? toString2(o5.senderPublicKey, y4) : void 0;
    }, this.core = t, this.logger = Re(s2, this.name), this.keychain = i3 || new me3(this.core, this.logger);
  }
  get context() {
    return ee(this.logger);
  }
  async setPrivateKey(t, s2) {
    return await this.keychain.set(t, s2), t;
  }
  getPrivateKey(t) {
    return this.keychain.get(t);
  }
  async getClientSeed() {
    let t = "";
    try {
      t = this.keychain.get(gt2);
    } catch {
      t = Nr2(), await this.keychain.set(gt2, t);
    }
    return fromString2(t, "base16");
  }
  getSymKey(t) {
    return this.keychain.get(t);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = N10("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
};
var be4 = class extends a2 {
  constructor(t, s2) {
    super(t, s2), this.logger = t, this.core = s2, this.messages = /* @__PURE__ */ new Map(), this.messagesWithoutClientAck = /* @__PURE__ */ new Map(), this.name = qt3, this.version = Vt3, this.initialized = false, this.storagePrefix = S3, this.init = async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const i3 = await this.getRelayerMessages();
          typeof i3 < "u" && (this.messages = i3);
          const e2 = await this.getRelayerMessagesWithoutClientAck();
          typeof e2 < "u" && (this.messagesWithoutClientAck = e2), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (i3) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i3);
        } finally {
          this.initialized = true;
        }
      }
    }, this.set = async (i3, e2, r3) => {
      this.isInitialized();
      const o5 = Or2(e2);
      let n4 = this.messages.get(i3);
      if (typeof n4 > "u" && (n4 = {}), typeof n4[o5] < "u") return o5;
      if (n4[o5] = e2, this.messages.set(i3, n4), r3 === H4.inbound) {
        const a3 = this.messagesWithoutClientAck.get(i3) || {};
        this.messagesWithoutClientAck.set(i3, { ...a3, [o5]: e2 });
      }
      return await this.persist(), o5;
    }, this.get = (i3) => {
      this.isInitialized();
      let e2 = this.messages.get(i3);
      return typeof e2 > "u" && (e2 = {}), e2;
    }, this.getWithoutAck = (i3) => {
      this.isInitialized();
      const e2 = {};
      for (const r3 of i3) {
        const o5 = this.messagesWithoutClientAck.get(r3) || {};
        e2[r3] = Object.values(o5);
      }
      return e2;
    }, this.has = (i3, e2) => {
      this.isInitialized();
      const r3 = this.get(i3), o5 = Or2(e2);
      return typeof r3[o5] < "u";
    }, this.ack = async (i3, e2) => {
      this.isInitialized();
      const r3 = this.messagesWithoutClientAck.get(i3);
      if (typeof r3 > "u") return;
      const o5 = Or2(e2);
      delete r3[o5], Object.keys(r3).length === 0 ? this.messagesWithoutClientAck.delete(i3) : this.messagesWithoutClientAck.set(i3, r3), await this.persist();
    }, this.del = async (i3) => {
      this.isInitialized(), this.messages.delete(i3), this.messagesWithoutClientAck.delete(i3), await this.persist();
    }, this.logger = Re(t, this.name), this.core = s2;
  }
  get context() {
    return ee(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get storageKeyWithoutClientAck() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
  }
  async setRelayerMessages(t) {
    await this.core.storage.setItem(this.storageKey, xn2(t));
  }
  async setRelayerMessagesWithoutClientAck(t) {
    await this.core.storage.setItem(this.storageKeyWithoutClientAck, xn2(t));
  }
  async getRelayerMessages() {
    const t = await this.core.storage.getItem(this.storageKey);
    return typeof t < "u" ? kn2(t) : void 0;
  }
  async getRelayerMessagesWithoutClientAck() {
    const t = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
    return typeof t < "u" ? kn2(t) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages), await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = N10("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
};
var Hi = class extends g {
  constructor(t, s2) {
    super(t, s2), this.relayer = t, this.logger = s2, this.events = new import_events7.EventEmitter(), this.name = Ft3, this.queue = /* @__PURE__ */ new Map(), this.publishTimeout = (0, import_time4.toMiliseconds)(import_time4.ONE_MINUTE), this.initialPublishTimeout = (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 15), this.needsTransportRestart = false, this.publish = async (i3, e2, r3) => {
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i3, message: e2, opts: r3 } });
      const o5 = r3?.ttl || Bt3, n4 = r3?.prompt || false, a3 = r3?.tag || 0, h4 = r3?.id || getBigIntRpcId().toString(), d5 = xr2(Pr2().protocol), l5 = { id: h4, method: r3?.publishMethod || d5.publish, params: { topic: i3, message: e2, ttl: o5, prompt: n4, tag: a3, attestation: r3?.attestation, ...r3?.tvf } }, g5 = `Failed to publish payload, please try again. id:${h4} tag:${a3}`;
      try {
        R2(l5.params?.prompt) && delete l5.params?.prompt, R2(l5.params?.tag) && delete l5.params?.tag;
        const _3 = new Promise(async (E6) => {
          const u3 = ({ id: m3 }) => {
            l5.id?.toString() === m3.toString() && (this.removeRequestFromQueue(m3), this.relayer.events.removeListener(p3.publish, u3), E6());
          };
          this.relayer.events.on(p3.publish, u3);
          const N11 = Ln2(new Promise((m3, C4) => {
            this.rpcPublish(l5, r3).then(m3).catch((k6) => {
              this.logger.warn(k6, k6?.message), C4(k6);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${h4} tag:${a3}`);
          try {
            await N11, this.events.removeListener(p3.publish, u3);
          } catch (m3) {
            this.queue.set(h4, { request: l5, opts: r3, attempt: 1 }), this.logger.warn(m3, m3?.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: h4, topic: i3, message: e2, opts: r3 } }), await Ln2(_3, this.publishTimeout, g5);
      } catch (_3) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(_3), r3?.internal?.throwOnFailedPublish) throw _3;
      } finally {
        this.queue.delete(h4);
      }
    }, this.publishCustom = async (i3) => {
      this.logger.debug("Publishing custom payload"), this.logger.trace({ type: "method", method: "publishCustom", params: i3 });
      const { payload: e2, opts: r3 = {} } = i3, { attestation: o5, tvf: n4, publishMethod: a3, prompt: h4, tag: d5, ttl: l5 = import_time4.FIVE_MINUTES } = r3, g5 = r3.id || getBigIntRpcId().toString(), _3 = xr2(Pr2().protocol), E6 = a3 || _3.publish, u3 = { id: g5, method: E6, params: { ...e2, ttl: l5, prompt: h4, tag: d5, attestation: o5, ...n4 } }, N11 = `Failed to publish custom payload, please try again. id:${g5} tag:${d5}`;
      try {
        R2(u3.params?.prompt) && delete u3.params?.prompt, R2(u3.params?.tag) && delete u3.params?.tag;
        const m3 = new Promise(async (C4) => {
          const k6 = ({ id: L3 }) => {
            u3.id?.toString() === L3.toString() && (this.removeRequestFromQueue(L3), this.relayer.events.removeListener(p3.publish, k6), C4());
          };
          this.relayer.events.on(p3.publish, k6);
          const Oe4 = Ln2(new Promise((L3, Ae5) => {
            this.rpcPublish(u3, r3).then(L3).catch((tt3) => {
              this.logger.warn(tt3, tt3?.message), Ae5(tt3);
            });
          }), this.initialPublishTimeout, `Failed initial custom payload publish, retrying.... method:${E6} id:${g5} tag:${d5}`);
          try {
            await Oe4, this.events.removeListener(p3.publish, k6);
          } catch (L3) {
            this.queue.set(g5, { request: u3, opts: r3, attempt: 1 }), this.logger.warn(L3, L3?.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: g5, payload: e2, opts: r3 } }), await Ln2(m3, this.publishTimeout, N11);
      } catch (m3) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(m3), r3?.internal?.throwOnFailedPublish) throw m3;
      } finally {
        this.queue.delete(g5);
      }
    }, this.on = (i3, e2) => {
      this.events.on(i3, e2);
    }, this.once = (i3, e2) => {
      this.events.once(i3, e2);
    }, this.off = (i3, e2) => {
      this.events.off(i3, e2);
    }, this.removeListener = (i3, e2) => {
      this.events.removeListener(i3, e2);
    }, this.relayer = t, this.logger = Re(s2, this.name), this.registerEventListeners();
  }
  get context() {
    return ee(this.logger);
  }
  async rpcPublish(t, s2) {
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: t });
    const i3 = await this.relayer.request(t);
    return this.relayer.events.emit(p3.publish, { ...t, ...s2 }), this.logger.debug("Successfully Published Payload"), i3;
  }
  removeRequestFromQueue(t) {
    this.queue.delete(t);
  }
  checkQueue() {
    this.queue.forEach(async (t, s2) => {
      const i3 = t.attempt + 1;
      this.queue.set(s2, { ...t, attempt: i3 }), this.logger.warn({}, `Publisher: queue->publishing: ${t.request.id}, tag: ${t.request.params?.tag}, attempt: ${i3}`), await this.rpcPublish(t.request, t.opts), this.logger.warn({}, `Publisher: queue->published: ${t.request.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(r.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = false, this.relayer.events.emit(p3.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(p3.message_ack, (t) => {
      this.removeRequestFromQueue(t.id.toString());
    });
  }
};
var Yi = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map(), this.set = (t, s2) => {
      const i3 = this.get(t);
      this.exists(t, s2) || this.map.set(t, [...i3, s2]);
    }, this.get = (t) => this.map.get(t) || [], this.exists = (t, s2) => this.get(t).includes(s2), this.delete = (t, s2) => {
      if (typeof s2 > "u") {
        this.map.delete(t);
        return;
      }
      if (!this.map.has(t)) return;
      const i3 = this.get(t);
      if (!this.exists(t, s2)) return;
      const e2 = i3.filter((r3) => r3 !== s2);
      if (!e2.length) {
        this.map.delete(t);
        return;
      }
      this.map.set(t, e2);
    }, this.clear = () => {
      this.map.clear();
    };
  }
  get topics() {
    return Array.from(this.map.keys());
  }
};
var we4 = class extends d {
  constructor(t, s2) {
    super(t, s2), this.relayer = t, this.logger = s2, this.subscriptions = /* @__PURE__ */ new Map(), this.topicMap = new Yi(), this.events = new import_events7.EventEmitter(), this.name = Zt3, this.version = Qt3, this.pending = /* @__PURE__ */ new Map(), this.cached = [], this.initialized = false, this.storagePrefix = S3, this.subscribeTimeout = (0, import_time4.toMiliseconds)(import_time4.ONE_MINUTE), this.initialSubscribeTimeout = (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 15), this.batchSubscribeTopicsLimit = 500, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = true;
    }, this.subscribe = async (i3, e2) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i3, opts: e2 } });
      try {
        const r3 = Pr2(e2), o5 = { topic: i3, relay: r3, transportType: e2?.transportType };
        e2?.internal?.skipSubscribe || this.pending.set(i3, o5);
        const n4 = await this.rpcSubscribe(i3, r3, e2);
        return typeof n4 == "string" && (this.onSubscribe(n4, o5), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i3, opts: e2 } })), n4;
      } catch (r3) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(r3), r3;
      }
    }, this.unsubscribe = async (i3, e2) => {
      this.isInitialized(), typeof e2?.id < "u" ? await this.unsubscribeById(i3, e2.id, e2) : await this.unsubscribeByTopic(i3, e2);
    }, this.isSubscribed = (i3) => new Promise((e2) => {
      e2(this.topicMap.topics.includes(i3));
    }), this.isKnownTopic = (i3) => new Promise((e2) => {
      e2(this.topicMap.topics.includes(i3) || this.pending.has(i3) || this.cached.some((r3) => r3.topic === i3));
    }), this.on = (i3, e2) => {
      this.events.on(i3, e2);
    }, this.once = (i3, e2) => {
      this.events.once(i3, e2);
    }, this.off = (i3, e2) => {
      this.events.off(i3, e2);
    }, this.removeListener = (i3, e2) => {
      this.events.removeListener(i3, e2);
    }, this.start = async () => {
      await this.onConnect();
    }, this.stop = async () => {
      await this.onDisconnect();
    }, this.restart = async () => {
      await this.restore(), await this.onRestart();
    }, this.checkPending = async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
      const i3 = [];
      this.pending.forEach((e2) => {
        i3.push(e2);
      }), await this.batchSubscribe(i3);
    }, this.registerEventListeners = () => {
      this.relayer.core.heartbeat.on(r.pulse, async () => {
        await this.checkPending();
      }), this.events.on(b3.created, async (i3) => {
        const e2 = b3.created;
        this.logger.info(`Emitting ${e2}`), this.logger.debug({ type: "event", event: e2, data: i3 }), await this.persist();
      }), this.events.on(b3.deleted, async (i3) => {
        const e2 = b3.deleted;
        this.logger.info(`Emitting ${e2}`), this.logger.debug({ type: "event", event: e2, data: i3 }), await this.persist();
      });
    }, this.relayer = t, this.logger = Re(s2, this.name), this.clientId = "";
  }
  get context() {
    return ee(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  get hasAnyTopics() {
    return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
  }
  hasSubscription(t, s2) {
    let i3 = false;
    try {
      i3 = this.getSubscription(t).topic === s2;
    } catch {
    }
    return i3;
  }
  reset() {
    this.cached = [], this.initialized = true;
  }
  onDisable() {
    this.values.length > 0 && (this.cached = this.values), this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(t, s2) {
    const i3 = this.topicMap.get(t);
    await Promise.all(i3.map(async (e2) => await this.unsubscribeById(t, e2, s2)));
  }
  async unsubscribeById(t, s2, i3) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: t, id: s2, opts: i3 } });
    try {
      const e2 = $2("USER_DISCONNECTED", `${this.name}, ${t}`);
      await this.onUnsubscribe(t, s2, e2);
      const r3 = Pr2(i3);
      await this.restartToComplete({ topic: t, id: s2, relay: r3 }), await this.rpcUnsubscribe(t, s2, r3), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: t, id: s2, opts: i3 } });
    } catch (e2) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(e2), e2;
    }
  }
  async rpcSubscribe(t, s2, i3) {
    const e2 = await this.getSubscriptionId(t);
    if (i3?.internal?.skipSubscribe) return e2;
    (!i3 || i3?.transportType === D3.relay) && await this.restartToComplete({ topic: t, id: t, relay: s2 });
    const r3 = { method: xr2(s2.protocol).subscribe, params: { topic: t } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: r3 });
    const o5 = i3?.internal?.throwOnFailedPublish;
    try {
      if (i3?.transportType === D3.link_mode) return setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(r3).catch((h4) => this.logger.warn(h4));
      }, (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND)), e2;
      const n4 = new Promise(async (h4) => {
        const d5 = (l5) => {
          l5.topic === t && (this.events.removeListener(b3.created, d5), h4(l5.id));
        };
        this.events.on(b3.created, d5);
        try {
          const l5 = await Ln2(new Promise((g5, _3) => {
            this.relayer.request(r3).catch((E6) => {
              this.logger.warn(E6, E6?.message), _3(E6);
            }).then(g5);
          }), this.initialSubscribeTimeout, `Subscribing to ${t} failed, please try again`);
          this.events.removeListener(b3.created, d5), h4(l5);
        } catch {
        }
      }), a3 = await Ln2(n4, this.subscribeTimeout, `Subscribing to ${t} failed, please try again`);
      if (!a3 && o5) throw new Error(`Subscribing to ${t} failed, please try again`);
      return a3 ? e2 : null;
    } catch (n4) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(p3.connection_stalled), o5) throw n4;
    }
    return null;
  }
  async rpcBatchSubscribe(t) {
    if (!t.length) return true;
    const s2 = t[0].relay, i3 = { method: xr2(s2.protocol).batchSubscribe, params: { topics: t.map((e2) => e2.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i3 });
    try {
      return await Ln2(new Promise((e2, r3) => {
        this.relayer.request(i3).then(e2).catch((o5) => {
          this.logger.warn(o5), r3(o5);
        });
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again"), true;
    } catch {
      return this.relayer.events.emit(p3.connection_stalled), false;
    }
  }
  async rpcBatchFetchMessages(t) {
    if (!t.length) return;
    const s2 = t[0].relay, i3 = { method: xr2(s2.protocol).batchFetchMessages, params: { topics: t.map((r3) => r3.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i3 });
    let e2;
    try {
      e2 = await await Ln2(new Promise((r3, o5) => {
        this.relayer.request(i3).catch((n4) => {
          this.logger.warn(n4), o5(n4);
        }).then(r3);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(p3.connection_stalled);
    }
    return e2;
  }
  rpcUnsubscribe(t, s2, i3) {
    const e2 = { method: xr2(i3.protocol).unsubscribe, params: { topic: t, id: s2 } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: e2 }), this.relayer.request(e2);
  }
  onSubscribe(t, s2) {
    this.setSubscription(t, { ...s2, id: t }), this.pending.delete(s2.topic);
  }
  onBatchSubscribe(t) {
    t.length && t.forEach((s2) => {
      this.setSubscription(s2.id, { ...s2 }), this.pending.delete(s2.topic);
    });
  }
  async onUnsubscribe(t, s2, i3) {
    this.events.removeAllListeners(s2), this.hasSubscription(s2, t) && this.deleteSubscription(s2, i3), await this.relayer.messages.del(t);
  }
  async setRelayerSubscriptions(t) {
    await this.relayer.core.storage.setItem(this.storageKey, t);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(t, s2) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: t, subscription: s2 }), this.addSubscription(t, s2);
  }
  addSubscription(t, s2) {
    this.subscriptions.set(t, { ...s2 }), this.topicMap.set(s2.topic, t), this.events.emit(b3.created, s2);
  }
  getSubscription(t) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: t });
    const s2 = this.subscriptions.get(t);
    if (!s2) {
      const { message: i3 } = N10("NO_MATCHING_KEY", `${this.name}: ${t}`);
      throw new Error(i3);
    }
    return s2;
  }
  deleteSubscription(t, s2) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: t, reason: s2 });
    const i3 = this.getSubscription(t);
    this.subscriptions.delete(t), this.topicMap.delete(i3.topic, t), this.events.emit(b3.deleted, { ...i3, reason: s2 });
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(b3.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const t = [...this.cached], s2 = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let i3 = 0; i3 < s2; i3++) {
        const e2 = t.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(e2);
      }
    }
    this.events.emit(b3.resubscribed);
  }
  async restore() {
    try {
      const t = await this.getRelayerSubscriptions();
      if (typeof t > "u" || !t.length) return;
      if (this.subscriptions.size && !t.every((s2) => s2.topic === this.subscriptions.get(s2.id)?.topic)) {
        const { message: s2 } = N10("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(s2), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(s2);
      }
      this.cached = t, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (t) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(t);
    }
  }
  async batchSubscribe(t) {
    if (t.length) {
      if (!await this.rpcBatchSubscribe(t)) {
        this.logger.warn(`Batch subscribe failed for ${t.length} topics, adding to pending for retry`), t.forEach((s2) => {
          this.pending.set(s2.topic, s2);
        });
        return;
      }
      this.onBatchSubscribe(await Promise.all(t.map(async (s2) => ({ ...s2, id: await this.getSubscriptionId(s2.topic) }))));
    }
  }
  async batchFetchMessages(t) {
    if (!t.length) return;
    this.logger.trace(`Fetching batch messages for ${t.length} subscriptions`);
    const s2 = await this.rpcBatchFetchMessages(t);
    s2 && s2.messages && (await Xn2((0, import_time4.toMiliseconds)(import_time4.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(s2.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = N10("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
  async restartToComplete(t) {
    !this.relayer.connected && !this.relayer.connecting && (this.cached.push(t), await this.relayer.transportOpen());
  }
  async getClientId() {
    return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()), this.clientId;
  }
  async getSubscriptionId(t) {
    return Or2(t + await this.getClientId());
  }
};
var fe4 = class extends u {
  constructor(t) {
    super(t), this.protocol = "wc", this.version = 2, this.events = new import_events7.EventEmitter(), this.name = Ht3, this.transportExplicitlyClosed = false, this.initialized = false, this.connectionAttemptInProgress = false, this.hasExperiencedNetworkDisruption = false, this.heartBeatTimeout = (0, import_time4.toMiliseconds)(import_time4.THIRTY_SECONDS + import_time4.FIVE_SECONDS), this.reconnectInProgress = false, this.requestsInFlight = [], this.connectTimeout = (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 15), this.stalledRestartInProgress = false, this.stalledRestartBackoff = 0, this.stalledRestartBaseInterval = (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 2), this.stalledRestartMaxInterval = (0, import_time4.toMiliseconds)(import_time4.THIRTY_SECONDS), this.request = async (s2) => {
      this.logger.debug("Publishing Request Payload");
      const i3 = s2.id || getBigIntRpcId().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: i3, method: s2.method, topic: s2.params?.topic }, "relayer.request - publishing...");
        const e2 = `${i3}:${s2.params?.tag || ""}`;
        this.requestsInFlight.push(e2);
        const r3 = await this.provider.request(s2);
        return this.requestsInFlight = this.requestsInFlight.filter((o5) => o5 !== e2), r3;
      } catch (e2) {
        throw this.logger.debug(`Failed to Publish Request: ${i3}`), e2;
      }
    }, this.resetPingTimeout = () => {
      fe3() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
        try {
          this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), this.provider?.connection?.socket?.terminate?.();
        } catch (s2) {
          this.logger.warn(s2, s2?.message);
        }
      }, this.heartBeatTimeout));
    }, this.onPayloadHandler = (s2) => {
      this.onProviderPayload(s2), this.resetPingTimeout();
    }, this.onConnectHandler = () => {
      this.logger.warn({}, "Relayer connected \u{1F6DC}"), this.startPingTimeout(), this.stalledRestartBackoff = 0, this.events.emit(p3.connect);
    }, this.onDisconnectHandler = () => {
      this.logger.warn({}, "Relayer disconnected \u{1F6D1}"), this.requestsInFlight = [], this.onProviderDisconnect();
    }, this.onProviderErrorHandler = (s2) => {
      this.logger.fatal(`Fatal socket error: ${s2.message}`), this.events.emit(p3.error, s2), this.logger.fatal("Fatal socket error received, closing transport"), this.transportExplicitlyClosed = true, clearTimeout(this.reconnectTimeout), this.reconnectTimeout = void 0, this.reconnectInProgress = false, this.transportClose().catch((i3) => this.logger.warn(i3));
    }, this.registerProviderListeners = () => {
      this.provider.on(v5.payload, this.onPayloadHandler), this.provider.on(v5.connect, this.onConnectHandler), this.provider.on(v5.disconnect, this.onDisconnectHandler), this.provider.on(v5.error, this.onProviderErrorHandler);
    }, this.core = t.core, this.logger = bo2({ logger: t.logger ?? Wt3, name: this.name }), this.messages = new be4(this.logger, t.core), this.subscriber = new we4(this, this.logger), this.publisher = new Hi(this, this.logger), this.projectId = t.projectId, this.relayUrl = t.relayUrl || pt2, An2() ? this.packageName = Tn2() : In2() && (this.bundleId = Tn2()), this.provider = {};
  }
  async init() {
    this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = true, this.transportOpen().catch((t) => this.logger.warn(t, t?.message));
  }
  get context() {
    return ee(this.logger);
  }
  get connected() {
    return this.provider?.connection?.socket?.readyState === 1;
  }
  get connecting() {
    return this.provider?.connection?.socket?.readyState === 0 || this.connectPromise !== void 0;
  }
  async publish(t, s2, i3) {
    this.isInitialized(), await this.publisher.publish(t, s2, i3), await this.recordMessageEvent({ topic: t, message: s2, publishedAt: Date.now(), transportType: D3.relay }, H4.outbound);
  }
  async publishCustom(t) {
    this.isInitialized(), await this.publisher.publishCustom(t);
  }
  async subscribe(t, s2) {
    this.isInitialized(), (!s2?.transportType || s2?.transportType === "relay") && await this.toEstablishConnection();
    const i3 = s2?.internal?.throwOnFailedPublish ?? true;
    let e2 = this.subscriber.topicMap.get(t)?.[0] || "", r3;
    const o5 = (n4) => {
      n4.topic === t && (this.subscriber.off(b3.created, o5), r3());
    };
    return await Promise.all([new Promise((n4) => {
      r3 = n4, this.subscriber.on(b3.created, o5);
    }), new Promise((n4, a3) => {
      this.subscriber.subscribe(t, { internal: { throwOnFailedPublish: i3 }, ...s2 }).then((h4) => {
        e2 = h4 || e2, n4();
      }).catch((h4) => {
        i3 ? a3(h4) : n4();
      });
    })]), e2;
  }
  async unsubscribe(t, s2) {
    this.isInitialized(), await this.subscriber.unsubscribe(t, s2);
  }
  on(t, s2) {
    this.events.on(t, s2);
  }
  once(t, s2) {
    this.events.once(t, s2);
  }
  off(t, s2) {
    this.events.off(t, s2);
  }
  removeListener(t, s2) {
    this.events.removeListener(t, s2);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await Ln2(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = true, clearTimeout(this.stalledRestartTimeout), this.stalledRestartInProgress = false, this.stalledRestartBackoff = 0, await this.resetTransport();
  }
  async transportOpen(t) {
    if (!this.subscriber.hasAnyTopics) {
      this.logger.info("Starting WS connection skipped because the client has no topics to work with.");
      return;
    }
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = this.connect(t).finally(() => {
      this.connectPromise = void 0;
    }), await this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(t) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = t || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.resetTransport(), await this.transportOpen());
  }
  async resetTransport() {
    this.reconnectInProgress = true, clearTimeout(this.reconnectTimeout), this.reconnectTimeout = void 0, await this.transportDisconnect(), await this.subscriber.stop(), this.reconnectInProgress = false;
  }
  async confirmOnlineStateOrThrow() {
    if (!await uo2()) throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(t) {
    if (t?.length === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const s2 = t.sort((i3, e2) => i3.publishedAt - e2.publishedAt);
    this.logger.debug(`Batch of ${s2.length} message events sorted`);
    for (const i3 of s2) try {
      await this.onMessageEvent(i3);
    } catch (e2) {
      this.logger.warn(e2, "Error while processing batch message event: " + e2?.message);
    }
    this.logger.trace(`Batch of ${s2.length} message events processed`);
  }
  async onLinkMessageEvent(t, s2) {
    const { topic: i3 } = t;
    if (!s2.sessionExists) {
      const e2 = Hn2(import_time4.FIVE_MINUTES), r3 = { topic: i3, expiry: e2, relay: { protocol: "irn" }, active: false };
      await this.core.pairing.pairings.set(i3, r3);
    }
    this.events.emit(p3.message, t), await this.recordMessageEvent(t, H4.inbound);
  }
  async connect(t) {
    await this.confirmOnlineStateOrThrow(), t && t !== this.relayUrl && (this.relayUrl = t, await this.transportDisconnect()), this.transportExplicitlyClosed = false;
    let s2 = 1;
    try {
      for (; s2 < 6; ) {
        this.connectionAttemptInProgress = true;
        try {
          if (this.transportExplicitlyClosed) break;
          this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${s2}...`), await this.createProvider(), await new Promise((i3, e2) => {
            const r3 = () => {
              e2(new Error("Connection interrupted while trying to connect"));
            };
            this.provider.once(v5.disconnect, r3), Ln2(this.provider.connect(), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).then(() => i3()).catch(e2).finally(() => {
              this.provider.off(v5.disconnect, r3), clearTimeout(this.reconnectTimeout);
            });
          }), await new Promise((i3, e2) => {
            const r3 = () => {
              e2(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(v5.disconnect, r3), this.subscriber.start().then(i3).catch(e2).finally(() => {
              this.provider.off(v5.disconnect, r3);
            });
          }), this.hasExperiencedNetworkDisruption = false;
        } catch (i3) {
          await this.subscriber.stop();
          const e2 = i3;
          this.logger.warn({}, e2.message), this.hasExperiencedNetworkDisruption = true;
        }
        if (this.connected) {
          this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${s2}`);
          break;
        }
        await new Promise((i3) => setTimeout(i3, (0, import_time4.toMiliseconds)(s2 * 1))), s2++;
      }
    } finally {
      this.connectionAttemptInProgress = false, clearTimeout(this.reconnectTimeout), this.reconnectTimeout = void 0, this.reconnectInProgress = false;
    }
  }
  startPingTimeout() {
    if (fe3()) try {
      this.provider?.connection?.socket?.on("ping", () => {
        this.resetPingTimeout();
      }), this.resetPingTimeout();
    } catch (t) {
      this.logger.warn(t, t?.message);
    }
  }
  async createProvider() {
    if (this.provider.connection && (this.unregisterProviderListeners(), this.connected)) try {
      await Ln2(this.provider.disconnect(), 1e3, "Closing previous provider");
    } catch {
    }
    const t = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new o3(new f($n2({ sdkVersion: Q3, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: t, useOnCloseEvent: true, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(t, s2) {
    const { topic: i3, message: e2 } = t;
    await this.messages.set(i3, e2, s2);
  }
  async shouldIgnoreMessageEvent(t) {
    const { topic: s2, message: i3 } = t;
    if (!i3 || i3.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${i3}`), true;
    if (!await this.subscriber.isKnownTopic(s2)) return this.logger.warn(`Ignoring message for unknown topic ${s2}`), true;
    const e2 = this.messages.has(s2, i3);
    return e2 && this.logger.warn(`Ignoring duplicate message: ${i3}`), e2;
  }
  async onProviderPayload(t) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: t }), isJsonRpcRequest(t)) {
      if (!t.method.endsWith(Yt3)) return;
      const s2 = t.params, { topic: i3, message: e2, publishedAt: r3, attestation: o5 } = s2.data, n4 = { topic: i3, message: e2, publishedAt: r3, transportType: D3.relay, attestation: o5 };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace({ type: "event", event: s2.id, ...n4 }), this.events.emit(s2.id, n4), await this.acknowledgePayload(t), await this.onMessageEvent(n4);
    } else isJsonRpcResponse(t) && this.events.emit(p3.message_ack, t);
  }
  async onMessageEvent(t) {
    await this.shouldIgnoreMessageEvent(t) || (await this.recordMessageEvent(t, H4.inbound), this.events.emit(p3.message, t));
  }
  async acknowledgePayload(t) {
    const s2 = formatJsonRpcResult(t.id, true);
    await this.provider.connection.send(s2);
  }
  unregisterProviderListeners() {
    this.provider.off(v5.payload, this.onPayloadHandler), this.provider.off(v5.connect, this.onConnectHandler), this.provider.off(v5.disconnect, this.onDisconnectHandler), this.provider.off(v5.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let t = await uo2();
    lo2(async (s2) => {
      t !== s2 && (t = s2, s2 ? await this.transportOpen().catch((i3) => this.logger.error(i3, i3?.message)) : (this.hasExperiencedNetworkDisruption = true, await this.transportDisconnect(), this.transportExplicitlyClosed = false));
    }), this.core.heartbeat.on(r.pulse, async () => {
      if (!this.transportExplicitlyClosed && !this.connected && fo2()) try {
        await this.confirmOnlineStateOrThrow(), await this.transportOpen();
      } catch (s2) {
        this.logger.warn(s2, s2?.message);
      }
    }), this.events.on(p3.connection_stalled, () => {
      if (this.transportExplicitlyClosed || this.stalledRestartInProgress) return;
      this.stalledRestartInProgress = true;
      const s2 = this.stalledRestartBackoff === 0 ? 0 : Math.min(Math.pow(2, this.stalledRestartBackoff - 1) * this.stalledRestartBaseInterval, this.stalledRestartMaxInterval);
      this.stalledRestartBackoff++, this.logger.warn(`Connection stalled, restarting transport${s2 ? ` in ${s2}ms` : ""}...`), this.stalledRestartTimeout = setTimeout(async () => {
        try {
          if (this.transportExplicitlyClosed) return;
          await this.restartTransport();
        } catch (i3) {
          this.logger.error(i3, i3?.message);
        } finally {
          this.stalledRestartInProgress = false;
        }
      }, s2);
    });
  }
  async onProviderDisconnect() {
    if (clearTimeout(this.pingTimeout), this.events.emit(p3.disconnect), !this.reconnectInProgress) {
      this.reconnectInProgress = true;
      try {
        await this.subscriber.stop();
      } catch (t) {
        this.logger.warn(t, "subscriber.stop() failed during disconnect");
      }
      if (!this.subscriber.hasAnyTopics || this.transportExplicitlyClosed) {
        this.reconnectInProgress = false;
        return;
      }
      this.reconnectTimeout = setTimeout(async () => {
        await this.transportOpen().catch((t) => this.logger.error(t, t?.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = false;
      }, (0, import_time4.toMiliseconds)(Jt3));
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = N10("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
  async toEstablishConnection() {
    if (await this.confirmOnlineStateOrThrow(), !this.connected) {
      if (this.connectPromise) {
        await this.connectPromise;
        return;
      }
      this.connectPromise = this.connect().finally(() => {
        this.connectPromise = void 0;
      }), await this.connectPromise;
    }
  }
};
var ve4 = class extends p2 {
  constructor(t, s2, i3, e2 = S3, r3 = void 0) {
    super(t, s2, i3, e2), this.core = t, this.logger = s2, this.name = i3, this.map = /* @__PURE__ */ new Map(), this.version = jt3, this.cached = [], this.initialized = false, this.storagePrefix = S3, this.recentlyDeleted = [], this.recentlyDeletedLimit = 200, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o5) => {
        this.getKey && o5 !== null && !R2(o5) ? this.map.set(this.getKey(o5), o5) : Wr2(o5) ? this.map.set(o5.id, o5) : Jr2(o5) && this.map.set(o5.topic, o5);
      }), this.cached = [], this.initialized = true);
    }, this.set = async (o5, n4) => {
      this.isInitialized(), this.map.has(o5) ? await this.update(o5, n4) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o5, value: n4 }), this.map.set(o5, n4), await this.persist());
    }, this.get = (o5) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o5 }), this.getData(o5)), this.getAll = (o5) => (this.isInitialized(), o5 ? this.values.filter((n4) => Object.keys(o5).every((a3) => isEqual2(n4[a3], o5[a3]))) : this.values), this.update = async (o5, n4) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o5, update: n4 });
      const a3 = { ...this.getData(o5), ...n4 };
      this.map.set(o5, a3), await this.persist();
    }, this.delete = async (o5, n4) => {
      this.isInitialized(), this.map.has(o5) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o5, reason: n4 }), this.map.delete(o5), this.addToRecentlyDeleted(o5), await this.persist());
    }, this.logger = Re(s2, this.name), this.storagePrefix = e2, this.getKey = r3;
  }
  get context() {
    return ee(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(t) {
    this.recentlyDeleted.push(t), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(t) {
    await this.core.storage.setItem(this.storageKey, t);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(t) {
    const s2 = this.map.get(t);
    if (!s2) {
      if (this.recentlyDeleted.includes(t)) {
        const { message: e2 } = N10("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${t}`);
        throw this.logger.error(e2), new Error(e2);
      }
      const { message: i3 } = N10("NO_MATCHING_KEY", `${this.name}: ${t}`);
      throw this.logger.error(i3), new Error(i3);
    }
    return s2;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const t = await this.getDataStore();
      if (typeof t > "u" || !t.length) return;
      if (this.map.size) {
        const { message: s2 } = N10("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(s2), new Error(s2);
      }
      this.cached = t, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (t) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(t);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = N10("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
};
var Ee4 = class {
  constructor(t, s2) {
    this.core = t, this.logger = s2, this.name = te4, this.version = ee3, this.events = new import_events7.default(), this.initialized = false, this.storagePrefix = S3, this.ignoredPayloadTypes = [D2], this.registeredMethods = [], this.init = async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
    }, this.register = ({ methods: i3 }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...i3])];
    }, this.create = async (i3) => {
      this.isInitialized();
      const e2 = Nr2(), r3 = await this.core.crypto.setSymKey(e2), o5 = Hn2(import_time4.FIVE_MINUTES), n4 = { protocol: Gt3 }, a3 = { topic: r3, expiry: o5, relay: n4, active: false, methods: i3?.methods }, h4 = _r2({ protocol: this.core.protocol, version: this.core.version, topic: r3, symKey: e2, relay: n4, expiryTimestamp: o5, methods: i3?.methods });
      return this.events.emit(q3.create, a3), this.core.expirer.set(r3, o5), await this.pairings.set(r3, a3), await this.core.relayer.subscribe(r3, { transportType: i3?.transportType, internal: i3?.internal }), { topic: r3, uri: h4 };
    }, this.pair = async (i3) => {
      this.isInitialized();
      const e2 = this.core.eventClient.createEvent({ properties: { topic: i3?.uri, trace: [x6.pairing_started] } });
      this.isValidPair(i3, e2);
      const { topic: r3, symKey: o5, relay: n4, expiryTimestamp: a3, methods: h4 } = kr2(i3.uri);
      e2.props.properties.topic = r3, e2.addTrace(x6.pairing_uri_validation_success), e2.addTrace(x6.pairing_uri_not_expired);
      let d5;
      if (this.pairings.keys.includes(r3)) {
        if (d5 = this.pairings.get(r3), e2.addTrace(x6.existing_pairing), d5.active) throw e2.setError(O3.active_pairing_already_exists), new Error(`Pairing already exists: ${r3}. Please try again with a new connection URI.`);
        e2.addTrace(x6.pairing_not_expired);
      }
      const l5 = a3 || Hn2(import_time4.FIVE_MINUTES), g5 = { topic: r3, relay: n4, expiry: l5, active: false, methods: h4 };
      this.core.expirer.set(r3, l5), await this.pairings.set(r3, g5), e2.addTrace(x6.store_new_pairing), i3.activatePairing && await this.activate({ topic: r3 }), this.events.emit(q3.create, g5), e2.addTrace(x6.emit_inactive_pairing), this.core.crypto.keychain.has(r3) || await this.core.crypto.setSymKey(o5, r3), e2.addTrace(x6.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        e2.setError(O3.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(r3, { relay: n4 });
      } catch (_3) {
        throw e2.setError(O3.subscribe_pairing_topic_failure), _3;
      }
      return e2.addTrace(x6.subscribe_pairing_topic_success), g5;
    }, this.activate = async ({ topic: i3 }) => {
      this.isInitialized();
      const e2 = Hn2(import_time4.FIVE_MINUTES);
      this.core.expirer.set(i3, e2), await this.pairings.update(i3, { active: true, expiry: e2 });
    }, this.ping = async (i3) => {
      this.isInitialized(), await this.isValidPing(i3), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: e2 } = i3;
      if (this.pairings.keys.includes(e2)) {
        const r3 = await this.sendRequest(e2, "wc_pairingPing", {}), { done: o5, resolve: n4, reject: a3 } = Mn2();
        this.events.once(Wn2("pairing_ping", r3), ({ error: h4 }) => {
          h4 ? a3(h4) : n4();
        }), await o5();
      }
    }, this.updateExpiry = async ({ topic: i3, expiry: e2 }) => {
      this.isInitialized(), await this.pairings.update(i3, { expiry: e2 });
    }, this.updateMetadata = async ({ topic: i3, metadata: e2 }) => {
      this.isInitialized(), await this.pairings.update(i3, { peerMetadata: e2 });
    }, this.getPairings = () => (this.isInitialized(), this.pairings.values), this.disconnect = async (i3) => {
      this.isInitialized(), await this.isValidDisconnect(i3);
      const { topic: e2 } = i3;
      this.pairings.keys.includes(e2) && (await this.sendRequest(e2, "wc_pairingDelete", $2("USER_DISCONNECTED")), await this.deletePairing(e2));
    }, this.formatUriFromPairing = (i3) => {
      this.isInitialized();
      const { topic: e2, relay: r3, expiry: o5, methods: n4 } = i3, a3 = this.core.crypto.keychain.get(e2);
      return _r2({ protocol: this.core.protocol, version: this.core.version, topic: e2, symKey: a3, relay: r3, expiryTimestamp: o5, methods: n4 });
    }, this.sendRequest = async (i3, e2, r3) => {
      const o5 = formatJsonRpcRequest(e2, r3), n4 = await this.core.crypto.encode(i3, o5), a3 = U2[e2].req;
      return this.core.history.set(i3, o5), this.core.relayer.publish(i3, n4, a3), o5.id;
    }, this.sendResult = async (i3, e2, r3) => {
      const o5 = formatJsonRpcResult(i3, r3), n4 = await this.core.crypto.encode(e2, o5), a3 = (await this.core.history.get(e2, i3)).request.method, h4 = U2[a3].res;
      await this.core.relayer.publish(e2, n4, h4), await this.core.history.resolve(o5);
    }, this.sendError = async (i3, e2, r3) => {
      const o5 = formatJsonRpcError(i3, r3), n4 = await this.core.crypto.encode(e2, o5), a3 = (await this.core.history.get(e2, i3)).request.method, h4 = U2[a3] ? U2[a3].res : U2.unregistered_method.res;
      await this.core.relayer.publish(e2, n4, h4), await this.core.history.resolve(o5);
    }, this.deletePairing = async (i3, e2) => {
      await this.core.relayer.unsubscribe(i3), await Promise.all([this.pairings.delete(i3, $2("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(i3), e2 ? Promise.resolve() : this.core.expirer.del(i3)]);
    }, this.cleanup = async () => {
      const i3 = this.pairings.getAll().filter((e2) => Bn2(e2.expiry));
      await Promise.all(i3.map((e2) => this.deletePairing(e2.topic)));
    }, this.onRelayEventRequest = async (i3) => {
      const { topic: e2, payload: r3 } = i3;
      switch (r3.method) {
        case "wc_pairingPing":
          return await this.onPairingPingRequest(e2, r3);
        case "wc_pairingDelete":
          return await this.onPairingDeleteRequest(e2, r3);
        default:
          return await this.onUnknownRpcMethodRequest(e2, r3);
      }
    }, this.onRelayEventResponse = async (i3) => {
      const { topic: e2, payload: r3 } = i3, o5 = (await this.core.history.get(e2, r3.id)).request.method;
      switch (o5) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(e2, r3);
        default:
          return this.onUnknownRpcMethodResponse(o5);
      }
    }, this.onPairingPingRequest = async (i3, e2) => {
      const { id: r3 } = e2;
      try {
        this.isValidPing({ topic: i3 }), await this.sendResult(r3, i3, true), this.events.emit(q3.ping, { id: r3, topic: i3 });
      } catch (o5) {
        await this.sendError(r3, i3, o5), this.logger.error(o5);
      }
    }, this.onPairingPingResponse = (i3, e2) => {
      const { id: r3 } = e2;
      setTimeout(() => {
        isJsonRpcResult(e2) ? this.events.emit(Wn2("pairing_ping", r3), {}) : isJsonRpcError(e2) && this.events.emit(Wn2("pairing_ping", r3), { error: e2.error });
      }, 500);
    }, this.onPairingDeleteRequest = async (i3, e2) => {
      const { id: r3 } = e2;
      try {
        this.isValidDisconnect({ topic: i3 }), await this.deletePairing(i3), this.events.emit(q3.delete, { id: r3, topic: i3 });
      } catch (o5) {
        await this.sendError(r3, i3, o5), this.logger.error(o5);
      }
    }, this.onUnknownRpcMethodRequest = async (i3, e2) => {
      const { id: r3, method: o5 } = e2;
      try {
        if (this.registeredMethods.includes(o5)) return;
        const n4 = $2("WC_METHOD_UNSUPPORTED", o5);
        await this.sendError(r3, i3, n4), this.logger.error(n4);
      } catch (n4) {
        await this.sendError(r3, i3, n4), this.logger.error(n4);
      }
    }, this.onUnknownRpcMethodResponse = (i3) => {
      this.registeredMethods.includes(i3) || this.logger.error($2("WC_METHOD_UNSUPPORTED", i3));
    }, this.isValidPair = (i3, e2) => {
      if (!Xr2(i3)) {
        const { message: o5 } = N10("MISSING_OR_INVALID", `pair() params: ${i3}`);
        throw e2.setError(O3.malformed_pairing_uri), new Error(o5);
      }
      if (!Br2(i3.uri)) {
        const { message: o5 } = N10("MISSING_OR_INVALID", `pair() uri: ${i3.uri}`);
        throw e2.setError(O3.malformed_pairing_uri), new Error(o5);
      }
      const r3 = kr2(i3?.uri);
      if (!r3?.relay?.protocol) {
        const { message: o5 } = N10("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw e2.setError(O3.malformed_pairing_uri), new Error(o5);
      }
      if (!r3?.symKey) {
        const { message: o5 } = N10("MISSING_OR_INVALID", "pair() uri#symKey");
        throw e2.setError(O3.malformed_pairing_uri), new Error(o5);
      }
      if (r3?.expiryTimestamp && (0, import_time4.toMiliseconds)(r3?.expiryTimestamp) < Date.now()) {
        e2.setError(O3.pairing_expired);
        const { message: o5 } = N10("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(o5);
      }
    }, this.isValidPing = async (i3) => {
      if (!Xr2(i3)) {
        const { message: r3 } = N10("MISSING_OR_INVALID", `ping() params: ${i3}`);
        throw new Error(r3);
      }
      const { topic: e2 } = i3;
      await this.isValidPairingTopic(e2);
    }, this.isValidDisconnect = async (i3) => {
      if (!Xr2(i3)) {
        const { message: r3 } = N10("MISSING_OR_INVALID", `disconnect() params: ${i3}`);
        throw new Error(r3);
      }
      const { topic: e2 } = i3;
      await this.isValidPairingTopic(e2);
    }, this.isValidPairingTopic = async (i3) => {
      if (!E3(i3, false)) {
        const { message: e2 } = N10("MISSING_OR_INVALID", `pairing topic should be a string: ${i3}`);
        throw new Error(e2);
      }
      if (!this.pairings.keys.includes(i3)) {
        const { message: e2 } = N10("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i3}`);
        throw new Error(e2);
      }
      if (Bn2(this.pairings.get(i3).expiry)) {
        await this.deletePairing(i3);
        const { message: e2 } = N10("EXPIRED", `pairing topic: ${i3}`);
        throw new Error(e2);
      }
    }, this.core = t, this.logger = Re(s2, this.name), this.pairings = new ve4(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return ee(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = N10("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(p3.message, async (t) => {
      const { topic: s2, message: i3, transportType: e2 } = t;
      if (this.pairings.keys.includes(s2) && e2 !== D3.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i3))) try {
        const r3 = await this.core.crypto.decode(s2, i3);
        isJsonRpcRequest(r3) ? (this.core.history.set(s2, r3), await this.onRelayEventRequest({ topic: s2, payload: r3 })) : isJsonRpcResponse(r3) && (await this.core.history.resolve(r3), await this.onRelayEventResponse({ topic: s2, payload: r3 }), this.core.history.delete(s2, r3.id)), await this.core.relayer.messages.ack(s2, i3);
      } catch (r3) {
        this.logger.error(r3);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(P4.expired, async (t) => {
      const { topic: s2 } = qn2(t.target);
      s2 && this.pairings.keys.includes(s2) && (await this.deletePairing(s2, true), this.events.emit(q3.expire, { topic: s2 }));
    });
  }
};
var Ie4 = class extends h2 {
  constructor(t, s2) {
    super(t, s2), this.core = t, this.logger = s2, this.records = /* @__PURE__ */ new Map(), this.events = new import_events7.EventEmitter(), this.name = ie3, this.version = se3, this.cached = [], this.initialized = false, this.storagePrefix = S3, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i3) => this.records.set(i3.id, i3)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }, this.set = (i3, e2, r3) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: i3, request: e2, chainId: r3 }), this.records.has(e2.id)) return;
      const o5 = { id: e2.id, topic: i3, request: { method: e2.method, params: e2.params || null }, chainId: r3, expiry: Hn2(import_time4.THIRTY_DAYS) };
      this.records.set(o5.id, o5), this.persist(), this.events.emit(T3.created, o5);
    }, this.resolve = async (i3) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: i3 }), !this.records.has(i3.id)) return;
      const e2 = await this.getRecord(i3.id);
      typeof e2.response < "u" || (e2.response = isJsonRpcError(i3) ? { error: i3.error } : { result: i3.result }, this.records.set(e2.id, e2), this.persist(), this.events.emit(T3.updated, e2));
    }, this.get = async (i3, e2) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: i3, id: e2 }), await this.getRecord(e2)), this.delete = (i3, e2) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: e2 }), this.values.forEach((r3) => {
        if (r3.topic === i3) {
          if (typeof e2 < "u" && r3.id !== e2) return;
          this.records.delete(r3.id), this.events.emit(T3.deleted, r3);
        }
      }), this.persist();
    }, this.exists = async (i3, e2) => (this.isInitialized(), this.records.has(e2) ? (await this.getRecord(e2)).topic === i3 : false), this.on = (i3, e2) => {
      this.events.on(i3, e2);
    }, this.once = (i3, e2) => {
      this.events.once(i3, e2);
    }, this.off = (i3, e2) => {
      this.events.off(i3, e2);
    }, this.removeListener = (i3, e2) => {
      this.events.removeListener(i3, e2);
    }, this.logger = Re(s2, this.name);
  }
  get context() {
    return ee(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const t = [];
    return this.values.forEach((s2) => {
      if (typeof s2.response < "u") return;
      const i3 = { topic: s2.topic, request: formatJsonRpcRequest(s2.request.method, s2.request.params, s2.id), chainId: s2.chainId };
      return t.push(i3);
    }), t;
  }
  async setJsonRpcRecords(t) {
    await this.core.storage.setItem(this.storageKey, t);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(t) {
    this.isInitialized();
    const s2 = this.records.get(t);
    if (!s2) {
      const { message: i3 } = N10("NO_MATCHING_KEY", `${this.name}: ${t}`);
      throw new Error(i3);
    }
    return s2;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(T3.sync);
  }
  async restore() {
    try {
      const t = await this.getJsonRpcRecords();
      if (typeof t > "u" || !t.length) return;
      if (this.records.size) {
        const { message: s2 } = N10("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(s2), new Error(s2);
      }
      this.cached = t, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (t) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(t);
    }
  }
  registerEventListeners() {
    this.events.on(T3.created, (t) => {
      const s2 = T3.created;
      this.logger.info(`Emitting ${s2}`), this.logger.debug({ type: "event", event: s2, record: t });
    }), this.events.on(T3.updated, (t) => {
      const s2 = T3.updated;
      this.logger.info(`Emitting ${s2}`), this.logger.debug({ type: "event", event: s2, record: t });
    }), this.events.on(T3.deleted, (t) => {
      const s2 = T3.deleted;
      this.logger.info(`Emitting ${s2}`), this.logger.debug({ type: "event", event: s2, record: t });
    }), this.core.heartbeat.on(r.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let t = false;
      this.records.forEach((s2) => {
        (0, import_time4.toMiliseconds)(s2.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${s2.id}`), this.records.delete(s2.id), this.events.emit(T3.deleted, s2, false), t = true);
      }), t && this.persist();
    } catch (t) {
      this.logger.warn(t);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = N10("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
};
var Te4 = class extends x3 {
  constructor(t, s2) {
    super(t, s2), this.core = t, this.logger = s2, this.expirations = /* @__PURE__ */ new Map(), this.events = new import_events7.EventEmitter(), this.name = re3, this.version = oe3, this.cached = [], this.initialized = false, this.storagePrefix = S3, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i3) => this.expirations.set(i3.target, i3)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }, this.has = (i3) => {
      try {
        const e2 = this.formatTarget(i3);
        return typeof this.getExpiration(e2) < "u";
      } catch {
        return false;
      }
    }, this.set = (i3, e2) => {
      this.isInitialized();
      const r3 = this.formatTarget(i3), o5 = { target: r3, expiry: e2 };
      this.expirations.set(r3, o5), this.checkExpiry(r3, o5), this.events.emit(P4.created, { target: r3, expiration: o5 });
    }, this.get = (i3) => {
      this.isInitialized();
      const e2 = this.formatTarget(i3);
      return this.getExpiration(e2);
    }, this.del = (i3) => {
      if (this.isInitialized(), this.has(i3)) {
        const e2 = this.formatTarget(i3), r3 = this.getExpiration(e2);
        this.expirations.delete(e2), this.events.emit(P4.deleted, { target: e2, expiration: r3 });
      }
    }, this.on = (i3, e2) => {
      this.events.on(i3, e2);
    }, this.once = (i3, e2) => {
      this.events.once(i3, e2);
    }, this.off = (i3, e2) => {
      this.events.off(i3, e2);
    }, this.removeListener = (i3, e2) => {
      this.events.removeListener(i3, e2);
    }, this.logger = Re(s2, this.name);
  }
  get context() {
    return ee(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(t) {
    if (typeof t == "string") return Kn2(t);
    if (typeof t == "number") return Fn3(t);
    const { message: s2 } = N10("UNKNOWN_TYPE", `Target type: ${typeof t}`);
    throw new Error(s2);
  }
  async setExpirations(t) {
    await this.core.storage.setItem(this.storageKey, t);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(P4.sync);
  }
  async restore() {
    try {
      const t = await this.getExpirations();
      if (typeof t > "u" || !t.length) return;
      if (this.expirations.size) {
        const { message: s2 } = N10("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(s2), new Error(s2);
      }
      this.cached = t, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (t) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(t);
    }
  }
  getExpiration(t) {
    const s2 = this.expirations.get(t);
    if (!s2) {
      const { message: i3 } = N10("NO_MATCHING_KEY", `${this.name}: ${t}`);
      throw this.logger.warn(i3), new Error(i3);
    }
    return s2;
  }
  checkExpiry(t, s2) {
    const { expiry: i3 } = s2;
    (0, import_time4.toMiliseconds)(i3) - Date.now() <= 0 && this.expire(t, s2);
  }
  expire(t, s2) {
    this.expirations.delete(t), this.events.emit(P4.expired, { target: t, expiration: s2 });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((t, s2) => this.checkExpiry(s2, t));
  }
  registerEventListeners() {
    this.core.heartbeat.on(r.pulse, () => this.checkExpirations()), this.events.on(P4.created, (t) => {
      const s2 = P4.created;
      this.logger.info(`Emitting ${s2}`), this.logger.debug({ type: "event", event: s2, data: t }), this.persist();
    }), this.events.on(P4.expired, (t) => {
      const s2 = P4.expired;
      this.logger.info(`Emitting ${s2}`), this.logger.debug({ type: "event", event: s2, data: t }), this.persist();
    }), this.events.on(P4.deleted, (t) => {
      const s2 = P4.deleted;
      this.logger.info(`Emitting ${s2}`), this.logger.debug({ type: "event", event: s2, data: t }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = N10("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
};
var Pe4 = class extends y3 {
  constructor(t, s2, i3) {
    super(t, s2, i3), this.core = t, this.logger = s2, this.store = i3, this.name = ne3, this.verifyUrlV3 = he4, this.storagePrefix = S3, this.version = lt3, this.init = async () => {
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && (0, import_time4.toMiliseconds)(this.publicKey?.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }, this.register = async (e2) => {
      if (!x5() || this.isDevEnv) return;
      const r3 = window.location.origin, { id: o5, decryptedId: n4 } = e2, a3 = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${r3}&id=${o5}&decryptedId=${n4}`;
      try {
        const h4 = (0, import_window_getters2.getDocument)(), d5 = this.startAbortTimer(import_time4.ONE_SECOND * 5), l5 = await new Promise((g5, _3) => {
          const E6 = () => {
            window.removeEventListener("message", N11), h4.body.removeChild(u3), _3("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", E6);
          const u3 = h4.createElement("iframe");
          u3.src = a3, u3.style.display = "none", u3.addEventListener("error", E6, { signal: this.abortController.signal });
          const N11 = (m3) => {
            if (m3.data && typeof m3.data == "string") try {
              const C4 = JSON.parse(m3.data);
              if (C4.type === "verify_attestation") {
                if (sn(C4.attestation).payload.id !== o5) return;
                clearInterval(d5), h4.body.removeChild(u3), this.abortController.signal.removeEventListener("abort", E6), window.removeEventListener("message", N11), g5(C4.attestation === null ? "" : C4.attestation);
              }
            } catch (C4) {
              this.logger.warn(C4);
            }
          };
          h4.body.appendChild(u3), window.addEventListener("message", N11, { signal: this.abortController.signal });
        });
        return this.logger.debug(l5, "jwt attestation"), l5;
      } catch (h4) {
        this.logger.warn(h4);
      }
      return "";
    }, this.resolve = async (e2) => {
      if (this.isDevEnv) return "";
      const { attestationId: r3, hash: o5, encryptedId: n4 } = e2;
      if (r3 === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (r3) {
        if (sn(r3).payload.id !== n4) return;
        const h4 = await this.isValidJwtAttestation(r3);
        if (h4) {
          if (!h4.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return h4;
        }
      }
      if (!o5) return;
      const a3 = this.getVerifyUrl(e2?.verifyUrl);
      return this.fetchAttestation(o5, a3);
    }, this.fetchAttestation = async (e2, r3) => {
      this.logger.debug(`resolving attestation: ${e2} from url: ${r3}`);
      const o5 = this.startAbortTimer(import_time4.ONE_SECOND * 5), n4 = await fetch(`${r3}/attestation/${e2}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o5), n4.status === 200 ? await n4.json() : void 0;
    }, this.getVerifyUrl = (e2) => {
      let r3 = e2 || Y3;
      return ce2.includes(r3) || (this.logger.info(`verify url: ${r3}, not included in trusted list, assigning default: ${Y3}`), r3 = Y3), r3;
    }, this.fetchPublicKey = async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const e2 = this.startAbortTimer(import_time4.FIVE_SECONDS), r3 = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(e2), await r3.json();
      } catch (e2) {
        this.logger.warn(e2);
      }
    }, this.persistPublicKey = async (e2) => {
      this.logger.debug(e2, "persisting public key to local storage"), await this.store.setItem(this.storeKey, e2), this.publicKey = e2;
    }, this.removePublicKey = async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }, this.isValidJwtAttestation = async (e2) => {
      const r3 = await this.getPublicKey();
      try {
        if (r3) return this.validateAttestation(e2, r3);
      } catch (n4) {
        this.logger.error(n4), this.logger.warn("error validating attestation");
      }
      const o5 = await this.fetchAndPersistPublicKey();
      try {
        if (o5) return this.validateAttestation(e2, o5);
      } catch (n4) {
        this.logger.error(n4), this.logger.warn("error validating attestation");
      }
    }, this.getPublicKey = async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey(), this.fetchAndPersistPublicKey = async () => {
      if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (r3) => {
        const o5 = await this.fetchPublicKey();
        o5 && (await this.persistPublicKey(o5), r3(o5));
      });
      const e2 = await this.fetchPromise;
      return this.fetchPromise = void 0, e2;
    }, this.validateAttestation = (e2, r3) => {
      const o5 = Cr2(e2, r3.publicKey), n4 = { hasExpired: (0, import_time4.toMiliseconds)(o5.exp) < Date.now(), payload: o5 };
      if (n4.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: n4.payload.origin, isScam: n4.payload.isScam, isVerified: n4.payload.isVerified };
    }, this.logger = Re(s2, this.name), this.abortController = new AbortController(), this.isDevEnv = Qn2(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return ee(this.logger);
  }
  startAbortTimer(t) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), (0, import_time4.toMiliseconds)(t));
  }
};
var Re4 = class extends v2 {
  constructor(t, s2) {
    super(t, s2), this.projectId = t, this.logger = s2, this.context = le3, this.registerDeviceToken = async (i3) => {
      const { clientId: e2, token: r3, notificationType: o5, enableEncrypted: n4 = false } = i3, a3 = `${ge4}/${this.projectId}/clients`;
      await fetch(a3, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: e2, type: o5, token: r3, always_raw: n4 }) });
    }, this.logger = Re(s2, this.context);
  }
};
var Se4 = class extends C {
  constructor(t, s2, i3 = true) {
    super(t, s2, i3), this.core = t, this.logger = s2, this.context = de3, this.storagePrefix = S3, this.storageVersion = pe4, this.events = /* @__PURE__ */ new Map(), this.shouldPersist = false, this.init = async () => {
      if (!Qn2()) try {
        const e2 = { eventId: Yn2(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: Ye2(this.core.relayer.protocol, this.core.relayer.version, Q3) } } };
        await this.sendEvent([e2]);
      } catch (e2) {
        this.logger.warn(e2);
      }
    }, this.createEvent = (e2) => {
      const { event: r3 = "ERROR", type: o5 = "", properties: { topic: n4, trace: a3 } } = e2, h4 = Yn2(), d5 = this.core.projectId || "", l5 = Date.now(), g5 = { eventId: h4, timestamp: l5, props: { event: r3, type: o5, properties: { topic: n4, trace: a3 } }, bundleId: d5, domain: this.getAppDomain(), ...this.setMethods(h4) };
      return this.telemetryEnabled && (this.events.set(h4, g5), this.shouldPersist = true), g5;
    }, this.getEvent = (e2) => {
      const { eventId: r3, topic: o5 } = e2;
      if (r3) return this.events.get(r3);
      const n4 = Array.from(this.events.values()).find((a3) => a3.props.properties.topic === o5);
      if (n4) return { ...n4, ...this.setMethods(n4.eventId) };
    }, this.deleteEvent = (e2) => {
      const { eventId: r3 } = e2;
      this.events.delete(r3), this.shouldPersist = true;
    }, this.setEventListeners = () => {
      this.core.heartbeat.on(r.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((e2) => {
          (0, import_time4.fromMiliseconds)(Date.now()) - (0, import_time4.fromMiliseconds)(e2.timestamp) > ue2 && (this.events.delete(e2.eventId), this.shouldPersist = true);
        });
      });
    }, this.setMethods = (e2) => ({ addTrace: (r3) => this.addTrace(e2, r3), setError: (r3) => this.setError(e2, r3) }), this.addTrace = (e2, r3) => {
      const o5 = this.events.get(e2);
      o5 && (o5.props.properties.trace.push(r3), this.events.set(e2, o5), this.shouldPersist = true);
    }, this.setError = (e2, r3) => {
      const o5 = this.events.get(e2);
      o5 && (o5.props.type = r3, o5.timestamp = Date.now(), this.events.set(e2, o5), this.shouldPersist = true);
    }, this.persist = async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = false;
    }, this.restore = async () => {
      try {
        const e2 = await this.core.storage.getItem(this.storageKey) || [];
        if (!e2.length) return;
        e2.forEach((r3) => {
          this.events.set(r3.eventId, { ...r3, ...this.setMethods(r3.eventId) });
        });
      } catch (e2) {
        this.logger.warn(e2);
      }
    }, this.submit = async () => {
      if (!this.telemetryEnabled || this.events.size === 0) return;
      const e2 = [];
      for (const [r3, o5] of this.events) o5.props.type && e2.push(o5);
      if (e2.length !== 0) try {
        if ((await this.sendEvent(e2)).ok) for (const r3 of e2) this.events.delete(r3.eventId), this.shouldPersist = true;
      } catch (r3) {
        this.logger.warn(r3);
      }
    }, this.sendEvent = async (e2) => {
      const r3 = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${ye4}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${Q3}${r3}`, { method: "POST", body: JSON.stringify(e2) });
    }, this.getAppDomain = () => Je2().url, this.logger = Re(s2, this.context), this.telemetryEnabled = i3, i3 ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
};
var Ce4 = class xe3 extends n2 {
  constructor(t) {
    super(t), this.protocol = ct3, this.version = lt3, this.name = W4, this.events = new import_events7.EventEmitter(), this.initialized = false, this.on = (o5, n4) => this.events.on(o5, n4), this.once = (o5, n4) => this.events.once(o5, n4), this.off = (o5, n4) => this.events.off(o5, n4), this.removeListener = (o5, n4) => this.events.removeListener(o5, n4), this.dispatchEnvelope = ({ topic: o5, message: n4, sessionExists: a3 }) => {
      if (!o5 || !n4) return;
      const h4 = { topic: o5, message: n4, publishedAt: Date.now(), transportType: D3.link_mode };
      this.relayer.onLinkMessageEvent(h4, { sessionExists: a3 });
    };
    const s2 = this.getGlobalCore(t?.customStoragePrefix);
    if (s2) try {
      return this.customStoragePrefix = s2.customStoragePrefix, this.logger = s2.logger, this.heartbeat = s2.heartbeat, this.crypto = s2.crypto, this.history = s2.history, this.expirer = s2.expirer, this.storage = s2.storage, this.relayer = s2.relayer, this.pairing = s2.pairing, this.verify = s2.verify, this.echoClient = s2.echoClient, this.linkModeSupportedApps = s2.linkModeSupportedApps, this.eventClient = s2.eventClient, this.initialized = s2.initialized, this.logChunkController = s2.logChunkController, s2;
    } catch (o5) {
      console.warn("Failed to copy global core", o5);
    }
    this.projectId = t?.projectId, this.relayUrl = t?.relayUrl || pt2, this.customStoragePrefix = t?.customStoragePrefix ? `:${t.customStoragePrefix}` : "";
    const i3 = Ge({ level: typeof t?.logger == "string" && t.logger ? t.logger : Dt3.logger, name: W4 }), { logger: e2, chunkLoggerController: r3 } = Ue({ opts: i3, maxSizeInBytes: t?.maxLogBlobSizeInBytes, loggerOverride: t?.logger });
    this.logChunkController = r3, this.logChunkController?.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      this.logChunkController?.downloadLogsBlobInBrowser && this.logChunkController?.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() });
    }), this.logger = Re(e2, this.name), this.heartbeat = new i(), this.crypto = new _e3(this, this.logger, t?.keychain), this.history = new Ie4(this, this.logger), this.expirer = new Te4(this, this.logger), this.storage = t?.storage ? t.storage : new h({ ...zt3, ...t?.storageOptions }), this.relayer = new fe4({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Ee4(this, this.logger), this.verify = new Pe4(this, this.logger, this.storage), this.echoClient = new Re4(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new Se4(this, this.logger, t?.telemetryEnabled), this.setGlobalCore(this);
  }
  static async init(t) {
    const s2 = new xe3(t);
    await s2.initialize();
    const i3 = await s2.crypto.getClientId();
    return await s2.storage.setItem(Xt3, i3), s2;
  }
  get context() {
    return ee(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    return this.logChunkController?.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(t) {
    this.linkModeSupportedApps.includes(t) || (this.linkModeSupportedApps.push(t), await this.storage.setItem(dt3, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(dt3) || [], this.initialized = true, this.logger.info("Core Initialization Success");
    } catch (t) {
      throw this.logger.warn(t, `Core Initialization Failure at epoch ${Date.now()}`), this.logger.error(t.message), t;
    }
  }
  getGlobalCore(t = "") {
    try {
      if (this.isGlobalCoreDisabled()) return;
      const s2 = `_walletConnectCore_${t}`, i3 = `${s2}_count`;
      return globalThis[i3] = (globalThis[i3] || 0) + 1, globalThis[i3] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[i3]} times.`), globalThis[s2];
    } catch (s2) {
      console.warn("Failed to get global WalletConnect core", s2);
      return;
    }
  }
  setGlobalCore(t) {
    try {
      if (this.isGlobalCoreDisabled()) return;
      const s2 = `_walletConnectCore_${t.opts?.customStoragePrefix || ""}`;
      globalThis[s2] = t;
    } catch (s2) {
      console.warn("Failed to set global WalletConnect core", s2);
    }
  }
  isGlobalCoreDisabled() {
    try {
      return typeof process < "u" && process.env.DISABLE_GLOBAL_CORE === "true";
    } catch {
      return true;
    }
  }
};
var Ji = Ce4;

// node_modules/@walletconnect/sign-client/dist/index.js
var import_time5 = __toESM(require_cjs(), 1);
var be5 = "wc";
var Ae4 = 2;
var xe4 = "client";
var _e4 = `${be5}@${Ae4}:${xe4}:`;
var fe5 = { name: xe4, logger: "error", controller: false, relayUrl: "wss://relay.walletconnect.org" };
var Ce5 = "WALLETCONNECT_DEEPLINK_CHOICE";
var tt2 = "proposal";
var ke3 = "Proposal expired";
var st2 = "session";
var Z3 = import_time5.SEVEN_DAYS;
var it4 = "engine";
var T4 = { wc_sessionPropose: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1101 }, reject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1120 }, autoReject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1121 } }, wc_sessionSettle: { req: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: import_time5.FIVE_MINUTES * 3, prompt: true, tag: 1108 }, res: { ttl: import_time5.FIVE_MINUTES * 3, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1114 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: import_time5.ONE_HOUR, prompt: true, tag: 1116 }, res: { ttl: import_time5.ONE_HOUR, prompt: false, tag: 1117 }, reject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1118 }, autoReject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1119 } } };
var Se5 = { min: import_time5.FIVE_MINUTES, max: import_time5.SEVEN_DAYS };
var V3 = { idle: "IDLE", active: "ACTIVE" };
var rt3 = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" }, sui_signAndExecuteTransaction: { key: "digest" }, sui_signTransaction: { key: "" }, hedera_signAndExecuteTransaction: { key: "transactionId" }, hedera_executeTransaction: { key: "transactionId" }, near_signTransaction: { key: "" }, near_signTransactions: { key: "" }, tron_signTransaction: { key: "txID" }, xrpl_signTransaction: { key: "" }, xrpl_signTransactionFor: { key: "" }, algo_signTxn: { key: "" }, sendTransfer: { key: "txid" }, stacks_stxTransfer: { key: "txId" }, polkadot_signTransaction: { key: "" }, cosmos_signDirect: { key: "" } };
var nt3 = "request";
var ot2 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"];
var at2 = "wc";
var ct4 = "auth";
var lt4 = "authKeys";
var pt3 = "pairingTopics";
var ht2 = "requests";
var ue3 = `${at2}@${1.5}:${ct4}:`;
var $3 = `${ue3}:PUB_KEY`;
var Es = class extends M {
  constructor(a3) {
    super(a3), this.name = it4, this.events = new import_events8.default(), this.initialized = false, this.requestQueue = { state: V3.idle, queue: [] }, this.sessionRequestQueue = { state: V3.idle, queue: [] }, this.emittedSessionRequests = new Zn2({ limit: 500 }), this.requestQueueDelay = import_time5.ONE_SECOND, this.expectedPairingMethodMap = /* @__PURE__ */ new Map(), this.recentlyDeletedMap = /* @__PURE__ */ new Map(), this.recentlyDeletedLimit = 200, this.relayMessageCache = [], this.pendingSessions = /* @__PURE__ */ new Map(), this.init = async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), this.registerSubscriptionCleanup(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(T4) }), this.initialized = true, setTimeout(async () => {
        await this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, (0, import_time5.toMiliseconds)(this.requestQueueDelay)));
    }, this.connect = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const e2 = { ...t, requiredNamespaces: t.requiredNamespaces || {}, optionalNamespaces: t.optionalNamespaces || {} };
      await this.isValidConnect(e2), e2.optionalNamespaces = qr2(e2.requiredNamespaces, e2.optionalNamespaces), e2.requiredNamespaces = {};
      const { pairingTopic: s2, requiredNamespaces: i3, optionalNamespaces: r3, sessionProperties: n4, scopedProperties: o5, relays: c5, authentication: l5, walletPay: p5 } = e2, g5 = l5?.[0]?.ttl || T4.wc_sessionPropose.req.ttl || import_time5.FIVE_MINUTES;
      this.validateRequestExpiry(g5);
      let y7 = s2, u3, m3 = false;
      try {
        if (y7) {
          const E6 = this.client.core.pairing.pairings.get(y7);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), m3 = E6.active;
        }
      } catch (E6) {
        throw this.client.logger.error(`connect() -> pairing.get(${y7}) failed`), E6;
      }
      if (!y7 || !m3) {
        const { topic: E6, uri: A4 } = await this.client.core.pairing.create({ internal: { skipSubscribe: true } });
        y7 = E6, u3 = A4;
      }
      if (!y7) {
        const { message: E6 } = N10("NO_MATCHING_KEY", `connect() pairing topic: ${y7}`);
        throw new Error(E6);
      }
      const h4 = await this.client.core.crypto.generateKeyPair(), w6 = Hn2(g5), _3 = { requiredNamespaces: i3, optionalNamespaces: r3, relays: c5 ?? [{ protocol: Gt3 }], proposer: { publicKey: h4, metadata: this.client.metadata }, expiryTimestamp: w6, pairingTopic: y7, ...n4 && { sessionProperties: n4 }, ...o5 && { scopedProperties: o5 }, id: payloadId(), ...(l5 || p5) && { requests: { authentication: l5?.map((E6) => {
        const { domain: A4, chains: K5, nonce: U4, uri: M6, exp: ee5, nbf: oe5, type: te6, statement: ae5, requestId: ge6, resources: R4, signatureTypes: q4 } = E6;
        return { domain: A4, chains: K5, nonce: U4, type: te6 ?? "caip122", aud: M6, version: "1", iat: (/* @__PURE__ */ new Date()).toISOString(), exp: ee5, nbf: oe5, statement: ae5, requestId: ge6, resources: R4, signatureTypes: q4 };
      }), walletPay: p5 } } }, S5 = Wn2("session_connect", _3.id), { reject: b5, resolve: O5, done: L3 } = Mn2(g5, ke3), P6 = ({ id: E6 }) => {
        if (E6 === _3.id) {
          this.client.events.off("proposal_expire", P6);
          const A4 = this.pendingSessions.get(_3.id);
          if (A4) {
            const { sessionTopic: K5, publicKey: U4 } = A4;
            Promise.all([this.client.core.relayer.unsubscribe(K5), this.client.core.crypto.keychain.has(K5) ? this.client.core.crypto.deleteSymKey(K5) : Promise.resolve(), this.client.core.crypto.keychain.has(U4) ? this.client.core.crypto.deleteKeyPair(U4) : Promise.resolve()]).catch((M6) => this.client.logger.warn(M6));
          }
          this.pendingSessions.delete(_3.id), this.events.emit(S5, { error: { message: ke3, code: 0 } });
        }
      };
      return this.client.events.on("proposal_expire", P6), this.events.once(S5, ({ error: E6, session: A4 }) => {
        this.client.events.off("proposal_expire", P6), E6 ? b5(E6) : A4 && O5(A4);
      }), await this.setProposal(_3.id, _3), await this.sendProposeSession({ proposal: _3, publishOpts: { internal: { throwOnFailedPublish: true }, tvf: { correlationId: _3.id } } }).catch((E6) => {
        throw this.deleteProposal(_3.id), E6;
      }), { uri: u3, approval: L3 };
    }, this.pair = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(t);
      } catch (e2) {
        throw this.client.logger.error("pair() failed"), e2;
      }
    }, this.approve = async (t) => {
      const e2 = this.client.core.eventClient.createEvent({ properties: { topic: t?.id?.toString(), trace: [Bi.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (P6) {
        throw e2.setError(Fi.no_internet_connection), P6;
      }
      try {
        await this.isValidProposalId(t?.id);
      } catch (P6) {
        throw this.client.logger.error(`approve() -> proposal.get(${t?.id}) failed`), e2.setError(Fi.proposal_not_found), P6;
      }
      try {
        await this.isValidApprove(t);
      } catch (P6) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), e2.setError(Fi.session_approve_namespace_validation_failure), P6;
      }
      const { id: s2, relayProtocol: i3, namespaces: r3, sessionProperties: n4, scopedProperties: o5, sessionConfig: c5, proposalRequestsResponses: l5 } = t, p5 = this.client.proposal.get(s2);
      this.client.core.eventClient.deleteEvent({ eventId: e2.eventId });
      const { pairingTopic: g5, proposer: y7, requiredNamespaces: u3, optionalNamespaces: m3 } = p5;
      let h4 = this.client.core.eventClient?.getEvent({ topic: g5 });
      h4 || (h4 = this.client.core.eventClient?.createEvent({ type: Bi.session_approve_started, properties: { topic: g5, trace: [Bi.session_approve_started, Bi.session_namespaces_validation_success] } }));
      const w6 = await this.client.core.crypto.generateKeyPair(), _3 = y7.publicKey, S5 = await this.client.core.crypto.generateSharedKey(w6, _3), b5 = { relay: { protocol: i3 ?? "irn" }, namespaces: r3, controller: { publicKey: w6, metadata: this.client.metadata }, expiry: Hn2(Z3), ...n4 && { sessionProperties: n4 }, ...o5 && { scopedProperties: o5 }, ...c5 && { sessionConfig: c5 }, proposalRequestsResponses: l5 }, O5 = D3.relay;
      h4.addTrace(Bi.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(S5, { transportType: O5, internal: { skipSubscribe: true } });
      } catch (P6) {
        throw h4.setError(Fi.subscribe_session_topic_failure), P6;
      }
      h4.addTrace(Bi.subscribe_session_topic_success);
      const L3 = { ...b5, topic: S5, requiredNamespaces: u3, optionalNamespaces: m3, pairingTopic: g5, acknowledged: false, self: b5.controller, peer: { publicKey: y7.publicKey, metadata: y7.metadata }, controller: w6, transportType: D3.relay, authentication: l5?.authentication, walletPayResult: l5?.walletPay };
      await this.client.session.set(S5, L3), h4.addTrace(Bi.store_session);
      try {
        await this.sendApproveSession({ sessionTopic: S5, proposal: p5, pairingProposalResponse: { relay: { protocol: i3 ?? "irn" }, responderPublicKey: w6 }, sessionSettleRequest: b5, publishOpts: { internal: { throwOnFailedPublish: true }, tvf: { correlationId: s2, ...this.getTVFApproveParams(L3) } } }), h4.addTrace(Bi.session_approve_publish_success);
      } catch (P6) {
        throw this.client.logger.error(P6), this.client.session.delete(S5, $2("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(S5), P6;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: h4.eventId }), await this.client.core.pairing.updateMetadata({ topic: g5, metadata: y7.metadata }), await this.deleteProposal(s2), await this.client.core.pairing.activate({ topic: g5 }), await this.setExpiry(S5, Hn2(Z3)), { topic: S5, acknowledged: () => Promise.resolve(this.client.session.get(S5)) };
    }, this.reject = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(t);
      } catch (r3) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), r3;
      }
      const { id: e2, reason: s2 } = t;
      let i3;
      try {
        i3 = this.client.proposal.get(e2).pairingTopic;
      } catch (r3) {
        throw this.client.logger.error(`reject() -> proposal.get(${e2}) failed`), r3;
      }
      i3 && await this.sendError({ id: e2, topic: i3, error: s2, rpcOpts: T4.wc_sessionPropose.reject }), await this.deleteProposal(e2);
    }, this.update = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(t);
      } catch (p5) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), p5;
      }
      const { topic: e2, namespaces: s2 } = t, { done: i3, resolve: r3, reject: n4 } = Mn2(import_time5.FIVE_MINUTES, "Session update request expired without receiving any acknowledgement"), o5 = payloadId(), c5 = getBigIntRpcId().toString(), l5 = this.client.session.get(e2).namespaces;
      return this.events.once(Wn2("session_update", o5), ({ error: p5 }) => {
        p5 ? n4(p5) : r3();
      }), await this.client.session.update(e2, { namespaces: s2 }), await this.sendRequest({ topic: e2, method: "wc_sessionUpdate", params: { namespaces: s2 }, throwOnFailedPublish: true, clientRpcId: o5, relayRpcId: c5 }).catch((p5) => {
        this.client.logger.error(p5), this.client.session.update(e2, { namespaces: l5 }), n4(p5);
      }), { acknowledged: i3 };
    }, this.extend = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(t);
      } catch (o5) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), o5;
      }
      const { topic: e2 } = t, s2 = payloadId(), { done: i3, resolve: r3, reject: n4 } = Mn2(import_time5.FIVE_MINUTES, "Session extend request expired without receiving any acknowledgement");
      return this.events.once(Wn2("session_extend", s2), ({ error: o5 }) => {
        o5 ? n4(o5) : r3();
      }), await this.setExpiry(e2, Hn2(Z3)), this.sendRequest({ topic: e2, method: "wc_sessionExtend", params: {}, clientRpcId: s2, throwOnFailedPublish: true }).catch((o5) => {
        n4(o5);
      }), { acknowledged: i3 };
    }, this.request = async (t) => {
      this.isInitialized();
      try {
        await this.isValidRequest(t);
      } catch (h4) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), h4;
      }
      const { chainId: e2, request: s2, topic: i3, expiry: r3 = T4.wc_sessionRequest.req.ttl } = t, n4 = this.client.session.get(i3);
      n4?.transportType === D3.relay && await this.confirmOnlineStateOrThrow();
      const o5 = payloadId(), c5 = getBigIntRpcId().toString(), { done: l5, resolve: p5, reject: g5 } = Mn2(r3, "Request expired. Please try again.");
      this.events.once(Wn2("session_request", o5), ({ error: h4, result: w6 }) => {
        h4 ? g5(h4) : p5(w6);
      });
      const y7 = "wc_sessionRequest", u3 = this.getAppLinkIfEnabled(n4.peer.metadata, n4.transportType);
      if (u3) return await this.sendRequest({ clientRpcId: o5, relayRpcId: c5, topic: i3, method: y7, params: { request: { ...s2, expiryTimestamp: Hn2(r3) }, chainId: e2 }, expiry: r3, throwOnFailedPublish: true, appLink: u3 }).catch((h4) => g5(h4)), this.client.events.emit("session_request_sent", { topic: i3, request: s2, chainId: e2, id: o5 }), await l5();
      const m3 = { request: { ...s2, expiryTimestamp: Hn2(r3) }, chainId: e2 };
      return await Promise.all([new Promise(async (h4) => {
        await this.sendRequest({ clientRpcId: o5, relayRpcId: c5, topic: i3, method: y7, params: m3, expiry: r3, throwOnFailedPublish: true, tvf: this.getTVFParams(o5, m3) }).catch((w6) => g5(w6)), this.client.events.emit("session_request_sent", { topic: i3, request: s2, chainId: e2, id: o5 }), h4();
      }), new Promise(async (h4) => {
        if (!n4.sessionConfig?.disableDeepLink) {
          const w6 = await zn2(this.client.core.storage, Ce5);
          await Jn2({ id: o5, topic: i3, wcDeepLink: w6 });
        }
        h4();
      }), l5()]).then((h4) => h4[2]);
    }, this.respond = async (t) => {
      this.isInitialized();
      const e2 = this.client.core.eventClient.createEvent({ properties: { topic: t?.topic || t?.response?.id?.toString(), trace: [Bi.session_request_response_started] } });
      try {
        await this.isValidRespond(t);
      } catch (c5) {
        throw e2.addTrace(c5?.message), e2.setError(Fi.session_request_response_validation_failure), c5;
      }
      e2.addTrace(Bi.session_request_response_validation_success);
      const { topic: s2, response: i3 } = t, { id: r3 } = i3, n4 = this.client.session.get(s2);
      n4.transportType === D3.relay && await this.confirmOnlineStateOrThrow();
      const o5 = this.getAppLinkIfEnabled(n4.peer.metadata, n4.transportType);
      try {
        e2.addTrace(Bi.session_request_response_publish_started), isJsonRpcResult(i3) ? await this.sendResult({ id: r3, topic: s2, result: i3.result, throwOnFailedPublish: true, appLink: o5 }) : isJsonRpcError(i3) && await this.sendError({ id: r3, topic: s2, error: i3.error, appLink: o5 }), this.cleanupAfterResponse(t);
      } catch (c5) {
        throw e2.addTrace(c5?.message), e2.setError(Fi.session_request_response_publish_failure), c5;
      }
    }, this.ping = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(t);
      } catch (s2) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), s2;
      }
      const { topic: e2 } = t;
      if (this.client.session.keys.includes(e2)) {
        const s2 = payloadId(), i3 = getBigIntRpcId().toString(), { done: r3, resolve: n4, reject: o5 } = Mn2(import_time5.FIVE_MINUTES, "Ping request expired without receiving any acknowledgement");
        this.events.once(Wn2("session_ping", s2), ({ error: c5 }) => {
          c5 ? o5(c5) : n4();
        }), await Promise.all([this.sendRequest({ topic: e2, method: "wc_sessionPing", params: {}, throwOnFailedPublish: true, clientRpcId: s2, relayRpcId: i3 }), r3()]);
      } else this.client.core.pairing.pairings.keys.includes(e2) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: e2 }));
    }, this.emit = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(t);
      const { topic: e2, event: s2, chainId: i3 } = t, r3 = getBigIntRpcId().toString(), n4 = payloadId();
      await this.sendRequest({ topic: e2, method: "wc_sessionEvent", params: { event: s2, chainId: i3 }, throwOnFailedPublish: true, relayRpcId: r3, clientRpcId: n4 });
    }, this.disconnect = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(t);
      const { topic: e2 } = t;
      if (this.client.session.keys.includes(e2)) await this.sendRequest({ topic: e2, method: "wc_sessionDelete", params: $2("USER_DISCONNECTED"), throwOnFailedPublish: true }), await this.deleteSession({ topic: e2, emitEvent: false });
      else if (this.client.core.pairing.pairings.keys.includes(e2)) await this.client.core.pairing.disconnect({ topic: e2 });
      else {
        const { message: s2 } = N10("MISMATCHED_TOPIC", `Session or pairing topic not found: ${e2}`);
        throw new Error(s2);
      }
    }, this.find = (t) => (this.isInitialized(), this.client.session.getAll().filter((e2) => Hr2(e2, t))), this.getPendingSessionRequests = () => this.client.pendingRequest.getAll(), this.authenticate = async (t, e2) => {
      this.isInitialized(), this.isValidAuthenticate(t);
      const s2 = e2 && this.client.core.linkModeSupportedApps.includes(e2) && this.client.metadata.redirect?.linkMode, i3 = s2 ? D3.link_mode : D3.relay;
      i3 === D3.relay && await this.confirmOnlineStateOrThrow();
      const { chains: r3, statement: n4 = "", uri: o5, domain: c5, nonce: l5, type: p5, exp: g5, nbf: y7, methods: u3 = [], expiry: m3 } = t, h4 = [...t.resources || []], { topic: w6, uri: _3 } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: i3 });
      if (this.client.logger.info({ message: "Generated new pairing", pairing: { topic: w6, uri: _3 } }), this.client.auth.authKeys.keys.includes($3)) {
        const { responseTopic: R4, publicKey: q4 } = this.client.auth.authKeys.get($3);
        R4 && (await this.client.core.relayer.unsubscribe(R4).catch((x8) => this.client.logger.warn(x8)), await this.client.auth.pairingTopics.delete(R4, { message: "replaced", code: 0 }).catch((x8) => this.client.logger.warn(x8))), q4 && this.client.core.crypto.keychain.has(q4) && await this.client.core.crypto.deleteKeyPair(q4);
      }
      const S5 = await this.client.core.crypto.generateKeyPair(), b5 = Sr2(S5);
      if (await Promise.all([this.client.auth.authKeys.set($3, { responseTopic: b5, publicKey: S5 }), this.client.auth.pairingTopics.set(b5, { topic: b5, pairingTopic: w6 })]), await this.client.core.relayer.subscribe(b5, { transportType: i3 }), this.client.logger.info(`sending request to new pairing topic: ${w6}`), u3.length > 0) {
        const { namespace: R4 } = ae2(r3[0]);
        let q4 = hr2(R4, "request", u3);
        Z2(h4) && (q4 = gr2(q4, h4.pop())), h4.push(q4);
      }
      const O5 = m3 && m3 > T4.wc_sessionAuthenticate.req.ttl ? m3 : T4.wc_sessionAuthenticate.req.ttl, L3 = { authPayload: { type: p5 ?? "caip122", chains: r3, statement: n4, aud: o5, domain: c5, version: "1", nonce: l5, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: g5, nbf: y7, resources: h4 }, requester: { publicKey: S5, metadata: this.client.metadata }, expiryTimestamp: Hn2(O5) }, P6 = { eip155: { chains: r3, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...u3])], events: ["chainChanged", "accountsChanged"] } }, E6 = { requiredNamespaces: {}, optionalNamespaces: P6, relays: [{ protocol: "irn" }], pairingTopic: w6, proposer: { publicKey: S5, metadata: this.client.metadata }, expiryTimestamp: Hn2(T4.wc_sessionPropose.req.ttl), id: payloadId() }, { done: A4, resolve: K5, reject: U4 } = Mn2(O5, "Request expired"), M6 = payloadId(), ee5 = Wn2("session_connect", E6.id), oe5 = Wn2("session_request", M6), te6 = async ({ error: R4, session: q4 }) => {
        this.events.off(oe5, ae5), R4 ? U4(R4) : q4 && K5({ session: q4 });
      }, ae5 = async (R4) => {
        if (await this.deletePendingAuthRequest(M6, { message: "fulfilled", code: 0 }), R4.error) {
          const le5 = $2("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return R4.error.code === le5.code ? void 0 : (this.events.off(ee5, te6), U4(R4.error.message));
        }
        await this.deleteProposal(E6.id), this.events.off(ee5, te6);
        const { cacaos: q4, responder: x8 } = R4.result, Ee5 = [], Ve3 = [];
        for (const le5 of q4) {
          await lr2({ cacao: le5, projectId: this.client.core.projectId }) || (this.client.logger.error(le5, "Signature verification failed"), U4($2("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: Re5 } = le5, Ie5 = Z2(Re5.resources), Le3 = [ft2(Re5.iss)], yt4 = Ee3(Re5.iss);
          if (Ie5) {
            const Te5 = yr2(Ie5), wt2 = Er2(Ie5);
            Ee5.push(...Te5), Le3.push(...wt2);
          }
          for (const Te5 of Le3) Ve3.push(`${Te5}:${yt4}`);
        }
        const ce4 = await this.client.core.crypto.generateSharedKey(S5, x8.publicKey);
        let ye5;
        Ee5.length > 0 && (ye5 = { topic: ce4, acknowledged: true, self: { publicKey: S5, metadata: this.client.metadata }, peer: x8, controller: x8.publicKey, expiry: Hn2(Z3), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: w6, namespaces: Fr2([...new Set(Ee5)], [...new Set(Ve3)]), transportType: i3 }, await this.client.core.relayer.subscribe(ce4, { transportType: i3 }), await this.client.session.set(ce4, ye5), w6 && await this.client.core.pairing.updateMetadata({ topic: w6, metadata: x8.metadata }), ye5 = this.client.session.get(ce4)), this.client.metadata.redirect?.linkMode && x8.metadata.redirect?.linkMode && x8.metadata.redirect?.universal && e2 && (this.client.core.addLinkModeSupportedApp(x8.metadata.redirect.universal), this.client.session.update(ce4, { transportType: D3.link_mode })), K5({ auths: q4, session: ye5 });
      };
      this.events.once(ee5, te6), this.events.once(oe5, ae5);
      let ge6;
      try {
        if (s2) {
          const R4 = formatJsonRpcRequest("wc_sessionAuthenticate", L3, M6);
          this.client.core.history.set(w6, R4);
          const q4 = await this.client.core.crypto.encode("", R4, { type: F, encoding: ee2 });
          ge6 = Dr2(e2, w6, q4);
        } else await Promise.all([this.sendRequest({ topic: w6, method: "wc_sessionAuthenticate", params: L3, expiry: t.expiry, throwOnFailedPublish: true, clientRpcId: M6 }), this.sendRequest({ topic: w6, method: "wc_sessionPropose", params: E6, expiry: T4.wc_sessionPropose.req.ttl, throwOnFailedPublish: true, clientRpcId: E6.id })]);
      } catch (R4) {
        throw this.events.off(ee5, te6), this.events.off(oe5, ae5), R4;
      }
      return await this.setProposal(E6.id, E6), await this.setAuthRequest(M6, { request: { ...L3, verifyContext: {} }, pairingTopic: w6, transportType: i3 }), { uri: ge6 ?? _3, response: A4 };
    }, this.approveSessionAuthenticate = async (t) => {
      const { id: e2, auths: s2 } = t, i3 = this.client.core.eventClient.createEvent({ properties: { topic: e2.toString(), trace: [Gi.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (h4) {
        throw i3.setError(Wi.no_internet_connection), h4;
      }
      const r3 = this.getPendingAuthRequest(e2);
      if (!r3) throw i3.setError(Wi.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${e2}`);
      const n4 = r3.transportType || D3.relay;
      n4 === D3.relay && await this.confirmOnlineStateOrThrow();
      const o5 = r3.requester.publicKey, c5 = await this.client.core.crypto.generateKeyPair(), l5 = Sr2(o5), p5 = { type: D2, receiverPublicKey: o5, senderPublicKey: c5 }, g5 = [], y7 = [];
      for (const h4 of s2) {
        if (!await lr2({ cacao: h4, projectId: this.client.core.projectId })) {
          i3.setError(Wi.invalid_cacao);
          const O5 = $2("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: e2, topic: l5, error: O5, encodeOpts: p5 }), new Error(O5.message);
        }
        i3.addTrace(Gi.cacaos_verified);
        const { p: w6 } = h4, _3 = Z2(w6.resources), S5 = [ft2(w6.iss)], b5 = Ee3(w6.iss);
        if (_3) {
          const O5 = yr2(_3), L3 = Er2(_3);
          g5.push(...O5), S5.push(...L3);
        }
        for (const O5 of S5) y7.push(`${O5}:${b5}`);
      }
      const u3 = await this.client.core.crypto.generateSharedKey(c5, o5);
      i3.addTrace(Gi.create_authenticated_session_topic);
      let m3;
      if (g5?.length > 0) {
        m3 = { topic: u3, acknowledged: true, self: { publicKey: c5, metadata: this.client.metadata }, peer: { publicKey: o5, metadata: r3.requester.metadata }, controller: o5, expiry: Hn2(Z3), authentication: s2, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: r3.pairingTopic, namespaces: Fr2([...new Set(g5)], [...new Set(y7)]), transportType: n4 }, i3.addTrace(Gi.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(u3, { transportType: n4 });
        } catch (h4) {
          throw i3.setError(Wi.subscribe_authenticated_session_topic_failure), h4;
        }
        i3.addTrace(Gi.subscribe_authenticated_session_topic_success), await this.client.session.set(u3, m3), i3.addTrace(Gi.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: r3.pairingTopic, metadata: r3.requester.metadata });
      }
      i3.addTrace(Gi.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: l5, id: e2, result: { cacaos: s2, responder: { publicKey: c5, metadata: this.client.metadata } }, encodeOpts: p5, throwOnFailedPublish: true, appLink: this.getAppLinkIfEnabled(r3.requester.metadata, n4) });
      } catch (h4) {
        throw i3.setError(Wi.authenticated_session_approve_publish_failure), h4;
      }
      return await this.client.auth.requests.delete(e2, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: r3.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i3.eventId }), { session: m3 };
    }, this.rejectSessionAuthenticate = async (t) => {
      this.isInitialized();
      const { id: e2, reason: s2 } = t, i3 = this.getPendingAuthRequest(e2);
      if (!i3) throw new Error(`Could not find pending auth request with id ${e2}`);
      i3.transportType === D3.relay && await this.confirmOnlineStateOrThrow();
      const r3 = i3.requester.publicKey, n4 = await this.client.core.crypto.generateKeyPair(), o5 = Sr2(r3), c5 = { type: D2, receiverPublicKey: r3, senderPublicKey: n4 };
      await this.sendError({ id: e2, topic: o5, error: s2, encodeOpts: c5, rpcOpts: T4.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i3.requester.metadata, i3.transportType) }), await this.client.auth.requests.delete(e2, { message: "rejected", code: 0 }), await this.deleteProposal(e2);
    }, this.formatAuthMessage = (t) => {
      this.isInitialized();
      const { request: e2, iss: s2 } = t;
      return pt(e2, s2);
    }, this.processRelayMessageCache = () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0; ) try {
          const t = this.relayMessageCache.shift();
          t && await this.onRelayMessage(t);
        } catch (t) {
          this.client.logger.error(t);
        }
      }, 50);
    }, this.cleanupDuplicatePairings = async (t) => {
      if (t.pairingTopic) try {
        const e2 = this.client.core.pairing.pairings.get(t.pairingTopic), s2 = this.client.core.pairing.pairings.getAll().filter((i3) => i3.peerMetadata?.url && i3.peerMetadata?.url === t.peer.metadata.url && i3.topic && i3.topic !== e2.topic);
        if (s2.length === 0) return;
        this.client.logger.info(`Cleaning up ${s2.length} duplicate pairing(s)`), await Promise.all(s2.map((i3) => this.client.core.pairing.disconnect({ topic: i3.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
      } catch (e2) {
        this.client.logger.error(e2);
      }
    }, this.deleteSession = async (t) => {
      const { topic: e2, expirerHasDeleted: s2 = false, emitEvent: i3 = true, id: r3 = 0 } = t, { self: n4 } = this.client.session.get(e2);
      await this.client.core.relayer.unsubscribe(e2), await this.client.session.delete(e2, $2("USER_DISCONNECTED")), this.addToRecentlyDeleted(e2, "session"), this.client.core.crypto.keychain.has(n4.publicKey) && await this.client.core.crypto.deleteKeyPair(n4.publicKey), this.client.core.crypto.keychain.has(e2) && await this.client.core.crypto.deleteSymKey(e2), s2 || this.client.core.expirer.del(e2), this.client.core.storage.removeItem(Ce5).catch((o5) => this.client.logger.warn(o5)), e2 === this.sessionRequestQueue.queue[0]?.topic && (this.sessionRequestQueue.state = V3.idle), await Promise.all(this.getPendingSessionRequests().filter((o5) => o5.topic === e2).map((o5) => this.deletePendingSessionRequest(o5.id, $2("USER_DISCONNECTED")))), i3 && this.client.events.emit("session_delete", { id: r3, topic: e2 });
    }, this.deleteProposal = async (t, e2) => {
      if (e2) try {
        const s2 = this.client.proposal.get(t);
        this.client.core.eventClient.getEvent({ topic: s2.pairingTopic })?.setError(Fi.proposal_expired);
      } catch {
      }
      await Promise.all([this.client.proposal.delete(t, $2("USER_DISCONNECTED")), e2 ? Promise.resolve() : this.client.core.expirer.del(t)]), this.addToRecentlyDeleted(t, "proposal");
    }, this.deletePendingSessionRequest = async (t, e2, s2 = false) => {
      await Promise.all([this.client.pendingRequest.delete(t, e2), s2 ? Promise.resolve() : this.client.core.expirer.del(t)]), this.addToRecentlyDeleted(t, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i3) => i3.id !== t), s2 && (this.sessionRequestQueue.state = V3.idle, this.client.events.emit("session_request_expire", { id: t }));
    }, this.deletePendingAuthRequest = async (t, e2, s2 = false) => {
      await Promise.all([this.client.auth.requests.delete(t, e2), s2 ? Promise.resolve() : this.client.core.expirer.del(t)]);
    }, this.setExpiry = async (t, e2) => {
      this.client.session.keys.includes(t) && (this.client.core.expirer.set(t, e2), await this.client.session.update(t, { expiry: e2 }));
    }, this.setProposal = async (t, e2) => {
      this.client.core.expirer.set(t, Hn2(T4.wc_sessionPropose.req.ttl)), await this.client.proposal.set(t, e2);
    }, this.setAuthRequest = async (t, e2) => {
      const { request: s2, pairingTopic: i3, transportType: r3 = D3.relay } = e2;
      this.client.core.expirer.set(t, s2.expiryTimestamp), await this.client.auth.requests.set(t, { authPayload: s2.authPayload, requester: s2.requester, expiryTimestamp: s2.expiryTimestamp, id: t, pairingTopic: i3, verifyContext: s2.verifyContext, transportType: r3 });
    }, this.setPendingSessionRequest = async (t) => {
      const { id: e2, topic: s2, params: i3, verifyContext: r3 } = t, n4 = i3.request.expiryTimestamp || Hn2(T4.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(e2, n4), await this.client.pendingRequest.set(e2, { id: e2, topic: s2, params: i3, verifyContext: r3 });
    }, this.sendRequest = async (t) => {
      const { topic: e2, method: s2, params: i3, expiry: r3, relayRpcId: n4, clientRpcId: o5, throwOnFailedPublish: c5, appLink: l5, tvf: p5, publishOpts: g5 = {} } = t, y7 = formatJsonRpcRequest(s2, i3, o5);
      let u3;
      const m3 = !!l5;
      try {
        const _3 = m3 ? ee2 : S2;
        u3 = await this.client.core.crypto.encode(e2, y7, { encoding: _3 });
      } catch (_3) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${e2} failed`), _3;
      }
      let h4;
      if (ot2.includes(s2)) {
        const _3 = Or2(JSON.stringify(y7)), S5 = Or2(u3);
        h4 = await this.client.core.verify.register({ id: S5, decryptedId: _3 });
      }
      const w6 = { ...T4[s2].req, ...g5 };
      if (w6.attestation = h4, r3 && (w6.ttl = r3), n4 && (w6.id = n4), this.client.core.history.set(e2, y7), m3) {
        const _3 = Dr2(l5, e2, u3);
        await global.Linking.openURL(_3, this.client.name);
      } else w6.tvf = { ...p5, correlationId: y7.id }, c5 ? (w6.internal = { ...w6.internal, throwOnFailedPublish: true }, await this.client.core.relayer.publish(e2, u3, w6)) : this.client.core.relayer.publish(e2, u3, w6).catch((_3) => this.client.logger.error(_3));
      return y7.id;
    }, this.sendProposeSession = async (t) => {
      const { proposal: e2, publishOpts: s2 } = t, i3 = formatJsonRpcRequest("wc_sessionPropose", e2, e2.id);
      this.client.core.history.set(e2.pairingTopic, i3);
      const r3 = await this.client.core.crypto.encode(e2.pairingTopic, i3, { encoding: S2 }), n4 = Or2(JSON.stringify(i3)), o5 = Or2(r3), c5 = await this.client.core.verify.register({ id: o5, decryptedId: n4 });
      await this.client.core.relayer.publishCustom({ payload: { pairingTopic: e2.pairingTopic, sessionProposal: r3 }, opts: { ...s2, publishMethod: "wc_proposeSession", attestation: c5 } });
    }, this.sendApproveSession = async (t) => {
      const { sessionTopic: e2, pairingProposalResponse: s2, proposal: i3, sessionSettleRequest: r3, publishOpts: n4 } = t, o5 = formatJsonRpcResult(i3.id, s2), c5 = await this.client.core.crypto.encode(i3.pairingTopic, o5, { encoding: S2 }), l5 = formatJsonRpcRequest("wc_sessionSettle", r3, n4?.id), p5 = await this.client.core.crypto.encode(e2, l5, { encoding: S2 });
      this.client.core.history.set(e2, l5), await this.client.core.relayer.publishCustom({ payload: { sessionTopic: e2, pairingTopic: i3.pairingTopic, sessionProposalResponse: c5, sessionSettlementRequest: p5 }, opts: { ...n4, publishMethod: "wc_approveSession" } });
    }, this.sendResult = async (t) => {
      const { id: e2, topic: s2, result: i3, throwOnFailedPublish: r3, encodeOpts: n4, appLink: o5 } = t, c5 = formatJsonRpcResult(e2, i3);
      let l5;
      const p5 = o5 && typeof global?.Linking < "u";
      try {
        const u3 = p5 ? ee2 : S2;
        l5 = await this.client.core.crypto.encode(s2, c5, { ...n4 || {}, encoding: u3 });
      } catch (u3) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${s2} failed`), u3;
      }
      let g5, y7;
      try {
        g5 = await this.client.core.history.get(s2, e2);
        const u3 = g5.request;
        try {
          y7 = this.getTVFParams(e2, u3.params, i3);
        } catch (m3) {
          this.client.logger.warn(`sendResult() -> getTVFParams() failed: ${m3?.message}`);
        }
      } catch (u3) {
        throw this.client.logger.error(`sendResult() -> history.get(${s2}, ${e2}) failed`), u3;
      }
      if (p5) {
        const u3 = Dr2(o5, s2, l5);
        await global.Linking.openURL(u3, this.client.name);
      } else {
        const u3 = g5.request.method, m3 = T4[u3].res;
        m3.tvf = { ...y7, correlationId: e2 }, r3 ? (m3.internal = { ...m3.internal, throwOnFailedPublish: true }, await this.client.core.relayer.publish(s2, l5, m3)) : this.client.core.relayer.publish(s2, l5, m3).catch((h4) => this.client.logger.error(h4));
      }
      await this.client.core.history.resolve(c5);
    }, this.sendError = async (t) => {
      const { id: e2, topic: s2, error: i3, encodeOpts: r3, rpcOpts: n4, appLink: o5 } = t, c5 = formatJsonRpcError(e2, i3);
      let l5;
      const p5 = o5 && typeof global?.Linking < "u";
      try {
        const y7 = p5 ? ee2 : S2;
        l5 = await this.client.core.crypto.encode(s2, c5, { ...r3 || {}, encoding: y7 });
      } catch (y7) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${s2} failed`), y7;
      }
      let g5;
      try {
        g5 = await this.client.core.history.get(s2, e2);
      } catch (y7) {
        throw this.client.logger.error(`sendError() -> history.get(${s2}, ${e2}) failed`), y7;
      }
      if (p5) {
        const y7 = Dr2(o5, s2, l5);
        await global.Linking.openURL(y7, this.client.name);
      } else {
        const y7 = g5.request.method, u3 = n4 || T4[y7].res;
        this.client.core.relayer.publish(s2, l5, u3);
      }
      await this.client.core.history.resolve(c5);
    }, this.cleanup = async () => {
      const t = [], e2 = [];
      this.client.session.getAll().forEach((s2) => {
        let i3 = false;
        Bn2(s2.expiry) && (i3 = true), this.client.core.crypto.keychain.has(s2.topic) || (i3 = true), i3 && t.push(s2.topic);
      }), this.client.proposal.getAll().forEach((s2) => {
        Bn2(s2.expiryTimestamp) && e2.push(s2.id);
      }), await Promise.all([...t.map((s2) => this.deleteSession({ topic: s2 })), ...e2.map((s2) => this.deleteProposal(s2))]);
    }, this.onProviderMessageEvent = async (t) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(t) : await this.onRelayMessage(t);
    }, this.onRelayEventRequest = async (t) => {
      this.requestQueue.queue.push(t), await this.processRequestsQueue();
    }, this.processRequestsQueue = async () => {
      if (this.requestQueue.state === V3.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = V3.active;
        const t = this.requestQueue.queue.shift();
        if (t) try {
          await this.processRequest(t);
        } catch (e2) {
          this.client.logger.warn(e2);
        }
      }
      this.requestQueue.state = V3.idle;
    }, this.processRequest = async (t) => {
      const { topic: e2, payload: s2, attestation: i3, transportType: r3, encryptedId: n4 } = t, o5 = s2.method;
      if (!this.shouldIgnorePairingRequest({ topic: e2, requestMethod: o5 })) switch (o5) {
        case "wc_sessionPropose":
          return await this.onSessionProposeRequest({ topic: e2, payload: s2, attestation: i3, encryptedId: n4 });
        case "wc_sessionSettle":
          return await this.onSessionSettleRequest(e2, s2);
        case "wc_sessionUpdate":
          return await this.onSessionUpdateRequest(e2, s2);
        case "wc_sessionExtend":
          return await this.onSessionExtendRequest(e2, s2);
        case "wc_sessionPing":
          return await this.onSessionPingRequest(e2, s2);
        case "wc_sessionDelete":
          return await this.onSessionDeleteRequest(e2, s2);
        case "wc_sessionRequest":
          return await this.onSessionRequest({ topic: e2, payload: s2, attestation: i3, encryptedId: n4, transportType: r3 });
        case "wc_sessionEvent":
          return await this.onSessionEventRequest(e2, s2);
        case "wc_sessionAuthenticate":
          return await this.onSessionAuthenticateRequest({ topic: e2, payload: s2, attestation: i3, encryptedId: n4, transportType: r3 });
        default:
          return this.client.logger.info(`Unsupported request method ${o5}`);
      }
    }, this.onRelayEventResponse = async (t) => {
      const { topic: e2, payload: s2, transportType: i3 } = t, r3 = (await this.client.core.history.get(e2, s2.id)).request.method;
      switch (r3) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(e2, s2, i3);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(e2, s2);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(e2, s2);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(e2, s2);
        case "wc_sessionPing":
          return this.onSessionPingResponse(e2, s2);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(e2, s2);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(e2, s2);
        default:
          return this.client.logger.info(`Unsupported response method ${r3}`);
      }
    }, this.onRelayEventUnknownPayload = (t) => {
      const { topic: e2 } = t, { message: s2 } = N10("MISSING_OR_INVALID", `Decoded payload on topic ${e2} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(s2);
    }, this.shouldIgnorePairingRequest = (t) => {
      const { topic: e2, requestMethod: s2 } = t, i3 = this.expectedPairingMethodMap.get(e2);
      return !i3 || i3.includes(s2) ? false : !!(i3.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }, this.onSessionProposeRequest = async (t) => {
      const { topic: e2, payload: s2, attestation: i3, encryptedId: r3 } = t, { params: n4, id: o5 } = s2;
      try {
        const c5 = this.client.core.eventClient.getEvent({ topic: e2 });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), c5?.setError(O3.proposal_listener_not_found)), this.isValidConnect({ ...s2.params });
        const l5 = n4.expiryTimestamp || Hn2(T4.wc_sessionPropose.req.ttl), p5 = { id: o5, pairingTopic: e2, expiryTimestamp: l5, attestation: i3, encryptedId: r3, ...n4 };
        await this.setProposal(o5, p5);
        const g5 = await this.getVerifyContext({ attestationId: i3, hash: Or2(JSON.stringify(s2)), encryptedId: r3, metadata: p5.proposer.metadata });
        c5?.addTrace(x6.emit_session_proposal), this.client.events.emit("session_proposal", { id: o5, params: p5, verifyContext: g5 });
      } catch (c5) {
        await this.sendError({ id: o5, topic: e2, error: c5, rpcOpts: T4.wc_sessionPropose.autoReject }), this.client.logger.error(c5);
      }
    }, this.onSessionProposeResponse = async (t, e2, s2) => {
      const { id: i3 } = e2;
      if (isJsonRpcResult(e2)) {
        const { result: r3 } = e2;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: r3 });
        const n4 = this.client.proposal.get(i3);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: n4 });
        const o5 = n4.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: o5 });
        const c5 = r3.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: c5 });
        const l5 = await this.client.core.crypto.generateSharedKey(o5, c5);
        this.pendingSessions.set(i3, { sessionTopic: l5, pairingTopic: t, proposalId: i3, publicKey: o5 });
        const p5 = await this.client.core.relayer.subscribe(l5, { transportType: s2 });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: p5 }), await this.client.core.pairing.activate({ topic: t });
      } else if (isJsonRpcError(e2)) {
        await this.deleteProposal(i3);
        const r3 = Wn2("session_connect", i3);
        if (this.events.listenerCount(r3) === 0) throw new Error(`emitting ${r3} without any listeners, 954`);
        this.events.emit(r3, { error: e2.error });
      }
    }, this.onSessionSettleRequest = async (t, e2) => {
      const { id: s2, params: i3 } = e2;
      try {
        this.isValidSessionSettleRequest(i3);
        const { relay: r3, controller: n4, expiry: o5, namespaces: c5, sessionProperties: l5, scopedProperties: p5, sessionConfig: g5, proposalRequestsResponses: y7 } = e2.params, u3 = [...this.pendingSessions.values()].find((w6) => w6.sessionTopic === t);
        if (!u3) return this.client.logger.error(`Pending session not found for topic ${t}`);
        const m3 = this.client.proposal.get(u3.proposalId), h4 = { topic: t, relay: r3, expiry: o5, namespaces: c5, acknowledged: true, pairingTopic: u3.pairingTopic, requiredNamespaces: m3.requiredNamespaces, optionalNamespaces: m3.optionalNamespaces, controller: n4.publicKey, self: { publicKey: u3.publicKey, metadata: this.client.metadata }, peer: { publicKey: n4.publicKey, metadata: n4.metadata }, ...l5 && { sessionProperties: l5 }, ...p5 && { scopedProperties: p5 }, ...g5 && { sessionConfig: g5 }, transportType: D3.relay, authentication: y7?.authentication, walletPayResult: y7?.walletPay };
        await this.client.session.set(h4.topic, h4), await this.setExpiry(h4.topic, h4.expiry), await this.client.core.pairing.updateMetadata({ topic: u3.pairingTopic, metadata: h4.peer.metadata }), this.pendingSessions.delete(u3.proposalId), this.deleteProposal(u3.proposalId, false), this.cleanupDuplicatePairings(h4), await this.sendResult({ id: e2.id, topic: t, throwOnFailedPublish: true, result: true }), this.client.events.emit("session_connect", { session: h4 }), this.events.emit(Wn2("session_connect", u3.proposalId), { session: h4 });
      } catch (r3) {
        await this.sendError({ id: s2, topic: t, error: r3 }), this.client.logger.error(r3);
      }
    }, this.onSessionSettleResponse = async (t, e2) => {
      const { id: s2 } = e2;
      isJsonRpcResult(e2) ? (await this.client.session.update(t, { acknowledged: true }), this.events.emit(Wn2("session_approve", s2), {})) : isJsonRpcError(e2) && (await this.deleteSession({ topic: t, emitEvent: false }), this.events.emit(Wn2("session_approve", s2), { error: e2.error }));
    }, this.onSessionUpdateRequest = async (t, e2) => {
      const { params: s2, id: i3 } = e2;
      try {
        const r3 = `${t}_session_update`, n4 = po2.get(r3);
        if (n4 && this.isRequestOutOfSync(n4, i3)) {
          this.client.logger.warn(`Discarding out of sync request - ${i3}`), this.sendError({ id: i3, topic: t, error: $2("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate({ topic: t, ...s2 });
        try {
          po2.set(r3, i3), await this.client.session.update(t, { namespaces: s2.namespaces }), await this.sendResult({ id: i3, topic: t, result: true });
        } catch (o5) {
          throw po2.delete(r3), o5;
        }
        this.client.events.emit("session_update", { id: i3, topic: t, params: s2 });
      } catch (r3) {
        await this.sendError({ id: i3, topic: t, error: r3 }), this.client.logger.error(r3);
      }
    }, this.isRequestOutOfSync = (t, e2) => e2.toString().slice(0, -3) < t.toString().slice(0, -3), this.onSessionUpdateResponse = (t, e2) => {
      const { id: s2 } = e2, i3 = Wn2("session_update", s2);
      if (this.events.listenerCount(i3) === 0) throw new Error(`emitting ${i3} without any listeners`);
      isJsonRpcResult(e2) ? this.events.emit(Wn2("session_update", s2), {}) : isJsonRpcError(e2) && this.events.emit(Wn2("session_update", s2), { error: e2.error });
    }, this.onSessionExtendRequest = async (t, e2) => {
      const { id: s2 } = e2;
      try {
        this.isValidExtend({ topic: t }), await this.setExpiry(t, Hn2(Z3)), await this.sendResult({ id: s2, topic: t, result: true }), this.client.events.emit("session_extend", { id: s2, topic: t });
      } catch (i3) {
        await this.sendError({ id: s2, topic: t, error: i3 }), this.client.logger.error(i3);
      }
    }, this.onSessionExtendResponse = (t, e2) => {
      const { id: s2 } = e2, i3 = Wn2("session_extend", s2);
      if (this.events.listenerCount(i3) === 0) throw new Error(`emitting ${i3} without any listeners`);
      isJsonRpcResult(e2) ? this.events.emit(Wn2("session_extend", s2), {}) : isJsonRpcError(e2) && this.events.emit(Wn2("session_extend", s2), { error: e2.error });
    }, this.onSessionPingRequest = async (t, e2) => {
      const { id: s2 } = e2;
      try {
        this.isValidPing({ topic: t }), await this.sendResult({ id: s2, topic: t, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_ping", { id: s2, topic: t });
      } catch (i3) {
        await this.sendError({ id: s2, topic: t, error: i3 }), this.client.logger.error(i3);
      }
    }, this.onSessionPingResponse = (t, e2) => {
      const { id: s2 } = e2, i3 = Wn2("session_ping", s2);
      setTimeout(() => {
        if (this.events.listenerCount(i3) === 0) throw new Error(`emitting ${i3} without any listeners 2176`);
        isJsonRpcResult(e2) ? this.events.emit(Wn2("session_ping", s2), {}) : isJsonRpcError(e2) && this.events.emit(Wn2("session_ping", s2), { error: e2.error });
      }, 500);
    }, this.onSessionDeleteRequest = async (t, e2) => {
      const { id: s2 } = e2;
      try {
        await this.isValidDisconnect({ topic: t, reason: e2.params }), this.cleanupPendingSentRequestsForTopic({ topic: t, error: $2("USER_DISCONNECTED") }), await this.deleteSession({ topic: t, id: s2 });
      } catch (i3) {
        this.client.logger.error(i3);
      }
    }, this.onSessionRequest = async (t) => {
      const { topic: e2, payload: s2, attestation: i3, encryptedId: r3, transportType: n4 } = t, { id: o5, params: c5 } = s2;
      try {
        await this.isValidRequest({ topic: e2, ...c5 });
        const l5 = this.client.session.get(e2), p5 = await this.getVerifyContext({ attestationId: i3, hash: Or2(JSON.stringify(formatJsonRpcRequest("wc_sessionRequest", c5, o5))), encryptedId: r3, metadata: l5.peer.metadata, transportType: n4 }), g5 = { id: o5, topic: e2, params: c5, verifyContext: p5 };
        await this.setPendingSessionRequest(g5), n4 === D3.link_mode && l5.peer.metadata.redirect?.universal && this.client.core.addLinkModeSupportedApp(l5.peer.metadata.redirect?.universal), this.client.signConfig?.disableRequestQueue ? this.emitSessionRequest(g5) : (this.addSessionRequestToSessionRequestQueue(g5), this.processSessionRequestQueue());
      } catch (l5) {
        await this.sendError({ id: o5, topic: e2, error: l5 }), this.client.logger.error(l5);
      }
    }, this.onSessionRequestResponse = (t, e2) => {
      const { id: s2 } = e2, i3 = Wn2("session_request", s2);
      if (this.events.listenerCount(i3) === 0) throw new Error(`emitting ${i3} without any listeners`);
      isJsonRpcResult(e2) ? this.events.emit(Wn2("session_request", s2), { result: e2.result }) : isJsonRpcError(e2) && this.events.emit(Wn2("session_request", s2), { error: e2.error });
    }, this.onSessionEventRequest = async (t, e2) => {
      const { id: s2, params: i3 } = e2;
      try {
        const r3 = `${t}_session_event_${i3.event.name}`, n4 = po2.get(r3);
        if (n4 && this.isRequestOutOfSync(n4, s2)) {
          this.client.logger.info(`Discarding out of sync request - ${s2}`);
          return;
        }
        this.isValidEmit({ topic: t, ...i3 }), this.client.events.emit("session_event", { id: s2, topic: t, params: i3 }), po2.set(r3, s2);
      } catch (r3) {
        await this.sendError({ id: s2, topic: t, error: r3 }), this.client.logger.error(r3);
      }
    }, this.onSessionAuthenticateResponse = (t, e2) => {
      const { id: s2 } = e2;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: t, payload: e2 }), isJsonRpcResult(e2) ? this.events.emit(Wn2("session_request", s2), { result: e2.result }) : isJsonRpcError(e2) && this.events.emit(Wn2("session_request", s2), { error: e2.error });
    }, this.onSessionAuthenticateRequest = async (t) => {
      const { topic: e2, payload: s2, attestation: i3, encryptedId: r3, transportType: n4 } = t;
      try {
        const { requester: o5, authPayload: c5, expiryTimestamp: l5 } = s2.params, p5 = await this.getVerifyContext({ attestationId: i3, hash: Or2(JSON.stringify(s2)), encryptedId: r3, metadata: o5.metadata, transportType: n4 }), g5 = { requester: o5, pairingTopic: e2, id: s2.id, authPayload: c5, verifyContext: p5, expiryTimestamp: l5 };
        await this.setAuthRequest(s2.id, { request: g5, pairingTopic: e2, transportType: n4 }), n4 === D3.link_mode && o5.metadata.redirect?.universal && this.client.core.addLinkModeSupportedApp(o5.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: e2, params: s2.params, id: s2.id, verifyContext: p5 });
      } catch (o5) {
        this.client.logger.error(o5);
        const c5 = s2.params.requester.publicKey, l5 = await this.client.core.crypto.generateKeyPair(), p5 = this.getAppLinkIfEnabled(s2.params.requester.metadata, n4), g5 = { type: D2, receiverPublicKey: c5, senderPublicKey: l5 };
        await this.sendError({ id: s2.id, topic: e2, error: o5, encodeOpts: g5, rpcOpts: T4.wc_sessionAuthenticate.autoReject, appLink: p5 });
      }
    }, this.addSessionRequestToSessionRequestQueue = (t) => {
      this.sessionRequestQueue.queue.push(t);
    }, this.cleanupAfterResponse = (t) => {
      this.deletePendingSessionRequest(t.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = V3.idle, this.processSessionRequestQueue();
      }, (0, import_time5.toMiliseconds)(this.requestQueueDelay));
    }, this.cleanupPendingSentRequestsForTopic = ({ topic: t, error: e2 }) => {
      const s2 = this.client.core.history.pending;
      s2.length > 0 && s2.filter((i3) => i3.topic === t && i3.request.method === "wc_sessionRequest").forEach((i3) => {
        this.events.emit(Wn2("session_request", i3.request.id), { error: e2 });
      });
    }, this.processSessionRequestQueue = () => {
      if (this.sessionRequestQueue.state === V3.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const t = this.sessionRequestQueue.queue[0];
      if (!t) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.emitSessionRequest(t);
      } catch (e2) {
        this.client.logger.error(e2);
      }
    }, this.emitSessionRequest = (t) => {
      if (this.emittedSessionRequests.has(t.id)) {
        this.client.logger.warn({ id: t.id }, `Skipping emitting \`session_request\` event for duplicate request. id: ${t.id}`);
        return;
      }
      this.sessionRequestQueue.state = V3.active, this.emittedSessionRequests.add(t.id), this.client.events.emit("session_request", t);
    }, this.cleanupInProgress = false, this.cleanupOrphanedSubscriptions = async () => {
      const t = this.client.core.relayer.subscriber.topics;
      if (t.length === 0) return;
      const e2 = new Set(this.client.session.keys), s2 = new Set(this.client.core.pairing.pairings.keys), i3 = new Set([...this.pendingSessions.values()].map((n4) => n4.sessionTopic));
      let r3;
      if (this.client.auth.authKeys.keys.includes($3)) {
        const { responseTopic: n4 } = this.client.auth.authKeys.get($3);
        r3 = n4;
      }
      for (const n4 of t) if (!e2.has(n4) && !s2.has(n4) && !i3.has(n4) && n4 !== r3) {
        this.client.logger.info(`Cleaning up orphaned subscriber topic: ${n4}`);
        try {
          await this.client.core.relayer.subscriber.unsubscribe(n4);
        } catch (o5) {
          this.client.logger.warn(o5, `Failed to clean up orphaned subscription: ${n4}`);
        }
      }
    }, this.onPairingCreated = (t) => {
      if (t.methods && this.expectedPairingMethodMap.set(t.topic, t.methods), t.active) return;
      const e2 = this.client.proposal.getAll().find((s2) => s2.pairingTopic === t.topic);
      e2 && this.onSessionProposeRequest({ topic: t.topic, payload: formatJsonRpcRequest("wc_sessionPropose", { ...e2, requiredNamespaces: e2.requiredNamespaces, optionalNamespaces: e2.optionalNamespaces, relays: e2.relays, proposer: e2.proposer, sessionProperties: e2.sessionProperties, scopedProperties: e2.scopedProperties }, e2.id), attestation: e2.attestation, encryptedId: e2.encryptedId });
    }, this.isValidConnect = async (t) => {
      if (!Xr2(t)) {
        const { message: c5 } = N10("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(t)}`);
        throw new Error(c5);
      }
      const { pairingTopic: e2, requiredNamespaces: s2, optionalNamespaces: i3, sessionProperties: r3, scopedProperties: n4, relays: o5 } = t;
      if (R2(e2) || await this.isValidPairingTopic(e2), !Yr2(o5, true)) {
        const { message: c5 } = N10("MISSING_OR_INVALID", `connect() relays: ${o5}`);
        throw new Error(c5);
      }
      if (s2 && !R2(s2) && re2(s2) !== 0) {
        const c5 = "requiredNamespaces are deprecated and are automatically assigned to optionalNamespaces";
        ["fatal", "error", "silent"].includes(this.client.logger.level) ? console.warn(c5) : this.client.logger.warn(c5), this.validateNamespaces(s2, "requiredNamespaces");
      }
      if (i3 && !R2(i3) && re2(i3) !== 0 && this.validateNamespaces(i3, "optionalNamespaces"), r3 && !R2(r3) && this.validateSessionProps(r3, "sessionProperties"), n4 && !R2(n4)) {
        this.validateSessionProps(n4, "scopedProperties");
        const c5 = Object.keys(s2 || {}).concat(Object.keys(i3 || {}));
        if (!Object.keys(n4).every((l5) => c5.includes(l5.split(":")[0]))) throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(n4)}, required/optional namespaces: ${JSON.stringify(c5)}`);
      }
    }, this.validateNamespaces = (t, e2) => {
      const s2 = Gr2(t, "connect()", e2);
      if (s2) throw new Error(s2.message);
    }, this.isValidApprove = async (t) => {
      if (!Xr2(t)) throw new Error(N10("MISSING_OR_INVALID", `approve() params: ${t}`).message);
      const { id: e2, namespaces: s2, relayProtocol: i3, sessionProperties: r3, scopedProperties: n4 } = t;
      this.checkRecentlyDeleted(e2), await this.isValidProposalId(e2);
      const o5 = this.client.proposal.get(e2), c5 = Ft2(s2, "approve()");
      if (c5) throw new Error(c5.message);
      const l5 = Ht2(o5.requiredNamespaces, s2, "approve()");
      if (l5) throw new Error(l5.message);
      if (!E3(i3, true)) {
        const { message: p5 } = N10("MISSING_OR_INVALID", `approve() relayProtocol: ${i3}`);
        throw new Error(p5);
      }
      if (r3 && !R2(r3) && this.validateSessionProps(r3, "sessionProperties"), n4 && !R2(n4)) {
        this.validateSessionProps(n4, "scopedProperties");
        const p5 = new Set(Object.keys(s2));
        if (!Object.keys(n4).every((g5) => p5.has(g5.split(":")[0]))) throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(n4)}, approved namespaces: ${Array.from(p5).join(", ")}`);
      }
    }, this.isValidReject = async (t) => {
      if (!Xr2(t)) {
        const { message: i3 } = N10("MISSING_OR_INVALID", `reject() params: ${t}`);
        throw new Error(i3);
      }
      const { id: e2, reason: s2 } = t;
      if (this.checkRecentlyDeleted(e2), await this.isValidProposalId(e2), !Zr2(s2)) {
        const { message: i3 } = N10("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(s2)}`);
        throw new Error(i3);
      }
    }, this.isValidSessionSettleRequest = (t) => {
      if (!Xr2(t)) {
        const { message: c5 } = N10("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${t}`);
        throw new Error(c5);
      }
      const { relay: e2, controller: s2, namespaces: i3, expiry: r3 } = t;
      if (!qt2(e2)) {
        const { message: c5 } = N10("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(c5);
      }
      const n4 = zr2(s2, "onSessionSettleRequest()");
      if (n4) throw new Error(n4.message);
      const o5 = Ft2(i3, "onSessionSettleRequest()");
      if (o5) throw new Error(o5.message);
      if (Bn2(r3)) {
        const { message: c5 } = N10("EXPIRED", "onSessionSettleRequest()");
        throw new Error(c5);
      }
    }, this.isValidUpdate = async (t) => {
      if (!Xr2(t)) {
        const { message: o5 } = N10("MISSING_OR_INVALID", `update() params: ${t}`);
        throw new Error(o5);
      }
      const { topic: e2, namespaces: s2 } = t;
      this.checkRecentlyDeleted(e2), await this.isValidSessionTopic(e2);
      const i3 = this.client.session.get(e2), r3 = Ft2(s2, "update()");
      if (r3) throw new Error(r3.message);
      const n4 = Ht2(i3.requiredNamespaces, s2, "update()");
      if (n4) throw new Error(n4.message);
    }, this.isValidExtend = async (t) => {
      if (!Xr2(t)) {
        const { message: s2 } = N10("MISSING_OR_INVALID", `extend() params: ${t}`);
        throw new Error(s2);
      }
      const { topic: e2 } = t;
      this.checkRecentlyDeleted(e2), await this.isValidSessionTopic(e2);
    }, this.isValidRequest = async (t) => {
      if (!Xr2(t)) {
        const { message: o5 } = N10("MISSING_OR_INVALID", `request() params: ${t}`);
        throw new Error(o5);
      }
      const { topic: e2, request: s2, chainId: i3, expiry: r3 } = t;
      this.checkRecentlyDeleted(e2), await this.isValidSessionTopic(e2);
      const { namespaces: n4 } = this.client.session.get(e2);
      if (!ro2(n4, i3)) {
        const { message: o5 } = N10("MISSING_OR_INVALID", `request() chainId: ${i3}`);
        throw new Error(o5);
      }
      if (!eo2(s2)) {
        const { message: o5 } = N10("MISSING_OR_INVALID", `request() ${JSON.stringify(s2)}`);
        throw new Error(o5);
      }
      if (!oo2(n4, i3, s2.method)) {
        const { message: o5 } = N10("MISSING_OR_INVALID", `request() method: ${s2.method}`);
        throw new Error(o5);
      }
      this.validateRequestExpiry(r3);
    }, this.isValidRespond = async (t) => {
      if (!Xr2(t)) {
        const { message: r3 } = N10("MISSING_OR_INVALID", `respond() params: ${t}`);
        throw new Error(r3);
      }
      const { topic: e2, response: s2 } = t;
      try {
        await this.isValidSessionTopic(e2);
      } catch (r3) {
        throw t?.response?.id && this.cleanupAfterResponse(t), r3;
      }
      if (!to2(s2)) {
        const { message: r3 } = N10("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(s2)}`);
        throw new Error(r3);
      }
      const i3 = this.client.pendingRequest.get(s2.id);
      if (i3.topic !== e2) {
        const { message: r3 } = N10("MISMATCHED_TOPIC", `Request response topic mismatch. reqId: ${s2.id}, expected topic: ${i3.topic}, received topic: ${e2}`);
        throw new Error(r3);
      }
    }, this.isValidPing = async (t) => {
      if (!Xr2(t)) {
        const { message: s2 } = N10("MISSING_OR_INVALID", `ping() params: ${t}`);
        throw new Error(s2);
      }
      const { topic: e2 } = t;
      await this.isValidSessionOrPairingTopic(e2);
    }, this.isValidEmit = async (t) => {
      if (!Xr2(t)) {
        const { message: n4 } = N10("MISSING_OR_INVALID", `emit() params: ${t}`);
        throw new Error(n4);
      }
      const { topic: e2, event: s2, chainId: i3 } = t;
      await this.isValidSessionTopic(e2);
      const { namespaces: r3 } = this.client.session.get(e2);
      if (!ro2(r3, i3)) {
        const { message: n4 } = N10("MISSING_OR_INVALID", `emit() chainId: ${i3}`);
        throw new Error(n4);
      }
      if (!no2(s2)) {
        const { message: n4 } = N10("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s2)}`);
        throw new Error(n4);
      }
      if (!so2(r3, i3, s2.name)) {
        const { message: n4 } = N10("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s2)}`);
        throw new Error(n4);
      }
    }, this.isValidDisconnect = async (t) => {
      if (!Xr2(t)) {
        const { message: s2 } = N10("MISSING_OR_INVALID", `disconnect() params: ${t}`);
        throw new Error(s2);
      }
      const { topic: e2 } = t;
      await this.isValidSessionOrPairingTopic(e2);
    }, this.isValidAuthenticate = (t) => {
      const { chains: e2, uri: s2, domain: i3, nonce: r3 } = t;
      if (!Array.isArray(e2) || e2.length === 0) throw new Error("chains is required and must be a non-empty array");
      if (!E3(s2, false)) throw new Error("uri is required parameter");
      if (!E3(i3, false)) throw new Error("domain is required parameter");
      if (!E3(r3, false)) throw new Error("nonce is required parameter");
      if ([...new Set(e2.map((o5) => ae2(o5).namespace))].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: n4 } = ae2(e2[0]);
      if (n4 !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }, this.getVerifyContext = async (t) => {
      const { attestationId: e2, hash: s2, encryptedId: i3, metadata: r3, transportType: n4 } = t, o5 = { verified: { verifyUrl: r3.verifyUrl || Y3, validation: "UNKNOWN", origin: r3.url || "" } };
      try {
        if (n4 === D3.link_mode) {
          const l5 = this.getAppLinkIfEnabled(r3, n4);
          return o5.verified.validation = l5 && new URL(l5).origin === new URL(r3.url).origin ? "VALID" : "INVALID", o5;
        }
        const c5 = await this.client.core.verify.resolve({ attestationId: e2, hash: s2, encryptedId: i3, verifyUrl: r3.verifyUrl });
        c5 && (o5.verified.origin = c5.origin, o5.verified.isScam = c5.isScam, o5.verified.validation = c5.origin === new URL(r3.url).origin ? "VALID" : "INVALID");
      } catch (c5) {
        this.client.logger.warn(c5);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(o5)}`), o5;
    }, this.validateSessionProps = (t, e2) => {
      Object.values(t).forEach((s2, i3) => {
        if (s2 == null) {
          const { message: r3 } = N10("MISSING_OR_INVALID", `${e2} must contain an existing value for each key. Received: ${s2} for key ${Object.keys(t)[i3]}`);
          throw new Error(r3);
        }
      });
    }, this.getPendingAuthRequest = (t) => {
      const e2 = this.client.auth.requests.get(t);
      return typeof e2 == "object" ? e2 : void 0;
    }, this.addToRecentlyDeleted = (t, e2) => {
      if (this.recentlyDeletedMap.set(t, e2), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let s2 = 0;
        const i3 = this.recentlyDeletedLimit / 2;
        for (const r3 of this.recentlyDeletedMap.keys()) {
          if (s2++ >= i3) break;
          this.recentlyDeletedMap.delete(r3);
        }
      }
    }, this.checkRecentlyDeleted = (t) => {
      const e2 = this.recentlyDeletedMap.get(t);
      if (e2) {
        const { message: s2 } = N10("MISSING_OR_INVALID", `Record was recently deleted - ${e2}: ${t}`);
        throw new Error(s2);
      }
    }, this.isLinkModeEnabled = (t, e2) => !t || e2 !== D3.link_mode ? false : this.client.metadata?.redirect?.linkMode === true && this.client.metadata?.redirect?.universal !== void 0 && this.client.metadata?.redirect?.universal !== "" && t?.redirect?.universal !== void 0 && t?.redirect?.universal !== "" && t?.redirect?.linkMode === true && this.client.core.linkModeSupportedApps.includes(t.redirect.universal) && typeof global?.Linking < "u", this.getAppLinkIfEnabled = (t, e2) => this.isLinkModeEnabled(t, e2) ? t?.redirect?.universal : void 0, this.handleLinkModeMessage = ({ url: t }) => {
      if (!t || !t.includes("wc_ev") || !t.includes("topic")) return;
      const e2 = Gn2(t, "topic") || "", s2 = decodeURIComponent(Gn2(t, "wc_ev") || ""), i3 = this.client.session.keys.includes(e2);
      i3 && this.client.session.update(e2, { transportType: D3.link_mode }), this.client.core.dispatchEnvelope({ topic: e2, message: s2, sessionExists: i3 });
    }, this.registerLinkModeListeners = async () => {
      if (Qn2() || A2() && this.client.metadata.redirect?.linkMode) {
        const t = global?.Linking;
        if (typeof t < "u") {
          t.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const e2 = await t.getInitialURL();
          e2 && setTimeout(() => {
            this.handleLinkModeMessage({ url: e2 });
          }, 50);
        }
      }
    }, this.getTVFApproveParams = (t) => {
      try {
        const e2 = jt2(t.namespaces), s2 = Vr2(t.namespaces), i3 = Mr2(t.namespaces), r3 = t.sessionProperties, n4 = t.scopedProperties;
        return { approvedChains: e2, approvedMethods: s2, approvedEvents: i3, sessionProperties: r3, scopedProperties: n4 };
      } catch (e2) {
        return this.client.logger.warn(e2, "Error getting TVF approve params"), {};
      }
    }, this.getTVFParams = (t, e2, s2) => {
      if (!e2.request?.method) return {};
      const i3 = { correlationId: t, rpcMethods: [e2.request.method], chainId: e2.chainId };
      try {
        const r3 = this.extractTxHashesFromResult(e2.request, s2);
        i3.txHashes = r3, i3.contractAddresses = this.isValidContractData(e2.request.params) ? [e2.request.params?.[0]?.to] : [];
      } catch (r3) {
        this.client.logger.warn(r3, "Error getting TVF params");
      }
      return i3;
    }, this.isValidContractData = (t) => {
      if (!t) return false;
      try {
        const e2 = t?.data || t?.[0]?.data;
        if (!e2.startsWith("0x")) return false;
        const s2 = e2.slice(2);
        return /^[0-9a-fA-F]*$/.test(s2) ? s2.length % 2 === 0 : false;
      } catch {
      }
      return false;
    }, this.extractTxHashesFromResult = (t, e2) => {
      try {
        if (!e2) return [];
        const s2 = t.method, i3 = rt3[s2];
        if (s2 === "sui_signTransaction") return [rr2(e2.transactionBytes)];
        if (s2 === "near_signTransaction") return [or3(e2)];
        if (s2 === "near_signTransactions") return e2.map((n4) => or3(n4));
        if (s2 === "xrpl_signTransactionFor" || s2 === "xrpl_signTransaction") return [e2.tx_json?.hash];
        if (s2 === "polkadot_signTransaction") return [Eo2({ transaction: t.params.transactionPayload, signature: e2.signature })];
        if (s2 === "algo_signTxn") return B2(e2) ? e2.map((n4) => sr2(n4)) : [sr2(e2)];
        if (s2 === "cosmos_signDirect") return [ir2(e2)];
        if (s2 === "wallet_sendCalls") return cr2(e2);
        if (typeof e2 == "string") return [e2];
        const r3 = e2[i3.key];
        if (B2(r3)) return s2 === "solana_signAllTransactions" ? r3.map((n4) => nr2(n4)) : r3;
        if (typeof r3 == "string") return [r3];
      } catch (s2) {
        this.client.logger.warn(s2, "Error extracting tx hashes from result");
      }
      return [];
    };
  }
  async processPendingMessageEvents() {
    try {
      const a3 = this.client.session.keys, t = this.client.core.relayer.messages.getWithoutAck(a3);
      for (const [e2, s2] of Object.entries(t)) for (const i3 of s2) try {
        await this.onProviderMessageEvent({ topic: e2, message: i3, publishedAt: Date.now() });
      } catch {
        this.client.logger.warn(`Error processing pending message event for topic: ${e2}, message: ${i3}`);
      }
    } catch (a3) {
      this.client.logger.warn(a3, "processPendingMessageEvents failed");
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: a3 } = N10("NOT_INITIALIZED", this.name);
      throw new Error(a3);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(p3.message, (a3) => {
      this.onProviderMessageEvent(a3);
    });
  }
  async onRelayMessage(a3) {
    const { topic: t, message: e2, attestation: s2, transportType: i3 } = a3, { publicKey: r3 } = this.client.auth.authKeys.keys.includes($3) ? this.client.auth.authKeys.get($3) : { publicKey: void 0 };
    try {
      const n4 = await this.client.core.crypto.decode(t, e2, { receiverPublicKey: r3, encoding: i3 === D3.link_mode ? ee2 : S2 });
      isJsonRpcRequest(n4) ? (this.client.core.history.set(t, n4), await this.onRelayEventRequest({ topic: t, payload: n4, attestation: s2, transportType: i3, encryptedId: Or2(e2) })) : isJsonRpcResponse(n4) ? (await this.client.core.history.resolve(n4), await this.onRelayEventResponse({ topic: t, payload: n4, transportType: i3 }), this.client.core.history.delete(t, n4.id)) : (this.client.logger.error(`onRelayMessage() -> unknown payload: ${JSON.stringify(n4)}`), await this.onRelayEventUnknownPayload({ topic: t, payload: n4, transportType: i3 })), await this.client.core.relayer.messages.ack(t, e2);
    } catch (n4) {
      this.client.logger.error(`onRelayMessage() -> failed to process an inbound message: ${e2}`), this.client.logger.error(n4);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(P4.expired, async (a3) => {
      const { topic: t, id: e2 } = qn2(a3.target);
      if (e2 && this.client.pendingRequest.keys.includes(e2)) return await this.deletePendingSessionRequest(e2, N10("EXPIRED"), true);
      if (e2 && this.client.auth.requests.keys.includes(e2)) return await this.deletePendingAuthRequest(e2, N10("EXPIRED"), true);
      t ? this.client.session.keys.includes(t) && (await this.deleteSession({ topic: t, expirerHasDeleted: true }), this.client.events.emit("session_expire", { topic: t })) : e2 && (await this.deleteProposal(e2, true), this.client.events.emit("proposal_expire", { id: e2 }));
    });
  }
  registerSubscriptionCleanup() {
    this.client.core.heartbeat.on("heartbeat_pulse", async () => {
      if (!this.cleanupInProgress) {
        this.cleanupInProgress = true;
        try {
          await this.cleanupOrphanedSubscriptions();
        } catch (a3) {
          this.client.logger.warn(a3);
        } finally {
          this.cleanupInProgress = false;
        }
      }
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(q3.create, (a3) => this.onPairingCreated(a3)), this.client.core.pairing.events.on(q3.delete, (a3) => {
      this.addToRecentlyDeleted(a3.topic, "pairing");
    });
  }
  isValidPairingTopic(a3) {
    if (!E3(a3, false)) {
      const { message: t } = N10("MISSING_OR_INVALID", `pairing topic should be a string: ${a3}`);
      throw new Error(t);
    }
    if (!this.client.core.pairing.pairings.keys.includes(a3)) {
      const { message: t } = N10("NO_MATCHING_KEY", `pairing topic doesn't exist: ${a3}`);
      throw new Error(t);
    }
    if (Bn2(this.client.core.pairing.pairings.get(a3).expiry)) {
      const { message: t } = N10("EXPIRED", `pairing topic: ${a3}`);
      throw new Error(t);
    }
  }
  async isValidSessionTopic(a3) {
    if (!E3(a3, false)) {
      const { message: t } = N10("MISSING_OR_INVALID", `session topic should be a string: ${a3}`);
      throw new Error(t);
    }
    if (this.checkRecentlyDeleted(a3), !this.client.session.keys.includes(a3)) {
      const { message: t } = N10("NO_MATCHING_KEY", `session topic doesn't exist: ${a3}`);
      throw new Error(t);
    }
    if (Bn2(this.client.session.get(a3).expiry)) {
      await this.deleteSession({ topic: a3 });
      const { message: t } = N10("EXPIRED", `session topic: ${a3}`);
      throw new Error(t);
    }
    if (!this.client.core.crypto.keychain.has(a3)) {
      const { message: t } = N10("MISSING_OR_INVALID", `session topic does not exist in keychain: ${a3}`);
      throw await this.deleteSession({ topic: a3 }), new Error(t);
    }
  }
  async isValidSessionOrPairingTopic(a3) {
    if (this.checkRecentlyDeleted(a3), this.client.session.keys.includes(a3)) await this.isValidSessionTopic(a3);
    else if (this.client.core.pairing.pairings.keys.includes(a3)) this.isValidPairingTopic(a3);
    else if (E3(a3, false)) {
      const { message: t } = N10("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${a3}`);
      throw new Error(t);
    } else {
      const { message: t } = N10("MISSING_OR_INVALID", `session or pairing topic should be a string: ${a3}`);
      throw new Error(t);
    }
  }
  async isValidProposalId(a3) {
    if (!Qr2(a3)) {
      const { message: t } = N10("MISSING_OR_INVALID", `proposal id should be a number: ${a3}`);
      throw new Error(t);
    }
    if (!this.client.proposal.keys.includes(a3)) {
      const { message: t } = N10("NO_MATCHING_KEY", `proposal id doesn't exist: ${a3}`);
      throw new Error(t);
    }
    if (Bn2(this.client.proposal.get(a3).expiryTimestamp)) {
      await this.deleteProposal(a3);
      const { message: t } = N10("EXPIRED", `proposal id: ${a3}`);
      throw new Error(t);
    }
  }
  validateRequestExpiry(a3) {
    if (a3 && !ao2(a3, Se5)) {
      const { message: t } = N10("MISSING_OR_INVALID", `request() expiry: ${a3}. Expiry must be a number (in seconds) between ${Se5.min} and ${Se5.max}`);
      throw new Error(t);
    }
  }
};
var Rs = class extends ve4 {
  constructor(a3, t) {
    super(a3, t, tt2, _e4), this.core = a3, this.logger = t;
  }
};
var dt4 = class extends ve4 {
  constructor(a3, t) {
    super(a3, t, st2, _e4), this.core = a3, this.logger = t;
  }
};
var Is = class extends ve4 {
  constructor(a3, t) {
    super(a3, t, nt3, _e4, (e2) => e2.id), this.core = a3, this.logger = t;
  }
};
var Ts = class extends ve4 {
  constructor(a3, t) {
    super(a3, t, lt4, ue3, () => $3), this.core = a3, this.logger = t;
  }
};
var qs = class extends ve4 {
  constructor(a3, t) {
    super(a3, t, pt3, ue3), this.core = a3, this.logger = t;
  }
};
var vs = class extends ve4 {
  constructor(a3, t) {
    super(a3, t, ht2, ue3, (e2) => e2.id), this.core = a3, this.logger = t;
  }
};
var Ps = class {
  constructor(a3, t) {
    this.core = a3, this.logger = t, this.authKeys = new Ts(this.core, this.logger), this.pairingTopics = new qs(this.core, this.logger), this.requests = new vs(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
};
var ut4 = class gt3 extends S {
  constructor(a3) {
    super(a3), this.protocol = be5, this.version = Ae4, this.name = fe5.name, this.events = new import_events8.EventEmitter(), this.on = (e2, s2) => this.events.on(e2, s2), this.once = (e2, s2) => this.events.once(e2, s2), this.off = (e2, s2) => this.events.off(e2, s2), this.removeListener = (e2, s2) => this.events.removeListener(e2, s2), this.removeAllListeners = (e2) => this.events.removeAllListeners(e2), this.connect = async (e2) => {
      try {
        return await this.engine.connect(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.pair = async (e2) => {
      try {
        return await this.engine.pair(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.approve = async (e2) => {
      try {
        return await this.engine.approve(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.reject = async (e2) => {
      try {
        return await this.engine.reject(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.update = async (e2) => {
      try {
        return await this.engine.update(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.extend = async (e2) => {
      try {
        return await this.engine.extend(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.request = async (e2) => {
      try {
        return await this.engine.request(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.respond = async (e2) => {
      try {
        return await this.engine.respond(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.ping = async (e2) => {
      try {
        return await this.engine.ping(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.emit = async (e2) => {
      try {
        return await this.engine.emit(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.disconnect = async (e2) => {
      try {
        return await this.engine.disconnect(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.find = (e2) => {
      try {
        return this.engine.find(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.getPendingSessionRequests = () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (e2) {
        throw this.logger.error(e2.message), e2;
      }
    }, this.authenticate = async (e2, s2) => {
      try {
        return await this.engine.authenticate(e2, s2);
      } catch (i3) {
        throw this.logger.error(i3.message), i3;
      }
    }, this.formatAuthMessage = (e2) => {
      try {
        return this.engine.formatAuthMessage(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.approveSessionAuthenticate = async (e2) => {
      try {
        return await this.engine.approveSessionAuthenticate(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.rejectSessionAuthenticate = async (e2) => {
      try {
        return await this.engine.rejectSessionAuthenticate(e2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }, this.name = a3?.name || fe5.name, this.metadata = Rn2(a3?.metadata), this.signConfig = a3?.signConfig;
    const t = bo2({ logger: a3?.logger || fe5.logger, name: this.name });
    this.logger = t, this.core = a3?.core || new Ji(a3), this.session = new dt4(this.core, this.logger), this.proposal = new Rs(this.core, this.logger), this.pendingRequest = new Is(this.core, this.logger), this.engine = new Es(this), this.auth = new Ps(this.core, this.logger);
  }
  static async init(a3) {
    const t = new gt3(a3);
    return await t.initialize(), t;
  }
  get context() {
    return ee(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success");
    } catch (a3) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(a3.message), a3;
    }
  }
};
var Os = ut4;

// node_modules/@walletconnect/jsonrpc-http-connection/dist/index.es.js
var import_events9 = __toESM(require_events());
var import_cross_fetch = __toESM(require_browser_ponyfill());
var P5 = Object.defineProperty;
var w4 = Object.defineProperties;
var E4 = Object.getOwnPropertyDescriptors;
var c4 = Object.getOwnPropertySymbols;
var L = Object.prototype.hasOwnProperty;
var O4 = Object.prototype.propertyIsEnumerable;
var l4 = (r3, t, e2) => t in r3 ? P5(r3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : r3[t] = e2;
var p4 = (r3, t) => {
  for (var e2 in t || (t = {})) L.call(t, e2) && l4(r3, e2, t[e2]);
  if (c4) for (var e2 of c4(t)) O4.call(t, e2) && l4(r3, e2, t[e2]);
  return r3;
};
var v7 = (r3, t) => w4(r3, E4(t));
var j4 = { Accept: "application/json", "Content-Type": "application/json" };
var T5 = "POST";
var d3 = { headers: j4, method: T5 };
var g4 = 10;
var f2 = class {
  constructor(t, e2 = false) {
    if (this.url = t, this.disableProviderPing = e2, this.events = new import_events9.EventEmitter(), this.isAvailable = false, this.registering = false, !isHttpUrl(t)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
    this.url = t, this.disableProviderPing = e2;
  }
  get connected() {
    return this.isAvailable;
  }
  get connecting() {
    return this.registering;
  }
  on(t, e2) {
    this.events.on(t, e2);
  }
  once(t, e2) {
    this.events.once(t, e2);
  }
  off(t, e2) {
    this.events.off(t, e2);
  }
  removeListener(t, e2) {
    this.events.removeListener(t, e2);
  }
  async open(t = this.url) {
    await this.register(t);
  }
  async close() {
    if (!this.isAvailable) throw new Error("Connection already closed");
    this.onClose();
  }
  async send(t) {
    this.isAvailable || await this.register();
    try {
      const e2 = safeJsonStringify(t), s2 = await (await (0, import_cross_fetch.default)(this.url, v7(p4({}, d3), { body: e2 }))).json();
      this.onPayload({ data: s2 });
    } catch (e2) {
      this.onError(t.id, e2);
    }
  }
  async register(t = this.url) {
    if (!isHttpUrl(t)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
    if (this.registering) {
      const e2 = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= e2 || this.events.listenerCount("open") >= e2) && this.events.setMaxListeners(e2 + 1), new Promise((s2, i3) => {
        this.events.once("register_error", (n4) => {
          this.resetMaxListeners(), i3(n4);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.isAvailable > "u") return i3(new Error("HTTP connection is missing or invalid"));
          s2();
        });
      });
    }
    this.url = t, this.registering = true;
    try {
      if (!this.disableProviderPing) {
        const e2 = safeJsonStringify({ id: 1, jsonrpc: "2.0", method: "test", params: [] });
        await (0, import_cross_fetch.default)(t, v7(p4({}, d3), { body: e2 }));
      }
      this.onOpen();
    } catch (e2) {
      const s2 = this.parseError(e2);
      throw this.events.emit("register_error", s2), this.onClose(), s2;
    }
  }
  onOpen() {
    this.isAvailable = true, this.registering = false, this.events.emit("open");
  }
  onClose() {
    this.isAvailable = false, this.registering = false, this.events.emit("close");
  }
  onPayload(t) {
    if (typeof t.data > "u") return;
    const e2 = typeof t.data == "string" ? safeJsonParse(t.data) : t.data;
    this.events.emit("payload", e2);
  }
  onError(t, e2) {
    const s2 = this.parseError(e2), i3 = s2.message || s2.toString(), n4 = formatJsonRpcError(t, i3);
    this.events.emit("payload", n4);
  }
  parseError(t, e2 = this.url) {
    return parseConnectionError(t, e2, "HTTP");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > g4 && this.events.setMaxListeners(g4);
  }
};

// node_modules/@walletconnect/universal-provider/dist/index.js
var import_events10 = __toESM(require_events(), 1);
var R3 = "error";
var te5 = "wss://relay.walletconnect.org";
var se4 = "wc";
var H5 = "universal_provider";
var v8 = `${se4}@2:${H5}:`;
var D4 = "https://rpc.walletconnect.org/v1/";
var j5 = "generic";
var ie4 = `${D4}bundler`;
var d4 = "call_status";
var ne4 = 86400;
var I2 = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
function F3(i3, e2, t) {
  const s2 = ae2(i3);
  return e2.rpcMap?.[s2.reference] || `${D4}?chainId=${s2.namespace}:${s2.reference}&projectId=${t}`;
}
function ae4(i3) {
  return i3.includes(":") ? i3.split(":")[1] : i3;
}
function U3(i3) {
  return i3.map((e2) => `${e2.split(":")[0]}:${e2.split(":")[1]}`);
}
function re4(i3, e2) {
  const t = Object.keys(e2.namespaces).filter((n4) => n4.includes(i3));
  if (!t.length) return [];
  const s2 = [];
  return t.forEach((n4) => {
    const a3 = e2.namespaces[n4].accounts;
    s2.push(...a3);
  }), s2;
}
function T6(i3) {
  return Object.fromEntries(Object.entries(i3).filter(([e2, t]) => t?.chains?.length && t?.chains?.length > 0));
}
function w5(i3 = {}, e2 = {}) {
  const t = T6(x7(i3)), s2 = T6(x7(e2));
  return merge(t, s2);
}
function x7(i3) {
  const e2 = {};
  if (!re2(i3)) return e2;
  for (const [t, s2] of Object.entries(i3)) {
    const n4 = Te3(t) ? [t] : s2.chains, a3 = s2.methods || [], r3 = s2.events || [], h4 = s2.rpcMap || {}, o5 = xt2(t);
    e2[o5] = { ...e2[o5], ...s2, chains: w2(n4, e2[o5]?.chains), methods: w2(a3, e2[o5]?.methods), events: w2(r3, e2[o5]?.events) }, (re2(h4) || re2(e2[o5]?.rpcMap || {})) && (e2[o5].rpcMap = { ...h4, ...e2[o5]?.rpcMap });
  }
  return e2;
}
function L2(i3) {
  return i3.includes(":") ? i3.split(":")[2] : i3;
}
function k5(i3) {
  const e2 = {};
  for (const [t, s2] of Object.entries(i3)) {
    const n4 = s2.methods || [], a3 = s2.events || [], r3 = s2.accounts || [], h4 = Te3(t) ? [t] : s2.chains ? s2.chains : U3(s2.accounts);
    e2[t] = { chains: h4, methods: n4, events: a3, accounts: r3 };
  }
  return e2;
}
function y6(i3) {
  return typeof i3 == "number" ? i3 : i3.includes("0x") ? parseInt(i3, 16) : (i3 = i3.includes(":") ? i3.split(":")[1] : i3, isNaN(Number(i3)) ? i3 : Number(i3));
}
function oe4(i3) {
  try {
    const e2 = JSON.parse(i3);
    return typeof e2 == "object" && e2 !== null && !Array.isArray(e2);
  } catch {
    return false;
  }
}
var z4 = {};
var u2 = (i3) => z4[i3];
var S4 = (i3, e2) => {
  z4[i3] = e2;
};
var G4 = "eip155";
var ce3 = ["atomic", "flow-control", "paymasterService", "sessionKeys", "auxiliaryFunds"];
var he5 = (i3) => i3 && i3.startsWith("0x") ? BigInt(i3).toString(10) : i3;
var b4 = (i3) => i3 && i3.startsWith("0x") ? i3 : `0x${BigInt(i3).toString(16)}`;
var M5 = (i3) => Object.keys(i3).filter((e2) => ce3.includes(e2)).reduce((e2, t) => (e2[t] = pe5(i3[t]), e2), {});
var pe5 = (i3) => typeof i3 == "string" && oe4(i3) ? JSON.parse(i3) : i3;
var le4 = (i3, e2, t) => {
  const { sessionProperties: s2 = {}, scopedProperties: n4 = {} } = i3, a3 = {};
  if (!re2(n4) && !re2(s2)) return;
  const r3 = M5(s2);
  for (const h4 of t) {
    const o5 = he5(h4);
    if (!o5) continue;
    a3[b4(o5)] = r3;
    const l5 = n4?.[`${G4}:${o5}`];
    if (l5) {
      const p5 = l5?.[`${G4}:${o5}:${e2}`];
      a3[b4(o5)] = { ...a3[b4(o5)], ...M5(p5 || l5) };
    }
  }
  for (const [h4, o5] of Object.entries(a3)) Object.keys(o5).length === 0 && delete a3[h4];
  return Object.keys(a3).length > 0 ? a3 : void 0;
};
var E5;
var $4 = class _$ {
  constructor(e2) {
    this.storage = e2;
  }
  async getItem(e2) {
    return await this.storage.getItem(e2);
  }
  async setItem(e2, t) {
    return await this.storage.setItem(e2, t);
  }
  async removeItem(e2) {
    return await this.storage.removeItem(e2);
  }
  static getStorage(e2) {
    return E5 || (E5 = new _$(e2)), E5;
  }
};
async function de4(i3, e2) {
  const t = ae2(i3.result.capabilities.caip345.caip2), s2 = i3.result.capabilities.caip345.transactionHashes, n4 = await Promise.allSettled(s2.map((c5) => ue4(t.reference, c5, e2))), a3 = n4.filter((c5) => c5.status === "fulfilled").map((c5) => c5.value).filter((c5) => c5);
  n4.filter((c5) => c5.status === "rejected").forEach((c5) => console.warn("Failed to fetch transaction receipt:", c5.reason));
  const r3 = !a3.length || a3.some((c5) => !c5), h4 = a3.every((c5) => c5?.status === "0x1"), o5 = a3.every((c5) => c5?.status === "0x0"), l5 = a3.some((c5) => c5?.status === "0x0");
  let p5;
  return r3 ? p5 = 100 : h4 ? p5 = 200 : o5 ? p5 = 500 : l5 && (p5 = 600), { id: i3.result.id, version: i3.request.version, atomic: i3.request.atomicRequired, chainId: i3.request.chainId, capabilities: i3.result.capabilities, receipts: a3, status: p5 };
}
async function ue4(i3, e2, t) {
  return await t(parseInt(i3)).request(formatJsonRpcRequest("eth_getTransactionReceipt", [e2]));
}
async function me4({ sendCalls: i3, storage: e2 }) {
  const t = await e2.getItem(d4);
  await e2.setItem(d4, { ...t, [i3.result.id]: { request: i3.request, result: i3.result, expiry: Hn2(ne4) } });
}
async function ge5({ resultId: i3, storage: e2 }) {
  const t = await e2.getItem(d4);
  if (t) {
    delete t[i3], await e2.setItem(d4, t);
    for (const s2 in t) Bn2(t[s2].expiry) && delete t[s2];
    await e2.setItem(d4, t);
  }
}
async function fe6({ resultId: i3, storage: e2 }) {
  const t = (await e2.getItem(d4))?.[i3];
  if (t && !Bn2(t.expiry)) return t;
  await ge5({ resultId: i3, storage: e2 });
}
var ve5 = class {
  constructor(e2) {
    this.name = "eip155", this.namespace = e2.namespace, this.events = u2("events"), this.client = u2("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain()), this.storage = $4.getStorage(this.client.core.storage);
  }
  async request(e2) {
    switch (e2.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(e2);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
      case "wallet_getCapabilities":
        return await this.getCapabilities(e2);
      case "wallet_getCallsStatus":
        return await this.getCallStatus(e2);
      case "wallet_sendCalls":
        return await this.sendCalls(e2);
    }
    return this.namespace.methods.includes(e2.request.method) ? await this.client.request(e2) : this.getHttpProvider().request(e2.request);
  }
  updateNamespace(e2) {
    this.namespace = Object.assign(this.namespace, e2);
  }
  setDefaultChain(e2, t) {
    this.httpProviders[e2] || this.setHttpProvider(parseInt(e2), t);
    const s2 = this.chainId;
    this.chainId = parseInt(e2), this.events.emit(I2.DEFAULT_CHAIN_CHANGED, { currentCaipChainId: `${this.name}:${e2}`, previousCaipChainId: `${this.name}:${s2}` });
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId.toString();
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e2 = this.namespace.chains[0];
    if (!e2) throw new Error("ChainId not found");
    return e2.split(":")[1];
  }
  createHttpProvider(e2, t) {
    const s2 = t || F3(`${this.name}:${e2}`, this.namespace, this.client.core.projectId);
    if (!s2) throw new Error(`No RPC url provided for chainId: ${e2}`);
    return new o3(new f2(s2, u2("disableProviderPing")));
  }
  setHttpProvider(e2, t) {
    const s2 = this.createHttpProvider(e2, t);
    s2 && (this.httpProviders[e2] = s2);
  }
  createHttpProviders() {
    const e2 = {};
    return this.namespace.chains.forEach((t) => {
      const s2 = parseInt(ae4(t));
      e2[s2] = this.createHttpProvider(s2, this.namespace.rpcMap?.[t]);
    }), e2;
  }
  getAccounts() {
    const e2 = this.namespace.accounts;
    return e2 ? [...new Set(e2.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  getHttpProvider(e2) {
    const t = e2 || this.chainId;
    return this.httpProviders[t] || (this.httpProviders = { ...this.httpProviders, [t]: this.createHttpProvider(t) }, this.httpProviders[t]);
  }
  async handleSwitchChain(e2) {
    let t = e2.request.params ? e2.request.params[0]?.chainId : "0x0";
    t = t.startsWith("0x") ? t : `0x${t}`;
    const s2 = parseInt(t, 16);
    if (this.isChainApproved(s2)) this.setDefaultChain(`${s2}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({ topic: e2.topic, request: { method: e2.request.method, params: [{ chainId: t }] }, chainId: this.namespace.chains?.[0] }), this.setDefaultChain(`${s2}`);
    else throw new Error(`Failed to switch to chain 'eip155:${s2}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(e2) {
    return this.namespace.chains.includes(`${this.name}:${e2}`);
  }
  async getCapabilities(e2) {
    const t = e2.request?.params?.[0], s2 = e2.request?.params?.[1] || [];
    if (!t) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
    const n4 = this.client.session.get(e2.topic), a3 = n4?.sessionProperties?.capabilities || {}, r3 = s2.length > 0 ? s2.join(",") : `0x${this.chainId.toString(16)}`, h4 = `${t}${r3}`, o5 = a3?.[h4];
    if (o5) return o5;
    let l5;
    try {
      l5 = le4(n4, t, s2);
    } catch (c5) {
      console.warn("Failed to extract capabilities from session", c5);
    }
    if (l5) return l5;
    const p5 = await this.client.request(e2);
    try {
      await this.client.session.update(e2.topic, { sessionProperties: { ...n4.sessionProperties || {}, capabilities: { ...a3 || {}, [h4]: p5 } } });
    } catch (c5) {
      console.warn("Failed to update session with capabilities", c5);
    }
    return p5;
  }
  async getCallStatus(e2) {
    const t = this.client.session.get(e2.topic), s2 = t.sessionProperties?.bundler_name;
    if (s2) {
      const r3 = this.getBundlerUrl(e2.chainId, s2);
      try {
        return await this.getUserOperationReceipt(r3, e2);
      } catch (h4) {
        console.warn("Failed to fetch call status from bundler", h4, r3);
      }
    }
    const n4 = t.sessionProperties?.bundler_url;
    if (n4) try {
      return await this.getUserOperationReceipt(n4, e2);
    } catch (r3) {
      console.warn("Failed to fetch call status from custom bundler", r3, n4);
    }
    const a3 = await fe6({ resultId: e2.request.params?.[0], storage: this.storage });
    if (a3) try {
      return await de4(a3, this.getHttpProvider.bind(this));
    } catch (r3) {
      console.warn("Failed to fetch call status from stored send calls", r3, a3);
    }
    if (this.namespace.methods.includes(e2.request.method)) return await this.client.request(e2);
    throw new Error("Fetching call status not approved by the wallet.");
  }
  async getUserOperationReceipt(e2, t) {
    const s2 = new URL(e2), n4 = await fetch(s2, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formatJsonRpcRequest("eth_getUserOperationReceipt", [t.request.params?.[0]])) });
    if (!n4.ok) throw new Error(`Failed to fetch user operation receipt - ${n4.status}`);
    return await n4.json();
  }
  getBundlerUrl(e2, t) {
    return `${ie4}?projectId=${this.client.core.projectId}&chainId=${e2}&bundler=${t}`;
  }
  async sendCalls(e2) {
    const t = await this.client.request(e2), s2 = e2.request.params?.[0], n4 = t?.id, a3 = t?.capabilities || {}, r3 = a3?.caip345?.caip2, h4 = a3?.caip345?.transactionHashes;
    return !n4 || !r3 || !h4?.length || await me4({ sendCalls: { request: s2, result: t }, storage: this.storage }), t;
  }
};
var we5 = class {
  constructor(e2) {
    this.name = j5, this.namespace = e2.namespace, this.events = u2("events"), this.client = u2("client"), this.chainId = this.getDefaultChain(), this.name = this.getNamespaceName(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e2) {
    this.namespace.chains = [...new Set((this.namespace.chains || []).concat(e2.chains || []))], this.namespace.accounts = [...new Set((this.namespace.accounts || []).concat(e2.accounts || []))], this.namespace.methods = [...new Set((this.namespace.methods || []).concat(e2.methods || []))], this.namespace.events = [...new Set((this.namespace.events || []).concat(e2.events || []))], this.httpProviders = this.createHttpProviders();
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e2) {
    return this.namespace.methods.includes(e2.request.method) ? this.client.request(e2) : this.getHttpProvider(e2.chainId).request(e2.request);
  }
  setDefaultChain(e2, t) {
    this.httpProviders[e2] || this.setHttpProvider(e2, t);
    const s2 = this.chainId;
    this.chainId = e2, this.events.emit(I2.DEFAULT_CHAIN_CHANGED, { currentCaipChainId: `${this.name}:${e2}`, previousCaipChainId: `${this.name}:${s2}` });
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e2 = this.namespace.chains[0];
    if (!e2) throw new Error("ChainId not found");
    return e2.split(":")[1];
  }
  getNamespaceName() {
    const e2 = this.namespace.chains[0];
    if (!e2) throw new Error("ChainId not found");
    return ae2(e2).namespace;
  }
  getAccounts() {
    const e2 = this.namespace.accounts;
    return e2 ? [...new Set(e2.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e2 = {};
    return this.namespace?.accounts?.forEach((t) => {
      const s2 = ae2(t), n4 = this.namespace?.rpcMap?.[`${s2.namespace}:${s2.reference}`];
      e2[s2.reference] = this.createHttpProvider(t, n4);
    }), e2;
  }
  getHttpProvider(e2) {
    const t = ae2(e2).reference, s2 = this.httpProviders[t];
    if (typeof s2 > "u") throw new Error(`JSON-RPC provider for ${e2} not found`);
    return s2;
  }
  setHttpProvider(e2, t) {
    const s2 = this.createHttpProvider(e2, t);
    s2 && (this.httpProviders[e2] = s2);
  }
  createHttpProvider(e2, t) {
    const s2 = t || F3(e2, this.namespace, this.client.core.projectId);
    if (!s2) throw new Error(`No RPC url provided for chainId: ${e2}`);
    return new o3(new f2(s2, u2("disableProviderPing")));
  }
};
var J4 = class B3 {
  constructor(e2) {
    this.events = new import_events10.default(), this.rpcProviders = {}, this.disableProviderPing = false, this.providerOpts = e2, this.logger = bo2({ logger: e2.logger ?? R3, name: this.providerOpts.name ?? H5 }), this.disableProviderPing = e2?.disableProviderPing || false;
  }
  static async init(e2) {
    const t = new B3(e2);
    return await t.initialize(), t;
  }
  async request(e2, t, s2) {
    const [n4, a3] = this.validateChain(t);
    if (!this.session) throw new Error("Please call connect() before request()");
    return await this.getProvider(n4).request({ request: { ...e2 }, chainId: `${n4}:${a3}`, topic: this.session.topic, expiry: s2 });
  }
  sendAsync(e2, t, s2, n4) {
    const a3 = (/* @__PURE__ */ new Date()).getTime();
    this.request(e2, s2, n4).then((r3) => t(null, formatJsonRpcResult(a3, r3))).catch((r3) => t(r3, void 0));
  }
  async enable() {
    if (!this.client) throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties }), await this.requestAccounts();
  }
  async disconnect() {
    if (!this.session) throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: this.session?.topic, reason: $2("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(e2) {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (this.connectParams = e2, this.setNamespaces(e2), this.cleanupPendingPairings(), !e2.skipPairing) return await this.pair(e2.pairingTopic);
  }
  async authenticate(e2, t) {
    if (!this.client) throw new Error("Sign Client not initialized");
    this.setNamespaces(e2), await this.cleanupPendingPairings();
    const { uri: s2, response: n4 } = await this.client.authenticate(e2, t);
    s2 && (this.uri = s2, this.events.emit("display_uri", s2));
    const a3 = await n4();
    if (this.session = a3.session, this.session) {
      const r3 = k5(this.session.namespaces);
      this.namespaces = w5(this.namespaces, r3), await this.persist("namespaces", this.namespaces), this.onConnect();
    }
    return a3;
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  get isWalletConnect() {
    return true;
  }
  async pair(e2) {
    const { uri: t, approval: s2 } = await this.client.connect({ pairingTopic: e2, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties, authentication: this.connectParams?.authentication, walletPay: this.connectParams?.walletPay });
    t && (this.uri = t, this.events.emit("display_uri", t));
    const n4 = await s2();
    this.session = n4;
    const a3 = k5(n4.namespaces);
    return this.namespaces = w5(this.namespaces, a3), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
  }
  setDefaultChain(e2, t) {
    try {
      if (!this.session) return;
      const [s2, n4] = this.validateChain(e2), a3 = this.getProvider(s2);
      a3 ? a3.setDefaultChain(n4, t) : this.session && this.logger.warn(`Provider for namespace '${s2}' not found in setDefaultChain`);
    } catch (s2) {
      if (!/Please call connect/.test(s2.message)) throw s2;
    }
  }
  async cleanupPendingPairings(e2 = {}) {
    try {
      this.logger.info("Cleaning up inactive pairings...");
      const t = this.client.pairing.getAll();
      if (!B2(t)) return;
      for (const s2 of t) e2.deletePairings ? this.client.core.expirer.set(s2.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(s2.topic);
      this.logger.info(`Inactive pairings cleared: ${t.length}`);
    } catch (t) {
      this.logger.warn(t, "Failed to cleanup pending pairings");
    }
  }
  abortPairingAttempt() {
    this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.");
  }
  async checkStorage() {
    this.namespaces = await this.getFromStore("namespaces") || {}, this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.session && this.createProviders();
  }
  async initialize() {
    this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
  }
  async createClient() {
    if (this.client = this.providerOpts.client || await Os.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || R3, relayUrl: this.providerOpts.relayUrl || te5, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled }), this.providerOpts.session) try {
      this.session = this.client.session.get(this.providerOpts.session.topic);
    } catch (e2) {
      throw this.logger.error(e2, "Failed to get session"), new Error(`The provided session: ${this.providerOpts?.session?.topic} doesn't exist in the Sign client`);
    }
    else {
      const e2 = this.client.session.getAll();
      this.session = e2[0];
    }
    this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (!this.session) throw new Error("Session not initialized. Please call connect() before enable()");
    const e2 = [...new Set(Object.keys(this.session.namespaces).map((t) => xt2(t)))];
    S4("client", this.client), S4("events", this.events), S4("disableProviderPing", this.disableProviderPing), e2.forEach((t) => {
      if (!this.session) return;
      const s2 = re4(t, this.session);
      if (s2?.length === 0) return;
      const n4 = U3(s2), a3 = { ...w5(this.namespaces, this.optionalNamespaces)[t], accounts: s2, chains: n4 };
      switch (t) {
        case "eip155":
          this.rpcProviders[t] = new ve5({ namespace: a3 });
          break;
        default:
          this.rpcProviders[t] = new we5({ namespace: a3 });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (e2) => {
      const { topic: t } = e2;
      t === this.session?.topic && this.events.emit("session_ping", e2);
    }), this.client.on("session_event", (e2) => {
      const { params: t, topic: s2 } = e2;
      if (s2 !== this.session?.topic) return;
      const { event: n4 } = t;
      if (n4.name === "accountsChanged") {
        const a3 = n4.data;
        a3 && B2(a3) && this.events.emit("accountsChanged", a3.map(L2));
      } else if (n4.name === "chainChanged") {
        const a3 = t.chainId, r3 = t.event.data, h4 = xt2(a3), o5 = y6(a3) !== y6(r3) ? `${h4}:${y6(r3)}` : a3;
        this.onChainChanged({ currentCaipChainId: o5 });
      } else this.events.emit(n4.name, n4.data);
      this.events.emit("session_event", e2);
    }), this.client.on("session_update", ({ topic: e2, params: t }) => {
      if (e2 !== this.session?.topic) return;
      const { namespaces: s2 } = t, n4 = this.client?.session.get(e2);
      this.session = { ...n4, namespaces: s2 }, this.onSessionUpdate(), this.events.emit("session_update", { topic: e2, params: t });
    }), this.client.on("session_delete", async (e2) => {
      e2.topic === this.session?.topic && (await this.cleanup(), this.events.emit("session_delete", e2), this.events.emit("disconnect", { ...$2("USER_DISCONNECTED"), data: e2.topic }));
    }), this.on(I2.DEFAULT_CHAIN_CHANGED, (e2) => {
      this.onChainChanged({ ...e2, internal: true });
    });
  }
  getProvider(e2) {
    return this.rpcProviders[e2] || this.rpcProviders[j5];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((e2) => {
      this.getProvider(e2).updateNamespace(this.session?.namespaces[e2]);
    });
  }
  setNamespaces(e2) {
    const { namespaces: t = {}, optionalNamespaces: s2 = {}, sessionProperties: n4, scopedProperties: a3 } = e2;
    this.optionalNamespaces = w5(t, s2), this.sessionProperties = n4, this.scopedProperties = a3;
  }
  validateChain(e2) {
    const [t, s2] = e2?.split(":") || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length) return [t, s2];
    if (t && !Object.keys(this.namespaces || {}).map((r3) => xt2(r3)).includes(t)) throw new Error(`Namespace '${t}' is not configured. Please call connect() first with namespace config.`);
    if (t && s2) return [t, s2];
    const n4 = xt2(Object.keys(this.namespaces)[0]), a3 = this.rpcProviders[n4].getDefaultChain();
    return [n4, a3];
  }
  async requestAccounts() {
    const [e2] = this.validateChain();
    return await this.getProvider(e2).requestAccounts();
  }
  async onChainChanged({ currentCaipChainId: e2, previousCaipChainId: t, internal: s2 = false }) {
    if (!this.namespaces) return;
    const [n4, a3] = this.validateChain(e2);
    if (a3) {
      if (this.updateNamespaceChain(n4, a3), s2) this.events.emit("chainChanged", a3), this.emitAccountsChangedOnChainChange({ namespace: n4, currentCaipChainId: e2, previousCaipChainId: t });
      else {
        const r3 = this.getProvider(n4);
        r3 ? r3.setDefaultChain(a3) : this.session && this.logger.warn(`Provider for namespace '${n4}' not found during chain change`);
      }
      await this.persist("namespaces", this.namespaces);
    }
  }
  emitAccountsChangedOnChainChange({ namespace: e2, currentCaipChainId: t, previousCaipChainId: s2 }) {
    try {
      if (s2 === t) return;
      const n4 = this.session?.namespaces[e2]?.accounts;
      if (!n4) return;
      const a3 = n4.filter((r3) => r3.includes(`${t}:`)).map(L2);
      if (!B2(a3)) return;
      this.events.emit("accountsChanged", a3);
    } catch (n4) {
      this.logger.warn(n4, "Failed to emit accountsChanged on chain change");
    }
  }
  updateNamespaceChain(e2, t) {
    if (!this.namespaces) return;
    const s2 = this.namespaces[e2] ? e2 : `${e2}:${t}`, n4 = { chains: [], methods: [], events: [], defaultChain: t };
    this.namespaces[s2] ? this.namespaces[s2] && (this.namespaces[s2].defaultChain = t) : this.namespaces[s2] = n4;
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.connectParams = void 0, this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, await this.deleteFromStore("namespaces"), await this.deleteFromStore("optionalNamespaces"), await this.deleteFromStore("sessionProperties"), this.session = void 0, this.cleanupPendingPairings({ deletePairings: true }), await this.cleanupStorage();
  }
  async persist(e2, t) {
    const s2 = this.session?.topic || "";
    await this.client.core.storage.setItem(`${v8}/${e2}${s2}`, t);
  }
  async getFromStore(e2) {
    const t = this.session?.topic || "";
    return await this.client.core.storage.getItem(`${v8}/${e2}${t}`);
  }
  async deleteFromStore(e2) {
    const t = this.session?.topic || "";
    await this.client.core.storage.removeItem(`${v8}/${e2}${t}`);
  }
  async cleanupStorage() {
    try {
      if (this.client?.session.length > 0) return;
      const e2 = await this.client.core.storage.getKeys();
      for (const t of e2) t.startsWith(v8) && await this.client.core.storage.removeItem(t);
    } catch (e2) {
      this.logger.warn(e2, "Failed to cleanup storage");
    }
  }
};
var Ce6 = J4;
export {
  Ce6 as UniversalProvider,
  J4 as default
};
/*! Bundled license information:

tslib/tslib.es6.js:
tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@walletconnect/relay-auth/dist/index.es.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
@noble/curves/esm/abstract/modular.js:
@noble/curves/esm/abstract/curve.js:
@noble/curves/esm/abstract/weierstrass.js:
@noble/curves/esm/_shortw_utils.js:
@noble/curves/esm/secp256k1.js:
@noble/curves/esm/utils.js:
@noble/curves/esm/abstract/modular.js:
@noble/curves/esm/abstract/curve.js:
@noble/curves/esm/abstract/edwards.js:
@noble/curves/esm/abstract/montgomery.js:
@noble/curves/esm/ed25519.js:
@noble/curves/esm/abstract/weierstrass.js:
@noble/curves/esm/_shortw_utils.js:
@noble/curves/esm/nist.js:
@noble/curves/esm/p256.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@scure/base/lib/esm/index.js:
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ciphers/esm/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)
*/
