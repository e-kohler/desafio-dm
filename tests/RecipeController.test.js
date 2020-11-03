import chai from 'chai'
import chaiSorted from 'chai-sorted'
import chaiHttp from 'chai-http'
import dotenv from 'dotenv'
import app from '../src/server.js'
import * as RecipeController from '../src/controllers/RecipeController.js'
dotenv.config()

chai.use(chaiHttp)
chai.use(chaiSorted)
const { expect } = chai

const mockRecipes = [
  {
    title: 'Frozen Chocolate Mousse Cake',
    href: 'http://www.recipezaar.com/Frozen-Chocolate-Mousse-Cake-54345',
    ingredients: 'caster sugar, chocolate, eggs, flour, butter',
    thumbnail: 'http://img.recipepuppy.com/592372.jpg'
  },
  {
    title: 'Chocolate Truffle Cake',
    href: 'http://www.recipezaar.com/Chocolate-Truffle-Cake-305333',
    ingredients: 'chocolate, butter, caster sugar, eggs, flour',
    thumbnail: 'http://img.recipepuppy.com/310492.jpg'
  }
]

const mockGifs = [
  {
    type: 'gif',
    id: 'ZE585xe39PONEXBl9X',
    url: 'https://giphy.com/gifs/billmillerbarbq-bill-miller-millers-billmiller-ZE585xe39PONEXBl9X',
    slug: 'billmillerbarbq-bill-miller-millers-billmiller-ZE585xe39PONEXBl9X',
    bitly_gif_url: 'https://gph.is/g/4LDk9y0',
    bitly_url: 'https://gph.is/g/4LDk9y0',
    embed_url: 'https://giphy.com/embed/ZE585xe39PONEXBl9X',
    username: 'billmillerbarbq',
    source: '',
    title: 'Heart Brownies GIF by Bill Miller Bar-B-Q',
    rating: 'g',
    content_url: '',
    source_tld: '',
    source_post_url: '',
    is_sticker: 0,
    import_datetime: '2020-08-10 02:29:13',
    trending_datetime: '0000-00-00 00:00:00',
    images: {},
    user: {
      avatar_url: 'https://media1.giphy.com/avatars/rmijares/RBkxdFIjeU46.jpg',
      banner_image: '',
      banner_url: '',
      profile_url: 'https://giphy.com/billmillerbarbq/',
      username: 'billmillerbarbq',
      display_name: 'Bill Miller Bar-B-Q',
      description: '',
      is_verified: false
    },
    analytics_response_payload: 'e=Z2lmX2lkPVpFNTg1eGUzOVBPTkVYQmw5WCZldmVudF90eXBlPUdJRl9TRUFSQ0gmY2lkPTM2MmUwZGUyNjU4djZvdWJicGg3YmZnZWRvZGl3dmx6MGJxODgzcGsweWlucW9xOQ',
    analytics: { onload: {}, onclick: {}, onsent: {} }
  },
  {
    type: 'gif',
    id: 'D8DxzfxQPQuQw',
    url: 'https://giphy.com/gifs/D8DxzfxQPQuQw',
    slug: 'D8DxzfxQPQuQw',
    bitly_gif_url: 'http://gph.is/2edecRA',
    bitly_url: 'http://gph.is/2edecRA',
    embed_url: 'https://giphy.com/embed/D8DxzfxQPQuQw',
    username: 'selectaph',
    source: '',
    title: 'black forest selecta GIF',
    rating: 'g',
    content_url: '',
    source_tld: '',
    source_post_url: '',
    is_sticker: 0,
    import_datetime: '2016-10-14 10:46:39',
    trending_datetime: '0000-00-00 00:00:00',
    images: {},
    user: {
      avatar_url: 'https://media1.giphy.com/avatars/selectaph/ERjDS8rthKxY.png',
      banner_image: '',
      banner_url: '',
      profile_url: 'https://giphy.com/selectaph/',
      username: 'selectaph',
      display_name: 'Selecta PH',
      description: '',
      is_verified: false
    },
    analytics_response_payload: 'e=Z2lmX2lkPUQ4RHh6ZnhRUFF1UXcmZXZlbnRfdHlwZT1HSUZfU0VBUkNIJmNpZD0zNjJlMGRlMmU5eDNwbWc0Y3NmamVqZHA0NWJ0cnZqdXFnbG9mZml5dGVnemszeGU',
    analytics: { onload: {}, onclick: {}, onsent: {} }
  }
]

describe('\n Testes RecipeController \n', () => {
  describe('Método fetchRecipes', () => {
    it('Query size: 0', async () => {
      const query = ''
      const data = await RecipeController.fetchRecipes(query, 1)
      expect(data).to.be.an('array')
      expect(data[0]).to.be.an('object').that.has.all.keys('title', 'href', 'ingredients', 'thumbnail')
    })

    it('Query size: 1', async () => {
      const query = 'chocolate'
      const data = await RecipeController.fetchRecipes(query, 1)
      expect(data).to.be.an('array')
      expect(data[0]).to.be.an('object').that.has.all.keys('title', 'href', 'ingredients', 'thumbnail')
    })

    it('Query size: 2', async () => {
      const query = 'chocolate,flour'
      const data = await RecipeController.fetchRecipes(query, 1)
      expect(data).to.be.an('array')
      expect(data[0]).to.be.an('object').that.has.all.keys('title', 'href', 'ingredients', 'thumbnail')
    })

    it('Query size: 3', async () => {
      const query = 'chocolate,flour,butter'
      const data = await RecipeController.fetchRecipes(query, 1)
      expect(data).to.be.an('array')
      expect(data[0]).to.be.an('object').that.has.all.keys('title', 'href', 'ingredients', 'thumbnail')
    })
  })

  describe('Método fetchGifs', () => {
    it('Number of recipes: 0', async () => {
      const mockData = []

      const data = await RecipeController.fetchGifs(mockData)
      expect(data).to.be.an('array')
      expect(data).to.have.length(0)
    })

    it('Number of recipes: 1', async () => {
      const mockData = mockRecipes[0]

      const data = await RecipeController.fetchGifs([mockData])
      expect(data).to.be.an('array')
      expect(data).to.have.length(1)
      expect(data[0]).to.be.an('object').that.includes.key('url')
    })

    it('Number of recipes: 2', async () => {
      const mockData = mockRecipes

      const data = await RecipeController.fetchGifs(mockData)
      expect(data).to.be.an('array')
      expect(data).to.have.length(2)
      expect(data[0]).to.be.an('object').that.includes.key('url')
    })
  })

  describe('Método formatData', () => {
    it('Number of recipes and gifs: 0', async () => {
      const data = await RecipeController.formatData([], [])
      expect(data).to.be.an('array')
      expect(data).to.have.length(0)
    })

    it('Number of recipes and gifs: 1', async () => {
      const mockRecipe = mockRecipes[0]
      const mockGif = mockGifs[0]

      const data = await RecipeController.formatData([mockRecipe], [mockGif])
      expect(data).to.be.an('array')
      expect(data).to.have.length(1)
      expect(data[0]).to.be.an('object').that.has.all.keys('title', 'ingredients', 'link', 'gif')
    })

    it('Number of recipes and gifs: 2', async () => {
      const data = await RecipeController.formatData(mockRecipes, mockGifs)
      expect(data).to.be.an('array')
      expect(data).to.have.length(2)
      expect(data[0]).to.be.an('object').that.has.all.keys('title', 'ingredients', 'link', 'gif')
    })
  })

  describe('Método get', () => {
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
