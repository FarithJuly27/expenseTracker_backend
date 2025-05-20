// const axios = require('axios')
// const cheerio = require('cheerio');
// const puppeteer = require('puppeteer');
require('dotenv').config()

const BASE_URL = process.env.GOLDAPI_BASE_URL
const API_KEY = process.env.GOLD_API_KEY

const KARAT_MULTIPLIERS = {
    '24K': 1,
    '22K': 0.916,
    '18K': 0.75
};

function calculateRetailPrice(basePrice) {
    const importDuty = 0.125;
    const gst = 0.03;
    const surcharge = 0.025;
    const markup = 0.05;

    const totalTaxMultiplier = 1 + importDuty + gst + surcharge + markup;
    return parseFloat((basePrice * totalTaxMultiplier).toFixed(2));
}


async function getGoldPriceINR() {
    try {
        const response = await axios.get(`${BASE_URL}/XAU/INR`, {
            headers: {
                'x-access-token': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        const pricePerOunceINR = response.data.price;
        const pricePerGramINR_24K = parseFloat((pricePerOunceINR / 31.1035).toFixed(2));

        const adjustedPrices = {};
        for (const karat of Object.keys(KARAT_MULTIPLIERS)) {
            const multiplier = KARAT_MULTIPLIERS[karat];
            const basePrice = pricePerGramINR_24K * multiplier;
            adjustedPrices[karat] = calculateRetailPrice(basePrice);
        }

        return {
            pricePerOunceINR,
            pricePerGramINR_24K,
            pricesPerGramByKarat: adjustedPrices
        };

    } catch (error) {
        console.error('Error fetching gold price in INR:', error.message);
        throw error;
    }
}


async function fetchGoldRate24KTuticorin() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('https://www.goodreturns.in/gold-rates/tuticorin.html', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        await page.waitForSelector('.gold_silver_table tbody tr:nth-child(2) td:nth-child(2)', {
            timeout: 30000
        });

        // Optional screenshot
        await page.screenshot({ path: 'tuticorin_gold_debug.png', fullPage: true });

        const goldRate = await page.evaluate(() => {
            const cell = document.querySelector('.gold_silver_table tbody tr:nth-child(2) td:nth-child(2)');
            return cell ? parseFloat(cell.innerText.replace(/[^0-9.]/g, '')) : null;
        });

        const now = new Date();
        if (goldRate) {
            console.log(`[${now.toISOString()}] ✅ 24K Gold Rate (Tuticorin): ₹${goldRate} per gram`);
        } else {
            console.log(`[${now.toISOString()}] ❌ Could not extract 24K rate`);
        }

        await browser.close();
        return goldRate;
    } catch (err) {
        console.error('❌ Failed to fetch gold rate with Puppeteer:', err.message);
        await browser.close();
        return null;
    }
}

module.exports = { getGoldPriceINR, fetchGoldRate24KTuticorin };



