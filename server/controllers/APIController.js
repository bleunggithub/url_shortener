class APIController {
    constructor(APIService) {
        this.APIService = APIService
    }

    getAllUrl = async (_req, res) => {
        try {
            const allUrl = await this.APIService.getUrlIds()
            if (allUrl) {
                res.json({
                    allUrl
                })   
            } else {
                res.status(204).json({
                    allUrl: null,
                    msg:`No shortened URL in the database.`
                })
            }
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }
  
    createShortenedUrl = async(req,res) => {
        try {
            let { url } = req.body
            url = url.toLowerCase().includes('http://' && 'https://') ? url : 'http://' + url

            const urlId = await this.APIService.createUrlId(url)
            if (urlId && urlId.length) {
                res.json({
                    urlId
                })
        } else {
            res.status(400).json({
                urlId: null,
                msg: `An error has occurred while creating the shortened Url.`
            })
        }
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    }

    redirectToLongUrl = async(req,res) => {
        try {
            const { id } = req.params
            if (id) {
                const {long_url} = await this.APIService.getLongUrlById(id)

                if (long_url) {
                    res.location(long_url).json({long_url})
                } else {
                    res.status(404).json({ msg: `The url is not found.` })
                }

            } else {
                res.status(400).json({ msg: `url does not exist.` })
            }

        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = APIController;