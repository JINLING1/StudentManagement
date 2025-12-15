<template>
  <Loading v-show="isLoading" />

  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto my-20" v-show="!isLoading">
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
import { updateUser as updateUserApi } from '@/services/apiAuth.js'
import Loading from '@/ui/Loading.vue';
import { useToast } from 'vue-toastification';
import { getConfig } from '@/utils/configHelper';
import { updateStudent } from '@/services/apiStudent';
import { getUserId } from '@/utils/userHelper';

const userStore = useUserStore();
const { updateUser } = userStore;
const { user, isStudent } = storeToRefs(userStore);
const currentAvatarUrl = ref('https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp');
const avatarFile = ref(null)
const isLoading = ref(true);

function handleAvatarChange(event) {
  const file = event.target.files[0];
  console.log(file);
  avatarFile.value = file;

  const newAvatarUrl = URL.createObjectURL(file);
  currentAvatarUrl.value = newAvatarUrl;
}

const toast = useToast();
async function onClick() {
  if (!avatarFile.value) {
    toast.warning('Please select an avatar!');
    return;
  }
  toast.info('Updating...');
  const token = getConfig('SUPABASE_TOKEN')
  const supabaseURL = getConfig('SUPABASE_URL')

  const userToken = JSON.parse(localStorage.getItem(token))
  const newAvatarFileName = `${userToken.user.email}-${Date.now()}.png`;

  await uploadAvatar(avatarFile.value, newAvatarFileName);

  const newAvatar = `${supabaseURL}/storage/v1/object/public/Avatar/public/${newAvatarFileName}`;

  //更新supabase中的信息
  const updateUserData = await updateUserApi({
    avatar: newAvatar,
  })

  //如果是学生，更新学生表中的头像
  if (isStudent.value) {
    const userId = getUserId();
    const students = await updateStudent(userId, {
      avatar: newAvatar,
    });
    console.log(students);
  }
  // 更新store中的avatar
  updateUser(updateUserData.user.user_metadata);
  console.log('finish')
  toast.clear();
  toast.success('Successfully updated!');
}

const classInChargeArr = ref([]);

onMounted(async () => {
  isLoading.value = true;
  currentAvatarUrl.value = user.value.avatar;
  if (!isStudent.value) {
    const teachers = await getTeacherByTeacherId(user.value.sub);
    classInChargeArr.value = JSON.parse(teachers[0].class_in_charge);
  }
  isLoading.value = false;
})
</script>
