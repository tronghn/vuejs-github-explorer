<template>
  <div class="table-row">
    <div class="clearfix">
      <a v-if="authorUrl" href="{{ authorUrl }}"><img class="pull-left cell-avatar" :src="authorAvatar" width="40"></a>
      <img class="pull-left" v-else :src="authorAvatar" width="20">
      <div class="content-heading">
        <a href="{{ commitUrl }}">
          <span class="cell-title">{{ commitMessage }}</span>
        </a>
        <div class="pull-right btn btn-default cell-sha">
          <a href="{{ commitUrl }}">
            {{ commitShaShort }}
          </a>
        </div>
      </div>
      <div class="cell-content">
        <a class="cell-author" v-if="authorUrl" href="{{ authorUrl }}">{{ authorUsername }}</a>
        <p v-else>{{ authorUsername }}</p>
        <span title="{{ commitDate | moment 'D. MMM. YYYY, HH:mm ZZ'}}">commited {{ commitDate | moment "from" }}</span>
      </div>
    </div>
  </div>
  <hr>
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
      }
      return 'https://avatars.githubusercontent.com/u/0?v=3'
    },
    authorUsername () {
      if (this.commit.author != null) {
        return this.commit.author.login
      }
      return this.commit.commit.author.name
    },
    commitUrl () {
      return this.commit.html_url
    },
    commitMessage () {
      return (this.commit.commit.message.includes('\n')
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