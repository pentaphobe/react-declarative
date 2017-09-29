/**
 * Bootstrap our parse calls
 * 
 */

(function(window) {
  'use stric';
  
  // Note for use where arbitrary refreshes may happen and remove our dynamic
  // components:
  // 
  // 1. ideally one should hook into the refresh event too
  // 2. failing that, ensure parseAttachPoints() is called at the bottom
  //    of the element which gets refreshed.
  //    
  function parseAttachPoints() {
    // NB: webpack seems to be getting confused with template string here
    let els = document.querySelectorAll('[' + ads.ATTR_COMPONENT + ']');

    if (els) {
      let success = Array.prototype.every.call(els, ads.parse);

      if (!success) {
        console.log('failed');
      }
    }
  }    

  window.onload = parseAttachPoints;

})(this);