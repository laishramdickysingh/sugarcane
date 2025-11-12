// Video data
let videos = [
    { id: 1, title: 'Song 2', src: '2songs.mp4', thumbnail: 'pic.jpg', category: 'music', views: 1000, date: '2023-01-01', duration: '3:45' },
    { id: 2, title: 'Song 3', src: '3song.mp4', thumbnail: 'pic.jpg', category: 'music', views: 1500, date: '2023-01-02', duration: '4:20' },
    { id: 3, title: 'Song 4', src: '4song.mp4', thumbnail: 'pic.jpg', category: 'music', views: 800, date: '2023-01-03', duration: '2:30' },
    { id: 4, title: 'Song 5', src: '5song.mp4', thumbnail: 'pic.jpg', category: 'music', views: 1200, date: '2023-01-04', duration: '5:10' },
    { id: 5, title: 'Song 6', src: '6song.mp4', thumbnail: 'pic.jpg', category: 'music', views: 900, date: '2023-01-05', duration: '3:15' },
    { id: 6, title: 'James Video', src: 'james2.mp4', thumbnail: 'pic.jpg', category: 'other', views: 700, date: '2023-01-06', duration: '6:00' },
    { id: 7, title: 'Song 8', src: '8song.mp4', thumbnail: 'pic.jpg', category: 'music', views: 1100, date: '2023-01-07', duration: '4:50' },
    { id: 8, title: 'Video Playback', src: 'videoplayback.mp4', thumbnail: 'pic.jpg', category: 'nature', views: 2000, date: '2023-01-08', duration: '7:30' },
    { id: 9, title: 'Song 9', src: '9song.mp4', thumbnail: 'pic.jpg', category: 'music', views: 600, date: '2023-01-09', duration: '3:20' },
    { id: 10, title: 'Song 10', src: '10song.mp4', thumbnail: 'pic.jpg', category: 'music', views: 1300, date: '2023-01-10', duration: '5:40' },
    { id: 11, title: 'Last Video', src: 'lastvideo.mp4', thumbnail: 'pic.jpg', category: 'other', views: 500, date: '2023-01-11', duration: '2:10' }
];

// Page data for search
let pages = [
    { id: 'login', title: 'Login', url: 'loginform.html', description: 'Login to your account' },
    { id: 'register', title: 'Register', url: 'register form.html', description: 'Create a new account' },
    { id: 'logout', title: 'Logout', url: 'logoutform.html', description: 'Logout from your account' },
    { id: 'settings', title: 'Settings', url: 'setting.html', description: 'Manage your settings' }
];

