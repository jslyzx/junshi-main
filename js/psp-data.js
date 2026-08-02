// psp-data.js —— 君实"益+同行"院内患者管理PSP项目 mock 数据
// 依据《君实PSP项目随访表单V0.4.xlsx》《君实PSP随访流程落地改造计划_V1.1.md》编制
// 演示基准日期：2026-05-09

window.PSP_TODAY = '2026-05-09';

// ============ 9 类随访任务规则（A1/A2） ============
window.PSP_RULES = [
    { id: 1, taskType: '项目说明与授权', category: '常规周期', trigger: '患者扫码进入首页后立即弹出，患者端自行填写', form: '授权问卷（模块1/2/7/13）', remindDays: '—', execDays: '当日完成', status: '启用' },
    { id: 2, taskType: '首触达建档', category: '常规周期', trigger: '授权完成后 T+0～T+3 天，专员在医院现场完成', form: '建档问卷（模块1/3/7/13）', remindDays: '1', execDays: '3', status: '启用' },
    { id: 3, taskType: '周期治疗/复诊随访', category: '常规周期', trigger: '每周期治疗前或复诊前 3～5 天自动生成（按患者下次复诊/治疗日期每日扫描）', form: '周期随访问卷（模块1/4/5/6/7/12/13）', remindDays: '3~5', execDays: '2', status: '启用' },
    { id: 4, taskType: '超期未治疗/未复诊召回', category: '常规周期', trigger: '计划日期次日，或超过 SOP 约定天数；患者任务超时未提交/报延期时生成', form: '召回问卷（模块1/5/6/7/13）', remindDays: '—', execDays: '3', status: '启用' },
    { id: 5, taskType: '退出/拒访管理', category: '常规周期', trigger: '患者明确拒绝继续随访或要求停止联系时手动发起', form: '退出/拒访问卷（模块1/11/7/13）', remindDays: '—', execDays: '2', status: '启用' },
    { id: 6, taskType: '异常症状/AE即时随访', category: '事件触发', trigger: '常规随访安全性总筛阳性，或患者端主动上报不适时自动生成', form: 'AE问卷（模块1/7/8/13）', remindDays: '—', execDays: '1（24小时内）', status: '启用' },
    { id: 7, taskType: '特殊情形/质量投诉处理', category: '事件触发', trigger: '自然获知妊娠、用药错误、质量投诉、缺乏疗效、误用/暴露等时生成', form: '特殊情形问卷（模块1/7/9/10/13）', remindDays: '—', execDays: '2', status: '启用' },
    { id: 8, taskType: 'PV/事件补充随访', category: '事件触发', trigger: 'PV 或项目经理在异常记录上标记"需补充"时自动生成，必须关联原事件编号', form: '补充随访问卷（模块1/10/13）', remindDays: '—', execDays: '3', status: '启用' },
    { id: 9, taskType: '复诊记录提交', category: '患者任务', trigger: '计划复诊/治疗日期次日自动生成，平台消息＋短信提醒患者在患者端填写', form: '患者端复诊记录表单（模块14）', remindDays: '1', execDays: '3（超时生成召回）', status: '启用' }
];

