<template>
  <div class="manage-article-container">
    <h2 class="page-title">Kelola Artikel</h2>

    <div class="article-list">
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Memuat artikel...</p>
      </div>

      <div
        class="article-card"
        v-for="article in articles"
        :key="article.article_uid"
      >
        <div class="card-image">
          <img
            :src="article.image_thumb || 'https://via.placeholder.com/300x200?text=No+Image'"
            :alt="article.judul_article"
            class="article-image"
          />
        </div>
        <div class="card-content">
          <div class="card-meta">
            <span class="card-date">{{ formatDate(article.created_at) }}</span>
          </div>
          <h3 class="card-title">{{ article.judul_article }}</h3>
          <p class="card-excerpt">{{ getFirstSentence(article.description) }}...</p>
          <div class="card-actions">
            <button class="btn-edit" @click.stop="openEditModal(article)">Edit</button>
            <button class="btn-delete" @click.stop="confirmDelete(article.article_uid)">Hapus</button>
          </div>
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

        <form @submit.prevent="updateArticle" class="edit-form">
          <div class="form-group">
            <label for="edit-title">Judul Artikel</label>
            <input
              type="text"
              id="edit-title"
              v-model="editArticle.judul_article"
              required
              placeholder="Masukkan judul artikel"
            />
          </div>

          <div class="form-group">
            <label for="edit-description">Deskripsi</label>
            <textarea
              id="edit-description"
              v-model="editArticle.description"
              required
              placeholder="Masukkan deskripsi artikel"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="imageMethod">Metode Gambar</label>
            <select id="imageMethod" v-model="editArticle.imageMethod" required>
              <option value="link">URL Gambar</option>
              <option value="upload">Upload Gambar</option>
            </select>
          </div>

          <div class="form-group" v-if="editArticle.imageMethod === 'link'">
            <label for="edit-image-url">URL Thumbnail</label>
            <input
              type="url"
              id="edit-image-url"
              v-model="editArticle.image_thumb"
              placeholder="Masukkan URL gambar"
            />
          </div>

          <div class="form-group" v-else>
            <label for="edit-image-upload">Upload Gambar</label>
            <input
              type="file"
              id="edit-image-upload"
              @change="handleEditImageUpload"
              accept="image/*"
            />
            <small v-if="editArticle.currentImage" class="current-image">
              Gambar saat ini: {{ editArticle.currentImage }}
            </small>
          </div>

          <button type="submit" class="btn-submit" :disabled="isUpdating">
            <span v-if="isUpdating" class="button-loader"></span>
            <span v-else>Simpan Perubahan</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Modal Konfirmasi Hapus -->
    <div class="modal" :class="{ active: showDeleteModal }">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Konfirmasi Hapus Artikel</h3>
          <button class="close-btn" @click="showDeleteModal = false">&times;</button>
        </div>
        <p>Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.</p>
        <div class="modal-actions">
          <button @click="showDeleteModal = false" class="btn-cancel">Batal</button>
          <button class="btn-delete" @click="deleteArticle">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllArticles, getDetailArticles, updateArticle, deleteArticle } from '@/data/api';
import { getAccessToken } from '@/utils/auth';
import { useToast } from 'vue-toastification';

