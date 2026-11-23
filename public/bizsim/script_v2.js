// --- Game State ---
const translations = window.translations; // Ensure global translations are accessible
const gameState = {
    businessName: "",
    productType: "",
    founderName: "",
    profit: 0,
    turn: 1,
    maxTurns: 30,
    history: [],
    lang: "en", // Default language
    stats: {
        scenarios: { good: 0, total: 0 },
        hiring: { good: 0, total: 0 }
    },
    upgrades: [], // Array of owned upgrade IDs
    marketTrend: "stable" // boom, stable, recession
};

// --- DOM Elements ---
const screens = {
    landing: document.getElementById('landing-page'),
    game: document.getElementById('game-screen'),
    end: document.getElementById('end-screen')
};

const displays = {
    profit: document.getElementById('profit-display'),
    turn: document.getElementById('turn-display'),
    scenarioContainer: document.getElementById('scenario-container'),
    scenarioTitle: document.getElementById('scenario-title'),
    scenarioText: document.getElementById('scenario-text'),
    optionsContainer: document.getElementById('options-container'),
    diceContainer: document.getElementById('dice-container'),
    dice: document.getElementById('dice'),
    rollBtn: document.getElementById('roll-btn'),
    salesResult: document.getElementById('sales-result'),
    continueDiceBtn: document.getElementById('continue-after-dice'),
    hiringContainer: document.getElementById('hiring-container'),
    hiringOptions: document.getElementById('hiring-options'),
    finalProfit: document.getElementById('final-profit'),
    performanceText: document.getElementById('performance-text'),
    historyList: document.getElementById('history-list'),
    restartBtn: document.getElementById('restart-btn'),
    bizNameSpan: document.getElementById('biz-name-span'),
    endBizName: document.getElementById('end-biz-name'),
    tycoonRank: document.getElementById('tycoon-rank'),
    scenarioFeedback: document.getElementById('scenario-feedback'),
    hiringFeedback: document.getElementById('hiring-feedback'),
    shopBtn: null,
    shopModal: null,
    closeShopBtn: null,
    shopItems: null
};

function initGameElements() {
    displays.scenarioContainer = document.getElementById('scenario-container');
    displays.diceContainer = document.getElementById('dice-container');
    displays.hiringContainer = document.getElementById('hiring-container');
    displays.marketDisplay = document.getElementById('market-display');
    displays.shopBtn = document.getElementById('shop-btn');
    displays.shopModal = document.getElementById('shop-modal');
    displays.closeShopBtn = document.getElementById('close-shop-btn');
    displays.shopItems = document.getElementById('shop-items');

    // Re-attach listeners if needed, or just ensure they work
    if (displays.shopBtn) {
        displays.shopBtn.onclick = () => {
            displays.shopModal.classList.remove('hidden');
            renderShopItems();
        };
    }
    if (displays.closeShopBtn) {
        displays.closeShopBtn.onclick = () => {
            displays.shopModal.classList.add('hidden');
        };
    }
}