// ============ 患者主档（脱敏） ============
window.PSP_PATIENTS = [
    { id: 1, createTime: '2026-01-14 09:44:19', name: '张*芳', patientId: 'PT-2601-0088', phone: '138****2201', gender: '女', age: 58, birthDate: '1968-03-12', indication: '非小细胞肺癌', hospital: '复旦大学附属肿瘤医院', dept: '肿瘤内科', stage: '维持治疗', nextVisit: '2026-05-12', medicationStatus: '用药中', riskLevel: 'green', specialist: '王专员', firstUse: '2025-11-20', regimen: '拓益 240mg q3w 联合化疗' },
    { id: 2, createTime: '2026-02-03 10:12:40', name: '李*强', patientId: 'PT-2602-0103', phone: '139****7754', gender: '男', age: 63, birthDate: '1963-07-30', indication: '食管鳞癌', hospital: '上海交通大学医学院附属瑞金医院', dept: '胸外科', stage: '初始治疗', nextVisit: '2026-05-10', medicationStatus: '用药中', riskLevel: 'yellow', specialist: '王专员', firstUse: '2026-02-14', regimen: '拓益 240mg q3w 联合紫杉醇+顺铂' },
    { id: 3, createTime: '2026-02-18 14:05:22', name: '王*兰', patientId: 'PT-2602-0117', phone: '136****8830', gender: '女', age: 51, birthDate: '1975-01-08', indication: '三阴乳腺癌', hospital: '中山大学肿瘤防治中心', dept: '乳腺科', stage: '维持治疗', nextVisit: '2026-05-15', medicationStatus: '用药中', riskLevel: 'green', specialist: '赵专员', firstUse: '2025-12-02', regimen: '拓益 240mg q3w 联合白蛋白紫杉醇' },
    { id: 4, createTime: '2026-03-02 09:31:15', name: '刘*海', patientId: 'PT-2603-0126', phone: '135****3102', gender: '男', age: 67, birthDate: '1959-11-25', indication: '黑色素瘤', hospital: '北京大学肿瘤医院', dept: '黑色素瘤与肉瘤内科', stage: '复发或进展后治疗', nextVisit: '2026-05-09', medicationStatus: '减量', riskLevel: 'yellow', specialist: '赵专员', firstUse: '2026-01-09', regimen: '拓益 240mg q3w 单药' },
    { id: 5, createTime: '2026-03-10 16:20:48', name: '陈*平', patientId: 'PT-2603-0131', phone: '137****6429', gender: '男', age: 45, birthDate: '1981-05-17', indication: '鼻咽癌', hospital: '中山大学肿瘤防治中心', dept: '鼻咽科', stage: '初始治疗', nextVisit: '2026-05-18', medicationStatus: '用药中', riskLevel: 'green', specialist: '赵专员', firstUse: '2026-03-21', regimen: '拓益 240mg q3w 联合吉西他滨+顺铂' },
    { id: 6, createTime: '2026-03-15 11:08:33', name: '杨*英', patientId: 'PT-2603-0142', phone: '158****9217', gender: '女', age: 60, birthDate: '1966-09-02', indication: '非小细胞肺癌', hospital: '四川大学华西医院', dept: '肿瘤中心', stage: '维持治疗', nextVisit: '2026-05-11', medicationStatus: '方案调整', riskLevel: 'yellow', specialist: '王专员', firstUse: '2025-10-15', regimen: '拓益 240mg q3w 单药维持' },
    { id: 7, createTime: '2026-04-01 08:55:10', name: '赵*军', patientId: 'PT-2604-0155', phone: '150****3386', gender: '男', age: 55, birthDate: '1971-02-19', indication: '尿路上皮癌', hospital: '江苏省人民医院', dept: '泌尿外科', stage: '维持治疗', nextVisit: '2026-05-20', medicationStatus: '用药中', riskLevel: 'green', specialist: '王专员', firstUse: '2026-01-28', regimen: '拓益 240mg q3w 单药' },
    { id: 8, createTime: '2026-04-08 15:42:57', name: '黄*梅', patientId: 'PT-2604-0160', phone: '186****5543', gender: '女', age: 49, birthDate: '1977-06-23', indication: '头颈鳞癌', hospital: '浙江省肿瘤医院', dept: '头颈外科', stage: '术后辅助治疗', nextVisit: '2026-05-14', medicationStatus: '用药中', riskLevel: 'green', specialist: '赵专员', firstUse: '2026-02-19', regimen: '拓益 240mg q3w 辅助治疗' },
    { id: 9, createTime: '2026-04-12 10:26:31', name: '周*明', patientId: 'PT-2604-0171', phone: '133****7918', gender: '男', age: 71, birthDate: '1955-04-05', indication: '胃癌', hospital: '天津医科大学肿瘤医院', dept: '胃部肿瘤科', stage: '复发或进展后治疗', nextVisit: '2026-04-28', medicationStatus: '暂停', riskLevel: 'red', specialist: '王专员', firstUse: '2025-09-11', regimen: '拓益 240mg q3w 联合奥沙利铂' },
    { id: 10, createTime: '2026-05-02 09:14:26', name: '吴*珍', patientId: 'PT-2605-0180', phone: '135****7735', gender: '女', age: 56, birthDate: '1970-08-14', indication: '非小细胞肺癌', hospital: '吉林大学第二医院', dept: '肿瘤内科', stage: '初始治疗', nextVisit: '2026-05-16', medicationStatus: '用药中', riskLevel: 'green', specialist: '赵专员', firstUse: '2026-04-25', regimen: '拓益 240mg q3w 联合培美曲塞+卡铂' }
];

