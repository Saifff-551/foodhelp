import { Donation, DonationStatus, UserRole } from './types';

export const APP_NAME = "FoodRescue.ai";

export const MOCK_DONATIONS: Donation[] = [
  {
    id: 'd1',
    donorId: 'u1',
    donorName: 'Saffron Banquet Hall',
    location: { lat: 12.9716, lng: 77.5946, address: '12 MG Road, Bangalore' },
    status: DonationStatus.AVAILABLE,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    distanceKm: 1.2,
    items: [
      {
        id: 'f1',
        title: 'Wedding Buffet Surplus',
        description: 'Rice, Dal, and Paneer Curry. Kept in warmers since service ended.',
        category: 'COOKED_MEAL',
        quantity: '50 meals',
        preparedTime: '3 hours ago',
        expiryTime: '4 hours',
        isPerishable: true,
        safetyScore: 92,
        tags: ['Vegetarian', 'Bulk', 'Hot'],
        imageUrl: 'https://picsum.photos/400/300?random=1'
      }
    ]
  },
  {
    id: 'd2',
    donorId: 'u2',
    donorName: 'Daily Bread Bakery',
    location: { lat: 12.9279, lng: 77.6271, address: 'Koramangala 4th Block' },
    status: DonationStatus.AVAILABLE,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    distanceKm: 3.5,
    items: [
      {
        id: 'f2',
        title: 'Assorted Pastries & Breads',
        description: 'Day-old breads and unsold croissants from morning batch.',
        category: 'BAKERY',
        quantity: '15kg',
        preparedTime: '10 hours ago',
        expiryTime: '24 hours',
        isPerishable: false,
        safetyScore: 98,
        tags: ['Bakery', 'Breakfast', 'Snack'],
        imageUrl: 'https://picsum.photos/400/300?random=2'
      }
    ]
  },
  {
    id: 'd3',
    donorId: 'u3',
    donorName: 'Fresh Mart Supermarket',
    location: { lat: 12.9141, lng: 77.6100, address: 'EcoWorld Campus' },
    status: DonationStatus.CLAIMED,
    recipientName: 'Hope Shelter',
    distanceKm: 0.8,
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
    items: [
      {
        id: 'f3',
        title: 'Fresh Vegetables Batch',
        description: 'Tomatoes and spinach slightly wilted but edible. Good for stew.',
        category: 'RAW_INGREDIENTS',
        quantity: '10kg',
        preparedTime: 'N/A',
        expiryTime: '2 days',
        isPerishable: true,
        safetyScore: 89,
        tags: ['Vegetables', 'Raw'],
        imageUrl: 'https://picsum.photos/400/300?random=3'
      }
    ]
  }
];

export const IMPACT_STATS = [
  { name: 'Jan', meals: 400 },
  { name: 'Feb', meals: 300 },
  { name: 'Mar', meals: 600 },
  { name: 'Apr', meals: 800 },
  { name: 'May', meals: 500 },
  { name: 'Jun', meals: 950 },
];