// --- Localization Logic ---
function updateLanguage(lang) {
    gameState.lang = lang;
    const t = translations[lang].ui;

    // Update UI Text
    document.querySelector('h1').innerHTML = t.title;
    document.querySelector('.subtitle').textContent = t.subtitle;
    document.querySelector('label[for="business-name"]').textContent = t.labelName;
    document.querySelector('label[for="product-type"]').textContent = t.labelProduct;
    document.querySelector('label[for="founder-name"]').textContent = t.labelFounder;
    document.querySelector('#setup-form button').textContent = t.btnStart;

    document.querySelector('.stat-box:nth-child(1) .label').textContent = t.labelProfit;
    document.querySelector('.stat-box:nth-child(2) .label').textContent = t.labelTurn;

    displays.rollBtn.textContent = t.btnRoll;
    displays.continueDiceBtn.textContent = t.btnContinue;
    displays.restartBtn.textContent = t.btnRestart;

    document.querySelector('#dice-container h2').textContent = t.reportTitle;
    document.querySelector('#dice-container p').textContent = t.reportSubtitle;

    document.querySelector('#hiring-container h2').textContent = t.hiringTitle;
    // Note: Hiring subtitle has dynamic span, handle carefully
    const hiringSub = document.querySelector('#hiring-container p');
    hiringSub.innerHTML = t.hiringSubtitle;
    // Re-insert the span if it was wiped (it might be inside the translation string)
    // The translation string has <span id="biz-name-span"></span> so it's fine.
    displays.bizNameSpan = document.getElementById('biz-name-span'); // Re-bind
    if (displays.bizNameSpan) displays.bizNameSpan.textContent = gameState.businessName;

    document.querySelector('#end-screen h2').textContent = t.gameOver;
    document.querySelector('.final-score-box .label').textContent = t.finalProfit;

    // Update Market Display
    if (!displays.marketDisplay) displays.marketDisplay = document.getElementById('market-display');
    if (displays.marketDisplay) {
        const mTrends = translations[gameState.lang].marketTrends;
        const currentTrend = mTrends[gameState.marketTrend];
        displays.marketDisplay.textContent = currentTrend.label;
        displays.marketDisplay.className = `value market-${gameState.marketTrend}`;
    }

    // Update Shop UI
    if (!displays.shopBtn) displays.shopBtn = document.getElementById('shop-btn');
    if (displays.shopBtn) {
        const shopT = translations[gameState.lang].ui;
        displays.shopBtn.textContent = shopT.shop;
    }

    if (!displays.shopItems) displays.shopItems = document.getElementById('shop-items');
    if (displays.shopItems) {
        renderShopItems();
    }

    // Update Active Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Refresh current view content if game is running
    if (!screens.landing.classList.contains('active')) {
        refreshCurrentView();
    }
}

function renderShopItems() {
    const t = translations[gameState.lang];
    displays.shopItems.innerHTML = '';

    t.upgrades.forEach(up => {
        const item = document.createElement('div');
        item.className = 'shop-item';
        const isOwned = gameState.upgrades.includes(up.id);
        const canAfford = gameState.profit >= up.cost;

        item.innerHTML = `
            <h4>${up.name}</h4>
            <p>${up.desc}</p>
            <button class="buy-btn" ${isOwned ? 'disabled' : (canAfford ? '' : 'disabled')}>
                ${isOwned ? t.ui.owned : (canAfford ? `${t.ui.buy} (RM ${up.cost})` : `RM ${up.cost}`)}
            </button>
        `;

        const btn = item.querySelector('button');
        if (!isOwned && canAfford) {
            btn.onclick = () => buyUpgrade(up.id, up.cost);
        }

        displays.shopItems.appendChild(item);
    });
}

function buyUpgrade(id, cost) {
    gameState.profit -= cost;
    gameState.upgrades.push(id);
    updateUI(); // Refresh UI to show new balance and disabled button
    renderShopItems(); // Re-render shop to update button state
}

function refreshCurrentView() {
    // Refresh Scenario
    if (!displays.scenarioContainer.classList.contains('hidden-view')) {
        renderScenario();
    }
    // Refresh Hiring
    if (!displays.hiringContainer.classList.contains('hidden-view')) {
        // Re-render hiring to update text
        // We need to know which round it is, but startHiring logic handles that.
        // However, startHiring shuffles. We don't want to re-shuffle if just switching lang.
        // For simplicity, we might just let it be English until next turn or re-call startHiring?
        // Better: Just re-call startHiring. It might re-shuffle, but that's acceptable for now.
        // Actually, to avoid re-shuffling, we'd need to store the current candidates.
        // Let's just re-render for now.
        startHiring(nextTurn);
    }
}

// Initialize Language Toggles
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.onclick = () => updateLanguage(btn.dataset.lang);
});


// --- Initialization ---
document.getElementById('setup-form').onsubmit = (e) => {
    e.preventDefault();
    gameState.businessName = document.getElementById('business-name').value;
    gameState.productType = document.getElementById('product-type').value;
    gameState.founderName = document.getElementById('founder-name').value;

    startGame();
};

