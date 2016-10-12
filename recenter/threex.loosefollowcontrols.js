var THREEx = THREEx || {}

THREEx.LooseFollowControls = function(object3d){
        this.object3d = object3d
        this._state = 'idle'
}

/**
 * if ui is fov
 * camera speed
 */

THREEx.LooseFollowControls.states = [
        'idle',
        'uiOutOfFov',
        'waitForStableCamera',
        'looseFollowing'
];


THREEx.prototype.update = function(camera){
        
        
        if( this._state === 'idle' )    updateIdleState()
        else if( this._state === 'uiOutOfFov' ) updateUiOutOfFOV
        
        return
        function updateUiOutOfFOV(){
                console.assert(this._state === 'uiOutOfFov' )
                if( this._uiInFOV === true ){
                        this._gotoState('idle')
                }else if( this._cameraAngularSpeed > this._maxCameraAngularSpeed ){
                        this._gotoState('waitForStableCamera')    
                }
        }
        function updateIdleState(){
                console.assert(this._state === 'idle' )
                if( this._uiInFOV === false ){
                        this._gotoState('uiOutOfFov')
                }               
        }
};

THREEx.prototype._gotoState = function(newState){
        // TODO sanity check on the states
        /
        // leave states
        if( currentState === 'idle' ){
                
        }
        
        // goto new state
        if( currentState === 'idle' ){
                
        }
};
