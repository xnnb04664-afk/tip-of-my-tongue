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
  Award
} from 'lucide-react';

// 丰富详实的预置冷门概念知识库
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
    keywords: ['鞋带', '套管', '塑料头', '包头', '散线', '穿孔', '绳头', '金属管', '帽衫绳', '绳子两头'],
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
    keywords: ['披萨', '三脚', '防塌', '小凳子', '白色塑料', '小圆桌', '外卖披萨', '奶酪防粘', '包装支架'],
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
    keywords: ['看久', '不像字', '不认识', '写多', '字越看', '汉字', '笔画', '陌生', '完形崩坏', '认不出'],
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
    keywords: ['下雨', '泥土', '暴雨', '初雨', '清香', '气味', '好闻', '放线菌', '土臭素', '雨后味道'],
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
    keywords: ['歌', '旋律', '洗脑', '单曲循环', '脑子里停不下来', '神曲', '哼唱', '音乐', '无限循环'],
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
    keywords: ['以前经历', '似曾相识', '第一次', '场景很熟悉', '梦见过', '经历过', '眼熟', '既视感', '错觉'],
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
    keywords: ['红酒', '酒瓶', '大拇指', '凹槽', '瓶底', '香槟', '凹坑', '酒窝', '酒瓶底部'],
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
    keywords: ['光柱', '森林', '丁达尔', '光线', '放映机', '阳光', '晨光', '圣光', '光束', '微尘'],
    alternatives: [
      { name: '云隙光 / 耶稣光 (Crepuscular Rays)', reason: '气象学上特指云层缝隙透出的宏观辐射状阳光柱。' },
      { name: '瑞利散射 (Rayleigh Scattering)', reason: '粒子尺寸远小于光波长时的散射现象，是天空呈蔚蓝色的原因。' }
    ]
  },
  {
    id: 'qiong-qie-yi-jian',
    name: '穷且益坚',
    pinyin: 'qióng qiě yì jiān',
    foreignName: 'Steadfast in Adversity (不坠青云之志)',
    category: '高级成语与修辞',
    matchScore: 99,
    oneSentenceDef: '处境虽极度艰难贫苦，反而志气更加坚定、气节更加凛然。',
    description: '出自唐代王勃千古绝唱《滕王阁序》：“老当益壮，宁移白首之心？穷且益坚，不坠青云之志。”形容君子或志士仁人在遭遇物质贫寒或人生低谷时，不仅不丧失自尊与气节，反而磨砺出更为刚毅坚韧的崇高意志。',
    memoryTriggers: [
      '形容人虽穷困但极有骨气，决不向权贵或苦难低头',
      '经常和“老当益壮”、“不坠青云之志”成对出现',
      '王勃在滕王阁宴会上写下的振聋发聩之句'
    ],
    trivia: '这里的“穷”在古代汉语中常指“困顿不遇、处境窘迫”，而非现代仅指身无分文。',
    keywords: ['贫困', '气节', '穷', '坚守', '成语', '滕王阁序', '老当益壮', '困顿', '修辞', '骨气', '贫穷但有志气'],
    alternatives: [
      { name: '安贫乐道', reason: '强调安于贫困现状并乐于坚守道德信仰，更具超然从容之感。' },
      { name: '箪食瓢饮', reason: '出自《论语》，强调在极简恶劣的生活条件中自得其乐。' },
      { name: '贫贱不移', reason: '出自孟子“富贵不能淫，贫贱不能移，威武不能屈”，侧重不受外力动摇。' }
    ]
  },
  {
    id: 'inception',
    name: '《盗梦空间》',
    pinyin: 'dào mèng kōng jiān',
    foreignName: 'Inception (2010 / 潜行凶间)',
    category: '影视文学寻名',
    matchScore: 99,
    oneSentenceDef: '克里斯托弗·诺兰执导，莱昂纳多主演的多层梦境潜入科幻经典。',
    description: '讲述由柯布带领的造梦师团队，通过注射镇静剂进入目标人物的潜意识层层梦境，企图植入思想（Inception）的惊险故事。标志性道具是旋转不停辨别现实与梦境的银色小陀螺。',
    memoryTriggers: [
      '多层梦境嵌套 (梦中梦中梦，在下沉潜意识中时间流速变慢)',
      '男主角有辨识虚实的随身图腾陀螺，结尾转个不停',
      '失重走廊肉搏打戏与被折叠立起的巴黎城市街区'
    ],
    trivia: '电影结尾陀螺微微晃动但画面戛然而止，引发全球影迷长达十余年的结局现实争辩。',
    keywords: ['盗梦', '梦境', '小李子', '莱昂纳多', '诺兰', '陀螺', '潜意识', '造梦师', '多层梦境', '电影', '植入想法'],
    alternatives: [
      { name: '《红辣椒》 (Paprika)', reason: '今敏大师执导的日本神作，探讨梦境机器DC迷你的梦境交叠。' },
      { name: '《黑客帝国》 (The Matrix)', reason: '同样探讨现实与虚构意识界限的划时代科幻电影。' }
    ]
  },
  {
    id: 'bubble-wrap',
    name: '气泡薄膜',
    pinyin: 'qì pào báo mó',
    foreignName: 'Bubble Wrap (泡泡纸 / 减震气泡袋)',
    category: '日常冷门物件',
    matchScore: 98,
    oneSentenceDef: '带有密密麻麻充气小凸起、手捏会啪啪响的快递防震塑料膜。',
    description: '1957年由阿尔弗雷德·菲尔丁和马克·查瓦内斯发明。最初他们本想研发一种带有立体纹理的可擦拭壁纸，意外失败后，发现这种封存空气的聚乙烯薄膜具有极佳的缓冲保护力，随后被IBM用于包裹初代计算机并风靡全球，如今成为全民最爱的解压捏捏神器。',
    memoryTriggers: [
      '收到快递拆箱时裹在易碎品外面的半透明塑料纸',
      '上面布满了整整齐齐的小充气圆包',
      '人人拿到手里都忍不住一个一个按爆，声音极度解压清脆'
    ],
    trivia: '每年一月的最后一个星期一被民间封为“气泡膜感谢日（Bubble Wrap Appreciation Day）”。',
    keywords: ['气泡', '泡泡纸', '塑料膜', '捏爆', '解压', '快递防震', '包裹', '减震', '泡泡膜', '快递包装'],
    alternatives: [
      { name: '珍珠棉 (EPE Foam)', reason: '白色发泡聚乙烯材料，常做成整块或泡沫板。' },
      { name: '气柱袋 (Air Column Bag)', reason: '一根根长圆柱状充气管排列组成的高抗震护套。' }
    ]
  },
  {
    id: 'pareidolia',
    name: '空想性错视',
    pinyin: 'kōng xiǎng xìng cuò shì',
    foreignName: 'Pareidolia (类人面孔视错觉 / 幻想性错视)',
    category: '心理与感官现象',
    matchScore: 98,
    oneSentenceDef: '在无生命的物体（如插座、汽车前脸、云朵）上频繁看出人脸或表情的心理现象。',
    description: '人类大脑在漫长演化中，进化出了极其敏锐且神经优先级极高的“人脸识别脑区（梭状回面孔区 FFA）”。为了在丛林阴影中快速发现捕食者或同类，大脑宁愿“过度敏感，将非人脸误判为人脸”，也不愿冒“漏识潜在危险”的风险。',
    memoryTriggers: [
      '看着墙壁上的三孔插座，总觉得它在张着大嘴做震惊表情',
      '汽车的车头两个大灯加进气格栅，看起来像在冲你凶狠地笑',
      '切开青椒或者面包片，里面居然是一张嚎叫的苦瓜脸'
    ],
    trivia: '火星探测器曾拍到一块由于光影角度极像人脸的岩石（著名的“火星人脸”），一度引发全球关于地外文明的狂欢。',
    keywords: ['人脸', '插座', '云朵', '错觉', '表情', '幻视', '看成脸', '拟人', '看成面孔', '物体像脸'],
    alternatives: [
      { name: '拟人化 (Anthropomorphism)', reason: '意识主动赋予非人类事物人类的情感、性格或动机。' },
      { name: '联觉 (Synesthesia)', reason: '一种感官刺激引发另一种毫不相干感官联动的神经现象。' }
    ]
  },
  {
    id: 'tot-phenomenon',
    name: '舌尖现象',
    pinyin: 'shé jiān xiào yìng',
    foreignName: 'Tip of the Tongue (TOT / 舌尖现象 / 话到嘴边)',
    category: '心理与感官现象',
    matchScore: 99,
    oneSentenceDef: '明明非常确定自己知道某个词，但短时内就是无法准确提取说出口。',
    description: '正是本站名字的来源！认知心理学指出，大脑在存储词汇时，将“语义概念（意思）”与“语音表征（发音/字词）”存储在不同的神经网络模块中。当检索线索受到干扰或处于轻度焦虑时，两者的连线暂时短路，导致“想得起意思和开头字母，但就是卡在喉咙口”。',
    memoryTriggers: [
      '“哎呀就是那个！我昨天还见过的！叫什么来着！”',
      '能清晰记得它的样子、功能、甚至第几个字，但全称就是卡壳',
      '往往在不再刻意费劲想、彻底放松后的某一秒突然脱口而出'
    ],
    trivia: '不仅年轻人容易遭遇，调查显示双语使用者的舌尖现象发生概率明显高于单语者，因为他们大脑中有两个并行的词库在互相竞争抑制。',
    keywords: ['话到嘴边', '想不起来', '叫什么来着', '卡壳', '舌尖', '词穷', '知道但说不出', '遗忘'],
    alternatives: [
      { name: '记忆短路 (Brain Fart)', reason: '俗称脑抽，指短暂的注意力中断或推理卡顿。' },
      { name: '健忘症 (Amnesia)', reason: '病理性的器质性记忆缺失。' }
    ]
  },
  {
    id: 'blue-hour',
    name: '蓝调时刻',
    pinyin: 'lán diào shí kè',
    foreignName: 'The Blue Hour (L’Heure Bleue / 晨昏蒙影)',
    category: '自然与科学冷知识',
    matchScore: 97,
    oneSentenceDef: '日落后或日出前，天空呈现深邃沉静、无与伦比的靛蓝青色的短暂时刻。',
    description: '在日落后大约20到40分钟之间，太阳落入地平线以下4°~8°位置。此时太阳光中波长较长的红橙光无法直接穿透厚厚的大气层，而波长较短的蓝色光在大气臭氧层中发生查普伊斯吸收（Chappuis absorption），导致整个天空被渲染成如天鹅绒般浓郁纯净的冷深蓝色。',
    memoryTriggers: [
      '傍晚天色刚刚擦黑，城市路灯初上，天空呈现出极为高级宁静的深宝蓝色',
      '风光摄影师和电影导演最梦寐以求的拍摄黄金时段',
      '持续时间通常只有短暂的十几分钟，稍纵即逝'
    ],
    trivia: '法国香水世家娇兰在1912年以此灵感创作了传世名香“蓝调时光（L’Heure Bleue）”，象征白昼与黑夜交织的浪漫片刻。',
    keywords: ['蓝调', '日落', '傍晚', '天空蓝色', '深蓝', '摄影', '天鹅绒蓝', '晨昏', '黄昏后'],
    alternatives: [
      { name: '黄金时刻 (Golden Hour)', reason: '日落前或日出后的一小时，阳光斜射呈现温暖金黄柔和的色调。' },
      { name: '暮光 / 薄暮 (Twilight)', reason: '指从日落到完全黑夜之间的整个过渡光照时期。' }
    ]
  },
  {
    id: 'ti-hu-guan-ding',
    name: '醍醐灌顶',
    pinyin: 'tí hú guàn dǐng',
    foreignName: 'Epiphany (顿悟 / 醍醐灌顶 / 茅塞顿开)',
    category: '高级成语与修辞',
    matchScore: 99,
    oneSentenceDef: '听了高人一席话或突遇启发，顿时豁然开朗、大彻大悟。',
    description: '佛教用语。“醍醐”指从纯牛乳中反复提炼出的最高纯度乳酪精华，古人视为无上甘露与至味。原比喻佛陀以至高无上的智慧甘露灌注于学者头顶，使其顿消烦恼无明；现泛指受到深层启发后，思想猛然开窍、心智清爽通达。',
    memoryTriggers: [
      '困惑苦思了几天的问题，被前辈一句话点拨，脑子瞬间通畅透亮',
      '整个人如同从头到脚被清凉纯净的仙露浇灌了一遍，毛孔全部舒展开',
      '形容思想上的巨大转折与通透大悟'
    ],
    trivia: '《大般涅槃经》中记载牛乳五变：“从牛出乳，从乳出酪，从酪出生酥，从生酥出熟酥，从熟酥出醍醐。醍醐最上。”',
    keywords: ['醍醐灌顶', '大彻大悟', '听了一句话', '茅塞顿开', '豁然开朗', '成语', '启发', '开窍', '忽然明白'],
    alternatives: [
      { name: '如梦初醒', reason: '侧重于从某种受蒙蔽、执迷不悟的虚妄状态中清醒过来。' },
      { name: '恍然大悟', reason: '侧重于短时间内对具体事实或道理的突然明白。' },
      { name: '顿开茅塞', reason: '侧重于心中原本堵塞不通的疑惑被疏导开来。' }
    ]
  },
  {
    id: 'broken-windows',
    name: '破窗效应',
    pinyin: 'pò chuāng xiào yìng',
    foreignName: 'Broken Windows Theory (劣币驱逐良币/环境暗示)',
    category: '心理与感官现象',
    matchScore: 97,
    oneSentenceDef: '如果一扇窗户破了没人修理，其余窗户也会很快被砸碎的社会心理现象。',
    description: '由詹姆斯·威尔逊和乔治·凯林于1982年提出。理论认为，环境中的不良现象若未被及时纠正制止，就会发出一种无序的心理暗示——“这里没人管，破坏是允许且无代价的”，从而诱使更多人仿效，导致犯罪或不良风气呈指数级恶化扩散。',
    memoryTriggers: [
      '干干净净的人行道没人乱丢垃圾，可一旦地上有了第一个烟头，很快就堆满垃圾',
      '团队里一旦有一个人开始摸鱼迟到且没被处罚，其他人也会迅速跟风摆烂',
      '一辆废弃在街边的汽车，只要车窗破了一块，几天内就会被拆成空壳'
    ],
    trivia: '纽约市在20世纪90年代治理犯罪时严格运用破窗理论，从重拳打击逃票、乱涂鸦等微小违规做起，成功让恶性犯罪率大幅下降。',
    keywords: ['破窗', '窗户破了', '没人管', '跟风', '摆烂', '恶化', '环境暗示', '犯罪', '心理学效应'],
    alternatives: [
      { name: '从众效应 (Bandwagon Effect)', reason: '单纯因多数人都在做而盲目效仿的羊群心理。' },
      { name: '滑坡谬误 (Slippery Slope)', reason: '逻辑学上不合理地推导出连锁负面恶果的论证漏洞。' }
    ]
  },
  {
    id: 'straw-tab-hole',
    name: '易拉罐拉环孔',
    pinyin: 'yì lā guàn lā huán kǒng',
    foreignName: 'Can Tab Straw Hole (吸管固定孔)',
    category: '日常冷门物件',
    matchScore: 98,
    oneSentenceDef: '可乐等易拉罐开启后，把金属拉环转到开口处刚好能插稳吸管的小圆孔。',
    description: '很多人拉开易拉罐后就随手放着，甚至被吸管在碳酸汽水中浮起来而烦恼。其实拉环末端设计的那个圆孔，不仅减轻了金属用料冲压重量，拉开后将拉环180度平转过来，恰好覆盖在开口中央，吸管插进圆孔中就不会因为碳酸气泡浮力乱飘乱转。',
    memoryTriggers: [
      '喝易拉罐饮料时吸管总是被汽水顶得往上浮',
      '把上面那个金属拉环转过来，把吸管穿过那个圆圈',
      '吸管就会被稳稳卡在正中间，喝起来极其顺手'
    ],
    trivia: '最初的易拉罐拉环是扯下来随手扔掉的，1975年才改良成现代这种留在罐上的“固定式拉环”。',
    keywords: ['易拉罐', '拉环', '圆孔', '吸管', '固定', '可乐罐', '饮料罐', '汽水罐拉环', '吸管孔'],
    alternatives: [
      { name: '封口贴 / 易拉贴', reason: '部分咖啡罐或果汁罐使用的揭开式铝箔保护盖。' },
      { name: '啤酒压盖', reason: '玻璃瓶使用的波浪边铁皮皇冠盖。' }
    ]
  },
  {
    id: 'stapler-anvil',
    name: '订书机砧垫',
    pinyin: 'dìng shū jī zhēn diàn',
    foreignName: 'Stapler Anvil (装订转向板 / 底座压脚)',
    category: '日常冷门物件',
    matchScore: 96,
    oneSentenceDef: '订书机底部带两条小凹槽、按住下方能旋转180度的金属压板。',
    description: '订书机下方的那个金属压板被称为“砧（Anvil）”。如果你从底座下方把它顶起并旋转半圈，凹槽间距就会变宽。此时订出的针脚不是向内扣死（永久装订），而是向外展开（临时装订/扣针模式），只需用手轻轻一拔就能无损拆开纸张。',
    memoryTriggers: [
      '订书机底下那个银色的小金属圆片，中间有两道弧形沟槽',
      '平时订出来的针脚是往中间缩的',
      '转动它之后，订出来的针脚是往外翘开的，专门用于随时拆卸文件'
    ],
    trivia: '90%的上班族用了十几年订书机，都不知道底座上的那个小铁盘其实是可以按住旋转的！',
    keywords: ['订书机', '底座', '小铁片', '旋转', '转向', '装订', '翻转', '小圆盘', '针脚', '订书针'],
    alternatives: [
      { name: '起钉器 (Staple Remover)', reason: '专门用于夹起撬开订书钉的下颚状剪刀工具。' },
      { name: '回形针 / 万字夹 (Paper Clip)', reason: '传统金属丝弯曲成型的无损伤临时纸张固定件。' }
    ]
  },
  {
    id: 'book-foxing',
    name: '书斑',
    pinyin: 'shū bān',
    foreignName: 'Foxing (狐斑 / 纸张霉变黄斑)',
    category: '日常冷门物件',
    matchScore: 97,
    oneSentenceDef: '泛黄的旧书或老报纸页面上散落的黄褐色不规则斑点。',
    description: '术语称为“狐斑（Foxing）”，可能因斑点颜色类似于狐狸红褐色的皮毛而得名。形成原因是纸张在潮湿环境中，残留在造纸木浆纤维中的微量铁、铜等金属杂质发生化学氧化，或是真菌孢子在纸张有机物上微观滋生分解而留下的铁锈色印记。',
    memoryTriggers: [
      '在旧书店翻看几十年前的老书，或者外公的书柜里',
      '白色的内页或书脊边缘散落着很多点状的暗黄色、铁锈褐色小斑痕',
      '伴随着老书独有的陈旧木质纸浆香气'
    ],
    trivia: '古籍修复专家处理狐斑通常使用极低浓度的过氧化氢或紫外线光照法，但这需要极其谨慎以防脆弱的老纸碳化脆裂。',
    keywords: ['书斑', '狐斑', '旧书', '泛黄', '黄色斑点', '斑点', '纸张老化', '老书', '铁锈斑'],
    alternatives: [
      { name: '酸性脆化 (Acid Burn)', reason: '现代酸性机制纸因自身木质素酸化导致整体纸张变黄变脆。' },
      { name: '水渍痕 (Water Stain)', reason: '液体滴落浸润挥发后在纸张上留下的波浪状轮廓圈。' }
    ]
  },
  {
    id: 'st-elmo-fire',
    name: '圣艾尔摩之火',
    pinyin: 'shèng ài ěr mó zhī huǒ',
    foreignName: "St. Elmo's Fire (电晕放电发光)",
    category: '自然与科学冷知识',
    matchScore: 98,
    oneSentenceDef: '雷暴夜晚，船只桅杆或飞机机翼尖端跳跃闪烁的蓝紫色幽光。',
    description: '这并不是真正的火焰，而是一种大气静电“电晕放电（Corona Discharge）”现象。在强雷暴天气中，云层与大地间形成数万伏的强电场，船只桅杆尖端或机翼等尖锐凸起聚集了高密度电荷，使周围空气分子发生电离发光，发出类似鬼火般幽蓝幽蓝的光芒，并伴有轻微的滋滋声。',
    memoryTriggers: [
      '古代航海电影中，暴风雨深夜船长的桅杆顶端突然冒起蓝紫色的火焰',
      '现代飞行员在穿过雷雨云层时，挡风玻璃或机翼前方出现跳动的电弧光',
      '看似在燃烧，但伸手触摸并不烫，也不会烧坏船帆'
    ],
    trivia: '古代水手视水手守护神圣艾尔摩为庇护者，看到这种光芒往往意味着雷暴最剧烈时期即将过去，因此将其视为化险为夷的吉兆。',
    keywords: ['圣艾尔摩', '桅杆发光', '雷雨电光', '蓝紫光', '暴风雨', '幽火', '电晕放电', '机翼发光', '水手神火'],
    alternatives: [
      { name: '球状闪电 (Ball Lightning)', reason: '雷暴中形成的罕见漂浮发光等离子体球。' },
      { name: '极光 (Aurora)', reason: '高能太阳带电粒子进入极地高空大气层激发的宏观彩色天幕辉光。' }
    ]
  },
  {
    id: 'ya-zi-bi-bao',
    name: '睚眦必报',
    pinyin: 'yá zì bì bào',
    foreignName: 'Vindictive to Petty Slights (睚眦必报)',
    category: '高级成语与修辞',
    matchScore: 99,
    oneSentenceDef: '心胸极度狭隘，哪怕别人只是瞪了自己一眼，也一定要千方百计报复。',
    description: '出自《史记·范雎蔡泽列传》：“一饭之德必偿，睚眦之怨必报。”“睚”是眼眶，“眦”是眼角，“睚眦”特指怒目而视或斜眼瞪人这种极微小的怨怼。形容人器量极小、心狠手辣，连最微不足道的怨恨都必须百倍奉还。',
    memoryTriggers: [
      '形容某个人肚量极小，千万惹不得',
      '哪怕只是走路不小心看了他一眼，他都要记恨在心找机会整你',
      '成语前两个字很多人会读错（yá zì）'
    ],
    trivia: '在古代神话中，“睚眦”还是龙生九子之一，相貌似豺狼，性情嗜杀喜斗，因此古代常被雕刻在宝剑的吞口和刀柄上作为威慑象征。',
    keywords: ['睚眦必报', '瞪一眼', '报复', '心胸狭窄', '小肚鸡肠', '记仇', '成语', '复仇', '小气'],
    alternatives: [
      { name: '锱铢必较', reason: '侧重于在极微小的金钱、利益或得失上斤斤计较，不含报仇之意。' },
      { name: '小肚鸡肠', reason: '口语化表达，泛指气量狭小容不得人和事。' },
      { name: '恩怨分明', reason: '中性偏褒义，强调对恩情与仇怨都清清楚楚地了断。' }
    ]
  },
  {
    id: 'interstellar',
    name: '《星际穿越》',
    pinyin: 'xīng jì chuān yuè',
    foreignName: 'Interstellar (2014 / 星际启示录)',
    category: '影视文学寻名',
    matchScore: 99,
    oneSentenceDef: '诺兰执导，穿越黑洞卡冈图雅、在五维空间用手表指针莫斯密码联络女儿的科幻巨制。',
    description: '地球枯萎病蔓延无法居住，马修·麦康纳饰演的库珀告别年幼的女儿墨菲，带领宇航员穿越虫洞寻找人类新家园。最终他在超光速黑洞“卡冈图雅”的五维超立方体中，利用引力拨动手表秒针跳动莫斯密码，将量子引力数据传递给成年的女儿解救人类。',
    memoryTriggers: [
      '“不要温和地走进那个良夜（Do not go gentle into that good night）”',
      '在巨浪星球上“这里一小时，地上七年”的残酷时间膨胀',
      '父亲掉入黑洞后在书架背后的多维空间里拨动手表指针给女儿发密码'
    ],
    trivia: '为了真实模拟黑洞，电影团队与诺贝尔物理学奖得主基普·索恩合作编写引力透镜方程，渲染产出的图像极其精确，直接推动了天体物理学的发展。',
    keywords: ['星际穿越', '黑洞', '手表', '五维空间', '诺兰', '莫斯密码', '重力', '卡冈图雅', '不要温和地走进那个良夜', '科幻电影'],
    alternatives: [
      { name: '《2001太空漫游》 (2001: A Space Odyssey)', reason: '库布里克影史神作，探讨人类起源、黑色石碑与终极意识飞跃。' },
      { name: '《地心引力》 (Gravity)', reason: '阿方索·卡隆执导，侧重于近地轨道太空碎片遇难绝境生还的视听大片。' }
    ]
  },
  {
    id: 'asmr',
    name: '颅内高潮 (ASMR)',
    pinyin: 'lú nèi gāo cháo',
    foreignName: 'ASMR (自主性感官经络反应)',
    category: '心理与感官现象',
    matchScore: 98,
    oneSentenceDef: '听轻柔耳语、细微雨声、咀嚼音或梳头声时，头皮与后背产生的酥麻愉悦感。',
    description: '全称为“Autonomous Sensory Meridian Response”。当人接收到某些特定的温和听觉或视觉刺激（如低语、指甲轻敲桌面、剪头发的沙沙声、切肥皂）时，大脑神经回路会诱发副交感神经兴奋，释放多巴胺与内啡肽，引起自头皮顺着脊椎向下蔓延的轻微触电般酥麻感与极度放松感。',
    memoryTriggers: [
      '晚上睡不着时戴上耳机听别人轻轻说话或者敲击木盒的声音',
      '头皮突然有一阵酥酥麻麻、像羽毛轻轻拂过的电流感',
      '听着听着整个人神经紧绷感立刻瓦解，特别容易助眠'
    ],
    trivia: '虽然叫“颅内高潮”，但科学研究证实其生理机制与性冲动毫无关系，本质是一种演化中形成的类似灵长类动物互相梳理毛发时的亲社会安全依附反应。',
    keywords: ['asmr', '颅内高潮', '轻声细语', '头皮发麻', '酥麻', '助眠', '敲击声', '沙沙声', '咀嚼音'],
    alternatives: [
      { name: '听觉诱发寒战 (Frisson)', reason: '听到极其震撼壮丽的音乐高潮时突然浑身起鸡皮疙瘩的心理颤栗感。' },
      { name: '白噪音 (White Noise)', reason: '全频段均匀分布的单调声响，用于掩盖突兀噪声。' }
    ]
  },
  {
    id: 'cord-lock',
    name: '猪鼻扣',
    pinyin: 'zhū bí kòu',
    foreignName: 'Cord Lock (弹簧绳扣 / 猪鼻锁)',
    category: '日常冷门物件',
    matchScore: 98,
    oneSentenceDef: '冲锋衣下摆或双肩包抽绳上，按下去能滑动、松手自动卡紧弹簧的双孔塑料扣。',
    description: '也称绳扣或弹簧止绳器。内部含有一个小型不锈钢螺旋弹簧和一个活动插销，当用手指捏下时，外壳与插销上的孔洞对齐，拉绳可以自由滑动调节松紧；一旦松手，弹簧弹力立即将拉绳挤压卡死在孔壁上，无需打结即可牢牢固定绳子。因正面两个并排的圆孔酷似小猪的鼻孔而得名。',
    memoryTriggers: [
      '运动裤腰带、连帽卫衣帽绳或者双肩背包抽绳上穿的那个黑色塑料小坨坨',
      '捏住中间圆柱体按下去才能抽动绳子，一松手就卡得死死的',
      '正面有两个圆孔，长得特别像小猪的鼻子'
    ],
    trivia: '最早由登山家为了在戴着厚重手套、无法灵活打绳结的极端寒冷环境下快速收紧衣物防风而发明普及。',
    keywords: ['猪鼻扣', '绳扣', '弹簧扣', '抽绳扣', '冲锋衣扣', '双肩包', '塑料扣', '按下去滑动', '卫衣抽绳'],
    alternatives: [
      { name: '拉尾夹 (Zip Puller)', reason: '安装在拉链末端便于手捏拉动的塑料防滑提手。' },
      { name: '日字扣 / 目字扣', reason: '用于双肩包背带调节长短的矩形穿带插片。' }
    ]
  },
  {
    id: 'bread-clip',
    name: '面包扎扣',
    pinyin: 'miàn bāo zhā kòu',
    foreignName: 'Bread Clip (Occlupanid / 吐司卡扣片)',
    category: '日常冷门物件',
    matchScore: 97,
    oneSentenceDef: '超市切片吐司袋口上，那个扁平有凹槽、用来卡死塑料袋口的硬塑料小卡片。',
    description: '1952年由美国人弗洛伊德·帕克斯顿在飞机上用吃剩的塑料小片削刻而成，用于封住苹果袋。这个巧妙的凹形卡扣只需单手一推一折就能迅速扣紧薄膜袋，且完全可重复开合。趣味的是，生物分类学家还专门为世界上各种形态的面包扣创造了一个拟生物学伪学术门类：“Occlupanida”。',
    memoryTriggers: [
      '买一袋吐司切片面包，封口处卡着的那张只有大拇指盖大小的硬塑料薄片',
      '中间有一个倒勾形的豁口，往袋子拧紧的地方一卡就封住了',
      '吃完面包随手丢在桌上，常被拿来折着玩'
    ],
    trivia: '全球爱好者甚至建立了一个专门的“面包扣在线博物馆”，按照齿形和颜色对世界各地的面包扣进行严格的“物种拉丁名分类”。',
    keywords: ['面包扣', '塑料卡片', '扎扣', '吐司', '面包夹', '面包袋', '密封夹', '卡扣片', '切片面包'],
    alternatives: [
      { name: '魔术带 / 扎丝 (Twist Tie)', reason: '内部包裹细铁丝的纸胶带，多用于散装烘焙袋扭转扎紧。' },
      { name: '封口夹 (Sealing Clip)', reason: '用于夹住大零食袋的带铰链的长条塑料夹子。' }
    ]
  },
  {
    id: 'phosphene',
    name: '光幻视',
    pinyin: 'guāng huàn shì',
    foreignName: 'Phosphene (眼内压迫闪光 / 揉眼光斑)',
    category: '心理与感官现象',
    matchScore: 98,
    oneSentenceDef: '闭着眼睛或用力揉眼皮时，眼前看到的一闪一闪的光斑或彩色几何图案。',
    description: '在没有外界实际光线进入眼睛的情况下，视网膜受到机械压力（如手指揉压）等物理刺激，导致视网膜上的感光细胞与神经节细胞被机械性激活，向大脑视觉中枢发送错误神经电信号，使大脑误以为接收到了光线。',
    memoryTriggers: [
      '用手指用力揉眼眶揉太久',
      '闭着眼睛时视野里突然出现彩色光斑、万花筒或者像波纹一样的闪光点',
      '睁开眼后几秒钟慢慢散去'
    ],
    trivia: '宇航员在太空暴露于高能宇宙射线时，即使紧闭双眼睡觉，也会因为宇宙射线直接穿透视网膜而频繁看到光幻视闪光。',
    keywords: ['揉眼', '揉眼睛', '闭眼', '冒金星', '发光', '闪光', '光斑', '眼睛亮', '闪亮', '一闪一闪的光'],
    alternatives: [
      { name: '闪辉暗点 (Scintillating Scotoma)', reason: '偏头痛先兆期出现的视野锯齿状盲区与闪光。' },
      { name: '飞蚊症 (Floaters)', reason: '玻璃体浑浊在视网膜上投射出的固定漂浮阴影，并非自发光。' }
    ]
  },
  {
    id: 'lignin-odor',
    name: '木质素降解气味',
    pinyin: 'mù zhì sù jiàng jiě qì wèi',
    foreignName: 'Lignin degradation odor (旧书香 / 纸张降解陈香)',
    category: '自然与科学冷知识',
    matchScore: 97,
    oneSentenceDef: '翻动古旧书籍或泛黄纸张时，扑鼻而来那股令人安心的类似香草与杏仁的微甜清香。',
    description: '传统造纸木浆中含有木质素。随着岁月流逝，纸张中的木质素在氧气、温度和微量酸催化下发生缓慢的化学降解，逐渐挥发出包括香兰素（带来香草奶香）、苯甲醛（带来杏仁香）和乙酸（微酸木香）在内的挥发性有机化合物。',
    memoryTriggers: [
      '走进老图书馆或二手书店翻开泛黄厚书',
      '有一种混合了木头、淡淡香草甜味和阳光晒过的纸张气息',
      '闻起来让人格外宁静专注'
    ],
    trivia: '图书馆学家和纸质文物修复专家通过分析书本散发的木质素挥发物种类与浓度，不需要取样破坏纸张就能精准推断这本古籍的老化程度和确切保存状况。',
    keywords: ['旧书', '翻书', '书味', '书香', '书本味道', '老书', '纸张味道', '好闻的书', '图书馆味'],
    alternatives: [
      { name: '初雨泥土味 (Petrichor)', reason: '初雨降临干土时放线菌散发的潮土油清香。' },
      { name: '霉味 (Musty odor)', reason: '受潮生霉产生的刺鼻土腥味，与健康纸张氧化的纯正旧书香截然不同。' }
    ]
  },
  {
    id: 'doorway-effect',
    name: '门口效应',
    pinyin: 'mén kǒu xiào yìng',
    foreignName: 'The Doorway Effect (门槛效应 / 事件边界综合征)',
    category: '心理与感官现象',
    matchScore: 98,
    oneSentenceDef: '刚从一个房间穿过房门走到另一个房间，大脑瞬间一片空白：等等，我过来要干嘛来着？',
    description: '心理学称之为“事件边界（Event Boundary）”。人类大脑将生活经历按“章节”分块储存，当人穿过一扇物理门框或虚拟空间边界时，大脑认知系统会自动将前一个房间的短期记忆数据进行“归档清理”，为即将面对的新环境腾出注意力容量。',
    memoryTriggers: [
      '在卧室想拿个指甲刀，刚走到客厅突然愣在原地',
      '大脑宕机：“我站在这儿是要干什么？”',
      '退回到原来的房间往往一瞬间又想起来了'
    ],
    trivia: '不仅穿过真实的门会触发，甚至在电脑桌面关闭一个软件切换到另一个全屏软件时，也会触发数字世界的“虚拟门口效应”。',
    keywords: ['进房间', '忘了干嘛', '突然忘了', '走到客厅', '换个房间', '忘事', '穿过门', '想不起干嘛', '走到哪忘了'],
    alternatives: [
      { name: '舌尖现象 (Tip of the Tongue)', reason: '知道答案却调用不出词汇，而门口效应是短时工作记忆的目标被重置。' },
      { name: '健忘症 (Amnesia)', reason: '病理性的长期记忆缺失，门口效应是人人皆有的健康大脑生理归档机制。' }
    ]
  },
  {
    id: 'hypnic-jerk',
    name: '入睡抽动',
    pinyin: 'rù shuì chōu dòng',
    foreignName: 'Hypnic Jerk (肌抽跃 / 临睡肌阵挛 / 跌落错觉)',
    category: '心理与感官现象',
    matchScore: 98,
    oneSentenceDef: '刚躺下快要睡着时，身体突然无意识地剧烈一抖，伴随着一脚踩空或从悬崖坠落的惊悸感。',
    description: '发生在入睡初期的“非快速眼动睡眠第1阶段”。此时全身骨骼肌开始松弛，呼吸心率放缓。如果白天过度疲劳或紧张，大脑运动皮层可能将这种突然的肌肉大面积放松误判为“身体正在失去平衡坠落悬崖”，于是紧急发送强烈的运动神经冲动让四肢猛缩自救。',
    memoryTriggers: [
      '快要入睡神志半清醒半模糊时',
      '脑海里正好幻视出一脚踩空楼梯或滑倒跌落的画面',
      '全身肌肉剧烈抽搐猛震一下，瞬间被吓醒'
    ],
    trivia: '演化心理学家认为这是灵长类动物在树上睡觉时保留下来的本能防御机制——防止我们的祖先在树枝上睡熟后不慎摔死。',
    keywords: ['刚睡着', '抽搐', '抖一下', '踩空', '掉下悬崖', '抖动', '猛烈抽动', '睡觉抽筋', '一激灵', '入睡抖'],
    alternatives: [
      { name: '不宁腿综合征 (RLS)', reason: '休息时下肢产生不可抑制的酸胀麻木不适，必须活动缓解。' },
      { name: '睡眠瘫痪 (Sleep Paralysis)', reason: '俗称鬼压床，意识完全清醒但全身骨骼肌无法动弹。' }
    ]
  },
  {
    id: 'phantom-vibration',
    name: '幻震综合征',
    pinyin: 'huàn zhèn zōng hé zhèng',
    foreignName: 'Phantom Vibration Syndrome (手机幻听幻震)',
    category: '心理与感官现象',
    matchScore: 96,
    oneSentenceDef: '总觉得兜里的手机在震动，掏出来一看却根本没有任何通知或来电。',
    description: '现代人高度依赖即时通讯带来的神经应激状态。大脑将衣物摩擦、肌肉轻微抽搐等微弱的皮肤触觉信号，先入为主地错误放大解码为“手机震动”信号。神经学中称之为信号检测理论中的“虚报（False Alarm）”。',
    memoryTriggers: [
      '在走路或忙碌时，大腿裤兜皮肤隐约一阵发麻震动',
      '条件反射般掏出手机解锁，屏幕一片安静没有任何消息',
      '频繁发生，甚至在手机根本没放在身上时依然觉得大腿在抖'
    ],
    trivia: '调查显示超过 90% 的大学生和重度职场智能手机用户都定期经历过幻震综合征。',
    keywords: ['手机震动', '错觉', '以为响了', '幻震', '震动幻觉', '兜里震动', '裤兜震动', '没消息以为震动'],
    alternatives: [
      { name: '错听铃声 (Phantom Ringing)', reason: '在洗澡水声或嘈杂环境中把噪音脑补成手机铃声的听觉幻象。' },
      { name: '无手机焦虑症 (Nomophobia)', reason: '离开手机或电量不足时产生的深层焦虑心理。' }
    ]
  },
  {
    id: 'cute-aggression',
    name: '可爱侵犯',
    pinyin: 'kě ài qīn fàn',
    foreignName: 'Cute Aggression (可爱侵略性 / 萌态攻击心理)',
    category: '心理与感官现象',
    matchScore: 97,
    oneSentenceDef: '看到极度软萌的小动物或幼童时，内心除了喜欢，居然强烈想掐它脸、揉碎它甚至“咬上一口”。',
    description: '耶鲁大学心理学团队研究证实，这是人类大脑的一种“二相情感调节（Dimorphous Expression）”。当面对极致的软萌刺激时，大脑奖赏中枢涌起的正向情绪过载，神经系统为了避免过度亢奋失控，会自动调动轻度的攻击侵略欲望来迅速平衡情绪过载，就像极度悲伤时破涕为笑一样。',
    memoryTriggers: [
      '捧起一团肉乎乎的刚满月小奶猫或小奶狗',
      '一边疯狂感慨太可爱了，一边咬牙切齿想要把脸埋进去狠狠吸一口',
      '伴随着双手握拳、想要用力捏一捏的身体反应'
    ],
    trivia: '菲律宾语中甚至有一个专属独立单词“Gigil”专门用来表达“因为某物实在太可爱而忍不住想要咬它一口”的冲动。',
    keywords: ['可爱', '想捏', '想咬', '想捏死', '太可爱了', '忍不住掐', '软萌', '咬一口', '萌死我了'],
    alternatives: [
      { name: '幼态持续 (Neoteny)', reason: '生物学中对大眼睛、圆脸等婴儿特征的本能保护欲望。' },
      { name: '斯德哥尔摩效应', reason: '被害者对施害者产生情感依赖，与可爱无心理关联。' }
    ]
  },
  {
    id: 'contagious-yawning',
    name: '模仿性哈欠',
    pinyin: 'mó fǎng xìng hā qiàn',
    foreignName: 'Contagious Yawning (传染性打哈欠 / 镜像共情哈欠)',
    category: '心理与感官现象',
    matchScore: 99,
    oneSentenceDef: '只要看到别人打哈欠，或者听到甚至脑子里读到“打哈欠”三个字，嘴巴就忍不住张大。',
    description: '由大脑运动前区皮层的“镜像神经元系统（Mirror Neuron System）”驱动。这种模仿反应不仅不是困倦的标志，反而是高级社会性哺乳动物（如人类、猩猩、海豚和狗）进化出的“群体同步与情感共情”能力的极佳体现。',
    memoryTriggers: [
      '看到对面工位同事打了一个哈欠，3秒钟内自己也张开嘴',
      '哪怕只是看小猫打哈欠的搞笑视频，喉咙也会涌起一阵深呼吸的冲动',
      '此刻读到这段文字，你大概率正想打个哈欠'
    ],
    trivia: '心理学研究发现，一个人与打哈欠的人亲密程度越高（家人、恋人、好朋友），被传染打哈欠的速度就越快、概率就越高。',
    keywords: ['打哈欠', '传染', '哈欠', '忍不住哈欠', '别人打哈欠', '看别人打哈欠', '想打哈欠', '哈欠传染'],
    alternatives: [
      { name: '换气过度 (Hyperventilation)', reason: '因呼吸急促过深导致体内二氧化碳分压失衡的生理病态。' },
      { name: '叹气 (Sighing)', reason: '肺泡深层重新充气的本能呼吸复位动作。' }
    ]
  },
  {
    id: 'voice-confrontation',
    name: '声音对抗',
    pinyin: 'shēng yīn duì kàng',
    foreignName: 'Voice Confrontation (听觉镜像排斥 / 录音失真感)',
    category: '心理与感官现象',
    matchScore: 97,
    oneSentenceDef: '听微信语音或录音机里自己说话的声音，觉得又尖又怪、特别陌生难听。',
    description: '人类平时听到自己说话时，声音是通过空气传导与颅骨内部“骨传导”同时传入内耳的，骨骼的共振过滤增强了低频共鸣，使你感觉自己的声音浑厚低沉。而录音设备只记录了纯粹的空气传导声，丢失了颅骨低音炮效果，导致你听到的真实声线与脑海里建立了一辈子的内在声像产生严重认知脱节。',
    memoryTriggers: [
      '在微信群里回放刚刚自己发出去的 10 秒语音',
      '心中强烈羞耻：“天哪，我平时说话原来这么难听、声调这么怪吗？”',
      '别人听了却觉得：“很正常啊，你平时就长这个声音”'
    ],
    trivia: '骨传导耳机的发明灵感正是来自音乐大师贝多芬在全聋时期用牙齿咬着一根木棍抵住钢琴听取共鸣的物理原理。',
    keywords: ['自己的声音', '录音', '好难听', '不像我', '微信语音自己', '声音难听', '录音不像自己', '自己说话声音'],
    alternatives: [
      { name: '冒充者综合征 (Impostor syndrome)', reason: '能力出众却时刻怀疑自己是个冒牌骗子的心理状态。' },
      { name: '多普勒效应 (Doppler Effect)', reason: '声源相对移动导致听觉频率升高或降低的物理声学效应。' }
    ]
  },
  {
    id: 'brain-freeze',
    name: '蝶腭神经节痛',
    pinyin: 'dié è shén jīng jié tòng',
    foreignName: 'Brain Freeze (冰淇淋头痛 / 冰食性头痛)',
    category: '自然与科学冷知识',
    matchScore: 98,
    oneSentenceDef: '大口猛吃冰淇淋或猛灌冰镇可乐时，太阳穴和额头深处传来的短促剧烈钻心刺痛。',
    description: '当大量极度冰冷的食物突然接触口腔上颚时，上腭密集的毛细血管急剧痉挛收缩，随后迅速代偿性扩张充血。上腭的蝶腭神经节受到剧烈温差刺激，将疼痛电信号经由三叉神经直接上传至大脑，大脑误将这种来自口腔顶部的冷痛信号定位到了前额和太阳穴上。',
    memoryTriggers: [
      '夏天大口咬下一整块雪糕',
      '后脑勺和太阳穴像被针猛扎一样，双手捂住头五官扭曲',
      '痛感通常持续几十秒，用舌头顶住上颚能快速缓解'
    ],
    trivia: '缓解冰淇淋头痛的科学解药非常简单：立刻将温暖的舌头平贴紧压在上腭中央，迅速提高上腭血管温度即可在几秒内阻断痛觉。',
    keywords: ['冰淇淋', '头痛', '吃冰', '脑壳疼', '大口吃冰', '脑仁疼', '吃冷饮头疼', '雪糕头疼'],
    alternatives: [
      { name: '偏头痛 (Migraine)', reason: '周期性神经血管功能紊乱导致的搏动性慢性头痛。' },
      { name: '三叉神经痛', reason: '面部三叉神经分支分布区的骤发骤停闪电样剧痛。' }
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
  { text: '形容一个人虽然贫困但坚守气节的成语', category: '高级成语与修辞' },
  { text: '快递里捏爆特别解压的充气塑料薄膜', category: '日常冷门物件' },
  { text: '看着插座总觉得它像一张人脸的心理错觉', category: '心理与感官现象' },
  { text: '易拉罐拉环转过来刚好可以插吸管的小圆孔', category: '日常冷门物件' },
  { text: '听轻声细语或梳头声时头皮发麻很舒服的感觉', category: '心理与感官现象' }
];

const LOADING_STEPS = [
  '正在翻阅人类记忆殿堂的抽屉...',
  '正在打通深层神经网络的语言突触...',
  '正在排除相似词汇干扰，收敛特征...',
  '马上就要想起来了！灵光正在闪烁...'
];

// 安全保存并读取本地存储
const getStoredList = (key: string, defaultVal: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
};

const setStoredList = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error', e);
  }
};