// Hamburger menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sideMenu = document.getElementById('side-menu');
    const closeMenu = document.getElementById('close-menu');
    const sideMenuContent = document.querySelector('.side-menu-content');

    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        sideMenu.classList.toggle('open');
    });

    closeMenu.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        sideMenu.classList.remove('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!sideMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            hamburgerMenu.classList.remove('active');
            sideMenu.classList.remove('open');
        }
    });

    function displayMessage(message, isSuccess) {
        // Remove existing message
        const existingMessage = sideMenuContent.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'auth-message ' + (isSuccess ? 'success' : 'error');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            color: white;
            text-align: center;
            font-weight: bold;
        `;
        if (isSuccess) {
            messageDiv.style.backgroundColor = '#28a745';
        } else {
            messageDiv.style.backgroundColor = '#dc3545';
        }

        // Insert after h2
        const h2 = sideMenuContent.querySelector('h2');
        h2.insertAdjacentElement('afterend', messageDiv);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Dropdown menu functionality with delay to prevent fast disappearance
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const content = dropdown.querySelector('.dropdown-content');
        let hideTimeout;
        let isOver = false;

        button.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
            isOver = true;
            content.style.visibility = 'visible';
            content.style.opacity = '1';
        });

        dropdown.addEventListener('mouseleave', () => {
            isOver = false;
            hideTimeout = setTimeout(() => {
                if (!isOver) {
                    content.style.visibility = 'hidden';
                    content.style.opacity = '0';
                    // Hide all submenus
                    content.querySelectorAll('.submenu, .sub-submenu').forEach(sub => {
                        sub.style.visibility = 'hidden';
                        sub.style.opacity = '0';
                    });
                }
            }, 500); // Delay hiding by 500ms
        });

        content.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
            isOver = true;
        });

        content.addEventListener('mouseleave', () => {
            isOver = false;
            hideTimeout = setTimeout(() => {
                if (!isOver) {
                    content.style.visibility = 'hidden';
                    content.style.opacity = '0';
                    // Hide all submenus
                    content.querySelectorAll('.submenu, .sub-submenu').forEach(sub => {
                        sub.style.visibility = 'hidden';
                        sub.style.opacity = '0';
                    });
                }
            }, 500); // Delay hiding by 500ms
        });

        // Add mouseenter and mouseleave handlers to li elements to show/hide submenus
        content.querySelectorAll('li').forEach(li => {
            li.addEventListener('mouseenter', () => {
                clearTimeout(hideTimeout);
                const submenu = li.querySelector('.submenu, .sub-submenu');
                if (submenu) {
                    submenu.style.visibility = 'visible';
                    submenu.style.opacity = '1';
                }
            });
            li.addEventListener('mouseleave', () => {
                const submenu = li.querySelector('.submenu, .sub-submenu');
                if (submenu) {
                    submenu.style.visibility = 'hidden';
                    submenu.style.opacity = '0';
                }
            });
        });

        // Also for li in submenus
        content.querySelectorAll('.submenu li').forEach(li => {
            li.addEventListener('mouseenter', () => {
                clearTimeout(hideTimeout);
                const subsubmenu = li.querySelector('.sub-submenu');
                if (subsubmenu) {
                    subsubmenu.style.visibility = 'visible';
                    subsubmenu.style.opacity = '1';
                }
            });
            li.addEventListener('mouseleave', () => {
                const subsubmenu = li.querySelector('.sub-submenu');
                if (subsubmenu) {
                    subsubmenu.style.visibility = 'hidden';
                    subsubmenu.style.opacity = '0';
                }
            });
        });

        // Add mouseenter handlers to submenu and sub-submenu to keep them visible
        content.querySelectorAll('.submenu, .sub-submenu').forEach(submenu => {
            submenu.addEventListener('mouseenter', () => {
                clearTimeout(hideTimeout);
                isOver = true;
            });
            submenu.addEventListener('mouseleave', () => {
                isOver = false;
            });
        });
    });
});

// Side Menu Dropdowns and Auth Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Menu dropdowns
    const profileBtn = document.getElementById('profile-btn');
    const profileContent = document.getElementById('profile-content');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsContent = document.getElementById('settings-content');
    const helpBtn = document.getElementById('help-btn');
    const helpContent = document.getElementById('help-content');

    profileBtn.addEventListener('click', function() {
        toggleDropdown(profileContent);
    });

    settingsBtn.addEventListener('click', function() {
        toggleDropdown(settingsContent);
    });

    helpBtn.addEventListener('click', function() {
        toggleDropdown(helpContent);
    });

    function toggleDropdown(content) {
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            // Hide other dropdowns
            [profileContent, settingsContent, helpContent].forEach(c => c.style.display = 'none');
            content.style.display = 'block';
        }
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved theme preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // Navigation to separate pages
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const settingsLink = document.getElementById('settings-link');

    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'loginform.html';
    });

    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'register form.html';
    });

    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'logoutform.html';
    });

    settingsLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'setting.html';
    });

    // Search bar functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            }
        }
    });

    // Modal functionality
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeModal = document.getElementById('close-modal');
    const likeBtn = document.getElementById('like-btn');
    const dislikeBtn = document.getElementById('dislike-btn');
    const shareBtn = document.getElementById('share-btn');
    const commentInput = document.getElementById('comment-input');
    const addCommentBtn = document.getElementById('add-comment-btn');
    const commentsList = document.getElementById('comments-list');

    function openModal(video) {
        modalVideo.src = video.src;
        modal.style.display = 'flex';
        // Make modal background opaque
        modal.style.background = 'rgba(0, 0, 0, 0.9)';
        // Hide video grid or other content if needed
        const videoGrid = document.querySelector('.video-grid');
        if (videoGrid) {
            videoGrid.style.display = 'none';
        }
        // Hide banner
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        modalVideo.pause();
        // Restore video grid display
        const videoGrid = document.querySelector('.video-grid');
        if (videoGrid) {
            videoGrid.style.display = 'grid';
        }
        // Restore banner
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.display = 'block';
        }
    });

    likeBtn.addEventListener('click', function() {
        alert('Liked!');
    });

    dislikeBtn.addEventListener('click', function() {
        alert('Disliked!');
    });

    shareBtn.addEventListener('click', function() {
        navigator.share ? navigator.share({ title: 'Video', url: window.location.href }) : alert('Share not supported');
    });

    const backHomeBtn = document.getElementById('back-home-btn');
    backHomeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        modalVideo.pause();
        // Restore video grid display
        const videoGrid = document.querySelector('.video-grid');
        if (videoGrid) {
            videoGrid.style.display = 'grid';
        }
        // Restore banner
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.display = 'block';
        }
    });

    addCommentBtn.addEventListener('click', function() {
        const comment = commentInput.value.trim();
        if (comment) {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.textContent = `You: ${comment}`;
            commentsList.appendChild(commentDiv);
            commentInput.value = '';
        }
    });

    // Video resize on play/pause/ended
    modalVideo.addEventListener('play', () => {
        modalVideo.style.height = '50vh';
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.width = '50vw';
            modalContent.style.maxWidth = 'none';
        }
        // Hide background
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.display = 'none';
        }
        modal.style.background = 'rgba(0, 0, 0, 1)';
    });
    modalVideo.addEventListener('pause', () => {
        modalVideo.style.height = '400px';
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.width = '90%';
            modalContent.style.maxWidth = '800px';
        }
        // Show background
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.display = 'block';
        }
        modal.style.background = 'rgba(0, 0, 0, 0.9)';
    });
    modalVideo.addEventListener('ended', () => {
        modalVideo.style.height = '400px';
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.width = '90%';
            modalContent.style.maxWidth = '800px';
        }
        // Show background
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.display = 'block';
        }
        modal.style.background = 'rgba(0, 0, 0, 0.9)';
    });

    // Middle search bar functionality for searching videos by title or id and navigating to created activities
    const searchInputCenter = document.getElementById('search-input-center');
    const searchResults = document.getElementById('search-results');
    const videoGrid = document.querySelector('.video-grid');
    searchInputCenter.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = searchInputCenter.value.trim().toLowerCase();
            if (query) {
                const videoResults = videos.filter(video => video.title.toLowerCase().includes(query) || video.id.toString() === query);
                const pageResults = pages.filter(page => page.title.toLowerCase().includes(query) || page.id === query);
                const results = [...videoResults, ...pageResults];
                renderSearchResults(results);
            } else {
                searchResults.style.display = 'none';
                if (videoGrid) videoGrid.style.display = 'grid';
            }
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInputCenter.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.style.display = 'none';
            if (videoGrid) videoGrid.style.display = 'grid';
        }
    });

    // Function to render search results for middle search bar
    function renderSearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
        } else {
            searchResults.innerHTML = results.map(item => {
                if (item.src) {
                    // Video
                    return `
                        <div class="video-item" data-id="${item.id}">
                            <video controls style="width: 100%; height: 200px; object-fit: cover;">
                                <source src="${item.src}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="video-info">
                                <div class="video-title">${item.title}</div>
                                <div class="video-meta">${item.views} views • ${item.date}</div>
                            </div>
                        </div>
                    `;
                } else {
                    // Page
                    return `
                        <div class="page-item" data-id="${item.id}">
                            <a href="${item.url}" style="text-decoration: none; color: inherit;">
                                <div class="page-info">
                                    <div class="page-title">${item.title}</div>
                                    <div class="page-description">${item.description}</div>
                                </div>
                            </a>
                        </div>
                    `;
                }
            }).join('');
        }
        searchResults.style.display = 'block';
        if (videoGrid) videoGrid.style.display = 'none';

        // Add click listeners to video items to enable sound on click
        document.querySelectorAll('.video-item video').forEach(videoEl => {
            videoEl.addEventListener('click', function() {
                if (this.muted) {
                    this.muted = false;
                    this.play();
                }
            });
        });
    }
});

// Video controls for slider videos
document.querySelectorAll('.slider .item video').forEach(video => {
    video.addEventListener('click', () => {
        video.muted = false;
    });
});

document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const video = btn.closest('.item').querySelector('video');
        video.play();
    });
});

document.querySelectorAll('.pause-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const video = btn.closest('.item').querySelector('video');
        video.pause();
    });
});

// Solar System Orbit Animation for Videos
document.addEventListener('DOMContentLoaded', function() {
    const rotateClockwise = document.querySelector('.rotate-clockwise');
    const rotateAntiClockwise = document.querySelector('.rotate-anticlockwise');
    const centerVideo = document.querySelector('.tom video');
    const orbitRadius = 25; // vw units, matching CSS translateZ

    function animateOrbit() {
        const time = Date.now() * 0.001; // seconds

        // Clockwise rotation for first 5 videos
        const clockwiseItems = rotateClockwise.querySelectorAll('.item');
        clockwiseItems.forEach((item, index) => {
            const angle = (time * 0.5 + index * (360 / 5) * Math.PI / 180) % (2 * Math.PI);
            const x = Math.cos(angle) * orbitRadius;
            const z = Math.sin(angle) * orbitRadius;
            item.style.transform = `translateX(${x}vw) translateZ(${z}vw)`;
        });

        // Anti-clockwise rotation for next 5 videos
        const antiClockwiseItems = rotateAntiClockwise.querySelectorAll('.item');
        antiClockwiseItems.forEach((item, index) => {
            const angle = (-time * 0.5 + index * (360 / 5) * Math.PI / 180) % (2 * Math.PI);
            const x = Math.cos(angle) * orbitRadius;
            const z = Math.sin(angle) * orbitRadius;
            item.style.transform = `translateX(${x}vw) translateZ(${z}vw)`;
        });

        // Spin the center video 360 degrees continuously
        centerVideo.style.transform = `rotateY(${time * 60}deg)`;

        requestAnimationFrame(animateOrbit);
    }

    animateOrbit();
});

// Snowfall with wind effect
const snowContainer = document.getElementById('snow-container');
const snowflakeCount = 50;
const snowflakes = [];

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    const size = randomRange(5, 12);
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${randomRange(0, window.innerWidth)}px`;
    snowflake.style.animationDuration = `${randomRange(5, 15)}s, ${randomRange(2, 4)}s`;
    snowflake.style.opacity = randomRange(0.5, 1);
    snowflake.style.fontSize = `${size}px`;
    snowContainer.appendChild(snowflake);
    return snowflake;
}

