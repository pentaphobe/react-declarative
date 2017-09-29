/**
 * Utility library to handle DOM-binding and component registration
 * for React integration in third party frameworks
 * 
 */

// using old-timey export method to avoid more dependencies
// 
(function(window) {
  'use strict';

  let ATTR_PREFIX     = `data-ads`
  let ATTR_COMPONENT  = `${ATTR_PREFIX}-component`;

  let E_DEPENDENCY    = 'Either include as an external script, or as a bundled dependency';
  let E_NO_REACT      = 'No React found.';
  let E_NO_REACTDOM   = 'No ReactDom found.';

  // unfortunately to act as glue, we either need to load React(et al) 
  // separately, or the bundle needs to register them with us
  // 
  let _React,
      _ReactDom;

  // dictionary of components by component name
  // 
  let componentRegistry = {};

  // error handler is half done here, need generic getter to cover any
  // access to _React or _ReactDom
  // 
  let error = (errorText) => () => console.error(errorText);

  // register a component
  // 
  function registerComponent(name, Component) {
    console.log('registered:', name, Component);
    componentRegistry[name] = Component;
  }

  function registerComponents(componentDictionary) {
    // basically just `Object.assign(componentRegistry, componentDictionary);`
    // but doing it the long way so `registerComponent` is the single source
    Object.keys(componentDictionary).forEach( key => registerComponent(key, componentDictionary[key]) );
  }

  function convertChild(child) {
    if (child instanceof Text) {
      return child.nodeValue;
    }

    if (child.childNodes.length) {
      // TODO: doesn't do complex child parsing, so all children will become
      // a concatenated text node
      return convertChildren(Array.prototype.slice.call(child.childNodes));
    }

    return null;
  }

  function convertChildren(childArray) {
    return childArray.map(convertChild);
  }

  // remove reserved attributes and get rid of the 'data-' prefix
  // from others
  // TODO: Ideally the ATTR_PREFIX would be what's stripped so that
  // containers can use attributes which don't forward
  function transformPropName(propName) {
    const ignoreProps = [
      'ads-component'
    ];
    const rawPropName = (propName + '').replace(/^data-/, '').toLowerCase();

    if (!rawPropName || ignoreProps.includes(rawPropName)) {
      return;
    }

    return rawPropName;
  }

  // reads and transforms data-attributes on the container element
  // and prepares them to be props on the component
  function getProps(domNode) {
    return Array.prototype
      .slice.call(domNode.attributes)
      .reduce((obj, attr) => {
        let transformedProp = transformPropName(attr.name);
        let value = attr.value === '' ? true : attr.value;

        if (transformedProp) {
          obj[transformedProp] = value;
        }

        return obj;
      }, {})
  }  

  // parse a DOM node for our magic attributes
  // 
  function parse(el) {
    let componentName   = el.getAttribute(ATTR_COMPONENT);
    let ComponentFunc = componentRegistry[componentName];
    let Component,  
        props = getProps(el),
        children   = convertChildren(Array.prototype.slice.call(el.childNodes || [])),
        args = [];

    if (!ComponentFunc) {
      console.warn('no component named', componentName);
      return;
    }

    console.log('making', componentName, 'with props', props);
    // React.createElement expects children to be additional arguments after
    // component and props
    // 
    args = [ComponentFunc, props].concat(children);

    Component = _React.createElement.apply(_React, args);

    console.log('parsed', componentName);        

    // Render the React element to the actual DOM node
    // 
    // NB: we don't _replace_ the node, which facilates refresh and tracking
    // integration containers
    // 
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

  // exports
  // 
  Object.assign(window, {
    ads: {
      ATTR_PREFIX, ATTR_COMPONENT,

      registerComponent,
      registerComponents,
      parse,
      exportBundled,
    }
  });
}(this));