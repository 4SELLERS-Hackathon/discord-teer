class Builds {
    constructor(db) {
        this.db = db

        const collectionName = 'builds'

        this.builds = this.db.getCollection(collectionName)

        if (this.builds === null) {
            this.builds = this.db.addCollection(collectionName)
        }
    }
    /**
     * Insert a new build object.
     * 
     * @param {object} build 
     */
    insert(build) {
        if (!build) {
            return false;
        }

        if (!build.createdAt) {
            build.createdAt = new Date();
        }

        this.builds.insert(build)
    }

    /**
     * Get the latest builds from database. Optional with limit
     * 
     * @param {Number} limit 
     */
    getLatestBuilds(limit) {
        const result = this.builds.chain().sort(function(a, b) {
            if (a.createdAt === b.createdAt) {
                return 0;
            }

            if (a.createdAt > b.createdAt) {
                return 1;
            }

            if (a.createdAt < b.createdAt) {
                return -1;
            }
        });

        if (limit) {
            return result.limit(limit).data();
        }

        return result.data()
    }
}

module.exports = Builds