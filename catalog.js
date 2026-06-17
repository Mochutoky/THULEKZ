/* ============================================
   Premium Product Catalog & Exhibition Panel
   ============================================ */

(() => {
    // ============================================
    // Configuration & Data
    // ============================================

    const EXHIBITION_SLIDE_DURATION = 6000; // 6 seconds per slide
    const FEATURE_BLOCK_INTERVAL = 16; // Insert feature block every 9 items
    const PRODUCT_LINK = "https://wa.me/77472668650";

    // Sample product data (30 items)
    const productCatalog = [
        { id: 1, name: "Thule Crossover 2 косметичка", price: "34 990₸", image: "media/products/Thule Crossover 2 Toiletry Bag - Black.jpg", specs: ["Цвет: Черный", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/organaizer-dlja-bagazha-thule-3205266-1-sht-152850997/?c=750000000" },
        { id: 2, name: "Thule Crossover 2 органайзер", price: "34 990₸", image: "media/products/Thule Crossover 2 Travel Organizer - Black.jpg", specs: ["Цвет: Черный", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/organaizer-dlja-bagazha-thule-3205265-1-sht-136648750/?c=750000000" },
        { id: 3, name: "Thule Tact сумка через плечо", price: "51 990₸", image: "media/products/Thule Tact Crossbody 5L - Black.jpg", specs: ["Цвет: Черный", "Объем: 5Л", "Гарантия Thule"], link:"" },
        { id: 4, name: "Thule Aion сумка через плечо", price: "34 990₸", image: "media/products/Thule Aion Sling Bag - Dark Slate.jpg", specs: ["Цвет: Темный сланец", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/sumka-pojasnaja-thule-3205019-poliester-goluboi-132439761/?c=750000000&m=Napapijri" },
        { id: 5, name: "Thule Aion сумка через плечо", price: "34 990₸", image: "media/products/Thule Aion Sling Bag - Black.jpg", specs: ["Цвет: Черный", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/sumka-pojasnaja-thule-3204727-poliester-chernyi-133041444/?c=750000000" },
        { id: 6, name: "Thule Aion сумка через плечо", price: "34 990₸", image: "media/products/Thule Aion Sling Bag - Nutria.jpg", specs: ["Цвет: Нутрия", "Гарантия Thule"], link:"" },
        { id: 7, name: "Thule Paramount сумка через плечо", price: "38 990₸", image: "media/products/Thule Paramount Crossbody 2L - Black.jpg", specs: ["Цвет: Черный", "Объем: 2Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/sumka-kross-bodi-thule-3205005-152422486/?c=750000000" },
        { id: 8, name: "Thule Paramount сумка через плечо", price: "38 990₸", image: "media/products/Thule Paramount Crossbody 2L - Soft Green.jpg", specs: ["Цвет: Мягкий зеленый", "Объем: 2Л", "Гарантия Thule"], link:"" },
        { id: 9, name: "Thule Aion походный рюкзак", price: "114 390₸", image: "media/products/Thule Aion Travel Backpack 28L - Black.jpg", specs: ["Цвет: Черный", "Объем: 28Л", "Гарантия Thule"], link:"" },
        { id: 10, name: "Thule Aion походный рюкзак", price: "114 390₸", image: "media/products/Thule Aion Travel Backpack 28L - Nutria.jpg", specs: ["Цвет: Нутрия", "Объем: 28Л", "Гарантия Thule"], link:"" },
        { id: 11, name: "Thule Crossover 2 рюкзак", price: "155 990₸", image: "media/products/Thule Crossover 2 Backpack 30L - Black.jpg", specs: ["Цвет: Черный", "Объем: 30Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3205258-neilon-chernyi-152794019/?c=750000000" },
        { id: 12, name: "Thule Accent рюкзак", price: "64 990₸", image: "media/products/Thule Accent Backpack 20L - Black.jpg", specs: ["Цвет: Черный", "Объем: 20Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3205380-poliester-chernyi-136619387/?c=750000000" },
        { id: 13, name: "Thule Accent рюкзак", price: "71 990₸", image: "media/products/Thule Accent Backpack 23L - Black.jpg", specs: ["Цвет: Черный", "Объем: 23Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3205381-poliester-chernyi-147122277/?c=750000000" },
        { id: 14, name: "Thule Accent рюкзак", price: "84 990₸", image: "media/products/Thule Accent Recycled Backpack 26L - Black.jpg", specs: ["Цвет: Черный", "Объем: 26Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-accent-3205384-poliester-chernyi-152794023/?c=750000000" },
        { id: 15, name: "Thule Accent рюкзак", price: "84 990₸", image: "media/products/Thule Accent Backpack 28L - Black.jpg", specs: ["Цвет: Черный", "Объем: 28Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3205382-poliester-chernyi-136619388/?c=750000000&m=Napapijri" },
        { id: 16, name: "Thule Notus рюкзак", price: "51 990₸", image: "media/products/Thule Notus Backpack 20L - Black.jpg", specs: ["Цвет: Черный", "Объем: 20Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3204304-neilon-chernyi-133920850/?c=750000000" },
        { id: 17, name: "Thule Indago рюкзак", price: "58 990₸", image: "media/products/Thule Indago Backpack 23L - Black.jpg", specs: ["Цвет: Черный", "Объем: 23Л", "Гарантия Thule"], link:"" },
        { id: 18, name: "Thule Exeo рюкзак", price: "59 090₸", image: "media/products/Thule Exeo Backpack - Black.jpg", specs: ["Цвет: Черный", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3204322-neilon-chernyi-133989776/?c=750000000&m=Napapijri" },
        { id: 19, name: "Thule EnRoute рюкзак", price: "71 990₸", image: "media/products/Thule EnRoute Backpack 23L - Black.jpg", specs: ["Цвет: Черный", "Объем: 23Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3204841-do-15-6-chernyi-133925821/?c=750000000" },
        { id: 20, name: "Thule EnRoute рюкзак", price: "97 990₸", image: "media/products/Thule EnRoute Backpack 30L - Black.jpg", specs: ["Цвет: Черный", "Объем: 30Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3204849-neilon-chernyi-133989777/?c=750000000" },
        { id: 21, name: "Thule Lithos рюкзак", price: "41 390₸", image: "media/products/Thule Lithos Backpack 16L - Black.jpg", specs: ["Цвет: Черный", "Объем: 16Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3204832-poliester-chernyi-132434294/?c=750000000" },
        { id: 22, name: "Thule Subterra 2 рюкзак", price: "103 990₸", image: "media/products/Thule Subterra 2 Backpack 27L - Black.jpg", specs: ["Цвет: Черный", "Объем: 27Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3205027-poliester-chernyi-132470989/?c=750000000" },
        { id: 23, name: "Thule Subterra 2 рюкзак", price: "103 990₸", image: "media/products/Thule Subterra 2 Backpack 27L - Dark Slate.jpg", specs: ["Цвет: Темный сланец", "Объем: 27Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3205028-neilon-seryi-147028331/?c=750000000" },
        { id: 24, name: "Thule Subterra 2 рюкзак", price: "103 990₸", image: "media/products/Thule Subterra 2 Backpack 27L - Vetiver Gray.jpg", specs: ["Цвет: Ветивер серый", "Объем: 27Л", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3205029-neilon-seryi-152794014/?c=750000000" },
        { id: 25, name: "Thule Subterra 2 походный рюкзак", price: "114 390₸", image: "media/products/Thule Subterra 2 Travel Backpack - Black.jpg", specs: ["Цвет: Черный", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3205054-poliester-26-l-132451408/?c=750000000" },
        { id: 26, name: "Thule Subterra 2 походный рюкзак", price: "114 390₸", image: "media/products/Thule Subterra 2 Travel Backpack - Dark Slate.jpg", specs: ["Цвет: Темный сланец", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/rjukzak-thule-3205055-poliester-26-l-132451402/?c=750000000" },
        { id: 27, name: "Thule Subterra рюкзак", price: "90 990₸", image: "media/products/Thule Subterra Backpack 25L - Dark Shadow.jpg", specs: ["Цвет: Темная тень", "Объем: 25Л", "Гарантия Thule"], link:"" },
        { id: 28, name: "Thule Subterra 2 Атташе", price: "58 990₸", image: "media/products/Thule Subterra 2 Attache 14 - Black.jpg", specs: ["Цвет: Черный", "Диагональ: 14 дюймов", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/sumka-thule-3205033-do-14-chernyi-132458705/?c=750000000&m=Napapijri" },
        { id: 29, name: "Thule Subterra 2 Атташе", price: "64 990₸", image: "media/products/Thule Subterra 2 Attache 16 - Black.jpg", specs: ["Цвет: Черный", "Диагональ: 16 дюймов", "Гарантия Thule"], link:"https://kaspi.kz/shop/p/sumka-thule-3205034-do-16-chernyi-132440606/?c=750000000" },
        { id: 30, name: "Thule Gauntlet 5 MacBook Атташе", price: "58 990₸", image: "media/products/Thule Gauntlet 5 MacBook Attache 14 - Black.jpg", specs: ["Цвет: Черный", "Диагональ: 14 дюймов", "Гарантия Thule"], link:"" },
        { id: 31, name: "Thule Gauntlet 5 MacBook Атташе", price: "58 990₸", image: "media/products/Thule Gauntlet 5 MacBook Attache 16 - Black.jpg", specs: ["Цвет: Черный", "Диагональ: 16 дюймов", "Гарантия Thule"], link:"" },
    ];

    // ============================================
    // Product Catalog Generation
    // ============================================

    function renderProductCatalog() {
        const gridContainer = document.getElementById("catalog-grid");
        if (!gridContainer) return;

        const featureBlockTemplate = document.getElementById("feature-block-template");
        const productCardTemplate = document.getElementById("product-card-template");

        gridContainer.innerHTML = "";

        productCatalog.forEach((product, index) => {
            // Insert feature block every 9 items
            if (index > 0 && index % FEATURE_BLOCK_INTERVAL === 0) {
                const featureBlock = featureBlockTemplate.content.cloneNode(true);
                gridContainer.appendChild(featureBlock);
            }

            // Create product card
            const cardClone = productCardTemplate.content.cloneNode(true);
            const card = cardClone.querySelector(".product-card");

            card.setAttribute("data-product-id", product.id);
            card.setAttribute("data-visible", "false");

            const image = cardClone.querySelector(".product-image");
            image.src = product.image;
            image.alt = product.name;

            const title = cardClone.querySelector(".product-title");
            title.textContent = product.name;

            const price = cardClone.querySelector(".product-price");
            price.textContent = product.price;

            const viewBtn = cardClone.querySelector(".product-view-btn");
            viewBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                openSideDrawer(product);
            });

            card.addEventListener("click", () => {
                openSideDrawer(product);
            });

            gridContainer.appendChild(cardClone);
        });

        // Initialize intersection observer for scroll reveals
        observeProducts();
    }

    // ============================================
    // Intersection Observer for Scroll Reveals
    // ============================================

    function observeProducts() {
        const cards = document.querySelectorAll(".product-card");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.setAttribute("data-visible", "true");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: "50px",
                threshold: 0.1,
            }
        );

        cards.forEach((card) => {
            observer.observe(card);
        });
    }

    // ============================================
    // Side Drawer Logic
    // ============================================

    function openSideDrawer(product) {
        const drawer = document.getElementById("side-drawer");
        const drawerBody = document.getElementById("drawer-body");
        const drawerTemplate = document.getElementById("drawer-template");

        if (!drawerBody || !drawerTemplate) return;

        // Populate drawer with product details
        const drawerContent = drawerTemplate.content.cloneNode(true);

        drawerContent.querySelector(".drawer-image").src = product.image;
        drawerContent.querySelector(".drawer-image").alt = product.name;
        drawerContent.querySelector(".drawer-title").textContent = product.name;
        drawerContent.querySelector(".drawer-price").textContent = product.price;
        drawerContent.querySelector(".drawer-cta").href = product.link;

        const specsList = drawerContent.querySelector(".specs-list");
        specsList.innerHTML = "";
        product.specs.forEach((spec) => {
            const li = document.createElement("li");
            li.textContent = spec;
            specsList.appendChild(li);
        });

        drawerBody.innerHTML = "";
        drawerBody.appendChild(drawerContent);

        // Open drawer
        drawer.classList.add("is-open");
        drawer.setAttribute("aria-hidden", "false");
        document.body.classList.add("drawer-open");
    }

    function closeSideDrawer() {
        const drawer = document.getElementById("side-drawer");
        drawer.classList.remove("is-open");
        drawer.setAttribute("aria-hidden", "true");
        document.body.classList.remove("drawer-open");
    }

    function initSideDrawer() {
        const drawer = document.getElementById("side-drawer");
        const drawerClose = document.getElementById("drawer-close");
        const drawerOverlay = document.getElementById("drawer-overlay");

        if (!drawer) return;

        // Close button
        drawerClose?.addEventListener("click", closeSideDrawer);

        // Overlay click to close
        drawerOverlay?.addEventListener("click", closeSideDrawer);

        // ESC key to close
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && drawer.classList.contains("is-open")) {
                closeSideDrawer();
            }
        });

        // Prevent drawer-body click from closing drawer
        const drawerBody = document.getElementById("drawer-body");
        drawerBody?.addEventListener("click", (e) => e.stopPropagation());
    }

    // ============================================
    // Exhibition Button Click Handler
    // ============================================

    function initExhibitionButtons() {
        const exhibitionCtaButtons = document.querySelectorAll(".exhibition-cta");

        exhibitionCtaButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                const productId = parseInt(button.getAttribute("data-product-id"));
                const product = productCatalog.find((p) => p.id === productId);

                if (product) {
                    openSideDrawer(product);
                }
            });
        });
    }

    // ============================================
    // Performance: Prevent Body Scroll with Drawer
    // ============================================

    const originalOverflow = document.body.style.overflow;

    // ============================================
    // Initialization
    // ============================================

    function init() {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
                renderProductCatalog();
                initSideDrawer();
                initExhibitionButtons();
            });
        } else {
            renderProductCatalog();
            initSideDrawer();
            initExhibitionButtons();
        }
    }
    // Search functionality
    function initSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
    
        if (!searchInput) return;
    
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            
            if (query.length === 0) {
                searchResults.classList.remove('is-active');
                searchResults.innerHTML = '';
                return;
            }
        
            // Filter products based on search query
            const filteredProducts = productCatalog.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.specs.some(spec => spec.toLowerCase().includes(query))
            );
        
            // Display results
            displaySearchResults(filteredProducts, searchResults);
        });
    
        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-wrap')) {
                searchResults.classList.remove('is-active');
            }
        });
    }
    
    function displaySearchResults(products, container) {
        if (products.length === 0) {
            container.innerHTML = '<div style="padding: 12px; text-align: center; color: #999;">Товары не найдены</div>';
            container.classList.add('is-active');
            return;
        }
    
        container.innerHTML = products.map(product => `
            <div class="search-result-item" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="search-result-info">
                    <div class="search-result-name">${product.name}</div>
                    <div class="search-result-price">${product.price}</div>
                </div>
            </div>
        `).join('');
        
        container.classList.add('is-active');
        
        // Add click handlers to open drawer
        container.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const productId = parseInt(item.getAttribute('data-product-id'));
                const product = productCatalog.find(p => p.id === productId);
                if (product) {
                    openSideDrawer(product);
                    searchInput.value = '';
                    container.classList.remove('is-active');
                }
            });
        });
    }
    
    // Call this in your init function
    initSearch();
    // Start the application
    init();
})();