// ============ 随访任务（9 类） ============
window.PSP_TASKS = [
    { id: 1, status: '待执行', patientId: 'PT-2601-0088', patientName: '张*芳', phone: '138****2201', planDate: '2026-05-09', taskType: '周期治疗/复诊随访', product: '拓益（特瑞普利单抗注射液）', indication: '非小细胞肺癌', taskId: 'RW260509-0031', serviceSummary: '复诊前周期随访（复诊日 2026-05-12）', overdue: '', executor: '', execDate: '', createDate: '2026-05-07 09:00:12', relatedEvent: '' },
    { id: 2, status: '待执行', patientId: 'PT-2602-0103', patientName: '李*强', phone: '139****7754', planDate: '2026-05-09', taskType: '周期治疗/复诊随访', product: '拓益（特瑞普利单抗注射液）', indication: '食管鳞癌', taskId: 'RW260509-0032', serviceSummary: '复诊前周期随访（复诊日 2026-05-10）', overdue: '', executor: '', execDate: '', createDate: '2026-05-07 09:00:12', relatedEvent: '' },
    { id: 3, status: '即将到期', patientId: 'PT-2603-0131', patientName: '陈*平', phone: '137****6429', planDate: '2026-05-10', taskType: '首触达建档', product: '拓益（特瑞普利单抗注射液）', indication: '鼻咽癌', taskId: 'RW260510-0036', serviceSummary: '授权完成，待院内现场建档', overdue: '', executor: '', execDate: '', createDate: '2026-05-08 14:22:01', relatedEvent: '' },
    { id: 4, status: '已超期', patientId: 'PT-2604-0171', patientName: '周*明', phone: '133****7918', planDate: '2026-04-29', taskType: '超期未治疗/未复诊召回', product: '拓益（特瑞普利单抗注射液）', indication: '胃癌', taskId: 'RW260429-0018', serviceSummary: '复诊超期 11 天，两次电话未接通', overdue: '11', executor: '', execDate: '', createDate: '2026-04-29 09:00:05', relatedEvent: '' },
    { id: 5, status: '待执行', patientId: 'PT-2603-0126', patientName: '刘*海', phone: '135****3102', planDate: '2026-05-09', taskType: '异常症状/AE即时随访', product: '拓益（特瑞普利单抗注射液）', indication: '黑色素瘤', taskId: 'RW260509-0033', serviceSummary: '周期随访总筛阳性，转 AE 分级追问（腹泻）', overdue: '', executor: '', execDate: '', createDate: '2026-05-08 16:40:33', relatedEvent: '' },
    { id: 6, status: '待执行', patientId: 'PT-2602-0117', patientName: '王*兰', phone: '136****8830', planDate: '2026-05-09', taskType: 'PV/事件补充随访', product: '拓益（特瑞普利单抗注射液）', indication: '三阴乳腺癌', taskId: 'RW260509-0034', serviceSummary: '补充原事件用药错误环节信息', overdue: '', executor: '', execDate: '', createDate: '2026-05-08 10:15:47', relatedEvent: 'EV-2026-0040' },
    { id: 15, status: '待执行', patientId: 'PT-2602-0117', patientName: '王*兰', phone: '136****8830', planDate: '2026-05-09', taskType: '特殊情形/质量投诉处理', product: '拓益（特瑞普利单抗注射液）', indication: '三阴乳腺癌', taskId: 'RW260509-0039', serviceSummary: '跟进患者反馈外包装破损投诉（关联 EV-2026-0047）', overdue: '', executor: '', execDate: '', createDate: '2026-05-09 09:05:11', relatedEvent: 'EV-2026-0047' },
    { id: 7, status: '已完成', patientId: 'PT-2603-0142', patientName: '杨*英', phone: '158****9217', planDate: '2026-05-08', taskType: '周期治疗/复诊随访', product: '拓益（特瑞普利单抗注射液）', indication: '非小细胞肺癌', taskId: 'RW260508-0027', serviceSummary: '复诊前周期随访（复诊日 2026-05-11）', overdue: '', executor: '许琳', execDate: '2026-05-08 15:20:41', createDate: '2026-05-06 09:00:12', relatedEvent: '' },
    { id: 8, status: '已完成', patientId: 'PT-2604-0155', patientName: '赵*军', phone: '150****3386', planDate: '2026-05-08', taskType: '复诊记录提交', product: '拓益（特瑞普利单抗注射液）', indication: '尿路上皮癌', taskId: 'RW260508-0028', serviceSummary: '患者端复诊记录（已按计划复诊）', overdue: '', executor: '患者本人', execDate: '2026-05-08 20:12:05', createDate: '2026-05-08 09:00:03', relatedEvent: '' },
    { id: 9, status: '待执行', patientId: 'PT-2605-0180', patientName: '吴*珍', phone: '135****7735', planDate: '2026-05-09', taskType: '项目说明与授权', product: '拓益（特瑞普利单抗注射液）', indication: '非小细胞肺癌', taskId: 'RW260509-0035', serviceSummary: '扫码进入项目，待完成授权问卷', overdue: '', executor: '', execDate: '', createDate: '2026-05-09 08:31:55', relatedEvent: '' },
    { id: 10, status: '待执行', patientId: 'PT-2604-0160', patientName: '黄*梅', phone: '186****5543', planDate: '2026-05-10', taskType: '退出/拒访管理', product: '拓益（特瑞普利单抗注射液）', indication: '头颈鳞癌', taskId: 'RW260510-0037', serviceSummary: '患者家属提出暂停电话随访，需确认联系限制', overdue: '', executor: '', execDate: '', createDate: '2026-05-08 17:02:19', relatedEvent: '' },
    { id: 11, status: '已完成', patientId: 'PT-2603-0126', patientName: '刘*海', phone: '135****3102', planDate: '2026-05-06', taskType: '周期治疗/复诊随访', product: '拓益（特瑞普利单抗注射液）', indication: '黑色素瘤', taskId: 'RW260506-0021', serviceSummary: '复诊前周期随访（安全性总筛阳性，已转 AE）', overdue: '', executor: '许琳', execDate: '2026-05-06 11:32:08', createDate: '2026-05-04 09:00:12', relatedEvent: 'EV-2026-0051' },
    { id: 12, status: '即将到期', patientId: 'PT-2602-0117', patientName: '王*兰', phone: '136****8830', planDate: '2026-05-10', taskType: '周期治疗/复诊随访', product: '拓益（特瑞普利单抗注射液）', indication: '三阴乳腺癌', taskId: 'RW260510-0038', serviceSummary: '复诊前周期随访（复诊日 2026-05-15）', overdue: '', executor: '', execDate: '', createDate: '2026-05-08 09:00:12', relatedEvent: '' },
    { id: 13, status: '执行失败', patientId: 'PT-2604-0171', patientName: '周*明', phone: '133****7918', planDate: '2026-05-07', taskType: '超期未治疗/未复诊召回', product: '拓益（特瑞普利单抗注射液）', indication: '胃癌', taskId: 'RW260507-0025', serviceSummary: '电话两次未接通，短信已送达未回复', overdue: '9', executor: '许琳', execDate: '2026-05-07 14:10:52', createDate: '2026-05-05 09:00:05', relatedEvent: '' },
    { id: 14, status: '已完成', patientId: 'PT-2601-0088', patientName: '张*芳', phone: '138****2201', planDate: '2026-04-18', taskType: '周期治疗/复诊随访', product: '拓益（特瑞普利单抗注射液）', indication: '非小细胞肺癌', taskId: 'RW260418-0011', serviceSummary: '复诊前周期随访（复诊日 2026-04-21）', overdue: '', executor: '许琳', execDate: '2026-04-18 10:05:37', createDate: '2026-04-16 09:00:12', relatedEvent: '' }
];

