<template>
  <Loading v-show="isLoading" />

  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 mx-auto my-20" v-show="!isLoading">
    <div class="avatar flex justify-center ">
      <div class="w-24 rounded-full ">
        <label for="avatar-img" class="cursor-pointer">
          <img :src="currentAvatarUrl" />
        </label>
      </div>
    </div>

    <input class="hidden" type="file" accept="image/*" id="avatar-img" @change="handleAvatarChange" />

    <div class="input flex items-center justify-center gap-2 mx-auto my-2">
      <label class="label">Name</label>
      <input type="text" v-model="name" class="grow" />
    </div>

    <select class="select mx-auto my-2" v-model="gender">
      <option disabled selected>Choose Gender</option>
      <option>female</option>
      <option>male</option>
    </select>

    <button class="btn btn-neutral mt-4" @click="onClick">Update Profile</button>

  </fieldset>
</template>

<script setup>
import { getStudentByStudentId } from '@/services/apiStudent';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { updateStudent } from '@/services/apiStudent';
import { uploadAvatar } from '@/services/apiStorage';
import { getConfig } from '@/utils/configHelper';
import { useRouter } from 'vue-router';
import Loading from '@/ui/Loading.vue';

const route = useRoute();
const router = useRouter();
const gender = ref('Female');
const name = ref('JinLing');
const isLoading = ref(true);
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
  const newStudent = {
    name: name.value,
    gender: gender.value,
  }

  if (avatarFile.value) {
    const token = getConfig('SUPABASE_TOKEN');
    const supabaseURL = getConfig('SUPABASE_URL');

    const userToken = JSON.parse(localStorage.getItem(token));
    const newAvatarFileName = `${userToken.user.email}-${Date.now()}.png`;

    await uploadAvatar(avatarFile.value, newAvatarFileName);

    //更新supabase中的student信息
    const avatar = `${supabaseURL}/storage/v1/object/public/Avatar/public/${newAvatarFileName}`;
    newStudent.avatar = avatar;
  }

  const student = await updateStudent(route.params.id, newStudent);
  console.log(student);
  router.push({ name: 'student' });
}


onMounted(async () => {
  isLoading.value = true;
  const studentId = route.params.id;
  const student = await getStudentByStudentId(studentId);

  name.value = student.name;
  gender.value = student.gender;
  currentAvatarUrl.value = student.avatar;
  isLoading.value = false;
})
</script>
