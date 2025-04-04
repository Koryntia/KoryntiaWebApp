// jest.setup.js
import React from 'react';

if (typeof React.cache !== 'function') {
  // Parchea React.cache para evitar el error
  React.cache = () => {};
}