// ============ 异常/AE 事件（PV 工作台，A3/A5） ============
// 状态机：待处理 → 已转PV → 已上报/需补充 → 已关闭
window.PSP_EVENTS = [
    {
        id: 'EV-2026-0051', patientId: 'PT-2603-0126', patientName: '刘*海', type: '不良事件AE', typeGroup: 'AE',
        summary: '腹泻 4 天，每日 3～4 次，无便血，未就医，自行服用止泻药', occurDate: '2026-05-05', reportDate: '2026-05-06',
        risk: '轻度/常规记录', status: '已上报', source: '专员随访', sourceTask: 'RW260506-0021', owner: '陈敏（项目经理）',
        four: {
            patient: '刘*海（PT-2603-0126），男，67 岁，黑色素瘤，北京大学肿瘤医院 黑色素瘤与肉瘤内科',
            reporter: '患者本人（电话随访获知），随访坐席 许琳 记录',
            event: '2026-05-05 起腹泻，每日 3～4 次，无便血/黑便，无发热，轻度影响进食；自行服用蒙脱石散，未就医；结局：持续中',
            product: '拓益（特瑞普利单抗注射液）240mg q3w 单药，首次用药 2026-01-09，最近一次用药 2026-04-28'
        },
        ctcae: '项目风险识别：轻度/常规记录线索（非 CTCAE 正式分级）',
        records: ['REC-2026-0088'],
        trail: [
            { time: '2026-05-06 11:35', operator: '许琳（随访坐席）', action: '创建异常记录', from: '', to: '待处理', remark: '周期随访安全性总筛阳性，AE 分级追问后生成，来源任务 RW260506-0021' },
            { time: '2026-05-06 14:02', operator: '陈敏（项目经理）', action: '标记已转PV', from: '待处理', to: '已转PV', remark: '四要素齐全，邮件转君实 PV 接口人（线下邮件，系统仅记录）' },
            { time: '2026-05-08 09:40', operator: '陈敏（项目经理）', action: '标记已上报', from: '已转PV', to: '已上报', remark: 'PV 回复已收录，无需补充，继续跟踪结局' }
        ]
    },
    {
        id: 'EV-2026-0049', patientId: 'PT-2603-0142', patientName: '杨*英', type: '不良事件AE', typeGroup: 'AE',
        summary: '躯干散在皮疹伴瘙痒 1 周，范围较前扩大，影响睡眠，未就医', occurDate: '2026-05-04', reportDate: '2026-05-06',
        risk: '关注跟进', status: '已转PV', source: '专员随访', sourceTask: 'RW260506-0022', owner: '陈敏（项目经理）',
        four: {
            patient: '杨*英（PT-2603-0142），女，60 岁，非小细胞肺癌，四川大学华西医院 肿瘤中心',
            reporter: '授权家属（女儿），随访坐席 许琳 记录',
            event: '2026-05-04 起躯干散在皮疹，瘙痒影响睡眠，范围较前扩大，无水疱/破溃/黏膜受累，自行涂抹炉甘石洗剂，未就医；结局：持续中',
            product: '拓益（特瑞普利单抗注射液）240mg q3w 单药维持，首次用药 2025-10-15，最近一次用药 2026-04-30'
        },
        ctcae: '项目风险识别：关注跟进线索（非 CTCAE 正式分级）',
        records: ['REC-2026-0090'],
        trail: [
            { time: '2026-05-06 15:12', operator: '许琳（随访坐席）', action: '创建异常记录', from: '', to: '待处理', remark: 'AE 即时随访任务完成后生成' },
            { time: '2026-05-07 10:26', operator: '陈敏（项目经理）', action: '标记已转PV', from: '待处理', to: '已转PV', remark: '已邮件转 PV 接口人，等待反馈是否需补充皮疹照片与用药记录' }
        ]
    },
    {
        id: 'EV-2026-0047', patientId: 'PT-2602-0117', patientName: '王*兰', type: '产品质量投诉', typeGroup: '质量投诉',
        summary: '患者发现药液瓶内可见异物（未使用），批号 TS260311', occurDate: '2026-05-07', reportDate: '2026-05-07',
        risk: '关注跟进', status: '待处理', source: '患者上报', sourceTask: '', owner: '陈敏（项目经理）',
        four: {
            patient: '王*兰（PT-2602-0117），女，51 岁，三阴乳腺癌，中山大学肿瘤防治中心 乳腺科',
            reporter: '患者本人，通过患者端质量投诉表单提交',
            event: '患者 2026-05-07 取药后发现西林瓶内可见细小异物，未使用，药品已封存保留；无不适主诉',
            product: '拓益（特瑞普利单抗注射液）240mg，批号 TS260311，有效期至 2027-02，发现地点：中山大学肿瘤防治中心药房取药窗口'
        },
        ctcae: '质量投诉·不伴AE',
        quality: {
            problemTypes: ['药品外观'], used: '未使用', withAE: false,
            batchNo: 'TS260311', expiry: '2027-02', foundAt: '2026-05-07 取药窗口', evidences: ['照片 2 张（患者端上传）', '取药记录 1 份'],
            route: '质量部门优先（边界不清时转 PV 初筛确认）'
        },
        records: [],
        trail: [
            { time: '2026-05-07 19:45', operator: '系统', action: '创建异常记录', from: '', to: '待处理', remark: '患者端质量投诉表单自动生成，事件编号唯一' }
        ]
    },
    {
        id: 'EV-2026-0045', patientId: 'PT-2604-0155', patientName: '赵*军', type: '产品质量投诉', typeGroup: '质量投诉',
        summary: '输液过程中发现输液管内有絮状物，输注后 2 小时出现发热寒战', occurDate: '2026-05-03', reportDate: '2026-05-04',
        risk: '快速/紧急', status: '已转PV', source: '专员随访', sourceTask: 'RW260504-0016', owner: '陈敏（项目经理）',
        four: {
            patient: '赵*军（PT-2604-0155），男，55 岁，尿路上皮癌，江苏省人民医院 泌尿外科',
            reporter: '授权家属（配偶），院内专员现场随访获知',
            event: '2026-05-03 院内输注过程中发现输液管内絮状物，停止输注并更换；输注后约 2 小时出现发热 38.6℃ 伴寒战，急诊对症处理后好转；结局：好转中',
            product: '拓益（特瑞普利单抗注射液）240mg，批号 TS260228，有效期至 2026-12，配液/输注地点：江苏省人民医院日间化疗中心'
        },
        ctcae: '质量投诉·伴AE（发热/寒战/感染样症状）',
        quality: {
            problemTypes: ['输液过程异常'], used: '已使用且出现不适', withAE: true,
            batchNo: 'TS260228', expiry: '2026-12', foundAt: '2026-05-03 日间化疗中心', evidences: ['照片 1 张', '急诊处理记录 1 份'],
            route: '质量＋PV 同步（伴AE，PV必复核）'
        },
        records: ['REC-2026-0085'],
        trail: [
            { time: '2026-05-04 09:18', operator: '王专员', action: '创建异常记录', from: '', to: '待处理', remark: '现场随访获知，伴 AE 症状，同步完成 AE 分级追问' },
            { time: '2026-05-04 11:52', operator: '陈敏（项目经理）', action: '标记已转PV', from: '待处理', to: '已转PV', remark: '伴AE，质量＋PV 同步：邮件转 PV 接口人并同步质量部门' }
        ]
    },
    {
        id: 'EV-2026-0043', patientId: 'PT-2603-0131', patientName: '陈*平', type: '妊娠/哺乳/父源暴露', typeGroup: '特殊情形',
        summary: '患者配偶确认妊娠 6 周，患者治疗期间，属父源暴露线索', occurDate: '2026-05-02', reportDate: '2026-05-05',
        risk: '关注跟进', status: '待处理', source: '专员随访', sourceTask: 'RW260505-0019', owner: '陈敏（项目经理）',
        four: {
            patient: '陈*平（PT-2603-0131），男，45 岁，鼻咽癌，中山大学肿瘤防治中心 鼻咽科',
            reporter: '患者本人，周期随访中主动告知',
            event: '患者配偶确认妊娠约 6 周；患者于治疗期间（2026-03-21 首次用药），属父源暴露情形；患者无不适；配偶产检暂未提示异常；同意后续妊娠结果随访',
            product: '拓益（特瑞普利单抗注射液）240mg q3w 联合吉西他滨+顺铂，暴露期间持续用药'
        },
        ctcae: '特殊情形·妊娠/哺乳/父源暴露（PV必复核）',
        records: ['REC-2026-0086'],
        trail: [
            { time: '2026-05-05 16:33', operator: '许琳（随访坐席）', action: '创建异常记录', from: '', to: '待处理', remark: '周期随访自然获知，按特殊情形分流记录（不解释妊娠风险，不提供医学建议）' }
        ]
    },
    {
        id: 'EV-2026-0040', patientId: 'PT-2602-0117', patientName: '王*兰', type: '用药错误', typeGroup: '特殊情形',
        summary: '居家储存温度超标（未放冰箱冷藏约 30 小时），药品未使用', occurDate: '2026-04-28', reportDate: '2026-05-08',
        risk: '关注跟进', status: '需补充', source: '患者上报', sourceTask: '', owner: '陈敏（项目经理）',
        four: {
            patient: '王*兰（PT-2602-0117），女，51 岁，三阴乳腺癌，中山大学肿瘤防治中心 乳腺科',
            reporter: '患者本人，站内消息上报',
            event: '患者将拓益药液带回家后未按要求 2-8℃ 冷藏，室温放置约 30 小时，药品未使用，已被拦截；是否可继续使用需专业判断',
            product: '拓益（特瑞普利单抗注射液）240mg，批号 TS260311，有效期至 2027-02'
        },
        ctcae: '特殊情形·用药错误（储存错误，PV初筛确认）',
        records: [],
        trail: [
            { time: '2026-05-08 09:55', operator: '系统', action: '创建异常记录', from: '', to: '待处理', remark: '患者站内消息上报，坐席电话核实后建案' },
            { time: '2026-05-08 10:15', operator: '陈敏（项目经理）', action: '标记已转PV', from: '待处理', to: '已转PV', remark: '邮件转 PV 接口人初筛' },
            { time: '2026-05-08 16:40', operator: '陈敏（项目经理）', action: '标记需补充', from: '已转PV', to: '需补充', remark: 'PV 要求补充：药品购入时间、室温放置环境温度、是否反复冻融；已自动生成补充随访任务 RW260509-0034' }
        ]
    },
    {
        id: 'EV-2026-0036', patientId: 'PT-2604-0171', patientName: '周*明', type: '缺乏疗效/疾病进展', typeGroup: '特殊情形',
        summary: '影像复查提示疾病进展，医生明确建议更换方案', occurDate: '2026-04-20', reportDate: '2026-04-22',
        risk: '轻度/常规记录', status: '已关闭', source: '专员随访', sourceTask: 'RW260421-0009', owner: '陈敏（项目经理）',
        four: {
            patient: '周*明（PT-2604-0171），男，71 岁，胃癌，天津医科大学肿瘤医院 胃部肿瘤科',
            reporter: '授权家属（儿子），专员电话随访获知',
            event: '2026-04-20 影像复查提示病灶增大，医生门诊明确提到疾病进展并建议更换治疗方案；无急诊/住院/死亡等严重后果',
            product: '拓益（特瑞普利单抗注射液）240mg q3w 联合奥沙利铂，首次用药 2025-09-11'
        },
        ctcae: '特殊情形·缺乏疗效/疾病进展（PV初筛确认）',
        records: ['REC-2026-0072'],
        trail: [
            { time: '2026-04-22 10:05', operator: '许琳（随访坐席）', action: '创建异常记录', from: '', to: '待处理', remark: '专员随访获知，依据医生门诊判断记录，不解释疗效' },
            { time: '2026-04-22 15:30', operator: '陈敏（项目经理）', action: '标记已转PV', from: '待处理', to: '已转PV', remark: '邮件转 PV 接口人初筛' },
            { time: '2026-04-25 09:12', operator: '陈敏（项目经理）', action: '标记已上报', from: '已转PV', to: '已上报', remark: 'PV 确认收录' },
            { time: '2026-04-28 14:00', operator: '陈敏（项目经理）', action: '标记已关闭', from: '已上报', to: '已关闭', remark: '结局明确（医生已调整方案），PV 确认结案' }
        ]
    }
];

