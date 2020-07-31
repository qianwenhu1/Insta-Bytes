import React from 'react';
// export const loadGoogleMaps = (callback) => {
//     const existingScript = document.getElementById('googleMaps');
  
//     if (!existingScript) {
//       const script = document.createElement('script');
//       script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDGhTQaovZ1_vQSuDqmqZwEVq6Nxat9u8U&libraries=places';
//       script.id = 'googleMaps';
//       document.body.appendChild(script);
  
//       script.onload = () => {
//         if (callback) callback();
//       };
//     }
  
//     if (existingScript && callback) callback();
//   };