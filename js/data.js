const MOCK_DATA = {
    // 医院/医生/专员管理
    'hospital-manage-new': {
        columns: [
            { label: '医院名称', key: 'name' },
            { label: '地区', key: 'area' },
            { label: '级别', key: 'level' },
            { label: '状态', key: 'status' }
        ],
        data: [
            { id: 1, name: '浙江益药全德堂药房连锁有限公司杭州清吟街分公司', area: '浙江杭州', level: 'DTP药房', status: '启用' },
            { id: 2, name: '浙江益药全德堂药房连锁有限公司杭州解放路分公司', area: '浙江杭州', level: 'DTP药房', status: '启用' },
            { id: 3, name: '上药控股(宁波)大药房有限公司杏苑连锁店', area: '浙江宁波', level: 'DTP药房', status: '启用' },
            { id: 4, name: '陕西上药大药房有限公司第三分店', area: '陕西西安', level: 'DTP药房', status: '启用' },
            { id: 5, name: '上药控股（陕西）有限公司西安新特药大药房', area: '陕西西安', level: 'DTP药房', status: '启用' },
            { id: 6, name: '仁和药房网（北京）医药科技有限公司第四药房', area: '北京市', level: 'DTP药房', status: '启用' },
            { id: 7, name: '大连德信行润德堂大药房有限公司', area: '辽宁大连', level: 'DTP药房', status: '启用' },
            { id: 8, name: '吉林大格测试药房', area: '吉林长春', level: '内部测试', status: '停用' }
        ]
    },
    'doctor-manage': {
        columns: [
            { label: '医生姓名', key: 'name' },
            { label: '所属医院', key: 'hospital' },
            { label: '对应专员', key: 'specialist' },
            { label: '职称', key: 'title' },
            { label: '状态', key: 'status' }
        ],
        data: [
            { id: 1, name: '张医生', hospital: '瑞金医院', specialist: '王专员', title: '主任医师', status: '启用' },
            { id: 2, name: '李医生', hospital: '瑞金医院', specialist: '王专员', title: '副主任医师', status: '启用' },
            { id: 3, name: '王医生', hospital: '中山医院', specialist: '赵专员', title: '主任医师', status: '启用' }
        ]
    },
    'specialist-manage': {
        columns: [
            { label: '专员姓名', key: 'name' },
            { label: '账号', key: 'account' },
            { label: '手机号码', key: 'phone' },
            { label: '负责医生数', key: 'doctorCount' },
            { label: '状态', key: 'status' }
        ],
        data: [
            { id: 1, name: '王专员', account: 'specialist_01', phone: '13811112222', doctorCount: 2, status: '启用' },
            { id: 2, name: '赵专员', account: 'specialist_02', phone: '13933334444', doctorCount: 1, status: '启用' }
        ]
    },
    // 人员管理
    'group-staff': {
        columns: [
            { label: '编号', key: 'id' },
            { label: '姓名', key: 'name' },
            { label: '账号', key: 'account' },
            { label: '手机号码', key: 'phone' },
            { label: '创建时间', key: 'date' },
            { label: '是否停用', key: 'status' }
        ],
        data: [
            { id: 1077, name: '君实管理', account: 'JS_ADMIN', phone: '13800000000', date: '2026-03-24 15:16:13', status: '启用' }
        ]
    },
    'followup-staff': {
        columns: [
            { label: '编号', key: 'id' },
            { label: '姓名', key: 'name' },
            { label: '账号', key: 'account' },
            { label: '手机号码', key: 'phone' },
            { label: '负责区域', key: 'area' },
            { label: '创建时间', key: 'date' },
            { label: '状态', key: 'status' }
        ],
        data: [
            { id: 1076, name: '张三', account: 'zhangsan', phone: '13811112222', area: '华东大区', date: '2026-02-25 09:20:27', status: '启用' },
            { id: 1075, name: '李四', account: 'lisi', phone: '13933334444', area: '华南大区', date: '2026-03-01 10:00:00', status: '启用' }
        ]
    },
    // 配置管理
    'role-manage': {
        columns: [
            { label: '角色名称', key: 'name' },
            { label: '描述', key: 'desc' },
            { label: '状态', key: 'status' }
        ],
        data: [
            { id: 1, name: '超级管理员', desc: '系统最高权限', status: '启用' },
            { id: 2, name: '随访人员', desc: '执行患者随访任务', status: '启用' },
            { id: 3, name: '随访主管', desc: '负责随访团队管理与统计', status: '启用' },
            { id: 4, name: '君实管理', desc: '君实侧项目管理权限', status: '启用' }
        ]
    },
    'base-data': {
        columns: [
            { label: '字典名称', key: 'name' },
            { label: '字典编码', key: 'code' },
            { label: '状态', key: 'status' }
        ],
        data: [
            { id: 1, name: '门店类型', code: 'SHOP_TYPE', status: '启用' }
        ]
    },
    'medical-dept': {
        columns: [
            { label: '科室名称', key: 'name' },
            { label: '所属医院', key: 'hospital' }
        ],
        data: [
            { id: 1, name: '风湿免疫科', hospital: '江苏省人民医院' }
        ]
    },
    'hospital-manage': {
        columns: [
            { label: '医院名称', key: 'name' },
            { label: '地区', key: 'area' },
            { label: '级别', key: 'level' }
        ],
        data: [
            { id: 1, name: '江苏省人民医院', area: '南京市', level: '三级甲等' }
        ]
    },
    'logs': {
        columns: [
            { label: '操作功能', key: 'func' },
            { label: '操作URL', key: 'url' },
            { label: '操作时间', key: 'time' },
            { label: '执行时间(ms)', key: 'duration' },
            { label: '登陆IP', key: 'ip' }
        ],
        data: [
            { id: 1, func: '登录', url: '/api/login', time: '2026-04-23 20:30:00', duration: 150, ip: '127.0.0.1' }
        ]
    },
    // 项目管理
    'project-followup': {
        columns: [
            { label: '项目名称', key: 'name' },
            { label: '状态', key: 'status' },
            { label: '备注', key: 'remark' },
            { label: '创建人', key: 'creator' },
            { label: '创建时间', key: 'date' },
            { label: '更新人', key: 'updater' },
            { label: '更新时间', key: 'updateTime' }
        ],
        data: [
            { id: 1, name: '君实随访', status: '启用', remark: '', creator: '超级管理员', date: '2024-11-29 14:29:03', updater: '超级管理员', updateTime: '2024-11-29 14:29:10' }
        ]
    },
    'project-tag': {
        columns: [
            { label: '标签名', key: 'name' },
            { label: '标签分类', key: 'category' },
            { label: '标签使用类型', key: 'type' },
            { label: '项目名称', key: 'project' },
            { label: '产品', key: 'product' },
            { label: '适应症', key: 'indication' },
            { label: '标签自动生成分值', key: 'score' },
            { label: '状态', key: 'status' },
            { label: '创建人', key: 'creator' }
        ],
        data: [
            { id: 1, name: '没有合并症', category: '合并症', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '0', status: '启用', creator: '超级管理员' },
            { id: 2, name: '有合并症', category: '合并症', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '5', status: '启用', creator: '超级管理员' },
            { id: 3, name: '肾癌', category: '疾病信息', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '10', status: '启用', creator: '超级管理员' },
            { id: 4, name: '鼻咽癌', category: '疾病信息', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '10', status: '启用', creator: '超级管理员' },
            { id: 5, name: '食管癌', category: '疾病信息', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '10', status: '启用', creator: '超级管理员' },
            { id: 6, name: '尿路上皮癌', category: '疾病信息', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '10', status: '启用', creator: '超级管理员' },
            { id: 7, name: '小细胞肺癌', category: '疾病信息', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '10', status: '启用', creator: '超级管理员' },
            { id: 8, name: '非小细胞肺癌', category: '疾病信息', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '10', status: '启用', creator: '超级管理员' },
            { id: 9, name: '自行停药_其他原因', category: '用药行为', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '20', status: '启用', creator: '超级管理员' },
            { id: 10, name: '自行停药_异地不方便', category: '用药行为', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '15', status: '启用', creator: '超级管理员' },
            { id: 11, name: '自行停药_感觉治疗无效', category: '用药行为', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '25', status: '启用', creator: '超级管理员' },
            { id: 12, name: '自行停药_感觉已缓解', category: '用药行为', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '15', status: '启用', creator: '超级管理员' },
            { id: 13, name: '自行停药_副作用', category: '用药行为', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', score: '30', status: '启用', creator: '超级管理员' }
        ]
    },
    'questionnaire': {
        columns: [
            { label: '模块编号', key: 'code' },
            { label: '模块名', key: 'name' },
            { label: '模块内容', key: 'content' },
            { label: '项目名称', key: 'project' },
            { label: '状态', key: 'status' },
            { label: '创建人', key: 'creator' },
            { label: '创建时间', key: 'createDate' },
            { label: '更新人', key: 'updater' },
            { label: '更新时间', key: 'updateDate' }
        ],
        data: [
            { id: 1, code: 'CQ', name: '超期随访问卷', content: '', project: '君实随访', status: '启用', creator: '超级管理员', createDate: '2026-03-24 18:12:43', updater: '超级管理员', updateDate: '2026-03-24 18:15:00' },
            { id: 2, code: 'FG', name: '复购随访问卷', content: '', project: '君实随访', status: '启用', creator: '超级管理员', createDate: '2026-03-24 16:58:30', updater: '超级管理员', updateDate: '2026-03-24 16:59:00' },
            { id: 3, code: 'SC', name: '首次建档随访问卷', content: '', project: '君实随访', status: '启用', creator: '超级管理员', createDate: '2026-03-24 15:08:54', updater: '超级管理员', updateDate: '2026-03-24 15:10:00' }
        ]
    },
    'indications': {
        columns: [
            { label: '随访项目', key: 'project' },
            { label: '商品', key: 'product' },
            { label: '适应症', key: 'name' },
            { label: '状态', key: 'status' },
            { label: '创建人', key: 'creator' },
            { label: '创建时间', key: 'createDate' },
            { label: '更新人', key: 'updater' },
            { label: '更新时间', key: 'updateDate' }
        ],
        data: [

            { id: 7, project: '君实随访', product: '特瑞普利单抗注射液', name: '头颈鳞癌', status: '启用', creator: '超级管理员', createDate: '2026-03-24 12:04:07', updater: '超级管理员', updateDate: '2026-03-24 12:07:46' },
            { id: 8, project: '君实随访', product: '特瑞普利单抗注射液', name: '三阴乳腺癌', status: '启用', creator: '超级管理员', createDate: '2026-03-24 12:04:07', updater: '超级管理员', updateDate: '2026-03-24 12:07:47' },
            { id: 9, project: '君实随访', product: '特瑞普利单抗注射液', name: '淋巴瘤', status: '启用', creator: '超级管理员', createDate: '2026-03-24 12:04:07', updater: '超级管理员', updateDate: '2026-03-24 12:07:47' },
            { id: 10, project: '君实随访', product: '特瑞普利单抗注射液', name: '黑色素瘤', status: '启用', creator: '超级管理员', createDate: '2026-03-24 12:04:07', updater: '超级管理员', updateDate: '2026-03-24 12:07:48' },
            { id: 11, project: '君实随访', product: '特瑞普利单抗注射液', name: '肝癌', status: '启用', creator: '超级管理员', createDate: '2026-03-24 12:04:07', updater: '超级管理员', updateDate: '2026-03-24 12:07:48' }
        ]
    },
    'scripts': {
        columns: [
            { label: '编号', key: 'code' },
            { label: '话术标题', key: 'title' },
            { label: '话术', key: 'content' },
            { label: '关联项目', key: 'project' },
            { label: '商品名', key: 'productName' },
            { label: '商品通用名', key: 'genericName' },
            { label: '适应症', key: 'indication' },
            { label: '创建人', key: 'creator' },
            { label: '创建时间', key: 'date' }
        ],
        data: [
            {"id":1,"code":"QT13","title":"QT停药提问话术","content":"停药提问关键：了解患者停药的真实原因（副作用、经济压力、依从性等）。建议话术：“郭先生，注意到您最近没有按计划购药，请问是因为身体有什么不适，还是其他原因导致停药了呢？这对后续治疗方案的调整非常关键，请如实告知。”","project":"君实随访","productName":"拓益","genericName":"特瑞普利单抗注射液","indication":"非小细胞肺癌","creator":"超级管理员","date":"2026-03-24"},
            {"id":2,"code":"CD13","title":"CD停药提问话术","content":"停药提问关键：区分主动停药与医嘱停药。建议话术：“由于免疫治疗的疗程较长，中间停药可能会影响疗效。请问您是医生让您暂时停药观察，还是您自己感觉症状好转就停了？”","project":"君实随访","productName":"拓益","genericName":"特瑞普利单抗注射液","indication":"小细胞肺癌","creator":"超级管理员","date":"2026-03-24"},
            {"id":3,"code":"UC13","title":"UC停药提问话术","content":"停药提问关键：询问是否存在未识别的不良反应。建议话术：“除了瘙痒，您最近有没有觉得特别累、或者恶心呕吐的情况？有些副作用比较隐蔽，可能是导致您不想继续用药的原因。”","project":"君实随访","productName":"拓益","genericName":"特瑞普利单抗注射液","indication":"肾癌","creator":"超级管理员","date":"2026-03-24"},
            {"id":4,"code":"AS13","title":"副作用安抚话术","content":"建议话术：“郭先生，您反馈的皮肤瘙痒是免疫治疗中比较常见的轻度副作用，不要太担心。建议您局部涂抹一些温和的润肤霜，同时避免抓挠。如果瘙痒范围扩大或出现皮疹，请务必第一时间拍照发给我，并联系主治医生。”","project":"君实随访","productName":"拓益","genericName":"特瑞普利单抗注射液","indication":"尿路上皮癌","creator":"超级管理员","date":"2026-03-24"},
            {"id":5,"code":"PsA13","title":"复购引导话术","content":"建议话术：“您的下次用药时间快到了，为了保证体内药物浓度的稳定，建议您提前安排好购药计划。如果您在购药流程上有什么疑问，或者需要查询附近的药房，可以随时咨询我。”","project":"君实随访","productName":"拓益","genericName":"特瑞普利单抗注射液","indication":"食管癌","creator":"超级管理员","date":"2026-03-24"}
        ]
    },
    'sales-stats': {
        columns: [
            { label: '药房名称', key: 'pharmacy' },
            { label: '产品', key: 'product' },
            { label: '销售数量', key: 'count' },
            { label: '销售时间', key: 'date' }
        ],
        data: [
            { id: 1, pharmacy: '测试药房', product: '拓益', count: 10, date: '2026-04-23' }
        ]
    },
    'followup-rate': {
        columns: [
            { label: '月份', key: 'month' },
            { label: '随访总数', key: 'total' },
            { label: '完成数', key: 'completed' },
            { label: '完成率', key: 'rate' }
        ],
        data: [
            { id: 1, month: '2026-03', total: 100, completed: 85, rate: '85%' }
        ]
    },
    'patient-list': {
        columns: [
            { label: '创建时间', key: 'createTime' },
            { label: '患者姓名', key: 'name' },
            { label: '患者编号', key: 'patientId' },
            { label: '联系电话', key: 'phone' },
            { label: '性别', key: 'gender' },
            { label: '出生日期', key: 'birthDate' },
            { label: '现有适应症', key: 'indication' },
            { label: '首诊医院', key: 'hospital' }
        ],
        data: [
            { id: 1, createTime: '2026-01-14 09:44:19', name: '吴*珍', patientId: 'ff881b85-bf8b-4ce6...', phone: '135****7735', gender: '女', birthDate: '', indication: '非小细胞肺癌', hospital: '吉林大学第二医院', province: '', city: '', district: '', address: '' },
            { id: 2, createTime: '2026-01-14 09:44:19', name: '张*', patientId: 'ff4af52c-5894-45ed...', phone: '150****9660', gender: '男', birthDate: '', indication: '食管癌', hospital: '吉林大学第二医院', province: '', city: '', district: '', address: '' },
            { id: 3, createTime: '2026-01-14 09:44:19', name: '齐*', patientId: 'ff47c658-c93a-49fa...', phone: '135****5130', gender: '女', birthDate: '', indication: '鼻咽癌', hospital: '吉林大学第二医院', province: '', city: '', district: '', address: '' },
            { id: 4, createTime: '2026-01-14 09:44:19', name: '罗*凤', patientId: 'ff2425c1-69a9-404...', phone: '130****1167', gender: '女', birthDate: '', indication: '尿路上皮癌', hospital: '吉林省人民医院', province: '', city: '', district: '', address: '' },
            { id: 5, createTime: '2026-01-14 09:44:19', name: '阎*', patientId: 'ff13bf89-1b0e-4c57...', phone: '139****2098', gender: '男', birthDate: '', indication: '三阴乳腺癌', hospital: '吉林大学第二医院', province: '', city: '', district: '', address: '' },
            { id: 6, createTime: '2026-01-14 09:44:18', name: '付*娣', patientId: 'fe7b7ef9-25d5-4b4...', phone: '135****5666', gender: '女', birthDate: '2007-08-23', indication: '黑色素瘤', hospital: '吉林大学中日联谊医院', province: '', city: '', district: '', address: '' },
            { id: 7, createTime: '2026-01-14 09:44:18', name: '刘*海', patientId: 'fe677953-6f53-47d...', phone: '135****3102', gender: '男', birthDate: '', indication: '黑色素瘤', hospital: '吉林大学第二医院', province: '', city: '', district: '', address: '' },
            { id: 8, createTime: '2026-01-14 09:44:18', name: '冯*雪', patientId: 'fe4cbec8-420a-4efd...', phone: '183****2567', gender: '女', birthDate: '', indication: '结直肠癌', hospital: '吉林大学第二医院', province: '', city: '', district: '', address: '' },
            { id: 9, createTime: '2026-01-14 09:44:18', name: '逯*', patientId: 'fe1d81a0-0590-465...', phone: '180****6619', gender: '男', birthDate: '', indication: '肝癌', hospital: '吉林大学第二医院', province: '', city: '', district: '', address: '' }
        ]
    },
    'followup-task': {
        columns: [
            { label: '任务状态', key: 'status' },
            { label: '患者编号', key: 'patientId' },
            { label: '患者', key: 'patientName' },
            { label: '联系电话', key: 'phone' },
            { label: '计划执行时间', key: 'planDate' },
            { label: '首次购药时间', key: 'firstPurchase' },
            { label: '产品', key: 'product' },
            { label: '适应症', key: 'indication' },
            { label: '任务编号', key: 'taskId' },
            { label: '服务摘要', key: 'serviceSummary' },
            { label: '超期天数', key: 'overdue' },
            { label: '执行人', key: 'executor' },
            { label: '执行时间', key: 'execDate' },
            { label: '创建时间', key: 'createDate' }
        ],
        data: [
            { id: 1, status: '待执行', patientId: '3a7143ee-a7ba-40...', patientName: '郭*轩', phone: '139****3112', planDate: '2026-04-30', firstPurchase: '2024-02-19', product: '特瑞普利单抗注射液', indication: '非小细胞肺癌', taskId: 'F260420100005449', serviceSummary: '复购随访-1', overdue: '', executor: '', execDate: '', createDate: '2026-04-20 09:45:38' },
            { id: 2, status: '已完成', patientId: '3a7143ee-a7ba-40...', patientName: '郭*轩', phone: '139****3112', planDate: '2026-04-01', firstPurchase: '2024-02-19', product: '特瑞普利单抗注射液', indication: '小细胞肺癌', taskId: 'F260329100005181', serviceSummary: '召回随访', overdue: '', executor: '测试药师', execDate: '2026-04-03 15:06:49', createDate: '2026-03-29 03:00:00' },
            { id: 6, status: '已超期', patientId: '94b47460-0557-45...', patientName: '荆*', phone: '159****2121', planDate: '2026-01-15', firstPurchase: '2025-12-30', product: '特瑞普利单抗注射液', indication: '肾癌', taskId: 'F260115100002124', serviceSummary: '召回随访', overdue: '98', executor: '', execDate: '', createDate: '2026-01-10 10:00:00' },
            { id: 7, status: '即将到期', patientId: 'fe7b7ef9-25d5-4b4...', patientName: '付*娣', phone: '135****5666', planDate: '2026-04-25', firstPurchase: '2025-11-06', product: '特瑞普利单抗注射液', indication: '尿路上皮癌', taskId: 'F260122100002122', serviceSummary: '召回随访', overdue: '', executor: '', execDate: '', createDate: '2026-04-20 14:00:00' },
            { id: 8, status: '执行失败', patientId: 'a1d32247-b34b-46f...', patientName: '刘*宏', phone: '130****6562', planDate: '2026-03-20', firstPurchase: '2025-11-05', product: '特瑞普利单抗注射液', indication: '胃癌', taskId: 'F260320100002121', serviceSummary: '复购随访', overdue: '', executor: '王药师', execDate: '2026-03-21 11:00:00', createDate: '2026-03-15 09:00:00' },
            { id: 3, status: '已完成', patientId: 'cabb7523-21c1-40a...', patientName: '高*星', phone: '133****9515', planDate: '2026-03-26', firstPurchase: '2024-07-16', product: '特瑞普利单抗注射液', indication: '结直肠癌', taskId: 'F260323100005104', serviceSummary: '召回随访', overdue: '', executor: '测试药师', execDate: '2026-03-27 22:12:13', createDate: '2026-03-23 03:00:01' }
        ]
    },
    'satisfaction-report': {
        columns: [
            { label: '评价时间', key: 'time' },
            { label: '患者姓名', key: 'patient' },
            { label: '专员评价', key: 'specialistScore' },
            { label: '专员姓名', key: 'specialistName' },
            { label: '中心评价', key: 'centerScore' },
            { label: '评价内容', key: 'content' }
        ],
        data: [
            { id: 1, time: '2026-04-26 14:20:00', patient: '吴*珍', specialistScore: 5, specialistName: '王专员', centerScore: 5, content: '非常感谢专员的指导，随访很及时。' },
            { id: 2, time: '2026-04-25 10:15:00', patient: '张*', specialistScore: 4, specialistName: '王专员', centerScore: 5, content: '服务态度很好，就是回访电话稍微有点晚。' },
            { id: 3, time: '2026-04-24 16:30:00', patient: '齐*', specialistScore: 5, specialistName: '赵专员', centerScore: 4, content: '随访中心的服务很专业，非常有帮助。' }
        ]
    },
    'message-manage': {
        columns: [
            { label: '患者', key: 'patientName' },
            { label: '最近消息', key: 'lastMsg' },
            { label: '时间', key: 'time' },
            { label: '状态', key: 'status' }
        ],
        data: [
            { id: 1, patientName: '郭*轩', lastMsg: '我想咨询下关于特瑞普利单抗的副作用', time: '2026-04-27 10:30', status: '未回复', history: [
                { role: 'patient', content: '您好，我最近打完药感觉皮肤有点痒。', time: '2026-04-27 09:00' },
                { role: 'helper', content: '郭先生您好，皮疹是免疫治疗常见的反应，请问痒的面积大吗？有没有红肿？', time: '2026-04-27 09:05' },
                { role: 'patient', content: '面积不算大，就是局部几个点，我想咨询下关于特瑞普利单抗的副作用。', time: '2026-04-27 10:30' }
            ]},
            { id: 2, patientName: '吴*珍', lastMsg: '好的，谢谢医生', time: '2026-04-26 15:20', status: '已回复', history: [
                { role: 'patient', content: '请问下次随访是什么时候？', time: '2026-04-26 15:00' },
                { role: 'helper', content: '吴女士，您的下次计划随访时间是5月10日，届时我们会电话联系您。', time: '2026-04-26 15:15' },
                { role: 'patient', content: '好的，谢谢医生', time: '2026-04-26 15:20' }
            ]}
        ]
    },
    'complaint-manage': {
        columns: [
            { label: '投诉时间', key: 'time' },
            { label: '患者姓名', key: 'patient' },
            { label: '投诉对象', key: 'target' },
            { label: '投诉内容', key: 'content' },
            { label: '状态', key: 'status' }
        ],
        data: [
            { id: 1, time: '2026-04-30 14:10:00', patient: '李*强', target: '项目专员', content: '专员回复消息比较慢，希望可以改进。', status: '待处理' },
            { id: 2, time: '2026-04-29 09:30:00', patient: '王*平', target: '随访中心', content: '咨询电话打了几次才通。', status: '已处理' }
        ]
    },
    'consent-version': {
        columns: [
            { label: '版本号', key: 'version' },
            { label: '版本名称', key: 'name' },
            { label: '适用项目', key: 'project' },
            { label: '状态', key: 'status' },
            { label: '创建时间', key: 'createTime' }
        ],
        data: [
            { id: 1, version: 'V1.0', name: '拓益知情同意书 V1.0', project: '拓益（特瑞普利单抗注射液）', status: '已发布', createTime: '2025-01-15', content: '本知情同意书旨在告知您关于特瑞普利单抗（拓益）治疗的相关信息。\n\n一、治疗目的\n特瑞普利单抗是一种程序性死亡受体1（PD-1）抑制剂，用于治疗多种恶性肿瘤。\n\n二、治疗方案\n根据您的病情，医生将为您制定个性化的治疗方案，包括用药剂量、给药频率及疗程。\n\n三、可能的风险与不良反应\n1. 免疫相关不良反应：包括皮疹、腹泻、肝功能异常、肺炎等。\n2. 输液反应：可能出现发热、寒战、低血压等症状。\n3. 内分泌系统异常：甲状腺功能异常、肾上腺功能不全等。\n\n四、患者权利\n您有权在任何时候退出治疗，退出不会影响您获得其他医疗服务的权利。\n\n五、保密原则\n您的个人信息将严格保密，仅用于医疗目的。' },
            { id: 2, version: 'V1.1', name: '拓益知情同意书 V1.1', project: '拓益（特瑞普利单抗注射液）', status: '草稿', createTime: '2025-03-20', content: '本知情同意书（V1.1版）在V1.0基础上更新了不良反应描述及患者权利说明。\n\n一、治疗目的\n特瑞普利单抗是一种程序性死亡受体1（PD-1）抑制剂，适用于多种恶性肿瘤的治疗。\n\n二、更新内容\n本版本新增了关于心脏毒性的风险提示，以及患者随访要求的详细说明。\n\n三、患者确认\n我已阅读并理解上述内容，自愿参与治疗。' }
        ]
    }
};

const MENU_CONFIG = [
    {
        title: '随访任务',
        id: 'followup-task',
        children: []
    },
    {
        title: '患者列表',
        id: 'patient-list',
        children: []
    },
    {
        title: '基础信息管理',
        id: 'grant',
        children: [
            { title: '医院管理', id: 'hospital-manage-new' },
            { title: '医生管理', id: 'doctor-manage' },
            { title: '专员管理', id: 'specialist-manage' }
        ]
    },
    {
        title: '人员管理',
        id: 'staff',
        children: [
            { title: '集团人员', id: 'group-staff' },
            { title: '随访人员', id: 'followup-staff' }
        ]
    },
    {
        title: '配置管理',
        id: 'config',
        children: [
            { title: '角色管理', id: 'role-manage' },
            { title: '基础数据', id: 'base-data' },
            { title: '科室管理', id: 'medical-dept' },
            { title: '日志记录', id: 'logs' }
        ]
    },
    {
        title: '项目管理',
        id: 'project',
        children: [
            { title: '项目随访', id: 'project-followup' },
            { title: '项目标签', id: 'project-tag' },
            { title: '问卷模块', id: 'questionnaire' },
            { title: '项目适应症', id: 'indications' },
            { title: '项目话术', id: 'scripts' },
            { title: '随访率统计', id: 'followup-rate' },
            { title: '满意度报表', id: 'satisfaction-report' },
            { title: '留言管理', id: 'message-manage' },
            { title: '投诉管理', id: 'complaint-manage' }
        ]
    },
    {
        title: '患教管理',
        id: 'article-patient',
        children: []
    },
    {
        title: '培训管理',
        id: 'article-specialist',
        children: []
    },
    {
        title: '版本管理',
        id: 'consent-version',
        children: []
    }
];

// 文章管理分类配置
const ARTICLE_CATEGORIES = {
    'article-patient': ['疾病知识', '健康资讯', '专家讲座', '视频教育'],
    'article-specialist': ['岗位职责', 'SOP 培训', '疾病基础', '产品知识', '合规要求', 'AE/PV', '沟通技巧', '系统操作']
};

// 文章管理模拟数据
const ARTICLE_DATA = {
    'article-patient': [
        { id: 1, title: '免疫治疗常见不良反应及应对方法', category: '疾病知识', author: '张医生', status: '已发布', publishDate: '2026-04-20', views: 1256, content: '免疫治疗通过激活人体自身免疫系统来对抗肿瘤，是近年来肿瘤治疗领域的重大突破。\n\n常见不良反应包括：\n1. 皮肤反应：皮疹、瘙痒，发生率约20-30%\n2. 胃肠道反应：腹泻、结肠炎，需及时就医\n3. 内分泌异常：甲状腺功能异常，需定期监测\n4. 肝脏反应：转氨酶升高，治疗期间需定期检查肝功能\n\n应对建议：\n- 出现任何不适及时与主治医生沟通\n- 按时完成各项检查\n- 保持良好的生活习惯和心态' },
        { id: 2, title: '肿瘤患者日常饮食指南', category: '健康资讯', author: '营养科', status: '已发布', publishDate: '2026-04-18', views: 892, content: '合理的饮食对肿瘤患者的康复至关重要。\n\n推荐饮食原则：\n- 高蛋白：鱼、禽、蛋、豆制品\n- 多蔬果：每日蔬菜400g以上\n- 适量主食：粗细搭配\n- 充足水分：每日1500-2000ml\n\n治疗期间需避免：辛辣刺激、生冷食物、酒精、高糖食品。' },
        { id: 3, title: '非小细胞肺癌免疫治疗进展', category: '专家讲座', author: '李教授', status: '已发布', publishDate: '2026-04-15', views: 2103, content: '近年来，以PD-1/PD-L1抑制剂为代表的免疫检查点抑制剂在非小细胞肺癌治疗中取得了显著进展。\n\n多项临床研究表明，特瑞普利单抗联合化疗方案在晚期非小细胞肺癌一线治疗中显示出良好的疗效和安全性，显著延长了患者的无进展生存期（PFS）和总生存期（OS）。' },
        { id: 4, title: '免疫检查点抑制剂作用机制科普', category: '视频教育', author: '医学部', status: '已发布', publishDate: '2026-04-12', views: 3450, content: '免疫检查点抑制剂是一类通过阻断免疫检查点通路来恢复T细胞抗肿瘤活性的药物。\n\nPD-1是表达在T细胞表面的一种受体，当它与肿瘤细胞表面的PD-L1结合时，T细胞的杀伤功能被"刹车"。PD-1抑制剂通过阻断这一结合，释放免疫系统的"刹车"，使T细胞重新恢复对肿瘤的识别和杀伤能力。' },
        { id: 5, title: '肿瘤患者心理调适与康复指导', category: '健康资讯', author: '心理科', status: '已发布', publishDate: '2026-04-10', views: 675, content: '' },
        { id: 6, title: 'PD-1抑制剂治疗期间注意事项', category: '疾病知识', author: '王医生', status: '草稿', publishDate: '', views: 0, content: '' },
        { id: 7, title: '鼻咽癌免疫治疗最新研究解读', category: '专家讲座', author: '陈教授', status: '已发布', publishDate: '2026-04-08', views: 1890, content: '' },
        { id: 8, title: '化疗与免疫治疗联合方案介绍', category: '视频教育', author: '医学部', status: '草稿', publishDate: '', views: 0, content: '' },
        { id: 9, title: '肿瘤患者运动康复建议', category: '健康资讯', author: '康复科', status: '已发布', publishDate: '2026-04-05', views: 432, content: '' },
        { id: 10, title: '食管癌的早期症状与筛查', category: '疾病知识', author: '李医生', status: '已发布', publishDate: '2026-04-03', views: 1567, content: '' }
    ],
    'article-specialist': [
        { id: 1001, title: '临床项目专员 (Helper) 岗位职责说明书', category: '岗位职责', author: '培训部', status: '已发布', publishDate: '2024-04-25', views: 1250, content: '明确 Helper 在项目中的核心定位、职责范围及日常工作汇报线。' },
        { id: 1002, title: '项目专员月度考核指标 (KPI) 详解', category: '岗位职责', author: '培训部', status: '已发布', publishDate: '2024-04-20', views: 980, content: '深度解析入组率、随访及时率及数据准确性等关键考核维度的计算方法。' },
        { id: 1003, title: '现场入组 SOP：从扫码到签字的标准流程', category: 'SOP 培训', author: '培训部', status: '已发布', publishDate: '2024-04-22', views: 1560, content: '规范现场入组的每一步操作，确保知情同意书签署的合规性与资料上传的完整性。' },
        { id: 1004, title: '异常回流处理 SOP：AE 事件的识别与归档', category: 'SOP 培训', author: '培训部', status: '已发布', publishDate: '2024-04-18', views: 1120, content: '当系统触发异常回流时，专员应如何协助医生补充临床证据并完成数据上报。' },
        { id: 1, title: '常见肿瘤分期与治疗路径概述', category: '疾病基础', author: '医学部', status: '已发布', publishDate: '2026-04-22', views: 345, content: '肿瘤分期是评估肿瘤严重程度和制定治疗方案的重要依据。\n\nTNM分期系统：\n- T（Tumor）：原发肿瘤的大小和范围\n- N（Node）：区域淋巴结转移情况\n- M（Metastasis）：远处转移情况\n\n治疗路径通常包括：手术、放疗、化疗、靶向治疗、免疫治疗等，根据分期和患者状况制定个体化方案。' },
        { id: 2, title: '特瑞普利单抗注射液产品手册', category: '产品知识', author: '产品部', status: '已发布', publishDate: '2026-04-20', views: 567, content: '特瑞普利单抗注射液（商品名：拓益）是我国首个获批上市的国产PD-1单抗药物。\n\n获批适应症包括：鼻咽癌、黑色素瘤、尿路上皮癌、非小细胞肺癌、食管鳞癌等。\n\n用法用量：3mg/kg，每2周给药一次，静脉输注。\n\n储存条件：2-8°C避光保存。' },
        { id: 3, title: '患者随访过程中的合规注意事项', category: '合规要求', author: '合规部', status: '已发布', publishDate: '2026-04-18', views: 234, content: '' },
        { id: 4, title: '不良事件(AE)识别与上报流程', category: 'AE/PV', author: 'PV部门', status: '已发布', publishDate: '2026-04-16', views: 456, content: '不良事件（Adverse Event, AE）是指患者在使用药品期间出现的任何不良医学事件。\n\n上报流程：\n1. 发现AE后24小时内完成初始报告\n2. 严重AE（SAE）需在获知后15个日历日内上报\n3. 致死或危及生命的SAE需在7个日历日内快速报告\n4. 所有AE需持续跟踪至恢复或稳定' },
        { id: 5, title: '患者沟通话术与技巧培训', category: '沟通技巧', author: '培训部', status: '已发布', publishDate: '2026-04-14', views: 789, content: '' },
        { id: 6, title: '随访系统操作指南(v2.0)', category: '系统操作', author: '技术部', status: '已发布', publishDate: '2026-04-12', views: 1023, content: '' },
        { id: 7, title: '免疫相关不良反应(irAE)处理规范', category: 'AE/PV', author: 'PV部门', status: '已发布', publishDate: '2026-04-10', views: 678, content: '' },
        { id: 8, title: '拓益适应症及用法用量速查', category: '产品知识', author: '产品部', status: '草稿', publishDate: '', views: 0, content: '' },
        { id: 9, title: '患者隐私保护与数据安全规范', category: '合规要求', author: '合规部', status: '已发布', publishDate: '2026-04-06', views: 189, content: '' },
        { id: 10, title: '困难患者沟通场景模拟案例', category: '沟通技巧', author: '培训部', status: '已发布', publishDate: '2026-04-04', views: 534, content: '' },
        { id: 11, title: '肺癌免疫治疗生物标志物解读', category: '疾病基础', author: '医学部', status: '已发布', publishDate: '2026-04-02', views: 267, content: '' },
        { id: 12, title: '移动端数据录入与拍照上传教程', category: '系统操作', author: '技术部', status: '已发布', publishDate: '2026-03-30', views: 890, content: '' }
    ]
};

