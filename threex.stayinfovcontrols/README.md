
# Initial algorithm
- trigger when the center of the ui is leaving the screen
  - detect this by the pixel
- target quaternion is computed at every frame as the first quaternion visible between the gaze vector and current orientation of the ui
- tween quaternion with a usual c*current + (1-c) * target
