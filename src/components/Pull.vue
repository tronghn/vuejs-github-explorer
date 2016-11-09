<template>
  <div>
    <div class="table-row cell-row">
      <div class="clearfix">
        <a v-if="authorUrl" :href="authorUrl"><img class="pull-left cell-avatar" :src="authorAvatar" width="40"></a>
        <img class="pull-left cell-avatar" v-else :src="authorAvatar" width="40">
        <div class="content-heading">
          <a class="cell-title" :href="pullUrl">
            <strong>{{ pullMessage }}</strong>
          </a>
        </div>
        <small>
          #{{ pullNumber }} opened
          <span> {{ pullDate }}</span> <!-- TODO: Format dates using moment -->
          by
          <strong class="cell-author">
            <a v-if="authorUrl" :href="authorUrl">{{ authorUsername }}</a>
            <span v-else>{{ authorUsername }}</span>
          </strong>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pull: {
      type: Object,
      required: true
    }
  },
  computed: {
    authorUrl () {
      if (this.pull.user != null) {
        return this.pull.user.html_url
      }
    },
    authorAvatar () {
      if (this.pull.user != null) {
        return this.pull.user.avatar_url
      }
      return 'https://avatars.githubusercontent.com/u/0?v=3'
    },
    authorUsername () {
      return this.pull.user.login
    },
    pullUrl () {
      return this.pull.html_url
    },
    pullMessage () {
      return this.pull.title
    },
    pullNumber () {
      return this.pull.number
    },
    pullState () {
      return this.pull.state
    },
    pullDate () {
      return this.pull.created_at
    }
  }
}
</script>