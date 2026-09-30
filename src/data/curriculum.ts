import { VocabItem, GrammarRule } from '../types';

export const VOCAB_ITEMS: VocabItem[] = [
  {
    id: 'apple',
    word: 'apple',
    pluralWord: 'apples',
    article: 'an',
    chinese: '苹果',
    pluralChinese: '苹果（复数）',
    emoji: '🍎',
    category: 'fruit',
    soundHint: '以元音音素 /æ/ 开头，用 an'
  },
  {
    id: 'orange',
    word: 'orange',
    pluralWord: 'oranges',
    article: 'an',
    chinese: '橙子',
    pluralChinese: '橙子（复数）',
    emoji: '🍊',
    category: 'fruit',
    soundHint: '以元音音素 /ɒ/ 开头，用 an'
  },
  {
    id: 'cat',
    word: 'cat',
    pluralWord: 'cats',
    article: 'a',
    chinese: '小猫',
    pluralChinese: '小猫（复数）',
    emoji: '🐱',
    category: 'animal',
    soundHint: '以辅音音素 /k/ 开头，用 a'
  },
  {
    id: 'dog',
    word: 'dog',
    pluralWord: 'dogs',
    article: 'a',
    chinese: '小狗',
    pluralChinese: '小狗（复数）',
    emoji: '🐶',
    category: 'animal',
    soundHint: '以辅音音素 /d/ 开头，用 a'
  },
  {
    id: 'bird',
    word: 'bird',
    pluralWord: 'birds',
    article: 'a',
    chinese: '小鸟',
    pluralChinese: '小鸟（复数）',
    emoji: '🐦',
    category: 'animal',
    soundHint: '以辅音音素 /b/ 开头，用 a'
  },
  {
    id: 'elephant',
    word: 'elephant',
    pluralWord: 'elephants',
    article: 'an',
    chinese: '大象',
    pluralChinese: '大象（复数）',
    emoji: '🐘',
    category: 'animal',
    soundHint: '以元音音素 /e/ 开头，用 an'
  },
  {
    id: 'book',
    word: 'book',
    pluralWord: 'books',
    article: 'a',
    chinese: '书本',
    pluralChinese: '书本（复数）',
    emoji: '📕',
    category: 'stationery',
    soundHint: '以辅音音素 /b/ 开头，用 a'
  },
  {
    id: 'pencil',
    word: 'pencil',
    pluralWord: 'pencils',
    article: 'a',
    chinese: '铅笔',
    pluralChinese: '铅笔（复数）',
    emoji: '✏️',
    category: 'stationery',
    soundHint: '以辅音音素 /p/ 开头，用 a'
  },
  {
    id: 'eraser',
    word: 'eraser',
    pluralWord: 'erasers',
    article: 'an',
    chinese: '橡皮擦',
    pluralChinese: '橡皮擦（复数）',
    emoji: '🧽',
    category: 'stationery',
    soundHint: '以元音音素 /ɪ/ 开头，用 an'
  },
  {
    id: 'ruler',
    word: 'ruler',
    pluralWord: 'rulers',
    article: 'a',
    chinese: '尺子',
    pluralChinese: '尺子（复数）',
    emoji: '📏',
    category: 'stationery',
    soundHint: '以辅音音素 /r/ 开头，用 a'
  },
  {
    id: 'flower',
    word: 'flower',
    pluralWord: 'flowers',
    article: 'a',
    chinese: '花朵',
    pluralChinese: '花朵（复数）',
    emoji: '🌸',
    category: 'nature',
    soundHint: '以辅音音素 /f/ 开头，用 a'
  },
  {
    id: 'tree',
    word: 'tree',
    pluralWord: 'trees',
    article: 'a',
    chinese: '大树',
    pluralChinese: '大树（复数）',
    emoji: '🌳',
    category: 'nature',
    soundHint: '以辅音音素 /tr/ 开头，用 a'
  },
  {
    id: 'star',
    word: 'star',
    pluralWord: 'stars',
    article: 'a',
    chinese: '星星',
    pluralChinese: '星星（复数）',
    emoji: '⭐',
    category: 'nature',
    soundHint: '以辅音音素 /st/ 开头，用 a'
  },
  {
    id: 'car',
    word: 'car',
    pluralWord: 'cars',
    article: 'a',
    chinese: '小汽车',
    pluralChinese: '小汽车（复数）',
    emoji: '🚗',
    category: 'object',
    soundHint: '以辅音音素 /k/ 开头，用 a'
  },
  {
    id: 'balloon',
    word: 'balloon',
    pluralWord: 'balloons',
    article: 'a',
    chinese: '气球',
    pluralChinese: '气球（复数）',
    emoji: '🎈',
    category: 'object',
    soundHint: '以辅音音素 /b/ 开头，用 a'
  },
  {
    id: 'umbrella',
    word: 'umbrella',
    pluralWord: 'umbrellas',
    article: 'an',
    chinese: '雨伞',
    pluralChinese: '雨伞（复数）',
    emoji: '☂️',
    category: 'object',
    soundHint: '以元音音素 /ʌ/ 开头，用 an'
  }
];

