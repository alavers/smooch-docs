/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
!function(t){function e(){var t=window.location.pathname;return 0===t.indexOf("/ios")?"ios":0===t.indexOf("/android")?"android":0===t.indexOf("/javascript")?"javascript":0===t.indexOf("/rest")?"rest":"unknown"}function i(){var t=e();switch(t){case"ios":return r;case"android":return a;case"javascript":return l;case"rest":return c}return r}function n(t){if(t&&""!==t){$(".lang-selector a").removeClass("active"),$(".lang-selector a[data-language-name='"+t+"']").addClass("active");for(var i=0;i<h.length;i++)$(".highlight."+h[i]).hide();$(".highlight."+t).show(),localStorage.setItem("language_"+e(),t),window.location.hash&&$(window.location.hash).get(0)?$(window.location.hash).get(0).scrollIntoView(!0):history.pushState("",document.title,window.location.pathname)}}function o(t){if(history){var i=window.location.hash;i&&(i=i.replace(/^#+/,"")),history.pushState({},"","?"+t+"#"+i),localStorage.setItem("language_"+e(),t)}}function s(t){var o=(t[0],localStorage.getItem("language_"+e()));""!==location.search.substr(1)&&-1!=jQuery.inArray(location.search.substr(1),i())?(n(location.search.substr(1)),localStorage.setItem("language_"+e(),location.search.substr(1))):n(null!==o&&-1!=jQuery.inArray(o,i())?o:i()[0])}var r=["swift","objective_c"],a=["java"],l=["javascript"],c=["shell","javascript"],h=[].concat(r,a,l,c);t.setupLanguages=s,t.activateLanguage=n,t.getPlatform=e,t.getLanguages=i,$(function(){$(".lang-selector a").on("click",function(){var t=$(this).data("language-name");return o(t),n(t),!1}),window.onpopstate=function(){n(window.location.search.substr(1))}})}(window);