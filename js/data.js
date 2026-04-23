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
            { id: 1, name: '上海交通大学医学院附属瑞金医院', area: '上海市', level: '三级甲等', status: '启用' },
            { id: 2, name: '复旦大学附属中山医院', area: '上海市', level: '三级甲等', status: '启用' }
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
            { label: '项目编号', key: 'code' },
            { label: '项目名', key: 'name' },
            { label: '状态', key: 'status' },
            { label: '创建人', key: 'creator' },
            { label: '创建时间', key: 'date' }
        ],
        data: [
            { id: 1, code: 'JS_001', name: '君实随访项目', status: '启用', creator: '超级管理员', date: '2026-03-24' }
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
            { label: '状态', key: 'status' },
            { label: '创建人', key: 'creator' }
        ],
        data: [
            { id: 1, name: '没有合并症', category: '合并症', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' },
            { id: 2, name: '有合并症', category: '合并症', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' },
            { id: 3, name: '肾癌', category: '疾病信息', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' },
            { id: 4, name: '鼻咽癌', category: '疾病信息', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' },
            { id: 5, name: '食管癌', category: '疾病信息', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' },
            { id: 6, name: '尿路上皮癌', category: '疾病信息', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' },
            { id: 7, name: '小细胞肺癌', category: '疾病信息', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' },
            { id: 8, name: '非小细胞肺癌', category: '疾病信息', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' },
            { id: 9, name: '自行停药_其他原因', category: '用药行为', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' },
            { id: 10, name: '自行停药_异地不方便', category: '用药行为', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' },
            { id: 11, name: '自行停药_感觉治疗无效', category: '用药行为', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' },
            { id: 12, name: '自行停药_感觉已缓解', category: '用药行为', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' },
            { id: 13, name: '自行停药_副作用', category: '用药行为', type: '产品专用', project: '君实随访', product: '特瑞普利单抗注射液', indication: '', status: '启用', creator: '超级管理员' }
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
            { id: 1, project: '君实随访', product: '特瑞普利单抗注射液', name: '非小细胞肺癌', status: '启用', creator: '超级管理员', createDate: '2026-03-24 12:04:07', updater: '超级管理员', updateDate: '2026-03-24 12:07:42' },
            { id: 2, project: '君实随访', product: '特瑞普利单抗注射液', name: '小细胞肺癌', status: '启用', creator: '超级管理员', createDate: '2026-03-24 12:04:07', updater: '超级管理员', updateDate: '2026-03-24 12:07:43' },
            { id: 3, project: '君实随访', product: '特瑞普利单抗注射液', name: '肾癌', status: '启用', creator: '超级管理员', createDate: '2026-03-24 12:04:07', updater: '超级管理员', updateDate: '2026-03-24 12:07:43' },
            { id: 4, project: '君实随访', product: '特瑞普利单抗注射液', name: '尿路上皮癌', status: '启用', creator: '超级管理员', createDate: '2026-03-24 12:04:07', updater: '超级管理员', updateDate: '2026-03-24 12:07:44' },
            { id: 5, project: '君实随访', product: '特瑞普利单抗注射液', name: '食管癌', status: '启用', creator: '超级管理员', createDate: '2026-03-24 12:04:07', updater: '超级管理员', updateDate: '2026-03-24 12:07:45' },
            { id: 6, project: '君实随访', product: '特瑞普利单抗注射液', name: '鼻咽癌', status: '启用', creator: '超级管理员', createDate: '2026-03-24 12:04:07', updater: '超级管理员', updateDate: '2026-03-24 12:07:45' },
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
            { id: 1, code: 'QT13', title: 'QT停药提问话术', content: '<p><strong>停药提问关键：了解患...</strong></p>', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '其他', creator: '超级管理员', date: '2026-03-24' },
            { id: 2, code: 'CD13', title: 'CD停药提问话术', content: '<p><strong>停药提问关键：了解患...</strong></p>', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '克罗恩病(CD)', creator: '超级管理员', date: '2026-03-24' },
            { id: 3, code: 'UC13', title: 'UC停药提问话术', content: '<p><strong>停药提问关键：了解患...</strong></p>', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '溃疡性结肠炎(UC)', creator: '超级管理员', date: '2026-03-24' },
            { id: 4, code: 'AS13', title: 'AS停药提问话术', content: '<p><strong>停药提问关键：了解患...</strong></p>', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '强直性脊柱炎(AS)', creator: '超级管理员', date: '2026-03-24' },
            { id: 5, code: 'PsA13', title: 'PsA停药提问话术', content: '<p><strong>停药提问关键：了解患...</strong></p>', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '银屑病关节炎(PsA)', creator: '超级管理员', date: '2026-03-24' },
            { id: 6, code: 'RA13', title: 'RA停药提问话术', content: '<p><strong>停药提问关键：了解患...</strong></p>', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '类风湿性关节炎(RA)', creator: '超级管理员', date: '2026-03-24' },
            { id: 7, code: 'AD13', title: 'AD停药提问话术', content: '<p><strong>停药提问关键：了解患...</strong></p>', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '特应性皮炎(AD)', creator: '超级管理员', date: '2026-03-24' },
            { id: 8, code: 'QT12', title: 'QT减量提问话术', content: '<p><strong>减量提问关键：了解患...</strong></p>', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '其他', creator: '超级管理员', date: '2026-03-24' }
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
            { id: 1, pharmacy: '测试药房', product: '瑞福', count: 10, date: '2026-04-23' }
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
    }
};

const MENU_CONFIG = [
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
            { title: '随访率统计', id: 'followup-rate' }
        ]
    }
];
