(function (angular) {
  'use strict';
  /**
   * @ngdoc overview
   * @name ExpertsInside.SharePoint.Core
   *
   * @description
   *
   * # ExpertsInside.SharePoint.Core
   *
   * The ExpertsInside.SharePoint.Core module contains utility services
   * used by the other modules.
   */
  angular.module('ExpertsInside.SharePoint.Core', ['ng'])
    .run(function ($window, $log) {
      if (angular.isUndefined($window.ShareCoffee)) {
        $log.warn("ExpertsInside.SharePoint.Core module depends on ShareCoffee. " +
          "Please include ShareCoffee.js in your document");
      }
    });

  /**
   * @ngdoc overview
   * @name ExpertsInside.SharePoint.List
   * @requires ExpertsInside.SharePoint.Core
   *
   * @description
   *
   * # ExpertsInside.SharePoint.List
   *
   * The ExpertsInside.SharePoint.List module contains the
   * {@link ExpertsInside.SharePoint.List.$spList `$spList`} service,
   * a wrapper for the List REST API
   */
  angular.module('ExpertsInside.SharePoint.List', ['ExpertsInside.SharePoint.Core']);

  /**
   * @ngdoc overview
   * @name ExpertsInside.SharePoint.Search
   * @requires ExpertsInside.SharePoint.Core
   *
   * @description
   *
   * # ExpertsInside.SharePoint.Search
   *
   * The ExpertsInside.SharePoint.Search module contains the
   * {@link ExpertsInside.SharePoint.Search.$spSearch `$spSearch`} service,
   * a wrapper for the Search REST API.
   *
   * Include **ShareCoffee.Search.js** when using this module !
   */
  angular.module('ExpertsInside.SharePoint.Search', ['ExpertsInside.SharePoint.Core'])
    .run(function ($window, $log) {
      if (angular.isUndefined($window.ShareCoffee) || angular.isUndefined($window.ShareCoffee.QueryProperties)) {
        $log.warn("ExpertsInside.SharePoint.Search module depends on ShareCoffee.Search. " +
          "Please include ShareCoffee.Search.js in your document");
      }
    });

  /**
   * @ngdoc overview
   * @name ExpertsInside.SharePoint.User
   * @requires ExpertsInside.SharePoint.Core
   *
   * @description
   *
   * # ExpertsInside.SharePoint.User
   *
   * The ExpertsInside.SharePoint.User module contains the
   * {@link ExpertsInside.SharePoint.User.$spUser `$spUser`} service,
   * a wrapper for the User Profiles REST API
   *
   * Include **ShareCoffee.UserProfiles.js** when using this module !
   */
  angular.module('ExpertsInside.SharePoint.User', ['ExpertsInside.SharePoint.Core'])
    .run(function ($window, $log) {
      if (angular.isUndefined($window.ShareCoffee) || angular.isUndefined($window.ShareCoffee.UserProfileProperties)) {
        $log.warn("ExpertsInside.SharePoint.User module depends on ShareCoffee.UserProfiles. " +
          "Please include ShareCoffee.UserProfiles.js in your document");
      }
    });

  /**
   * @ngdoc overview
   * @name ExpertsInside.SharePoint.JSOM
   *
   * @description
   *
   * # ExpertsInside.SharePoint.JSOM
   *
   * The ExpertsInside.SharePoint.User module contains the
   * {@link ExpertsInside.SharePoint.User.$spUser `$spUser`} service,
   * a wrapper for the User Profiles REST API
   *
   * Include **ShareCoffee.UserProfiles.js** when using this module !
   */
  angular.module('ExpertsInside.SharePoint.JSOM', [])
    .run(function ($window, $log) {
      if (angular.isUndefined($window.SP) || angular.isUndefined($window.SP.ClientContext)) {
        $log.warn("ExpertsInside.SharePoint.JSOM module depends on the SharePoint Javascript Runtime. " +
          "For more information see: http://blogs.msdn.com/b/officeapps/archive/2012/09/04/using-the-javascript-object-model-jsom-in-apps-for-sharepoint.aspx");
      }
    });

  /**
   * @ngdoc overview
   * @name ExpertsInside.SharePoint
   * @requires ExpertsInside.SharePoint.Core
   * @requires ExpertsInside.SharePoint.List
   * @requires ExpertsInside.SharePoint.Search
   * @requires ExpertsInside.SharePoint.User
   * @requires ExpertsInside.SharePoint.JSOM
   *
   * @description
   *
   * # ExpertsInside.SharePoint
   *
   * The complete `angular-sharepoint` experience.
   *
   */
  angular.module('ExpertsInside.SharePoint', [
    'ExpertsInside.SharePoint.Core',
    'ExpertsInside.SharePoint.List',
    'ExpertsInside.SharePoint.Search',
    'ExpertsInside.SharePoint.User'
  ]);

})(window, angular);

/*
ShareCoffee (c) 2014 Thorsten Hans 
| dotnet-rocks.com | https://github.com/ThorstenHans/ShareCoffee/ | under MIT License |
*/


