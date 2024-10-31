<template>
  <div class="container">
    <div class="header">
      <p>Manage Users</p>
      <button @click="handleShowForm" class="btn btn-primary">
        Add New User
      </button>
    </div>

    <!-- Search Input -->
    <div class="search-container">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name..."
          class="search-input"
      />
    </div>

    <table class="table user-table">
      <thead>
      <tr>
        <th>STT</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Date Of Birth</th>
        <th>Email</th>
        <th>Option</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in filteredUsers" :key="user.id">
        <td>{{ index + 1 }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.dateOfBirth }}</td>
        <td>{{ user.email }}</td>
        <td class="btn">
          <button @click="editUser(user)" class="btn btn-warning">
            Edit
          </button>
          <button @click="showDeleteModal(user.id)" class="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Edit vs Add Form Modal -->
    <form-user
        v-if="isShowForm"
        :userToEdit="selectedUser"
        :existingUsers="users"
        @onClose="handleCloseForm"
        @onSubmit="handleSubmitForm"
    ></form-user>

    <!-- Modal Delete -->
    <div class="overlay" v-if="isModalVisible">
      <div class="modal-custom">
        <div class="modal-title">
          <h4>Cảnh báo</h4>
          <i class="fa-solid fa-xmark" @click="hideDeleteModal"></i>
        </div>
        <div class="modal-body-custom">
          <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
        </div>
        <div class="modal-footer-custom">
          <button class="btn btn-light" @click="hideDeleteModal">Hủy</button>
          <button class="btn btn-danger" @click="confirmDelete">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import FormUser from "./FormUser.vue";

interface User {
  id: number;
  name: string;
  gender: string;
  dateOfBirth: string;
  email: string;
}

const isShowForm = ref<boolean>(false);
const users = reactive<User[]>(JSON.parse(localStorage.getItem("user") || "[]"));
const selectedUser = ref<User | null>(null);
const searchQuery = ref<string>("");

const isModalVisible = ref<boolean>(false);
const userIdToDelete = ref<number | null>(null);

// Computed property for filtered users
const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return users;

  return users.filter(user =>
      user.name.toLowerCase().includes(query)
  );
});

const handleShowForm = () => {
  selectedUser.value = null;
  isShowForm.value = true;
};

const handleCloseForm = () => {
  isShowForm.value = false;
};

const editUser = (user: User) => {
  selectedUser.value = { ...user };
  isShowForm.value = true;
};

const handleSubmitForm = (user: User) => {
  if (selectedUser.value) {
    const index = users.findIndex((u: User) => u.id === user.id);
    users[index] = { ...user };
  } else {
    users.push({ ...user });
  }
  localStorage.setItem("user", JSON.stringify(users));
  handleCloseForm();
};

const showDeleteModal = (id: number) => {
  isModalVisible.value = true;
  userIdToDelete.value = id;
};

const hideDeleteModal = () => {
  isModalVisible.value = false;
  userIdToDelete.value = null;
};

const confirmDelete = () => {
  if (userIdToDelete.value === null) return;

  const updatedUsers = users.filter((user: User) => user.id !== userIdToDelete.value);
  localStorage.setItem("user", JSON.stringify(updatedUsers));

  // Update the reactive users array
  users.length = 0;
  users.push(...updatedUsers);

  hideDeleteModal();
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header p {
  font-size: 40px;
  margin: 0;
}

.container {
  padding: 20px;
  overflow: auto;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #666;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}

.btn-primary {
  margin-bottom: 0;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}

thead {
  background-color: #f2f2f2;
}

.btn {
  display: flex;
  gap: 10px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-custom {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
}

.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body-custom {
  margin: 20px 0;
}

.modal-footer-custom {
  display: flex;
  justify-content: space-between;
}
</style>