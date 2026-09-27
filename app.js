// ============================================
// SMART WASTE MANAGEMENT SYSTEM
// TECHMINDS - SIH 2026
// ============================================

let bins = [
    {
        id: "BIN-01",
        zone: "Residential Zone",
        level: 35,
        type: "Wet Waste"
    },
    {
        id: "BIN-02",
        zone: "Market Area",
        level: 55,
        type: "Dry Waste"
    },
    {
        id: "BIN-03",
        zone: "Public Park",
        level: 25,
        type: "Wet Waste"
    },
    {
        id: "BIN-04",
        zone: "Hospital Zone",
        level: 70,
        type: "Dry Waste"
    },
    {
        id: "BIN-05",
        zone: "Commercial Zone",
        level: 45,
        type: "Recyclable Waste"
    }
];

let alerts = [
    "BIN-04 is approaching its capacity limit.",
    "Collection required in Hospital Zone."
];

let collectedWaste = 27;

let completedInspections = 0;

let inspectionZones = [
    "Residential Zone",
    "Market Area",
    "Public Park",
    "Hospital Zone",
    "Commercial Zone"
];


// ============================================
// NAVIGATION
// ============================================

function showSection(sectionId) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active");
    }

    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    const clickedButton = document.querySelector(
        `.nav-btn[onclick="showSection('${sectionId}')"]`
    );

    if (clickedButton) {
        clickedButton.classList.add("active");
    }
}


// ============================================
// LOCATION
// ============================================

function changeLocation() {

    const location =
        document.getElementById("deploymentArea").value;

    addAlert(
        "Deployment area changed to " + location + "."
    );
}


// ============================================
// BIN STATUS
// ============================================

function getBinStatus(level) {

    if (level >= 80) {
        return "Critical";
    }

    if (level >= 60) {
        return "Warning";
    }

    return "Normal";
}


// ============================================
// DASHBOARD BIN DISPLAY
// ============================================

function renderDashboardBins() {

    const container =
        document.getElementById("dashboardBins");

    if (!container) return;

    container.innerHTML = "";

    bins.forEach(bin => {

        const status = getBinStatus(bin.level);

        const card =
            document.createElement("div");

        card.className = "bin-card";

        card.innerHTML = `

            <h3>${bin.id}</h3>

            <p>${bin.zone}</p>

            <p>
                ${bin.type}
            </p>

            <div class="progress">

                <div
                    class="progress-bar"
                    style="width:${bin.level}%">
                </div>

            </div>

            <div class="bin-status">
                ${bin.level}% — ${status}
            </div>

        `;

        container.appendChild(card);
    });
}


// ============================================
// SMART BINS PAGE
// ============================================

function renderBins() {

    const container =
        document.getElementById("binsGrid");

    if (!container) return;

    container.innerHTML = "";

    bins.forEach(bin => {

        const status = getBinStatus(bin.level);

        const card =
            document.createElement("div");

        card.className = "bin-card";

        card.innerHTML = `

            <h3>${bin.id}</h3>

            <p>${bin.zone}</p>

            <p>
                Waste Type: ${bin.type}
            </p>

            <div class="progress">

                <div
                    class="progress-bar"
                    style="width:${bin.level}%">
                </div>

            </div>

            <div class="bin-status">
                Fill Level: ${bin.level}% |
                ${status}
            </div>

        `;

        container.appendChild(card);
    });
}


// ============================================
// DASHBOARD STATISTICS
// ============================================

function updateStats() {

    const total =
        bins.length;

    const normal =
        bins.filter(bin => bin.level < 60).length;

    const alert =
        bins.filter(bin => bin.level >= 60).length;

    document.getElementById("totalBins").textContent =
        total;

    document.getElementById("normalBins").textContent =
        normal;

    document.getElementById("alertBins").textContent =
        alert;

    document.getElementById("collectedWaste").textContent =
        collectedWaste + " kg";

    const analyticsCollected =
        document.getElementById("analyticsCollected");

    if (analyticsCollected) {
        analyticsCollected.textContent =
            collectedWaste + " kg";
    }

    const average =
        bins.reduce((sum, bin) => sum + bin.level, 0) /
        bins.length;

    const analyticsUtilization =
        document.getElementById("analyticsUtilization");

    if (analyticsUtilization) {
        analyticsUtilization.textContent =
            Math.round(average) + "%";
    }

    const analyticsAlerts =
        document.getElementById("analyticsAlerts");

    if (analyticsAlerts) {
        analyticsAlerts.textContent =
            alerts.length;
    }
}


// ============================================
// SIMULATE WASTE
// ============================================

function simulateWaste() {

    const randomIndex =
        Math.floor(Math.random() * bins.length);

    const bin =
        bins[randomIndex];

    const increase =
        Math.floor(Math.random() * 15) + 5;

    bin.level =
        Math.min(100, bin.level + increase);

    if (bin.level >= 80) {

        addAlert(
            bin.id +
            " in " +
            bin.zone +
            " has reached " +
            bin.level +
            "% capacity."
        );
    }

    updateAll();
}


// ============================================
// ALERT SYSTEM
// ============================================

function addAlert(message) {

    alerts.unshift(message);

    if (alerts.length > 10) {
        alerts.pop();
    }

    renderAlerts();
    updateStats();
}


