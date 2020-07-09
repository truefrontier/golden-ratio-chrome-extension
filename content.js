const gr = 1.61803398875; // The Golden Ratio
const spacer = 16; // in px

const spacer1 = spacer / gr / gr / gr / gr / gr;
const spacer2 = spacer / gr / gr / gr / gr;
const spacer3 = spacer / gr / gr / gr;
const spacer4 = spacer / gr / gr;
const spacer5 = spacer / gr;
const spacer6 = spacer;
const spacer7 = spacer * gr;
const spacer8 = spacer * gr * gr;
const spacer9 = spacer * gr * gr * gr;
const spacer10 = spacer * gr * gr * gr * gr;
const spacer11 = spacer * gr * gr * gr * gr * gr;

const spacerHalf = spacer / 2;
const spacerHalf1 = spacer1 / 2;
const spacerHalf2 = spacer2 / 2;
const spacerHalf3 = spacer3 / 2;
const spacerHalf4 = spacer4 / 2;
const spacerHalf5 = spacer5 / 2;
const spacerHalf6 = spacer6 / 2;
const spacerHalf7 = spacer7 / 2;
const spacerHalf8 = spacer8 / 2;
const spacerHalf9 = spacer9 / 2;
const spacerHalf10 = spacer10 / 2;
const spacerHalf11 = spacer11 / 2;

const spacerDouble = spacer * 2;
const spacerDouble1 = spacer1 * 2;
const spacerDouble2 = spacer2 * 2;
const spacerDouble3 = spacer3 * 2;
const spacerDouble4 = spacer4 * 2;
const spacerDouble5 = spacer5 * 2;
const spacerDouble6 = spacer6 * 2;
const spacerDouble7 = spacer7 * 2;
const spacerDouble8 = spacer8 * 2;
const spacerDouble9 = spacer9 * 2;
const spacerDouble10 = spacer10 * 2;
const spacerDouble11 = spacer11 * 2;

function allCSS(element) {
  var s = [];
  var o = getComputedStyle(element);
  for (var i = 0; i < o.length; i++) {
    var obj = {};
    obj[o[i]] = o.getPropertyValue(o[i]);
    s.push(obj);
  }
  return s;
}

const props = [
  'margin-top',
  'margin-bottom',
  // 'margin-left',
  // 'margin-right',
  'padding-top',
  'padding-bottom',
  // 'padding-left',
  // 'padding-right',
  'border-top-width',
  'border-bottom-width',
  // 'border-left-width',
  // 'border-right-width',
  // 'font-size',
  // 'line-height',
];

const spacers = {
  '--grify-0': 0,

  '--grify-1': spacer1,
  '--grify-2': spacer2,
  '--grify-3': spacer3,
  '--grify-4': spacer4,
  '--grify-5': spacer5,
  '--grify-6': spacer6,
  '--grify-7': spacer7,
  '--grify-8': spacer8,
  '--grify-9': spacer9,
  '--grify-10': spacer10,
  '--grify-11': spacer11,

  '--grify-neg-1': spacer1 * -1,
  '--grify-neg-2': spacer2 * -1,
  '--grify-neg-3': spacer3 * -1,
  '--grify-neg-4': spacer4 * -1,
  '--grify-neg-5': spacer5 * -1,
  '--grify-neg-6': spacer6 * -1,
  '--grify-neg-7': spacer7 * -1,
  '--grify-neg-8': spacer8 * -1,
  '--grify-neg-9': spacer9 * -1,
  '--grify-neg-10': spacer10 * -1,
  '--grify-neg-11': spacer11 * -1,

  // '--grify-half-1': spacerHalf1,
  // '--grify-half-2': spacerHalf2,
  // '--grify-half-3': spacerHalf3,
  // '--grify-half-4': spacerHalf4,
  // '--grify-half-5': spacerHalf5,
  // '--grify-half-6': spacerHalf6,
  // '--grify-half-7': spacerHalf7,
  // '--grify-half-8': spacerHalf8,
  // '--grify-half-9': spacerHalf9,
  // '--grify-half-10': spacerHalf10,
  // '--grify-half-11': spacerHalf11,

  // '--grify-double-1': spacerDouble1,
  // '--grify-double-2': spacerDouble2,
  // '--grify-double-3': spacerDouble3,
  // '--grify-double-4': spacerDouble4,
  // '--grify-double-5': spacerDouble5,
  // '--grify-double-6': spacerDouble6,
  // '--grify-double-7': spacerDouble7,
  // '--grify-double-8': spacerDouble8,
  // '--grify-double-9': spacerDouble9,
  // '--grify-double-10': spacerDouble10,
  // '--grify-double-11': spacerDouble11,
};

// function closest(needle, haystack) {
//   return haystack.reduce((a, b) => {
//     let aDiff = Math.abs(a - needle);
//     let bDiff = Math.abs(b - needle);

//     if (aDiff == bDiff) {
//       return a > b ? a : b;
//     } else {
//       return bDiff < aDiff ? b : a;
//     }
//   });
// }

// function next(needle, haystack) {
//   return haystack.reduce((a, b) => {
//     if (a < needle && needle - b < 0) {
//       return b;
//     }
//     return a;
//   });
// }

// function nextGrify(valFloat, rel = 1) {
//   return Object.keys(spacers).reduce((newKey, key) => {
//     let spacerVal = spacers[key] / rel;
//     let newVal = spacers[newKey] / rel;

//     if (valFloat / rel > newVal && valFloat / rel < spacerVal) {
//       newKey = key;
//     }

//     return newKey;
//   }, '--grify-0');
// }

function closestGrify(valFloat, min = null) {
  return Object.keys(spacers).reduce((newKey, key) => {
    let a = spacers[newKey];
    let b = spacers[key];
    if (min === null) min = b;
    let passesMin = b > 0 ? b >= min : b <= min;
    let needle = valFloat;

    let aDiff = Math.abs(a - needle);
    let bDiff = Math.abs(b - needle);

    if (aDiff == bDiff) {
      return a > b ? newKey : passesMin ? key : newKey;
    } else {
      return bDiff < aDiff && passesMin ? key : newKey;
    }
  }, '--grify-0');
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    console.log('%c grify', 'color:#F80', 'working...');
    var $elements = $('*');
    var spacerVals = Object.values(spacer);
    jQuery.each($elements, function(i, el) {
      var $el = $(el);
      let fz, lh;
      allCSS(el).forEach((obj) => {
        let [prop] = Object.keys(obj);
        let val = obj[prop];
        if (val && props.includes(prop)) {
          let valFloat = parseFloat(val);
          if (valFloat) {
            let newVar = closestGrify(valFloat);
            $el.css(prop, `var(${newVar})`);
          }
        }
        if (prop === 'font-size') fz = val;
        if (prop === 'line-height') lh = val;
      });

      let fzFloat = parseFloat(fz);
      let lhFloat = parseFloat(lh);
      let lhRel = lhFloat / fzFloat;
      let fontHeight = fzFloat * lhRel;
      let newLhKey = closestGrify(fontHeight, fontHeight);
      $el.css({
        lineHeight: `var(${newLhKey})`,
      });

      if (el.styles && el.styles.height) {
        let h = $el.css('height');
        let hFloat = parseFloat(h);
        let newHKey = closestGrify(hFloat);
        $el.css({
          height: `var(${newHKey})`,
        });
      }
    });
    console.log('%c grify', 'color:#F80', 'done');
  }
});