// --- Event Listeners ---
// displays.startBtn.addEventListener('click', startGame); // Removed undefined startBtn listener
// Removed displays.startBtn.addEventListener as it's not defined and setup-form handles game start.
displays.restartBtn.addEventListener('click', () => {
    screens.end.classList.add('hidden');
    screens.end.classList.remove('active');
    screens.landing.classList.remove('hidden');
    screens.landing.classList.add('active');

    // Reset inputs
    document.getElementById('business-name').value = ''; // Corrected ID from biz-name
    document.getElementById('product-type').value = ''; // Corrected ID from product-name
    document.getElementById('founder-name').value = '';
});

// These event listeners are moved to initGameElements to ensure elements exist
// displays.shopBtn.addEventListener('click', () => {
//     displays.shopModal.classList.remove('hidden');
//     renderShopItems();
// });

// displays.closeShopBtn.addEventListener('click', () => {
//     displays.shopModal.classList.add('hidden');
// });

function startGame() {
    gameState.profit = 0;
    gameState.turn = 1;
    gameState.history = [];
    gameState.stats = {
        scenarios: { good: 0, total: 0 },
        hiring: { good: 0, total: 0 }
    };
    gameState.upgrades = [];
    gameState.marketTrend = "stable";

    screens.landing.classList.add('hidden');
    screens.landing.classList.remove('active'); // Remove active from landing

    screens.game.classList.remove('hidden');
    screens.game.classList.add('active'); // Add active to game

    initGameElements(); // Initialize DOM elements that are now visible/active
    updateMarketTrend();
    updateUI(); // Assuming updateUI is a function that calls updateStats and updateLanguage
    renderScenario();
}

function updateMarketTrend() {
    // 1-10: Stable
    // 11-20: Random
    // 21-30: Random
    if (gameState.turn <= 10) {
        gameState.marketTrend = "stable";
    } else {
        // Simple random change every turn for excitement, or stick for blocks?
        // Let's stick for blocks of 5 to make it feel like a "trend"
        if (gameState.turn % 5 === 1) {
            const rand = Math.random();
            if (rand < 0.33) gameState.marketTrend = "boom";
            else if (rand < 0.66) gameState.marketTrend = "stable";
            else gameState.marketTrend = "recession";
        }
    }
}

function calculateImpact(baseImpact) {
    let multiplier = 1.0;

    // Market Trend
    if (gameState.marketTrend === "boom") multiplier *= 1.5;
    if (gameState.marketTrend === "recession") multiplier *= 0.5;

    // Upgrades
    const baseUpgrades = translations['en'].upgrades; // Use 'en' data for consistent upgrade logic

    gameState.upgrades.forEach(id => {
        const up = baseUpgrades.find(u => u.id === id);
        if (up) multiplier += up.multiplier;
    });

    return Math.round(baseImpact * multiplier);
}

function updateUI() {
    updateStats();
    updateLanguage(gameState.lang); // Re-render UI elements that depend on language and game state
}

function switchView(viewName) {
    displays.scenarioContainer.classList.add('hidden-view');
    displays.diceContainer.classList.add('hidden-view');
    displays.hiringContainer.classList.add('hidden-view');

    if (viewName === 'scenario') {
        displays.scenarioContainer.classList.remove('hidden-view');
        displays.scenarioContainer.classList.add('active-view');
    } else if (viewName === 'dice') {
        displays.diceContainer.classList.remove('hidden-view');
    } else if (viewName === 'hiring') {
        displays.hiringContainer.classList.remove('hidden-view');
    }
}

function updateStats() {
    displays.profit.textContent = `RM ${gameState.profit} `;
    if (gameState.profit < 0) {
        displays.profit.classList.add('minus');
        displays.profit.classList.remove('plus');
    } else {
        displays.profit.classList.add('plus');
        displays.profit.classList.remove('minus');
    }
    displays.turn.textContent = `${gameState.turn}/${gameState.maxTurns}`;
}

