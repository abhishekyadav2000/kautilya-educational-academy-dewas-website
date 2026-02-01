/**
 * Kautilya Educational Academy - AI Navigation Assistant
 * Smart chat widget for helping users navigate the website
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        botName: 'KEA Assistant',
        schoolName: 'Kautilya Educational Academy',
        typingDelay: 800,
        messageDelay: 400
    };

    // Knowledge Base - Intents and Responses
    const KNOWLEDGE_BASE = {
        greetings: {
            patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'namaskar'],
            responses: [
                `Hello! 👋 Welcome to ${CONFIG.schoolName}. How can I help you today?`,
                `Namaste! 🙏 I'm here to help you navigate our school website. What are you looking for?`,
                `Hi there! Welcome to KEA, Dewas. How may I assist you?`
            ],
            quickActions: ['Admissions', 'Contact Us', 'About School', 'Academics']
        },
        admissions: {
            patterns: ['admission', 'admissions', 'enroll', 'enrollment', 'registration', 'apply', 'join', 'seat', 'form'],
            responses: [
                `🎓 **Admissions 2026-27 are now open!**\n\nWe offer admissions from Nursery to Class XII (CBSE Board).\n\n📝 You can apply online or visit our campus.`,
            ],
            link: { text: 'Go to Admissions Page', url: '/pages/admissions.html' },
            quickActions: ['Fee Structure', 'Contact Admissions', 'Visit Campus']
        },
        fees: {
            patterns: ['fee', 'fees', 'cost', 'tuition', 'payment', 'scholarship', 'price'],
            responses: [
                `💰 For detailed fee structure, please visit our Admissions page or contact our office directly.\n\n📞 Call: 9926042015\n📧 Email: principalschool13@gmail.com`
            ],
            link: { text: 'View Admissions', url: '/pages/admissions.html' },
            quickActions: ['Contact Us', 'Admissions']
        },
        contact: {
            patterns: ['contact', 'phone', 'call', 'email', 'address', 'location', 'reach', 'visit', 'where'],
            responses: [
                `📍 **Contact Information**\n\n📞 Phone: 9926042015\n📧 Email: principalschool13@gmail.com\n\n📍 Address: Bhopal Road, Khatamba, Dewas 455001, Madhya Pradesh`
            ],
            link: { text: 'Visit Contact Page', url: '/pages/contact.html' },
            quickActions: ['Get Directions', 'Admissions']
        },
        academics: {
            patterns: ['academic', 'curriculum', 'syllabus', 'class', 'subject', 'cbse', 'study', 'course', 'education'],
            responses: [
                `📚 **Academic Programs**\n\nWe offer CBSE curriculum from Pre-Primary to Senior Secondary:\n\n• Pre-Primary (Nursery - KG)\n• Primary (Classes I - V)\n• Middle School (Classes VI - VIII)\n• Secondary (Classes IX - X)\n• Senior Secondary (Classes XI - XII)`
            ],
            link: { text: 'Explore Academics', url: '/pages/academics.html' },
            quickActions: ['Pre-Primary', 'Primary', 'Secondary']
        },
        facilities: {
            patterns: ['facility', 'facilities', 'campus', 'lab', 'library', 'playground', 'sports', 'infrastructure', 'building'],
            responses: [
                `🏫 **Our Campus Facilities**\n\n• Modern Classrooms\n• Science & Computer Labs\n• Well-stocked Library\n• Sports Facilities\n• Auditorium\n• Safe & Secure Environment`
            ],
            link: { text: 'Explore Campus', url: '/pages/campus.html' },
            quickActions: ['Virtual Tour', 'Contact Us']
        },
        teachers: {
            patterns: ['teacher', 'faculty', 'staff', 'job', 'career', 'vacancy', 'hiring', 'work', 'employment', 'apply job'],
            responses: [
                `👩‍🏫 **Career Opportunities**\n\nWe're always looking for passionate educators to join our team!\n\nTo apply for teaching positions, please send your resume to:\n📧 principalschool13@gmail.com\n\nOr visit our campus with your documents.`
            ],
            link: { text: 'Contact HR', url: '/pages/contact.html' },
            quickActions: ['Contact Us', 'About School']
        },
        about: {
            patterns: ['about', 'history', 'vision', 'mission', 'principal', 'management', 'chairman', 'director'],
            responses: [
                `🏛️ **About Kautilya Educational Academy**\n\nEstablished with a vision to provide quality education, we are committed to nurturing young minds with values, knowledge, and skills for the future.\n\n👨‍💼 Chairman: Mr. Mithlesh Yadav\n👨‍💼 Director: Mr. Chetan Yadav`
            ],
            link: { text: 'Learn More About Us', url: '/pages/about.html' },
            quickActions: ['Vision & Mission', 'Management']
        },
        timing: {
            patterns: ['timing', 'time', 'schedule', 'hours', 'open', 'close', 'working'],
            responses: [
                `⏰ **School Timings**\n\n🏫 School Hours: 8:00 AM - 2:30 PM\n📞 Office Hours: 8:00 AM - 4:00 PM\n\n📅 Working Days: Monday to Saturday`
            ],
            quickActions: ['Contact Us', 'Admissions']
        },
        transport: {
            patterns: ['transport', 'bus', 'van', 'pick', 'drop', 'commute'],
            responses: [
                `🚌 **Transport Facility**\n\nWe provide safe and reliable transport service covering major areas of Dewas.\n\nFor route details and fees, please contact our office:\n📞 9926042015`
            ],
            link: { text: 'Contact Office', url: '/pages/contact.html' },
            quickActions: ['Contact Us', 'Admissions']
        },
        events: {
            patterns: ['event', 'function', 'celebration', 'annual', 'day', 'fest', 'competition'],
            responses: [
                `🎉 **School Events**\n\nWe organize various events throughout the year including:\n\n• Annual Day\n• Sports Day\n• Science Exhibition\n• Cultural Programs\n• Independence & Republic Day\n\nCheck our News section for updates!`
            ],
            link: { text: 'View News & Events', url: '/pages/news.html' },
            quickActions: ['Gallery', 'Contact Us']
        },
        gallery: {
            patterns: ['photo', 'gallery', 'picture', 'image', 'video'],
            responses: [
                `📸 **Photo Gallery**\n\nExplore our school life through photos of events, campus, and activities!`
            ],
            link: { text: 'View Gallery', url: '/pages/gallery.html' },
            quickActions: ['Campus Tour', 'Events']
        },
        thanks: {
            patterns: ['thank', 'thanks', 'thank you', 'helpful', 'great', 'awesome', 'bye', 'goodbye'],
            responses: [
                `You're welcome! 😊 Feel free to ask if you have more questions. Have a great day!`,
                `Happy to help! 🙏 Visit us anytime at our campus. Take care!`,
                `Thank you for choosing Kautilya Educational Academy! 🎓`
            ],
            quickActions: ['Admissions', 'Contact Us']
        },
        directions: {
            patterns: ['direction', 'directions', 'map', 'navigate', 'route', 'how to reach', 'way to', 'get there'],
            responses: [
                `📍 **Get Directions to KEA**\n\nWe're located at Bhopal Road, Khatamba, Dewas 455001.\n\nClick below to open Google Maps for navigation!`
            ],
            link: { text: '🗺️ Open in Google Maps', url: 'https://maps.app.goo.gl/uSatw4Uq5XLxNyq46', external: true },
            quickActions: ['Contact Us', 'Admissions']
        },
        social: {
            patterns: ['social', 'facebook', 'instagram', 'twitter', 'youtube', 'linkedin', 'whatsapp', 'follow', 'connect'],
            responses: [
                `🌐 **Connect With Us on Social Media**\n\nStay updated with school news, events, and activities!\n\nClick on our social media widget or visit the Connect With Us section to follow us on:\n\n• Facebook\n• Instagram\n• Twitter / X\n• YouTube\n• LinkedIn\n• WhatsApp`
            ],
            link: { text: '📱 View All Social Links', url: '/pages/contact.html#connect', external: false },
            quickActions: ['Contact Us', 'WhatsApp Chat', 'Latest News']
        }
    };

    // Default fallback response
    const FALLBACK_RESPONSE = {
        text: `I'm here to help you navigate our website. You can ask me about:\n\n• 🎓 Admissions\n• 📚 Academics\n• 🏫 Campus & Facilities\n• 📞 Contact Information\n• 👩‍🏫 Career Opportunities\n\nOr click on the quick options below!`,
        quickActions: ['Admissions', 'Academics', 'Contact Us', 'About School']
    };

    // Create Chat Widget HTML
    function createChatWidget() {
        const isSubpage = window.location.pathname.includes('/pages/');
        const logoPath = isSubpage ? '../assets/images/school logo.png' : 'assets/images/school logo.png';
        
        const chatHTML = `
            <div class="chat-assistant" id="chat-assistant">
                <button class="chat-toggle" id="chat-toggle" aria-label="Open chat assistant">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
                        <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/>
                    </svg>
                </button>
                
                <div class="chat-window" id="chat-window">
                    <div class="chat-header">
                        <div class="chat-header-avatar">
                            <img src="${logoPath}" alt="KEA">
                        </div>
                        <div class="chat-header-info">
                            <h4>${CONFIG.botName}</h4>
                            <span>Online</span>
                        </div>
                        <button class="chat-close" id="chat-close" aria-label="Close chat">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="chat-messages" id="chat-messages">
                        <!-- Messages will be inserted here -->
                    </div>
                    
                    <div class="chat-input-container">
                        <input type="text" class="chat-input" id="chat-input" placeholder="Type your question..." autocomplete="off">
                        <button class="chat-send" id="chat-send" aria-label="Send message">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    // Initialize chat functionality
    function initChat() {
        const toggle = document.getElementById('chat-toggle');
        const window_el = document.getElementById('chat-window');
        const close = document.getElementById('chat-close');
        const input = document.getElementById('chat-input');
        const send = document.getElementById('chat-send');
        const messages = document.getElementById('chat-messages');

        // Toggle chat window
        toggle.addEventListener('click', () => {
            window_el.classList.toggle('open');
            toggle.classList.toggle('active');
            
            if (window_el.classList.contains('open') && messages.children.length === 0) {
                // Show welcome message
                setTimeout(() => showWelcomeMessage(), 300);
            }
        });

        close.addEventListener('click', () => {
            window_el.classList.remove('open');
            toggle.classList.remove('active');
        });

        // Send message on button click
        send.addEventListener('click', () => sendUserMessage());

        // Send message on Enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendUserMessage();
        });
    }

    // Show welcome message
    function showWelcomeMessage() {
        const welcomeText = `👋 Hello! I'm your virtual assistant for ${CONFIG.schoolName}.\n\nHow can I help you today?`;
        addBotMessage(welcomeText, ['Admissions', 'Academics', 'Contact Us', 'Campus']);
    }

    // Send user message
    function sendUserMessage() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        
        if (!text) return;
        
        addUserMessage(text);
        input.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process and respond
        setTimeout(() => {
            removeTypingIndicator();
            processUserInput(text);
        }, CONFIG.typingDelay);
    }

    // Add user message to chat
    function addUserMessage(text) {
        const messages = document.getElementById('chat-messages');
        const messageHTML = `
            <div class="chat-message user">
                <div class="chat-message-avatar">
                    <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <div class="chat-message-content">${escapeHTML(text)}</div>
            </div>
        `;
        messages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }

    // Add bot message to chat
    function addBotMessage(text, quickActions = [], link = null) {
        const messages = document.getElementById('chat-messages');
        const isSubpage = window.location.pathname.includes('/pages/');
        const logoPath = isSubpage ? '../assets/images/school logo.png' : 'assets/images/school logo.png';
        
        let actionsHTML = '';
        if (quickActions.length > 0) {
            actionsHTML = `<div class="chat-quick-actions">
                ${quickActions.map(action => `<button class="quick-action-btn" data-action="${action}">${action}</button>`).join('')}
            </div>`;
        }
        
        let linkHTML = '';
        if (link) {
            const linkUrl = isSubpage ? '..' + link.url : link.url.substring(1);
            linkHTML = `<div style="margin-top: 12px;"><a href="${linkUrl}" class="quick-action-btn" style="background: #0a1f3d; color: #fff; text-decoration: none; display: inline-block;">${link.text} →</a></div>`;
        }
        
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        
        const messageHTML = `
            <div class="chat-message bot">
                <div class="chat-message-avatar">
                    <img src="${logoPath}" alt="KEA">
                </div>
                <div class="chat-message-content">
                    ${formattedText}
                    ${linkHTML}
                    ${actionsHTML}
                </div>
            </div>
        `;
        messages.insertAdjacentHTML('beforeend', messageHTML);
        
        // Add click handlers for quick actions
        const actionBtns = messages.querySelectorAll('.quick-action-btn[data-action]');
        actionBtns.forEach(btn => {
            if (!btn.hasAttribute('data-listener')) {
                btn.setAttribute('data-listener', 'true');
                btn.addEventListener('click', () => {
                    const action = btn.getAttribute('data-action');
                    document.getElementById('chat-input').value = action;
                    sendUserMessage();
                });
            }
        });
        
        scrollToBottom();
    }

    // Show typing indicator
    function showTypingIndicator() {
        const messages = document.getElementById('chat-messages');
        const typingHTML = `
            <div class="chat-message bot" id="typing-indicator">
                <div class="chat-message-avatar">
                    <img src="${window.location.pathname.includes('/pages/') ? '../assets/images/school logo.png' : 'assets/images/school logo.png'}" alt="KEA">
                </div>
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messages.insertAdjacentHTML('beforeend', typingHTML);
        scrollToBottom();
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    // Process user input and generate response
    function processUserInput(text) {
        const lowerText = text.toLowerCase();
        
        // Find matching intent
        for (const [intent, data] of Object.entries(KNOWLEDGE_BASE)) {
            for (const pattern of data.patterns) {
                if (lowerText.includes(pattern)) {
                    const response = data.responses[Math.floor(Math.random() * data.responses.length)];
                    addBotMessage(response, data.quickActions || [], data.link || null);
                    return;
                }
            }
        }
        
        // Fallback response
        addBotMessage(FALLBACK_RESPONSE.text, FALLBACK_RESPONSE.quickActions);
    }

    // Scroll chat to bottom
    function scrollToBottom() {
        const messages = document.getElementById('chat-messages');
        messages.scrollTop = messages.scrollHeight;
    }

    // Escape HTML to prevent XSS
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Create Social Media Floating Widget
    function createSocialMediaWidget() {
        const socialHTML = `
            <!-- Social Media Floating Widget -->
            <div class="social-media-widget" id="social-widget">
                <button class="social-toggle" id="social-toggle" aria-label="Toggle social media">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                    <span class="social-pulse"></span>
                </button>
                <div class="social-links" id="social-links">
                    <a href="https://wa.me/919926042015?text=Hello!%20I'm%20interested%20in%20Kautilya%20Educational%20Academy.%20Please%20share%20more%20details." 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="social-link whatsapp"
                       aria-label="Chat on WhatsApp">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.962C9.776 30.988 12.786 32 16.004 32 24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.338 22.594c-.39 1.098-1.938 2.01-3.172 2.276-.846.18-1.95.322-5.67-1.218-4.762-1.97-7.828-6.81-8.064-7.126-.228-.316-1.866-2.486-1.866-4.742s1.18-3.366 1.6-3.826c.39-.426.92-.534 1.228-.534.296 0 .59.002.848.016.272.014.638-.104.998.762.39.938 1.328 3.242 1.446 3.476.118.234.196.508.04.814-.156.312-.234.504-.46.78-.228.274-.48.612-.686.822-.226.234-.462.488-.2.958.264.468 1.172 1.932 2.516 3.13 1.728 1.542 3.184 2.02 3.636 2.246.452.226.716.19.98-.116.264-.306 1.132-1.32 1.434-1.774.302-.456.604-.378 1.016-.226.414.15 2.626 1.238 3.076 1.464.452.226.752.34.864.526.116.19.116 1.088-.274 2.186z"/>
                        </svg>
                        <span>WhatsApp</span>
                    </a>
                    <a href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="social-link facebook"
                       aria-label="Follow on Facebook">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span>Facebook</span>
                    </a>
                    <a href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="social-link instagram"
                       aria-label="Follow on Instagram">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                        </svg>
                        <span>Instagram</span>
                    </a>
                    <a href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="social-link youtube"
                       aria-label="Subscribe on YouTube">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <span>YouTube</span>
                    </a>
                    <a href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="social-link twitter"
                       aria-label="Follow on Twitter">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <span>Twitter / X</span>
                    </a>
                    <a href="#" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="social-link linkedin"
                       aria-label="Connect on LinkedIn">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span>LinkedIn</span>
                    </a>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', socialHTML);
        
        // Toggle social links
        const toggle = document.getElementById('social-toggle');
        const links = document.getElementById('social-links');
        
        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
            toggle.classList.toggle('active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            const widget = document.getElementById('social-widget');
            if (!widget.contains(e.target) && links.classList.contains('open')) {
                links.classList.remove('open');
                toggle.classList.remove('active');
            }
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createChatWidget();
            createSocialMediaWidget();
            initChat();
        });
    } else {
        createChatWidget();
        createSocialMediaWidget();
        initChat();
    }

})();