// ============ 随访记录（患者360时间线/记录详情） ============
window.PSP_RECORDS = [
    { id: 'REC-2026-0092', patientId: 'PT-2601-0088', patientName: '张*芳', date: '2026-04-18 10:05', taskType: '周期治疗/复诊随访', taskId: 'RW260418-0011', executor: '许琳（随访坐席）', summary: '患者按医嘱治疗中，复查周期 q3w，最近一次已按时复查，下次复诊 2026-05-12 已预约。安全性总筛：未出现不适。脱落风险：无明显风险。' },
    { id: 'REC-2026-0091', patientId: 'PT-2603-0142', patientName: '杨*英', date: '2026-05-08 15:20', taskType: '周期治疗/复诊随访', taskId: 'RW260508-0027', executor: '许琳（随访坐席）', summary: '患者按医嘱治疗，皮疹较前好转（转 PV 事件 EV-2026-0049 跟进中），下次复诊 2026-05-11 已预约。脱落风险：低风险。' },
    { id: 'REC-2026-0090', patientId: 'PT-2603-0142', patientName: '杨*英', date: '2026-05-06 15:00', taskType: '异常症状/AE即时随访', taskId: 'RW260506-0022', executor: '许琳（随访坐席）', summary: '皮疹伴瘙痒 1 周，范围扩大影响睡眠，建议尽快联系医生并记录转 PV（EV-2026-0049），提醒勿抓破、勿自行乱涂药。', eventId: 'EV-2026-0049' },
    { id: 'REC-2026-0088', patientId: 'PT-2603-0126', patientName: '刘*海', date: '2026-05-06 11:32', taskType: '周期治疗/复诊随访', taskId: 'RW260506-0021', executor: '许琳（随访坐席）', summary: '患者腹泻 4 天，每日 3～4 次，无便血发热，自行服用止泻药，未就医。安全性总筛阳性，生成异常记录 EV-2026-0051（轻度/常规记录），建议症状加重或便血时尽快就医。', eventId: 'EV-2026-0051' },
    { id: 'REC-2026-0086', patientId: 'PT-2603-0131', patientName: '陈*平', date: '2026-05-05 16:30', taskType: '周期治疗/复诊随访', taskId: 'RW260505-0019', executor: '许琳（随访坐席）', summary: '患者治疗依从性良好；获知配偶妊娠 6 周（父源暴露），按特殊情形记录并生成 EV-2026-0043，患者同意后续妊娠结果随访。', eventId: 'EV-2026-0043' },
    { id: 'REC-2026-0085', patientId: 'PT-2604-0155', patientName: '赵*军', date: '2026-05-04 09:10', taskType: '特殊情形/质量投诉处理', taskId: 'RW260504-0016', executor: '王专员', summary: '输液管内絮状物（批号 TS260228），停止输注更换；输注后发热 38.6℃ 伴寒战，急诊处理后好转。质量＋PV 同步（EV-2026-0045）。', eventId: 'EV-2026-0045' },
    { id: 'REC-2026-0080', patientId: 'PT-2602-0117', patientName: '王*兰', date: '2026-04-25 14:40', taskType: '周期治疗/复诊随访', taskId: 'RW260425-0013', executor: '许琳（随访坐席）', summary: '患者按医嘱治疗，无明显不适，下次复诊 2026-05-15 已预约。脱落风险：无明显风险。' },
    { id: 'REC-2026-0072', patientId: 'PT-2604-0171', patientName: '周*明', date: '2026-04-22 09:55', taskType: '周期治疗/复诊随访', taskId: 'RW260421-0009', executor: '许琳（随访坐席）', summary: '影像复查提示疾病进展，医生建议更换方案（记录 EV-2026-0036）。患者情绪低落，已提供情感支持。', eventId: 'EV-2026-0036' },
    { id: 'REC-2026-0065', patientId: 'PT-2601-0088', patientName: '张*芳', date: '2026-03-28 09:30', taskType: '周期治疗/复诊随访', taskId: 'RW260328-0006', executor: '许琳（随访坐席）', summary: '患者整体状态较前相仿，饮食正常，按医嘱治疗，安全性总筛未出现异常。' },
    { id: 'REC-2026-0050', patientId: 'PT-2604-0155', patientName: '赵*军', date: '2026-05-08 20:12', taskType: '复诊记录提交', taskId: 'RW260508-0028', executor: '患者本人', summary: '患者端提交：已按计划复诊（2026-05-08），本次完成治疗用药，医生未调整方案，近期无不适，下次复诊 2026-05-20。' }
];

