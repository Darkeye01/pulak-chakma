// Main Application Controller
class NexusNotesApp {
    constructor() {
        this.currentUser = null;
        this.isAdmin = false;
        this.pages = {
            landing: document.getElementById('landing-page'),
            login: document.getElementById('login-page'),
            admin: document.getElementById('admin-dashboard'),
            user: document.getElementById('user-dashboard')
        };
        
        this.notes = [
            {
                id: 1,
                title: "Advanced React Patterns",
                category: "Development",
                content: "Deep dive into React's advanced patterns including compound components, render props, and custom hooks.",
                date: "2024-01-15",
                views: 245,
                likes: 42,
                isAdmin: true
            },
            {
                id: 2,
                title: "UI/UX Design Principles 2024",
                category: "Design",
                content: "Latest trends and principles in modern UI/UX design including accessibility and dark mode best practices.",
                date: "2024-01-14",
                views: 189,
                likes: 31,
                isAdmin: true
            },
            {
                id: 3,
                title: "Machine Learning Fundamentals",
                category: "Data Science",
                content: "Introduction to core ML concepts with practical Python examples and real-world applications.",
                date: "2024-01-13",
                views: 312,
                likes: 56,
                isAdmin: false
            },
            {
                id: 4,
                title: "System Architecture Patterns",
                category: "Engineering",
                content: "Microservices, monolithic, and event-driven architectures explained with case studies.",
                date: "2024-01-12",
                views: 178,
                likes: 28,
                isAdmin: false
            }
        ];
        
        this.init();
    }
    
    init() {
        // Initialize cursor
        this.initCustomCursor();
        
        // Initialize preloader
        this.initPreloader();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Initialize particles
        this.initParticles();
        
        // Initialize counter animations
        this.initCounters();
        
        // Initialize notes
        this.renderNotes();
    }
    
