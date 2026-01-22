/**
 * Experience Responses Page - Application JavaScript
 * Split Lease - Experience Survey Responses Viewer
 */

// State Management
const state = {
    surveys: [],
    filteredSurveys: [],
    selectedSurveyId: null,
    filters: {
        name: '',
        types: ['Guest', 'Host']
    }
};

// DOM Elements
const elements = {
    responseCount: document.getElementById('response-count'),
    nameSearch: document.getElementById('name-search'),
    filterGuest: document.getElementById('filter-guest'),
    filterHost: document.getElementById('filter-host'),
    surveyListContainer: document.getElementById('survey-list-container'),
    emptyState: document.getElementById('empty-state'),
    loadingState: document.getElementById('loading-state'),
    detailPlaceholder: document.getElementById('detail-placeholder'),
    detailContent: document.getElementById('detail-content'),
    // Detail fields
    detailName: document.getElementById('detail-name'),
    detailType: document.getElementById('detail-type'),
    detailDate: document.getElementById('detail-date'),
    detailExperience: document.getElementById('detail-experience'),
    detailChallenge: document.getElementById('detail-challenge'),
    detailChallengeExperience: document.getElementById('detail-challenge-experience'),
    detailChange: document.getElementById('detail-change'),
    detailService: document.getElementById('detail-service'),
    detailAdditionalService: document.getElementById('detail-additional-service'),
    detailShare: document.getElementById('detail-share'),
    detailRecommend: document.getElementById('detail-recommend'),
    detailStaff: document.getElementById('detail-staff'),
    detailQuestions: document.getElementById('detail-questions')
};

/**
 * Initialize the application
 */
function init() {
    loadSurveys();
    setupEventListeners();
}

/**
 * Load survey data (simulated - replace with actual API call)
 */
function loadSurveys() {
    // Simulated data - Replace with actual API endpoint
    const mockData = [
        {
            id: 1,
            name: 'Sarah Johnson',
            type: 'Guest',
            date: '2024-01-15',
            experience: 'My stay at the Split Lease property was absolutely wonderful. The apartment was clean, well-maintained, and exactly as described.',
            challenge: 'Finding affordable short-term housing in the area was difficult before discovering Split Lease.',
            challengeExperience: 'I felt stressed and worried about finding suitable accommodation within my budget.',
            change: 'The process became seamless and stress-free. I found a great place quickly.',
            service: 'The responsive customer support and easy booking process stood out the most.',
            additionalService: 'It would be great to have more flexible check-in/check-out times.',
            share: 'Yes',
            recommend: 9,
            staff: 'The entire team was professional and helpful. Special thanks to the support team.',
            questions: 'Are there any plans to expand to other cities?'
        },
        {
            id: 2,
            name: 'Michael Chen',
            type: 'Host',
            date: '2024-01-14',
            experience: 'As a host, I\'ve had a great experience listing my property on Split Lease. The platform is intuitive and the guests have been respectful.',
            challenge: 'Managing bookings and payments across multiple platforms was time-consuming.',
            challengeExperience: 'I felt overwhelmed by the administrative workload of hosting.',
            change: 'Split Lease streamlined everything into one easy-to-use dashboard.',
            service: 'The automatic payment processing and guest verification system.',
            additionalService: 'Analytics dashboard showing occupancy trends would be helpful.',
            share: 'Yes',
            recommend: 10,
            staff: 'The onboarding team was exceptional - they helped me set everything up quickly.',
            questions: 'Is there a referral program for bringing new hosts?'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            type: 'Guest',
            date: '2024-01-12',
            experience: 'I had a pleasant stay overall. The location was convenient and the amenities met my needs.',
            challenge: 'Finding pet-friendly accommodations was my biggest challenge.',
            challengeExperience: 'Frustrated and concerned about leaving my pet behind.',
            change: 'Split Lease made it easy to find a pet-friendly option.',
            service: 'The clear property descriptions and pet policy information.',
            additionalService: 'A pet-sitting service partnership would be amazing.',
            share: 'No',
            recommend: 7,
            staff: 'The check-in coordinator was friendly and informative.',
            questions: 'Do you offer discounts for extended stays?'
        },
        {
            id: 4,
            name: 'David Thompson',
            type: 'Host',
            date: '2024-01-10',
            experience: 'Hosting with Split Lease has exceeded my expectations. The income has helped cover my mortgage significantly.',
            challenge: 'Initially worried about property damage and unreliable guests.',
            challengeExperience: 'Anxious about the risks of short-term rentals.',
            change: 'The guest verification and insurance options provided peace of mind.',
            service: 'The insurance protection and host guarantee program.',
            additionalService: 'Maintenance coordination services would be valuable.',
            share: 'Yes',
            recommend: 9,
            staff: 'The claims support team was very understanding when I had a minor issue.',
            questions: 'What security measures are in place for property protection?'
        },
        {
            id: 5,
            name: 'Jessica Martinez',
            type: 'Guest',
            date: '2024-01-08',
            experience: 'My first time using Split Lease and I\'m impressed. The booking process was straightforward and the property exceeded expectations.',
            challenge: 'Navigating different booking platforms and comparing prices was confusing.',
            challengeExperience: 'Overwhelmed by options and unsure which to trust.',
            change: 'Split Lease provided transparent pricing and honest reviews.',
            service: 'The price comparison tool and verified reviews.',
            additionalService: 'Virtual tours would help with decision making.',
            share: 'Yes',
            recommend: 8,
            staff: 'The customer service team answered all my questions promptly.',
            questions: 'Is there a loyalty program for frequent guests?'
        }
    ];

    // Simulate API delay
    setTimeout(() => {
        state.surveys = mockData;
        state.filteredSurveys = [...mockData];
        elements.loadingState.style.display = 'none';
        renderSurveyList();
        updateResponseCount();
    }, 500);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Search input
    elements.nameSearch.addEventListener('input', (e) => {
        state.filters.name = e.target.value.trim();
        applyFilters();
    });

    // Search input focus effects
    elements.nameSearch.addEventListener('focus', () => {
        elements.nameSearch.classList.remove('invalid');
    });

    // Guest filter
    elements.filterGuest.addEventListener('change', () => {
        updateTypeFilters();
        applyFilters();
    });

    // Host filter
    elements.filterHost.addEventListener('change', () => {
        updateTypeFilters();
        applyFilters();
    });
}

