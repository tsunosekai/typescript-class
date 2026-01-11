# 第15回: 【作品③】クイズゲームを作ろう

<details>
<summary>💡 AIに質問するときはここをクリック</summary>

ChatGPTやClaudeなどのAIに質問するときは、以下をコピーして最初に貼り付けてね！

```
【TypeScript講座 学習状況】
現在地: 第15回「クイズゲームを作ろう」

■ 学習済みの内容:
- VSCode、ターミナル、Node.js/TypeScript環境
- HTML/CSSの基本、Flexbox
- TypeScriptの基礎（変数、型、if文、関数、配列、forループ）
- DOM操作（querySelector, textContent, innerHTML, style）
- イベント処理（addEventListener, click, input）
- オブジェクト:
  - オブジェクトの作り方（{ key: value }）
  - プロパティへのアクセス（obj.key）
  - type による型定義
  - オブジェクトの配列
  - オプショナルプロパティ（?）
- 【作品①】自己紹介ページ
- おみくじプログラム
- 【作品②】じゃんけんゲーム
- カウンターアプリ
- プロフィールカード

■ まだ習っていない内容:
React など

上記の学習状況を踏まえて、初心者にも分かるように答えてください。
まだ習っていない概念は使わないでください。

【質問】
ここに質問を書いてね
```

</details>

> **この回で学ぶこと**
> - オブジェクトの配列でクイズデータを管理
> - 問題を順番に表示する方法
> - 回答をチェックしてスコアを計算
> - 結果画面を表示する

---

## はじめに

ここまでに学んだこと：
- DOM操作（HTML要素の取得・変更）
- イベント処理（クリックに反応）
- オブジェクトの配列（データ管理）

今回は、これらを**全部組み合わせて**、クイズゲームを作ります！

---

## STEP 1: VSCodeでプロジェクトを開く

### 1-1. VSCodeを起動する

デスクトップのVSCodeアイコンをダブルクリックして、VSCodeを起動します。

### 1-2. プロジェクトフォルダを開く

**「ファイル」→「フォルダーを開く」** から、`typescript-lesson` フォルダを開きます。

### 1-3. ターミナルを開く

**「ターミナル」→「新しいターミナル」** をクリック

---

## STEP 2: 完成イメージを確認する

作るクイズゲームの動作：

1. 問題と選択肢が表示される
2. 選択肢をクリックすると正解/不正解が表示される
3. 次の問題に進む
4. 全問終わると結果が表示される

![screenshot: クイズゲームの完成イメージ](./images/quiz-complete.png)

---

## STEP 3: HTMLファイルを作成する

`quiz.html` を作成します。

