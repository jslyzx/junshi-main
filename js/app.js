// app.js - Vue 3 + Element Plus 版

const { createApp, ref, reactive, computed, onMounted } = Vue;

const app = createApp({
    setup() {
        const menuConfig = ref(MENU_CONFIG);
        const activePath = ref('home');
        const openTags = ref([{ title: '首页', id: 'home' }]);
        const loading = ref(false);

        // 计算当前页面标题
        const currentTitle = computed(() => {
            if (activePath.value === 'home') return '首页';
            const tag = openTags.value.find(t => t.id === activePath.value);
            return tag ? tag.title : '';
        });

        const isCommonPage = computed(() => {
            return MOCK_DATA[activePath.value] && activePath.value !== 'base-data';
        });

        const isArticlePage = computed(() => {
            return activePath.value.startsWith('article-');
        });

        const isBaseDataPage = computed(() => {
            return activePath.value === 'base-data';
        });

        // 字典数据 (迁移自 base-data.js)
        const dictGroups = ref([
            { name: '适应性子项', code: 'adaptability' },
            { name: '身体状况', code: 'health' },
            { name: '任务逾期原因', code: 'overdue' },
            { name: '渠道类型', code: 'channel' },
            { name: '性格', code: 'character' },
            { name: '商保类型', code: 'insurance' },
            { name: '依从性子项', code: 'compliance' },
            { name: '家庭条件', code: 'family' }
        ]);
        const activeDictGroup = ref('适应性子项');
        const dictItems = ref([
            { name: '适应性子项', code: 'adaptability', item: '不该进行单药治疗的实用性...', status: '启用' },
            { name: '适应性子项', code: 'adaptability', item: '更适合进行非药物治疗的疾...', status: '启用' },
            { name: '适应性子项', code: 'adaptability', item: '用一种药物治疗其他药物引...', status: '启用' },
            { name: '适应性子项', code: 'adaptability', item: '需要启动药物治疗的实际情况', status: '启用' },
            { name: '适应性子项', code: 'adaptability', item: '需要进行预防用药来降低新...', status: '启用' },
            { name: '适应性子项', code: 'adaptability', item: '需要增加药物以获得协同或...', status: '启用' }
        ]);

        // 导航处理
        const handleMenuSelect = (index) => {
            let title = '';
            if (index === 'home') {
                title = '首页';
            } else {
                menuConfig.value.forEach(g => g.children.forEach(c => {
                    if (c.id === index) title = c.title;
                }));
            }
            navigate(index, title);
        };

        const navigate = (id, title) => {
            if (!openTags.value.find(tag => tag.id === id)) {
                openTags.value.push({ id, title });
            }
            activePath.value = id;
            window.location.hash = id;
            renderCurrentPage();
        };

        const handleTabClick = (pane) => {
            activePath.value = pane.props.name;
            window.location.hash = activePath.value;
            renderCurrentPage();
        };

        const handleTabRemove = (name) => {
            if (name === 'home') return;
            const index = openTags.value.findIndex(t => t.id === name);
            if (index === -1) return;
            openTags.value.splice(index, 1);
            if (activePath.value === name) {
                const lastTag = openTags.value[openTags.value.length - 1];
                activePath.value = lastTag.id;
                window.location.hash = lastTag.id;
                renderCurrentPage();
            }
        };

        const getGroupIcon = (id) => {
            const icons = {
                'grant': 'fa-database',
                'staff': 'fa-user-group',
                'config': 'fa-gears',
                'project': 'fa-folder-tree',
                'article': 'fa-file-lines'
            };
            return icons[id] || 'fa-folder';
        };

        const handleUserCommand = (command) => {
            if (command === 'logout') window.location.href = 'index.html';
        };

        // 数据状态
        const taskStats = ref([
            { label: '今日任务', value: 0, icon: 'fa-clipboard-list', color: '#409EFF', bg: 'rgba(64,158,255,0.1)' },
            { label: '本月待执行任务', value: 1, icon: 'fa-hourglass-half', color: '#E6A23C', bg: 'rgba(230,162,60,0.1)' },
            { label: '本月即将到期任务', value: 0, icon: 'fa-calendar-days', color: '#F56C6C', bg: 'rgba(245,108,108,0.1)' },
            { label: '本月已超期任务', value: 0, icon: 'fa-triangle-exclamation', color: '#F56C6C', bg: 'rgba(245,108,108,0.1)' },
            { label: '今日已完成任务', value: 0, icon: 'fa-circle-check', color: '#67C23A', bg: 'rgba(103,194,58,0.1)' }
        ]);

        const tableData = ref([]);
        const searchKeyword = ref('');

        // 医院选择弹窗状态
        const hospitalVisible = ref(false);
        const hospitalSearchKeyword = ref('');
        const hospitalData = ref([
            { id: 1, name: '浙江益药全德堂药房连锁有限公司杭州清吟街分公司', city: '浙江杭州' },
            { id: 2, name: '浙江益药全德堂药房连锁有限公司杭州解放路分公司', city: '浙江杭州' },
            { id: 3, name: '上药控股(宁波)大药房有限公司杏苑连锁店', city: '浙江宁波' },
            { id: 4, name: '陕西上药大药房有限公司第三分店', city: '陕西西安' },
            { id: 5, name: '上药控股（陕西）有限公司西安新特药大药房', city: '陕西西安' },
            { id: 6, name: '仁和药房网（北京）医药科技有限公司第四药房', city: '北京' },
            { id: 7, name: '大连德信行润德堂大药房有限公司', city: '辽宁大连' },
            { id: 8, name: '吉林大格测试药房', city: '吉林长春' }
        ]);
        const hospitalSelection = ref([]);
        const hospitalPage = ref(1);
        const hospitalPageSize = ref(10);
        const hospitalTotal = ref(29);

        const handleHospitalSearch = () => { ElementPlus.ElMessage.info('搜索医院: ' + hospitalSearchKeyword.value); };
        const handleHospitalReset = () => { hospitalSearchKeyword.value = ''; };
        const handleHospitalSelectionChange = (val) => { hospitalSelection.value = val; };
        const handleHospitalAdd = () => { ElementPlus.ElMessage.success('点击了新增医院'); };
        const handleHospitalDelete = () => { ElementPlus.ElMessage.warning('删除了 ' + hospitalSelection.value.length + ' 个医院'); };

        // 项目商品弹窗状态
        const productVisible = ref(false);
        const productData = ref([
            { id: 1, name: '拓益', genericName: '特瑞普利单抗注射液', manufacturer: '上海君实生物医药科技股份有限公司' }
        ]);
        const productSelection = ref([]);
        const productPage = ref(1);
        const productPageSize = ref(10);
        const productTotal = ref(3);

        const handleProductSelectionChange = (val) => { productSelection.value = val; };
        const handleProductAdd = () => { ElementPlus.ElMessage.success('点击了新增商品'); };
        const handleProductDelete = () => { ElementPlus.ElMessage.warning('删除了 ' + productSelection.value.length + ' 个商品'); };

        // 问卷模块问题弹窗状态
        const questionnaireQuestionVisible = ref(false);
        const questionData = ref([]);
        
        const QUESTION_MOCK_DB = {
            'CQ': [ // 超期随访问卷
                { id: 101, order: 1, label: '超期原因', type: '单选', question: '您好，请问您近期未按时进行复诊/随访的原因是什么？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-05 09:47:40', updater: '超级管理员', updateTime: '2025-12-05 09:47:40' },
                { id: 102, order: 2, label: '用药现状', type: '单选', question: '您目前是否还在继续按照医嘱服用君实的药品？', isRequired: '是', isTriggerByAnswer: '否', creator: '超级管理员', createTime: '2025-12-05 09:48:10', updater: '超级管理员', updateTime: '2025-12-05 09:48:10' },
                { id: 103, order: 3, label: '不良反应', type: '多选', question: '您近期是否有遇到任何不适或不良反应？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-05 09:49:00', updater: '超级管理员', updateTime: '2025-12-05 09:49:00' }
            ],
            'FG': [ // 复购随访问卷
                { id: 201, order: 1, label: '复购数量', type: '填空', question: '您好，请问您本次计划复购的药品数量或疗程是多少？', isRequired: '是', isTriggerByAnswer: '否', creator: '超级管理员', createTime: '2025-12-06 10:10:00', updater: '超级管理员', updateTime: '2025-12-06 10:10:00' },
                { id: 202, order: 2, label: '疗效评估', type: '单选', question: '在上一周期的用药过程中，您觉得整体疗效如何？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-06 10:11:00', updater: '超级管理员', updateTime: '2025-12-06 10:11:00' },
                { id: 203, order: 3, label: '处方需求', type: '单选', question: '您本次购药是否需要医生为您重新开具或调整处方？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-06 10:12:00', updater: '超级管理员', updateTime: '2025-12-06 10:12:00' }
            ],
            'SC': [ // 首次建档随访问卷
                { id: 301, order: 1, label: '信息确认', type: '单选', question: '请确认您的基本个人信息与诊断信息是否准确无误？', isRequired: '是', isTriggerByAnswer: '否', creator: '超级管理员', createTime: '2025-12-07 14:00:00', updater: '超级管理员', updateTime: '2025-12-07 14:00:00' },
                { id: 302, order: 2, label: '既往病史', type: '多选', question: '您过往是否有其他重大疾病史或药物过敏史（请列举）？', isRequired: '是', isTriggerByAnswer: '否', creator: '超级管理员', createTime: '2025-12-07 14:02:00', updater: '超级管理员', updateTime: '2025-12-07 14:02:00' },
                { id: 303, order: 3, label: '用药指导认知', type: '单选', question: '您对接下来的用药流程、储存条件和注意事项是否已经完全了解？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-07 14:05:00', updater: '超级管理员', updateTime: '2025-12-07 14:05:00' }
            ]
        };

        const questionPage = ref(1);
        const questionPageSize = ref(10);
        const questionTotal = ref(0);

        const handleQuestionAdd = () => { ElementPlus.ElMessage.success('点击了新增问题'); };
        const openQuestionnaireQuestions = (row) => {
            const list = QUESTION_MOCK_DB[row.code] || [];
            questionData.value = list;
            questionTotal.value = list.length;
            questionnaireQuestionVisible.value = true;
        };

        // 项目表单弹窗状态
        const projectFormVisible = ref(false);
        const projectFormData = ref([]);
        const formSelection = ref([]);
        const formPage = ref(1);
        const formPageSize = ref(10);
        const formTotal = ref(0);

        const handleProjectFormSelectionChange = (val) => { formSelection.value = val; };
        const handleProjectFormAdd = () => { ElementPlus.ElMessage.success('点击了新增表单'); };

        // 项目规则列表弹窗状态
        const projectRuleVisible = ref(false);
        const ruleData = ref([
            { id: 1, name: '召回随访', content: '召回随访', status: '启用', creator: '超级管理员', createTime: '2025-11-27 11:39:06', updater: '超级管理员', updateTime: '2025-11-27 13:41:22' },
            { id: 2, name: '复购随访-2', content: '复购随访-2', status: '启用', creator: '超级管理员', createTime: '2025-11-27 11:36:44', updater: '超级管理员', updateTime: '2025-11-27 13:41:12' },
            { id: 3, name: '复购随访-1', content: '复购随访-1', status: '启用', creator: '超级管理员', createTime: '2025-11-27 10:41:48', updater: '超级管理员', updateTime: '2025-11-27 13:41:15' },
            { id: 4, name: '首次随访', content: '首次随访', status: '启用', creator: '超级管理员', createTime: '2025-11-27 10:34:30', updater: '超级管理员', updateTime: '2025-11-27 13:41:19' }
        ]);
        const ruleSelection = ref([]);
        const rulePage = ref(1);
        const rulePageSize = ref(10);
        const ruleTotal = ref(4);

        const handleRuleSelectionChange = (val) => { ruleSelection.value = val; };
        const handleRuleDelete = () => { ElementPlus.ElMessage.warning('删除了 ' + ruleSelection.value.length + ' 条规则'); };
        const handleSingleRuleDelete = (row) => { ElementPlus.ElMessage.warning('删除了规则: ' + row.name); };

        // 新增项目规则表单状态
        const addRuleVisible = ref(false);
        const addRuleFormRef = ref(null);
        const addRuleForm = ref({
            name: '',
            content: '',
            taskType: '',
            product: '',
            indication: '',
            tags: '',
            executeDays: ''
        });
        const addRuleRules = {
            name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
            content: [{ required: true, message: '请输入随访内容', trigger: 'blur' }],
            taskType: [{ required: true, message: '请选择任务生成类型', trigger: 'change' }],
            product: [{ required: true, message: '请选择项目商品', trigger: 'change' }],
            executeDays: [{ required: true, message: '请输入执行天数', trigger: 'blur' }]
        };

        const handleAddRuleOpen = () => {
            if (addRuleFormRef.value) addRuleFormRef.value.resetFields();
            addRuleForm.value = { name: '', content: '', taskType: '', product: '', indication: '', tags: '', executeDays: '' };
            addRuleVisible.value = true;
        };

        const handleAddRuleSubmit = () => {
            addRuleFormRef.value.validate((valid) => {
                if (valid) {
                    const newRule = {
                        id: Date.now(),
                        name: addRuleForm.value.name,
                        content: addRuleForm.value.content,
                        status: '启用',
                        creator: '超级管理员',
                        createTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
                        updater: '超级管理员',
                        updateTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
                    };
                    ruleData.value.unshift(newRule);
                    ruleTotal.value = ruleData.value.length;
                    ElementPlus.ElMessage.success('新增项目规则成功');
                    addRuleVisible.value = false;
                }
            });
        };

        // 操作逻辑
        const handleAction = (type, row) => {
            if (type === '编辑') {
                openEditModal(row);
            } else if (type === '医院') {
                hospitalVisible.value = true;
            } else if (type === '商品') {
                productVisible.value = true;
            } else if (type === '表单') {
                // 加载问卷模块的数据作为表单数据
                const qData = MOCK_DATA['questionnaire'].data || [];
                // 映射数据结构
                projectFormData.value = qData.map(item => ({
                    id: item.id,
                    name: item.code, // 使用模块编号字段
                    status: item.status,
                    remark: item.content || '',
                    creator: item.creator
                }));
                formTotal.value = projectFormData.value.length;
                projectFormVisible.value = true;
            } else if (type === '规则') {
                projectRuleVisible.value = true;
            } else if (type === '失效' || type === '停用') {
                ElementPlus.ElMessageBox.confirm(`确定要停用项目【${row.name}】吗？`, '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    row.status = '停用';
                    ElementPlus.ElMessage.success('操作成功');
                });
            } else {
                ElementPlus.ElMessage.info(`正在进行【${type}】操作: ${row.name || row.id}`);
            }
        };

        const editVisible = ref(false);
        const editTitle = ref('新增');
        const editForm = ref({});
        const editFormRef = ref(null);
        const currentColumns = computed(() => (MOCK_DATA[activePath.value] || {}).columns || []);

        const articleVisible = ref(false);
        const articleTitle = ref('新增文章');
        const articleForm = reactive({ title: '', category: '', author: '', content: '', status: '草稿' });
        const currentCategories = computed(() => ARTICLE_CATEGORIES[activePath.value] || []);

        // 弹窗操作方法
        const openAddModal = (id) => {
            editTitle.value = '新增';
            editForm.value = { status: '启用', creator: '超级管理员', date: new Date().toISOString().split('T')[0] };
            // 为项目随访初始化特定字段
            if (id === 'project-followup') {
                editForm.value.name = '';
                editForm.value.remark = '';
            } else {
                currentColumns.value.forEach(col => editForm.value[col.key] = '');
            }
            editVisible.value = true;
        };

        const openEditModal = (row) => {
            editTitle.value = '编辑';
            editForm.value = { ...row };
            editVisible.value = true;
        };

        const openArticleModal = () => {
            articleTitle.value = '新增文章';
            Object.assign(articleForm, { title: '', category: currentCategories.value[0], author: '管理员', content: '', status: '草稿' });
            articleVisible.value = true;
        };
        window.openArticleModal = openArticleModal;

        const handleSave = () => {
            if (!editFormRef.value) {
                saveData();
                return;
            }
            editFormRef.value.validate((valid) => {
                if (valid) {
                    saveData();
                } else {
                    ElementPlus.ElMessage.error('请完善必填信息');
                }
            });
        };

        const saveData = () => {
            const data = MOCK_DATA[activePath.value].data;
            if (editTitle.value === '新增') {
                data.unshift({ ...editForm.value, id: Date.now() });
                ElementPlus.ElMessage.success('新增成功');
            } else {
                const index = data.findIndex(item => item.id === editForm.value.id);
                if (index > -1) data[index] = { ...editForm.value };
                ElementPlus.ElMessage.success('保存成功');
            }
            editVisible.value = false;
            renderCurrentPage();
        };

        const handleArticleSave = () => {
            const data = ARTICLE_DATA[activePath.value];
            data.unshift({ ...articleForm, id: Date.now(), views: 0, publishDate: new Date().toISOString().split('T')[0] });
            articleVisible.value = false;
            ElementPlus.ElMessage.success('文章发布成功');
            renderCurrentPage();
        };

        // 页面渲染分发逻辑
        const renderCurrentPage = () => {
            loading.value = true;
            setTimeout(() => {
                // 如果是通用页面，更新 tableData
                if (isCommonPage.value) {
                    tableData.value = MOCK_DATA[activePath.value].data;
                }
                
                const container = document.getElementById('content-container');
                if (!container) {
                    loading.value = false;
                    return;
                }
                
                if (activePath.value.startsWith('article-')) {
                    renderArticlePageVue(container, activePath.value);
                } else if (isBaseDataPage.value) {
                    // 基础数据页面通过 Vue 模板渲染，不再使用 innerHTML
                    container.innerHTML = '';
                } else {
                    container.innerHTML = '';
                }
                loading.value = false;
            }, 300);
        };

        onMounted(() => {
            const hash = window.location.hash.slice(1) || 'home';
            handleMenuSelect(hash);
        });

        return {
            menuConfig, activePath, openTags, loading,
            currentTitle, handleMenuSelect, handleTabClick, handleTabRemove, getGroupIcon, handleUserCommand,
            editVisible, editTitle, editForm, currentColumns, editFormRef,
            articleVisible, articleTitle, articleForm, currentCategories,
            hospitalVisible, hospitalSearchKeyword, hospitalData, hospitalSelection, hospitalPage, hospitalPageSize, hospitalTotal,
            handleHospitalSearch, handleHospitalReset, handleHospitalSelectionChange, handleHospitalAdd, handleHospitalDelete,
            productVisible, productData, productSelection, productPage, productPageSize, productTotal,
            handleProductSelectionChange, handleProductAdd, handleProductDelete,
            questionnaireQuestionVisible, questionData, questionPage, questionPageSize, questionTotal,
            handleQuestionAdd, openQuestionnaireQuestions,
            projectFormVisible, projectFormData, formSelection, formPage, formPageSize, formTotal,
            handleProjectFormSelectionChange, handleProjectFormAdd,
            projectRuleVisible, ruleData, ruleSelection, rulePage, rulePageSize, ruleTotal,
            handleRuleSelectionChange, handleRuleDelete, handleSingleRuleDelete,
            addRuleVisible, addRuleForm, addRuleFormRef, addRuleRules, handleAddRuleOpen, handleAddRuleSubmit,
            handleSave, handleArticleSave, openAddModal, openEditModal, openArticleModal,
            taskStats, tableData, searchKeyword, handleAction,
            isCommonPage, isArticlePage, isBaseDataPage,
            dictGroups, activeDictGroup, dictItems
        };
    }
});