// --- Scenario Logic ---
function renderScenario() {
    switchView('scenario');
    const langData = translations[gameState.lang];
    const scenario = langData.scenarios[gameState.turn - 1];

    if (!scenario) {
        endGame();
        return;
    }

    displays.scenarioTitle.textContent = `${translations[gameState.lang].ui.labelTurn} #${gameState.turn}`;
    displays.scenarioText.textContent = scenario.text;

    displays.optionsContainer.innerHTML = '';

    // Shuffle options so "Good" isn't always first
    // Note: If we switch language, we might want to keep order?
    // For now, re-rendering re-shuffles.
    const shuffledOptions = [...scenario.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt.text;
        btn.onclick = () => handleChoice(opt);
        displays.optionsContainer.appendChild(btn);
    });
}

function handleChoice(option) {
    // Removed direct profit modification here, now done after calculateImpact
    // gameState.profit += option.impact;

    gameState.history.push({
        turn: gameState.turn,
        event: translations[gameState.lang].scenarios[gameState.turn - 1].text,
        choice: option.text,
        impact: calculateImpact(option.impact)
    });

    // Track stats
    gameState.stats.scenarios.total++;
    if (option.type === 'good') {
        gameState.stats.scenarios.good++;
    }

    const finalImpact = calculateImpact(option.impact);
    gameState.profit += finalImpact;

    showFeedback(option.feedback, finalImpact, () => {
        checkTriggers();
    });
}

function showFeedback(text, impact, callback) {
    const overlay = document.createElement('div');
    overlay.className = 'feedback-overlay';

    let impactClass = 'neutral';
    let sign = '';
    if (impact > 0) { impactClass = 'good'; sign = '+'; }
    if (impact < 0) { impactClass = 'bad'; }

    overlay.innerHTML = `
        <div class="feedback-box feedback-${impactClass}">
            <h2>${impact > 0 ? translations[gameState.lang].ui.feedbackGood : (impact < 0 ? translations[gameState.lang].ui.feedbackBad : translations[gameState.lang].ui.feedbackNeutral)}</h2>
            <p>${text}</p>
            <div class="profit-change ${impact > 0 ? 'plus' : (impact < 0 ? 'minus' : '')}">
                ${sign}RM ${Math.abs(impact)}
            </div>
            <button class="btn-primary">${translations[gameState.lang].ui.btnContinue}</button>
        </div>
    `;

    document.body.appendChild(overlay);

    const btn = overlay.querySelector('button');
    btn.onclick = () => {
        overlay.remove();
        callback();
    };
}


// --- Roulette Logic ---
const rouletteModal = document.getElementById('roulette-modal');
const rouletteWheel = document.getElementById('roulette-wheel');
const betRedBtn = document.getElementById('bet-red-btn');
const betBlackBtn = document.getElementById('bet-black-btn');
const rouletteResult = document.getElementById('roulette-result');
const rouletteResultText = document.getElementById('roulette-result-text');
const rouletteContinueBtn = document.getElementById('roulette-continue-btn');

function startRoulette(callback) {
    // Visual Effects
    document.body.classList.add('volatile-mode');
    gameState.marketTrend = 'volatile';
    updateUI(); // Update market display

    // Show Modal
    rouletteModal.classList.remove('hidden');
    rouletteResult.classList.add('hidden');
    betRedBtn.disabled = false;
    betBlackBtn.disabled = false;
    rouletteWheel.style.transform = 'rotate(0deg)';

    // Update Text
    const t = translations[gameState.lang].roulette;
    document.getElementById('roulette-title').textContent = t.title;
    document.getElementById('roulette-desc').textContent = t.desc;
    betRedBtn.textContent = t.betRed;
    betBlackBtn.textContent = t.betBlack;

    // Bet Handlers
    betRedBtn.onclick = () => handleRouletteSpin('red', callback);
    betBlackBtn.onclick = () => handleRouletteSpin('black', callback);
}

function handleRouletteSpin(betColor, callback) {
    betRedBtn.disabled = true;
    betBlackBtn.disabled = true;

    // Spin Animation
    const spins = 5;
    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = (spins * 360) + randomDegree;
    rouletteWheel.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
        // Determine Result
        // Wheel segments: 360 / 37 segments approx 9.7deg each
        // 0 is green. Then alternates Red/Black.
        // Simplified logic: Random number 0-36.
        // 0 = Green
        // Odd 1-10, 19-28 = Red
        // Even 1-10, 19-28 = Black
        // Even 11-18, 29-36 = Red
        // Odd 11-18, 29-36 = Black

        // Let's just use the randomDegree to determine number for visual consistency if needed,
        // but for game logic, let's generate the number and map visual to it?
        // Easier: Generate number first, calculate rotation.
        // But we already spun. Let's just pick a random number and say it landed there.
        // The visual is just for show unless we map it perfectly.
        // Let's rely on the random number logic.

        const number = Math.floor(Math.random() * 37); // 0-36
        let color = 'green';
        if (number !== 0) {
            if ((number >= 1 && number <= 10) || (number >= 19 && number <= 28)) {
                color = (number % 2 === 0) ? 'black' : 'red';
            } else {
                color = (number % 2 === 0) ? 'red' : 'black';
            }
        }

        let won = (betColor === color);
        let profitChange = 0;

        if (won) {
            profitChange = number * 10; // e.g. 32 * 10 = 320
            gameState.profit += profitChange;
        } else {
            profitChange = -500;
            gameState.profit += profitChange;
        }

        // Show Result
        const t = translations[gameState.lang].roulette;
        let resultMsg = `${t.resultNum} ${number} (${color.toUpperCase()}). `;
        resultMsg += won ? `${t.won} RM ${profitChange}` : `${t.lost} RM ${Math.abs(profitChange)}`;

        rouletteResultText.textContent = resultMsg;
        rouletteResult.classList.remove('hidden');
        rouletteContinueBtn.classList.remove('hidden');
        rouletteContinueBtn.textContent = translations[gameState.lang].ui.btnContinue;

        gameState.history.push({
            turn: gameState.turn,
            event: "Market Roulette",
            choice: `Bet ${betColor}`,
            impact: profitChange
        });

        updateStats();

        rouletteContinueBtn.onclick = () => {
            rouletteModal.classList.add('hidden');
            document.body.classList.remove('volatile-mode');
            // Reset market to stable after roulette round
            gameState.marketTrend = 'stable';
            updateUI(); // Refresh market display
            callback();
        };

    }, 3000); // Wait for spin
}

function checkTriggers() {
    // Check for Roulette (Turn 12 and 24)
    // Triggers BEFORE dice/hiring? Or instead?
    // "After round 12 and round 24" -> implies end of turn 12/24.
    // My checkTriggers runs after scenario choice.

    const runRoulette = (gameState.turn === 12 || gameState.turn === 24);

    if (runRoulette) {
        startRoulette(() => {
            proceedToNextStep();
        });
    } else {
        proceedToNextStep();
    }
}

function proceedToNextStep() {
    // Check for Dice Roll (every 3 turns)
    if (gameState.turn % 3 === 0) {
        startDiceRoll(() => {
            // After dice, check for Hiring (every 5 turns)
            if (gameState.turn % 5 === 0) {
                startHiring(() => {
                    nextTurn();
                });
            } else {
                nextTurn();
            }
        });
    } else if (gameState.turn % 5 === 0) {
        startHiring(() => {
            nextTurn();
        });
    } else {
        nextTurn();
    }
}


function nextTurn() {
    gameState.turn++;
    updateMarketTrend(); // Update market trend for the new turn
    if (gameState.turn > gameState.maxTurns) {
        endGame();
    } else {
        updateStats();
        renderScenario();
    }
}

