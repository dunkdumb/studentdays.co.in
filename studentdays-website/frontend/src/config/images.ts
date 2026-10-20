/**
 * StudentDays Cloudinary & Image Asset Configuration
 * 
 * ============================================================================
 * HOW TO UPDATE IMAGES USING CLOUDINARY:
 * ============================================================================
 * 1. Upload your image to your Cloudinary Media Library (https://cloudinary.com).
 * 2. Copy the Secure Delivery URL (e.g. https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/sample.jpg).
 * 3. Paste the URL into the `cloudinary` property of the appropriate image key below.
 * 
 * SAFE FALLBACK GUARANTEE:
 * If the `cloudinary` field is empty or contains "CLOUDINARY_URL_PENDING", the website
 * will automatically and seamlessly use the verified local fallback asset, ensuring that
 * your site NEVER displays broken images, missing banners, or empty cards.
 * ============================================================================
 */

export interface ImageAsset {
  /** The manual Cloudinary URL (replace when uploaded) */
  cloudinary: string;
  /** Verified local bundled asset used as guaranteed fallback */
  localFallback: string;
  /** Human-readable description */
  label: string;
  /** Recommended dimensions & aspect ratio for optimal display */
  dimensions?: string;
}

/**
 * Master Registry of all StudentDays brand assets, trip covers, gallery photos, and banners.
 */
export const IMAGE_ASSETS = {
  // BRAND & LOGOS
  logo: {
    cloudinary: '', // e.g. 'https://res.cloudinary.com/demo/image/upload/studentdays-logo.png'
    localFallback: '/assets/reference-media/logo.png',
    label: 'StudentDays Primary Logo (Header & Navbar)',
    dimensions: '160x42'
  },
  logoFooter: {
    cloudinary: '',
    localFallback: '/assets/10_studentdays-co.png',
    label: 'StudentDays Monochrome Brandmark (Footer)',
    dimensions: '160x42'
  },
  logoBadge: {
    cloudinary: '',
    localFallback: '/assets/studentdays-logo.png',
    label: 'StudentDays Shield / Icon Badge',
    dimensions: '64x64'
  },

  // HERO & LANDING BANNERS
  hero: {
    cloudinary: '',
    localFallback: '/assets/reference-media/hero.jpeg',
    label: 'Homepage Hero Panoramic Background (Lakeside Student Travelers)',
    dimensions: '1920x1080 (16:9)'
  },
  heroAlternate: {
    cloudinary: '',
    localFallback: '/assets/studentdays-hero.jpeg',
    label: 'Secondary Hero Panoramic Visual',
    dimensions: '1920x1080 (16:9)'
  },

  // RETRO CAROUSEL BACKGROUNDS
  retroBgA: {
    cloudinary: '',
    localFallback: '/assets/reference-media/rbg_a.jpeg',
    label: 'Retro Memory Reel Background A',
    dimensions: '1200x800'
  },
  retroBgB: {
    cloudinary: '',
    localFallback: '/assets/reference-media/rbg_b.jpeg',
    label: 'Retro Memory Reel Background B',
    dimensions: '1200x800'
  },

  // TRIP COVERS & PROMOTIONAL CARDS
  trips: {
    kerala: {
      cloudinary: '',
      localFallback: '/assets/reference-media/img_8.jpeg',
      label: "Kerala God's Own Country (Houseboat & Munnar)",
      dimensions: '800x600 (4:3)'
    },
    gokarna: {
      cloudinary: '',
      localFallback: '/assets/reference-media/img_9.jpeg',
      label: 'Gokarna & Dandeli Coastal Expedition',
      dimensions: '800x600 (4:3)'
    },
    araku: {
      cloudinary: '',
      localFallback: '/assets/trips/araku/hero-cover.jpg',
      label: 'Araku Valley & Vanajangi Sunrise Peak',
      dimensions: '800x600 (4:3)'
    },
    kashmir: {
      cloudinary: '',
      localFallback: '/assets/reference-media/img_11.jpeg',
      label: 'Kashmir Alpine Snow Expedition',
      dimensions: '800x600 (4:3)'
    },
    manali: {
      cloudinary: '',
      localFallback: '/assets/reference-media/img_12.jpeg',
      label: 'Manali & Solang Valley Trek',
      dimensions: '800x600 (4:3)'
    },
    defaultFallback: {
      cloudinary: '',
      localFallback: '/assets/studentdays-hero.jpeg',
      label: 'Default Trip Cover Card Fallback',
      dimensions: '800x600 (4:3)'
    }
  },

  // GALLERY & MEMORY WALL PHOTOS
  gallery: {
    munnarHill: {
      cloudinary: '',
      localFallback: '/assets/reference-media/img_2.jpeg',
      label: 'Munnar Hill Camp & Tea Plantation',
      dimensions: '600x600 (Square / Polaroid)'
    },
    teaSunrise: {
      cloudinary: '',
      localFallback: '/assets/reference-media/img_3.jpeg',
      label: 'Kolukkumalai Sunrise Above The Clouds',
      dimensions: '600x600 (Square / Polaroid)'
    },
    houseboat: {
      cloudinary: '',
      localFallback: '/assets/reference-media/img_4.jpeg',
      label: 'Alleppey Floating Houseboat Deck',
      dimensions: '600x600 (Square / Polaroid)'
    },
    campfire: {
      cloudinary: '',
      localFallback: '/assets/reference-media/img_5.jpeg',
      label: 'Student Cohort Campfire & Music Night',
      dimensions: '600x600 (Square / Polaroid)'
    },
    kolukkumalai: {
      cloudinary: '',
      localFallback: '/assets/reference-media/img_6.jpeg',
      label: 'Jeep Safari Trek Peak',
      dimensions: '600x600 (Square / Polaroid)'
    },
    lakeSide: {
      cloudinary: '',
      localFallback: '/assets/1_two-studentdays-travellers-by-a-lake.jpg',
      label: 'Two StudentDays Travelers by Tranquil Lake',
      dimensions: '800x533'
    },
    forestTrail: {
      cloudinary: '',
      localFallback: '/assets/2_students-exploring-a-forest-trail.jpg',
      label: 'Students Exploring a Western Ghats Forest Trail',
      dimensions: '800x533'
    },
    beachSmile: {
      cloudinary: '',
      localFallback: '/assets/3_friends-smiling-on-a-beach.jpg',
      label: 'College Friends Smiling on Gokarna Beach',
      dimensions: '800x533'
    },
    bambooGroup: {
      cloudinary: '',
      localFallback: '/assets/4_group-photo-in-a-bamboo-grove.jpg',
      label: 'Cohort Group Photo in Wayanad Bamboo Grove',
      dimensions: '800x533'
    },
    parkChill: {
      cloudinary: '',
      localFallback: '/assets/5_students-relaxing-in-a-park.jpg',
      label: 'Students Relaxing Between Trip Sightseeing',
      dimensions: '800x533'
    }
  },

  // ROUTE MAPS & INFOGRAPHICS
  maps: {
    keralaRoute: {
      cloudinary: '',
      localFallback: '/assets/reference-media/img_7.jpeg',
      label: 'Kerala Complete Route Map (Munnar, Kolukkumalai, Alappuzha, Athirapally)',
      dimensions: '1200x800'
    },
    indiaDestinations: {
      cloudinary: '',
      localFallback: '/assets/6_map-of-india-with-studentdays-co-destinations-kashmir-manali-darjeeling-hampi-goa-munnar-ooty-pondicherry-and-vizag.jpg',
      label: 'StudentDays All-India Student Travel Destinations Map',
      dimensions: '1200x900'
    }
  },

  // VIDEOS & REELS (MP4 Media)
  videos: {
    intro: {
      cloudinary: '',
      localFallback: '/assets/reference-media/intro-video.mp4',
      label: 'Hero Intro Video Reel',
      dimensions: '720p MP4'
    },
    wall: {
      cloudinary: '',
      localFallback: '/assets/reference-media/wall-video2.mp4',
      label: 'Ambient Wall Video Reel (Muted Loop)',
      dimensions: '720p MP4'
    },
    app: {
      cloudinary: '',
      localFallback: '/assets/reference-media/app-video.mp4',
      label: 'Mobile App Preview Video',
      dimensions: '720p MP4'
    }
  }
};

