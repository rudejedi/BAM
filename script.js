document.addEventListener("DOMContentLoaded", () => {
  const protonsInput = document.getElementById("protons");
  const electronsInput = document.getElementById("electrons");
  const neutronsInput = document.getElementById("neutrons");
  const elementNameInput = document.getElementById("elementName");
  const loadElementButton = document.getElementById("loadElement");
  const copyImageButton = document.getElementById("copyImage");
  const resetAtomButton = document.getElementById("resetAtom");
  const canvas = document.getElementById("atomCanvas");
  const ctx = canvas.getContext("2d");
  const elementNameDisplay = document.getElementById("elementNameDisplay");

  const shellCapacities = [2, 8, 18, 32, 50, 72, 98];

  const elementData = {
    hydrogen: { protons: 1, neutrons: 0 },
    helium: { protons: 2, neutrons: 2 },
    lithium: { protons: 3, neutrons: 4 },
    beryllium: { protons: 4, neutrons: 5 },
    boron: { protons: 5, neutrons: 6 },
    carbon: { protons: 6, neutrons: 6 },
    nitrogen: { protons: 7, neutrons: 7 },
    oxygen: { protons: 8, neutrons: 8 },
    fluorine: { protons: 9, neutrons: 10 },
    neon: { protons: 10, neutrons: 10 },
    sodium: { protons: 11, neutrons: 12 },
    magnesium: { protons: 12, neutrons: 12 },
    aluminum: { protons: 13, neutrons: 14 },
    silicon: { protons: 14, neutrons: 14 },
    phosphorus: { protons: 15, neutrons: 16 },
    sulfur: { protons: 16, neutrons: 16 },
    chlorine: { protons: 17, neutrons: 18 },
    argon: { protons: 18, neutrons: 22 },
    potassium: { protons: 19, neutrons: 20 },
    calcium: { protons: 20, neutrons: 20 },
    scandium: { protons: 21, neutrons: 24 },
    titanium: { protons: 22, neutrons: 26 },
    vanadium: { protons: 23, neutrons: 28 },
    chromium: { protons: 24, neutrons: 28 },
    manganese: { protons: 25, neutrons: 30 },
    iron: { protons: 26, neutrons: 30 },
    cobalt: { protons: 27, neutrons: 32 },
    nickel: { protons: 28, neutrons: 31 },
    copper: { protons: 29, neutrons: 35 },
    zinc: { protons: 30, neutrons: 35 },
    gallium: { protons: 31, neutrons: 39 },
    germanium: { protons: 32, neutrons: 41 },
    arsenic: { protons: 33, neutrons: 42 },
    selenium: { protons: 34, neutrons: 45 },
    bromine: { protons: 35, neutrons: 45 },
    krypton: { protons: 36, neutrons: 48 },
    rubidium: { protons: 37, neutrons: 48 },
    strontium: { protons: 38, neutrons: 50 },
    yttrium: { protons: 39, neutrons: 50 },
    zirconium: { protons: 40, neutrons: 51 },
    niobium: { protons: 41, neutrons: 52 },
    molybdenum: { protons: 42, neutrons: 54 },
    technetium: { protons: 43, neutrons: 55 },
    ruthenium: { protons: 44, neutrons: 57 },
    rhodium: { protons: 45, neutrons: 58 },
    palladium: { protons: 46, neutrons: 60 },
    silver: { protons: 47, neutrons: 61 },
    cadmium: { protons: 48, neutrons: 64 },
    indium: { protons: 49, neutrons: 66 },
    tin: { protons: 50, neutrons: 69 },
    antimony: { protons: 51, neutrons: 71 },
    tellurium: { protons: 52, neutrons: 76 },
    iodine: { protons: 53, neutrons: 74 },
    xenon: { protons: 54, neutrons: 77 },
    cesium: { protons: 55, neutrons: 78 },
    barium: { protons: 56, neutrons: 81 },
    lanthanum: { protons: 57, neutrons: 82 },
    cerium: { protons: 58, neutrons: 82 },
    praseodymium: { protons: 59, neutrons: 81 },
    neodymium: { protons: 60, neutrons: 84 },
    promethium: { protons: 61, neutrons: 84 },
    samarium: { protons: 62, neutrons: 88 },
    europium: { protons: 63, neutrons: 88 },
    gadolinium: { protons: 64, neutrons: 94 },
    terbium: { protons: 65, neutrons: 94 },
    dysprosium: { protons: 66, neutrons: 96 },
    holmium: { protons: 67, neutrons: 98 },
    erbium: { protons: 68, neutrons: 99 },
    thulium: { protons: 69, neutrons: 100 },
    ytterbium: { protons: 70, neutrons: 103 },
    lutetium: { protons: 71, neutrons: 104 },
    hafnium: { protons: 72, neutrons: 106 },
    tantalum: { protons: 73, neutrons: 107 },
    tungsten: { protons: 74, neutrons: 110 },
    rhenium: { protons: 75, neutrons: 111 },
    osmium: { protons: 76, neutrons: 114 },
    iridium: { protons: 77, neutrons: 115 },
    platinum: { protons: 78, neutrons: 117 },
    gold: { protons: 79, neutrons: 118 },
    mercury: { protons: 80, neutrons: 121 },
    thallium: { protons: 81, neutrons: 123 },
    lead: { protons: 82, neutrons: 125 },
    bismuth: { protons: 83, neutrons: 126 },
    polonium: { protons: 84, neutrons: 125 },
    astatine: { protons: 85, neutrons: 125 },
    radon: { protons: 86, neutrons: 136 },
    francium: { protons: 87, neutrons: 136 },
    radium: { protons: 88, neutrons: 138 },
    actinium: { protons: 89, neutrons: 138 },
    thorium: { protons: 90, neutrons: 142 },
    protactinium: { protons: 91, neutrons: 140 },
    uranium: { protons: 92, neutrons: 146 },
    neptunium: { protons: 93, neutrons: 144 },
    plutonium: { protons: 94, neutrons: 150 },
    americium: { protons: 95, neutrons: 148 },
    curium: { protons: 96, neutrons: 151 },
    berkelium: { protons: 97, neutrons: 150 },
    californium: { protons: 98, neutrons: 153 },
    einsteinium: { protons: 99, neutrons: 153 },
    fermium: { protons: 100, neutrons: 157 },
    mendelevium: { protons: 101, neutrons: 157 },
    nobelium: { protons: 102, neutrons: 157 },
    lawrencium: { protons: 103, neutrons: 159 },
    rutherfordium: { protons: 104, neutrons: 159 },
    dubnium: { protons: 105, neutrons: 161 },
    seaborgium: { protons: 106, neutrons: 161 },
    bohrium: { protons: 107, neutrons: 161 },
    hassium: { protons: 108, neutrons: 163 },
    meitnerium: { protons: 109, neutrons: 165 },
    darmstadtium: { protons: 110, neutrons: 169 },
    roentgenium: { protons: 111, neutrons: 171 },
    copernicium: { protons: 112, neutrons: 173 },
    nihonium: { protons: 113, neutrons: 173 },
    flerovium: { protons: 114, neutrons: 173 },
    moscovium: { protons: 115, neutrons: 173 },
    livermorium: { protons: 116, neutrons: 177 },
    tennessine: { protons: 117, neutrons: 177 },
    oganesson: { protons: 118, neutrons: 176 },
  };

  const elementDataByProtons = {};
  for (const name in elementData) {
    elementDataByProtons[elementData[name].protons] =
      name.charAt(0).toUpperCase() + name.slice(1);
  }

  function showMessageBox(message) {
    // Prevent multiple message boxes from appearing
    if (
      document.querySelector(".overlay") ||
      document.querySelector(".message-box")
    ) {
      return;
    }

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);

    const messageBox = document.createElement("div");
    messageBox.className = "message-box";
    messageBox.innerHTML = `
            <p class="text-lg text-gray-800">${message}</p>
            <button>OK</button>
        `;
    document.body.appendChild(messageBox);

    messageBox.querySelector("button").onclick = () => {
      document.body.removeChild(overlay);
      document.body.removeChild(messageBox);
    };
  }

  const updateElementNameDisplay = (protons) => {
    const name = elementDataByProtons[protons];
    if (name) {
      elementNameDisplay.textContent = `Element: ${name}`;
    } else {
      elementNameDisplay.textContent = "Element: Unknown";
    }
  };

  const drawAtom = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const protons = parseInt(protonsInput.value) || 0;
    const electrons = parseInt(electronsInput.value) || 0;
    const neutrons = parseInt(neutronsInput.value) || 0;

    updateElementNameDisplay(protons);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let electronShells = [];
    let remainingElectrons = electrons;
    for (const capacity of shellCapacities) {
      const electronsInShell = Math.min(remainingElectrons, capacity);
      electronShells.push(electronsInShell);
      remainingElectrons -= electronsInShell;
      if (remainingElectrons <= 0) break;
    }

    const numShells = electronShells.length;
    const baseOrbitSpacing = 80;
    const electronRadius = 15;
    const maxAtomRadiusUnscaled =
      100 + numShells * baseOrbitSpacing + electronRadius;
    const scaleFactor = canvas.width / 2 / (maxAtomRadiusUnscaled + 20);

    const nucleusRadius =
      Math.min(100, 60 + (protons + neutrons) * 0.5) * scaleFactor;
    const orbitSpacing = baseOrbitSpacing * scaleFactor;

    ctx.beginPath();
    ctx.arc(centerX, centerY, nucleusRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#e7e5e4";
    ctx.fill();
    ctx.strokeStyle = "#44403c";
    ctx.lineWidth = 4 * scaleFactor;
    ctx.stroke();

    ctx.fillStyle = "#44403c";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const fontSize = nucleusRadius * 0.5;
    ctx.font = `bold ${fontSize}px Inter`;
    ctx.fillText(`${protons}p`, centerX, centerY - fontSize * 0.55);
    ctx.fillText(`${neutrons}n`, centerX, centerY + fontSize * 0.55);

    electronShells.forEach((shellElectrons, i) => {
      if (shellElectrons === 0) return;
      const orbitRadius = nucleusRadius + orbitSpacing * (i + 1);
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbitRadius, 0, 2 * Math.PI);
      ctx.strokeStyle = "#333333"; /* Darker orbit color for printing */
      ctx.lineWidth = 3 * scaleFactor; /* Slightly increased line width */
      ctx.stroke();

      for (let j = 0; j < shellElectrons; j++) {
        const angle = (j / shellElectrons) * 2 * Math.PI;
        const x = centerX + orbitRadius * Math.cos(angle);
        const y = centerY + orbitRadius * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, electronRadius * scaleFactor, 0, 2 * Math.PI);
        ctx.fillStyle = "#44403c";
        ctx.fill();
      }
    });
  };

  const loadElementData = () => {
    const name = elementNameInput.value.toLowerCase().trim();
    const element = elementData[name];
    if (element) {
      protonsInput.value = element.protons;
      electronsInput.value = element.protons;
      neutronsInput.value = element.neutrons;
      drawAtom();
    } else {
      showMessageBox("Element not found.");
      updateElementNameDisplay(0);
    }
  };

  const copyImageToClipboard = () => {
    canvas.toBlob((blob) => {
      if (blob) {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard
          .write([item])
          .then(() => {
            showMessageBox("Image copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy image: ", err);
            showMessageBox(
              "Failed to copy image. Your browser might not support this feature directly or permission was denied."
            );
          });
      } else {
        showMessageBox("Could not generate image for copying.");
      }
    }, "image/png");
  };

  const resetAtom = () => {
    protonsInput.value = 1;
    electronsInput.value = 1;
    neutronsInput.value = 0;
    elementNameInput.value = "";
    drawAtom(); // Redraw with default Hydrogen
  };

  protonsInput.addEventListener("input", drawAtom);
  electronsInput.addEventListener("input", drawAtom);
  neutronsInput.addEventListener("input", drawAtom);

  loadElementButton.addEventListener("click", loadElementData);
  elementNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      loadElementData();
    }
  });
  copyImageButton.addEventListener("click", copyImageToClipboard);
  resetAtomButton.addEventListener("click", resetAtom);

  const drawEnergyChart = () => {
    const energyCtx = document
      .getElementById("energyLevelChart")
      .getContext("2d");
    new Chart(energyCtx, {
      type: "bar",
      data: {
        labels: ["n=1", "n=2", "n=3", "n=4", "n=5", "n=6"],
        datasets: [
          {
            label: "Energy Level (eV) for Hydrogen",
            data: [-13.6, -3.4, -1.51, -0.85, -0.54, -0.38],
            backgroundColor: "rgba(56, 189, 248, 0.6)",
            borderColor: "rgba(2, 132, 199, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            title: { display: true, text: "Energy (eV)" },
          },
          x: {
            title: { display: true, text: "Principal Quantum Number (Shell)" },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `Energy: ${context.raw} eV`;
              },
            },
          },
        },
      },
    });
  };

  drawAtom();
  drawEnergyChart();
});