> **CSSの新しい書き方について**
> このコードでは、まだ習っていないCSSが出てきます。今は「こう書くんだ」と思って写してください。
> - `*` → すべての要素に適用する（ユニバーサルセレクタ）
> - `box-sizing: border-box` → padding や border を幅に含める設定
> - `:hover` → マウスを乗せた時のスタイル
> - `transition` → 変化をなめらかにするアニメーション設定

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>クイズゲーム</title>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            font-family: sans-serif;
            background-color: #667eea;
            min-height: 100vh;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .quiz-container {
            background-color: white;
            border-radius: 16px;
            padding: 30px;
            width: 100%;
            max-width: 500px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .progress {
            text-align: center;
            color: #666;
            margin-bottom: 20px;
        }
        .question {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 25px;
            line-height: 1.5;
        }
        .choices {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .choice-btn {
            padding: 15px 20px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 8px;
            background-color: white;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
        }
        .choice-btn:hover {
            border-color: #667eea;
            background-color: #f8f9ff;
        }
        .choice-btn.correct {
            border-color: #4CAF50;
            background-color: #e8f5e9;
        }
        .choice-btn.wrong {
            border-color: #f44336;
            background-color: #ffebee;
        }
        .choice-btn:disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }
        .result {
            text-align: center;
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
        }
        .result.correct {
            color: #4CAF50;
        }
        .result.wrong {
            color: #f44336;
        }
        .next-btn {
            width: 100%;
            padding: 15px;
            font-size: 16px;
            background-color: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 20px;
            display: none;
        }
        .next-btn:hover {
            background-color: #5a6fd6;
        }
        /* 結果画面 */
        .final-result {
            text-align: center;
        }
        .final-result h2 {
            color: #333;
            margin-bottom: 10px;
        }
        .score {
            font-size: 48px;
            font-weight: bold;
            color: #667eea;
            margin: 20px 0;
        }
        .message {
            font-size: 18px;
            color: #666;
            margin-bottom: 20px;
        }
        .retry-btn {
            padding: 15px 40px;
            font-size: 16px;
            background-color: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }
        .retry-btn:hover {
            background-color: #5a6fd6;
        }
        .hidden {
            display: none !important;
        }
    </style>
</head>
<body>
    <div class="quiz-container">
        <!-- クイズ画面 -->
        <div id="quiz-screen">
            <div class="progress" id="progress">問題 1 / 5</div>
            <div class="question" id="question">ここに問題が表示されます</div>
            <div class="choices" id="choices">
                <!-- 選択肢がここに表示される -->
            </div>
            <div class="result hidden" id="result"></div>
            <button class="next-btn" id="next-btn">次の問題へ</button>
        </div>

        <!-- 結果画面 -->
        <div id="result-screen" class="final-result hidden">
            <h2>クイズ終了！</h2>
            <div class="score" id="final-score">0 / 5</div>
            <div class="message" id="final-message">お疲れ様でした！</div>
            <button class="retry-btn" id="retry-btn">もう一度挑戦</button>
        </div>
    </div>

    <script src="quiz.js"></script>
</body>
</html>
```

**`Ctrl + S`** で保存します。

---

## STEP 4: クイズデータを作成する

`quiz.ts` を作成し、クイズデータを定義します：

```typescript
// クイズの型を定義
type Quiz = {
    question: string;      // 問題文
    choices: string[];     // 選択肢の配列
    correctIndex: number;  // 正解のインデックス（0から始まる）
};

// クイズデータ
const quizData: Quiz[] = [
    {
        question: "日本の首都はどこ？",
        choices: ["大阪", "京都", "東京", "名古屋"],
        correctIndex: 2
    },
    {
        question: "1 + 1 = ?",
        choices: ["1", "2", "3", "11"],
        correctIndex: 1
    },
    {
        question: "TypeScriptを開発した会社は？",
        choices: ["Google", "Apple", "Microsoft", "Meta"],
        correctIndex: 2
    },
    {
        question: "HTMLの正式名称は？",
        choices: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlink Text Management Language"
        ],
        correctIndex: 0
    },
    {
        question: "CSSで文字の色を変えるプロパティは？",
        choices: ["font-color", "text-color", "color", "letter-color"],
        correctIndex: 2
    }
];
```

**`Ctrl + S`** で保存します。

---

## STEP 5: ゲームの状態を管理する変数

```typescript
// ゲームの状態
let currentQuizIndex: number = 0;  // 現在の問題番号
let score: number = 0;             // スコア
let isAnswered: boolean = false;   // 回答済みかどうか
```

---

## STEP 6: 問題を表示する関数

```typescript
// 要素を取得
const progressElement = document.querySelector("#progress");
const questionElement = document.querySelector("#question");
const choicesElement = document.querySelector("#choices");
const resultElement = document.querySelector("#result");
const nextButton = document.querySelector("#next-btn");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");

