




import L from 'leaflet';
import 'leaflet-routing-machine';
import * as css from '../styles/main.scss';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerIconRetinaPng from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';


  export const map =L.map('map',{
    center:[47.0104, 28.8439],
    zoom:8 
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(map);

L.Marker.prototype.options.icon = L.icon({
    iconUrl: markerIconPng,
    iconRetinaUrl: markerIconRetinaPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
















