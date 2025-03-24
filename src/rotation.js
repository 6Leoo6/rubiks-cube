import {Vector3} from "three";

export function rotateAroundAxis(point, rotation) {
  let [x, y, z] = [rotation.x, rotation.y, rotation.z];
  
  //X axis
  let tempPoint = new Vector3();
  
  tempPoint.y = point.y * Math.cos(x) - point.z * Math.sin(x);
  tempPoint.z = point.y * Math.sin(x) + point.z * Math.cos(x);
  
  point = point.copy(tempPoint);
  
  //Y axis
  tempPoint.x = point.x * Math.cos(y) + point.z * Math.sin(y);
  tempPoint.z = point.z * Math.cos(y) - point.x * Math.sin(y);
  
  point = point.copy(tempPoint);
  
  //Z axis
  tempPoint.x = point.x * Math.cos(z) - point.y * Math.sin(z);
  tempPoint.y = point.x * Math.sin(z) + point.y * Math.cos(z);
  
  point = point.copy(tempPoint);
  
  return point;
}