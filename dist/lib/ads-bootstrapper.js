/**
 * Bootstrap our parse calls
 * 
 */

(function(window) {
  'use stric';
  
  window.onload = function() {
    // NB: webpack seems to be getting confused with template string here
    let els = document.querySelectorAll('[' + ads.ATTR_COMPONENT + ']');

    if (els) {
      let success = Array.prototype.every.call(els, ads.parse);

      if (!success) {
        console.log('failed');
      }
    }
  }      

})(this);