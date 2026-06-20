/**
 * vastuData.js — Vastu Shastra reference data
 *
 * Sources cross-checked:
 *  1. appliedvastu.com/vastu-directions
 *  2. astrosight.ai/vastu/importance-8-directions-vastu
 *  3. subhavaastu.com, astroyogi.com/vastu/directions
 *  4. houseyog.com (staircase), bonito.in (staircase)
 *  5. coohom.com/article/room-position-as-per-vastu-practical-guide-for-home-harmony
 *
 * ⚠️ Conflict notes are marked with [CONFLICT] inline.
 * The most commonly cited rule across 3+ sources is used as default.
 */

// ─── 8 Vastu Directions ──────────────────────────────────────────────────────
// Each direction: deity (Ashta-Dikpala), element (Pancha Bhuta), degree midpoint,
// symbolic quality, and the colours traditionally associated.

export const DIRECTIONS = [
  {
    id: 'N',
    label: 'North',
    labelShort: 'N',
    degrees: 0,
    deity: 'Kubera',
    deityRole: 'God of Wealth',
    element: 'Water',
    elementSymbol: '💧',
    quality: 'Prosperity & Abundance',
    color: '#3B82F6',        // blue — Water
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-700',
    borderClass: 'border-blue-300',
  },
  {
    id: 'NE',
    label: 'North-East',
    labelShort: 'NE',
    degrees: 45,
    deity: 'Ishanya (Shiva)',
    deityRole: 'God of Wisdom & Spirituality',
    element: 'Water + Space',
    elementSymbol: '✨',
    quality: 'Spiritual Energy & Clarity',
    color: '#6366F1',        // indigo — spiritual
    bgClass: 'bg-indigo-50',
    textClass: 'text-indigo-700',
    borderClass: 'border-indigo-300',
  },
  {
    id: 'E',
    label: 'East',
    labelShort: 'E',
    degrees: 90,
    deity: 'Indra',
    deityRole: 'God of Prosperity & Rain',
    element: 'Air',
    elementSymbol: '🌬️',
    quality: 'New Beginnings & Light',
    color: '#F59E0B',        // amber — sunrise
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-700',
    borderClass: 'border-amber-300',
  },
  {
    id: 'SE',
    label: 'South-East',
    labelShort: 'SE',
    degrees: 135,
    deity: 'Agni',
    deityRole: 'God of Fire',
    element: 'Fire',
    elementSymbol: '🔥',
    quality: 'Energy & Transformation',
    color: '#EF4444',        // red — fire
    bgClass: 'bg-red-50',
    textClass: 'text-red-700',
    borderClass: 'border-red-300',
  },
  {
    id: 'S',
    label: 'South',
    labelShort: 'S',
    degrees: 180,
    deity: 'Yama',
    deityRole: 'God of Death & Dharma',
    element: 'Earth',
    elementSymbol: '🌍',
    quality: 'Strength & Stability',
    color: '#78716C',        // stone — earth/south
    bgClass: 'bg-stone-50',
    textClass: 'text-stone-700',
    borderClass: 'border-stone-300',
  },
  {
    id: 'SW',
    label: 'South-West',
    labelShort: 'SW',
    degrees: 225,
    deity: 'Nirriti',
    deityRole: 'Deity of Endings & Ancestors',
    element: 'Earth',
    elementSymbol: '⛰️',
    quality: 'Stability & Grounding',
    color: '#92400E',        // brown — heavy earth
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-900',
    borderClass: 'border-amber-400',
  },
  {
    id: 'W',
    label: 'West',
    labelShort: 'W',
    degrees: 270,
    deity: 'Varuna',
    deityRole: 'God of Water & Gains',
    element: 'Air',
    elementSymbol: '🌊',
    quality: 'Gains & Completion',
    color: '#0EA5E9',        // sky blue — water/varuna
    bgClass: 'bg-sky-50',
    textClass: 'text-sky-700',
    borderClass: 'border-sky-300',
  },
  {
    id: 'NW',
    label: 'North-West',
    labelShort: 'NW',
    degrees: 315,
    deity: 'Vayu',
    deityRole: 'God of Wind & Movement',
    element: 'Air',
    elementSymbol: '💨',
    quality: 'Movement & Social Connections',
    color: '#10B981',        // emerald — wind/air
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700',
    borderClass: 'border-emerald-300',
  },
]