/**
 * Update type filters based on checkbox state
 */
function updateTypeFilters() {
    const types = [];
    if (elements.filterGuest.checked) types.push('Guest');
    if (elements.filterHost.checked) types.push('Host');

    // If no filters selected, show empty state
    if (types.length === 0) {
        state.filters.types = [];
    } else {
        state.filters.types = types;
    }
}

/**
 * Apply all filters to the survey list
 */
function applyFilters() {
    const { name, types } = state.filters;

    state.filteredSurveys = state.surveys.filter(survey => {
        // Name filter (case-insensitive partial match)
        const matchesName = name === '' ||
            survey.name.toLowerCase().includes(name.toLowerCase());

        // Type filter
        const matchesType = types.length === 0 || types.includes(survey.type);

        return matchesName && matchesType;
    });

    renderSurveyList();
    updateResponseCount();

    // Clear selected survey if it's no longer in filtered results
    if (state.selectedSurveyId) {
        const selectedExists = state.filteredSurveys.find(s => s.id === state.selectedSurveyId);
        if (!selectedExists) {
            clearDetailPanel();
        }
    }
}

/**
 * Render the survey list
 */
function renderSurveyList() {
    const { filteredSurveys } = state;
    const container = elements.surveyListContainer;

    // Clear existing content
    container.innerHTML = '';

    // Show empty state if no results
    if (filteredSurveys.length === 0) {
        elements.emptyState.style.display = 'block';
        return;
    } else {
        elements.emptyState.style.display = 'none';
    }

    // Render each survey item
    filteredSurveys.forEach(survey => {
        const item = createSurveyItem(survey);
        container.appendChild(item);
    });
}

/**
 * Create a survey list item element
 */
function createSurveyItem(survey) {
    const item = document.createElement('div');
    item.className = 'survey-item';
    item.dataset.surveyId = survey.id;

    if (state.selectedSurveyId === survey.id) {
        item.classList.add('active');
    }

    item.innerHTML = `
        <div class="survey-item-name">${escapeHtml(survey.name)}</div>
        <div class="survey-item-meta">
            <span class="survey-item-type ${survey.type.toLowerCase()}">${survey.type}</span>
            <span>${formatDate(survey.date)}</span>
        </div>
    `;

    item.addEventListener('click', () => selectSurvey(survey));

    return item;
}

/**
 * Select a survey and display its details
 */
function selectSurvey(survey) {
    state.selectedSurveyId = survey.id;

    // Update active state in list
    document.querySelectorAll('.survey-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.surveyId) === survey.id) {
            item.classList.add('active');
        }
    });

    // Show detail panel
    elements.detailPlaceholder.style.display = 'none';
    elements.detailContent.style.display = 'block';

    // Populate detail fields
    elements.detailName.textContent = survey.name;
    elements.detailType.textContent = survey.type;
    elements.detailDate.textContent = formatDate(survey.date);
    elements.detailExperience.textContent = survey.experience || 'Not provided';
    elements.detailChallenge.textContent = survey.challenge || 'Not provided';
    elements.detailChallengeExperience.textContent = survey.challengeExperience || 'Not provided';
    elements.detailChange.textContent = survey.change || 'Not provided';
    elements.detailService.textContent = survey.service || 'Not provided';
    elements.detailAdditionalService.textContent = survey.additionalService || 'Not provided';
    elements.detailShare.textContent = survey.share || 'Not provided';
    elements.detailRecommend.textContent = survey.recommend ? `${survey.recommend}/10` : 'Not provided';
    elements.detailStaff.textContent = survey.staff || 'Not provided';
    elements.detailQuestions.textContent = survey.questions || 'None';

    // Scroll detail panel to top
    elements.detailContent.scrollTop = 0;
}

/**
 * Clear the detail panel
 */
function clearDetailPanel() {
    state.selectedSurveyId = null;
    elements.detailPlaceholder.style.display = 'flex';
    elements.detailContent.style.display = 'none';

    // Remove active state from all items
    document.querySelectorAll('.survey-item').forEach(item => {
        item.classList.remove('active');
    });
}

/**
 * Update the response count display
 */
function updateResponseCount() {
    elements.responseCount.textContent = state.filteredSurveys.length;
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * API Integration Note:
 * Replace the loadSurveys() function with actual API call:
 *
 * async function loadSurveys() {
 *     try {
 *         const response = await fetch('/api/experience-surveys');
 *         const data = await response.json();
 *         state.surveys = data;
 *         state.filteredSurveys = [...data];
 *         elements.loadingState.style.display = 'none';
 *         renderSurveyList();
 *         updateResponseCount();
 *     } catch (error) {
 *         console.error('Failed to load surveys:', error);
 *         elements.loadingState.innerHTML = '<p>Failed to load surveys. Please try again.</p>';
 *     }
 * }
 */

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
