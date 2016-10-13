var THREEx = THREEx || {}

THREEx.LooseFollowControls = function(object3d){
        this.object3d = object3d
        this._state = 'Idle'
}

/**
 * if ui is fov
 * camera speed
 */

THREEx.LooseFollowControls.states = [
        'Idle',
        'UiOutOfFov',
        'WaitStableCamera',
        'LooseFollowing'
];


THREEx.prototype.update = function(camera){
        
        
        if( this._state === 'Idle' ){
                updateIdleState()                
        }else if( this._state === 'UiOutOfFov' ){
                updateUiOutOfFOV()                
        }else if( this._state === 'WaitStableCamera' ){
                updateWaitStableCamera()                
        }else if( this._state === 'LooseFollowing' ){
                updateLooseFollowing()                
        }else{
                console.assert('unknown state', this._state)
        }
        return

        function updateWaitStableCamera(){
        }
        function updateLooseFollowing(){
        }
        function updateUiOutOfFOV(){
                console.assert(this._state === 'UiOutOfFov' )
                if( this._uiInFOV === true ){
                        this._gotoState('Idle')
                }else if( this._cameraAngularSpeed > this._maxCameraAngularSpeed ){
                        this._gotoState('WaitStableCamera')    
                }
        }
        function updateIdleState(){
                console.assert(this._state === 'Idle' )
                if( this._uiInFOV === false ){
                        this._gotoState('UiOutOfFov')
                }               
        }
};

THREEx.prototype._gotoState = function(newState){
        // TODO sanity check on the states
        /
        // leave states
        if( currentState === 'Idle' ){
                ;(function(){
                        
                })()
        }
        
        // goto new state
        if( currentState === 'Idle' ){
                
        }
};