// 問題を表示する関数
function showQuestion(): void {
    const quiz = quizData[currentQuizIndex];

    // 進捗を表示
    if (progressElement) {
        progressElement.textContent = `問題 ${currentQuizIndex + 1} / ${quizData.length}`;
    }

    // 問題文を表示
    if (questionElement) {
        questionElement.textContent = quiz.question;
    }

    // 選択肢を表示
    if (choicesElement) {
        choicesElement.innerHTML = "";

        quiz.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            button.className = "choice-btn";
            button.textContent = choice;
            button.addEventListener("click", () => selectAnswer(index));
            choicesElement.appendChild(button);
        });
    }

    // 結果とボタンを非表示
    resultElement?.classList.add("hidden");
    if (nextButton) {
        (nextButton as HTMLElement).style.display = "none";
    }

    isAnswered = false;
}
```

---

## STEP 7: 回答を処理する関数

```typescript
// 回答を選択した時の処理
function selectAnswer(selectedIndex: number): void {
    if (isAnswered) return;  // 既に回答済みなら何もしない

    isAnswered = true;
    const quiz = quizData[currentQuizIndex];
    const isCorrect = selectedIndex === quiz.correctIndex;

    // スコアを更新
    if (isCorrect) {
        score++;
    }

    // 選択肢のスタイルを更新
    const buttons = choicesElement?.querySelectorAll(".choice-btn");
    buttons?.forEach((button, index) => {
        const btn = button as HTMLButtonElement;
        btn.disabled = true;

        if (index === quiz.correctIndex) {
            btn.classList.add("correct");
        } else if (index === selectedIndex) {
            btn.classList.add("wrong");
        }
    });

    // 結果を表示
    if (resultElement) {
        resultElement.textContent = isCorrect ? "正解！ 🎉" : "不正解... 😢";
        resultElement.className = `result ${isCorrect ? "correct" : "wrong"}`;
        resultElement.classList.remove("hidden");
    }

    // 次へボタンを表示
    if (nextButton) {
        const btn = nextButton as HTMLElement;
        btn.style.display = "block";

        // 最後の問題なら「結果を見る」に変更
        if (currentQuizIndex === quizData.length - 1) {
            btn.textContent = "結果を見る";
        } else {
            btn.textContent = "次の問題へ";
        }
    }
}
```

---

## STEP 8: 次の問題へ進む関数

```typescript
// 次の問題へ進む
function nextQuestion(): void {
    currentQuizIndex++;

    if (currentQuizIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// 次へボタンのイベント
nextButton?.addEventListener("click", nextQuestion);
```

---

## STEP 9: 結果を表示する関数

```typescript
// 最終結果を表示
function showResult(): void {
    // クイズ画面を非表示
    quizScreen?.classList.add("hidden");

    // 結果画面を表示
    resultScreen?.classList.remove("hidden");

    // スコアを表示
    const finalScore = document.querySelector("#final-score");
    if (finalScore) {
        finalScore.textContent = `${score} / ${quizData.length}`;
    }

    // メッセージを表示
    const finalMessage = document.querySelector("#final-message");
    if (finalMessage) {
        if (score === quizData.length) {
            finalMessage.textContent = "パーフェクト！素晴らしい！🎉";
        } else if (score >= quizData.length * 0.8) {
            finalMessage.textContent = "すごい！よくできました！😊";
        } else if (score >= quizData.length * 0.6) {
            finalMessage.textContent = "なかなかいい感じ！👍";
        } else {
            finalMessage.textContent = "もう少し頑張ろう！💪";
        }
    }
}
```

---

## STEP 10: リトライ機能

```typescript
// リトライボタン
const retryButton = document.querySelector("#retry-btn");

retryButton?.addEventListener("click", () => {
    // 状態をリセット
    currentQuizIndex = 0;
    score = 0;
    isAnswered = false;

    // 画面を切り替え
    resultScreen?.classList.add("hidden");
    quizScreen?.classList.remove("hidden");

    // 最初の問題を表示
    showQuestion();
});

// ゲーム開始
showQuestion();
```

---

## 完成版コード

すべてをまとめた `quiz.ts` の完成版：

```typescript
// ==================
// クイズゲーム
// ==================

// クイズの型を定義
type Quiz = {
    question: string;
    choices: string[];
    correctIndex: number;
};

// クイズデータ
const quizData: Quiz[] = [
    {
        question: "日本の首都はどこ？",
        choices: ["大阪", "京都", "東京", "名古屋"],
        correctIndex: 2
    },
    {
        question: "1 + 1 = ?",
        choices: ["1", "2", "3", "11"],
        correctIndex: 1
    },
    {
        question: "TypeScriptを開発した会社は？",
        choices: ["Google", "Apple", "Microsoft", "Meta"],
        correctIndex: 2
    },
    {
        question: "HTMLの正式名称は？",
        choices: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlink Text Management Language"
        ],
        correctIndex: 0
    },
    {
        question: "CSSで文字の色を変えるプロパティは？",
        choices: ["font-color", "text-color", "color", "letter-color"],
        correctIndex: 2
    }
];

// ゲームの状態
let currentQuizIndex: number = 0;
let score: number = 0;
let isAnswered: boolean = false;

// 要素を取得
const progressElement = document.querySelector("#progress");
const questionElement = document.querySelector("#question");
const choicesElement = document.querySelector("#choices");
const resultElement = document.querySelector("#result");
const nextButton = document.querySelector("#next-btn");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const retryButton = document.querySelector("#retry-btn");

// 問題を表示する関数
function showQuestion(): void {
    const quiz = quizData[currentQuizIndex];

    if (progressElement) {
        progressElement.textContent = `問題 ${currentQuizIndex + 1} / ${quizData.length}`;
    }

    if (questionElement) {
        questionElement.textContent = quiz.question;
    }

    if (choicesElement) {
        choicesElement.innerHTML = "";
        quiz.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            button.className = "choice-btn";
            button.textContent = choice;
            button.addEventListener("click", () => selectAnswer(index));
            choicesElement.appendChild(button);
        });
    }

    resultElement?.classList.add("hidden");
    if (nextButton) {
        (nextButton as HTMLElement).style.display = "none";
    }
    isAnswered = false;
}

