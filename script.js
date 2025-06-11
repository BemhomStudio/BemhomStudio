// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 表单提交处理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // 这里可以添加表单验证逻辑
        
        // 模拟表单提交
        alert('感谢您的留言！我们会尽快回复。');
        contactForm.reset();
    });
}

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    console.log('页面加载完成');
});

// 项目卡片悬停效果
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselText = document.querySelector('.carousel-text');
    let currentIndex = 0;
    const totalItems = carouselItems.length;
    let carouselInterval;

    // 文本内容映射
    const textContent = {
        'app进入页面.svg': '强制目标系统',
        '计时器页面.svg': '移除繁琐，简洁易用',
        '多重计时页面.svg': '自定义考试多重计'
    };

    // 更新轮播图位置和文本
    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            const dataIndex = parseInt(item.getAttribute('data-index'));
            item.setAttribute('data-index', (dataIndex + 1) % totalItems);
        });
        currentIndex = (currentIndex + 1) % totalItems;
        
        // 更新文本内容
        const currentImage = carouselItems[0].src.split('/').pop();
        const text = textContent[currentImage];
        if (text) {
            carouselText.textContent = text;
        }
    }

    // 开始自动轮播
    function startCarousel() {
        // 清除可能存在的旧定时器
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
        // 设置新的定时器
        carouselInterval = setInterval(updateCarousel, 3000);
    }

    // 点击切换
    carouselItems.forEach(item => {
        item.addEventListener('click', function() {
            const clickedIndex = parseInt(this.getAttribute('data-index'));
            if (clickedIndex !== 0) {  // 只处理非当前显示的图片
                const steps = clickedIndex;
                for (let i = 0; i < steps; i++) {
                    updateCarousel();
                }
                // 点击后立即开始新的轮播计时
                startCarousel();
            }
        });
    });

    // 初始化轮播和文本
    updateCarousel();
    startCarousel();
}); 