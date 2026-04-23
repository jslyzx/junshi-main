// base-data-template.js

function renderBaseDataPage() {
    const contentEl = document.getElementById('contentArea');
    
    const dictGroups = [
        { name: '适应性子项', code: 'adaptability' },
        { name: '身体状况', code: 'health' },
        { name: '任务逾期原因', code: 'overdue' },
        { name: '渠道类型', code: 'channel' },
        { name: '性格', code: 'character' },
        { name: '商保类型', code: 'insurance' },
        { name: '依从性子项', code: 'compliance' },
        { name: '家庭条件', code: 'family' }
    ];

    const dictItems = [
        { name: '适应性子项', code: 'adaptability', item: '不该进行单药治疗的实用性...', status: '启用' },
        { name: '适应性子项', code: 'adaptability', item: '更适合进行非药物治疗的疾...', status: '启用' },
        { name: '适应性子项', code: 'adaptability', item: '用一种药物治疗其他药物引...', status: '启用' },
        { name: '适应性子项', code: 'adaptability', item: '需要启动药物治疗的实际情况', status: '启用' },
        { name: '适应性子项', code: 'adaptability', item: '需要进行预防用药来降低新...', status: '启用' },
        { name: '适应性子项', code: 'adaptability', item: '需要增加药物以获得协同或...', status: '启用' }
    ];

    contentEl.innerHTML = `
        <div class="base-data-layout" style="display: flex; gap: 20px; height: 100%;">
            <!-- 左侧字典分类 -->
            <div class="dict-sidebar" style="width: 200px; background: #fff; border-radius: 4px; border: 1px solid var(--border-color); overflow-y: auto;">
                ${dictGroups.map((g, i) => `
                    <div class="dict-group-item ${i === 0 ? 'active' : ''}" 
                         style="padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #f0f0f0; ${i === 0 ? 'background: var(--primary-color); color: #fff;' : ''}">
                        ${g.name}
                    </div>
                `).join('')}
            </div>

            <!-- 右侧字典项详情 -->
            <div class="dict-content" style="flex: 1; background: #fff; padding: 20px; border-radius: 4px; border: 1px solid var(--border-color);">
                <div class="toolbar" style="display: flex; justify-content: flex-end; margin-bottom: 15px;">
                    <button class="btn btn-primary" onclick="openAddModal('base-data')">+ 新增</button>
                    <button class="btn" style="margin-left: 10px;">刷新</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>字典名称</th>
                            <th>字典编码</th>
                            <th>字典项</th>
                            <th>使用状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${dictItems.map(row => `
                            <tr>
                                <td>${row.name}</td>
                                <td>${row.code}</td>
                                <td>${row.item}</td>
                                <td>${row.status}</td>
                                <td>
                                    <a href="javascript:;" style="color:var(--primary-color); margin-right:10px;">编辑</a>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="pagination">
                    <span>共 7 条</span>
                    <div style="display:flex; gap:5px;">
                        <button class="btn" disabled><</button>
                        <button class="btn btn-primary">1</button>
                        <button class="btn">></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
