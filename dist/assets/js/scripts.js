function Util(){}function CustomEvent(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}function resetFocusTabsStyle(){window.dispatchEvent(new CustomEvent("initFocusTabs"))}Util.hasClass=function(e,t){return e.classList?e.classList.contains(t):!!e.getAttribute("class").match(new RegExp("(\\s|^)"+t+"(\\s|$)"))},Util.addClass=function(e,t){t=t.split(" ");e.classList?e.classList.add(t[0]):Util.hasClass(e,t[0])||e.setAttribute("class",e.getAttribute("class")+" "+t[0]),1<t.length&&Util.addClass(e,t.slice(1).join(" "))},Util.removeClass=function(e,t){var n=t.split(" ");e.classList?e.classList.remove(n[0]):Util.hasClass(e,n[0])&&(t=new RegExp("(\\s|^)"+n[0]+"(\\s|$)"),e.setAttribute("class",e.getAttribute("class").replace(t," "))),1<n.length&&Util.removeClass(e,n.slice(1).join(" "))},Util.toggleClass=function(e,t,n){n?Util.addClass(e,t):Util.removeClass(e,t)},Util.setAttributes=function(e,t){for(var n in t)e.setAttribute(n,t[n])},Util.getChildrenByClassName=function(e,t){e.children;for(var n=[],i=0;i<e.children.length;i++)Util.hasClass(e.children[i],t)&&n.push(e.children[i]);return n},Util.is=function(e,t){if(t.nodeType)return e===t;for(var n="string"==typeof t?document.querySelectorAll(t):t,i=n.length;i--;)if(n[i]===e)return!0;return!1},Util.setHeight=function(n,i,s,a,l,o){var r=i-n,d=null,u=function(e){var t=e-(d=d||e);a<t&&(t=a);e=parseInt(t/a*r+n);o&&(e=Math[o](t,n,i-n,a)),s.style.height=e+"px",t<a?window.requestAnimationFrame(u):l&&l()};s.style.height=n+"px",window.requestAnimationFrame(u)},Util.scrollTo=function(n,i,s,e){var a=e||window,l=a.scrollTop||document.documentElement.scrollTop,o=null;e||(l=window.scrollY||document.documentElement.scrollTop);var r=function(e){var t=e-(o=o||e);i<t&&(t=i);e=Math.easeInOutQuad(t,l,n-l,i);a.scrollTo(0,e),t<i?window.requestAnimationFrame(r):s&&s()};window.requestAnimationFrame(r)},Util.moveFocus=function(e){(e=e||document.getElementsByTagName("body")[0]).focus(),document.activeElement!==e&&(e.setAttribute("tabindex","-1"),e.focus())},Util.getIndexInArray=function(e,t){return Array.prototype.indexOf.call(e,t)},Util.cssSupports=function(e,t){return"CSS"in window?CSS.supports(e,t):e.replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})in document.body.style},Util.extend=function(){var n={},i=!1,e=0,t=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(i=arguments[0],e++);for(;e<t;e++)!function(e){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(i&&"[object Object]"===Object.prototype.toString.call(e[t])?n[t]=extend(!0,n[t],e[t]):n[t]=e[t])}(arguments[e]);return n},Util.osHasReducedMotion=function(){if(!window.matchMedia)return!1;var e=window.matchMedia("(prefers-reduced-motion: reduce)");return!!e&&e.matches},Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;if(!document.documentElement.contains(t))return null;do{if(t.matches(e))return t}while(null!==(t=t.parentElement||t.parentNode)&&1===t.nodeType);return null}),"function"!=typeof window.CustomEvent&&(CustomEvent.prototype=window.Event.prototype,window.CustomEvent=CustomEvent),Math.easeInOutQuad=function(e,t,n,i){return(e/=i/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t},Math.easeInQuart=function(e,t,n,i){return n*(e/=i)*e*e*e+t},Math.easeOutQuart=function(e,t,n,i){return e/=i,-n*(--e*e*e*e-1)+t},Math.easeInOutQuart=function(e,t,n,i){return(e/=i/2)<1?n/2*e*e*e*e+t:-n/2*((e-=2)*e*e*e-2)+t},Math.easeOutElastic=function(e,t,n,i){var s=1.70158,a=.7*i,l=n;return 0==e?t:1==(e/=i)?t+n:(a=a||.3*i,s=l<Math.abs(n)?(l=n,a/4):a/(2*Math.PI)*Math.asin(n/l),l*Math.pow(2,-10*e)*Math.sin((e*i-s)*(2*Math.PI)/a)+n+t)},function(){var i=document.getElementsByClassName("js-tab-focus"),e=!1,t=!1,n=!1;function s(){0<i.length&&(l(!1),window.addEventListener("keydown",a)),window.removeEventListener("mousedown",s),n=!(t=!1)}function a(e){9===e.keyCode&&(l(!0),window.removeEventListener("keydown",a),window.addEventListener("mousedown",s),t=!0)}function l(e){for(var t=e?"":"none",n=0;n<i.length;n++)i[n].style.setProperty("outline",t)}function o(){e?n&&l(t):(e=0<i.length,window.addEventListener("mousedown",s))}o(),window.addEventListener("initFocusTabs",o)}(),function(){var e=document.getElementsByClassName("js-anim-menu-btn");if(0<e.length)for(var t=0;t<e.length;t++)!function(){var n;(n=e[t]).addEventListener("click",function(e){e.preventDefault();var t=!Util.hasClass(n,"anim-menu-btn--state-b");Util.toggleClass(n,"anim-menu-btn--state-b",t);e=new CustomEvent("anim-menu-btn-clicked",{detail:t});n.dispatchEvent(e)})}()}(),function(){function e(e){var t,n,i,s,a;this.element=e,this.select=this.element.getElementsByTagName("select")[0],this.optGroups=this.select.getElementsByTagName("optgroup"),this.options=this.select.getElementsByTagName("option"),this.selectId=this.select.getAttribute("id"),this.trigger=!1,this.dropdown=!1,this.customOptions=!1,this.arrowIcon=this.element.getElementsByTagName("svg"),this.label=document.querySelector('[for="'+this.selectId+'"]'),this.selectedOptCounter=0,this.optionIndex=0,this.noSelectText=this.element.getAttribute("data-no-select-text")||"Select",this.multiSelectText=this.element.getAttribute("data-multi-select-text")||"{n} items selected",this.nMultiSelect=this.element.getAttribute("data-n-multi-select")||1,this.noUpdateLabel=this.element.getAttribute("data-update-text")&&"off"==this.element.getAttribute("data-update-text"),this.insetLabel=this.element.getAttribute("data-inset-label")&&"on"==this.element.getAttribute("data-inset-label"),(t=this).element.insertAdjacentHTML("beforeend",(i=(n=t).element.getAttribute("data-trigger-class")?" "+n.element.getAttribute("data-trigger-class"):"",e=d(n),e='<button class="js-multi-select__button multi-select__button'+i+(0<n.selectedOptCounter?" multi-select__button--active":"")+'" aria-label="'+e[1]+'" aria-expanded="false" aria-controls="'+n.selectId+'-dropdown"><span aria-hidden="true" class="js-multi-select__label multi-select__label">'+e[0]+"</span>",0<n.arrowIcon.length&&n.arrowIcon[0].outerHTML&&(e+=n.arrowIcon[0].outerHTML),e+"</button>"+function(e){var t='<div class="js-multi-select__dropdown multi-select__dropdown" aria-describedby="'+e.selectId+'-description" id="'+e.selectId+'-dropdown">';if(t+=e.label?'<p class="sr-only" id="'+e.selectId+'-description">'+e.label.textContent+"</p>":"",0<e.optGroups.length)for(var n=0;n<e.optGroups.length;n++)var i=e.optGroups[n].getElementsByTagName("option"),t=t+'<ul class="multi-select__list" role="listbox" aria-multiselectable="true">'+('<li><span class="multi-select__item multi-select__item--optgroup">'+e.optGroups[n].getAttribute("label")+"</span></li>")+u(e,i)+"</ul>";else t=t+'<ul class="multi-select__list" role="listbox" aria-multiselectable="true">'+u(e,e.options)+"</ul>";return t}(t))),t.dropdown=t.element.getElementsByClassName("js-multi-select__dropdown")[0],t.trigger=t.element.getElementsByClassName("js-multi-select__button")[0],t.customOptions=t.dropdown.getElementsByClassName("js-multi-select__option"),Util.addClass(t.select,"is-hidden"),0<t.arrowIcon.length&&(t.arrowIcon[0].style.display="none"),(a=s=this).dropdown.addEventListener("change",function(e){e=e.target.closest(".js-multi-select__option");e&&r(a,e)}),a.dropdown.addEventListener("click",function(e){var t=e.target.closest(".js-multi-select__option");t&&Util.hasClass(e.target,"js-multi-select__option")&&r(a,t)}),s.trigger.addEventListener("click",function(e){e.preventDefault(),l(s,!1)}),s.label&&s.label.addEventListener("click",function(){Util.moveFocus(s.trigger)}),s.dropdown.addEventListener("keydown",function(e){e.keyCode&&38==e.keyCode||e.key&&"arrowup"==e.key.toLowerCase()?o(s,"prev",e):(e.keyCode&&40==e.keyCode||e.key&&"arrowdown"==e.key.toLowerCase())&&o(s,"next",e)})}function l(t,e){var n,i=e||("true"==t.trigger.getAttribute("aria-expanded")?"false":"true");t.trigger.setAttribute("aria-expanded",i),"true"==i&&(n=((i=(e=t).dropdown.querySelector('[aria-selected="true"]'))?i:e.dropdown.getElementsByClassName("js-multi-select__option")[0]).getElementsByClassName("js-multi-select__checkbox")[0],Util.moveFocus(n),t.dropdown.addEventListener("transitionend",function e(){Util.moveFocus(n),t.dropdown.removeEventListener("transitionend",e)}),function(e){var t=e.trigger.getBoundingClientRect();Util.toggleClass(e.dropdown,"multi-select__dropdown--right",window.innerWidth<t.left+e.dropdown.offsetWidth);var n=window.innerHeight-t.bottom<t.top;Util.toggleClass(e.dropdown,"multi-select__dropdown--up",n),n=n?t.top-20:window.innerHeight-t.bottom-20,e.dropdown.setAttribute("style","max-height: "+n+"px; width: "+t.width+"px;")}(t))}function o(e,t,n){n.preventDefault();n=Util.getIndexInArray(e.customOptions,document.activeElement.closest(".js-multi-select__option"));(n=(n="next"==t?n+1:n-1)<0?e.customOptions.length-1:n)>=e.customOptions.length&&(n=0),Util.moveFocus(e.customOptions[n].getElementsByClassName("js-multi-select__checkbox")[0])}function r(e,t){t.hasAttribute("aria-selected")&&"true"==t.getAttribute("aria-selected")?(t.setAttribute("aria-selected","false"),n(e,t.getAttribute("data-index"),!1)):(t.setAttribute("aria-selected","true"),n(e,t.getAttribute("data-index"),!0));var t=d(e);e.trigger.getElementsByClassName("js-multi-select__label")[0].innerHTML=t[0],Util.toggleClass(e.trigger,"multi-select__button--active",0<e.selectedOptCounter),t=t[1],e.trigger.setAttribute("aria-label",t)}function n(e,t,n){e.options[t].selected=n,e.select.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}function d(e){var t='<span class="multi-select__term">'+e.noSelectText+"</span>";if(e.noUpdateLabel)return[t,e.noSelectText];for(var n="",i="",s=e.selectedOptCounter=0;s<e.options.length;s++)e.options[s].selected&&(0!=e.selectedOptCounter&&(n+=", "),n=n+""+e.options[s].text,e.selectedOptCounter=e.selectedOptCounter+1);return e.selectedOptCounter>e.nMultiSelect?(n='<span class="multi-select__details">'+e.multiSelectText.replace("{n}",e.selectedOptCounter)+"</span>",i=e.multiSelectText.replace("{n}",e.selectedOptCounter)+", "+e.noSelectText):0<e.selectedOptCounter?(i=n+", "+e.noSelectText,n='<span class="multi-select__details">'+n+"</span>"):(n=t,i=e.noSelectText),[n=e.insetLabel&&0<e.selectedOptCounter?t+n:n,i]}function u(e,t){for(var n="",i=0;i<t.length;i++){var s=t[i].hasAttribute("selected")?' aria-selected="true"':' aria-selected="false"',a=t[i].hasAttribute("selected")?"checked":"",n=n+'<li class="js-multi-select__option" role="option" data-value="'+t[i].value+'" '+s+' data-label="'+t[i].text+'" data-index="'+e.optionIndex+'"><input aria-hidden="true" class="checkbox js-multi-select__checkbox" type="checkbox" id="'+e.selectId+"-"+t[i].value+"-"+e.optionIndex+'" '+a+'><label class="multi-select__item multi-select__item--option" aria-hidden="true" for="'+e.selectId+"-"+t[i].value+"-"+e.optionIndex+'"><span>'+t[i].text+"</span></label></li>";e.optionIndex=e.optionIndex+1}return n}var t=document.getElementsByClassName("js-multi-select");if(0<t.length){for(var i=[],s=0;s<t.length;s++)i.push(new e(t[s]));window.addEventListener("keyup",function(e){(e.keyCode&&27==e.keyCode||e.key&&"escape"==e.key.toLowerCase())&&i.forEach(function(e){var t=e;document.activeElement.closest(".js-multi-select")&&t.trigger.focus(),l(e,"false")})}),window.addEventListener("click",function(n){i.forEach(function(e){var t=e,e=n.target;t.element.contains(e)||l(t,"false")})})}}(),function(){function e(e){this.element=e,this.delta=[!1,!1],this.dragging=!1,this.intervalId=!1,(e=this).element.addEventListener("mousedown",a.bind(e)),e.element.addEventListener("touchstart",a.bind(e))}function a(e){switch(e.type){case"mousedown":case"touchstart":s=e,(i=this).dragging=!0,function(e){e.element.addEventListener("mousemove",a.bind(e)),e.element.addEventListener("touchmove",a.bind(e)),e.element.addEventListener("mouseup",a.bind(e)),e.element.addEventListener("mouseleave",a.bind(e)),e.element.addEventListener("touchend",a.bind(e))}(i),i.delta=[parseInt(o(s).clientX),parseInt(o(s).clientY)],r(i,"dragStart",i.delta,s.target);break;case"mousemove":case"touchmove":n=e,!void((t=this).dragging&&(window.requestAnimationFrame?t.intervalId=window.requestAnimationFrame(l.bind(t,n)):t.intervalId=setTimeout(function(){l.bind(t,n)},250)));break;case"mouseup":case"mouseleave":case"touchend":!function(e,t){!function(e){e.intervalId&&(window.requestAnimationFrame?window.cancelAnimationFrame(e.intervalId):clearInterval(e.intervalId),e.intervalId=!1),e.element.removeEventListener("mousemove",a.bind(e)),e.element.removeEventListener("touchmove",a.bind(e)),e.element.removeEventListener("mouseup",a.bind(e)),e.element.removeEventListener("mouseleave",a.bind(e)),e.element.removeEventListener("touchend",a.bind(e))}(e);var n,i=parseInt(o(t).clientX),t=parseInt(o(t).clientY);e.delta&&(e.delta[0]||0===e.delta[0])&&(n=d(i-e.delta[0]),30<Math.abs(i-e.delta[0])&&r(e,n<0?"swipeLeft":"swipeRight",[i,t]),e.delta[0]=!1),e.delta&&(e.delta[1]||0===e.delta[1])&&(n=d(t-e.delta[1]),30<Math.abs(t-e.delta[1])&&r(e,n<0?"swipeUp":"swipeDown",[i,t]),e.delta[1]=!1),r(e,"dragEnd",[i,t]),e.dragging=!1}(this,e)}var t,n,i,s}function l(e){r(this,"dragging",[parseInt(o(e).clientX),parseInt(o(e).clientY)])}function o(e){return e.changedTouches?e.changedTouches[0]:e}function r(e,t,n,i){var s=!1;i&&(s=i);s=new CustomEvent(t,{detail:{x:n[0],y:n[1],origin:s}});e.element.dispatchEvent(s)}function d(e){return Math.sign?Math.sign(e):(0<e)-(e<0)||+e}window.SwipeContent=e;var t=document.getElementsByClassName("js-swipe-content");if(0<t.length)for(var n=0;n<t.length;n++)new e(t[n])}(),function(){function e(e){this.element=e,this.tabList=this.element.getElementsByClassName("js-tabs__controls")[0],this.listItems=this.tabList.getElementsByTagName("li"),this.triggers=this.tabList.getElementsByTagName("a"),this.panelsList=this.element.getElementsByClassName("js-tabs__panels")[0],this.panels=Util.getChildrenByClassName(this.panelsList,"js-tabs__panel"),this.hideClass="is-hidden",this.customShowClass=!!this.element.getAttribute("data-show-panel-class")&&this.element.getAttribute("data-show-panel-class"),this.layout=this.element.getAttribute("data-tabs-layout")?this.element.getAttribute("data-tabs-layout"):"horizontal",this.deepLinkOn="on"==this.element.getAttribute("data-deep-link"),this.initTab()}e.prototype.initTab=function(){this.tabList.setAttribute("role","tablist");for(var e=0;e<this.triggers.length;e++){var t=0==e,n=this.panels[e].getAttribute("id");this.listItems[e].setAttribute("role","presentation"),Util.setAttributes(this.triggers[e],{role:"tab","aria-selected":t,"aria-controls":n,id:"tab-"+n}),Util.addClass(this.triggers[e],"js-tabs__trigger"),Util.setAttributes(this.panels[e],{role:"tabpanel","aria-labelledby":"tab-"+n}),Util.toggleClass(this.panels[e],this.hideClass,!t),t||this.triggers[e].setAttribute("tabindex","-1")}this.initTabEvents(),this.initDeepLink()},e.prototype.initTabEvents=function(){var i=this;this.tabList.addEventListener("click",function(e){e.target.closest(".js-tabs__trigger")&&i.triggerTab(e.target.closest(".js-tabs__trigger"),e)}),this.tabList.addEventListener("keydown",function(e){var t,n;e.target.closest(".js-tabs__trigger")&&(t=e,"horizontal"==(n=i.layout)&&(t.keyCode&&39==t.keyCode||t.key&&"ArrowRight"==t.key)||"vertical"==n&&(t.keyCode&&40==t.keyCode||t.key&&"ArrowDown"==t.key)?(e.preventDefault(),i.selectNewTab("next")):(n=e,("horizontal"==(t=i.layout)&&(n.keyCode&&37==n.keyCode||n.key&&"ArrowLeft"==n.key)||"vertical"==t&&(n.keyCode&&38==n.keyCode||n.key&&"ArrowUp"==n.key))&&(e.preventDefault(),i.selectNewTab("prev"))))})},e.prototype.selectNewTab=function(e){var t=this.tabList.querySelector('[aria-selected="true"]'),t=Util.getIndexInArray(this.triggers,t);(t=(t="next"==e?t+1:t-1)<0?this.listItems.length-1:t)>=this.listItems.length&&(t=0),this.triggerTab(this.triggers[t]),this.triggers[t].focus()},e.prototype.triggerTab=function(e,t){t&&t.preventDefault();var n=Util.getIndexInArray(this.triggers,e);if("true"!=this.triggers[n].getAttribute("aria-selected")){for(var i=0;i<this.triggers.length;i++){var s=i==n;Util.toggleClass(this.panels[i],this.hideClass,!s),this.customShowClass&&Util.toggleClass(this.panels[i],this.customShowClass,s),this.triggers[i].setAttribute("aria-selected",s),s?this.triggers[i].setAttribute("tabindex","0"):this.triggers[i].setAttribute("tabindex","-1")}this.deepLinkOn&&history.replaceState(null,"","#"+e.getAttribute("aria-controls"))}},e.prototype.initDeepLink=function(){if(this.deepLinkOn){var e=window.location.hash.substr(1),t=this;if(e&&""!=e)for(var n=0;n<this.panels.length;n++)if(this.panels[n].getAttribute("id")==e){this.triggerTab(this.triggers[n],!1),setTimeout(function(){t.panels[n].scrollIntoView(!0)});break}}};var t=document.getElementsByClassName("js-tabs");if(0<t.length)for(var n=0;n<t.length;n++)new e(t[n])}(),function(){var t,n,i,e,s=document.getElementsByClassName("js-f-header");function a(e){return e.offsetWidth||e.offsetHeight||e.getClientRects().length}function l(){!a(t)&&Util.hasClass(s[0],"f-header--expanded")&&t.click()}0<s.length&&(t=s[0].getElementsByClassName("js-anim-menu-btn")[0],n=function(){for(var e=s[0].getElementsByClassName("f-header__nav")[0].querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'),t=!1,n=0;n<e.length;n++)if(e[n].offsetWidth||e[n].offsetHeight||e[n].getClientRects().length){t=e[n];break}return t}(),i=!1,t.addEventListener("anim-menu-btn-clicked",function(e){e=e.detail,Util.toggleClass(document.getElementsByClassName("f-header__nav")[0],"f-header__nav--is-visible",e),Util.toggleClass(s[0],"f-header--expanded",e),t.setAttribute("aria-expanded",e),e?n.focus():i&&(i.focus(),i=!1)}),window.addEventListener("keyup",function(e){(e.keyCode&&27==e.keyCode||e.key&&"escape"==e.key.toLowerCase())&&"true"==t.getAttribute("aria-expanded")&&a(t)&&(i=t).click(),(e.keyCode&&9==e.keyCode||e.key&&"tab"==e.key.toLowerCase())&&"true"==t.getAttribute("aria-expanded")&&a(t)&&!document.activeElement.closest(".js-f-header")&&t.click()}),e=!1,window.addEventListener("resize",function(){clearTimeout(e),e=setTimeout(l,500)}))}(),function(){var i=function(e){var t,n;this.options=(t=i.defaults,(n={}).element=(void 0!==(e=e).element?e:t).element,n.navigation=(void 0!==e.navigation?e:t).navigation,n.autoplay=(void 0!==e.autoplay?e:t).autoplay,n.autoplayInterval=(void 0!==e.autoplayInterval?e:t).autoplayInterval,n.swipe=(void 0!==e.swipe?e:t).swipe,n),this.element=this.options.element,this.items=this.element.getElementsByClassName("js-slideshow__item"),this.controls=this.element.getElementsByClassName("js-slideshow__control"),this.selectedSlide=0,this.autoplayId=!1,this.autoplayPaused=!1,this.navigation=!1,this.navCurrentLabel=!1,this.ariaLive=!1,this.moveFocus=!1,this.animating=!1,this.supportAnimation=Util.cssSupports("transition"),this.animationOff=!Util.hasClass(this.element,"slideshow--transition-fade")&&!Util.hasClass(this.element,"slideshow--transition-slide")&&!Util.hasClass(this.element,"slideshow--transition-prx"),this.animationType=Util.hasClass(this.element,"slideshow--transition-prx")?"prx":"slide",this.animatingClass="slideshow--is-animating",function(e){e.element.getElementsByClassName("slideshow__item--selected").length<1&&Util.addClass(e.items[0],"slideshow__item--selected"),e.selectedSlide=Util.getIndexInArray(e.items,e.element.getElementsByClassName("slideshow__item--selected")[0]);var t=document.createElement("div");Util.setAttributes(t,{class:"sr-only js-slideshow__aria-live","aria-live":"polite","aria-atomic":"true"}),e.element.appendChild(t),e.ariaLive=t}(this),function(t){if(t.options.navigation){if(0==t.element.getElementsByClassName("js-slideshow__navigation").length){var e=document.createElement("ol"),n="",i="slideshow__navigation js-slideshow__navigation";t.items.length<=1&&(i+=" is-hidden"),e.setAttribute("class",i);for(var s=0;s<t.items.length;s++){var a=s==t.selectedSlide?'class="slideshow__nav-item slideshow__nav-item--selected js-slideshow__nav-item"':'class="slideshow__nav-item js-slideshow__nav-item"',l=s==t.selectedSlide?'<span class="sr-only js-slideshow__nav-current-label">Current Item</span>':"";n=n+"<li "+a+'><button class="reset"><span class="sr-only">'+(s+1)+"</span>"+l+"</button></li>"}e.innerHTML=n,t.element.appendChild(e)}t.navCurrentLabel=t.element.getElementsByClassName("js-slideshow__nav-current-label")[0],t.navigation=t.element.getElementsByClassName("js-slideshow__nav-item");e=t.element.getElementsByClassName("js-slideshow__navigation")[0];e.addEventListener("click",function(e){r(t,e,!0)}),e.addEventListener("keyup",function(e){r(t,e,"enter"==e.key.toLowerCase())})}if(0<t.controls.length&&(t.items.length<=1&&(Util.addClass(t.controls[0],"is-hidden"),Util.addClass(t.controls[1],"is-hidden")),t.controls[0].addEventListener("click",function(e){e.preventDefault(),t.showPrev(),u(t)}),t.controls[1].addEventListener("click",function(e){e.preventDefault(),t.showNext(),u(t)})),t.options.swipe&&(new SwipeContent(t.element),t.element.addEventListener("swipeLeft",function(e){t.showNext()}),t.element.addEventListener("swipeRight",function(e){t.showPrev()})),t.options.autoplay&&(t.startAutoplay(),t.element.addEventListener("mouseenter",function(e){t.pauseAutoplay(),t.autoplayPaused=!0}),t.element.addEventListener("focusin",function(e){t.pauseAutoplay(),t.autoplayPaused=!0}),t.element.addEventListener("mouseleave",function(e){t.autoplayPaused=!1,t.startAutoplay()}),t.element.addEventListener("focusout",function(e){t.autoplayPaused=!1,t.startAutoplay()})),e=t.element.getAttribute("id"))for(var o=document.querySelectorAll('[data-controls="'+e+'"]'),s=0;s<o.length;s++)!function(){var n,i;n=t,(i=o[s]).addEventListener("click",function(e){var t=i.getAttribute("data-index");t&&t!=n.selectedSlide+1&&(e.preventDefault(),d(n,t-1,!1))})}();t.element.addEventListener("selectNewItem",function(e){e.detail&&e.detail-1!=t.selectedSlide&&d(t,e.detail-1,!1)}),t.element.addEventListener("keydown",function(e){e.keyCode&&39==e.keyCode||e.key&&"arrowright"==e.key.toLowerCase()?t.showNext():(e.keyCode&&37==e.keyCode||e.key&&"arrowleft"==e.key.toLowerCase())&&t.showPrev()})}(this),function(t){for(var e=0;e<t.items.length;e++)!function(e){t.items[e].addEventListener("animationend",function(){s(t,t.items[e])}),t.items[e].addEventListener("transitionend",function(){s(t,t.items[e])})}(e)}(this)};function r(e,t,n){t=Util.hasClass(t.target,"js-slideshow__nav-item")?t.target:t.target.closest(".js-slideshow__nav-item");n&&t&&!Util.hasClass(t,"slideshow__nav-item--selected")&&(e.showItem(Util.getIndexInArray(e.navigation,t)),e.moveFocus=!0,u(e))}function s(e,t){setTimeout(function(){Util.hasClass(t,"slideshow__item--selected")&&(e.moveFocus&&Util.moveFocus(t),a(e,"newItemVisible",e.selectedSlide),e.moveFocus=!1),Util.removeClass(t,"slideshow__item--"+e.animationType+"-out-left slideshow__item--"+e.animationType+"-out-right slideshow__item--"+e.animationType+"-in-left slideshow__item--"+e.animationType+"-in-right"),t.removeAttribute("aria-hidden"),e.animating=!1,Util.removeClass(e.element,e.animatingClass)},100)}function d(e,t,n){if(!(e.items.length<=1||e.animating&&e.supportAnimation)){if(e.animating=!0,Util.addClass(e.element,e.animatingClass),t<0?t=e.items.length-1:t>=e.items.length&&(t=0),n&&Util.hasClass(e.items[t],"is-hidden"))return e.animating=!1,void d(e,t="next"==n?t+1:t-1,n);var i,s;t!=e.selectedSlide?(s=function(e,t,n,i){var s="";s=t?"next"==t?"slideshow__item--"+e.animationType+"-out-right":"slideshow__item--"+e.animationType+"-out-left":i<n?"slideshow__item--"+e.animationType+"-out-left":"slideshow__item--"+e.animationType+"-out-right";return s}(e,n,e.selectedSlide,t),i=function(e,t,n,i){var s="";s=t?"next"==t?"slideshow__item--"+e.animationType+"-in-right":"slideshow__item--"+e.animationType+"-in-left":i<n?"slideshow__item--"+e.animationType+"-in-left":"slideshow__item--"+e.animationType+"-in-right";return s}(e,n,e.selectedSlide,t),e.animationOff||Util.addClass(e.items[e.selectedSlide],s),Util.removeClass(e.items[e.selectedSlide],"slideshow__item--selected"),e.items[e.selectedSlide].setAttribute("aria-hidden","true"),e.animationOff?Util.addClass(e.items[t],"slideshow__item--selected"):Util.addClass(e.items[t],i+" slideshow__item--selected"),n=t,i=(s=e).selectedSlide,s.navigation&&(Util.removeClass(s.navigation[i],"slideshow__nav-item--selected"),Util.addClass(s.navigation[n],"slideshow__nav-item--selected"),s.navCurrentLabel.parentElement.removeChild(s.navCurrentLabel),s.navigation[n].getElementsByTagName("button")[0].appendChild(s.navCurrentLabel)),e.selectedSlide=t,e.pauseAutoplay(),e.startAutoplay(),s=t,(s=(t=e).items[s].getAttribute("data-theme"))?(t.navigation&&t.navigation[0].parentElement.setAttribute("data-theme",s),t.controls[0]&&t.controls[0].parentElement.setAttribute("data-theme",s)):(t.navigation&&t.navigation[0].parentElement.removeAttribute("data-theme"),t.controls[0]&&t.controls[0].parentElement.removeAttribute("data-theme")),a(e,"newItemSelected",e.selectedSlide),e.animationOff&&(e.animating=!1,Util.removeClass(e.element,e.animatingClass))):e.animating=!1}}function a(e,t,n){n=new CustomEvent(t,{detail:n});e.element.dispatchEvent(n)}function u(e){e.ariaLive.innerHTML="Item "+(e.selectedSlide+1)+" of "+e.items.length}i.prototype.showNext=function(){d(this,this.selectedSlide+1,"next")},i.prototype.showPrev=function(){d(this,this.selectedSlide-1,"prev")},i.prototype.showItem=function(e){d(this,e,!1)},i.prototype.startAutoplay=function(){var e=this;!this.options.autoplay||this.autoplayId||this.autoplayPaused||(e.autoplayId=setInterval(function(){e.showNext()},e.options.autoplayInterval))},i.prototype.pauseAutoplay=function(){this.options.autoplay&&(clearInterval(this.autoplayId),this.autoplayId=!1)},i.defaults={element:"",navigation:!0,autoplay:!1,autoplayInterval:5e3,swipe:!1},window.Slideshow=i;var e,t,n,l,o,c=document.getElementsByClassName("js-slideshow");if(0<c.length)for(var m=0;m<c.length;m++)o=l=n=t=void 0,t=!c[e=m].getAttribute("data-navigation")||"off"!=c[e].getAttribute("data-navigation"),n=!(!c[e].getAttribute("data-autoplay")||"on"!=c[e].getAttribute("data-autoplay")),l=c[e].getAttribute("data-autoplay-interval")?c[e].getAttribute("data-autoplay-interval"):5e3,o=!(!c[e].getAttribute("data-swipe")||"on"!=c[e].getAttribute("data-swipe")),new i({element:c[e],navigation:t,autoplay:n,autoplayInterval:l,swipe:o})}();