export default {
  name: 'ManageArticle',
  data() {
    return {
      articles: [],
      showEditModal: false,
      editArticle: {
        article_uid: null,
        judul_article: '',
        description: '',
        image_thumb: '',
        imageMethod: 'link',
        file: null,
        currentImage: '',
      },
      showDeleteModal: false,
      articleToDelete: null,
      isLoading: false,
      isUpdating: false,
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      this.isLoading = true;
      try {
        const response = await getAllArticles();
        if (response.ok) {
          this.articles = response.data;
        } else {
          this.toast.error(response.message || 'Gagal memuat artikel');
        }
      } catch (error) {
        this.toast.error('Terjadi kesalahan saat memuat artikel');
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async openEditModal(article) {
      try {
        const response = await getDetailArticles(article.article_uid);
        if (response.ok) {
          const { judul_article, description, image_thumb } = response.data;
          this.editArticle = {
            article_uid: article.article_uid,
            judul_article,
            description,
            image_thumb,
            imageMethod: 'link',
            file: null,
            currentImage: image_thumb,
          };
          this.showEditModal = true;
        } else {
          this.toast.error(response.message || 'Gagal memuat detail artikel');
        }
      } catch (error) {
        this.toast.error('Terjadi kesalahan saat memuat detail artikel');
        console.error(error);
      }
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editArticle = {
        article_uid: null,
        judul_article: '',
        description: '',
        image_thumb: '',
        imageMethod: 'link',
        file: null,
        currentImage: '',
      };
    },
    handleEditImageUpload(event) {
      this.editArticle.file = event.target.files[0];
    },
    async updateArticle() {
      this.isUpdating = true;
      try {
        const token = getAccessToken();
        if (!token) {
          this.toast.error('Anda belum login sebagai admin.');
          return;
        }

        const payload = {
          article_uid: this.editArticle.article_uid,
          judul_article: this.editArticle.judul_article,
          description: this.editArticle.description,
          image_thumb: this.editArticle.imageMethod === 'link' ? this.editArticle.image_thumb : '',
          file: this.editArticle.imageMethod === 'upload' ? this.editArticle.file : null,
        };

        const response = await updateArticle(payload);

        if (response.ok) {
          this.toast.success('Artikel berhasil diperbarui!');
          this.showEditModal = false;
          await this.fetchArticles();
        } else {
          this.toast.error(response.message || 'Gagal memperbarui artikel');
        }
      } catch (error) {
        this.toast.error('Terjadi kesalahan saat memperbarui artikel');
        console.error(error);
      } finally {
        this.isUpdating = false;
      }
    },
    confirmDelete(article_uid) {
      this.articleToDelete = article_uid;
      this.showDeleteModal = true;
    },
    async deleteArticle() {
      try {
        const response = await deleteArticle({ article_uid: this.articleToDelete });

        if (response.ok) {
          this.toast.success('Artikel berhasil dihapus!');
          this.showDeleteModal = false;
          await this.fetchArticles();
        } else {
          this.toast.error(response.message || 'Gagal menghapus artikel');
        }
      } catch (error) {
        this.toast.error('Terjadi kesalahan saat menghapus artikel');
        console.error(error);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    stripHtml(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    },
    getFirstSentence(description) {
      const cleanText = this.stripHtml(description);
      const firstSentence = cleanText.split('.')[0];
      return firstSentence.length > 100 ? `${firstSentence.substring(0, 100)}...` : firstSentence;
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
};
</script>

<style scoped>
.manage-article-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a3c34;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.page-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: #2ecc71;
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.article-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.article-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card-image {
  height: 180px;
  overflow: hidden;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .article-image {
  transform: scale(1.05);
}

.card-content {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-meta {
  margin-bottom: 0.5rem;
}

.card-date {
  font-size: 0.85rem;
  color: #6b7280;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a3c34;
  margin: 0 0 0.75rem;
}

.card-excerpt {
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-edit,
.btn-delete {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
}

.btn-edit {
  background-color: #3498db;
  color: #ffffff;
}

.btn-edit:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
}

.btn-delete {
  background-color: #e74c3c;
  color: #ffffff;
}

.btn-delete:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
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
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a3c34;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #1a3c34;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 1rem;
  font-weight: 600;
  color: #1a3c34;
  margin-bottom: 0.5rem;
}

.form-group input[type='text'],
.form-group input[type='url'],
.form-group textarea,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input[type='text']:focus,
.form-group input[type='url']:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: #2ecc71;
  box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.1);
  outline: none;
  background-color: #ffffff;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.form-group input[type='file'] {
  padding: 0.5rem;
}

.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

.form-group .current-image {
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

.btn-submit {
  background-color: #2ecc71;
  color: #ffffff;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
}

.btn-submit:hover {
  background-color: #27ae60;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.2);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.btn-cancel {
  background-color: #6b7280;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-cancel:hover {
  background-color: #4b5563;
  transform: translateY(-2px);
}

.btn-delete {
  background-color: #e74c3c;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-delete:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}

/* Loading Styles */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-column: 1 / -1;
  padding: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2ecc71;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.button-loader {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
  vertical-align: middle;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .manage-article-container {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .article-list {
    grid-template-columns: 1fr;
  }

  .modal-content {
    width: 95%;
    padding: 1rem;
    margin: 20px;
  }

  .card-image {
    height: 160px;
  }

  .card-title {
    font-size: 1.1rem;
  }


}
</style>
