(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Observer = (function () {
  function Observer() {
    _classCallCheck(this, Observer);

    this._observers = [];
    this._observable = null;
  }

  _createClass(Observer, [{
    key: 'subscribe',
    value: function subscribe(cb) {
      var hasSubscribed = false;

      if (cb instanceof Function) {
        this._observers.push(cb);
        hasSubscribed = true;
      } else {
        console.debug('Callback is not a function');
      }

      return hasSubscribed;
    }
  }, {
    key: 'update',
    value: function update(observable) {
      var hasUpdated = false;

      if (observable) {
        this._observable = observable;
        this.refresh();
        hasUpdated = true;
      } else {
        console.debug('Null observable');
      }

      return hasUpdated;
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      if (this._observable) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._observers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var observer = _step.value;

            observer(this._observable);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._observable = null;
    }
  }]);

  return Observer;
})();

exports['default'] = Observer;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
/* global XMLHttpRequest */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var HTTP = {
  get: function get(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(xhr.responseText);
      }
    };

    xhr.open('GET', url, true);
    xhr.send();
  },
  post: function post() {
    // TODO
  },
  'delete': function _delete() {
    // TODO
  },
  put: function put() {
    // TODO
  }
};

exports['default'] = HTTP;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var NumberFormat = {};

NumberFormat.commaSeparated = function (value) {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

exports['default'] = NumberFormat;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
"use strict";

},{}],5:[function(require,module,exports){
/* global WebStorage */

/*
* This JS prototype can be used when setters and getters are needed.
* The m_ naming convention refers to member/private components that should not be called directly
* */

'use strict';

function Accessor() {
  this.value = false;
}

/*
 * Key is an optional param that can be passed to recall from web storage
 */
Accessor.prototype.get = function (key) {
  if (key && !this.value) {
    if (!this.session || !this.local) {
      this._initWebStorage();
    }

    if (this.session && this.session.get(key)) {
      this.value = this.session.get(key);
    } else if (this.local && this.local.get(key)) {
      this.value = this.local.get(key);
    }
  }

  return this.value;
};

/*
* Key is an optional param that can be passed to set in web storage
*/
Accessor.prototype.set = function (val, key) {
  this.value = val;

  if (key) {
    this._setInLocal(key, val);
    this._setInSession(key, val);
  }

  return true;
};

/*
* Key is an optional param that can be passed to clear web storage
*/
Accessor.prototype.clear = function (key) {
  this.value = false;

  if (key) {
    if (!this.session || !this.local) {
      this._initWebStorage();
    }

    this.local.remove(key);
    this.session.remove(key);
  }
};

Accessor.prototype._setInLocal = function (key, val) {
  if (!this.local) {
    this._initWebStorage();
  }

  this.local.set(key, val);
};

Accessor.prototype._setInSession = function (key, val) {
  if (!this.session) {
    this._initWebStorage();
  }

  this.session.set(key, val);
};

Accessor.prototype._initWebStorage = function () {
  this.local = new WebStorage('localStorage');
  this.session = new WebStorage('sessionStorage');
};

},{}],6:[function(require,module,exports){
'use strict';

function Observer() {
  this.observers = [];
  this.observable = null;
}

Observer.prototype.subscribe = function (cb) {
  var hasSubscribed = false;

  if (cb instanceof Function) {
    this.observers.push(cb);
    hasSubscribed = true;
  } else {
    console.debug('Callback is not a function');
  }

  return hasSubscribed;
};

Observer.prototype.update = function (observable) {
  var hasUpdated = false;

  if (observable) {
    this.observable = observable;
    this.refresh();
    hasUpdated = true;
  } else {
    console.debug('Null observable');
  }

  return hasUpdated;
};

Observer.prototype.refresh = function () {
  if (this.observable) {
    for (var i = 0, j = this.observers.length; i < j; i++) {
      this.observers[i](this.observable);
    }
  }
};

Observer.prototype.reset = function () {
  this.observable = null;
};

Observer.prototype.unsubscribe = function (cb) {
  var hasUnsubscribed = false;
  var cbIndex = this.observers.indexOf(cb);

  if (cbIndex !== -1) {
    this.observers.splice(cbIndex, 1);
    hasUnsubscribed = true;
  }

  return hasUnsubscribed;
};

},{}],7:[function(require,module,exports){
/* global Base64 */

/**
 * A generic web storage factory for session and local storage
 * @param {String} storageType   'localStorage' || 'sessionStorage'
 *     - derived from the window[property] for web storage
 */
'use strict';

function WebStorage(storageType) {
  this.type = null;
  this.webStorage = null;

  this.isSupported = this.checkSupportFor(storageType);
}

WebStorage.prototype.serialize = function (value) {
  return JSON.stringify(value);
};

WebStorage.prototype.deserialize = function (value) {
  return JSON.parse(value);
};

WebStorage.prototype.encode = function (value) {
  return Base64.encode(value);
};

WebStorage.prototype.decode = function (value) {
  return Base64.decode(value);
};

/**
 * Determines if named web storage type is enabled in this browser
 * @return {Boolean} True if the browser supports named web storage
 */
WebStorage.prototype.checkSupportFor = function (storageType) {
  if (storageType in window && window[storageType] != null) {
    this.webStorage = window[storageType];
    this.type = storageType;
    return true;
  } else {
    return false;
  }
};

/**
 * Adds a key value pair to web storage. If the value given in an array or object, it is
 * stringified into JSON format and saved as a string.
 * @param {String} key   Key to store the data with
 * @param {String|Object|Array} value The value to store; may be a string, object or array
 */
WebStorage.prototype.set = function (key, value) {
  if (this.isSupported) {
    if (typeof value === undefined) {
      value = null;
    }

    try {
      if (value instanceof Object) {
        value = this.serialize(value);
      }

      if (value !== null) {
        value = this.encode(value);
      }

      this.webStorage.setItem(key, value);

      return true;
    } catch (error) {
      console.error('Unable to save key ' + key + ' to ' + this.type);
      return false;
    }
  }

  return false;
};

/**
 * Retrieves a value from web storage given a key. If the value is an array or object in JSON
 * format, it is converted into an Object before being returned
 * @param  {String} key The key to look up
 * @return {String|Object|Array}     The item in web storage.
 */
WebStorage.prototype.get = function (key) {
  if (this.isSupported) {
    var value = '';

    try {
      value = this.webStorage.getItem(key);
    } catch (error) {
      console.error('Error attempting to get key ' + key + ' from ' + this.type);
      throw new Error('Unable to get stored preference');
    }

    if (!value) {
      value = null;
    }

    if (value !== null) {
      value = this.decode(value);
      if (value.charAt(0) === '{' || value.charAt(0) === '[') {
        value = this.deserialize(value);
      }
    }

    return value;
  }

  return undefined;
};

/**
 * Returns all keys in web storage that start with keyPrefix; if keyPrefix is not provided, all keys are returned.
 * @param  {String} keyPrefix If provided, returns keys that start with this value
 * @return {Array}           An array of matching keys
 */
WebStorage.prototype.getAll = function (keyPrefix) {
  var returnKeys = [];
  var key;
  var keyPrefixLength;

  if (keyPrefix != null) {
    keyPrefixLength = keyPrefix.length;
  } else {
    keyPrefixLength = 0;
  }

  try {
    for (key in this.webStorage) {
      if (keyPrefixLength === 0 || key.substr(0, keyPrefixLength) === keyPrefix) {
        returnKeys.push(key.substr(keyPrefixLength));
      }
    }
  } catch (error) {
    throw new Error('Unable to read stored preferences.');
  }

  return returnKeys;
};

/**
 * Removes (deletes) a given key from the web storage database.
 * @param  {String} key Key to be deleted
 * @return {boolean}     True if delete succeeded, false otherwise.
 */
WebStorage.prototype.remove = function (key) {
  if (this.isSupported) {
    try {
      this.webStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error occurred while trying to remove key ' + key + ' from ' + this.type);
      return false;
    }
  }

  return false;
};

/**
 * Removes (deletes) a ALL keys from the web storage database.
 * @return {boolean} True if delete succeeded, false otherwise.
 */
WebStorage.prototype.clear = function () {
  if (this.isSupported) {
    try {
      this.webStorage.clear();
      return true;
    } catch (error) {
      console.error('Error occurred while trying to clear ALL data from ' + this.type);
      return false;
    }
  }

  return false;
};

},{}]},{},[1,2,3,4,5,6,7]);
