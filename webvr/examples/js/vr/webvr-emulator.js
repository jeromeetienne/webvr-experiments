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
	// https://w3c.github.io/webvr/#vrframedata
	this.timestamp = Date.now()

	this.leftProjectionMatrix = new Float32Array(16)
	this.leftViewMatrix = new Float32Array(16)
	this.rightProjectionMatrix = new Float32Array(16)
	this.rightViewMatrix = new Float32Array(16)

	this.pose = new VRPose()
	
	// compute pose from rightViewMatrix
	var rightViewMatrix = new THREE.Matrix4().fromArray(rightViewMatrix)
	var cameraTransformMatrix = new THREE.Matrix4().getInverse( rightViewMatrix )

	var cameraPosition = new THREE.Vector3()
	var cameraQuaternion = new THREE.Vector3()
	cameraTransformMatrix.decompose(cameraPosition, cameraQuaternion, new THREE.Vector3)
	
	cameraPosition.toArray(this.pose.position)
	cameraQuaternion.toArray(this.pose.quaternion)
}

window.VREyeParameters = function(whichEye){
	this.offset = new Float32Array([0,0,0])

	this.fieldOfView = { // Deprecated
		upDegrees : +45,
		rightDegrees : +45,
		downDegrees : -45,
		leftDegrees : -45,
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
	
	this.getFrameData = function(frameData){
		
	}
	this.getEyeParameters = function(whichEye){
		var eyeParameters = new VREyeParameters()
		
		if( whichEye === 'right' ){
			eyeParameters.offset[0]	= + 0.03
		}else if( whichEye === 'left' ){
			eyeParameters.offset[0]	= - 0.03
		}else {
			console.assert(false)
		}
		
	}
	
	this.getPose = function(){	// Deprecated - https://w3c.github.io/webvr/#dom-vrdisplay-getpose
		
	}
	this.resetPose = function(frameData){
		
	}

	this.requestAnimationFrame = function(callback){
		return window.requestAnimationFrame(callback)
	}
	this.cancelAnimationFrame = function(handle){
		return window.cancelAnimationFrame(handle)		
	}

	this.requestPresent = function(layers){
		
	}
	this.exitPresent = function(){
		
	}
	
	// https://w3c.github.io/webvr/#dom-vrdisplay-submitframe
	this.submitFrame = function(){
		
	}
}
