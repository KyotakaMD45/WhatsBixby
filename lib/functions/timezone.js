/**
 * Retrieves date and time based on the country code from WhatsApp JID
 * @param {string} jid - WhatsApp JID (e.g., "919446072492@s.whatsapp.net")
 * @returns {Object} An object containing date, time, timezone, and countryCode
 */
function getDateTimeByJid(jid) {
    // Mapping of country calling codes to timezones
    const countryCodeToTimezone = {
        '1': 'America/New_York',    // US/Canada
        '91': 'Asia/Kolkata',       // India
        '44': 'Europe/London',      // UK
        '81': 'Asia/Tokyo',         // Japan
        '86': 'Asia/Shanghai',      // China
        '33': 'Europe/Paris',       // France
        '49': 'Europe/Berlin',      // Germany
        '7': 'Europe/Moscow',      // Russia
        '61': 'Australia/Sydney',  // Australia
        '55': 'America/Sao_Paulo',  // Brazil
        // Add more mappings as needed
    };

    try {
        // Extract phone number from JID
        const phoneNumber = jid.split('@')[0];
        
        // Determine country code (simplified approach)
        let countryCode, timezone;
        
        // Check for known country calling codes
        if (phoneNumber.startsWith('1')) {
            countryCode = '1';
        } else if (phoneNumber.startsWith('91')) {
            countryCode = '91';
        } else if (phoneNumber.startsWith('44')) {
            countryCode = '44';
        } else if (phoneNumber.startsWith('81')) {
            countryCode = '81';
        } else if (phoneNumber.startsWith('86')) {
            countryCode = '86';
        } else {
            // Default to India if country code not recognized
            countryCode = '91';
        }
        
        // Get timezone from our mapping
        timezone = countryCodeToTimezone[countryCode] || 'Asia/Kolkata';
        
        // Format options for date and time
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
        
        // Format date and time
        const formattedDateTime = new Date().toLocaleString('en-IN', options);
        let [date, time] = formattedDateTime.split(',');
        
        // Clean up any extra spaces
        date = date.trim();
        time = time.trim();
        
        return { 
            date, 
            time, 
            timezone, 
            countryCode: countryCode === '1' ? 'US' : 
                        countryCode === '91' ? 'IN' :
                        countryCode === '44' ? 'GB' :
                        countryCode === '81' ? 'JP' :
                        countryCode === '86' ? 'CN' : 'IN' 
        };
    } catch (error) {
        console.error('Error in getDateTimeByCountryCode:', error);
        // Return default values (India) in case of error
        const formattedDateTime = new Date().toLocaleString('en-IN').split(',');
        return {
            date: formattedDateTime[0].trim(),
            time: formattedDateTime[1].trim(),
            timezone: 'Asia/Kolkata',
            countryCode: 'IN'
        };
    }
}
module.exports = { getDateTimeByJid };
