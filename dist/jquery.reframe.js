/**
  reframe.js - Reframe.js: responsive iframes for embedded content
  @version v2.2.8
  @link https://github.com/yowainwright/reframe.ts#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (http://jeffry.in)
  @license MIT
**/
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

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

    /**
     * REFRAME.TS 🖼
     * ---
     * @param target
     * @param cName
     * @summary defines the height/width ratio of the targeted <element>
     */
    var reframe = function (target, cName) {
        if (cName === void 0) { cName = 'js-reframe'; }
        return Array.from(__spreadArrays((typeof target === 'string' ? document.querySelectorAll(target) : target)), function (frame) {
            var _a, _b;
            if (frame.className.split(' ').includes(cName) || frame.style.width.includes('%'))
                return;
            // get height width attributes
            var height = frame.getAttribute('height') || frame.offsetHeight;
            var width = frame.getAttribute('width') || frame.offsetWidth;
            var heightNumber = typeof height === 'string' ? parseInt(height) : height;
            var widthNumber = typeof width === 'string' ? parseInt(width) : width;
            // general targeted <element> sizes
            var padding = (heightNumber / widthNumber) * 100;
            // created element <wrapper> of general reframed item
            // => set necessary styles of created element <wrapper>
            var div = document.createElement('div');
            div.className = cName;
            var divStyles = div.style;
            divStyles.position = 'relative';
            divStyles.width = '100%';
            divStyles.paddingTop = padding + "%";
            // set necessary styles of targeted <element>
            var frameStyle = frame.style;
            frameStyle.position = 'absolute';
            frameStyle.width = '100%';
            frameStyle.height = '100%';
            frameStyle.left = '0';
            frameStyle.top = '0';
            // reframe targeted <element>
            (_a = frame.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(div, frame);
            (_b = frame.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(frame);
            div.appendChild(frame);
        });
    };

    if (typeof window !== 'undefined') {
        var plugin = window.$ || window.jQuery || window.Zepto;
        if (plugin) {
            plugin.fn.reframe = function reframePlugin(cName) {
                reframe(this, cName);
            };
        }
    }

})));
