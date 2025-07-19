document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "YOUR_NEWSAPI_KEY";  // 🔥 Apna API key yaha daalo
    const url = `https://newsapi.org/v2/everything?q=technology&apiKey=${apiKey}`;

    async function fetchBlogs() {
        try {
            let response = await fetch(url);
            let data = await response.json();
            let blogContainer = document.getElementById("blogContainer");

            blogContainer.innerHTML = "";  // ✅ Purane blogs hatao

            data.articles.slice(0, 10).forEach(article => {  // 📰 Sirf 10 Blogs dikhane ke liye
                let blogItem = `
                    <div class="blog-item">
                        <div class="blog-card">
                            <img src="${article.urlToImage}" alt="${article.title}" class="fixed-img">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.description ? article.description.substring(0, 150) + "..." : "No description available."}</p>
                                <small class="badge">Technology</small>
                                <a href="${article.url}" target="_blank" class="read-more">Read More</a>
                            </div>
                        </div>
                    </div>
                `;
                blogContainer.innerHTML += blogItem;
            });
        } catch (error) {
            console.error("Error fetching blogs:", error);
            document.getElementById("blogContainer").innerHTML = "<p>❌ Failed to load blogs. Please try again.</p>";
        }
    }

    fetchBlogs();
});
