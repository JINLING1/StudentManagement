<template>
  <tr>
    <th>
      <label>
        <input type="checkbox" class="checkbox" />
      </label>
    </th>
    <td>
      <div class="flex items-center gap-3">
        <div class="avatar">
          <div class="mask mask-squircle h-12 w-12">
            <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <!-- name and gender -->
        <div>
          <div class="font-bold">Hart Hagerty</div>
          <div class="text-sm opacity-50">male</div>
        </div>
      </div>
    </td>
    <!-- class and teacher -->
    <td>
      Class 1 | Year 9
      <br />
      <span class="badge badge-ghost badge-sm">JinLing</span>
    </td>
    <th>
      <button class="btn btn-ghost btn-sm">details</button>
      <button class="btn btn-error btn-sm">delete</button>
    </th>
  </tr>
</template>

<script setup>

</script>
