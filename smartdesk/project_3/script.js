const CURRENCY_API_KEY = '5f52efb4596e1e8a8157d5a8'; 
const BASE_URL = 'https://v6.exchangerate-api.com/v6/'; 

// --- CURRENCY DATA AND FLAG MAPPING ---
const CURRENCY_DATA = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
    { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
    { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
    { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
    { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
    { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
    { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰' },
    { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
    { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
    { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
    { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
    { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
    { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦' },
    { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺' },
    { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
    { code: 'THB', name: 'Thai Baht', flag: '🇹🇭' },
    { code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾' },
    { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩' },
    { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭' },
    { code: 'VND', name: 'Vietnamese Dong', flag: '🇻🇳' },
    { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬' },
    { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
    { code: 'ARS', name: 'Argentine Peso', flag: '🇦🇷' },
    { code: 'CLP', name: 'Chilean Peso', flag: '🇨🇱' },
    { code: 'COP', name: 'Colombian Peso', flag: '🇨🇴' },
    { code: 'PKR', name: 'Pakistani Rupee', flag: '🇵🇰' },
    { code: 'ILS', name: 'Israeli New Shekel', flag: '🇮🇱' },
    { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
    { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱' },
    { code: 'HUF', name: 'Hungarian Forint', flag: '🇭🇺' },
    { code: 'CZK', name: 'Czech Koruna', flag: '🇨🇿' },
    { code: 'ISK', name: 'Icelandic Króna', flag: '🇮🇸' },
    { code: 'HRK', name: 'Croatian Kuna', flag: '🇭🇷' },
    { code: 'RON', name: 'Romanian Leu', flag: '🇷🇴' },
    { code: 'BGN', name: 'Bulgarian Lev', flag: '🇧🇬' },
    { code: 'GTQ', name: 'Guatemalan Quetzal', flag: '🇬🇹' },
    { code: 'CRC', name: 'Costa Rican Colón', flag: '🇨🇷' },
    { code: 'JMD', name: 'Jamaican Dollar', flag: '🇯🇲' },
    { code: 'KZT', name: 'Kazakhstani Tenge', flag: '🇰🇿' },
    { code: 'UAH', name: 'Ukrainian Hryvnia', flag: '🇺🇦' },
    { code: 'IQD', name: 'Iraqi Dinar', flag: '🇮🇶' },
    { code: 'JOD', name: 'Jordanian Dinar', flag: '🇯🇴' },
    { code: 'KWD', name: 'Kuwaiti Dinar', flag: '🇰🇼' },
    { code: 'QAR', name: 'Qatari Riyal', flag: '🇶🇦' },
    { code: 'BHD', name: 'Bahraini Dinar', flag: '🇧🇭' },
    { code: 'OMR', name: 'Omani Rial', flag: '🇴🇲' },
    { code: 'AOA', name: 'Angolan Kwanza', flag: '🇦🇴' },
    { code: 'GHS', name: 'Ghanaian Cedi', flag: '🇬🇭' },
    { code: 'TZS', name: 'Tanzanian Shilling', flag: '🇹🇿' },
    { code: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬' },
    { code: 'GEL', name: 'Georgian Lari', flag: '🇬🇪' },
    { code: 'AZN', name: 'Azerbaijani Manat', flag: '🇦🇿' },
    { code: 'LKR', name: 'Sri Lankan Rupee', flag: '🇱🇰' },
    { code: 'BDT', name: 'Bangladeshi Taka', flag: '🇧🇩' },
    { code: 'NPR', name: 'Nepalese Rupee', flag: '🇳🇵' },
    { code: 'AFN', name: 'Afghan Afghani', flag: '🇦🇫' },
    { code: 'MOP', name: 'Macanese Pataca', flag: '🇲🇴' },
    { code: 'AMD', name: 'Armenian Dram', flag: '🇦🇲' },
    { code: 'ALL', name: 'Albanian Lek', flag: '🇦🇱' },
    { code: 'BAM', name: 'Bosnia and Herzegovina Convertible Mark', flag: '🇧🇦' },
    { code: 'BYN', name: 'Belarusian Ruble', flag: '🇧🇾' },
    { code: 'DZD', name: 'Algerian Dinar', flag: '🇩🇿' },
    { code: 'MAD', name: 'Moroccan Dirham', flag: '🇲🇦' },
    { code: 'TND', name: 'Tunisian Dinar', flag: '🇹🇳' },
    { code: 'LBP', name: 'Lebanese Pound', flag: '🇱🇧' },
    { code: 'SYP', name: 'Syrian Pound', flag: '🇸🇾' },
    { code: 'MZN', name: 'Mozambican Metical', flag: '🇲🇿' },
    { code: 'ZMW', name: 'Zambian Kwacha', flag: '🇿🇲' },
    { code: 'RWF', name: 'Rwandan Franc', flag: '🇷🇼' },
    { code: 'ETB', name: 'Ethiopian Birr', flag: '🇪🇹' },
    { code: 'MGA', name: 'Malagasy Ariary', flag: '🇲🇬' },
    { code: 'HTG', name: 'Haitian Gourde', flag: '🇭🇹' },
    { code: 'DOP', name: 'Dominican Peso', flag: '🇩🇴' },
    { code: 'TTD', name: 'Trinidad and Tobago Dollar', flag: '🇹🇹' },
    { code: 'WST', name: 'Samoan Tala', flag: '🇼🇸' },
    { code: 'VUV', name: 'Vanuatu Vatu', flag: '🇻🇺' },
    { code: 'SBD', name: 'Solomon Islands Dollar', flag: '🇸🇧' },
    { code: 'PGK', name: 'Papua New Guinean Kina', flag: '🇵🇬' },
    { code: 'TOP', name: 'Tongan Paʻanga', flag: '🇹🇴' },
    { code: 'XPF', name: 'CFP Franc', flag: '🇳🇨' },
    { code: 'MVR', name: 'Maldivian Rufiyaa', flag: '🇲🇻' },
    { code: 'LAK', name: 'Lao Kip', flag: '🇱🇦' },
    { code: 'KHR', name: 'Cambodian Riel', flag: '🇰🇭' },
    { code: 'MNT', name: 'Mongolian Tögrög', flag: '🇲🇳' },
    { code: 'MMK', name: 'Myanmar Kyat', flag: '🇲🇲' },
    { code: 'TMT', name: 'Turkmenistani Manat', flag: '🇹🇲' },
    { code: 'UZS', name: 'Uzbekistani Soʻm', flag: '🇺🇿' },
    { code: 'TJS', name: 'Tajikistani Somoni', flag: '🇹🇯' },
    { code: 'KGS', name: 'Kyrgyzstani Som', flag: '🇰🇬' },
    { code: 'SHP', name: 'Saint Helena Pound', flag: '🇸🇭' },
    { code: 'GMD', name: 'Gambian Dalasi', flag: '🇬🇲' },
    { code: 'SLL', name: 'Sierra Leonean Leone', flag: '🇸🇱' },
    { code: 'LRD', name: 'Liberian Dollar', flag: '🇱🇷' },
    { code: 'GIP', name: 'Gibraltar Pound', flag: '🇬🇮' },
    { code: 'FJD', name: 'Fijian Dollar', flag: '🇫🇯' },
    { code: 'BSD', name: 'Bahamian Dollar', flag: '🇧🇸' },
    { code: 'BBD', name: 'Barbadian Dollar', flag: '🇧🇧' },
    { code: 'BMD', name: 'Bermudian Dollar', flag: '🇧🇲' },
    { code: 'KYD', name: 'Cayman Islands Dollar', flag: '🇰🇾' },
    { code: 'AWG', name: 'Aruban Florin', flag: '🇦🇼' },
    { code: 'SRD', name: 'Surinamese Dollar', flag: '🇸🇷' },
    { code: 'XCD', name: 'East Caribbean Dollar', flag: '🇦🇬' }, 
    { code: 'SDG', name: 'Sudanese Pound', flag: '🇸🇩' },
    { code: 'JEP', name: 'Jersey Pound', flag: '🇯🇪' },
    { code: 'IMP', name: 'Isle of Man Pound', flag: '🇮🇲' },
    { code: 'TVD', name: 'Tuvaluan Dollar', flag: '🇹🇻' },
    { code: 'XDR', name: 'Special Drawing Rights', flag: '🌐' }, 
];

const CURRENCY_MAP = CURRENCY_DATA.reduce((acc, curr) => {
    acc[curr.code] = curr;
    return acc;
}, {});


// --- Select2 Formatter Functions for Flags ---
function formatCurrencyOption(currency) {
    if (!currency.id) {
        return currency.text;
    }
    return $(
        '<span>' + currency.text + '</span>'
    );
}
function formatCurrencySelection(currency) {
    return formatCurrencyOption(currency);
}


// Function to populate the currency dropdowns
function populateCurrencies() {
    const fromSelect = document.getElementById('currency-from');
    const toSelect = document.getElementById('currency-to');

    // 1. Sort the currencies alphabetically by name before populating
    const sortedCurrencies = [...CURRENCY_DATA].sort((a, b) => a.name.localeCompare(b.name));

    // Clear existing options
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    sortedCurrencies.forEach(currency => { 
        const optionText = `${currency.flag} ${currency.code} - ${currency.name}`;
        
        const optionFrom = new Option(optionText, currency.code);
        const optionTo = new Option(optionText, currency.code);
        
        fromSelect.add(optionFrom);
        toSelect.add(optionTo);
    });

    // Set initial defaults
    fromSelect.value = 'USD'; 
    toSelect.value = 'EUR';   
}

// 1. Currency Conversion Logic
async function convertCurrency() {
    const amount = parseFloat(document.getElementById('currency-amount').value);
    const fromCurrency = document.getElementById('currency-from').value;
    const toCurrency = document.getElementById('currency-to').value;
    const resultElement = document.getElementById('currency-result');

    if (isNaN(amount) || amount <= 0) {
        resultElement.innerText = "Result: Please enter a valid amount.";
        return;
    }

    resultElement.innerText = "Result: Fetching real-time rates...";

    try {
        const endpoint = `${BASE_URL}${CURRENCY_API_KEY}/latest/${fromCurrency}`;
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.result === 'error') {
            console.error("API Error:", data['error-type']);
            throw new Error("API configuration error. Check your base currency.");
        }

        const rate = data.conversion_rates[toCurrency];

        if (!rate) {
            throw new Error(`Rate not found for ${toCurrency}.`);
        }

        const result = amount * rate;
        
        resultElement.innerText = `Result: ${amount.toFixed(2)} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        
    } catch (error) {
        console.error("Currency Conversion Error:", error);
        resultElement.innerText = "Result: Error fetching rates. Check console for details.";
    }
}

// 2. Tab Switching Logic
function openConverter(evt, converterName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(converterName).style.display = "block";
    evt.currentTarget.className += " active";
    
    // IMPORTANT: Re-initialize Select2 when switching to the currency tab
    if (converterName === 'currency') {
        setTimeout(() => {
            // Destroy existing instances before re-initializing
            if ($('#currency-from').data('select2')) {
                $('#currency-from').select2('destroy');
            }
            if ($('#currency-to').data('select2')) {
                 $('#currency-to').select2('destroy');
            }
            
            // Initialize Select2 with the custom formatters and the definitive DOWNWARDS flow fix
            $('#currency-from').select2({
                templateResult: formatCurrencyOption,
                templateSelection: formatCurrencySelection,
                dropdownParent: $('#currency'),
            }).on('select2:opening', function (e) {
                const $dropdown = $('.select2-dropdown');
                if ($dropdown.hasClass('select2-dropdown--above')) {
                    $dropdown.removeClass('select2-dropdown--above').addClass('select2-dropdown--below');
                }
            });
            $('#currency-to').select2({
                templateResult: formatCurrencyOption,
                templateSelection: formatCurrencySelection,
                dropdownParent: $('#currency'),
            }).on('select2:opening', function (e) {
                const $dropdown = $('.select2-dropdown');
                if ($dropdown.hasClass('select2-dropdown--above')) {
                    $dropdown.removeClass('select2-dropdown--above').addClass('select2-dropdown--below');
                }
            });
        }, 50);
    }
}

// 3. Temperature Conversion Logic
function convertTemp() {
    const value = parseFloat(document.getElementById('temp-value').value);
    const fromUnit = document.getElementById('temp-from').value;
    const toUnit = document.getElementById('temp-to').value;
    let result;
    const resultElement = document.getElementById('temp-result');

    if (isNaN(value)) {
        resultElement.innerText = "Result: Invalid Input";
        return;
    }

    let baseC;
    if (fromUnit === 'C') { baseC = value; } 
    else if (fromUnit === 'F') { baseC = (value - 32) * (5 / 9); } 
    else if (fromUnit === 'K') { baseC = value - 273.15; }

    if (toUnit === 'C') { result = baseC; } 
    else if (toUnit === 'F') { result = (baseC * 9 / 5) + 32; } 
    else if (toUnit === 'K') { result = baseC + 273.15; }

    resultElement.innerText = `Result: ${result.toFixed(2)} ${toUnit}`;
}

// 4. Unit Conversion Logic
function convertUnit() {
    const value = parseFloat(document.getElementById('unit-value').value);
    const fromUnit = document.getElementById('unit-from').value;
    const toUnit = document.getElementById('unit-to').value;
    const resultElement = document.getElementById('unit-result');

    if (isNaN(value)) {
        resultElement.innerText = "Result: Invalid Input";
        return;
    }
    
    // Conversion factors: 1 unit = X meters (Meters is the base unit for Length)
    const factors = {
        'm': 1,
        'km': 1000,
        'cm': 0.01,
        'mm': 0.001,
        'um': 0.000001,      // Micrometer
        'nm': 0.000000001,   // Nanometer
        
        // IMPERIAL UNITS:
        'mi': 1609.344,      // Mile
        'ft': 0.3048,        // Foot
        'in': 0.0254,        // Inch
        'yd': 0.9144,        // Yard
        'nmi': 1852,         // Nautical Mile
        
        // Weight/Mass (Base unit is Kilogram = 1)
        'kg': 1,
        'g': 0.001,
        'mg': 0.000001,
        'lb': 0.453592,      // Pound
        'oz': 0.0283495,     // Ounce
        'ton': 1000,         // Metric Ton
    };
    
    // Determine the category of the selected units
    const isLength = ['m', 'km', 'cm', 'mm', 'um', 'nm', 'mi', 'ft', 'in', 'yd', 'nmi'].includes(fromUnit);
    const isWeight = ['kg', 'g', 'mg', 'lb', 'oz', 'ton'].includes(fromUnit);

    // Check for compatibility and set the base factor
    let valueInBase;
    let baseFactorMap = {};
    let error = null;

    if (isLength && ['m', 'km', 'cm', 'mm', 'um', 'nm', 'mi', 'ft', 'in', 'yd', 'nmi'].includes(toUnit)) {
        // Both are Length - Use Meters as Base
        valueInBase = value * factors[fromUnit];
        baseFactorMap = factors;
    } else if (isWeight && ['kg', 'g', 'mg', 'lb', 'oz', 'ton'].includes(toUnit)) {
        // Both are Weight - Use Kilograms as Base
        valueInBase = value * factors[fromUnit]; 
        baseFactorMap = factors;
    } else {
        error = "Incompatible units selected! Cannot convert length to weight.";
    }

    if (error) {
        resultElement.innerText = `Result: ${error}`;
        return;
    }

    // Final Conversion
    const result = valueInBase / baseFactorMap[toUnit];
    resultElement.innerText = `Result: ${result.toFixed(5)} ${toUnit}`;
}


// Auto-open the first tab and populate currencies on page load
document.addEventListener("DOMContentLoaded", function() {
    const initialButton = document.querySelector('.tab-button');
    if (initialButton) {
        initialButton.click();
    }
    populateCurrencies(); 
    
    // Initialize Select2 after options are populated for the FIRST TIME
    // This is the initial setup with the permanent downwards-flow fix.
    $('#currency-from').select2({
        templateResult: formatCurrencyOption,
        templateSelection: formatCurrencySelection,
        dropdownParent: $('#currency'),
    }).on('select2:opening', function (e) {
        const $dropdown = $('.select2-dropdown');
        if ($dropdown.hasClass('select2-dropdown--above')) {
            $dropdown.removeClass('select2-dropdown--above').addClass('select2-dropdown--below');
        }
    });

    $('#currency-to').select2({
        templateResult: formatCurrencyOption,
        templateSelection: formatCurrencySelection,
        dropdownParent: $('#currency'),
    }).on('select2:opening', function (e) {
        const $dropdown = $('.select2-dropdown');
        if ($dropdown.hasClass('select2-dropdown--above')) {
            $dropdown.removeClass('select2-dropdown--above').addClass('select2-dropdown--below');
        }
    });
});