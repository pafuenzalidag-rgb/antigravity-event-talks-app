document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const btnRefresh = document.getElementById('btn-refresh');
    const spinner = document.getElementById('refresh-spinner');
    const notesContainer = document.getElementById('notes-container');
    const errorToast = document.getElementById('error-toast');
    const toastMessage = document.getElementById('toast-message');

    // Composer Elements
    const composerEmpty = document.getElementById('composer-empty');
    const composerForm = document.getElementById('composer-form');
    const composerType = document.getElementById('composer-update-type');
    const composerDate = document.getElementById('composer-update-date');
    const htmlPreview = document.getElementById('composer-html-preview');
    const tweetTextarea = document.getElementById('tweet-textarea');
    const charCounter = document.getElementById('char-counter');
    const charProgress = document.getElementById('char-progress');
    const btnTweet = document.getElementById('btn-tweet');

    // State Variables
    let selectedUpdate = null;
    const MAX_TWEET_CHARS = 280;
    const RING_CIRCUMFERENCE = 2 * Math.PI * 8; // r=8

    // Initialize Progress Ring
    charProgress.style.strokeDasharray = `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`;
    charProgress.style.strokeDashoffset = RING_CIRCUMFERENCE;

    // Toast Notification helper
    function showToast(message) {
        toastMessage.textContent = message;
        errorToast.classList.remove('hidden');
        errorToast.style.opacity = '1';
        
        setTimeout(() => {
            errorToast.style.opacity = '0';
            setTimeout(() => {
                errorToast.classList.add('hidden');
            }, 300);
        }, 5000);
    }

    // Generate Tweet content templates dynamically
    function draftTweetText(date, type, plainText, link) {
        // Compose a clean professional developer tweet
        const header = `📢 BQ Release (${date}) - [${type}]:\n`;
        const footer = `\n\nDocs: ${link}`;
        
        // Calculate limit for description body
        const reservedLen = header.length + footer.length;
        const maxBodyLen = MAX_TWEET_CHARS - reservedLen;
        
        let body = plainText;
        if (body.length > maxBodyLen) {
            body = body.substring(0, maxBodyLen - 3) + '...';
        }
        
        return `${header}${body}${footer}`;
    }

    // Update character progress circle ring and counter
    function updateCharCount() {
        const textLen = tweetTextarea.value.length;
        const remaining = MAX_TWEET_CHARS - textLen;
        
        charCounter.textContent = remaining;
        
        // Calculate offset
        const percentage = Math.min(textLen / MAX_TWEET_CHARS, 1);
        const offset = RING_CIRCUMFERENCE - (percentage * RING_CIRCUMFERENCE);
        charProgress.style.strokeDashoffset = offset;
        
        const countGroup = document.querySelector('.char-count-group');
        
        if (textLen > MAX_TWEET_CHARS) {
            countGroup.classList.add('limit-reached');
            btnTweet.disabled = true;
        } else {
            countGroup.classList.remove('limit-reached');
            btnTweet.disabled = textLen === 0;
        }
    }

    // Populate Composer with selected card details
    function selectCard(updateData, cardElement) {
        // Toggle active classes
        document.querySelectorAll('.update-card').forEach(c => c.classList.remove('active'));
        cardElement.classList.add('active');

        selectedUpdate = updateData;

        // Show composer form & hide empty state
        composerEmpty.classList.add('hidden');
        composerForm.classList.remove('hidden');

        // Set type badge & color styling
        composerType.textContent = updateData.type;
        composerType.className = `composer-tag badge badge-${updateData.type.toLowerCase()}`;
        
        // Date
        composerDate.textContent = updateData.date;

        // Populate Raw HTML Preview
        htmlPreview.innerHTML = updateData.description_html;

        // Draft Tweet text
        const initialTweetText = draftTweetText(
            updateData.date,
            updateData.type,
            updateData.description_text,
            updateData.link || 'https://cloud.google.com/bigquery/docs/release-notes'
        );

        tweetTextarea.value = initialTweetText;
        updateCharCount();
    }

    // Renders the feed elements
    function renderReleaseNotes(entries) {
        notesContainer.innerHTML = '';
        
        if (!entries || entries.length === 0) {
            notesContainer.innerHTML = `
                <div class="composer-empty-state">
                    <h3>No Release Notes Found</h3>
                    <p>There are no current BigQuery release notes in the feed.</p>
                </div>
            `;
            return;
        }

        entries.forEach(entry => {
            // A Date Group containing multiple updates
            const dateGroup = document.createElement('div');
            dateGroup.className = 'date-group';

            // Header date title
            const header = document.createElement('h3');
            header.className = 'date-header';
            header.textContent = entry.date;
            dateGroup.appendChild(header);

            // Cards list
            const cardsList = document.createElement('div');
            cardsList.className = 'update-cards-list';

            entry.updates.forEach(update => {
                const card = document.createElement('div');
                card.className = 'update-card';
                
                // Add unique attributes or click bind
                const updateData = {
                    date: entry.date,
                    type: update.type,
                    description_html: update.description_html,
                    description_text: update.description_text,
                    link: entry.link
                };

                const typeBadgeClass = `badge badge-${update.type.toLowerCase()}`;
                
                card.innerHTML = `
                    <div class="card-header">
                        <span class="${typeBadgeClass}">${update.type}</span>
                        <a href="${entry.link}" target="_blank" class="card-link" title="Open official documentation" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                    </div>
                    <div class="card-content">
                        ${update.description_html}
                    </div>
                `;

                card.addEventListener('click', (e) => {
                    // Prevent trigger if clicking directly on link
                    if (e.target.closest('.card-link') || e.target.closest('a')) {
                        return;
                    }
                    selectCard(updateData, card);
                });

                cardsList.appendChild(card);
            });

            dateGroup.appendChild(cardsList);
            notesContainer.appendChild(dateGroup);
        });
    }

    // Fetch API Release notes
    async function loadReleaseNotes(isRefresh = false) {
        if (isRefresh) {
            spinner.classList.add('active');
            btnRefresh.disabled = true;
        }

        try {
            const response = await fetch('/api/release-notes');
            const result = await response.json();

            if (result.success) {
                renderReleaseNotes(result.data);
            } else {
                showToast(result.error || 'Server failed to return data.');
            }
        } catch (error) {
            showToast('Network error loading release notes.');
            console.error('Fetch error:', error);
        } finally {
            if (isRefresh) {
                spinner.classList.remove('active');
                btnRefresh.disabled = false;
            }
        }
    }

    // Event Listeners
    btnRefresh.addEventListener('click', () => {
        loadReleaseNotes(true);
    });

    tweetTextarea.addEventListener('input', updateCharCount);

    btnTweet.addEventListener('click', () => {
        const text = tweetTextarea.value;
        if (text) {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
            window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=550,height=420');
        }
    });

    // Initial load
    loadReleaseNotes(false);
});
