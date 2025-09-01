// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function () {
    // 日夜模式切换功能
    const themeToggle = document.getElementById('theme-toggle');
    const lightText = document.querySelector('.light-text');
    const darkText = document.querySelector('.dark-text');
    // 后续代码会重新声明 body 变量，这里移除重复声明
    const bodyElement = document.body;
    
    // 动态Title功能
    const originalTitle = document.title;
    const originalFavicon = document.querySelector('link[rel="icon"]')?.href || '/favicon.ico';
    const sadTitle = "别走呀，快回来！QAQ";
    const sadFavicon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDJDNjIuNTYgMiAxMDIgMTEuNDQgMTAyIDI2QzEwMiA0MC41NiA2Mi41NiA1MCAxNiA1MEMtMzAuNTYgNTAgLTcwIDQwLjU2IC03MCAyNkMtNzAgMTEuNDQgLTMwLjU2IDIgMTYgMloiIGZpbGw9IiNGRkYwMDAiLz4KPHBhdGggZD0iTTEyIDE4QzEyIDE5LjEwNDYgMTEuMTA0NiAyMCAxMCAyMEM4Ljg5NTQzIDIwIDggMTkuMTA0NiA4IDE4QzggMTYuODk1NCA4Ljg5NTQzIDE2IDEwIDE2QzExLjEwNDYgMTYgMTIgMTYuODk1NCAxMiAxOFoiIGZpbGw9IiMwMDAwMDAiLz4KPHBhdGggZD0iTTI0IDE4QzI0IDE5LjEwNDYgMjMuMTA0NiAyMCAyMiAyMEMyMC44OTU0IDIwIDIwIDE5LjEwNDYgMjAgMThDMjAgMTYuODk1NCAyMC44OTU0IDE2IDIyIDE2QzIzLjEwNDYgMTYgMjQgMTYuODk1NCAyNCAxOFoiIGZpbGw9IiMwMDAwMDAiLz4KPHBhdGggZD0iTTE2IDI4QzE0LjM0MzEgMjggMTMgMjYuNjU2OSAxMyAyNUgxOUMxOSAyNi42NTY5IDE3LjY1NjkgMjggMTYgMjhaIiBmaWxsPSIjMDAwMDAwIi8+Cjwvc3ZnPgo=";
    
    // 页面焦点状态管理
    let isPageFocused = true;
    
    // 页面获得焦点
    function onPageFocus() {
        if (!isPageFocused) {
            isPageFocused = true;
            document.title = originalTitle;
            updateFavicon(originalFavicon);
        }
    }
    
    // 页面失去焦点
    function onPageBlur() {
        if (isPageFocused) {
            isPageFocused = false;
            document.title = sadTitle;
            updateFavicon(sadFavicon);
        }
    }
    
    // 更新Favicon
    function updateFavicon(href) {
        let favicon = document.querySelector('link[rel="icon"]');
        if (!favicon) {
            favicon = document.createElement('link');
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
        }
        favicon.href = href;
    }
    
    // 监听页面焦点事件
    window.addEventListener('focus', onPageFocus);
    window.addEventListener('blur', onPageBlur);
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            onPageBlur();
        } else {
            onPageFocus();
        }
    });
    
    // 自定义光标功能
    let cursor = null;
    let isCursorEnabled = true;
    let isCursorVisible = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let animationFrameId = null;
    
    // 创建自定义光标
    function createCustomCursor() {
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        isCursorVisible = true;
    }
    
    // 高性能光标位置更新（使用requestAnimationFrame）
    function updateCursorPosition(e) {
        if (!isCursorEnabled || !cursor || !isCursorVisible) return;
        
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(() => {
                cursor.style.left = lastMouseX + 'px';
                cursor.style.top = lastMouseY + 'px';
                animationFrameId = null;
            });
        }
    }
    
    // 光标悬停效果
    function handleCursorHover(e) {
        if (!isCursorEnabled || !cursor || !isCursorVisible) return;
        
        const target = e.target;
        if (target.matches('a, button, .nav-link, .sidebar-link, .theme-toggle, .timeline-item, .project-card, .cursor-toggle')) {
            cursor.classList.add('hover');
        } else {
            cursor.classList.remove('hover');
        }
    }
    
    // 光标点击效果
    function handleCursorClick() {
        if (!isCursorEnabled || !cursor || !isCursorVisible) return;
        
        cursor.classList.add('click');
        setTimeout(() => {
            cursor.classList.remove('click');
        }, 150);
    }
    
    // 切换光标开关
    function toggleCursor() {
        isCursorEnabled = !isCursorEnabled;
        const cursorToggle = document.getElementById('cursor-toggle');
        
        if (isCursorEnabled) {
            cursorToggle.classList.add('active');
            cursorToggle.title = '关闭自定义光标';
            document.body.classList.add('custom-cursor-enabled');
            if (cursor) {
                cursor.style.display = 'block';
                isCursorVisible = true;
            }
        } else {
            cursorToggle.classList.remove('active');
            cursorToggle.title = '开启自定义光标';
            document.body.classList.remove('custom-cursor-enabled');
            if (cursor) {
                cursor.style.display = 'none';
                isCursorVisible = false;
            }
        }
        
        // 保存用户偏好
        localStorage.setItem('cursorEnabled', isCursorEnabled);
    }
    
    // 初始化自定义光标
    function initCustomCursor() {
        createCustomCursor();
        
        // 使用节流的事件监听器提高性能
        let throttleTimer;
        const throttledMouseMove = (e) => {
            if (!throttleTimer) {
                throttleTimer = setTimeout(() => {
                    updateCursorPosition(e);
                    throttleTimer = null;
                }, 16); // 约60fps
            }
        };
        
        document.addEventListener('mousemove', throttledMouseMove, { passive: true });
        document.addEventListener('mouseover', handleCursorHover, { passive: true });
        document.addEventListener('click', handleCursorClick);
        
        // 鼠标离开页面时隐藏光标
        document.addEventListener('mouseleave', () => {
            if (cursor && isCursorEnabled) cursor.style.display = 'none';
        });
        
        // 鼠标进入页面时显示光标
        document.addEventListener('mouseenter', () => {
            if (cursor && isCursorEnabled) cursor.style.display = 'block';
        });
        
        // 添加光标控制按钮事件监听
        const cursorToggle = document.getElementById('cursor-toggle');
        if (cursorToggle) {
            cursorToggle.addEventListener('click', toggleCursor);
        }
        
        // 检查用户之前的光标偏好
        const savedCursorPreference = localStorage.getItem('cursorEnabled');
        if (savedCursorPreference !== null) {
            isCursorEnabled = savedCursorPreference === 'true';
            if (!isCursorEnabled) {
                cursorToggle.classList.remove('active');
                cursorToggle.title = '开启自定义光标';
                document.body.classList.remove('custom-cursor-enabled');
                if (cursor) {
                    cursor.style.display = 'none';
                    isCursorVisible = false;
                }
            } else {
                cursorToggle.classList.add('active');
                cursorToggle.title = '关闭自定义光标';
                document.body.classList.add('custom-cursor-enabled');
            }
        } else {
            // 默认开启
            cursorToggle.classList.add('active');
            cursorToggle.title = '关闭自定义光标';
            document.body.classList.add('custom-cursor-enabled');
        }
    }
    
    // 启动自定义光标
    initCustomCursor();

    // 检查本地存储的主题偏好
    if (localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        bodyElement.classList.add('dark-theme');
        lightText.style.display = 'none';
        darkText.style.display = 'inline';
        // 初始化时如果是夜间模式，延迟更新雷达图颜色（等待图表创建完成）
        setTimeout(() => updateRadarChartColors(true), 100);
        // 初始化时如果是夜间模式，延迟更新光标颜色（等待光标创建完成）
        setTimeout(() => updateCursorTheme(true), 100);
    }

    // 主题切换事件监听
    themeToggle.addEventListener('click', function () {
        bodyElement.classList.toggle('dark-theme');

        if (bodyElement.classList.contains('dark-theme')) {
            lightText.style.display = 'none';
            darkText.style.display = 'inline';
            localStorage.setItem('theme', 'dark');
            // 夜间模式下更新雷达图颜色
            updateRadarChartColors(true);
            // 夜间模式下更新光标颜色
            updateCursorTheme(true);
        } else {
            lightText.style.display = 'inline';
            darkText.style.display = 'none';
            localStorage.setItem('theme', 'light');
            // 日间模式下恢复雷达图颜色
            updateRadarChartColors(false);
            // 日间模式下恢复光标颜色
            updateCursorTheme(false);
        }
    });
    
    // 更新雷达图颜色的函数
    function updateRadarChartColors(isDark) {
        if (window.skillsRadarChart) {
            const chart = window.skillsRadarChart;
            if (isDark) {
                // 夜间模式：白色曲线，黑色背景
                chart.data.datasets[0].borderColor = 'rgba(255, 255, 255, 1)';
                chart.data.datasets[0].backgroundColor = 'rgba(255, 255, 255, 0.1)';
                chart.data.datasets[0].pointBackgroundColor = 'rgba(255, 255, 255, 1)';
            } else {
                // 日间模式：蓝色曲线，蓝色背景
                chart.data.datasets[0].borderColor = 'rgba(24, 144, 255, 1)';
                chart.data.datasets[0].backgroundColor = 'rgba(24, 144, 255, 0.2)';
                chart.data.datasets[0].pointBackgroundColor = 'rgba(24, 144, 255, 1)';
            }
            chart.update();
        }
    }
    
    // 更新光标主题的函数
    function updateCursorTheme(isDark) {
        if (cursor) {
            if (isDark) {
                // 夜间模式：白色光标
                cursor.style.setProperty('--cursor-color', '#ffffff');
                cursor.style.setProperty('--cursor-border', '#ffffff');
                cursor.style.setProperty('--cursor-hover-color', 'rgba(255, 255, 255, 0.3)');
                cursor.style.setProperty('--cursor-hover-border', 'rgba(255, 255, 255, 0.6)');
                cursor.style.setProperty('--cursor-click-color', '#ff7875');
                cursor.style.setProperty('--cursor-click-border', '#ff7875');
            } else {
                // 日间模式：蓝色光标
                cursor.style.setProperty('--cursor-color', '#1890ff');
                cursor.style.setProperty('--cursor-border', '#1890ff');
                cursor.style.setProperty('--cursor-hover-color', 'rgba(24, 144, 255, 0.3)');
                cursor.style.setProperty('--cursor-hover-border', 'rgba(24, 144, 255, 0.6)');
                cursor.style.setProperty('--cursor-click-color', '#ff4d4f');
                cursor.style.setProperty('--cursor-click-border', '#ff4d4f');
            }
        }
    }

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
        link.addEventListener('click', function (e) {
            hideSidebar();
            // 不阻止链接的默认行为
        });
    });

    // 点击遮罩层隐藏侧边栏
    overlay.addEventListener('click', hideSidebar);

    // 点击主内容区域显示侧边栏
    mainContent.addEventListener('click', function (e) {
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

    // 动态打字机标题功能
    const typingTitle = document.getElementById('typing-title');
    const texts = ['你好，我是朱宇文', '一名前端开发爱好者', '计算机科学与技术专业学生', '热爱编程与创新'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;

    function typeText() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingTitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typingTitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200;
        }

        // 如果正在删除且已删除完所有字符
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = 1500; // 停留1.5秒
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // 切换到下一句
            typingDelay = 500; // 切换前停留0.5秒
        }

        setTimeout(typeText, typingDelay);
    }

    // 启动打字机效果
    typeText();

    // 项目展示功能
    class ProjectCard {
        constructor(projectData) {
            this.data = projectData;
            this.element = this.createCardElement();
        }

        createCardElement() {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.language = this.data.language || 'Other';

            card.innerHTML = `
                <h3 class="project-name"><a href="${this.data.html_url}" target="_blank">${this.data.name}</a></h3>
                <p class="project-description">${this.data.description || '无项目描述'}</p>
                ${this.data.language ? `<span class="project-language">${this.data.language}</span>` : ''}
            `;

            return card;
        }

        render(container) {
            container.appendChild(this.element);
        }
    }

    // 获取GitHub项目数据
    async function fetchGitHubProjects() {
        const projectsContainer = document.getElementById('projects-container');
        const filterContainer = document.querySelector('.filter-container');
        const username = 'jihan-z'; // 替换为实际GitHub用户名

        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
            const projects = await response.json();

            if (!projects.length) {
                projectsContainer.innerHTML = '<p>暂无项目数据</p>';
                return;
            }

            // 提取所有唯一的编程语言
            const languages = [...new Set(projects.map(p => p.language).filter(Boolean))];
            languages.unshift('All'); // 添加"全部"筛选选项

            // 创建筛选按钮
            filterContainer.innerHTML = '';
            languages.forEach(lang => {
                const button = document.createElement('button');
                button.className = `filter-btn ${lang === 'All' ? 'active' : ''}`;
                button.textContent = lang;
                button.dataset.language = lang;

                button.addEventListener('click', () => {
                    // 更新活跃按钮状态
                    document.querySelectorAll('.filter-btn').forEach(btn =>
                        btn.classList.toggle('active', btn.dataset.language === lang)
                    );

                    // 筛选项目
                    document.querySelectorAll('.project-card').forEach(card => {
                        const shouldShow = lang === 'All' || card.dataset.language === lang;
                        card.style.display = shouldShow ? 'block' : 'none';
                    });
                });

                filterContainer.appendChild(button);
            });

            // 渲染项目卡片
            projectsContainer.innerHTML = '';
            projects.forEach(project => {
                const card = new ProjectCard(project);
                card.render(projectsContainer);
            });
        } catch (error) {
            console.error('获取GitHub项目失败:', error);
            projectsContainer.innerHTML = '<p>获取项目数据失败，请稍后重试</p>';
        }
    }

    // 页面加载完成后获取项目数据
    fetchGitHubProjects();
});

