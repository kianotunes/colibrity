// Utility function
class Util {
  // merge a set of user options into plugin defaults
  // https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
  static extend(...args) {
    // Variables
    const extended = {};
    let deep = false;
    let i = 0;
    const length = args.length;

    // Check if a deep merge
    if ( Object.prototype.toString.call( args[0] ) === '[object Boolean]' ) {
      deep = args[0];
      i++;
    }

    // Merge the object into the extended object
    const merge = obj => {
      for ( const prop in obj ) {
        if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
          // If deep merge and property is an object, merge properties
          if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
            extended[prop] = extend( true, extended[prop], obj[prop] );
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };

    // Loop through each object and conduct a merge
    for ( ; i < length; i++ ) {
      const obj = args[i];
      merge(obj);
    }

    return extended;
  }
}

/* 
	class manipulation functions
*/
Util.hasClass = (el, className) => {
	if (el.classList) return el.classList.contains(className);
	else return !!el.getAttribute('class').match(new RegExp(`(\\s|^)${className}(\\s|$)`));
};

Util.addClass = (el, className) => {
	const classList = className.split(' ');
 	if (el.classList) el.classList.add(classList[0]);
  else if (!Util.hasClass(el, classList[0])) el.setAttribute('class', `${el.getAttribute('class')} ${classList[0]}`);
 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = (el, className) => {
	const classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);	
	else if(Util.hasClass(el, classList[0])) {
		const reg = new RegExp(`(\\s|^)${classList[0]}(\\s|$)`);
    el.setAttribute('class', el.getAttribute('class').replace(reg, ' '));
	}
	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = (el, className, bool) => {
	if(bool) Util.addClass(el, className);
	else Util.removeClass(el, className);
};

Util.setAttributes = (el, attrs) => {
  for(const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

/* 
  DOM manipulation
*/
Util.getChildrenByClassName = (el, className) => {
  const children = el.children;
  const childrenByClass = [];
  for (let i = 0; i < el.children.length; i++) {
    if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
  }
  return childrenByClass;
};

Util.is = (elem, selector) => {
  if(selector.nodeType){
    return elem === selector;
  }

  const qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector);
  let length = qa.length;
  const returnArr = [];

  while(length--){
    if(qa[length] === elem){
      return true;
    }
  }

  return false;
};

/* 
	Animate height of an element
*/
Util.setHeight = (start, to, element, duration, cb, timeFunction) => {
  const change = to - start;
  let currentTime = null;

  const animateHeight = timestamp => {  
    if (!currentTime) currentTime = timestamp;         
    let progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    let val = parseInt((progress/duration)*change + start);
    if(timeFunction) {
      val = Math[timeFunction](progress, start, to - start, duration);
    }
    element.style.height = `${val}px`;
    if(progress < duration) {
        window.requestAnimationFrame(animateHeight);
    } else {
    	if(cb) cb();
    }
  };

  //set the height of the element before starting animation -> fix bug on Safari
  element.style.height = `${start}px`;
  window.requestAnimationFrame(animateHeight);
};

/* 
	Smooth Scroll
*/

Util.scrollTo = (final, duration, cb, scrollEl) => {
  const element = scrollEl || window;
  let start = element.scrollTop || document.documentElement.scrollTop;
  let currentTime = null;

  if(!scrollEl) start = window.scrollY || document.documentElement.scrollTop;

  const animateScroll = timestamp => {
  	if (!currentTime) currentTime = timestamp;        
    let progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    const val = Math.easeInOutQuad(progress, start, final-start, duration);
    element.scrollTo(0, val);
    if(progress < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};

/* 
  Focus utility classes
*/

//Move focus to an element
Util.moveFocus = element => {
  if( !element ) element = document.getElementsByTagName("body")[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};

/* 
  Misc
*/

Util.getIndexInArray = (array, el) => Array.prototype.indexOf.call(array, el);

Util.cssSupports = (property, value) => {
  if('CSS' in window) {
    return CSS.supports(property, value);
  } else {
    const jsProperty = property.replace(/-([a-z])/g, g => g[1].toUpperCase());
    return jsProperty in document.body.style;
  }
};

// Check if Reduced Motion is enabled
Util.osHasReducedMotion = () => {
  if(!window.matchMedia) return false;
  const matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(matchMediaObj) return matchMediaObj.matches;
  return false; // return false if not supported
};

/* 
	Polyfills
*/
//Closest() method
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		let el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1); 
		return null;
	};
}

//Custom Event() constructor
if ( typeof window.CustomEvent !== "function" ) {

  function CustomEvent(event, params = { bubbles: false, cancelable: false, detail: undefined }) {
    const evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}