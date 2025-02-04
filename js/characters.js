window.addEventListener('load', function () {
    var image = document.getElementById('character-image');
    var scrollableList = document.getElementById('scrollable-list');
    var characterSection = document.getElementById('character-section');

    if (image && scrollableList) {
        scrollableList.style.maxHeight = image.clientHeight + 'px';
    }

    let currentIndex = 0;
    let scrollProgress = 0;
    let perfectlyCentered = false;

    const items = scrollableList.querySelectorAll('li img');
    const totalItems = items.length;
    if (items.length === 0) return;

    // **✅ Load first character info immediately**
    function loadInitialCharacter() {
        const firstCharacter = items[0];
        image.src = firstCharacter.dataset.large;
        document.getElementById('character-title').textContent = firstCharacter.dataset.title;
        document.getElementById('character-description').textContent = firstCharacter.dataset.description;
    }
    loadInitialCharacter();

    function changeCharacter(index) {
        if (index < 0 || index >= totalItems) return;

        const currentCharacter = items[index];
        image.src = currentCharacter.dataset.large;
        document.getElementById('character-title').textContent = currentCharacter.dataset.title;
        document.getElementById('character-description').textContent = currentCharacter.dataset.description;
    }

    function isPerfectlyCentered(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementMiddle = rect.top + rect.height / 2;
        const windowMiddle = windowHeight / 2;
        return Math.abs(windowMiddle - elementMiddle) < 50; // More precise threshold
    }

    function handleScroll(event) {
        if(!perfectlyCentered) {
            document.body.style.overflow = 'auto';
            return;
        }
        const delta = event.deltaY || event.detail || event.wheelDelta;
        const scrollSpeed = 40; // Controls how fast the list moves
        scrollProgress += delta / scrollSpeed;
    
        // Ensure progress stays within bounds
        scrollProgress = Math.max(0, Math.min(totalItems - 1, scrollProgress));
        let newIndex = Math.round(scrollProgress);
    
        // **✅ Make the vertical list scroll smoothly**
        scrollableList.style.scrollBehavior = "smooth";
        scrollableList.scrollTop = (scrollableList.scrollHeight / totalItems) * currentIndex;
    
        // **✅ Unlock scrolling at the right times**
        if ((currentIndex === 0 && delta < 0) || (currentIndex === totalItems - 1 && delta > 0)) {
            // User wants to scroll past the first or last character → Unlock scrolling
            console.log("continue scrolling past character");
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden'; // Fully lock scrolling
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                changeCharacter(currentIndex);
            }    
            event.preventDefault(); // Fully hijack scrolling
        }
    }
    
    function manageScrollListener() {
        perfectlyCentered = isPerfectlyCentered(characterSection);
        requestAnimationFrame(manageScrollListener);
    }
    
    requestAnimationFrame(manageScrollListener);
    window.addEventListener('wheel', handleScroll, { passive: false });
});
