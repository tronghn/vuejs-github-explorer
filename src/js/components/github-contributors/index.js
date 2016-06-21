module.exports = {
    template: require('./template.html'),
    data: function() {
        return {
            contributorCount: 0,
            contributors: [],
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
        getContributors: function() {
            this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/contributors',
                function(data) {
                    this.contributors = data;
                    this.contributorCount = data.length;
                })
        },
    },
    watch: {
        repo: function(newVal, oldVal) {
            this.getContributors();
        }
    },
    created: function() {
        if (this.username && this.repo) this.getContributors();
    },
};
