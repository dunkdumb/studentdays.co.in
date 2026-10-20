import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { TripStatus } from '@prisma/client';

const router = Router();

// GET /api/v1/trips - Public trips listing with search and destination filters
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search ? String(req.query.search) : undefined;
    const destination = req.query.destination ? String(req.query.destination) : undefined;
    const limit = req.query.limit ? String(req.query.limit) : '20';
    const page = req.query.page ? String(req.query.page) : '1';

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const whereClause: any = {
      status: TripStatus.PUBLISHED
    };

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { destination: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (destination) {
      whereClause.destination = { contains: destination, mode: 'insensitive' };
    }

    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where: whereClause,
        orderBy: { startDate: 'asc' },
        skip,
        take: limitNum,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          destination: true,
          startLocation: true,
          startDate: true,
          endDate: true,
          registrationDeadline: true,
          price: true,
          capacity: true,
          confirmedCount: true,
          reservedCount: true,
          status: true,
          coverImage: true,
          meetingPoint: true
        }
      }),
      prisma.trip.count({ where: whereClause })
    ]);

    const formattedTrips = trips.map(t => {
      const remainingSeats = Math.max(0, t.capacity - (t.confirmedCount + t.reservedCount));
      return {
        ...t,
        remainingSeats,
        isBookable: remainingSeats > 0 && new Date() < new Date(t.registrationDeadline)
      };
    });

    res.status(200).json({
      success: true,
      data: { trips: formattedTrips },
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve trips' });
  }
});

// GET /api/v1/trips/:slug - Public trip details by slug or id
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = String(req.params.slug);

    const trip: any = await prisma.trip.findFirst({
      where: {
        OR: [
          { slug },
          { id: slug }
        ],
        status: TripStatus.PUBLISHED
      },
      include: {
        itinerary: {
          orderBy: { dayNumber: 'asc' }
        },
        images: {
          orderBy: { displayOrder: 'asc' }
        },
        coordinators: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
                collegeName: true
              }
            }
          }
        }
      }
    });

    if (!trip) {
      res.status(404).json({ success: false, error: 'Trip not found or not published' });
      return;
    }

    const remainingSeats = Math.max(0, trip.capacity - (trip.confirmedCount + trip.reservedCount));
    const isBookable = remainingSeats > 0 && new Date() < new Date(trip.registrationDeadline);

    let includedServices: string[] = [];
    let exclusions: string[] = [];
    try {
      includedServices = JSON.parse(trip.includedServices);
    } catch {
      includedServices = [];
    }
    try {
      exclusions = JSON.parse(trip.exclusions);
    } catch {
      exclusions = [];
    }

    const formattedItinerary = (trip.itinerary || []).map((item: any) => {
      let activities: string[] = [];
      try {
        activities = JSON.parse(item.activities);
      } catch {
        activities = [];
      }
      return { ...item, activities };
    });

    res.status(200).json({
      success: true,
      data: {
        trip: {
          ...trip,
          includedServices,
          exclusions,
          itinerary: formattedItinerary,
          remainingSeats,
          isBookable
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to retrieve trip details' });
  }
});

export default router;