// 动态技能条实现
document.addEventListener('DOMContentLoaded', function () {
    // 技能条动画
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    // 为每个技能条添加悬停事件
    skillBars.forEach(bar => {
        const skillItem = bar.closest('.skill-bar-item');
        const percent = parseInt(bar.getAttribute('data-percent'));
        
        // 设置CSS变量
        bar.style.setProperty('--skill-percent', percent + '%');
        
        // 确保初始状态
        bar.style.width = '0';
        
        // 鼠标悬停时逐步填充进度条
        skillItem.addEventListener('mouseenter', () => {
            // 清除之前的定时器
            if (bar.hideTimer) {
                clearTimeout(bar.hideTimer);
                bar.hideTimer = null;
            }
            
            // 根据百分比计算动画时间（百分比越高，时间越长）
            const animationDuration = Math.max(0.8, percent / 100 * 2.5); // 0.8秒到2.5秒之间
            
            // 使用缓动函数让动画更自然
            const startTime = performance.now();
            const startWidth = 0;
            const targetWidth = percent;
            
            function animateProgress(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / (animationDuration * 1000), 1);
                
                // 使用缓动函数（ease-out）
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentWidth = startWidth + (targetWidth - startWidth) * easeProgress;
                
                bar.style.width = currentWidth + '%';
                bar.style.transition = 'none'; // 移除过渡效果，实现逐步填充
                
                if (progress < 1) {
                    requestAnimationFrame(animateProgress);
                } else {
                    // 动画完成，恢复过渡效果
                    bar.style.transition = 'width 0.3s ease';
                }
            }
            
            requestAnimationFrame(animateProgress);
        });
        
        // 鼠标移开时保持显示几秒再消失
        skillItem.addEventListener('mouseleave', () => {
            // 添加保持显示的类
            bar.classList.add('keep-show');
            
            // 3秒后移除保持显示的类，进度条消失
            bar.hideTimer = setTimeout(() => {
                bar.classList.remove('keep-show');
                bar.style.width = '0';
                bar.style.transition = 'width 0.8s ease';
                bar.hideTimer = null;
            }, 3000);
        });
    });
    
    // 原有的Intersection Observer（可选，用于页面加载时的初始动画）
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 只在首次进入视口时显示，之后由悬停事件控制
                if (!entry.target.classList.contains('keep-show')) {
                    entry.target.style.width = '0';
                }
            }
        });
    }, { threshold: 0.1, once: true });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });

    // 技能雷达图
    const ctx = document.getElementById('skillsRadarChart');
    
    // 创建雷达图实例，保存为全局变量以便主题切换时更新
    window.skillsRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['编程能力', '设计', '沟通', '问题解决', '团队协作', '学习能力'],
            datasets: [{
                label: '技能评估',
                data: [85, 65, 75, 80, 70, 90],
                backgroundColor: 'rgba(24, 144, 255, 0.2)',
                borderColor: 'rgba(24, 144, 255, 1)',
                pointBackgroundColor: 'rgba(24, 144, 255, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });

    // 时间轴交互
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // 我的足迹地图
    const map = L.map('map').setView([39.9042, 116.4074], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 添加地图标记
    const locations = [
        { name: '北京', coords: [39.9042, 116.4074], desc: '2023年参观了故宫和长城' },
        { name: '上海', coords: [31.2304, 121.4737], desc: '2022年参加前端技术 conference' },
        { name: '杭州', coords: [30.2796, 120.1590], desc: '2023年实习所在地' },
        { name: '广州', coords: [23.1291, 113.2644], desc: '2021年旅游，品尝了当地美食' }
    ];

    locations.forEach(loc => {
        L.marker(loc.coords).addTo(map)
            .bindPopup(`<b>${loc.name}</b><br>${loc.desc}`);
    });
});