// ============ 短信/站内消息记录（A7） ============
window.PSP_SMS = [
    { id: 1, scene: '患者任务提醒', channel: '短信', receiver: '赵*军 150****3386', template: '复诊记录任务生成', content: '【益+同行】赵*军您好，您的复诊记录确认已生成，请点击项目平台链接用半分钟完成确认，谢谢配合。', sendTime: '2026-05-08 09:00:05', status: '已送达' },
    { id: 2, scene: '患者任务提醒', channel: '站内消息', receiver: '赵*军 150****3386', template: '复诊记录任务生成', content: '您有一条新的复诊记录任务，请在 3 天内完成提交。', sendTime: '2026-05-08 09:00:06', status: '已读' },
    { id: 3, scene: '复诊提醒', channel: '短信', receiver: '张*芳 138****2201', template: '复诊前 1 天提醒', content: '【益+同行】张*芳您好，提醒您明天（05-12）为计划复诊日，请携带既往检查与用药记录，按时前往复旦大学附属肿瘤医院肿瘤内科复诊。', sendTime: '2026-05-09 09:00:02', status: '已送达' },
    { id: 4, scene: '复诊提醒', channel: '短信', receiver: '李*强 139****7754', template: '复诊前 1 天提醒', content: '【益+同行】李*强您好，提醒您明天（05-10）为计划复诊日，请按时前往瑞金医院胸外科复诊。', sendTime: '2026-05-09 09:00:03', status: '已送达' },
    { id: 5, scene: '患者任务提醒', channel: '短信', receiver: '陈*平 137****6429', template: '授权完成·建档任务通知', content: '【益+同行】陈*平您好，您已完成项目授权，项目专员将于 3 日内与您联系完成建档，请保持电话畅通。', sendTime: '2026-05-08 14:22:10', status: '已读' },
    { id: 6, scene: '超期未提交提醒', channel: '短信', receiver: '周*明 133****7918', template: '患者任务超时未提交', content: '【益+同行】周*明您好，您的复诊记录确认已超时未提交，如有困难请联系项目服务人员 400-820-xxxx。', sendTime: '2026-05-02 09:00:04', status: '已送达' },
    { id: 7, scene: '补充随访提醒', channel: '站内消息', receiver: '王*兰 136****8830', template: 'PV/事件补充随访通知', content: '项目服务人员将于近期与您电话确认药品储存相关情况，请留意接听。', sendTime: '2026-05-08 16:41:00', status: '已读' },
    { id: 8, scene: '复诊提醒', channel: '短信', receiver: '杨*英 158****9217', template: '复诊前 3 天提醒', content: '【益+同行】杨*英您好，您 05-11 为计划复诊日，请提前完成挂号预约。', sendTime: '2026-05-08 09:00:02', status: '发送失败（空号风险）' },
    { id: 9, scene: '患者任务提醒', channel: '短信', receiver: '吴*珍 135****7735', template: '授权问卷填写提醒', content: '【益+同行】吴*珍您好，欢迎了解院内患者关爱项目，请点击链接完成项目说明与授权确认。', sendTime: '2026-05-09 08:32:00', status: '已送达' },
    { id: 10, scene: '复诊提醒', channel: '短信', receiver: '王*兰 136****8830', template: '复诊前 5 天提醒', content: '【益+同行】王*兰您好，您 05-15 为计划复诊日，项目服务人员将于近日电话随访，请留意接听。', sendTime: '2026-05-09 09:00:05', status: '已送达' }
];

