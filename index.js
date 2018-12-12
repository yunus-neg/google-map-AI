
let poly;
let map;
let line;
let lines=[]

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14.5,
    center: { lat: 26.3497945, lng: 43.7597994 }
  });

  // poly = new google.maps.Polyline({
  //   strokeColor: '#0f0000',
  //   strokeOpacity: 1.0,
  //   strokeWeight: 1
  // });
  // poly.setMap(map);

  // Add a listener for the click event
  // map.addListener('click', addLatLng);

  for (const node of nodes) {
    // console.log(node);
  // addPath(latLng)
  // console.log(node);
 addMarker(node)
  for (const index of node.connectedPoints) {
    let child=nodes.find(point => point.index === index)
    // console.log(child,node);

    let path=[
      new google.maps.LatLng(node.lat, node.lng),
      new google.maps.LatLng(child.lat, child.lng)
    ]
        addPath(path)
        // getPath()

  }




  }
}

// Handles click events on a map, and adds a new point to the Polyline.

function addPath(path) {
  // var path = poly.getPath();
  // let latLng=new google.maps.LatLng(node.lat, node.lng);
  // console.log(line.getPath());
   line = new google.maps.Polyline({
    path: path,
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 1,
    map: map
}
);
lines.push(line)
// console.log("gg");

// console.log(lines);


  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  // path.push(latLng);

  // Add a new marker at the new plotted point on the polyline.

}

// console.log(data);
function addMarker(node){
  let latLng=new google.maps.LatLng(node.lat, node.lng);
  let index=node.index
  let title="["+node.index+"] "+node.name
  var marker = new google.maps.Marker({
    position: latLng,
    title:title,
    map: map,
    label:index.toString(),
  });
}
