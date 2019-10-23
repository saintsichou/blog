
<template functional>
  <a-sub-menu
    :key="props.menuinfo.ID"
  >
    <span slot="title">
      <span>{{ props.menuinfo.title }}</span>
    </span>
    <template v-for="child in props.menuinfo.children">
      <a-menu-item
        :key="child.key"
      >
        <nuxt-link
          v-if="child.object === 'category'"
          :to="{
            name: 'category-id',
            params: { id: 1 },
            query: { type: child.object_id, title: child.title }
          }"
        >
           {{ child.title }}
        </nuxt-link>
        <nuxt-link
          v-else-if="child.object === 'page'"
          :to="{
            name: 'page-id',
            params: { id: child.object_id }
          }"
        >
           {{ child.title }}
        </nuxt-link>
        <nuxt-link
          v-else-if="child.object === 'post_tag'"
          :to="{ name: 'tags-id', params: { id: 1 }, query: { type: child.object_id, title: child.title } }">
           {{ child.title }}
        </nuxt-link>
        <a v-else-if="child.object === 'custom'" :href="child.url">
           {{ child.title }}
        </a>
      </a-menu-item>
      
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ['menuinfo'],
};
</script>