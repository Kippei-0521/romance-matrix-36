export type Question = {
    id: number;
    text: string;
    traitX: Record<string, number>; // Weights for Core Value (X-axis)
    traitY: Record<string, number>; // Weights for Relationship Style (Y-axis)
};

export type PersonalityType = {
    id: string;
    name: string;
    emoji: string;
    characterName: string;
    imagePath: string;
    description: string;
    innerPsychology: string; // New: Deep psychological insight
    shadowSide: string; // New: Weaknesses and "traps"
    behavior: string;
    idealPartner: string;
    advice: string;
    color: string;
    bestMatchId: string;
    worstMatchId: string;
    coordinate: { x: string; y: string };
};

// Axes definitions for the 36-type matrix
export const X_AXES = ["Romantic", "Analytical", "Independent", "Altruistic", "Enigmatic", "Vibrant"] as const;
export const Y_AXES = ["Traditional", "Modern", "Casual", "Formal", "Creative", "Stoic"] as const;

export type XAxis = typeof X_AXES[number];
export type YAxis = typeof Y_AXES[number];

const X_DETAILS: Record<XAxis, { name: string; emoji: string; color: string }> = {
    Romantic: { name: "情熱", emoji: "💖", color: "#ff85a1" },
    Analytical: { name: "知性", emoji: "🌙", color: "#a0c4ff" },
    Independent: { name: "自由", emoji: "🦋", color: "#ffd6a5" },
    Altruistic: { name: "献身", emoji: "🍪", color: "#bdb2ff" },
    Enigmatic: { name: "神秘", emoji: "🔮", color: "#ffc6ff" },
    Vibrant: { name: "活力", emoji: "☀️", color: "#fdffb6" },
};

const Y_DETAILS: Record<YAxis, { name: string }> = {
    Traditional: { name: "王道スタイル" },
    Modern: { name: "都会的スタイル" },
    Casual: { name: "自然体スタイル" },
    Formal: { name: "礼節スタイル" },
    Creative: { name: "刺激的スタイル" },
    Stoic: { name: "ストイックスタイル" },
};

// Character Image Fallbacks (since we have 6 base characters)
const getFallbackImage = (x: XAxis) => {
    const map: Record<XAxis, string> = {
        Romantic: "/images/romantic-dreamer.png",
        Analytical: "/images/calm-observer.png",
        Independent: "/images/free-spirit.png",
        Altruistic: "/images/devoted-supporter.png",
        Enigmatic: "/images/mystery-charmer.png",
        Vibrant: "/images/energetic-sun.png",
    };
    return map[x];
};

// Psychological building blocks for X (Core Value)
const X_PSYCHOLOGY: Record<XAxis, { essence: string; desire: string; fear: string }> = {
    Romantic: { essence: "感情の絶対性", desire: "運命的な一体感", fear: "平庸な日常" },
    Analytical: { essence: "客観的秩序", desire: "完全な理解と予測", fear: "感情による制御不能" },
    Independent: { essence: "自己の拡張", desire: "未知への飽くなき探求", fear: "静止と束縛" },
    Altruistic: { essence: "共生と調和", desire: "誰かの不可欠な一部になること", fear: "無価値感と孤立" },
    Enigmatic: { essence: "精神的越境", desire: "深淵なる真理の共有", fear: "通俗的な理解" },
    Vibrant: { essence: "生命の輝き", desire: "他者の解像度を上げること", fear: "エネルギーの枯渇" },
};

// Psychological building blocks for Y (Style)
const Y_PSYCHOLOGY: Record<YAxis, { mode: string; defense: string; trap: string }> = {
    Traditional: { mode: "普遍的な形式", defense: "既知のルール", trap: "変化への拒絶" },
    Modern: { mode: "洗練された記号", defense: "都会的な距離感", trap: "表面的な空虚" },
    Casual: { mode: "無加工の自己", defense: "ユーモアと親しみ", trap: "踏み込みの欠如" },
    Formal: { mode: "敬意の象徴", defense: "高度な礼節", trap: "感情の抑圧" },
    Creative: { mode: "破壊と創造", defense: "変化し続ける自分", trap: "継続の放棄" },
    Stoic: { mode: "克己的修練", defense: "沈黙と忍耐", trap: "孤独への埋没" },
};

