const express = require('express')

class APIRouter {
    constructor(APIController) {
        this.APIController = APIController
    }

    createRouter() {
        const router = express.Router()

        router.get('/', this.APIController.getAllUrl)
        router.post('/', this.APIController.createShortenedUrl)
        router.get('/:id', this.APIController.redirectToLongUrl)

        return router
    }

    get(req, res) {
        return this.APIController.getAllUrl(req, res)
    }
}

module.exports = APIRouter

