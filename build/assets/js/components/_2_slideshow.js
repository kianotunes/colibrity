// File#: _2_slideshow
class Slideshow {
  constructor(opts) {
    this.options = slideshowAssignOptions(Slideshow.defaults , opts);
    this.element = this.options.element;
    this.items = this.element.getElementsByClassName('js-slideshow__item');
    this.controls = this.element.getElementsByClassName('js-slideshow__control'); 
    this.selectedSlide = 0;
    this.autoplayId = false;
    this.autoplayPaused = false;
    this.navigation = false;
    this.navCurrentLabel = false;
    this.ariaLive = false;
    this.moveFocus = false;
    this.animating = false;
    this.supportAnimation = Util.cssSupports('transition');
    this.animationOff = (!Util.hasClass(this.element, 'slideshow--transition-fade') && !Util.hasClass(this.element, 'slideshow--transition-slide') && !Util.hasClass(this.element, 'slideshow--transition-prx'));
    this.animationType = Util.hasClass(this.element, 'slideshow--transition-prx') ? 'prx' : 'slide';
    this.animatingClass = 'slideshow--is-animating';
    initSlideshow(this);
    initSlideshowEvents(this);
    initAnimationEndEvents(this);
  }

  showNext() {
    showNewItem(this, this.selectedSlide + 1, 'next');
  }

  showPrev() {
    showNewItem(this, this.selectedSlide - 1, 'prev');
  }

  showItem(index) {
    showNewItem(this, index, false);
  }

  startAutoplay() {
    const self = this;
    if(this.options.autoplay && !this.autoplayId && !this.autoplayPaused) {
      self.autoplayId = setInterval(() => {
        self.showNext();
      }, self.options.autoplayInterval);
    }
  }

  pauseAutoplay() {
    const self = this;
    if(this.options.autoplay) {
      clearInterval(self.autoplayId);
      self.autoplayId = false;
    }
  }
}

function slideshowAssignOptions(defaults, opts) {
  // initialize the object options
  const mergeOpts = {};
  mergeOpts.element = (typeof opts.element !== "undefined") ? opts.element : defaults.element;
  mergeOpts.navigation = (typeof opts.navigation !== "undefined") ? opts.navigation : defaults.navigation;
  mergeOpts.autoplay = (typeof opts.autoplay !== "undefined") ? opts.autoplay : defaults.autoplay;
  mergeOpts.autoplayInterval = (typeof opts.autoplayInterval !== "undefined") ? opts.autoplayInterval : defaults.autoplayInterval;
  mergeOpts.swipe = (typeof opts.swipe !== "undefined") ? opts.swipe : defaults.swipe;
  return mergeOpts;
}

function initSlideshow(slideshow) { // basic slideshow settings
  // if no slide has been selected -> select the first one
  if(slideshow.element.getElementsByClassName('slideshow__item--selected').length < 1) Util.addClass(slideshow.items[0], 'slideshow__item--selected');
  slideshow.selectedSlide = Util.getIndexInArray(slideshow.items, slideshow.element.getElementsByClassName('slideshow__item--selected')[0]);
  // create an element that will be used to announce the new visible slide to SR
  const srLiveArea = document.createElement('div');
  Util.setAttributes(srLiveArea, {'class': 'sr-only js-slideshow__aria-live', 'aria-live': 'polite', 'aria-atomic': 'true'});
  slideshow.element.appendChild(srLiveArea);
  slideshow.ariaLive = srLiveArea;
}

