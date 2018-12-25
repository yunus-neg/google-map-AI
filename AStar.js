let G = [],
  visted = [],
  F = [],
  path = [],
  heuristic,
  list = [];
function AStar(start, goal) {
  start = Number(start);
  goal = Number(goal);

  G = [];
  visted = [start];
  F[start] = 0;
  list = [start];
  path[start] = [start];
  heuristic = nodes[0][goal];
  if (!heuristic) {
    alert("wrong goal");
    return;
  }
  assignF(start);
  travel(start, goal);
}

function travel(index, goal) {
  if (index == goal) {
    drawPath(path[goal]);

    return;
  }
  visted.push(index);

  let node = nodes.find(point => point.index === index);
  let connected = node.connectedPoints;

  for (let i = 0; i < connected.length; i++) {
    if (list.includes(connected[i].index)) {
      compareNodes(index, connected[i].index, connected[i].distance);
    } else {
      if (!visted.includes(connected[i].index)) {
        assignPath(index, connected[i].index);
      }
      list.push(connected[i].index);

      assignG(index, connected[i].index, connected[i].distance);
      assignF(index);
    }
  }
  let tempIndex = list.indexOf(index);
  list.splice(tempIndex, 1);

  let newIndex = list[0];

  for (let i = 0; i < list.length; i++) {
    if (F[list[i]] < F[newIndex]) {
      newIndex = list[i];
    }
  }
  travel(newIndex, goal);
}

function compareNodes(node1, node2, dist) {
  let newWay = G[node1] + dist + heuristic[node2];
  if (newWay < F[node2]) {
    F[node2] = newWay;
  }
}
function assignPath(node1, node2) {
  let t = path[node1];

  path[node2] = [...t, node2];
}
function assignG(node1, node2, dist) {
  G[node2] = G[node1] + dist;
}
function assignF(index) {
  F[index] = heuristic[index] + G[index];
}
