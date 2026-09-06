// ==========================================
// PC BUILD CALCULATOR
// SCRIPT.JS - CLEAN VERSION
// ==========================================

"use strict";

// ==========================================
// ELEMENTS
// ==========================================

const startBtn = document.getElementById("startBtn");

const budgetButtons = document.querySelectorAll(".budget-btn");
const customBudget = document.getElementById("customBudget");
const customBtn = document.getElementById("customBtn");

const recommendedBuild = document.getElementById("recommendedBuild");
const recommendedTitle = document.getElementById("recommendedTitle");
const recommendedCpu = document.getElementById("recommendedCpu");
const recommendedGpu = document.getElementById("recommendedGpu");
const recommendedRam = document.getElementById("recommendedRam");
const recommendedStorage = document.getElementById("recommendedStorage");
const recommendedPsu = document.getElementById("recommendedPsu");
const recommendedCase = document.getElementById("recommendedCase");
const recommendedTotal = document.getElementById("recommendedTotal");

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

const compatibilityBox =
    document.getElementById("compatibilityBox");

const compatibilityTitle =
    document.getElementById("compatibilityTitle");

const compatibilityText =
    document.getElementById("compatibilityText");

const buildSummary =
    document.getElementById("buildSummary");


// ==========================================
// RECOMMENDED BUILDS
// ==========================================

const builds = {

    3000: {
        title: "ENTRY GAMING BUILD",
        cpu: "AMD Ryzen 5 5600",
        gpu: "PNY RTX 5050 8GB",
        ram: "16GB DDR4",
        storage: "500GB NVMe",
        psu: "550W 80+ Bronze",
        case: "MSI MAG FORGE M100A RGB",
        total: 7194
    },

    4000: {
        title: "BUDGET GAMING BUILD",
        cpu: "AMD Ryzen 5 5600",
        gpu: "PNY RTX 5050 8GB",
        ram: "16GB DDR4",
        storage: "500GB NVMe",
        psu: "550W 80+ Bronze",
        case: "MSI MAG FORGE M100A RGB",
        total: 7194
    },

    5000: {
        title: "BALANCED GAMING BUILD",
        cpu: "AMD Ryzen 5 5600",
        gpu: "PNY RTX 5050 8GB",
        ram: "16GB DDR4",
        storage: "500GB NVMe",
        psu: "550W 80+ Bronze",
        case: "MSI MAG FORGE M100A RGB",
        total: 7194
    },

    6000: {
        title: "STRONG GAMING BUILD",
        cpu: "AMD Ryzen 5 5600",
        gpu: "XFX RX 7600 8GB",
        ram: "16GB DDR4",
        storage: "500GB NVMe",
        psu: "550W 80+ Bronze",
        case: "MSI MAG FORGE M100A RGB",
        total: 7343
    },

    8000: {
        title: "HIGH PERFORMANCE BUILD",
        cpu: "AMD Ryzen 7 5700X",
        gpu: "Gigabyte RX 9060 XT 16GB",
        ram: "32GB DDR4",
        storage: "1TB NVMe",
        psu: "750W 80+ Bronze",
        case: "MSI MAG FORGE M100A RGB",
        total: 16292
    },

    10000: {
        title: "HIGH-END GAMING BUILD",
        cpu: "AMD Ryzen 7 5700X",
        gpu: "MSI RTX 5070 12GB",
        ram: "32GB DDR4",
        storage: "1TB NVMe",
        psu: "750W 80+ Bronze",
        case: "MSI MAG FORGE M100A RGB",
        total: 16892
    }

};


// ==========================================
// START BUTTON
// ==========================================