// --- 占位渲染函数 (Phase 4-6 将这些重构为真正的 Vue 逻辑) ---

function renderHomePageVue(container) {
    const taskStats = [
        { label: '今日任务', value: 0, icon: 'fa-clipboard-list', color: '#409EFF', bg: 'rgba(64,158,255,0.1)' },
        { label: '本月待执行任务', value: 1, icon: 'fa-hourglass-half', color: '#E6A23C', bg: 'rgba(230,162,60,0.1)' },
        { label: '本月即将到期任务', value: 0, icon: 'fa-calendar-days', color: '#F56C6C', bg: 'rgba(245,108,108,0.1)' },
        { label: '本月已超期任务', value: 0, icon: 'fa-triangle-exclamation', color: '#F56C6C', bg: 'rgba(245,108,108,0.1)' },
        { label: '今日已完成任务', value: 0, icon: 'fa-circle-check', color: '#67C23A', bg: 'rgba(103,194,58,0.1)' }
    ];

    const followStats = [
        { label: '随访率(人)', value: '100%', icon: 'fa-user', color: '#409EFF', bg: 'rgba(64,158,255,0.1)' },
        { label: '随访率(任务)', value: '50%', icon: 'fa-chart-simple', color: '#67C23A', bg: 'rgba(103,194,58,0.1)' },
        { label: '有效随访率(人)', value: '100%', icon: 'fa-users', color: '#409EFF', bg: 'rgba(64,158,255,0.1)' },
        { label: '有效随访率(任务)', value: '100%', icon: 'fa-chart-line', color: '#67C23A', bg: 'rgba(103,194,58,0.1)' }
    ];

    const renderCard = (item) => `
        <div class="el-col el-col-4-8" style="flex: 0 0 20%; max-width: 20%; padding: 10px;">
            <div class="el-card is-hover-shadow home-card" style="border:none; border-radius: 8px;">
                <div class="el-card__body" style="padding: 15px;">
                    <div style="font-size: 13px; color: #909399; margin-bottom: 10px;">${item.label}</div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 24px; font-weight: bold; color: ${item.color}">${item.value}</span>
                        <div style="width: 40px; height: 40px; border-radius: 8px; background: ${item.bg}; color: ${item.color}; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                            <i class="fa-solid ${item.icon}"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = `
        <div class="home-container">
            <div class="section-title" style="font-size: 16px; font-weight: 600; margin-bottom: 20px; display: flex; align-items: center;">
                <span style="width: 4px; height: 16px; background: #409EFF; border-radius: 2px; margin-right: 10px;"></span>
                任务概览
            </div>
            <div class="el-row" style="margin: -10px; display: flex; flex-wrap: wrap;">
                ${taskStats.map(renderCard).join('')}
            </div>

            <div class="section-title" style="font-size: 16px; font-weight: 600; margin-top: 40px; margin-bottom: 20px; display: flex; align-items: center;">
                <span style="width: 4px; height: 16px; background: #409EFF; border-radius: 2px; margin-right: 10px;"></span>
                随访分析（本月）
            </div>
            <div class="el-row" style="margin: -10px; display: flex; flex-wrap: wrap;">
                ${followStats.map(item => renderCard({...item, span: 6})).join('')}
            </div>
        </div>
    `;
}

function renderCommonTableVue(container, id) {
    const pageData = MOCK_DATA[id];
    if (!pageData) return;

    const renderHeader = () => `
        <div class="table-toolbar" style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
            <div class="search-bar" style="display: flex; gap: 10px;">
                <input class="el-input__inner" placeholder="关键词搜索" style="width: 200px; height: 32px; font-size: 13px; border: 1px solid #dcdfe6; border-radius: 4px; padding: 0 15px;">
                <button class="el-button el-button--primary el-button--small" style="height: 32px;">搜索</button>
            </div>
            <div class="action-buttons">
                <button class="el-button el-button--primary el-button--small" onclick="openAddModal('${id}')">+ 新增</button>
                <button class="el-button el-button--default el-button--small" style="margin-left: 10px;">导出</button>
            </div>
        </div>
    `;

    const renderTable = () => `
        <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table--striped">
            <div class="el-table__header-wrapper">
                <table class="el-table__header" style="width: 100%;">
                    <thead>
                        <tr>
                            ${pageData.columns.map(col => `<th class="el-table__cell is-leaf"><div class="cell">${col.label}</div></th>`).join('')}
                            <th class="el-table__cell is-leaf"><div class="cell">操作</div></th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="el-table__body-wrapper">
                <table class="el-table__body" style="width: 100%;">
                    <tbody>
                        ${pageData.data.map(row => `
                            <tr class="el-table__row">
                                ${pageData.columns.map(col => `<td class="el-table__cell"><div class="cell">${row[col.key] || '-'}</div></td>`).join('')}
                                <td class="el-table__cell">
                                    <div class="cell">
                                        <button class="el-button el-button--text el-button--small" style="color: #409eff; padding: 0;">编辑</button>
                                        <button class="el-button el-button--text el-button--small" style="color: #f56c6c; padding: 0; margin-left: 10px;">删除</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="pagination-container" style="margin-top: 20px; display: flex; justify-content: flex-end;">
            <div class="el-pagination is-background">
                <button type="button" class="btn-prev" disabled><i class="fa-solid fa-chevron-left"></i></button>
                <ul class="el-pager">
                    <li class="number active">1</li>
                </ul>
                <button type="button" class="btn-next" disabled><i class="fa-solid fa-chevron-right"></i></button>
            </div>
        </div>
    `;

    container.innerHTML = `
        <div class="table-container">
            ${renderHeader()}
            ${renderTable()}
        </div>
    `;
}

function renderArticlePageVue(container, id) {
    const articles = ARTICLE_DATA[id] || [];
    const categories = ['全部', ...(ARTICLE_CATEGORIES[id] || [])];
    
    const renderTabs = () => `
        <div class="el-tabs el-tabs--top" style="margin-bottom: 20px;">
            <div class="el-tabs__header is-top">
                <div class="el-tabs__nav-wrap is-top">
                    <div class="el-tabs__nav-scroll">
                        <div class="el-tabs__nav" style="transform: translateX(0px);">
                            ${categories.map((cat, i) => `
                                <div class="el-tabs__item is-top ${i === 0 ? 'is-active' : ''}" style="font-size: 14px;">${cat}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const renderToolbar = () => `
        <div class="toolbar" style="margin-bottom: 15px;">
            <button class="el-button el-button--primary el-button--small" onclick="openArticleModal()">+ 新增文章</button>
        </div>
    `;

    const renderTable = () => `
        <div class="el-table el-table--fit el-table--border el-table--striped">
            <div class="el-table__header-wrapper">
                <table class="el-table__header" style="width: 100%;">
                    <thead>
                        <tr>
                            <th class="el-table__cell is-leaf"><div class="cell">文章标题</div></th>
                            <th class="el-table__cell is-leaf"><div class="cell">分类</div></th>
                            <th class="el-table__cell is-leaf"><div class="cell">状态</div></th>
                            <th class="el-table__cell is-leaf"><div class="cell">发布时间</div></th>
                            <th class="el-table__cell is-leaf"><div class="cell">阅读量</div></th>
                            <th class="el-table__cell is-leaf"><div class="cell">操作</div></th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="el-table__body-wrapper">
                <table class="el-table__body" style="width: 100%;">
                    <tbody>
                        ${articles.map(art => `
                            <tr class="el-table__row">
                                <td class="el-table__cell"><div class="cell">${art.title}</div></td>
                                <td class="el-table__cell"><div class="cell">${art.category}</div></td>
                                <td class="el-table__cell">
                                    <div class="cell">
                                        <span class="el-tag el-tag--${art.status === '已发布' ? 'success' : 'info'} el-tag--mini is-light">${art.status}</span>
                                    </div>
                                </td>
                                <td class="el-table__cell"><div class="cell">${art.publishDate || '-'}</div></td>
                                <td class="el-table__cell"><div class="cell">${art.views || 0}</div></td>
                                <td class="el-table__cell">
                                    <div class="cell">
                                        <button class="el-button el-button--text el-button--small" style="color: #409eff; padding: 0;">预览</button>
                                        <button class="el-button el-button--text el-button--small" style="color: #409eff; padding: 0; margin-left: 10px;">编辑</button>
                                        <button class="el-button el-button--text el-button--small" style="color: #f56c6c; padding: 0; margin-left: 10px;">删除</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    container.innerHTML = `
        <div class="article-page">
            ${renderTabs()}
            ${renderToolbar()}
            ${renderTable()}
        </div>
    `;
}

app.use(ElementPlus);
app.mount('#app');
