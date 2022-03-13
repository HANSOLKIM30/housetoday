export const POST_MAX_FILE_SIZE = 1000 * 1000 * 1; // 약 1MB

const $goBack = document.querySelector('.go-back');
const $titleInput = document.querySelector('.title-input');
const $contentInput = document.querySelector('.content-input');
const $titleLength = document.querySelector('.current-title-length');
const $publishButton = document.querySelector('.publish-button');
const $postForm = document.querySelector('.post-form');

const $coverImage = document.querySelector(".cover-image");
const $imageUpload = document.querySelector('#cover-image-upload');
const $imageReUpload = document.querySelector('#cover-image-re-upload');
const $fileReUpload = document.querySelector('.file-re-upload-wrapper');

function checkInputLength({
    target
}) {
    if (target.value && target.value.length > 30) {
        alert('30자를 초과한 제목을 입력할 수 없습니다.');

        return;
    }

    $titleLength.innerText = target.value.length;
};

function uploadImage(event) {
    // change 이벤트의 타겟의 파일 중, 첫번째 파일을 가져온다.
    const file = event.target.files[0];
    // fileReader API 사용
    const fileReader = new FileReader();
    // fileReaderAPI-readAsDataURL: 데이터를 읽어내서 url로 바꿔준다.
    fileReader.readAsDataURL(file);
    // fileReader의 loading이 완료되는지 이벤트 감지.
    fileReader.onload = (event) => {
        // onload 이벤트 타겟(fileReader)의 결과를 이미지 src로 집어넣음.
        $coverImage.src = event.target.result;
    };
    $coverImage.style.display = 'block';
    $fileReUpload.style.display = 'block';
};

async function postSubmit(event) {
    event.preventDefault();

    try {
        // 두번째 인자로 각종 설정을 담은 객체 전달
        await fetch(`http://localhost:1234/posts`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                title: $titleInput.value,
                content: $contentInput.value,
                image: $coverImage.src,
                author: '새로운 유저',
                authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            }),
        });
        window.location.assign('/post-list.html');
    } catch (error) {
        alert(error);
    }
}

$imageUpload.addEventListener('change', uploadImage);
$imageReUpload.addEventListener('change', uploadImage);

// 입력할 때마다 체크하는 input 이벤트
$titleInput.addEventListener('input', checkInputLength);
$postForm.addEventListener('submit', postSubmit);
$publishButton.addEventListener('click', () => {
    // 해당 이벤트에 대해 등록된 EventListener들을 (동기적으로) 순서대로 호출
    $postForm.dispatchEvent(new Event('submit'));
});

$goBack.addEventListener('click', () => {
    window.history.back(1);
});