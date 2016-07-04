<template>
<tr>
  <td>
    <a v-if="authorUrl" href="{{ authorUrl }}"><img :src="authorAvatar" width="20"></a>
    <img v-else :src="authorAvatar" width="20">

    <a v-if="authorUrl" href="{{ authorUrl }}">{{ authorUsername }}</a>
    <p v-else>{{ authorUsername }}</p>
  </td>
  <td>
    <a href="{{ pullUrl }}">
      {{ pullMessage }}
    </a>
  </td>
  <td>
    <a href="{{ pullUrl }}">
      #{{ pullNumber }} ({{ pullState }})
    </a>
  </td>
  <td>
    {{ pullDate | moment "from" }}
  </td>
</tr>
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