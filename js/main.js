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
});
