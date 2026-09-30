/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InteractiveBoard } from './components/InteractiveBoard';
import { AdventureGame } from './components/AdventureGame';
import { WordLibrary } from './components/WordLibrary';
import { TeacherPrep } from './components/TeacherPrep';
import { RewardsBook } from './components/RewardsBook';
import { sound } from './utils/audio';

import heroBanner from './assets/images/magic_classroom_hero_1790779969756.jpg';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'board' | 'game' | 'words' | 'teacher' | 'rewards'>('board');
  const [totalStars, setTotalStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('magic_english_stars');
      return saved ? parseInt(saved, 10) : 5; // starting with 5 welcome stars
    } catch {
      return 5;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('magic_english_stars', totalStars.toString());
    } catch {
      // ignore
    }
  }, [totalStars]);

  const handleEarnStars = (amount = 1) => {
    setTotalStars(prev => prev + amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800">
      {/* Top Navigation Bar following 3-Zone Contract */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        totalStars={totalStars}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Welcome Hero Spotlight (shown above main interactive view) */}
        <div className="relative rounded-3xl overflow-hidden border border-amber-200/90 shadow-sm bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-white p-6 sm:p-8 no-print">
          <img
            src={heroBanner}
            alt="Magic English Classroom"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
          />
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-50 text-xs font-bold">
              <span>🌟 小学英语魔法课堂</span>
              <span>·</span>
              <span>指示代词专项突破</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
              掌握 This, That, These &amp; Those 空间与数量奥秘
            </h1>

            <p className="text-amber-100 text-xs sm:text-sm leading-relaxed max-w-2xl">
              这是专为小学英语老师与孩子们打造的双用互动平台！既是老师课堂演示的<span className="font-bold underline decoration-amber-300">电子黑板与教案智囊</span>，也是孩子们快乐游戏的<span className="font-bold underline decoration-amber-300">魔法闯关乐园</span>。
            </p>

            {/* 4 Core Quick Formulas Pill Deck */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
              <div
                onClick={() => { sound.playPop(); setCurrentTab('board'); }}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-xs p-2.5 rounded-xl border border-white/20 cursor-pointer transition-all hover:scale-102"
              >
                <div className="font-bold text-amber-200">1. 近处单数 👇</div>
                <div className="font-mono font-bold mt-0.5">What's this?</div>
                <div className="text-[11px] text-amber-100/90">It's a/an...</div>
              </div>

              <div
                onClick={() => { sound.playPop(); setCurrentTab('board'); }}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-xs p-2.5 rounded-xl border border-white/20 cursor-pointer transition-all hover:scale-102"
              >
                <div className="font-bold text-emerald-200">2. 远处单数 👉</div>
                <div className="font-mono font-bold mt-0.5">What's that?</div>
                <div className="text-[11px] text-amber-100/90">It's a/an...</div>
              </div>

              <div
                onClick={() => { sound.playPop(); setCurrentTab('board'); }}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-xs p-2.5 rounded-xl border border-white/20 cursor-pointer transition-all hover:scale-102"
              >
                <div className="font-bold text-sky-200">3. 近处复数 👇🍎</div>
                <div className="font-mono font-bold mt-0.5">What are these?</div>
                <div className="text-[11px] text-amber-100/90">They are...</div>
              </div>

              <div
                onClick={() => { sound.playPop(); setCurrentTab('board'); }}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-xs p-2.5 rounded-xl border border-white/20 cursor-pointer transition-all hover:scale-102"
              >
                <div className="font-bold text-purple-200">4. 远处复数 👉🍎</div>
                <div className="font-mono font-bold mt-0.5">What are those?</div>
                <div className="text-[11px] text-amber-100/90">They are...</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 1: Interactive Classroom Board */}
        {currentTab === 'board' && (
          <InteractiveBoard onEarnStar={() => handleEarnStars(1)} />
        )}

        {/* Tab 2: Adventure Game Modes */}
        {currentTab === 'game' && (
          <AdventureGame onEarnStar={handleEarnStars} />
        )}

        {/* Tab 3: Word & Grammar Library */}
        {currentTab === 'words' && (
          <WordLibrary />
        )}

        {/* Tab 4: Teacher Prep & Lesson Plan & Printable Worksheets */}
        {currentTab === 'teacher' && (
          <TeacherPrep />
        )}

        {/* Tab 5: Rewards & Badges */}
        {currentTab === 'rewards' && (
          <RewardsBook totalStars={totalStars} />
        )}
      </main>

      {/* Quiet, Clean Footer */}
      <footer className="mt-auto border-t border-amber-200/80 bg-white/70 py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>小学英语教师高级备课助手 · 互动教学与游戏平台</span>
          <div className="flex items-center gap-3">
            <span>What's this? / That?</span>
            <span>·</span>
            <span>What are these? / Those?</span>
            <span>·</span>
            <span className="text-amber-700 font-semibold">Web Audio 轻松背景音乐</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
