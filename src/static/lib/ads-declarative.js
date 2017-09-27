'use strict';

// here is where  we'd bring in our glue library
// 
// (this is just a placeholder for same)

let ADS_COMPONENT = `data-ads-component`;

let E_DEPENDENCY = 'Either include as an external script, or as a bundled dependency';
let E_NO_REACT = 'No React found.';
let E_NO_REACTDOM = 'No ReactDom found.';

// unfortunately to act as glue, we either need to load React(et al) 
// separately, or the bundle needs to register them with us
let _React,
    _ReactDom;

let componentRegistry = {};

// error handler is half done here, need generic getter to cover any
// access to _React or _ReactDom
let error = (errorText) => () => console.error(errorText);

function registerComponent(name, Component) {
  console.log('register:', name, Component);
  componentRegistry[name] = Component;
}

function parse(el) {
  let componentName = el.getAttribute(ADS_COMPONENT);
  let ComponentFunc = componentRegistry[componentName];
  let Component,
      props = {},
      children = ['test child'],
      args = [];

  if (!ComponentFunc) {
    console.warn('no component named', componentName);
    return;
  }

  args = [ComponentFunc, props].concat(children);

  Component = _React.createElement.apply(_React, args);

  console.log('parsed', componentName);        

  _ReactDom.render(
    Component,
    el
  );

  return true;
}

/**
 * Currently expects specific symbols 
 *
 * However this could easily be a full KV store
 */
function exportBundled({React, ReactDom}) {
  _React = React;
  _ReactDom = ReactDom;
}      