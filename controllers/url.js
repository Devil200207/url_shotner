const shortId = require("shortid");
const URL = require('../models/url');

async function GenerateUrl(req,res)
{
    const body = req.body;
    if(!body.url)
    {
        return res.status(400).json({
            error:'url not present'
        })
    }

    const shortID = shortId();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
    });

    return res.render("home",{
        id:shortID
    });
}

module.exports = {
    GenerateUrl
};