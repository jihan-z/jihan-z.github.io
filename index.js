// 等待DOM加载完成
 document.addEventListener('DOMContentLoaded', function() {
    // 日夜模式切换功能
    const themeToggle = document.getElementById('theme-toggle');
    const lightText = document.querySelector('.light-text');
    const darkText = document.querySelector('.dark-text');
    // 后续代码会重新声明 body 变量，这里移除重复声明
    const bodyElement = document.body;
    
    // 检查本地存储的主题偏好
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        bodyElement.classList.add('dark-theme');
        lightText.style.display = 'none';
        darkText.style.display = 'inline';
    }
    
    // 主题切换事件监听
    themeToggle.addEventListener('click', function() {
        bodyElement.classList.toggle('dark-theme');
        
        if (bodyElement.classList.contains('dark-theme')) {
            lightText.style.display = 'none';
            darkText.style.display = 'inline';
            localStorage.setItem('theme', 'dark');
        } else {
            lightText.style.display = 'inline';
            darkText.style.display = 'none';
            localStorage.setItem('theme', 'light');
        }
    });
    
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
        const username = 'zhuyuwen'; // 替换为实际GitHub用户名
        
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