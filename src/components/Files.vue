<template>
<div class="row">
  <div class="col-md-12">
    <table class="table">
      <caption>File Path: {{ path }}</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th class="text-right"><button class="btn btn-default btn-xs" @click="goBack()" v-if="path !== '/'">Go Back</button></th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="file in sortedFiles" class="animated" transition="fade" transition-mode="out-in">
            <td>
              <div class="file" v-if="file.type === 'file'">
                <i class="fa fa-file-o"></i>
                {{ file.name }}
              </div>
              <div class="directory" v-if="file.type === 'dir'">
                <i class="fa fa-folder-o"></i>
                <a @click="changePath(file.path)">{{ file.name }}</a>
              </div>
            </td>
            <td class="text-right">
              <a href="{{ file.download_url }}" download v-if="file.type === 'file'">
                <i class="fa fa-cloud-download"></i>
              </a>
            </td>
          </tr>
        </tbody>
    </table>
  </div>
</div>
</template>

<script>
import Store from '../store'

export default {
  data () {
    return {
      path: '/',
      files: []
    }
  },
  props: {
    username: {
      type: String,
      required: true
    },
    repo: {
      type: String,
      required: true
    }
  },
  computed: {
    fullRepoUrl () {
      return this.username + '/' + this.repo
    },
    sortedFiles () {
      return this.files.slice(0).sort(function (a, b) {
        if (a.type !== b.type) {
          if (a.type === 'dir') {
            return -1
          } else {
            return 1
          }
        } else {
          if (a.name < b.name) {
            return -1
          } else {
            return 1
          }
        }
      })
    }
  },
  methods: {
    getFiles () {
      Store.getFiles(this.fullRepoUrl, this.path)
        .then((response) => {
          this.files = response.json()
        })
    },
    changePath (path) {
      this.path = '/' + path
      this.getFiles()
    },
    goBack () {
      this.path = this.path.split('/').slice(0, -1).join('/')
      if (this.path === '') this.path = '/'
      this.getFiles()
    }
  },
  watch: {
    repo () {
      this.getFiles()
    }
  },
  created () {
    if (this.username && this.repo) this.getFiles()
  }
}
</script>