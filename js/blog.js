// Blog Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // For now, just show a message since this needs backend
            alert('Thank you for subscribing! You will be notified of new posts at: ' + email);
            newsletterForm.reset();
        });
    }
    
    // Blog search functionality
    const searchInput = document.getElementById('blogSearch');
    const blogGrid = document.getElementById('blogGrid');
    const noResults = document.getElementById('noResults');
    
    if (searchInput && blogGrid) {
        const blogCards = blogGrid.querySelectorAll('.blog-card');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let hasVisibleCards = false;
            
            blogCards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                const excerpt = card.querySelector('.blog-card-excerpt').textContent.toLowerCase();
                const category = card.querySelector('.blog-category').textContent.toLowerCase();
                
                const matches = title.includes(searchTerm) || 
                               excerpt.includes(searchTerm) || 
                               category.includes(searchTerm);
                
                if (matches || searchTerm === '') {
                    card.classList.remove('hidden');
                    hasVisibleCards = true;
                } else {
                    card.classList.add('hidden');
                }
            });
            
            // Toggle no results message
            if (noResults) {
                if (hasVisibleCards || searchTerm === '') {
                    noResults.hidden = true;
                } else {
                    noResults.hidden = false;
                }
            }
        });
    }
    
    // Mobile navigation
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});

// Console greeting
console.log('%c whoami/blog ', 'background: linear-gradient(135deg, #ff4d4d, #ff6b6b); color: white; padding: 10px 20px; border-radius: 5px; font-size: 20px; font-weight: bold;');
console.log('%c Linux tutorials and insights ', 'color: #ff4d4d; font-size: 14px;');