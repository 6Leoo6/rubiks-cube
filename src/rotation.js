import {Vector3} from "three";

export function rotateAroundAxis(_point, _rotation) {
  let [x, y, z] = [_rotation.x, _rotation.y, _rotation.z];
  
  let point = _point.clone();
  let tempPoint = point.clone();
  
  //X axis
  tempPoint.y = point.y * Math.cos(x) - point.z * Math.sin(x);
  tempPoint.z = point.y * Math.sin(x) + point.z * Math.cos(x);
  
  point.copy(tempPoint);
  
  //Y axis
  tempPoint.x = point.x * Math.cos(y) + point.z * Math.sin(y);
  tempPoint.z = point.z * Math.cos(y) - point.x * Math.sin(y);
  
  point.copy(tempPoint);
  
  //Z axis
  tempPoint.x = point.x * Math.cos(z) - point.y * Math.sin(z);
  tempPoint.y = point.x * Math.sin(z) + point.y * Math.cos(z);
  
  point.copy(tempPoint);
  
  return point;
}