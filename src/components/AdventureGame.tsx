import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Trophy, Star, RefreshCw, CheckCircle2, XCircle, Sparkles, HelpCircle, Users, Zap, Award } from 'lucide-react';
import { DistanceType, QuantityType, VocabItem, QuizQuestion } from '../types';
import { VOCAB_ITEMS, GRAMMAR_RULES } from '../data/curriculum';
import { sound } from '../utils/audio';

import bunnyImg from '../assets/images/mascot_bunny_teacher_1790779983567.jpg';

interface AdventureGameProps {
  onEarnStar: (amount?: number) => void;
}

type GameMode = 'quiz' | 'builder' | 'speed' | 'battle';

export const AdventureGame: React.FC<AdventureGameProps> = ({ onEarnStar }) => {
  const [mode, setMode] = useState<GameMode>('quiz');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // --- Quiz Mode States ---
  const [quizQuestion, setQuizQuestion] = useState<{
    distance: DistanceType;
    quantity: QuantityType;
    vocab: VocabItem;
    count: number;
    targetQuestion: string;
    targetAnswer: string;
    questionOptions: string[];
    answerOptions: string[];
    stage: 'choose_question' | 'choose_answer';
  } | null>(null);

  // --- Sentence Builder States ---
  const [builderSentence, setBuilderSentence] = useState<{
    fullText: string;
    chinese: string;
    tiles: { id: string; text: string }[];
    userTiles: { id: string; text: string }[];
  } | null>(null);

  // --- Speed Radar States ---
  const [speedTimeLeft, setSpeedTimeLeft] = useState(30);
  const [speedActive, setSpeedActive] = useState(false);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedItem, setSpeedItem] = useState<{
    distance: DistanceType;
    quantity: QuantityType;
    vocab: VocabItem;
    count: number;
    correctKeyword: 'this' | 'that' | 'these' | 'those';
  } | null>(null);

  // --- Two-Player Battle States ---
  const [teamScores, setTeamScores] = useState({ red: 0, blue: 0 });
  const [currentTurn, setCurrentTurn] = useState<'red' | 'blue'>('red');
  const [battleRound, setBattleRound] = useState(1);

  // Generate new Quiz question
  const generateQuiz = () => {
    setFeedback(null);
    const distances: DistanceType[] = ['near', 'far'];
    const quantities: QuantityType[] = ['singular', 'plural'];

    const distance = distances[Math.floor(Math.random() * distances.length)];
    const quantity = quantities[Math.floor(Math.random() * quantities.length)];
    const vocab = VOCAB_ITEMS[Math.floor(Math.random() * VOCAB_ITEMS.length)];
    const count = quantity === 'singular' ? 1 : Math.floor(Math.random() * 3) + 2;

    const ruleKey: 'this' | 'that' | 'these' | 'those' =
      distance === 'near'
        ? quantity === 'singular' ? 'this' : 'these'
        : quantity === 'singular' ? 'that' : 'those';

    const targetQuestion = GRAMMAR_RULES[ruleKey].questionEn;
    const targetAnswer =
      quantity === 'singular'
        ? `It's ${vocab.article} ${vocab.word}.`
        : `They are ${vocab.pluralWord}.`;

    // 4 Question options
    const questionOptions = [
      "What's this?",
      "What's that?",
      "What are these?",
      "What are those?"
    ];

    // 4 Answer options
    const otherVocab = VOCAB_ITEMS.filter(v => v.id !== vocab.id);
    const fakeVocab1 = otherVocab[0];
    const fakeVocab2 = otherVocab[1];

    let answerOptions = [targetAnswer];
    if (quantity === 'singular') {
      answerOptions.push(`They are ${vocab.pluralWord}.`); // plural trap
      answerOptions.push(`It's ${fakeVocab1.article} ${fakeVocab1.word}.`);
      answerOptions.push(`They are ${fakeVocab2.pluralWord}.`);
    } else {
      answerOptions.push(`It's ${vocab.article} ${vocab.word}.`); // singular trap
      answerOptions.push(`They are ${fakeVocab1.pluralWord}.`);
      answerOptions.push(`It's ${fakeVocab2.article} ${fakeVocab2.word}.`);
    }
    // Shuffle options
    answerOptions = answerOptions.sort(() => Math.random() - 0.5);

    setQuizQuestion({
      distance,
      quantity,
      vocab,
      count,
      targetQuestion,
      targetAnswer,
      questionOptions,
      answerOptions,
      stage: 'choose_question'
    });
  };

  // Generate Sentence Builder puzzle
  const generateBuilder = () => {
    setFeedback(null);
    const pool = [
      { text: "What's this?", cn: "这是什么？", tokens: ["What's", "this", "?"] },
      { text: "What's that?", cn: "那是什么？", tokens: ["What's", "that", "?"] },
      { text: "What are these?", cn: "这些是什么？", tokens: ["What", "are", "these", "?"] },
      { text: "What are those?", cn: "那些是什么？", tokens: ["What", "are", "those", "?"] },
      { text: "It's an apple.", cn: "它是一个苹果。", tokens: ["It's", "an", "apple", "."] },
      { text: "It's an orange.", cn: "它是一个橙子。", tokens: ["It's", "an", "orange", "."] },
      { text: "It's a cat.", cn: "它是一只小猫。", tokens: ["It's", "a", "cat", "."] },
      { text: "They are apples.", cn: "它们是苹果。", tokens: ["They", "are", "apples", "."] },
      { text: "They are dogs.", cn: "它们是小狗。", tokens: ["They", "are", "dogs", "."] },
      { text: "They are books.", cn: "它们是书本。", tokens: ["They", "are", "books", "."] }
    ];

    const chosen = pool[Math.floor(Math.random() * pool.length)];
    const scrambled = chosen.tokens
      .map((t, idx) => ({ id: `${t}-${idx}`, text: t }))
      .sort(() => Math.random() - 0.5);

    setBuilderSentence({
      fullText: chosen.text,
      chinese: chosen.cn,
      tiles: scrambled,
      userTiles: []
    });
  };

  // Generate Speed Radar item
  const generateSpeedItem = () => {
    const distances: DistanceType[] = ['near', 'far'];
    const quantities: QuantityType[] = ['singular', 'plural'];

    const distance = distances[Math.floor(Math.random() * distances.length)];
    const quantity = quantities[Math.floor(Math.random() * quantities.length)];
    const vocab = VOCAB_ITEMS[Math.floor(Math.random() * VOCAB_ITEMS.length)];
    const count = quantity === 'singular' ? 1 : Math.floor(Math.random() * 3) + 2;

    const correctKeyword: 'this' | 'that' | 'these' | 'those' =
      distance === 'near'
        ? quantity === 'singular' ? 'this' : 'these'
        : quantity === 'singular' ? 'that' : 'those';

    setSpeedItem({
      distance,
      quantity,
      vocab,
      count,
      correctKeyword
    });
  };

  useEffect(() => {
    generateQuiz();
    generateBuilder();
    generateSpeedItem();
  }, []);

  // Speed timer countdown
  useEffect(() => {
    if (!speedActive) return;
    if (speedTimeLeft <= 0) {
      setSpeedActive(false);
      sound.playCheer();
      confetti({ particleCount: 70, spread: 60 });
      return;
    }
    const timer = window.setTimeout(() => {
      setSpeedTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [speedActive, speedTimeLeft]);

  // Handle Question choice in Quiz
  const handleSelectQuestion = (option: string) => {
    if (!quizQuestion) return;
    if (option === quizQuestion.targetQuestion) {
      sound.playCorrect();
      setFeedback({ isCorrect: true, message: '太棒了！提问正确，接下来请选出正确的回答：' });
      sound.speakEnglish(option);
      setQuizQuestion({ ...quizQuestion, stage: 'choose_answer' });
    } else {
      sound.playWrong();
      setStreak(0);
      setFeedback({ isCorrect: false, message: `差一点哦！提示：当前物品在${quizQuestion.distance === 'near' ? '近处' : '远处'}，并且是${quizQuestion.quantity === 'singular' ? '单数(1个)' : '复数(多个)'}` });
    }
  };

  // Handle Answer choice in Quiz
  const handleSelectAnswer = (option: string) => {
    if (!quizQuestion) return;
    if (option === quizQuestion.targetAnswer) {
      sound.playCorrect();
      sound.playSparkle();
      const newScore = score + 10;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      onEarnStar(1);

      if (newStreak % 3 === 0) {
        confetti({ particleCount: 50, spread: 50 });
      }

      setFeedback({ isCorrect: true, message: `🎉 完全正确！${quizQuestion.targetQuestion} 👉 ${quizQuestion.targetAnswer}` });
      sound.speakEnglish(option);

      setTimeout(() => {
        generateQuiz();
      }, 1800);
    } else {
      sound.playWrong();
      setStreak(0);
      setFeedback({ isCorrect: false, message: `仔细想想哦！单数用 It's a/an...，复数用 They are... 名词加 -s` });
    }
  };

  // Sentence Builder tile click
  const handleBuilderTileClick = (tile: { id: string; text: string }) => {
    if (!builderSentence) return;
    sound.playPop();
    const remaining = builderSentence.tiles.filter(t => t.id !== tile.id);
    const updatedUser = [...builderSentence.userTiles, tile];

    setBuilderSentence({
      ...builderSentence,
      tiles: remaining,
      userTiles: updatedUser
    });

    // Check if finished
    if (remaining.length === 0) {
      const builtText = updatedUser.map(t => t.text).join(' ').replace(' ?', '?').replace(' .', '.');
      if (builtText === builderSentence.fullText) {
        sound.playCorrect();
        sound.playCheer();
        confetti({ particleCount: 60, spread: 60 });
        setScore(prev => prev + 15);
        onEarnStar(1);
        sound.speakEnglish(builtText);
        setFeedback({ isCorrect: true, message: `太棒了！拼装成功：${builtText}` });
        setTimeout(() => {
          generateBuilder();
        }, 2200);
      } else {
        sound.playWrong();
        setFeedback({ isCorrect: false, message: '语序不对哦，点击已放的单词可以重新拿回！' });
      }
    }
  };

  const handleReturnUserTile = (tile: { id: string; text: string }) => {
    if (!builderSentence) return;
    sound.playPop();
    setBuilderSentence({
      ...builderSentence,
      userTiles: builderSentence.userTiles.filter(t => t.id !== tile.id),
      tiles: [...builderSentence.tiles, tile]
    });
    setFeedback(null);
  };

  // Speed Radar answer click
  const handleSpeedAnswer = (choice: 'this' | 'that' | 'these' | 'those') => {
    if (!speedActive || !speedItem) return;
    if (choice === speedItem.correctKeyword) {
      sound.playCorrect();
      setSpeedScore(prev => prev + 1);
      onEarnStar(1);
      generateSpeedItem();
    } else {
      sound.playWrong();
      generateSpeedItem();
    }
  };

  // Team Battle handler
  const handleBattleAnswer = (isCorrect: boolean) => {
    sound.playPop();
    if (isCorrect) {
      sound.playCorrect();
      setTeamScores(prev => ({
        ...prev,
        [currentTurn]: prev[currentTurn] + 10
      }));
      onEarnStar(1);
    } else {
      sound.playWrong();
    }
    setCurrentTurn(prev => (prev === 'red' ? 'blue' : 'red'));
    setBattleRound(prev => prev + 1);
    generateQuiz();
  };

  return (
    <div className="space-y-6">
      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-amber-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <button
            onClick={() => { sound.playPop(); setMode('quiz'); }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
              mode === 'quiz'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>探险快问快答</span>
          </button>

          <button
            onClick={() => { sound.playPop(); setMode('builder'); }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
              mode === 'builder'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>句子搭积木</span>
          </button>

          <button
            onClick={() => { sound.playPop(); setMode('speed'); }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
              mode === 'speed'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-sky-50 text-sky-900 hover:bg-sky-100'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>空间雷达速辨赛</span>
          </button>

          <button
            onClick={() => { sound.playPop(); setMode('battle'); }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
              mode === 'battle'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-900 hover:bg-rose-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>双人小队PK赛</span>
          </button>
        </div>

        {/* Score & Streak display */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-1 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>得分:</span>
            <span className="font-mono text-base tabular-nums">{score}</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>连胜:</span>
            <span className="font-mono text-base tabular-nums">{streak}</span>
          </div>
        </div>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-between transition-all animate-fadeIn ${
            feedback.isCorrect
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-rose-50 text-rose-900 border-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        </div>
      )}

      {/* ================= MODE 1: QUIZ (Look & Choose) ================= */}
      {mode === 'quiz' && quizQuestion && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-md space-y-6">
          {/* Situation illustration card */}
          <div className="bg-gradient-to-b from-amber-100/60 to-amber-50/40 rounded-2xl p-6 border-2 border-dashed border-amber-300 flex flex-col sm:flex-row items-center justify-around gap-6">
            {/* Mascot */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white">
                <img
                  src={bunnyImg}
                  alt="Bunny Mascot"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold text-amber-900 mt-2">
                {quizQuestion.distance === 'near' ? '就在身边摸摸看 👇' : '伸出手指望远方 👉'}
              </span>
            </div>

            {/* Distance Cue Tag */}
            <div className="text-center">
              <div className="inline-block px-3 py-1 bg-white rounded-full text-xs font-bold text-amber-900 shadow-xs border border-amber-200 mb-2">
                {quizQuestion.distance === 'near' ? '近处 (Near 手边)' : '远处 (Far 远方)'} ·{' '}
                {quizQuestion.quantity === 'singular' ? '单数 (1个)' : `复数 (${quizQuestion.count}个)`}
              </div>
              <div className="text-slate-500 text-xs">
                {quizQuestion.distance === 'near' ? '距离短，触手可及' : '距离长，远远相望'}
              </div>
            </div>

            {/* Target Item Display */}
            <div className="flex flex-col items-center">
              <div
                className={`p-4 bg-white rounded-2xl shadow-md border-2 border-amber-200 flex flex-wrap items-center justify-center gap-2 max-w-[160px] min-h-[90px] transition-transform ${
                  quizQuestion.distance === 'near' ? 'scale-110' : 'scale-90 opacity-90'
                }`}
              >
                {Array.from({ length: quizQuestion.count }).map((_, i) => (
                  <span key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                    {quizQuestion.vocab.emoji}
                  </span>
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700 mt-2">
                {quizQuestion.vocab.chinese} ({quizQuestion.count}个)
              </span>
            </div>
          </div>

          {/* Step 1: Choose Question */}
          {quizQuestion.stage === 'choose_question' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>第一步：兔子老师应该用哪一句来提问？</span>
                </h3>
                <span className="text-xs text-slate-500">点击朗读并作答</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizQuestion.questionOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectQuestion(opt)}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-500 bg-slate-50 hover:bg-amber-50 text-left transition-all group flex items-center justify-between"
                  >
                    <div>
                      <div className="font-display font-bold text-base text-slate-900 group-hover:text-amber-900">
                        {opt}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {opt.includes('this') && '这是什么？(近指单数)'}
                        {opt.includes('that') && '那是什么？(远指单数)'}
                        {opt.includes('these') && '这些是什么？(近指复数)'}
                        {opt.includes('those') && '那些是什么？(远指复数)'}
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Answer */}
          {quizQuestion.stage === 'choose_answer' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>第二步：同学们应该怎样回答？</span>
                </h3>
                <span className="text-xs text-emerald-700 font-bold">已确认提问：{quizQuestion.targetQuestion}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizQuestion.answerOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectAnswer(opt)}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50 text-left transition-all group flex items-center justify-between"
                  >
                    <div>
                      <div className="font-display font-bold text-base text-slate-900 group-hover:text-emerald-900">
                        {opt}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {opt.startsWith("It's") ? '它是……(单数)' : '它们是……(复数)'}
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MODE 2: SENTENCE BUILDER ================= */}
      {mode === 'builder' && builderSentence && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200/90 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                🧩 魔法英语句子拼搭工坊
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                将下方的单词卡片按正确语序点击放入积木槽中！
              </p>
            </div>
            <button
              onClick={() => { sound.playPop(); generateBuilder(); }}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>换一句</span>
            </button>
          </div>

          {/* Target Chinese Hint */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800">目标句意：</span>
              <span className="text-sm font-bold text-emerald-950 ml-1.5">{builderSentence.chinese}</span>
            </div>
            <button
              onClick={() => sound.speakEnglish(builderSentence.fullText)}
              className="text-xs font-bold text-emerald-700 flex items-center gap-1 hover:underline"
            >
              <Volume2 className="w-4 h-4" />
              <span>听发音</span>
            </button>
          </div>

          {/* User Assembled Slots */}
          <div className="min-h-[70px] p-3 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex flex-wrap items-center gap-2">
            {builderSentence.userTiles.length === 0 ? (
              <span className="text-xs text-slate-400 italic px-2">
                点击下方候选词卡，词卡会飞到这里拼成完整句子……
              </span>
            ) : (
              builderSentence.userTiles.map(tile => (
                <button
                  key={tile.id}
                  onClick={() => handleReturnUserTile(tile)}
                  title="点击移回下方"
                  className="px-4 py-2 bg-emerald-600 text-white font-display font-bold text-base rounded-xl shadow-xs hover:bg-rose-500 hover:scale-95 transition-all flex items-center gap-1 group"
                >
                  <span>{tile.text}</span>
                  <span className="text-xs opacity-60 group-hover:opacity-100">✕</span>
                </button>
              ))
            )}
          </div>

          {/* Scrambled Available Tiles */}
          <div>
            <div className="text-xs font-bold text-slate-600 mb-2">候选用词：</div>
            <div className="flex flex-wrap gap-2.5">
              {builderSentence.tiles.map(tile => (
                <button
                  key={tile.id}
                  onClick={() => handleBuilderTileClick(tile)}
                  className="px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-display font-bold text-base rounded-xl border border-amber-300 shadow-xs hover:scale-105 active:scale-95 transition-all"
                >
                  {tile.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODE 3: SPEED RADAR ================= */}
      {mode === 'speed' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-200/90 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                ⚡ 30秒空间雷达速辨赛 (Speed Radar)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                考考你的反应力！快速判断该用 this, that, these 还是 those！
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-500 block">剩余时间</span>
                <span className="font-mono text-xl font-bold text-rose-600 tabular-nums">
                  {speedTimeLeft}s
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">得分</span>
                <span className="font-mono text-xl font-bold text-sky-600 tabular-nums">
                  {speedScore}
                </span>
              </div>
            </div>
          </div>

          {!speedActive && speedTimeLeft === 30 && (
            <div className="text-center py-10 space-y-4">
              <div className="text-5xl">⏱️</div>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                准备好了吗？屏幕上会出现近处或远处的单数/复数物品，你需要以最快速度点选正确的指示代词！
              </p>
              <button
                onClick={() => {
                  sound.playSparkle();
                  setSpeedActive(true);
                  setSpeedScore(0);
                  setSpeedTimeLeft(30);
                  generateSpeedItem();
                }}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl shadow-md text-base transition-all hover:scale-105"
              >
                开始 30 秒挑战！
              </button>
            </div>
          )}

          {!speedActive && speedTimeLeft <= 0 && (
            <div className="text-center py-10 space-y-4">
              <div className="text-5xl">🏆</div>
              <h4 className="font-display font-bold text-2xl text-slate-900">挑战结束！</h4>
              <p className="text-sm text-slate-600">
                你在 30 秒内一共答对了 <span className="font-bold text-sky-600 text-lg">{speedScore}</span> 题！
              </p>
              <button
                onClick={() => {
                  sound.playPop();
                  setSpeedTimeLeft(30);
                  setSpeedScore(0);
                }}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800"
              >
                再试一次
              </button>
            </div>
          )}

          {speedActive && speedItem && (
            <div className="space-y-6">
              {/* Radar Item Screen */}
              <div className="bg-sky-50/70 rounded-2xl p-6 border-2 border-sky-300 text-center flex flex-col items-center justify-center min-h-[180px]">
                <div className="text-xs font-bold text-sky-800 px-3 py-1 bg-white rounded-full shadow-xs mb-3">
                  {speedItem.distance === 'near' ? '👇 近在眼前 (Near)' : '👉 远在前方 (Far)'} ·{' '}
                  {speedItem.quantity === 'singular' ? '1个 (Singular)' : `多个 (${speedItem.count}个)`}
                </div>

                <div className="flex items-center gap-2 text-5xl">
                  {Array.from({ length: speedItem.count }).map((_, i) => (
                    <span key={i}>{speedItem.vocab.emoji}</span>
                  ))}
                </div>

                <div className="mt-3 text-xs text-slate-600 font-bold">
                  {speedItem.quantity === 'singular' ? speedItem.vocab.word : speedItem.vocab.pluralWord} ({speedItem.vocab.chinese})
                </div>
              </div>

              {/* 4 Speed Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => handleSpeedAnswer('this')}
                  className="p-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-display font-bold text-xl shadow-xs transition-all active:scale-95"
                >
                  This
                  <span className="block text-xs font-normal opacity-90">近处 · 单数</span>
                </button>
                <button
                  onClick={() => handleSpeedAnswer('that')}
                  className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xl shadow-xs transition-all active:scale-95"
                >
                  That
                  <span className="block text-xs font-normal opacity-90">远处 · 单数</span>
                </button>
                <button
                  onClick={() => handleSpeedAnswer('these')}
                  className="p-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-display font-bold text-xl shadow-xs transition-all active:scale-95"
                >
                  These
                  <span className="block text-xs font-normal opacity-90">近处 · 复数</span>
                </button>
                <button
                  onClick={() => handleSpeedAnswer('those')}
                  className="p-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-display font-bold text-xl shadow-xs transition-all active:scale-95"
                >
                  Those
                  <span className="block text-xs font-normal opacity-90">远处 · 复数</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MODE 4: TWO-PLAYER BATTLE ================= */}
      {mode === 'battle' && quizQuestion && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200/90 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                🏆 双人小队PK对战 (Red vs Blue)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                邀请两位同学上台或两人一组，轮流答题抢夺战队之星！
              </p>
            </div>
            <div className="text-xs font-bold text-slate-500">
              第 <span className="font-mono text-sm text-slate-800">{battleRound}</span> 轮
            </div>
          </div>

          {/* Team Scoreboard */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-2xl border-2 transition-all ${
                currentTurn === 'red'
                  ? 'bg-rose-50 border-rose-500 shadow-md scale-102 ring-2 ring-rose-200'
                  : 'bg-slate-50 border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-base text-rose-900">🔴 红队 (Team Apple)</span>
                {currentTurn === 'red' && <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">当前答题</span>}
              </div>
              <div className="font-mono font-bold text-3xl text-rose-700 mt-2 tabular-nums">
                {teamScores.red} <span className="text-xs text-rose-500">分</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border-2 transition-all ${
                currentTurn === 'blue'
                  ? 'bg-blue-50 border-blue-500 shadow-md scale-102 ring-2 ring-blue-200'
                  : 'bg-slate-50 border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-base text-blue-900">🔵 蓝队 (Team Star)</span>
                {currentTurn === 'blue' && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">当前答题</span>}
              </div>
              <div className="font-mono font-bold text-3xl text-blue-700 mt-2 tabular-nums">
                {teamScores.blue} <span className="text-xs text-blue-500">分</span>
              </div>
            </div>
          </div>

          {/* Question in battle */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="text-xs font-bold text-slate-500">
              请【{currentTurn === 'red' ? '红队' : '蓝队'}】回答下列问题：
            </div>
            <div className="text-4xl flex items-center justify-center gap-2">
              {Array.from({ length: quizQuestion.count }).map((_, i) => (
                <span key={i}>{quizQuestion.vocab.emoji}</span>
              ))}
            </div>
            <div className="font-display font-bold text-xl text-slate-900">
              {quizQuestion.targetQuestion}
            </div>
            <div className="text-xs text-slate-500">
              提示：{quizQuestion.distance === 'near' ? '近处' : '远处'} · {quizQuestion.quantity === 'singular' ? '单数' : '复数'}
            </div>
          </div>

          {/* Options for battle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quizQuestion.answerOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleBattleAnswer(opt === quizQuestion.targetAnswer)}
                className="p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-500 bg-white hover:bg-amber-50 font-display font-bold text-base text-slate-800 text-left transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
