// ─────────────────────────────────────────────────────────────────────────────
//  HomeSure – Fake / Sample Data  (Front-End Development Only)
//  Replace this file with real API calls once the back-end is ready.
// ─────────────────────────────────────────────────────────────────────────────

// ── Fake Accounts ─────────────────────────────────────────────────────────────
const FAKE_USERS = [
  {
    id: 'usr-001', role: 'buyer',
    firstName: 'Maria', lastName: 'Santos',
    email: 'buyer@homesure.com', password: 'buyer1234',
    phone: '09171234567', avatar: null, verified: true,
    savedListings: ['prop-002', 'prop-004'], joinedAt: '2025-11-10',
  },
  {
    id: 'usr-002', role: 'buyer',
    firstName: 'Jose', lastName: 'Reyes',
    email: 'jose.reyes@gmail.com', password: 'buyer1234',
    phone: '09281234567', avatar: null, verified: true,
    savedListings: ['prop-001'], joinedAt: '2026-01-05',
  },
  {
    id: 'usr-003', role: 'seller',
    firstName: 'Ramon', lastName: 'Cruz',
    email: 'seller@homesure.com', password: 'seller1234',
    phone: '09191234567', avatar: null, verified: true,
    accountStatus: 'verified', listings: ['prop-001', 'prop-002', 'prop-003', 'prop-006', 'prop-007', 'prop-008'],
    joinedAt: '2025-10-01',
  },
  {
    id: 'usr-004', role: 'seller',
    firstName: 'Lourdes', lastName: 'Navarro',
    email: 'lourdes.navarro@gmail.com', password: 'seller1234',
    phone: '09271234567', avatar: null, verified: true,
    accountStatus: 'pending', listings: ['prop-004', 'prop-005', 'prop-009', 'prop-010', 'prop-011', 'prop-012', 'prop-013'],
    joinedAt: '2026-02-14',
  },
  {
    id: 'usr-005', role: 'admin',
    firstName: 'Andrea', lastName: 'Villanueva',
    email: 'admin@homesure.com', password: 'admin1234',
    phone: '09301234567', avatar: null, verified: true, joinedAt: '2025-08-15',
  },
  {
    id: 'usr-006', role: 'superadmin',
    firstName: 'Ricardo', lastName: 'Dela Cruz',
    email: 'superadmin@homesure.com', password: 'superadmin1234',
    phone: '09091234567', avatar: null, verified: true, joinedAt: '2025-07-01',
  },
];

