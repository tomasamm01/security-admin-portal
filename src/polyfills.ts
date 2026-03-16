/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';

/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/**
 * By default, zone.js will patch all asynchronous macro tasks such as `setTimeout()`,
 * `setInterval()`, `XMLHttpRequest` and others.
 * `zone.js` will patch micro-task such as `Promise.then()`, `Promise.catch()`, `Promise.all()`,
 * `Promise.race()`, `Array.prototype.forEach()`, `Array.prototype.map()`, `Array.prototype.filter()`,
 * `Array.prototype.reduce()`, `Array.prototype.every()`, `Array.prototype.some()`,
 * `Array.prototype.find()`, `Array.prototype.findIndex()`, `Array.prototype.any()`,
 * `Array.prototype.contains()`, `String.prototype.includes()`, `String.prototype.indexOf()`,
 * `String.prototype.startsWith()`, `String.prototype.endsWith()`, `String.prototype.repeat()`,
 * `String.prototype.codePointAt()`, `String.prototype.trim()`, `String.prototype.padStart()`,
 * `String.prototype.padEnd()`, `String.prototype.match()`, `String.prototype.replace()`,
 * `String.prototype.split()`, `String.prototype.slice()`, `String.prototype.substr()`,
 * `String.prototype.concat()`, `String.prototype.toLocaleLowerCase()`, `String.prototype.toLocaleUpperCase()`,
 * `String.prototype.normalize()`, `String.prototype.localeCompare()`, `String.prototype.search()`,
 * `String.prototype.toString()`, `Number.prototype.toString()`, `Number.prototype.toFixed()`,
 * `Number.prototype.toPrecision()`, `Number.prototype.toExponential()`, `Number.prototype.valueOf()`,
 * `Boolean.prototype.toString()`, `Date.prototype.toString()`, `Date.prototype.toISOString()`,
 * `Date.prototype.toJSON()`, `Date.prototype.toLocaleDateString()`, `Date.prototype.toLocaleTimeString()`,
 * `Date.prototype.toLocaleString()`, `Date.prototype.toUTCString()`, `Date.prototype.getTime()`,
 * `Date.prototype.setTime()`, `Date.prototype.getFullYear()`, `Date.prototype.getMonth()`,
 * `Date.prototype.getDate()`, `Date.prototype.getDay()`, `Date.prototype.getHours()`,
 * `Date.prototype.getMinutes()`, `Date.prototype.getSeconds()`, `Date.prototype.getMilliseconds()`,
 * `Date.prototype.getTimezoneOffset()`, `Date.prototype.setFullYear()`, `Date.prototype.setMonth()`,
 * `Date.prototype.setDate()`, `Date.prototype.setHours()`, `Date.prototype.setMinutes()`,
 * `Date.prototype.setSeconds()`, `Date.prototype.setMilliseconds()`, `Date.prototype.toUTCString()`,
 * `Date.prototype.getUTCFullYear()`, `Date.prototype.getUTCMonth()`, `Date.prototype.getUTCDate()`,
 * `Date.prototype.getUTCDay()`, `Date.prototype.getUTCHours()`, `Date.prototype.getUTCMinutes()`,
 * `Date.prototype.getUTCSeconds()`, `Date.prototype.getUTCMilliseconds()`, `Date.prototype.setUTCFullYear()`,
 * `Date.prototype.setUTCMonth()`, `Date.prototype.setUTCDate()`, `Date.prototype.setUTCHours()`,
 * `Date.prototype.setUTCMinutes()`, `Date.prototype.setUTCSeconds()`, `Date.prototype.setUTCMilliseconds()`,
 * `Date.prototype.valueOf()`, `RegExp.prototype.test()`, `RegExp.prototype.exec()`,
 * `RegExp.prototype.toString()`, `Object.prototype.toString()`, `Object.prototype.hasOwnProperty()`,
 * `Object.prototype.isPrototypeOf()`, `Object.prototype.propertyIsEnumerable()`, `Object.prototype.valueOf()`,
 * `Function.prototype.toString()`, `Function.prototype.apply()`, `Function.prototype.call()`,
 * `Function.prototype.bind()`, `Array.prototype.toString()`, `Array.prototype.toLocaleString()`,
 * `Array.prototype.join()`, `Array.prototype.pop()`, `Array.prototype.push()`, `Array.prototype.reverse()`,
 * `Array.prototype.shift()`, `Array.prototype.unshift()`, `Array.prototype.slice()`, `Array.prototype.splice()`,
 * `Array.prototype.sort()`, `Array.prototype.lastIndexOf()`, `Array.prototype.indexOf()`, `Array.prototype.forEach()`,
 * `Array.prototype.map()`, `Array.prototype.filter()`, `Array.prototype.reduce()`, `Array.prototype.reduceRight()`,
 * `Array.prototype.every()`, `Array.prototype.some()`, `Array.prototype.find()`, `Array.prototype.findIndex()`,
 * `Array.prototype.keys()`, `Array.prototype.values()`, `Array.prototype.entries()`, `Array.prototype.fill()`,
 * `Array.prototype.copyWithin()`, `Array.prototype.includes()`, `Array.prototype.flat()`, `Array.prototype.flatMap()`,
 * `String.prototype.toString()`, `String.prototype.valueOf()`, `String.prototype.charAt()`, `String.prototype.charCodeAt()`,
 * `String.prototype.concat()`, `String.prototype.slice()`, `String.prototype.substr()`, `String.prototype.substring()`,
 * `String.prototype.indexOf()`, `String.prototype.lastIndexOf()`, `String.prototype.toLocaleLowerCase()`,
 * `String.prototype.toLocaleUpperCase()`, `String.prototype.toLowerCase()`, `String.prototype.toUpperCase()`,
 * `String.prototype.trim()`, `String.prototype.padStart()`, `String.prototype.padEnd()`, `String.prototype.repeat()`,
 * `String.prototype.replace()`, `String.prototype.search()`, `String.prototype.split()`, `String.prototype.includes()`,
 * `String.prototype.startsWith()`, `String.prototype.endsWith()`, `String.prototype.localeCompare()`, `String.prototype.normalize()`,
 * `String.prototype.codePointAt()`, `String.prototype.fromCodePoint()`, `Number.prototype.toString()`, `Number.prototype.valueOf()`,
 * `Number.prototype.toFixed()`, `Number.prototype.toExponential()`, `Number.prototype.toPrecision()`, `Number.prototype.toLocaleString()`,
 * `Boolean.prototype.toString()`, `Boolean.prototype.valueOf()`, `Date.prototype.toString()`, `Date.prototype.valueOf()`,
 * `Date.prototype.getTime()`, `Date.prototype.setTime()`, `Date.prototype.getFullYear()`, `Date.prototype.getUTCFullYear()`,
 * `Date.prototype.getMonth()`, `Date.prototype.getUTCMonth()`, `Date.prototype.getDate()`, `Date.prototype.getUTCDate()`,
 * `Date.prototype.getDay()`, `Date.prototype.getUTCDay()`, `Date.prototype.getHours()`, `Date.prototype.getUTCHours()`,
 * `Date.prototype.getMinutes()`, `Date.prototype.getUTCMinutes()`, `Date.prototype.getSeconds()`, `Date.prototype.getUTCSeconds()`,
 * `Date.prototype.getMilliseconds()`, `Date.prototype.getUTCMilliseconds()`, `Date.prototype.getTimezoneOffset()`,
 * `Date.prototype.setTime()`, `Date.prototype.setFullYear()`, `Date.prototype.setUTCFullYear()`, `Date.prototype.setMonth()`,
 * `Date.prototype.setUTCMonth()`, `Date.prototype.setDate()`, `Date.prototype.setUTCDate()`, `Date.prototype.setHours()`,
 * `Date.prototype.setUTCHours()`, `Date.prototype.setMinutes()`, `Date.prototype.setUTCMinutes()`, `Date.prototype.setSeconds()`,
 * `Date.prototype.setUTCSeconds()`, `Date.prototype.setMilliseconds()`, `Date.prototype.setUTCMilliseconds()`,
 * `Date.prototype.toDateString()`, `Date.prototype.toTimeString()`, `Date.prototype.toLocaleDateString()`,
 * `Date.prototype.toLocaleTimeString()`, `Date.prototype.toLocaleString()`, `Date.prototype.toISOString()`,
 * `Date.prototype.toUTCString()`, `Date.prototype.toJSON()`, `RegExp.prototype.exec()`, `RegExp.prototype.test()`,
 * `RegExp.prototype.toString()`, `Error.prototype.toString()`, `Error.prototype.message`, `Error.prototype.name`,
 * `JSON.stringify()`, `JSON.parse()`, `parseInt()`, `parseFloat()`, `isNaN()`, `isFinite()`,
 * `eval()`, `uneval()`, `encodeURI()`, `encodeURIComponent()`, `decodeURI()`, `decodeURIComponent()`,
 * `escape()`, `unescape()`, `Object()`, `Object.defineProperty()`, `Object.defineProperties()`, `Object.create()`,
 * `Object.getOwnPropertyDescriptor()`, `Object.getOwnPropertyNames()`, `Object.getOwnPropertySymbols()`,
 * `Object.getPrototypeOf()`, `Object.setPrototypeOf()`, `Object.keys()`, `Object.values()`, `Object.entries()`,
 * `Object.freeze()`, `Object.seal()`, `Object.preventExtensions()`, `Object.isFrozen()`, `Object.isSealed()`,
 * `Object.isExtensible()`, `Object.assign()`, `Object.getOwnPropertyDescriptor()`, `Object.getOwnPropertyDescriptors()`,
 * `Object.getOwnPropertyNames()`, `Object.getOwnPropertySymbols()`, `Object.getPrototypeOf()`, `Object.setPrototypeOf()`,
 * `Object.is()`, `Array()`, `Array.isArray()`, `Array.from()`, `Array.of()`, `Array.prototype.concat()`,
 * `Array.prototype.copyWithin()`, `Array.prototype.entries()`, `Array.prototype.every()`, `Array.prototype.fill()`,
 * `Array.prototype.filter()`, `Array.prototype.find()`, `Array.prototype.findIndex()`, `Array.prototype.flat()`,
 * `Array.prototype.flatMap()`, `Array.prototype.forEach()`, `Array.prototype.includes()`, `Array.prototype.indexOf()`,
 * `Array.prototype.join()`, `Array.prototype.keys()`, `Array.prototype.lastIndexOf()`, `Array.prototype.map()`,
 * `Array.prototype.pop()`, `Array.prototype.push()`, `Array.prototype.reduce()`, `Array.prototype.reduceRight()`,
 * `Array.prototype.reverse()`, `Array.prototype.shift()`, `Array.prototype.slice()`, `Array.prototype.some()`,
 * `Array.prototype.sort()`, `Array.prototype.splice()`, `Array.prototype.toLocaleString()`, `Array.prototype.toString()`,
 * `Array.prototype.unshift()`, `Array.prototype.values()`, `String()`, `String.fromCharCode()`, `String.fromCodePoint()`,
 * `String.raw()`, `String.prototype.concat()`, `String.prototype.endsWith()`, `String.prototype.includes()`,
 * `String.prototype.indexOf()`, `String.prototype.lastIndexOf()`, `String.prototype.localeCompare()`, `String.prototype.match()`,
 * `String.prototype.normalize()`, `String.prototype.padEnd()`, `String.prototype.padStart()`, `String.prototype.repeat()`,
 * `String.prototype.replace()`, `String.prototype.search()`, `String.prototype.slice()`, `String.prototype.split()`,
 * `String.prototype.startsWith()`, `String.prototype.substring()`, `String.prototype.toLocaleLowerCase()`,
 * `String.prototype.toLocaleUpperCase()`, `String.prototype.toLowerCase()`, `String.prototype.toString()`,
 * `String.prototype.trim()`, `String.prototype.toUpperCase()`, `String.prototype.valueOf()`, `String.prototype.codePointAt()`,
 * `String.prototype.charAt()`, `String.prototype.charCodeAt()`, `Number()`, `Number.isFinite()`, `Number.isInteger()`,
 * `Number.isNaN()`, `Number.isSafeInteger()`, `Number.parseFloat()`, `Number.parseInt()`, `Number.prototype.toExponential()`,
 * `Number.prototype.toFixed()`, `Number.prototype.toLocaleString()`, `Number.prototype.toPrecision()`, `Number.prototype.toString()`,
 * `Number.prototype.valueOf()`, `Boolean()`, `Boolean.prototype.toString()`, `Boolean.prototype.valueOf()`,
 * `Date()`, `Date.now()`, `Date.parse()`, `Date.UTC()`, `Date.prototype.getDate()`, `Date.prototype.getDay()`,
 * `Date.prototype.getFullYear()`, `Date.prototype.getHours()`, `Date.prototype.getMilliseconds()`, `Date.prototype.getMinutes()`,
 * `Date.prototype.getMonth()`, `Date.prototype.getSeconds()`, `Date.prototype.getTime()`, `Date.prototype.getTimezoneOffset()`,
 * 'Date.prototype.getUTCDate()', 'Date.prototype.getUTCDay()', 'Date.prototype.getUTCFullYear()', 'Date.prototype.getUTCHours()',
 * 'Date.prototype.getUTCMilliseconds()', 'Date.prototype.getUTCMinutes()', 'Date.prototype.getUTCMonth()', 'Date.prototype.getUTCSeconds()',
 * 'Date.prototype.setDate()', 'Date.prototype.setFullYear()', 'Date.prototype.setHours()', 'Date.prototype.setMilliseconds()',
 * 'Date.prototype.setMinutes()', 'Date.prototype.setMonth()', 'Date.prototype.setSeconds()', 'Date.prototype.setTime()',
 * 'Date.prototype.setUTCDate()', 'Date.prototype.setUTCFullYear()', 'Date.prototype.setUTCHours()', 'Date.prototype.setUTCMilliseconds()',
 * 'Date.prototype.setUTCMinutes()', 'Date.prototype.setUTCMonth()', 'Date.prototype.setUTCSeconds()', 'Date.prototype.toDateString()',
 * 'Date.prototype.toISOString()', 'Date.prototype.toJSON()', 'Date.prototype.toLocaleDateString()', 'Date.prototype.toLocaleTimeString()',
 * 'Date.prototype.toLocaleString()', 'Date.prototype.toString()', 'Date.prototype.toTimeString()', 'Date.prototype.toUTCString()',
 * 'Date.prototype.valueOf()', 'RegExp()', 'RegExp.prototype.compile()', 'RegExp.prototype.exec()', 'RegExp.prototype.test()',
 * 'RegExp.prototype.toString()', 'Error()', 'Error.prototype.message', 'Error.prototype.name', 'Error.prototype.toString()',
 * 'JSON.parse()', 'JSON.stringify()', 'Math.abs()', 'Math.acos()', 'Math.acosh()', 'Math.asin()', 'Math.asinh()',
 * 'Math.atan()', 'Math.atan2()', 'Math.atanh()', 'Math.cbrt()', 'Math.ceil()', 'Math.clz32()', 'Math.cos()',
 * 'Math.cosh()', 'Math.exp()', 'Math.expm1()', 'Math.floor()', 'Math.fround()', 'Math.hypot()', 'Math.imul()',
 * 'Math.log()', 'Math.log1p()', 'Math.log10()', 'Math.log2()', 'Math.max()', 'Math.min()', 'Math.pow()',
 * 'Math.random()', 'Math.round()', 'Math.sign()', 'Math.sin()', 'Math.sinh()', 'Math.sqrt()', 'Math.tan()',
 * 'Math.tanh()', 'Math.trunc()', 'parseInt()', 'parseFloat()', 'isNaN()', 'isFinite()', 'eval()', 'uneval()',
 * 'encodeURI()', 'encodeURIComponent()', 'decodeURI()', 'decodeURIComponent()', 'escape()', 'unescape()'
 */

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */
