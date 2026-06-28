const API_BASE_URL = "http://localhost:8080/api/users/6a3df43b35e7fae2b326a2b2/profile";
let monthlyBudgetLimit = 30000;
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (tabName === 'dashboard') {
        document.getElementById('dashboard-tab').classList.remove('hidden');
        event.currentTarget.classList.add('active');
    } else if (tabName === 'analytics') {
        document.getElementById('analytics-tab').classList.remove('hidden');
        event.currentTarget.classList.add('active');
    }
}
function calculateAvatarTier(wealth) {
    if (wealth >= 1000000) {
        return { name: "Wealth Emperor", profile: "Elite", icon: "👑", class: "status-elite" };
    } else if (wealth >= 500000) {
        return { name: "Wealth Warrior", profile: "Moderate", icon: "⚔️", class: "status-moderate" };
    } else if (wealth >= 100000) {
        return { name: "Growth Champion", profile: "Aggressive", icon: "⚡", class: "status-aggressive" };
    } else {
        return { name: "Financial Novice", profile: "Conservative", icon: "🌱", class: "status-conservative" };
    }
}
async function fetchUserProfile() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.user) {
            document.getElementById("username").textContent = data.user.fullName || "User";
        }
        if (data.avatar) {
            const tier = calculateAvatarTier(data.avatar.currentWealth);
            document.getElementById("avatar-name").textContent = tier.name;
            document.getElementById("avatar-icon").textContent = tier.icon;
            
            const badge = document.getElementById("profile-badge");
            if (badge) {
                badge.textContent = `${tier.profile} Profile`;
                badge.className = `badge ${tier.class}`;
            }
            const wealthFormatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(data.avatar.currentWealth);
            const goalFormatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(data.avatar.financialGoal);
            document.getElementById("current-wealth").textContent = wealthFormatted;
            document.getElementById("financial-goal").textContent = goalFormatted;
            if (data.avatar.financialGoal > 0) {
                const progressPercentage = Math.min((data.avatar.currentWealth / data.avatar.financialGoal) * 100, 100);
                document.getElementById("goal-progress-bar").style.width = `${progressPercentage}%`;
                document.getElementById("goal-progress-text").textContent = `${progressPercentage.toFixed(1)}% of goal achieved`;
            }
        }
    } catch (error) {
        console.error("Failed to connect to the backend server:", error);
    }
}
function checkBudgetLimit() {
    const inputElement = document.getElementById("expense-amount");
    const alertBanner = document.getElementById("budget-alert");
    const statusText = document.getElementById("expense-status-text");
    const amount = parseFloat(inputElement.value);
    if (!amount || amount <= 0) {
        statusText.textContent = "Please input a valid amount.";
        return;
    }
    if (amount > monthlyBudgetLimit) {
        alertBanner.classList.remove("hidden");
        statusText.innerHTML = `❌ Expense of <strong>₹${amount.toLocaleString('en-IN')}</strong> exceeds your limit of ₹${monthlyBudgetLimit.toLocaleString('en-IN')}!`;
        statusText.style.color = "#ff4d4d";
    } else {
        alertBanner.classList.add("hidden");
        statusText.innerHTML = `✅ Expense of <strong>₹${amount.toLocaleString('en-IN')}</strong> is within your safe budget zone.`;
        statusText.style.color = "#2ecc71";
    }
    inputElement.value = "";
}
window.addEventListener("DOMContentLoaded", fetchUserProfile);