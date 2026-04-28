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
            return MOCK_DATA[activePath.value] && activePath.value !== 'base-data' && activePath.value !== 'message-manage';
        });

        const isArticlePage = computed(() => {
            return activePath.value.startsWith('article-');
        });

        const isBaseDataPage = computed(() => {
            return activePath.value === 'base-data';
        });

        const isExecutePage = computed(() => {
            return activePath.value.startsWith('execute-task-');
        });

        const isPatientDetailPage = computed(() => {
            return activePath.value.startsWith('patient-detail-');
        });

        // 患者详情页面数据
        const patientDetailData = ref({});
        const openPatientDetail = (row) => {
            const searchName = row.name || row.patientName;
            const searchId = row.patientId;
            const patientList = MOCK_DATA['patient-list']?.data || [];
            
            // 严谨查找：优先匹配 patientId (UUID)，如果没有则匹配姓名
            const fullInfo = patientList.find(p => p.patientId === searchId) || 
                             patientList.find(p => p.name === searchName) || 
                             row;
            
            patientDetailData.value = { 
                ...fullInfo,
                name: fullInfo.name || searchName,
                // 确保随访任务中的特定字段也能带过去（如果是回退到 row）
                patientId: fullInfo.patientId || searchId 
            };
            const tabId = 'patient-detail-' + (fullInfo.patientId || Date.now());
            navigate(tabId, patientDetailData.value.name + ' 详情信息');
        };




        // 执行随访页面状态
        const executeTaskData = ref({});
        const executeActiveTab = ref('history');
        const executePersonalExpanded = ref(false);
        const executeFormSections = ref([
            { id: 'tips', title: '随访重点提示', isParent: true },
            { id: 'basic', title: '随访基本情况', isParent: true },
            { id: 'contact', title: '实际联系方式', isChild: true },
            { id: 'phone', title: '联系电话', isChild: true },
            { id: 'success', title: '是否联系成功', isChild: true },
            { id: 'indication', title: '项目适应症', isChild: true },
            { id: 'questionnaire', title: '君实随访问答', isParent: true },
            { id: 'medicine', title: '用药方式', isChild: true },
            { id: 'summary', title: '随访小结', isChild: true },
            { id: 'care', title: '患者关怀随访', isParent: true },
            { id: 'doctor', title: '患者关于主治医师...', isParent: true },
            { id: 'issues', title: '关于以上相关问题...', isParent: true },
            { id: 'user', title: '用户反馈', isParent: true }
        ]);
        const executeActiveSection = ref('tips');
        const executeProgress = ref(8);

        const scrollToSection = (sectionId) => {
            executeActiveSection.value = sectionId;
            const el = document.getElementById('section-' + sectionId);
            const container = document.getElementById('execute-form-scroll');
            if (el && container) {
                container.scrollTo({ top: el.offsetTop - container.offsetTop, behavior: 'smooth' });
            }
        };

        const handleFormScroll = (e) => {
            const container = e.target;
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight - container.clientHeight;
            executeProgress.value = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
            // 找到当前可见的 section
            const sections = executeFormSections.value;
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById('section-' + sections[i].id);
                if (el && el.offsetTop - container.offsetTop <= scrollTop + 100) {
                    executeActiveSection.value = sections[i].id;
                    break;
                }
            }
        };

        const handleExecuteTask = (row) => {
            executeTaskData.value = { ...row };
            executeActiveTab.value = 'history';
            executePersonalExpanded.value = false;
            executeProgress.value = 8;
            executeActiveSection.value = 'tips';
            const tabId = 'execute-task-' + row.id;
            navigate(tabId, '执行随访');
        };

        const handleExecuteConfirm = () => {
            ElementPlus.ElMessageBox.confirm(
                '智能识别当前患者存在异常事件：减量服药，是否上报主治医生？',
                '智能识别提示',
                {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning',
                    distinguishCancelAndClose: true
                }
            ).then(() => {
                // 选择“是”
                ElementPlus.ElMessage({
                    type: 'success',
                    message: '上报完成并已记录',
                });
                handleTabRemove(activePath.value);
                handleMenuSelect('followup-task');
            }).catch((action) => {
                if (action === 'cancel') {
                    // 选择“否”
                    ElementPlus.ElMessageBox.prompt('请填写不上报原因', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /.+/,
                        inputErrorMessage: '原因不能为空'
                    }).then(({ value }) => {
                        ElementPlus.ElMessage({
                            type: 'info',
                            message: '已记录不上报原因：' + value,
                        });
                        handleTabRemove(activePath.value);
                        handleMenuSelect('followup-task');
                    });
                }
            });
        };

        // 字典数据
        const dictGroups = ref([
            { name: '适应性子项', code: 'adaptability' },
            { name: '身体状况', code: 'health' },
            { name: '任务逾期原因', code: 'overdue' },
            { name: '渠道类型', code: 'channel' },
            { name: '性格', code: 'character' },
            { name: '商保类型', code: 'commercialInsuranceType' },
            { name: '依从性子项', code: 'compliance' },
            { name: '家庭条件', code: 'condition' }
        ]);
        const activeDictGroup = ref('适应性子项');
        
        const ALL_DICT_ITEMS = [
            { name: '适应性子项', code: 'adaptability', item: '不该进行单药治疗的实用性...', status: '启用' },
            { name: '适应性子项', code: 'adaptability', item: '更适合进行非药物治疗的疾...', status: '启用' },
            { name: '适应性子项', code: 'adaptability', item: '用一种药物治疗其他药物引...', status: '启用' },
            { name: '适应性子项', code: 'adaptability', item: '需要启动药物治疗的实际情况', status: '启用' },
            { name: '适应性子项', code: 'adaptability', item: '需要进行预防用药来降低新...', status: '启用' },
            { name: '身体状况', code: 'health', item: '身体健康', status: '启用' },
            { name: '身体状况', code: 'health', item: '患有高血压', status: '启用' },
            { name: '身体状况', code: 'health', item: '患有糖尿病', status: '启用' },
            { name: '任务逾期原因', code: 'overdue', item: '患者出差', status: '启用' },
            { name: '任务逾期原因', code: 'overdue', item: '患者住院', status: '启用' },
            { name: '渠道类型', code: 'channel', item: '线下药房', status: '启用' },
            { name: '渠道类型', code: 'channel', item: '电商平台', status: '启用' },
            { name: '性格', code: 'character', item: '外向', status: '启用' },
            { name: '性格', code: 'character', item: '内向', status: '启用' },
            { name: '商保类型', code: 'commercialInsuranceType', item: '职工商保', status: '启用' },
            { name: '商保类型', code: 'commercialInsuranceType', item: '商业商保', status: '启用' },
            { name: '依从性子项', code: 'compliance', item: '患者没有充分理解用药指导', status: '启用' },
            { name: '依从性子项', code: 'compliance', item: '患者更倾向于不使用药物', status: '启用' },
            { name: '依从性子项', code: 'compliance', item: '患者忘记服药', status: '启用' },
            { name: '依从性子项', code: 'compliance', item: '药物对患者来说太贵', status: '启用' },
            { name: '依从性子项', code: 'compliance', item: '患者不能自己正确吞咽或者...', status: '启用' },
            { name: '依从性子项', code: 'compliance', item: '患者买不到药物', status: '启用' },
            { name: '家庭条件', code: 'condition', item: '家庭富裕', status: '启用' },
            { name: '家庭条件', code: 'condition', item: '家庭一般', status: '启用' },
            { name: '家庭条件', code: 'condition', item: '家庭困难', status: '启用' }
        ];


        const dictItems = computed(() => {
            return ALL_DICT_ITEMS.filter(item => item.name === activeDictGroup.value);
        });


        // 导航处理
        const handleMenuSelect = (index) => {
            let title = '';
            if (index === 'home') {
                title = '首页';
            } else {
                // 优先查找二级菜单
                menuConfig.value.forEach(g => {
                    if (g.children && g.children.length > 0) {
                        g.children.forEach(c => {
                            if (c.id === index) title = c.title;
                        });
                    }
                });
                // 如果没找到，则查找一级菜单 (针对新拆分的患教/培训管理)
                if (!title) {
                    const group = menuConfig.value.find(g => g.id === index);
                    if (group) title = group.title;
                }
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
                'article': 'fa-file-lines',
                'article-patient': 'fa-book-open-reader',
                'article-specialist': 'fa-chalkboard-user',
                'followup-task': 'fa-calendar-check',
                'patient-list': 'fa-hospital-user',
                'patient': 'fa-hospital-user',
                'followup': 'fa-calendar-check'
            };
            return icons[id] || 'fa-folder';
        };

        const handleUserCommand = (command) => {
            if (command === 'logout') window.location.href = 'index.html';
        };

        // 数据状态
        const taskStats = ref([
            { label: '总入组目标', value: 1150, icon: 'fa-clipboard-list', color: '#409EFF', bg: 'linear-gradient(135deg, #e0f2ff 0%, #ffffff 100%)', shadow: '0 4px 12px rgba(64,158,255,0.15)' },
            { label: '已入组人数', value: 350, icon: 'fa-hourglass-half', color: '#E6A23C', bg: 'linear-gradient(135deg, #fff7e6 0%, #ffffff 100%)', shadow: '0 4px 12px rgba(230,162,60,0.15)' },
            { label: '即将到期', value: 5, icon: 'fa-calendar-days', color: '#F56C6C', bg: 'linear-gradient(135deg, #fff1f0 0%, #ffffff 100%)', shadow: '0 4px 12px rgba(245,108,108,0.15)' },
            { label: '本月已超期', value: 2, icon: 'fa-triangle-exclamation', color: '#F56C6C', bg: 'linear-gradient(135deg, #fff1f0 0%, #ffffff 100%)', shadow: '0 4px 12px rgba(245,108,108,0.15)' },
            { label: '今日已完成', value: 8, icon: 'fa-circle-check', color: '#67C23A', bg: 'linear-gradient(135deg, #f6ffed 0%, #ffffff 100%)', shadow: '0 4px 12px rgba(103,194,58,0.15)' }
        ]);

        const analysisStats = ref([
            { label: '随访率(人)', value: '98.5%', change: '+2.1%', icon: 'fa-user-check', color: '#409EFF' },
            { label: '随访率(任务)', value: '86.2%', change: '+1.5%', icon: 'fa-chart-pie', color: '#67C23A' },
            { label: '有效随访率', value: '92.4%', change: '-0.8%', icon: 'fa-bullseye', color: '#E6A23C' },
            { label: '用药规范率', value: '94.0%', change: '+3.2%', icon: 'fa-capsules', color: '#F56C6C' }
        ]);

        const recentTasks = computed(() => {
            return (MOCK_DATA['followup-task'].data || []).slice(0, 5);
        });

        const quickActions = [
            { title: '新增任务', icon: 'fa-plus', color: '#409EFF', path: 'followup-task' },
            { title: '患者建档', icon: 'fa-id-card', color: '#67C23A', path: 'patient-list' },
            { title: '统计报表', icon: 'fa-chart-line', color: '#E6A23C', path: 'followup-rate' },
            { title: '知识库', icon: 'fa-book-medical', color: '#909399', path: 'article-patient' }
        ];

        const systemNotices = ref([
            { title: '系统维护公告', time: '10分钟前', type: 'info' },
            { title: '有2条随访任务即将逾期', time: '1小时前', type: 'warning' },
            { title: '成功导出3月销售分析报表', time: '3小时前', type: 'success' }
        ]);

        // 首页趋势图联动逻辑
        const homeTimeRange = ref('week');
        const homeTrendDataMap = {
            'week': [
                { label: '周一', value: 40 },
                { label: '周二', value: 65 },
                { label: '周三', value: 55 },
                { label: '周四', value: 85 },
                { label: '周五', value: 70 },
                { label: '周六', value: 95 },
                { label: '周日', value: 80 }
            ],
            'month': [
                { label: '1-5日', value: 120 },
                { label: '6-10日', value: 240 },
                { label: '11-15日', value: 180 },
                { label: '16-20日', value: 310 },
                { label: '21-25日', value: 260 },
                { label: '26-31日', value: 350 }
            ]
        };

        const currentTrendData = computed(() => {
            return homeTrendDataMap[homeTimeRange.value];
        });



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
            } else if (type === '执行') {
                handleExecuteTask(row);
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
        const articleTitle = ref('新增');
        const articleForm = reactive({ id: null, title: '', category: '', author: '', content: '', status: '草稿' });
        const currentCategories = computed(() => ARTICLE_CATEGORIES[activePath.value] || []);
        
        const articlePreviewVisible = ref(false);
        const previewArticleData = ref({});

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
            articleTitle.value = '新增';
            Object.assign(articleForm, { id: null, title: '', category: currentCategories.value[0], author: '管理员', content: '', status: '草稿' });
            articleVisible.value = true;
        };
        window.openArticleModal = openArticleModal;

        const handleArticleAction = (type, id) => {
            const articles = ARTICLE_DATA[activePath.value] || [];
            const article = articles.find(a => String(a.id) === String(id));
            if (!article) return;

            if (type === '预览') {
                previewArticleData.value = { ...article };
                articlePreviewVisible.value = true;
            } else if (type === '编辑') {
                articleTitle.value = '编辑文章';
                Object.assign(articleForm, article);
                articleVisible.value = true;
            } else if (type === '删除') {
                ElementPlus.ElMessageBox.confirm(`确定要删除文章【${article.title}】吗？`, '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const index = articles.findIndex(a => String(a.id) === String(id));
                    if (index > -1) articles.splice(index, 1);
                    ElementPlus.ElMessage.success('删除成功');
                    renderCurrentPage();
                });
            }
        };
        window.handleArticleAction = handleArticleAction;

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

        const handleArticleSave = (status) => {
            const data = ARTICLE_DATA[activePath.value];
            if (articleForm.id) {
                const index = data.findIndex(a => a.id === articleForm.id);
                if (index > -1) {
                    data[index] = { ...articleForm, status };
                }
            } else {
                data.unshift({ ...articleForm, id: Date.now(), views: 0, publishDate: new Date().toISOString().split('T')[0], status });
            }
            articleVisible.value = false;
            ElementPlus.ElMessage.success(status === '已发布' ? '文章发布成功' : '草稿保存成功');
            renderCurrentPage();
        };

        // 留言管理逻辑
        const messageSearchKeyword = ref('');
        const activeMessage = ref(null);
        const replyContent = ref('');
        const chatScrollRef = ref(null);
        const isChatMode = ref(false); // 是否处于聊天模式
        const scriptDrawerVisible = ref(false); // 话术库侧边栏
        const scriptSearchKeyword = ref('');

        const scriptList = computed(() => {
            const list = MOCK_DATA['scripts']?.data || [];
            if (!scriptSearchKeyword.value) return list;
            return list.filter(s => s.title.includes(scriptSearchKeyword.value) || s.content.includes(scriptSearchKeyword.value));
        });

        const useScript = (script) => {
            // 简单处理下 HTML 标签（如果有的话）
            let text = script.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
            
            // 提取“建议话术”中的实际回复内容
            const match = text.match(/建议话术：[“"'](.*?)['"”]/);
            if (match && match[1]) {
                text = match[1];
            } else if (text.includes('建议话术：')) {
                text = text.split('建议话术：')[1].trim();
            }

            replyContent.value = text;
            scriptDrawerVisible.value = false;
        };

        const filteredMessages = computed(() => {
            const list = MOCK_DATA['message-manage']?.data || [];
            if (!messageSearchKeyword.value) return list;
            return list.filter(m => m.patientName.includes(messageSearchKeyword.value));
        });

        const selectMessage = (msg) => {
            activeMessage.value = msg;
            replyContent.value = '';
            isChatMode.value = true; // 进入聊天模式
            // 延迟滚动到底部
            setTimeout(() => {
                if (chatScrollRef.value) {
                    chatScrollRef.value.setScrollTop(10000);
                }
            }, 100);
        };

        const handleReplyMessage = () => {
            if (!replyContent.value.trim() || !activeMessage.value) return;
            
            const newReply = {
                role: 'helper',
                content: replyContent.value,
                time: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-')
            };
            
            activeMessage.value.history.push(newReply);
            activeMessage.value.lastMsg = replyContent.value;
            activeMessage.value.status = '已回复';
            replyContent.value = '';

            setTimeout(() => {
                if (chatScrollRef.value) {
                    chatScrollRef.value.setScrollTop(10000);
                }
            }, 50);

            ElementPlus.ElMessage.success('回复已发送');
        };

        // 页面渲染分发逻辑
        const renderCurrentPage = () => {
            loading.value = true;
            setTimeout(() => {
                // 如果是通用页面，更新 tableData
                if (isCommonPage.value) {
                    tableData.value = MOCK_DATA[activePath.value].data;
                }
                
                // 仅 article 页面需要手动渲染到 content-container
                const container = document.getElementById('content-container');
                if (container && activePath.value.startsWith('article-')) {
                    renderArticlePageVue(container, activePath.value);
                }
                
                loading.value = false;
            }, 100);
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
            articlePreviewVisible, previewArticleData, handleArticleAction,
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
            taskStats, analysisStats, recentTasks, quickActions, systemNotices,
            homeTimeRange, currentTrendData,
            tableData, searchKeyword, handleAction,

            isCommonPage, isArticlePage, isBaseDataPage, isExecutePage, isPatientDetailPage,
            patientDetailData, openPatientDetail,
            executeTaskData, executeActiveTab, executePersonalExpanded,
            executeFormSections, executeActiveSection, executeProgress,
            scrollToSection, handleExecuteTask, handleFormScroll,
            handleExecuteConfirm,
            dictGroups, activeDictGroup, dictItems,
            messageSearchKeyword, activeMessage, replyContent, chatScrollRef, filteredMessages, selectMessage, handleReplyMessage, isChatMode,
            scriptDrawerVisible, scriptSearchKeyword, scriptList, useScript
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
            <button class="el-button el-button--primary el-button--small" onclick="openArticleModal()">+ 新增</button>
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
                                        <button class="el-button el-button--text el-button--small" style="color: #409eff; padding: 0;" onclick="handleArticleAction('预览', '${art.id}')">预览</button>
                                        <button class="el-button el-button--text el-button--small" style="color: #409eff; padding: 0; margin-left: 10px;" onclick="handleArticleAction('编辑', '${art.id}')">编辑</button>
                                        <button class="el-button el-button--text el-button--small" style="color: #f56c6c; padding: 0; margin-left: 10px;" onclick="handleArticleAction('删除', '${art.id}')">删除</button>
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
