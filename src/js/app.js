var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);

var App = Vue.extend({
    el: function () {
        return '#container'; 
    },
    data: function() {
        return {
            fullRepoName: '',
            username: '',
            repo: ''
        }
    },
    methods: {
        changeRepo: function() {
            var splitData = this.fullRepoName.split('/');
            this.username = splitData[0];
            this.repo = splitData[1];

            console.group("Vue Data");
            console.log("fullRepoName:", this.fullRepoName);
            console.log("username:", this.username);
            console.log("repo:", this.repo);
            console.groupEnd("Vue Data");
        }
    },
    components: {
        githubFileExplorer: require('./components/github-file-explorer'),
        githubContributors: require('./components/github-contributors')
    }
});

var router = new VueRouter();

router.start(App, '#container');
