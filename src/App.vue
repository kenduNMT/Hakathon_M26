<template>
  <div class="head">
    <nav>
      <router-link exact-active-class="active-link" to="/">Dashboard</router-link>
      <router-link exact-active-class="active-link" to="/admin/manager-user">Manager User</router-link>
      <router-link exact-active-class="active-link" to="/admin/manager-product">Manager Product</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// Sample user data
const sampleUsers = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    dateOfBirth: "1990-01-01",
    email: "john.doe@example.com"
  },
  {
    id: 2,
    name: "Jane Smith",
    gender: "Female",
    dateOfBirth: "1992-03-15",
    email: "456 Oak St"
  },
  {
    id: 3,
    name: "Mike Johnson",
    gender: "Male",
    dateOfBirth: "1988-06-21",
    email: "mike.johnson@example.com"
  },
  {
    id: 4,
    name: "Emily Davis",
    gender: "Female",
    dateOfBirth: "1995-07-12",
    email: "emily.davis@example.com"
  },
  {
    id: 5,
    name: "Robert Brown",
    gender: "Male",
    dateOfBirth: "1987-11-30",
    email: "robert.brown@example.com"
  },
  {
    id: 6,
    name: "Lisa White",
    gender: "Female",
    dateOfBirth: "1993-02-19",
    email: "lisa.white@example.com"
  },
  {
    id: 7,
    name: "David Miller",
    gender: "Male",
    dateOfBirth: "1994-09-10",
    email: "david.miller@example.com"
  },
  {
    id: 8,
    name: "Sarah Wilson",
    gender: "Female",
    dateOfBirth: "1991-05-25",
    email: "sarah.wilson@example.com"
  },
  {
    id: 9,
    name: "Chris Lee",
    gender: "Male",
    dateOfBirth: "1990-12-11",
    email: "chris.lee@example.com"
  },
  {
    id: 10,
    name: "Anna Taylor",
    gender: "Female",
    dateOfBirth: "1989-08-17",
    email: "anna.taylor@example.com"
  }
];

// Initialize localStorage with sample data on component mount
onMounted(() => {
  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify(sampleUsers));
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  display: flex;
  gap: 20px;
  background-color: black;
  align-items: center;
  height: 60px;
}

a {
  text-decoration: none;
  color: white;
  margin-left: 20px;
}

router-link {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  height: 40px;
  padding: 0 15px;
  border-radius: 5px;
  text-decoration: none;
}

.active-link {
  margin-left: 20px;
  background-color: grey;
  border-radius: 10px;
  color: white;
  width: 160px;
  height: 40px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>