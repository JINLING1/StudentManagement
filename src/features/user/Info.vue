<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto my-20">
    <div class="avatar flex justify-center ">
      <div class="w-24 rounded-full cursor-pointer">
        <label for="avatar-img">
          <img :src="currentAvatarUrl" />
        </label>
      </div>
    </div>

    <input class="hidden" type="file" accept="image/*" id="avatar-img" @change="handleAvatarChange" />
    <div class="w-3/4 mx-auto">
      <label class="input">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </g>
        </svg>
        <input type="text" value="JinLing" class="grow" disabled />
      </label>
      <ul class="menu bg-base-200 rounded-box w-56" v-if="classInChargeArr.length > 0">
        <li>
          <details open>
            <summary>Class in Charge</summary>
            <ul>
              <li v-for="(classItem, index) in classInChargeArr" :key="index">
                <a>
                  Class {{ classItem.split("|")[0] }} | Year {{ classItem.split("|")[1] }}
                </a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
    <button class="btn btn-neutral mt-4" @click="onClick">Update Avatar</button>


  </fieldset>
</template>

<script setup>
import { uploadAvatar } from '@/services/apiStorage';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user.js';
import { getTeacherByTeacherId } from '@/services/apiTeacher';

const userStore = useUserStore();
const { updateUser } = userStore;
const { user } = storeToRefs(userStore);
const currentAvatarUrl = ref('https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp');
const avatarFile = ref(null)

function handleAvatarChange(event) {
  const file = event.target.files[0];
  console.log(file);
  avatarFile.value = file;

  const newAvatarUrl = URL.createObjectURL(file);
  currentAvatarUrl.value = newAvatarUrl;
}

async function onClick() {
  if (!avatarFile.value) {
    return;
  }
  const data = await uploadAvatar(avatarFile.value);
  // 更新store中的avatar
  updateUser(data.user.user_metadata);
  console.log('finish')
}

const classInChargeArr = ref([]);

onMounted(async () => {
  currentAvatarUrl.value = user.value.avatar;
  const teachers = await getTeacherByTeacherId(user.value.sub);
  classInChargeArr.value = JSON.parse(teachers[0].class_in_charge);
})
</script>
