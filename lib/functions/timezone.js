/* Copyright (C) 2025 Codex.
Licensed under the MIT License;
you may not use this file except in compliance with the License.
Codex - Ziyan
*/

function getTimeByJid(jid) {
    const countryCodeToTimezone = {
        '1': 'America/New_York',       // USA/Canada
        '91': 'Asia/Kolkata',          // India
        '44': 'Europe/London',         // UK
        '81': 'Asia/Tokyo',            // Japan
        '86': 'Asia/Shanghai',         // China
        '33': 'Europe/Paris',          // France
        '49': 'Europe/Berlin',         // Germany
        '7': 'Europe/Moscow',          // Russia
        '61': 'Australia/Sydney',      // Australia
        '55': 'America/Sao_Paulo',     // Brazil
        '92': 'Asia/Karachi',          // Pakistan
        '20': 'Africa/Cairo',          // Egypt
        '90': 'Europe/Istanbul',       // Turkey
        '39': 'Europe/Rome',           // Italy
        '34': 'Europe/Madrid',         // Spain
        '82': 'Asia/Seoul',            // South Korea
        '65': 'Asia/Singapore',        // Singapore
        '60': 'Asia/Kuala_Lumpur',     // Malaysia
        '63': 'Asia/Manila',           // Philippines
        '66': 'Asia/Bangkok',          // Thailand
        '84': 'Asia/Ho_Chi_Minh',      // Vietnam
        '62': 'Asia/Jakarta',          // Indonesia
        '971': 'Asia/Dubai',           // UAE
        '966': 'Asia/Riyadh',          // Saudi Arabia
        '973': 'Asia/Bahrain',         // Bahrain
        '968': 'Asia/Muscat',          // Oman
        '974': 'Asia/Qatar',           // Qatar
        '965': 'Asia/Kuwait',          // Kuwait
        '98': 'Asia/Tehran',           // Iran
        '93': 'Asia/Kabul',            // Afghanistan
        '880': 'Asia/Dhaka',           // Bangladesh
        '94': 'Asia/Colombo',          // Sri Lanka
        '977': 'Asia/Kathmandu',       // Nepal
        '975': 'Asia/Thimphu',         // Bhutan
        '95': 'Asia/Yangon',           // Myanmar
        '856': 'Asia/Vientiane',       // Laos
        '853': 'Asia/Macau',           // Macau
        '852': 'Asia/Hong_Kong',       // Hong Kong
        '886': 'Asia/Taipei',          // Taiwan
        '850': 'Asia/Pyongyang',       // North Korea
        '672': 'Australia/Christmas',  // Christmas Island
        '358': 'Europe/Helsinki',      // Finland
        '46': 'Europe/Stockholm',      // Sweden
        '47': 'Europe/Oslo',           // Norway
        '45': 'Europe/Copenhagen',     // Denmark
        '31': 'Europe/Amsterdam',      // Netherlands
        '32': 'Europe/Brussels',       // Belgium
        '41': 'Europe/Zurich',         // Switzerland
        '43': 'Europe/Vienna',         // Austria
        '36': 'Europe/Budapest',       // Hungary
        '48': 'Europe/Warsaw',         // Poland
        '420': 'Europe/Prague',        // Czech Republic
        '381': 'Europe/Belgrade',      // Serbia
        '385': 'Europe/Zagreb',        // Croatia
        '351': 'Europe/Lisbon',        // Portugal
        '353': 'Europe/Dublin',        // Ireland
        '30': 'Europe/Athens',         // Greece
        '40': 'Europe/Bucharest',      // Romania
        '370': 'Europe/Vilnius',       // Lithuania
        '371': 'Europe/Riga',          // Latvia
        '372': 'Europe/Tallinn',       // Estonia
        '52': 'America/Mexico_City',   // Mexico
        '54': 'America/Argentina/Buenos_Aires', // Argentina
        '56': 'America/Santiago',      // Chile
        '57': 'America/Bogota',        // Colombia
        '58': 'America/Caracas',       // Venezuela
        '51': 'America/Lima',          // Peru
        '593': 'America/Guayaquil',    // Ecuador
        '507': 'America/Panama',       // Panama
        '506': 'America/Costa_Rica',   // Costa Rica
        '502': 'America/Guatemala',    // Guatemala
        '504': 'America/Tegucigalpa',  // Honduras
        '503': 'America/El_Salvador',  // El Salvador
        '505': 'America/Managua',      // Nicaragua
        '27': 'Africa/Johannesburg',   // South Africa
        '234': 'Africa/Lagos',         // Nigeria
        '225': 'Africa/Abidjan',       // Ivory Coast (Côte d'Ivoire)
        '254': 'Africa/Nairobi',       // Kenya
        '212': 'Africa/Casablanca',    // Morocco
        '216': 'Africa/Tunis',         // Tunisia
        '213': 'Africa/Algiers',       // Algeria
        '218': 'Africa/Tripoli',       // Libya
        '220': 'Africa/Banjul',        // Gambia
        '221': 'Africa/Dakar',         // Senegal
        '233': 'Africa/Accra',         // Ghana
        '241': 'Africa/Libreville',    // Gabon
        '237': 'Africa/Douala',        // Cameroon
        '257': 'Africa/Bujumbura',     // Burundi
        '250': 'Africa/Kigali',        // Rwanda
        '263': 'Africa/Harare',        // Zimbabwe
        '264': 'Africa/Windhoek',      // Namibia
        '267': 'Africa/Gaborone',      // Botswana
        '268': 'Africa/Mbabane',       // Eswatini
        '354': 'Atlantic/Reykjavik',   // Iceland
        '64': 'Pacific/Auckland',      // New Zealand
        '689': 'Pacific/Tahiti',       // French Polynesia
        '687': 'Pacific/Noumea',       // New Caledonia
        '682': 'Pacific/Rarotonga',    // Cook Islands
        '679': 'Pacific/Fiji',         // Fiji
        '685': 'Pacific/Apia',         // Samoa
        '686': 'Pacific/Tarawa',       // Kiribati
        '691': 'Pacific/Pohnpei',      // Micronesia
        '692': 'Pacific/Majuro',       // Marshall Islands
        // Add more as needed
    };

    try {
        const phoneNumber = jid.split('@')[0];
        const sortedCodes = Object.keys(countryCodeToTimezone)
            .sort((a, b) => b.length - a.length);

        let timezone = 'Asia/Kolkata';
        for (const code of sortedCodes) {
            if (phoneNumber.startsWith(code)) {
                timezone = countryCodeToTimezone[code];
                break;
            }
        }

        const options = {
            timeZone: timezone,
            hour12: true,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        const formattedDateTime = new Date().toLocaleString('en-IN', options);
        let [date, time] = formattedDateTime.split(',');

        return {
            date: date.trim(),
            time: time.trim(),
            timezone
        };

    } catch (error) {
        console.error('Error in getLocalDateTime:', error);
        return {
            date: '',
            time: '',
            timezone: 'Asia/Kolkata'
        };
    }
}

module.exports = { getTimeByJid };
