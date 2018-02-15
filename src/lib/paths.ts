import path = require('path');
import url = require('url');

export function getRendererHtmlUrl() {
  // This function is assuming the scripts are running after bundled
  return url.format({
    pathname: path.join(__dirname, 'renderer.html'),
    protocol: 'file:',
    slashes: true
  });
}
