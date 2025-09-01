// index.js

// Global state
let selectedIngredients = [];
let isLoading = false;

// DOM elements
const ingredientGrid = document.getElementById('ingredientGrid');
const selectedList = document.getElementById('selectedList');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const recipesSection = document.getElementById('recipesSection');
const recipesContainer = document.getElementById('recipesContainer');
const customIngredientInput = document.getElementById('customIngredientInput');
const addCustomIngredientBtn = document.getElementById('addCustomIngredientBtn');

// Initialize the app
function initializeApp() {
    setupEventListeners();
    updateSelectedDisplay();
}

// Setup event listeners
function setupEventListeners() {
    ingredientGrid.addEventListener('click', handleIngredientClick);
    generateBtn.addEventListener('click', generateRecipes);
    clearBtn.addEventListener('click', clearAllIngredients);
    addCustomIngredientBtn.addEventListener('click', addCustomIngredient);

    customIngredientInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addCustomIngredient();
        }
    });
}

// Handle ingredient selection
function handleIngredientClick(event) {
    const ingredientItem = event.target.closest('.ingredient-item');
    if (!ingredientItem) return;

    const ingredient = ingredientItem.dataset.ingredient;
    
    if (selectedIngredients.includes(ingredient)) {
        selectedIngredients = selectedIngredients.filter(item => item !== ingredient);
        ingredientItem.classList.remove('selected');
    } else {
        selectedIngredients.push(ingredient);
        ingredientItem.classList.add('selected');
    }

    updateSelectedDisplay();
    updateGenerateButton();
}

// Update selected ingredients display
function updateSelectedDisplay() {
    if (selectedIngredients.length === 0) {
        selectedList.innerHTML = '<p style="color: #999; font-style: italic;">No ingredients selected yet</p>';
    } else {
        selectedList.innerHTML = selectedIngredients.map(ingredient => `
            <div class="selected-tag">
                <span>${ingredient}</span>
                <button class="remove-ingredient" onclick="removeIngredient('${ingredient}')">×</button>
            </div>
        `).join('');
    }
}

// Add custom ingredient
function addCustomIngredient() {
    const ingredient = customIngredientInput.value.trim().toLowerCase();
    if (ingredient && !selectedIngredients.includes(ingredient)) {
        selectedIngredients.push(ingredient);
        updateSelectedDisplay();
        updateGenerateButton();
    }
    customIngredientInput.value = '';
}

// Remove ingredient
function removeIngredient(ingredient) {
    selectedIngredients = selectedIngredients.filter(item => item !== ingredient);
    const ingredientItem = document.querySelector(`[data-ingredient="${ingredient}"]`);
    if (ingredientItem) ingredientItem.classList.remove('selected');
    updateSelectedDisplay();
    updateGenerateButton();
}

// Update generate button state
function updateGenerateButton() {
    generateBtn.disabled = selectedIngredients.length === 0 || isLoading;
}

// Clear all ingredients
function clearAllIngredients() {
    selectedIngredients = [];
    document.querySelectorAll('.ingredient-item.selected').forEach(item => item.classList.remove('selected'));
    updateSelectedDisplay();
    updateGenerateButton();
    hideRecipes();
}

// Generate recipes from backend
async function generateRecipes() {
    if (selectedIngredients.length === 0) return;

    isLoading = true;
    updateGenerateButton();
    showLoading();

    try {
        const response = await fetch("https://plp-backend-production-ff60.up.railway.app/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: selectedIngredients })
        });

        const data = await response.json();

        if (data.error) {
            showError(data.error);
        } else {
            displayRecipes(data.recipes); // ✅ directly pass recipes array
        }
    } catch (error) {
        showError("Backend error. Please try again.");
        console.error(error);
    } finally {
        isLoading = false;
        updateGenerateButton();
    }
}

// Show loading
function showLoading() {
    recipesContainer.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>Generating delicious recipes with your ingredients...</p>
        </div>
    `;
    recipesSection.style.display = 'block';
}

// Display recipes
function displayRecipes(recipes) {
    if (!recipes || recipes.length === 0) {
        recipesContainer.innerHTML = `
            <div class="empty-state">
                <h3>No recipes found</h3>
                <p>Try selecting different ingredients or check back later!</p>
            </div>
        `;
        return;
    }

    recipesContainer.innerHTML = `
        <div class="recipe-grid">
            ${recipes.map(recipe => `
                <div class="recipe-card">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <div class="recipe-ingredients">
                        <h4>Ingredients:</h4>
                        <p>${recipe.ingredients}</p>
                    </div>
                    <div class="recipe-instructions">
                        <h4>Instructions:</h4>
                        <p>${recipe.instructions.replace(/\n/g, '<br>')}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    recipesSection.style.display = 'block';
}

// Show error message
function showError(message) {
    recipesContainer.innerHTML = `
        <div class="error-message">
            <strong>Oops!</strong> ${message}
        </div>
    `;
    recipesSection.style.display = 'block';
}

// Hide recipes section
function hideRecipes() {
    recipesSection.style.display = 'none';
}

// Initialize app
document.addEventListener('DOMContentLoaded', initializeApp);
