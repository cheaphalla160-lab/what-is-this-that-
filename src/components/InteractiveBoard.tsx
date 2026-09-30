import React, { useState } from 'react';
import { Volume2, Sparkles, Compass, Hand, Eye, MoveRight, ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { DistanceType, QuantityType, VocabItem } from '../types';
import { VOCAB_ITEMS, GRAMMAR_RULES, CLASSROOM_CHANTS } from '../data/curriculum';
import { sound } from '../utils/audio';

import meadowBg from '../assets/images/interactive_meadow_stage_1790780015750.jpg';
import bunnyImg from '../assets/images/mascot_bunny_teacher_1790779983567.jpg';

interface InteractiveBoardProps {
  onEarnStar?: () => void;
}

export const InteractiveBoard: React.FC<InteractiveBoardProps> = ({ onEarnStar }) => {
  const [distance, setDistance] = useState<DistanceType>('near');
  const [quantity, setQuantity] = useState<QuantityType>('singular');
  const [selectedVocab, setSelectedVocab] = useState<VocabItem>(VOCAB_ITEMS[0]); // apple
  const [count, setCount] = useState<number>(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeChantIndex, setActiveChantIndex] = useState(0);

  // Determine current key: this, that, these, those
  const currentKey: 'this' | 'that' | 'these' | 'those' =
    distance === 'near'
      ? quantity === 'singular' ? 'this' : 'these'
      : quantity === 'singular' ? 'that' : 'those';

  const currentRule = GRAMMAR_RULES[currentKey];

  const handleDistanceChange = (d: DistanceType) => {
    sound.playPop();
    setDistance(d);
  };

  const handleQuantityChange = (q: QuantityType) => {
    sound.playPop();
    setQuantity(q);
    if (q === 'singular') {
      setCount(1);
    } else if (count === 1) {
      setCount(3);
    }
  };

  const handleVocabSelect = (item: VocabItem) => {
    sound.playPop();
    setSelectedVocab(item);
  };

  // Generate question and answer text dynamically
  const questionText = currentRule.questionEn;
  const answerText =
    quantity === 'singular'
      ? `It's ${selectedVocab.article} ${selectedVocab.word}.`
      : `They are ${selectedVocab.pluralWord}.`;

  const questionCn = currentRule.questionCn;
  const answerCn =
    quantity === 'singular'
      ? `它是（一个）${selectedVocab.chinese}。`
      : `它们是${selectedVocab.chinese}。`;

  const speakSentence = (text: string) => {
    sound.playPop();
    setIsSpeaking(true);
    sound.speakEnglish(text, () => {
      setIsSpeaking(false);
    });
  };

  const speakFullDialog = () => {
    sound.playSparkle();
    setIsSpeaking(true);
    sound.speakEnglish(`${questionText} ... ${answerText}`, () => {
      setIsSpeaking(false);
      if (onEarnStar) onEarnStar();
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Concept Pill Matrix */}
      <div className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1">
              <span>小学英语语法互动大黑板</span>
              <span>·</span>
              <span>指示代词与问答辨析</span>
              <span>·</span>
              <span className="text-emerald-700">课堂白板 / 投影可用</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              What’s this? That? These? Those? 魔法探秘
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              结合方位手势与数量变换，带孩子们直观感知“近与远”、“单与复”的奇妙区别！
            </p>
          </div>

          {/* Quick 2x2 Matrix Selector Widget */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold sm:w-80">
            <button
              onClick={() => { handleDistanceChange('near'); handleQuantityChange('singular'); }}
              className={`p-2 rounded-xl border text-left transition-all ${
                distance === 'near' && quantity === 'singular'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm scale-102'
                  : 'bg-amber-50/60 text-amber-900 border-amber-200 hover:bg-amber-100/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">1. What's this?</span>
                <span>👇 1️⃣</span>
              </div>
              <div className="text-[11px] opacity-90 mt-0.5">近处 · 单数 (It's a/an)</div>
            </button>

            <button
              onClick={() => { handleDistanceChange('far'); handleQuantityChange('singular'); }}
              className={`p-2 rounded-xl border text-left transition-all ${
                distance === 'far' && quantity === 'singular'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm scale-102'
                  : 'bg-emerald-50/60 text-emerald-900 border-emerald-200 hover:bg-emerald-100/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">2. What's that?</span>
                <span>👉 1️⃣</span>
              </div>
              <div className="text-[11px] opacity-90 mt-0.5">远处 · 单数 (It's a/an)</div>
            </button>

            <button
              onClick={() => { handleDistanceChange('near'); handleQuantityChange('plural'); }}
              className={`p-2 rounded-xl border text-left transition-all ${
                distance === 'near' && quantity === 'plural'
                  ? 'bg-sky-600 text-white border-sky-700 shadow-sm scale-102'
                  : 'bg-sky-50/60 text-sky-900 border-sky-200 hover:bg-sky-100/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">3. What are these?</span>
                <span>👇 🍎🍎</span>
              </div>
              <div className="text-[11px] opacity-90 mt-0.5">近处 · 复数 (They are)</div>
            </button>

            <button
              onClick={() => { handleDistanceChange('far'); handleQuantityChange('plural'); }}
              className={`p-2 rounded-xl border text-left transition-all ${
                distance === 'far' && quantity === 'plural'
                  ? 'bg-purple-600 text-white border-purple-700 shadow-sm scale-102'
                  : 'bg-purple-50/60 text-purple-900 border-purple-200 hover:bg-purple-100/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">4. What are those?</span>
                <span>👉 🍎🍎</span>
              </div>
              <div className="text-[11px] opacity-90 mt-0.5">远处 · 复数 (They are)</div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sandbox: Left Stage & Right Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Zone: The Visual Stage (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-md min-h-[360px] sm:min-h-[420px] flex flex-col justify-between">
            {/* Stage Background Illustration */}
            <img
              src={meadowBg}
              alt="Interactive Stage"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />
            {/* Dark gradient for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/40 pointer-events-none" />

            {/* Stage Top Bar: Distance & Quantity Tag Badges */}
            <div className="relative z-10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
                  {distance === 'near' ? '🔍 近处 (Near)' : '🔭 远处 (Far)'}
                </span>
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
                  {quantity === 'singular' ? '1️⃣ 单数 (1个)' : `🍎 复数 (${count}个)`}
                </span>
              </div>

              {/* Read Dialog aloud button */}
              <button
                onClick={speakFullDialog}
                disabled={isSpeaking}
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-full shadow-md transition-all active:scale-95"
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-ping' : ''}`} />
                <span>连贯朗读问答</span>
              </button>
            </div>

            {/* Stage Center: Animated Mascot and Object positioning */}
            <div className="relative z-10 flex-1 flex items-center justify-between px-6 sm:px-10 py-4">
              {/* Mascot Teacher Bunny with pointer wand */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/80 shadow-lg bg-white/30 backdrop-blur-xs transition-transform duration-300 hover:scale-105">
                  <img
                    src={bunnyImg}
                    alt="Bunny Teacher"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 px-2.5 py-1 bg-white/90 rounded-full text-[11px] font-bold text-slate-800 shadow-xs">
                  {distance === 'near' ? '摸摸手边 👇' : '远眺前方 👉'}
                </div>
              </div>

              {/* Visual Distance Line / Pointer Indicator */}
              <div className="flex-1 flex flex-col items-center justify-center px-4">
                {distance === 'near' ? (
                  <div className="flex items-center gap-1 text-amber-300 animate-pulse font-bold text-xs">
                    <span>近在咫尺</span>
                    <MoveRight className="w-5 h-5 text-amber-300" />
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center">
                    <div className="text-[11px] font-bold text-sky-200 mb-1">
                      ---- 隔着距离远望 (Over there!) ----
                    </div>
                    <div className="w-full h-1 border-t-2 border-dashed border-sky-300/80 flex items-center justify-end">
                      <ArrowRight className="w-5 h-5 text-sky-300" />
                    </div>
                  </div>
                )}
              </div>

              {/* Objects Display Area (Near or Far scaled) */}
              <div
                className={`transition-all duration-500 flex flex-col items-center ${
                  distance === 'near'
                    ? 'scale-115 translate-x-0'
                    : 'scale-85 translate-x-1 sm:translate-x-3 opacity-95'
                }`}
              >
                {/* Object Container Card with halo */}
                <div className="relative p-4 rounded-2xl bg-white/85 backdrop-blur-md border-2 border-white shadow-xl flex flex-wrap items-center justify-center gap-2 max-w-[170px] min-h-[100px]">
                  {Array.from({ length: quantity === 'singular' ? 1 : count }).map((_, i) => (
                    <div
                      key={i}
                      className="text-4xl sm:text-5xl transition-transform hover:scale-125 cursor-pointer animate-bounce"
                      style={{ animationDelay: `${i * 120}ms`, animationDuration: '2s' }}
                      onClick={() => sound.playSparkle()}
                    >
                      {selectedVocab.emoji}
                    </div>
                  ))}

                  {/* Quantity number badge */}
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-amber-500 text-white font-mono font-bold text-xs rounded-full shadow-xs">
                    {quantity === 'singular' ? '1' : count}
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <div className="text-white font-display font-bold text-sm tracking-wide drop-shadow-md">
                    {quantity === 'singular' ? selectedVocab.word : selectedVocab.pluralWord}
                  </div>
                  <div className="text-amber-200 text-xs drop-shadow-md">
                    {selectedVocab.chinese}
                  </div>
                </div>
              </div>
            </div>

            {/* Stage Bottom: Large High-Contrast Classroom Subtitles */}
            <div className="relative z-10 bg-slate-900/90 backdrop-blur-md p-4 border-t border-slate-700/80 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Question */}
                <div className="flex-1 bg-slate-800/80 rounded-xl p-3 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400">❓ 提问 (Question)</span>
                    <button
                      onClick={() => speakSentence(questionText)}
                      className="text-slate-300 hover:text-white p-1 rounded hover:bg-slate-700 transition-colors"
                      title="点击朗读问题"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="font-display font-bold text-lg sm:text-xl text-white mt-0.5">
                    {questionText}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">{questionCn}</div>
                </div>

                {/* Answer */}
                <div className="flex-1 bg-amber-950/40 rounded-xl p-3 border border-amber-600/50">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-300">💡 回答 (Answer)</span>
                    <button
                      onClick={() => speakSentence(answerText)}
                      className="text-slate-300 hover:text-white p-1 rounded hover:bg-amber-900/50 transition-colors"
                      title="点击朗读回答"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="font-display font-bold text-lg sm:text-xl text-amber-200 mt-0.5">
                    {answerText}
                  </div>
                  <div className="text-xs text-amber-100/80 mt-0.5">{answerCn}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Classroom Chant Carousel */}
          <div className="bg-amber-100/70 border border-amber-300 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">🎶</span>
                <span className="font-display font-bold text-sm text-amber-950">
                  {CLASSROOM_CHANTS[activeChantIndex].title}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {CLASSROOM_CHANTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { sound.playPop(); setActiveChantIndex(i); }}
                    className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                      activeChantIndex === i
                        ? 'bg-amber-600 text-white'
                        : 'bg-white text-slate-700 hover:bg-amber-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {CLASSROOM_CHANTS[activeChantIndex].lines.map((line, idx) => (
                <div
                  key={idx}
                  onClick={() => speakSentence(line.en)}
                  className="bg-white/80 hover:bg-white p-2.5 rounded-xl border border-amber-200/80 cursor-pointer transition-all hover:shadow-xs group"
                >
                  <div className="font-bold text-amber-900 flex items-center justify-between">
                    <span>{line.en}</span>
                    <Volume2 className="w-3 h-3 text-amber-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{line.cn}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Zone: Teacher Control Deck & Grammar Inspector (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Controls: Distance and Quantity toggles */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-xs space-y-4">
            <h2 className="text-base font-display font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>黑板教具控制台 (Interactive Controls)</span>
            </h2>

            {/* 1. Distance Switch */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>① 空间距离 (Distance)</span>
                <span className="text-amber-700">
                  {distance === 'near' ? '近处 · 手边近物' : '远处 · 远方目标'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleDistanceChange('near')}
                  className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    distance === 'near'
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  <Hand className="w-4 h-4" />
                  <span>Near 近处 (This / These)</span>
                </button>
                <button
                  onClick={() => handleDistanceChange('far')}
                  className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    distance === 'far'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Far 远处 (That / Those)</span>
                </button>
              </div>
            </div>

            {/* 2. Quantity Switch */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>② 数量多少 (Number)</span>
                <span className="text-amber-700">
                  {quantity === 'singular' ? '单数 · 仅 1 个' : `复数 · 多个 (${count}个)`}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleQuantityChange('singular')}
                  className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    quantity === 'singular'
                      ? 'bg-sky-600 text-white border-sky-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50'
                  }`}
                >
                  <span>1️⃣ 单数 Singular (1个)</span>
                </button>
                <button
                  onClick={() => handleQuantityChange('plural')}
                  className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    quantity === 'plural'
                      ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50'
                  }`}
                >
                  <span>🍎🍎 复数 Plural (多个)</span>
                </button>
              </div>

              {/* Quantity Counter Slider for Plural */}
              {quantity === 'plural' && (
                <div className="mt-2.5 p-2.5 bg-purple-50 rounded-xl border border-purple-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-purple-900">调节物品数量:</span>
                  <div className="flex items-center gap-1.5">
                    {[2, 3, 4].map(num => (
                      <button
                        key={num}
                        onClick={() => { sound.playPop(); setCount(num); }}
                        className={`w-7 h-7 rounded-lg font-bold font-mono text-xs transition-colors ${
                          count === num
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Vocabulary Switcher */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                <span>③ 切换课堂演示实物 (Select Item)</span>
                <span className="text-xs text-slate-500">{selectedVocab.soundHint}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 max-h-36 overflow-y-auto p-1 border border-slate-200 rounded-xl bg-slate-50/50">
                {VOCAB_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleVocabSelect(item)}
                    className={`p-2 rounded-lg text-center transition-all flex flex-col items-center ${
                      selectedVocab.id === item.id
                        ? 'bg-amber-200/90 text-amber-950 font-bold border-2 border-amber-500 shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-100 hover:bg-amber-50'
                    }`}
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-[11px] font-medium truncate w-full mt-0.5">{item.word}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grammar Rule Card Deep Dive */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-xs space-y-3">
            <h2 className="text-base font-display font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>语法剖析透镜 (Grammar Lens)</span>
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
                {currentKey.toUpperCase()}
              </span>
            </h2>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">
                    指示代词：<span className="font-mono text-emerald-700 font-bold text-sm">{currentKey}</span>
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    {currentRule.distanceLabel} 且 {currentRule.quantityLabel}
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">
                    提问句型：<span className="font-mono text-blue-700 font-bold">{currentRule.questionEn}</span>
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    be动词用 <span className="font-bold">{currentRule.beVerb}</span>（单数用 is，复数用 are）
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">
                    回答代词：
                    <span className="font-mono text-purple-700 font-bold">
                      {quantity === 'singular' ? "It's a/an..." : 'They are...'}
                    </span>
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    {quantity === 'singular'
                      ? `注意：${selectedVocab.word} 是以元音还是辅音开头？${selectedVocab.soundHint}`
                      : '注意：复数无需 a/an，名词结尾加上 -s 或 -es！'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
