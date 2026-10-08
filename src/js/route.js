import L from 'leaflet';
import 'leaflet-routing-machine';
import { map } from './map.js';
 
 export const routeState ={
    startCoords:null,
    endCoords:null
}

let routingControl = null;


 export function resetRoute(onResetCallback) {

    routeState.startCoords = null;
    routeState.endCoords = null;

    if (routingControl !== null) {
        routingControl.setWaypoints([]);
    }


    if (onResetCallback) {
        onResetCallback(); 
    }
}

 export function renderRouteLogic(onRouteFoundCallback, onResetCallback){
    const{startCoords , endCoords} =routeState;

    if(startCoords !== null && endCoords !== null){
      if(routingControl === null){
         routingControl = L.Routing.control({
            waypoints: [
            L.latLng(startCoords[0],startCoords[1]),
            L.latLng(endCoords[0],endCoords[1])
            ],
            lineOptions:{
                styles:[
                    {color: 'black', opacity: 0.15, weight: 10},
                    {color: '#FF0000', opacity: 0.8, weight: 5 }

                ]
            },
            router:L.Routing.osrmv1({
                serviceUrl:'https://router.project-osrm.org/route/v1'
            }),
            addWaypoints: false,
            show: false,
            collapsible: false,
            draggableWaypoints: false        
         }).addTo(map);
         routingControl.getContainer().style.display = 'none';



         routingControl.on('routesfound', function (e){
    const route = e.routes;
    const summary =route[0].summary;

     const distanceKm = (summary.totalDistance/1000).toFixed(1);
     const distanceTime = Math.floor(summary.totalTime / 3600);
     const minutes = (summary.totalTime % 60).toFixed(0);
     if (onRouteFoundCallback) {
                    onRouteFoundCallback(distanceKm, distanceTime, minutes);
                }

})

      }else{
        routingControl.setWaypoints([
             L.latLng(startCoords[0],startCoords[1]),
             L.latLng(endCoords[0],endCoords[1])
            ]);
      }
    
    }else{
     if(routingControl === null){
        resetRoute(onResetCallback);
     }
    }
    
}