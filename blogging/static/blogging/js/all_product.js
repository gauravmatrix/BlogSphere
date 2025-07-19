document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const searchBar = document.getElementById("searchBar");
    const categoryFilter = document.getElementById("categoryFilter");
    const blogItems = document.querySelectorAll(".blog-item");
    const blogContainer = document.getElementById("blogContainer");
    const toggleMode = document.getElementById("toggleMode");

    // ✅ Function: Filter Blogs Based on Search and Category
    function filterBlogs() {
        const searchQuery = searchBar.value.trim().toLowerCase();
        const selectedCategory = categoryFilter.value.trim().toLowerCase();
        let visibleBlogs = 0;

        blogItems.forEach(item => {
            const blogName = item.getAttribute("data-name").toLowerCase();
            const blogId = item.getAttribute("data-id").toLowerCase();
            const blogCategory = item.getAttribute("data-category").toLowerCase();

            const nameMatch = blogName.includes(searchQuery) || blogId.includes(searchQuery);
            const categoryMatch = (selectedCategory === "" || blogCategory === selectedCategory);

            if (nameMatch && categoryMatch) {
                item.style.display = "flex";
                visibleBlogs++;
            } else {
                item.style.display = "none";
            }
        });

        // ✅ Center the Blog if Only One is Visible
        blogContainer.style.display = visibleBlogs === 1 ? "flex" : "flex";
        blogContainer.style.justifyContent = "center";
        blogContainer.style.alignItems = visibleBlogs === 1 ? "center" : "flex-start";
    }

    // ✅ Function: Toggle Day/Night Mode
    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        toggleMode.innerText = document.body.classList.contains("dark-mode") ? "🌙 Night Mode" : "☀️ Day Mode";
    }

    // ✅ Event Listeners
    searchBar.addEventListener("input", filterBlogs);
    categoryFilter.addEventListener("change", filterBlogs);
    toggleMode.addEventListener("click", toggleDarkMode);
});
