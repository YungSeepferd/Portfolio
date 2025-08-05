const https = require('https');
const fs = require('fs');
const path = require('path');

const fonts = [
    // IBM Plex Mono
    'https://fonts.gstatic.com/s/ibmplexmono/v22/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlBFgsAXHNk.woff2',
    'https://fonts.gstatic.com/s/ibmplexmono/v22/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-otFQ.woff2',
    'https://fonts.gstatic.com/s/ibmplexmono/v22/-F6qfjptAgt5VM-kVkqdyU8n3p4IwlBFgsAXHNk.woff2',
    'https://fonts.gstatic.com/s/ibmplexmono/v22/-F6qfjptAgt5VM-kVkqdyU8n3pAIwlBFgsAXHNk.woff2',
    'https://fonts.gstatic.com/s/ibmplexmono/v22/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgsAXHNk.woff2',
    // Montserrat
    'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXpsS5ILy_0.woff2',
    'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Hw5aXpsS5ILy_0.woff2',
    'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w5aXpsS5ILy_0.woff2',
    'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w5aXpsS5ILy_0.woff2'
];

const fontNames = [
    'IBMPlexMono-Light.woff2',
    'IBMPlexMono-Regular.woff2',
    'IBMPlexMono-Medium.woff2',
    'IBMPlexMono-SemiBold.woff2',
    'IBMPlexMono-Bold.woff2',
    'Montserrat-Regular.woff2',
    'Montserrat-Medium.woff2',
    'Montserrat-SemiBold.woff2',
    'Montserrat-Bold.woff2'
];

const downloadFont = (url, filename) => {
    return new Promise((resolve, reject) => {
        const fontsDir = path.join(__dirname, '..', 'public', 'fonts');
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            const file = fs.createWriteStream(path.join(fontsDir, filename));
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${filename}`);
                resolve();
            });
        }).on('error', reject);
    });
};

async function downloadFonts() {
    try {
        for (let i = 0; i < fonts.length; i++) {
            await downloadFont(fonts[i], fontNames[i]);
        }
        console.log('All fonts downloaded successfully');
    } catch (error) {
        console.error('Error downloading fonts:', error);
    }
}

downloadFonts();
