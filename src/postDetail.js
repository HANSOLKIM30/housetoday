const $detailContainer = document.querySelector('.content-container'); 
const $coverImage = document.querySelector('.cover-image');
const $postContent = document.querySelector('.post-content');

// id를 url에서 뽑아오기
const postId = new URLSearchParams(window.location.search).get('id');

async function fetchPost(postId) {
    const response = await fetch(`http://localhost:1234/posts/${postId}`);
    const data = await response.json();
    
    return data;
}

fetchPost(postId).then((post) => {
    $coverImage.src = post.image;
    $postContent.innerText = post.content;

    $detailContainer.innerHTML = `
    <div class="category">온라인 집들이</div>
        <div class="title">${post.title}</div>
    
          <div class="profile">
            <div class="profile-image-container">
              <img
                src="${post.authorImage}"
                alt="프로필 이미지"
                class="profile-image"
              />
            </div>
            <div class="profile-detail">
              <span class="profile-detail-nickname">${post.author}</span>
              <span class="profile-detail-date">2021년 11월 27일</span>
            </div>
          </div>
    `;
});