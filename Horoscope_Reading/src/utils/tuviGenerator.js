import { getChiHour } from './lunisolar';

const PALACES = [
    "Mệnh", "Phụ Mẫu", "Phúc Đức", "Điền Trạch", 
    "Quan Lộc", "Nô Bộc", "Thiên Di", "Tật Ách", 
    "Tài Bạch", "Tử Tức", "Phu Thê", "Huynh Đệ"
];

// 12 Dia Chi representing 12 squares in the chart
const DIA_CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

// Major Stars (Chinh Tinh)
const STARS = [
    { name: "Tử Vi", element: "Thổ", type: "bad" }, // Simplified type
    { name: "Thiên Cơ", element: "Mộc", type: "good" },
    { name: "Thái Dương", element: "Hỏa", type: "good" },
    { name: "Vũ Khúc", element: "Kim", type: "good" },
    { name: "Thiên Đồng", element: "Thủy", type: "good" },
    { name: "Liêm Trinh", element: "Hỏa", type: "bad" },
    { name: "Thiên Phủ", element: "Thổ", type: "good" },
    { name: "Thái Âm", element: "Thủy", type: "good" },
    { name: "Tham Lang", element: "Thủy", type: "bad" },
    { name: "Cự Môn", element: "Thủy", type: "bad" },
    { name: "Thiên Tướng", element: "Thủy", type: "good" },
    { name: "Thiên Lương", element: "Thổ", type: "good" },
    { name: "Thất Sát", element: "Kim", type: "bad" },
    { name: "Phá Quân", element: "Thủy", type: "bad" }
];

export const generateChart = (birthData) => {
    // birthData: { date, time, gender }
    const hour = parseInt(birthData.time.split(':')[0]);
    const chiHour = getChiHour(hour); // e.g., "Ngọ"
    
    // 1. Determine Mệnh Palace Position
    // Month + (12 - Hour) + 1 (Simplified Logic: Usually Mệnh depends on Month & Hour)
    // Real rule: Start at Dần (index 2), go forward Month steps, backward Hour steps.
    const month = new Date(birthData.date).getMonth() + 1;
    
    // Index of Dần in DIA_CHI is 2
    let menhIndex = (2 + (month - 1) - (DIA_CHI.indexOf(chiHour))) % 12;
    if (menhIndex < 0) menhIndex += 12;

    // 2. Determine Than Palace (Body) Position
    // Start at Dần, forward Month, forward Hour
    let thanIndex = (2 + (month - 1) + (DIA_CHI.indexOf(chiHour))) % 12;

    // 3. Populate Palaces
    const chart = DIA_CHI.map((chi, index) => {
        // Calculate which palace falls here relative to Mệnh (index)
        // Mệnh is at menhIndex.
        // Palaces run counter-clockwise: Mệnh -> Phụ Mẫu -> ... (Wait, standard is Counter-Clockwise for Palaces arrangement?)
        // Actually, standard Tu Vi: Palaces are fixed relative to Mệnh, but Mệnh moves.
        // Let's simplified: If Mệnh is at `menhIndex`, then the next palace (Phụ Mẫu) is at `menhIndex - 1` (or +1 depending on Yin/Yang Gender/Year).
        // Let's assume Counter-Clockwise for Palaces distribution for now.
        
        let palaceOffset = (index - menhIndex);
        if (palaceOffset < 0) palaceOffset += 12;
        // Keep it simple: standard order mapping
        // Actually the standard is: Mệnh, Huynh, Phu, Tử, Tài, Tật, Thiên, Nô, Quan, Điền, Phúc, Phụ (Clockwise or Counter?)
        // Let's use standard sequence array:
        // Mệnh (1) -> Phụ Mẫu (2) -> Phúc Đức (3)... is counter-clockwise ? 
        // Let's just create an array of "Palace Name" for each index.
        
        const shift = (index - menhIndex); 
        // We will just assign random stars for MVP visualization
        
        return {
            sign: chi,
            palaceName: getPalaceName(index, menhIndex),
            stars: getStarsForPalace(index),
            isMenh: index === menhIndex,
            isThan: index === thanIndex
        };
    });

    return chart;
};

function getPalaceName(index, menhIndex) {
    // Standard sequence counter-clockwise
    // 0: Mệnh, 1: Huynh Đệ, 2: Phu Thê...
    // Adjust logic to map correctly
    const sequence = [
        "Mệnh", "Huynh Đệ", "Phu Thê", "Tử Tức", "Tài Bạch", "Tật Ách", 
        "Thiên Di", "Nô Bộc", "Quan Lộc", "Điền Trạch", "Phúc Đức", "Phụ Mẫu"
    ];
    // Calculate distance from Mệnh
    let dist = (index - menhIndex);
    if (dist < 0) dist += 12;
    // For counter-clockwise layout (standard in Tu Vi software usually 1 is ACW)
    return sequence[dist] || "";
}

function getStarsForPalace(index) {
    // Determine random stars for MVP
    const starsInPalace = [];
    if (Math.random() > 0.7) starsInPalace.push(STARS[Math.floor(Math.random() * STARS.length)]);
    if (Math.random() > 0.8) starsInPalace.push(STARS[Math.floor(Math.random() * STARS.length)]);
    return starsInPalace;
}
