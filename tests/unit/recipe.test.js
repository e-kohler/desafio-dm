import chai from 'chai'
import chaiSorted from 'chai-sorted'
import dotenv from 'dotenv'

import { fetchRecipes } from '../../src/services/recipePuppy.js'
import { fetchGifs } from '../../src/services/giphy.js'
import { formatData } from '../../src/controllers/recipe.js'

dotenv.config()

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

describe('\n Unit tests \n', () => {
  describe('fetchRecipes', () => {
    it('Query size: 1', async () => {
      const query = 'chocolate'
      const data = await fetchRecipes(query, 1)
      expect(data).to.be.an('array')
      data.forEach(recipe => expect(recipe).to.be.an('object').that.has.all.keys('title', 'href', 'ingredients', 'thumbnail'))
    })

    it('Query size: 2', async () => {
      const query = 'chocolate,flour'
      const data = await fetchRecipes(query, 1)
      expect(data).to.be.an('array')
      data.forEach(recipe => expect(recipe).to.be.an('object').that.has.all.keys('title', 'href', 'ingredients', 'thumbnail'))
    })

    it('Query size: 3', async () => {
      const query = 'chocolate,flour,butter'
      const data = await fetchRecipes(query, 1)
      expect(data).to.be.an('array')
      data.forEach(recipe => expect(recipe).to.be.an('object').that.has.all.keys('title', 'href', 'ingredients', 'thumbnail'))
    })
  })

  describe('fetchGifs', () => {
    it('Number of recipes: 1', async () => {
      const mockData = mockRecipes[0]

      const data = await fetchGifs([mockData])
      expect(data).to.be.an('array')
      expect(data).to.have.length(1)
      data.forEach(gif => expect(gif).to.be.an('object').that.includes.key('url'))
    })

    it('Number of recipes: 2', async () => {
      const mockData = mockRecipes

      const data = await fetchGifs(mockData)
      expect(data).to.be.an('array')
      expect(data).to.have.length(2)
      data.forEach(gif => expect(gif).to.be.an('object').that.includes.key('url'))
    })
  })

  describe('formatData', () => {
    it('Number of recipes and gifs: 1', async () => {
      const mockRecipe = mockRecipes[0]
      const mockGif = mockGifs[0]

      const data = await formatData([mockRecipe], [mockGif])
      expect(data).to.be.an('array')
      expect(data).to.have.length(1)
      data.forEach(formattedData => expect(formattedData).to.be.an('object').that.has.all.keys('title', 'ingredients', 'link', 'gif'))
    })

    it('Number of recipes and gifs: 2', async () => {
      const data = await formatData(mockRecipes, mockGifs)
      expect(data).to.be.an('array')
      expect(data).to.have.length(2)
      data.forEach(formattedData => expect(formattedData).to.be.an('object').that.has.all.keys('title', 'ingredients', 'link', 'gif'))
    })
  })
})