// ─── Room Definitions ─────────────────────────────────────────────────────────
// Each room has:
//   ideal[]     — direction IDs that score 100
//   acceptable[]— direction IDs that score 60
//   avoid[]     — direction IDs that score 0  (unlisted = 30 "neutral/not recommended")
//   reasoning   — why the ideal directions work
//   remedy      — general, non-prescriptive fix when room can't be moved

export const ROOMS = [
  {
    id: 'entrance',
    label: 'Main Entrance',
    icon: '🚪',
    description: 'Front door / main entry point',
    ideal: ['N', 'NE', 'E'],
    acceptable: ['NW'],
    avoid: ['S', 'SW', 'SE'],
    // [CONFLICT]: Some sources list North as equally ideal; others rank NE highest.
    // Most sources (3/4) agree North & East are top tier; NE is universally positive.
    // SE is consistently flagged as inauspicious for main entrance.
    reasoning: 'North (Kubera — wealth), East (Indra — prosperity) and NE (Ishanya — blessings) are the three most auspicious directions for the main entrance. Morning sunlight from the East is also practically beneficial.',
    remedy: 'Hang a Namaste/Om symbol above the door. Place a Tulsi plant near the entrance. Use auspicious threshold artwork (Kolam/Rangoli). Ensure the area is well-lit and clutter-free to invite positive energy.',
    relocateSuggestion: 'If possible, shift or reframe the entrance to face North or East.',
  },
  {
    id: 'living',
    label: 'Living Room',
    icon: '🛋️',
    description: 'Main sitting / family gathering space',
    ideal: ['N', 'NE', 'E'],
    acceptable: ['NW'],
    avoid: ['SE', 'SW'],
    // [CONFLICT]: A few sources suggest West is also acceptable. Majority (3+) cite N/NE/E.
    reasoning: 'North and East allow morning light, beneficial air flow, and energy from Kubera/Indra. The social gathering space benefits from open, upward energies of these directions.',
    remedy: 'Keep the North and East walls lighter in colour. Avoid heavy furniture in NE corner. Use light blues, greens, or whites on walls. Add indoor plants in the NE or East.',
    relocateSuggestion: 'Reposition the primary seating arrangement toward the North or East wall.',
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: '🍳',
    description: 'Cooking area / fire zone',
    ideal: ['SE'],
    acceptable: ['NW'],
    avoid: ['NE', 'SW', 'N'],
    // Agni (fire) governs SE — universally agreed across all sources.
    // NW is listed as acceptable alternative by 2+ sources.
    // NE kitchen is consistently flagged as inauspicious (drains wealth energy per Ishan zone).
    reasoning: 'SE is governed by Agni, the fire deity — making it the natural home for the kitchen. Fire-related activities here create energetic alignment. NW (Vayu/air) is an acceptable alternative as air feeds fire.',
    remedy: 'If kitchen is misplaced, ensure the cooking stove faces East while cooking. Use red or orange accents near the stove area. Keep a copper vessel near the cooking zone. Maximise yellow/orange lighting.',
    relocateSuggestion: 'Ideally move cooking to the SE. If in SW, place the gas cylinder in the SE corner of the kitchen.',
  },
  {
    id: 'masterBed',
    label: 'Master Bedroom',
    icon: '🛏️',
    description: 'Primary sleeping room',
    ideal: ['SW'],
    acceptable: ['S', 'W'],
    avoid: ['NE', 'SE', 'N'],
    // SW is universally cited as the ideal master bedroom direction.
    // [CONFLICT]: Some sources say South is ideal; majority (4+) say SW for master.
    // NE master bedroom is consistently discouraged (disturbs the spiritual zone).
    reasoning: 'SW is governed by Nirriti — the zone of earth and stability. Heavy, restful sleep is promoted here. The dense earth energy grounds the occupants, promoting stability and longevity.',
    remedy: 'Ensure the bed head faces South or West while sleeping. Use earthy tones — ochre, brown, beige — on walls. Avoid mirrors opposite the bed. Keep the SW corner clutter-free.',
    relocateSuggestion: 'Place the bed in the SW zone of the room if the room itself cannot move.',
  },
  {
    id: 'childBed',
    label: 'Children\'s Bedroom',
    icon: '🧒',
    description: 'Kids\' room / growth zone',
    ideal: ['NW', 'W'],
    acceptable: ['N', 'E'],
    avoid: ['SW', 'SE'],
    // [CONFLICT]: Some sources prefer East for children; others cite NW.
    // Majority (3+) cite NW/West for children — movement, social, growth energies.
    // SW is discouraged (too heavy/stable for growing children).
    reasoning: 'NW (Vayu/Wind) encourages movement, growth, and social connections — qualities beneficial for children. West also supports gains and completion, helping with studies.',
    remedy: 'Use light, cheerful colours — pale yellow, light green, sky blue. Keep the room airy and well-lit from East. Place the study desk facing East or North.',
    relocateSuggestion: 'Assign the NW or W rooms to children.',
  },
  {
    id: 'pooja',
    label: 'Pooja / Prayer Room',
    icon: '🪔',
    description: 'Worship / meditation space',
    ideal: ['NE'],
    acceptable: ['N', 'E'],
    avoid: ['S', 'SW', 'SE', 'W'],
    // NE (Ishan/Ishanya) is universally agreed upon as the ideal zone for prayer.
    // [CONFLICT]: A small minority suggest East as equally ideal; majority strongly favour NE.
    reasoning: 'NE is governed by Ishanya (Shiva) and carries the highest spiritual energy in the Vastu grid (Ishan Kona). Placing the pooja room here aligns worship with divine cosmic energies and brings clarity.',
    remedy: 'If the pooja space is misplaced, create a small altar/shelf in the NE corner of any room. Face the deity idols East or West during prayer. Keep the space absolutely clean and well-lit.',
    relocateSuggestion: 'Even a dedicated shelf or altar in the NE corner of the living room serves the purpose.',
  },
  {
    id: 'bathroom',
    label: 'Bathroom / Toilet',
    icon: '🚿',
    description: 'Bathroom or toilet placement',
    ideal: ['NW', 'W'],
    acceptable: ['S'],
    avoid: ['NE', 'N', 'E'],
    // [CONFLICT]: Some older sources suggest SE for bathroom. Modern consensus (3+) strongly
    // recommends NW; NE bathroom is universally flagged as the worst placement.
    reasoning: 'NW (Vayu) provides natural ventilation and air flow, making it ideal for waste disposal areas. The NE zone must be kept pure and clutter-free — a bathroom here is considered particularly inauspicious.',
    remedy: 'Keep the toilet lid closed at all times. Place a small plant near the window. Use white or light grey tiles. Ensure strong ventilation. Avoid any idol or religious symbol near the bathroom.',
    relocateSuggestion: 'If bathroom is in NE, seal the toilet with heavy use of plants and ensure daily cleansing rituals.',
  },
  {
    id: 'staircase',
    label: 'Staircase',
    icon: '🪜',
    description: 'Internal staircase / stairs',
    ideal: ['SW', 'S', 'W'],
    acceptable: ['NW'],
    avoid: ['NE', 'N', 'E'],
    // Strong consensus across all sources: SW/S/W for staircases.
    // NE staircase is universally cited as inauspicious.
    reasoning: 'SW/South/West are heavy, stable zones that can bear the structural weight of a staircase. Stairs should ideally rise clockwise and have an odd number of steps. NE placement blocks positive energy flow.',
    remedy: 'If staircase is in NE, ensure it is very light/open, uses glass/metal, and maximise natural light. Avoid storage under the staircase.',
    relocateSuggestion: 'Structural staircases are best positioned in the South or SW zone.',
  },
  {
    id: 'study',
    label: 'Study / Home Office',
    icon: '📚',
    description: 'Study, reading, or work area',
    ideal: ['N', 'NE', 'E'],
    acceptable: ['W'],
    avoid: ['SW', 'SE', 'S'],
    // N (Kubera — knowledge/wealth), NE (Ishanya — wisdom) and E (sunrise focus) are
    // strongly recommended across 3+ sources.
    reasoning: 'North (Kubera — wealth and knowledge), NE (Ishanya — clarity and wisdom) and East (morning sunlight improving focus) are the most conducive zones for study and intellectual work.',
    remedy: 'Place the study desk facing East or North. Use green or yellow accents to stimulate the mind. Keep the study area well-lit and free of clutter. A small plant like money plant can enhance focus.',
    relocateSuggestion: 'Even if the room is in a less ideal direction, orient the study desk to face East.',
  },
  {
    id: 'dining',
    label: 'Dining Room',
    icon: '🍽️',
    description: 'Dining / eating area',
    ideal: ['W', 'E'],
    acceptable: ['N', 'NW'],
    avoid: ['SW', 'SE', 'NE'],
    // [CONFLICT]: Sources differ between West and East for dining.
    // West (Varuna — gains/satisfaction) is cited by majority (3+) as ideal for eating.
    // East is also frequently cited (auspicious, morning energy).
    // NE should be kept open/spiritual and is typically discouraged for dining.
    reasoning: 'West (Varuna) represents gains and completion — eating in this zone is said to bring satisfaction and nourishment. East (morning light/Indra) also supports family bonding during meals.',
    remedy: 'Ensure the dining table faces East or West. Use warm lighting. Avoid dark or black colour schemes in the dining area. Keep the table clutter-free and avoid eating facing South.',
    relocateSuggestion: 'Position the dining table in the West or East portion of any room.',
  },
]

