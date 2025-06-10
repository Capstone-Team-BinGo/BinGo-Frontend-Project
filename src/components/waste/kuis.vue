<template>
  <div class="quiz-app" :class="{ 'quiz-finished': quizFinished }">
    <!-- Floating decorative elements -->
    <div class="floating-elements">
      <div v-for="i in 8" :key="i" class="floating-element" :style="getFloatingStyle(i)"></div>
    </div>

    <!-- Quiz Screen -->
    <transition name="quiz-slide" mode="out-in">
      <div class="quiz-screen" v-if="!quizFinished" key="quiz">
        <!-- Quiz Header -->
        <div class="quiz-header">
          <div class="progress-tracker">
            <span class="progress-text">{{ currentQuestionIndex + 1 }}/{{ questions.length }}</span>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressWidth }"></div>
            </div>
          </div>
          <h1 class="quiz-title">Klasifikasi Jenis Sampah</h1>
        </div>

        <!-- Question Area -->
        <div class="question-area">
          <transition name="image-fade" mode="out-in">
            <div class="image-container" key="currentQuestionImage">
              <img :src="currentQuestion.image" class="trash-image" alt="Gambar sampah" />
              <div class="image-frame"></div>
            </div>
          </transition>

          <div class="question-text">"{{ currentQuestion.question }}"</div>
        </div>

        <!-- Options -->
        <div class="options-grid">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="option-btn"
            :class="{
              'correct': selectedAnswer === option && option === currentQuestion.correctAnswer,
              'incorrect': selectedAnswer === option && option !== currentQuestion.correctAnswer
            }"
            @click="selectAnswer(option)"
            :style="{ '--option-color': getOptionColor(option) }"
            :disabled="isAnswerSelected"
          >
            <span class="option-text">{{ option }}</span>
            <transition name="icon-fade">
              <i
                v-if="isAnswerSelected && option === currentQuestion.correctAnswer"
                class="fas fa-check option-icon"
              ></i>
              <i
                v-else-if="selectedAnswer === option && option !== currentQuestion.correctAnswer"
                class="fas fa-times option-icon"
              ></i>
            </transition>
          </button>
        </div>

        <!-- Navigation -->
        <div class="quiz-navigation">
          <button  class="nav-btn skip-btn" @click="skipQuestion" :disabled="showExplanations || quizFinished">
  Lewati
