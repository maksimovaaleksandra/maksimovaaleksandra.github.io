// 1. WATCHLIST LOGIC

function getWatchlistState() {
  return localStorage.getItem('trumanInWatchlist') === 'true';
}
function updateWatchlistUI() {
  var isAdded = getWatchlistState();
  var badgeElement = document.querySelector('#watchlistCount');
  var watchlistGrid = document.querySelector('#watchlistGrid');
  var emptyMsg = document.querySelector('#emptyMessage');

  if (badgeElement) {
    if (isAdded) {
      badgeElement.textContent = '1';
      badgeElement.style.display = 'inline-block';
    } else {
      badgeElement.textContent = '0';
      badgeElement.style.display = 'none';
    }
  }

  if (watchlistGrid && emptyMsg) {
    if (isAdded) {
      emptyMsg.style.display = 'none';
      watchlistGrid.innerHTML = `
        <div class="movie-card">
          <a href="details.html">
            <div class="movie-card-poster">
              <img src="images/truman-poster.png" alt="The Truman Show" />
            </div>
            <h3 class="movie-card-title">The Truman Show</h3>
            <p class="movie-card-meta">1998 | 1h 42m</p>
          </a>
          <button class="watchlist-btn active" id="btn-truman-watchlist-page">
            <img class="heart-outline" src="images/icons/heart-outline.png" alt="" />
            <img class="heart-filled" src="images/icons/heart-filled.png" alt="" />
            <span>WATCHLIST</span>
          </button>
        </div>
      `;

      var pageBtn = document.querySelector('#btn-truman-watchlist-page');
      if (pageBtn) {
        pageBtn.addEventListener('click', toggleTrumanWatchlist);
      }
    } else {
      emptyMsg.style.display = 'block';
      watchlistGrid.innerHTML = '';
    }
  }

  var trumanButtons = document.querySelectorAll('#btn-truman-show, #btn-truman-rec, #btn-truman-details');
  for (var i = 0; i < trumanButtons.length; i++) {
    if (isAdded) {
      trumanButtons[i].classList.add('active');
    } else {
      trumanButtons[i].classList.remove('active');
    }
  }
}

function toggleTrumanWatchlist(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  var currentState = getWatchlistState();
  localStorage.setItem('trumanInWatchlist', !currentState);
  updateWatchlistUI();
}

var trumanBtns = document.querySelectorAll('#btn-truman-show, #btn-truman-rec, #btn-truman-details');
for (var j = 0; j < trumanBtns.length; j++) {
  trumanBtns[j].addEventListener('click', toggleTrumanWatchlist);
}


// 2. SEARCH FEATURE DEMO LOGIC

function executeSearch() {
  var modalSearchInput = document.querySelector('#modalSearchInput');
  var resultsContainer = document.querySelector('#searchResultsContainer');

  if (!modalSearchInput || !resultsContainer) return;

  var query = modalSearchInput.value.trim().toLowerCase();

  if (query === '' || (!query.includes('truman') && !query.includes('show'))) {
    resultsContainer.innerHTML = '<p class="no-results-msg">No movies found</p>';
  } else {
    resultsContainer.innerHTML = `
    <a href="details.html">
      <div class="search-result-card">
        <div class="search-result-info">
          <h3>The Truman Show</h3>
          <p>PG, 1998, 1h 42m, Comedy/Drama</p>
          <img class="search-result-poster" src="images/truman-poster.png" alt="The Truman Show" />
        </div>
        <div class="search-result-trailer">
            <img src="images/Trailer.png" alt="Truman Trailer Preview" />
        </div>
      </div>
    </a>
    `;
  }
}

var headerSearchTrigger = document.querySelector('#headerSearchTrigger');
var searchModalOverlay = document.querySelector('#searchModalOverlay');
var closeSearchModal = document.querySelector('#closeSearchModal');
var submitSearch = document.querySelector('#submitSearch');
var modalSearchInput = document.querySelector('#modalSearchInput');

if (headerSearchTrigger && searchModalOverlay) {
  headerSearchTrigger.addEventListener('click', function () {
    searchModalOverlay.classList.add('open');
    if (modalSearchInput) modalSearchInput.focus();
  });
}

if (closeSearchModal && searchModalOverlay) {
  closeSearchModal.addEventListener('click', function () {
    searchModalOverlay.classList.remove('open');
  });
}

if (submitSearch) {
  submitSearch.addEventListener('click', function (e) {
    e.preventDefault();
    executeSearch();
  });
}

if (modalSearchInput) {
  modalSearchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeSearch();
    }
  });
}

updateWatchlistUI();