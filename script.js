const startBtn = document.getElementById("startBtn");
const backBtn = document.getElementById("backBtn");

const home = document.getElementById("home");
const budgetSection = document.getElementById("budgetSection");

const budgetButtons = document.querySelectorAll(".budget-btn");
const customBudget = document.getElementById("customBudget");
const customBtn = document.getElementById("customBtn");


const builds = {
    3000: {
        cpu: "Ryzen 5 5500",
        gpu: "RX 6600",
        ram: "16GB DDR4",
        storage: "500GB NVMe SSD",
        psu: "550W",
        case: "Gaming Case",
        total: 2950
    },

    4000: {
        cpu: "Ryzen 5 5600",
        gpu: "RX 7600",
        ram: "16GB DDR4",
        storage: "1TB NVMe SSD",
        psu: "650W",
        case: "Gaming Case",
        total: 3950
    },

    5000: {
        cpu: "Ryzen 5 7600",
        gpu: "RX 7700 XT",
        ram: "32GB DDR5",
        storage: "1TB NVMe SSD",
        psu: "750W",
        case: "Airflow Gaming Case",
        total: 4950
    },

    6000: {
        cpu: "Ryzen 7 7700",
        gpu: "RX 7800 XT",
        ram: "32GB DDR5",
        storage: "1TB NVMe SSD",
        psu: "750W",
        case: "Premium Gaming Case",
        total: 5950
    },

    8000: {
        cpu: "Ryzen 7 7800X3D",
        gpu: "RTX 5070",
        ram: "32GB DDR5",
        storage: "2TB NVMe SSD",
        psu: "850W",
        case: "Premium Airflow Case",
        total: 7950
    },

    10000: {
        cpu: "Ryzen 7 9800X3D",
        gpu: "RTX 5080",
        ram: "32GB DDR5",
        storage: "2TB NVMe SSD",
        psu: "850W",
        case: "High-End Gaming Case",
        total: 9950
    }
};


/* START */

startBtn.addEventListener("click", function () {
    home.style.display = "none";
    budgetSection.style.display = "flex";
});


/* BACK */

backBtn.addEventListener("click", function () {
    budgetSection.style.display = "none";
    home.style.display = "flex";
});


/* SELECT BUDGET */

budgetButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const budget = Number(button.dataset.budget);

        showBuild(budget);

    });

});


/* CUSTOM BUDGET */

customBtn.addEventListener("click", function () {

    const budget = Number(customBudget.value);

    if (!budget || budget < 1000) {

        customBudget.style.borderColor = "#ef4444";

        customBudget.placeholder = "Minimum budget: 1000 DH";

        customBudget.focus();

        return;
    }

    customBudget.style.borderColor = "";

    showCustomBuild(budget);
});
customBudget.addEventListener("input", function () {

    customBudget.style.borderColor = "";

    customBudget.placeholder = "Enter custom budget";

});


function showBuild(budget) {

    const build = builds[budget];

    if (!build) {
        return;
    }

    showLoading(function () {
        displayBuild(build, budget);
    });
}


function showCustomBuild(budget) {
    budgetSection.style.display = "none";

    const customBuilder = document.getElementById("customBuilder");

    customBuilder.style.display = "block";

    builderBudget.value = budget;

    updateBuilderTotal();
}


function displayBuild(build, budget) {

    budgetSection.style.display = "none";

    const resultSection =
        document.getElementById("resultSection");

    resultSection.style.display = "block";

    document.getElementById("budgetText").textContent =
        "Recommended configuration for " + budget + " DH";

    document.getElementById("cpu").textContent =
        build.cpu;

    document.getElementById("gpu").textContent =
        build.gpu;

    document.getElementById("ram").textContent =
        build.ram;

    document.getElementById("storage").textContent =
        build.storage;

    document.getElementById("psu").textContent =
        build.psu;

    document.getElementById("case").textContent =
        build.case;

    document.getElementById("total").textContent =
        build.total + " DH";
}


