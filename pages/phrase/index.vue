<template>
  <div class="container">
    <phrase></phrase>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import phrase from '~/components/phrase';

export default {
  name: 'Phrase',
  layout: 'page',
  computed: {
    ...mapState('phrase', ['list'])
  },
  components: {
    phrase,
  },
  created () {
    this.getPhraseList()
  },
  methods: {
    ...mapActions('phrase', ['getPhraseList'])
  }
}
</script>

