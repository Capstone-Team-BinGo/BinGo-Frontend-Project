<template>
  <div class="manage-article-container">
    <h2 class="page-title">Daftar Artikel</h2>

    <div class="alert alert-success" v-if="successMessage">
      {{ successMessage }}
    </div>

    <div class="alert alert-error" v-if="errorMessage">
      {{ errorMessage }}
    </div>

    <div class="article-list">
      <div class="article-card" v-for="article in articles" :key="article.id">
        <div class="article-header">
          <h3 class="article-title">{{ article.title }}</h3>
          <span class="article-meta"
            >Dibuat: {{ formatDate(article.createdAt) }}</span
          >
        </div>
        <div class="article-meta">
          Penulis: {{ article.author }} | Kategori:
          {{ formatCategory(article.category) }}
        </div>
        <p class="article-excerpt">
          {{ article.content.substring(0, 150) }}...
        </p>
        <div class="article-actions">
          <button class="btn-edit" @click="openEditModal(article)">Edit</button>
          <button class="btn-delete" @click="confirmDelete(article.id)">
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Edit Artikel -->
    <div class="modal" :class="{ active: showEditModal }">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Edit Artikel</h3>
          <button class="close-btn" @click="closeEditModal">&times;</button>
        </div>

        <div class="alert alert-error" v-if="editErrorMessage">
          {{ editErrorMessage }}
        </div>

        <form @submit.prevent="updateArticle" class="edit-form">
          <div class="form-group">
            <label for="edit-title">Judul Artikel</label>
            <input
              type="text"
              id="edit-title"
              v-model="editArticle.title"
              required
            />
          </div>

          <div class="form-group">
            <label for="edit-author">Penulis</label>
            <input
              type="text"
              id="edit-author"
              v-model="editArticle.author"
              required
            />
          </div>

          <div class="form-group">
            <label for="edit-category">Kategori</label>
            <select id="edit-category" v-model="editArticle.category" required>
              <option value="organik">Organik</option>
              <option value="anorganik">Anorganik</option>
              <option value="b3">B3</option>
            </select>
          </div>

          <div class="form-group">
            <label for="edit-image">Gambar Utama</label>
            <input
              type="file"
              id="edit-image"
              @change="handleEditImageUpload"
              accept="image/*"
            />
            <small>Biarkan kosong jika tidak ingin mengubah gambar</small>
          </div>

          <div class="form-group">
            <label for="edit-content">Isi Artikel</label>
            <textarea
              id="edit-content"
              v-model="editArticle.content"
              required
            ></textarea>
          </div>

          <button type="submit" class="btn-edit">Simpan Perubahan</button>
        </form>
      </div>
    </div>

    <!-- Modal Konfirmasi Hapus -->
    <div class="modal" :class="{ active: showDeleteModal }">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Konfirmasi Hapus Artikel</h3>
          <button class="close-btn" @click="showDeleteModal = false">
            &times;
          </button>
        </div>

        <p>
          Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak
          dapat dibatalkan.
        </p>

        <div class="modal-actions">
          <button @click="showDeleteModal = false">Batal</button>
          <button class="btn-delete" @click="deleteArticle">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default {
  name: 'ManageArticle',
  data() {
    return {
      articles: [],
      successMessage: '',
      errorMessage: '',
      showEditModal: false,
      editArticle: {
        id: null,
        title: '',
        author: '',
        category: '',
        image: null,
        content: '',
      },
      editErrorMessage: '',
      showDeleteModal: false,
      articleToDelete: null,
      apiBaseUrl: 'https://test-api-wheat-eight.vercel.app/api/articles', // Update with your actual API base URL
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axios.get(this.apiBaseUrl);
        this.articles = response.data;
      } catch (error) {
        this.errorMessage =
          'Gagal memuat daftar artikel: ' +
          (error.response?.data?.message || error.message);
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    },
    openEditModal(article) {
      this.editArticle = {
        id: article.id,
        title: article.title,
        author: article.author,
        category: article.category,
        image: null,
        content: article.content,
      };
      this.editErrorMessage = '';
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editArticle = {
        id: null,
        title: '',
        author: '',
        category: '',
        image: null,
        content: '',
      };
    },
    async handleEditImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error } = await supabase.storage
        .from('article-images')
        .upload(filePath, file);

      if (error) {
        this.editErrorMessage = 'Gagal upload gambar: ' + error.message;
        return;
      }

      const { data } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      this.editArticle.image_url = data.publicUrl;
    },
    async updateArticle() {
      this.editErrorMessage = '';

      try {
        // Upload gambar ke Supabase jika ada gambar baru
        let imageUrl = this.editArticle.image_url; // default: pakai yang lama

        if (this.editArticle.image) {
          const file = this.editArticle.image;
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const filePath = `articles/${fileName}`;

          const { error } = await supabase.storage
            .from('article-images')
            .upload(filePath, file);

          if (error) {
            this.editErrorMessage = 'Gagal upload gambar: ' + error.message;
            return;
          }

          const { data } = supabase.storage
            .from('article-images')
            .getPublicUrl(filePath);

          imageUrl = data.publicUrl;
        }

        // Kirim payload ke backend
        const payload = {
          title: this.editArticle.title,
          author: this.editArticle.author,
          category: this.editArticle.category,
          content: this.editArticle.content,
          image_url: imageUrl,
        };

        await axios.put(`${this.apiBaseUrl}/${this.editArticle.id}`, payload);

        this.showEditModal = false;
        this.successMessage = 'Artikel berhasil diperbarui!';
        this.fetchArticles();
        setTimeout(() => (this.successMessage = ''), 5000);
      } catch (error) {
        this.editErrorMessage =
          'Gagal memperbarui artikel: ' +
          (error.response?.data?.message || error.message);
      }
    },
    confirmDelete(id) {
      this.articleToDelete = id;
      this.showDeleteModal = true;
    },
    async deleteArticle() {
      try {
        await axios.delete(`${this.apiBaseUrl}/${this.articleToDelete}`);
        this.showDeleteModal = false;
        this.successMessage = 'Artikel berhasil dihapus!';
        this.fetchArticles();

        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      } catch (error) {
        this.errorMessage =
          'Gagal menghapus artikel: ' +
          (error.response?.data?.message || error.message);
        this.showDeleteModal = false;

        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },
    formatCategory(category) {
      const categories = {
        organik: 'Organik',
        anorganik: 'Anorganik',
        b3: 'B3',
      };
      return categories[category] || category;
    },
  },
};
</script>

<style scoped>
/* Your existing styles remain unchanged */
.manage-article-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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

.article-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
}

.article-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.article-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.article-title {
  font-size: 1.3rem;
  color: #2e7d32;
  font-weight: 600;
}

.article-meta {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.article-excerpt {
  margin-bottom: 1.5rem;
  color: #555;
  line-height: 1.6;
}

.article-actions {
  display: flex;
  gap: 1rem;
}

.btn-edit {
  background-color: #337ab7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-edit:hover {
  background-color: #286090;
}

.btn-delete {
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-delete:hover {
  background-color: #c9302c;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.modal.active {
  display: flex;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.modal-title {
  font-size: 1.5rem;
  color: #2e7d32;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.edit-form {
  margin-top: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
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
  .manage-article-container {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 1.6rem;
  }

  .article-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-meta {
    margin-top: 0.5rem;
  }

  .modal-content {
    width: 95%;
    padding: 1.5rem;
  }
}
</style>
