function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}


function parse_url (str, component) {
  // Parse a URL and return its components
  //
  // version: 1109.2015
  // discuss at: http://phpjs.org/functions/parse_url    // +      original by: Steven Levithan (http://blog.stevenlevithan.com)
  // + reimplemented by: Brett Zamir (http://brett-zamir.me)
  // + input by: Lorenzo Pisani
  // + input by: Tony
  // + improved by: Brett Zamir (http://brett-zamir.me)    // %          note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
  // %          note: blog post at http://blog.stevenlevithan.com/archives/parseuri
  // %          note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
  // %          note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
  // %          note: a seriously malformed URL.    // %          note: Besides function name, is essentially the same as parseUri as well as our allowing
  // %          note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
  // *     example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
  // *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
  var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'],
      ini = (this.php_js && this.php_js.ini) || {},
      mode = (ini['phpjs.parse_url.mode'] &&
          ini['phpjs.parse_url.mode'].local_value) || 'php',
      parser = {            php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
          strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
          loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
      };
   var m = parser[mode].exec(str),
      uri = {},
      i = 14;
  while (i--) {
      if (m[i]) {          uri[key[i]] = m[i];
      }
  }

  if(component){
    return uri[component.replace('PHP_URL_', '').toLowerCase()];
  }
  if(mode !== 'php'){
    var name = (ini['phpjs.parse_url.queryKey'] &&
            ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';        parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
    uri[name] = {};
    uri[key[12]].replace(parser, function ($0, $1, $2) {
      if ($1) {uri[name][$1] = $2;}
    });    }
  delete uri.source;
  return uri;
}

function cuelinksUrl(){
  var host = parse_url(this.href);
  var targ = this;
  if(location.hostname != host.host && host.host != undefined && host.host != 'linksredirect.com' && host.host != 'track.in.omgpm.com' && host.host != 'www.s2d6.com' && host.host != 'affiliates.tyroodr.com' && host.host != 'affiliates.vcommission.com' && host.host != 'plus.google.com')
  {
    if(this.getAttribute("data-cue")){
      targ.href = 'https://linksredirect.com?pub_id=' + pubID + '&subid=' + this.getAttribute("data-cue") + '&url='+escape(this.href);
    }
    else if(typeof subID != 'undefined'){
      targ.href = 'https://linksredirect.com?pub_id=' + pubID + '&subid=' + subID + '&url='+escape(this.href);
    }
    else{
      targ.href = 'https://linksredirect.com?pub_id=' + pubID + '&url='+escape(this.href);
    }
  }
}

function cuewordsUrl(){
  var host = parse_url(this.href);
  var targ = this;
  if(location.hostname != host.host && host.host != undefined && host.host != 'linksredirect.com' && host.host != 'cw.linksredirect.com')
    {
    if (this.getAttribute("data-cue")) {
      targ.href = 'http://cw.linksredirect.com/links?pub_id=' + pubID + '&subid=' + this.getAttribute("data-cue") + '&url='+escape(this.href);
    }
    else
    {
      targ.href = 'http://cw.linksredirect.com/links?pub_id=' + pubID + '&url='+escape(this.href);
    }
  }
}

function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else
    obj.addEventListener( type, fn, false );
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

// read publisher id from amp custom tag, it has been set as attribute
var pubID = document.getElementsByTagName("amp-cuelinks")[0].getAttribute("data-pubid");
var cueLinks;
var cueWords;
var cueDensity;
var cuewordLinkColor;
var ignoreTags;
var ignoreTagsRegex;

var Settingsfn = function() {
var url = "https://cdn0.cuelinks.com/api/v1/users/" + pubID + ".json";
var xhr = createCORSRequest('GET', url);
if (!xhr) {
  throw new Error('CORS not supported');
}

xhr.onload = function() {
    text = xhr.responseText;
  var array = JSON.parse(text);
  cueWords = array.cuewords_enabled;
  cueLinks = array.cuelinks_enabled;
  cueDensity = array.cuewords_density;
  cuewordLinkColor = array.cuewords_link_color;
  ignoreTags = array.cuewords_ignore_tags;
    if (ignoreTags != 'null') {
      ignoreTagsRegex = new RegExp("^(?:script|style|h1|h2|h3|h4|h5|h6|a|textarea|select|input|"+ignoreTags+")$","i");
    }
    else {
      ignoreTagsRegex = new RegExp("^(?:script|style|h1|h2|h3|h4|h5|h6|a|textarea|select|input)$","i");
    }
  Processfn();
  };
xhr.send();
};
Settingsfn();


var Processfn = function() {
if ( cueLinks ) {
  var a = document.getElementsByTagName('a');

  for(var i = 0; i < a.length; ++i)
  {
    addEvent(a[i], "click", cuelinksUrl);
    addEvent(a[i], "mousedown", cuelinksUrl);
  }

  var area = document.getElementsByTagName('area');

  for(var i = 0; i < area.length; ++i)
  {
    addEvent(area[i], "click", cuelinksUrl);
    addEvent(area[i], "mousedown", cuelinksUrl);
  }

}

if(cueWords){

  var CueWordsfn = function() {
  var url = "http://cw.linksredirect.com/content/?publisher_id=" + pubID + "&url=" + document.URL;
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
   throw new Error('CORS not supported');
  }

  xhr.onload = function() {
     text = xhr.responseText;
    var array = JSON.parse(text);
    var total_replaced = 0;
    obj = document.getElementsByTagName("body")[0];
    for (i in array) {
      keyword = array[i]["keyword"]
      url = array[i]["url"]
      //weight = array[i]["weight"]
      id = array[i]["id"]
      // Currently only replace 3 elements max in a page.. Though it should be dynamic..
      if (total_replaced < cueDensity) {
       findAndReplaceDOMText(obj, {
         find: new RegExp("\\b(?!</a>)(" + keyword + "\\b)", "i"),
         replace: function(portion, match) {
         total_replaced = total_replaced + 1;
         var link = document.createElement('a');
         link.setAttribute('href', url);
         link.appendChild(document.createTextNode(portion.text))
         link.setAttribute('target', "_blank");
         link.setAttribute('rel', "nofollow");
         link.setAttribute('data-cue', "cw_" + id);
         link.setAttribute('title', 'Link Added by CueLinks');
         if (cuewordLinkColor != 'null') {
          link.setAttribute('style', "color: " + cuewordLinkColor);
         }
           addEvent(link, "click", cuewordsUrl);
           addEvent(link, "mousedown", cuewordsUrl);
         return link
         },
         filterElements: function(el) {
         return !ignoreTagsRegex.test(el.nodeName);
         }
       });
      }
    }
   };
  xhr.send();
  };
  loadScript("//cdn0.cuelinks.com/js/findAndReplaceDOMText.js", CueWordsfn);
};
};