// --- Particle Effects ---
function spawnParticles(amount) {
    const container = displays.dice.parentElement; // Spawn around dice
    const rect = container.getBoundingClientRect();

    for (let i = 0; i < amount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.textContent = '$';

        // Random position around center
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 50;

        p.style.left = `calc(50% + ${x}px)`;
        p.style.top = `calc(50% + ${y}px)`;
        p.style.animationDelay = `${Math.random() * 0.5}s`;

        container.appendChild(p);

        setTimeout(() => p.remove(), 1500);
    }
}

// --- Dice Logic ---
function startDiceRoll(callback) {
    switchView('dice');
    displays.salesResult.classList.add('hidden');
    displays.continueDiceBtn.classList.add('hidden');
    displays.rollBtn.classList.remove('hidden');

    // Update text in case lang changed
    const t = translations[gameState.lang].ui;
    displays.rollBtn.textContent = t.btnRoll;

    displays.rollBtn.onclick = () => {
        displays.rollBtn.classList.add('hidden');
        const dice = displays.dice;
        dice.classList.add('rolling');

        // Simulate roll time
        setTimeout(() => {
            dice.classList.remove('rolling');
            const roll = Math.floor(Math.random() * 6) + 1;
            updateDiceVisual(roll);

            const baseSales = roll * 100;
            const finalSales = calculateImpact(baseSales);

            gameState.profit += finalSales;

            const t = translations[gameState.lang].ui;
            const msg = `${t.rolled} ${roll}. ${t.sales}: RM ${finalSales}`;

            gameState.history.push({
                turn: gameState.turn,
                event: "Monthly Sales",
                choice: `${t.rolled} ${roll}`,
                impact: finalSales
            });

            displays.salesResult.innerHTML = `${t.rolled} ${roll}!<br>${t.sales}: <span class="plus">+RM ${finalSales}</span>`;
            displays.salesResult.classList.remove('hidden');
            displays.continueDiceBtn.classList.remove('hidden');
            displays.continueDiceBtn.textContent = t.btnContinue;

            // Spawn particles!
            spawnParticles(20);

            updateStats();

            displays.continueDiceBtn.onclick = callback;
        }, 1500);
    };
}

function updateDiceVisual(roll) {
    const dice = displays.dice;
    dice.style.transform = 'none';

    const rotations = {
        1: 'rotateX(0deg) rotateY(0deg)',
        2: 'rotateX(90deg) rotateY(0deg)',
        3: 'rotateX(0deg) rotateY(-90deg)',
        4: 'rotateX(0deg) rotateY(90deg)',
        5: 'rotateX(-90deg) rotateY(0deg)',
        6: 'rotateX(0deg) rotateY(180deg)'
    };

    void dice.offsetWidth;
    dice.style.transform = rotations[roll];
}

