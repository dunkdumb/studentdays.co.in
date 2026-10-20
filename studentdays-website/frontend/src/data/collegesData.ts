import { College } from '../types';
import { IMAGES } from '../config/images';

export const STATIC_COLLEGES: College[] = [
  {
    id: 'c-1',
    name: 'Anurag University',
    slug: 'anurag-university',
    city: 'Hyderabad',
    state: 'Telangana',
    logoUrl: IMAGES.logoBadge,
    activeStudents: 340,
    tripsCompleted: 14
  },
  {
    id: 'c-2',
    name: 'University of Hyderabad (HCU)',
    slug: 'university-of-hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    logoUrl: IMAGES.logoBadge,
    activeStudents: 280,
    tripsCompleted: 11
  },
  {
    id: 'c-3',
    name: 'Jawaharlal Nehru Technological University (JNTUH)',
    slug: 'jntuh-hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    logoUrl: IMAGES.logoBadge,
    activeStudents: 410,
    tripsCompleted: 18
  },
  {
    id: 'c-4',
    name: 'Osmania University College of Engineering',
    slug: 'osmania-university',
    city: 'Hyderabad',
    state: 'Telangana',
    logoUrl: IMAGES.logoBadge,
    activeStudents: 315,
    tripsCompleted: 12
  },
  {
    id: 'c-5',
    name: 'BVRIT Hyderabad College of Engineering',
    slug: 'bvrit-hyderabad',
    city: 'Narsapur & Bachupally',
    state: 'Telangana',
    logoUrl: IMAGES.logoBadge,
    activeStudents: 260,
    tripsCompleted: 9
  },
  {
    id: 'c-6',
    name: 'MLR Institute of Technology (MLRIT)',
    slug: 'mlrit-dundigal',
    city: 'Dundigal',
    state: 'Telangana',
    logoUrl: IMAGES.logoBadge,
    activeStudents: 195,
    tripsCompleted: 8
  },
  {
    id: 'c-7',
    name: 'Bhoj Reddy Engineering College for Women',
    slug: 'bhoj-reddy-engineering',
    city: 'Santoshnagar, Hyderabad',
    state: 'Telangana',
    logoUrl: IMAGES.logoBadge,
    activeStudents: 170,
    tripsCompleted: 7
  },
  {
    id: 'c-8',
    name: 'Keshav Memorial Institute of Technology (KMIT)',
    slug: 'kmit-hyderabad',
    city: 'Narayanguda, Hyderabad',
    state: 'Telangana',
    logoUrl: IMAGES.logoBadge,
    activeStudents: 320,
    tripsCompleted: 13
  },
  {
    id: 'c-9',
    name: 'Gokaraju Rangaraju Institute of Engg (GRIET)',
    slug: 'griet-hyderabad',
    city: 'Bachupally, Hyderabad',
    state: 'Telangana',
    logoUrl: IMAGES.logoBadge,
    activeStudents: 290,
    tripsCompleted: 11
  },
  {
    id: 'c-10',
    name: 'VNR Vignana Jyothi Institute (VNR VJIET)',
    slug: 'vnr-vjiet',
    city: 'Pragathi Nagar, Hyderabad',
    state: 'Telangana',
    logoUrl: IMAGES.logoBadge,
    activeStudents: 380,
    tripsCompleted: 15
  }
];

export default STATIC_COLLEGES;
