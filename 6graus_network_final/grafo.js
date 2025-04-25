class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set();
    }
  }

  addEdge(v1, v2) {
    this.addVertex(v1);
    this.addVertex(v2);
    this.adjacencyList[v1].add(v2);
    this.adjacencyList[v2].add(v1);
  }

  showGraph() {
    for (let vertex in this.adjacencyList) {
      //console.log(`${vertex} => ${[...this.adjacencyList[vertex]].join(', ')}`);
    }
  }

  bfsShortestPath(start, end) {
    let queue = [[start]];
    let visited = new Set();

    while (queue.length > 0) {
      let path = queue.shift();
      let node = path[path.length - 1];

      if (node === end) return path;

      if (!visited.has(node)) {
        visited.add(node);

        for (let neighbor of this.adjacencyList[node] || []) {
          queue.push([...path, neighbor]);
        }
      }
    }

    return null;
  }

  bfsMax6(start, end) {
    const results = [];
    const visited = new Set();
  
    const dfs = (node, path) => {
      if (path.length > 7) return; // 6 conexões = 7 nós
  
      if (node === end && path.length > 1) {
        results.push([...path]);
        return;
      }
  
      for (let neighbor of this.adjacencyList[node] || []) {
        if (!path.includes(neighbor)) {
          path.push(neighbor);
          dfs(neighbor, path);
          path.pop(); // backtrack
        }
      }
    };
  
    dfs(start, [start]);
    return results.length ? results : null;
  }
}
