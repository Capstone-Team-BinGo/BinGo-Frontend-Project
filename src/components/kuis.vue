<template>
  <div class="quiz-container" v-if="!quizFinished">
    <img
      src="https://cdn-icons-png.flaticon.com/512/1864/1864593.png"
      class="character character-1"
      alt="Cartoon character"
    />
    <img
      src="https://cdn-icons-png.flaticon.com/512/1864/1864593.png"
      class="character character-2"
      alt="Cartoon character"
    />

    <div class="header">
      <h1>Ayo Tebak Jenis Sampah!</h1>
      <div class="progress-container">
        <div
          class="progress-bar"
          :style="{
            width: (currentQuestionIndex / questions.length) * 100 + '%',
          }"
        ></div>
      </div>
      <p>{{ currentQuestionIndex + 1 }} / {{ questions.length }}</p>
    </div>

    <div class="question-area">
      <img
        :src="currentQuestion.image"
        class="trash-image"
        alt="Gambar sampah"
      />
      <p class="question-text">"Ini termasuk sampah apa?"</p>
      <div class="options-container">
        <button
          class="option-btn"
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          @click="checkAnswer(option)"
          :style="{ backgroundColor: getOptionColor(option) }"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <div class="navigation-buttons">
      <button
        class="nav-btn"
        @click="skipQuestion"
        v-if="currentQuestionIndex < questions.length - 1"
      >
        Lewati
      </button>
      <button class="nav-btn" @click="finishQuiz">Selesai Kuis</button>
    </div>

    <div class="bingo-overlay" v-if="showBingo" @click="showBingo = false">
      <div class="bingo-content">
        <div class="bingo-text">BINGO!</div>
        <img
          src="@/assets/transisi.png"
          class="bingo-image"
          alt="Happy child"
        />
      </div>
    </div>
  </div>

  <div class="quiz-container" v-else>
    <div class="result-container">
      <h1>Hasil Kuis Kamu!</h1>
      <p class="result-score">
        Kamu benar {{ score }} dari {{ questions.length }} soal!
      </p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/1906/1906429.png"
        class="result-image"
        alt="Cartoon character"
      />

      <div class="result-buttons">
        <button class="result-btn" @click="restartQuiz">Coba Lagi</button>
        <button class="result-btn" @click="toggleExplanations">
          Lihat Pembahasan
        </button>
      </div>
    </div>

    <div class="explanations-section" :class="{ show: showExplanations }">
      <h2 style="text-align: center; margin: 20px 0; color: #1b5e20">
        Pembahasan Kuis
      </h2>
      <div
        class="explanation-item"
        v-for="(question, index) in questions"
        :key="index"
      >
        <img
          :src="question.image"
          class="explanation-image"
          alt="Gambar sampah"
        />
        <div class="explanation-text">
          <div class="explanation-title">"{{ question.question }}"</div>
          <div class="explanation-title">
            Jawaban benar: {{ question.correctAnswer }}
          </div>
          <div class="explanation-desc">{{ question.explanation }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KuisComponent',
  data() {
    return {
      questions: [
        {
          image: require('@/assets/organic/tulang.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Organik',
          explanation:
            'Tulang termasuk sampah organik karena bisa terurai secara alami.',
        },
        {
          image: require('@/assets/anorganic/kaca.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Anorganik',
          explanation:
            'Botol plastik termasuk sampah anorganik karena tidak bisa terurai secara alami dan bisa didaur ulang.',
        },
        {
          image: require('@/assets/b3/baterai.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'B3',
          explanation:
            'Baterai termasuk sampah B3 (Bahan Berbahaya dan Beracun) karena mengandung bahan kimia berbahaya.',
        },
        {
          image: require('@/assets/organic/daun.jpeg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Organik',
          explanation:
            'Daun kering termasuk sampah organik karena berasal dari tumbuhan dan bisa terurai.',
        },
        {
          image: require('@/assets/anorganic/karet.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Anorganik',
          explanation:
            'Kaleng minuman termasuk sampah anorganik karena terbuat dari logam dan bisa didaur ulang.',
        },
        {
          image: require('@/assets/b3/oli.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'B3',
          explanation:
            'Oli termasuk sampah B3 karena mengandung merkuri yang berbahaya.',
        },
        {
          image: require('@/assets/organic/sisamakanan.jpeg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Organik',
          explanation:
            'Sisa makanan termasuk sampah organik karena berasal dari bahan alami yang bisa terurai.',
        },
        {
          image: require('@/assets/anorganic/styrofoam.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Anorganik',
          explanation:
            'Styrofoam termasuk sampah anorganik karena meskipun berasal dari kayu, proses pembuatannya sudah mengubahnya menjadi bahan yang berbeda.',
        },
        {
          image: require('@/assets/b3/pembersih.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'B3',
          explanation:
            'Pembersih termasuk sampah B3 karena mengandung bahan kimia yang bisa berbahaya jika dibuang sembarangan.',
        },
        {
          image: require('@/assets/anorganic/kaca.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Anorganik',
          explanation:
            'Kaca termasuk sampah anorganik karena tidak bisa terurai secara alami dan bisa didaur ulang.',
        },
      ],
      currentQuestionIndex: 0,
      score: 0,
      quizFinished: false,
      showBingo: false,
      showExplanations: false,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  methods: {
    shuffleQuestions() {
      this.questions = this.questions.sort(() => Math.random() - 0.5);
    },
    checkAnswer(selectedOption) {
      if (selectedOption === this.currentQuestion.correctAnswer) {
        this.score++;
        this.showBingo = true;
        setTimeout(() => {
          this.showBingo = false;
          this.nextQuestion();
        }, 2000);
      } else {
        setTimeout(() => {
          this.nextQuestion();
        }, 1000);
      }
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.finishQuiz();
      }
    },
    skipQuestion() {
      this.nextQuestion();
    },
    finishQuiz() {
      this.quizFinished = true;
    },
    restartQuiz() {
      this.shuffleQuestions();
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.quizFinished = false;
      this.showExplanations = false;
    },
    toggleExplanations() {
      this.showExplanations = !this.showExplanations;
    },
    getOptionColor(option) {
      const colors = {
        Organik: '#81c784',
        Anorganik: '#64b5f6',
        B3: '#ff8a65',
      };
      return colors[option] || '#81c784';
    },
  },
  mounted() {
    this.shuffleQuestions();
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

body {
  background-color: #e8f5e9;
  color: #2e7d32;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.quiz-container {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  padding: 30px;
  position: relative;
  overflow: hidden;
  margin: 15px auto;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 28px;
  color: #43a047;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-container {
  width: 100%;
  height: 15px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #66bb6a;
  border-radius: 10px;
  transition: width 0.5s ease;
}

.question-area {
  text-align: center;
  margin-bottom: 30px;
}

.trash-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin: 0 auto 20px;
  display: block;
  animation: bounce 2s infinite;
}

.question-text {
  font-size: 24px;
  margin-bottom: 25px;
  color: #1b5e20;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.option-btn {
  background-color: #81c784;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 15px 20px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.option-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.option-btn:active {
  transform: translateY(0);
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
}

.nav-btn {
  background-color: #a5d6a7;
  color: #1b5e20;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background-color: #81c784;
}

.bingo-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: fadeIn 0.5s;
}

.bingo-content {
  text-align: center;
  animation: zoomIn 0.5s;
}

.bingo-text {
  font-size: 60px;
  color: #e53935;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 3px 3px 0 #ffeb3b;
}

.bingo-image {
  width: 300px;
  height: 300px;
  object-fit: contain;
}

.result-container {
  text-align: center;
  animation: fadeIn 0.5s;
}

.result-score {
  font-size: 28px;
  color: #1b5e20;
  margin-bottom: 20px;
}

.result-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin: 0 auto 20px;
}

.result-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.result-btn {
  background-color: #66bb6a;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 25px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.result-btn:hover {
  background-color: #43a047;
}

.explanations-section {
  margin-top: 30px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
}

.explanations-section.show {
  max-height: max-content;
}

.explanation-item {
  background-color: #f1f8e9;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.explanation-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  flex-shrink: 0;
}

.explanation-text {
  flex-grow: 1;
}

.explanation-title {
  font-weight: bold;
  color: #1b5e20;
  margin-bottom: 5px;
}

.explanation-desc {
  color: #2e7d32;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.character {
  position: absolute;
  width: 80px;
  height: 80px;
  z-index: -1;
}

.character-1 {
  top: 20px;
  left: 20px;
  animation: float 3s ease-in-out infinite;
}

.character-2 {
  bottom: 20px;
  right: 20px;
  animation: float 3s ease-in-out infinite reverse;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 500px) {
  .quiz-container {
    padding: 20px;
  }

  .header h1 {
    font-size: 24px;
  }

  .question-text {
    font-size: 20px;
  }

  .option-btn {
    font-size: 18px;
    padding: 12px 15px;
  }

  .bingo-text {
    font-size: 40px;
  }

  .bingo-image,
  .result-image {
    width: 150px;
    height: 150px;
  }

  .explanation-item {
    flex-direction: column;
    text-align: center;
  }

  .explanation-image {
    width: 60px;
    height: 60px;
  }
}
</style>
