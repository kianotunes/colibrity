// File#: _1_multiselect-form
const e = function (e) {
  let t;
  let s;
  let l;
  let n;
  let i;
  let o;
  (this.element = e),
    (this.select = this.element.getElementsByTagName("select")[0]),
    (this.optGroups = this.select.getElementsByTagName("optgroup")),
    (this.options = this.select.getElementsByTagName("option")),
    (this.selectId = this.select.getAttribute("id")),
    (this.trigger = !1),
    (this.dropdown = !1),
    (this.customOptions = !1),
    (this.arrowIcon = this.element.getElementsByTagName("svg")),
    (this.label = document.querySelector(`[for="${this.selectId}"]`)),
    (this.selectedOptCounter = 0),
    (this.optionIndex = 0),
    (this.noSelectText =
      this.element.getAttribute("data-no-select-text") || "Select" ),
    (this.multiSelectText =
      this.element.getAttribute("data-multi-select-text") ||
      "{n} items selected"),
    (this.nMultiSelect =
      this.element.getAttribute("data-n-multi-select") || 1),
    (this.noUpdateLabel =
      this.element.getAttribute("data-update-text") &&
      "off" == this.element.getAttribute("data-update-text")),
    (this.insetLabel =
      this.element.getAttribute("data-inset-label") &&
      "on" == this.element.getAttribute("data-inset-label")),
    (t = this).element.insertAdjacentHTML(
      "beforeend",
      ((l = (s = t).element.getAttribute("data-trigger-class")
        ? ` ${s.element.getAttribute("data-trigger-class")}`
        : ""),
      (n = d(s)),
      (i = 0 < s.selectedOptCounter ? " multi-select__button--active" : ""),
      (o =
        `<button class="js-multi-select__button multi-select__button${l}${i}" aria-label="${n[1]}" aria-expanded="false" aria-controls="${s.selectId}-dropdown"><span aria-hidden="true" class="js-multi-select__label multi-select__label">${n[0]}</span>`),
      0 < s.arrowIcon.length &&
        s.arrowIcon[0].outerHTML &&
        (o += s.arrowIcon[0].outerHTML),
      `${o}</button>${((e => {
let t;

let s =
  `<div class="js-multi-select__dropdown multi-select__dropdown" aria-describedby="${e.selectId}-description" id="${e.selectId}-dropdown">`;

if (
  ((s += (t = e).label
    ? `<p class="sr-only" id="${t.selectId}-description">${t.label.textContent}</p>`
    : ""),
  0 < e.optGroups.length)
)
  for (let l = 0; l < e.optGroups.length; l++) {
    const n = e.optGroups[l].getElementsByTagName("option");

    const i =
      `<li><span class="multi-select__item multi-select__item--optgroup">${e.optGroups[l].getAttribute("label")}</span></li>`;

    s =
      `${s}<ul class="multi-select__list" role="listbox" aria-multiselectable="true">${i}${u(e, n)}</ul>`;
  }
else
  s =
    `${s}<ul class="multi-select__list" role="listbox" aria-multiselectable="true">${u(e, e.options)}</ul>`;
return s;
}))(t)}`)
    ),
    (t.dropdown = t.element.getElementsByClassName(
      "js-multi-select__dropdown"
    )[0]),
    (t.trigger = t.element.getElementsByClassName(
      "js-multi-select__button"
    )[0]),
    (t.customOptions = t.dropdown.getElementsByClassName(
      "js-multi-select__option"
    )),
    Util.addClass(t.select, "is-hidden"),
    0 < t.arrowIcon.length && (t.arrowIcon[0].style.display = "none"),
    ((t => {
      (s = t),
        s.dropdown.addEventListener("change", e => {
          const t = e.target.closest(".js-multi-select__option");
          t && c(s, t);
        }),
        s.dropdown.addEventListener("click", e => {
          const t = e.target.closest(".js-multi-select__option");
          t && Util.hasClass(e.target, "js-multi-select__option") && c(s, t);
        }),
        t.trigger.addEventListener("click", e => {
          e.preventDefault(), a(t, !1);
        }),
        t.label &&
          t.label.addEventListener("click", () => {
            Util.moveFocus(t.trigger);
          });
      var s;
      t.dropdown.addEventListener("keydown", e => {
        (e.keyCode && 38 == e.keyCode) ||
        (e.key && "arrowup" == e.key.toLowerCase())
          ? r(t, "prev", e)
          : ((e.keyCode && 40 == e.keyCode) ||
              (e.key && "arrowdown" == e.key.toLowerCase())) &&
            r(t, "next", e);
      });
    }))(this);
};
function a(t, e) {
  let s;
  let l;
  let n;
  if (
    ((s =
      e ||
      ("true" == t.trigger.getAttribute("aria-expanded") ? "false" : "true")),
    t.trigger.setAttribute("aria-expanded", s),
    "true" == s)
  ) {
    const i = (n = (l = t).dropdown.querySelector('[aria-selected="true"]'))
      ? n.getElementsByClassName("js-multi-select__checkbox")[0]
      : l.dropdown
          .getElementsByClassName("js-multi-select__option")[0]
          .getElementsByClassName("js-multi-select__checkbox")[0];
    Util.moveFocus(i),
      t.dropdown.addEventListener("transitionend", function e() {
        Util.moveFocus(i), t.dropdown.removeEventListener("transitionend", e);
      }),
      ((e => {
        const t = e.trigger.getBoundingClientRect();
        Util.toggleClass(
          e.dropdown,
          "multi-select__dropdown--right",
          window.innerWidth < t.left + e.dropdown.offsetWidth
        );
        const s = window.innerHeight - t.bottom < t.top;
        Util.toggleClass(e.dropdown, "multi-select__dropdown--up", s);
        const l = s ? t.top - 20 : window.innerHeight - t.bottom - 20;
        e.dropdown.setAttribute(
          "style",
          `max-height: ${l}px; width: ${t.width}px;`
        );
      }))(t);
  }
}
function r(e, t, s) {
  s.preventDefault();
  let l = Util.getIndexInArray(
    e.customOptions,
    document.activeElement.closest(".js-multi-select__option")
  );
  (l = "next" == t ? l + 1 : l - 1) < 0 && (l = e.customOptions.length - 1),
    l >= e.customOptions.length && (l = 0),
    Util.moveFocus(
      e.customOptions[l].getElementsByClassName(
        "js-multi-select__checkbox"
      )[0]
    );
}
function c(e, t) {
  t.hasAttribute("aria-selected") && "true" == t.getAttribute("aria-selected")
    ? (t.setAttribute("aria-selected", "false"),
      i(e, t.getAttribute("data-index"), !1))
    : (t.setAttribute("aria-selected", "true"),
      i(e, t.getAttribute("data-index"), !0));
  let s;
  let l;
  const n = d(e);
  (e.trigger.getElementsByClassName("js-multi-select__label")[0].innerHTML =
    n[0]),
    Util.toggleClass(
      e.trigger,
      "multi-select__button--active",
      0 < e.selectedOptCounter
    ),
    (s = e),
    (l = n[1]),
    s.trigger.setAttribute("aria-label", l);
}
function i(e, t, s) {
  (e.options[t].selected = s),
    e.select.dispatchEvent(new CustomEvent("change", { bubbles: !0 }));
}
function d(e) {
  const t = `<span class="multi-select__term">${e.noSelectText}</span>`;
  if (e.noUpdateLabel) return [t, e.noSelectText];
  for (
    var s = "", l = "", n = (e.selectedOptCounter = 0);
    n < e.options.length;
    n++
  )
    e.options[n].selected &&
      (0 != e.selectedOptCounter && (s += ", "),
      (s = `${s}${e.options[n].text}`),
      (e.selectedOptCounter = e.selectedOptCounter + 1));
  return e.selectedOptCounter > e.nMultiSelect
    ? ((s =
        `<span class="multi-select__details">${e.multiSelectText.replace("{n}", e.selectedOptCounter)}</span>`),
      (l =
        `${e.multiSelectText.replace("{n}", e.selectedOptCounter)}, ${e.noSelectText}`))
    : 0 < e.selectedOptCounter
    ? ((l = `${s}, ${e.noSelectText}`),
      (s = `<span class="multi-select__details">${s}</span>`))
    : ((s = t), (l = e.noSelectText)),
  e.insetLabel && 0 < e.selectedOptCounter && (s = t + s),
  [s, l]
;
}
function u(e, t) {
  for (var s = "", l = 0; l < t.length; l++) {
    const n = t[l].hasAttribute("selected")
        ? ' aria-selected="true"'
        : ' aria-selected="false"';

    const i = t[l].hasAttribute("selected") ? "checked" : "";
    (s =
      `${s}<li class="js-multi-select__option" role="option" data-value="${t[l].value}" ${n} data-label="${t[l].text}" data-index="${e.optionIndex}"><input aria-hidden="true" class="checkbox js-multi-select__checkbox" type="checkbox" id="${e.selectId}-${t[l].value}-${e.optionIndex}" ${i}><label class="multi-select__item multi-select__item--option" aria-hidden="true" for="${e.selectId}-${t[l].value}-${e.optionIndex}"><span>${t[l].text}</span></label></li>`),
      (e.optionIndex = e.optionIndex + 1);
  }
  return s;
}
let t;
const s = document.getElementsByClassName("js-multi-select");
if (0 < s.length) {
  for (var n = [], l = 0; l < s.length; l++) (t = l), n.push(new e(s[t]));
  window.addEventListener("keyup", e => {
    ((e.keyCode && 27 == e.keyCode) ||
      (e.key && "escape" == e.key.toLowerCase())) &&
      n.forEach(e => {
        let t;
        (t = e),
          document.activeElement.closest(".js-multi-select") &&
            t.trigger.focus(),
          a(e, "false");
      });
  }),
    window.addEventListener("click", l => {
      n.forEach(e => {
        let t;
        let s;
        (t = e), (s = l.target), t.element.contains(s) || a(t, "false");
      });
    });
}