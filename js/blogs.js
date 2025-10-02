// Fetch blogs from blogs.json
async function fetchBlogsJson() {
  try {
    const response = await fetch('blogs.json');
    if (!response.ok) throw new Error('Failed to load blogs');
    return await response.json();
  } catch (e) {
    return [];
  }
}

// Get admin-posted blogs from localStorage (admin-dashboard currently saves there)
function getLocalAdminBlogs() {
  try {
    const raw = localStorage.getItem('blogs');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

// Combine hosted blogs with local admin posts (admin posts first)
async function getAllBlogs() {
  const hosted = await fetchBlogsJson();
  const admin = getLocalAdminBlogs();
  // admin blogs are stored newest-first in localStorage; merge with hosted
  return admin.concat(hosted);
}

function renderBlogsInto(container) {
  getAllBlogs().then(blogs => {
    if (!blogs || blogs.length === 0) {
      container.innerHTML = '<p>No blog posts found.</p>';
      return;
    }
    container.innerHTML = blogs.map(blog => `
      <article class="blog">
        ${blog.image ? `<img src="${blog.image}" alt="${escapeHtml(blog.title)} thumbnail">` : ''}
        <h3>${escapeHtml(blog.title)}</h3>
        <p>${escapeHtml(blog.content)}</p>
      </article>
    `).join('');
  });
}

// Simple HTML escaper
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Auto-render into any element with id=blogList or class .blog-grid
document.addEventListener('DOMContentLoaded', function() {
  const single = document.getElementById('blogList');
  if (single) renderBlogsInto(single);
  const grids = document.querySelectorAll('.blog-grid');
  grids.forEach(g => renderBlogsInto(g));
});
