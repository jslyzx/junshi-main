const fs = require('fs');
let content = fs.readFileSync('e:/OneDrive/君实/demos/main/js/data.js', 'utf8');

const newScriptsData = [
    { id: 1, code: 'QT13', title: 'QT停药提问话术', content: '停药提问关键：了解患者停药的真实原因（副作用、经济压力、依从性等）。建议话术：“郭先生，注意到您最近没有按计划购药，请问是因为身体有什么不适，还是其他原因导致停药了呢？这对后续治疗方案的调整非常关键，请如实告知。”', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '非小细胞肺癌', creator: '超级管理员', date: '2026-03-24' },
    { id: 2, code: 'CD13', title: 'CD停药提问话术', content: '停药提问关键：区分主动停药与医嘱停药。建议话术：“由于免疫治疗的疗程较长，中间停药可能会影响疗效。请问您是医生让您暂时停药观察，还是您自己感觉症状好转就停了？”', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '小细胞肺癌', creator: '超级管理员', date: '2026-03-24' },
    { id: 3, code: 'UC13', title: 'UC停药提问话术', content: '停药提问关键：询问是否存在未识别的不良反应。建议话术：“除了瘙痒，您最近有没有觉得特别累、或者恶心呕吐的情况？有些副作用比较隐蔽，可能是导致您不想继续用药的原因。”', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '肾癌', creator: '超级管理员', date: '2026-03-24' },
    { id: 4, code: 'AS13', title: '副作用安抚话术', content: '建议话术：“郭先生，您反馈的皮肤瘙痒是免疫治疗中比较常见的轻度副作用，不要太担心。建议您局部涂抹一些温和的润肤霜，同时避免抓挠。如果瘙痒范围扩大或出现皮疹，请务必第一时间拍照发给我，并联系主治医生。”', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '尿路上皮癌', creator: '超级管理员', date: '2026-03-24' },
    { id: 5, code: 'PsA13', title: '复购引导话术', content: '建议话术：“您的下次用药时间快到了，为了保证体内药物浓度的稳定，建议您提前安排好购药计划。如果您在购药流程上有什么疑问，或者需要查询附近的药房，可以随时咨询我。”', project: '君实随访', productName: '拓益', genericName: '特瑞普利单抗注射液', indication: '食管癌', creator: '超级管理员', date: '2026-03-24' }
].map(item => '            ' + JSON.stringify(item)).join(',\n');

const regex = /('scripts':\s*\{[\s\S]*?data:\s*\[)([\s\S]*?)(\]\s*\})/g;
content = content.replace(regex, (match, p1, p2, p3) => {
    return p1 + '\n' + newScriptsData + '\n        ' + p3;
});

fs.writeFileSync('e:/OneDrive/君实/demos/main/js/data.js', content, 'utf8');
console.log('Fixed scripts data');
