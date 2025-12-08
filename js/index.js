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
        "../image/adminDashBoard1-vs.png",
        "../image/adminUser1-vs.png",
        "../image/adminUser2-vs.png",
        "../image/adminCourseAdd1-vs.png",
        "../image/adminCourseAdd2-vs.png",
        "../image/adminEduAdd1-vs.png",
        "../image/adminInquiry1-vs.png",
        "../image/adminInquiry2-vs.png"
    ],
    history_img: [
        "img/history_1.png",
        "img/history_2.png",
        "img/history_3.png"
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


// 모달 열기 (프로젝트 이미지 버튼 클릭 시)
document.querySelectorAll(".project_img_btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const key = btn.dataset.img;               // 해당 프로젝트 키
        currentImageList = projectImages[key];     // 이미지 배열 가져오기
        currentIndex = 0;                          // 첫 번째 이미지부터 시작

        openModal();
        renderImages();
        updateSlide();
    });
});


// 모달 열기
function openModal() {
    projectModal.style.display = "flex";
    document.body.style.overflow = "hidden"; // 스크롤 잠금
}


// 모달 닫기
function closeModal() {
    projectModal.style.display = "none";
    document.body.style.overflow = "auto";
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



