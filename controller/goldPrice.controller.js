const { getGoldPriceINR } = require('../helper/goldPrice');

exports.getTodayGoldPriceINR = async (req, res) => {
    try {
        const result = await getGoldPriceINR();

        res.json({
            success: true,
            goldPricePerOunceINR: result.pricePerOunceINR,
            goldPricePerGramINR_24K: result.pricePerGramINR_24K,
            goldPricesPerGramByKarat: result.pricesPerGramByKarat,
            currency: 'INR',
            source: 'GoldAPI.io'
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch gold price in INR' });
    }
};