(function() {
  var root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  root = typeof window !== "undefined" && window !== null ? window : global;

  root.ShareCoffee || (root.ShareCoffee = {});

  root.ShareCoffee.CSOM = (function() {
    function _Class() {}

    _Class.getHostWeb = function(appWebCtx, hostWebUrl) {
      var hostWebCtx;
      hostWebCtx = new SP.AppContextSite(appWebCtx, hostWebUrl);
      return hostWebCtx.get_web();
    };

    return _Class;

  })();

  root = typeof window !== "undefined" && window !== null ? window : global;

  root.ShareCoffee || (root.ShareCoffee = {});

  root.ShareCoffee.Commons = (function() {
    function _Class() {}

    _Class.getQueryString = function() {
      if (document.URL.indexOf('?') === -1) {
        return "";
      }
      return document.URL.split("?")[1];
    };

    _Class.getQueryStringParameter = function(parameterName) {
      var p, parameterValue, params, _ref;
      params = this.getQueryString().split("&");
      parameterValue = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = params.length; _i < _len; _i++) {
          p = params[_i];
          if (p.split("=")[0] === parameterName) {
            _results.push(p.split("=")[1]);
          }
        }
        return _results;
      })();
      return (_ref = parameterValue[0]) != null ? _ref : '';
    };

    _Class.getAppWebUrl = function() {
      var appWebUrl, appWebUrlFromQueryString;
      if (ShareCoffee.Commons.loadAppWebUrlFrom != null) {
        if (typeof ShareCoffee.Commons.loadAppWebUrlFrom === 'string') {
          return ShareCoffee.Commons.loadAppWebUrlFrom;
        }
        return ShareCoffee.Commons.loadAppWebUrlFrom();
      } else if ((typeof _spPageContextInfo !== "undefined" && _spPageContextInfo !== null) && (_spPageContextInfo.webAbsoluteUrl != null)) {
        return _spPageContextInfo.webAbsoluteUrl;
      }
      appWebUrlFromQueryString = ShareCoffee.Commons.getQueryStringParameter("SPAppWebUrl");
      if (appWebUrlFromQueryString) {
        appWebUrl = decodeURIComponent(appWebUrlFromQueryString);
        return appWebUrl.replace(/#.*$/, '');
      } else {
        if (console && console.error) {
          console.error("_spPageContextInfo is not defined");
        }
        return "";
      }
    };

    _Class.getHostWebUrl = function() {
      var hostWebUrlFromQueryString;
      if (ShareCoffee.Commons.loadHostWebUrlFrom != null) {
        if (typeof ShareCoffee.Commons.loadHostWebUrlFrom === 'string') {
          return ShareCoffee.Commons.loadHostWebUrlFrom;
        }
        return ShareCoffee.Commons.loadHostWebUrlFrom();
      }
      hostWebUrlFromQueryString = ShareCoffee.Commons.getQueryStringParameter("SPHostUrl");
      if (hostWebUrlFromQueryString) {
        return decodeURIComponent(hostWebUrlFromQueryString);
      } else {
        if (console && console.error) {
          console.error("SPHostUrl is not defined in the QueryString");
        }
        return "";
      }
    };

    _Class.getApiRootUrl = function() {
      return "" + (ShareCoffee.Commons.getAppWebUrl()) + "/_api/";
    };

    _Class.getFormDigest = function() {
      var _ref;
      if (ShareCoffee.Commons.formDigestValue != null) {
        if (typeof ShareCoffee.Commons.formDigestValue === 'string') {
          return ShareCoffee.Commons.formDigestValue;
        }
        return ShareCoffee.Commons.formDigestValue();
      }
      return (_ref = document.getElementById('__REQUESTDIGEST')) != null ? _ref.value : void 0;
    };

    _Class.formDigestValue = null;

    _Class.infect = function(element) {
      var forms, hostUrl, links, _root;
      _root = element || document;
      hostUrl = ShareCoffee.Commons.getQueryStringParameter("SPHostUrl");
      links = _root.getElementsByTagName("a");
      forms = _root.getElementsByTagName("form");
      ShareCoffee.Commons._infectElements(links, "href", hostUrl);
      return ShareCoffee.Commons._infectElements(forms, "action", hostUrl);
    };

    _Class._getAuthorityFromUrl = function(url) {
      var match;
      if (url != null) {
        match = /^(?:https:\/\/|http:\/\/|\/\/)([^\/\?#]+)(?:\/|#|$|\?)/i.exec(url);
        if (match) {
          return match[1];
        }
      }
      return null;
    };

    _Class._infectElements = function(elements, attribute, hostUrl) {
      var currentAuthority, e, _i, _len, _results;
      currentAuthority = ShareCoffee.Commons._getAuthorityFromUrl(root.location.href);
      if (typeof element !== "undefined" && element !== null) {
        _results = [];
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          e = elements[_i];
          _results.push((function(e) {
            var elAuthority;
            if (e[attribute] != null) {
              elAuthority = ShareCoffee.Commons._getAuthorityFromUrl(e[attribute]);
              if (elAuthority && /^#|:/.test(e[attribute]) && (elAuthority.toUpperCase() === currentAuthority.toUpperCase())) {
                if (/sphosturl/i.test(e[attribute]) === false) {
                  if (e[attribute].indexOf("?") > -1) {
                    return e[attribute] = "" + e[attribute] + "&SPHostUrl=" + hostUrl;
                  } else {
                    return e[attribute] = "" + e[attribute] + "?SPHostUrl=" + hostUrl;
                  }
                }
              }
            }
          })(e));
        }
        return _results;
      }
    };

    return _Class;

  })();

  root = typeof global !== "undefined" && global !== null ? global : window;

  root.ShareCoffee || (root.ShareCoffee = {});

  root.ShareCoffee.JsonRequestBehaviors = {
    "default": 'application/json;odata=verbose',
    verbose: 'application/json;odata=verbose',
    minimal: 'application/json;odata=minimalmetadata',
    nometadata: 'application/json;odata=nometadata'
  };

  root.ShareCoffee.jsonRequestBehavior = "application/json;odata=verbose";

  root.ShareCoffee.Core = (function() {
    function _Class() {}

    _Class.checkConditions = function(errorMessage, condition) {
      if (condition() === false) {
        if (console && console.error) {
          console.error(errorMessage);
        }
        throw errorMessage;
      }
    };

    _Class.loadScript = function(scriptUrl, onLoaded, onError) {
      var head, s;
      s = document.createElement('script');
      head = document.getElementsByTagName('head').item(0);
      s.type = 'text/javascript';
      s.async = true;
      s.src = scriptUrl;
      s.onload = onLoaded;
      s.onerror = onError;
      return head.appendChild(s);
    };

    return _Class;

  })();

  if (root.$s == null) {
    root.$s = root.ShareCoffee;
  }

  root = typeof window !== "undefined" && window !== null ? window : global;

  root.ShareCoffee || (root.ShareCoffee = {});

  root.ShareCoffee.CrossDomainRESTFactory = (function() {
    function _Class(method, updateQuery) {
      this.method = method;
      this.updateQuery = updateQuery != null ? updateQuery : false;
      this.SPCrossDomainLib = __bind(this.SPCrossDomainLib, this);
    }

    _Class.prototype.SPCrossDomainLib = function(sharePointRestProperties) {
      var options, result;
      if ((sharePointRestProperties != null) && (sharePointRestProperties.getRequestProperties != null)) {
        sharePointRestProperties = sharePointRestProperties.getRequestProperties();
      }
      options = new ShareCoffee.REST.RequestProperties();
      options.extend(sharePointRestProperties);
      if (ShareCoffee.CrossDomain.crossDomainLibrariesLoaded === false) {
        throw 'Cross Domain Libraries not loaded, call ShareCoffee.CrossDomain.loadCrossDomainLibrary() before acting with the CrossDomain REST libraries';
      }
      if (this.method === 'DELETE' || (this.updateQuery === true && (options.eTag == null))) {
        options.eTag = '*';
      }
      result = {
        url: options.hostWebUrl != null ? "" + (ShareCoffee.Commons.getApiRootUrl()) + "SP.AppContextSite(@target)/" + options.url + "?@target='" + options.hostWebUrl + "'" : "" + (ShareCoffee.Commons.getApiRootUrl()) + options.url,
        method: this.method,
        success: options.onSuccess,
        error: options.onError,
        headers: {
          'Accept': ShareCoffee.jsonRequestBehavior,
          'Content-Type': ShareCoffee.REST.contentType,
          'X-HTTP-Method': 'MERGE',
          'If-Match': options.eTag
        },
        body: typeof options.payload === 'string' ? options.payload : JSON.stringify(options.payload)
      };
      if (this.method === 'GET') {
        delete result.headers['X-RequestDigest'];
        delete result.headers['Content-Type'];
      }
      if (!(this.method === 'POST' && (options.eTag != null))) {
        delete result.headers['X-HTTP-Method'];
      }
      if (!(this.method === 'DELETE' || (this.method === 'POST' && (options.eTag != null)))) {
        delete result.headers['If-Match'];
      }
      if (options.onSuccess == null) {
        delete result.success;
      }
      if (options.onError == null) {
        delete result.error;
      }
      if (this.method !== 'POST') {
        delete result.body;
      }
      return result;
    };

    return _Class;

  })();

  root.ShareCoffee.CrossDomain = (function() {
    function _Class() {}

    _Class.crossDomainLibrariesLoaded = false;

    _Class.csomCrossDomainLibrariesLoaded = false;

    _Class.loadCSOMCrossDomainLibraries = function(onSuccess, onError) {
      var onAnyError, requestExecutorScriptUrl, runtimeScriptUrl, spScriptUrl,
        _this = this;
      onAnyError = function() {
        ShareCoffee.CrossDomain.csomCrossDomainLibrariesLoaded = false;
        if (onError) {
          return onError();
        }
      };
      if (ShareCoffee.CrossDomain.csomCrossDomainLibrariesLoaded === true) {
        if (onSuccess) {
          onSuccess();
        }
        return;
      }
      runtimeScriptUrl = "" + (ShareCoffee.Commons.getHostWebUrl()) + "/_layouts/15/SP.Runtime.js";
      spScriptUrl = "" + (ShareCoffee.Commons.getHostWebUrl()) + "/_layouts/15/SP.js";
      requestExecutorScriptUrl = "" + (ShareCoffee.Commons.getHostWebUrl()) + "/_layouts/15/SP.RequestExecutor.js";
      return ShareCoffee.Core.loadScript(runtimeScriptUrl, function() {
        return ShareCoffee.Core.loadScript(spScriptUrl, function() {
          return ShareCoffee.Core.loadScript(requestExecutorScriptUrl, function() {
            ShareCoffee.CrossDomain.csomCrossDomainLibrariesLoaded = true;
            if (onSuccess) {
              return onSuccess();
            }
          }, onAnyError);
        }, onAnyError);
      }, onAnyError);
    };

    _Class.loadCrossDomainLibrary = function(onSuccess, onError) {
      var onAnyError, requestExecutorScriptUrl,
        _this = this;
      onAnyError = function() {
        ShareCoffee.CrossDomain.crossDomainLibrariesLoaded = false;
        if (onError) {
          return onError();
        }
      };
      if (ShareCoffee.CrossDomain.crossDomainLibrariesLoaded === true) {
        if (onSuccess) {
          onSuccess();
        }
        return;
      }
      requestExecutorScriptUrl = "" + (ShareCoffee.Commons.getHostWebUrl()) + "/_layouts/15/SP.RequestExecutor.js";
      return ShareCoffee.Core.loadScript(requestExecutorScriptUrl, function() {
        ShareCoffee.CrossDomain.crossDomainLibrariesLoaded = true;
        if (onSuccess) {
          return onSuccess();
        }
      }, onAnyError);
    };

    _Class.build = {
      create: {
        "for": new ShareCoffee.CrossDomainRESTFactory('POST'),
        f: new ShareCoffee.CrossDomainRESTFactory('POST')
      },
      read: {
        "for": new ShareCoffee.CrossDomainRESTFactory('GET'),
        f: new ShareCoffee.CrossDomainRESTFactory('GET')
      },
      update: {
        "for": new ShareCoffee.CrossDomainRESTFactory('POST', true),
        f: new ShareCoffee.CrossDomainRESTFactory('POST', true)
      },
      "delete": {
        "for": new ShareCoffee.CrossDomainRESTFactory('DELETE'),
        f: new ShareCoffee.CrossDomainRESTFactory('DELETE')
      },
      del: {
        "for": new ShareCoffee.CrossDomainRESTFactory('DELETE'),
        f: new ShareCoffee.CrossDomainRESTFactory('DELETE')
      }
    };

    _Class.getClientContext = function() {
      var appWebUrl, ctx, factory;
      if (ShareCoffee.CrossDomain.csomCrossDomainLibrariesLoaded === false) {
        throw 'Cross Domain Libraries not loaded, call ShareCoffee.CrossDomain.loadCSOMCrossDomainLibraries() before acting with the ClientCotext';
      }
      appWebUrl = ShareCoffee.Commons.getAppWebUrl();
      ctx = new SP.ClientContext(appWebUrl);
      factory = new SP.ProxyWebRequestExecutorFactory(appWebUrl);
      ctx.set_webRequestExecutorFactory(factory);
      return ctx;
    };

    _Class.getHostWeb = function(ctx, hostWebUrl) {
      var appContextSite;
      if (hostWebUrl == null) {
        hostWebUrl = ShareCoffee.Commons.getHostWebUrl();
      }
      if (ShareCoffee.CrossDomain.csomCrossDomainLibrariesLoaded === false) {
        throw 'Cross Domain Libraries not loaded, call ShareCoffee.CrossDomain.loadCSOMCrossDomainLibraries() before acting with the ClientCotext';
      }
      if (ctx == null) {
        throw 'ClientContext cant be null, call ShareCoffee.CrossDomain.getClientContext() first';
      }
      appContextSite = new SP.AppContextSite(ctx, hostWebUrl);
      return appContextSite.get_web();
    };

    return _Class;

  })();

  root = typeof window !== "undefined" && window !== null ? window : global;

  root.ShareCoffee || (root.ShareCoffee = {});

  root.ShareCoffee.RESTFactory = (function() {
    function _Class(method, updateQuery) {
      this.method = method;
      this.updateQuery = updateQuery != null ? updateQuery : false;
      this.reqwest = __bind(this.reqwest, this);
      this.angularJS = __bind(this.angularJS, this);
      this.jQuery = __bind(this.jQuery, this);
    }

    _Class.prototype.jQuery = function(jQueryProperties) {
      var options, result;
      if ((jQueryProperties != null) && (jQueryProperties.getRequestProperties != null)) {
        jQueryProperties = jQueryProperties.getRequestProperties();
      }
      options = new ShareCoffee.REST.RequestProperties();
      options.extend(jQueryProperties);
      if (this.method === 'DELETE' || (this.updateQuery === true && (options.eTag == null))) {
        options.eTag = '*';
      }
      result = {
        url: options.getUrl(),
        type: this.method,
        contentType: ShareCoffee.REST.contentType,
        headers: {
          'Accept': ShareCoffee.jsonRequestBehavior,
          'X-HTTP-Method': 'MERGE',
          'If-Match': options.eTag
        },
        data: typeof options.payload === 'string' ? options.payload : JSON.stringify(options.payload)
      };
      if (this.method === 'GET') {
        delete result.contentType;
      } else {
        result.headers['X-RequestDigest'] = ShareCoffee.Commons.getFormDigest();
      }
      if (!(this.method === 'POST' && (options.eTag != null))) {
        delete result.headers['X-HTTP-Method'];
      }
      if (!(this.method === 'DELETE' || (this.method === 'POST' && (options.eTag != null)))) {
        delete result.headers['If-Match'];
      }
      if (this.method !== 'POST') {
        delete result.data;
      }
      return result;
    };

    _Class.prototype.angularJS = function(angularProperties) {
      var options, result, stringify;
      if ((angularProperties != null) && (angularProperties.getRequestProperties != null)) {
        angularProperties = angularProperties.getRequestProperties();
      }
      options = new ShareCoffee.REST.RequestProperties();
      options.extend(angularProperties);
      if (this.method === 'DELETE' || (this.updateQuery === true && (options.eTag == null))) {
        options.eTag = '*';
      }
      stringify = typeof root.angular !== "undefined" ? root.angular.toJson : JSON.stringify;
      result = {
        url: options.getUrl(),
        method: this.method,
        headers: {
          'Accept': ShareCoffee.jsonRequestBehavior,
          'Content-Type': ShareCoffee.REST.contentType,
          'X-HTTP-Method': 'MERGE',
          'If-Match': options.eTag
        },
        data: typeof options.payload === 'string' ? options.payload : stringify(options.payload)
      };
      if (this.method === 'GET') {
        delete result.headers['Content-Type'];
      } else {
        result.headers['X-RequestDigest'] = ShareCoffee.Commons.getFormDigest();
      }
      if (!(this.method === 'POST' && (options.eTag != null))) {
        delete result.headers['X-HTTP-Method'];
      }
      if (!(this.method === 'DELETE' || (this.method === 'POST' && (options.eTag != null)))) {
        delete result.headers['If-Match'];
      }
      if (this.method !== 'POST') {
        delete result.data;
      }
      return result;
    };

    _Class.prototype.reqwest = function(reqwestProperties) {
      var Error, options, result;
      if ((reqwestProperties != null) && (reqwestProperties.getRequestProperties != null)) {
        reqwestProperties = reqwestProperties.getRequestProperties();
      }
      options = new ShareCoffee.REST.RequestProperties();
      options.extend(reqwestProperties);
      if (this.method === 'DELETE' || (this.updateQuery === true && (options.eTag == null))) {
        options.eTag = '*';
      }
      result = null;
      try {
        result = {
          url: options.getUrl(),
          type: 'json',
          method: this.method.toLowerCase(),
          contentType: ShareCoffee.REST.contentType,
          headers: {
            'Accept': ShareCoffee.jsonRequestBehavior,
            'If-Match': options.eTag,
            'X-HTTP-Method': 'MERGE'
          },
          data: (options.payload != null) && typeof options.payload === 'string' ? options.payload : JSON.stringify(options.payload),
          success: options.onSuccess,
          error: options.onError
        };
        if (this.method === 'GET') {
          delete result.contentType;
        } else {
          result.headers['X-RequestDigest'] = ShareCoffee.Commons.getFormDigest();
        }
        if (!(this.method === 'POST' && (options.eTag != null))) {
          delete result.headers['X-HTTP-Method'];
        }
        if (!(this.method === 'DELETE' || (this.method === 'POST' && (options.eTag != null)))) {
          delete result.headers['If-Match'];
        }
        if (this.method !== 'POST') {
          delete result.data;
        }
        if (options.onSuccess == null) {
          delete result.success;
        }
        if (options.onError == null) {
          delete result.error;
        }
      } catch (_error) {
        Error = _error;
        throw 'please provide either a json string or an object as payload';
      }
      return result;
    };

    return _Class;

  })();

  root.ShareCoffee.REST = (function() {
    function _Class() {}

    _Class.contentType = "application/json";

    _Class.build = {
      create: {
        "for": new ShareCoffee.RESTFactory('POST'),
        f: new ShareCoffee.RESTFactory('POST')
      },
      read: {
        "for": new ShareCoffee.RESTFactory('GET'),
        f: new ShareCoffee.RESTFactory('GET')
      },
      update: {
        "for": new ShareCoffee.RESTFactory('POST', true),
        f: new ShareCoffee.RESTFactory('POST', true)
      },
      "delete": {
        "for": new ShareCoffee.RESTFactory('DELETE'),
        f: new ShareCoffee.RESTFactory('DELETE')
      },
      del: {
        "for": new ShareCoffee.RESTFactory('DELETE'),
        f: new ShareCoffee.RESTFactory('DELETE')
      }
    };

    return _Class;

  })();

  root.ShareCoffee.REST.RequestProperties = (function() {
    function _Class(url, payload, hostWebUrl, eTag, onSuccess, onError) {
      this.url = url;
      this.payload = payload;
      this.hostWebUrl = hostWebUrl;
      this.eTag = eTag;
      this.onSuccess = onSuccess;
      this.onError = onError;
      this.extend = __bind(this.extend, this);
      this.getUrl = __bind(this.getUrl, this);
      if (this.url == null) {
        this.url = null;
      }
      if (this.payload == null) {
        this.payload = null;
      }
      if (this.hostWebUrl == null) {
        this.hostWebUrl = null;
      }
      if (this.eTag == null) {
        this.eTag = null;
      }
      if (this.onSuccess == null) {
        this.onSuccess = null;
      }
      if (this.onError == null) {
        this.onError = null;
      }
    }

    _Class.prototype.getUrl = function() {
      if (this.hostWebUrl != null) {
        if (this.url.indexOf("?") === -1) {
          return "" + (ShareCoffee.Commons.getApiRootUrl()) + "SP.AppContextSite(@target)/" + this.url + "?@target='" + this.hostWebUrl + "'";
        } else {
          return "" + (ShareCoffee.Commons.getApiRootUrl()) + "SP.AppContextSite(@target)/" + this.url + "&@target='" + this.hostWebUrl + "'";
        }
      } else {
        return "" + (ShareCoffee.Commons.getApiRootUrl()) + this.url;
      }
    };

    _Class.prototype.extend = function() {
      var key, object, objects, value, _i, _len;
      objects = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        for (key in object) {
          value = object[key];
          this[key] = value;
        }
      }
    };

    return _Class;

  })();

  root = typeof window !== "undefined" && window !== null ? window : global;

  root.ShareCoffee || (root.ShareCoffee = {});

  root.ShareCoffee.SettingsLink = function(url, title, appendQueryStringToUrl) {
    if (appendQueryStringToUrl == null) {
      appendQueryStringToUrl = false;
    }
    return {
      linkUrl: appendQueryStringToUrl ? "" + url + "?" + (ShareCoffee.Commons.getQueryString()) : url,
      displayName: title
    };
  };

  root.ShareCoffee.ChromeSettings = function() {
    var helpPageUrl, iconUrl, settingsLinkSplat, title;
    iconUrl = arguments[0], title = arguments[1], helpPageUrl = arguments[2], settingsLinkSplat = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
    return {
      appIconUrl: iconUrl,
      appTitle: title,
      appHelpPageUrl: helpPageUrl,
      settingsLinks: settingsLinkSplat
    };
  };

  root.ShareCoffee.UI = (function() {
    function _Class() {}

    _Class.showNotification = function(message, isSticky) {
      var condition;
      if (isSticky == null) {
        isSticky = false;
      }
      condition = function() {
        return (typeof SP !== "undefined" && SP !== null) && (SP.UI != null) && (SP.UI.Notify != null) && (SP.UI.Notify.addNotification != null);
      };
      ShareCoffee.Core.checkConditions("SP, SP.UI or SP.UI.Notify is not defined (check if core.js is loaded)", condition);
      return SP.UI.Notify.addNotification(message, isSticky);
    };

    _Class.removeNotification = function(notificationId) {
      var condition;
      if (notificationId == null) {
        return;
      }
      condition = function() {
        return (typeof SP !== "undefined" && SP !== null) && (SP.UI != null) && (SP.UI.Notify != null) && (SP.UI.Notify.removeNotification != null);
      };
      ShareCoffee.Core.checkConditions("SP, SP.UI or SP.UI.Notify is not defined (check if core.js is loaded)", condition);
      return SP.UI.Notify.removeNotification(notificationId);
    };

    _Class.showStatus = function(title, contentAsHtml, showOnTop, color) {
      var condition, statusId;
      if (showOnTop == null) {
        showOnTop = false;
      }
      if (color == null) {
        color = 'blue';
      }
      condition = function() {
        return (typeof SP !== "undefined" && SP !== null) && (SP.UI != null) && (SP.UI.Status != null) && (SP.UI.Status.addStatus != null) && (SP.UI.Status.setStatusPriColor != null);
      };
      ShareCoffee.Core.checkConditions("SP, SP.UI or SP.UI.Status is not defined! (check if core.js is loaded)", condition);
      statusId = SP.UI.Status.addStatus(title, contentAsHtml, showOnTop);
      SP.UI.Status.setStatusPriColor(statusId, color);
      return statusId;
    };

    _Class.removeStatus = function(statusId) {
      var condition;
      if (statusId == null) {
        return;
      }
      condition = function() {
        return (typeof SP !== "undefined" && SP !== null) && (SP.UI != null) && (SP.UI.Status != null) && (SP.UI.Status.removeStatus != null);
      };
      ShareCoffee.Core.checkConditions("SP, SP.UI or SP.UI.Status is not defined! (check if core.js is loaded)", condition);
      return SP.UI.Status.removeStatus(statusId);
    };

    _Class.removeAllStatus = function() {
      var condition;
      condition = function() {
        return (typeof SP !== "undefined" && SP !== null) && (SP.UI != null) && (SP.UI.Status != null) && (SP.UI.Status.removeAllStatus != null);
      };
      ShareCoffee.Core.checkConditions("SP, SP.UI or SP.UI.Status is not defined! (check if core.js is loaded)", condition);
      return SP.UI.Status.removeAllStatus();
    };

    _Class.setStatusColor = function(statusId, color) {
      var condition;
      if (color == null) {
        color = 'blue';
      }
      if (statusId == null) {
        return;
      }
      condition = function() {
        return (typeof SP !== "undefined" && SP !== null) && (SP.UI != null) && (SP.UI.Status != null) && (SP.UI.Status.setStatusPriColor != null);
      };
      ShareCoffee.Core.checkConditions("SP, SP.UI or SP.UI.Status is not defined! (check if core.js is loaded)", condition);
      return SP.UI.Status.setStatusPriColor(statusId, color);
    };

    _Class.onChromeLoadedCallback = null;

    _Class.loadAppChrome = function(placeHolderId, chromeSettings, onAppChromeLoaded) {
      var onScriptLoaded, scriptUrl,
        _this = this;
      if (onAppChromeLoaded == null) {
        onAppChromeLoaded = void 0;
      }
      if (onAppChromeLoaded != null) {
        ShareCoffee.UI.onChromeLoadedCallback = onAppChromeLoaded;
        chromeSettings.onCssLoaded = "ShareCoffee.UI.onChromeLoadedCallback()";
      }
      onScriptLoaded = function() {
        var chrome;
        chrome = new SP.UI.Controls.Navigation(placeHolderId, chromeSettings);
        return chrome.setVisible(true);
      };
      scriptUrl = "" + (ShareCoffee.Commons.getHostWebUrl()) + "/_layouts/15/SP.UI.Controls.js";
      return ShareCoffee.Core.loadScript(scriptUrl, onScriptLoaded, function() {
        throw "Error loading SP.UI.Controls.js";
      });
    };

    return _Class;

  })();

}).call(this);

