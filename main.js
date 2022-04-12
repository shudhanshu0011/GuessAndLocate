function main(city) {
  // ---------Distance Calculation -------------------
  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    x = lat2;
    y = lon2;
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(earthRadiusKm * c);
  }

  // --------------------Score Calculation-----------------
  function score(distance) {
    var scored = (distance / 3000) * 100;
    return Math.round(scored);
  }

  // -------------------MapBox----------------------------
  var coordinates, selectedLongitude, selectedLatitude;
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2h1ZGhhbnNodTAwMTEiLCJhIjoiY2wxaGN3c2NuMDg4NDNqbWpzMXVyb2FoYyJ9.0zlYRvmxciYnQxxIVnK7YA";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [77.19180948989872, 28.597840096212554],
    zoom: 3,
  });
  map.on("style.load", function () {
    map.on("click", function (e) {
      coordinates = e.lngLat;
      selectedLongitude = coordinates.lng;
      selectedLatitude = coordinates.lat;
      new mapboxgl.Popup().setLngLat(coordinates).setHTML("I").addTo(map);
    });
  });

  // ----------------------------360 degree viewer---------------------------
  const panoramaImage = new PANOLENS.ImagePanorama(city.imageUrl);
  const imageContainer = document.querySelector(".image-container");

  const viewer = new PANOLENS.Viewer({
    container: imageContainer,
  });

  viewer.add(panoramaImage);

  // --------------------------------Modals----------------------------
  const submit = document.getElementById("submit");
  const modal_container1 = document.getElementById("modal_container1");

  submit.addEventListener("click", () => {
    modal_container.classList.remove("show");
    modal_container1.classList.add("show");
    document.getElementById("dist").innerHTML =
      distanceInKmBetweenEarthCoordinates(
        city.latitude,
        city.longitude,
        selectedLatitude,
        selectedLongitude
      );
    document.getElementById("score").innerHTML =
      100 -
      score(
        distanceInKmBetweenEarthCoordinates(
          city.latitude,
          city.longitude,
          selectedLatitude,
          selectedLongitude
        )
      );
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2h1ZGhhbnNodTAwMTEiLCJhIjoiY2wxbXp2OXg0MDVhZTNkcXVzemZtYWpsaiJ9.wHmL3aUozI5L2rjIdRvbdg";
    var map1 = new mapboxgl.Map({
      container: "map1",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [
        (city.longitude + selectedLongitude) / 2,
        (city.latitude + selectedLatitude) / 2,
      ],
      zoom: 5,
    });
    map1.on("load", () => {
      map1.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [selectedLongitude, selectedLatitude],
              [city.longitude, city.latitude],
            ],
          },
        },
      });
      map1.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "red",
          "line-width": 3,
        },
      });
    });
    map1.on("load", () => {
      map1.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error, image) => {
          if (error) throw error;
          map1.addImage("custom-marker", image);
          map1.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [selectedLongitude, selectedLatitude],
                  },
                  properties: {
                    title: "Your Location",
                  },
                },
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [city.longitude, city.latitude],
                  },
                  properties: {
                    title: city.cityName,
                  },
                },
              ],
            },
          });
          map1.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });
  });

  const open = document.getElementById("open");

  const modal_container = document.getElementById("modal_container");

  const close = document.getElementById("close");

  open.addEventListener("click", () => {
    modal_container.classList.add("show");
  });

  close.addEventListener("click", () => {
    modal_container.classList.remove("show");
  });
}

var items = [
  location1,
  location2,
  location3,
  location4,
  location5,
  location6,
  location7,
  location8,
  location9,
  location10,
  location11,
  location12,
  location13,
  location14,
  location15,
  location16,
  location17,
  location18,
  location19,
  location20,
  location21,
  location22,
  location23,
  location24,
  location25,
  location26,
  location27,
  location28,
  location29,
  location30,
  location31,
  location32,
  location33,
  location34,
  location35,
  location36,
  location37,
  location38,
  location39,
  location40,
  location41,
  location42,
  location43,
  location44,
  location45,
  location46,
  location47,
  location48,
  location49,
  location50,
];
var locations = items[Math.floor(Math.random() * items.length)];
main(locations);

const next = document.getElementById("next");
next.addEventListener("click", () => {
  location.reload();
});
