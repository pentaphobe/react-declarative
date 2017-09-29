import React from 'react';
import ReactDom from 'react-dom';

/**
 * Import what we need from the component system
 */
import Button from 'components/Button';

/**
 * Export our bundled React (et al)
 *
 */
ads.exportBundled({React, ReactDom});
ads.registerComponents({
  Button,  
});