document.getElementById("resultBackBtn").addEventListener(
    "click",
    function () {

        document.getElementById("resultSection").style.display =
            "none";

        budgetSection.style.display = "flex";
    }
);// CUSTOM BUILDER

const builderBudget = document.getElementById("builderBudget");

const cpuSelect = document.getElementById("cpuSelect");
const gpuSelect = document.getElementById("gpuSelect");
const ramSelect = document.getElementById("ramSelect");
const storageSelect = document.getElementById("storageSelect");
const psuSelect = document.getElementById("psuSelect");
const caseSelect = document.getElementById("caseSelect");

const builderTotal = document.getElementById("builderTotal");
const budgetStatus = document.getElementById("budgetStatus");

const checkBuildBtn = document.getElementById("checkBuildBtn");

function updateBuilderTotal() {

    const cpu = Number(cpuSelect.value);
    const gpu = Number(gpuSelect.value);
    const ram = Number(ramSelect.value);
    const storage = Number(storageSelect.value);
    const psu = Number(psuSelect.value);
    const pcCase = Number(caseSelect.value);

    const total = cpu + gpu + ram + storage + psu + pcCase;

    builderTotal.textContent = total + " DH";

    const budget = Number(builderBudget.value);

    if (!budget) {
        budgetStatus.textContent = "Enter your budget.";
        return;
    }

    if (total > budget) {
        budgetStatus.textContent =
            "⚠️ Build is over budget by " + (total - budget) + " DH";
    } else {
        budgetStatus.textContent =
            "✅ You have " + (budget - total) + " DH remaining.";
    }
}

cpuSelect.addEventListener("change", updateBuilderTotal);
gpuSelect.addEventListener("change", updateBuilderTotal);
ramSelect.addEventListener("change", updateBuilderTotal);
storageSelect.addEventListener("change", updateBuilderTotal);
psuSelect.addEventListener("change", updateBuilderTotal);
caseSelect.addEventListener("change", updateBuilderTotal);
builderBudget.addEventListener("input", updateBuilderTotal);

checkBuildBtn.addEventListener("click", function () {

    const budget = Number(builderBudget.value);

    if (!budget || budget < 1000) {
        alert("Please enter a valid budget.");
        return;
    }

    const cpuName = cpuSelect.options[cpuSelect.selectedIndex].text;
    const gpuName = gpuSelect.options[gpuSelect.selectedIndex].text;
    const ramName = ramSelect.options[ramSelect.selectedIndex].text;
    const storageName = storageSelect.options[storageSelect.selectedIndex].text;
    const psuName = psuSelect.options[psuSelect.selectedIndex].text;
    const caseName = caseSelect.options[caseSelect.selectedIndex].text;

    const total = Number(builderTotal.textContent.replace(" DH", ""));

    document.getElementById("summaryCpu").textContent = cpuName;
    document.getElementById("summaryGpu").textContent = gpuName;
    document.getElementById("summaryRam").textContent = ramName;
    document.getElementById("summaryStorage").textContent = storageName;
    document.getElementById("summaryPsu").textContent = psuName;
    document.getElementById("summaryCase").textContent = caseName;
    document.getElementById("summaryTotal").textContent = total + " DH";

    document.getElementById("buildSummary").style.display = "block";

    document.getElementById("buildSummary").scrollIntoView({
        behavior: "smooth"
    });
});// COMPATIBILITY CHECK

