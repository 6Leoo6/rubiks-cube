import {Euler, Vector3} from "three";

export function roundFloat(f) {
  return Math.round(f * 10**6) / 10**6
}

export function roundVector(v) {
  let tempV = new Vector3();
  tempV.x = Math.round(v.x * 10**6) / 10**6;
  tempV.y = Math.round(v.y * 10**6) / 10**6;
  tempV.z = Math.round(v.z * 10**6) / 10**6;
  
  return tempV;
}

export function roundEuler(e) {
  let tempE = new Euler();
  tempE.x = Math.round(e.x * 10**6) / 10**6;
  tempE.y = Math.round(e.y * 10**6) / 10**6;
  tempE.z = Math.round(e.z * 10**6) / 10**6;
  
  return tempE;
}