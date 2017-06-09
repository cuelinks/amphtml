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


function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else
    obj.addEventListener( type, fn, false );
}


// read publisher id from amp custom tag, it has been set as attribute
var pubID = document.getElementsByTagName("amp-cuelinks")[0].getAttribute("data-pubid");
var cueLinks;

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
