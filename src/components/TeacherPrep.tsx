import React, { useState } from 'react';
import { Printer, Download, BookOpen, Music, CheckSquare, Sparkles, Copy, Check } from 'lucide-react';
import { LESSON_PLAN, CLASSROOM_CHANTS, VOCAB_ITEMS } from '../data/curriculum';
import { sound } from '../utils/audio';

export const TeacherPrep: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plan' | 'chants' | 'board' | 'worksheet'>('plan');
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    sound.playSparkle();
    window.print();
  };

  const copyChants = () => {
    sound.playPop();
    const text = CLASSROOM_CHANTS.map(c => `${c.title}\n${c.lines.map(l => `${l.en} (${l.cn})`).join('\n')}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-amber-800 mb-1 flex items-center gap-2">
            <span>高级备课智囊箱</span>
            <span>·</span>
            <span>符合义务教育英语课程标准</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
            👩‍🏫 小学英语教师备课与教案中心
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            提供完整的40分钟教学设计、课堂律动口诀、板书设计图以及一键排版打印的学生课堂练习纸！
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md transition-all whitespace-nowrap active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>打印当前备课资料 / 练习单</span>
        </button>
      </div>

      {/* Internal Subtabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-xl border border-amber-200 shadow-xs">
        <button
          onClick={() => { sound.playPop(); setActiveTab('plan'); }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'plan'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:bg-amber-50'
          }`}
        >
          📋 40分钟完整教案
        </button>
        <button
          onClick={() => { sound.playPop(); setActiveTab('chants'); }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'chants'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:bg-amber-50'
          }`}
        >
          🎶 课堂儿歌与手势口诀
        </button>
        <button
          onClick={() => { sound.playPop(); setActiveTab('board'); }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'board'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:bg-amber-50'
          }`}
        >
          🖍️ 课堂板书设计图
        </button>
        <button
          onClick={() => { sound.playPop(); setActiveTab('worksheet'); }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'worksheet'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:bg-amber-50'
          }`}
        >
          📄 学生随堂练习纸 (可打印)
        </button>
      </div>

      {/* ================= 1. LESSON PLAN TAB ================= */}
      {activeTab === 'plan' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-6 printable-content">
          <div className="border-b border-amber-100 pb-4">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
              Teaching Design &amp; Lesson Plan
            </span>
            <h3 className="text-2xl font-display font-bold text-slate-900 mt-1">
              {LESSON_PLAN.topic}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
              <span>学科：{LESSON_PLAN.subject}</span>
              <span>·</span>
              <span>适用年级：{LESSON_PLAN.grade}</span>
              <span>·</span>
              <span>课时：{LESSON_PLAN.duration}</span>
            </div>
          </div>

          {/* Three-Dimensional Teaching Objectives */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>一、教学目标 (Teaching Objectives)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-900 block mb-1">1. 知识与技能目标</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {LESSON_PLAN.objectives.knowledge.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900 block mb-1">2. 过程与方法目标</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {LESSON_PLAN.objectives.ability.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-sky-50/70 rounded-xl border border-sky-200">
                <span className="font-bold text-sky-900 block mb-1">3. 情感态度与价值观</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {LESSON_PLAN.objectives.emotional.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Key & Difficult Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">🎯 教学重难点 (Key Points)</span>
              <p className="text-slate-600">{LESSON_PLAN.keyPoints}</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">⚡ 易错与突破点 (Difficulties)</span>
              <p className="text-slate-600">{LESSON_PLAN.difficulties}</p>
            </div>
          </div>

          {/* 5-Step Procedure */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>二、教学流程设计 (5-Step Procedure)</span>
            </h4>

            <div className="space-y-3">
              {LESSON_PLAN.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 hover:bg-amber-50/40 rounded-2xl border border-slate-200 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <span className="font-display font-bold text-sm text-slate-900">
                      {step.step}
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md self-start">
                      {step.action}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. CHANTS TAB ================= */}
      {activeTab === 'chants' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900">
                🎶 课堂互动儿歌与手势口诀
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                节奏感强，适合课前热身、课中突破和课尾巩固全班互动打节拍！
              </p>
            </div>
            <button
              onClick={copyChants}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold transition-colors border border-amber-200"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制到剪贴板' : '复制全部口诀'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CLASSROOM_CHANTS.map((chant, i) => (
              <div key={i} className="p-6 bg-gradient-to-b from-amber-50 to-orange-50/30 rounded-2xl border border-amber-200 space-y-4">
                <div>
                  <h4 className="font-display font-bold text-base text-amber-950">
                    {chant.title}
                  </h4>
                  <div className="text-xs font-bold text-amber-700 mt-1">
                    节拍指示：{chant.rhythm}
                  </div>
                </div>

                <div className="space-y-3">
                  {chant.lines.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-3 bg-white/90 rounded-xl border border-amber-200/80 shadow-xs"
                    >
                      <div className="font-display font-bold text-sm text-slate-900">
                        {line.en}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">{line.cn}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 3. BLACKBOARD DESIGN TAB ================= */}
      {activeTab === 'board' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-6">
          <div>
            <h3 className="font-display font-bold text-xl text-slate-900">
              🖍️ 优秀课堂板书设计参考 (Blackboard Layout)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              清晰的 2x2 结构分区板书，红粉笔与白粉笔对比分明，学生一目了然！
            </p>
          </div>

          {/* Blackboard visual container */}
          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 border-8 border-amber-800 shadow-2xl space-y-6 font-mono">
            {/* Blackboard Title */}
            <div className="text-center border-b border-emerald-800/80 pb-3">
              <span className="text-amber-300 font-bold text-lg sm:text-xl tracking-wider">
                ★ Unit: This &amp; That, These &amp; Those ★
              </span>
            </div>

            {/* 2x2 Grid Blackboard layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Top-Left: Near + Singular */}
              <div className="p-4 bg-emerald-900/60 rounded-xl border border-emerald-700/60 space-y-1.5">
                <div className="text-amber-300 font-bold text-sm">
                  【近处 Near】· 单数 (Singular) 👇
                </div>
                <div className="text-white text-base font-bold">
                  Q: What's <span className="text-yellow-300 underline">this</span>?
                </div>
                <div className="text-emerald-200 text-sm">
                  A: It's a / an [名词].
                </div>
                <div className="text-xs text-emerald-400">
                  例: It's an apple. 🍎
                </div>
              </div>

              {/* Top-Right: Far + Singular */}
              <div className="p-4 bg-emerald-900/60 rounded-xl border border-emerald-700/60 space-y-1.5">
                <div className="text-sky-300 font-bold text-sm">
                  【远处 Far】· 单数 (Singular) 👉
                </div>
                <div className="text-white text-base font-bold">
                  Q: What's <span className="text-yellow-300 underline">that</span>?
                </div>
                <div className="text-emerald-200 text-sm">
                  A: It's a / an [名词].
                </div>
                <div className="text-xs text-sky-400">
                  例: It's a cat. 🐱
                </div>
              </div>

              {/* Bottom-Left: Near + Plural */}
              <div className="p-4 bg-emerald-900/60 rounded-xl border border-emerald-700/60 space-y-1.5">
                <div className="text-amber-300 font-bold text-sm">
                  【近处 Near】· 复数 (Plural) 👇
                </div>
                <div className="text-white text-base font-bold">
                  Q: What are <span className="text-yellow-300 underline">these</span>?
                </div>
                <div className="text-emerald-200 text-sm">
                  A: They are [名词-s].
                </div>
                <div className="text-xs text-amber-400">
                  例: They are apples. 🍎🍎
                </div>
              </div>

              {/* Bottom-Right: Far + Plural */}
              <div className="p-4 bg-emerald-900/60 rounded-xl border border-emerald-700/60 space-y-1.5">
                <div className="text-sky-300 font-bold text-sm">
                  【远处 Far】· 复数 (Plural) 👉
                </div>
                <div className="text-white text-base font-bold">
                  Q: What are <span className="text-yellow-300 underline">those</span>?
                </div>
                <div className="text-emerald-200 text-sm">
                  A: They are [名词-s].
                </div>
                <div className="text-xs text-sky-400">
                  例: They are stars. ⭐⭐
                </div>
              </div>
            </div>

            {/* Blackboard footer tips */}
            <div className="p-3 bg-emerald-900/40 rounded-xl border border-emerald-800 text-xs text-amber-200 flex items-center justify-between">
              <span>🌟 板书重点提示：元音开口加 an (an apple / orange)；复数名词加 -s，be动词变 are！</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. PRINTABLE WORKSHEET TAB ================= */}
      {activeTab === 'worksheet' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-6 printable-worksheet">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900">
                📄 小学英语随堂达标训练单 (A4 Printable Worksheet)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                点击上方“打印”按钮，可直接打印为标准的学生 A4 纸张测试卷！
              </p>
            </div>
            <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200">
              班级: _________ 姓名: _________ 得分: _________
            </div>
          </div>

          {/* Section 1: Choose This / That / These / Those */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-900">
              一、看图与手势，在括号内填入正确的指示代词 (this / that / these / those):
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border flex items-center justify-between">
                <span>1. 👇 (近处·1个) What's _________? — It's an orange. 🍊</span>
                <span className="font-mono text-slate-400">( _______ )</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border flex items-center justify-between">
                <span>2. 👉 (远处·1个) What's _________? — It's a bird. 🐦</span>
                <span className="font-mono text-slate-400">( _______ )</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border flex items-center justify-between">
                <span>3. 👇 (近处·多个) What are _________? — They are books. 📕📕</span>
                <span className="font-mono text-slate-400">( _______ )</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border flex items-center justify-between">
                <span>4. 👉 (远处·多个) What are _________? — They are stars. ⭐⭐⭐</span>
                <span className="font-mono text-slate-400">( _______ )</span>
              </div>
            </div>
          </div>

          {/* Section 2: Choose is / are & a / an */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-900">
              二、选词填空 (选填 is / are 或 a / an):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border">
                1. What _______ (is / are) this?
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border">
                2. What _______ (is / are) those?
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border">
                3. It's _______ (a / an) elephant. 🐘
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border">
                4. They are _______ (pencils / a pencil). ✏️
              </div>
            </div>
          </div>

          {/* Section 3: Word Cards Cutting Zone */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-900">
              三、单词剪刀卡片区 (可剪下作为课堂实物配对卡片):
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {VOCAB_ITEMS.slice(0, 8).map(v => (
                <div key={v.id} className="p-2.5 border-2 border-dashed border-slate-300 rounded-xl">
                  <div className="text-2xl mb-1">{v.emoji}</div>
                  <div className="font-bold">{v.article} {v.word}</div>
                  <div className="text-slate-400 text-[10px]">{v.pluralWord}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
