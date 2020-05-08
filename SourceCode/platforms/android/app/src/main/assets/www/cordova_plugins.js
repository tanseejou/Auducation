cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "es6-promise-plugin.Promise",
      "file": "plugins/es6-promise-plugin/www/promise.js",
      "pluginId": "es6-promise-plugin",
      "runs": true
    },
    {
      "id": "cordova-plugin-screen-orientation.screenorientation",
      "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
      "pluginId": "cordova-plugin-screen-orientation",
      "clobbers": [
        "cordova.plugins.screenorientation"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open",
        "window.open"
      ]
    },
    {
      "id": "cordova-plugin-buildinfo.BuildInfo",
      "file": "plugins/cordova-plugin-buildinfo/www/buildinfo.js",
      "pluginId": "cordova-plugin-buildinfo",
      "clobbers": [
        "BuildInfo"
      ]
    },
    {
      "id": "cordova-universal-links-plugin.universalLinks",
      "file": "plugins/cordova-universal-links-plugin/www/universal_links.js",
      "pluginId": "cordova-universal-links-plugin",
      "clobbers": [
        "universalLinks"
      ]
    },
    {
      "id": "cordova-plugin-browsertab.BrowserTab",
      "file": "plugins/cordova-plugin-browsertab/www/browsertab.js",
      "pluginId": "cordova-plugin-browsertab",
      "clobbers": [
        "cordova.plugins.browsertab"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-screen-orientation": "3.0.2",
    "cordova-plugin-browsersync": "0.1.7",
    "cordova-plugin-inappbrowser": "3.1.0",
    "cordova-plugin-buildinfo": "4.0.0",
    "cordova-universal-links-plugin": "1.2.1",
    "cordova-plugin-browsertab": "0.2.0"
  };
});