function checkCompatibility() {
    const cpu = cpuSelect.options[cpuSelect.selectedIndex].text;
    const gpu = gpuSelect.options[gpuSelect.selectedIndex].text;
    const ram = ramSelect.options[ramSelect.selectedIndex].text;
    const psu = psuSelect.options[psuSelect.selectedIndex].text;

    const status = document.getElementById("compatibilityStatus");
    const message = document.getElementById("compatibilityMessage");
    const box = document.getElementById("compatibilityBox");

    const psuValue = Number(psu.match(/\d+/)[0]);

    let compatible = true;
    let warnings = [];

    // Check required components
    if (
        cpuSelect.value === "0" ||
        gpuSelect.value === "0" ||
        ramSelect.value === "0" ||
        storageSelect.value === "0" ||
        psuSelect.value === "0" ||
        caseSelect.value === "0"
    ) {
        compatible = false;
        warnings.push("Please select all components.");
    }

    // DDR4 CPUs
    if (
        (
            cpu.includes("Ryzen 5 3600") ||
            cpu.includes("Ryzen 5 5500") ||
            cpu.includes("Ryzen 5 5600") ||
            cpu.includes("Ryzen 7 5700X")
        ) &&
        ram.includes("DDR5")
    ) {
        compatible = false;
        warnings.push("This CPU requires DDR4 RAM.");
    }

    // DDR5 CPUs
    if (
        (
            cpu.includes("Ryzen 5 7600") ||
            cpu.includes("Ryzen 7 7700") ||
            cpu.includes("Ryzen 7 7800X3D")
        ) &&
        ram.includes("DDR4")
    ) {
        compatible = false;
        warnings.push("This CPU requires DDR5 RAM.");
    }

    // GPU PSU requirements
    if (gpu.includes("GTX 1660 Super") && psuValue < 450) {
        compatible = false;
        warnings.push("GTX 1660 Super needs at least a 450W PSU.");
    }

    if (gpu.includes("RX 6600") && psuValue < 550) {
        compatible = false;
        warnings.push("RX 6600 needs at least a 550W PSU.");
    }

    if (gpu.includes("RTX 3060") && psuValue < 550) {
        compatible = false;
        warnings.push("RTX 3060 needs at least a 550W PSU.");
    }

    if (gpu.includes("RX 7600") && psuValue < 550) {
        compatible = false;
        warnings.push("RX 7600 needs at least a 550W PSU.");
    }

    if (gpu.includes("RTX 4060") && psuValue < 550) {
        compatible = false;
        warnings.push("RTX 4060 needs at least a 550W PSU.");
    }

    if (gpu.includes("RX 7700 XT") && psuValue < 750) {
        compatible = false;
        warnings.push("RX 7700 XT needs at least a 750W PSU.");
    }

    if (gpu.includes("RTX 4070") && psuValue < 650) {
        compatible = false;
        warnings.push("RTX 4070 needs at least a 650W PSU.");
    }

    if (gpu.includes("RTX 5070") && psuValue < 650) {
        compatible = false;
        warnings.push("RTX 5070 needs at least a 650W PSU.");
    }

    box.style.display = "block";

    if (compatible) {
        status.textContent = "🟢 BUILD IS COMPATIBLE";
        message.textContent =
            "All selected components are compatible and ready to build.";
    } else {
        status.textContent = "🔴 COMPATIBILITY ISSUE";
        message.innerHTML = warnings
            .map(function (warning) {
                return "⚠️ " + warning;
            })
            .join("<br>");
    }

    box.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}
