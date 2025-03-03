async function loadBlogPosts() {
  try {
    const response = await fetch("./JSON/blog-posts.json");
    const data = await response.json();

    const blogGrid = document.getElementById("blog-grid");

    // Slice the last 6 posts
    const latestPosts = data.posts.slice(-6);

    // Build the HTML string for the blog posts
    let blogPostsHTML = "";
    latestPosts.forEach((post) => {
      blogPostsHTML += createBlogCard(post);
    });

    blogGrid.innerHTML = blogPostsHTML;
  } catch (error) {
    console.error("Error loading blog posts:", error);
  }
}
function createBlogCard(post) {
  const tagsHtml = post.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  return `
        <div class="blog-card">
            <h2>${post.title}</h2>
            <div class="date">📅${post.date}</div>
            <div class="tags">
                ${tagsHtml}
            </div>
            <p class="description">${post.description}</p>
            <a href="${post.link}" class="read-more">Read More</a>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", loadBlogPosts);