const UNIQUE_CHARACTERS: Record<string, string> = {
    "romantic-traditional": "純愛の騎士",
    "romantic-modern": "都会の恋仲",
    "romantic-casual": "放浪の詩人",
    "romantic-formal": "気高き求愛者",
    "romantic-creative": "夢幻の演出家",
    "romantic-stoic": "孤独な情熱家",
    "analytical-traditional": "知の守護者",
    "analytical-modern": "論理の設計士",
    "analytical-casual": "冷徹な観察者",
    "analytical-formal": "冷徹な審判",
    "analytical-creative": "異端の予言者",
    "analytical-stoic": "硬質の求道者",
    "independent-traditional": "孤高の覇者",
    "independent-modern": "自由の開拓者",
    "independent-casual": "風の旅人",
    "independent-formal": "誇り高き策士",
    "independent-creative": "変幻の改革者",
    "independent-stoic": "沈黙の哲学者",
    "altruistic-traditional": "慈愛の聖者",
    "altruistic-modern": "共感の支援者",
    "altruistic-casual": "陽だまりの奏者",
    "altruistic-formal": "献身の執事",
    "altruistic-creative": "希望の導き手",
    "altruistic-stoic": "不屈の守護神",
    "enigmatic-traditional": "深淵の語り部",
    "enigmatic-modern": "幻影の魔術師",
    "enigmatic-casual": "浮世の傍観者",
    "enigmatic-formal": "氷の支配者",
    "enigmatic-creative": "千の顔を持つ者",
    "enigmatic-stoic": "月影の潜伏者",
    "vibrant-traditional": "黄金の指導者",
    "vibrant-modern": "時代の寵児",
    "vibrant-casual": "太陽の遊び人",
    "vibrant-formal": "祝祭の主賓",
    "vibrant-creative": "光の共鳴者",
    "vibrant-stoic": "不滅の冒険家"
};

const CHARACTER_VISUALS: Record<string, { symbol: string; pattern: string; colorSecondary: string }> = {
    "romantic-traditional": { symbol: "Sword", pattern: "Shield", colorSecondary: "#ff4d6d" },
    "romantic-modern": { symbol: "Heads", pattern: "City", colorSecondary: "#ff758f" },
    "romantic-casual": { symbol: "Feather", pattern: "Wind", colorSecondary: "#ff85a1" },
    "romantic-formal": { symbol: "Crown", pattern: "Silk", colorSecondary: "#c9184a" },
    "romantic-creative": { symbol: "Sparkles", pattern: "Stars", colorSecondary: "#ffb3c1" },
    "romantic-stoic": { symbol: "Flame", pattern: "Ash", colorSecondary: "#a4161a" },
    "analytical-traditional": { symbol: "Library", pattern: "Scroll", colorSecondary: "#0077b6" },
    "analytical-modern": { symbol: "Cpu", pattern: "Grid", colorSecondary: "#00b4d8" },
    "analytical-casual": { symbol: "Eye", pattern: "Mist", colorSecondary: "#90e0ef" },
    "analytical-formal": { symbol: "Gavel", pattern: "Law", colorSecondary: "#03045e" },
    "analytical-creative": { symbol: "Zap", pattern: "Pulse", colorSecondary: "#caf0f8" },
    "analytical-stoic": { symbol: "Diamond", pattern: "Stone", colorSecondary: "#023e8a" },
    "independent-traditional": { symbol: "Mountain", pattern: "Peak", colorSecondary: "#fb8500" },
    "independent-modern": { symbol: "Rocket", pattern: "Space", colorSecondary: "#ffb703" },
    "independent-casual": { symbol: "Compass", pattern: "Map", colorSecondary: "#8ecae6" },
    "independent-formal": { symbol: "ScrollText", pattern: "Ink", colorSecondary: "#219ebc" },
    "independent-creative": { symbol: "Palette", pattern: "Paint", colorSecondary: "#023047" },
    "independent-stoic": { symbol: "Book", pattern: "Pages", colorSecondary: "#000000" },
    "altruistic-traditional": { symbol: "Church", pattern: "Light", colorSecondary: "#7209b7" },
    "altruistic-modern": { symbol: "Users", pattern: "Network", colorSecondary: "#3a0ca3" },
    "altruistic-casual": { symbol: "Coffee", pattern: "Steam", colorSecondary: "#4361ee" },
    "altruistic-formal": { symbol: "Key", pattern: "Lock", colorSecondary: "#4cc9f0" },
    "altruistic-creative": { symbol: "Sun", pattern: "Rays", colorSecondary: "#f72585" },
    "altruistic-stoic": { symbol: "ShieldCheck", pattern: "Armor", colorSecondary: "#b5179e" },
    "enigmatic-traditional": { symbol: "Scroll", pattern: "Ancient", colorSecondary: "#3c096c" },
    "enigmatic-modern": { symbol: "Wand", pattern: "Magic", colorSecondary: "#5a189a" },
    "enigmatic-casual": { symbol: "Masks", pattern: "Shadow", colorSecondary: "#7b2cbf" },
    "enigmatic-formal": { symbol: "Snowflake", pattern: "Ice", colorSecondary: "#9d4edd" },
    "enigmatic-creative": { symbol: "Ghost", pattern: "Spirit", colorSecondary: "#c77dff" },
    "enigmatic-stoic": { symbol: "Moon", pattern: "Night", colorSecondary: "#240046" },
    "vibrant-traditional": { symbol: "Trophy", pattern: "Gold", colorSecondary: "#ff9f1c" },
    "vibrant-modern": { symbol: "Music", pattern: "Vinyl", colorSecondary: "#ffbf69" },
    "vibrant-casual": { symbol: "Gamepad", pattern: "Pixels", colorSecondary: "#ffffff" },
    "vibrant-formal": { symbol: "GlassWater", pattern: "Toast", colorSecondary: "#2ec4b6" },
    "vibrant-creative": { symbol: "Lightbulb", pattern: "Idea", colorSecondary: "#cbf3f0" },
    "vibrant-stoic": { symbol: "Footprints", pattern: "Path", colorSecondary: "#ff5400" }
};