if (startBtn) {

    startBtn.addEventListener("click", function () {

        const calculator =
            document.getElementById("calculator");

        if (calculator) {
            calculator.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}


// ==========================================
// SHOW RECOMMENDED BUILD
// ==========================================

function showRecommendedBuild(budget) {

    if (!recommendedBuild) return;

    let build = builds[budget];

    if (!build) {

        const budgets =
            Object.keys(builds)
                .map(Number)
                .sort((a, b) => a - b);

        let closestBudget = budgets[0];

        budgets.forEach(function (value) {

            if (
                Math.abs(value - budget) <
                Math.abs(closestBudget - budget)
            ) {
                closestBudget = value;
            }

        });

        build = builds[closestBudget];

        if (recommendedTitle) {
            recommendedTitle.textContent =
                "Closest recommendation for " +
                budget.toLocaleString() +
                " DH";
        }

    } else {

        if (recommendedTitle) {
            recommendedTitle.textContent =
                build.title;
        }

    }


    if (recommendedCpu)
        recommendedCpu.textContent = build.cpu;

    if (recommendedGpu)
        recommendedGpu.textContent = build.gpu;

    if (recommendedRam)
        recommendedRam.textContent = build.ram;

    if (recommendedStorage)
        recommendedStorage.textContent = build.storage;

    if (recommendedPsu)
        recommendedPsu.textContent = build.psu;

    if (recommendedCase)
        recommendedCase.textContent = build.case;

    if (recommendedTotal)
        recommendedTotal.textContent =
            build.total.toLocaleString() + " DH";


    recommendedBuild.style.display = "block";


    if (builderBudget) {
        builderBudget.value = budget;
    }

}


// ==========================================
// BUDGET BUTTONS
// ==========================================

budgetButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        budgetButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        const budget =
            Number(this.dataset.budget);

        if (customBudget) {
            customBudget.value = budget;
        }

        showRecommendedBuild(budget);

    });

});


// ==========================================
// CUSTOM BUDGET
// ==========================================

if (customBtn) {

    customBtn.addEventListener("click", function () {

        const budget =
            Number(customBudget.value);

        if (!budget || budget < 1000) {

            alert(
                "Please enter a valid budget of at least 1,000 DH."
            );

            return;
        }


        budgetButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });


        showRecommendedBuild(budget);

    });

}


// ==========================================
// GET SELECTED TEXT
// ==========================================

function getSelectedText(select) {

    if (!select) {
        return "Not selected";
    }

    if (
        select.selectedIndex === -1 ||
        select.value === "0" ||
        select.value === ""
    ) {
        return "Not selected";
    }

    return select.options[
        select.selectedIndex
    ].text;

}


// ==========================================
// BUILDER TOTAL
// ==========================================

function updateBuilderTotal() {

    if (
        !cpuSelect ||
        !gpuSelect ||
        !ramSelect ||
        !storageSelect ||
        !psuSelect ||
        !caseSelect
    ) {
        return;
    }


    const total =
        Number(cpuSelect.value || 0) +
        Number(gpuSelect.value || 0) +
        Number(ramSelect.value || 0) +
        Number(storageSelect.value || 0) +
        Number(psuSelect.value || 0) +
        Number(caseSelect.value || 0);


    if (builderTotal) {
        builderTotal.textContent =
            total.toLocaleString() + " DH";
    }


    const budget =
        Number(builderBudget?.value || 0);


    if (!budget) {

        if (budgetStatus) {
            budgetStatus.textContent =
                "Enter your budget";

            budgetStatus.className = "";
        }

        return;
    }


    if (total === 0) {

        if (budgetStatus) {
            budgetStatus.textContent =
                "Select your components";

            budgetStatus.className = "";
        }

        return;
    }


    if (total <= budget) {

        if (budgetStatus) {
            budgetStatus.textContent =
                "✅ Within budget";

            budgetStatus.className =
                "budget-good";
        }

    } else {

        const difference =
            total - budget;

        if (budgetStatus) {
            budgetStatus.textContent =
                "⚠️ Over budget by " +
                difference.toLocaleString() +
                " DH";

            budgetStatus.className =
                "budget-bad";
        }

    }

}


// ==========================================
// COMPONENT EVENTS
// ==========================================

[
    cpuSelect,
    gpuSelect,
    ramSelect,
    storageSelect,
    psuSelect,
    caseSelect
].forEach(function (select) {

    if (select) {
        select.addEventListener(
            "change",
            updateBuilderTotal
        );
    }

});


if (builderBudget) {

    builderBudget.addEventListener(
        "input",
        updateBuilderTotal
    );

}


// ==========================================
// COMPATIBILITY CHECK
// ==========================================

