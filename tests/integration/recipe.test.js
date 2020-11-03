import chai from 'chai'
import chaiSorted from 'chai-sorted'
import chaiHttp from 'chai-http'
import dotenv from 'dotenv'
import app from '../../src/server.js'
dotenv.config()

chai.use(chaiHttp)
chai.use(chaiSorted)
const { expect } = chai

describe('\n Integration tests \n', () => {
  describe('get', () => {
    it('Query size: 0', done => {
      chai.request(app)
        .get('/recipes')
        .end((_, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.keywords).to.be.an('array')
          expect(res.body.keywords).to.have.length(1)
          expect(res.body.recipes).to.be.an('array')
          res.body.recipes.forEach(recipe => expect(recipe).to.be.an('object').that.has.all.keys('title', 'ingredients', 'link', 'gif'))
          res.body.recipes.forEach(recipe => expect(recipe.ingredients).to.be.sorted())
          done()
        })
    })

    it('Query size: 1', done => {
      chai.request(app)
        .get('/recipes')
        .query({ i: 'butter' })
        .end((_, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.keywords).to.be.an('array')
          expect(res.body.keywords).to.have.length(1)
          expect(res.body.recipes).to.be.an('array')
          res.body.recipes.forEach(recipe => expect(recipe).to.be.an('object').that.has.all.keys('title', 'ingredients', 'link', 'gif'))
          res.body.recipes.forEach(recipe => expect(recipe.ingredients).to.be.sorted())
          done()
        })
    })

    it('Query size: 2', done => {
      chai.request(app)
        .get('/recipes')
        .query({ i: 'butter,tomato' })
        .end((_, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.keywords).to.be.an('array')
          expect(res.body.keywords).to.have.length(2)
          expect(res.body.recipes).to.be.an('array')
          res.body.recipes.forEach(recipe => expect(recipe).to.be.an('object').that.has.all.keys('title', 'ingredients', 'link', 'gif'))
          res.body.recipes.forEach(recipe => expect(recipe.ingredients).to.be.sorted())
          done()
        })
    })

    it('Query size: 3', done => {
      chai.request(app)
        .get('/recipes')
        .query({ i: 'butter,tomato,oregano' })
        .end((_, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.keywords).to.be.an('array')
          expect(res.body.keywords).to.have.length(3)
          expect(res.body.recipes).to.be.an('array')
          res.body.recipes.forEach(recipe => expect(recipe).to.be.an('object').that.has.all.keys('title', 'ingredients', 'link', 'gif'))
          res.body.recipes.forEach(recipe => expect(recipe.ingredients).to.be.sorted())
          done()
        })
    })

    it('Query size: 4', done => {
      chai.request(app)
        .get('/recipes')
        .query({ i: 'butter,tomato,oregano,cheese' })
        .end((_, res) => {
          expect(res).to.have.status(400)
          done()
        })
    })
  })
})

