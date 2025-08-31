// 等待DOM加载完成
 document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const sidebar = document.querySelector('aside.site-sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    const mainContent = document.querySelector('main.site-main');
    const body = document.querySelector('body');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    // 检测是否为移动设备
    let isMobile = window.innerWidth <= 768;
    let hideTimer;
    
    // 更新移动设备状态
    function updateMobileStatus() {
        isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // 移动端默认隐藏侧边栏
            sidebar.classList.add('hidden');
            sidebar.classList.remove('visible');
        } else {
            // 非移动端恢复默认样式
            sidebar.classList.remove('hidden');
            sidebar.classList.remove('visible');
            mainContent.classList.remove('main-content-blur');
            overlay.classList.remove('active');
        }
    }
    
    // 显示侧边栏
    function showSidebar() {
        if (!isMobile) return;
        
        sidebar.classList.remove('hidden');
        sidebar.classList.add('visible');
        mainContent.classList.add('main-content-blur');
        overlay.classList.add('active');
        
        // 设置5秒后自动隐藏
        clearHideTimer();
        hideTimer = setTimeout(hideSidebar, 5000);
    }
    
    // 隐藏侧边栏
    function hideSidebar() {
        if (!isMobile) return;
        
        sidebar.classList.add('hidden');
        sidebar.classList.remove('visible');
        mainContent.classList.remove('main-content-blur');
        overlay.classList.remove('active');
        
        clearHideTimer();
    }
    
    // 清除自动隐藏计时器
    function clearHideTimer() {
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }
    }
    
    // 重置自动隐藏计时器
    function resetHideTimer() {
        if (!isMobile) return;
        
        clearHideTimer();
        hideTimer = setTimeout(hideSidebar, 5000);
    }
    
    // 点击侧边栏链接时隐藏侧边栏
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            hideSidebar();
            // 不阻止链接的默认行为
        });
    });
    
    // 点击遮罩层隐藏侧边栏
    overlay.addEventListener('click', hideSidebar);
    
    // 点击主内容区域显示侧边栏
    mainContent.addEventListener('click', function(e) {
        // 如果侧边栏已经显示，则不执行任何操作
        if (!sidebar.classList.contains('hidden')) return;
        
        showSidebar();
    });
    
    // 监听侧边栏内部的交互，重置自动隐藏计时器
    sidebar.addEventListener('mousemove', resetHideTimer);
    sidebar.addEventListener('touchstart', resetHideTimer);
    
    // 监听窗口大小变化
    window.addEventListener('resize', updateMobileStatus);
    
    // 初始化
    updateMobileStatus();
});