function checkCompatibility() {

    if (
        !cpuSelect ||
        !gpuSelect ||
        !ramSelect ||
        !storageSelect ||
        !psuSelect ||
        !caseSelect
    ) {
        return false;
    }


    const cpu =
        getSelectedText(cpuSelect);

    const gpu =
        getSelectedText(gpuSelect);

    const ram =
        getSelectedText(ramSelect);

    const storage =
        getSelectedText(storageSelect);

    const psu =
        getSelectedText(psuSelect);

    const pcCase =
        getSelectedText(caseSelect);


    if (
        cpu === "Not selected" ||
        gpu === "Not selected" ||
        ram === "Not selected" ||
        storage === "Not selected" ||
        psu === "Not selected" ||
        pcCase === "Not selected"
    ) {

        if (compatibilityBox)
            compatibilityBox.style.display = "block";

        if (compatibilityTitle)
            compatibilityTitle.textContent =
                "⚠️ INCOMPLETE BUILD";

        if (compatibilityText)
            compatibilityText.textContent =
                "Please select all components before checking compatibility.";

        return false;
    }


    const errors = [];


    // ======================================
    // CPU + RAM
    // ======================================

    const ddr4CPUs = [
        "Ryzen 5 5600",
        "Ryzen 5 5600 MPK",
        "Ryzen 7 5700X",
        "Ryzen 7 5700"
    ];


    const ddr5CPUs = [
        "Ryzen 5 7600",
        "Ryzen 7 7700",
        "Ryzen 7 7800X3D"
    ];


    const isDDR4CPU =
        ddr4CPUs.some(function (name) {
            return cpu.includes(name);
        });


    const isDDR5CPU =
        ddr5CPUs.some(function (name) {
            return cpu.includes(name);
        });


    if (
        isDDR4CPU &&
        !ram.includes("DDR4")
    ) {

        errors.push(
            "This CPU requires DDR4 RAM."
        );

    }


    if (
        isDDR5CPU &&
        !ram.includes("DDR5")
    ) {

        errors.push(
            "This CPU requires DDR5 RAM."
        );

    }


    // ======================================
    // GPU + PSU
    // ======================================

    let requiredWattage = 0;


    if (gpu.includes("GTX 1660")) {

        requiredWattage = 450;

    }

    else if (gpu.includes("RX 6600")) {

        requiredWattage = 550;

    }

    else if (gpu.includes("RTX 3060")) {

        requiredWattage = 550;

    }

    else if (gpu.includes("RX 7600")) {

        requiredWattage = 550;

    }

    else if (gpu.includes("RTX 4060")) {

        requiredWattage = 550;

    }

    else if (gpu.includes("RTX 5050")) {

        requiredWattage = 550;

    }

    else if (gpu.includes("RTX 5060")) {

        requiredWattage = 550;

    }

    else if (gpu.includes("RX 7700 XT")) {

        requiredWattage = 750;

    }

    else if (gpu.includes("RX 9060 XT")) {

        requiredWattage = 650;

    }

    else if (gpu.includes("RTX 4070")) {

        requiredWattage = 650;

    }

    else if (gpu.includes("RTX 5070")) {

        requiredWattage = 650;

    }


    const psuMatch =
        psu.match(/\d+/);


    const psuWattage =
        psuMatch
            ? Number(psuMatch[0])
            : 0;


    if (
        requiredWattage > 0 &&
        psuWattage < requiredWattage
    ) {

        errors.push(
            gpu.split("—")[0].trim() +
            " requires at least " +
            requiredWattage +
            "W PSU."
        );

    }


    // ======================================
    // SHOW RESULT
    // ======================================

    if (compatibilityBox) {
        compatibilityBox.style.display =
            "block";
    }


    if (errors.length === 0) {

        if (compatibilityTitle)
            compatibilityTitle.textContent =
                "✅ BUILD IS COMPATIBLE";

        if (compatibilityText)
            compatibilityText.textContent =
                "All selected components appear compatible.";

        compatibilityBox?.classList.remove(
            "compatibility-error"
        );

        compatibilityBox?.classList.add(
            "compatibility-success"
        );

        return true;

    }


    if (compatibilityTitle)
        compatibilityTitle.textContent =
            "❌ COMPATIBILITY ISSUES";


    if (compatibilityText) {

        compatibilityText.innerHTML =
            errors
                .map(function (error) {
                    return "• " + error;
                })
                .join("<br>");

    }


    compatibilityBox?.classList.remove(
        "compatibility-success"
    );

    compatibilityBox?.classList.add(
        "compatibility-error"
    );


    return false;

}


