const Scene = require('Scene');
const TouchGestures = require('TouchGestures');

const sceneRoot = Scene.root;

const planeTracker = sceneRoot.find('planeTracker0');
const placer = sceneRoot.find('placer');

TouchGestures.onPan().subscribe(function (gesture) {
  planeTracker.trackPoint(gesture.location, gesture.state);
});

const placerTransform = placer.transform;

TouchGestures.onPinch().subscribeWithSnapshot({
  'lastScaleX': placerTransform.scaleX,
  'lastScaleY': placerTransform.scaleY,
  'lastScaleZ': placerTransform.scaleZ
}, function (gesture, snapshot) {
  placerTransform.scaleX = gesture.scale.mul(snapshot.lastScaleX);
  placerTransform.scaleY = gesture.scale.mul(snapshot.lastScaleY);
  placerTransform.scaleZ = gesture.scale.mul(snapshot.lastScaleZ);
});

TouchGestures.onRotate().subscribeWithSnapshot({
  'lastRotationY': placerTransform.rotationY,
}, function (gesture, snapshot) {
  const correctRotation = gesture.rotation.mul(-1);
  placerTransform.rotationY = correctRotation.add(snapshot.lastRotationY);
});
