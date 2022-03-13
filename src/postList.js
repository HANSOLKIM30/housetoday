const $PostContainer = document.querySelector('.posting-container');

const post = {};

async function fetchPosts() {
  const response = await fetch(`http://localhost:1234/posts`);
  const data =  await response.json();

  return data;
}

const postTemplate = (post) => `<a href="/post-detail.html?id=${post.id}">
        <div class="posting-wrapper">
        <div class="posting-image-container">
          <img
            src=${post.image}
            alt="게시글 이미지"
          />
        </div>
        <h2 class="">${post.title}</h2>

        <div class="profile-wrapper">
          <div class="profile-image-container">
            <img
              class="profile-image"
              src="${post.authorImage}"
              alt="profile-image"
            />
          </div>
          <span class="profile-nickname">${post.author}</span>
        </div>
      </div>
`;

fetchPosts().then((posts) => {
  console.log(posts);
  // 문자열이므로 join을 통해 하나의 문자열로 만듦.
  $PostContainer.innerHTML = posts.map((post) => postTemplate(post)).join('');
});