<script setup>
import { database } from "../firebase";
import { ref as dbRef, child, push, update, onValue } from "firebase/database";
import { onMounted, ref } from "vue";
const name = ref("");
const chatText = ref("");
const chats = ref([]);
const getChats = () => {
  const starCountRef = dbRef(database, "chats");
  console.log(4);
  onValue(starCountRef, (snapshot) => {
    chats.value = [];
    snapshot.forEach((chat) => {
      chats.value.push({ ...chat.val(), id: chat.id });
    });
  });
  console.log(5);
};
getChats();

const onName = () => {
  localStorage.setItem("author", name.value);
  writeNewPost();
};
// localStorage.removeItem("author");
const author = localStorage.getItem("author");
const writeNewPost = () => {
  console.log(1);
  // A post entry.
  const postData = ref();
  if (author !== null) {
    console.log(7);
    postData.value = {
      author,
      chatText: chatText.value,
      date:
        new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString(),
    };
  } else {
    console.log(8);
    postData.value = {
      author: name.value,
      chatText: "join the chat",
      date:
        new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString(),
    };
  }
  // Get a key for a new Post.
  const newPostKey = push(child(dbRef(database), "chats")).key;
  console.log(2);
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates["/chats/" + newPostKey] = postData.value;
  console.log(3);
  chatText.value = "";
  getChats();
  return update(dbRef(database), updates);
};
</script>

<template>
  <div class="chat-room">
    <div class="chat-parent" v-if="author !== null">
      <form class="form-chat" @submit.prevent="writeNewPost">
        <input placeholder="chat..." v-model="chatText" type="text" />
        <button type="submit">Sent</button>
      </form>
      <div class="chat-container">
        <div class="chat" v-for="chat in chats.reverse()" :key="chat.id">
          <p class="chat-text">
            <b :class="[chat.author === author ? 'myname' : '', 'name']"
              >{{ chat.author }}:</b
            >
            {{ chat.chatText }}
          </p>
          <p class="date">{{ chat.date }}</p>
        </div>
      </div>
    </div>
    <form v-else @submit="onName">
      <label for="name">Write your name before chat something</label>
      <input type="text" id="name" placeholder="name" v-model="name" />
      <button type="submit">Complete</button>
    </form>
  </div>
</template>

<style scoped>
.chat-room {
  margin: 0 auto;
  width: 50%;
  overflow: hidden;
}
.form-chat {
  display: flex;
  margin: 2rem 0;
}
.form-chat input {
  width: 100%;
}
input,
button {
  font-size: 1.1rem;
  padding: 0.2rem 0.5rem;
}
.chat {
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0;
}
.chat-container {
  height: 90vh;
  width: 100%;
  overflow-y: scroll;
}
.chat p {
  margin: 0;
  word-break: break-all;
}
.chat-text {
  width: 80%;
}
.name {
  font-size: 1.1rem;
  text-transform: capitalize;
}
.myname {
  color: blue;
}
.date {
  width: 20%;
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>
