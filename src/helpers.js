//need to import because theese guys are jsx (spans)
import React from 'react';

/**
 * Fetch error helper
 * 
 * @param {object} response 
 */

export const handleResponse = (response) => {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
      });
} 


//not the most useful comment in the world, but it will work in this case
/**
 * Render change percent helper
 * @param {string} percent
 */


//from class method to function
//renderChangePercent(percent) {
export const renderChangePercent = (percent) => {
    if (percent > 0) {
      return <span className="percent-raised">{percent}% &uarr;</span>
    } else if (percent < 0) {
      return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
      return <span>{percent}</span>
    }
  }