function renderAlerts() {

    const container =
        document.getElementById("alertsList");

    const dashboardContainer =
        document.getElementById("dashboardAlerts");

    if (container) {

        container.innerHTML = "";

        if (alerts.length === 0) {

            container.innerHTML = `
                <div class="empty-alert">
                    No active alerts.
                </div>
            `;

        } else {

            alerts.forEach(alert => {

                const item =
                    document.createElement("div");

                item.className = "alert-item";

                item.textContent = alert;

                container.appendChild(item);
            });
        }
    }

    if (dashboardContainer) {

        dashboardContainer.innerHTML = "";

        alerts.slice(0, 3).forEach(alert => {

            const item =
                document.createElement("div");

            item.className = "alert-item";

            item.textContent = alert;

            dashboardContainer.appendChild(item);
        });
    }
}


function clearAlerts() {

    alerts = [];

    renderAlerts();

    updateStats();
}


// ============================================
// WASTE SEGREGATION
// ============================================

function classifyWaste(type) {

    addAlert(
        "Waste classified as " + type + "."
    );
}


// ============================================
// COLLECTION TABLE
// ============================================

function renderCollectionTable() {

    const table =
        document.getElementById("collectionTable");

    if (!table) return;

    table.innerHTML = "";

    bins.forEach(bin => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${bin.id}</td>

            <td>${bin.zone}</td>

            <td>${bin.level}%</td>

            <td>${bin.type}</td>

            <td>
                <button
                    class="secondary-btn"
                    onclick="collectBin('${bin.id}')">
                    Collect
                </button>
            </td>

        `;

        table.appendChild(row);
    });
}


// ============================================
// COLLECT BIN
// ============================================

function collectBin(binId) {

    const bin =
        bins.find(item => item.id === binId);

    if (!bin) return;

    collectedWaste += Math.max(
        1,
        Math.round(bin.level / 10)
    );

    bin.level = 10;

    addAlert(
        bin.id +
        " collection completed successfully."
    );

    updateAll();
}


// ============================================
// SANITATION
// ============================================

function createSanitationAlert() {

    addAlert(
        "New sanitation inspection required."
    );
}


function completeInspection(button) {

    button.disabled = true;

    button.textContent = "Completed";

    completedInspections++;

    updateSanitation();
}


function updateSanitation() {

    const pending =
        Math.max(
            0,
            inspectionZones.length -
            completedInspections
        );

    const pendingElement =
        document.getElementById("pendingInspections");

    const completedElement =
        document.getElementById("completedInspections");

    const alertElement =
        document.getElementById("sanitationAlerts");

    if (pendingElement) {
        pendingElement.textContent = pending;
    }

    if (completedElement) {
        completedElement.textContent =
            completedInspections;
    }

    if (alertElement) {
        alertElement.textContent =
            alerts.filter(alert =>
                alert.toLowerCase().includes("sanitation")
            ).length;
    }

    const zoneContainer =
        document.getElementById("sanitationZones");

    if (!zoneContainer) return;

    zoneContainer.innerHTML = "";

    inspectionZones.forEach((zone, index) => {

        const item =
            document.createElement("div");

        item.className = "sanitation-zone";

        item.innerHTML = `

            <div>
                <strong>${zone}</strong>
                <p>Sanitation inspection required</p>
            </div>

            <button
                class="secondary-btn"
                onclick="completeInspection(this)">
                Complete
            </button>

        `;

        zoneContainer.appendChild(item);
    });
}


// ============================================
// COLLECTION ROUTES
// ============================================

function generateRoute() {

    const routeList =
        document.getElementById("routeList");

    if (!routeList) return;

    const sortedBins =
        [...bins].sort(
            (a, b) => b.level - a.level
        );

    let high = 0;
    let medium = 0;
    let normal = 0;

    routeList.innerHTML = "";

    sortedBins.forEach((bin, index) => {

        let priority;
        let priorityClass;

        if (bin.level >= 80) {

            priority = "HIGH PRIORITY";
            priorityClass = "priority-high";

            high++;

        } else if (bin.level >= 60) {

            priority = "MEDIUM PRIORITY";
            priorityClass = "priority-medium";

            medium++;

        } else {

            priority = "NORMAL";
            priorityClass = "priority-normal";

            normal++;
        }

        const item =
            document.createElement("div");

        item.className = "route-item";

        item.innerHTML = `

            <div class="route-number">
                ${index + 1}
            </div>

            <div class="route-info">

                <strong>
                    ${bin.id} — ${bin.zone}
                </strong>

                <small>
                    Waste Level: ${bin.level}% |
                    Waste Type: ${bin.type}
                </small>

            </div>

            <span class="${priorityClass}">
                ${priority}
            </span>

        `;

        routeList.appendChild(item);
    });

    document.getElementById("highPriority").textContent =
        high;

    document.getElementById("mediumPriority").textContent =
        medium;

    document.getElementById("normalPriority").textContent =
        normal;
}


// ============================================
// UPDATE EVERYTHING
// ============================================

function updateAll() {

    renderDashboardBins();

    renderBins();

    updateStats();

    renderAlerts();

    renderCollectionTable();

    updateSanitation();
}


// ============================================
// START SYSTEM
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateAll();

        showSection("dashboard");

    }
);