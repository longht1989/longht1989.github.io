// Simplified Lunisolar interactions for MVP
// In a production app, use 'lunar-javascript' or similar library.

const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

export const getCanChiYear = (year) => {
    const can = CAN[(year + 6) % 10];
    const chi = CHI[(year + 8) % 12];
    return `${can} ${chi}`;
};

// Simple mock mapping for month/day to Lunar (NOT ACCURATE - specific algorithm needed for real conversion)
// For MVP visualization purposes, we assume Lunar Month ~ Solar Month - 1
export const solarToLunarSimple = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1; // 1-12
    const year = d.getFullYear();

    // Mock logic: Lunar date is roughly 30 days behind solar in some years, or just mapping directly
    // Real algorithm requires table lookup. 
    // We will return a struct that looks like a Lunar Date.
    
    let lunarMonth = month - 1;
    if (lunarMonth === 0) lunarMonth = 12;
    let lunarDay = day; 
    let lunarYear = year; // simplified

    return {
        day: lunarDay,
        month: lunarMonth,
        year: lunarYear,
        canChiYear: getCanChiYear(year),
        // Randomly assigning Can/Chi for day/month or simple logic
        canChiMonth: "Giáp Dần", // placeholder
        canChiDay: "Ất Mão"     // placeholder
    };
};

export const getChiHour = (hour) => {
    // 23-1: Tý, 1-3: Sửu...
    if (hour >= 23 || hour < 1) return CHI[0];
    if (hour < 3) return CHI[1];
    if (hour < 5) return CHI[2];
    if (hour < 7) return CHI[3];
    if (hour < 9) return CHI[4];
    if (hour < 11) return CHI[5];
    if (hour < 13) return CHI[6];
    if (hour < 15) return CHI[7];
    if (hour < 17) return CHI[8];
    if (hour < 19) return CHI[9];
    if (hour < 21) return CHI[10];
    return CHI[11];
};