// ==========================================
// PERFORMANCE SCORE
// ==========================================

function calculatePerformanceScore() {

    const cpu =
        getSelectedText(cpuSelect);

    const gpu =
        getSelectedText(gpuSelect);

    const ram =
        getSelectedText(ramSelect);


    let cpuScore = 0;
    let gpuScore = 0;
    let ramScore = 0;


    // CPU

    if (cpu.includes("Ryzen 5 5600")) {

        cpuScore = 68;

    }

    else if (cpu.includes("Ryzen 7 5700X")) {

        cpuScore = 75;

    }

    else if (cpu.includes("Ryzen 7 5700")) {

        cpuScore = 73;

    }

    else if (cpu.includes("Ryzen 5 7600")) {

        cpuScore = 82;

    }

    else if (cpu.includes("Ryzen 7 7700")) {

        cpuScore = 88;

    }

    else if (cpu.includes("Ryzen 7 7800X3D")) {

        cpuScore = 95;

    }


    // GPU

    if (gpu.includes("GTX 1660")) {

        gpuScore = 50;

    }

    else if (gpu.includes("RX 6600")) {

        gpuScore = 60;

    }

    else if (gpu.includes("RTX 3060")) {

        gpuScore = 65;

    }

    else if (gpu.includes("RX 7600")) {

        gpuScore = 70;

    }

    else if (gpu.includes("RTX 4060")) {

        gpuScore = 73;

    }

    else if (gpu.includes("RTX 5050")) {

        gpuScore = 62;

    }

    else if (gpu.includes("RTX 5060")) {

        gpuScore = 76;

    }

    else if (gpu.includes("RX 7700 XT")) {

        gpuScore = 82;

    }

    else if (gpu.includes("RX 9060 XT")) {

        gpuScore = 88;

    }

    else if (gpu.includes("RTX 4070")) {

        gpuScore = 90;

    }

    else if (gpu.includes("RTX 5070")) {

        gpuScore = 95;

    }


    // RAM

    if (ram.includes("8GB")) {

        ramScore = 40;

    }

    else if (ram.includes("16GB")) {

        ramScore = 70;

    }

    else if (ram.includes("32GB")) {

        ramScore = 90;

    }

    else if (ram.includes("64GB")) {

        ramScore = 100;

    }


    let score =
        Math.round(
            cpuScore * 0.35 +
            gpuScore * 0.50 +
            ramScore * 0.15
        );


    score =
        Math.min(
            100,
            Math.max(0, score)
        );


    const scoreElement =
        document.getElementById(
            "performanceScore"
        );

    const textElement =
        document.getElementById(
            "performanceText"
        );


    if (scoreElement) {
        scoreElement.textContent =
            score + " / 100";
    }


    let text;


    if (score >= 90) {

        text = "🔥 Extreme performance";

    }

    else if (score >= 80) {

        text = "🚀 Excellent performance";

    }

    else if (score >= 70) {

        text = "💪 Very good performance";

    }

    else if (score >= 60) {

        text = "👍 Good performance";

    }

    else {

        text = "⚡ Entry-level performance";

    }


    if (textElement) {
        textElement.textContent = text;
    }


    return score;

}


// ==========================================
// FPS ESTIMATOR
// ==========================================