export const GRAMMAR_RULES: Record<'this' | 'that' | 'these' | 'those', GrammarRule> = {
  this: {
    key: 'this',
    distance: 'near',
    quantity: 'singular',
    questionEn: "What's this?",
    questionCn: '这是什么？',
    answerPatternEn: "It's a / an + [单数名词].",
    answerPatternCn: '它是……（一个）',
    distanceLabel: '近处 (Near 手边触手可及)',
    quantityLabel: '单数 (Singular 只有 1 个)',
    pronoun: "It's",
    beVerb: 'is',
    exampleQuestion: "What's this?",
    exampleAnswer: "It's an apple.",
    colorScheme: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-800',
      badge: 'bg-amber-100 text-amber-900 border-amber-300'
    }
  },
  that: {
    key: 'that',
    distance: 'far',
    quantity: 'singular',
    questionEn: "What's that?",
    questionCn: '那是什么？',
    answerPatternEn: "It's a / an + [单数名词].",
    answerPatternCn: '它是……（一个）',
    distanceLabel: '远处 (Far 伸出手指远望)',
    quantityLabel: '单数 (Singular 只有 1 个)',
    pronoun: "It's",
    beVerb: 'is',
    exampleQuestion: "What's that?",
    exampleAnswer: "It's a dog.",
    colorScheme: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      text: 'text-emerald-800',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    }
  },
  these: {
    key: 'these',
    distance: 'near',
    quantity: 'plural',
    questionEn: 'What are these?',
    questionCn: '这些是什么？',
    answerPatternEn: 'They are + [复数名词 -s/-es].',
    answerPatternCn: '它们是……（多个）',
    distanceLabel: '近处 (Near 就在眼前聚集)',
    quantityLabel: '复数 (Plural 2个或以上)',
    pronoun: 'They are',
    beVerb: 'are',
    exampleQuestion: 'What are these?',
    exampleAnswer: 'They are apples.',
    colorScheme: {
      bg: 'bg-sky-50',
      border: 'border-sky-300',
      text: 'text-sky-800',
      badge: 'bg-sky-100 text-sky-900 border-sky-300'
    }
  },
  those: {
    key: 'those',
    distance: 'far',
    quantity: 'plural',
    questionEn: 'What are those?',
    questionCn: '那些是什么？',
    answerPatternEn: 'They are + [复数名词 -s/-es].',
    answerPatternCn: '它们是……（多个）',
    distanceLabel: '远处 (Far 远方那群目标)',
    quantityLabel: '复数 (Plural 2个或以上)',
    pronoun: 'They are',
    beVerb: 'are',
    exampleQuestion: 'What are those?',
    exampleAnswer: 'They are stars.',
    colorScheme: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      text: 'text-purple-800',
      badge: 'bg-purple-100 text-purple-900 border-purple-300'
    }
  }
};