// ============ 话术库（V0.4 话术列摘录，关联问题/场景） ============
window.PSP_SCRIPTS = [
    { id: 1, code: 'H101', title: '安全性总筛·开场确认', scene: '关联 Q48｜全部任务·每次', content: '我想再确认一下，最近身体有没有出现和平时不太一样的不舒服，或者有没有因为身体不适联系医生、去门诊、急诊或住院？', creator: '项目管理员', date: '2026-04-10' },
    { id: 2, code: 'H102', title: '安全性信息·事实记录边界', scene: '关联 Q51｜安全性总筛', content: '我先按您说的情况客观记录，不判断是不是药品导致。', creator: '项目管理员', date: '2026-04-10' },
    { id: 3, code: 'H103', title: 'AE 分级·腹泻腹痛追问', scene: '关联 Q60-62｜腹泻/腹痛/疑似结肠炎', content: '大便比平时多了几次？有没有腹痛、便血、发烧、口渴尿少，或者晚上也会腹泻？', creator: '项目管理员', date: '2026-04-10' },
    { id: 4, code: 'H104', title: 'AE 分级·呼吸道紧急提示', scene: '关联 Q66-68｜咳嗽/气短/疑似肺炎', content: '气短和胸闷需要重视，建议尽快联系医生或去医院评估。我会把情况按安全流程记录反馈。', creator: '项目管理员', date: '2026-04-10' },
    { id: 5, code: 'H105', title: 'AE 分级·心血管快速升级', scene: '关联 Q69-71｜胸闷/心慌/疑似心肌炎', content: '这个情况不要自己判断，建议尽快联系医生或急诊评估。我会立即按项目流程记录并转交专业团队。', creator: '项目管理员', date: '2026-04-10' },
    { id: 6, code: 'H106', title: 'AE 分级·肝功能线索提示', scene: '关联 Q75-77｜黄疸/肝功能异常', content: '这些情况建议尽快让医生看一下，尤其是眼黄、尿色很深或化验异常时，不要等下次随访。', creator: '项目管理员', date: '2026-04-10' },
    { id: 7, code: 'H107', title: '未按时复查·原因询问', scene: '关联 Q35｜治疗计划与复查管理', content: '方便说一下这次没有按时复查的主要原因吗？我只是帮您记录，不评价这个决定。', creator: '项目管理员', date: '2026-04-10' },
    { id: 8, code: 'H108', title: '自行停药·依从性干预', scene: '关联 Q42｜依从性与脱落风险干预', content: '如果是您这边自己延后、减量或停药，方便说一下主要原因吗？建议您也尽快和医生确认。', creator: '项目管理员', date: '2026-04-10' },
    { id: 9, code: 'H109', title: '质量投诉·分流口径', scene: '关联 Q90-93｜特殊情形/质量投诉', content: '请先不要自行判断能不能用，我们会记录情况并按质量/安全流程转交。不需要提供药品实物。', creator: '项目管理员', date: '2026-04-10' },
    { id: 10, code: 'H110', title: '超期召回·非恐吓式召回', scene: '超期未治疗/未复诊召回任务', content: '一直没联系上您，有点担心。按时复查能帮您和医生更好地掌握治疗情况，我帮您看看最近哪天方便安排？', creator: '项目管理员', date: '2026-04-10' },
    { id: 11, code: 'H111', title: '退出/拒访·尊重意愿', scene: '关联 Q110-111｜退出/拒访管理', content: '理解，我们尊重您的决定。我确认一下您希望停止哪类随访或联系，后续不会做不必要的打扰。', creator: '项目管理员', date: '2026-04-10' },
    { id: 12, code: 'H112', title: '紧急升级·就医提醒', scene: '关联 Q78｜紧急升级线索', content: '我先帮您记录清楚。这个情况建议尽快和医生确认；如果出现便血、剧烈腹痛或脱水，别等随访，直接去医院。', creator: '项目管理员', date: '2026-04-10' }
];

