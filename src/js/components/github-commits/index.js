module.exports = {
    template: require('./template.html'),
    data: function() {
        return {
            commitCount: 0,
            commits: []
        };
    },
    props: {
        username: {
            type: String,
            required: true
        },
        repo: {
            type: String,
            required: true
        },
    },
    computed: {
        fullRepoUrl: function() {
            return this.username + '/' + this.repo;
        }
    },
    methods: {
        getCommits: function() {
            this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/commits',
                function(data) {
                    this.commits = data;
                    this.commitCount = data.length;
                })
        }
    },
    watch: {
        repo: function(newVal, oldVal) {
            this.getCommits();
        }
    },
    created: function() {
        if (this.username && this.repo) this.getCommits();
    },
};
