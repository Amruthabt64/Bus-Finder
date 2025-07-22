async function searchPlatform() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  try {
    const response = await fetch("buses.json");
    const data = await response.json();

    const platforms = data.features;
    let found = false;

    platforms.forEach(platform => {
      const name = platform.properties.Name;
      const routeDestination = platform.properties.Route_Destination.toLowerCase();
      const via = platform.properties.VIA;
      const image = platform.properties.gx_media_links;

      if (routeDestination.includes(input)) {
        found = true;

        const div = document.createElement("div");
        div.className = "platform";
        div.innerHTML = `
          <h3>${name}</h3>
          <strong>Routes:</strong><pre>${platform.properties.Route_Destination}</pre>
          <strong>Via:</strong><pre>${via}</pre>
          <img src="${image}" alt="${name}">
        `;

        resultsDiv.appendChild(div);
      }
    });

    if (!found) {
      resultsDiv.innerHTML = "<p>No matching platform found.</p>";
    }

  } catch (error) {
    resultsDiv.innerHTML = `<p>Error loading data: ${error}</p>`;
  }
}
