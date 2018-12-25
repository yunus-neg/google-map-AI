let poly;
let map;
let line;
let lines = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: 26.3520000, lng: 43.7697994 }
  });

  line = new google.maps.Polyline({
    strokeColor: "#0f0000",
    strokeOpacity: 1.0,
    strokeWeight: 1
  });
  line.setMap(map);
  for (let i = 1; i < nodes.length; i++) {
    let node = nodes[i];

    addMarker(node);
    for (const i of node.connectedPoints) {
      let index = i.index;

      let child = nodes.find(point => point.index === index);

      let path = [
        new google.maps.LatLng(node.lat, node.lng),
        new google.maps.LatLng(child.lat, child.lng)
      ];
      addPath(path);
    }
  }
}

function addPath(path, color) {
  let strokeColor = color ? color : "#000000",

    line = new google.maps.Polyline({
      path: path,
      strokeColor: strokeColor,
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map
    });
  line.setMap(map);
  lines.push(line);
}

function addMarker(node) {
  let latLng = new google.maps.LatLng(node.lat, node.lng);
  let index = node.index;
  let title = "[" + node.index + "] " + node.name;
  let marker = new google.maps.Marker({
    position: latLng,
    title: title,
    map: map,
    label: index.toString()
  });
}

function drawPath(newPath) {
  for (const Line of lines) {
    Line.setMap(null);
  }
  lines = [];
  for (let i = 1; i < nodes.length; i++) {
    let node = nodes[i];

    for (const i of node.connectedPoints) {
      let index = i.index;
      if (newPath.includes(index)) {
        continue;
      }
      let child = nodes.find(point => point.index === index);

      let path = [
        new google.maps.LatLng(node.lat, node.lng),
        new google.maps.LatLng(child.lat, child.lng)
      ];
      addPath(path);
    }
  }
  let path = [];
  for (const index of newPath) {
    let node = nodes.find(point => point.index === index);

    path.push(new google.maps.LatLng(node.lat, node.lng));
  }
  addPath(path, "#ff0000");
}



function travelBtn() {
  let start = document.getElementById("start").value;
  let goal = document.getElementById("goal").value;
  AStar(start, goal);
}