// ============ 报表/KPI 数据（A8） ============
window.PSP_KPI = {
    cards: [
        { label: '本月建档数', value: 23, unit: '人', change: '+6 vs 上月', icon: 'fa-id-card', color: '#409EFF' },
        { label: '随访完成率', value: '88.5%', unit: '', change: '+2.3%', icon: 'fa-circle-check', color: '#67C23A' },
        { label: '触达率', value: '96.2%', unit: '', change: '+0.8%', icon: 'fa-phone-volume', color: '#E6A23C' },
        { label: '超期未复诊率', value: '6.8%', unit: '', change: '-1.2%', icon: 'fa-calendar-xmark', color: '#F56C6C' },
        { label: '待处理AE', value: 3, unit: '件', change: '含 1 件快速/紧急', icon: 'fa-triangle-exclamation', color: '#F56C6C' },
        { label: 'AE 平均处理时效', value: '18.5', unit: '小时', change: '口径：建案→标记已转PV', icon: 'fa-stopwatch', color: '#722ed1' }
    ],
    week: {
        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        touchRate: [92, 95, 97, 96, 98, 90, 94],
        doneCount: [6, 8, 7, 9, 10, 4, 5],
        overdueCount: [1, 0, 1, 2, 0, 1, 0]
    },
    month: {
        labels: ['第1周', '第2周', '第3周', '第4周'],
        touchRate: [94, 96, 97, 96],
        doneCount: [38, 42, 45, 49],
        overdueCount: [3, 2, 2, 1]
    },
    aeTimeliness: [
        { label: 'EV-2026-0036', hours: 5.4, level: '轻度/常规记录' },
        { label: 'EV-2026-0040', hours: 0.3, level: '关注跟进' },
        { label: 'EV-2026-0045', hours: 2.6, level: '快速/紧急' },
        { label: 'EV-2026-0049', hours: 22.2, level: '关注跟进' },
        { label: 'EV-2026-0051', hours: 2.5, level: '轻度/常规记录' }
    ],
    taskTypeDist: [
        { label: '周期治疗/复诊随访', value: 96, color: '#409EFF' },
        { label: '复诊记录提交', value: 88, color: '#67C23A' },
        { label: '首触达建档', value: 23, color: '#E6A23C' },
        { label: '超期召回', value: 12, color: '#F56C6C' },
        { label: 'AE即时随访', value: 9, color: '#722ed1' },
        { label: '特殊情形/质量投诉', value: 6, color: '#13c2c2' },
        { label: 'PV补充随访', value: 4, color: '#eb2f96' },
        { label: '其他', value: 5, color: '#909399' }
    ]
};

// ============ 注入 MOCK_DATA（供通用列表页复用） ============
MOCK_DATA['scripts'].data = window.PSP_SCRIPTS;

MOCK_DATA['psp-rules'] = {
    columns: [
        { label: '任务类型', key: 'taskType' },
        { label: '任务类别', key: 'category' },
        { label: '触发规则说明', key: 'trigger' },
        { label: '关联表单', key: 'form' },
        { label: '提前提醒天数', key: 'remindDays' },
        { label: '执行天数', key: 'execDays' },
        { label: '状态', key: 'status' }
    ],
    data: window.PSP_RULES
};

MOCK_DATA['sms-records'] = {
    columns: [
        { label: '触发场景', key: 'scene' },
        { label: '渠道', key: 'channel' },
        { label: '接收人', key: 'receiver' },
        { label: '消息模板', key: 'template' },
        { label: '发送内容', key: 'content' },
        { label: '发送时间', key: 'sendTime' },
        { label: '状态', key: 'status' }
    ],
    data: window.PSP_SMS
};

// 覆写：随访任务（9 类）
MOCK_DATA['followup-task'] = {
    columns: [
        { label: '任务状态', key: 'status' },
        { label: '任务类型', key: 'taskType' },
        { label: '任务编号', key: 'taskId' },
        { label: '患者', key: 'patientName' },
        { label: '患者编号', key: 'patientId' },
        { label: '计划执行时间', key: 'planDate' },
        { label: '适应症', key: 'indication' },
        { label: '服务摘要', key: 'serviceSummary' },
        { label: '关联事件', key: 'relatedEvent' },
        { label: '超期天数', key: 'overdue' },
        { label: '执行人', key: 'executor' },
        { label: '执行时间', key: 'execDate' }
    ],
    data: window.PSP_TASKS
};

// 覆写：患者列表（PSP 字段）
MOCK_DATA['patient-list'] = {
    columns: [
        { label: '患者编号', key: 'patientId' },
        { label: '患者姓名', key: 'name' },
        { label: '首诊医院', key: 'hospital' },
        { label: '科室', key: 'dept' },
        { label: '癌种', key: 'indication' },
        { label: '治疗阶段', key: 'stage' },
        { label: '下次复诊日期', key: 'nextVisit' },
        { label: '脱落风险等级', key: 'riskLevel' },
        { label: '状态', key: 'medicationStatus' },
        { label: '联系电话', key: 'phone' }
    ],
    data: window.PSP_PATIENTS
};
