const { test } = require('../knexfile')
const knex = require('knex')(test)
const APIController = require('../controllers/APIController')
const APIService = require('../services/APIService')

const apiService = new APIService(knex)
const apiController = new APIController(apiService)


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

const mockRequestLongToShort = (url) => ({
    body: {url}
});
const mockRequestShortToLong = (id) => ({
    params: {id}
});

const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.redirect = jest.fn().mockReturnValue(res)
    return res
};


describe("Test API Controller", () => {
    
    //getAllUrl
    it('sends status 204 if no short id in database', async () => {
        const req = {}
        const res = mockResponse()

        await apiController.getAllUrl(req,res)

        expect(res.status).toHaveBeenCalledWith(204)
    })

    //createShortenedUrl
    it('creates short id and sends it to user', async () => {
        const req = mockRequestLongToShort('https://www.facebook.com')
        const res = mockResponse()

        await apiController.createShortenedUrl(req, res)

        const dataFromDB = await knex('urls').select('*').where('id', 1)
        const data = {urlId: dataFromDB}

        expect(res.json).toHaveBeenCalledWith(data)
    })

    it('sends status 500 if no long url is entered', async () => {
        const req = mockRequestLongToShort()
        const res = mockResponse()

        await apiController.createShortenedUrl(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
    })

    //getAllUrl
    it('sends all data retrieved from database to user', async () => {
        const req = {}
        const res = mockResponse()

        await apiController.getAllUrl(req, res)
        
        const dataFromDB = await knex('urls').select('*')
        const data = {allUrl: dataFromDB}

        expect(res.json).toHaveBeenCalledWith(data)
    })
    
    //redirectToLongUrl
    it('sends status 301 with long url to user if short id is found in database', async () => {
        const idFromDB = await knex('urls').select('url_id', 'long_url')
        const req = mockRequestShortToLong(idFromDB[0].url_id)
        const res = mockResponse()

        await apiController.redirectToLongUrl(req, res)

        expect(res.redirect).toHaveBeenCalledTimes(1)
        expect(res.redirect).toHaveBeenCalledWith(301, idFromDB[0].long_url)
    })

    it('sends status 404 to user if no url is found', async () => {
        const req = mockRequestShortToLong('Hello')
        const res = mockResponse()

        await apiController.redirectToLongUrl(req, res)

        expect(res.status).toHaveBeenCalledWith(404)

    })

    it('send status 400 if no short id is present', async () => {
        const req = mockRequestShortToLong()
        const res = mockResponse()

        await apiController.redirectToLongUrl(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
    })

})