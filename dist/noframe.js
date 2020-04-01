/**
  reframe.js - Reframe.js: responsive iframes for embedded content
  @version v2.2.8
  @link https://github.com/yowainwright/reframe.ts#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (http://jeffry.in)
  @license MIT
**/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.noframe = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    /* noframe.js () 🖼
      -------------
      takes 2 arguments:
      => target: targeted <element>
      => container: optional targeted <parent> of targeted <element>
      -------------
      defines the height/width ratio of the targeted <element>
      based on the targeted <parent> width
    */
    var noframe = function (target, container) {
        return Array.from(__spreadArrays((typeof target === 'string' ? document.querySelectorAll(target) : target)), function (frame) {
            var isContainerElement = typeof container !== 'undefined' && document.querySelector(container);
            var parent = isContainerElement ? document.querySelector(container) : frame.parentElement;
            var h = frame.offsetHeight;
            var w = frame.offsetWidth;
            var styles = frame.style;
            var maxW = w + "px";
            // => If a targeted <container> element is defined
            if (isContainerElement) {
                // gets/sets the height/width ratio
                maxW = window.getComputedStyle(parent, null).getPropertyValue('max-width');
                styles.width = '100%';
                // calc is needed here b/c the maxW measurement type is unknown
                styles.maxHeight = "calc(" + maxW + " * " + h + " / " + w + ")";
            }
            else {
                // gets/sets the height/width ratio
                // => if a targeted <element> closest parent <element> is NOT defined
                var maxH = void 0;
                styles.display = 'block';
                styles.marginLeft = 'auto';
                styles.marginRight = 'auto';
                var fullW = maxW;
                // if targeted <element> width is > than it's parent <element>
                // => set the targeted <element> maxheight/fullwidth to it's parent <element>
                if (w > parent.offsetWidth) {
                    fullW = parent.offsetWidth;
                    maxH = (fullW * h) / w; // eslint-disable-line no-mixed-operators
                }
                else
                    maxH = w * (h / w);
                styles.maxHeight = maxH + "px";
                styles.width = fullW;
            }
            // set a calculated height of the targeted <element>
            var cssHeight = (100 * h) / w; // eslint-disable-line no-mixed-operators
            styles.height = cssHeight + "vw";
            styles.maxWidth = '100%';
        });
    };

    exports.default = noframe;
    exports.noframe = noframe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