/*
//@ sourceMappingURL=ShareCoffee.js.map
*/
/*
ShareCoffee.Search (c) 2014 Thorsten Hans
| dotnet-rocks.com | https://github.com/ThorstenHans/ShareCoffee.Search/ | under MIT License |
*/


(function() {
  var root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = typeof global !== "undefined" && global !== null ? global : window;

  if (root.ShareCoffee == null) {
    throw new Error("LoadError");
  }

  root.ShareCoffee.MaxUrlLength = 2000;

  if (root.ShareCoffee.Url == null) {
    root.ShareCoffee.Url = {};
  }

  root.ShareCoffee.Url.Query = "Search/query";

  root.ShareCoffee.Url.PostQuery = "Search/postquery";

  root.ShareCoffee.Url.Suggest = "Search/suggest";

  root.ShareCoffee.QueryProperties = (function() {
    function _Class(querytext, selectproperties, querytemplate) {
      this.querytext = querytext;
      this.selectproperties = selectproperties;
      this.querytemplate = querytemplate;
      this.validateUrl = __bind(this.validateUrl, this);
      this.getRequestProperties = __bind(this.getRequestProperties, this);
      this.getUrl = __bind(this.getUrl, this);
      if (this.querytext == null) {
        this.querytext = null;
      }
      this.isPostQuery = false;
      if (this.querytemplate == null) {
        this.querytemplate = null;
      }
      if (this.enableinterleaving == null) {
        this.enableinterleaving = null;
      }
      if (this.sourceid == null) {
        this.sourceid = null;
      }
      if (this.rankingmodelid == null) {
        this.rankingmodelid = null;
      }
      if (this.startrow == null) {
        this.startrow = null;
      }
      if (this.rowlimit == null) {
        this.rowlimit = null;
      }
      if (this.rowsperpage == null) {
        this.rowsperpage = null;
      }
      if (this.selectproperties == null) {
        this.selectproperties = null;
      }
      if (this.culture == null) {
        this.culture = null;
      }
      if (this.refiners == null) {
        this.refiners = null;
      }
      if (this.refinementfilters == null) {
        this.refinementfilters = null;
      }
      if (this.hiddenconstraints == null) {
        this.hiddenconstraints = null;
      }
      if (this.sortlist == null) {
        this.sortlist = null;
      }
      if (this.enablestemming == null) {
        this.enablestemming = null;
      }
      if (this.trimduplicates == null) {
        this.trimduplicates = null;
      }
      if (this.trimduplicatesincludeid == null) {
        this.trimduplicatesincludeid = null;
      }
      if (this.timeout == null) {
        this.timeout = null;
      }
      if (this.enablenicknames == null) {
        this.enablenicknames = null;
      }
      if (this.enablephonetic == null) {
        this.enablephonetic = null;
      }
      if (this.enablefql == null) {
        this.enablefql = null;
      }
      if (this.hithighlightedproperties == null) {
        this.hithighlightedproperties = null;
      }
      if (this.bypassresulttypes == null) {
        this.bypassresulttypes = null;
      }
      if (this.processbestbets == null) {
        this.processbestbets = null;
      }
      if (this.clienttype == null) {
        this.clienttype = null;
      }
      if (this.personalizationdata == null) {
        this.personalizationdata = null;
      }
      if (this.resultsurl == null) {
        this.resultsurl = null;
      }
      if (this.querytag == null) {
        this.querytag = null;
      }
      if (this.enablequeryrules == null) {
        this.enablequeryrules = null;
      }
      if (this.enablesorting == null) {
        this.enablesorting = null;
      }
      this.hostWebUrl = null;
      this.onSuccess = null;
      this.onError = null;
    }

    _Class.prototype.getUrl = function() {
      var getSafeStringForREST, p, propertyValue, url, urlProperties;
      urlProperties = ['querytext', 'querytemplate', 'enableinterleaving', 'sourceid', 'rankingmodelid', 'startrow', 'rowlimit', 'rowsperpage', 'selectproperties', 'culture', 'refiners', 'refinementfilters', 'hiddenconstraints', 'sortlist', 'enablestemming', 'trimduplicates', 'trimduplicatesincludeid', 'timeout', 'enablenicknames', 'enablephonetic', 'enablefql', 'hithighlightedproperties', 'bypassresulttypes', 'processbestbets', 'clienttype', 'personalizationdata', 'resultsurl', 'querytag', 'enablequeryrules', 'enablesorting'];
      getSafeStringForREST = function(input) {
        return encodeURIComponent(input.replace(/'/g, '"'));
      };
      url = "" + ShareCoffee.Url.Query + "?";
      for (p in this) {
        propertyValue = this[p];
        if (urlProperties.indexOf(p) > -1 && (propertyValue != null)) {
          if (typeof propertyValue === 'string') {
            url = "" + url + p + "='" + (getSafeStringForREST(propertyValue)) + "'&";
          } else if (typeof propertyValue === 'number' || typeof propertyValue === 'boolean') {
            url = "" + url + p + "=" + propertyValue + "&";
          }
        }
      }
      return url.substr(0, url.length - 1);
    };

    _Class.prototype.getRequestProperties = function() {
      this.validateUrl();
      return new ShareCoffee.REST.RequestProperties(this.getUrl(), null, this.hostWebUrl, null, this.onSuccess, this.onError);
    };

    _Class.prototype.validateUrl = function() {
      var url;
      url = "";
      if (this.hostWebUrl != null) {
        url = "" + (ShareCoffee.Commons.getApiRootUrl()) + "SP.AppContextSite(@target)/" + (this.getUrl()) + "?@target='" + this.hostWebUrl + "'";
      } else {
        url = "" + (ShareCoffee.Commons.getApiRootUrl()) + (this.getUrl());
      }
      if (url.length > ShareCoffee.MaxUrlLength) {
        throw new Error('URL is to long, please use a PostQuery instead of a regular GET Query');
      }
    };

    return _Class;

  })();

  root.ShareCoffee.PostQueryProperties = (function() {
    function _Class(Querytext, SelectProperties, QueryTemplate) {
      this.Querytext = Querytext;
      this.SelectProperties = SelectProperties;
      this.QueryTemplate = QueryTemplate;
      this.isPostQuery = true;
      if (this.Querytext == null) {
        this.Querytext = null;
      }
      if (this.Culture == null) {
        this.Culture = null;
      }
      if (this.EnableIterleaving == null) {
        this.EnableIterleaving = null;
      }
      if (this.EnableNicknames == null) {
        this.EnableNicknames = null;
      }
      if (this.EnablePhonetic == null) {
        this.EnablePhonetic = null;
      }
      if (this.EnableStemming == null) {
        this.EnableStemming = null;
      }
      if (this.HiddenConstraints == null) {
        this.HiddenConstraints = null;
      }
      if (this.RankingModelId == null) {
        this.RankingModelId = null;
      }
      if (this.RefinementFilters == null) {
        this.RefinementFilters = null;
      }
      if (this.Refiners == null) {
        this.Refiners = null;
      }
      if (this.RowLimit == null) {
        this.RowLimit = null;
      }
      if (this.RowsPerPage == null) {
        this.RowsPerPage = null;
      }
      if (this.SelectProperties == null) {
        this.SelectProperties = null;
      }
      if (this.SourceId == null) {
        this.SourceId = null;
      }
      if (this.StartRow == null) {
        this.StartRow = null;
      }
      if (this.Timeout == null) {
        this.Timeout = null;
      }
      if (this.TrimDuplicates == null) {
        this.TrimDuplicates = null;
      }
      if (this.EnableFQL == null) {
        this.EnableFQL = null;
      }
      if (this.BypassResultTypes == null) {
        this.BypassResultTypes = null;
      }
      if (this.ClientType == null) {
        this.ClientType = null;
      }
      if (this.HitHighlightedProperties == null) {
        this.HitHighlightedProperties = null;
      }
      if (this.ProcessBestBets == null) {
        this.ProcessBestBets = null;
      }
      if (this.QueryTag == null) {
        this.QueryTag = null;
      }
      if (this.ResultsUrl == null) {
        this.ResultsUrl = null;
      }
      if (this.TrimDuplicatesIncludeId == null) {
        this.TrimDuplicatesIncludeId = null;
      }
      if (this.BlockDedupeMode == null) {
        this.BlockDedupeMode = null;
      }
      if (this.CollapseSpecification == null) {
        this.CollapseSpecification = null;
      }
      if (this.DesiredSnippetLength == null) {
        this.DesiredSnippetLength = null;
      }
      if (this.EnableOrderingHitHighlightedProperty == null) {
        this.EnableOrderingHitHighlightedProperty = null;
      }
      if (this.EnableQueryRules == null) {
        this.EnableQueryRules = null;
      }
      if (this.EnableSorting == null) {
        this.EnableSorting = null;
      }
      if (this.GenerateBlockRankLog == null) {
        this.GenerateBlockRankLog = null;
      }
      if (this.HitHighlightedMultivaluePropertyLimit == null) {
        this.HitHighlightedMultivaluePropertyLimit = null;
      }
      if (this.ImpressionId == null) {
        this.ImpressionId = null;
      }
      if (this.MaxSnippetLength == null) {
        this.MaxSnippetLength = null;
      }
      if (this.PersonalizationData == null) {
        this.PersonalizationData = null;
      }
      if (this.ProcessPersonalFavorites == null) {
        this.ProcessPersonalFavorites = null;
      }
      if (this.Properties == null) {
        this.Properties = null;
      }
      if (this.QueryTemplate == null) {
        this.QueryTemplate = null;
      }
      if (this.ReorderingRules == null) {
        this.ReorderingRules = null;
      }
      if (this.SortList == null) {
        this.SortList = null;
      }
      if (this.SummaryLength == null) {
        this.SummaryLength = null;
      }
      if (this.TotalRowsExactMinimum == null) {
        this.TotalRowsExactMinimum = null;
      }
      if (this.UILanguage == null) {
        this.UILanguage = null;
      }
      if (this.QueryTemplatePropertiesUrl == null) {
        this.QueryTemplatePropertiesUrl = null;
      }
    }

    _Class.prototype.getRequestProperties = function() {
      var p, payload, propertyValue, urlProperties;
      payload = {
        'request': {}
      };
      urlProperties = ['Querytext', 'Culture', 'EnableIterleaving', 'EnableNicknames', 'EnablePhonetic', 'EnableStemming', 'HiddenConstraints', 'RankingModelId', 'RefinementFilters', 'Refiners', 'RowLimit', 'RowsPerPage', 'SelectProperties', 'SourceId', 'StartRow', 'Timeout', 'TrimDuplicates', 'EnableFQL', 'BypassResultTypes', 'ClientType', 'HitHighlightedProperties', 'ProcessBestBets', 'QueryTag', 'ResultsUrl', 'TrimDuplicatesIncludeId', 'BlockDedupeMode', 'CollapseSpecification', 'DesiredSnippetLength', 'EnableOrderingHitHighlightedProperty', 'EnableQueryRules', 'EnableSorting', 'GenerateBlockRankLog', 'HitHighlightedMultivaluePropertyLimit', 'ImpressionId', 'MaxSnippetLength', 'PersonalizationData', 'ProcessPersonalFavorites', 'Properties', 'QueryTemplate', 'ReorderingRules', 'SortList', 'SummaryLength', 'TotalRowsExactMinimum', 'UILanguage', 'QueryTemplatePropertiesUrl'];
      for (p in this) {
        propertyValue = this[p];
        if (urlProperties.indexOf(p) > -1 && (propertyValue != null)) {
          payload['request'][p] = this[p];
        }
      }
      return new ShareCoffee.REST.RequestProperties(ShareCoffee.Url.PostQuery, payload, this.hostWebUrl, null, this.onSuccess, this.onError);
    };

    return _Class;

  })();

  root.ShareCoffee.SuggestProperties = (function() {
    function _Class(querytext, inumberofquerysuggestions, inumberofresultsuggestions, fprequerysuggestions, fhithighlighting, fcapitalizefirstletters, showpeoplenamesuggestions, culture) {
      this.querytext = querytext;
      this.inumberofquerysuggestions = inumberofquerysuggestions;
      this.inumberofresultsuggestions = inumberofresultsuggestions;
      this.fprequerysuggestions = fprequerysuggestions;
      this.fhithighlighting = fhithighlighting;
      this.fcapitalizefirstletters = fcapitalizefirstletters;
      this.showpeoplenamesuggestions = showpeoplenamesuggestions;
      this.culture = culture;
      this.getUrl = __bind(this.getUrl, this);
      this.getRequestProperties = __bind(this.getRequestProperties, this);
      if (this.querytext == null) {
        this.querytext = null;
      }
      if (this.inumberofquerysuggestions == null) {
        this.inumberofquerysuggestions = null;
      }
      if (this.inumberofresultsuggestions == null) {
        this.inumberofresultsuggestions = null;
      }
      if (this.fprequerysuggestions == null) {
        this.fprequerysuggestions = null;
      }
      if (this.fhithighlighting == null) {
        this.fhithighlighting = null;
      }
      if (this.fcapitalizefirstletters == null) {
        this.fcapitalizefirstletters = null;
      }
      if (this.showpeoplenamesuggestions == null) {
        this.showpeoplenamesuggestions = null;
      }
      if (this.culture == null) {
        this.culture = null;
      }
      this.hostWebUrl = null;
      this.onSuccess = null;
      this.onError = null;
    }

    _Class.prototype.getRequestProperties = function() {
      return new ShareCoffee.REST.RequestProperties(this.getUrl(), null, this.hostWebUrl, null, this.onSuccess, this.onError);
    };

    _Class.prototype.getUrl = function() {
      var getSafeStringForREST, p, propertyValue, url, urlProperties;
      urlProperties = ['querytext', 'inumberofquerysuggestions', 'inumberofresultsuggestions', 'fprequerysuggestions', 'fhithighlighting', 'fcapitalizefirstletters', 'showpeoplenamesuggestions', 'culture'];
      url = "" + ShareCoffee.Url.Suggest + "?";
      getSafeStringForREST = function(input) {
        return encodeURIComponent(input.replace(/'/g, '"'));
      };
      for (p in this) {
        propertyValue = this[p];
        if (urlProperties.indexOf(p) > -1 && (propertyValue != null)) {
          if (typeof propertyValue === 'string') {
            url = "" + url + p + "='" + (getSafeStringForREST(propertyValue)) + "'&";
          } else if (typeof propertyValue === 'number' || typeof propertyValue === 'boolean') {
            url = "" + url + p + "=" + propertyValue + "&";
          }
        }
      }
      return url.substr(0, url.length - 1);
    };

    return _Class;

  })();

}).call(this);

/*
//@ sourceMappingURL=ShareCoffee.Search.js.map
*/
/*
ShareCoffee.UserProfiles (c) 2014 Thorsten Hans
| dotnet-rocks.com | https://github.com/ThorstenHans/ShareCoffee.UserProfiles/ | under MIT License |
*/


(function() {
  var root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  root = typeof global !== "undefined" && global !== null ? global : window;

  if ((root.ShareCoffee == null) || (root.ShareCoffee.REST == null)) {
    throw new Error("LoadError");
  }

  if (root.ShareCoffee.Url == null) {
    root.ShareCoffee.Url = {};
  }

  root.ShareCoffee.Url.SetMyProfilePicture = "SP.UserProfiles.PeopleManager/SetMyProfilePicture";

  root.ShareCoffee.Url.GetMyProperties = "SP.UserProfiles.PeopleManager/GetMyProperties";

  root.ShareCoffee.Url.GetProperties = "SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v=";

  root.ShareCoffee.Url.GetUserProfileProperty = "SP.UserProfiles.PeopleManager/GetUserProfilePropertyFor(accountName=@v, propertyName=@p)?@v=&@p=";

  root.ShareCoffee.ProfilePictureProperties = (function() {
    function _Class(profilePicture, onSuccess, onError) {
      this.profilePicture = profilePicture;
      this.onSuccess = onSuccess;
      this.onError = onError;
      this.getRequestProperties = __bind(this.getRequestProperties, this);
      if (this.profilePicture == null) {
        this.profilePicture = null;
      }
      if (this.onSuccess == null) {
        this.onSuccess = null;
      }
      if (this.onError == null) {
        this.onError = null;
      }
      this.url = ShareCoffee.Url.SetMyProfilePicture;
    }

    _Class.prototype.getRequestProperties = function() {
      var payload;
      payload = this.profilePicture;
      return new ShareCoffee.REST.RequestProperties(this.url, payload, null, null, this.onSuccess, this.onError);
    };

    return _Class;

  })();

  root.ShareCoffee.UserProfileProperties = (function() {
    function _Class() {
      var accountName, onError, onSuccess, propertyNames, url;
      url = arguments[0], accountName = arguments[1], onSuccess = arguments[2], onError = arguments[3], propertyNames = 5 <= arguments.length ? __slice.call(arguments, 4) : [];
      this.url = url;
      this.accountName = accountName != null ? accountName : null;
      this.onSuccess = onSuccess != null ? onSuccess : null;
      this.onError = onError != null ? onError : null;
      this.propertyNames = propertyNames;
      this.getRequestProperties = __bind(this.getRequestProperties, this);
      this.getUrl = __bind(this.getUrl, this);
      if (this.accountName == null) {
        this.accountName = null;
      }
      if (this.propertyNames == null) {
        this.propertyNames = null;
      }
      if (this.onSuccess == null) {
        this.onSuccess = null;
      }
      if (this.onError == null) {
        this.onError = null;
      }
      if (this.url == null) {
        this.url = null;
      }
    }

    _Class.prototype.getUrl = function() {
      var p, props, url, _i, _len, _ref;
      url = this.url;
      if (url.indexOf("@v") > -1) {
        if (this.accountName == null) {
          throw new Error('AccountName not specified');
        }
        url = url.replace('@v=', "@v='" + (encodeURIComponent(this.accountName)) + "'");
      }
      if (url.indexOf("@p") > -1) {
        props = "PreferredName";
        if ((this.propertyNames == null) || this.propertyNames.length === 0) {
          throw new Error('PropertyName not specified');
        }
        if (this.propertyNames.length > 0) {
          props = this.propertyNames[0];
        }
        url = url.replace('@p=', "@p='" + props + "'");
      }
      if (url.indexOf(ShareCoffee.Url.GetMyProperties) > -1 && this.propertyNames.length > 0) {
        if ((this.propertyNames == null) || this.propertyNames.length === 0) {
          throw new Error('PropertyNames not specified');
        }
        props = "";
        _ref = this.propertyNames;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          props += "" + p + ",";
        }
        props = props.substr(0, props.length - 1);
        url = "" + url + "?$select=" + props;
      }
      return url;
    };

    _Class.prototype.getRequestProperties = function() {
      return new ShareCoffee.REST.RequestProperties(this.getUrl(), null, null, null, this.onSuccess, this.onError);
    };

    return _Class;

  })();

}).call(this);

/*
//@ sourceMappingURL=ShareCoffee.UserProfiles.js.map
*/
(function (angular) {
  'use strict';
  /**
   * @ngdoc object
   * @name ExpertsInside.SharePoint.JSOM.$spClientContext
   *
   * @description The `$spClientContext` creates a SP.ClientContext
   *  instance and empowers it with methods that return AngularJS
   *  promises for async opertations.
   *
   *  - `$load`: Wraps the native SP.ClientContext#load method
   *    and returns a promise that resolves with the loaded object 
   *    when executeQueryAsync resolves
   *
   *  - `$executeQueryAsync`: Wraps the native SP.ClientContext#executeQueryAsync
   *    method and returns a promise that resolves after the query is executed.
   *
   * @example
   * ```js
     var ctx = $spClientContext.create();
     ctx.$load(ctx.get_web()).then(function(web) {
       $scope.webTitle = web.get_title();
     });
     ctx.$executeQueryAsync().then(function() {
       $log.debug('executeQuery done!');
     })
   * ```
   */
  angular.module('ExpertsInside.SharePoint.JSOM')
    .factory('$spClientContext', function ($window, $q) {

      // var $spClientContextMinErr = angular.$$minErr('$spClientContext');

      var spContext = {
        /**
         * @private
         * Decorate the context with custom methods
         */
        $$decorateContext: function (ctx) {
          ctx.$$empowered = true;
          ctx.$$awaitingLoads = [];

          ctx.$load = function () {
            var args = Array.prototype.slice.call(arguments, 0);
            var deferred = $q.defer();

            $window.SP.ClientContext.prototype.load.apply(ctx, arguments);

            ctx.$$awaitingLoads.push({
              deferred: deferred,
              args: args
            });

            return deferred.promise;
          };

          ctx.$executeQueryAsync = function () {
            var deferred = $q.defer();

            ctx.executeQueryAsync(function () {
              angular.forEach(ctx.$$awaitingLoads, function (load) {
                var deferredLoad = load.deferred;
                deferredLoad.resolve.apply(deferredLoad, load.args);
              });
              deferred.resolve(ctx);
              ctx.$$awaitingLoads.length = 0;
            }, function () {
              var errorArgs = arguments;
              angular.forEach(ctx.$$awaitingLoads, function (load) {
                var deferredLoad = load.deferred;
                deferredLoad.reject.apply(deferredLoad, errorArgs);
              });
              deferred.reject.apply(deferred, errorArgs);
              ctx.$$awaitingLoads.length = 0;
            });

            return deferred.promise;
          };

          return ctx;
        },

        /**
         * @ngdoc function
         * @name ExpertsInside.SharePoint.JSOM.$spClientContext#create
         * @methodOf ExpertsInside.SharePoint.JSOM.$spClientContext
         *
         * @description Creates an empowered SP.ClientContext instance with the
         *  given url.
         *
         * @param {string=} url url for the context
         *
         * @returns {Object} SP.ClientContext instance
         */
        create: function (url) {
          var ctx = new $window.SP.ClientContext(url);

          return spContext.$$decorateContext(ctx);
        },

        /**
         * @ngdoc function
         * @name ExpertsInside.SharePoint.JSOM.$spClientContext#current
         * @methodOf ExpertsInside.SharePoint.JSOM.$spClientContext
         *
         * @description Returns an empowered version of SP.ClientContext.get_current()
         *
         * @returns {Object} SP.ClientContext instance
         */
        current: function () {
          var ctx = new $window.SP.ClientContext.get_current();

          return angular.isDefined(ctx.$$empowered) ? ctx : spContext.$$decorateContext(ctx);
        }
      };

      return spContext;
    });

})(window, angular);

(function (angular) {
  'use strict';
  /**
   * @ngdoc object
   * @name ExpertsInside.SharePoint.Core.$spConvert
   *
   * @description The `$spConvert` service exposes functions
   *  that convert (arrays of) EDM datatypes to javascript
   *  values or objects and the search results containing them.
   */
  angular.module('ExpertsInside.SharePoint.Core')
    .factory('$spConvert', function () {

      var assertType = function (type, obj) {
        if (!angular.isObject(obj.__metadata) || obj.__metadata.type !== type) {
          throw $spConvertMinErr('badargs', 'expected argument to be of type {0}.', type);
        }
      };

      var $spConvertMinErr = angular.$$minErr('$spConvert');
      var $spConvert = {
        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.Core.$spConvert#spKeyValue
         * @methodOf ExpertsInside.SharePoint.Core.$spConvert
         *
         * @description Convert a SP.KeyValue object to a their native
         *   Javascript value.
         *
         * @param {Object} keyValue SP.KeyValue instance
         *
         * @return {*} converted value
         */
        spKeyValue: function (keyValue) {
          assertType("SP.KeyValue", keyValue);
          var value = keyValue.Value;

          switch (keyValue.ValueType) {
            case 'Edm.Double':
            case 'Edm.Float':
              return parseFloat(value);
            case 'Edm.Int16':
            case 'Edm.Int32':
            case 'Edm.Int64':
            case 'Edm.Byte':
              return parseInt(value, 10);
            case 'Edm.Boolean':
              return value === "true";
            default:
              return value;
          }
        },

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.Core.$spConvert#spKeyValueArray
         * @methodOf ExpertsInside.SharePoint.Core.$spConvert
         *
         * @description Convert an array of SP.KeyValue objects to an array
         *   of native Javascript values.
         *
         * @param {Array.<SP.KeyValue>} keyValues Array of SP.KeyValue objects
         *
         * @return {Array} Array of converted values
         */
        spKeyValueArray: function (keyValues) {
          var result = {};

          for (var i = 0, l = keyValues.length; i < l; i += 1) {
            var keyValue = keyValues[i];
            var key = keyValue.Key;
            result[key] = $spConvert.spKeyValue(keyValue);
          }

          return result;
        },

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.Core.$spConvert#spSimpleDateRow
         * @methodOf ExpertsInside.SharePoint.Core.$spConvert
         *
         * @description Convert an SP.SimpleDateRow object to an array
         *   of native Javascript values.
         *
         * @param {Object} row SP.SimpleDataRow object
         *
         * @return {Array} Array of cell values
         */
        spSimpleDataRow: function (row) {
          assertType("SP.SimpleDataRow", row);
          var cells = row.Cells.results || [];

          return $spConvert.spKeyValueArray(cells);
        },

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.Core.$spConvert#spSimpleDateTable
         * @methodOf ExpertsInside.SharePoint.Core.$spConvert
         *
         * @description Convert an SP.SimpleDateTable object to an array (rows)
         *   of arrays (cells).
         *
         * @param {Object} row SP.SimpleDataTable object
         *
         * @return {Array.<Array>} Array of arrays of converted values
         */
        spSimpleDataTable: function (table) {
          assertType("SP.SimpleDataTable", table);
          var result = [];
          var rows = table.Rows.results || [];

          for (var i = 0, l = rows.length; i < l; i += 1) {
            var row = rows[i];
            result.push($spConvert.spSimpleDataRow(row));
          }

          return result;
        },

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.Core.$spConvert#searchResult
         * @methodOf ExpertsInside.SharePoint.Core.$spConvert
         *
         * @description Convert a complete Microsoft.Office.Server.Search.REST.SearchResult
         *   to a  more usable data structure.
         *
         *    - camelCase all properties
         *    - convert arrays of SP.KeyValue objects
         *    - convert SP.SimpleDataTable objects
         *
         * @param {Object} searchResult REST Search result
         *
         * @return {Object} Converted search result
         */
        searchResult: function (searchResult) {
          assertType("Microsoft.Office.Server.Search.REST.SearchResult", searchResult);
          var primaryQueryResult = searchResult.PrimaryQueryResult;

          var result = {
            elapsedTime: searchResult.ElapsedTime,
            spellingSuggestion: searchResult.SpellingSuggestion,
            properties: $spConvert.spKeyValueArray(searchResult.Properties.results),
            primaryQueryResult: {
              queryId: primaryQueryResult.QueryId,
              queryRuleId: primaryQueryResult.QueryRuleId,
              relevantResults: $spConvert.spSimpleDataTable(primaryQueryResult.RelevantResults.Table),
              customResults: primaryQueryResult.CustomResults,
              refinementResults: primaryQueryResult.RefinementResults,
              specialTermResults: primaryQueryResult.SpecialTermResults
            }
          };

          return result;
        },

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.Core.$spConvert#suggestResult
         * @methodOf ExpertsInside.SharePoint.Core.$spConvert
         *
         * @description **NYI**
         *
         * @param {Object} suggestResult REST Search Suggest result
         *
         * @return {Object} REST Search Suggest result
         */
        suggestResult: function (suggestResult) {
          // TODO implement
          return suggestResult;
        },

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.Core.$spConvert#userResult
         * @methodOf ExpertsInside.SharePoint.Core.$spConvert
         *
         * @description Convert a SP.UserProfiles.PersonProperties object
         *   to a more usable data structure.
         *
         *    - camelCase all properties
         *    - convert arrays of SP.KeyValue objects
         *
         * @param {Object} userResult REST User Profiles result
         *
         * @return {Object} Converted user profile
         */
        userResult: function (userResult) {
          assertType("SP.UserProfiles.PersonProperties", userResult);

          var result = {
            accountName: userResult.AccountName,
            displayName: userResult.DisplayName,
            email: userResult.Email,
            isFollowed: userResult.IsFollowed,
            personalUrl: userResult.PersonalUrl,
            pictureUrl: userResult.PictureUrl,
            profileProperties: $spConvert.spKeyValueArray(userResult.UserProfileProperties.results),
            title: userResult.Title,
            userUrl: userResult.UserUrl
          };

          return result;
        },

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.Core.$spConvert#capitalize
         * @methodOf ExpertsInside.SharePoint.Core.$spConvert
         *
         * @description Capitalize a string
         *
         * @param {string} str string
         *
         * @return {string} capitalied string
         */
        capitalize: function (str) {
          if (angular.isUndefined(str) || str === null) {
            return null;
          }
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
      };

      return $spConvert;
    });

})(window, angular);

(function (angular) {
  'use strict';
  /**
   * @ngdoc service
   * @name ExpertsInside.SharePoint.List.$spList
   * @requires ExpertsInside.SharePoint.Core.$spRest
   * @requires ExpertsInside.SharePoint.Core.$spConvert
   *
   * @description A factory which creates a list item resource object that lets you interact with
   *   SharePoint List Items via the SharePoint REST API.
   *
   *   The returned list item object has action methods which provide high-level behaviors without
   *   the need to interact with the low level $http service.
   *
   * @param {string} title The title of the SharePoint List (case-sensitive).
   *
   * @param {Object=} listOptions Hash with custom options for this List. The following options are
   *   supported:
   *
   *   - **`readOnlyFields`** - {Array.{string}=} - Array of field names that will be excluded
   *   from the request when saving an item back to SharePoint
   *   - **`query`** - {Object=} - Default query parameter used by each action. Can be
   *   overridden per action. Prefixing them with `$` is optional. Valid keys:
   *       - **`$select`**
   *       - **`$filter`**
   *       - **`$orderby`**
   *       - **`$top`**
   *       - **`$skip`**
   *       - **`$expand`**
   *       - **`$sort`**
   *   - **`inHostWeb`** - {boolean|string} - Set the host web url for the List. When set to
   *   `true`, ShareCoffe.Commons.getHostWebUrl() will be used. 
   *
   * @return {Object} A dynamically created  class constructor for list items.
   *   See {@link ExpertsInside.SharePoint.List.$spList+ListItem $spList+ListItem} for details.
   */
  angular.module('ExpertsInside.SharePoint.List')
    .factory('$spList', function ($spRest, $http, $spConvert) {

      var $spListMinErr = angular.$$minErr('$spList');

      function listFactory(title, listOptions) {
        if (!angular.isString(title) || title === '') {
          throw $spListMinErr('badargs', 'title must be a nen-empty string.');
        }
        if (!angular.isObject(listOptions)) {
          listOptions = {};
        }

        var normalizedTitle = $spConvert.capitalize(title
          .replace(/[^A-Za-z0-9 ]/g, '') // remove invalid chars
          .replace(/\s/g, '_x0020_') // replace whitespaces with _x0020_
        );
        var className = $spConvert.capitalize(normalizedTitle
          .replace(/_x0020/g, '') // remove _x0020_
          .replace(/^\d+/, '') // remove leading digits
        );
        var listItemType = 'SP.Data.' + normalizedTitle + 'ListItem';

        // Constructor function for List dynamically generated List class
        /**
         * @ngdoc service
         * @name ExpertsInside.SharePoint.List.$spList+ListItem
         *
         * @description The dynamically created List Item class, created by
         *   {@link ExpertsInside.SharePoint.List.$spList $spList}. 
         *
         *   Note that all methods prefixed with a `$` are *instance* (or prototype) methods.
         *   Ngdoc doesn't seem to have out-of-box support for those.
         */
        var List = (function () {
          // jshint evil:true, validthis:true
          function __List__(data) {
            this.__metadata = {
              type: listItemType
            };
            angular.extend(this, data);
          }
          var script =
            " (function() {                     " +
            __List__.toString() +
            "   return __List__;                " +
            " })();                             ";
          return eval(script.replace(/__List__/g, className));
        })();

        /**
         * @private
         * Title of the list
         */
        List.$$title = title;

        /**
         * @private
         * Allowed query parameters
         */
        List.$$queryParameterWhitelist =
          ['$select', '$filter', '$orderby', '$top', '$skip', '$expand', '$sort'];

        /**
         * @private
         * Web relative list url
         */
        List.$$relativeUrl = "web/lists/getByTitle('" + List.$$title + "')";

        /**
         * @private
         * Is this List in the host web?
         */
        List.$$inHostWeb = listOptions.inHostWeb;

        /**
         * @private
         * Decorate the result with $promise and $resolved
         */
        List.$$decorateResult = function (result, httpConfig) {
          if (!angular.isArray(result) && !(result instanceof List)) {
            result = new List(result);
          }
          if (angular.isUndefined(result.$resolved)) {
            result.$resolved = false;
          }
          result.$promise = $http(httpConfig).then(function (response) {
            var data = response.data;

            if (angular.isArray(result) && angular.isArray(data)) {
              angular.forEach(data, function (item) {
                result.push(new List(item));
              });
            } else if (angular.isObject(result)) {
              if (angular.isArray(data)) {
                if (data.length === 1) {
                  angular.extend(result, data[0]);
                } else {
                  throw $spListMinErr('badresponse', 'Expected response to contain an array with one object but got {1}',
                    data.length);
                }
              } else if (angular.isObject(data)) {
                angular.extend(result, data);
              }
            } else {
              throw $spListMinErr('badresponse', 'Expected response to contain an {0} but got an {1}',
                angular.isArray(result) ? 'array' : 'object', angular.isArray(data) ? 'array' : 'object');
            }

            var responseEtag;
            if (response.status === 204 && angular.isString(responseEtag = response.headers('ETag'))) {
              result.__metadata.etag = responseEtag;
            }
            result.$resolved = true;

            return result;
          });

          return result;
        };

        /**
         * @private
         * @description Builds the http config for the list CRUD actions
         *
         * @param {Object} list List constructor
         * @param {string} action CRUD action
         *
         * @returns {Object} http config
         */
        List.$$buildHttpConfig = function (action, options) {
          var baseUrl = List.$$relativeUrl + '/items';
          var httpConfig = {
            url: baseUrl
          };
          if (angular.isString(List.$$inHostWeb)) {
            httpConfig.hostWebUrl = List.$$inHostWeb;
          } else if (List.$$inHostWeb) {
            httpConfig.hostWebUrl = ShareCoffee.Commons.getHostWebUrl();
          }

          action = angular.isString(action) ? action.toLowerCase() : '';
          options = angular.isDefined(options) ? options : {};
          var query = angular.isDefined(options.query) ?
            $spRest.normalizeParams(options.query, List.$$queryParameterWhitelist) :
            {};

          switch (action) {
            case 'get':
              if (angular.isUndefined(options.id)) {
                throw $spListMinErr('options:get', 'options must have an id');
              }

              httpConfig.url += '(' + options.id + ')';
              httpConfig = ShareCoffee.REST.build.read['for'].angularJS(httpConfig);
              break;
            case 'query':
              httpConfig = ShareCoffee.REST.build.read['for'].angularJS(httpConfig);
              break;
            case 'create':
              if (angular.isUndefined(options.item)) {
                throw $spListMinErr('options:create', 'options must have an item');
              }
              if (angular.isUndefined(options.item.__metadata)) {
                throw $spListMinErr('options:create', 'options.item must have __metadata property');
              }

              if (angular.isDefined(query)) {
                delete query.$expand;
              }

              httpConfig.payload = options.item.$toJson();
              httpConfig = ShareCoffee.REST.build.create['for'].angularJS(httpConfig);
              break;
            case 'update':
              if (angular.isUndefined(options.item)) {
                throw $spListMinErr('options:update', 'options must have an item');
              }
              if (angular.isUndefined(options.item.__metadata)) {
                throw $spListMinErr('options:create', 'options.item must have __metadata property');
              }

              query = {}; // does nothing or breaks things, so we ignore it
              httpConfig.url += '(' + options.item.Id + ')';
              httpConfig.payload = options.item.$toJson();
              httpConfig.eTag = !options.force && angular.isDefined(options.item.__metadata) ?
                options.item.__metadata.etag : null;

              httpConfig = ShareCoffee.REST.build.update['for'].angularJS(httpConfig);
              break;
            case 'delete':
              if (angular.isUndefined(options.item)) {
                throw $spListMinErr('options:delete', 'options must have an item');
              }
              if (angular.isUndefined(options.item.__metadata)) {
                throw $spListMinErr('options:delete', 'options.item must have __metadata');
              }

              httpConfig.url += '(' + options.item.Id + ')';
              httpConfig = ShareCoffee.REST.build['delete']['for'].angularJS(httpConfig);
              break;
          }

          httpConfig.url = $spRest.appendQueryParameters(httpConfig.url, query);
          httpConfig.transformResponse = $spRest.transformResponse;

          return httpConfig;
        };

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.List.$spList#get
         * @methodOf ExpertsInside.SharePoint.List.$spList
         *
         * @description Get a single list item by id
         *
         * @param {Number} id Id of the list item
         * @param {Object=} query Additional query properties
         *
         * @return {Object} List item instance
         */
        List.get = function (id, query) {
          if (angular.isUndefined(id) || id === null) {
            throw $spListMinErr('badargs', 'id is required.');
          }

          var result = {
            Id: id
          };
          var httpConfig = List.$$buildHttpConfig('get', { id: id, query: query });

          return List.$$decorateResult(result, httpConfig);
        };

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.List.$spList#query
         * @methodOf ExpertsInside.SharePoint.List.$spList
         *
         * @description Query for the list for items
         *
         * @param {Object=} query Query properties
         * @param {Object=} options Additional query options.
         *   Accepts the following properties:
         *   - **`singleResult`** - {boolean} - Returns and empty object instead of an array. Throws an
         *     error when more than one item is returned by the query.
         *
         * @return {Array<Object>} Array of list items
         */
        List.query = function (query, options) {
          var result = (angular.isDefined(options) && options.singleResult) ? {} : [];
          var httpConfig = List.$$buildHttpConfig('query', {
            query: angular.extend({}, List.prototype.$$queryDefaults, query)
          });

          return List.$$decorateResult(result, httpConfig);
        };

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.List.$spList#create
         * @methodOf ExpertsInside.SharePoint.List.$spList
         *
         * @description Create a new list item on the server.
         *
         * @param {Object=} item Query properties
         * @param {Object=} options Additional query properties.
         *
         * @return {Object} The decorated list item
         */
        List.create = function (item, query) {
          if (!(angular.isObject(item) && item instanceof List)) {
            throw $spListMinErr('badargs', 'item must be a List instance.');
          }
          item.__metadata = angular.extend({
            type: listItemType
          }, item.__metadata);

          var httpConfig = List.$$buildHttpConfig('create', {
            item: item,
            query: angular.extend({}, item.$$queryDefaults, query)
          });

          return List.$$decorateResult(item, httpConfig);
        };

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.List.$spList#update
         * @methodOf ExpertsInside.SharePoint.List.$spList
         *
         * @description Update an existing list item on the server.
         *
         * @param {Object=} item the list item
         * @param {Object=} options Additional update properties.
         *   Accepts the following properties:
         *   - **`force`** - {boolean} - Overwrite newer versions on the server.
         *
         * @return {Object} The decorated list item
         */
        List.update = function (item, options) {
          if (!(angular.isObject(item) && item instanceof List)) {
            throw $spListMinErr('badargs', 'item must be a List instance.');
          }

          options = angular.extend({}, options, {
            item: item
          });

          var httpConfig = List.$$buildHttpConfig('update', options);

          return List.$$decorateResult(item, httpConfig);
        };

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.List.$spList#save
         * @methodOf ExpertsInside.SharePoint.List.$spList
         *
         * @description Update or create a list item on the server.
         *
         * @param {Object=} item the list item
         * @param {Object=} options Options passed to create or update.
         *
         * @return {Object} The decorated list item
         */
        List.save = function (item, options) {
          if (angular.isDefined(item.__metadata) && angular.isDefined(item.__metadata.id)) {
            return this.update(item, options);
          } else {
            var query = angular.isObject(options) ? options.query : undefined;
            return this.create(item, query);
          }
        };

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.List.$spList#delete
         * @methodOf ExpertsInside.SharePoint.List.$spList
         *
         * @description Delete a list item on the server.
         *
         * @param {Object=} item the list item
         *
         * @return {Object} The decorated list item
         */
        List.delete = function (item) {
          if (!(angular.isObject(item) && item instanceof List)) {
            throw $spListMinErr('badargs', 'item must be a List instance.');
          }
          var httpConfig = List.$$buildHttpConfig('delete', { item: item });

          return List.$$decorateResult(item, httpConfig);
        };

        /**
         * @ngdoc object
         * @name ExpertsInside.SharePoint.List.$spList#queries
         * @propertyOf ExpertsInside.SharePoint.List.$spList
         *
         * @description Object that holds the created named queries
         */
        List.queries = {};

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.List.$spList#addNamedQuery
         * @methodOf ExpertsInside.SharePoint.List.$spList
         *
         * @description Add a named query to the queries hash
         *
         * @param {Object} name name of the query, used as the function name
         * @param {Function} createQuery callback invoked with the arguments passed to
         *   the created named query that creates the final query object
         * @param {Object=} options Additional query options passed to List.query
         *
         * @return {Array} The query result
         */
        List.addNamedQuery = function (name, createQuery, options) {
          List.queries[name] = function () {
            var query = angular.extend(
              {},
              List.prototype.$$queryDefaults,
              createQuery.apply(List, arguments)
            );
            return List.query(query, options);
          };
          return List;
        };

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.List.$spList#toJson
         * @methodOf ExpertsInside.SharePoint.List.$spList
         *
         * @description Create a copy of the item, remove read-only fields
         *   and stringify it.
         *
         * @param {Object} item list item
         *
         * @returns {string} JSON representation
         */
        List.toJson = function (item) {
          var copy = {};
          var blacklist = angular.extend([], item.$$readOnlyFields);

          angular.forEach(item, function (value, key) {
            if (key.indexOf('$') !== 0 && blacklist.indexOf(key) === -1) {
              copy[key] = value;
            }
          });
          return angular.toJson(copy);
        };

        List.prototype = {
          /**
           * @private
           * Properties stripped from JSON when saving an item to avoid server errors.
           */
          $$readOnlyFields: angular.extend([
            'AttachmentFiles',
            'Attachments',
            'Author',
            'AuthorId',
            'ContentType',
            'ContentTypeId',
            'Created',
            'Editor',
            'EditorId', 'FieldValuesAsHtml',
            'FieldValuesAsText',
            'FieldValuesForEdit',
            'File',
            'FileSystemObjectType',
            'FirstUniqueAncestorSecurableObject',
            'Folder',
            'GUID',
            'Modified',
            'OData__UIVersionString',
            'ParentList',
            'RoleAssignments'
          ], listOptions.readOnlyFields),
          /**
           * @private
           * Default query properties
           */
          $$queryDefaults: angular.extend({}, listOptions.query),
          /**
           * @ngdoc method
           * @name ExpertsInside.SharePoint.List.$spList+ListItem#$save
           * @methodOf ExpertsInside.SharePoint.List.$spList+ListItem
           *
           * @description **Instance method**
           *
           * Create or update the list item on the server.
           *
           * @param {Object=} options Options passed to List.Item.create or ListItem.update.
           *
           * @return {Object} Promise
           */
          $save: function (options) {
            return List.save(this, options).$promise;
          },
          /**
           * @ngdoc method
           * @name ExpertsInside.SharePoint.List.$spList+ListItem#$delete
           * @methodOf ExpertsInside.SharePoint.List.$spList+ListItem
           *
           * @description **Instance method**
           *
           * Delete this list item on the server.
           *
           * @return {Object} Promise
           */
          $delete: function () {
            return List.delete(this).$promise;
          },
          /**
           * @ngdoc method
           * @name ExpertsInside.SharePoint.List.$spList+ListItem#$isNew
           * @methodOf ExpertsInside.SharePoint.List.$spList+ListItem
           *
           * @description **Instance method**
           *
           * Check if an item is already persisted on the server
           *
           * @return {bool} `true` when already persisted, `false` otherwhise
           */
          $isNew: function () {
            return angular.isUndefined(this.__metadata) || angular.isUndefined(this.__metadata.id);
          },
          /**
           * @ngdoc method
           * @name ExpertsInside.SharePoint.List.$spList+ListItem#$toJson
           * @methodOf ExpertsInside.SharePoint.List.$spList+ListItem
           *
           * @description **Instance method**
           *
           * JSON representation of the item
           *
           * @return {string} JSON representation
           */
          $toJson: function () {
            return List.toJson(this);
          }
        };

        return List;
      }

      return listFactory;
    });

})(window, angular);

(function (angular) {
  'use strict';
  /**
   * @ngdoc object
   * @name ExpertsInside.SharePoint.Core.$spPageContextInfo
   *
   * @description
   * A reference to the documents `_spPageContextInfo` object. While `_spPageContextInfo`
   * is globally available in JavaScript, it causes testability problems, because
   * it is a global variable. When referring to it thorugh the `$spPageContextInfo` service,
   * it may be overridden, removed or mocked for testing.
   *
   * See {@link http://tjendarta.wordpress.com/2013/07/16/_sppagecontextinfo-properties-value/ _spPageContextInfo Properties}
   * for more information.
   *
   * @example
   * ```js
       function Ctrl($scope, $spPageContextInfo) {
          $scope.userName = $spPageContextInfo.userLoginName
        }
   * ```
   */
  angular.module('ExpertsInside.SharePoint.Core')
    .factory('$spPageContextInfo', function ($rootScope, $window) {

      var $spPageContextInfo = {};
      angular.copy($window._spPageContextInfo, $spPageContextInfo);

      $rootScope.$watch(function () { return $window._spPageContextInfo; }, function (spPageContextInfo) {
        angular.copy(spPageContextInfo, $spPageContextInfo);
      }, true);

      return $spPageContextInfo;
    });

})(window, angular);

(function (angular) {
  'use strict';
  /**
   * @ngdoc service
   * @name ExpertsInside.SharePoint.Core.$spRest
   *
   * @description
   * Utility functions when interacting with the SharePoint REST API
   *
   */
  angular.module('ExpertsInside.SharePoint.Core')
    .factory('$spRest', function ($log) {

      // var $spRestMinErr = angular.$$minErr('$spRest');

      /**
       * @name unique
       * @private
       *
       * Copy the array without duplicates
       *
       * @param {array} arr input array
       *
       * @returns {array} input array without duplicates
       */
      var unique = function (arr) {
        return arr.reduce(function (r, x) {
          if (r.indexOf(x) < 0) { r.push(x); }
          return r;
        }, []);
      };

      /**
       * @name getKeysSorted
       * @private
       *
       * Get all keys from the object and sort them
       *
       * @param {Object} obj input object
       *
       * @returns {Array} Sorted object keys
       */
      function getKeysSorted(obj) {
        var keys = [];
        if (angular.isUndefined(obj) || obj === null) {
          return keys;
        }

        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            keys.push(key);
          }
        }
        return keys.sort();
      }

      var $spRest = {

        /**
         * @ngdoc function
         * @name ExpertsInside.SharePoint.Core.$spRest#transformResponse
         * @methodOf ExpertsInside.SharePoint.Core.$spRest
         *
         * @description Parse the JSON body and remove the `d` and `d.results` wrapper from the REST response
         *
         * @param {string} json JSON body of the response
         *
         * @returns {Object|Array} transformed response
         *
         * @example
         * ```js
             var json='{"d":{"results":[{"foo":"bar"}]}}';
             var response = $spRest.transformResponse(json);
             // response => [{ foo: "bar" }]
         * ```
         */
        transformResponse: function (json) {
          var response = {};
          if (angular.isDefined(json) && json !== null && json !== '') {
            response = angular.fromJson(json);
          }
          if (angular.isObject(response) && angular.isDefined(response.d)) {
            response = response.d;
          }
          if (angular.isObject(response) && angular.isDefined(response.results)) {
            response = response.results;
          }
          return response;
        },

        /**
         * @ngdoc function
         * @name ExpertsInside.SharePoint.Core.$spRest#buildQueryString
         * @methodOf ExpertsInside.SharePoint.Core.$spRest
         *
         * @description Create a query string from query parameters that
         *   SharePoint accepts
         *
         * @param {Object} params query parameters
         *
         * @returns {string} query string
         *
         * @example
         * ```js
             var params= {
               foo: [1,2,3]
               bar: "baz"
             };
             var qs = $spRest.buildQueryString(params);
             // qs => 'foo="1,2,3"&bar="baz"'
         * ```
         */
        buildQueryString: function (params) {
          var parts = [];
          var keys = getKeysSorted(params);

          angular.forEach(keys, function (key) {
            var value = params[key];
            if (value === null || angular.isUndefined(value)) { return; }
            if (angular.isArray(value)) { value = unique(value).join(','); }
            if (angular.isObject(value)) { value = angular.toJson(value); }

            parts.push(key + '=' + value);
          });
          var queryString = parts.join('&');

          return queryString;
        },

        /**
         * @ngdoc function
         * @name ExpertsInside.SharePoint.Core.$spRest#normalizeParams
         * @methodOf ExpertsInside.SharePoint.Core.$spRest
         *
         * @description Normalizes the query parameters by prefixing them with
         *   prefixing them with $ (when missing) and removing all invalid
         *   query parameters when a whitelist is given.
         *
         * @param {Object} params query parameters
         * @param {Array.<string>} whitelist allowed query parameters
         *
         * @returns {Object} normalized query parameters
         *
         * @example
         * ```js
             var params = {
               select: ['Id', 'Title']
               invalid: "foo"
             };
             var whitelist = ['$select']
             params = $spRest.normalizeParams(params);
             // params => { $select: ['Id', 'Title'] }
         * ```
         */
        normalizeParams: function (params, whitelist) {
          params = angular.extend({}, params); //make a copy

          if (angular.isDefined(params)) {
            angular.forEach(params, function (value, key) {
              if (key.indexOf('$') !== 0) {
                delete params[key];
                key = '$' + key;
                params[key] = value;
              }

              if (angular.isDefined(whitelist) && whitelist.indexOf(key) === -1) {
                $log.warn('Invalid param key detected: ' + key);
                delete params[key];
              }
            });
          }
          // cannot use angular.equals(params, {}) to check for empty object,
          // because angular.equals ignores properties prefixed with $
          if (params === null || JSON.stringify(params) === '{}') {
            params = undefined;
          }

          return params;
        },

        /**
         * @ngdoc function
         * @name ExpertsInside.SharePoint.Core.$spRest#appendQueryParameters
         * @methodOf ExpertsInside.SharePoint.Core.$spRest
         *
         * @description Builds a query string from the query parameters
         *   and appends it to the url
         *
         * @param {string} url url
         * @param {Object} params query parameters
         *
         * @returns {string} url with query string
         *
         * @example
         * ```js
             var params= {
               $select: ['Id', 'Title']
             };
             url = $spRest.appendQueryParameters('http://my.app', params);
             // url => "http://my.app?$select='Id,Title'"
         * ```
         */
        appendQueryParameters: function (url, params) {
          var queryString = $spRest.buildQueryString(params);

          if (queryString !== '') {
            url += ((url.indexOf('?') === -1) ? '?' : '&') + queryString;
          }

          return url;
        }
      };

      return $spRest;
    });

})(window, angular);

(function (angular) {
  'use strict';
  /**
   * @ngdoc service
   * @name ExpertsInside.SharePoint.Search.$spSearch
   * @requires ExpertsInside.SharePoint.Core.$spRest
   * @requires ExpertsInside.SharePoint.Core.$spConvert
   *
   * @description Query the Search via REST API
   *
   */
  angular.module('ExpertsInside.SharePoint.Search')
    .factory('$spSearch', function ($http, $spRest, $spConvert) {

      var $spSearchMinErr = angular.$$minErr('$spSearch');

      var search = {

        /**
         * @private
         * Wrap given properties in a query properties object based on search type
         */
        $$createQueryProperties: function (searchType, properties) {
          var queryProperties;
          switch (searchType) {
            case 'postquery':
              queryProperties = new ShareCoffee.PostQueryProperties();
              break;
            case 'suggest':
              queryProperties = new ShareCoffee.SuggestProperties();
              break;
            default:
              queryProperties = new ShareCoffee.QueryProperties();
              break;
          }

          return angular.extend(queryProperties, properties);
        },

        /**
         * @private
         * Decorate the result with $promise and $resolved
         */
        $decorateResult: function (result, httpConfig) {
          if (angular.isUndefined(result.$resolved)) {
            result.$resolved = false;
          }
          result.$raw = null;
          result.$promise = $http(httpConfig).then(function (response) {
            var data = response.data;

            if (angular.isObject(data)) {
              if (angular.isDefined(data.query)) {
                result.$raw = data.query;
                angular.extend(result, $spConvert.searchResult(data.query));
              } else if (angular.isDefined(data.suggest)) {
                result.$raw = data.suggest;
                angular.extend(result, $spConvert.suggestResult(data.suggest));
              }
            }
            if (angular.isUndefined(result.$raw)) {
              throw $spSearchMinErr('badresponse', 'Response does not contain a valid search result.');
            }
            result.$resolved = true;

            return result;
          });

          return result;
        },

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.Search.$spSearch#query
         * @methodOf ExpertsInside.SharePoint.Search.$spSearch
         *
         * @description Perform a search query based on given properties
         *
         * @param {Object} properties query properties
         *
         * @returns {Object} search query result
         */
        query: function (properties) {
          properties = angular.extend({}, properties);

          var searchType = properties.searchType;
          delete properties.searchType;

          var queryProperties = search.$$createQueryProperties(searchType, properties);
          var httpConfig = ShareCoffee.REST.build.read['for'].angularJS(queryProperties);
          httpConfig.transformResponse = $spRest.transformResponse;

          var result = {};

          return search.$decorateResult(result, httpConfig);
        },

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.Search.$spSearch#postquery
         * @methodOf ExpertsInside.SharePoint.Search.$spSearch
         *
         * @description Perform a search postquery based on given properties
         *
         * @param {Object} properties query properties
         *
         * @returns {Object} search query result
         */
        postquery: function (properties) {
          properties = angular.extend(properties, { searchType: 'postquery' });
          return search.query(properties);
        },

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.Search.$spSearch#suggest
         * @methodOf ExpertsInside.SharePoint.Search.$spSearch
         *
         * @description Perform a search suggest based on given properties
         *
         * @param {Object} properties query properties
         *
         * @returns {Object} search query result
         */
        suggest: function (properties) {
          properties = angular.extend(properties, { searchType: 'suggest' });
          return search.query(properties);
        }
      };

      return search;
    });

})(window, angular);

(function (angular) {
  'use strict';
  /**
   * @ngdoc service
   * @name ExpertsInside.SharePoint.User.$spUser
   * @requires ExpertsInside.SharePoint.Core.$spRest
   * @requires ExpertsInside.SharePoint.Core.$spConvert
   *
   * @description Load user information via UserProfiles REST API
   *
   */
  angular.module('ExpertsInside.SharePoint.User')
    .factory('$spUser', function ($http, $spRest, $spConvert) {

      var $spUserMinErr = angular.$$minErr('$spUser');

      var $spUser = {

        /**
         * @private
         * Decorate the result with $promise and $resolved
         */
        $$decorateResult: function (result, httpConfig) {
          if (angular.isUndefined(result.$resolved)) {
            result.$resolved = false;
          }
          result.$raw = null;
          result.$promise = $http(httpConfig).then(function (response) {
            var data = response.data;

            if (angular.isDefined(data)) {
              result.$raw = data;
              angular.extend(result, $spConvert.userResult(data));
            } else {
              throw $spUserMinErr('badresponse', 'Response does not contain a valid user result.');
            }

            result.$resolved = true;

            return result;
          });

          return result;
        },

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.User.$spUser#current
         * @methodOf ExpertsInside.SharePoint.User.$spUser
         *
         * @description Get the current signed in user.
         *
         * @returns {Object} user profile properties
         */
        current: function () {
          var properties = new ShareCoffee
            .UserProfileProperties(ShareCoffee.Url.GetMyProperties);

          var httpConfig = ShareCoffee.REST.build.read.f.angularJS(properties);
          httpConfig.transformResponse = $spRest.transformResponse;

          var result = {};

          return $spUser.$$decorateResult(result, httpConfig);
        },

        /**
         * @ngdoc method
         * @name ExpertsInside.SharePoint.User.$spUser#get
         * @methodOf ExpertsInside.SharePoint.User.$spUser
         *
         * @description Get a user by account name
         *
         * @param {string} accountName account name
         *
         * @returns {Object} user profile properties
         */
        get: function (accountName) {
          var properties = new ShareCoffee
            .UserProfileProperties(ShareCoffee.Url.GetProperties, accountName);

          var httpConfig = ShareCoffee.REST.build.read.f.angularJS(properties);
          httpConfig.transformResponse = $spRest.transformResponse;

          var result = {};

          return $spUser.$$decorateResult(result, httpConfig);
        }
      };

      return $spUser;
    });

})(window, angular);