// --- Hiring Logic ---
function startHiring(callback) {
    switchView('hiring');
    const roundIndex = Math.floor(gameState.turn / 5) - 1;
    const langData = translations[gameState.lang];
    const candidates = langData.hiringRounds[roundIndex];
    const t = langData.ui;

    if (!candidates) {
        callback();
        return;
    }

    displays.hiringOptions.innerHTML = '';
    const shuffled = [...candidates].sort(() => Math.random() - 0.5);

    shuffled.forEach(cand => {
        const card = document.createElement('div');
        card.className = 'hire-card';

        const historyHtml = cand.history.map(job => `
            <div class="job-row">
                <div>
                    <div class="job-role">${job.role}</div>
                    <div class="job-company">${job.company}</div>
                </div>
                <div class="job-duration">${job.duration}</div>
            </div>
        `).join('');

        const qualsHtml = cand.qualifications.map(q => `<li>${q}</li>`).join('');

        // Use the specific avatar from the candidate data
        // Fallback to a default if missing (though data.js should have it)
        let avatarSrc = cand.avatar || "assets/avatar_assistant_1763947749484.png";

        card.innerHTML = `
            <div class="hire-header-bg">
                <img src="${avatarSrc}" class="hire-avatar" alt="${cand.role}">
            </div>
            <div class="hire-content">
                <div class="hire-role">${cand.role}</div>
                <div class="hire-name">${cand.name}</div>

                <div class="cv-section">
                    <span class="cv-label">${t.quals}</span>
                    <ul class="cv-list">
                        ${qualsHtml}
                    </ul>
                </div>

                <div class="cv-section">
                    <span class="cv-label">${t.history}</span>
                    <div class="cv-list">
                        ${historyHtml}
                    </div>
                </div>

                <div class="cv-profile">
                    "${cand.profile}"
                </div>
            </div>
        `;

        card.onclick = () => {
            let impact = 0;
            let msg = "";

            if (cand.type === 'good') {
                impact = 500;
                msg = `${t.feedbackGood} ${cand.name} (+RM 500)`;
            } else if (cand.type === 'bad') {
                impact = -500;
                msg = `${t.feedbackBad} ${cand.name} (-RM 500)`;
            } else {
                msg = `${t.feedbackNeutral} ${cand.name}`;
            }

            gameState.profit += impact;
            updateStats(); // Refresh profit display immediately

            gameState.history.push({
                turn: gameState.turn,
                event: "Hiring Round",
                choice: `${t.hired} ${cand.name}`,
                impact: impact
            });

            // Track stats
            gameState.stats.hiring.total++;
            if (cand.type === 'good') {
                gameState.stats.hiring.good++;
            }

            showFeedback(msg, impact, callback);
        };

        displays.hiringOptions.appendChild(card);
    });
}

function endGame() {
    screens.game.classList.add('hidden');
    screens.game.classList.remove('active'); // Remove active from game

    screens.end.classList.remove('hidden');
    screens.end.classList.add('active'); // Add active to end

    displays.finalProfit.textContent = `RM ${gameState.profit}`;

    displays.finalProfit.textContent = `RM ${gameState.profit}`;

    const t = translations[gameState.lang];
    const r = t.rankings;
    const f = t.feedback;

    // Set Business Name
    displays.endBizName.textContent = gameState.businessName;

    // Calculate Rank
    let rank = r.beginner;
    if (gameState.profit >= 8000) rank = r.tycoon; // Tycoon
    else if (gameState.profit >= 6500) rank = r.entrepreneur; // Entrepreneur
    else if (gameState.profit >= 5000) rank = r.shopOwner; // Shop Owner
    else if (gameState.profit >= 3000) rank = r.streetVendor; // Street Vendor
    // else remains Beginner

    displays.tycoonRank.textContent = rank;

    // Generate Feedback
    const scenarioRatio = gameState.stats.scenarios.total > 0 ? (gameState.stats.scenarios.good / gameState.stats.scenarios.total) : 0;
    let sFeedback = f.scenarios.bad;
    if (scenarioRatio > 0.7) sFeedback = f.scenarios.great;
    else if (scenarioRatio > 0.4) sFeedback = f.scenarios.good;
    displays.scenarioFeedback.textContent = sFeedback;

    const hiringRatio = gameState.stats.hiring.total > 0 ? (gameState.stats.hiring.good / gameState.stats.hiring.total) : 0;
    let hFeedback = f.hiring.bad;
    if (hiringRatio > 0.7) hFeedback = f.hiring.great;
    else if (hiringRatio > 0.4) hFeedback = f.hiring.good;
    displays.hiringFeedback.textContent = hFeedback;

    // Hide old performance text
    displays.performanceText.classList.add('hidden');

    displays.historyList.innerHTML = '';
    gameState.history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        const impactClass = item.impact > 0 ? 'plus' : (item.impact < 0 ? 'minus' : '');
        const impactSign = item.impact > 0 ? '+' : '';

        div.innerHTML = `
            <span>Turn ${item.turn}: ${item.choice}</span>
            <span class="${impactClass}">${impactSign}RM ${item.impact}</span>
        `;
        displays.historyList.appendChild(div);
    });
}
window.gameState = gameState; window.updateUI = updateUI; window.renderScenario = renderScenario;
