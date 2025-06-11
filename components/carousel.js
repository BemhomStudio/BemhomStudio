class Carousel {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            interval: 3000,
            ...options
        };
        
        this.currentIndex = 0;
        this.carouselInterval = null;
        this.init();
    }

    init() {
        // 创建轮播图结构
        this.container.innerHTML = `
            <div class="carousel">
                <img src="images/app/app进入页面.svg" alt="进入页面" class="carousel-item" data-index="0">
                <img src="images/app/计时器页面.svg" alt="计时器页面" class="carousel-item" data-index="1">
                <img src="images/app/多重计时页面.svg" alt="多重计时页面" class="carousel-item" data-index="2">
            </div>
        `;

        // 初始化元素
        this.carouselItems = this.container.querySelectorAll('.carousel-item');
        this.totalItems = this.carouselItems.length;

        // 绑定事件
        this.bindEvents();
        
        // 开始轮播
        this.start();
    }

    updateCarousel() {
        this.carouselItems.forEach((item) => {
            const dataIndex = parseInt(item.getAttribute('data-index'));
            item.setAttribute('data-index', (dataIndex + 1) % this.totalItems);
        });
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
    }

    start() {
        if (this.carouselInterval) {
            clearInterval(this.carouselInterval);
        }
        this.carouselInterval = setInterval(() => this.updateCarousel(), this.options.interval);
    }

    bindEvents() {
        this.carouselItems.forEach(item => {
            item.addEventListener('click', () => {
                const clickedIndex = parseInt(item.getAttribute('data-index'));
                if (clickedIndex !== 0) {
                    const steps = clickedIndex;
                    for (let i = 0; i < steps; i++) {
                        this.updateCarousel();
                    }
                    this.start();
                }
            });
        });
    }
}

export default Carousel; 