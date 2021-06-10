const { test } = require('../knexfile')
const knex = require('knex')(test)
const APIService = require('../services/APIService')

const apiService = new APIService(knex)

beforeAll(async()=> {
    await knex.migrate.latest()
    console.log("tables created")
})

afterAll(async() => {
     await knex.migrate.rollback(true)
     await knex.destroy()
    console.log('tables dropped')
    jest.resetModules()
    jest.restoreAllMocks()
});


describe("Test API Services", () => {

    //createUrlId
    it('creates a new entry in database', async () => {
        const long_url = "https://www.facebook.com"

        const result = await apiService.createUrlId(long_url)
        const databaseResults = await knex('urls').select('*').orderBy('created_at', 'desc')

        expect(result).toEqual(databaseResults)
    })

    it('throws error when long url is not present', async () => {
        expect(apiService.createUrlId()).rejects.toThrowErrorMatchingSnapshot()
    })
    
    //getUrlIds
    it('gets all entries from database', async () => {

        const result = await apiService.getUrlIds()
        const databaseResults = await knex('urls').select('*').orderBy('created_at', 'desc')
        
        expect(result).toEqual(databaseResults)
    })
    
    //getLongUrlById
    it('returns no data when short id is not present', async () => {
        const result = await apiService.getLongUrlById()

        expect(result).toEqual(undefined)
        
    })

    it('gets correct entry from database', async () => {
        const mockData = {
            url_id: 'i_am_an_id',
            long_url: 'https://www.facebook.com',
        }

        await knex('urls').insert(mockData).returning('*')
        const result = await apiService.getLongUrlById(mockData.url_id)
        
        expect(result.long_url).toEqual(mockData.long_url)
    })

})