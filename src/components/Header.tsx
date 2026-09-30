import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentTab: 'board' | 'game' | 'words' | 'teacher' | 'rewards';
  onSelectTab: (tab: 'board' | 'game' | 'words' | 'teacher' | 'rewards') => void;
  totalStars: number;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, totalStars }) => {
  const [isPlayingBgm, setIsPlayingBgm] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setIsPlayingBgm(sound.getIsBgmPlaying());
    setIsMuted(sound.getIsMuted());
  }, []);

  const handleToggleBgm = () => {
    sound.playPop();
    const playing = sound.toggleBGM();
    setIsPlayingBgm(playing);
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleFullscreen = () => {
    sound.playPop();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Zone */}
        <button
          onClick={() => { sound.playPop(); onSelectTab('board'); }}
          className="text-left font-display font-bold text-xl sm:text-2xl text-amber-900 tracking-tight flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl">🪄</span>
          <span>Magic English</span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-semibold text-slate-600">
          <button
            onClick={() => { sound.playPop(); onSelectTab('board'); }}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'board'
                ? 'text-amber-800 bg-amber-100 font-bold'
                : 'hover:text-amber-800 hover:bg-amber-50'
            }`}
          >
            🏫 课堂大黑板
          </button>

          <button
            onClick={() => { sound.playPop(); onSelectTab('game'); }}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'game'
                ? 'text-amber-800 bg-amber-100 font-bold'
                : 'hover:text-amber-800 hover:bg-amber-50'
            }`}
          >
            🎮 魔法大闯关
          </button>

          <button
            onClick={() => { sound.playPop(); onSelectTab('words'); }}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'words'
                ? 'text-amber-800 bg-amber-100 font-bold'
                : 'hover:text-amber-800 hover:bg-amber-50'
            }`}
          >
            🍎 单词与语法
          </button>

          <button
            onClick={() => { sound.playPop(); onSelectTab('teacher'); }}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'teacher'
                ? 'text-amber-800 bg-amber-100 font-bold'
                : 'hover:text-amber-800 hover:bg-amber-50'
            }`}
          >
            👩‍🏫 备课与打印
          </button>

          <button
            onClick={() => { sound.playPop(); onSelectTab('rewards'); }}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 ${
              currentTab === 'rewards'
                ? 'text-amber-800 bg-amber-100 font-bold'
                : 'hover:text-amber-800 hover:bg-amber-50'
            }`}
          >
            <span>⭐ 星星贴纸屋</span>
            <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded-full tabular-nums">
              {totalStars}
            </span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions (BGM Music Player & Whiteboard toggle) */}
        <div className="flex items-center gap-2">
          {/* BGM Toggle button */}
          <button
            onClick={handleToggleBgm}
            title={isPlayingBgm ? '暂停背景音乐' : '播放轻松欢快背景音乐'}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
              isPlayingBgm
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm animate-pulse'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isPlayingBgm ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline">{isPlayingBgm ? '音乐奏响中' : '欢快BGM'}</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? '取消静音' : '音效静音'}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-amber-100/60 rounded-lg transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Fullscreen / Presentation Mode for Classroom Board */}
          <button
            onClick={handleToggleFullscreen}
            title="全屏课堂演示"
            className="hidden sm:flex p-2 text-slate-600 hover:text-slate-900 hover:bg-amber-100/60 rounded-lg transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-amber-100 bg-amber-50/70 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => { sound.playPop(); onSelectTab('board'); }}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'board' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-slate-600'}`}
        >
          大黑板
        </button>
        <button
          onClick={() => { sound.playPop(); onSelectTab('game'); }}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'game' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-slate-600'}`}
        >
          闯关游戏
        </button>
        <button
          onClick={() => { sound.playPop(); onSelectTab('words'); }}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'words' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-slate-600'}`}
        >
          单词语法
        </button>
        <button
          onClick={() => { sound.playPop(); onSelectTab('teacher'); }}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'teacher' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-slate-600'}`}
        >
          备课教案
        </button>
        <button
          onClick={() => { sound.playPop(); onSelectTab('rewards'); }}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${currentTab === 'rewards' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-slate-600'}`}
        >
          ⭐ 奖励({totalStars})
        </button>
      </div>
    </header>
  );
};