/**
 * Safe Image Resolver:
 * Returns the Cloudinary URL if specified (must start with http/https and not contain placeholder markers).
 * Otherwise returns the guaranteed local fallback asset.
 */
export function resolveImage(asset: ImageAsset): string {
  if (
    asset.cloudinary &&
    asset.cloudinary.trim().startsWith('http') &&
    !asset.cloudinary.includes('CLOUDINARY_URL_PENDING') &&
    !asset.cloudinary.includes('<your-')
  ) {
    return asset.cloudinary.trim();
  }
  return asset.localFallback;
}

/**
 * Convenient direct lookup object providing the active URL for every image.
 */
export const IMAGES = {
  logo: resolveImage(IMAGE_ASSETS.logo),
  logoFooter: resolveImage(IMAGE_ASSETS.logoFooter),
  logoBadge: resolveImage(IMAGE_ASSETS.logoBadge),
  hero: resolveImage(IMAGE_ASSETS.hero),
  heroAlternate: resolveImage(IMAGE_ASSETS.heroAlternate),
  retroBgA: resolveImage(IMAGE_ASSETS.retroBgA),
  retroBgB: resolveImage(IMAGE_ASSETS.retroBgB),
  trips: {
    kerala: resolveImage(IMAGE_ASSETS.trips.kerala),
    gokarna: resolveImage(IMAGE_ASSETS.trips.gokarna),
    araku: resolveImage(IMAGE_ASSETS.trips.araku),
    kashmir: resolveImage(IMAGE_ASSETS.trips.kashmir),
    manali: resolveImage(IMAGE_ASSETS.trips.manali),
    defaultFallback: resolveImage(IMAGE_ASSETS.trips.defaultFallback)
  },
  gallery: {
    munnarHill: resolveImage(IMAGE_ASSETS.gallery.munnarHill),
    teaSunrise: resolveImage(IMAGE_ASSETS.gallery.teaSunrise),
    houseboat: resolveImage(IMAGE_ASSETS.gallery.houseboat),
    campfire: resolveImage(IMAGE_ASSETS.gallery.campfire),
    kolukkumalai: resolveImage(IMAGE_ASSETS.gallery.kolukkumalai),
    lakeSide: resolveImage(IMAGE_ASSETS.gallery.lakeSide),
    forestTrail: resolveImage(IMAGE_ASSETS.gallery.forestTrail),
    beachSmile: resolveImage(IMAGE_ASSETS.gallery.beachSmile),
    bambooGroup: resolveImage(IMAGE_ASSETS.gallery.bambooGroup),
    parkChill: resolveImage(IMAGE_ASSETS.gallery.parkChill)
  },
  maps: {
    keralaRoute: resolveImage(IMAGE_ASSETS.maps.keralaRoute),
    indiaDestinations: resolveImage(IMAGE_ASSETS.maps.indiaDestinations)
  },
  videos: {
    intro: resolveImage(IMAGE_ASSETS.videos.intro),
    wall: resolveImage(IMAGE_ASSETS.videos.wall),
    app: resolveImage(IMAGE_ASSETS.videos.app)
  }
};

export default IMAGES;
