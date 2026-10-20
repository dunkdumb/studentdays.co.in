import { GalleryImage } from '../types';
import { IMAGES } from '../config/images';

export const STATIC_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gal-1',
    imageUrl: IMAGES.gallery.munnarHill,
    caption: 'Munnar Hill Camp & Tea Clouds',
    tripLocation: 'Munnar, Kerala',
    tags: ['Nature', 'Camp', 'Munnar'],
    aspectRatio: '1:1'
  },
  {
    id: 'gal-2',
    imageUrl: IMAGES.gallery.teaSunrise,
    caption: 'Kolukkumalai 4 AM Sunrise Trek',
    tripLocation: 'Kolukkumalai Peak, Kerala',
    tags: ['Sunrise', 'Trek', 'Clouds'],
    aspectRatio: '1:1'
  },
  {
    id: 'gal-3',
    imageUrl: IMAGES.gallery.houseboat,
    caption: 'Alappuzha Backwaters Deluxe Houseboat',
    tripLocation: 'Alappuzha, Kerala',
    tags: ['Houseboat', 'Sunset', 'Kerala'],
    aspectRatio: '1:1'
  },
  {
    id: 'gal-4',
    imageUrl: IMAGES.gallery.campfire,
    caption: 'Campfire, Music & Starlight Nights',
    tripLocation: 'Wayanad, Kerala',
    tags: ['Campfire', 'Music', 'Night'],
    aspectRatio: '1:1'
  },
  {
    id: 'gal-5',
    imageUrl: IMAGES.gallery.kolukkumalai,
    caption: 'Jeep Safari Above 7,000 ft',
    tripLocation: 'Western Ghats, Kerala',
    tags: ['Safari', 'Jeep', 'Adventure'],
    aspectRatio: '1:1'
  },
  {
    id: 'gal-6',
    imageUrl: IMAGES.gallery.lakeSide,
    caption: 'Lakeside Reflections & Morning Mist',
    tripLocation: 'Ooty Lake, Tamil Nadu',
    tags: ['Lake', 'Misty', 'Travelers'],
    aspectRatio: '4:3'
  },
  {
    id: 'gal-7',
    imageUrl: IMAGES.gallery.forestTrail,
    caption: 'Dense Forest Trail Exploration',
    tripLocation: 'Dandeli Forest, Karnataka',
    tags: ['Forest', 'Trek', 'Trail'],
    aspectRatio: '4:3'
  },
  {
    id: 'gal-8',
    imageUrl: IMAGES.gallery.beachSmile,
    caption: 'Om Beach Golden Sunset Vibes',
    tripLocation: 'Gokarna, Karnataka',
    tags: ['Beach', 'Sunset', 'Friends'],
    aspectRatio: '4:3'
  },
  {
    id: 'gal-9',
    imageUrl: IMAGES.gallery.bambooGroup,
    caption: 'Batch Reunion in Giant Bamboo Forest',
    tripLocation: 'Araku Valley, Andhra Pradesh',
    tags: ['Cohort', 'Group', 'Memories'],
    aspectRatio: '4:3'
  },
  {
    id: 'gal-10',
    imageUrl: IMAGES.gallery.parkChill,
    caption: 'Campus Gang Relaxing Between Excursions',
    tripLocation: 'Botanical Gardens, Kerala',
    tags: ['Friends', 'Chilling', 'Laughter'],
    aspectRatio: '4:3'
  }
];

export default STATIC_GALLERY_IMAGES;
