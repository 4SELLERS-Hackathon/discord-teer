const Database = require('../../src/data/Database.js')
const Builds = require('../../src/data/Builds.js')

test('save into database and retreive', () => {
    let builds = new Builds(new Database());

    builds.insert({
        text: "hello world",
        createdAt: new Date().getDate()
    })

    expect(builds.getLatestBuilds().length).toBe(1)
})

test('save into database and retreive ', () => {
    const builds = new Builds(new Database())

    const now = new Date();
    const fiveDaysAgo = new Date()
    fiveDaysAgo.setDate(now.getDate() - 5)

    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(now.getDate() - 2)

    builds.insert({
        id: 1,
        text: "hello world",
        createdAt: now
    })

    builds.insert({
        id: 2,
        text: "second hello world",
        createdAt: fiveDaysAgo
    })

    builds.insert({
        id: 3,
        text: "another hello world",
        createdAt: now
    })

    builds.insert({
        id: 4,
        text: "no other hello world",
        createdAt: twoDaysAgo
    })

    expect(builds.getLatestBuilds().length).toBe(4)
    expect(builds.getLatestBuilds()[0].id).toBe(2)
    expect(builds.getLatestBuilds()[1].id).toBe(4)
})