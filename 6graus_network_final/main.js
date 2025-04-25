document.addEventListener("DOMContentLoaded", () => {
  const graph = new Graph();
  let actors = [];

  fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      const movie = item.title;
      const cast = item.cast;
      graph.addVertex(movie);

      cast.forEach((actor) => {
        graph.addEdge(movie, actor);
        if (!actors.includes(actor)) actors.push(actor);
      });
    });

    populateSelects(actors);
  });

    const populateSelects = (actors) => {
      const datalist = document.getElementById("actors");
      datalist.innerHTML = ""; // Garante que não duplique
    
      actors.forEach((actor) => {
        const option = document.createElement("option");
        option.value = actor;
        datalist.appendChild(option);
      });
    };

  document.getElementById("bfs-btn").addEventListener("click", () => {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const result = graph.bfsShortestPath(from, to);
    displayResult(result);
  });

  document.getElementById("bfs6-btn").addEventListener("click", () => {
    //console.log('entrou');
    
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const results = graph.bfsMax6(from, to);
    displayResults(results);
    //console.log(results);
    
  });

  const displayResult = (path) => {
    const output = document.getElementById("output");
    output.innerHTML = path
      ? `Caminho: ${path.join(" -> ")}<br>Comprimento: ${path.length - 1}`
      : "Relacionamento não encontrado.";
  };

  const displayResults = (paths) => {
    const output = document.getElementById("output");
    output.innerHTML = paths
      ? paths
          .map(
            (p) => `Caminho: ${p.join(" -> ")}<br>Comprimento: ${p.length - 1}`
          )
          .join("<hr>")
      : "Relacionamento não encontrado.";
  };
});
