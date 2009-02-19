// ==UserScript==
// @name          Follow Cost for Twitter profiles
// @author        Barry Hess
// @namespace     http://followcost.com
// @description	  Display a user's Follow Cost right in his/her Twitter profile
// @include       http://twitter.com/*
// ==/UserScript==

function updateFollowCost() {
  if($('#profile')) {
    var m=/^http[s]{0,1}:\/\/twitter.com\/(\w+)/.exec(window.location.href);
    if(m) {
      var username = m[1];
      $.getJSON("http://followcost.com/" + username + ".json?callback=?", function(json) {
        var markup = "<li><span class='label'>Follow Cost</span> <a href='http://followcost.com/" + username +"' class='url' rel='nofollow'>" + json.milliscobles_all_time + " m&Sigma;</a></li>"
        var ul = $('#profile').find('ul.about');
        ul.html(ul.html() + markup);
      });
    }
  }
}

function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined')
    {
        window.setTimeout(GM_wait,251);
    }
    else
    {
        $ = unsafeWindow.jQuery; letsJQuery();
    }
}

function letsJQuery()
{
  updateFollowCost();
}

if(navigator.appVersion.match('AppleWebKit')) {
  updateFollowCost();
} else {
  GM_wait();
}