export const personalityTypes: Record<string, PersonalityType> = {};

// Generate 36 Types with sophisticated long-form content
X_AXES.forEach((x, xIdx) => {
    Y_AXES.forEach((y, yIdx) => {
        const id = `${x.toLowerCase()}-${y.toLowerCase()}`;
        const xInfo = X_PSYCHOLOGY[x];
        const yInfo = Y_PSYCHOLOGY[y];
        const xDetail = X_DETAILS[x];
        const yDetail = Y_DETAILS[y];
        const visual = CHARACTER_VISUALS[id] || { symbol: "User", pattern: "Circles", colorSecondary: "#cccccc" };

        personalityTypes[id] = {
            id,
            name: `${xDetail.name}の${yDetail.name}`,
            emoji: xDetail.emoji,
            characterName: UNIQUE_CHARACTERS[id] || `${xDetail.name}の執行官`,
            imagePath: getFallbackImage(x), // Kept for backward compatibility, but we use SVG now
            description: `あなたは「${xInfo.essence}」を魂の核に持ちながら、現実世界では「${yInfo.mode}」というドレスを纏って愛を語るタイプです。人々はあなたの${yDetail.name}に惹かれますが、その奥に潜む${xDetail.name}の深淵を知った時、真の衝撃を受けることになります。`,
            innerPsychology: `あなたの内面では、常に「${xInfo.desire}」という渇望が渦巻いています。恋愛において、あなたは単なるパートナーシップ以上のものを求めています。それは魂の交感であり、世界が反転するような体験です。しかし、同時に「${xInfo.fear}」という根源的な恐怖が、あなたに慎重さを強いています。この二律背反が、あなたの醸し出す独特の「重み」の正体です。`,
            shadowSide: `あなたの「${yInfo.defense}」という防御反応は、時に牙を剥きます。関係が停滞したとき、あなたは無意識のうちに「${yInfo.trap}」という罠に自ら落ちる傾向があります。相手があなたの複雑さを理解できないとき、あなたは独りで迷宮に籠もってしまいます。この孤独なスパイラルから抜け出すには、形式よりも生身の感情を優先する勇気が必要です。`,
            behavior: `・${xDetail.name}から導き出された独自の美学を、${yDetail.name}の中で密かに貫く。\n・「${yInfo.mode}」を完璧に演じることで、自分の${xInfo.essence}を外部から守ろうとする。\n・実は言葉よりも「沈黙の質」で相手の深度を測っている。`,
            idealPartner: `あなたの${yDetail.name}という仮面を面白がりながら、その下にある${xDetail.name}という熱波を恐れずに受け止められる人。あなたの「${xInfo.fear}」を優しく解きほぐし、「${xInfo.desire}」を共に叶えてくれる成熟した魂が相応しいでしょう。`,
            advice: `あなたは十分に特別です。${yInfo.mode}に頼りすぎず、あなたの不完全な${xInfo.essence}をそのまま差し出してください。それこそが、相手が最も求めている「真実」なのです。`,
            color: xDetail.color,
            bestMatchId: `altruistic-casual`,
            worstMatchId: `analytical-stoic`,
            coordinate: { x, y }
        };
        // Add visual metadata to the object for use in CharacterAvatar
        (personalityTypes[id] as any).visual = visual;
    });
});

