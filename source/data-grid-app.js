var defaultScaleX = 1000;
var defaultScaleY = 1000;

var scaleX = defaultScaleX;
var scaleY = defaultScaleY;

window.visApi = () => ({ getSheetZoom() { return scaleX / 1000 * 100; } })

function getZoomCorrection() { return window.visApi().getSheetZoom() / 100; }

function getZoomCorrectionInvert() { return 1 / getZoomCorrection(); }

var getBoundingClientRectOriginal = HTMLElement.prototype.getBoundingClientRect;

HTMLElement.prototype.getBoundingClientRect = function () {
  // debugger;
  var res = getBoundingClientRectOriginal.call(this);
  var result = {};
  // return res;
  for (prop in res)
    result[prop] = getZoomCorrectionInvert() * res[prop];
  //{"x":210.4375,"y":455,"width":537.5625,"height":50,"top":455,"right":748,"bottom":505,"left":210.4375}
  return result;
}

const DevExtremeThemes = require("devextreme/viz/themes")
const { dataGrid } = require("./data-grid-instance");


var delta = 50;
var pausedState = true;
var reversedState = false;


window.setInterval(() => {
  if (pausedState) return;
  $("#scaledContainer").css("transform", `scale(${scaleX / 1000},${scaleY / 1000})`);
  if (reversedState) {
    scaleX++; scaleY++;
  }
  else {
    scaleX--; scaleY--;
  }
}, delta);

$("#theButton").click(() => {
  dataGrid.updateDimensions();
});

$("#startButton").click(() => {
  pausedState = false;
});

$("#stopButton").click(() => {
  pausedState = true;
});

$("#reverseButton").click(() => {
  reversedState = !reversedState;
});

$("#resetButton").click(() => {
  scaleX = defaultScaleX;
  scaleY = defaultScaleY;
  delta = 50;
  pausedState = true;
  reversedState = false;
  $("#scaledContainer").css("transform", `scale(${scaleX / 1000},${scaleY / 1000})`);
  window.setTimeout(() => dataGrid.updateDimensions());
});

DevExtremeThemes.currentTheme("generic.light");

