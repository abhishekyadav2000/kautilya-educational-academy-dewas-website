/**
 * Kautilya Educational Academy - Blog/Achievements Manager
 * LinkedIn-style blog system with admin panel
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        storageKey: 'kea_blog_posts',
        adminPassword: 'kea2026', // Change this to your preferred password
        maxImageSize: 5 * 1024 * 1024, // 5MB
    };

    // Default sample posts
    const DEFAULT_POSTS = [
        {
            id: 1,
            type: 'achievement',
            title: '🏆 Outstanding Board Exam Results 2025-26',
            content: 'We are proud to announce that our students have achieved exceptional results in the CBSE Board Examinations! Our school toppers secured above 95% marks, bringing glory to Kautilya Educational Academy.\n\nCongratulations to all students and teachers for their hard work and dedication!',
            image: '',
            video: '',
            author: 'Principal',
            date: '2026-01-28',
            likes: 45,
            featured: true
        },
        {
            id: 2,
            type: 'event',
            title: '🎭 Annual Day Celebration 2026',
            content: 'Our Annual Day was celebrated with great enthusiasm and fervor. Students showcased their talents through dance, drama, and music performances. The chief guest appreciated the holistic development approach of our school.',
            image: '',
            video: '',
            author: 'Cultural Committee',
            date: '2026-01-20',
            likes: 38,
            featured: false
        },
        {
            id: 3,
            type: 'sports',
            title: '⚽ District Level Football Champions!',
            content: 'Our school football team has won the District Level Football Championship! The team showed excellent teamwork and sportsmanship throughout the tournament.\n\nSpecial congratulations to the team captain and coach for their leadership.',
            image: '',
            video: '',
            author: 'Sports Department',
            date: '2026-01-15',
            likes: 62,
            featured: true
        },
        {
            id: 4,
            type: 'announcement',
            title: '📢 Admissions Open for 2026-27',
            content: 'We are pleased to announce that admissions for the academic session 2026-27 are now open for all classes from Nursery to Class XII.\n\nLimited seats available. Apply now to secure your child\'s future with quality education!',
            image: '',
            video: '',
            author: 'Admissions Office',
            date: '2026-01-10',
            likes: 28,
            featured: false
        }
    ];

    // State
    let posts = [];
    let isAdmin = false;
    let currentFilter = 'all';
    let editingPostId = null;

    // Initialize
    function init() {
        loadPosts();
        renderPosts();
        setupEventListeners();
        setupAdminToggle();
    }

    // Load posts from localStorage or use defaults
    function loadPosts() {
        const stored = localStorage.getItem(CONFIG.storageKey);
        if (stored) {
            try {
                posts = JSON.parse(stored);
            } catch (e) {
                posts = [...DEFAULT_POSTS];
            }
        } else {
            posts = [...DEFAULT_POSTS];
            savePosts();
        }
    }

    // Save posts to localStorage
    function savePosts() {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(posts));
    }

    // Render all posts
    function renderPosts() {
        const feed = document.getElementById('blogFeed');
        if (!feed) return;

        const filteredPosts = currentFilter === 'all' 
            ? posts 
            : posts.filter(p => p.type === currentFilter);

        if (filteredPosts.length === 0) {
            feed.innerHTML = `
                <div class="no-posts">
                    <div class="no-posts-icon">📭</div>
                    <h3>No posts yet</h3>
                    <p>Check back later for updates!</p>
                </div>
            `;
            return;
        }

        // Sort by date (newest first) and featured
        const sortedPosts = [...filteredPosts].sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return new Date(b.date) - new Date(a.date);
        });

        feed.innerHTML = sortedPosts.map(post => createPostCard(post)).join('');

        // Add event listeners to post actions
        setupPostActions();
    }

    // Create a single post card
    function createPostCard(post) {
        const typeIcons = {
            achievement: '🏆',
            event: '🎉',
            announcement: '📢',
            sports: '⚽',
            news: '📰'
        };

        const typeColors = {
            achievement: '#d4a84b',
            event: '#e74c3c',
            announcement: '#3498db',
            sports: '#27ae60',
            news: '#9b59b6'
        };

        const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        const mediaHTML = getMediaHTML(post);

        return `
            <article class="blog-post ${post.featured ? 'featured' : ''}" data-id="${post.id}" data-type="${post.type}">
                ${post.featured ? '<div class="featured-badge">⭐ Featured</div>' : ''}
                
                <div class="post-header">
                    <div class="post-author">
                        <div class="author-avatar">${post.author.charAt(0).toUpperCase()}</div>
                        <div class="author-info">
                            <span class="author-name">${escapeHTML(post.author)}</span>
                            <span class="post-meta">
                                <span class="post-date">${formattedDate}</span>
                                <span class="post-type" style="background: ${typeColors[post.type] || '#666'}">
                                    ${typeIcons[post.type] || '📝'} ${post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                                </span>
                            </span>
                        </div>
                    </div>
                    ${isAdmin ? `
                        <div class="post-actions-menu">
                            <button class="post-menu-btn" title="Options">⋮</button>
                            <div class="post-menu-dropdown">
                                <button class="edit-post-btn" data-id="${post.id}">✏️ Edit</button>
                                <button class="delete-post-btn" data-id="${post.id}">🗑️ Delete</button>
                                <button class="toggle-featured-btn" data-id="${post.id}">
                                    ${post.featured ? '⭐ Unfeature' : '⭐ Feature'}
                                </button>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <div class="post-content">
                    <h3 class="post-title">${escapeHTML(post.title)}</h3>
                    <div class="post-text">${formatContent(post.content)}</div>
                </div>

                ${mediaHTML}

                <div class="post-footer">
                    <button class="like-btn ${post.liked ? 'liked' : ''}" data-id="${post.id}">
                        <span class="like-icon">${post.liked ? '❤️' : '🤍'}</span>
                        <span class="like-count">${post.likes || 0}</span>
                    </button>
                    <button class="share-btn" data-id="${post.id}">
                        <span>🔗</span> Share
                    </button>
                </div>
            </article>
        `;
    }

    // Get media HTML (image or video)
    function getMediaHTML(post) {
        let html = '';

        if (post.image) {
            html += `
                <div class="post-media">
                    <img src="${post.image}" alt="${escapeHTML(post.title)}" loading="lazy" onclick="openImageModal(this.src)">
                </div>
            `;
        }

        if (post.video) {
            // Check if it's a YouTube URL
            const youtubeId = extractYouTubeId(post.video);
            if (youtubeId) {
                html += `
                    <div class="post-media video-container">
                        <iframe 
                            src="https://www.youtube.com/embed/${youtubeId}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                `;
            } else {
                html += `
                    <div class="post-media">
                        <video controls>
                            <source src="${post.video}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                `;
            }
        }

        return html;
    }

    // Extract YouTube video ID
    function extractYouTubeId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    // Format content with line breaks
    function formatContent(content) {
        return escapeHTML(content).replace(/\n/g, '<br>');
    }

    // Escape HTML
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentFilter = tab.dataset.filter;
                renderPosts();
            });
        });
    }

    // Setup post action listeners
    function setupPostActions() {
        // Like buttons
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const post = posts.find(p => p.id === id);
                if (post) {
                    post.liked = !post.liked;
                    post.likes = post.liked ? (post.likes || 0) + 1 : Math.max(0, (post.likes || 1) - 1);
                    savePosts();
                    renderPosts();
                }
            });
        });

        // Share buttons
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const url = window.location.href;
                if (navigator.share) {
                    navigator.share({
                        title: 'Kautilya Educational Academy - Achievement',
                        url: url
                    });
                } else {
                    navigator.clipboard.writeText(url);
                    showToast('Link copied to clipboard!');
                }
            });
        });

        // Post menu toggle
        document.querySelectorAll('.post-menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = btn.nextElementSibling;
                dropdown.classList.toggle('show');
            });
        });

        // Edit buttons
        document.querySelectorAll('.edit-post-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                openEditor(id);
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-post-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                if (confirm('Are you sure you want to delete this post?')) {
                    posts = posts.filter(p => p.id !== id);
                    savePosts();
                    renderPosts();
                    showToast('Post deleted!');
                }
            });
        });

        // Toggle featured
        document.querySelectorAll('.toggle-featured-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const post = posts.find(p => p.id === id);
                if (post) {
                    post.featured = !post.featured;
                    savePosts();
                    renderPosts();
                    showToast(post.featured ? 'Post featured!' : 'Post unfeatured');
                }
            });
        });

        // Close dropdowns on outside click
        document.addEventListener('click', () => {
            document.querySelectorAll('.post-menu-dropdown.show').forEach(d => d.classList.remove('show'));
        });
    }

    // Admin toggle setup
    function setupAdminToggle() {
        const adminBtn = document.getElementById('adminToggle');
        if (!adminBtn) return;

        // Triple-click to activate admin mode
        let clickCount = 0;
        let clickTimer;

        adminBtn.addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimer);
            
            if (clickCount === 3) {
                clickCount = 0;
                if (isAdmin) {
                    isAdmin = false;
                    showToast('Admin mode disabled');
                    renderPosts();
                } else {
                    const password = prompt('Enter admin password:');
                    if (password === CONFIG.adminPassword) {
                        isAdmin = true;
                        showToast('Admin mode enabled! You can now edit posts.');
                        showAdminPanel();
                        renderPosts();
                    } else if (password !== null) {
                        showToast('Incorrect password!');
                    }
                }
            }

            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 500);
        });
    }

    // Show admin panel
    function showAdminPanel() {
        // Remove existing panel
        const existing = document.getElementById('adminPanel');
        if (existing) existing.remove();

        const panel = document.createElement('div');
        panel.id = 'adminPanel';
        panel.className = 'admin-panel';
        panel.innerHTML = `
            <div class="admin-header">
                <h3>📝 Admin Panel</h3>
                <button class="close-admin" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
            <button class="btn btn-primary btn-block" onclick="window.blogManager.openEditor()">
                ➕ Create New Post
            </button>
            <button class="btn btn-outline btn-block" onclick="window.blogManager.exportPosts()">
                📥 Export Posts (JSON)
            </button>
            <label class="btn btn-outline btn-block import-btn">
                📤 Import Posts (JSON)
                <input type="file" accept=".json" onchange="window.blogManager.importPosts(event)" hidden>
            </label>
        `;
        document.body.appendChild(panel);
    }

    // Open post editor
    function openEditor(postId = null) {
        editingPostId = postId;
        const post = postId ? posts.find(p => p.id === postId) : null;

        // Remove existing modal
        const existing = document.getElementById('editorModal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'editorModal';
        modal.className = 'editor-modal';
        modal.innerHTML = `
            <div class="editor-content">
                <div class="editor-header">
                    <h2>${post ? '✏️ Edit Post' : '➕ Create New Post'}</h2>
                    <button class="close-editor" onclick="document.getElementById('editorModal').remove()">✕</button>
                </div>
                
                <form id="postForm" class="post-form">
                    <div class="form-group">
                        <label for="postType">Post Type</label>
                        <select id="postType" required>
                            <option value="achievement" ${post?.type === 'achievement' ? 'selected' : ''}>🏆 Achievement</option>
                            <option value="event" ${post?.type === 'event' ? 'selected' : ''}>🎉 Event</option>
                            <option value="announcement" ${post?.type === 'announcement' ? 'selected' : ''}>📢 Announcement</option>
                            <option value="sports" ${post?.type === 'sports' ? 'selected' : ''}>⚽ Sports</option>
                            <option value="news" ${post?.type === 'news' ? 'selected' : ''}>📰 News</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="postTitle">Title</label>
                        <input type="text" id="postTitle" value="${post ? escapeHTML(post.title) : ''}" required placeholder="Enter post title...">
                    </div>

                    <div class="form-group">
                        <label for="postContent">Content</label>
                        <textarea id="postContent" rows="6" required placeholder="Write your post content here...">${post ? escapeHTML(post.content) : ''}</textarea>
                    </div>

                    <div class="form-group">
                        <label for="postAuthor">Author</label>
                        <input type="text" id="postAuthor" value="${post ? escapeHTML(post.author) : 'Kautilya Educational Academy'}" required>
                    </div>

                    <div class="form-group">
                        <label for="postDate">Date</label>
                        <input type="date" id="postDate" value="${post ? post.date : new Date().toISOString().split('T')[0]}" required>
                    </div>

                    <div class="form-group">
                        <label>Image</label>
                        <div class="media-input">
                            <input type="text" id="postImage" value="${post?.image || ''}" placeholder="Paste image URL or upload...">
                            <label class="upload-btn">
                                📷 Upload
                                <input type="file" accept="image/*" onchange="window.blogManager.handleImageUpload(event)">
                            </label>
                        </div>
                        <div id="imagePreview" class="image-preview ${post?.image ? 'has-image' : ''}">
                            ${post?.image ? `<img src="${post.image}" alt="Preview">` : '<span>Image preview will appear here</span>'}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="postVideo">Video URL (YouTube or direct link)</label>
                        <input type="text" id="postVideo" value="${post?.video || ''}" placeholder="https://youtube.com/watch?v=...">
                    </div>

                    <div class="form-group checkbox-group">
                        <label>
                            <input type="checkbox" id="postFeatured" ${post?.featured ? 'checked' : ''}>
                            ⭐ Feature this post
                        </label>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="document.getElementById('editorModal').remove()">Cancel</button>
                        <button type="submit" class="btn btn-primary">${post ? 'Update Post' : 'Publish Post'}</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Form submit handler
        document.getElementById('postForm').addEventListener('submit', (e) => {
            e.preventDefault();
            savePost();
        });

        // Image URL change preview
        document.getElementById('postImage').addEventListener('change', (e) => {
            updateImagePreview(e.target.value);
        });
    }

    // Handle image upload
    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > CONFIG.maxImageSize) {
            showToast('Image too large! Max size is 5MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            document.getElementById('postImage').value = imageUrl;
            updateImagePreview(imageUrl);
        };
        reader.readAsDataURL(file);
    }

    // Update image preview
    function updateImagePreview(url) {
        const preview = document.getElementById('imagePreview');
        if (url) {
            preview.innerHTML = `<img src="${url}" alt="Preview">`;
            preview.classList.add('has-image');
        } else {
            preview.innerHTML = '<span>Image preview will appear here</span>';
            preview.classList.remove('has-image');
        }
    }

    // Save post
    function savePost() {
        const newPost = {
            id: editingPostId || Date.now(),
            type: document.getElementById('postType').value,
            title: document.getElementById('postTitle').value,
            content: document.getElementById('postContent').value,
            author: document.getElementById('postAuthor').value,
            date: document.getElementById('postDate').value,
            image: document.getElementById('postImage').value,
            video: document.getElementById('postVideo').value,
            featured: document.getElementById('postFeatured').checked,
            likes: editingPostId ? (posts.find(p => p.id === editingPostId)?.likes || 0) : 0
        };

        if (editingPostId) {
            const index = posts.findIndex(p => p.id === editingPostId);
            if (index !== -1) {
                posts[index] = newPost;
            }
        } else {
            posts.unshift(newPost);
        }

        savePosts();
        renderPosts();
        document.getElementById('editorModal').remove();
        showToast(editingPostId ? 'Post updated!' : 'Post published!');
        editingPostId = null;
    }

    // Export posts
    function exportPosts() {
        const data = JSON.stringify(posts, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'kea_blog_posts.json';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Posts exported!');
    }

    // Import posts
    function importPosts(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    posts = imported;
                    savePosts();
                    renderPosts();
                    showToast(`Imported ${imported.length} posts!`);
                }
            } catch (err) {
                showToast('Invalid JSON file!');
            }
        };
        reader.readAsText(file);
    }

    // Show toast notification
    function showToast(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Image modal
    window.openImageModal = function(src) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="image-modal-content">
                <img src="${src}" alt="Full size image">
                <button class="close-modal" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
        `;
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        document.body.appendChild(modal);
    };

    // Expose necessary functions to window
    window.blogManager = {
        openEditor,
        handleImageUpload,
        exportPosts,
        importPosts
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
