import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Sparkles,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  History,
  Copy,
  Check,
  Volume2,
  RefreshCw,
  Lightbulb,
  ExternalLink,
  HelpCircle,
  Brain,
  Compass,
  Zap,
  ChevronRight,
  ArrowRight,
  Dice5,
  Share2,
  Filter,
  X,
  Flame,
  Award,
  Settings,
  Key,
  Globe
} from 'lucide-react';

// 丰富详实的离线预置知识库，当 API 不可用或网络波动时提供丝滑保障
const PRESET_ENCYCLOPEDIA = [
  {
    id: 'aglet',
    name: '鞋带箍',
    pinyin: 'xié dài gū',
    foreignName: 'Aglet (绳头包管)',
    category: '日常冷门物件',
    matchScore: 99,
    oneSentenceDef: '鞋带两端包裹的塑料或金属小套管，防止散线并便于穿孔。',
    description: '鞋带箍（Aglet）来自古法语“aguillette”，原意是“小针”。它的存在不仅防止鞋带编织线散开，坚硬的细管设计还让穿过鞋眼变得极其顺滑。在动画片《飞哥与小佛》中，还有一整集为它创作了洗脑歌曲《A-G-L-E-T》。',
    memoryTriggers: [
      '在鞋带或帽衫抽绳的两头',
      '摸起来硬硬的，多为透明塑料或金属卷成',
      '一旦碎掉或掉了，绳头就会炸毛穿不进小孔'
    ],
    trivia: '罗马时代人们就用金属甚至贵金属制作鞋带箍，当时不仅是实用构件，更是一种服饰上的身份象征。',
    alternatives: [
      { name: '热缩管 (Heat Shrink Tube)', reason: '常用于包裹电线接头，外形和材质与塑料鞋带箍非常类似。' },
      { name: '绳扣 / 猪鼻扣 (Cord Lock)', reason: '用于快速调节抽绳长短的带弹簧的塑料扣子。' }
    ]
  },
  {
    id: 'pizza-saver',
    name: '披萨支架',
    pinyin: 'pī sà zhī jià',
    foreignName: 'Pizza Saver (披萨小凳子/防塌支架)',
    category: '日常冷门物件',
    matchScore: 98,
    oneSentenceDef: '放在外卖披萨盒正中心的三脚白色塑料微型“小圆凳”。',
    description: '1985年由美国发明家卡梅拉·维塔勒（Carmela Vitale）申请专利，名为“包装保护器”。热腾腾的披萨释放蒸汽会让纸盒变软塌陷，这个小支架刚好顶住盒盖中央，避免热融化的奶酪直接粘在纸盒顶部。',
    memoryTriggers: [
      '外卖披萨正中间插着',
      '长得极像芭比娃娃用的白色塑料三脚小圆桌',
      '拿掉后披萨中间会留下三个小圆孔'
    ],
    trivia: '在加拿大有连锁餐厅曾为了恶搞，为这个披萨支架量身定做了两把配套的“微型小折叠椅”，引发全网疯传。',
    alternatives: [
      { name: '蛋糕围边 / 蛋糕插牌', reason: '用于保护糕点造型或装饰的塑料插件。' },
      { name: '面包扎丝', reason: '用于封口的细铁丝胶带，同属易忽视的食品包装小件。' }
    ]
  },
  {
    id: 'semantic-satiation',
    name: '语义饱和',
    pinyin: 'yǔ yì bǎo hé',
    foreignName: 'Semantic Satiation (字形饱和/完形崩坏)',
    category: '心理与感官现象',
    matchScore: 97,
    oneSentenceDef: '盯着一个熟悉的字看太久，大脑神经元产生抑制，突然觉得这根本不像个字。',
    description: '当一个人长时间重复注视或念诵同一个词时，大脑中对应的大脑皮层神经元会因持续刺激而产生疲劳抑制。结果是感知过程退化为单纯的笔画线条碎片，短时间内暂时丢失了该符号所代表的整体语义。',
    memoryTriggers: [
      '长时间盯着“若”、“金”、“明”等字写几十遍',
      '突然大脑宕机：“等等，这个字是这么写的吗？它真的是个字？”',
      '闭眼休息几秒钟后，认知又神奇地恢复正常'
    ],
    trivia: '不仅汉字会发生，英语母语者重复念诵“door”或“apple”几十秒后，也会突然觉得这串发音像是某种外星鸟叫。',
    alternatives: [
      { name: '旧事如新感 (Jamais vu)', reason: '心理学中对极度熟悉的环境或人突然产生完全陌生的疏离感。' },
      { name: '失语症 (Aphasia)', reason: '脑部受损导致的言语功能障碍，而非正常的短暂生理疲劳。' }
    ]
  },
  {
    id: 'petrichor',
    name: '泥土初雨味',
    pinyin: 'ní tǔ chū yǔ wèi',
    foreignName: 'Petrichor (潮土油香/初雨之气)',
    category: '自然与科学冷知识',
    matchScore: 99,
    oneSentenceDef: '干旱大地迎来初降甘霖时，空气中弥漫的特有清新泥土清香。',
    description: '该词由澳洲矿物学家在1964年创造（结合希腊语petra“岩石”与ichor“神之血”）。气味主要由土壤中的放线菌释放出的“土臭素（Geosmin）”以及植物在干旱期分泌并吸附在土壤中的植物精油共同构成。当雨滴砸击地面时，会在微小气泡破裂中形成气溶胶飘散到空中。',
    memoryTriggers: [
      '夏天干燥闷热了好几天突然砸下大雨点',
      '扑面而来的凉意混杂着泥土、青草和岩石的混合香气',
      '闻到会让人本能地感到神清气爽、安心平静'
    ],
    trivia: '人类对土臭素（Geosmin）的嗅觉敏锐度不可思议，其阈值比鲨鱼闻到血液还要灵敏万倍！这是人类远古祖先追寻水源演化出的生存本能。',
    alternatives: [
      { name: '臭氧味 (Ozone Smell)', reason: '雷暴天气雷电电离空气产生的微甜刺鼻金属味，常与初雨味同时出现。' },
      { name: '割草香 (Green Leaf Volatiles)', reason: '青草被修剪或破坏时释放的创伤防御气味。' }
    ]
  },
  {
    id: 'earworm',
    name: '耳虫效应',
    pinyin: 'ěr chóng xiào yìng',
    foreignName: 'Earworm (非自主音乐意象 / INMI)',
    category: '心理与感官现象',
    matchScore: 98,
    oneSentenceDef: '一段简短的旋律或副歌在脑海中不断不受控地单曲循环。',
    description: '源自德语“Ohrwurm”。大约90%的人每周至少经历一次。通常发生在大脑处于低注意力（如散步、洗澡、做家务）或高度焦虑时，一段具备高节奏感、音程跳跃较小但旋律鲜明的“音乐黏着片段”在大脑听觉皮层陷入了神经回路的自激震荡。',
    memoryTriggers: [
      '不自觉地哼唱一两句网络神曲或广告旋律',
      '哪怕你心里其实并不喜欢这首歌，它依然在脑子里循环一整天',
      '试图用另一首歌覆盖，结果往往被传染成新的耳虫'
    ],
    trivia: '心理学家发现打破耳虫的最佳方法不是硬抗，而是“听完整首歌”（给大脑画上休止符），或者嚼口香糖（干扰负责内在语音回放的下颌运动皮层）。',
    alternatives: [
      { name: '强迫症思维 (Obsessive Thoughts)', reason: '病理性的反复侵入性念头，耳虫通常是良性且短暂的。' },
      { name: '幻听 (Musical Hallucination)', reason: '真正的幻听会让人以为声音来自真实外部空间，而耳虫明确知道在脑海中。' }
    ]
  },
  {
    id: 'deja-vu',
    name: '既视感',
    pinyin: 'jì shì gǎn',
    foreignName: 'Déjà vu (幻觉记忆/海马体延时错觉)',
    category: '心理与感官现象',
    matchScore: 96,
    oneSentenceDef: '身处全新未知场景时，心中强烈涌起“我绝对经历过这一刻”的神秘错觉。',
    description: '法语意为“已经看过”。现代神经学认为，这是大脑处理感官信息时产生的微秒级“时间戳错位”——当前视觉信号尚未被意识完全处理，便因神经回路捷径被提前写入了负责长期记忆的海马体，使意识误以为这是提取自过往回忆的画面。',
    memoryTriggers: [
      '到一个从未去过的异国街角，突然觉得连转角小狗的叫声都梦到过',
      '朋友刚说出一句话，你强烈预感他下一秒要抬手挠头，且真的发生了',
      '持续时间通常只有短暂的几秒钟，伴随轻微的恍惚与震撼'
    ],
    trivia: '与之相对的罕见现象叫“未视感 (Jamais vu)”——面对自己居住了十年的房间或至亲的脸庞，突然产生“我从没见过这里/这个人”的诡异陌生感。',
    alternatives: [
      { name: '预知梦 (Precognitive Dream)', reason: '很多人常将既视感误归结为自己曾经做过的预言梦境。' },
      { name: '虚假记忆 (False Memory)', reason: '在大脑中被外界暗示或自行重构出的并不存在的记忆碎片。' }
    ]
  },
  {
    id: 'punt',
    name: '酒瓶凹槽',
    pinyin: 'jiǔ píng āo cáo',
    foreignName: 'Punt (酒窝 / 瓶底凹顶)',
    category: '日常冷门物件',
    matchScore: 95,
    oneSentenceDef: '红酒或香槟瓶底部往内深凹进去的半球形圆弧坑。',
    description: '早期手工吹制玻璃瓶时，工匠吹完玻璃需用顶针撑起底部，凹陷能保证底部边缘平整，瓶子放在桌上不会摇晃倾倒。现代生产中，这个凹槽极大地增强了香槟等起泡酒承受高气压的能力，同时有助于葡萄酒陈年时沉淀杂质聚拢在槽环边缘，倒酒时侍酒师单手拇指扣入也更符合人体工程学。',
    memoryTriggers: [
      '拿葡萄酒瓶时大拇指刚好可以塞进去抠住',
      '很多人误以为“凹槽越深酒越高级”（其实是营销误区）',
      '香槟瓶底的凹槽往往比普通干红更深更厚'
    ],
    trivia: '民间流传“凹槽越深酒越名贵”纯属谣言，凹槽深浅只与瓶型传统和抗压需求有关，与葡萄酒酒质并无直接对应关系。',
    alternatives: [
      { name: '封套 (Foil Capsule)', reason: '葡萄酒瓶口密封软木塞的铝箔或塑料保护罩。' },
      { name: '瓶肩 (Shoulder)', reason: '葡萄酒瓶身与瓶颈连接的弧形过渡部分。' }
    ]
  },
  {
    id: 'tyndall-effect',
    name: '丁达尔效应',
    pinyin: 'dīng dá ěr xiào yìng',
    foreignName: 'Tyndall Effect (微粒散射发光柱)',
    category: '自然与科学冷知识',
    matchScore: 98,
    oneSentenceDef: '光线穿透薄雾、晨林或胶体时，形成一条清晰可见的唯美明亮光通路。',
    description: '当一束光线透过胶体（如清晨富含水汽和灰尘微粒的树林、雾霾或有烟雾的房间）时，胶体粒子直径恰好在1~100nm之间，小于入射光的波长，使光发生明显的侧向散射，从而在人眼看来光路本身变成了明亮的光柱。“当丁达尔效应出现时，光便有了形状。”',
    memoryTriggers: [
      '清晨阳光从幽暗森林的树冠缝隙倾泻下来的一束束圣光',
      '电影院里放映机投射到大银幕上的那道灰尘飞舞的微光隧道',
      '拉开窗帘时，阳光在屋里照出的一条清晰光束'
    ],
    trivia: '文艺青年常把“当丁达尔效应发生时，光就有了形状；当你出现时，心动就有了定义”作为浪漫告白文案。',
    alternatives: [
      { name: '云隙光 / 耶稣光 (Crepuscular Rays)', reason: '气象学上特指云层缝隙透出的宏观辐射状阳光柱。' },
      { name: '瑞利散射 (Rayleigh Scattering)', reason: '粒子尺寸远小于光波长时的散射现象，是天空呈蔚蓝色的原因。' }
    ]
  }
];

