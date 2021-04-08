// File#: _1_tabs
class Tab {
  constructor(element) {
    this.element = element;
    this.tabList = this.element.getElementsByClassName('js-tabs__controls')[0];
    this.listItems = this.tabList.getElementsByTagName('li');
    this.triggers = this.tabList.getElementsByTagName('a');
    this.panelsList = this.element.getElementsByClassName('js-tabs__panels')[0];
    this.panels = Util.getChildrenByClassName(this.panelsList, 'js-tabs__panel');
    this.hideClass = 'is-hidden';
    this.customShowClass = this.element.getAttribute('data-show-panel-class') ? this.element.getAttribute('data-show-panel-class') : false;
    this.layout = this.element.getAttribute('data-tabs-layout') ? this.element.getAttribute('data-tabs-layout') : 'horizontal';
    // deep linking options
    this.deepLinkOn = this.element.getAttribute('data-deep-link') == 'on';
    // init tabs
    this.initTab();
  }

  initTab() {
    //set initial aria attributes
    this.tabList.setAttribute('role', 'tablist');
    for( let i = 0; i < this.triggers.length; i++) {
      const bool = (i == 0);
      const panelId = this.panels[i].getAttribute('id');
      this.listItems[i].setAttribute('role', 'presentation');
      Util.setAttributes(this.triggers[i], {'role': 'tab', 'aria-selected': bool, 'aria-controls': panelId, 'id': `tab-${panelId}`});
      Util.addClass(this.triggers[i], 'js-tabs__trigger');
      Util.setAttributes(this.panels[i], {'role': 'tabpanel', 'aria-labelledby': `tab-${panelId}`});
      Util.toggleClass(this.panels[i], this.hideClass, !bool);

      if(!bool) this.triggers[i].setAttribute('tabindex', '-1');
    }

    //listen for Tab events
    this.initTabEvents();

    // check deep linking option
    this.initDeepLink();
  }

  initTabEvents() {
    const self = this;
    //click on a new tab -> select content
    this.tabList.addEventListener('click', event => {
      if( event.target.closest('.js-tabs__trigger') ) self.triggerTab(event.target.closest('.js-tabs__trigger'), event);
    });
    //arrow keys to navigate through tabs 
    this.tabList.addEventListener('keydown', event => {
      ;
      if( !event.target.closest('.js-tabs__trigger') ) return;
      if( tabNavigateNext(event, self.layout) ) {
        event.preventDefault();
        self.selectNewTab('next');
      } else if( tabNavigatePrev(event, self.layout) ) {
        event.preventDefault();
        self.selectNewTab('prev');
      }
    });
  }

  selectNewTab(direction) {
    const selectedTab = this.tabList.querySelector('[aria-selected="true"]');
    let index = Util.getIndexInArray(this.triggers, selectedTab);
    index = (direction == 'next') ? index + 1 : index - 1;
    //make sure index is in the correct interval 
    //-> from last element go to first using the right arrow, from first element go to last using the left arrow
    if(index < 0) index = this.listItems.length - 1;
    if(index >= this.listItems.length) index = 0;
    this.triggerTab(this.triggers[index]);
    this.triggers[index].focus();
  }

  triggerTab(tabTrigger, event) {
    const self = this;
    event && event.preventDefault();	
    const index = Util.getIndexInArray(this.triggers, tabTrigger);
    //no need to do anything if tab was already selected
    if(this.triggers[index].getAttribute('aria-selected') == 'true') return;
    
    for( let i = 0; i < this.triggers.length; i++) {
      const bool = (i == index);
      Util.toggleClass(this.panels[i], this.hideClass, !bool);
      if(this.customShowClass) Util.toggleClass(this.panels[i], this.customShowClass, bool);
      this.triggers[i].setAttribute('aria-selected', bool);
      bool ? this.triggers[i].setAttribute('tabindex', '0') : this.triggers[i].setAttribute('tabindex', '-1');
    }

    // update url if deepLink is on
    if(this.deepLinkOn) {
      history.replaceState(null, '', `#${tabTrigger.getAttribute('aria-controls')}`);
    }
  }

  initDeepLink() {
    if(!this.deepLinkOn) return;
    const hash = window.location.hash.substr(1);
    const self = this;
    if(!hash || hash == '') return;
    for(let i = 0; i < this.panels.length; i++) {
      if(this.panels[i].getAttribute('id') == hash) {
        this.triggerTab(this.triggers[i], false);
        setTimeout(() => {self.panels[i].scrollIntoView(true);});
        break;
      }
    };
  }
}

function tabNavigateNext(event, layout) {
  if(layout == 'horizontal' && (event.keyCode && event.keyCode == 39 || event.key && event.key == 'ArrowRight')) {return true;}
  else if(layout == 'vertical' && (event.keyCode && event.keyCode == 40 || event.key && event.key == 'ArrowDown')) {return true;}
  else {return false;}
}

function tabNavigatePrev(event, layout) {
  if(layout == 'horizontal' && (event.keyCode && event.keyCode == 37 || event.key && event.key == 'ArrowLeft')) {return true;}
  else if(layout == 'vertical' && (event.keyCode && event.keyCode == 38 || event.key && event.key == 'ArrowUp')) {return true;}
  else {return false;}
}

//initialize the Tab objects
const tabs = document.getElementsByClassName('js-tabs');
if( tabs.length > 0 ) {
  for( let i = 0; i < tabs.length; i++) {
    ((i => {new Tab(tabs[i]);}))(i);
  }
}