    // Custom Cursor
    initCustomCursor() {
        const cursorDot = document.querySelector('[data-cursor-dot]');
        const cursorOutline = document.querySelector('[data-cursor-outline]');
        
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
            
            // Add hover effect on interactive elements
            const target = e.target;
            if (target.closest('button') || target.closest('a') || target.closest('input')) {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            } else {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            }
        });
        
        // Disable cursor on touch devices
        if ('ontouchstart' in window) {
            cursorDot.style.display = 'none';
            cursorOutline.style.display = 'none';
            document.body.classList.add('cursor-active');
        }
    }
    
    // Preloader
    initPreloader() {
        const preloader = document.getElementById('preloader');
        
        // Simulate loading process
        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            setTimeout(() => {
                preloader.style.display = 'none';
                this.showPage('landing');
            }, 500);
        }, 2000);
    }
    
    // Particles Background
    initParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            // Apply styles
            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                position: 'absolute',
                left: `${posX}%`,
                top: `${posY}%`,
                animation: `float ${duration}s infinite ${delay}s linear`
            });
            
            particlesContainer.appendChild(particle);
        }
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.2;
                }
                25% {
                    transform: translate(20px, -20px) rotate(90deg);
                    opacity: 0.4;
                }
                50% {
                    transform: translate(0, -40px) rotate(180deg);
                    opacity: 0.6;
                }
                75% {
                    transform: translate(-20px, -20px) rotate(270deg);
                    opacity: 0.4;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Counter Animations
    initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Event Listeners
    initEventListeners() {
        // Enter Workspace Button
        document.getElementById('enter-workspace').addEventListener('click', () => {
            this.showPage('login');
        });
        
        // Back to Landing
        document.getElementById('back-to-landing').addEventListener('click', () => {
            this.showPage('landing');
        });
        
        // Toggle Password Visibility
        document.getElementById('toggle-password').addEventListener('click', (e) => {
            const passwordInput = document.getElementById('password');
            const icon = e.target.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
        
        // Login Form Submission
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        // Logout Buttons
        document.getElementById('admin-logout').addEventListener('click', () => {
            this.logout();
        });
        
        // Sidebar Toggle
        document.getElementById('sidebar-toggle').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('collapsed');
        });
        
        // Sidebar Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                this.showSection(section);
                
                // Update active state
                document.querySelectorAll('.nav-item').forEach(nav => {
                    nav.classList.remove('active');
                });
                item.classList.add('active');
            });
        });
        
        // Theme Toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // File Upload
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-upload');
        
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            this.handleFileUpload(files[0]);
        });
        
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFileUpload(e.target.files[0]);
            }
        });
        
        // Note Card Interactions
        this.delegateEvent('click', '.note-card', (e, card) => {
            const noteId = card.getAttribute('data-note-id');
            this.openNote(noteId);
        });
    }
    
    // Event Delegation Helper
    delegateEvent(event, selector, handler) {
        document.addEventListener(event, (e) => {
            const target = e.target.closest(selector);
            if (target) {
                handler(e, target);
            }
        });
    }
    
    // Page Navigation
    showPage(pageName) {
        // Hide all pages
        Object.values(this.pages).forEach(page => {
            page.classList.remove('active');
        });
        
        // Show requested page
        if (this.pages[pageName]) {
            this.pages[pageName].classList.add('active');
            
            // Trigger animations
            if (pageName === 'landing') {
                this.initCounters();
            }
        }
    }
    
    // Section Navigation
    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show requested section
        const targetSection = document.getElementById(`${sectionId}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
    
    // Login Handler
    handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const submitBtn = document.getElementById('login-submit');
        
        // Show loading state
        submitBtn.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            
            if (!username || !password) {
                this.showToast('Please enter both username and password', 'error');
                return;
            }
            
            if (password.length < 8) {
                this.showToast('Password must be at least 8 characters', 'error');
                return;
            }
            
            // Check for admin credentials
            if (username === 'pulak' && password === '07082008') {
                this.currentUser = { username, role: 'admin' };
                this.isAdmin = true;
                this.showPage('admin');
                this.showToast('Welcome back, Admin!', 'success');
            } else {
                // Regular user
                this.currentUser = { username, role: 'user' };
                this.isAdmin = false;
                this.showPage('user');
                this.showToast(`Welcome, ${username}!`, 'success');
                
                // For demo, we'll show user dashboard as admin dashboard
                // In production, you would show different UIs
                this.showPage('admin'); // Show admin dashboard for demo
            }
        }, 1500);
    }
    
    // Logout Handler
    logout() {
        this.currentUser = null;
        this.isAdmin = false;
        
        // Clear form
        document.getElementById('login-form').reset();
        
        this.showPage('landing');
        this.showToast('Logged out successfully', 'success');
    }
    
    // Theme Toggle
    toggleTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle.querySelector('i');
        
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
        
        this.showToast('Theme updated', 'success');
    }
    
    // File Upload Handler
    handleFileUpload(file) {
        if (!file) return;
        
        const allowedTypes = ['text/plain', 'application/pdf', 'text/markdown'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!allowedTypes.includes(file.type) && !file.name.endsWith('.md')) {
            this.showToast('Invalid file type. Please upload .txt, .pdf, or .md files', 'error');
            return;
        }
        
        if (file.size > maxSize) {
            this.showToast('File too large. Maximum size is 10MB', 'error');
            return;
        }
        
        // Simulate upload
        this.showToast(`Uploading ${file.name}...`, 'success');
        
        setTimeout(() => {
            // Add to notes array
            const newNote = {
                id: this.notes.length + 1,
                title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
                category: "Uploaded",
                content: `File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
                date: new Date().toISOString().split('T')[0],
                views: 0,
                likes: 0,
                isAdmin: true
            };
            
            this.notes.unshift(newNote);
            this.renderNotes();
            
            this.showToast(`${file.name} uploaded successfully`, 'success');
        }, 2000);
    }
    
    // Render Notes
    renderNotes() {
        const notesGrid = document.getElementById('admin-notes-grid');
        
        // Filter notes based on user role
        const filteredNotes = this.isAdmin 
            ? this.notes 
            : this.notes.filter(note => !note.isAdmin);
        
        notesGrid.innerHTML = filteredNotes.map(note => `
            <div class="note-card" data-note-id="${note.id}">
                <div class="note-header">
                    <div>
                        <h3 class="note-title">${note.title}</h3>
                        <span class="note-category">${note.category}</span>
                    </div>
                    <span class="note-date">${note.date}</span>
                </div>
                <p class="note-preview">${note.content}</p>
                <div class="note-footer">
                    <div class="note-actions">
                        <button class="note-action-btn" onclick="event.stopPropagation(); app.likeNote(${note.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="note-action-btn" onclick="event.stopPropagation(); app.shareNote(${note.id})">
                            <i class="fas fa-share-alt"></i>
                        </button>
                        ${this.isAdmin ? `
                            <button class="note-action-btn" onclick="event.stopPropagation(); app.deleteNote(${note.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                    <div class="note-stats">
                        <span class="stat-item">
                            <i class="fas fa-eye"></i>
                            ${note.views}
                        </span>
                        <span class="stat-item">
                            <i class="fas fa-heart"></i>
                            ${note.likes}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Note Actions
    likeNote(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (note) {
            note.likes++;
            this.renderNotes();
            this.showToast('Note liked!', 'success');
        }
    }
    
    shareNote(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (note) {
            // Simulate share
            this.showToast('Share link copied to clipboard!', 'success');
            note.views += 5;
            this.renderNotes();
        }
    }
    
    deleteNote(noteId) {
        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(n => n.id !== noteId);
            this.renderNotes();
            this.showToast('Note deleted successfully', 'success');
        }
    }
    
    openNote(noteId) {
        const note = this.notes.find(n => n.id === parseInt(noteId));
        if (note) {
            note.views++;
            this.renderNotes();
            
            // In a real app, you would open a detailed view
            this.showToast(`Opening: ${note.title}`, 'success');
        }
    }
    
    // Toast Notifications
    showToast(message, type = 'info') {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };
        
        toast.innerHTML = `
            <i class="fas ${icons[type] || 'fa-info-circle'} toast-icon"></i>
            <span class="toast-message">${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize Application
const app = new NexusNotesApp();

// Add CSS for light theme
const lightThemeCSS = `
    .light-theme {
        --bg-primary: #f8fafc;
        --bg-secondary: #f1f5f9;
        --bg-card: rgba(255, 255, 255, 0.9);
        --bg-glass: rgba(0, 0, 0, 0.05);
        --bg-hover: rgba(0, 0, 0, 0.1);
        
        --text-primary: #1e293b;
        --text-secondary: #64748b;
        --text-muted: #94a3b8;
        
        --border-color: rgba(0, 0, 0, 0.1);
        --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
`;

const style = document.createElement('style');
style.textContent = lightThemeCSS;
document.head.appendChild(style);

// Add CSS for particles
const particlesCSS = `
    .particle {
        pointer-events: none;
    }
`;

const particlesStyle = document.createElement('style');
particlesStyle.textContent = particlesCSS;
document.head.appendChild(particlesStyle);