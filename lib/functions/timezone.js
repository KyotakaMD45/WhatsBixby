/* Copyright (C) 2025 Codex.
Licensed under the MIT License;
you may not use this file except in compliance with the License.
Codex - Ziyan
*/

function getTimeByJid(jid) {
    const countryCodeToTimezone = {
        '1': 'America/New_York',
        '91': 'Asia/Kolkata',
        '44': 'Europe/London',
        '81': 'Asia/Tokyo',
        '86': 'Asia/Shanghai',
        '33': 'Europe/Paris',
        '49': 'Europe/Berlin',
        '7': 'Europe/Moscow',
        '61': 'Australia/Sydney',
        '55': 'America/Sao_Paulo',
        '92': 'Asia/Karachi',
        '20': 'Africa/Cairo',
        '90': 'Europe/Istanbul',
        '39': 'Europe/Rome',
        '34': 'Europe/Madrid',
        '82': 'Asia/Seoul',
        '65': 'Asia/Singapore',
        '60': 'Asia/Kuala_Lumpur',
        '63': 'Asia/Manila',
        '66': 'Asia/Bangkok',
        '84': 'Asia/Ho_Chi_Minh',
        '62': 'Asia/Jakarta',
        '971': 'Asia/Dubai',
        '966': 'Asia/Riyadh',
        '973': 'Asia/Bahrain',
        '968': 'Asia/Muscat',
        '974': 'Asia/Qatar',
        '965': 'Asia/Kuwait',
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
