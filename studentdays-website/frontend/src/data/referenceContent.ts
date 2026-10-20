export interface DayItinerary {
  day: string;
  title: string;
  subtitle: string;
  timeline: [string, string[]][];
  note: string;
  stay: string;
}

export const KERALA_DAYS: DayItinerary[] = [
  {
    day: 'Day 0',
    title: 'Start from Hyderabad',
    subtitle: 'Relax and enjoy the train journey with your gang. Tickets included.',
    timeline: [],
    note: '',
    stay: ''
  },
  {
    day: 'Day 1',
    title: 'Kochi to Munnar',
    subtitle: 'Tea gardens, waterfalls & misty hills',
    timeline: [
      [
        'Morning',
        [
          'Reach Kochi and meet your trip team',
          'Pickup from Kochi and transfer to Munnar',
          'En-route stop at Cheeyapara Waterfalls'
        ]
      ],
      [
        'Afternoon',
        [
          'Arrival & check-in at Munnar',
          'Visit Mattupetty Dam',
          'Elephant Park and Photo Point',
          'Stroll through the Botanical Garden'
        ]
      ],
      [
        'Night',
        ['Dinner & overnight stay in Munnar']
      ]
    ],
    note: 'Rest well tonight. Tomorrow starts at 3:00 AM for the sunrise of a lifetime!',
    stay: 'Stay in Munnar: the whole resort is reserved for our group, with comfortable rooms, misty hill views and separate rooms for girls and boys.'
  },
  {
    day: 'Day 2',
    title: 'Kolukkumalai to Alappuzha',
    subtitle: 'Sunrise above the clouds, then the backwaters',
    timeline: [
      [
        '3:00 AM',
        [
          'Early wake-up',
          'Depart for Kolukkumalai, one of the highest tea estates in the world'
        ]
      ],
      [
        'Morning',
        [
          'Experience the spectacular Kolukkumalai Sunrise',
          'Return from Kolukkumalai',
          'Breakfast and freshen up'
        ]
      ],
      [
        'Afternoon',
        [
          'Depart towards Alappuzha',
          'Check in to your Alappuzha Houseboat',
          'Relaxing backwater cruise',
          'Enjoy Kerala-style scenery & local experience'
        ]
      ],
      [
        'Night',
        ['Dinner & overnight stay on the Houseboat']
      ]
    ],
    note: '',
    stay: 'Boat stay: a whole day and night afloat on your own houseboat, with breakfast, lunch and dinner served on board.'
  },
  {
    day: 'Day 3',
    title: 'Alappuzha to Athirapally to Kochi',
    subtitle: 'Thundering falls, then homeward bound',
    timeline: [
      [
        '9:00 AM',
        ['Breakfast', 'Houseboat checkout']
      ],
      [
        'Morning',
        ['Transfer to Athirapally']
      ],
      [
        'Afternoon',
        [
          'Athirapally Waterfalls, the Niagara of India',
          'Thumboormuzhy Dam',
          'Butterfly Park',
          'Hanging Bridge'
        ]
      ],
      [
        'Evening',
        ['Depart towards Kochi and reach Kochi']
      ]
    ],
    note: 'Return to Hyderabad by train.',
    stay: ''
  }
];

export const KERALA_INCLUSIONS = [
  { title: 'Train tickets', desc: 'Hyderabad to Kochi and back' },
  { title: 'Local transport', desc: 'All pickups, transfers & sightseeing travel in Kerala' },
  { title: 'Comfortable stays', desc: 'Hand-picked stays during the trip' },
  { title: 'Houseboat stay', desc: 'A full night floating on the Alappuzha backwaters' },
  { title: 'Food on the boat', desc: 'Kerala-style breakfast, lunch & dinner on board' },
  { title: 'Tent stay on the peak', desc: 'Camp at the Kolukkumalai peak point' },
  { title: 'Photos & videos', desc: 'Camera coverage so every moment is captured' },
  { title: 'Documentary shoot', desc: 'Your trip turned into a keepsake documentary' },
  { title: 'Trip guide & support', desc: 'A guide and support team with you throughout' }
];

export const PARTNER_COLLEGES = [
  "Anurag University",
  "University of Hyderabad",
  "JNTUH",
  "Osmania University",
  "BVRIT",
  "Malla Reddy Group (MLRIT)",
  "Bhoj Reddy Engineering College",
  "KMIT",
  "GRIET",
  "VNR VJIET"
];

export const REFERENCE_REVIEWS = [
  {
    name: 'Rahul Kumar',
    college: 'Anurag University',
    initials: 'RK',
    rating: 5,
    text: 'Best trip of my college life.'
  },
  {
    name: 'Priya Sharma',
    college: 'GNU',
    initials: 'PS',
    rating: 5,
    text: 'The documentary film made me relive everything.'
  },
  {
    name: 'N Varadarajulu',
    college: 'Rao Institute',
    initials: 'NV',
    rating: 5,
    text: 'Never thought student travel could feel this good.'
  }
];

export const REFERENCE_DOCS = [
  {
    id: '4E648bz2aR4',
    tab: '1. Arunachalam & Pondicherry',
    sub: 'Between Soul & Shore — Arunachalam & Pondicherry',
    title: 'Between Soul & Shore'
  },
  {
    id: 'lN502PsnETI',
    tab: '2. Vizag & Araku',
    sub: 'Beach, Chills & Hills — Vizag & Araku',
    title: 'Beach: Chills & Hills'
  }
];
