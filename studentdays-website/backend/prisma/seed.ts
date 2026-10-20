import { PrismaClient, Role, UserStatus, TripStatus, BookingStatus, PaymentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { config } from '../src/config';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding StudentDays.co Demo Database ---');

  // 1. Password hashes
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash(config.seed.adminPassword, salt);
  const coordPasswordHash = await bcrypt.hash(config.seed.coordinatorPassword, salt);
  const studentPasswordHash = await bcrypt.hash(config.seed.studentPassword, salt);

  // 2. Upsert Users
  const masterAdmin = await prisma.user.upsert({
    where: { email: config.seed.adminEmail },
    update: { passwordHash: adminPasswordHash, role: Role.MASTER_ADMIN, status: UserStatus.ACTIVE },
    create: {
      email: config.seed.adminEmail,
      name: config.seed.adminName,
      passwordHash: adminPasswordHash,
      role: Role.MASTER_ADMIN,
      status: UserStatus.ACTIVE,
      phone: '+91 98765 00001',
      collegeName: 'StudentDays HQ'
    }
  });
  console.log(`Created/Verified Master Admin: ${masterAdmin.email}`);

  const coordinator = await prisma.user.upsert({
    where: { email: config.seed.coordinatorEmail },
    update: { passwordHash: coordPasswordHash, role: Role.COORDINATOR, status: UserStatus.ACTIVE },
    create: {
      email: config.seed.coordinatorEmail,
      name: config.seed.coordinatorName,
      passwordHash: coordPasswordHash,
      role: Role.COORDINATOR,
      status: UserStatus.ACTIVE,
      phone: '+91 98765 00002',
      collegeName: 'BITS Pilani',
      studentId: 'COORD-2026-01'
    }
  });
  console.log(`Created/Verified Coordinator: ${coordinator.email}`);

  const student = await prisma.user.upsert({
    where: { email: config.seed.studentEmail },
    update: { passwordHash: studentPasswordHash, role: Role.STUDENT, status: UserStatus.ACTIVE },
    create: {
      email: config.seed.studentEmail,
      name: config.seed.studentName,
      passwordHash: studentPasswordHash,
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      phone: '+91 98765 00003',
      collegeName: 'IIT Madras',
      studentId: 'CS23B045'
    }
  });
  console.log(`Created/Verified Student: ${student.email}`);

  // 3. Authentic Reference Colleges (from StudentDays.co.html)
  const collegesData = [
    { name: 'Anurag University', slug: 'anurag-university', city: 'Hyderabad', state: 'Telangana', description: 'They ate 🔥 - Active travel cohort', logoUrl: '/assets/reference-media/logo.png', website: 'https://anurag.edu.in' },
    { name: 'University of Hyderabad', slug: 'university-of-hyderabad', city: 'Hyderabad', state: 'Telangana', description: 'They ate 🔥 - Central university chapter', logoUrl: '/assets/reference-media/logo.png', website: 'https://uohyd.ac.in' },
    { name: 'JNTUH', slug: 'jntuh', city: 'Hyderabad', state: 'Telangana', description: 'They ate 🔥 - Technical campus community', logoUrl: '/assets/reference-media/logo.png', website: 'https://jntuh.ac.in' },
    { name: 'Osmania University', slug: 'osmania-university', city: 'Hyderabad', state: 'Telangana', description: 'They ate 🔥 - Historic university chapter', logoUrl: '/assets/reference-media/logo.png', website: 'https://osmania.ac.in' },
    { name: 'BVRIT', slug: 'bvrit', city: 'Hyderabad', state: 'Telangana', description: 'They ate 🔥 - Engineering innovators', logoUrl: '/assets/reference-media/logo.png', website: 'https://bvrit.ac.in' },
    { name: 'Malla Reddy Group (MLRIT)', slug: 'mlrit', city: 'Hyderabad', state: 'Telangana', description: 'They ate 🔥 - Adventure club chapter', logoUrl: '/assets/reference-media/logo.png', website: 'https://mlrit.ac.in' },
    { name: 'Bhoj Reddy Engineering College', slug: 'bhoj-reddy', city: 'Hyderabad', state: 'Telangana', description: 'They ate 🔥 - Women in tech travel community', logoUrl: '/assets/reference-media/logo.png', website: 'https://brecw.ac.in' },
    { name: 'KMIT', slug: 'kmit', city: 'Hyderabad', state: 'Telangana', description: 'They ate 🔥 - Keshav Memorial cohort', logoUrl: '/assets/reference-media/logo.png', website: 'https://kmit.in' },
    { name: 'GRIET', slug: 'griet', city: 'Hyderabad', state: 'Telangana', description: 'They ate 🔥 - Gokaraju Rangaraju chapter', logoUrl: '/assets/reference-media/logo.png', website: 'https://griet.ac.in' },
    { name: 'VNR VJIET', slug: 'vnr-vjiet', city: 'Hyderabad', state: 'Telangana', description: 'They ate 🔥 - Vignana Jyothi chapter', logoUrl: '/assets/reference-media/logo.png', website: 'https://vnrvjiet.ac.in' }
  ];

  for (const c of collegesData) {
    await prisma.college.upsert({
      where: { slug: c.slug },
      update: c,
      create: c
    });
  }
  console.log(`Seeded ${collegesData.length} partner colleges.`);

  // 3b. Seed Documentaries from reference
  const docData = [
    { youtubeId: '4E648bz2aR4', tabLabel: '1. Arunachalam & Pondicherry', subtitle: 'Between Soul & Shore — Arunachalam & Pondicherry', title: 'Between Soul & Shore', displayOrder: 1 },
    { youtubeId: 'lN502PsnETI', tabLabel: '2. Vizag & Araku', subtitle: 'Beach, Chills & Hills — Vizag & Araku', title: 'Beach: Chills & Hills', displayOrder: 2 }
  ];
  for (const d of docData) {
    await prisma.documentaryMedia.upsert({
      where: { youtubeId: d.youtubeId },
      update: d,
      create: d
    });
  }
  console.log(`Seeded ${docData.length} authentic documentaries.`);

  // 3c. Seed Reviews from reference
  const revData = [
    { authorName: 'Rahul Kumar', college: 'Anurag University', initials: 'RK', rating: 5, content: 'Best trip of my college life.', displayOrder: 1 },
    { authorName: 'Priya Sharma', college: 'GNU', initials: 'PS', rating: 5, content: 'The documentary film made me relive everything.', displayOrder: 2 },
    { authorName: 'N Varadarajulu', college: 'Rao Institute', initials: 'NV', rating: 5, content: 'Never thought student travel could feel this good.', displayOrder: 3 }
  ];
  await prisma.review.deleteMany({});
  for (const r of revData) {
    await prisma.review.create({ data: r });
  }
  console.log(`Seeded ${revData.length} authentic reviews.`);


  // 4. Seed Trips
  const tripKerala = await prisma.trip.upsert({
    where: { slug: 'kerala-gods-own-country' },
    update: {},
    create: {
      title: "Kerala, God's Own Country",
      slug: 'kerala-gods-own-country',
      description: 'Experience lush tea plantations in Munnar, serene backwater houseboats in Alleppey, and coastal sunset gatherings with fellow collegiate explorers.',
      destination: 'Munnar & Alleppey, Kerala',
      startLocation: 'Kochi (Cochin International Airport / Ernakulam Junction)',
      startDate: new Date('2026-11-12T06:00:00Z'),
      endDate: new Date('2026-11-15T20:00:00Z'),
      registrationDeadline: new Date('2026-11-05T23:59:59Z'),
      price: 6499,
      capacity: 40,
      confirmedCount: 18,
      reservedCount: 4,
      status: TripStatus.PUBLISHED,
      coverImage: '/assets/7_kerala-god.jpg',
      meetingPoint: 'Kochi Central Railway Station Platform 1 Exit, 06:30 AM',
      includedServices: JSON.stringify([
        'AC Tempo Traveller transfers throughout',
        '3 Nights resort & private deluxe houseboat stay',
        'All Breakfasts & Houseboat Dinner included',
        'Munnar tea museum & Kolukkumalai jeep safari',
        'Official StudentDays trip coordinators & photographer',
        'StudentDays Welcome Pack & Branded Merch'
      ]),
      exclusions: JSON.stringify([
        'Train/Flight tickets to/from Kochi',
        'Personal shopping and adventure ride tickets',
        'Unspecified snacks & beverages'
      ]),
      cancellationPolicy: '100% refund up to 10 days before departure. 50% refund between 9 to 4 days. No refunds within 72 hours of departure.',
      itinerary: {
        create: [
          {
            dayNumber: 1,
            title: 'Kochi Welcome & Scenic Munnar Ascent',
            description: 'Rendezvous at Kochi, group icebreakers, scenic mountain drive past Cheeyappara & Valara waterfalls, check-in and evening bonfire.',
            activities: JSON.stringify(['Pickup & Icebreakers', 'Cheeyappara Waterfall photo stop', 'Resort Check-in', 'Evening Acoustic Bonfire'])
          },
          {
            dayNumber: 2,
            title: 'Munnar Peak Safari & Tea Estates',
            description: 'Early morning Kolukkumalai sunrise jeep ride, visit to traditional tea factory, walk through Mattupetty dam and Echo Point.',
            activities: JSON.stringify(['Sunrise Jeep Safari', 'Tea Factory tour', 'Echo Point', 'Stargazing session'])
          },
          {
            dayNumber: 3,
            title: 'Alleppey Backwaters & Deluxe Houseboat Cruise',
            description: 'Descend into Alleppey backwaters. Board private deluxe houseboats for a cruise through emerald lagoons with fresh Kerala cuisine.',
            activities: JSON.stringify(['Houseboat boarding', 'Backwater canal cruise', 'Village walk', 'Houseboat feast & games'])
          },
          {
            dayNumber: 4,
            title: 'Fort Kochi Heritage Walk & Farewell',
            description: 'Explore Chinese fishing nets, street art of Fort Kochi, cafe hopping and evening drop-off at Kochi transit points.',
            activities: JSON.stringify(['Fort Kochi art trail', 'Chinese fishing nets', 'Souvenir shopping', 'Departure farewell'])
          }
        ]
      }
    }
  });

  const tripGokarna = await prisma.trip.upsert({
    where: { slug: 'gokarna-dandeli-expedition' },
    update: {},
    create: {
      title: 'Gokarna & Dandeli Coastal Expedition',
      slug: 'gokarna-dandeli-expedition',
      description: 'Pristine cliffside beach trekking from Om Beach to Paradise Beach combined with heart-thumping Kali river white-water rafting in Dandeli.',
      destination: 'Gokarna & Dandeli, Karnataka',
      startLocation: 'Hubli / Gokarna Road Railway Station',
      startDate: new Date('2026-11-20T07:00:00Z'),
      endDate: new Date('2026-11-22T21:00:00Z'),
      registrationDeadline: new Date('2026-11-14T23:59:59Z'),
      price: 5499,
      capacity: 35,
      confirmedCount: 12,
      reservedCount: 2,
      status: TripStatus.PUBLISHED,
      coverImage: '/assets/8_gokarna-dandeli-3-days.jpg',
      meetingPoint: 'Gokarna Road Railway Station, 07:30 AM',
      includedServices: JSON.stringify([
        'Dedicated sanitized transit bus',
        '2 Nights beachside camps & jungle resort stay',
        'Certified White-water rafting guide & safety gear',
        'Gokarna 5-beach cliff trek with certified trek leads',
        'Campfire, beach volleyball & music night'
      ]),
      exclusions: JSON.stringify([
        'Travel to Hubli/Gokarna',
        'Kayaking and zip-line extra activities',
        'Personal expenses'
      ]),
      cancellationPolicy: 'Full refund if cancelled 7+ days prior. 50% refund 3-6 days prior. Non-refundable under 72h.',
      itinerary: {
        create: [
          {
            dayNumber: 1,
            title: 'Gokarna Cliff & 5-Beach Trek',
            description: 'Begin the coastal trail covering Kudle, Om Beach, Half Moon Beach, and secluded Paradise Beach. Sunset viewing from the cliffs.',
            activities: JSON.stringify(['Trek kickoff', 'Om Beach rock scrambling', 'Sunset at Paradise Beach', 'Beach campfire'])
          },
          {
            dayNumber: 2,
            title: 'Dandeli Jungle Resort & River Rafting',
            description: 'Transfer to Dandeli rain forests. Tackle grade 2 & 3 rapids on Kali river, followed by jungle camping.',
            activities: JSON.stringify(['White-water rafting (9km)', 'Jacuzzi bath in river', 'Jungle resort games', 'Night safari trail'])
          },
          {
            dayNumber: 3,
            title: 'Vibhooti Falls & Return',
            description: 'Morning swim in the crystal waters of Vibhooti Falls and Yana limestone caves before returning.',
            activities: JSON.stringify(['Vibhooti Falls dip', 'Yana giant rocks exploration', 'Group photo & return drop'])
          }
        ]
      }
    }
  });

  const tripAraku = await prisma.trip.upsert({
    where: { slug: 'araku-vanajangi-clouds' },
    update: {},
    create: {
      title: 'Araku Valley & Vanajangi Clouds',
      slug: 'araku-vanajangi-clouds',
      description: 'Hike into the mythical misty dawn atop Vanajangi Hills to stand above an ocean of clouds, explore tribal coffee plantations, and Borra caves.',
      destination: 'Araku Valley & Vanajangi, Andhra Pradesh',
      startLocation: 'Visakhapatnam Railway Station (Vizag)',
      startDate: new Date('2026-12-04T05:30:00Z'),
      endDate: new Date('2026-12-06T20:00:00Z'),
      registrationDeadline: new Date('2026-11-27T23:59:59Z'),
      price: 4299,
      capacity: 30,
      confirmedCount: 8,
      reservedCount: 3,
      status: TripStatus.PUBLISHED,
      coverImage: '/assets/9_araku-vanajangi-3-days.jpg',
      meetingPoint: 'Vizag Central Railway Station, 06:00 AM',
      includedServices: JSON.stringify([
        'Sightseeing transport from Vizag to Araku & back',
        'Tent camping & resort stay in Araku valley',
        'Night trek guide for Vanajangi sunrise',
        'Borra caves entry & Katiki waterfalls guide',
        'Aroma coffee tasting session'
      ]),
      exclusions: JSON.stringify([
        'Transit to Visakhapatnam',
        'Camera fees at Borra caves',
        'Lunches & personal snacks'
      ]),
      cancellationPolicy: 'Full refund 7 days before trip. Standard policy applies.',
      itinerary: {
        create: [
          {
            dayNumber: 1,
            title: 'Scenic Ghat Road & Borra Caves',
            description: 'Ascend the Eastern Ghats, explore million-year-old stalactite formations at Borra Caves, and camp under starry skies.',
            activities: JSON.stringify(['Ghat road drive', 'Borra caves', 'Camp pitching & barbecue'])
          },
          {
            dayNumber: 2,
            title: 'The Vanajangi Cloudbed Sunrise Trek',
            description: 'Midnight trek to Vanajangi summit to watch the sun rise out of a sea of fog and rolling clouds.',
            activities: JSON.stringify(['Night summit hike', 'Vanajangi sea-of-clouds sunrise', 'Breakfast & hot Araku coffee', 'Padmapuram gardens'])
          },
          {
            dayNumber: 3,
            title: 'Tribal Museum & Coastal Return',
            description: 'Visit the Araku tribal culture center, organic coffee plantations, and return drive to Vizag beach.',
            activities: JSON.stringify(['Coffee plantation stroll', 'Tribal handicraft market', 'Vizag beach sunset', 'Farewell'])
          }
        ]
      }
    }
  });

  // 5. Assign Coordinator to Trips
  await prisma.coordinatorTripAssignment.upsert({
    where: { tripId_userId: { tripId: tripKerala.id, userId: coordinator.id } },
    update: {},
    create: { tripId: tripKerala.id, userId: coordinator.id, notes: 'Lead coordinator for student logistics & photography.' }
  });

  await prisma.coordinatorTripAssignment.upsert({
    where: { tripId_userId: { tripId: tripGokarna.id, userId: coordinator.id } },
    update: {},
    create: { tripId: tripGokarna.id, userId: coordinator.id, notes: 'Lead coordinator for adventure rafting & safety.' }
  });

  // 6. Seed Demo Booking for the Student
  const existingBooking = await prisma.booking.findFirst({
    where: { userId: student.id, tripId: tripKerala.id }
  });

  if (!existingBooking) {
    const demoBooking = await prisma.booking.create({
      data: {
        bookingReference: 'SD-2026-KL01',
        tripId: tripKerala.id,
        userId: student.id,
        quantity: 2,
        unitPrice: tripKerala.price,
        totalAmount: tripKerala.price * 2,
        status: BookingStatus.PAYMENT_SUBMITTED,
        emergencyContactName: 'Dr. K. Sharma',
        emergencyContactPhone: '+91 98765 43210',
        specialRequirements: 'Vegetarian meals preferred for both participants',
        participants: {
          create: [
            {
              fullName: student.name,
              email: student.email,
              phone: student.phone || '+91 98765 00003',
              collegeName: 'IIT Madras',
              studentId: 'CS23B045',
              age: 21,
              gender: 'Male'
            },
            {
              fullName: 'Pooja Nair',
              email: 'pooja.nair@demo.studentdays.co',
              phone: '+91 98765 00004',
              collegeName: 'IIT Madras',
              studentId: 'CS23B082',
              age: 20,
              gender: 'Female'
            }
          ]
        },
        payments: {
          create: {
            amount: tripKerala.price * 2,
            currency: 'INR',
            provider: 'mock',
            paymentMethod: 'UPI_REFERENCE',
            status: PaymentStatus.SUBMITTED,
            referenceNumber: 'DEMO-UTR-892134761201',
            payerUpiId: 'rohan.sharma@okhdfcbank',
            submittedAt: new Date(),
            notes: 'Demo UPI reference submitted by student via checkout'
          }
        }
      }
    });

    await prisma.notification.create({
      data: {
        userId: student.id,
        title: 'Payment Submitted (Awaiting Verification)',
        message: 'Your payment reference DEMO-UTR-892134761201 for Kerala Trip has been received and is queued for verification.',
        type: 'PAYMENT_SUBMITTED',
        link: `/student/bookings/${demoBooking.id}`
      }
    });

    await prisma.auditLog.create({
      data: {
        userId: student.id,
        action: 'PAYMENT_REFERENCE_SUBMITTED',
        entityType: 'Booking',
        entityId: demoBooking.id,
        metadata: JSON.stringify({ reference: 'DEMO-UTR-892134761201', amount: tripKerala.price * 2 })
      }
    });

    console.log(`Created sample booking: ${demoBooking.bookingReference}`);
  }

  // 7. Seed Gallery Images
  const galleryImages = [
    { imageUrl: '/assets/1_two-studentdays-travellers-by-a-lake.jpg', caption: 'Sunrise lake reflection in the mountain woods', tripLocation: 'Munnar Lake, Kerala', displayOrder: 1 },
    { imageUrl: '/assets/2_students-exploring-a-forest-trail.jpg', caption: 'Exploring dense rainforest canopy trails', tripLocation: 'Dandeli Forest, Karnataka', displayOrder: 2 },
    { imageUrl: '/assets/3_friends-smiling-on-a-beach.jpg', caption: 'Golden hour smiles at Paradise Beach', tripLocation: 'Gokarna, Karnataka', displayOrder: 3 },
    { imageUrl: '/assets/4_group-photo-in-a-bamboo-grove.jpg', caption: 'Bamboo grove cohort photo with StudentDays flags', tripLocation: 'Wayanad, Kerala', displayOrder: 4 },
    { imageUrl: '/assets/5_students-relaxing-in-a-park.jpg', caption: 'Unwinding after an epic 12km cliff hike', tripLocation: 'Araku Valley, AP', displayOrder: 5 }
  ];

  await prisma.galleryImage.deleteMany({});
  for (const g of galleryImages) {
    await prisma.galleryImage.create({ data: g });
  }
  console.log(`Seeded ${galleryImages.length} gallery images.`);

  // 8. Demo Contact Submission
  await prisma.contactSubmission.create({
    data: {
      name: 'Aditya Sen',
      email: 'aditya.sen@demo.studentdays.co',
      phone: '+91 98765 12345',
      college: 'BITS Pilani Goa Campus',
      subject: 'Custom batch trip for 80 students to Goa / Gokarna',
      message: 'Hey StudentDays team! We have our department fest coming up in December and want to organise a 3-day customized coastal retreat for 80 students. Could your team share an itinerary and quote?',
      status: 'NEW'
    }
  });

  console.log('--- Database Seeding Completed Successfully! ---');
}

main()
  .catch((e) => {
    console.error('Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
