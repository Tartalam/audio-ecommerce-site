const container = document.querySelector('.gallery-container');
let previousScreenSize = window.innerWidth;

// Responsive column calculation
function getColumnCount(screenWidth) {
  if (screenWidth < 600) return 1;        // Mobile
  if (screenWidth < 800) return 2;       // Tablet portrait
  if (screenWidth < 1000) return 3;      // Tablet landscape
  if (screenWidth < 1440) return 4;      // Small desktop
  return 5;                              // 1080p+ displays
}

// Add CSS animation classes
function setupAnimations() {
  const posts = document.querySelectorAll('.post');
  
  posts.forEach(post => {
    // Initial load animation
    if (!document.body.classList.contains('gallery-loaded')) {
      post.classList.add('post-entering');
    }
    // Column change animation
    else {
      post.classList.add('post-resizing');
      setTimeout(() => {
        post.classList.remove('post-resizing');
      }, 500);
    }
  });

  if (!document.body.classList.contains('gallery-loaded')) {
    setTimeout(() => {
      document.body.classList.add('gallery-loaded');
      posts.forEach(post => {
        post.classList.remove('post-entering');
      });
    }, 800);
  }
}

// Modified masonry generator with animations
function generateMasonryGrid(columns, posts) {
  container.innerHTML = '';
  let columnWrappers = {};

  // Create columns
  for (let i = 0; i < columns; i++) {
    columnWrappers[`column${i}`] = [];
  }

  // Distribute posts
  for (let i = 0; i < posts.length; i++) {
    const column = i % columns;
    columnWrappers[`column${column}`].push(posts[i]);
  }

  // Build columns
  for (let i = 0; i < columns; i++) {
    let columnPosts = columnWrappers[`column${i}`];
    let column = document.createElement('div');
    column.classList.add('column');
    
    columnPosts.forEach(post => {
      let postDiv = document.createElement('div');
      postDiv.classList.add('post');
      
      let image = document.createElement('img');
      image.src = post.image;
      postDiv.appendChild(image);
      column.appendChild(postDiv);
    });
    
    container.appendChild(column);
  }
  
  // Trigger animations after DOM update
  setTimeout(setupAnimations, 50);
}

// Resize handler with debounce
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const currentScreenSize = window.innerWidth;
    const newColumns = getColumnCount(currentScreenSize);
    const oldColumns = getColumnCount(previousScreenSize);
    
    if (newColumns !== oldColumns) {
      generateMasonryGrid(newColumns, posts);
    }
    previousScreenSize = currentScreenSize;
  }, 150);
}

// Initialize
function initMasonry() {
  generateMasonryGrid(getColumnCount(window.innerWidth), posts);
}

// Event listeners
window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', initMasonry);

// Generate initial grid
generateMasonryGrid(getColumnCount(window.innerWidth), posts);

