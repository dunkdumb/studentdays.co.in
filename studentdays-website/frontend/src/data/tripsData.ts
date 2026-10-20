import { Trip } from '../types';
import { IMAGES } from '../config/images';

export interface AuthenticTrip extends Trip {
  subtitle?: string;
  badgeText?: string;
  isHousefull?: boolean;
}

export const AUTHENTIC_TRIPS: AuthenticTrip[] = [
  {
    id: 'kerala-gods-own-country',
    title: 'Kerala',
    slug: 'kerala-gods-own-country',
    subtitle: "God's Own Country · 5 days · Hyderabad pickup & drop · Rs. 7,999/-",
    description: "God's own country · A trip you'll never forget. Munnar · Kolukkumalai · Alappuzha · Athirapally. Pickup & drop: Hyderabad. Only for college students (female & male).",
    destination: 'Munnar & Alleppey, Kerala',
    startLocation: 'Hyderabad / Kochi',
    startDate: '2026-11-12T06:00:00Z',
    endDate: '2026-11-17T20:00:00Z',
    durationDays: 5,
    registrationDeadline: '2026-11-05T23:59:59Z',
    price: 7999,
    capacity: 40,
    confirmedCount: 40,
    reservedCount: 0,
    remainingSeats: 0,
    isBookable: false,
    isHousefull: true,
    status: 'PUBLISHED',
    coverImage: IMAGES.trips.kerala,
    meetingPoint: 'Hyderabad Central / Kochi Railway Station Exit, 06:00 AM',
    badgeText: 'HOUSEFULL',
    includedServices: [
      'AC Tempo Traveller transfers throughout',
      'Resort & private deluxe houseboat stay',
      'All Breakfasts & Houseboat Dinner included',
      'Munnar tea museum & Kolukkumalai jeep safari',
      'Official StudentDays trip coordinators & photographer',
      'StudentDays Welcome Pack & Branded Merch'
    ],
    exclusions: [
      'Train/Flight tickets to/from Kochi',
      'Personal shopping and adventure ride tickets',
      'Unspecified snacks & beverages'
    ],
    cancellationPolicy: '100% refund up to 10 days before departure. 50% refund between 9 to 4 days. No refunds within 72 hours of departure.',
    itinerary: [
      {
        id: 'k-1',
        tripId: 'kerala-gods-own-country',
        dayNumber: 1,
        title: 'Departure from Hyderabad & Transit to Munnar',
        description: 'Overnight journey with student cohort, ice-breakers, and route briefing.',
        activities: ['Cohort kickoff', 'Highway pitstops', 'Munnar ascent']
      },
      {
        id: 'k-2',
        tripId: 'kerala-gods-own-country',
        dayNumber: 2,
        title: 'Munnar Tea Hills & Kolukkumalai Jeep Safari',
        description: 'Scenic drive through green tea gardens, off-road jeep trail to Kolukkumalai.',
        activities: ['Tea factory tour', 'Kolukkumalai jeep safari', 'Campfire music night']
      },
      {
        id: 'k-3',
        tripId: 'kerala-gods-own-country',
        dayNumber: 3,
        title: 'Alleppey Backwaters & Private Houseboat Night',
        description: 'Cruise tranquil lagoons on private student houseboats with Kerala feast and music.',
        activities: ['Houseboat check-in', 'Lagoon cruise', 'Traditional sadhya feast', 'Stargazing']
      },
      {
        id: 'k-4',
        tripId: 'kerala-gods-own-country',
        dayNumber: 4,
        title: 'Athirapally Waterfalls & Kochi Cultural Market',
        description: "Visit India's Niagara at Athirapally waterfalls, local spice markets and cafes.",
        activities: ['Athirapally falls trek', 'Fort Kochi cafes', 'Sunset beach gathering']
      },
      {
        id: 'k-5',
        tripId: 'kerala-gods-own-country',
        dayNumber: 5,
        title: 'Farewell & Return to Hyderabad',
        description: 'Wrap up documentary interviews, group pictures, and return journey.',
        activities: ['Documentary interviews', 'Group farewell photo', 'Return transit']
      }
    ]
  },
  {
    id: 'gokarna-dandeli-expedition',
    title: 'Gokarna – Dandeli',
    slug: 'gokarna-dandeli-expedition',
    subtitle: '3 days',
    description: 'Pristine cliffside beach trekking from Om Beach to Paradise Beach combined with Kali river white-water rafting in Dandeli.',
    destination: 'Gokarna & Dandeli, Karnataka',
    startLocation: 'Hubli / Gokarna',
    startDate: '2026-11-20T07:00:00Z',
    endDate: '2026-11-22T21:00:00Z',
    durationDays: 3,
    registrationDeadline: '2026-11-14T23:59:59Z',
    price: 5499,
    capacity: 35,
    confirmedCount: 12,
    reservedCount: 2,
    remainingSeats: 21,
    isBookable: true,
    isHousefull: false,
    status: 'PUBLISHED',
    coverImage: IMAGES.trips.gokarna,
    meetingPoint: 'Gokarna Road Railway Station, 07:30 AM',
    badgeText: 'In November, Details TBA',
    includedServices: [
      'Dedicated sanitized transit bus',
      '2 Nights beachside camps & jungle resort stay',
      'Certified White-water rafting guide & safety gear',
      'Gokarna 5-beach cliff trek with certified trek leads',
      'Campfire, beach volleyball & music night'
    ],
    exclusions: [
      'Travel to Hubli/Gokarna',
      'Kayaking and zip-line extra activities',
      'Personal expenses'
    ],
    cancellationPolicy: 'Full refund if cancelled 7+ days prior. 50% refund 3-6 days prior. Non-refundable under 72h.',
    itinerary: [
      {
        id: 'g-1',
        tripId: 'gokarna-dandeli-expedition',
        dayNumber: 1,
        title: 'Gokarna Cliff & 5-Beach Trek',
        description: 'Begin coastal trail covering Kudle, Om Beach, Half Moon Beach, and secluded Paradise Beach. Sunset viewing from the cliffs.',
        activities: ['Trek kickoff', 'Om Beach rock scrambling', 'Sunset at Paradise Beach', 'Beach campfire']
      },
      {
        id: 'g-2',
        tripId: 'gokarna-dandeli-expedition',
        dayNumber: 2,
        title: 'Dandeli Jungle Resort & River Rafting',
        description: 'Transfer to Dandeli rain forests. Tackle rapids on Kali river, followed by jungle camping.',
        activities: ['White-water rafting (9km)', 'Jacuzzi bath in river', 'Jungle resort games', 'Night safari trail']
      },
      {
        id: 'g-3',
        tripId: 'gokarna-dandeli-expedition',
        dayNumber: 3,
        title: 'Vibhooti Falls & Return',
        description: 'Morning swim in the crystal waters of Vibhooti Falls and Yana limestone caves before returning.',
        activities: ['Vibhooti Falls dip', 'Yana giant rocks exploration', 'Group photo & return drop']
      }
    ]
  },
  {
    id: 'araku-vanjangi',
    title: 'Araku & Vanjangi Escape',
    slug: 'araku-vanjangi',
    subtitle: '2 Nights / 3 Days · Travel. Connect. Experience.',
    description: 'Experience the beauty of Araku Valley and Vanjangi through scenic mountains, waterfalls, coffee plantations, local culture, comfortable accommodation, and an unforgettable early-morning sunrise experience.',
    destination: 'Vizag, Araku Valley & Vanjangi',
    startLocation: 'Visakhapatnam (Vizag) / Train from Hyderabad',
    startDate: '2026-11-20T06:00:00Z',
    endDate: '2026-11-22T18:00:00Z',
    durationDays: 3,
    registrationDeadline: '2026-11-15T23:59:59Z',
    price: 7499,
    preBookingAmount: 1999,
    balanceAmount: 5500,
    pdfUrl: 'https://drive.google.com/file/d/1q0RAVRFtUEsx5numGp1r65kTAK73RSYw/preview',
    pdfDownloadUrl: 'https://drive.google.com/uc?export=download&id=1q0RAVRFtUEsx5numGp1r65kTAK73RSYw',
    capacity: 30,
    confirmedCount: 14,
    reservedCount: 4,
    remainingSeats: 12,
    isBookable: true,
    isHousefull: false,
    status: 'PUBLISHED',
    coverImage: '/assets/trips/araku/hero-cover.jpg',
    meetingPoint: 'Visakhapatnam (Vizag) Railway Station / Pickup point',
    badgeText: '2 Nights / 3 Days · ₹7,499/person',
    includedServices: [
      'Accommodation (Deluxe AC Rooms at Aaradhya Hotel & Nirvana Resorts)',
      'Local Transportation throughout the trip',
      'Jeep Ride for Katiki Waterfalls',
      'Jeep Ride for Vanjangi Sunrise Viewpoint',
      'Train Tickets to and from Hyderabad',
      'Photography & Videography coverage',
      'Breakfast on all three days',
      'Dinner on Days 1 and 2'
    ],
    exclusions: [
      'Lunch (Lunch is not included in the package on any day)',
      'Any expenses or services not specifically mentioned in the inclusions'
    ],
    cancellationPolicy: 'Pre-booking amount of ₹1,999 reserves your seat. Remaining balance of ₹5,500 payable before the trip starts. Standard StudentDays terms apply.',
    itinerary: [
      {
        id: 'a-1',
        tripId: 'araku-vanjangi',
        dayNumber: 1,
        title: 'Vizag to Araku Valley — Scenic journey through the Eastern Ghats',
        description: 'Pickup from Vizag and begin the scenic journey through the Eastern Ghats. Explore Borra Caves, Katiki Waterfalls with jeep ride, coffee plantations, scenic viewpoints, hilltop church, wooden bridge, and pets & wings. Night stay in Araku Valley.',
        activities: [
          'Borra Caves',
          'Katiki Waterfalls (Jeep ride included)',
          'Coffee Plants & Plantations',
          'Galikonda Viewpoint',
          'Hilltop Church',
          'Wooden Bridge',
          'Pets and Wings (Added attraction)',
          'Night Stay: Aaradhya Hotel, Araku Valley'
        ]
      },
      {
        id: 'a-2',
        tripId: 'araku-vanjangi',
        dayNumber: 2,
        title: 'Explore Araku Valley — Gardens, tribal culture & coffee heritage',
        description: "Discover Araku's gardens, tribal culture, coffee heritage, and natural beauty. Visit Padmapuram Gardens, Chocolate Factory, Tribal Museum, Coffee Museum, Pineapple Gardens, and Chaparai Waterfalls. Night stay near Vanjangi at Nirvana Resorts, Paderu.",
        activities: [
          'Padmapuram Gardens',
          'Chocolate Factory',
          'Tribal Museum',
          'Coffee Factory / Museum',
          'Araku Pineapple Gardens',
          'Chaparai Waterfalls',
          'Night Stay: Nirvana Resorts, Paderu (Near Vanjangi)'
        ]
      },
      {
        id: 'a-3',
        tripId: 'araku-vanjangi',
        dayNumber: 3,
        title: 'Vanjangi Sunrise & Return to Vizag — Sunrise, temple visit and journey home',
        description: 'Wake up early for the signature highlight of the trip: the breathtaking Vanjangi Sunrise Viewpoint with jeep ride included. Visit the sacred Modhakondamma Temple before returning to Vizag by afternoon.',
        activities: [
          'Early-morning Vanjangi Sunrise Viewpoint',
          'Jeep ride to sunrise viewpoint (Included)',
          'Modhakondamma Temple',
          'Return to Vizag by afternoon'
        ]
      }
    ]
  }
];
