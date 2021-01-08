// COORDINATE UPLOOK APP

declare var ol: { [key: string]: any };

const map = document.querySelector('#map')! as HTMLDivElement;
const form = document.querySelector('form')! as HTMLFormElement;
const latElement = document.querySelector('#lat')! as HTMLInputElement;
const lngElement = document.querySelector('#lng')! as HTMLInputElement;

const searchHandler = (event: Event) => {
   event.preventDefault();
   const lat = +latElement.value;
   const lng = +lngElement.value;
   if (Number.isNaN(lat) || Number.isNaN(lng)) {
      alert('Invalid coordinates, please try again.');
   } else {
      map.innerHTML = '';
      new ol.Map({
         target: 'map',
         layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ],
         view: new ol.View({ center: ol.proj.fromLonLat([lng, lat]), zoom: 16 })
      });
   }
};

form.addEventListener('submit', searchHandler);