// ── Sample Property Listings ──────────────────────────────────────────────────
const FAKE_LISTINGS = [
  // ── Approved (visible to buyers) ────────────────────────────────────────────
  {
    id: 'prop-001', sellerId: 'usr-003',
    type: 'house', listingFor: 'sale',
    title: '3-Bedroom House for Sale in Pulong Yantok',
    description: 'Spacious single-detached house in a quiet residential neighborhood. Features 3 bedrooms, 2 bathrooms, a carport, and a small garden. Just 5 minutes from Sta. Maria public market.',
    price: 4500000, barangay: 'Pulong Yantok',
    address: 'Blk 7 Lot 12, Pulong Yantok, Sta. Maria, Bulacan',
    bedrooms: 3, bathrooms: 2, floorArea: 120, lotArea: 200,
    status: 'approved', verified: true, negotiable: false,
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'],
    amenities: ['Carport', 'Garden', 'Water Meter', 'Meralco'], postedAt: '2026-02-01', featured: true,
  },
  {
    id: 'prop-002', sellerId: 'usr-003',
    type: 'apartment', listingFor: 'rent',
    title: '1-Bedroom Apartment for Rent near Town Proper',
    description: 'Fully-furnished apartment on the 2nd floor. Includes aircon, ref, and laundry area access. Walking distance to jeepney terminal.',
    price: 8000, barangay: 'Poblacion',
    address: '123 Maharlika Rd, Poblacion, Sta. Maria, Bulacan',
    bedrooms: 1, bathrooms: 1, floorArea: 35, lotArea: null,
    status: 'approved', verified: true, negotiable: false,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
    amenities: ['Aircon', 'Ref', 'WiFi-ready', 'Security'], postedAt: '2026-02-10', featured: true,
  },
  {
    id: 'prop-003', sellerId: 'usr-003',
    type: 'house', listingFor: 'sale',
    title: '4-Bedroom House & Lot in San Jose',
    description: 'Corner lot property in a gated village. Two-storey house with 4 bedrooms, 3 bathrooms, service area, and a 2-car garage.',
    price: 7800000, barangay: 'San Jose',
    address: 'Blk 2 Lot 5, Villa Magsaysay, San Jose, Sta. Maria, Bulacan',
    bedrooms: 4, bathrooms: 3, floorArea: 180, lotArea: 300,
    status: 'approved', verified: true, negotiable: false,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800'],
    amenities: ['2-Car Garage', 'Gated Village', 'Service Area', 'Balcony'], postedAt: '2026-01-28', featured: false,
  },
  {
    id: 'prop-006', sellerId: 'usr-003',
    type: 'apartment', listingFor: 'rent',
    title: 'Studio in Sonoma',
    description: 'Modern studio apartment inside a well-maintained complex. Air conditioned, with built-in cabinets and a private balcony overlooking the garden.',
    price: 26000, barangay: 'Sonoma',
    address: '14 Sonoma Residences, Sta. Maria, Bulacan',
    bedrooms: 0, bathrooms: 1, floorArea: 38, lotArea: null,
    status: 'approved', verified: true, negotiable: false,
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
    amenities: ['Aircon', 'Balcony', 'WiFi-ready', 'Security'], postedAt: '2026-01-15', featured: true,
  },
  {
    id: 'prop-007', sellerId: 'usr-003',
    type: 'house', listingFor: 'rent',
    title: 'House for Rent near Highway',
    description: 'Bright and airy 3-bedroom house located along the main highway. Easy access to buses and public transport. Good for families.',
    price: 18000, barangay: 'Bagbaguin',
    address: '78 MacArthur Highway, Bagbaguin, Sta. Maria, Bulacan',
    bedrooms: 3, bathrooms: 2, floorArea: 110, lotArea: 180,
    status: 'approved', verified: true, negotiable: false,
    images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
    amenities: ['Carport', 'Garden', 'Meralco'], postedAt: '2026-02-05', featured: false,
  },
  {
    id: 'prop-008', sellerId: 'usr-003',
    type: 'house', listingFor: 'sale',
    title: 'Beautiful House for Sale',
    description: 'Elegant 3-bedroom house with modern finishes. Granite countertops, tiled flooring, and a covered patio. Subdivision with 24/7 security.',
    price: 3500000, barangay: 'Lalakhan',
    address: 'Blk 3 Lot 8, Spring Ville, Lalakhan, Sta. Maria, Bulacan',
    bedrooms: 3, bathrooms: 2, floorArea: 100, lotArea: 160,
    status: 'approved', verified: false, negotiable: false,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800', 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800'],
    amenities: ['Patio', '24hr Security', 'Water Meter'], postedAt: '2026-01-20', featured: true,
  },
  {
    id: 'prop-009', sellerId: 'usr-004',
    type: 'house', listingFor: 'sale',
    title: 'Modern House for Sale',
    description: 'Contemporary designed two-storey house. Open floor plan living area, 3 bedrooms, and a spacious master bedroom with walk-in closet.',
    price: 2800000, barangay: 'San Jose',
    address: 'Phase 2, Blk 5 Lot 3, San Jose, Sta. Maria, Bulacan',
    bedrooms: 3, bathrooms: 2, floorArea: 130, lotArea: 200,
    status: 'approved', verified: true, negotiable: false,
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800'],
    amenities: ['Walk-in Closet', 'Carport', 'Meralco'], postedAt: '2026-02-18', featured: false,
  },
  {
    id: 'prop-010', sellerId: 'usr-004',
    type: 'apartment', listingFor: 'rent',
    title: 'Modern 2BR Apartment',
    description: '2-bedroom apartment on the 3rd floor of a newly built residential building. Kitchen with gas range, living area with ceiling fan.',
    price: 12000, barangay: 'Tumana',
    address: '56 Tulip St, Tumana, Sta. Maria, Bulacan',
    bedrooms: 2, bathrooms: 1, floorArea: 55, lotArea: null,
    status: 'approved', verified: true, negotiable: false,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'],
    amenities: ['Gas Range', 'Ceiling Fan', 'Meralco'], postedAt: '2026-02-12', featured: false,
  },
  {
    id: 'prop-011', sellerId: 'usr-004',
    type: 'house', listingFor: 'rent',
    title: 'Family House with Garden',
    description: 'Charming 3-bedroom family house with a large garden perfect for children. Quiet dead-end street. Near Balasing Elementary School.',
    price: 22000, barangay: 'Balasing',
    address: '9 Rosal Street, Balasing, Sta. Maria, Bulacan',
    bedrooms: 3, bathrooms: 2, floorArea: 140, lotArea: 300,
    status: 'approved', verified: true, negotiable: false,
    images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
    amenities: ['Large Garden', 'Carport', 'Near School'], postedAt: '2026-01-10', featured: false,
  },
  {
    id: 'prop-012', sellerId: 'usr-004',
    type: 'house', listingFor: 'rent',
    title: 'Spacious Family Home',
    description: 'Large 3-bedroom family home in a peaceful subdivision. Has a big living room, covered garage, and a backyard. Ideal for families.',
    price: 20000, barangay: 'San Jose',
    address: 'Blk 11 Lot 2, Green Meadows, San Jose, Sta. Maria, Bulacan',
    bedrooms: 3, bathrooms: 2, floorArea: 150, lotArea: 260,
    status: 'approved', verified: false, negotiable: true,
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800', 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800'],
    amenities: ['Covered Garage', 'Backyard', 'Meralco'], postedAt: '2026-03-01', featured: false,
  },
  {
    id: 'prop-013', sellerId: 'usr-004',
    type: 'apartment', listingFor: 'rent',
    title: 'Modern Loft Apartment',
    description: 'Stylish loft-style apartment with high ceilings and an open layout. Polished concrete floors, minimalist design. 2 bedrooms on the upper floor.',
    price: 11000, barangay: 'Pulong Yantok',
    address: '32 Rivera Bldg, Pulong Yantok, Sta. Maria, Bulacan',
    bedrooms: 2, bathrooms: 1, floorArea: 65, lotArea: null,
    status: 'approved', verified: false, negotiable: true,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
    amenities: ['High Ceiling', 'Minimalist', 'Meralco'], postedAt: '2026-02-25', featured: false,
  },
  {
    id: 'prop-014', sellerId: 'usr-004',
    type: 'apartment', listingFor: 'rent',
    title: 'Cozy Studio Apartment',
    description: 'Compact and well-maintained studio unit. Clean shared bathroom. Ideal for students or working individuals. Near the highway.',
    price: 8000, barangay: 'Catmon',
    address: '21 Catmon Road, Catmon, Sta. Maria, Bulacan',
    bedrooms: 0, bathrooms: 1, floorArea: 22, lotArea: null,
    status: 'approved', verified: false, negotiable: false,
    images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
    amenities: ['Near Highway', 'Meralco'], postedAt: '2026-03-05', featured: false,
  },
  {
    id: 'prop-015', sellerId: 'usr-004',
    type: 'apartment', listingFor: 'rent',
    title: 'Affordable 3BR Apartment',
    description: '3-bedroom apartment unit perfect for small families. Quiet building with security guard on duty. Near public market and schools.',
    price: 9000, barangay: 'Sampaguita',
    address: '88 Sampaguita Drive, Sta. Maria, Bulacan',
    bedrooms: 3, bathrooms: 1, floorArea: 70, lotArea: null,
    status: 'approved', verified: false, negotiable: false,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
    amenities: ['Security', 'Near Market', 'Near School'], postedAt: '2026-03-10', featured: false,
  },

  // ── Pending / Rejected (not visible to buyers) ────────────────────────────────
  {
    id: 'prop-004', sellerId: 'usr-004',
    type: 'apartment', listingFor: 'rent',
    title: 'Studio-Type Apartment in Balasing',
    description: 'Newly-renovated studio apartment perfect for single individuals or couples.',
    price: 5500, barangay: 'Balasing',
    address: '456 Sampaguita St, Balasing, Sta. Maria, Bulacan',
    bedrooms: 0, bathrooms: 1, floorArea: 22, lotArea: null,
    status: 'pending', verified: false, negotiable: false,
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
    amenities: ['Water Included', 'Newly Renovated'], postedAt: '2026-03-01', featured: false,
  },
  {
    id: 'prop-005', sellerId: 'usr-004',
    type: 'house', listingFor: 'rent',
    title: '2-Bedroom Bungalow for Rent in Catmon',
    description: 'Single-storey bungalow with spacious living room, 2 bedrooms, and a front yard.',
    price: 12000, barangay: 'Catmon',
    address: '789 Rizal Ave, Catmon, Sta. Maria, Bulacan',
    bedrooms: 2, bathrooms: 1, floorArea: 80, lotArea: 150,
    status: 'rejected', verified: false, negotiable: false,
    rejectionReason: 'Incomplete property documents. Please re-upload a valid Transfer Certificate of Title (TCT).',
    images: ['https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800'],
    amenities: ['Front Yard', '24-hr Water'], postedAt: '2026-02-20', featured: false,
  },
];

