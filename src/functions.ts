import { Setting } from "./types";

export function getUrlString(settings: Setting) {
    let urlString = '';
    if (settings.multiplication === true) {
      urlString += 'm';
    }
    if (settings.division === true) {
      urlString += 'd';
    }
    if (settings.negative === false) {
      urlString += 'p';
    } else {
      urlString += 'n';
    }
  
    return urlString
  }