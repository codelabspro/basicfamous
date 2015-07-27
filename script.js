// Famous dependencies
var DOMElement = famous.domRenderables.DOMElement;
var FamousEngine = famous.core.FamousEngine;
var Camera = famous.components.Camera;
var Dispatch = famous.core.Dispatch;
var clock = FamousEngine.getClock();
// Initialize with a scene; then, add a 'node' to the scene root
var scene = FamousEngine.createScene();
var node = scene.addChild();
var child = node.addChild();
node.addUIEvent('load');
var myComponent = {
  onReceive: function(event, payload) {
    console.log(
      'Received ' + event + ' event!',
      payload
    );
    if (event === 'load') {
      payload.node.requestUpdate(spinner);
    }     
  }
};
node.addComponent(myComponent);
// Create an [image] DOM element providing the logo 'node' with the 'src' path
new DOMElement(node, { tagName: 'img' })
    .setAttribute('src', 'http://staging.famous.org/examples/images/famous-logo.svg');
// Chainable API
node
    // Set size mode to 'absolute' to use absolute pixel values: (width 250px, height 250px)
    .setSizeMode('absolute', 'absolute', 'absolute')
    .setAbsoluteSize(250, 250)
    // Center the 'node' to the parent (the screen, in this instance)
    .setAlign(0.5, 0.5)
    // Set the translational origin to the center of the 'node'
    .setMountPoint(0.5, 0.5, 0.5)
    // Set the rotational origin to the center of the 'node'
    .setOrigin(0.5, 0.5);
// Add a spinner component to the logo 'node' that is called, every frame
var spinner = node.addComponent({
    onUpdate: function(time) {
        node.setRotation(0, time / 500, 0);
        node.requestUpdateOnNextTick(spinner);
    }
});
// Let the magic begin...
node.requestUpdate(spinner);
FamousEngine.init();
node.onReceive = function(event, payload) {
    console.log(
      'Received ' + event + ' customEvent event!',
      payload
    );
    if (event === 'customEvent') {
       
    }     
  };
child.onReceive = function(event, payload) {
    console.log(
      'Received ' + event + ' event on Child!',
      payload
    );
    if (event === 'customEvent') {
       
    }     
  };
node.emit('customEvent', {value: 'node.emit'});
Dispatch.dispatch(node.getLocation(), 'customEvent', {value: node.getLocation()});
Dispatch.dispatch('body', 'customEvent', {value: node.getParent().getLocation()});
// To set perspective
var camera = new Camera(scene);
camera.setDepth(1000);
