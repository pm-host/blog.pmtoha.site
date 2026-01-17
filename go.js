
  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
  
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      const icon = menuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Gallery functionality
  const galleryItems = document.querySelectorAll('.gallery-item');
  const tabButtons = document.querySelectorAll('.tab-button');
  const filterButtons = document.querySelectorAll('.filter-button');
  const lightbox = document.getElementById('lightbox');
  const lightboxMedia = document.getElementById('lightboxMedia');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightbox = document.querySelector('.close-lightbox');
  const prevLightbox = document.getElementById('prevLightbox');
  const nextLightbox = document.getElementById('nextLightbox');
  
  let currentLightboxIndex = 0;
  let visibleGalleryItems = [];
  
  // Tab functionality
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const tab = button.getAttribute('data-tab');
      filterGallery(tab, document.querySelector('.filter-button.active').getAttribute('data-filter'));
    });
  });
  
  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      const activeTab = document.querySelector('.tab-button.active').getAttribute('data-tab');
      filterGallery(activeTab, filter);
    });
  });
  
  function filterGallery(tab, filter) {
    visibleGalleryItems = [];
    
    galleryItems.forEach(item => {
      const type = item.getAttribute('data-type');
      const category = item.getAttribute('data-category');
      
      if ((tab === 'all' || type === tab) && (filter === 'all' || category === filter)) {
        item.style.display = 'block';
        visibleGalleryItems.push(item);
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  // Lightbox functionality
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentLightboxIndex = visibleGalleryItems.indexOf(item);
      openLightbox(item);
    });
  });
  
  function openLightbox(item) {
    const type = item.getAttribute('data-type');
    const img = item.querySelector('img');
    const video = item.querySelector('video');
    const title = item.querySelector('.gallery-overlay h3').textContent;
    const description = item.querySelector('.gallery-overlay p').textContent;
    
    lightboxMedia.innerHTML = '';
    
    if (type === 'photo' && img) {
      const lightboxImg = document.createElement('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.className = 'lightbox-media';
      lightboxMedia.appendChild(lightboxImg);
    } else if (type === 'video' && video) {
      const lightboxVideo = document.createElement('video');
      lightboxVideo.src = video.querySelector('source').src;
      lightboxVideo.controls = true;
      lightboxVideo.className = 'lightbox-media';
      lightboxMedia.appendChild(lightboxVideo);
    }
    
    lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    lightbox.style.display = 'block';
  }
  
  closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    
    // Stop video if playing
    const lightboxVideo = lightboxMedia.querySelector('video');
    if (lightboxVideo) {
      lightboxVideo.pause();
    }
  });
  
  prevLightbox.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
    openLightbox(visibleGalleryItems[currentLightboxIndex]);
  });
  
  nextLightbox.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % visibleGalleryItems.length;
    openLightbox(visibleGalleryItems[currentLightboxIndex]);
  });
  
  // Close lightbox when clicking outside of media
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      
      // Stop video if playing
      const lightboxVideo = lightboxMedia.querySelector('video');
      if (lightboxVideo) {
        lightboxVideo.pause();
      }
    }
  });
  
  // Initialize gallery with all items visible
  filterGallery('all', 'all');
