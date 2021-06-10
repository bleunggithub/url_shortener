const Knex = require('knex')
const {nanoid} = require('nanoid')

class APIService {
    constructor(knex) {
        this.knex = knex
    }

    getUrlIds = async () => {
        try {
            return await this.knex('urls')
                .select('*')
                .orderBy('created_at', 'desc')
            
        } catch (err) {
            throw new Error(err)
        }
    }

    createUrlId = async (long_url) => {
        try {
            if (!long_url) throw new Error('No url entered.')

            const newShortUrl = {
                url_id: nanoid(8),
                long_url,
            }

            return await this.knex('urls')
                .insert(newShortUrl)
                .returning('*')
            
        } catch (err) {
            throw new Error(err)
        }
    }

    getLongUrlById = async (url_id) => {
        try {
            if (!url_id) return
            
            const result = await this.knex('urls')
                .select('long_url')
                .where({ url_id })
            
            return result[0]
        } catch (err) {
            throw new Error(err)
        }
    }

}

module.exports = APIService