export const questions: Question[] = [
    // Value Questions (X-Axis)
    { id: 1, text: "理想のデートは、映画のようなロマンチックな演出があるものだ。", traitX: { Romantic: 2, Analytical: -1 }, traitY: {} },
    { id: 2, text: "恋人とは毎日欠かさず連絡を取り合い、些細なことでも共有したい。", traitX: { Altruistic: 2, Independent: -1 }, traitY: {} },
    { id: 3, text: "一人の時間がないと、ストレスが溜まってしまうタイプだ。", traitX: { Independent: 2, Altruistic: -1 }, traitY: {} },
    { id: 4, text: "決断を下す際、直感よりもデータを重視する傾向がある。", traitX: { Analytical: 2, Romantic: -1 }, traitY: {} },
    { id: 5, text: "自分の性格を、どちらかと言えば「ミステリアス」だと思っている。", traitX: { Enigmatic: 2, Vibrant: -1 }, traitY: {} },
    { id: 6, text: "周りをパッと明るくするエネルギーに溢れている自覚がある。", traitX: { Vibrant: 2, Enigmatic: -1 }, traitY: {} },
    { id: 7, text: "将来、結婚して温かい家庭を持つことに強い憧れがある。", traitX: { Altruistic: 1, Romantic: 1 }, traitY: { Traditional: 1 } },
    { id: 8, text: "自分の「夢」を叶えるためなら、多少の犠牲は厭わない強さがある。", traitX: { Vibrant: 1, Independent: 1 }, traitY: { Stoic: 1 } },
    { id: 9, text: "困っている人がいたら、たとえ自分が忙しくても助けを差し出す。", traitX: { Altruistic: 2 }, traitY: {} },
    { id: 10, text: "自分の持ち物や服装には、強いこだわりやオリジナリティを持ちたい。", traitX: { Enigmatic: 1, Independent: 1 }, traitY: { Creative: 1 } },
    { id: 11, text: "常に冷静で、感情的になることはほとんどない。", traitX: { Analytical: 2 }, traitY: { Stoic: 1 } },
    { id: 12, text: "初対面の人ともすぐに仲良くなれる自信がある。", traitX: { Vibrant: 2 }, traitY: { Casual: 1 } },

    // Approach Questions (Y-Axis)
    { id: 13, text: "恋愛においては、古風で王道なステップをしっかり踏みたい。", traitX: {}, traitY: { Traditional: 2, Modern: -1 } },
    { id: 14, text: "最新のトレンドや、都会的で洗練されたデートを好む方だ。", traitX: {}, traitY: { Modern: 2, Traditional: -1 } },
    { id: 15, text: "気取らない、自然体でいられる関係性が一番理想的だ。", traitX: {}, traitY: { Casual: 2, Formal: -1 } },
    { id: 16, text: "礼儀やマナー、言葉遣いには厳しいほうだと思う。", traitX: {}, traitY: { Formal: 2, Casual: -1 } },
    { id: 17, text: "常に新しい刺激や、予想外の展開を恋愛に求めたい。", traitX: {}, traitY: { Creative: 2, Stoic: -1 } },
    { id: 18, text: "自分にも相手にも厳しく、自律した関係を築きたい。", traitX: {}, traitY: { Stoic: 2, Creative: -1 } },
    { id: 19, text: "デートプランは自分がきっちり立てるのが当たり前だと思う。", traitX: { Analytical: 1 }, traitY: { Traditional: 1, Formal: 1 } },
    { id: 20, text: "相手に合わせるよりも、お互いに自由でいたい派だ。", traitX: { Independent: 1 }, traitY: { Casual: 1, Modern: 1 } },
    { id: 21, text: "時には大胆なサプライズで、相手を驚かせるのが好きだ。", traitX: { Romantic: 1 }, traitY: { Creative: 2 } },
    { id: 22, text: "流行り物にはあまり興味がなく、自分たちの定番を大切にしたい。", traitX: { Enigmatic: 1 }, traitY: { Traditional: 1, Stoic: 1 } },
    { id: 23, text: "何事もスマートに、無駄なく進めたいと考える。", traitX: { Analytical: 1 }, traitY: { Modern: 1, Formal: 1 } },
    { id: 24, text: "深い話よりも、一緒に笑い転げている時間の方が大切だ。", traitX: { Vibrant: 1 }, traitY: { Casual: 2 } },
    { id: 25, text: "一生をかけて一人の人を愛し抜く自信がある。", traitX: { Altruistic: 1, Romantic: 1 }, traitY: { Traditional: 1, Stoic: 1 } },
];