// ── Reported Listings ─────────────────────────────────────────────────────────
const FAKE_REPORTS = [
  {
    id: 'rep-001', listingId: 'prop-004', reportedBy: 'usr-001',
    reason: 'Suspicious listing – price seems too low and photos look copied.',
    status: 'pending', reportedAt: '2026-03-10',
  },
];

// ── System Activity Logs (Super Admin) ───────────────────────────────────────
const FAKE_ACTIVITY_LOGS = [
  { id: 'log-001', action: 'Listing approved',    detail: 'prop-001 approved by Andrea Villanueva', timestamp: '2026-02-02 09:14' },
  { id: 'log-002', action: 'New user registered', detail: 'Jose Reyes (buyer) created an account',  timestamp: '2026-01-05 14:30' },
  { id: 'log-003', action: 'Listing rejected',    detail: 'prop-005 rejected – incomplete documents', timestamp: '2026-02-21 11:00' },
  { id: 'log-004', action: 'Listing reported',    detail: 'prop-004 reported by Maria Santos',      timestamp: '2026-03-10 16:45' },
  { id: 'log-005', action: 'Admin added',         detail: 'Andrea Villanueva added as Admin',       timestamp: '2025-08-15 08:00' },
];

// ── Auth Helpers ──────────────────────────────────────────────────────────────
function fakeLogin(email, password) {
  return FAKE_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  ) || null;
}

function saveSession(user) {
  const session = {
    id: user.id, role: user.role,
    firstName: user.firstName, lastName: user.lastName,
    email: user.email, phone: user.phone,
    verified: user.verified, accountStatus: user.accountStatus || null,
  };
  sessionStorage.setItem('homesure_user', JSON.stringify(session));
}

function getSession() {
  const raw = sessionStorage.getItem('homesure_user');
  return raw ? JSON.parse(raw) : null;
}

function clearSession() {
  sessionStorage.removeItem('homesure_user');
}

function redirectToDashboard(role) {
  const routes = {
    buyer:      '../module/buyer/buyer.html',
    seller:     '../module/seller/seller.html',
    admin:      '../module/admin/admin.html',
    superadmin: '../module/super-admin/super-admin.html',
  };
  const path = routes[role];
  if (path) window.location.href = path;
}
