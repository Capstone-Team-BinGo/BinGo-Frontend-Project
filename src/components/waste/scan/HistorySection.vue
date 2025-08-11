<template>
  <section class="history-section" v-if="historyItems.length > 0 || isLoading">
    <div class="history-header">
      <h2 class="history-title">
        <i class="fas fa-history"></i>
        Riwayat Analisis
      </h2>
      <button
        class="refresh-btn"
        @click="refreshHistory"
        :disabled="isLoading"
      >
        <i class="fas fa-sync-alt" :class="{ 'spinning': isLoading }"></i>
        Refresh
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Memuat riwayat...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="historyItems.length === 0" class="empty-state">
      <i class="fas fa-inbox"></i>
      <h3>Belum Ada Riwayat</h3>
      <p>Mulai scan sampah untuk melihat riwayat analisis Anda</p>
    </div>

    <!-- History Items -->
    <div v-else class="history-items">
      <div
        class="history-item"
        v-for="item in historyItems"
        :key="item.id"
      >
        <div class="item-content" @click="$emit('show-history-detail', item)">
          <div class="item-overlay">
            <i class="fas fa-eye"></i> Lihat Detail
          </div>

          <!-- Waste Icon -->
          <div class="waste-icon-container">
            <i
              :class="[getWasteIcon(item.waste_type), getCategoryClass(item.category)]"
              class="waste-icon"
            ></i>
          </div>

          <div class="history-details">
            <div class="history-type">{{ item.waste_type }}</div>
            <div class="history-category">
              <span class="category-badge" :class="getCategoryClass(item.category)">
                {{ item.category }}
              </span>
            </div>
            <div class="history-date">{{ formatDate(item.scan_date) }}</div>
          </div>
        </div>

        <!-- Delete Button -->
        <button
          class="delete-btn"
          @click.stop="deleteHistoryItem(item.id, item.waste_type)"
          :disabled="deletingItems.includes(item.id)"
          title="Hapus riwayat ini"
        >
          <i class="fas fa-trash" v-if="!deletingItems.includes(item.id)"></i>
          <i class="fas fa-spinner fa-spin" v-else></i>
        </button>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore && !isLoading" class="load-more-container">
      <button class="load-more-btn" @click="loadMoreHistory">
        <i class="fas fa-chevron-down"></i>
        Muat Lebih Banyak
      </button>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="delete-confirmation-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Konfirmasi Penghapusan</h3>
          <button class="close-modal" @click="showDeleteModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <i class="fas fa-trash-alt"></i>
          <p>Apakah Anda yakin ingin menghapus riwayat <strong>"{{ deleteItemName }}"</strong>?</p>
          <p class="warning-text">Aksi ini tidak dapat dibatalkan.</p>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="showDeleteModal = false">Batal</button>
          <button class="confirm-btn" @click="confirmDelete" :disabled="isDeleting">
            <span v-if="!isDeleting">Hapus</span>
            <span v-else class="deleting-text">
              <i class="fas fa-spinner fa-spin"></i> Menghapus...
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
  name: 'HistorySection',
  props: {
    userUid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      historyItems: [],
      isLoading: false,
      deletingItems: [],
      currentOffset: 0,
      limit: 5,
      hasMore: true,
      showDeleteModal: false,
      deleteItemId: null,
      deleteItemName: '',
      isDeleting: false
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    if (this.userUid) {
      this.loadHistory();
    }
  },
  watch: {
    userUid(newVal) {
      if (newVal) {
        this.resetAndLoadHistory();
      } else {
        this.historyItems = [];
      }
    }
  },
  methods: {
    async loadHistory() {
      if (!this.userUid) return;

      this.isLoading = true;
      try {
        const response = await fetch(
          `https://whoiskywi-trash-scan.hf.space/history/${this.userUid}?limit=${this.limit}&offset=${this.currentOffset}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (this.currentOffset === 0) {
          this.historyItems = data.history || [];
        } else {
          this.historyItems.push(...(data.history || []));
        }

        // Check if there are more items
        this.hasMore = (data.history?.length || 0) === this.limit;

      } catch (error) {
        console.error('Error loading history:', error);
        this.toast.error('Gagal memuat riwayat analisis');
        this.hasMore = false;
      } finally {
        this.isLoading = false;
      }
    },

    async loadMoreHistory() {
      this.currentOffset += this.limit;
      await this.loadHistory();
    },

    async refreshHistory() {
      this.currentOffset = 0;
      this.hasMore = true;
      await this.loadHistory();
    },

    resetAndLoadHistory() {
      this.historyItems = [];
      this.currentOffset = 0;
      this.hasMore = true;
      this.loadHistory();
    },

    async deleteHistoryItem(scanId, wasteType) {
      if (!this.userUid) return;

      // Show modal instead of confirm()
      this.deleteItemId = scanId;
      this.deleteItemName = wasteType;
      this.showDeleteModal = true;
    },

    async confirmDelete() {
      if (!this.deleteItemId) return;

      this.isDeleting = true;
      this.deletingItems.push(this.deleteItemId);

      try {
        const response = await fetch(
          `https://whoiskywi-trash-scan.hf.space/history/${this.userUid}/${this.deleteItemId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        // Remove item from local array
        this.historyItems = this.historyItems.filter(item => item.id !== this.deleteItemId);
        this.toast.success(`Riwayat "${this.deleteItemName}" berhasil dihapus`);

        // Emit event to parent component
        this.$emit('history-deleted', this.deleteItemId);

        // Refresh history to get updated data from server
        await this.refreshHistory();

        // Close modal
        this.showDeleteModal = false;

      } catch (error) {
        console.error('Error deleting history:', error);
        this.toast.error('Gagal menghapus riwayat: ' + error.message);
      } finally {
        this.isDeleting = false;
        this.deletingItems = this.deletingItems.filter(id => id !== this.deleteItemId);
        this.deleteItemId = null;
        this.deleteItemName = '';
      }
    },

    formatDate(dateString) {
      try {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch {
        return 'Tanggal tidak valid';
      }
    },

    getWasteIcon(wasteType) {
      const iconMap = {
        'Baterai': 'fas fa-battery-half',
        'Daun': 'fas fa-leaf',
        'Elektronik': 'fas fa-mobile-alt',
        'Kaca': 'fas fa-wine-glass',
        'Kardus': 'fas fa-box',
        'Kertas': 'fas fa-file-alt',
        'Lampu': 'fas fa-lightbulb',
        'Logam': 'fas fa-coins',
        'Pakaian': 'fas fa-tshirt',
        'Plastik': 'fas fa-bottle-water',
        'Sampah Makanan': 'fas fa-apple-alt',
        'Sterofom': 'fas fa-cube'
      };
      return iconMap[wasteType] || 'fas fa-trash';
    },

    getCategoryClass(category) {
      const classMap = {
        'Organik': 'organic',
        'Anorganik': 'inorganic',
        'B3': 'hazardous'
      };
      return classMap[category] || 'unknown';
    }
  }
};
</script>

<style scoped>
.history-section {
  background-color: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(46, 125, 50, 0.1);
  margin-top: 2rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.history-title {
  margin: 0;
  color: #104d32;
  font-size: 1.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.refresh-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.refresh-btn:hover:not(:disabled) {
  background: #1F7D53;
  transform: translateY(-1px);
}

.refresh-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.empty-state i {
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.empty-state h3 {
  margin-bottom: 0.5rem;
  color: #888;
}

.history-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

.history-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: white;
  border: 1px solid #f0f0f0;
}

.history-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

.item-content {
  cursor: pointer;
  position: relative;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1F7D53;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 2;
  font-weight: 600;
  font-size: 1.1rem;
  gap: 0.5rem;
}

.history-item:hover .item-overlay {
  opacity: 1;
}

.waste-icon-container {
  margin-bottom: 1rem;
}

.waste-icon {
  font-size: 3rem;
}

.waste-icon.organic {
  color: #4CAF50; /* Hijau untuk kategori organik */
}

.waste-icon.inorganic {
  color: #2196F3; /* Biru untuk kategori anorganik */
}

.waste-icon.hazardous {
  color: #F44336; /* Merah untuk kategori B3 */
}

.waste-icon.unknown {
  color: #9E9E9E; /* Abu-abu untuk kategori tidak diketahui */
}

.history-details {
  width: 100%;
}

.history-type {
  font-weight: 600;
  color: #010302;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.history-category {
  margin-bottom: 0.5rem;
}

.category-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}

.category-badge.organic {
  background: linear-gradient(135deg, #4caf50, #2e7d32);
}

.category-badge.inorganic {
  background: linear-gradient(135deg, #2196F3, #075fa5);
}

.category-badge.hazardous {
  background: linear-gradient(135deg, #F44336, #ab1a0f);
}

.category-badge.unknown {
  background: #9E9E9E;
}

.history-date {
  font-size: 0.85rem;
  color: #888;
}

.delete-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #f44336;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  opacity: 0;
  transition: all 0.3s;
  z-index: 3;
}

.history-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover:not(:disabled) {
  background: #d32f2f;
  transform: scale(1.1);
}

.delete-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.load-more-container {
  text-align: center;
  margin-top: 2rem;
}

.load-more-btn {
  background: transparent;
  border: 2px solid #4CAF50;
  color: #4CAF50;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.load-more-btn:hover {
  background: #4CAF50;
  color: white;
  transform: translateY(-2px);
}

/* Delete Confirmation Modal Styles */
.delete-confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}

.delete-confirmation-modal .modal-content {
  background-color: white;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.3s ease;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.3rem;
}

.close-modal {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #888;
  transition: all 0.2s;
  line-height: 1;
}

.close-modal:hover {
  color: #333;
}

.modal-body {
  padding: 2rem 1.5rem;
  text-align: center;
}

.modal-body i {
  font-size: 3rem;
  color: #f44336;
  margin-bottom: 1.5rem;
}

.modal-body p {
  margin: 0.5rem 0;
  color: #555;
  line-height: 1.6;
}

.warning-text {
  color: #f44336 !important;
  font-weight: 500;
}

.modal-footer {
  padding: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid #eee;
}

.cancel-btn, .confirm-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.confirm-btn {
  background: #f44336;
  color: white;
  border: none;
}

.confirm-btn:hover:not(:disabled) {
  background: #d32f2f;
  transform: translateY(-1px);
}

.confirm-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.deleting-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .delete-confirmation-modal .modal-content {
    width: 90%;
  }

  .modal-footer {
    justify-content: space-between;
  }

  .cancel-btn, .confirm-btn {
    flex: 1;
    padding: 0.75rem;
  }
}

@media (max-width: 768px) {
  .history-section {
    padding: 1.5rem;
  }

  .history-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .history-items {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .waste-icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .history-items {
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
  }

  .item-content {
    padding: 1rem;
  }

  .refresh-btn {
    width: fit-content
  }
}
</style>