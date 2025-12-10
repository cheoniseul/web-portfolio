// 헤더 모바일 반응형
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
});


// skills
// 기술별 설명 & 숙련도 데이터
const skillData = {
    html: {
        title: "HTML5",
        desc: "시맨틱 태그 사용과 구조 중심의 마크업 작성 경험이 있습니다.",
        level: 80
    },
    css: {
        title: "CSS3",
        desc: "Flex/Grid 기반 레이아웃 구성과 공통 스타일 구조화 경험이 있습니다.",
        level: 75
    },
    js: {
        title: "JavaScript",
        desc: "DOM 조작과 이벤트 처리, 비동기 요청(fetch) 기반 기능 구현 경험이 있습니다.",
        level: 75
    },
    chart: {
        title: "Chart.js",
        desc: "관리자 통계 대시보드에서 기본 차트(막대/라인) 시각화 구현 경험이 있습니다.",
        level: 50
    },
    github: {
        title: "GitHub",
        desc: "팀 프로젝트에서 브랜치 전략을 활용한 협업 경험이 있습니다.",
        level: 70
    },
    figma: {
        title: "Figma",
        desc: "프로젝트의 관리자 화면을 직접 설계한 경험이 있습니다.",
        level: 55
    },
    vscode: {
        title: "VS Code",
        desc: "웹 개발을 위한 기본적인 코드 편집 및 실행 환경 사용 경험이 있습니다.",
        level: 75
    }
};


// DOM 요소 가져오기
const tags = document.querySelectorAll(".skill_tag");
const skillTitle = document.getElementById("skill_title");
const skillDesc = document.getElementById("skill_desc");
const skillBar = document.getElementById("skill_bar");
const skillPercent = document.getElementById("skill_percent");


// 태그 클릭 이벤트
tags.forEach(tag => {
    tag.addEventListener("click", () => {
        const selectedSkill = tag.dataset.skill;

        // 1. active 초기화
        tags.forEach(t => t.classList.remove("active"));
        tag.classList.add("active");

        // 2. 데이터 불러오기
        const data = skillData[selectedSkill];

        // 3. 표시 변경
        skillTitle.textContent = data.title;
        skillDesc.textContent = data.desc;

        // 4. 바 애니메이션 (초기화 후 다시 채움)
        skillBar.style.width = "0%";
        skillPercent.textContent = ""; // 초기화

        setTimeout(() => {
            skillBar.style.width = data.level + "%";
            skillPercent.textContent = data.level + "%";
        }, 80); // 약간 딜레이 주면 더 부드러움
    });
});


// project
// 프로젝트별 이미지 배열
const projectImages = {
    firstAid_img: [
        "image/firstAid/firstAid-adminDashBoard1.png",
        "image/firstAid/firstAid-adminUser1.png",
        "image/firstAid/firstAid-adminUser2.png",
        "image/firstAid/firstAid-adminCourse1.png",
        "image/firstAid/firstAid-adminCourseAdd1.png",
        "image/firstAid/firstAid-adminCourseAdd2.png",
        "image/firstAid/firstAid-adminEduAdd1.png",
        "image/firstAid/firstAid-adminInquiry1.png",
        "image/firstAid/firstAid-adminInquiry2.png"
    ],
    history_img: [
        "image/history/history-home.png",
        "image/history/history-study.png",
        "image/history/history-quiz1.png",
        "image/history/history-quiz2.png",
        "image/history/history-pointStore.png",
        "image/history/history-adminQuizList.png",
        "image/history/history-adminComment.png",
        "image/history/history-adminStore1.png",
        "image/history/history-adminStore2.png"
    ]
};

const projectDescriptions = {
    firstAid_img: [
        "관리자 대시보드 - 서비스 핵심 지표를 한눈에 확인",
        "회원 목록 페이지 - 회원 검색 기능 지원",
        "회원 상세 페이지 - 회원의 수강 정보 및 상태 확인",
        "강의 목록 페이지 - 검색 및 분류(필터) 기능 지원",
        "강의 등록 페이지1 - 강의 기본 정보 입력",
        "강의 등록 페이지2 - 강의 영상 자막 입력 및 관리",
        "교육자료 등록 페이지 - 자료 업로드 및 입력폼 구성",
        "문의사항 목록 - 검색 및 필터를 통한 문의 관리",
        "문의 상세 보기 및 답변 등록"
    ],
    history_img: [
        "메인 홈 페이지",
        "학습 페이지 - 원하는 학습 주제 선택",
        "퀴즈 페이지 1 - 퀴즈 풀이 화면",
        "퀴즈 페이지 2 - 오답 확인 및 정답 학습",
        "포인트 상점 - 포인트를 이용한 상품 구매 기능",
        "관리자 퀴즈 목록 관리",
        "관리자 댓글 관리",
        "관리자 상품 및 주문 목록 관리",
        "상품 등록 모달 - 상품 정보 입력폼 구성"
    ]
};


// DOM 요소
const projectModal = document.getElementById("project_img_modal");
const sliderImages = document.querySelector(".slider_images");
const btnClose = document.querySelector(".project_modal_close");

const pagePrev = document.querySelector(".page_prev");
const pageNext = document.querySelector(".page_next");

const pageNow = document.querySelector(".page_now");
const pageTotal = document.querySelector(".page_total");

let currentIndex = 0;
let currentImageList = [];

let currentKey = "";


// 모달 열기 (프로젝트 이미지 버튼 클릭 시)
document.querySelectorAll(".project_img_btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentKey = btn.dataset.img; // 해당 프로젝트 키
        currentImageList = projectImages[currentKey]; // 이미지 배열 가져오기
        currentIndex = 0; // 첫 번째 이미지부터 시작

        openModal();
        renderImages();
        updateSlide();
        updateDescription();
    });
});


// 모달 열기
function openModal() {
    projectModal.style.display = "flex";
    document.body.style.overflow = "hidden"; // 스크롤 잠금

    // 애니메이션 위해 약간의 지연 후 show 클래스 추가
    setTimeout(() => {
        projectModal.classList.add("show");
    }, 10);
}


// 모달 닫기
function closeModal() {
    projectModal.classList.remove("show");
    document.body.style.overflow = "auto";

    // 애니메이션 끝난 후 display none 처리 (0.3s과 맞춤)
    setTimeout(() => {
        projectModal.style.display = "none";
    }, 300);
}

btnClose.addEventListener("click", closeModal);


// 바깥 클릭 시 닫기
projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) closeModal();
});


// 이미지 목록 렌더링
function renderImages() {
    sliderImages.innerHTML = "";  // 초기화

    currentImageList.forEach((imgSrc, idx) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("slide");
        if (idx === 0) img.classList.add("active");
        sliderImages.appendChild(img);
    });

    // 페이지 숫자 표시
    pageTotal.textContent = currentImageList.length;
}


// 슬라이드 업데이트
function updateSlide() {
    const slides = document.querySelectorAll(".slide");

    slides.forEach(slide => slide.classList.remove("active"));
    slides[currentIndex].classList.add("active");

    pageNow.textContent = currentIndex + 1;

    updateDescription();
}

// 화면 설명
function updateDescription() {
    document.querySelector(".slide_description").textContent =
        projectDescriptions[currentKey][currentIndex];
}

// 페이지 이동 버튼
pagePrev.addEventListener("click", () => {
    currentIndex = (currentIndex === 0)
        ? currentImageList.length - 1
        : currentIndex - 1;
    updateSlide();
});

pageNext.addEventListener("click", () => {
    currentIndex = (currentIndex === currentImageList.length - 1)
        ? 0
        : currentIndex + 1;
    updateSlide();
});



