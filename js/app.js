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
            return MOCK_DATA[activePath.value] && !['base-data', 'message-manage', 'consent-version', 'exception-manage', 'form-designer', 'kpi-report'].includes(activePath.value);
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

        const isConsentVersionPage = computed(() => activePath.value === 'consent-version');

        const consentViewVisible = ref(false);
        const consentViewData = ref({});
        const consentVersionData = ref([]);
        const consentSearchKeyword = ref('');

        // 患者详情页面数据
        const patientDetailData = ref({});

        // 风险状态修改状态
        const riskVisible = ref(false);
        const riskFormRef = ref(null);
        const riskForm = reactive({
            name: '',
            oldRisk: '',
            oldRiskLabel: '',
            oldRiskType: '',
            newRisk: '',
            reason: '',
            targetRow: null
        });

        // 投诉回复状态
        const complaintVisible = ref(false);
        const complaintFormRef = ref(null);
        const complaintForm = reactive({
            patient: '',
            content: '',
            reply: '',
            targetRow: null
        });

        const riskMap = {
            'green': { label: '正常', type: 'success' },
            'yellow': { label: '中风险', type: 'warning' },
            'red': { label: '高风险', type: 'danger' }
        };

        const openRiskDialog = (row) => {
            const riskInfo = riskMap[row.riskLevel] || { label: '未知', type: 'info' };
            Object.assign(riskForm, {
                name: row.name,
                oldRisk: row.riskLevel,
                oldRiskLabel: riskInfo.label,
                oldRiskType: riskInfo.type,
                newRisk: '',
                reason: '',
                targetRow: row
            });
            riskVisible.value = true;
            if (riskFormRef.value) riskFormRef.value.resetFields();
        };

        const handleRiskSave = () => {
            riskFormRef.value.validate((valid) => {
                if (valid) {
                    riskForm.targetRow.riskLevel = riskForm.newRisk;
                    ElementPlus.ElMessage.success(`已成功将患者【${riskForm.name}】的状态修改为 ${riskMap[riskForm.newRisk].label}`);
                    riskVisible.value = false;
                }
            });
        };
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




        // 执行随访页面状态（PSP V0.4 问卷引擎）
        const executeTaskData = ref({});
        const executeActiveTab = ref('contact');
        const executePersonalExpanded = ref(false);
        const executeAnswers = reactive({});
        const executeFormSections = ref([]);
        const executeActiveSection = ref('mod-1');
        const executeProgress = ref(5);
        const safetyConfirmed = ref(false);
        const summaryText = ref('');
        const summaryDirty = ref(false);
        const escalationChoice = ref([]);
        const escalationNote = ref('');
        const executeContacts = ref([]);
        const newContact = reactive({ channel: '电话', result: '已接通' });

        // 9 类任务 → 固定带出模块（8/9 为条件触发模块）
        const EXEC_MODULE_MAP = {
            '项目说明与授权': [1, 2, 7, 8, 9, 13],
            '首触达建档': [1, 3, 7, 8, 9, 13],
            '周期治疗/复诊随访': [1, 4, 5, 6, 7, 8, 9, 12, 13],
            '超期未治疗/未复诊召回': [1, 5, 6, 7, 8, 9, 13],
            '退出/拒访管理': [1, 11, 7, 8, 9, 13],
            '异常症状/AE即时随访': [1, 7, 8, 9, 13],
            '特殊情形/质量投诉处理': [1, 7, 9, 8, 10, 13],
            'PV/事件补充随访': [1, 10, 8, 9, 13],
            '复诊记录提交': [14]
        };
        // 事件类任务强制展示的条件模块
        const FORCED_COND_MODULES = {
            '异常症状/AE即时随访': [8],
            '特殊情形/质量投诉处理': [9]
        };
        const AE_LINE_OPTS = ['身体不适/症状', '检查异常', '门诊/急诊/住院'];
        const SP_MAP = { '妊娠/哺乳/父源暴露': '妊娠/哺乳/父源暴露', '用药错误': '用药错误', '产品质量问题': '产品质量投诉', '缺乏疗效/疾病进展': '缺乏疗效/疾病进展', '误用/过量/相互作用/职业暴露': '误用/过量/职业暴露', '其他安全性信息': '其他安全性信息' };

        const executeModuleList = computed(() => {
            const ids = EXEC_MODULE_MAP[executeTaskData.value.taskType] || EXEC_MODULE_MAP['周期治疗/复诊随访'];
            return ids.map(id => window.PSP_MODULES.find(m => m.id === id)).filter(Boolean);
        });
        const moduleQuestions = (moduleId) => {
            const name = (window.PSP_MODULES.find(m => m.id === moduleId) || {}).name;
            return window.PSP_QUESTIONS.filter(q => q.module === name);
        };
        const pspTypeLabel = (t) => ({ radio: '单选', checkbox: '多选', text: '文本', date: '日期', month: '时间文本（年月）', system: '系统字段' })[t] || t;
        const optMatch = (ans, anyOf) => anyOf.some(a => ans === a || ans.startsWith(a + '：') || ans.startsWith(a + ':'));
        const isPspQuestionVisible = (q) => {
            if (!q.trigger) return true;
            const forced = FORCED_COND_MODULES[executeTaskData.value.taskType] || [];
            const qModuleId = (window.PSP_MODULES.find(m => m.name === q.module) || {}).id;
            if (forced.includes(qModuleId) && [49, 82].includes(q.trigger.q)) return true;
            const ans = executeAnswers[q.trigger.q];
            if (q.trigger.anyOf === '*') return Array.isArray(ans) ? ans.length > 0 : !!ans;
            if (Array.isArray(ans)) return ans.some(a => optMatch(a, q.trigger.anyOf));
            return ans ? optMatch(ans, q.trigger.anyOf) : false;
        };
        const isModuleVisible = (mod) => {
            if (![8, 9].includes(mod.id)) return true;
            const forced = FORCED_COND_MODULES[executeTaskData.value.taskType] || [];
            if (forced.includes(mod.id)) return true;
            return moduleQuestions(mod.id).some(q => isPspQuestionVisible(q));
        };
        const executePatient = computed(() => window.PSP_PATIENTS.find(p => p.patientId === executeTaskData.value.patientId) || {});
        const executePatientRecords = computed(() => RECORDS.filter(r => r.patientId === executeTaskData.value.patientId));
        const executePatientEvents = computed(() => EVENTS.filter(e => e.patientId === executeTaskData.value.patientId));
        const systemFieldValue = (no) => {
            const p = executePatient.value; const t = executeTaskData.value;
            const map = { 1: t.taskId, 2: PSP_TODAY, 3: operatorName.value, 4: p.patientId, 5: p.hospital, 6: p.dept, 7: p.gender, 8: (p.age || '—') + ' 岁' };
            return map[no] || '—';
        };
        const emergencyTriggered = computed(() => {
            const a = executeAnswers[78];
            return Array.isArray(a) && a.length > 0 && !a.includes('无以上情况');
        });
        const buildAutoSummary = () => {
            const lines = [];
            executeModuleList.value.forEach(mod => {
                if (!isModuleVisible(mod)) return;
                moduleQuestions(mod.id).forEach(q => {
                    if (!isPspQuestionVisible(q)) return;
                    const ans = executeAnswers[q.no];
                    const filled = Array.isArray(ans) ? ans.length > 0 : !!ans;
                    if (!filled) return;
                    if (['radio', 'checkbox'].includes(q.type) && q.options.some(o => o.inSummary)) {
                        lines.push('【' + q.content + '】' + (Array.isArray(ans) ? ans.join('、') : ans));
                    }
                });
            });
            return lines.join('\n');
        };
        const regenerateSummary = () => { summaryText.value = buildAutoSummary(); summaryDirty.value = false; };
        const onPspAnswerChange = (q) => {
            if (q.no === 48) safetyConfirmed.value = true;
            if (!summaryDirty.value) summaryText.value = buildAutoSummary();
        };
        const addContactRecord = () => {
            executeContacts.value.unshift({ time: PSP_TODAY + ' ' + new Date().toTimeString().slice(0, 5), channel: newContact.channel, result: newContact.result, note: '坐席 ' + operatorShort.value + ' 记录' });
            ElementPlus.ElMessage.success('联系记录已添加');
        };

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
            Object.keys(executeAnswers).forEach(key => delete executeAnswers[key]);
            const ids = EXEC_MODULE_MAP[row.taskType] || EXEC_MODULE_MAP['周期治疗/复诊随访'];
            ids.forEach(mid => moduleQuestions(mid).forEach(q => {
                if (q.type === 'checkbox') executeAnswers[q.no] = [];
                else if (q.type !== 'system') executeAnswers[q.no] = '';
                (q.options || []).forEach(o => { if (o.default && q.type === 'radio') executeAnswers[q.no] = o.text; });
            }));
            safetyConfirmed.value = false;
            summaryText.value = '';
            summaryDirty.value = false;
            escalationChoice.value = [];
            escalationNote.value = '';
            executeContacts.value = [{ time: PSP_TODAY + ' 09:12', channel: '电话', result: '已接通', note: '本次随访通话开始' }];
            executeActiveTab.value = 'contact';
            executePersonalExpanded.value = false;
            executeProgress.value = 5;
            executeActiveSection.value = 'mod-1';
            executeFormSections.value = executeModuleList.value.map(m => ({ id: 'mod-' + m.id, title: m.id + '. ' + m.name })).concat([{ id: 'summary', title: '13. 随访小结' }]);
            const tabId = 'execute-task-' + row.id;
            navigate(tabId, '执行随访 · ' + row.patientName);
        };

        // 提交集中随访：生成随访记录 + （总筛阳性时）异常记录
        const submitPspFollowup = () => {
            const hasSafetyModule = executeModuleList.value.some(m => m.id === 7);
            if (hasSafetyModule && !safetyConfirmed.value) {
                ElementPlus.ElMessage.error('安全性总筛须主动确认后才能提交');
                scrollToSection('mod-7');
                return;
            }
            for (const mod of executeModuleList.value) {
                if (!isModuleVisible(mod)) continue;
                for (const q of moduleQuestions(mod.id)) {
                    if (!isPspQuestionVisible(q) || q.type === 'system' || q.required === 'optional') continue;
                    const ans = executeAnswers[q.no];
                    const filled = Array.isArray(ans) ? ans.length > 0 : (ans !== '' && ans != null);
                    if (!filled) {
                        ElementPlus.ElMessage.error('存在未作答的必答题：Q' + q.no + ' ' + q.content);
                        scrollToSection('mod-' + mod.id);
                        return;
                    }
                }
            }
            if (!summaryText.value.trim()) {
                ElementPlus.ElMessage.error('请填写随访小结');
                scrollToSection('summary');
                return;
            }
            if (escalationChoice.value.length === 0) {
                ElementPlus.ElMessage.error('请选择本次随访是否需要升级/转交');
                scrollToSection('summary');
                return;
            }

            const now = PSP_TODAY + ' ' + new Date().toTimeString().slice(0, 5);
            const recId = 'REC-2026-' + String(93 + (RECORDS.length - 10)).padStart(4, '0');
            const p = executePatient.value;

            // 作答快照
            const sections = [];
            executeModuleList.value.forEach(mod => {
                if (!isModuleVisible(mod)) return;
                const qa = [];
                moduleQuestions(mod.id).forEach(q => {
                    if (!isPspQuestionVisible(q) || q.type === 'system') return;
                    const ans = executeAnswers[q.no];
                    const filled = Array.isArray(ans) ? ans.length > 0 : !!ans;
                    if (!filled) return;
                    qa.push({ q: 'Q' + q.no + ' ' + (q.desc || q.content), a: Array.isArray(ans) ? ans.join('、') : ans });
                });
                if (qa.length) sections.push({ module: mod.id + '. ' + mod.name, qa });
            });

            // 事件生成
            const newEvents = [];
            const ans49 = executeAnswers[49] || [];
            if (Array.isArray(ans49) && ans49.some(a => AE_LINE_OPTS.includes(a))) {
                const riskMap = { '轻度/常规记录线索': '轻度/常规记录', '关注跟进线索': '关注跟进', '快速/紧急升级线索': '快速/紧急', '无法判断': '无法判断（转PV初筛）' };
                const ev = {
                    id: 'EV-2026-' + String(53 + (EVENTS.length - 7)).padStart(4, '0'),
                    patientId: p.patientId, patientName: p.name, type: '不良事件AE', typeGroup: 'AE',
                    summary: executeAnswers[52] || '安全性总筛阳性，详见随访记录 ' + recId,
                    occurDate: executeAnswers[53] || PSP_TODAY, reportDate: PSP_TODAY,
                    risk: riskMap[executeAnswers[79]] || '关注跟进', status: '待处理', source: '专员随访',
                    sourceTask: executeTaskData.value.taskId, owner: '陈敏（项目经理）',
                    four: {
                        patient: p.name + '（' + p.patientId + '），' + p.gender + '，' + p.age + ' 岁，' + p.indication + '，' + p.hospital + ' ' + p.dept,
                        reporter: (executeAnswers[50] || '患者本人') + '，随访坐席 ' + operatorShort.value + ' 记录',
                        event: (executeAnswers[52] || '') + '；发生时间：' + (executeAnswers[53] || '不详') + '；当前状态：' + (executeAnswers[54] || '未知') + '；症状分类：' + (executeAnswers[58] || '未归类') + (emergencyTriggered.value ? '；紧急升级线索：' + executeAnswers[78].join('、') : ''),
                        product: '拓益（特瑞普利单抗注射液），' + (p.regimen || '') + '，首次用药 ' + (p.firstUse || '不详')
                    },
                    ctcae: '项目风险识别：' + (executeAnswers[79] || '未分级') + '（非 CTCAE 正式分级）',
                    records: [recId],
                    trail: [{ time: now, operator: operatorName.value, action: '创建异常记录', from: '', to: '待处理', remark: '集中随访安全性总筛阳性，来源任务 ' + executeTaskData.value.taskId + (emergencyTriggered.value ? '；含紧急升级线索，建议优先处理' : '') }]
                };
                EVENTS.unshift(ev);
                newEvents.push(ev);
            }
            const spHit = (Array.isArray(ans49) ? ans49 : []).find(a => SP_MAP[a]);
            if (spHit) {
                const spType = SP_MAP[spHit];
                const isQuality = spType === '产品质量投诉';
                const ans83 = executeAnswers[83];
                const ans91 = executeAnswers[91];
                const withAE = isQuality ? (ans91 === '已使用且出现不适' || ans91 === '不确定') : (ans83 === '是' || ans83 === '不确定');
                const ev = {
                    id: 'EV-2026-' + String(54 + (EVENTS.length - 7)).padStart(4, '0'),
                    patientId: p.patientId, patientName: p.name, type: spType, typeGroup: isQuality ? '质量投诉' : '特殊情形',
                    summary: executeAnswers[84] || ('集中随访获知特殊情形：' + spType + '，详见随访记录 ' + recId),
                    occurDate: PSP_TODAY, reportDate: PSP_TODAY,
                    risk: withAE ? '快速/紧急' : '关注跟进', status: '待处理', source: '专员随访',
                    sourceTask: executeTaskData.value.taskId, owner: '陈敏（项目经理）',
                    four: {
                        patient: p.name + '（' + p.patientId + '），' + p.gender + '，' + p.age + ' 岁，' + p.indication + '，' + p.hospital + ' ' + p.dept,
                        reporter: (executeAnswers[50] || '患者本人') + '，随访坐席 ' + operatorShort.value + ' 记录',
                        event: executeAnswers[84] || '特殊情形：' + spType + '（事实详见随访记录）',
                        product: '拓益（特瑞普利单抗注射液），' + (p.regimen || '') + (executeAnswers[92] ? '；产品信息：' + executeAnswers[92] : '')
                    },
                    ctcae: '特殊情形·' + spType + (withAE ? '（伴AE，PV必复核）' : ''),
                    quality: isQuality ? {
                        problemTypes: executeAnswers[90] || [], used: ans91 || '不清楚', withAE,
                        batchNo: executeAnswers[92] || '待补充', expiry: '待补充', foundAt: PSP_TODAY + ' 随访获知',
                        evidences: (executeAnswers[93] || []).length ? executeAnswers[93] : ['暂无凭证'],
                        route: withAE ? '质量＋PV 同步（伴AE，PV必复核）' : '质量部门优先（边界不清时转 PV 初筛确认）'
                    } : undefined,
                    records: [recId],
                    trail: [{ time: now, operator: operatorName.value, action: '创建异常记录', from: '', to: '待处理', remark: '集中随访自然获知特殊情形（' + spType + '），按分流路径记录，来源任务 ' + executeTaskData.value.taskId }]
                };
                EVENTS.unshift(ev);
                newEvents.push(ev);
            }

            const rec = {
                id: recId, patientId: p.patientId, patientName: p.name, date: now,
                taskType: executeTaskData.value.taskType, taskId: executeTaskData.value.taskId,
                executor: operatorName.value, summary: summaryText.value,
                escalation: escalationChoice.value.join('、') + (escalationNote.value ? '（关联 ' + escalationNote.value + '）' : ''),
                eventId: newEvents.length ? newEvents[0].id : '', sections
            };
            RECORDS.unshift(rec);

            const task = TASKS.find(t => t.id === executeTaskData.value.id);
            if (task) { task.status = '已完成'; task.executor = operatorShort.value; task.execDate = now; }

            const msg = '随访已完成，生成随访记录 ' + recId + (newEvents.length ? '；异常记录 ' + newEvents.map(e => e.id).join('、') + ' 已进入异常/AE管理（待处理）' : '');
            ElementPlus.ElMessageBox.confirm(msg, '提交成功', {
                confirmButtonText: newEvents.length ? '前往异常管理处理' : '查看随访记录',
                cancelButtonText: '返回任务列表',
                type: 'success'
            }).then(() => {
                handleTabRemove(activePath.value);
                if (newEvents.length) openPvDetail(newEvents[0]);
                else openRecordView(rec);
            }).catch(() => {
                handleTabRemove(activePath.value);
                handleMenuSelect('followup-task');
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
            const existing = openTags.value.find(tag => tag.id === id);
            if (existing) existing.title = title;
            else openTags.value.push({ id, title });
            // 切换页面时重置聊天模式，除非是留言管理
            if (id !== 'message-manage') {
                isChatMode.value = false;
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
                'followup': 'fa-headset',
                'followup-task': 'fa-calendar-check',
                'exception-manage': 'fa-triangle-exclamation',
                'patient-list': 'fa-hospital-user',
                'patient': 'fa-hospital-user',
                'form-config': 'fa-file-pen',
                'report': 'fa-chart-pie',
                'complaint-manage': 'fa-bullhorn'
            };
            return icons[id] || 'fa-folder';
        };

        const handleUserCommand = (command) => {
            if (command === 'logout') window.location.href = 'index.html';
        };

        // 数据状态（首页工作台关键指标）
        const taskStats = ref([
            { label: '本月建档数', value: 23, sub: '较上月 +6 人', icon: 'fa-id-card', color: '#409EFF', bg: 'linear-gradient(135deg, #e0f2ff 0%, #ffffff 100%)', shadow: '0 4px 12px rgba(64,158,255,0.15)', path: 'patient-list' },
            { label: '随访完成率', value: '88.5%', sub: '本月 174 / 197 任务', icon: 'fa-circle-check', color: '#67C23A', bg: 'linear-gradient(135deg, #f6ffed 0%, #ffffff 100%)', shadow: '0 4px 12px rgba(103,194,58,0.15)', path: 'kpi-report' },
            { label: '触达率', value: '96.2%', sub: '电话 + 短信 + 平台消息', icon: 'fa-phone-volume', color: '#E6A23C', bg: 'linear-gradient(135deg, #fff7e6 0%, #ffffff 100%)', shadow: '0 4px 12px rgba(230,162,60,0.15)', path: 'kpi-report' },
            { label: '待处理AE / 异常', value: 3, sub: '含 1 件快速/紧急', icon: 'fa-triangle-exclamation', color: '#F56C6C', bg: 'linear-gradient(135deg, #fff1f0 0%, #ffffff 100%)', shadow: '0 4px 12px rgba(245,108,108,0.15)', path: 'exception-manage' },
            { label: '今日待办任务', value: 6, sub: '含 1 条 PV 补充随访', icon: 'fa-list-check', color: '#722ed1', bg: 'linear-gradient(135deg, #f9f0ff 0%, #ffffff 100%)', shadow: '0 4px 12px rgba(114,46,209,0.15)', path: 'followup-task' }
        ]);

        const analysisStats = ref([
            { label: '随访完成率', value: '88.5%', change: '+2.3%', icon: 'fa-circle-check', color: '#67C23A' },
            { label: '触达率', value: '96.2%', change: '+0.8%', icon: 'fa-phone-volume', color: '#409EFF' },
            { label: '超期未复诊率', value: '6.8%', change: '-1.2%', icon: 'fa-calendar-xmark', color: '#E6A23C' },
            { label: '复诊记录提交率', value: '91.3%', change: '+3.5%', icon: 'fa-file-circle-check', color: '#F56C6C' }
        ]);

        const recentTasks = computed(() => {
            return (MOCK_DATA['followup-task'].data || []).slice(0, 5);
        });

        const quickActions = [
            { title: '执行随访', icon: 'fa-phone', color: '#409EFF', path: 'followup-task' },
            { title: '异常/AE处理', icon: 'fa-triangle-exclamation', color: '#F56C6C', path: 'exception-manage' },
            { title: '表单配置', icon: 'fa-file-pen', color: '#67C23A', path: 'form-designer' },
            { title: '报表/KPI', icon: 'fa-chart-line', color: '#E6A23C', path: 'kpi-report' }
        ];

        const systemNotices = ref([
            { title: 'PV 接口人要求补充 EV-2026-0040（储存错误）环节信息，已生成补充随访任务', time: '昨天 16:40', type: 'warning' },
            { title: '患者赵*军已提交复诊记录（已按计划复诊）', time: '昨天 20:12', type: 'success' },
            { title: '短信发送失败提醒：杨*英 158****9217（空号风险）', time: '昨天 09:00', type: 'danger' },
            { title: '周*明复诊已超期 11 天，召回任务两次未接通', time: '2 天前', type: 'warning' }
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

        const normalizeQuestion = (question) => ({
            id: question.id,
            order: question.sort || question.order,
            label: question.title || question.label || question.questionName,
            type: question.answerType === 1 ? '多选' : '单选',
            answerType: question.answerType,
            question: question.questionName || question.question,
            options: Array.isArray(question.options) ? question.options : [],
            optionCount: Array.isArray(question.options) ? question.options.length : 0,
            triggerRules: question.triggerRules || [],
            isTriggered: question.isTriggered,
            isRequired: '是',
            isTriggerByAnswer: question.isTriggered === 0 ? '否' : '是',
            creator: question.createName || question.creator || '超级管理员',
            createTime: question.createTime || '2026-03-30 09:58:51',
            updater: question.updateName || question.updater || '超级管理员',
            updateTime: question.updateTime || '2026-03-30 09:58:51'
        });

        const getQuestionnaireModule = (code) => {
            const modules = window.QUESTIONNAIRE_MODULES || {};
            return modules[code] || null;
        };

        const getQuestionnaireQuestions = (code) => {
            const module = getQuestionnaireModule(code);
            if (module) {
                return module.questions.map(normalizeQuestion).sort((a, b) => a.order - b.order);
            }
            return (QUESTION_MOCK_DB[code] || []).map(normalizeQuestion).sort((a, b) => a.order - b.order);
        };

        const QUESTION_MOCK_DB = {
            'CQ': [ // 超期随访问卷
                { id: 101, order: 1, label: '超期原因', type: '单选', question: '您好，请问您近期未按时进行复诊/随访的原因是什么？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-05 09:47:40', updater: '超级管理员', updateTime: '2025-12-05 09:47:40' },
                { id: 102, order: 2, label: '用药现状', type: '单选', question: '您目前是否还在继续按照医嘱服用君实的药品？', isRequired: '是', isTriggerByAnswer: '否', creator: '超级管理员', createTime: '2025-12-05 09:48:10', updater: '超级管理员', updateTime: '2025-12-05 09:48:10' },
                { id: 103, order: 3, label: '不良反应', type: '多选', question: '您近期是否有遇到任何不适或不良反应？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-05 09:49:00', updater: '超级管理员', updateTime: '2025-12-05 09:49:00' }
            ],
            'FG': [ // 复购随访问卷
                { id: 201, order: 1, label: '用药情况', type: '单选', question: '先和您确认一下，您（或您父亲/您母亲/您太太/您先生……）现在还是按照医嘱在正常用药对吧？医生有没有调整用药方案或者剂量？', isRequired: '是', isTriggerByAnswer: '否', creator: '超级管理员', createTime: '2025-12-06 10:10:00', updater: '超级管理员', updateTime: '2025-12-06 10:10:00' },
                { id: 202, order: 2, label: '疗效评估', type: '单选', question: '在上一周期的用药过程中，您觉得整体疗效如何？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-06 10:11:00', updater: '超级管理员', updateTime: '2025-12-06 10:11:00' },
                { id: 203, order: 3, label: '处方需求', type: '单选', question: '您本次购药是否需要医生为您重新开具或调整处方？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-06 10:12:00', updater: '超级管理员', updateTime: '2025-12-06 10:12:00' }
            ],
            'SC': [ // 首次建档随访问卷
                { id: 301, order: 1, label: '您是患者本人吗？后续随访是继续联系您吗？', type: '单选', question: '您是患者本人吗？后续随访是继续联系您吗？', isRequired: '是', isTriggerByAnswer: '否', creator: '超级管理员', createTime: '2025-12-07 14:00:00', updater: '超级管理员', updateTime: '2025-12-07 14:00:00' },
                { id: 302, order: 2, label: '登记信息', type: '单选', question: '我先帮您（或您父亲/您母亲/您太太/您先生……）登记一下基础信息，医生给您（或您父亲/您母亲/您太太/您先生……）处方上写的适应症是什么？（单选，必填，如患者表述不清可提醒查看病历）', isRequired: '是', isTriggerByAnswer: '否', creator: '超级管理员', createTime: '2025-12-07 14:02:00', updater: '超级管理员', updateTime: '2025-12-07 14:02:00' },
                { id: 303, order: 3, label: '您知道您（或您父亲/您母亲/您太太/您先生……）现在是几期了吗？', type: '单选', question: '您知道您（或您父亲/您母亲/您太太/您先生……）现在是几期了吗？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-07 14:05:00', updater: '超级管理员', updateTime: '2025-12-07 14:05:00' },
                { id: 304, order: 4, label: '治疗方案', type: '单选', question: '您（或您父亲/您母亲/您太太/您先生……）目前是用的什么治疗方案？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-07 14:05:00', updater: '超级管理员', updateTime: '2025-12-07 14:05:00' },
                { id: 305, order: 5, label: '联合用药', type: '单选', question: '您（或您父亲/您母亲/您太太/您先生……）目前是否联合用药？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-07 14:05:00', updater: '超级管理员', updateTime: '2025-12-07 14:05:00' },
                { id: 306, order: 6, label: '是否手术', type: '单选', question: '您（或您父亲/您母亲/您太太/您先生……）目前是用的什么治疗方案，有没有手术过？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-07 14:05:00', updater: '超级管理员', updateTime: '2025-12-07 14:05:00' },
                { id: 307, order: 7, label: '是否复发/ 转移', type: '单选', question: '您（或您父亲/您母亲/您太太/您先生……）目前是否复发/转移？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025 - 12-07 14:05:00', updater: '超级管理员', updateTime: '2025 - 12-07 14:05:00' },
                { id: 308, order: 8, label: '复诊周期', type: '单选', question: '那医嘱是让您（或您父亲/您母亲/您太太/您先生……）每2周一次去复诊用药，还是每3周一次？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-07 14:05:00', updater: '超级管理员', updateTime: '2025-12-07 14:05:00' },
                { id: 309, order: 9, label: '症状变化', type: '单选', question: '您（或您父亲/您母亲/您太太/您先生……）这几天用完药，自己感觉症状有没有变化？是不是比之前还好一些？', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-07 14:05:00', updater: '超级管理员', updateTime: '2025-12-07 14:05:00' },
                { id: 310, order: 10, label: '不良反应', type: '多选', question: '您（或您父亲/您母亲/您太太/您先生……）这几天吃饭睡觉都还正常吧？有没有出现不舒服的症状？（多选，必填）', isRequired: '是', isTriggerByAnswer: '是', creator: '超级管理员', createTime: '2025-12-07 14:05:00', updater: '超级管理员', updateTime: '2025-12-07 14:05:00' }
            ]
        };

        const questionPage = ref(1);
        const questionPageSize = ref(10);
        const questionTotal = ref(0);

        const handleQuestionAdd = () => { ElementPlus.ElMessage.success('点击了新增问题'); };
        const openQuestionnaireQuestions = (row) => {
            const list = getQuestionnaireQuestions(row.code);
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
            } else if (type === '回复' && activePath.value === 'complaint-manage') {
                Object.assign(complaintForm, {
                    patient: row.patient,
                    content: row.content,
                    reply: '',
                    targetRow: row
                });
                complaintVisible.value = true;
                if (complaintFormRef.value) complaintFormRef.value.resetFields();
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
            } else if (id === 'consent-version') {
                editForm.value = { version: '', name: '', project: '', content: '', status: '草稿' };
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

        const openConsentView = (row) => {
            consentViewData.value = { ...row };
            consentViewVisible.value = true;
        };

        const publishConsentVersion = (row) => {
            ElementPlus.ElMessageBox.confirm('确认发布该版本？', '发布确认', {
                confirmButtonText: '确认发布',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const data = MOCK_DATA['consent-version'].data;
                const index = data.findIndex(item => item.id === row.id);
                if (index > -1) {
                    data[index].status = '已发布';
                    consentVersionData.value = [...data];
                    ElementPlus.ElMessage.success('发布成功');
                }
            }).catch(() => { });
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

        // 异常管理逻辑
        const exceptionVisible = ref(false);
        const exceptionTypeFilter = ref('');
        const exceptionForm = ref({
            patientName: '',
            patientId: '',
            type: 'AE',
            description: '',
            occurDate: new Date(),
            remark: ''
        });
        const exceptionFormRef = ref(null);
        const patientOptions = ref([]);
        const patientSearchLoading = ref(false);

        const openExceptionModal = () => {
            exceptionForm.value = {
                patientName: '',
                patientId: '',
                type: 'AE',
                description: '',
                occurDate: new Date(),
                remark: ''
            };
            exceptionVisible.value = true;
        };

        const remoteSearchPatient = (query) => {
            if (query) {
                patientSearchLoading.value = true;
                setTimeout(() => {
                    patientSearchLoading.value = false;
                    const list = MOCK_DATA['patient-list'].data;
                    patientOptions.value = list.filter(item => {
                        return item.name.toLowerCase().includes(query.toLowerCase());
                    });
                }, 200);
            } else {
                patientOptions.value = [];
            }
        };

        const selectExceptionPatient = (item) => {
            exceptionForm.value.patientId = item.patientId;
        };

        const handleExceptionSave = () => {
            exceptionFormRef.value.validate((valid) => {
                if (valid) {
                    const newReport = {
                        id: Date.now(),
                        reportDate: new Date().toISOString().split('T')[0],
                        patientName: exceptionForm.value.patientName,
                        patientId: exceptionForm.value.patientId,
                        type: exceptionForm.value.type,
                        description: exceptionForm.value.description,
                        status: '待处理',
                        reporter: '超级管理员',
                        updateTime: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-')
                    };
                    MOCK_DATA['exception-manage'].data.unshift(newReport);
                    ElementPlus.ElMessage.success('异常事件已成功上报');
                    exceptionVisible.value = false;
                    renderCurrentPage();
                }
            });
        };

        const handleExceptionAction = (action, row) => {
            if (action === '详情') {
                ElementPlus.ElMessageBox.alert(
                    `<div style="line-height: 2;">
                        <div><b>患者姓名：</b>${row.patientName}</div>
                        <div><b>异常类型：</b>${row.type}</div>
                        <div><b>上报日期：</b>${row.reportDate}</div>
                        <div><b>事件描述：</b>${row.description}</div>
                        <div><b>当前状态：</b>${row.status}</div>
                        <div><b>上报人：</b>${row.reporter}</div>
                        <div><b>更新时间：</b>${row.updateTime}</div>
                    </div>`,
                    '异常事件详情',
                    { dangerouslyUseHTMLString: true, confirmButtonText: '确定' }
                );
            } else if (action === '上报PV') {
                ElementPlus.ElMessageBox.confirm('确定将该事件上报至指定PV渠道吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    row.status = '已上报PV';
                    row.updateTime = new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-');
                    ElementPlus.ElMessage.success('已上报PV渠道');
                });
            } else if (action === '解决') {
                ElementPlus.ElMessageBox.confirm('确认该异常事件已解决并结案？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    row.status = '已解决';
                    row.updateTime = new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-');
                    ElementPlus.ElMessage.success('事件已解决');
                });
            }
        };

        // 页面渲染分发逻辑
        const renderCurrentPage = () => {
            loading.value = true;
            setTimeout(() => {
                // 如果是通用页面，更新 tableData
                if (isCommonPage.value) {
                    tableData.value = MOCK_DATA[activePath.value].data;
                }

                // 版本管理页面
                if (activePath.value === 'consent-version') {
                    consentVersionData.value = MOCK_DATA['consent-version'].data;
                }

                // 仅 article 页面需要手动渲染到 content-container
                const container = document.getElementById('content-container');
                if (container && activePath.value.startsWith('article-')) {
                    renderArticlePageVue(container, activePath.value);
                }

                loading.value = false;
            }, 100);
        };

        const handleComplaintReply = () => {
            complaintFormRef.value.validate((valid) => {
                if (valid) {
                    complaintForm.targetRow.status = '已处理';
                    ElementPlus.ElMessage.success(`已回复患者【${complaintForm.patient}】的投诉`);
                    complaintVisible.value = false;
                    renderCurrentPage();
                }
            });
        };

        // ==================== PSP V1.1 扩展（A1–A8 + PV口径） ====================
        const PSP_TODAY = window.PSP_TODAY;
        const PSP_KPI = window.PSP_KPI;
        const PSP_TASK_TYPES = ['项目说明与授权', '首触达建档', '周期治疗/复诊随访', '超期未治疗/未复诊召回', '退出/拒访管理', '异常症状/AE即时随访', '特殊情形/质量投诉处理', 'PV/事件补充随访', '复诊记录提交'];
        const TASKS = reactive(window.PSP_TASKS);
        const EVENTS = reactive(window.PSP_EVENTS);
        const RECORDS = reactive(window.PSP_RECORDS);

        // 演示角色切换
        const currentRole = ref('seat');
        const operatorName = computed(() => ({ seat: '许琳（随访坐席）', pm: '陈敏（项目经理）', admin: '超级管理员' })[currentRole.value]);
        const operatorShort = computed(() => ({ seat: '许琳', pm: '陈敏', admin: '超级管理员' })[currentRole.value]);

        // A3 随访任务筛选
        const taskTypeFilter = ref('');
        const taskStatusFilter = ref('');
        const taskExecutorFilter = ref('');
        const taskKeyword = ref('');
        const filteredTasks = computed(() => TASKS.filter(t =>
            (!taskTypeFilter.value || t.taskType === taskTypeFilter.value) &&
            (!taskStatusFilter.value || t.status === taskStatusFilter.value) &&
            (!taskExecutorFilter.value || (t.executor || '').includes(taskExecutorFilter.value)) &&
            (!taskKeyword.value || t.patientId.includes(taskKeyword.value) || t.patientName.includes(taskKeyword.value) || t.taskId.includes(taskKeyword.value))
        ));

        // 首页工作台待办
        const homeTodoTasks = computed(() => TASKS.filter(t => ['待执行', '即将到期', '已超期'].includes(t.status)).slice(0, 4));
        const homeTodoEvents = computed(() => EVENTS.filter(e => ['待处理', '已转PV', '需补充'].includes(e.status)).slice(0, 4));
        const homeOverduePatients = computed(() => window.PSP_PATIENTS.filter(p => p.nextVisit < PSP_TODAY || p.riskLevel !== 'green').slice(0, 4));

        // A5 异常/AE 管理 · PV 工作台
        const pvGroupFilter = ref('');
        const pvStatusFilter = ref('');
        const pvKeyword = ref('');
        const pvFilteredEvents = computed(() => EVENTS.filter(e =>
            (!pvGroupFilter.value || e.typeGroup === pvGroupFilter.value) &&
            (!pvStatusFilter.value || e.status === pvStatusFilter.value) &&
            (!pvKeyword.value || e.patientName.includes(pvKeyword.value) || e.id.includes(pvKeyword.value) || e.summary.includes(pvKeyword.value))
        ));
        const pvStats = computed(() => [
            { label: '待处理', value: EVENTS.filter(e => e.status === '待处理').length, color: '#f56c6c', icon: 'fa-inbox' },
            { label: '已转PV', value: EVENTS.filter(e => e.status === '已转PV').length, color: '#e6a23c', icon: 'fa-share-nodes' },
            { label: '需补充', value: EVENTS.filter(e => e.status === '需补充').length, color: '#722ed1', icon: 'fa-circle-question' },
            { label: '已上报', value: EVENTS.filter(e => e.status === '已上报').length, color: '#409eff', icon: 'fa-flag' },
            { label: '快速/紧急', value: EVENTS.filter(e => e.risk === '快速/紧急' && e.status !== '已关闭').length, color: '#cf1322', icon: 'fa-bolt' }
        ]);
        const pvStatusType = (s) => ({ '待处理': 'warning', '已转PV': 'primary', '已上报': 'success', '需补充': 'danger', '已关闭': 'info' })[s] || 'info';

        const pvDetail = ref({ four: {}, trail: [], quality: null });
        const isPvDetailPage = computed(() => activePath.value === 'pv-detail');
        const openPvDetail = (row) => { pvDetail.value = row; navigate('pv-detail', '事件 ' + row.id); };
        const openPvDetailById = (id) => {
            const e = EVENTS.find(x => x.id === id);
            if (e) openPvDetail(e);
        };
        const pvRelatedRecords = computed(() => RECORDS.filter(r => r.eventId === pvDetail.value.id || (pvDetail.value.records || []).includes(r.id)));
        const pvStateReached = (i) => {
            const order = { '待处理': 0, '已转PV': 1, '已上报': 2, '需补充': 2, '已关闭': 3 };
            return (order[pvDetail.value.status] || 0) >= i;
        };

        // PV 状态机操作
        const pvActionVisible = ref(false);
        const pvActionTarget = ref('');
        const pvActionRemark = ref('');
        const pvActionTitle = computed(() => 'PV 状态操作：' + pvActionTarget.value);
        const PV_ACTION_LABEL = { '已转PV': '标记已转PV', '已上报': '标记已上报', '需补充': '标记需补充', '已关闭': '标记已关闭' };
        const openPvAction = (target) => { pvActionTarget.value = target; pvActionRemark.value = ''; pvActionVisible.value = true; };
        const confirmPvAction = () => {
            if (!pvActionRemark.value.trim()) {
                ElementPlus.ElMessage.error('请填写操作备注');
                return;
            }
            const e = pvDetail.value;
            const from = e.status;
            const to = pvActionTarget.value;
            const now = PSP_TODAY + ' ' + new Date().toTimeString().slice(0, 5);
            e.trail.push({ time: now, operator: operatorName.value, action: PV_ACTION_LABEL[to], from, to, remark: pvActionRemark.value });
            e.status = to;
            if (to === '需补充') {
                const patient = window.PSP_PATIENTS.find(p => p.patientId === e.patientId) || {};
                const newTask = {
                    id: Date.now(), status: '待执行', patientId: e.patientId, patientName: e.patientName,
                    phone: patient.phone || '', planDate: PSP_TODAY, taskType: 'PV/事件补充随访',
                    product: '拓益（特瑞普利单抗注射液）', indication: patient.indication || '',
                    taskId: 'RW260509-00' + (40 + TASKS.length - 14),
                    serviceSummary: '补充原事件 ' + e.id + ' 信息（' + e.type + '）',
                    overdue: '', executor: '', execDate: '', createDate: now + ':00', relatedEvent: e.id
                };
                TASKS.unshift(newTask);
                e.trail[e.trail.length - 1].remark += '；已自动生成补充随访任务 ' + newTask.taskId;
                ElementPlus.ElMessage.success('已标记"需补充"，自动生成补充随访任务 ' + newTask.taskId + '（关联 ' + e.id + '）');
            } else {
                ElementPlus.ElMessage.success('已' + PV_ACTION_LABEL[to] + '，操作已留痕');
            }
            pvActionVisible.value = false;
        };

        // A1/A2 表单设计器
        const pspModules = window.PSP_MODULES;
        const designerModuleId = ref(7);
        const designerModule = computed(() => pspModules.find(m => m.id === designerModuleId.value));
        const designerQuestions = computed(() => window.PSP_QUESTIONS.filter(q => q.module === (designerModule.value || {}).name));
        const moduleQuestionCount = (id) => {
            const name = (pspModules.find(m => m.id === id) || {}).name;
            return window.PSP_QUESTIONS.filter(q => q.module === name).length;
        };

        // A8 报表/KPI
        const kpiRange = ref('week');
        const kpiSeries = computed(() => PSP_KPI[kpiRange.value]);
        const kpiDonutGradient = computed(() => {
            const total = PSP_KPI.taskTypeDist.reduce((s, d) => s + d.value, 0);
            let acc = 0;
            const parts = PSP_KPI.taskTypeDist.map(d => {
                const start = acc / total * 360;
                acc += d.value;
                return d.color + ' ' + start.toFixed(1) + 'deg ' + (acc / total * 360).toFixed(1) + 'deg';
            });
            return 'conic-gradient(' + parts.join(', ') + ')';
        });

        // 随访记录详情
        const recordViewData = ref({});
        const isRecordPage = computed(() => activePath.value === 'record-view');
        const openRecordView = (r) => { recordViewData.value = r; navigate('record-view', '随访记录 ' + r.id); };

        // A6 患者 360
        const patientRecords = computed(() => RECORDS.filter(r => r.patientId === patientDetailData.value.patientId));
        const patientTasks = computed(() => TASKS.filter(t => t.patientId === patientDetailData.value.patientId));
        const patientEvents = computed(() => EVENTS.filter(e => e.patientId === patientDetailData.value.patientId));

        onMounted(() => {
            const hash = window.location.hash.slice(1) || 'home';
            handleMenuSelect(hash);
        });

        return {
            menuConfig, activePath, openTags, loading,
            currentTitle, handleMenuSelect, handleTabClick, handleTabRemove, getGroupIcon, handleUserCommand,
            editVisible, editTitle, editForm, currentColumns, editFormRef,
            isConsentVersionPage, consentViewVisible, consentViewData, consentVersionData, consentSearchKeyword, openConsentView, publishConsentVersion,
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

            currentRole, operatorName, operatorShort, PSP_TODAY, PSP_KPI, PSP_TASK_TYPES,
            taskTypeFilter, taskStatusFilter, taskExecutorFilter, taskKeyword, filteredTasks,
            homeTodoTasks, homeTodoEvents, homeOverduePatients,
            pvGroupFilter, pvStatusFilter, pvKeyword, pvFilteredEvents, pvStats, pvStatusType,
            pvDetail, isPvDetailPage, openPvDetail, openPvDetailById, pvRelatedRecords, pvStateReached,
            pvActionVisible, pvActionTarget, pvActionRemark, pvActionTitle, openPvAction, confirmPvAction,
            pspModules, designerModuleId, designerModule, designerQuestions, moduleQuestionCount,
            kpiRange, kpiSeries, kpiDonutGradient,
            recordViewData, isRecordPage, openRecordView,
            patientRecords, patientTasks, patientEvents,

            exceptionVisible, exceptionTypeFilter, exceptionForm, exceptionFormRef,
            patientOptions, patientSearchLoading,
            openExceptionModal, remoteSearchPatient, selectExceptionPatient,
            handleExceptionSave, handleExceptionAction,

            isCommonPage, isArticlePage, isBaseDataPage, isExecutePage, isPatientDetailPage,
            patientDetailData, openPatientDetail,
            executeTaskData, executeActiveTab, executePersonalExpanded,
            executeAnswers, executeContacts, newContact, addContactRecord,
            executeModuleList, moduleQuestions, pspTypeLabel, isPspQuestionVisible, isModuleVisible,
            executePatient, executePatientRecords, executePatientEvents, systemFieldValue, emergencyTriggered,
            safetyConfirmed, summaryText, summaryDirty, escalationChoice, escalationNote,
            onPspAnswerChange, regenerateSummary, submitPspFollowup,
            executeFormSections, executeActiveSection, executeProgress,
            scrollToSection, handleExecuteTask, handleFormScroll,
            dictGroups, activeDictGroup, dictItems,
            messageSearchKeyword, activeMessage, replyContent, chatScrollRef, filteredMessages, selectMessage, handleReplyMessage, isChatMode,
            scriptDrawerVisible, scriptSearchKeyword, scriptList, useScript,
            riskVisible, riskForm, riskFormRef, openRiskDialog, handleRiskSave,
            complaintVisible, complaintForm, complaintFormRef, handleComplaintReply
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
                ${followStats.map(item => renderCard({ ...item, span: 6 })).join('')}
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