function initSlideshowEvents(slideshow) {
  // if slideshow navigation is on -> create navigation HTML and add event listeners
  if(slideshow.options.navigation) {
    // check if navigation has already been included
    if(slideshow.element.getElementsByClassName('js-slideshow__navigation').length == 0) {
      const navigation = document.createElement('ol');
      let navChildren = '';

      let navClasses = 'slideshow__navigation js-slideshow__navigation';
      if(slideshow.items.length <= 1) {
        navClasses = `${navClasses} is-hidden`;
      }

      navigation.setAttribute('class', navClasses);
      for(var i = 0; i < slideshow.items.length; i++) {
        const className = (i == slideshow.selectedSlide) ? 'class="slideshow__nav-item slideshow__nav-item--selected js-slideshow__nav-item"' :  'class="slideshow__nav-item js-slideshow__nav-item"';
        const navCurrentLabel = (i == slideshow.selectedSlide) ? '<span class="sr-only js-slideshow__nav-current-label">Current Item</span>' : '';
        navChildren = `${navChildren}<li ${className}><button class="reset"><span class="sr-only">${i+1}</span>${navCurrentLabel}</button></li>`;
      }
      navigation.innerHTML = navChildren;
      slideshow.element.appendChild(navigation);
    }
    
    slideshow.navCurrentLabel = slideshow.element.getElementsByClassName('js-slideshow__nav-current-label')[0]; 
    slideshow.navigation = slideshow.element.getElementsByClassName('js-slideshow__nav-item');

    const dotsNavigation = slideshow.element.getElementsByClassName('js-slideshow__navigation')[0];

    dotsNavigation.addEventListener('click', event => {
      navigateSlide(slideshow, event, true);
    });
    dotsNavigation.addEventListener('keyup', event => {
      navigateSlide(slideshow, event, (event.key.toLowerCase() == 'enter'));
    });
  }
  // slideshow arrow controls
  if(slideshow.controls.length > 0) {
    // hide controls if one item available
    if(slideshow.items.length <= 1) {
      Util.addClass(slideshow.controls[0], 'is-hidden');
      Util.addClass(slideshow.controls[1], 'is-hidden');
    }
    slideshow.controls[0].addEventListener('click', event => {
      event.preventDefault();
      slideshow.showPrev();
      updateAriaLive(slideshow);
    });
    slideshow.controls[1].addEventListener('click', event => {
      event.preventDefault();
      slideshow.showNext();
      updateAriaLive(slideshow);
    });
  }
  // swipe events
  if(slideshow.options.swipe) {
    //init swipe
    new SwipeContent(slideshow.element);
    slideshow.element.addEventListener('swipeLeft', event => {
      slideshow.showNext();
    });
    slideshow.element.addEventListener('swipeRight', event => {
      slideshow.showPrev();
    });
  }
  // autoplay
  if(slideshow.options.autoplay) {
    slideshow.startAutoplay();
    // pause autoplay if user is interacting with the slideshow
    slideshow.element.addEventListener('mouseenter', event => {
      slideshow.pauseAutoplay();
      slideshow.autoplayPaused = true;
    });
    slideshow.element.addEventListener('focusin', event => {
      slideshow.pauseAutoplay();
      slideshow.autoplayPaused = true;
    });
    slideshow.element.addEventListener('mouseleave', event => {
      slideshow.autoplayPaused = false;
      slideshow.startAutoplay();
    });
    slideshow.element.addEventListener('focusout', event => {
      slideshow.autoplayPaused = false;
      slideshow.startAutoplay();
    });
  }
  // detect if external buttons control the slideshow
  const slideshowId = slideshow.element.getAttribute('id');
  if(slideshowId) {
    const externalControls = document.querySelectorAll(`[data-controls="${slideshowId}"]`);
    for(var i = 0; i < externalControls.length; i++) {
      ((i => {externalControlSlide(slideshow, externalControls[i]);}))(i);
    }
  }
  // custom event to trigger selection of a new slide element
  slideshow.element.addEventListener('selectNewItem', event => {
    // check if slide is already selected
    if(event.detail) {
      if(event.detail - 1 == slideshow.selectedSlide) return;
      showNewItem(slideshow, event.detail - 1, false);
    }
  });

  // keyboard navigation
  slideshow.element.addEventListener('keydown', event => {
    if(event.keyCode && event.keyCode == 39 || event.key && event.key.toLowerCase() == 'arrowright') {
      slideshow.showNext();
    } else if(event.keyCode && event.keyCode == 37 || event.key && event.key.toLowerCase() == 'arrowleft') {
      slideshow.showPrev();
    }
  });
}

