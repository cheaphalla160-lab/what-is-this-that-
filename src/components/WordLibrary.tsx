import React, { useState } from 'react';
import { Volume2, Sparkles, Filter, Check, HelpCircle } from 'lucide-react';
import { VOCAB_ITEMS } from '../data/curriculum';
import { VocabItem } from '../types';
import { sound } from '../utils/audio';

export const WordLibrary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedWord, setSelectedWord] = useState<VocabItem | null>(null);

  const categories = [
    { id: 'all', label: '全部单词 (All)' },
    { id: 'fruit', label: '水果 (Fruit)' },
    { id: 'animal', label: '动物 (Animal)' },
    { id: 'stationery', label: '文具 (Stationery)' },
    { id: 'nature', label: '自然 (Nature)' },
    { id: 'object', label: '日用品 (Objects)' },
  ];

  const filteredItems = activeCategory === 'all'
    ? VOCAB_ITEMS
    : VOCAB_ITEMS.filter(item => item.category === activeCategory);

  const speakWord = (text: string) => {
    sound.playPop();
    sound.speakEnglish(text);
  };

  return (
    <div className="space-y-6">
      {/* Top Grammar summary alert */}
      <div className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
          🍎 常用基础词汇与冠词、复数规则宝库
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          在小学阶段，孩子们常常混淆 <span className="font-bold text-amber-700">a 与 an</span> 的搭配，以及单复数变换。点击每张闪卡听纯正发音，查看语法提示！
        </p>

        {/* 2 Core Rule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
              <span className="text-sm">💡</span>
              <span>冠词规则：何时用 a？何时用 an？</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              看单词开头的<span className="font-bold text-amber-800">发音（音素）</span>！以元音音素开头用 <span className="font-bold text-amber-700 font-mono">an</span>（如 an apple 🍎, an orange 🍊, an elephant 🐘）；以辅音音素开头用 <span className="font-bold text-amber-700 font-mono">a</span>（如 a book 📕, a cat 🐱）。
            </p>
          </div>

          <div className="p-3 bg-sky-50 rounded-xl border border-sky-200">
            <div className="font-bold text-sky-900 flex items-center gap-1.5 mb-1">
              <span className="text-sm">✨</span>
              <span>复数规则：复数绝不能加 a / an！</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              当物品变成多个（2个或以上）时，直接在名词末尾加 <span className="font-bold text-sky-700 font-mono">-s</span> 或 <span className="font-bold text-sky-700 font-mono">-es</span>，回答必须用 <span className="font-bold text-sky-700 font-mono">They are...</span>，千万不要说 “They are an apples” 哦！
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-2.5 rounded-xl border border-amber-200/80 shadow-xs">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => { sound.playPop(); setActiveCategory(cat.id); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-4 border border-amber-200/90 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Header with Emoji and Sound hint */}
              <div className="flex items-start justify-between">
                <div className="text-4xl p-2 bg-amber-50 rounded-xl group-hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    item.article === 'an'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  }`}
                >
                  {item.article.toUpperCase()} + 名词
                </span>
              </div>

              {/* Word & Chinese */}
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    {item.word}
                  </h3>
                  <span className="text-xs text-slate-500">{item.chinese}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {item.soundHint}
                </p>
              </div>

              {/* Comparison Box: Singular vs Plural */}
              <div className="mt-3 space-y-1.5 text-xs">
                <div
                  onClick={() => speakWord(`${item.article} ${item.word}`)}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-amber-50 cursor-pointer flex items-center justify-between transition-colors border border-slate-100"
                  title="点击听单数发音"
                >
                  <div>
                    <span className="text-slate-400 text-[10px] mr-1">单数:</span>
                    <span className="font-bold text-slate-800">{item.article} {item.word}</span>
                  </div>
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                </div>

                <div
                  onClick={() => speakWord(item.pluralWord)}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-sky-50 cursor-pointer flex items-center justify-between transition-colors border border-slate-100"
                  title="点击听复数发音"
                >
                  <div>
                    <span className="text-slate-400 text-[10px] mr-1">复数:</span>
                    <span className="font-bold text-sky-800">{item.pluralWord}</span>
                  </div>
                  <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                </div>
              </div>
            </div>

            {/* Quick Sentence Drill button */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  sound.playSparkle();
                  speakWord(`What's this? It's ${item.article} ${item.word}.`);
                }}
                className="w-full py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <span>连读练习：What's this?</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
