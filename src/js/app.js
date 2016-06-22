var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var VueMoment = require('vue-moment');
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueMoment);

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
});

Vue.transition('fade', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut'
})

var router = new VueRouter();

router.map({
    '/files': {
        name: 'files',
        component: require('./components/github-file-explorer')
    },
    '/contributors': {
        name: 'contributors',
        component: require('./components/github-contributors')
    },
    '/commits': {
        name: 'commits',
        component: require('./components/github-commits')
    }
});

router.redirect({
    '/': '/files',

    '*': '/'
})

router.start(App, '#container');
