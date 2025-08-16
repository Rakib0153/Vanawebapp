document.addEventListener('DOMContentLoaded', function() {
    // Sort and filter functionality
    const sortSelect = document.getElementById('sort-by');
    const filterSelect = document.getElementById('filter-price');
    
    sortSelect.addEventListener('change', sortProducts);
    filterSelect.addEventListener('change', filterProducts);
    
    function sortProducts() {
        const value = sortSelect.value;
        const productsGrid = document.querySelector('.products-grid');
        const products = Array.from(document.querySelectorAll('.product-card'));
        
        products.sort((a, b) => {
            switch(value) {
                case 'price-low':
                    return parseInt(a.dataset.price) - parseInt(b.dataset.price);
                case 'price-high':
                    return parseInt(b.dataset.price) - parseInt(a.dataset.price);
                case 'newest':
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                case 'popular':
                default:
                    if (a.dataset.popularity === 'high' && b.dataset.popularity !== 'high') return -1;
                    if (b.dataset.popularity === 'high' && a.dataset.popularity !== 'high') return 1;
                    if (a.dataset.popularity === 'medium' && b.dataset.popularity === 'low') return -1;
                    if (b.dataset.popularity === 'medium' && a.dataset.popularity === 'low') return 1;
                    return 0;
            }
        });
        
        // Clear and re-add sorted products
        productsGrid.innerHTML = '';
        products.forEach(product => {
            productsGrid.appendChild(product);
        });
    }
    
    function filterProducts() {
        const value = filterSelect.value;
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const price = parseInt(product.dataset.price);
            let shouldShow = true;
            
            switch(value) {
                case 'under-2000':
                    shouldShow = price < 2000;
                    break;
                case '2000-4000':
                    shouldShow = price >= 2000 && price <= 4000;
                    break;
                case 'over-4000':
                    shouldShow = price > 4000;
                    break;
                case 'all':
                default:
                    shouldShow = true;
            }
            
            product.style.display = shouldShow ? 'block' : 'none';
        });
    }
    
    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = document.createElement('div');
    quickViewModal.className = 'quick-view-modal';
    quickViewModal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="close-modal"><i class="fas fa-times"></i></button>
            <div class="modal-product-view"></div>
        </div>
    `;
    document.body.appendChild(quickViewModal);
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.current').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Create modal content
            const modalContent = quickViewModal.querySelector('.modal-product-view');
            modalContent.innerHTML = `
                <div class="product-image">
                    <img src="${productImage}" alt="${productName}">
                </div>
                <div class="product-info">
                    <h2>${productName}</h2>
                    <div class="price">${productPrice}</div>
                    <div class="product-options">
                        <div class="option">
                            <h4>Size</h4>
                            <div class="sizes">
                                <span class="size">S</span>
                                <span class="size">M</span>
                                <span class="size">L</span>
                                <span class="size">XL</span>
                            </div>
                        </div>
                        <div class="quantity">
                            <label>Quantity:</label>
                            <div class="qty-controls">
                                <button class="qty-minus">-</button>
                                <input type="number" value="1" min="1">
                                <button class="qty-plus">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            
            // Show modal
            quickViewModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    quickViewModal.querySelector('.close-modal').addEventListener('click', closeQuickView);
    quickViewModal.querySelector('.modal-overlay').addEventListener('click', closeQuickView);
    
    function closeQuickView() {
        quickViewModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Wishlist functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('wishlist-btn') || 
            e.target.closest('.wishlist-btn')) {
            const btn = e.target.classList.contains('wishlist-btn') ? 
                e.target : e.target.closest('.wishlist-btn');
            
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
            }
            
            // Show notification
            showNotification(
                btn.classList.contains('active') ? 
                'Added to wishlist!' : 'Removed from wishlist'
            );
        }
    });
    
    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});