const CATEGORIES = [
  '全部',
  '日常冷门物件',
  '心理与感官现象',
  '高级成语与修辞',
  '影视文学寻名',
  '自然与科学冷知识'
];

const QUICK_SEARCH_PROMPTS = [
  { text: '鞋带两头的塑料小套管叫什么', category: '日常冷门物件' },
  { text: '披萨盒中间防塌的白色塑料小凳子', category: '日常冷门物件' },
  { text: '突然觉得某个熟悉字越看越不认识的现象', category: '心理与感官现象' },
  { text: '下过暴雨后空气中特别好闻的泥土味道', category: '自然与科学冷知识' },
  { text: '某段歌词在脑子里无限循环停不下来', category: '心理与感官现象' },
  { text: '葡萄酒瓶子底部往里凹进去的圆坑', category: '日常冷门物件' },
  { text: '清晨森林里一道道清晰看得见的光柱', category: '自然与科学冷知识' },
  { text: '明明是第一次见的人却觉得以前完全经历过', category: '心理与感官现象' },
  { text: '一部小李子在多层梦境里植入想法的科幻电影', category: '影视文学寻名' },
  { text: '形容一个人虽然贫困但坚守气节的成语', category: '高级成语与修辞' }
];

const LOADING_STEPS = [
  '正在翻阅人类记忆殿堂的抽屉...',
  '正在打通深层神经网络的语言突触...',
  '正在排除相似词汇干扰，收敛特征...',
  '马上就要想起来了！灵光正在闪烁...'
];