</button>

          <button
            class="nav-btn next-btn"
            @click="nextQuestion"
            v-if="isAnswerSelected"
          >
            {{ currentQuestionIndex < questions.length - 1 ? 'Lanjut' : 'Selesai' }}
          </button>
        </div>

        <!-- Correct Answer Feedback -->
        <transition name="feedback-fade">
          <div
            v-if="showFeedback && selectedAnswer === currentQuestion.correctAnswer"
            class="feedback correct-feedback"
          >
            <div class="feedback-content">
              <i class="fas fa-check-circle feedback-icon"></i>
              <span class="feedback-text">Benar!</span>
            </div>
          </div>
        </transition>
      </div>

      <!-- Results Screen -->
      <transition name="result-fade" v-else>
        <div class="result-screen" key="result">
          <div class="result-card">
            <div class="result-header">
              <h2>Hasil Kuis Kamu</h2>
              <div class="score-display">
                <div class="score-circle">
                  <span class="score-value">{{ score }}</span>
                  <span class="score-total">/{{ questions.length }}</span>
                </div>
                <div class="score-message">
                  {{ getScoreMessage() }}
                </div>
              </div>
            </div>

            <div class="result-actions">
              <button class="action-btn restart-btn" @click="restartQuiz">
                <i class="fas fa-redo"></i> Coba Lagi
              </button>
              <button class="action-btn explanations-btn" @click="toggleExplanations">
                <i class="fas fa-book-open"></i> {{ showExplanations ? 'Sembunyikan' : 'Lihat' }} Pembahasan
              </button>
            </div>
          </div>

          <!-- Explanations Section -->
          <transition name="expand">
            <div class="explanations-section" v-if="showExplanations">
              <h3 class="explanations-title">Pembahasan Kuis</h3>
              <div class="explanations-list">
                <div
                  class="explanation-item"
                  v-for="(question, index) in questions"
                  :key="index"
                >
                  <div class="explanation-image-container">
                    <img :src="question.image" class="explanation-image" alt="Gambar sampah" />
                    <div class="explanation-correct" :style="{ backgroundColor: getOptionColor(question.correctAnswer) }">
                      {{ question.correctAnswer }}
                    </div>
                  </div>
                  <div class="explanation-content">
                    <p class="explanation-text">{{ question.explanation }}</p>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </transition>

    <!-- Celebration Effect -->
    <transition name="celebration-fade">
      <div v-if="showCelebration" class="celebration" @click="showCelebration = false">
        <div class="celebration-content">
          <div class="confetti" v-for="n in 50" :key="n" :style="getConfettiStyle(n)"></div>
          <div class="celebration-message">
            <h3>Luar Biasa!</h3>
            <p>Kamu benar menjawab dengan sempurna!</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TrashQuiz',
  data() {
    return {
      questions: [
        {
          image: require('@/assets/images/organic/tulang.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Organik',
          explanation: 'Tulang termasuk sampah organik karena berasal dari makhluk hidup dan bisa terurai secara alami oleh mikroorganisme.',
        },
        {
          image: require('@/assets/images/anorganic/kaca.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Anorganik',
          explanation: 'Botol kaca termasuk sampah anorganik karena terbuat dari material yang tidak bisa terurai secara alami namun dapat didaur ulang.',
        },
        {
          image: require('@/assets/images/b3/baterai.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'B3',
          explanation: 'Baterai mengandung bahan kimia berbahaya seperti merkuri dan timbal sehingga dikategorikan sebagai sampah B3 (Bahan Berbahaya dan Beracun).',
        },
        {
          image: require('@/assets/images/organic/daun.jpeg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Organik',
          explanation: 'Daun-daun kering termasuk sampah organik karena berasal dari tumbuhan dan dapat terurai menjadi kompos.',
        },
        {
          image: require('@/assets/images/anorganic/karet.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Anorganik',
          explanation: 'Ban karet termasuk sampah anorganik karena terbuat dari material sintetis yang sulit terurai namun dapat didaur ulang.',
        },
        {
          image: require('@/assets/images/b3/oli.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'B3',
          explanation: 'Oli bekas termasuk sampah B3 karena mengandung logam berat dan bahan kimia berbahaya yang dapat mencemari lingkungan.',
        },
        {
          image: require('@/assets/images/organic/sisamakanan.jpeg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Organik',
          explanation: 'Sisa makanan termasuk sampah organik karena berasal dari bahan-bahan alami yang dapat terurai dan diolah menjadi kompos.',
        },
        {
          image: require('@/assets/images/anorganic/styrofoam.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Anorganik',
          explanation: 'Styrofoam termasuk sampah anorganik karena terbuat dari polistirena yang sulit terurai dan membutuhkan waktu ratusan tahun untuk terdekomposisi.',
        },
        {
          image: require('@/assets/images/b3/pembersih.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'B3',
          explanation: 'Pembersih rumah tangga mengandung bahan kimia berbahaya seperti fosfat dan klorin sehingga termasuk dalam kategori sampah B3.',
        },
        {
          image: require('@/assets/images/anorganic/kaca.jpg'),
          question: 'Ini termasuk sampah apa?',
          options: ['Organik', 'Anorganik', 'B3'],
          correctAnswer: 'Anorganik',
          explanation: 'Kaca termasuk sampah anorganik yang dapat didaur ulang tanpa batas waktu karena tidak kehilangan kemurnian atau kualitasnya.',
        },
      ],
      currentQuestionIndex: 0,
      score: 0,
      quizFinished: false,
      selectedAnswer: null,
      isAnswerSelected: false,
      showFeedback: false,
      showExplanations: false,
      showCelebration: false,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    progressWidth() {
      return `${((this.currentQuestionIndex + 1) / this.questions.length) * 100}%`;
    },
  },
  methods: {
    getOptionColor(option) {
      const colors = {
        Organik: '#4CAF50',
        Anorganik: '#2196F3',
        B3: '#FF5722',
      };
      return colors[option] || '#4CAF50';
    },
    selectAnswer(option) {
      if (this.isAnswerSelected) return;

      this.selectedAnswer = option;
      this.isAnswerSelected = true;

      if (option === this.currentQuestion.correctAnswer) {
        this.score++;
        this.showFeedback = true;

        setTimeout(() => {
          this.showFeedback = false;
        }, 1500);
      }
    },
    nextQuestion() {
  if (this.currentQuestionIndex < this.questions.length - 1) {
    this.currentQuestionIndex++;
    this.resetQuestionState();
    this.saveProgress(); // simpan state setelah berpindah soal
  } else {
    this.finishQuiz();
  }
},
skipQuestion() {
  if (!this.selectedAnswer && !this.showExplanations && !this.quizFinished) {
    this.nextQuestion();
    this.saveProgress();
  }
},
    saveProgress() {
  const progress = {
    currentQuestionIndex: this.currentQuestionIndex,
    score: this.score,
    quizFinished: this.quizFinished,
  };
  localStorage.setItem('quizProgress', JSON.stringify(progress));
},

    resetQuestionState() {
      this.selectedAnswer = null;
      this.isAnswerSelected = false;
      this.showFeedback = false;
    },
    finishQuiz() {
      this.quizFinished = true;
      if (this.score === this.questions.length) {
        this.showCelebration = true;
        setTimeout(() => {
          this.showCelebration = false;
        }, 3000);
      }
    },
    restartQuiz() {
  localStorage.removeItem('quizProgress');
  this.currentQuestionIndex = 0;
  this.score = 0;
  this.quizFinished = false;
  this.showExplanations = false;
  this.resetQuestionState();
  this.shuffleQuestions();
},
    toggleExplanations() {
      this.showExplanations = !this.showExplanations;
    },
    shuffleQuestions() {
      this.questions = [...this.questions].sort(() => Math.random() - 0.5);
    },
    getScoreMessage() {
      const percentage = (this.score / this.questions.length) * 100;
      if (percentage >= 90) return 'Luar biasa! Kamu benar-benar paham tentang jenis sampah.';
      if (percentage >= 70) return 'Bagus! Pengetahuanmu tentang sampah cukup baik.';
      if (percentage >= 50) return 'Lumayan! Masih perlu belajar lagi ya.';
      return 'Jangan menyerah! Pelajari lagi tentang jenis-jenis sampah.';
    },
    getFloatingStyle(index) {
      const colors = ['#E3F2FD', '#E8F5E9', '#FFF8E1', '#FBE9E7'];
      const sizes = ['8px', '10px', '12px', '14px'];
      const shapes = ['50%', '30%', '20% 80% 20% 80%', '80% 20% 80% 20%'];

      return {
        backgroundColor: colors[index % colors.length],
        width: sizes[index % sizes.length],
        height: sizes[index % sizes.length],
        borderRadius: shapes[index % shapes.length],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${10 + Math.random() * 20}s`,
        animationDelay: `${Math.random() * 5}s`,
      };
    },
    getConfettiStyle(index) {
      const colors = ['#4CAF50', '#2196F3', '#FF5722', '#FFC107', '#9C27B0', '#00BCD4'];
      const shapes = ['square', 'rectangle', 'circle', 'triangle'];

      return {
        backgroundColor: colors[index % colors.length],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${6 + Math.random() * 10}px`,
        height: shapes[index % shapes.length] === 'rectangle' ? `${4 + Math.random() * 6}px` : `${6 + Math.random() * 10}px`,
        borderRadius: shapes[index % shapes.length] === 'circle' ? '50%' : '0',
        transform: `rotate(${Math.random() * 360}deg)`,
        animationDuration: `${3 + Math.random() * 4}s`,
        animationDelay: `${Math.random() * 0.5}s`,
      };
    },
  },
  mounted() {
  const saved = localStorage.getItem('quizProgress');
  if (saved) {
    const parsed = JSON.parse(saved);
    this.currentQuestionIndex = parsed.currentQuestionIndex;
    this.score = parsed.score;
    this.quizFinished = parsed.quizFinished;
  } else {
    this.shuffleQuestions();
  }
}

};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.quiz-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: -1;
}

.floating-element {
  position: absolute;
  opacity: 0.6;
  animation: floatAnimation linear infinite;
}

@keyframes floatAnimation {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(0) translateX(20px);
  }
  75% {
    transform: translateY(20px) translateX(10px);
  }
}

.quiz-screen {
  background-color: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.quiz-header {
  margin-bottom: 25px;
}

.progress-tracker {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.progress-text {
  font-size: 14px;
  color: #757575;
  margin-right: 10px;
  font-weight: 500;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background-color: #E0E0E0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.quiz-title {
  font-size: 22px;
  color: #2E7D32;
  font-weight: 600;
  text-align: center;
}

.question-area {
  margin: 20px 0;
  text-align: center;
}

.image-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
}

.trash-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  z-index: 1;
  position: relative;
}

.image-frame {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px dashed #4CAF50;
  border-radius: 18px;
  opacity: 0.6;
  animation: rotateFrame 20s linear infinite;
}

@keyframes rotateFrame {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.question-text {
  font-size: 18px;
  color: #424242;
  font-weight: 500;
  margin-bottom: 10px;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin: 20px 0;
}

.option-btn {
  position: relative;
  padding: 16px;
  border-radius: 12px;
  border: none;
  background-color: var(--option-color);
  color: white;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.option-btn:not(:disabled):hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.option-btn:disabled {
  cursor: not-allowed;
  opacity: 0.9;
}

.option-btn.correct {
  animation: pulseCorrect 0.5s ease;
}

.option-btn.incorrect {
  animation: shake 0.5s ease;
}

@keyframes pulseCorrect {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(76, 175, 80, 0.6);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  20%, 60% {
    transform: translateX(-5px);
  }
  40%, 80% {
    transform: translateX(5px);
  }
}

.option-icon {
  font-size: 18px;
  margin-left: 8px;
}

.quiz-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.nav-btn {
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.skip-btn {
  background-color: none;
  border: none;
  color: #616161;
}

.skip-btn:hover {
  background-color: #BDBDBD;
}

.next-btn {
  background-color: #2E7D32;
  color: white;
}

.next-btn:hover {
  background-color: #1B5E20;
}

.next-btn:disabled {
  background-color: #BDBDBD;
  cursor: not-allowed;
}

.feedback {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 500;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.correct-feedback {
  background-color: #4CAF50;
  color: white;
}

.feedback-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.feedback-icon {
  font-size: 20px;
}

/* Result Screen Styles */
.result-screen {
  background-color: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.result-card {
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 20px;
  text-align: center;
}

.result-header h2 {
  color: #2E7D32;
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600;
}

.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  margin-bottom: 15px;
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
}

.score-value {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
}

.score-total {
  font-size: 18px;
  opacity: 0.8;
}

.score-message {
  font-size: 16px;
  color: #424242;
  max-width: 300px;
  line-height: 1.4;
}

.result-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  padding: 14px;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.restart-btn {
  background-color: #2E7D32;
  color: white;
}

.restart-btn:hover {
  background-color: #1B5E20;
}

.explanations-btn {
  background-color: #E0E0E0;
  color: #424242;
}

.explanations-btn:hover {
  background-color: #BDBDBD;
}

/* Explanations Section */
.explanations-section {
  background-color: #f9f9f9;
  border-radius: 16px;
  padding: 20px;
  margin-top: 15px;
}

.explanations-title {
  color: #2E7D32;
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 600;
}

.explanations-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.explanation-item {
  background-color: white;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  gap: 15px;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.explanation-image-container {
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.explanation-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.explanation-correct {
  position: absolute;
  bottom: -8px;
  right: -8px;
  background-color: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.explanation-content {
  flex: 1;
}

.explanation-text {
  font-size: 14px;
  color: #424242;
  line-height: 1.5;
}

/* Celebration Effect */
.celebration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.celebration-content {
  position: relative;
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
}

.confetti {
  position: absolute;
  animation: confettiFall linear forwards;
}

@keyframes confettiFall {
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(400px) rotate(360deg);
    opacity: 0;
  }
}

.celebration-message h3 {
  color: #2E7D32;
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 600;
}

.celebration-message p {
  color: #616161;
  font-size: 16px;
}

/* Transition Animations */
.quiz-slide-enter-active,
.quiz-slide-leave-active {
  transition: all 0.5s ease;
}
.quiz-slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.quiz-slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.image-fade-enter-active,
.image-fade-leave-active {
  transition: all 0.5s ease;
}
.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.feedback-fade-enter-active,
.feedback-fade-leave-active {
  transition: all 0.3s ease;
}
.feedback-fade-enter-from,
.feedback-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) translateX(-50%);
}

.result-fade-enter-active,
.result-fade-leave-active {
  transition: all 0.5s ease;
}
.result-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.result-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.celebration-fade-enter-active,
.celebration-fade-leave-active {
  transition: all 0.5s ease;
}
.celebration-fade-enter-from,
.celebration-fade-leave-to {
  opacity: 0;
}

.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.3s ease;
}
.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

/* Responsive Styles */
@media (max-width: 480px) {
  .quiz-app {
    padding: 15px;
  }

  .quiz-screen, .result-card {
    padding: 20px;
  }

  .image-container {
    width: 160px;
    height: 160px;
  }

  .option-btn {
    padding: 14px;
    font-size: 15px;
  }

  .score-circle {
    width: 100px;
    height: 100px;
  }

  .score-value {
    font-size: 30px;
  }

  .explanation-item {
    flex-direction: column;
    text-align: center;
  }

  .explanation-image-container {
    margin-bottom: 10px;
  }
}
</style>