<template>
  <tr>
    <td>{{ scoreItem.name }}</td>
    <td>{{ scoreItem.class }}</td>
    <td>{{ scoreItem.subject }}</td>
    <td>{{ scoreItem.semester }}</td>
    <td>{{ scoreItem.score }}</td>
    <td>
      <button class="btn btn-ghost btn-sm">details</button>
      <button class="btn btn-error btn-sm">delete</button>
    </td>
  </tr>
</template>

<script setup>
defineProps(['scoreItem']);
</script>
