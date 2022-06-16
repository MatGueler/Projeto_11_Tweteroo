import express from 'express'
import cors from 'cors'

const server = express();
server.use(express.json())
server.use(cors());

const tweets = []

const users = []

server.get('/sign-up', (req, res) => {
    res.send(users)
})

server.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body
    const login = {
        username: username,
        avatar: avatar
    }
    users.push(login)
    res.send(users)
})

server.get('/tweets', (req, res) => {
    if (tweets.length < 11) {
        res.send(tweets)
    }
    else {
        let newTweets = [];
        for (let i = 10; i > 0; i--) {
            newTweets.push(tweets[(tweets.length) - i])
        }
        res.send(newTweets)
    }
})

server.post('/tweets', (req, res) => {
    const avatar = users[0].avatar
    const { tweet, username } = req.body
    const body = {
        username: username,
        avatar: avatar,
        tweet: tweet
    }
    tweets.push(body)
    res.send(tweets)
})

server.listen(5000)