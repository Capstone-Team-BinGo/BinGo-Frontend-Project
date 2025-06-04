<template>
  <div class="new-article-container">
    <h2 class="page-title">Buat Artikel Baru</h2>

    <div class="alert alert-success" v-if="successMessage">
      {{ successMessage }}
    </div>

    <div class="alert alert-error" v-if="errorMessage">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="createArticle" class="article-form">
      <div class="form-group">
        <label for="title">Judul Artikel</label>
        <input type="text" id="title" v-model="newArticle.title" required>
      </div>

      <div class="form-group">
        <label for="author">Penulis</label>
        <input type="text" id="author" v-model="newArticle.author" required>
      </div>

      <div class="form-group">
        <label for="category">Kategori</label>
        <select id="category" v-model="newArticle.category" required>
          <option value="organik">Organik</option>
          <option value="anorganik">Anorganik</option>
          <option value="b3">B3</option>
        </select>
      </div>

      <div class="form-group">
        <label for="image">Gambar Utama</label>
        <input type="file" id="image" @change="handleImageUpload" accept="image/*" required>
      </div>

      <div class="form-group">
        <label for="content">Isi Artikel</label>
        <textarea id="content" v-model="newArticle.content" required></textarea>
      </div>

      <button type="submit" class="submit-button">Simpan Artikel</button>
    </form>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)
import axios from 'axios';

export default {
  name: 'NewArticle',
  data() {
    return {
      newArticle: {
        title: '',
        author: '',
        category: 'organik',
        image: null,
        content: ''
      },
      successMessage: '',
      errorMessage: '',
      apiBaseUrl: 'https://test-api-wheat-eight.vercel.app/api/articles' // Update with your actual API base URL
    };
  },
  methods: {
    handleImageUpload(event) {
      this.newArticle.image = event.target.files[0];
    },
    async uploadImageToSupabase(file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error } = await supabase.storage
        .from('article-images')
        .upload(filePath, file);

      if (error) throw error;

      const { data } = supabase
        .storage
        .from('article-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    },

    async createArticle() {
      this.successMessage = '';
      this.errorMessage = '';

      try {
        let imageUrl = '';
        if (this.newArticle.image) {
          imageUrl = await this.uploadImageToSupabase(this.newArticle.image);
        }

        const payload = {
          title: this.newArticle.title,
          author: this.newArticle.author,
          category: this.newArticle.category,
          content: this.newArticle.content,
          image_url: imageUrl
        };

        await axios.post(
          this.apiBaseUrl,
          payload,
        );

        this.successMessage = 'Artikel berhasil dibuat!';
        this.resetForm();

        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      } catch (error) {
        this.errorMessage = 'Gagal membuat artikel: ' + (error.response?.data?.message || error.message);
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    },
    resetForm() {
      this.newArticle = {
        title: '',
        author: '',
        category: 'organik',
        image: null,
        content: ''
      };
      document.getElementById('image').value = '';
    }
  }
};
</script>

<style scoped>
.new-article-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.page-title {
  color: #2e7d32;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  position: relative;
}

.page-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #2e7d32, #4caf50);
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.article-form {
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2e7d32;
}

input[type="text"],
input[type="file"],
textarea,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
textarea:focus,
select:focus {
  border-color: #2e7d32;
  outline: none;
}

textarea {
  min-height: 200px;
  resize: vertical;
}

.submit-button {
  background-color: #2e7d32;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  width: 100%;
}

.submit-button:hover {
  background-color: #1b5e20;
}

.alert {
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
}

.alert-success {
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #d6e9c6;
}

.alert-error {
  background-color: #f2dede;
  color: #a94442;
  border: 1px solid #ebccd1;
}

@media (max-width: 768px) {
  .new-article-container {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 1.6rem;
  }
}
</style>