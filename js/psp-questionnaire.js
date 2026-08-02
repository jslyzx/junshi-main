// 拓益随访问卷库 V0.4（9类任务 / 14模块 / 131题）——由《君实PSP项目随访表单V0.4.xlsx》生成
window.PSP_MODULES = [
 {
  "id": 1,
  "name": "建档信息确认",
  "desc": "随访编号、日期、执行人、患者编号、医院、科室等系统字段",
  "freq": "全部任务/每次",
  "everyTime": true
 },
 {
  "id": 2,
  "name": "项目授权与沟通偏好",
  "desc": "项目说明、参与意愿、联系方式、首选联系时间、拒绝原因、下次治疗/复诊初步时间",
  "freq": "项目说明与授权/一次性",
  "everyTime": false
 },
 {
  "id": 3,
  "name": "基础疾病与治疗信息",
  "desc": "癌种、治疗阶段、方案类别、首次用药时间、既往史、合并用药、院内确认下次计划",
  "freq": "首触达建档/一次性",
  "everyTime": false
 },
 {
  "id": 4,
  "name": "一般状态打开话匣",
  "desc": "整体身体状态、体重、饮食、活动等",
  "freq": "常规随访/每次",
  "everyTime": false
 },
 {
  "id": 5,
  "name": "治疗计划与复查管理",
  "desc": "下次治疗/复诊时间、复查周期、预约状态、复查结果",
  "freq": "常规随访/每次",
  "everyTime": false
 },
 {
  "id": 6,
  "name": "依从性与脱落风险干预",
  "desc": "是否按医嘱、延期/减量/停药原因、是否联系医生、召回动作",
  "freq": "常规随访/每次",
  "everyTime": false
 },
 {
  "id": 7,
  "name": "安全性总筛",
  "desc": "是否有不适、检查异常、门急诊/住院或医生提示",
  "freq": "全部任务/每次",
  "everyTime": true
 },
 {
  "id": 8,
  "name": "AE基础信息与风险分级",
  "desc": "症状分类、发生时间、严重程度、处理、结局及分级追问",
  "freq": "条件触发",
  "everyTime": false
 },
 {
  "id": 9,
  "name": "特殊情形/PV分流",
  "desc": "妊娠、用药错误、质量投诉、缺乏疗效、误用/暴露等",
  "freq": "条件触发",
  "everyTime": false
 },
 {
  "id": 10,
  "name": "事件补充与结局更新",
  "desc": "好转、持续、加重、就医、住院、医生处理、检查诊断",
  "freq": "事件触发",
  "everyTime": false
 },
 {
  "id": 11,
  "name": "退出/拒访管理",
  "desc": "退出类型、退出/拒访原因、联系限制、当次安全性信息及执行记录",
  "freq": "退出/拒访管理",
  "everyTime": false
 },
 {
  "id": 12,
  "name": "患者关切/其他",
  "desc": "费用、疾病咨询、不良反应处理、医保或援助政策等",
  "freq": "常规随访/每次",
  "everyTime": false
 },
 {
  "id": 13,
  "name": "随访小结",
  "desc": "本次有效性、依从性、安全性、服务动作及下次重点",
  "freq": "全部任务/每次",
  "everyTime": true
 },
 {
  "id": 14,
  "name": "复诊记录提交（患者端）",
  "desc": "患者端填报：是否按计划复诊、实际复诊日期、治疗完成情况、医嘱变化、复查结果、不适线索、下次时间",
  "freq": "复诊记录提交/每周期",
  "everyTime": false
 }
];

