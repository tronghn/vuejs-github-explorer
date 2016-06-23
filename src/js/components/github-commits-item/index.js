module.exports = {
    template: require('./template.html'),
    props: {
        commit: {
            type: Object,
            required: true
        }
    },
    computed: {
        authorUrl: function() {
            if (this.commit.author != null) {
                return this.commit.author.html_url;
            } 
        },
        authorAvatar: function() {
            if (this.commit.author != null) {
                return this.commit.author.avatar_url;
            } else {
                return 'https://avatars.githubusercontent.com/u/0?v=3';
            }
        },
        authorUsername: function() {
            if (this.commit.author != null) {
                return this.commit.author.login;
            } else {
                return this.commit.commit.author.name;
            }
        },
        commitUrl: function() {
            return this.commit.html_url;
        },
        commitMessage: function() {
            return (!!~this.commit.commit.message.indexOf('\n') ? 
                this.commit.commit.message.substring(0, this.commit.commit.message.indexOf('\n')) : 
                this.commit.commit.message);
        },
        commitShaShort: function() {
            return this.commit.sha.substring(0,7);
        },
        commitDate: function() {
            return this.commit.commit.author.date;
        }
    }
};