function calculateFPS() {

    const gpu =
        getSelectedText(gpuSelect);


    let fps = 0;


    if (gpu.includes("GTX 1660")) {

        fps = 75;

    }

    else if (gpu.includes("RX 6600")) {

        fps = 100;

    }

    else if (gpu.includes("RTX 3060")) {

        fps = 110;

    }

    else if (gpu.includes("RX 7600")) {

        fps = 120;

    }

    else if (gpu.includes("RTX 4060")) {

        fps = 125;

    }

    else if (gpu.includes("RTX 5050")) {

        fps = 90;

    }

    else if (gpu.includes("RTX 5060")) {

        fps = 130;

    }

    else if (gpu.includes("RX 7700 XT")) {

        fps = 150;

    }

    else if (gpu.includes("RX 9060 XT")) {

        fps = 155;

    }

    else if (gpu.includes("RTX 4070")) {

        fps = 170;

    }

    else if (gpu.includes("RTX 5070")) {

        fps = 190;

    }


    const fpsElement =
        document.getElementById(
            "fpsEstimate"
        );

    const fpsText =
        document.getElementById(
            "fpsText"
        );


    if (fps === 0) {

        if (fpsElement)
            fpsElement.textContent =
                "-- FPS";

        if (fpsText)
            fpsText.textContent =
                "Select a GPU to estimate gaming performance.";

        return;

    }


    if (fpsElement)
        fpsElement.textContent =
            fps + " FPS";


    if (fpsText)
        fpsText.textContent =
            "Estimated gaming performance at 1080p.";

}


// ==========================================
// BUILD RATING
// ==========================================

function calculateBuildRating() {

    const scoreElement =
        document.getElementById(
            "performanceScore"
        );

    const ratingElement =
        document.getElementById(
            "buildRating"
        );

    const ratingTextElement =
        document.getElementById(
            "buildRatingText"
        );


    if (!scoreElement) return;


    const score =
        Number(
            scoreElement.textContent
                .replace(" / 100", "")
        );


    if (!score) {

        if (ratingElement)
            ratingElement.textContent = "--";

        return;

    }


    const rating =
        Math.min(
            10,
            Math.max(
                1,
                score / 10
            )
        );


    if (ratingElement) {

        ratingElement.textContent =
            rating.toFixed(1) +
            " / 10";

    }


    let text;


    if (rating >= 9) {

        text = "🔥 Exceptional build";

    }

    else if (rating >= 8) {

        text = "💪 Very strong build";

    }

    else if (rating >= 7) {

        text = "👍 Good build";

    }

    else if (rating >= 6) {

        text = "⚡ Decent build";

    }

    else {

        text = "🔧 Needs improvement";

    }


    if (ratingTextElement) {
        ratingTextElement.textContent = text;
    }

}


// ==========================================
// BUILD QUALITY
// ==========================================

function calculateBuildQuality() {

    const scoreElement =
        document.getElementById(
            "performanceScore"
        );

    const quality =
        document.getElementById(
            "buildQuality"
        );

    const qualityText =
        document.getElementById(
            "buildQualityText"
        );


    if (!scoreElement) return;


    const score =
        Number(
            scoreElement.textContent
                .replace(" / 100", "")
        );


    if (score >= 90) {

        quality.textContent =
            "🟢 EXCELLENT";

        qualityText.textContent =
            "Powerful and well-balanced build.";

    }

    else if (score >= 80) {

        quality.textContent =
            "🟢 VERY GOOD";

        qualityText.textContent =
            "Strong build for demanding tasks.";

    }

    else if (score >= 70) {

        quality.textContent =
            "🟡 GOOD";

        qualityText.textContent =
            "Good overall performance.";

    }

    else if (score >= 60) {

        quality.textContent =
            "🟡 DECENT";

        qualityText.textContent =
            "Good for everyday gaming and use.";

    }

    else {

        quality.textContent =
            "🔴 NEEDS IMPROVEMENT";

        qualityText.textContent =
            "Consider upgrading some components.";

    }

}


// ==========================================
// UPGRADE SUGGESTIONS
// ==========================================