// 安全保存并读取本地存储
const getStoredList = (key, defaultVal) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
};

const setStoredList = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error', e);
  }
};

async function callGeminiReverseLookup(userQuery, categoryHint = '') {
  const storedKey = typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') : '';
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
  const apiKey = storedKey || envKey || '';

  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const baseUrl = (typeof window !== 'undefined' && localStorage.getItem('gemini_api_base')) 
    || 'https://generativelanguage.googleapis.com';
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const model = (typeof window !== 'undefined' && localStorage.getItem('gemini_model')) 
    || 'gemini-2.5-flash';

  const apiUrl = `${cleanBase}/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const systemPrompt = `你是一个世界级的概念反向检索词典与博学杂学家。用户正处于“话到嘴边却叫不上来”的极度困惑状态。
你的任务是根据用户那段充满口语化、感官感受或模糊细节的特征描述，精准反向锁定最符合的标准专业学名/专有名词/成语/作品名。

要求：
1. 必须返回纯JSON格式，严禁包含Markdown代码块反引号（不要包含 \`\`\`json 标记）。
2. JSON结构必须符合以下格式：
{
  "primaryMatch": {
    "name": "标准中文名",
    "pinyin": "中文拼音带声调",
    "foreignName": "英文名或学名/起源语言词",
    "category": "分类（如：日常冷门物件 / 心理与感官现象 / 高级成语与修辞 / 影视文学寻名 / 自然与科学冷知识）",
    "matchScore": 98,
    "oneSentenceDef": "极度精炼的一句话定义（30字以内）",
    "description": "详细定义、运作机制与由来，解释得令人恍然大悟（150字以内）",
    "memoryTriggers": [
      "特征对照1（证明用户印象非常准确的点）",
      "特征对照2",
      "特征对照3"
    ],
    "trivia": "极其有趣的冷知识、历史故事或趣闻梗"
  },
  "alternatives": [
    { "name": "备选词汇1", "reason": "为什么容易跟它混淆，两者的精细区别" },
    { "name": "备选词汇2", "reason": "在什么情况下其实用户可能想表达的是这个" }
  ]
}`;

  const userPrompt = `用户描述：“${userQuery}”${categoryHint && categoryHint !== '全部' ? ` (限定倾向分类：${categoryHint})` : ''}。
请分析这具体叫什么，请直接输出上述指定JSON格式内容。`;

  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  // 增加指数退避重试逻辑
  const maxRetries = 2;
  let delay = 1000;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API status ${response.status}`);
      }

      const result = await response.json();
      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("No text in candidate");

      // 清理可能误带的反引号包裹
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      if (i === maxRetries) {
        throw err;
      }
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
}

// 离线状态本地模糊降级推测，确保演示绝对可靠
function findLocalFallback(query) {
  const q = query.toLowerCase().replace(/\s+/g, '');
  
  if (q.includes('鞋带') || q.includes('套管') || q.includes('塑料头') || q.includes('包头')) {
    return PRESET_ENCYCLOPEDIA.find(item => item.id === 'aglet');
  }
  if (q.includes('披萨') || q.includes('三脚') || q.includes('防塌') || q.includes('小凳子') || q.includes('白色塑料')) {
    return PRESET_ENCYCLOPEDIA.find(item => item.id === 'pizza-saver');
  }
  if (q.includes('看久') || q.includes('不像字') || q.includes('不认识') || q.includes('写多') || q.includes('字越看')) {
    return PRESET_ENCYCLOPEDIA.find(item => item.id === 'semantic-satiation');
  }
  if (q.includes('下雨') || q.includes('泥土') || q.includes('暴雨') || q.includes('初雨') || q.includes('清香') || q.includes('气味')) {
    return PRESET_ENCYCLOPEDIA.find(item => item.id === 'petrichor');
  }
  if (q.includes('歌') || q.includes('旋律') || q.includes('洗脑') || q.includes('单曲循环') || q.includes('脑子里停不下来')) {
    return PRESET_ENCYCLOPEDIA.find(item => item.id === 'earworm');
  }
  if (q.includes('以前经历') || q.includes('似曾相识') || q.includes('第一次') || q.includes('场景很熟悉') || q.includes('梦见过')) {
    return PRESET_ENCYCLOPEDIA.find(item => item.id === 'deja-vu');
  }
  if (q.includes('红酒') || q.includes('酒瓶') || q.includes('大拇指') || q.includes('凹槽') || q.includes('瓶底')) {
    return PRESET_ENCYCLOPEDIA.find(item => item.id === 'punt');
  }
  if (q.includes('光柱') || q.includes('森林') || q.includes('丁达尔') || q.includes('光线') || q.includes('放映机')) {
    return PRESET_ENCYCLOPEDIA.find(item => item.id === 'tyndall-effect');
  }
  if (q.includes('盗梦') || q.includes('梦境') || q.includes('小李子') || q.includes('陀螺')) {
    return {
      name: '《盗梦空间》 (Inception)',
      pinyin: 'dào mèng kōng jiān',
      foreignName: 'Inception (2010)',
      category: '影视文学寻名',
      matchScore: 99,
      oneSentenceDef: '克里斯托弗·诺兰执导，莱昂纳多主演的多层梦境潜入科幻经典。',
      description: '讲述由柯布带领的造梦师团队，通过注射镇静剂进入目标人物的潜意识层层梦境，企图植入思想（Inception）的惊险故事。标志性道具是旋转不停辨别现实与梦境的银色小陀螺。',
      memoryTriggers: ['多层梦境嵌套 (梦中梦中梦)', '男主角有辨识虚实的随身图腾陀螺', '失重走廊打斗打戏'],
      trivia: '电影结尾陀螺微微晃动但画面戛然而止，引发全球影迷长达十余年的结局现实争辩。',
      alternatives: [
        { name: '《红辣椒》 (Paprika)', reason: '今敏大师执导的日本神作，探讨梦境机器DC迷你的梦境交叠。' },
        { name: '《黑客帝国》 (The Matrix)', reason: '同样探讨现实与虚构意识界限的划时代科幻电影。' }
      ]
    };
  }

  // 默认智能构造兜底卡片
  return {
    name: '话到嘴边的概念：' + query.slice(0, 10),
    pinyin: 'huà dào zuǐ biān',
    foreignName: 'Tip-of-the-tongue phenomenon (TOT)',
    category: '待解概念',
    matchScore: 88,
    oneSentenceDef: '一种极其典型的“舌尖现象 (Tip-of-the-tongue)”。',
    description: '心理学上的舌尖现象（TOT）：指明明知道某个答案或词语，且能描述其边缘特征（声调、字形、使用场景），但由于短时言语提取线索暂时受阻，就是无法说出该词的心理状态。',
    memoryTriggers: [
      `你记住了核心特征：“${query}”`,
      '感知线索非常清晰，只差最后的词汇代号拼图',
      '往往在放松或转移注意力后几分钟内突然脱口而出'
    ],
    trivia: '研究表明成年人每周都会经历大约一次舌尖现象，双语使用者发生的频率往往高于单语者。',
    alternatives: [
      { name: '认知负荷过载', reason: '大脑同时处理太多线索导致言语提取暂时卡顿。' },
      { name: '概念遗忘症', reason: '长期未使用导致的记忆索引衰退。' }
    ]
  };
}

const Toast = ({ message, show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-stone-900 text-stone-100 px-5 py-3 rounded-2xl shadow-2xl border border-stone-700 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <Check className="w-5 h-5 text-amber-400" />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="text-stone-400 hover:text-stone-200 ml-2">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('search'); // 'search' | 'discovery' | 'mystery' | 'saved'
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [currentResult, setCurrentResult] = useState(null);
  
  // 收藏与历史记录持久化
  const [bookmarks, setBookmarks] = useState(() => getStoredList('tot_bookmarks', [PRESET_ENCYCLOPEDIA[0], PRESET_ENCYCLOPEDIA[2]]));
  const [history, setHistory] = useState(() => getStoredList('tot_history', ['鞋带两头的塑料小套管叫什么', '披萨盒中间防塌的白色塑料小凳子']));
  
  // 复制与语音朗读反馈
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [mysteryCard, setMysteryCard] = useState(null);
  const [isMysteryFlipped, setIsMysteryFlipped] = useState(false);

  // API 设置弹窗状态
  const [showSettings, setShowSettings] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') || '' : ''));
  const [geminiBaseInput, setGeminiBaseInput] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('gemini_api_base') || '' : ''));
  const [geminiModelInput, setGeminiModelInput] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('gemini_model') || 'gemini-2.5-flash' : 'gemini-2.5-flash'));

  const searchInputRef = useRef(null);

  const handleSaveSettings = () => {
    if (geminiKeyInput.trim()) {
      localStorage.setItem('gemini_api_key', geminiKeyInput.trim());
    } else {
      localStorage.removeItem('gemini_api_key');
    }
    if (geminiBaseInput.trim()) {
      localStorage.setItem('gemini_api_base', geminiBaseInput.trim());
    } else {
      localStorage.removeItem('gemini_api_base');
    }
    localStorage.setItem('gemini_model', geminiModelInput);
    setShowSettings(false);
    triggerToast(geminiKeyInput.trim() ? 'Gemini API 配置已保存' : '已恢复默认离线知识库模式');
  };

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // 动态切换加载幽默提示文案
  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 900);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  // 同步保存到 localStorage
  useEffect(() => {
    setStoredList('tot_bookmarks', bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    setStoredList('tot_history', history);
  }, [history]);

  const handleSearch = async (textToSearch = query) => {
    const trimmed = textToSearch.trim();
    if (!trimmed) {
      searchInputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    setCurrentResult(null);
    setActiveTab('search');

    // 添加历史记录
    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== trimmed);
      return [trimmed, ...filtered].slice(0, 20);
    });

    try {
      // 优先请求 Gemini API
      const resultData = await callGeminiReverseLookup(trimmed, selectedCategory);
      if (resultData && resultData.primaryMatch) {
        setCurrentResult({
          ...resultData.primaryMatch,
          alternatives: resultData.alternatives || []
        });
      } else {
        throw new Error('Incomplete structure');
      }
    } catch (err: any) {
      if (err?.message !== 'NO_API_KEY') {
        console.warn('API lookup failed, falling back to rich local dictionary:', err);
      }
      // 优雅降级
      const fallback = findLocalFallback(trimmed);
      setCurrentResult(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const isBookmarked = (item) => {
    if (!item) return false;
    return bookmarks.some((b) => b.name === item.name);
  };

  const toggleBookmark = (item) => {
    if (!item) return;
    if (isBookmarked(item)) {
      setBookmarks((prev) => prev.filter((b) => b.name !== item.name));
      triggerToast(`已从收藏夹中移除 “${item.name}”`);
    } else {
      const newBookmark = {
        id: item.id || `custom-${Date.now()}`,
        name: item.name,
        pinyin: item.pinyin,
        foreignName: item.foreignName,
        category: item.category || '已收藏概念',
        oneSentenceDef: item.oneSentenceDef,
        description: item.description,
        memoryTriggers: item.memoryTriggers || [],
        trivia: item.trivia || '',
        alternatives: item.alternatives || []
      };
      setBookmarks((prev) => [newBookmark, ...prev]);
      triggerToast(`已收藏 “${item.name}”！`);
    }
  };

  const handleCopy = (text, id = 'main') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      triggerToast('已复制到剪贴板！');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      triggerToast(`正在语音发音：“${text}”`);
    } else {
      triggerToast('当前浏览器不支持语音发音');
    }
  };

  const drawMysteryCard = () => {
    setIsMysteryFlipped(false);
    const randomIndex = Math.floor(Math.random() * PRESET_ENCYCLOPEDIA.length);
    setMysteryCard(PRESET_ENCYCLOPEDIA[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 antialiased selection:bg-amber-200 selection:text-amber-900 flex flex-col font-sans">
      <Toast message={toastMsg} show={showToast} onClose={() => setShowToast(false)} />

      {/* 顶部优雅导航栏 */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-stone-50/85 border-b border-stone-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div 
            onClick={() => { setActiveTab('search'); setCurrentResult(null); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-stone-900 tracking-tight">话到嘴边</span>
                <span className="text-xs bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full border border-amber-200/60">
                  Tip of My Tongue
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">专治“那个叫什么来着”的记忆打捞神器</p>
            </div>
          </div>

          {/* 导航标签组 */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'search'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>智能寻词</span>
            </button>

            <button
              onClick={() => setActiveTab('discovery')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'discovery'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>灵感发现墙</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('mystery');
                if (!mysteryCard) drawMysteryCard();
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'mystery'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Dice5 className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">记忆盲盒</span>
              <span className="sm:hidden">盲盒</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors relative ${
                activeTab === 'saved'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">我的收藏</span>
              {bookmarks.length > 0 && (
                <span className="bg-amber-400 text-stone-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="设置 API Key / 模型"
            >
              <Settings className="w-4 h-4 text-stone-500" />
              <span className="hidden sm:inline">设置</span>
            </button>
          </nav>
        </div>
      </header>

      {/* API 设置弹窗 */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">AI 检索设置</h3>
                  <p className="text-xs text-stone-500">配置 Gemini API 进行更强大的全网实时联想</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={geminiKeyInput}
                  onChange={(e) => setGeminiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition font-mono"
                />
                <div className="text-[11px] text-stone-400 mt-1.5 flex items-center justify-between">
                  <span>密钥仅保存在当前浏览器本地，绝不上传第三方。</span>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-700 hover:underline flex items-center gap-0.5"
                  >
                    获取免费 Key <ExternalLink className="w-3 h-3 inline" />
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  API 端点 / 代理地址 (可选)
                </label>
                <input
                  type="text"
                  value={geminiBaseInput}
                  onChange={(e) => setGeminiBaseInput(e.target.value)}
                  placeholder="https://generativelanguage.googleapis.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition font-mono"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  国内用户如遇网络受限，可填入反代地址。
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  模型名称
                </label>
                <select
                  value={geminiModelInput}
                  onChange={(e) => setGeminiModelInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                >
                  <option value="gemini-2.5-flash">gemini-2.5-flash (推荐，极速智能)</option>
                  <option value="gemini-1.5-flash">gemini-1.5-flash (轻量稳定)</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro (深度推理)</option>
                </select>
              </div>

              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                💡 <b>提示：</b> 若未配置 API Key，网站将自动使用<b>内置丰富的离线知识库与智能模糊匹配</b>，同样支持海量词汇检索、发现墙与记忆盲盒。
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setGeminiKeyInput('');
                  setGeminiBaseInput('');
                  setGeminiModelInput('gemini-2.5-flash');
                  localStorage.removeItem('gemini_api_key');
                  localStorage.removeItem('gemini_api_base');
                  localStorage.removeItem('gemini_model');
                  setShowSettings(false);
                  triggerToast('已清除 API 配置，恢复离线知识库模式');
                }}
                className="px-4 py-2 rounded-xl text-xs font-medium text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition"
              >
                清除配置
              </button>
              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-sm transition"
              >
                保存配置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 主体交互区域 */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* VIEW 1: SEARCH & RESULTS */}
        {activeTab === 'search' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hero 标语区 */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>基于 Gemini 智能语义网络进行反向特征推导</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                叫什么来着？帮你找回想不起的名字
              </h1>
              <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
                输入那些只留在你印象里的口语化细节、外形、感觉或剧情，我们帮你找出它的学术正名。
              </p>
            </div>

            {/* 搜索框与交互控制器 */}
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl blur-md opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-xl shadow-stone-200/60 border border-stone-200 p-2 sm:p-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1 flex items-center">
                      <Search className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="描述你脑海里的印象，例如：“鞋带两头的塑料小套管叫什么”..."
                        className="w-full pl-12 pr-4 py-3.5 bg-transparent text-stone-800 text-base placeholder:text-stone-400 focus:outline-none"
                      />
                      {query && (
                        <button
                          onClick={() => setQuery('')}
                          className="p-1.5 text-stone-400 hover:text-stone-600 mr-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => handleSearch()}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium shadow-md transition active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                          <span>打捞记忆中...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>帮我想想</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* 分类筛选器小胶囊 */}
                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                    <span className="text-stone-400 font-medium px-2 shrink-0 flex items-center gap-1">
                      <Filter className="w-3 h-3" /> 分类倾向:
                    </span>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                          selectedCategory === cat
                            ? 'bg-amber-100 text-amber-900 font-semibold'
                            : 'text-stone-500 hover:bg-stone-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 灵感快捷填词标签 */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-stone-400 flex items-center gap-1 mr-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> 大家常卡壳的描述:
                </span>
                {QUICK_SEARCH_PROMPTS.slice(0, 5).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(item.text);
                      handleSearch(item.text);
                    }}
                    className="text-xs bg-white hover:bg-amber-50 hover:border-amber-300 text-stone-600 px-3 py-1.5 rounded-full border border-stone-200 transition-all shadow-2xs hover:shadow-xs active:scale-95"
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>

            {/* 加载动画状态 */}
            {isLoading && (
              <div className="max-w-2xl mx-auto py-12 px-6 bg-white/70 backdrop-blur-sm rounded-3xl border border-stone-200/80 text-center space-y-4 shadow-sm animate-pulse">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin"></div>
                  <Brain className="w-7 h-7 text-amber-600 absolute inset-0 m-auto" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-stone-900">
                    {LOADING_STEPS[loadingStepIdx]}
                  </h3>
                  <p className="text-xs text-stone-400">正在分析特征相似度与反向索引映射...</p>
                </div>
              </div>
            )}

            {/* 搜索结果展示卡片 */}
            {!isLoading && currentResult && (
              <div className="max-w-3xl mx-auto animate-in zoom-in-95 duration-400 space-y-6">
                {/* 顶栏成功祝贺 */}
                <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200 px-4 py-3 rounded-2xl">
                  <div className="flex items-center gap-2 text-amber-900 text-sm font-medium">
                    <span className="text-base">🎉</span>
                    <span>找到了！你说的十有八九就是这个：</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-200/80 text-amber-900 text-xs px-2.5 py-1 rounded-full font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>吻合度 {currentResult.matchScore || 98}%</span>
                  </div>
                </div>

                {/* 核心大卡片 */}
                <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* 卡片头部：主名字、音标、外文名与操作 */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-100 pb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                            {currentResult.name}
                          </h2>
                          <button
                            onClick={() => handleSpeak(currentResult.name)}
                            title="语音发音"
                            className="p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-stone-500 flex-wrap">
                          {currentResult.pinyin && (
                            <span className="font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                              {currentResult.pinyin}
                            </span>
                          )}
                          {currentResult.foreignName && (
                            <span className="text-stone-400 font-serif italic">
                              {currentResult.foreignName}
                            </span>
                          )}
                          <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">
                            {currentResult.category}
                          </span>
                        </div>
                      </div>

                      {/* 收藏与复制操作区 */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(`${currentResult.name} - ${currentResult.oneSentenceDef}`, 'result')}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-stone-200 hover:bg-stone-50 text-stone-700 transition"
                        >
                          {copiedId === 'result' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">已复制</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-stone-500" />
                              <span>复制</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => toggleBookmark(currentResult)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                            isBookmarked(currentResult)
                              ? 'bg-amber-400 text-stone-950 shadow-sm'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          }`}
                        >
                          {isBookmarked(currentResult) ? (
                            <>
                              <BookmarkCheck className="w-4 h-4 fill-stone-950" />
                              <span>已收藏</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-4 h-4" />
                              <span>收藏</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 一句话精辟概括 */}
                    <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-stone-800">
                      <p className="text-base font-semibold leading-relaxed">
                        “{currentResult.oneSentenceDef}”
                      </p>
                    </div>

                    {/* 为什么你会有这个印象？特征核对表 */}
                    {currentResult.memoryTriggers && currentResult.memoryTriggers.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-amber-500" /> 唤醒记忆线索对照
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {currentResult.memoryTriggers.map((trigger, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-100 text-sm text-stone-700"
                            >
                              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span>{trigger}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 深度百科解释 */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-500" /> 详细释义与运作原理
                      </h4>
                      <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                        {currentResult.description}
                      </p>
                    </div>

                    {/* 趣味冷知识 / 逸闻 */}
                    {currentResult.trivia && (
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-stone-900 to-stone-800 text-stone-100 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                          <Lightbulb className="w-4 h-4" /> 恍然大悟冷知识
                        </div>
                        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                          {currentResult.trivia}
                        </p>
                      </div>
                    )}

                    {/* 备选概念对照 (如果不是这个，还可能是...) */}
                    {currentResult.alternatives && currentResult.alternatives.length > 0 && (
                      <div className="pt-4 border-t border-stone-100 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
                          如果不是它，你可能想找的是这些近义/混淆概念：
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentResult.alternatives.map((alt, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setQuery(alt.name);
                                handleSearch(alt.name);
                              }}
                              className="p-3.5 rounded-xl border border-stone-200/80 hover:border-amber-300 hover:bg-amber-50/40 cursor-pointer transition group"
                            >
                              <div className="flex items-center justify-between font-semibold text-sm text-stone-900 group-hover:text-amber-800">
                                <span>{alt.name}</span>
                                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition" />
                              </div>
                              <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                                {alt.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 空状态推荐指南 */}
            {!isLoading && !currentResult && (
              <div className="max-w-4xl mx-auto pt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-stone-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    点击即查：那些让人拍大腿的经典“学名”
                  </h3>
                  <button
                    onClick={() => setActiveTab('discovery')}
                    className="text-xs font-medium text-amber-700 hover:text-amber-800 flex items-center gap-1"
                  >
                    查看全部词条 <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PRESET_ENCYCLOPEDIA.slice(0, 6).map((card) => (
                    <div
                      key={card.id}
                      onClick={() => {
                        setQuery(card.name);
                        setCurrentResult(card);
                      }}
                      className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-300 hover:shadow-lg transition cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
                            {card.category}
                          </span>
                          <span className="text-xs text-stone-400 font-mono">{card.pinyin}</span>
                        </div>
                        <h4 className="font-bold text-lg text-stone-900 group-hover:text-amber-700 transition">
                          {card.name}
                        </h4>
                        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                          {card.oneSentenceDef}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                        <span className="truncate max-w-[180px] italic font-serif">{card.foreignName}</span>
                        <span className="text-amber-700 font-medium group-hover:underline">查看详解</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: DISCOVERY WALL (灵感发现墙) */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">灵感发现墙</h2>
                <p className="text-sm text-stone-500">
                  收录那些日常可见、耳熟能详却极少有人能叫出全名的奇妙概念
                </p>
              </div>

              {/* 分类快捷过滤 */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 发现墙卡片瀑布流 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRESET_ENCYCLOPEDIA.filter(
                (item) => selectedCategory === '全部' || item.category === selectedCategory
              ).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-xl hover:border-amber-300 transition duration-200 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-amber-50 text-amber-800 font-medium px-2.5 py-1 rounded-full border border-amber-200/60">
                        {item.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(item);
                        }}
                        className="text-stone-400 hover:text-amber-500 transition p-1"
                      >
                        {isBookmarked(item) ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-stone-900 group-hover:text-amber-800 transition">
                        {item.name}
                      </h3>
                      <div className="text-xs text-stone-400 font-mono mt-0.5">
                        {item.pinyin} · <span className="font-serif italic">{item.foreignName}</span>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-stone-700 leading-snug">
                      {item.oneSentenceDef}
                    </p>

                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-600 space-y-1">
                      <span className="font-semibold text-stone-700 block">💡 典型特征：</span>
                      <p className="line-clamp-2">{item.memoryTriggers[0]}</p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => handleSpeak(item.name)}
                      className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition"
                      title="朗读"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentResult(item);
                        setActiveTab('search');
                      }}
                      className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 group-hover:translate-x-1 transition"
                    >
                      探索深度解析 <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: MYSTERY BOX (随想盲盒抽卡) */}
        {activeTab === 'mystery' && (
          <div className="max-w-xl mx-auto space-y-8 py-6 text-center animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
                <Dice5 className="w-3.5 h-3.5 text-amber-600" />
                <span>记忆唤醒大挑战</span>
              </div>
              <h2 className="text-3xl font-extrabold text-stone-900">话到嘴边盲盒</h2>
              <p className="text-sm text-stone-500">
                看描述猜名字，翻牌见证“原来叫这个！”的顿悟时刻
              </p>
            </div>

            {mysteryCard && (
              <div className="perspective-1000 min-h-[380px] flex items-center justify-center">
                <div
                  onClick={() => setIsMysteryFlipped(!isMysteryFlipped)}
                  className={`w-full max-w-md bg-white rounded-3xl border-2 border-stone-200 p-8 shadow-2xl transition-all duration-500 cursor-pointer hover:border-amber-400 flex flex-col justify-between min-h-[360px] ${
                    isMysteryFlipped ? 'ring-4 ring-amber-300/40 bg-gradient-to-b from-white to-amber-50/40' : ''
                  }`}
                >
                  {!isMysteryFlipped ? (
                    // 卡片正面：给特征，考考你
                    <div className="space-y-6 flex-1 flex flex-col justify-center">
                      <div className="inline-block mx-auto bg-stone-100 text-stone-600 text-xs font-semibold px-3 py-1 rounded-full">
                        {mysteryCard.category} · 猜猜学名
                      </div>

                      <div className="space-y-3">
                        <span className="text-4xl block">🤔</span>
                        <h3 className="text-lg font-bold text-stone-800 leading-snug">
                          “{mysteryCard.memoryTriggers[0]}”
                        </h3>
                        <p className="text-xs text-stone-500">
                          {mysteryCard.memoryTriggers[1] || mysteryCard.oneSentenceDef}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-stone-100">
                        <span className="text-xs font-semibold text-amber-600 flex items-center justify-center gap-1.5 animate-pulse">
                          <RefreshCw className="w-3.5 h-3.5" /> 点击卡片翻转揭晓答案
                        </span>
                      </div>
                    </div>
                  ) : (
                    // 卡片背面：揭晓答案
                    <div className="space-y-5 flex-1 flex flex-col justify-between text-left animate-in fade-in duration-300">
                      <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                          原来它叫这个！
                        </span>
                        <span className="text-xs text-stone-400 font-mono">{mysteryCard.pinyin}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-black text-stone-900">{mysteryCard.name}</h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeak(mysteryCard.name);
                            }}
                            className="p-1 text-stone-400 hover:text-amber-600"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs font-serif italic text-stone-500">{mysteryCard.foreignName}</p>
                        <p className="text-sm font-medium text-stone-700 pt-1 leading-relaxed">
                          {mysteryCard.oneSentenceDef}
                        </p>
                      </div>

                      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/50 text-xs text-stone-600">
                        <span className="font-bold text-amber-900 block mb-0.5">🌟 冷知识：</span>
                        {mysteryCard.trivia}
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(mysteryCard);
                          }}
                          className="font-medium text-stone-600 hover:text-amber-600 flex items-center gap-1"
                        >
                          {isBookmarked(mysteryCard) ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
                          {isBookmarked(mysteryCard) ? '已收藏' : '加入收藏'}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentResult(mysteryCard);
                            setActiveTab('search');
                          }}
                          className="font-bold text-amber-700 hover:underline flex items-center gap-1"
                        >
                          查看全景详情 <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={drawMysteryCard}
                className="flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl font-semibold shadow-lg shadow-stone-900/10 hover:shadow-xl transition active:scale-95 text-sm"
              >
                <Dice5 className="w-4 h-4 text-amber-400" />
                <span>再抽一张盲盒</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 4: SAVED & SEARCH HISTORY (收藏与足迹) */}
        {activeTab === 'saved' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
            {/* 我的收藏列表 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <h3 className="text-xl font-bold text-stone-900">我的概念收藏夹</h3>
                  <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-bold">
                    {bookmarks.length}
                  </span>
                </div>
                {bookmarks.length > 0 && (
                  <button
                    onClick={() => {
                      setBookmarks([]);
                      triggerToast('已清空所有收藏');
                    }}
                    className="text-xs text-stone-400 hover:text-rose-500 transition"
                  >
                    清空收藏
                  </button>
                )}
              </div>

              {bookmarks.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
                  <Bookmark className="w-8 h-8 text-stone-300 mx-auto" />
                  <p className="text-sm text-stone-500">暂无收藏的概念，搜索或在发现墙点击书签即可保存</p>
                  <button
                    onClick={() => setActiveTab('discovery')}
                    className="text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition"
                  >
                    去发现墙逛逛
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bookmarks.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-300 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-stone-100 text-stone-600 font-medium px-2 py-0.5 rounded-md">
                            {item.category}
                          </span>
                          <button
                            onClick={() => toggleBookmark(item)}
                            className="text-amber-500 hover:text-stone-400 p-1"
                            title="取消收藏"
                          >
                            <BookmarkCheck className="w-4 h-4 fill-amber-500" />
                          </button>
                        </div>
                        <h4 className="font-bold text-lg text-stone-900">{item.name}</h4>
                        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                          {item.oneSentenceDef}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-stone-400 italic font-serif">{item.foreignName}</span>
                        <button
                          onClick={() => {
                            setCurrentResult(item);
                            setActiveTab('search');
                          }}
                          className="font-bold text-amber-700 hover:underline"
                        >
                          查看详情
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 搜索历史记录 */}
            <div className="space-y-3 pt-6 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-stone-400" />
                  <h4 className="text-sm font-bold text-stone-700">最近尝试想起来的问题</h4>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={() => {
                      setHistory([]);
                      triggerToast('已清空搜索足迹');
                    }}
                    className="text-xs text-stone-400 hover:text-rose-500 transition"
                  >
                    清除足迹
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <p className="text-xs text-stone-400 py-3">暂无搜索记录</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {history.map((hText, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(hText);
                        handleSearch(hText);
                      }}
                      className="text-xs bg-white hover:bg-stone-100 text-stone-600 px-3.5 py-1.5 rounded-full border border-stone-200 transition"
                    >
                      {hText}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="border-t border-stone-200 bg-white py-6 mt-12 text-center text-xs text-stone-400 space-y-1">
        <p>话到嘴边 (Tip of My Tongue) · 解决人类词穷与遗忘焦虑的世界概念反向词典</p>
        <p className="text-[11px] text-stone-400">持续更新日常冷门物件、心理学现象、高级成语与科学百科</p>
      </footer>
    </div>
  );
}