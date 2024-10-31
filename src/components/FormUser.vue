<template>
  <div class="overlay">
    <form class="form" @submit.prevent="handleSubmit">
      <div class="d-flex justify-content-between align-items-center">
        <h4>{{ userToEdit ? "Chỉnh sửa User" : "Thêm mới User" }}</h4>
        <i class="fa-solid fa-xmark" @click="handleClose"></i>
      </div>
      <div>
        <label class="form-label" for="userName">Họ và tên</label>
        <input
            id="userName"
            type="text"
            class="form-control"
            v-model="user.name"
        />
        <div class="form-text error" v-if="nameErr">{{ nameErr }}</div>
      </div>
      <div>
        <label class="form-label" for="gender">Giới tính: </label> <br />
        <input v-model="user.gender" type="radio" value="Nam" /> Nam
        <input v-model="user.gender" type="radio" value="Nữ" /> Nữ
        <input v-model="user.gender" type="radio" value="Khác" /> Khác
        <div class="form-text error" v-if="genderErr">{{ genderErr }}</div>
      </div>
      <br />
      <div>
        <label class="form-label" for="dateOfBirth">Ngày sinh</label>
        <input
            id="dateOfBirth"
            type="date"
            class="form-control"
            v-model="user.dateOfBirth"
        />
        <div class="form-text error" v-if="dateOfBirthErr">
          {{ dateOfBirthErr }}
        </div>
      </div>
      <div>
        <label class="form-label" for="email">Email</label>
        <input
            id="email"
            type="text"
            class="form-control"
            v-model="user.email"
        />
        <div class="form-text error" v-if="emailErr">{{ emailErr }}</div>
      </div>
      <br />
      <div>
        <button class="w-100 btn btn-primary">
          {{ userToEdit ? "Cập nhật" : "Thêm mới" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { validateEmail } from "../utils/validation.ts";

const { userToEdit, existingUsers } = defineProps([
  "userToEdit",
  "existingUsers",
]);
const emit = defineEmits(["onClose", "onSubmit"]);

const user = reactive({
  id: Math.floor(Math.random() * 10000000),
  name: "",
  gender: "",
  dateOfBirth: "",
  email: "",
});

onMounted(() => {
  if (userToEdit) {
    Object.assign(user, { ...userToEdit });
  }
});

const nameErr = ref("");
const dateOfBirthErr = ref("");
const emailErr = ref("");
const genderErr = ref("");

const currentTime = () => {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, 0);
  const month = (today.getMonth() + 1).toString().padStart(2, 0);
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
};

const checkDuplicateEmail = (email : any) => {
  console.log(existingUsers);
  const duplicate = existingUsers.some(
      (existingUser : any) =>
          existingUser.email === email && existingUser.id !== user.id
  );

  return duplicate;
};

const handleSubmit = () => {
  if (!user.name) {
    nameErr.value = "Họ và tên không được để trống.";
  } else {
    nameErr.value = "";
  }

  if (!user.gender) {
    genderErr.value = "Yêu cầu chọn giới tính.";
  } else {
    genderErr.value = "";
  }

  if (!user.dateOfBirth) {
    dateOfBirthErr.value = "Ngày sinh không được để trống.";
  } else if (user.dateOfBirth > currentTime()) {
    dateOfBirthErr.value = "Ngày sinh không được lớn hơn ngày hiện tại.";
  } else {
    dateOfBirthErr.value = "";
  }

  if (!user.email) {
    emailErr.value = "Email không được để trống.";
  } else if (!validateEmail(user.email)) {
    emailErr.value = "Email không đúng định dạng.";
  } else if (checkDuplicateEmail(user.email)) {
    emailErr.value = "Email đã tồn tại.";
  } else {
    emailErr.value = "";
  }

  if (
      !nameErr.value &&
      !genderErr.value &&
      !dateOfBirthErr.value &&
      !emailErr.value
  ) {
    emit("onSubmit", { ...user });
  }
};

const handleClose = () => {
  emit("onClose");
};
</script>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
}

.error {
  color: red;
  font-size: 12px;
}
</style>