function calculateUpgradeSuggestions() {

    const cpu =
        getSelectedText(cpuSelect);

    const gpu =
        getSelectedText(gpuSelect);

    const ram =
        getSelectedText(ramSelect);

    const storage =
        getSelectedText(storageSelect);


    const title =
        document.getElementById(
            "upgradeTitle"
        );

    const text =
        document.getElementById(
            "upgradeText"
        );


    if (!title || !text) return;


    if (ram.includes("8GB")) {

        title.textContent =
            "🧠 RAM UPGRADE";

        text.textContent =
            "Upgrade to 16GB or more for smoother gaming and multitasking.";

    }

    else if (
        storage.includes("256GB") ||
        storage.includes("500GB")
    ) {

        title.textContent =
            "💾 STORAGE UPGRADE";

        text.textContent =
            "Consider upgrading to 1TB or more for games and applications.";

    }

    else if (
        gpu.includes("GTX 1660") ||
        gpu.includes("RX 6600") ||
        gpu.includes("RTX 5050")
    ) {

        title.textContent =
            "🎮 GPU UPGRADE";

        text.textContent =
            "A stronger GPU can improve gaming performance at higher settings.";

    }

    else if (
        cpu.includes("Ryzen 5 5600")
    ) {

        title.textContent =
            "⚡ CPU UPGRADE";

        text.textContent =
            "For high-end gaming, consider a stronger CPU in the future.";

    }

    else {

        title.textContent =
            "🔥 GREAT BUILD";

        text.textContent =
            "Your current components are already well equipped. No major upgrade is needed.";

    }

}


// ==========================================
// BUILD SUMMARY
// ==========================================

function updateBuildSummary() {

    const fields = {

        summaryCpu: cpuSelect,
        summaryGpu: gpuSelect,
        summaryRam: ramSelect,
        summaryStorage: storageSelect,
        summaryPsu: psuSelect,
        summaryCase: caseSelect

    };


    Object.keys(fields).forEach(function (id) {

        const element =
            document.getElementById(id);

        const select =
            fields[id];

        if (element && select) {

            element.textContent =
                getSelectedText(select);

        }

    });


    const summaryTotal =
        document.getElementById(
            "summaryTotal"
        );


    if (summaryTotal && builderTotal) {

        summaryTotal.textContent =
            builderTotal.textContent;

    }


    if (buildSummary) {

        buildSummary.style.display =
            "block";

    }

}


// ==========================================
// CHECK BUILD
// ==========================================

