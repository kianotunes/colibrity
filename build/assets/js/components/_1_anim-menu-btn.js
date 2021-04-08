// File#: _1_anim-menu-btn
const menuBtns = document.getElementsByClassName('js-anim-menu-btn');
if( menuBtns.length > 0 ) {
  for(let i = 0; i < menuBtns.length; i++) {((i => {
    initMenuBtn(menuBtns[i]);
  }))(i);}

  function initMenuBtn(btn) {
    btn.addEventListener('click', event => {	
      event.preventDefault();
      const status = !Util.hasClass(btn, 'anim-menu-btn--state-b');
      Util.toggleClass(btn, 'anim-menu-btn--state-b', status);
      // emit custom event
      var event = new CustomEvent('anim-menu-btn-clicked', {detail: status});
      btn.dispatchEvent(event);
    });
  };
}