// 回答を選択した時の処理
function selectAnswer(selectedIndex: number): void {
    if (isAnswered) return;
    isAnswered = true;

    const quiz = quizData[currentQuizIndex];
    const isCorrect = selectedIndex === quiz.correctIndex;

    if (isCorrect) score++;

    const buttons = choicesElement?.querySelectorAll(".choice-btn");
    buttons?.forEach((button, index) => {
        const btn = button as HTMLButtonElement;
        btn.disabled = true;
        if (index === quiz.correctIndex) {
            btn.classList.add("correct");
        } else if (index === selectedIndex) {
            btn.classList.add("wrong");
        }
    });

    if (resultElement) {
        resultElement.textContent = isCorrect ? "正解！ 🎉" : "不正解... 😢";
        resultElement.className = `result ${isCorrect ? "correct" : "wrong"}`;
        resultElement.classList.remove("hidden");
    }

    if (nextButton) {
        const btn = nextButton as HTMLElement;
        btn.style.display = "block";
        btn.textContent = currentQuizIndex === quizData.length - 1 ? "結果を見る" : "次の問題へ";
    }
}

// 次の問題へ
function nextQuestion(): void {
    currentQuizIndex++;
    if (currentQuizIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// 最終結果を表示
function showResult(): void {
    quizScreen?.classList.add("hidden");
    resultScreen?.classList.remove("hidden");

    const finalScore = document.querySelector("#final-score");
    if (finalScore) {
        finalScore.textContent = `${score} / ${quizData.length}`;
    }

    const finalMessage = document.querySelector("#final-message");
    if (finalMessage) {
        if (score === quizData.length) {
            finalMessage.textContent = "パーフェクト！素晴らしい！🎉";
        } else if (score >= quizData.length * 0.8) {
            finalMessage.textContent = "すごい！よくできました！😊";
        } else if (score >= quizData.length * 0.6) {
            finalMessage.textContent = "なかなかいい感じ！👍";
        } else {
            finalMessage.textContent = "もう少し頑張ろう！💪";
        }
    }
}

// イベントリスナー
nextButton?.addEventListener("click", nextQuestion);

retryButton?.addEventListener("click", () => {
    currentQuizIndex = 0;
    score = 0;
    isAnswered = false;
    resultScreen?.classList.add("hidden");
    quizScreen?.classList.remove("hidden");
    showQuestion();
});

// ゲーム開始
showQuestion();
```

**`Ctrl + S`** で保存 → コンパイル：

```
npx tsc quiz.ts
```

---

## 【作品③完成！】

おめでとうございます！クイズゲームが完成しました！

使った技術：
- **type** でクイズデータの型を定義
- **オブジェクトの配列** でクイズを管理
- **DOM操作** で画面を更新
- **イベント処理** でクリックに反応
- **状態管理** でスコアと進捗を追跡

---

## まとめ

この回でやったこと：

- ✅ クイズデータをオブジェクトの配列で管理
- ✅ 問題を順番に表示
- ✅ 回答をチェックしてスコア計算
- ✅ 結果画面を表示
- ✅ リトライ機能を実装

---

## 次回予告

次回からは「**第5部：Reactで診断ゲーム**」に入ります！

「**Reactを始めよう**」で、今までの書き方とは違う、Reactというライブラリを使った開発方法を学びます。最終作品の「診断ゲーム」に向けて頑張りましょう！

---

## 練習問題（やってみよう）

1. クイズの問題を増やしてみよう
2. 難易度によって色を変えてみよう
3. 制限時間をつけてみよう（難しめ）

コンパイル（`npx tsc ファイル名`）と保存（`Ctrl + S`）を忘れずに！