checkBuildBtn.addEventListener("click", function () {

    checkCompatibility();
    calculatePerformanceScore();
    calculateBuildRating();
    // BUILD RATING ⭐

function calculateBuildRating() {

    const cpu = cpuSelect.options[cpuSelect.selectedIndex].text;
    const gpu = gpuSelect.options[gpuSelect.selectedIndex].text;
    const ram = ramSelect.options[ramSelect.selectedIndex].text;
    const storage = storageSelect.options[storageSelect.selectedIndex].text;

    // Check if components are selected
    if (
        cpuSelect.value === "0" ||
        gpuSelect.value === "0" ||
        ramSelect.value === "0" ||
        storageSelect.value === "0" ||
        psuSelect.value === "0" ||
        caseSelect.value === "0"
    ) {
        document.getElementById("buildRating").textContent = "0 / 10";
        document.getElementById("buildRatingText").textContent =
            "Waiting for build data...";
        return;
    }

    let cpuRating = 0;
    let gpuRating = 0;
    let ramRating = 0;
    let storageRating = 0;

    // CPU Rating
    if (cpu.includes("Ryzen 5 3600")) cpuRating = 5.5;
    else if (cpu.includes("Ryzen 5 5500")) cpuRating = 6;
    else if (cpu.includes("Ryzen 5 5600")) cpuRating = 6.8;
    else if (cpu.includes("Ryzen 7 5700X")) cpuRating = 7.5;
    else if (cpu.includes("Ryzen 5 7600")) cpuRating = 8.2;
    else if (cpu.includes("Ryzen 7 7700")) cpuRating = 8.8;
    else if (cpu.includes("Ryzen 7 7800X3D")) cpuRating = 9.5;
    else if (cpu.includes("Ryzen 7 9800X3D")) cpuRating = 10;

    // GPU Rating
    if (gpu.includes("GTX 1660 Super")) gpuRating = 5;
    else if (gpu.includes("RX 6600")) gpuRating = 6;
    else if (gpu.includes("RTX 3060")) gpuRating = 6.5;
    else if (gpu.includes("RX 7600")) gpuRating = 7;
    else if (gpu.includes("RTX 4060")) gpuRating = 7.3;
    else if (gpu.includes("RX 7700 XT")) gpuRating = 8.2;
    else if (gpu.includes("RTX 4070")) gpuRating = 9;
    else if (gpu.includes("RTX 5070")) gpuRating = 9.5;
    else if (gpu.includes("RTX 5080")) gpuRating = 10;

    // RAM Rating
    if (ram.includes("8GB")) ramRating = 4;
    else if (ram.includes("16GB")) ramRating = 7;
    else if (ram.includes("32GB")) ramRating = 9;
    else if (ram.includes("64GB")) ramRating = 10;

    // Storage Rating
    if (storage.includes("256GB")) storageRating = 5;
    else if (storage.includes("500GB")) storageRating = 7;
    else if (storage.includes("1TB")) storageRating = 9;
    else if (storage.includes("2TB")) storageRating = 10;

    // Final Rating
    let rating =
        cpuRating * 0.30 +
        gpuRating * 0.40 +
        ramRating * 0.15 +
        storageRating * 0.10 +
        0.5;

    // Maximum 10
    if (rating > 10) rating = 10;

    // Round to 1 decimal
    rating = Math.round(rating * 10) / 10;

    document.getElementById("buildRating").textContent =
        rating + " / 10";

    // Rating description
    let ratingText = "";

    if (rating >= 9.5) {
        ratingText = "🔥 Outstanding build";
    } else if (rating >= 9) {
        ratingText = "🚀 Excellent build";
    } else if (rating >= 8) {
        ratingText = "💪 Very strong build";
    } else if (rating >= 7) {
        ratingText = "👍 Good build";
    } else if (rating >= 6) {
        ratingText = "👌 Decent build";
    } else if (rating >= 5) {
        ratingText = "⚡ Average build";
    } else {
        ratingText = "🔧 Entry-level build";
    }

    document.getElementById("buildRatingText").textContent =
        ratingText;
}
    function calculateFPS() {
    const gpu = gpuSelect.options[gpuSelect.selectedIndex].text;

    let fps = 0;

    if (gpu.includes("GTX 1660 Super")) fps = 75;
    else if (gpu.includes("RX 6600")) fps = 100;
    else if (gpu.includes("RTX 3060")) fps = 110;
    else if (gpu.includes("RX 7600")) fps = 120;
    else if (gpu.includes("RTX 4060")) fps = 125;
    else if (gpu.includes("RX 7700 XT")) fps = 150;
    else if (gpu.includes("RTX 4070")) fps = 170;
    else if (gpu.includes("RTX 5070")) fps = 190;

    if (fps === 0) {
        document.getElementById("fpsEstimate").textContent = "-- FPS";
        document.getElementById("fpsText").textContent =
            "Select a GPU to estimate gaming performance.";
        return;
    }

    document.getElementById("fpsEstimate").textContent =
        fps + " FPS";

    document.getElementById("fpsText").textContent =
        "Estimated gaming performance at 1080p.";
}
    calculateFPS();
});
function calculatePerformanceScore() {
    const cpu = cpuSelect.options[cpuSelect.selectedIndex].text;
    const gpu = gpuSelect.options[gpuSelect.selectedIndex].text;
    const ram = ramSelect.options[ramSelect.selectedIndex].text;

    let cpuScore = 0;
    let gpuScore = 0;
    let ramScore = 0;

    // CPU score
    if (cpu.includes("Ryzen 5 3600")) cpuScore = 55;
    else if (cpu.includes("Ryzen 5 5500")) cpuScore = 60;
    else if (cpu.includes("Ryzen 5 5600")) cpuScore = 68;
    else if (cpu.includes("Ryzen 7 5700X")) cpuScore = 75;
    else if (cpu.includes("Ryzen 5 7600")) cpuScore = 82;
    else if (cpu.includes("Ryzen 7 7700")) cpuScore = 88;
    else if (cpu.includes("Ryzen 7 7800X3D")) cpuScore = 95;

    // GPU score
    if (gpu.includes("GTX 1660 Super")) gpuScore = 50;
    else if (gpu.includes("RX 6600")) gpuScore = 60;
    else if (gpu.includes("RTX 3060")) gpuScore = 65;
    else if (gpu.includes("RX 7600")) gpuScore = 70;
    else if (gpu.includes("RTX 4060")) gpuScore = 73;
    else if (gpu.includes("RX 7700 XT")) gpuScore = 82;
    else if (gpu.includes("RTX 4070")) gpuScore = 90;
    else if (gpu.includes("RTX 5070")) gpuScore = 95;

    // RAM score
    if (ram.includes("8GB")) ramScore = 40;
    else if (ram.includes("16GB")) ramScore = 70;
    else if (ram.includes("32GB")) ramScore = 90;
    else if (ram.includes("64GB")) ramScore = 100;

    // Final score
    let score = Math.round(
        cpuScore * 0.35 +
        gpuScore * 0.50 +
        ramScore * 0.15
    );

    if (score > 100) score = 100;

    document.getElementById("performanceScore").textContent =
        score + " / 100";

    let text = "";

    if (score >= 90) {
        text = "🔥 Extreme performance";
    } else if (score >= 80) {
        text = "🚀 Excellent performance";
    } else if (score >= 70) {
        text = "💪 Very good performance";
    } else if (score >= 60) {
        text = "👍 Good performance";
    } else {
        text = "⚡ Entry-level performance";
    }

    document.getElementById("performanceText").textContent = text;
}
// USAGE SELECTOR

const usageButtons = document.querySelectorAll(".usage-btn");

let selectedUsage = "gaming";

usageButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        usageButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedUsage = button.dataset.usage;

applyUsageRecommendation();
    });

});
// SMART RECOMMENDATION

function applyUsageRecommendation() {

    if (selectedUsage === "gaming") {

        gpuSelect.value = "1400";

    } else if (selectedUsage === "streaming") {

        cpuSelect.value = "1100";
        gpuSelect.value = "1900";

    } else if (selectedUsage === "editing") {

        cpuSelect.value = "1600";
        ramSelect.value = "1100";
        storageSelect.value = "950";

    }

    updateBuilderTotal();
}
// LOADING SCREEN

const loadingScreen = document.getElementById("loadingScreen");

function showLoading(callback) {

    loadingScreen.style.display = "flex";

    setTimeout(function () {

        loadingScreen.style.display = "none";

        callback();

    }, 700);
}