function navigateSlide(slideshow, event, keyNav) { 
  // user has interacted with the slideshow navigation -> update visible slide
  const target = ( Util.hasClass(event.target, 'js-slideshow__nav-item') ) ? event.target : event.target.closest('.js-slideshow__nav-item');
  if(keyNav && target && !Util.hasClass(target, 'slideshow__nav-item--selected')) {
    slideshow.showItem(Util.getIndexInArray(slideshow.navigation, target));
    slideshow.moveFocus = true;
    updateAriaLive(slideshow);
  }
}

function initAnimationEndEvents(slideshow) {
  // remove animation classes at the end of a slide transition
  for( let i = 0; i < slideshow.items.length; i++) {
    ((i => {
      slideshow.items[i].addEventListener('animationend', () => {resetAnimationEnd(slideshow, slideshow.items[i]);});
      slideshow.items[i].addEventListener('transitionend', () => {resetAnimationEnd(slideshow, slideshow.items[i]);});
    }))(i);
  }
}

function resetAnimationEnd(slideshow, item) {
  setTimeout(() => { // add a delay between the end of animation and slideshow reset - improve animation performance
    if(Util.hasClass(item,'slideshow__item--selected')) {
      if(slideshow.moveFocus) Util.moveFocus(item);
      emitSlideshowEvent(slideshow, 'newItemVisible', slideshow.selectedSlide);
      slideshow.moveFocus = false;
    }
    Util.removeClass(item, `slideshow__item--${slideshow.animationType}-out-left slideshow__item--${slideshow.animationType}-out-right slideshow__item--${slideshow.animationType}-in-left slideshow__item--${slideshow.animationType}-in-right`);
    item.removeAttribute('aria-hidden');
    slideshow.animating = false;
    Util.removeClass(slideshow.element, slideshow.animatingClass); 
  }, 100);
}

function showNewItem(slideshow, index, bool) {
  if(slideshow.items.length <= 1) return;
  if(slideshow.animating && slideshow.supportAnimation) return;
  slideshow.animating = true;
  Util.addClass(slideshow.element, slideshow.animatingClass); 
  if(index < 0) index = slideshow.items.length - 1;
  else if(index >= slideshow.items.length) index = 0;
  // skip slideshow item if it is hidden
  if(bool && Util.hasClass(slideshow.items[index], 'is-hidden')) {
    slideshow.animating = false;
    index = bool == 'next' ? index + 1 : index - 1;
    showNewItem(slideshow, index, bool);
    return;
  }
  // index of new slide is equal to index of slide selected item
  if(index == slideshow.selectedSlide) {
    slideshow.animating = false;
    return;
  }
  const exitItemClass = getExitItemClass(slideshow, bool, slideshow.selectedSlide, index);
  const enterItemClass = getEnterItemClass(slideshow, bool, slideshow.selectedSlide, index);
  // transition between slides
  if(!slideshow.animationOff) Util.addClass(slideshow.items[slideshow.selectedSlide], exitItemClass);
  Util.removeClass(slideshow.items[slideshow.selectedSlide], 'slideshow__item--selected');
  slideshow.items[slideshow.selectedSlide].setAttribute('aria-hidden', 'true'); //hide to sr element that is exiting the viewport
  if(slideshow.animationOff) {
    Util.addClass(slideshow.items[index], 'slideshow__item--selected');
  } else {
    Util.addClass(slideshow.items[index], `${enterItemClass} slideshow__item--selected`);
  }
  // reset slider navigation appearance
  resetSlideshowNav(slideshow, index, slideshow.selectedSlide);
  slideshow.selectedSlide = index;
  // reset autoplay
  slideshow.pauseAutoplay();
  slideshow.startAutoplay();
  // reset controls/navigation color themes
  resetSlideshowTheme(slideshow, index);
  // emit event
  emitSlideshowEvent(slideshow, 'newItemSelected', slideshow.selectedSlide);
  if(slideshow.animationOff) {
    slideshow.animating = false;
    Util.removeClass(slideshow.element, slideshow.animatingClass);
  }
}