export const CLASSROOM_CHANTS = [
  {
    title: '🎵 远近单复数魔法口诀歌 (Classroom Magic Chant)',
    rhythm: '欢快四拍节奏 (拍手打节拍 👏 👏 👏 👏)',
    lines: [
      { en: "This, this, 近处是 this! 👆", cn: "近在眼前单个物，问 What's this?" },
      { en: "That, that, 远处是 that! 👉", cn: "遥遥远望单个物，问 What's that?" },
      { en: "It's a, It's an, 快速来回答！", cn: "辅音 a，元音 an，记得加名词！" },
      { en: "These, these, 近处这些是 these! 🍎🍎", cn: "身边一堆好伙伴，问 What are these?" },
      { en: "Those, those, 远处那些是 those! 🌲🌲", cn: "远方群星与树木，问 What are those?" },
      { en: "They are, They are, 加 s 别忘掉！", cn: "复数名言加 s，大家齐欢笑！" }
    ]
  },
  {
    title: '💡 巧记 a 与 an 的小秘密 (Article Rule)',
    rhythm: '元音五个好朋友：A, E, I, O, U',
    lines: [
      { en: "an apple 🍎, an orange 🍊, an elephant 🐘", cn: "元音音素开口响，an 顶帽子头上戴！" },
      { en: "a book 📕, a cat 🐱, a pencil ✏️", cn: "辅音轻快读得准，a 来伴随好伙伴！" },
      { en: "复数名词注意啦：无需 a 和 an！", cn: "直接变身加 -s，如 apples, books, cars！" }
    ]
  }
];

export const LESSON_PLAN = {
  subject: '小学英语 (Primary English)',
  grade: '三年级 / 四年级 (Grade 3/4)',
  topic: "Unit: This and That, These and Those (近指与远指指示代词及回答)",
  duration: '40 分钟 (40 Minutes)',
  objectives: {
    knowledge: [
      "掌握 4 个核心句型：What's this? / What's that? / What are these? / What are those?",
      "准确使用回答句型：It's a/an... 与 They are...",
      "能熟练区分空间距离 (Near 近 vs Far 远) 与数量特征 (Singular 单数 vs Plural 复数)"
    ],
    ability: [
      "能在真实或模拟生活情境中，准确使用指示代词提问并作答",
      "掌握元音音素开头单词与 an 的连用规则，以及规则复数加 -s 的语音发音"
    ],
    emotional: [
      "通过有趣的互动探险游戏与小组 PK，激发小学生学习英语的好奇心与团队合作成就感"
    ]
  },
  keyPoints: "四对句型的音义形匹配，近指/远指方位手势配合，单数复数问答一致性",
  difficulties: "复数句型 be 动词 are 与名词 -s 的漏读漏写；this [ðɪs] 与 these [ði:z] 的长短元音与浊辅音辨析",
  steps: [
    {
      step: '1. Warm-up & Lead-in (5 mins)',
      action: '律动热身',
      detail: '全班起立，播放本站内置轻快音乐，带领学生做手势操：摸摸桌前喊 "This!"，指指窗外喊 "That!"，双手揽近喊 "These!"，双手远推喊 "Those!"。'
    },
    {
      step: '2. Presentation (12 mins)',
      action: '情境呈现与 2x2 魔法矩阵',
      detail: '打开本站「互动课堂展板」，拖动距离滑块与数量滑块，让学生直观观察画面人物的手势变化、放大镜与望远镜视角的切换，学习 4 组句型的板书与发音。'
    },
    {
      step: '3. Practice (13 mins)',
      action: '趣味闯关与句子工坊',
      detail: '分组进行本站「魔法大冒险」游戏，使用句子拼搭工坊（Sentence Builder）排词成句，进行「双人小队 PK」积分赛，全班实时大声跟读反馈。'
    },
    {
      step: '4. Production (7 mins)',
      action: '小小侦探现场调查 (Classroom Real Hunting)',
      detail: '请 2 名学生拿教室文具或卡片在讲台上演，1 人在近处举起问，1 人在教室后门指着问，其他学生争做小雷达快速回答。'
    },
    {
      step: '5. Summary & Homework (3 mins)',
      action: '口诀总结与课后巩固',
      detail: '全班齐念儿歌口诀；点击本站「一键打印备课纸」，将生动练习单发给学生作为课后趣味作业。'
    }
  ]
};
