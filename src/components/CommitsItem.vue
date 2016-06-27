<template>
<tr>
  <td>
  <a v-if="authorUrl" href="{{ authorUrl }}"><img :src="authorAvatar" width="20"></a>
  <img v-else :src="authorAvatar" width="20">

  <a v-if="authorUrl" href="{{ authorUrl }}">{{ authorUsername }}</a>
  <p v-else>{{ authorUsername }}</p>
  </td>
  <td>
  <a href="{{ commitUrl }}">
    {{ commitMessage }}
  </a>
  </td>
  <td>
  <a href="{{ commitUrl }}">
    {{ commitShaShort }}
  </a>
  </td>
  <td>
  {{ commitDate | moment "from" }}
  </td>
</tr>
</template>

<script>
export default {
  props: {
    commit: {
      type: Object,
      required: true
    }
  },
  computed: {
    authorUrl () {
      if (this.commit.author != null) {
        return this.commit.author.html_url
      }
    },
    authorAvatar () {
      if (this.commit.author != null) {
        return this.commit.author.avatar_url
      } else {
        return 'https://avatars.githubusercontent.com/u/0?v=3'
      }
    },
    authorUsername () {
      if (this.commit.author != null) {
        return this.commit.author.login
      } else {
        return this.commit.commit.author.name
      }
    },
    commitUrl () {
      return this.commit.html_url
    },
    commitMessage () {
      return (this.commit.commit.message.indexOf('\n') > -1
        ? this.commit.commit.message.substring(0, this.commit.commit.message.indexOf('\n'))
        : this.commit.commit.message)
    },
    commitShaShort () {
      return this.commit.sha.substring(0, 7)
    },
    commitDate () {
      return this.commit.commit.author.date
    }
  }
}
</script>