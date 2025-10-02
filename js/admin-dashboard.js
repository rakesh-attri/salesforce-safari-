// Simple session check
if (sessionStorage.getItem('isAdmin') !== 'true') {
  window.location.href = 'admin.html';
}

const blogForm = document.getElementById('blogForm');
const blogError = document.getElementById('blogError');
const blogSuccess = document.getElementById('blogSuccess');
const blogList = document.getElementById('blogList');

// Use localStorage for demo (replace with backend or JSON file for production)
function getBlogs() {
  return JSON.parse(localStorage.getItem('blogs') || '[]');
}
function saveBlogs(blogs) {
  localStorage.setItem('blogs', JSON.stringify(blogs));
}

function renderBlogs() {
  const blogs = getBlogs();
  blogList.innerHTML = '<h3>Existing Blogs</h3>' + blogs.map(blog => `
    <div class="blog-item">
      <strong>${blog.title}</strong><br>
      <img src="${blog.image}" alt="Blog image" style="max-width:120px; max-height:80px; margin:8px 0;">
      <p>${blog.content}</p>
    </div>
  `).join('');
}

blogForm.addEventListener('submit', function(e) {
  e.preventDefault();
  blogError.textContent = '';
  blogSuccess.textContent = '';
  const title = document.getElementById('blogTitle').value.trim();
  const content = document.getElementById('blogContent').value.trim();
  const image = document.getElementById('blogImage').value.trim();
  if (!title || !content) {
    blogError.textContent = 'Title and content are required.';
    return;
  }
  const blogs = getBlogs();
  blogs.unshift({ title, content, image });
  saveBlogs(blogs);
  blogSuccess.textContent = 'Blog posted successfully!';
  blogForm.reset();
  renderBlogs();
});

renderBlogs();