function getExitItemClass(slideshow, bool, oldIndex, newIndex) {
  let className = '';
  if(bool) {
    className = (bool == 'next') ? `slideshow__item--${slideshow.animationType}-out-right` : `slideshow__item--${slideshow.animationType}-out-left`; 
  } else {
    className = (newIndex < oldIndex) ? `slideshow__item--${slideshow.animationType}-out-left` : `slideshow__item--${slideshow.animationType}-out-right`;
  }
  return className;
}

function getEnterItemClass(slideshow, bool, oldIndex, newIndex) {
  let className = '';
  if(bool) {
    className = (bool == 'next') ? `slideshow__item--${slideshow.animationType}-in-right` : `slideshow__item--${slideshow.animationType}-in-left`; 
  } else {
    className = (newIndex < oldIndex) ? `slideshow__item--${slideshow.animationType}-in-left` : `slideshow__item--${slideshow.animationType}-in-right`;
  }
  return className;
}

function resetSlideshowNav(slideshow, newIndex, oldIndex) {
  if(slideshow.navigation) {
    Util.removeClass(slideshow.navigation[oldIndex], 'slideshow__nav-item--selected');
    Util.addClass(slideshow.navigation[newIndex], 'slideshow__nav-item--selected');
    slideshow.navCurrentLabel.parentElement.removeChild(slideshow.navCurrentLabel);
    slideshow.navigation[newIndex].getElementsByTagName('button')[0].appendChild(slideshow.navCurrentLabel);
  }
}

function resetSlideshowTheme(slideshow, newIndex) {
  const dataTheme = slideshow.items[newIndex].getAttribute('data-theme');
  if(dataTheme) {
    if(slideshow.navigation) slideshow.navigation[0].parentElement.setAttribute('data-theme', dataTheme);
    if(slideshow.controls[0]) slideshow.controls[0].parentElement.setAttribute('data-theme', dataTheme);
  } else {
    if(slideshow.navigation) slideshow.navigation[0].parentElement.removeAttribute('data-theme');
    if(slideshow.controls[0]) slideshow.controls[0].parentElement.removeAttribute('data-theme');
  }
}

function emitSlideshowEvent(slideshow, eventName, detail) {
  const event = new CustomEvent(eventName, {detail});
  slideshow.element.dispatchEvent(event);
}

function updateAriaLive(slideshow) {
  slideshow.ariaLive.innerHTML = `Item ${slideshow.selectedSlide + 1} of ${slideshow.items.length}`;
}

function externalControlSlide(slideshow, button) { // control slideshow using external element
  button.addEventListener('click', event => {
    const index = button.getAttribute('data-index');
    if(!index || index == slideshow.selectedSlide + 1) return;
    event.preventDefault();
    showNewItem(slideshow, index - 1, false);
  });
}

Slideshow.defaults = {
  element : '',
  navigation : true,
  autoplay : false,
  autoplayInterval: 5000,
  swipe: false
};

window.Slideshow = Slideshow;

//initialize the Slideshow objects
const slideshows = document.getElementsByClassName('js-slideshow');
if( slideshows.length > 0 ) {
  for( let i = 0; i < slideshows.length; i++) {
    ((i => {
      const navigation = (slideshows[i].getAttribute('data-navigation') && slideshows[i].getAttribute('data-navigation') == 'off') ? false : true;
      const autoplay = (slideshows[i].getAttribute('data-autoplay') && slideshows[i].getAttribute('data-autoplay') == 'on') ? true : false;
      const autoplayInterval = (slideshows[i].getAttribute('data-autoplay-interval')) ? slideshows[i].getAttribute('data-autoplay-interval') : 5000;
      const swipe = (slideshows[i].getAttribute('data-swipe') && slideshows[i].getAttribute('data-swipe') == 'on') ? true : false;
      new Slideshow({element: slideshows[i], navigation, autoplay, autoplayInterval, swipe});
    }))(i);
  }
}