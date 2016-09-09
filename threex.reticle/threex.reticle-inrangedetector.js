var THREEx = THREEx || {}

/**
 * Provide the logic for a reticle. the display of the reticle in Appx.ReticleUI
 * @class
 */
THREEx.ReticleInRangeDetector = function(object3d){
	this.signals = {
		start : new Signals.Signal(),
		stop : new Signals.Signal(),
	}

	// parameters and states for inRange
	this.distance = 0.2

	this.object3d = object3d
	this._isInRange = false
}

THREEx.ReticleInRangeDetector.prototype.update = function(reticle){
	var wasInRange = this._isInRange
	
	var distance = reticle._raycaster.ray.distanceToPoint(this.object3d.position)
	this._isInRange = distance <= this.distance ? true : false	
	
	// if we stopped being inRange, notify signals.stop
	if( wasInRange === true && this._isInRange === false ){
		this.signals.stop.dispatch()
	}
	// if we started being inRange, notify signals.stop
	if( wasInRange === false && this._isInRange === true ){
		this.signals.start.dispatch()
	}
}