// 实验室级反向寻词检索调用（支持 Serverless 代理与原生 Gemini 通道）
async function callGeminiReverseLookup(userQuery: string, categoryHint = '') {
  // 1. 优先请求同源 /api/lookup；如果在 GitHub Pages 等纯静态域，则尝试 Vercel 生产代理云函数
  const isVercel = typeof window !== 'undefined' && window.location.hostname.includes('vercel');
  const endpoints = isVercel
    ? ['/api/lookup']
    : ['https://tip-of-my-tongue-five.vercel.app/api/lookup'];

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500); // 4.5秒硬性超时，绝不死等
      const proxyRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userQuery, category: categoryHint }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (proxyRes.ok) {
        const data = await proxyRes.json();
        if (data && data.primaryMatch) return data;
      } else if (proxyRes.status === 401) {
        throw new Error('KEY_EXPIRED');
      }
    } catch (e: any) {
      if (e?.message === 'KEY_EXPIRED') throw e;
      // 超时或跨域网络受阻快速跳出
    }
  }

  // 2. 如果前端注入了 GEMINI API KEY（例如通过 .env 或 Canvas 自动注入）
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') : '') || '';
  if (apiKey) {
    const baseUrl = 'https://generativelanguage.googleapis.com';
    const model = 'gemini-2.5-flash';
    const apiUrl = `${baseUrl}/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const systemPrompt = `你是一个世界级的概念反向检索词典与博学杂学家。用户正处于“话到嘴边却叫不上来”的极度困惑状态。
你的任务是根据用户那段充满口语化、感官感受或模糊细节的特征描述，精准反向锁定最符合的标准专业学名/专有名词/成语/作品名。

要求：
1. 必须返回纯JSON格式，严禁包含Markdown代码块反引号（不要包含任何反引号标记）。
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

    const userPrompt = `用户描述：“${userQuery}”${categoryHint && categoryHint !== '全部' ? ` (限定倾向分类：${categoryHint})` : ''}。请分析这具体叫什么，请直接输出上述指定JSON格式内容。`;

    const payload = {
      contents: [{ parts: [{ text: userPrompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
      }
    }
  }

  // 3. 否则平滑使用本地精选词库直接匹配
  throw new Error('NO_DIRECT_API');
}

// 智能模糊降级算法：即使用户断网，也能从精选词库中智能打分匹配
function findLocalFallback(query: string) {
  const cleanQ = query.toLowerCase().replace(/[\s\p{P}]+/gu, '');
  if (!cleanQ) return null;

  let bestItem: any = null;
  let maxScore = 0;

  for (const item of PRESET_ENCYCLOPEDIA) {
    let score = 0;
    const name = (item.name || '').toLowerCase();
    const foreign = (item.foreignName || '').toLowerCase();
    const oneLine = (item.oneSentenceDef || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const keywords = (item.keywords || []).map((k: string) => k.toLowerCase());

    // 1. 完全或部分包含词名
    if (name && (cleanQ.includes(name) || name.includes(cleanQ))) score += 25;
    if (foreign && cleanQ.includes(foreign)) score += 18;

    // 2. 核心特征关键词强匹配
    for (const kw of keywords) {
      if (cleanQ.includes(kw)) {
        score += 15;
      } else {
        // 双字重合度检测
        for (let i = 0; i < kw.length - 1; i++) {
          const bg = kw.slice(i, i + 2);
          if (cleanQ.includes(bg)) score += 4;
        }
      }
    }

    // 3. 记忆触发点特征比对
    for (const trig of item.memoryTriggers || []) {
      const trigLower = trig.toLowerCase();
      for (let i = 0; i < cleanQ.length - 1; i++) {
        const biGram = cleanQ.slice(i, i + 2);
        if (trigLower.includes(biGram)) score += 1.5;
      }
    }

    // 4. 定义与冷知识文本比对
    for (let i = 0; i < cleanQ.length - 1; i++) {
      const biGram = cleanQ.slice(i, i + 2);
      if (oneLine.includes(biGram)) score += 1.5;
      if (desc.includes(biGram)) score += 0.5;
    }

    if (score > maxScore) {
      maxScore = score;
      bestItem = item;
    }
  }

  // 只要特征得分达到门槛（>= 6）即判定命中内置知识库！
  if (bestItem && maxScore >= 6) {
    return {
      ...bestItem,
      matchScore: Math.min(99, Math.round(75 + Math.min(24, maxScore)))
    };
  }

  // 默认智能构造兜底卡片（100% 保持实验室原始质感）
  return {
    name: '话到嘴边的概念：' + (query.length > 12 ? query.slice(0, 12) + '...' : query),
    pinyin: 'huà dào zuǐ biān',
    foreignName: 'Tip-of-the-tongue phenomenon (TOT)',
    category: '待解概念',
    matchScore: 88,
    oneSentenceDef: '一种极其典型的“舌尖现象 (Tip-of-the-tongue)”。',
    description: `心理学上的舌尖现象（TOT）：指明明知道某个答案或词语，且能描述其边缘特征（声调、字形、使用场景），但由于短时言语提取线索暂时受阻，就是无法说出该词的心理状态。你所描述的特征：“${query}”非常生动，线索正在大脑海马体与语言皮层间加速打通。`,
    memoryTriggers: [
      `你记住了核心特征：“${query}”`,
      '感知线索非常清晰，只差最后的词汇代号拼图',
      '往往在放松或转移注意力后几分钟内突然脱口而出'
    ],
    trivia: '研究表明成年人每周都会经历大约一次舌尖现象，双语使用者发生的频率往往高于单语者。',
    alternatives: [
      { name: '穷且益坚', reason: '形容人虽处境艰难困顿但气节愈发坚定' },
      { name: '空想性错视 (Pareidolia)', reason: '日常中常把无生命的插座、汽车前脸看成人脸的错觉' },
      { name: '鞋带箍 (Aglet)', reason: '鞋带两端包裹的塑料或金属小细管' }
    ]
  };
}

const Toast = ({ message, show, onClose }: { message: string; show: boolean; onClose: () => void }) => {
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
  const [currentResult, setCurrentResult] = useState<any>(null);
  
  // 收藏与历史记录持久化
  const [bookmarks, setBookmarks] = useState(() => getStoredList('tot_bookmarks', [PRESET_ENCYCLOPEDIA[0], PRESET_ENCYCLOPEDIA[2]]));
  const [history, setHistory] = useState(() => getStoredList('tot_history', ['鞋带两头的塑料小套管叫什么', '披萨盒中间防塌的白色塑料小凳子']));
  
  // 复制与语音朗读反馈
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mysteryCard, setMysteryCard] = useState<any>(null);
  const [isMysteryFlipped, setIsMysteryFlipped] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // 动态切换加载幽默提示文案
  useEffect(() => {
    let timer: any;
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
    setHistory((prev: string[]) => {
      const filtered = prev.filter((item) => item !== trimmed);
      return [trimmed, ...filtered].slice(0, 20);
    });

    try {
      // 优先调用 Gemini API / 代理
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
      if (err?.message === 'KEY_EXPIRED') {
        triggerToast('云端 AI 密钥已失效 (401)，已自动切换为内置词库');
      }
      // 智能平滑命中精选知识库
      const fallback = findLocalFallback(trimmed);
      setCurrentResult(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const isBookmarked = (item: any) => {
    if (!item) return false;
    return bookmarks.some((b: any) => b.name === item.name);
  };

  const toggleBookmark = (item: any) => {
    if (!item) return;
    if (isBookmarked(item)) {
      setBookmarks((prev: any[]) => prev.filter((b) => b.name !== item.name));
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
        matchScore: item.matchScore || 98
      };
      setBookmarks((prev: any[]) => [newBookmark, ...prev]);
      triggerToast(`已收藏 “${item.name}” 到记忆手册！`);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    triggerToast('已复制到剪贴板');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string) => {
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

      {/* 顶部优雅导航栏 - 原汁原味实验室纯粹极简设计 */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-stone-50/90 border-b border-stone-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div 
            onClick={() => { setActiveTab('search'); setCurrentResult(null); }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg text-stone-900 tracking-tight whitespace-nowrap">话到嘴边</span>
                <span className="text-[11px] bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full border border-amber-200/60 hidden sm:inline-flex whitespace-nowrap">
                  Tip of My Tongue
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">专治“那个叫什么来着”的记忆打捞神器</p>
            </div>
          </div>

          {/* 桌面端导航标签组 (手机端自动下沉到底部导航栏) */}
          <nav className="hidden md:flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
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
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
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
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'mystery'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Dice5 className="w-4 h-4 text-amber-500" />
              <span>记忆盲盒</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === 'saved'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>我的收藏</span>
              {bookmarks.length > 0 && (
                <span className="bg-amber-400 text-stone-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* 主体交互区域 */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28 md:pb-12">
        {/* VIEW 1: SEARCH & RESULTS */}
        {activeTab === 'search' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
            {/* Hero 标语区 */}
            <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>基于 Gemini 智能语义网络进行反向特征推导</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                叫什么来着？帮你找回想不起的名字
              </h1>
              <p className="text-xs sm:text-base text-stone-500 leading-relaxed px-2">
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
                {QUICK_SEARCH_PROMPTS.slice(0, 6).map((item, idx) => (
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

            {/* 搜索结果展示卡片 - 原汁原味无瑕呈现 */}
            {!isLoading && currentResult && (
              <div className="max-w-3xl mx-auto animate-in zoom-in-95 duration-400 space-y-6">
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
                          className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium transition"
                        >
                          {copiedId === 'result' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === 'result' ? '已复制' : '复制正名'}</span>
                        </button>

                        <button
                          onClick={() => toggleBookmark(currentResult)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition ${
                            isBookmarked(currentResult)
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                        >
                          {isBookmarked(currentResult) ? (
                            <BookmarkCheck className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5" />
                          )}
                          <span>{isBookmarked(currentResult) ? '已收藏' : '收入手册'}</span>
                        </button>
                      </div>
                    </div>

                    {/* 一句话醍醐灌顶定义 */}
                    <div className="p-4 bg-amber-50/50 rounded-2xl border-l-4 border-amber-500">
                      <p className="text-base text-stone-800 font-medium leading-relaxed">
                        “{currentResult.oneSentenceDef}”
                      </p>
                    </div>

                    {/* 详细解释与运作机制 */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                        起源、机制与百科全貌
                      </h4>
                      <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                        {currentResult.description}
                      </p>
                    </div>

                    {/* 特征对照证据链 */}
                    {currentResult.memoryTriggers && currentResult.memoryTriggers.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                          为什么说你找的是它？（特征印证链）
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {currentResult.memoryTriggers.map((trig: string, idx: number) => (
                            <div key={idx} className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 text-xs text-stone-600 space-y-1">
                              <span className="font-bold text-amber-600 block">印证点 0{idx + 1}</span>
                              <p className="leading-relaxed">{trig}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 冷知识/趣味彩蛋 */}
                    {currentResult.trivia && (
                      <div className="p-4 bg-gradient-to-r from-orange-50/60 to-amber-50/60 rounded-2xl border border-amber-100 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="space-y-0.5 text-xs text-stone-700 leading-relaxed">
                          <span className="font-bold text-amber-900 block">你可能不知道的冷知识：</span>
                          <p>{currentResult.trivia}</p>
                        </div>
                      </div>
                    )}

                    {/* 容易混淆的近义备选 */}
                    {currentResult.alternatives && currentResult.alternatives.length > 0 && (
                      <div className="pt-2 border-t border-stone-100 space-y-2">
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                          或者……你脑海里想的其实是这两个？（防混淆辨析）
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentResult.alternatives.map((alt: any, idx: number) => (
                            <div key={idx} className="p-3 rounded-xl bg-stone-50/80 border border-stone-100 text-xs space-y-1">
                              <span className="font-bold text-stone-800">{alt.name}</span>
                              <p className="text-stone-500 leading-relaxed">{alt.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 探索指引与推荐体验 */}
            {!isLoading && !currentResult && (
              <div className="max-w-3xl mx-auto pt-6 border-t border-stone-200/80">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-sm text-stone-800">热门常查经典冷门词精选</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('discovery')}
                    className="text-xs font-medium text-amber-700 hover:text-amber-800 flex items-center gap-1 group"
                  >
                    <span>浏览全部漫游词库</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {PRESET_ENCYCLOPEDIA.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCurrentResult(item);
                        setQuery(item.name);
                      }}
                      className="p-4 bg-white hover:bg-amber-50/40 rounded-2xl border border-stone-200 hover:border-amber-200 shadow-2xs hover:shadow-sm transition cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-amber-600 transition" />
                      </div>
                      <h4 className="font-bold text-stone-900 group-hover:text-amber-900 transition">
                        {item.name}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-1">
                        {item.oneSentenceDef}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: DISCOVERY WALL */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-stone-900">灵感发现漫游墙</h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  收录了人类日常中最容易陷入“话到嘴边”的奇妙概念、罕见物件与心理学名
                </p>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium shrink-0 transition ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-white'
                        : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRESET_ENCYCLOPEDIA.filter(
                (item) => selectedCategory === '全部' || item.category === selectedCategory
              ).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between hover:shadow-md hover:border-amber-200 transition group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-full border border-amber-200/50">
                        {item.category}
                      </span>
                      <button
                        onClick={() => toggleBookmark(item)}
                        className="text-stone-300 hover:text-amber-500 p-1"
                      >
                        {isBookmarked(item) ? (
                          <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition">
                        {item.name}
                      </h3>
                      <p className="text-xs text-stone-400 font-serif italic mt-0.5">
                        {item.foreignName}
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {item.oneSentenceDef}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400">吻合指数 {item.matchScore}%</span>
                    <button
                      onClick={() => {
                        setCurrentResult(item);
                        setActiveTab('search');
                      }}
                      className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                      <span>查阅全景</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: MYSTERY BOX */}
        {activeTab === 'mystery' && (
          <div className="max-w-xl mx-auto py-6 space-y-6 animate-in fade-in duration-300 text-center">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                记忆突击测验 · 盲盒模式
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                看特征描述，你能脱口而出叫出它吗？
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                测测你抵抗“舌尖现象”的词汇敏感度，点击卡片即可揭晓谜底！
              </p>
            </div>

            {mysteryCard && (
              <div
                onClick={() => setIsMysteryFlipped(!isMysteryFlipped)}
                className="bg-white border-2 border-dashed border-amber-300/80 hover:border-amber-400 rounded-3xl p-8 sm:p-10 shadow-lg cursor-pointer transition transform active:scale-98 relative min-h-[300px] flex flex-col items-center justify-center"
              >
                {!isMysteryFlipped ? (
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                      <HelpCircle className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full font-bold">
                        线索分类: {mysteryCard.category}
                      </span>
                      <p className="text-base sm:text-lg text-stone-800 font-medium leading-relaxed px-4">
                        “{mysteryCard.oneSentenceDef}”
                      </p>
                    </div>
                    <div className="text-xs text-amber-600 font-bold bg-amber-50/80 py-2 px-4 rounded-xl inline-block">
                      👉 点击翻转卡片，看看你想的对不对
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in zoom-in-95 duration-200">
                    <div className="space-y-1">
                      <span className="text-xs text-stone-400">谜底正名：</span>
                      <h3 className="text-3xl font-black text-amber-700 tracking-tight">
                        {mysteryCard.name}
                      </h3>
                      <p className="text-sm font-serif italic text-stone-400">
                        {mysteryCard.foreignName}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
                      {mysteryCard.description}
                    </p>

                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentResult(mysteryCard);
                          setActiveTab('search');
                        }}
                        className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition"
                      >
                        查看详细词典卡
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={drawMysteryCard}
                className="flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl text-sm font-medium shadow-md transition"
              >
                <Dice5 className="w-4 h-4 text-amber-400" />
                <span>换一题抽个新盲盒</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 4: SAVED BOOKMARKS */}
        {activeTab === 'saved' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-stone-900">我的记忆灵感手册</h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  那些曾经话到嘴边但被你成功打捞、永久收藏的珍贵学名
                </p>
              </div>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full">
                共收藏 {bookmarks.length} 个
              </span>
            </div>

            {bookmarks.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 space-y-3">
                <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
                <h4 className="text-base font-bold text-stone-700">暂无收藏概念</h4>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  遇到让你恍然大悟的词语时，点击“收入手册”即可将它保存在这里。
                </p>
                <button
                  onClick={() => setActiveTab('discovery')}
                  className="text-xs text-amber-700 font-bold hover:underline"
                >
                  去灵感发现墙逛逛
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarks.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between shadow-2xs hover:shadow-sm transition"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">
                          {item.category}
                        </span>
                        <button
                          onClick={() => toggleBookmark(item)}
                          className="text-amber-500 hover:text-rose-500 p-1 transition"
                          title="移出收藏"
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
                  {history.map((hText: string, index: number) => (
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
      <footer className="border-t border-stone-200 bg-white py-6 mt-12 mb-16 md:mb-0 text-center text-xs text-stone-400 space-y-1">
        <p>话到嘴边 (Tip of My Tongue) · 解决人类词穷与遗忘焦虑的世界概念反向词典</p>
        <p className="text-[11px] text-stone-400">持续更新日常冷门物件、心理学现象、高级成语与科学百科</p>
      </footer>

      {/* 移动端专属优雅底部导航栏 (手机端 App 级质感) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-50/95 backdrop-blur-md border-t border-stone-200/90 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'search' ? 'text-amber-700 font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[11px] whitespace-nowrap">智能寻词</span>
        </button>

        <button
          onClick={() => setActiveTab('discovery')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'discovery' ? 'text-amber-700 font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[11px] whitespace-nowrap">灵感发现</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('mystery');
            if (!mysteryCard) drawMysteryCard();
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'mystery' ? 'text-amber-700 font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Dice5 className="w-5 h-5 text-amber-500" />
          <span className="text-[11px] whitespace-nowrap">记忆盲盒</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors relative ${
            activeTab === 'saved' ? 'text-amber-700 font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="relative">
            <Bookmark className="w-5 h-5 text-amber-500" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-amber-400 text-stone-950 font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {bookmarks.length}
              </span>
            )}
          </div>
          <span className="text-[11px] whitespace-nowrap">我的收藏</span>
        </button>
      </nav>
    </div>
  );
}