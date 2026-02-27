// 平滑滚动与交互
document.addEventListener('DOMContentLoaded', function() {
    // 滚动时导航栏效果
    let lastScroll = 0;
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            nav.style.background = 'transparent';
        }
        
        lastScroll = currentScroll;
    });

    // 图片懒加载占位符提示
    const placeholders = document.querySelectorAll('.placeholder-text');
    placeholders.forEach(el => {
        el.addEventListener('click', function() {
            alert('请将此区域替换为实际项目图片');
        });
    });

    // 轮播功能
    initCarousels();
});

// 初始化所有轮播
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        
        if (slides.length <= 1) return;
        
        let currentSlide = 0;
        let autoplayInterval;
        
        // 切换到指定幻灯片
        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // 更新小圆点
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
            
            // 更新幻灯片状态
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });
        }
        
        // 下一张
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        // 自动播放
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 4000);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // 小圆点点击事件
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoplay();
                goToSlide(index);
                startAutoplay();
            });
        });
        
        // 鼠标悬停暂停
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        
        // 触摸滑动支持
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // 向左滑，下一张
                    goToSlide(currentSlide + 1);
                } else {
                    // 向右滑，上一张
                    goToSlide(currentSlide - 1);
                }
            }
        }
        
        // 启动自动播放
        startAutoplay();
    });
}
