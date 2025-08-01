async function searchPlatform() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (input === "") {
    resultsDiv.innerHTML = "<p>Please enter a destination to search.</p>";
    return;
  }

  try {
    const response = await fetch("buses.json");
    const data = await response.json();

    const platforms = data.features;
    let found = false;

    platforms.forEach(platform => {
      const name = platform.properties.Name || "";
      const routeDestination = platform.properties.Route_Destination || "";
      const via = platform.properties.VIA || "";
      const image = platform.properties.gx_media_links || "";

      // Convert to lowercase for case-insensitive search
      const destinationLower = routeDestination.toLowerCase();
      const nameLower = name.toLowerCase();
      const viaLower = via.toLowerCase();

      // Match input with routeDestination or name or via
      if (destinationLower.includes(input) || nameLower.includes(input) || viaLower.includes(input)) {
        found = true;

        const div = document.createElement("div");
        div.className = "platform";
        div.innerHTML = `
          <h3>${name}</h3>
          <strong>Routes:</strong><pre>${routeDestination}</pre>
          <strong>Via:</strong><pre>${via}</pre>
          ${image ? `<img src="${image}" alt="${name}">` : ""}
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

  const text = "Welcome to Platform Finder!";
  let i = 0;
  let isDeleting = false;
  const speed = 100;
  const pause = 1000; // pause after typing or deleting

  function typeEffect() {
    const target = document.getElementById("typing-text");

    if (!isDeleting) {
      target.innerHTML = text.substring(0, i);
      i++;
      if (i > text.length) {
        isDeleting = true;
        setTimeout(typeEffect, pause); // wait before deleting
        return;
      }
    } else {
      i--;
      target.innerHTML = text.substring(0, i);
      if (i === 0) {
        isDeleting = false;
        setTimeout(typeEffect, pause); // wait before typing again
        return;
      }
    }

    setTimeout(typeEffect, speed);
  }

  window.onload = typeEffect;



