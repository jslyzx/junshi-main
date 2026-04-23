// app.js

let currentPath = '';
let openTags = [{ title: '医院管理', id: 'hospital-manage-new' }];

// 初始化
window.onload = () => {
    renderMenu();
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
};

// 渲染侧边栏菜单
function renderMenu() {
    const menuEl = document.getElementById('sideMenu');
    menuEl.innerHTML = MENU_CONFIG.map(group => `
        <div class="menu-item" id="group-${group.id}">
            <div class="menu-title" onclick="toggleSubMenu('${group.id}')">
                <span>${group.title}</span>
                <span>▼</span>
            </div>
            <div class="sub-menu">
                ${group.children.map(child => `
                    <div class="sub-menu-item" id="menu-${child.id}" onclick="navigate('${child.id}', '${child.title}')">
                        ${child.title}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 路由处理
function handleRoute() {
    const hash = window.location.hash.slice(1) || 'pharmacy-manage';
    currentPath = hash;
    
    // 更新菜单激活状态
    document.querySelectorAll('.sub-menu-item').forEach(el => el.classList.remove('active'));
    const activeMenu = document.getElementById(`menu-${hash}`);
    if (activeMenu) {
        activeMenu.classList.add('active');
        // 展开父级菜单
        const parentGroup = activeMenu.closest('.menu-item');
        if (parentGroup) parentGroup.classList.add('open');
    }

    renderTags();
    renderPage(hash);
}

// 页面切换
function navigate(id, title) {
    if (!openTags.find(tag => tag.id === id)) {
        openTags.push({ id, title });
    }
    window.location.hash = id;
}

// 渲染标签页
function renderTags() {
    const tagsEl = document.getElementById('tagsView');
    tagsEl.innerHTML = openTags.map(tag => `
        <div class="tag ${currentPath === tag.id ? 'active' : ''}" onclick="window.location.hash='${tag.id}'">
            ${tag.title}
            <span style="margin-left:5px; cursor:pointer;" onclick="event.stopPropagation(); closeTag('${tag.id}')">×</span>
        </div>
    `).join('');
}

function closeTag(id) {
    if (openTags.length <= 1) return;
    const index = openTags.findIndex(tag => tag.id === id);
    openTags.splice(index, 1);
    if (currentPath === id) {
        window.location.hash = openTags[openTags.length - 1].id;
    } else {
        renderTags();
    }
}

// 展开/收起子菜单
function toggleSubMenu(groupId) {
    const el = document.getElementById(`group-${groupId}`);
    el.classList.toggle('open');
}

// 渲染具体页面内容
function renderPage(pageId) {
    const contentEl = document.getElementById('contentArea');

    // 特殊页面处理：基础数据
    if (pageId === 'base-data') {
        renderBaseDataPage();
        return;
    }
    
    const pageData = MOCK_DATA[pageId];
    
    if (!pageData) {
        contentEl.innerHTML = '<div class="page-container">页面正在开发中...</div>';
        return;
    }

    // 找到页面标题
    let pageTitle = '';
    MENU_CONFIG.forEach(g => g.children.forEach(c => { if(c.id === pageId) pageTitle = c.title }));
    document.getElementById('breadcrumb').innerText = `首页 / ${pageTitle}`;

    contentEl.innerHTML = `
        <div class="page-container">
            <div class="search-bar">
                <div class="search-item">
                    <label>关键词</label>
                    <input type="text" placeholder="输入名称搜索">
                </div>
                <div class="search-item">
                    <label>状态</label>
                    <select>
                        <option value="">全部</option>
                        <option value="1">启用</option>
                        <option value="0">禁用</option>
                    </select>
                </div>
                <button class="btn btn-primary">搜索</button>
                <button class="btn">重置</button>
            </div>

            <div class="toolbar">
                <button class="btn btn-primary" onclick="openAddModal('${pageId}')">+ 新增</button>
                <button class="btn" style="margin-left:10px;">导出</button>
            </div>

            <table>
                <thead>
                    <tr>
                        ${pageData.columns.map(col => `<th>${col.label}</th>`).join('')}
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    ${pageData.data.map(row => `
                        <tr>
                            ${pageData.columns.map(col => `<td>${row[col.key] || '-'}</td>`).join('')}
                            <td>
                                ${pageId === 'project-followup' ? `
                                    <a href="javascript:;" style="color:var(--primary-color); margin-right:8px;">编辑</a>
                                    <a href="javascript:;" style="color:var(--primary-color); margin-right:8px;">医院</a>
                                    <a href="javascript:;" style="color:var(--primary-color); margin-right:8px;">商品</a>
                                    <a href="javascript:;" style="color:var(--primary-color); margin-right:8px;">表单</a>
                                    <a href="javascript:;" style="color:var(--primary-color); margin-right:8px;">规则</a>
                                    <a href="javascript:;" style="color:#f56c6c;">停用</a>
                                ` : `
                                    <a href="javascript:;" style="color:var(--primary-color); margin-right:10px;" onclick="openEditModal('${pageId}', ${row.id})">编辑</a>
                                    <a href="javascript:;" style="color:#f56c6c;" onclick="deleteRow('${pageId}', ${row.id})">删除</a>
                                `}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="pagination">
                <span>共 ${pageData.data.length} 条</span>
                <div style="display:flex; gap:5px;">
                    <button class="btn" disabled><</button>
                    <button class="btn btn-primary">1</button>
                    <button class="btn">></button>
                </div>
                <select style="width:80px;">
                    <option>20条/页</option>
                </select>
            </div>
        </div>
    `;
}

// 弹窗逻辑
let currentEditingId = null;
let currentPageId = null;

function openAddModal(pageId) {
    currentPageId = pageId;
    currentEditingId = null;
    document.getElementById('modalTitle').innerText = '新增';
    renderForm(pageId);
    document.getElementById('modalMask').style.display = 'flex';
}

function openEditModal(pageId, rowId) {
    currentPageId = pageId;
    currentEditingId = rowId;
    const rowData = MOCK_DATA[pageId].data.find(d => d.id === rowId);
    document.getElementById('modalTitle').innerText = '编辑';
    renderForm(pageId, rowData);
    document.getElementById('modalMask').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modalMask').style.display = 'none';
}

function renderForm(pageId, data = null) {
    const bodyEl = document.getElementById('modalBody');
    const columns = MOCK_DATA[pageId].columns;
    
    bodyEl.innerHTML = columns.map(col => `
        <div class="form-item">
            <label>${col.label}</label>
            <div class="form-content">
                <input type="text" id="field-${col.key}" value="${data ? (data[col.key] || '') : ''}">
            </div>
        </div>
    `).join('');
}

function saveData() {
    const pageData = MOCK_DATA[currentPageId];
    const columns = pageData.columns;
    const newRow = { id: currentEditingId || Date.now() };
    
    columns.forEach(col => {
        newRow[col.key] = document.getElementById(`field-${col.key}`).value;
    });

    if (currentEditingId) {
        const index = pageData.data.findIndex(d => d.id === currentEditingId);
        pageData.data[index] = newRow;
    } else {
        pageData.data.unshift(newRow);
    }

    renderPage(currentPageId);
    closeModal();
    alert('保存成功！');
}

function deleteRow(pageId, rowId) {
    if (confirm('确定要删除该记录吗？')) {
        const pageData = MOCK_DATA[pageId];
        const index = pageData.data.findIndex(d => d.id === rowId);
        if (index > -1) {
            pageData.data.splice(index, 1);
            renderPage(pageId);
            alert('删除成功！');
        }
    }
}
