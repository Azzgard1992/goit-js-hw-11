export default function markupGallery(hit) {
  return `<div class="photo-card">
    <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width="500px" height ="300px" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${hit.likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${hit.views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${hit.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${hit.downloads}
      </p>
    </div>
  </div>`;
}