// ─── Scoring Logic ────────────────────────────────────────────────────────────
// score(room, assignedDirectionId) → { score: 0-100, rating: 'ideal'|'acceptable'|'neutral'|'avoid' }

export function scoreRoomPlacement(roomId, directionId) {
  const room = ROOMS.find(r => r.id === roomId)
  if (!room || !directionId) return { score: 0, rating: 'unassigned' }

  if (room.ideal.includes(directionId))      return { score: 100, rating: 'ideal' }
  if (room.acceptable.includes(directionId)) return { score: 60,  rating: 'acceptable' }
  if (room.avoid.includes(directionId))      return { score: 0,   rating: 'avoid' }
  return { score: 30, rating: 'neutral' }   // not specifically listed
}

// Rating display config
export const RATING_CONFIG = {
  ideal:      { label: 'Ideal',      color: '#10B981', bg: 'bg-emerald-500', light: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-700', dot: '🟢' },
  acceptable: { label: 'Acceptable', color: '#F59E0B', bg: 'bg-amber-500',   light: 'bg-amber-50',   border: 'border-amber-300',   text: 'text-amber-700',   dot: '🟡' },
  neutral:    { label: 'Neutral',    color: '#6B7280', bg: 'bg-gray-400',    light: 'bg-gray-50',    border: 'border-gray-300',    text: 'text-gray-600',    dot: '⚪' },
  avoid:      { label: 'Avoid',      color: '#EF4444', bg: 'bg-red-500',     light: 'bg-red-50',     border: 'border-red-300',     text: 'text-red-700',     dot: '🔴' },
  unassigned: { label: 'Not set',    color: '#D1D5DB', bg: 'bg-gray-200',    light: 'bg-gray-50',    border: 'border-gray-200',    text: 'text-gray-400',    dot: '⚫' },
}
