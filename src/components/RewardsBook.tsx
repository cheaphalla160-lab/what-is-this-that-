import React from 'react';
import { Star, Award, Sparkles, Trophy, Heart } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface RewardsBookProps {
  totalStars: number;
}

export const RewardsBook: React.FC<RewardsBookProps> = ({ totalStars }) => {
  const badges = [
    {
      id: 'b1',
      title: '🌟 语法启蒙之星',
      description: '迈出第一步！首次完整跟读或参与答题',
      icon: '🌱',
      requiredStars: 1,
    },
    {
      id: 'b2',
      title: '🔍 近处小侦探',
      description: '熟练掌握 What\'s this? 与 What are these?',
      icon: '🔎',
      requiredStars: 5,
    },
    {
      id: 'b3',
      title: '🔭 远望小射手',
      description: '熟练掌握 What\'s that? 与 What are those?',
      icon: '🏹',
      requiredStars: 10,
    },
    {
      id: 'b4',
      title: '🍎 冠词魔法师',
      description: '牢记 an apple, an orange 与 a cat 的发音区分',
      icon: '🪄',
      requiredStars: 15,
    },
    {
      id: 'b5',
      title: '✨ 复数达人奖',
      description: '单复数问答不混淆，They are 运用自如',
      icon: '👑',
      requiredStars: 20,
    },
    {
      id: 'b6',
      title: '🏆 魔法英语大学者',
      description: '累计获得 30 颗金色五角星！',
      icon: '🎓',
      requiredStars: 30,
    },
  ];

  const handleCelebrate = () => {
    sound.playCheer();
    sound.playSparkle();
    confetti({ particleCount: 80, spread: 70 });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-amber-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-semibold text-amber-800 mb-1 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>小学生的荣誉激励勋章墙</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
            ⭐ 星星贴纸屋与成就勋章
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            在课堂展板跟读、参加闯关游戏、答对题目都可以积攒金色五角星，快来收集全部勋章吧！
          </p>
        </div>

        {/* Big Star Badge */}
        <div
          onClick={handleCelebrate}
          className="cursor-pointer bg-gradient-to-br from-amber-400 to-amber-500 text-amber-950 p-4 rounded-3xl shadow-lg border-2 border-amber-300 text-center flex flex-col items-center justify-center min-w-[150px] transition-transform hover:scale-105 active:scale-95 group"
          title="点击庆祝撒花！"
        >
          <div className="flex items-center gap-1 text-4xl group-hover:animate-spin">
            ⭐
          </div>
          <div className="text-xs font-bold uppercase tracking-wider mt-1 text-amber-900">
            已收获星星
          </div>
          <div className="font-mono font-bold text-3xl tabular-nums">
            {totalStars}
          </div>
          <div className="text-[10px] text-amber-900/80 font-semibold mt-0.5">
            点击放彩花 🎊
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map(b => {
          const isUnlocked = totalStars >= b.requiredStars;
          return (
            <div
              key={b.id}
              className={`p-5 rounded-3xl border transition-all ${
                isUnlocked
                  ? 'bg-white border-amber-300 shadow-md hover:border-amber-400'
                  : 'bg-slate-50/80 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs ${
                    isUnlocked ? 'bg-amber-100' : 'bg-slate-200 grayscale'
                  }`}
                >
                  {b.icon}
                </div>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    isUnlocked
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isUnlocked ? '已解锁 ✓' : `需 ${b.requiredStars} 颗星`}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-display font-bold text-base text-slate-900">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {b.description}
                </p>
              </div>

              {/* Progress Bar inside badge */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">进度:</span>
                <span className="font-mono font-bold text-slate-700 tabular-nums">
                  {Math.min(totalStars, b.requiredStars)} / {b.requiredStars}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
