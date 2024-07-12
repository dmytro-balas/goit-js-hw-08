const gallery = document.querySelector('.gallery');

function createGalleryItem({ preview, original, description }) {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery-item');

  const link = document.createElement('a');
  link.classList.add('gallery-link');
  link.href = original;

  const image = document.createElement('img');
  image.classList.add('gallery-image');
  image.src = preview;
  image.alt = description;
  image.setAttribute('data-source', original);

  link.appendChild(image);
  galleryItem.appendChild(link);

  return galleryItem;
}

function createGallery(images) {
  const galleryItems = images.map(image => createGalleryItem(image));
  gallery.append(...galleryItems);
}

createGallery(images);
gallery.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
  const target = event.target;

  if (target.nodeName !== 'IMG') {
    return;
  }

  const largeImageURL = target.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" alt="Large Image">
  `);

  instance.show();

  // Додатково можна додати закриття модального вікна на клік поза зображенням
  const modal = document.getElementById('lightbox-modal');
  modal.addEventListener('click', closeModal);

  function closeModal(event) {
    if (event.target === modal) {
      instance.close();
      modal.removeEventListener('click', closeModal);
    }
  }
}