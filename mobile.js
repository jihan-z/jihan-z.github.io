// 侧边栏切换功能
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.site-sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const header = document.querySelector('.site-header');

    // 切换侧边栏显示/隐藏
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // 点击侧边栏链接后关闭侧边栏（在移动设备上）
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 640) {
                sidebar.classList.remove('active');
            }
        });
    });

    // 监听窗口大小变化，在大屏幕上自动显示侧边栏
    window.addEventListener('resize', function() {
        if (window.innerWidth > 640) {
            sidebar.classList.remove('active');
        }
    });

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});