function initSnowflakes() {
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = createSnowflake();
        snowflake.style.top = `${randomRange(-100, -10)}px`;
        snowflakes.push(snowflake);
    }
}

function updateSnowflakes() {
    snowflakes.forEach(snowflake => {
        let currentLeft = parseFloat(snowflake.style.left);
        let swayAmount = 0.5; // wind strength
        let newLeft = currentLeft + swayAmount * (Math.random() > 0.5 ? 1 : -1);
        if (newLeft < 0) newLeft = window.innerWidth;
        if (newLeft > window.innerWidth) newLeft = 0;
        snowflake.style.left = `${newLeft}px`;

        let currentTop = parseFloat(snowflake.style.top);
        let fallSpeed = parseFloat(snowflake.style.animationDuration.split(',')[0]) || 10;
        let newTop = currentTop + (100 / fallSpeed);
        if (newTop > window.innerHeight) {
            newTop = randomRange(-100, -10);
            snowflake.style.left = `${randomRange(0, window.innerWidth)}px`;
        }
        snowflake.style.top = `${newTop}px`;
    });
}

initSnowflakes();
setInterval(updateSnowflakes, 50);

// Falling Leaves
const leavesContainer = document.getElementById('leaves-container');
const leafCount = 30;
const leaves = [];

function createLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    const size = randomRange(30, 50);
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size * 1.5}px`;
    leaf.style.left = `${randomRange(0, window.innerWidth)}px`;
    leaf.style.animationDuration = `${randomRange(8, 15)}s`;
    leaf.style.animationDelay = `${randomRange(0, 5)}s`;
    leavesContainer.appendChild(leaf);
    return leaf;
}

function initLeaves() {
    for (let i = 0; i < leafCount; i++) {
        const leaf = createLeaf();
        leaf.style.top = `${randomRange(-100, -10)}px`;
        leaves.push(leaf);
    }
}

function updateLeaves() {
    leaves.forEach(leaf => {
        let currentLeft = parseFloat(leaf.style.left);
        let swayAmount = randomRange(0.5, 1.5); // wind strength
        let newLeft = currentLeft + swayAmount * (Math.random() > 0.5 ? 1 : -1);
        if (newLeft < 0) newLeft = window.innerWidth;
        if (newLeft > window.innerWidth) newLeft = 0;
        leaf.style.left = `${newLeft}px`;

        let currentTop = parseFloat(leaf.style.top);
        let fallSpeed = parseFloat(leaf.style.animationDuration) || 10;
        let newTop = currentTop + (100 / fallSpeed);
        if (newTop > window.innerHeight) {
            newTop = randomRange(-100, -10);
            leaf.style.left = `${randomRange(0, window.innerWidth)}px`;
        }
        leaf.style.top = `${newTop}px`;
    });
}

initLeaves();
setInterval(updateLeaves, 100);
