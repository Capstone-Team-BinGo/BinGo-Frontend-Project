<template>
  <div class="new-article-container">
    <h2 class="page-title">Tambah Artikel Baru</h2>

    <form @submit.prevent="submitArticle" class="article-form">
      <div class="form-group">
        <label for="judul_article">Judul Artikel</label>
        <input
          type="text"
          id="judul_article"
          v-model="judul_article"
          required
          placeholder="Masukkan judul artikel"
        >
      </div>

      <div class="form-group">
        <label for="description">Deskripsi</label>
        <textarea
          id="description"
          v-model="description"
          required
          placeholder="Masukkan deskripsi artikel"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="imageMethod">Metode Gambar</label>
        <select id="imageMethod" v-model="imageMethod" required>
          <option value="link">URL Gambar</option>
          <option value="upload">Upload Gambar</option>
        </select>
      </div>

      <div class="form-group" v-if="imageMethod === 'link'">
        <label for="image_thumb">URL Thumbnail</label>
        <input
          type="url"
          id="image_thumb"
          v-model="image_thumb"
          placeholder="Masukkan URL gambar"
        >
      </div>

      <div class="form-group" v-else>
        <label for="file">Upload Gambar</label>
        <input
          type="file"
          id="file"
          ref="fileInput"
          @change="handleFileUpload"
          accept="image/*"
        >
      </div>

      <button type="submit" class="submit-button">Kirim Artikel</button>
    </form>
  </div>
</template>

<script>
import { addNewArticle } from '@/data/api';
import { getAccessToken } from '@/utils/auth';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export default {
  name: 'NewArticle',
  setup() {
    const judul_article = ref('');
    const description = ref('');
    const image_thumb = ref('');
    const imageMethod = ref('link');
    const file = ref(null);
    const fileInput = ref(null);
    const toast = useToast();

    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };

    const submitArticle = async () => {
      const token = getAccessToken();

      if (!token) {
        toast.error('Anda belum login sebagai admin.');
        return;
      }

      const payload = {
        judul_article: judul_article.value,
        description: description.value,
        image_thumb: imageMethod.value === 'link' ? image_thumb.value : '',
        file: imageMethod.value === 'upload' ? file.value : null,
      };

      try {
        const response = await addNewArticle(payload);

        if (response.ok) {
          toast.success('Artikel berhasil ditambahkan.');
          judul_article.value = '';
          description.value = '';
          image_thumb.value = '';
          file.value = null;

          if (fileInput.value) {
            fileInput.value.value = '';
          }
        } else {
          toast.error(response.message || 'Gagal menambahkan artikel.');
        }
      } catch (err) {
        console.error('Error saat mengirim artikel:', err);
        toast.error('Terjadi kesalahan saat mengirim artikel.');
      }
    };

    return {
      judul_article,
      description,
      image_thumb,
      imageMethod,
      file,
      fileInput,
      handleFileUpload,
      submitArticle
    };
  }
};
</script>


<style scoped>
.new-article-container {
  max-width: 600px;
  margin: 30px auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.05);
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

.article-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  font-weight: 600;
  color: #1a3c34;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="url"],
input[type="file"],
textarea,
select {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus,
input[type="url"]:focus,
textarea:focus,
select:focus {
  border-color: #2ecc71;
  box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.1);
  outline: none;
  background-color: #ffffff;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

input[type="file"] {
  padding: 0.5rem;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

.submit-button {
  background-color: #1F7D53;
  color: #ffffff;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
}

.submit-button:hover {
  background-color: #255F38;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.2);
}

.submit-button:active {
  transform: translateY(0);
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
  .new-article-container {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .toast-container {
    top: 0.5rem;
    right: 0.5rem;
    width: calc(100% - 1rem);
  }
}
</style>
