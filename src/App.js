var Appx = Appx || {}

Appx.App = function(){
	var _this = this
	
	this.signals = {
		update : new Signals.Signal(),
		enemyKilled : new Signals.Signal(),
		
		stateChange : new Signals.Signal(),
		killedPlayer: new Signals.Signal(),
	}
	
	this.state = 'playing'
	
	this.gotoState = function(newState){
		var oldState = _this.state
		if( newState === 'playing' ){
			console.assert(oldState === 'dying')
			_this.state = newState
		}else if( newState === 'dying' ){
			console.assert(oldState === 'playing')
			_this.state = newState
		}else console.assert(false)

		_this.signals.stateChange.dispatch(newState, oldState)
	}
}
