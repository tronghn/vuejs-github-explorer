module.exports = {
    template: require('./template.html'),
    data: function() {
        return {
            commitCount: 0,
            commits: [],
            commitsPrev: [],
            commitsNext: [],
            pageNumber: 1,
            nextPageAvailable: false,
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
        },
    },
    methods: {
        getCommits: function(pageNumber) {
            if (!this.nextPageAvailable) {
                this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/commits?page=' + pageNumber,
                    function(data) {
                        this.commits = data;
                        this.commitCount = this.commits.length;
                    }
            )}
            this.getNextCommits(pageNumber);
        },
        getNextCommits: function(pageNumber) {
            this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/commits?page=' + (pageNumber + 1),
                function(data) {
                    this.commitsNext = data;
                    this.nextPageAvailable = (this.commitsNext.length > 0);
                });
        },
        getPrevCommits: function(pageNumber) {
            this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/commits?page=' + (pageNumber - 1),
                function(data) {
                    this.commitsPrev = data;
                });
        },
        prev: function() {
            if (this.pageNumber != 1) {
                this.commitsNext = this.commits
                this.commits = this.commitsPrev;
                this.pageNumber--;
                this.getPrevCommits(this.pageNumber);
                this.nextPageAvailable = true;
            }
        },
        next: function() {
            if (this.nextPageAvailable) {
                this.commitsPrev = this.commits;
                this.commits = this.commitsNext;
                this.pageNumber++;
                this.getNextCommits(this.pageNumber);
            }
        }
    },
    watch: {
        repo: function(newVal, oldVal) {
            this.pageNumber = 1;
            this.nextPageAvailable = false;
            this.getCommits(1);
        }
    },
    created: function() {
        if (this.username && this.repo) this.getCommits(1);
    },
};