window.PSP_QUESTIONS = [
 {
  "no": 1,
  "module": "建档信息确认",
  "content": "项目随访号",
  "type": "system",
  "required": "required",
  "script": "由系统生成或带入，专员核对，无需向患者提问。",
  "desc": "项目随访号",
  "jump": "由系统生成或获取，不作为人工随访问题",
  "options": []
 },
 {
  "no": 2,
  "module": "建档信息确认",
  "content": "本次随访日期",
  "type": "system",
  "required": "required",
  "script": "由系统生成，专员核对，无需向患者提问。",
  "desc": "本次随访日期",
  "jump": "由系统生成，可人工校正",
  "options": []
 },
 {
  "no": 3,
  "module": "建档信息确认",
  "content": "执行人姓名",
  "type": "system",
  "required": "required",
  "script": "由系统带入当前执行人。",
  "desc": "执行人姓名",
  "jump": "专员/随访中心人员",
  "options": []
 },
 {
  "no": 4,
  "module": "建档信息确认",
  "content": "患者编号",
  "type": "system",
  "required": "required",
  "script": "使用项目脱敏ID，专员核对，不向患者重复询问。",
  "desc": "患者编号",
  "jump": "使用项目脱敏ID",
  "options": []
 },
 {
  "no": 5,
  "module": "建档信息确认",
  "content": "就诊医院",
  "type": "system",
  "required": "required",
  "script": "我先帮您核对一下就诊医院信息。",
  "desc": "就诊医院",
  "jump": "无跳转",
  "options": []
 },
 {
  "no": 6,
  "module": "建档信息确认",
  "content": "就诊科室",
  "type": "system",
  "required": "required",
  "script": "我先帮您核对一下就诊科室信息。",
  "desc": "就诊科室",
  "jump": "无跳转",
  "options": []
 },
 {
  "no": 7,
  "module": "建档信息确认",
  "content": "性别",
  "type": "system",
  "required": "required",
  "script": "由建档信息带入，专员核对。",
  "desc": "性别",
  "jump": "由建档信息带入，可校正",
  "options": []
 },
 {
  "no": 8,
  "module": "建档信息确认",
  "content": "年龄",
  "type": "system",
  "required": "required",
  "script": "由建档信息带入，专员核对。",
  "desc": "年龄",
  "jump": "由建档信息带入，可校正",
  "options": []
 },
 {
  "no": 9,
  "module": "建档信息确认",
  "content": "本次随访结果",
  "type": "radio",
  "required": "required",
  "script": "我先确认一下，本次随访是否已经完成。",
  "desc": "本次随访是否完成？",
  "jump": "选项3跳至随访小结；选项4跳至退出/拒访管理",
  "options": [
   {
    "text": "随访完成",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "部分完成",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "未联系到",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "患者拒绝随访",
    "sort": 4,
    "inSummary": true
   },
   {
    "text": "其他：_____",
    "sort": 5,
    "fill": true,
    "inSummary": true
   }
  ]
 },
 {
  "no": 10,
  "module": "建档信息确认",
  "content": "随访对象",
  "type": "radio",
  "required": "required",
  "script": "请问现在填写或接听的是患者本人，还是患者授权的家属？",
  "desc": "本次随访对象是谁？",
  "jump": "选项2-4继续填写与患者关系/身份",
  "options": [
   {
    "text": "患者本人",
    "sort": 1
   },
   {
    "text": "授权家属",
    "sort": 2,
    "triggers": [
     11
    ]
   },
   {
    "text": "医护人员",
    "sort": 3,
    "triggers": [
     11
    ]
   },
   {
    "text": "其他：_____",
    "sort": 4,
    "fill": true,
    "triggers": [
     11
    ]
   }
  ]
 },
 {
  "no": 11,
  "module": "建档信息确认",
  "content": "随访对象关系/身份",
  "type": "text",
  "required": "cond",
  "script": "请问您与患者是什么关系，方便我准确记录。",
  "desc": "请填写随访对象与患者的关系或身份",
  "jump": "随访对象为患者本人时不展开",
  "options": [],
  "trigger": {
   "q": 10,
   "anyOf": [
    "授权家属",
    "医护人员",
    "其他"
   ]
  }
 },
 {
  "no": 12,
  "module": "项目授权与沟通偏好",
  "content": "是否了解项目",
  "type": "radio",
  "required": "required",
  "script": "请确认您是否已经了解院内患者关爱项目的服务内容。",
  "desc": "您是否已了解院内患者关爱项目的服务内容？",
  "jump": "选项2-3先进行项目说明，再继续",
  "options": [
   {
    "text": "已了解",
    "sort": 1
   },
   {
    "text": "部分了解",
    "sort": 2
   },
   {
    "text": "不了解",
    "sort": 3
   }
  ]
 },
 {
  "no": 13,
  "module": "项目授权与沟通偏好",
  "content": "参与意愿",
  "type": "radio",
  "required": "required",
  "script": "请确认您是否愿意参加项目并接受后续随访。",
  "desc": "您是否愿意参加项目并接受后续随访？",
  "jump": "选项1继续填写联系偏好和下次计划，提交后生成“首触达建档”任务；选项2预约二次说明；选项3填写拒绝原因后结束",
  "options": [
   {
    "text": "愿意参加",
    "sort": 1
   },
   {
    "text": "先了解后决定",
    "sort": 2
   },
   {
    "text": "拒绝参加",
    "sort": 3,
    "triggers": [
     18
    ]
   }
  ]
 },
 {
  "no": 14,
  "module": "项目授权与沟通偏好",
  "content": "联系授权",
  "type": "radio",
  "required": "required",
  "script": "请确认您是否同意项目人员后续按约定方式联系您。",
  "desc": "您是否同意后续按约定方式联系？",
  "jump": "选项2-3记录限制条件",
  "options": [
   {
    "text": "同意",
    "sort": 1
   },
   {
    "text": "不同意",
    "sort": 2
   },
   {
    "text": "仅同意必要安全信息联系",
    "sort": 3
   }
  ]
 },
 {
  "no": 15,
  "module": "项目授权与沟通偏好",
  "content": "首选联系方式",
  "type": "checkbox",
  "required": "required",
  "script": "请选择您方便接收随访联系的方式。",
  "desc": "您首选的联系方式是？",
  "jump": "不通过个人微信接收敏感材料",
  "options": [
   {
    "text": "电话",
    "sort": 1
   },
   {
    "text": "短信",
    "sort": 2
   },
   {
    "text": "项目平台消息",
    "sort": 3
   },
   {
    "text": "其他：_____",
    "sort": 4,
    "fill": true
   }
  ]
 },
 {
  "no": 16,
  "module": "项目授权与沟通偏好",
  "content": "首选联系时间",
  "type": "radio",
  "required": "optional",
  "script": "请选择您方便接听随访电话的时间。",
  "desc": "您方便接听随访电话的时间是？",
  "jump": "无跳转",
  "options": [
   {
    "text": "工作日上午",
    "sort": 1
   },
   {
    "text": "工作日下午",
    "sort": 2
   },
   {
    "text": "晚间",
    "sort": 3
   },
   {
    "text": "周末",
    "sort": 4
   },
   {
    "text": "不限",
    "sort": 5
   },
   {
    "text": "其他：_____",
    "sort": 6,
    "fill": true
   }
  ]
 },
 {
  "no": 17,
  "module": "项目授权与沟通偏好",
  "content": "下次治疗/复诊初步时间",
  "type": "date",
  "required": "required",
  "script": "请选择您下次计划治疗或复诊的日期；如不确定，可先按医生告知的时间填写。",
  "desc": "请选择您下次计划治疗或复诊日期。",
  "jump": "患者端必填；授权完成后由专员在“首触达建档”时核对确认",
  "options": []
 },
 {
  "no": 18,
  "module": "项目授权与沟通偏好",
  "content": "拒绝参加原因",
  "type": "radio",
  "required": "cond",
  "script": "方便的话，请选择您暂不想参加的原因；我们尊重您的决定，后续不会做不必要的打扰。",
  "desc": "您拒绝参加项目的原因是？",
  "jump": "填写后进入随访小结，标记不生成首触达建档及常规随访任务",
  "options": [
   {
    "text": "不想被打扰",
    "sort": 1
   },
   {
    "text": "已转院",
    "sort": 2
   },
   {
    "text": "已停药",
    "sort": 3
   },
   {
    "text": "家属代管",
    "sort": 4
   },
   {
    "text": "暂不需要服务",
    "sort": 5
   },
   {
    "text": "其他：_____",
    "sort": 6,
    "fill": true
   }
  ],
  "trigger": {
   "q": 13,
   "anyOf": [
    "拒绝参加"
   ]
  }
 },
 {
  "no": 19,
  "module": "基础疾病与治疗信息",
  "content": "癌种/适应症",
  "type": "text",
  "required": "required",
  "script": "我先帮您核对一下疾病信息，主要是为了后续随访不漏掉关键节点。",
  "desc": "请核对并填写患者的癌种/适应症。",
  "jump": "按患者或院内记录填写",
  "options": []
 },
 {
  "no": 20,
  "module": "基础疾病与治疗信息",
  "content": "治疗阶段",
  "type": "radio",
  "required": "required",
  "script": "我帮您确认一下目前处于哪个治疗阶段。",
  "desc": "请核对患者目前的治疗阶段。",
  "jump": "无跳转",
  "options": [
   {
    "text": "初始治疗",
    "sort": 1
   },
   {
    "text": "维持治疗",
    "sort": 2
   },
   {
    "text": "复发或进展后治疗",
    "sort": 3
   },
   {
    "text": "术后辅助治疗",
    "sort": 4
   },
   {
    "text": "新辅助治疗",
    "sort": 5
   },
   {
    "text": "其他：_____",
    "sort": 6,
    "fill": true
   },
   {
    "text": "不清楚",
    "sort": 7
   }
  ]
 },
 {
  "no": 21,
  "module": "基础疾病与治疗信息",
  "content": "当前治疗方案",
  "type": "text",
  "required": "required",
  "script": "我帮您核对一下医生目前安排的治疗方案。",
  "desc": "请核对并填写患者当前的治疗方案。",
  "jump": "记录医生方案，不评价方案",
  "options": []
 },
 {
  "no": 22,
  "module": "基础疾病与治疗信息",
  "content": "首次使用拓益时间",
  "type": "month",
  "required": "required",
  "script": "我帮您核对一下首次使用拓益的时间，精确到年月即可。",
  "desc": "请核对患者首次使用拓益的时间（年月）。",
  "jump": "全渠道首次使用时间；不了解时记录院内可确认时间",
  "options": []
 },
 {
  "no": 23,
  "module": "基础疾病与治疗信息",
  "content": "本院首次治疗日期",
  "type": "date",
  "required": "optional",
  "script": "我帮您核对一下在本院首次接受本品治疗的日期。",
  "desc": "请核对患者在本院首次接受本品治疗的日期。",
  "jump": "无跳转",
  "options": []
 },
 {
  "no": 24,
  "module": "基础疾病与治疗信息",
  "content": "院内确认下次治疗/复诊日期",
  "type": "date",
  "required": "required",
  "script": "我根据院内信息和您刚才填写的时间，再确认一次下次治疗或复诊日期。",
  "desc": "专员根据院内信息或患者反馈，确认患者下次计划治疗或复诊日期。",
  "jump": "与患者端初步时间不一致时，以院内确认时间为准，并保留患者端填写记录",
  "options": []
 },
 {
  "no": 25,
  "module": "基础疾病与治疗信息",
  "content": "既往病史",
  "type": "checkbox",
  "required": "optional",
  "script": "我再核对一下既往疾病情况，只记录随访需要的信息。",
  "desc": "请核对患者既往是否有其他疾病史。",
  "jump": "无跳转",
  "options": [
   {
    "text": "无",
    "sort": 1
   },
   {
    "text": "心血管疾病",
    "sort": 2
   },
   {
    "text": "糖尿病",
    "sort": 3
   },
   {
    "text": "高血压",
    "sort": 4
   },
   {
    "text": "乙肝",
    "sort": 5
   },
   {
    "text": "感染/带状疱疹",
    "sort": 6
   },
   {
    "text": "肝肾功能异常",
    "sort": 7
   },
   {
    "text": "自身免疫性疾病",
    "sort": 8
   },
   {
    "text": "其他：_____",
    "sort": 9,
    "fill": true
   }
  ]
 },
 {
  "no": 26,
  "module": "基础疾病与治疗信息",
  "content": "合并用药情况",
  "type": "checkbox",
  "required": "optional",
  "script": "我再核对一下目前是否合并使用其他药物，避免遗漏需要提示医生了解的信息。",
  "desc": "请核对患者是否合并使用其他药物。",
  "jump": "无跳转",
  "options": [
   {
    "text": "未合并使用其他药物",
    "sort": 1
   },
   {
    "text": "抗生素",
    "sort": 2
   },
   {
    "text": "糖皮质激素",
    "sort": 3
   },
   {
    "text": "其他抗肿瘤药物",
    "sort": 4
   },
   {
    "text": "抗病毒药物",
    "sort": 5
   },
   {
    "text": "抗凝/抗血小板药物",
    "sort": 6
   },
   {
    "text": "免疫抑制剂",
    "sort": 7
   },
   {
    "text": "保健品",
    "sort": 8
   },
   {
    "text": "其他：_____",
    "sort": 9,
    "fill": true
   }
  ]
 },
 {
  "no": 27,
  "module": "基础疾病与治疗信息",
  "content": "建档信息完整度",
  "type": "radio",
  "required": "required",
  "script": "我最后核对一下，本次建档信息是否都已经确认完整。",
  "desc": "本次建档信息是否完整？",
  "jump": "选项2标记暂缓管理并设置复核节点，待信息补齐后完成建档",
  "options": [
   {
    "text": "信息完整",
    "sort": 1
   },
   {
    "text": "信息缺失/待院内确认",
    "sort": 2
   }
  ]
 },
 {
  "no": 28,
  "module": "一般状态打开话匣",
  "content": "近期整体状态",
  "type": "radio",
  "required": "optional",
  "script": "我先简单了解一下，您最近整体身体状态和之前相比怎么样？",
  "desc": "患者近期整体身体状态与之前相比如何？",
  "jump": "选项3-4提示关注安全性总筛",
  "options": [
   {
    "text": "差不多",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "比以前好",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "比以前差",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "不确定",
    "sort": 4,
    "inSummary": true
   }
  ]
 },
 {
  "no": 29,
  "module": "一般状态打开话匣",
  "content": "体重变化",
  "type": "radio",
  "required": "optional",
  "script": "最近体重有没有明显变化？大概增加还是减少？",
  "desc": "患者近期体重是否有明显变化？",
  "jump": "无跳转",
  "options": [
   {
    "text": "无显著变化",
    "sort": 1
   },
   {
    "text": "轻微浮动",
    "sort": 2
   },
   {
    "text": "明显增加",
    "sort": 3
   },
   {
    "text": "明显降低",
    "sort": 4
   },
   {
    "text": "不清楚",
    "sort": 5
   }
  ]
 },
 {
  "no": 30,
  "module": "一般状态打开话匣",
  "content": "近期饮食情况",
  "type": "radio",
  "required": "optional",
  "script": "最近吃饭情况怎么样？有没有食欲不好、吞咽困难或恶心呕吐影响进食？",
  "desc": "患者近期饮食情况如何？",
  "jump": "如伴明显异常，在安全性总筛中记录",
  "options": [
   {
    "text": "正常饮食",
    "sort": 1
   },
   {
    "text": "食欲不佳",
    "sort": 2
   },
   {
    "text": "吞咽困难",
    "sort": 3
   },
   {
    "text": "恶心呕吐影响进食",
    "sort": 4
   },
   {
    "text": "其他：_____",
    "sort": 5,
    "fill": true
   }
  ]
 },
 {
  "no": 31,
  "module": "一般状态打开话匣",
  "content": "近期活动/作息",
  "type": "radio",
  "required": "optional",
  "script": "最近活动、作息和睡眠情况有没有明显变化？",
  "desc": "患者近期活动或作息是否有变化？",
  "jump": "无跳转",
  "options": [
   {
    "text": "基本正常",
    "sort": 1
   },
   {
    "text": "活动减少",
    "sort": 2
   },
   {
    "text": "大部分时间卧床",
    "sort": 3
   },
   {
    "text": "睡眠明显受影响",
    "sort": 4
   },
   {
    "text": "其他：_____",
    "sort": 5,
    "fill": true
   }
  ]
 },
 {
  "no": 32,
  "module": "治疗计划与复查管理",
  "content": "医生确定的复查周期",
  "type": "radio",
  "required": "required",
  "script": "我确认一下，医生给您安排的复查周期是哪一种？",
  "desc": "患者当前的复查周期是？",
  "jump": "无跳转",
  "options": [
   {
    "text": "按治疗周期复查",
    "sort": 1
   },
   {
    "text": "月度复查",
    "sort": 2
   },
   {
    "text": "季度复查",
    "sort": 3
   },
   {
    "text": "半年度复查",
    "sort": 4
   },
   {
    "text": "其他周期：_____",
    "sort": 5,
    "fill": true
   },
   {
    "text": "不清楚",
    "sort": 6
   }
  ]
 },
 {
  "no": 33,
  "module": "治疗计划与复查管理",
  "content": "最近一次应复查日期",
  "type": "date",
  "required": "optional",
  "script": "请确认最近一次应该复查的日期。",
  "desc": "患者最近一次应复查日期是？",
  "jump": "无跳转",
  "options": []
 },
 {
  "no": 34,
  "module": "治疗计划与复查管理",
  "content": "最近是否按时复查",
  "type": "radio",
  "required": "required",
  "script": "最近这次复查是按时做了，还是计划往后延了？",
  "desc": "患者最近是否按时复查？",
  "jump": "选项3-4展开未按时复查原因",
  "options": [
   {
    "text": "暂未到复查日期",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "按时复查",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "有复查计划但推迟",
    "sort": 3,
    "inSummary": true,
    "triggers": [
     35
    ]
   },
   {
    "text": "不打算复查",
    "sort": 4,
    "inSummary": true,
    "triggers": [
     35
    ]
   },
   {
    "text": "不清楚",
    "sort": 5,
    "inSummary": true
   }
  ]
 },
 {
  "no": 35,
  "module": "治疗计划与复查管理",
  "content": "未按时/不复查原因",
  "type": "radio",
  "required": "cond",
  "script": "方便说一下这次没有按时复查的主要原因吗？我只是帮您记录，不评价这个决定。",
  "desc": "患者未按时复查或不打算复查的原因是？",
  "jump": "涉及身体不适或疗效问题时，安全性总筛选择“有”并展开",
  "options": [
   {
    "text": "有事耽搁",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "挂不到号",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "经济原因",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "病情稳定主动延后",
    "sort": 4,
    "inSummary": true
   },
   {
    "text": "感觉方案无效",
    "sort": 5,
    "inSummary": true
   },
   {
    "text": "身体不适或副作用",
    "sort": 6,
    "inSummary": true
   },
   {
    "text": "交通/外地",
    "sort": 7,
    "inSummary": true
   },
   {
    "text": "其他：_____",
    "sort": 8,
    "fill": true,
    "inSummary": true
   },
   {
    "text": "不清楚",
    "sort": 9,
    "inSummary": true
   }
  ],
  "trigger": {
   "q": 34,
   "anyOf": [
    "有复查计划但推迟",
    "不打算复查"
   ]
  }
 },
 {
  "no": 36,
  "module": "治疗计划与复查管理",
  "content": "下次复诊预约状态",
  "type": "radio",
  "required": "required",
  "script": "下次复诊或治疗现在已经预约好了吗？",
  "desc": "患者是否已预约下次复诊/治疗？",
  "jump": "选项2-3展开复诊困难",
  "options": [
   {
    "text": "已预约",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "未预约",
    "sort": 2,
    "inSummary": true,
    "triggers": [
     37
    ]
   },
   {
    "text": "正在预约",
    "sort": 3,
    "inSummary": true,
    "triggers": [
     37
    ]
   },
   {
    "text": "不清楚",
    "sort": 4,
    "inSummary": true
   }
  ]
 },
 {
  "no": 37,
  "module": "治疗计划与复查管理",
  "content": "复诊/治疗困难",
  "type": "checkbox",
  "required": "cond",
  "script": "目前在挂号、检查预约、交通或时间安排上有没有困难？如需，可提醒复查时携带既往检查和用药记录。",
  "desc": "患者复诊或治疗安排是否存在困难？",
  "jump": "不得承诺加号、优先就诊或检查预约",
  "options": [
   {
    "text": "无困难",
    "sort": 1
   },
   {
    "text": "挂号困难",
    "sort": 2
   },
   {
    "text": "检查预约困难",
    "sort": 3
   },
   {
    "text": "交通/外地",
    "sort": 4
   },
   {
    "text": "时间冲突",
    "sort": 5
   },
   {
    "text": "经济压力",
    "sort": 6
   },
   {
    "text": "其他：_____",
    "sort": 7,
    "fill": true
   }
  ],
  "trigger": {
   "q": 36,
   "anyOf": [
    "未预约",
    "正在预约"
   ]
  }
 },
 {
  "no": 38,
  "module": "治疗计划与复查管理",
  "content": "医嘱是否调整",
  "type": "radio",
  "required": "required",
  "script": "医生有没有调整这次治疗或复诊安排？",
  "desc": "医生是否调整了本次治疗或复诊安排？",
  "jump": "选项2记录调整内容；选项3进入依从性干预",
  "options": [
   {
    "text": "未调整",
    "sort": 1
   },
   {
    "text": "医生已调整",
    "sort": 2
   },
   {
    "text": "患者自行调整",
    "sort": 3
   },
   {
    "text": "不清楚",
    "sort": 4
   }
  ]
 },
 {
  "no": 39,
  "module": "依从性与脱落风险干预",
  "content": "当前医嘱用法用量",
  "type": "text",
  "required": "required",
  "script": "我帮您核对一下医生目前安排的用法用量。",
  "desc": "请记录患者当前医嘱用法用量",
  "jump": "按患者或院内可确认信息记录",
  "options": []
 },
 {
  "no": 40,
  "module": "依从性与脱落风险干预",
  "content": "患者治疗状态",
  "type": "radio",
  "required": "required",
  "script": "我想确认一下，您现在是按医嘱治疗，还是有延后、减量或停药的情况？",
  "desc": "患者目前的治疗状态是？",
  "jump": "选项2展开医嘱调整原因；选项3-5展开自行调整/停药原因；选项6进入脱落风险",
  "options": [
   {
    "text": "按医嘱治疗",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "遵医嘱调整",
    "sort": 2,
    "inSummary": true,
    "triggers": [
     41,
     43
    ]
   },
   {
    "text": "自行延后",
    "sort": 3,
    "inSummary": true,
    "triggers": [
     42,
     43
    ]
   },
   {
    "text": "自行减量",
    "sort": 4,
    "inSummary": true,
    "triggers": [
     42,
     43
    ]
   },
   {
    "text": "已停药",
    "sort": 5,
    "inSummary": true,
    "triggers": [
     42,
     43
    ]
   },
   {
    "text": "联系不上",
    "sort": 6,
    "inSummary": true
   },
   {
    "text": "不清楚",
    "sort": 7,
    "inSummary": true
   }
  ]
 },
 {
  "no": 41,
  "module": "依从性与脱落风险干预",
  "content": "医嘱调整原因",
  "type": "radio",
  "required": "cond",
  "script": "如果是医生调整的，医生是怎么交代的？我帮您按原话记录。",
  "desc": "患者遵医嘱调整、减量或停药的具体原因是？",
  "jump": "涉及不良反应时，安全性总筛选择“有”并展开",
  "options": [
   {
    "text": "疾病进展",
    "sort": 1
   },
   {
    "text": "疾病稳定",
    "sort": 2
   },
   {
    "text": "不良反应不耐受",
    "sort": 3
   },
   {
    "text": "身体机能不适",
    "sort": 4
   },
   {
    "text": "经济原因",
    "sort": 5
   },
   {
    "text": "更换治疗方案",
    "sort": 6
   },
   {
    "text": "其他：_____",
    "sort": 7,
    "fill": true
   },
   {
    "text": "不清楚",
    "sort": 8
   }
  ],
  "trigger": {
   "q": 40,
   "anyOf": [
    "遵医嘱调整"
   ]
  }
 },
 {
  "no": 42,
  "module": "依从性与脱落风险干预",
  "content": "自行调整/停药原因",
  "type": "radio",
  "required": "cond",
  "script": "如果是您这边自己延后、减量或停药，方便说一下主要原因吗？建议您也尽快和医生确认。",
  "desc": "患者自行延后、减量或停药的具体原因是？",
  "jump": "提醒患者联系医生确认，不替患者判断是否可延后",
  "options": [
   {
    "text": "挂不上号",
    "sort": 1
   },
   {
    "text": "经济原因",
    "sort": 2
   },
   {
    "text": "感觉病情稳定",
    "sort": 3
   },
   {
    "text": "感觉疗效不好",
    "sort": 4
   },
   {
    "text": "不良反应不耐受",
    "sort": 5
   },
   {
    "text": "交通/外地",
    "sort": 6
   },
   {
    "text": "家属决定",
    "sort": 7
   },
   {
    "text": "其他：_____",
    "sort": 8,
    "fill": true
   },
   {
    "text": "不清楚",
    "sort": 9
   }
  ],
  "trigger": {
   "q": 40,
   "anyOf": [
    "自行延后",
    "自行减量",
    "已停药"
   ]
  }
 },
 {
  "no": 43,
  "module": "依从性与脱落风险干预",
  "content": "是否已联系医生",
  "type": "radio",
  "required": "cond",
  "script": "这个调整或延期的情况，您已经联系医生确认过了吗？",
  "desc": "患者是否已就调整、延期或停药联系医生？",
  "jump": "未联系时提醒按医院流程咨询医生",
  "options": [
   {
    "text": "已联系",
    "sort": 1
   },
   {
    "text": "未联系",
    "sort": 2
   },
   {
    "text": "计划联系",
    "sort": 3
   },
   {
    "text": "不清楚",
    "sort": 4
   }
  ],
  "trigger": {
   "q": 40,
   "anyOf": [
    "遵医嘱调整",
    "自行延后",
    "自行减量",
    "已停药"
   ]
  }
 },
 {
  "no": 44,
  "module": "依从性与脱落风险干预",
  "content": "是否计划继续治疗",
  "type": "radio",
  "required": "required",
  "script": "接下来您是否仍计划继续治疗？",
  "desc": "患者是否仍计划继续治疗？",
  "jump": "选项2-3标记脱落风险",
  "options": [
   {
    "text": "是",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "否",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "不确定",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "本次未随访到",
    "sort": 4,
    "inSummary": true
   }
  ]
 },
 {
  "no": 45,
  "module": "依从性与脱落风险干预",
  "content": "脱落风险等级",
  "type": "radio",
  "required": "required",
  "script": "根据本次沟通情况，我按项目要求记录后续脱落风险。",
  "desc": "基于本次随访，患者脱落风险等级是？",
  "jump": "中高风险需制定召回动作",
  "options": [
   {
    "text": "无明显风险",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "低风险",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "中风险",
    "sort": 3,
    "inSummary": true,
    "triggers": [
     46
    ]
   },
   {
    "text": "高风险",
    "sort": 4,
    "inSummary": true,
    "triggers": [
     46
    ]
   },
   {
    "text": "无法判断",
    "sort": 5,
    "inSummary": true
   }
  ]
 },
 {
  "no": 46,
  "module": "依从性与脱落风险干预",
  "content": "脱落风险召回举措",
  "type": "checkbox",
  "required": "cond",
  "script": "我看看这次能帮您做哪些支持，比如提醒复查、记录不良反应或转项目经理协调。",
  "desc": "专员本次采取了哪些召回或支持动作？",
  "jump": "不得承诺治疗效果、加号或优先就诊",
  "options": [
   {
    "text": "解释按时复诊的重要性",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "协助识别不良反应并建议咨询医生",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "进行患者教育",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "协助了解支付/援助路径",
    "sort": 4,
    "inSummary": true
   },
   {
    "text": "提醒按医院流程挂号或预约",
    "sort": 5,
    "inSummary": true
   },
   {
    "text": "提供情感支持",
    "sort": 6,
    "inSummary": true
   },
   {
    "text": "转项目经理协调",
    "sort": 7,
    "inSummary": true
   },
   {
    "text": "其他：_____",
    "sort": 8,
    "fill": true,
    "inSummary": true
   }
  ],
  "trigger": {
   "q": 45,
   "anyOf": [
    "中风险",
    "高风险"
   ]
  }
 },
 {
  "no": 47,
  "module": "依从性与脱落风险干预",
  "content": "下次计划治疗/复诊日期",
  "type": "date",
  "required": "optional",
  "script": "我确认一下您下次计划治疗或复诊的日期，方便后续提醒。",
  "desc": "患者下次计划治疗或复诊日期是？",
  "jump": "用于更新下一随访任务",
  "options": []
 },
 {
  "no": 48,
  "module": "安全性总筛",
  "content": "是否出现安全性线索",
  "type": "radio",
  "required": "required",
  "script": "我想再确认一下，最近身体有没有出现和平时不太一样的不舒服，或者有没有因为身体不适联系医生、去门诊、急诊或住院？",
  "desc": "自上次随访以来，患者是否出现身体不适、检查异常，或因身体情况门诊、急诊、住院，或收到医生特别提示？",
  "jump": "系统默认展示“未出现”，但须主动确认后提交；选项2-3展开安全性信息分类；“未联系到”由Q9直接跳转随访小结",
  "options": [
   {
    "text": "未出现",
    "sort": 1,
    "inSummary": true,
    "default": true
   },
   {
    "text": "有",
    "sort": 2,
    "inSummary": true,
    "triggers": [
     49,
     50,
     51
    ]
   },
   {
    "text": "不确定",
    "sort": 3,
    "inSummary": true,
    "triggers": [
     49,
     50,
     51
    ]
   }
  ]
 },
 {
  "no": 49,
  "module": "安全性总筛",
  "content": "安全性信息分类",
  "type": "checkbox",
  "required": "cond",
  "script": "您刚才提到的情况，我帮您分一下类型，方便后续专业团队处理。",
  "desc": "本次获知的安全性信息属于哪类？",
  "jump": "选项1-3进入AE基础信息；选项4-8进入特殊情形；可同时选择",
  "options": [
   {
    "text": "身体不适/症状",
    "sort": 1,
    "inSummary": true,
    "triggers": [
     52,
     53,
     54,
     55,
     56,
     57,
     58,
     78,
     79,
     80,
     81
    ]
   },
   {
    "text": "检查异常",
    "sort": 2,
    "inSummary": true,
    "triggers": [
     52,
     53,
     54,
     55,
     56,
     57,
     58,
     78,
     79,
     80,
     81
    ]
   },
   {
    "text": "门诊/急诊/住院",
    "sort": 3,
    "inSummary": true,
    "triggers": [
     52,
     53,
     54,
     55,
     56,
     57,
     58,
     78,
     79,
     80,
     81
    ]
   },
   {
    "text": "妊娠/哺乳/父源暴露",
    "sort": 4,
    "inSummary": true,
    "triggers": [
     82
    ]
   },
   {
    "text": "用药错误",
    "sort": 5,
    "inSummary": true,
    "triggers": [
     82
    ]
   },
   {
    "text": "产品质量问题",
    "sort": 6,
    "inSummary": true,
    "triggers": [
     82
    ]
   },
   {
    "text": "缺乏疗效/疾病进展",
    "sort": 7,
    "inSummary": true,
    "triggers": [
     82
    ]
   },
   {
    "text": "误用/过量/相互作用/职业暴露",
    "sort": 8,
    "inSummary": true,
    "triggers": [
     82
    ]
   },
   {
    "text": "其他安全性信息",
    "sort": 9,
    "inSummary": true,
    "triggers": [
     82
    ]
   }
  ],
  "trigger": {
   "q": 48,
   "anyOf": [
    "有",
    "不确定"
   ]
  }
 },
 {
  "no": 50,
  "module": "安全性总筛",
  "content": "信息来源",
  "type": "radio",
  "required": "cond",
  "script": "请问这个情况是您本人反馈的，还是家属、医护人员提到的？",
  "desc": "本次安全性信息来源是？",
  "jump": "无跳转",
  "options": [
   {
    "text": "患者本人",
    "sort": 1
   },
   {
    "text": "授权家属",
    "sort": 2
   },
   {
    "text": "医护人员",
    "sort": 3
   },
   {
    "text": "项目人员发现",
    "sort": 4
   },
   {
    "text": "其他：_____",
    "sort": 5,
    "fill": true
   }
  ],
  "trigger": {
   "q": 48,
   "anyOf": [
    "有",
    "不确定"
   ]
  }
 },
 {
  "no": 51,
  "module": "安全性总筛",
  "content": "安全性信息简述",
  "type": "text",
  "required": "cond",
  "script": "我先按您说的情况客观记录，不判断是不是药品导致。",
  "desc": "请用报告人原话或客观事实简述本次安全性信息",
  "jump": "仅记录事实，不判断因果关系",
  "options": [],
  "trigger": {
   "q": 48,
   "anyOf": [
    "有",
    "不确定"
   ]
  }
 },
 {
  "no": 52,
  "module": "AE基础信息与风险分级",
  "content": "AE症状/事件描述",
  "type": "text",
  "required": "cond",
  "script": "您先别着急，我先帮您把不舒服的情况问清楚。具体是哪里不舒服？",
  "desc": "患者具体不适或异常是什么？请记录原话",
  "jump": "选择身体不适、检查异常或门急诊/住院后展开",
  "options": [],
  "trigger": {
   "q": 49,
   "anyOf": [
    "身体不适/症状",
    "检查异常",
    "门诊/急诊/住院"
   ]
  }
 },
 {
  "no": 53,
  "module": "AE基础信息与风险分级",
  "content": "发生/开始时间",
  "type": "date",
  "required": "cond",
  "script": "这个不舒服大概是从什么时候开始的？",
  "desc": "不适或异常什么时候开始？",
  "jump": "无法明确时记录大概时间",
  "options": [],
  "trigger": {
   "q": 49,
   "anyOf": [
    "身体不适/症状",
    "检查异常",
    "门诊/急诊/住院"
   ]
  }
 },
 {
  "no": 54,
  "module": "AE基础信息与风险分级",
  "content": "当前状态",
  "type": "radio",
  "required": "cond",
  "script": "现在情况是已经好转、还在持续，还是有加重的趋势？",
  "desc": "该不适或异常目前的状态是？",
  "jump": "无跳转",
  "options": [
   {
    "text": "已好转",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "持续存在",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "正在加重",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "已解决",
    "sort": 4,
    "inSummary": true
   },
   {
    "text": "未知",
    "sort": 5,
    "inSummary": true
   }
  ],
  "trigger": {
   "q": 49,
   "anyOf": [
    "身体不适/症状",
    "检查异常",
    "门诊/急诊/住院"
   ]
  }
 },
 {
  "no": 55,
  "module": "AE基础信息与风险分级",
  "content": "对生活影响",
  "type": "radio",
  "required": "cond",
  "script": "这个情况对您吃饭、睡觉、活动或日常生活影响大吗？",
  "desc": "该情况对患者吃饭、睡觉、活动或日常生活的影响程度是？",
  "jump": "重度影响提示优先升级",
  "options": [
   {
    "text": "无明显影响",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "轻度影响",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "中度影响",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "重度影响",
    "sort": 4,
    "inSummary": true
   },
   {
    "text": "未知",
    "sort": 5,
    "inSummary": true
   }
  ],
  "trigger": {
   "q": 49,
   "anyOf": [
    "身体不适/症状",
    "检查异常",
    "门诊/急诊/住院"
   ]
  }
 },
 {
  "no": 56,
  "module": "AE基础信息与风险分级",
  "content": "已采取措施",
  "type": "checkbox",
  "required": "cond",
  "script": "出现这个情况后，您有没有自行处理、咨询医生，或者去门诊、急诊、住院？",
  "desc": "患者已采取哪些处理？",
  "jump": "不建议患者自行用药",
  "options": [
   {
    "text": "未处理",
    "sort": 1
   },
   {
    "text": "自行观察",
    "sort": 2
   },
   {
    "text": "自行用药",
    "sort": 3
   },
   {
    "text": "咨询医生",
    "sort": 4
   },
   {
    "text": "门诊就诊",
    "sort": 5
   },
   {
    "text": "急诊就诊",
    "sort": 6
   },
   {
    "text": "住院治疗",
    "sort": 7
   },
   {
    "text": "其他：_____",
    "sort": 8,
    "fill": true
   }
  ],
  "trigger": {
   "q": 49,
   "anyOf": [
    "身体不适/症状",
    "检查异常",
    "门诊/急诊/住院"
   ]
  }
 },
 {
  "no": 57,
  "module": "AE基础信息与风险分级",
  "content": "当前结局",
  "type": "radio",
  "required": "cond",
  "script": "目前这个情况最后怎么样了？是恢复了、好转了，还是还在继续？",
  "desc": "本次不适或异常目前的结局是？",
  "jump": "无跳转",
  "options": [
   {
    "text": "已恢复",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "好转中",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "持续",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "加重",
    "sort": 4,
    "inSummary": true
   },
   {
    "text": "住院治疗中",
    "sort": 5,
    "inSummary": true
   },
   {
    "text": "未知",
    "sort": 6,
    "inSummary": true
   }
  ],
  "trigger": {
   "q": 49,
   "anyOf": [
    "身体不适/症状",
    "检查异常",
    "门诊/急诊/住院"
   ]
  }
 },
 {
  "no": 58,
  "module": "AE基础信息与风险分级",
  "content": "AE症状分类",
  "type": "radio",
  "required": "cond",
  "script": "我根据您描述的主要表现，先帮您归到相近的类别，后面再针对性确认。",
  "desc": "该情况最接近以下哪一类？",
  "jump": "按选项跳转对应分级追问",
  "options": [
   {
    "text": "腹泻/腹痛/疑似结肠炎",
    "sort": 1,
    "inSummary": true,
    "triggers": [
     60,
     61,
     62
    ]
   },
   {
    "text": "皮疹/瘙痒/皮肤反应",
    "sort": 2,
    "inSummary": true,
    "triggers": [
     63,
     64,
     65
    ]
   },
   {
    "text": "咳嗽/气短/疑似肺炎",
    "sort": 3,
    "inSummary": true,
    "triggers": [
     66,
     67,
     68
    ]
   },
   {
    "text": "胸闷/心慌/胸痛/疑似心肌炎",
    "sort": 4,
    "inSummary": true,
    "triggers": [
     69,
     70,
     71
    ]
   },
   {
    "text": "发热/寒战/感染样症状",
    "sort": 5,
    "inSummary": true,
    "triggers": [
     72,
     73,
     74
    ]
   },
   {
    "text": "黄疸/肝功能异常线索",
    "sort": 6,
    "inSummary": true,
    "triggers": [
     75,
     76,
     77
    ]
   },
   {
    "text": "其他症状",
    "sort": 7,
    "inSummary": true,
    "triggers": [
     59
    ]
   }
  ],
  "trigger": {
   "q": 49,
   "anyOf": [
    "身体不适/症状",
    "检查异常",
    "门诊/急诊/住院"
   ]
  }
 },
 {
  "no": 59,
  "module": "AE基础信息与风险分级",
  "content": "其他症状说明",
  "type": "text",
  "required": "cond",
  "script": "请具体说一下症状和最关键的表现，我按事实记录。",
  "desc": "请描述其他症状及关键表现",
  "jump": "症状分类选择“其他症状”时展开",
  "options": [],
  "trigger": {
   "q": 58,
   "anyOf": [
    "其他症状"
   ]
  }
 },
 {
  "no": 60,
  "module": "AE基础信息与风险分级",
  "content": "腹泻次数变化",
  "type": "text",
  "required": "cond",
  "script": "大便比平时多了几次？现在每天大概几次？",
  "desc": "大便次数与平时相比增加了多少？目前每天约几次？",
  "jump": "腹泻/腹痛线索时展开",
  "options": [],
  "trigger": {
   "q": 58,
   "anyOf": [
    "腹泻/腹痛/疑似结肠炎"
   ]
  }
 },
 {
  "no": 61,
  "module": "AE基础信息与风险分级",
  "content": "腹泻伴随表现",
  "type": "checkbox",
  "required": "cond",
  "script": "有没有腹痛、便血、发烧、口渴尿少，或者晚上也会腹泻？",
  "desc": "是否伴有以下情况？",
  "jump": "出现便血、剧烈腹痛、高热或脱水时快速升级",
  "options": [
   {
    "text": "腹痛",
    "sort": 1
   },
   {
    "text": "便血/黑便",
    "sort": 2
   },
   {
    "text": "发热",
    "sort": 3
   },
   {
    "text": "口渴尿少",
    "sort": 4
   },
   {
    "text": "夜间腹泻",
    "sort": 5
   },
   {
    "text": "无法进食饮水",
    "sort": 6
   },
   {
    "text": "无以上情况",
    "sort": 7
   }
  ],
  "trigger": {
   "q": 58,
   "anyOf": [
    "腹泻/腹痛/疑似结肠炎"
   ]
  }
 },
 {
  "no": 62,
  "module": "AE基础信息与风险分级",
  "content": "腹泻处理情况",
  "type": "checkbox",
  "required": "cond",
  "script": "有没有用过止泻药、抗生素，或者已经去看过医生？",
  "desc": "是否已使用止泻药、抗生素，或已就医？",
  "jump": "记录事实，不建议具体用药",
  "options": [
   {
    "text": "未处理",
    "sort": 1
   },
   {
    "text": "自行止泻药",
    "sort": 2
   },
   {
    "text": "抗生素",
    "sort": 3
   },
   {
    "text": "门诊",
    "sort": 4
   },
   {
    "text": "急诊/住院",
    "sort": 5
   },
   {
    "text": "其他：_____",
    "sort": 6,
    "fill": true
   }
  ],
  "trigger": {
   "q": 58,
   "anyOf": [
    "腹泻/腹痛/疑似结肠炎"
   ]
  }
 },
 {
  "no": 63,
  "module": "AE基础信息与风险分级",
  "content": "皮疹部位/范围",
  "type": "text",
  "required": "cond",
  "script": "皮疹在哪里？大概多大范围？",
  "desc": "皮疹出现在哪里？大概范围多大？",
  "jump": "皮肤反应线索时展开",
  "options": [],
  "trigger": {
   "q": 58,
   "anyOf": [
    "皮疹/瘙痒/皮肤反应"
   ]
  }
 },
 {
  "no": 64,
  "module": "AE基础信息与风险分级",
  "content": "皮肤严重表现",
  "type": "checkbox",
  "required": "cond",
  "script": "有没有水疱、破溃、口腔或眼部黏膜受累、发热，或者痒得影响睡觉？",
  "desc": "是否伴有以下情况？",
  "jump": "出现水疱、黏膜受累或发热伴皮疹时快速升级",
  "options": [
   {
    "text": "水疱",
    "sort": 1
   },
   {
    "text": "破溃/渗液",
    "sort": 2
   },
   {
    "text": "口腔或眼部黏膜受累",
    "sort": 3
   },
   {
    "text": "发热",
    "sort": 4
   },
   {
    "text": "明显疼痛",
    "sort": 5
   },
   {
    "text": "瘙痒影响睡眠",
    "sort": 6
   },
   {
    "text": "无以上情况",
    "sort": 7
   }
  ],
  "trigger": {
   "q": 58,
   "anyOf": [
    "皮疹/瘙痒/皮肤反应"
   ]
  }
 },
 {
  "no": 65,
  "module": "AE基础信息与风险分级",
  "content": "皮肤自行处理",
  "type": "radio",
  "required": "cond",
  "script": "您有没有自行涂药或处理皮疹？",
  "desc": "患者是否自行涂药或处理皮疹？",
  "jump": "提醒不要抓破或自行乱涂药",
  "options": [
   {
    "text": "未处理",
    "sort": 1
   },
   {
    "text": "自行处理",
    "sort": 2
   },
   {
    "text": "咨询医生后处理",
    "sort": 3
   },
   {
    "text": "已就医",
    "sort": 4
   },
   {
    "text": "不清楚",
    "sort": 5
   }
  ],
  "trigger": {
   "q": 58,
   "anyOf": [
    "皮疹/瘙痒/皮肤反应"
   ]
  }
 },
 {
  "no": 66,
  "module": "AE基础信息与风险分级",
  "content": "呼吸道症状",
  "type": "checkbox",
  "required": "cond",
  "script": "有没有新出现咳嗽、胸闷，走路、上楼会不会比以前更喘？",
  "desc": "是否新出现咳嗽、胸闷或气短？",
  "jump": "咳嗽/气短线索时展开",
  "options": [
   {
    "text": "咳嗽",
    "sort": 1
   },
   {
    "text": "胸闷",
    "sort": 2
   },
   {
    "text": "活动后气短",
    "sort": 3
   },
   {
    "text": "静息气短",
    "sort": 4
   },
   {
    "text": "无上述症状",
    "sort": 5
   }
  ],
  "trigger": {
   "q": 58,
   "anyOf": [
    "咳嗽/气短/疑似肺炎"
   ]
  }
 },
 {
  "no": 67,
  "module": "AE基础信息与风险分级",
  "content": "活动耐量变化",
  "type": "radio",
  "required": "cond",
  "script": "现在走路、上楼或日常活动时，气喘和以前相比有没有明显变化？",
  "desc": "走路、上楼或日常活动是否比以前更喘？",
  "jump": "明显变差或静息气短时优先升级",
  "options": [
   {
    "text": "无变化",
    "sort": 1
   },
   {
    "text": "轻度变差",
    "sort": 2
   },
   {
    "text": "明显变差",
    "sort": 3
   },
   {
    "text": "无法完成日常活动",
    "sort": 4
   },
   {
    "text": "不清楚",
    "sort": 5
   }
  ],
  "trigger": {
   "q": 58,
   "anyOf": [
    "咳嗽/气短/疑似肺炎"
   ]
  }
 },
 {
  "no": 68,
  "module": "AE基础信息与风险分级",
  "content": "呼吸道紧急线索",
  "type": "checkbox",
  "required": "cond",
  "script": "有没有发热、胸痛、咯血、口唇发紫、血氧下降，或者无法平躺？",
  "desc": "是否伴有以下情况？",
  "jump": "静息气短、胸痛、发绀或血氧下降时快速升级",
  "options": [
   {
    "text": "发热",
    "sort": 1
   },
   {
    "text": "胸痛",
    "sort": 2
   },
   {
    "text": "咯血",
    "sort": 3
   },
   {
    "text": "口唇发紫",
    "sort": 4
   },
   {
    "text": "血氧下降",
    "sort": 5
   },
   {
    "text": "无法平躺",
    "sort": 6
   },
   {
    "text": "急诊/住院",
    "sort": 7
   },
   {
    "text": "无以上情况",
    "sort": 8
   }
  ],
  "trigger": {
   "q": 58,
   "anyOf": [
    "咳嗽/气短/疑似肺炎"
   ]
  }
 },
 {
  "no": 69,
  "module": "AE基础信息与风险分级",
  "content": "心血管症状",
  "type": "checkbox",
  "required": "cond",
  "script": "胸闷心慌什么时候开始？活动后会加重吗？有没有胸痛、晕厥、出汗、气短？",
  "desc": "是否出现胸闷、心慌、胸痛或心跳异常？",
  "jump": "胸闷/心慌/胸痛线索时展开",
  "options": [
   {
    "text": "胸闷",
    "sort": 1
   },
   {
    "text": "心慌/心悸",
    "sort": 2
   },
   {
    "text": "胸痛",
    "sort": 3
   },
   {
    "text": "心跳很快或很乱",
    "sort": 4
   },
   {
    "text": "气短",
    "sort": 5
   },
   {
    "text": "无上述症状",
    "sort": 6
   }
  ],
  "trigger": {
   "q": 58,
   "anyOf": [
    "胸闷/心慌/胸痛/疑似心肌炎"
   ]
  }
 },
 {
  "no": 70,
  "module": "AE基础信息与风险分级",
  "content": "心血管症状起始和持续",
  "type": "text",
  "required": "cond",
  "script": "这种情况持续多久了？是反复出现还是一直存在？活动后会不会更明显？",
  "desc": "症状什么时候开始？持续多久？活动后是否加重？",
  "jump": "记录患者原话",
  "options": [],
  "trigger": {
   "q": 58,
   "anyOf": [
    "胸闷/心慌/胸痛/疑似心肌炎"
   ]
  }
 },
 {
  "no": 71,
  "module": "AE基础信息与风险分级",
  "content": "心血管紧急线索",
  "type": "checkbox",
  "required": "cond",
  "script": "有没有晕厥、严重气短、大量出汗、无法平卧，或者已经去急诊/住院？",
  "desc": "是否伴有以下情况？",
  "jump": "出现任一严重线索时快速升级",
  "options": [
   {
    "text": "晕厥",
    "sort": 1
   },
   {
    "text": "严重气短",
    "sort": 2
   },
   {
    "text": "大量出汗",
    "sort": 3
   },
   {
    "text": "无法平卧",
    "sort": 4
   },
   {
    "text": "急诊/住院",
    "sort": 5
   },
   {
    "text": "无以上情况",
    "sort": 6
   }
  ],
  "trigger": {
   "q": 58,
   "anyOf": [
    "胸闷/心慌/胸痛/疑似心肌炎"
   ]
  }
 },
 {
  "no": 72,
  "module": "AE基础信息与风险分级",
  "content": "最高体温及持续时间",
  "type": "text",
  "required": "cond",
  "script": "体温最高多少？持续多久了？",
  "desc": "体温最高多少？持续多久？",
  "jump": "发热/感染样症状时展开",
  "options": [],
  "trigger": {
   "q": 58,
   "anyOf": [
    "发热/寒战/感染样症状"
   ]
  }
 },
 {
  "no": 73,
  "module": "AE基础信息与风险分级",
  "content": "发热伴随症状",
  "type": "checkbox",
  "required": "cond",
  "script": "有没有寒战、咳嗽、腹泻、尿痛、气短或意识不清？",
  "desc": "是否伴有以下情况？",
  "jump": "高热不退、气短或意识改变时快速升级",
  "options": [
   {
    "text": "寒战",
    "sort": 1
   },
   {
    "text": "咳嗽",
    "sort": 2
   },
   {
    "text": "腹泻",
    "sort": 3
   },
   {
    "text": "尿痛",
    "sort": 4
   },
   {
    "text": "气短",
    "sort": 5
   },
   {
    "text": "意识改变",
    "sort": 6
   },
   {
    "text": "血压低/晕厥",
    "sort": 7
   },
   {
    "text": "无以上情况",
    "sort": 8
   }
  ],
  "trigger": {
   "q": 58,
   "anyOf": [
    "发热/寒战/感染样症状"
   ]
  }
 },
 {
  "no": 74,
  "module": "AE基础信息与风险分级",
  "content": "发热处理情况",
  "type": "checkbox",
  "required": "cond",
  "script": "有没有使用退热药、抗生素，或者已经去看过医生？",
  "desc": "是否已使用退热药、抗生素或就医？",
  "jump": "记录事实，不建议具体用药",
  "options": [
   {
    "text": "未处理",
    "sort": 1
   },
   {
    "text": "退热药",
    "sort": 2
   },
   {
    "text": "抗生素",
    "sort": 3
   },
   {
    "text": "门诊",
    "sort": 4
   },
   {
    "text": "急诊/住院",
    "sort": 5
   },
   {
    "text": "其他：_____",
    "sort": 6,
    "fill": true
   }
  ],
  "trigger": {
   "q": 58,
   "anyOf": [
    "发热/寒战/感染样症状"
   ]
  }
 },
 {
  "no": 75,
  "module": "AE基础信息与风险分级",
  "content": "黄疸/肝功能异常表现",
  "type": "checkbox",
  "required": "cond",
  "script": "有没有眼睛或皮肤发黄？尿色像浓茶吗？有没有右上腹痛或恶心明显？",
  "desc": "是否出现以下情况？",
  "jump": "黄疸、深色尿或明显腹痛时快速升级",
  "options": [
   {
    "text": "眼睛或皮肤发黄",
    "sort": 1
   },
   {
    "text": "尿色像浓茶",
    "sort": 2
   },
   {
    "text": "右上腹痛",
    "sort": 3
   },
   {
    "text": "明显恶心",
    "sort": 4
   },
   {
    "text": "食欲明显下降",
    "sort": 5
   },
   {
    "text": "无以上情况",
    "sort": 6
   }
  ],
  "trigger": {
   "q": 58,
   "anyOf": [
    "黄疸/肝功能异常线索"
   ]
  }
 },
 {
  "no": 76,
  "module": "AE基础信息与风险分级",
  "content": "肝功能检查异常",
  "type": "text",
  "required": "optional",
  "script": "如果您手头有检查结果，可以告诉我ALT、AST、胆红素等异常指标和检查日期。",
  "desc": "如患者提供，请记录ALT、AST、胆红素等异常指标及检查日期",
  "jump": "不主动索取完整病历",
  "options": [],
  "trigger": {
   "q": 58,
   "anyOf": [
    "黄疸/肝功能异常线索"
   ]
  }
 },
 {
  "no": 77,
  "module": "AE基础信息与风险分级",
  "content": "合并用药/饮酒情况",
  "type": "text",
  "required": "optional",
  "script": "近期有没有合并用药、保健品或饮酒情况需要一并记录？",
  "desc": "近期是否有合并用药、保健品或饮酒情况需要记录？",
  "jump": "仅记录患者主动提供的信息",
  "options": [],
  "trigger": {
   "q": 58,
   "anyOf": [
    "黄疸/肝功能异常线索"
   ]
  }
 },
 {
  "no": 78,
  "module": "AE基础信息与风险分级",
  "content": "紧急升级线索",
  "type": "checkbox",
  "required": "cond",
  "script": "我确认一下有没有需要马上重视的情况，比如明显出血、严重气短、意识改变、黄疸、急诊或住院。",
  "desc": "本次情况是否出现以下任一线索？",
  "jump": "任一线索提示快速/紧急升级并同步项目经理/PV接口人",
  "options": [
   {
    "text": "便血/黑便或剧烈腹痛",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "持续高热或明显脱水",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "大面积皮疹/水疱/黏膜受累",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "静息气短/胸痛/口唇发紫/血氧下降",
    "sort": 4,
    "inSummary": true
   },
   {
    "text": "晕厥或严重心律异常",
    "sort": 5,
    "inSummary": true
   },
   {
    "text": "意识改变",
    "sort": 6,
    "inSummary": true
   },
   {
    "text": "明显黄疸",
    "sort": 7,
    "inSummary": true
   },
   {
    "text": "急诊/住院",
    "sort": 8,
    "inSummary": true
   },
   {
    "text": "无以上情况",
    "sort": 9,
    "inSummary": true
   }
  ],
  "trigger": {
   "q": 49,
   "anyOf": [
    "身体不适/症状",
    "检查异常",
    "门诊/急诊/住院"
   ]
  }
 },
 {
  "no": 79,
  "module": "AE基础信息与风险分级",
  "content": "项目风险识别等级",
  "type": "radio",
  "required": "cond",
  "script": "我根据您说的情况按项目风险识别要求记录。这不是医学诊断，也不代表判断药品导致。",
  "desc": "专员根据记录选择项目风险识别等级（非医学诊断，非CTCAE正式分级）：",
  "jump": "参考“03_AE分级逻辑”；无法判断时转PV初筛确认",
  "options": [
   {
    "text": "轻度/常规记录线索",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "关注跟进线索",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "快速/紧急升级线索",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "无法判断",
    "sort": 4,
    "inSummary": true
   }
  ],
  "trigger": {
   "q": 49,
   "anyOf": [
    "身体不适/症状",
    "检查异常",
    "门诊/急诊/住院"
   ]
  }
 },
 {
  "no": 80,
  "module": "AE基础信息与风险分级",
  "content": "是否同意后续随访",
  "type": "radio",
  "required": "cond",
  "script": "后续如果专业团队需要进一步确认，您愿意继续接听随访吗？",
  "desc": "患者/报告人是否同意后续就该情况继续联系？",
  "jump": "不同意时记录并尊重意愿",
  "options": [
   {
    "text": "同意",
    "sort": 1
   },
   {
    "text": "不同意",
    "sort": 2
   },
   {
    "text": "需联系其他家属",
    "sort": 3
   },
   {
    "text": "未确认",
    "sort": 4
   }
  ],
  "trigger": {
   "q": 49,
   "anyOf": [
    "身体不适/症状",
    "检查异常",
    "门诊/急诊/住院"
   ]
  }
 },
 {
  "no": 81,
  "module": "AE基础信息与风险分级",
  "content": "本次安全处理动作",
  "type": "checkbox",
  "required": "cond",
  "script": "我会把情况按项目流程记录并转交专业团队确认，同时提醒您必要时尽快联系医生。",
  "desc": "专员本次执行了哪些动作？",
  "jump": "不判断因果关系，不给予诊疗建议",
  "options": [
   {
    "text": "记录事实并转PV复核",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "提醒尽快联系医生",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "提醒出现严重症状及时就医",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "通知项目经理",
    "sort": 4,
    "inSummary": true
   },
   {
    "text": "同步质量部门",
    "sort": 5,
    "inSummary": true
   },
   {
    "text": "安排补充随访",
    "sort": 6,
    "inSummary": true
   },
   {
    "text": "其他：_____",
    "sort": 7,
    "fill": true,
    "inSummary": true
   }
  ],
  "trigger": {
   "q": 49,
   "anyOf": [
    "身体不适/症状",
    "检查异常",
    "门诊/急诊/住院"
   ]
  }
 },
 {
  "no": 82,
  "module": "特殊情形/PV分流",
  "content": "特殊情形类型",
  "type": "checkbox",
  "required": "cond",
  "script": "有几类情况如果您已经遇到或医生、家属提到过，也需要记录给专业团队确认。我先帮您分一下类型。",
  "desc": "本次特殊情形属于哪一类？",
  "jump": "安全性分类选择特殊情形后展开；可多选，按类分别展开记录",
  "options": [
   {
    "text": "妊娠/哺乳/父源暴露",
    "sort": 1,
    "inSummary": true,
    "triggers": [
     83,
     84,
     100,
     101,
     85,
     86,
     87
    ]
   },
   {
    "text": "用药错误",
    "sort": 2,
    "inSummary": true,
    "triggers": [
     83,
     84,
     100,
     101,
     88,
     89
    ]
   },
   {
    "text": "产品质量投诉",
    "sort": 3,
    "inSummary": true,
    "triggers": [
     83,
     84,
     100,
     101,
     90,
     91,
     92,
     93
    ]
   },
   {
    "text": "缺乏疗效/疾病进展",
    "sort": 4,
    "inSummary": true,
    "triggers": [
     83,
     84,
     100,
     101,
     94,
     95,
     96
    ]
   },
   {
    "text": "误用/过量/相互作用/职业暴露",
    "sort": 5,
    "inSummary": true,
    "triggers": [
     83,
     84,
     100,
     101,
     97,
     98,
     99
    ]
   },
   {
    "text": "其他特殊情形",
    "sort": 6,
    "inSummary": true,
    "triggers": [
     83,
     84,
     100,
     101
    ]
   }
  ],
  "trigger": {
   "q": 49,
   "anyOf": [
    "妊娠/哺乳/父源暴露",
    "用药错误",
    "产品质量问题",
    "缺乏疗效/疾病进展",
    "误用/过量/相互作用/职业暴露",
    "其他安全性信息"
   ]
  }
 },
 {
  "no": 83,
  "module": "特殊情形/PV分流",
  "content": "是否伴随不适/AE",
  "type": "radio",
  "required": "cond",
  "script": "这个情况有没有伴随身体不舒服、检查异常、急诊或住院？",
  "desc": "该特殊情形是否伴随患者不适、检查异常、急诊或住院？",
  "jump": "选项2-3同时跳转AE基础信息与风险分级",
  "options": [
   {
    "text": "否",
    "sort": 1
   },
   {
    "text": "是",
    "sort": 2
   },
   {
    "text": "不确定",
    "sort": 3
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": "*"
  }
 },
 {
  "no": 84,
  "module": "特殊情形/PV分流",
  "content": "特殊情形事实描述",
  "type": "text",
  "required": "cond",
  "script": "我先记录发生时间、涉及产品和您描述的事实，不判断责任或原因。",
  "desc": "请记录特殊情形发生时间、涉及产品、地点和报告人原话",
  "jump": "只记录事实，不判断责任或因果",
  "options": [],
  "trigger": {
   "q": 82,
   "anyOf": "*"
  }
 },
 {
  "no": 85,
  "module": "特殊情形/PV分流",
  "content": "暴露对象",
  "type": "radio",
  "required": "cond",
  "script": "请问涉及妊娠、哺乳或暴露的是患者本人，还是患者的配偶/伴侣？",
  "desc": "妊娠/哺乳/父源暴露涉及对象是？",
  "jump": "妊娠/哺乳/父源暴露时展开",
  "options": [
   {
    "text": "患者本人",
    "sort": 1
   },
   {
    "text": "患者配偶/伴侣",
    "sort": 2
   },
   {
    "text": "其他：_____",
    "sort": 3,
    "fill": true
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": [
    "妊娠/哺乳/父源暴露"
   ]
  }
 },
 {
  "no": 86,
  "module": "特殊情形/PV分流",
  "content": "暴露时间与孕周/哺乳状态",
  "type": "text",
  "required": "cond",
  "script": "请确认用药或暴露时间，以及目前孕周或哺乳状态。",
  "desc": "请记录用药/暴露时间、孕周或哺乳状态",
  "jump": "无跳转",
  "options": [],
  "trigger": {
   "q": 82,
   "anyOf": [
    "妊娠/哺乳/父源暴露"
   ]
  }
 },
 {
  "no": 87,
  "module": "特殊情形/PV分流",
  "content": "妊娠结果随访意愿",
  "type": "radio",
  "required": "cond",
  "script": "后续如果专业团队需要了解妊娠或暴露结果，您是否同意继续随访？",
  "desc": "报告人是否同意后续进行妊娠/暴露结果随访？",
  "jump": "由PV判断是否发起后续随访",
  "options": [
   {
    "text": "同意",
    "sort": 1
   },
   {
    "text": "不同意",
    "sort": 2
   },
   {
    "text": "需进一步确认",
    "sort": 3
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": [
    "妊娠/哺乳/父源暴露"
   ]
  }
 },
 {
  "no": 88,
  "module": "特殊情形/PV分流",
  "content": "用药错误类型",
  "type": "checkbox",
  "required": "cond",
  "script": "有没有出现打错、漏用、多用、配错、发错、储存错误，或者差点用错的情况？",
  "desc": "发生的用药错误类型是？",
  "jump": "用药错误时展开",
  "options": [
   {
    "text": "打错/用错",
    "sort": 1
   },
   {
    "text": "漏用",
    "sort": 2
   },
   {
    "text": "多用/过量",
    "sort": 3
   },
   {
    "text": "配错",
    "sort": 4
   },
   {
    "text": "发错",
    "sort": 5
   },
   {
    "text": "储存错误",
    "sort": 6
   },
   {
    "text": "差点用错但被拦截",
    "sort": 7
   },
   {
    "text": "其他：_____",
    "sort": 8,
    "fill": true
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": [
    "用药错误"
   ]
  }
 },
 {
  "no": 89,
  "module": "特殊情形/PV分流",
  "content": "用药错误状态",
  "type": "radio",
  "required": "cond",
  "script": "这个情况是已经被拦截了，还是患者已经接触或使用了？",
  "desc": "该用药错误目前处于哪种状态？",
  "jump": "伴不适时同步跳转AE模块",
  "options": [
   {
    "text": "潜在错误或被拦截，患者未接触",
    "sort": 1
   },
   {
    "text": "已发生但暂无不适",
    "sort": 2
   },
   {
    "text": "已发生且伴不适",
    "sort": 3
   },
   {
    "text": "环节不清，需补充",
    "sort": 4
   },
   {
    "text": "其他：_____",
    "sort": 5,
    "fill": true
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": [
    "用药错误"
   ]
  }
 },
 {
  "no": 90,
  "module": "特殊情形/PV分流",
  "content": "质量问题类型",
  "type": "checkbox",
  "required": "cond",
  "script": "这个信息需要记录一下。请问异常主要出现在外观、包装、说明书，还是配液/输液过程中？",
  "desc": "产品质量问题涉及哪些方面？",
  "jump": "质量投诉时展开",
  "options": [
   {
    "text": "药品外观",
    "sort": 1
   },
   {
    "text": "包装",
    "sort": 2
   },
   {
    "text": "说明书",
    "sort": 3
   },
   {
    "text": "配液异常",
    "sort": 4
   },
   {
    "text": "输液过程异常",
    "sort": 5
   },
   {
    "text": "其他：_____",
    "sort": 6,
    "fill": true
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": [
    "产品质量投诉"
   ]
  }
 },
 {
  "no": 91,
  "module": "特殊情形/PV分流",
  "content": "产品是否已使用",
  "type": "radio",
  "required": "cond",
  "script": "涉事药品是否已经给患者使用？使用后有没有出现不舒服？",
  "desc": "涉事产品是否已经给患者使用？",
  "jump": "选项3-4同步跳转AE模块",
  "options": [
   {
    "text": "未使用",
    "sort": 1
   },
   {
    "text": "已使用但未出现不适",
    "sort": 2
   },
   {
    "text": "已使用且出现不适",
    "sort": 3
   },
   {
    "text": "不确定",
    "sort": 4
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": [
    "产品质量投诉"
   ]
  }
 },
 {
  "no": 92,
  "module": "特殊情形/PV分流",
  "content": "产品信息",
  "type": "text",
  "required": "cond",
  "script": "请提供产品名称、批号、有效期，以及发现异常的时间和地点。",
  "desc": "请记录产品名称、批号、有效期及发现时间/地点",
  "jump": "不自行判断药品是否合格",
  "options": [],
  "trigger": {
   "q": 82,
   "anyOf": [
    "产品质量投诉"
   ]
  }
 },
 {
  "no": 93,
  "module": "特殊情形/PV分流",
  "content": "质量相关凭证",
  "type": "checkbox",
  "required": "optional",
  "script": "目前是否有照片、医院记录或其他材料可以帮助说明情况？不需要提供药品实物。",
  "desc": "是否已有以下凭证或记录？",
  "jump": "不私自接收药品实物",
  "options": [
   {
    "text": "照片",
    "sort": 1
   },
   {
    "text": "医院记录",
    "sort": 2
   },
   {
    "text": "检验/检查记录",
    "sort": 3
   },
   {
    "text": "聊天记录",
    "sort": 4
   },
   {
    "text": "无",
    "sort": 5
   },
   {
    "text": "其他：_____",
    "sort": 6,
    "fill": true
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": [
    "产品质量投诉"
   ]
  }
 },
 {
  "no": 94,
  "module": "特殊情形/PV分流",
  "content": "缺乏疗效/进展线索",
  "type": "radio",
  "required": "cond",
  "script": "医生有没有明确提到治疗无效、疾病进展、复发或治疗失败？",
  "desc": "医生是否明确提到治疗无效、疾病进展、复发或治疗失败？",
  "jump": "缺乏疗效/疾病进展时展开",
  "options": [
   {
    "text": "医生明确提到",
    "sort": 1
   },
   {
    "text": "患者个人感觉但未获医生确认",
    "sort": 2
   },
   {
    "text": "未提到",
    "sort": 3
   },
   {
    "text": "不清楚",
    "sort": 4
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": [
    "缺乏疗效/疾病进展"
   ]
  }
 },
 {
  "no": 95,
  "module": "特殊情形/PV分流",
  "content": "判断依据",
  "type": "checkbox",
  "required": "cond",
  "script": "这个信息主要来自医生门诊反馈、检查结果、报告，还是患者自己的感受？",
  "desc": "该信息依据是什么？",
  "jump": "疗效判断由医生完成，专员不解释结果",
  "options": [
   {
    "text": "医生门诊反馈",
    "sort": 1
   },
   {
    "text": "影像检查",
    "sort": 2
   },
   {
    "text": "实验室检查",
    "sort": 3
   },
   {
    "text": "报告/病历记录",
    "sort": 4
   },
   {
    "text": "患者原话",
    "sort": 5
   },
   {
    "text": "其他：_____",
    "sort": 6,
    "fill": true
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": [
    "缺乏疗效/疾病进展"
   ]
  }
 },
 {
  "no": 96,
  "module": "特殊情形/PV分流",
  "content": "是否伴严重后果",
  "type": "radio",
  "required": "cond",
  "script": "有没有因为这个情况出现急诊、住院、死亡或其他严重后果？",
  "desc": "是否伴急诊、住院、死亡或其他严重后果？",
  "jump": "伴严重后果时PV必复核",
  "options": [
   {
    "text": "否",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "急诊",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "住院",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "死亡",
    "sort": 4,
    "inSummary": true
   },
   {
    "text": "不清楚",
    "sort": 5,
    "inSummary": true
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": [
    "缺乏疗效/疾病进展"
   ]
  }
 },
 {
  "no": 97,
  "module": "特殊情形/PV分流",
  "content": "误用/暴露类型",
  "type": "checkbox",
  "required": "cond",
  "script": "最近有没有自行加减量、提前/延后用药，或相关人员接触药液的情况？",
  "desc": "本次情况属于哪类？",
  "jump": "误用/过量/相互作用/职业暴露时展开",
  "options": [
   {
    "text": "自行加量",
    "sort": 1
   },
   {
    "text": "自行减量",
    "sort": 2
   },
   {
    "text": "提前用药",
    "sort": 3
   },
   {
    "text": "延后用药",
    "sort": 4
   },
   {
    "text": "药物相互作用",
    "sort": 5
   },
   {
    "text": "职业暴露",
    "sort": 6
   },
   {
    "text": "其他：_____",
    "sort": 7,
    "fill": true
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": [
    "误用/过量/相互作用/职业暴露"
   ]
  }
 },
 {
  "no": 98,
  "module": "特殊情形/PV分流",
  "content": "误用/暴露事实",
  "type": "text",
  "required": "cond",
  "script": "我先记录发生时间、涉及产品、暴露方式和已经采取的措施。",
  "desc": "请记录发生时间、涉及产品、暴露方式和已采取措施",
  "jump": "无跳转",
  "options": [],
  "trigger": {
   "q": 82,
   "anyOf": [
    "误用/过量/相互作用/职业暴露"
   ]
  }
 },
 {
  "no": 99,
  "module": "特殊情形/PV分流",
  "content": "是否出现不适",
  "type": "radio",
  "required": "cond",
  "script": "相关人员有没有出现不适，或者已经去门诊、急诊、住院？",
  "desc": "相关人员是否出现不适或已就医？",
  "jump": "选项2-4同步跳转AE模块",
  "options": [
   {
    "text": "无不适",
    "sort": 1
   },
   {
    "text": "有不适",
    "sort": 2
   },
   {
    "text": "已门诊/急诊/住院",
    "sort": 3
   },
   {
    "text": "不清楚",
    "sort": 4
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": [
    "误用/过量/相互作用/职业暴露"
   ]
  }
 },
 {
  "no": 100,
  "module": "特殊情形/PV分流",
  "content": "特殊情形后续联系意愿",
  "type": "radio",
  "required": "cond",
  "script": "后续如果专业团队需要进一步确认，您是否同意继续联系？",
  "desc": "报告人是否同意后续就该特殊情形继续联系？",
  "jump": "获得同意后开展补充随访",
  "options": [
   {
    "text": "同意",
    "sort": 1
   },
   {
    "text": "不同意",
    "sort": 2
   },
   {
    "text": "需联系其他家属",
    "sort": 3
   },
   {
    "text": "未确认",
    "sort": 4
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": "*"
  }
 },
 {
  "no": 101,
  "module": "特殊情形/PV分流",
  "content": "分流路径",
  "type": "checkbox",
  "required": "cond",
  "script": "我会按项目流程将信息转交给相应专业团队确认，不在这里判断责任或原因。",
  "desc": "本次特殊情形按项目路径分流至：",
  "jump": "按“04_特殊情形分流”执行",
  "options": [
   {
    "text": "PV必复核",
    "sort": 1
   },
   {
    "text": "PV初筛确认",
    "sort": 2
   },
   {
    "text": "质量部门",
    "sort": 3
   },
   {
    "text": "项目经理",
    "sort": 4
   },
   {
    "text": "医学/院内接口",
    "sort": 5
   },
   {
    "text": "非PV项目记录",
    "sort": 6
   }
  ],
  "trigger": {
   "q": 82,
   "anyOf": "*"
  }
 },
 {
  "no": 102,
  "module": "事件补充与结局更新",
  "content": "原事件编号",
  "type": "system",
  "required": "required",
  "script": "关联原事件编号，避免重复建案。",
  "desc": "请填写或关联原事件编号",
  "jump": "不得重复建案",
  "options": []
 },
 {
  "no": 103,
  "module": "事件补充与结局更新",
  "content": "补充信息来源",
  "type": "radio",
  "required": "required",
  "script": "请问这次补充信息来自患者本人、家属、医护人员，还是院内记录？",
  "desc": "本次补充信息来源是？",
  "jump": "无跳转",
  "options": [
   {
    "text": "患者本人",
    "sort": 1
   },
   {
    "text": "授权家属",
    "sort": 2
   },
   {
    "text": "医护人员",
    "sort": 3
   },
   {
    "text": "院内记录",
    "sort": 4
   },
   {
    "text": "其他：_____",
    "sort": 5,
    "fill": true
   }
  ]
 },
 {
  "no": 104,
  "module": "事件补充与结局更新",
  "content": "事件结局更新",
  "type": "radio",
  "required": "required",
  "script": "上次您提到的情况，我想按项目要求再补充确认几项信息。现在情况怎么样了？",
  "desc": "目前该事件结局是？",
  "jump": "关联原事件转PV",
  "options": [
   {
    "text": "已恢复",
    "sort": 1
   },
   {
    "text": "好转中",
    "sort": 2
   },
   {
    "text": "持续",
    "sort": 3
   },
   {
    "text": "加重",
    "sort": 4
   },
   {
    "text": "住院治疗中",
    "sort": 5
   },
   {
    "text": "死亡",
    "sort": 6
   },
   {
    "text": "未知",
    "sort": 7
   }
  ]
 },
 {
  "no": 105,
  "module": "事件补充与结局更新",
  "content": "就医/住院情况",
  "type": "checkbox",
  "required": "required",
  "script": "因为这个情况，您后来有没有门诊、急诊或住院？",
  "desc": "患者是否已就该事件就医或住院？",
  "jump": "无跳转",
  "options": [
   {
    "text": "未就医",
    "sort": 1
   },
   {
    "text": "门诊",
    "sort": 2
   },
   {
    "text": "急诊",
    "sort": 3
   },
   {
    "text": "住院",
    "sort": 4
   },
   {
    "text": "已出院",
    "sort": 5
   },
   {
    "text": "不清楚",
    "sort": 6
   }
  ]
 },
 {
  "no": 106,
  "module": "事件补充与结局更新",
  "content": "医生诊断或处理",
  "type": "text",
  "required": "optional",
  "script": "医生有没有给出诊断、检查或处理意见？您方便提供的部分我帮您记录。",
  "desc": "医生是否给出诊断、检查或处理意见？请客观记录",
  "jump": "不主动索取完整病历",
  "options": []
 },
 {
  "no": 107,
  "module": "事件补充与结局更新",
  "content": "检查/报告日期",
  "type": "date",
  "required": "optional",
  "script": "相关检查或报告的日期是哪一天？",
  "desc": "相关检查或报告日期是？",
  "jump": "无跳转",
  "options": []
 },
 {
  "no": 108,
  "module": "事件补充与结局更新",
  "content": "是否同意继续随访",
  "type": "radio",
  "required": "required",
  "script": "后续如果还需要确认这个事件，您是否同意继续随访？",
  "desc": "报告人是否同意后续继续随访该事件？",
  "jump": "无跳转",
  "options": [
   {
    "text": "同意",
    "sort": 1
   },
   {
    "text": "不同意",
    "sort": 2
   },
   {
    "text": "需联系其他家属",
    "sort": 3
   },
   {
    "text": "未确认",
    "sort": 4
   }
  ]
 },
 {
  "no": 109,
  "module": "事件补充与结局更新",
  "content": "补充随访摘要",
  "type": "text",
  "required": "required",
  "script": "我最后核对一下这次补充的信息，以及还有哪些事项需要后续确认。",
  "desc": "请概述本次补充信息及仍需确认事项",
  "jump": "无跳转",
  "options": []
 },
 {
  "no": 110,
  "module": "退出/拒访管理",
  "content": "退出/拒访类型",
  "type": "radio",
  "required": "required",
  "script": "理解，我们尊重您的决定。我确认一下您希望停止哪类随访或联系。",
  "desc": "患者选择的是哪种状态？",
  "jump": "无跳转",
  "options": [
   {
    "text": "完全退出项目",
    "sort": 1
   },
   {
    "text": "拒绝本次随访",
    "sort": 2
   },
   {
    "text": "要求停止电话联系",
    "sort": 3
   },
   {
    "text": "要求更换联系人",
    "sort": 4
   },
   {
    "text": "其他：_____",
    "sort": 5,
    "fill": true
   }
  ]
 },
 {
  "no": 111,
  "module": "退出/拒访管理",
  "content": "退出/拒访原因",
  "type": "radio",
  "required": "required",
  "script": "方便的话，我帮您记录一下原因，方便项目更新状态。",
  "desc": "患者退出或拒绝随访的原因是？",
  "jump": "不得施压或暗示退出影响治疗",
  "options": [
   {
    "text": "不想被打扰",
    "sort": 1
   },
   {
    "text": "已转院",
    "sort": 2
   },
   {
    "text": "已停药",
    "sort": 3
   },
   {
    "text": "家属代管",
    "sort": 4
   },
   {
    "text": "身体原因",
    "sort": 5
   },
   {
    "text": "对服务不满意",
    "sort": 6
   },
   {
    "text": "其他：_____",
    "sort": 7,
    "fill": true
   }
  ]
 },
 {
  "no": 112,
  "module": "退出/拒访管理",
  "content": "当次是否有安全性信息",
  "type": "radio",
  "required": "required",
  "script": "最后再确认一下，这次沟通中有没有提到用药后不适、检查异常或其他需要记录的情况？",
  "desc": "本次沟通中是否提到用药后不适、检查异常或特殊情形？",
  "jump": "选项2-3跳转安全性信息分类",
  "options": [
   {
    "text": "未提到",
    "sort": 1
   },
   {
    "text": "有",
    "sort": 2
   },
   {
    "text": "不确定",
    "sort": 3
   }
  ]
 },
 {
  "no": 113,
  "module": "退出/拒访管理",
  "content": "停止触达确认",
  "type": "radio",
  "required": "required",
  "script": "我会按您的要求更新联系限制，后续不做不必要的打扰。",
  "desc": "是否已按患者要求更新联系限制或停止常规触达？",
  "jump": "无跳转",
  "options": [
   {
    "text": "是",
    "sort": 1
   },
   {
    "text": "否",
    "sort": 2
   },
   {
    "text": "需项目经理确认",
    "sort": 3
   }
  ]
 },
 {
  "no": 114,
  "module": "退出/拒访管理",
  "content": "必要安全信息渠道",
  "type": "radio",
  "required": "optional",
  "script": "如后续仍有必要安全性信息需要处理，项目会按既定流程确认合适的联系渠道。",
  "desc": "是否保留必要安全性信息上报渠道？",
  "jump": "尊重患者意愿，同时保留法规要求的处理路径",
  "options": [
   {
    "text": "保留",
    "sort": 1
   },
   {
    "text": "不保留",
    "sort": 2
   },
   {
    "text": "由项目/PV确认",
    "sort": 3
   }
  ]
 },
 {
  "no": 115,
  "module": "退出/拒访管理",
  "content": "退出/拒访记录",
  "type": "text",
  "required": "required",
  "script": "我记录一下本次拒访时间、沟通对象和您的原话。",
  "desc": "请记录拒访时间、沟通对象、执行人及患者原话",
  "jump": "无跳转",
  "options": []
 },
 {
  "no": 116,
  "module": "患者关切/其他",
  "content": "患者关心的问题",
  "type": "checkbox",
  "required": "optional",
  "script": "最后我想了解一下，您近期比较关心哪些问题？",
  "desc": "随访中，患者是否提及以下关心话题？",
  "jump": "仅记录需求，按项目权限转接",
  "options": [
   {
    "text": "药品价格/支付压力",
    "sort": 1,
    "inSummary": true
   },
   {
    "text": "新药或治疗方案咨询",
    "sort": 2,
    "inSummary": true
   },
   {
    "text": "慈善援助政策",
    "sort": 3,
    "inSummary": true
   },
   {
    "text": "疾病治疗咨询",
    "sort": 4,
    "inSummary": true
   },
   {
    "text": "不良反应及处理",
    "sort": 5,
    "inSummary": true
   },
   {
    "text": "医保政策",
    "sort": 6,
    "inSummary": true
   },
   {
    "text": "营养搭配",
    "sort": 7,
    "inSummary": true
   },
   {
    "text": "心理/情绪支持",
    "sort": 8,
    "inSummary": true
   },
   {
    "text": "其他：_____",
    "sort": 9,
    "fill": true,
    "inSummary": true
   }
  ]
 },
 {
  "no": 117,
  "module": "患者关切/其他",
  "content": "其他服务需求",
  "type": "text",
  "required": "optional",
  "script": "除了刚才提到的问题，您还有哪些需要项目协助记录或转达的问题？",
  "desc": "患者是否提出其他需要项目协助的问题？",
  "jump": "不得承诺超出项目权限的服务",
  "options": []
 },
 {
  "no": 118,
  "module": "随访小结",
  "content": "本次随访小结",
  "type": "text",
  "required": "required",
  "script": "我最后核对一下本次随访记录，包括治疗、复查、身体情况和需要转交的问题。",
  "desc": "请总结本次随访中有效性、依从性、安全性及服务动作",
  "jump": "每次必填",
  "options": []
 },
 {
  "no": 119,
  "module": "随访小结",
  "content": "下次随访日期",
  "type": "date",
  "required": "optional",
  "script": "我确认一下下次随访日期，方便系统生成提醒。",
  "desc": "下次计划随访日期是？",
  "jump": "用于生成下次任务",
  "options": []
 },
 {
  "no": 120,
  "module": "随访小结",
  "content": "下次重点跟进事项",
  "type": "text",
  "required": "optional",
  "script": "下次随访需要重点确认什么，我先记录下来。",
  "desc": "下次随访需要重点确认什么？",
  "jump": "无跳转",
  "options": []
 },
 {
  "no": 121,
  "module": "随访小结",
  "content": "是否升级/转交",
  "type": "checkbox",
  "required": "required",
  "script": "本次记录中有没有需要项目经理、PV、质量或医学团队进一步确认的内容？",
  "desc": "本次随访是否需要升级或转交？",
  "jump": "选择后填写关联记录编号",
  "options": [
   {
    "text": "无需升级",
    "sort": 1
   },
   {
    "text": "项目经理",
    "sort": 2,
    "triggers": [
     122
    ]
   },
   {
    "text": "PV复核",
    "sort": 3,
    "triggers": [
     122
    ]
   },
   {
    "text": "PV初筛确认",
    "sort": 4,
    "triggers": [
     122
    ]
   },
   {
    "text": "质量部门",
    "sort": 5,
    "triggers": [
     122
    ]
   },
   {
    "text": "医学/院内接口",
    "sort": 6,
    "triggers": [
     122
    ]
   },
   {
    "text": "其他：_____",
    "sort": 7,
    "fill": true,
    "triggers": [
     122
    ]
   }
  ]
 },
 {
  "no": 122,
  "module": "随访小结",
  "content": "关联记录编号",
  "type": "text",
  "required": "cond",
  "script": "如有相关AE、PV、质量或项目工单编号，我在这里关联，避免重复记录。",
  "desc": "请填写AE/PV/质量/项目工单等关联记录编号",
  "jump": "无升级或转交时不展开",
  "options": [],
  "trigger": {
   "q": 121,
   "anyOf": [
    "项目经理",
    "PV复核",
    "PV初筛确认",
    "质量部门",
    "医学/院内接口",
    "其他"
   ]
  }
 },
 {
  "no": 123,
  "module": "复诊记录提交（患者端）",
  "content": "是否按计划复诊/治疗",
  "type": "radio",
  "required": "required",
  "script": "您好，您的复诊/治疗时间已经到了，麻烦用半分钟确认一下这次的情况。",
  "desc": "本次是否已按计划复诊/治疗？",
  "jump": "选项1继续填写实际复诊日期；选项2-3展开未复诊/改期原因",
  "options": [
   {
    "text": "已按计划复诊",
    "sort": 1,
    "triggers": [
     125,
     126
    ]
   },
   {
    "text": "未复诊·已延期",
    "sort": 2,
    "triggers": [
     124
    ]
   },
   {
    "text": "医生已改期",
    "sort": 3,
    "triggers": [
     124
    ]
   }
  ]
 },
 {
  "no": 124,
  "module": "复诊记录提交（患者端）",
  "content": "未复诊/改期原因",
  "type": "radio",
  "required": "cond",
  "script": "方便选一下这次没有按时复诊的主要原因吗？我们只是帮您记录，不评价这个决定。",
  "desc": "本次未按时复诊或改期的主要原因是？",
  "jump": "提交后自动生成超期未复诊召回任务；选身体不适或疗效不好时引导补充不适情况",
  "options": [
   {
    "text": "挂不到号",
    "sort": 1
   },
   {
    "text": "经济原因",
    "sort": 2
   },
   {
    "text": "身体不适",
    "sort": 3
   },
   {
    "text": "感觉病情稳定",
    "sort": 4
   },
   {
    "text": "感觉疗效不好",
    "sort": 5
   },
   {
    "text": "交通/外地",
    "sort": 6
   },
   {
    "text": "医生建议",
    "sort": 7
   },
   {
    "text": "其他：_____",
    "sort": 8,
    "fill": true
   },
   {
    "text": "不清楚",
    "sort": 9
   }
  ],
  "trigger": {
   "q": 123,
   "anyOf": [
    "未复诊·已延期",
    "医生已改期"
   ]
  }
 },
 {
  "no": 125,
  "module": "复诊记录提交（患者端）",
  "content": "实际复诊日期",
  "type": "date",
  "required": "cond",
  "script": "请问您实际是哪一天去复诊/治疗的？",
  "desc": "实际复诊/治疗日期是？",
  "jump": "已按计划复诊时填写",
  "options": [],
  "trigger": {
   "q": 123,
   "anyOf": [
    "已按计划复诊"
   ]
  }
 },
 {
  "no": 126,
  "module": "复诊记录提交（患者端）",
  "content": "本次是否完成治疗用药",
  "type": "radio",
  "required": "cond",
  "script": "这次治疗用药完成了吗？",
  "desc": "本次是否完成治疗用药？",
  "jump": "选项2-3由专员随访时核实原因",
  "options": [
   {
    "text": "已完成",
    "sort": 1
   },
   {
    "text": "部分完成",
    "sort": 2
   },
   {
    "text": "未完成",
    "sort": 3
   },
   {
    "text": "不清楚",
    "sort": 4
   }
  ],
  "trigger": {
   "q": 123,
   "anyOf": [
    "已按计划复诊"
   ]
  }
 },
 {
  "no": 127,
  "module": "复诊记录提交（患者端）",
  "content": "医生是否调整治疗方案",
  "type": "radio",
  "required": "required",
  "script": "医生有没有调整您的治疗方案？",
  "desc": "医生是否调整了治疗方案？",
  "jump": "选项2由专员随访时核对调整内容",
  "options": [
   {
    "text": "未调整",
    "sort": 1
   },
   {
    "text": "已调整",
    "sort": 2
   },
   {
    "text": "不清楚",
    "sort": 3
   }
  ]
 },
 {
  "no": 128,
  "module": "复诊记录提交（患者端）",
  "content": "复查/检查结果",
  "type": "radio",
  "required": "optional",
  "script": "这次复查或检查的结果出来了吗？如果出来了，也可以拍照上传，方便项目服务人员帮您记录。",
  "desc": "本次复查/检查结果是否已出？",
  "jump": "仅记录，不要求提供完整病历",
  "options": [
   {
    "text": "已出结果（可拍照上传）",
    "sort": 1
   },
   {
    "text": "未出结果",
    "sort": 2
   },
   {
    "text": "本次无复查",
    "sort": 3
   }
  ]
 },
 {
  "no": 129,
  "module": "复诊记录提交（患者端）",
  "content": "近期是否有不适",
  "type": "radio",
  "required": "required",
  "script": "最近身体有没有出现和平时不太一样的不舒服？",
  "desc": "最近是否有身体不适、检查异常，或因身体情况门诊、急诊、住院？",
  "jump": "选项2-3展开不适简述",
  "options": [
   {
    "text": "无",
    "sort": 1
   },
   {
    "text": "有",
    "sort": 2,
    "triggers": [
     130
    ]
   },
   {
    "text": "不确定",
    "sort": 3,
    "triggers": [
     130
    ]
   }
  ]
 },
 {
  "no": 130,
  "module": "复诊记录提交（患者端）",
  "content": "不适简述",
  "type": "text",
  "required": "cond",
  "script": "麻烦简单描述一下不舒服的情况、大概开始时间和有没有去看过医生，项目服务人员会尽快和您联系确认。",
  "desc": "请简述不适情况、开始时间及是否就医",
  "jump": "提交后自动生成异常症状/AE即时随访任务，由专员/随访中心做分级追问；患者端不做AE分级",
  "options": [],
  "trigger": {
   "q": 129,
   "anyOf": [
    "有",
    "不确定"
   ]
  }
 },
 {
  "no": 131,
  "module": "复诊记录提交（患者端）",
  "content": "下次复诊/治疗时间",
  "type": "date",
  "required": "optional",
  "script": "如果医生告诉了下次复诊或治疗时间，麻烦填一下，我们到时间提醒您。",
  "desc": "医生告知的下次复诊/治疗日期是？",
  "jump": "用于更新下次随访与提醒计划",
  "options": []
 }
];
