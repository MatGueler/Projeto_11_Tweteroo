import express from 'express'
import cors from 'cors'

const server = express();
server.use(express.json())
server.use(cors());

const tweets = []

const users = []

// Faz a requisição de dados de login na API
server.get('/sign-up', (req, res) => {
    res.send(users)
})

// Posta os dados de login do usuário na API
server.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body
    const login = {
        username: username,
        avatar: avatar
    }

    const validUsername = (login.username).length === 0;
    const validAvatar = (login.avatar).length === 0;

    if (validUsername || validAvatar) {
        res.sendStatus(400)
    } else {
        users.push(login)
        console.log('OK!')
        res.status(201).send(users)
    }
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
    const { tweet, username } = req.body
    const avatar = (users.find((element) => (element.username === username))).avatar
    const body = {
        username: username,
        avatar: avatar,
        tweet: tweet
    }
    const validUsername = (body.username).length === 0;
    const validTweet = (body.tweet).length === 0;

    if (validUsername || validTweet) {
        res.sendStatus(400)
    } else {
        tweets.push(body)
        console.log('OK!')
        res.status(201).send(tweets)
    }
})

server.listen(5000)