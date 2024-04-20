
//alert('hello');


// Binance Smart Chain का endpoint
const apiUrl = 'https://api.bscscan.com/api';

// Binance Smart Chain के API key
const apiKey = 'YA8B4TF5WUFFZ97EWB5NKK784Z5XKXFD63'; // यहाँ अपने API key को दर्ज करें

// Wallet address का बैलेंस जांचने के लिए फ़ंक्शन
async function getBalance(currency, address) {
    try {
        // API कॉल करना
        const response = await fetch(apiUrl + `?module=account&action=tokenbalance&contractaddress=${currency}&address=${address}&apiKey=${apiKey}`);
        const data = await response.json();

        // बैलेंस निकालना
        const balanceStr = data.result;
        const balance = parseFloat(balanceStr) // 1e18;

        // Contract address के आधार पर टोकन का नाम निर्धारित करना
        let tokenName;
        if (currency === '0x55d398326f99059ff775485246999027b3197955') {
            tokenName = 'USDT';
        } else if (currency === '0x7130d2a12b9bcf9b9fd08b66111d9d468b23d0c9') {
            tokenName = 'BTC';
        } else if (currency === '0x2170ed0880ac9a755fd29b2688956bd959f933f8') {
            tokenName = 'ETH';
        }else if (currency === '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE') {
                tokenName = 'BNB';
        } else {
            tokenName = 'Unknown Token';
        }

        // बैलेंस को प्रदर्शित करें
        const resultElement = document.getElementById('result');
        resultElement.innerHTML += `
            <p>Currency Contract Address: ${currency}</p>
            <p>Balance (${tokenName}): ${balance.toFixed(18)} tokens</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        const resultElement = document.getElementById('result');
        resultElement.innerHTML += `<p>Error: ${error.message}</p>`;
    }
}

// बटन क्लिक को नियंत्रित करने के लिए
document.getElementById('wallet-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // उपयोगकर्ता द्वारा दर्ज किए गए वॉलेट पते को प्राप्त करें
    const walletAddress = document.getElementById('wallet-address').value;

    // जांच करने के लिए कॉन्ट्रैक्ट एड्रेस (टोकन के) सूची
    const currencies = [
        '0x55d398326f99059ff775485246999027b3197955', // USDT contract address on BSC
        '0x7130d2a12b9bcf9b9fd08b66111d9d468b23d0c9', // BTC contract address on BSC
        '0x2170ed0880ac9a755fd29b2688956bd959f933f8', // ETH contract address on BSC
        '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE' //   BNB contract adress on bsc
    ];

    // परिणाम को साफ करें
    const resultElement = document.getElementById('result');
    const result = '';
   

    // प्रत्येक टोकन के लिए बैलेंस की जाँच करें
    currencies.forEach(currency => {
        getBalance(currency, walletAddress);
    });
});