if (checkBuildBtn) {

    checkBuildBtn.addEventListener(
        "click",
        function () {

            const compatible =
                checkCompatibility();

            calculatePerformanceScore();

            calculateFPS();

            calculateBuildRating();

            calculateBuildQuality();

            calculateUpgradeSuggestions();

            updateBuildSummary();


            if (
                compatible &&
                buildSummary
            ) {

                buildSummary.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


// ==========================================
// SAVE BUILD
// ==========================================

function saveBuild() {

    const build = {

        cpu: cpuSelect?.value || "0",
        gpu: gpuSelect?.value || "0",
        ram: ramSelect?.value || "0",
        storage: storageSelect?.value || "0",
        psu: psuSelect?.value || "0",
        case: caseSelect?.value || "0",
        budget: builderBudget?.value || ""

    };


    localStorage.setItem(
        "savedPCBuild",
        JSON.stringify(build)
    );


    const message =
        document.getElementById(
            "saveBuildMessage"
        );


    if (message) {

        message.textContent =
            "✅ Build saved successfully!";

    }

}


const saveBuildBtn =
    document.getElementById(
        "saveBuildBtn"
    );


if (saveBuildBtn) {

    saveBuildBtn.addEventListener(
        "click",
        saveBuild
    );

}


// ==========================================
// LOAD BUILD
// ==========================================

function loadBuild() {

    const savedBuild =
        localStorage.getItem(
            "savedPCBuild"
        );


    const message =
        document.getElementById(
            "saveBuildMessage"
        );


    if (!savedBuild) {

        if (message) {

            message.textContent =
                "⚠️ No saved build found.";

        }

        return;

    }


    try {

        const build =
            JSON.parse(savedBuild);


        if (builderBudget)
            builderBudget.value =
                build.budget || "";


        if (cpuSelect)
            cpuSelect.value =
                build.cpu || "0";


        if (gpuSelect)
            gpuSelect.value =
                build.gpu || "0";


        if (ramSelect)
            ramSelect.value =
                build.ram || "0";


        if (storageSelect)
            storageSelect.value =
                build.storage || "0";


        if (psuSelect)
            psuSelect.value =
                build.psu || "0";


        if (caseSelect)
            caseSelect.value =
                build.case || "0";


        updateBuilderTotal();


        if (message) {

            message.textContent =
                "✅ Saved build loaded successfully!";

        }

    }

    catch (error) {

        console.error(
            "Error loading build:",
            error
        );

        if (message) {

            message.textContent =
                "❌ Could not load saved build.";

        }

    }

}


const loadBuildBtn =
    document.getElementById(
        "loadBuildBtn"
    );


if (loadBuildBtn) {

    loadBuildBtn.addEventListener(
        "click",
        loadBuild
    );

}


// ==========================================
// RESET BUILD
// ==========================================

function resetBuild() {

    if (builderBudget)
        builderBudget.value = "";


    if (cpuSelect)
        cpuSelect.value = "0";


    if (gpuSelect)
        gpuSelect.value = "0";


    if (ramSelect)
        ramSelect.value = "0";


    if (storageSelect)
        storageSelect.value = "0";


    if (psuSelect)
        psuSelect.value = "0";


    if (caseSelect)
        caseSelect.value = "0";


    updateBuilderTotal();


    if (buildSummary)
        buildSummary.style.display =
            "none";


    if (compatibilityBox)
        compatibilityBox.style.display =
            "none";


    const performanceScore =
        document.getElementById(
            "performanceScore"
        );

    const performanceText =
        document.getElementById(
            "performanceText"
        );

    const fpsEstimate =
        document.getElementById(
            "fpsEstimate"
        );

    const fpsText =
        document.getElementById(
            "fpsText"
        );

    const buildRating =
        document.getElementById(
            "buildRating"
        );

    const buildRatingText =
        document.getElementById(
            "buildRatingText"
        );

    const buildQuality =
        document.getElementById(
            "buildQuality"
        );

    const buildQualityText =
        document.getElementById(
            "buildQualityText"
        );

    const upgradeTitle =
        document.getElementById(
            "upgradeTitle"
        );

    const upgradeText =
        document.getElementById(
            "upgradeText"
        );


    if (performanceScore)
        performanceScore.textContent =
            "0 / 100";


    if (performanceText)
        performanceText.textContent =
            "Select your components to see the score.";


    if (fpsEstimate)
        fpsEstimate.textContent =
            "-- FPS";


    if (fpsText)
        fpsText.textContent =
            "Estimated at 1080p.";


    if (buildRating)
        buildRating.textContent =
            "--";


    if (buildRatingText)
        buildRatingText.textContent =
            "Check your build to get a rating.";


    if (buildQuality)
        buildQuality.textContent =
            "--";


    if (buildQualityText)
        buildQualityText.textContent =
            "Check your build to see its quality.";


    if (upgradeTitle)
        upgradeTitle.textContent =
            "🔧 BUILD RECOMMENDATION";


    if (upgradeText)
        upgradeText.textContent =
            "Check your build to get upgrade suggestions.";


    const message =
        document.getElementById(
            "saveBuildMessage"
        );


    if (message)
        message.textContent =
            "Build reset.";

}


const resetBuildBtn =
    document.getElementById(
        "resetBuildBtn"
    );


if (resetBuildBtn) {

    resetBuildBtn.addEventListener(
        "click",
        resetBuild
    );

}


// ==========================================
// AUTO SAVE
// ==========================================

function autoSaveBuild() {

    const build = {

        cpu: cpuSelect?.value || "0",
        gpu: gpuSelect?.value || "0",
        ram: ramSelect?.value || "0",
        storage: storageSelect?.value || "0",
        psu: psuSelect?.value || "0",
        case: caseSelect?.value || "0",
        budget: builderBudget?.value || ""

    };


    localStorage.setItem(
        "savedPCBuild",
        JSON.stringify(build)
    );

}


[
    cpuSelect,
    gpuSelect,
    ramSelect,
    storageSelect,
    psuSelect,
    caseSelect
].forEach(function (select) {

    if (select) {

        select.addEventListener(
            "change",
            autoSaveBuild
        );

    }

});


if (builderBudget) {

    builderBudget.addEventListener(
        "input",
        autoSaveBuild
    );

}


// ==========================================
// PRINT BUILD
// ==========================================

const printBuildBtn =
    document.getElementById(
        "printBuildBtn"
    );


if (printBuildBtn) {

    printBuildBtn.addEventListener(
        "click",
        function () {

            window.print();

        }
    );

}


// ==========================================
// STORE LINKS
// ==========================================

const storeButtons =
    document.querySelectorAll(
        ".store-btn"
    );


const storeLinks = [

    "https://setupgame.ma/categorie-produit/composants-gaming/",

    "https://nextlevelpc.ma/143-composants",

    "https://pp.ultrapc.ma/20-composants"

];


storeButtons.forEach(
    function (button, index) {

        if (storeLinks[index]) {

            button.href =
                storeLinks[index];

        }

    }
);


// ==========================================
// PRICE COMPARISON
// ==========================================

const priceData = [

    {
        component: "AMD Ryzen 5 5600",
        setupgame: 1499,
        nextlevelpc: 1399,
        ultrapc: 1399
    },

    {
        component: "AMD Ryzen 7 5700X",
        setupgame: null,
        nextlevelpc: 1999,
        ultrapc: 1999
    },

    {
        component: "PNY RTX 5050 8GB",
        setupgame: 4099,
        nextlevelpc: null,
        ultrapc: null
    },

    {
        component: "XPG GAMMIX D35 16GB DDR4",
        setupgame: 1698,
        nextlevelpc: null,
        ultrapc: null
    },

    {
        component: "PNY CS900 500GB",
        setupgame: 1099,
        nextlevelpc: null,
        ultrapc: null
    },

    {
        component: "MSI MAG FORGE M100A RGB",
        setupgame: 399,
        nextlevelpc: null,
        ultrapc: 399
    },

    {
        component: "SG 550W 80+ Bronze",
        setupgame: 349,
        nextlevelpc: null,
        ultrapc: null
    },

    {
        component: "RTX 5070 12GB",
        setupgame: null,
        nextlevelpc: 8999,
        ultrapc: null
    },

    {
        component: "NOVA 750W Bronze",
        setupgame: null,
        nextlevelpc: 549,
        ultrapc: null
    }

];


// ==========================================
// BEST PRICE
// ==========================================

function getBestPrice(item) {

    const prices = [

        item.setupgame,
        item.nextlevelpc,
        item.ultrapc

    ].filter(function (price) {

        return typeof price === "number";

    });


    if (prices.length === 0) {
        return null;
    }


    return Math.min(...prices);

}


// ==========================================
// RENDER PRICE COMPARISON
// ==========================================

function renderPriceComparison() {

    const tableBody =
        document.getElementById(
            "priceComparisonBody"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    priceData.forEach(
        function (item) {

            const bestPrice =
                getBestPrice(item);


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${item.component}
                </td>

                <td>
                    ${
                        item.setupgame !== null
                        ? item.setupgame.toLocaleString() + " DH"
                        : "--"
                    }
                </td>

                <td>
                    ${
                        item.nextlevelpc !== null
                        ? item.nextlevelpc.toLocaleString() + " DH"
                        : "--"
                    }
                </td>

                <td>
                    ${
                        item.ultrapc !== null
                        ? item.ultrapc.toLocaleString() + " DH"
                        : "--"
                    }
                </td>

                <td class="best-price">
                    ${
                        bestPrice !== null
                        ? bestPrice.toLocaleString() + " DH"
                        : "--"
                    }
                </td>

            `;


            tableBody.appendChild(row);

        }
    );

}


// ==========================================
// LOADING SCREEN
// ==========================================

window.addEventListener(
    "load",
    function () {

        const loadingScreen =
            document.getElementById(
                "loadingScreen"
            );


        setTimeout(
            function () {

                if (loadingScreen) {

                    loadingScreen.classList.add(
                        "hidden"
                    );

                }

            },
            900
        );

    }
);


// ==========================================
// INITIALIZE
// ==========================================

updateBuilderTotal();

renderPriceComparison();


// ==========================================
// CONSOLE
// ==========================================

console.log(
    "✅ PC Build Calculator loaded successfully!"
);