navigator.getVRDisplays = function(){
	var vrDisplays = [ new VRDisplay() ]

	return new Promise(function(resolve, reject) {
		resolve(vrDisplays);
	})
}

window.VRPose = function(){	// https://w3c.github.io/webvr/#interface-vrpose
	this.position = new Float32Array([0,0,0])
	// this.linearVelocity = new Float32Array([0,0,0])
	// this.linearAcceleration = new Float32Array([0,0,0])

	this.orientation = new Float32Array([0, 0, 0, 1])
	// this.angularVelocity = new Float32Array([0, 0, 0, 1])
	// this.angularAcceleration = new Float32Array([0, 0, 0, 1])
}

window.VRFrameData = function(){
	var frameData = this
	// https://w3c.github.io/webvr/#vrframedata
	this.timestamp = Date.now()

	this.leftProjectionMatrix = new Float32Array(16)
	this.leftViewMatrix = new Float32Array(16)
	this.rightProjectionMatrix = new Float32Array(16)
	this.rightViewMatrix = new Float32Array(16)

	this.pose = {}
	this.pose.position = new Float32Array([0,0,0])
	// this.pose.linearVelocity = new Float32Array([0,0,0])
	// this.pose.linearAcceleration = new Float32Array([0,0,0])

	this.pose.orientation = new Float32Array([0, 0, 0, 1])
	// this.pose.angularVelocity = new Float32Array([0, 0, 0, 1])
	// this.pose.angularAcceleration = new Float32Array([0, 0, 0, 1])

	this.update()
}

VRFrameData.prototype.update = function(){

	var angle  = Math.PI/32
	var matrix = new THREE.Matrix4().compose(
		new THREE.Vector3(0,0,0),
		new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), angle),
		new THREE.Vector3(1,1,1)
	)
	matrix.toArray(this.leftViewMatrix)

	// fill silly projectionMaterix
	var tmpCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight /2, 0.1, 10 );
	tmpCamera.projectionMatrix.toArray(this.leftProjectionMatrix)
	tmpCamera.projectionMatrix.toArray(this.rightProjectionMatrix)

	// compute cameraTransformMatrix from leftViewMatrix
	var leftViewMatrix = new THREE.Matrix4().fromArray(this.leftViewMatrix)
	var cameraTransformMatrix = new THREE.Matrix4().getInverse( leftViewMatrix )

	// set pose.position and pose.orientation from cameraTransformMatrix decomposition
	var cameraPosition = new THREE.Vector3()
	var cameraQuaternion = new THREE.Quaternion()
	cameraTransformMatrix.decompose(cameraPosition, cameraQuaternion, new THREE.Vector3)
	cameraPosition.toArray(this.pose.position)
	cameraQuaternion.toArray(this.pose.orientation)	
}

window.VREyeParameters = function(whichEye){
	this.offset = new Float32Array([0,0,0])

	if( whichEye === 'right' ){
		this.offset[0]	= + 0.03
	}else if( whichEye === 'left' ){
		this.offset[0]	= - 0.03
	}else {
		console.assert(false)
	}

	this.fieldOfView = { // Deprecated
		upDegrees : +30,
		rightDegrees : +30,
		downDegrees : -30,
		leftDegrees : -30,
	}

	this.renderWidth = window.innerWidth/2
	this.renderHeight = window.innerHeight
}

window.VRDisplay = function(){
	// https://w3c.github.io/webvr/#interface-vrdisplay
	this.isConnected = true
	this.isPresenting = false
	
	this.displayId = 0
	this.displayName = 'webglkinga'

	this.depthNear = 0.1
	this.depthFar = 1000
	
	this.capabilities = {	// https://w3c.github.io/webvr/#vrdisplaycapabilities
		hasPosition : true,
		hasOrientation : true,
		hasExternalDisplay : false,
		canPresent : true,
		maxLayers : 1,
	}
	
  	this.stageParameters = {	// https://w3c.github.io/webvr/#vrstageparameters
		sittingToStandingTransform : new Float32Array(16),
		sizeX : 3,
		sizeY : 3,
	}

	this.vrPose = new VRPose()
	
}

VRDisplay.prototype.getFrameData = function(frameData){
	console.log('getFrameData')
	frameData.update()
}
VRDisplay.prototype.getEyeParameters = function(whichEye){
	console.log('getEyeParameters', whichEye)
	var eyeParameters = new VREyeParameters(whichEye)
	return eyeParameters
}
	
VRDisplay.prototype.getPose = function(){	// Deprecated - https://w3c.github.io/webvr/#dom-vrdisplay-getpose
	console.assert('not yet implemented')
}
VRDisplay.prototype.resetPose = function(frameData){
	console.assert('not yet implemented')
}

VRDisplay.prototype.requestAnimationFrame = function(callback){
	console.log('requestAnimationFrame')
	return window.requestAnimationFrame(callback)
}
VRDisplay.prototype.cancelAnimationFrame = function(handle){
	console.log('cancelAnimationFrame')
	return window.cancelAnimationFrame(handle)		
}

VRDisplay.prototype.getLayers = function(){
	return []
	console.log('vrDisplay.getLayers()')
	return this._layers
}

VRDisplay.prototype.requestPresent = function(layers){
	var _this = this
	this._layers = layers
	console.log('requestPresent', layers)
	console.trace()
	return new Promise(function(resolve, reject) {
		_this.isPresenting = true

		var event = new Event('vrdisplaypresentchange');
		window.dispatchEvent(event);

		resolve();
	})
}

VRDisplay.prototype.exitPresent = function(){
	var _this = this
	console.log('exitPresent')		
	
	return new Promise(function(resolve, reject) {
		_this.isPresenting = false

		var event = new Event('vrdisplaypresentchange');
		window.dispatchEvent(event);

		resolve();
	})
}
	
// https://w3c.github.io/webvr/#dom-vrdisplay-submitframe
VRDisplay.prototype.submitFrame = function(){
	console.log('submitFrame')				
}
