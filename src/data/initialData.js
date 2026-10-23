// Initial mock data for The Village Farm — Organic Poultry & Delivery Management System

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Whole Free-Range Country Chicken (Desi)",
    category: "Country/Desi Chicken",
    price: 340,
    unit: "per 1kg bird",
    weight: "1.0 - 1.2 kg",
    stock: 45,
    image: "/images/whole_chicken.jpg",
    description: "Ethically pasture-raised country bird. Fed on natural grains and greens with zero antibiotics or artificial growth promoters. Firm, flavorful meat ideal for traditional curries and slow roasts.",
    origin: "The Village Farm - Shed A Pasture Flock",
    freshness: "Harvested & cleaned fresh daily at 5:00 AM",
    storage: "Keep chilled at 0-4°C. Consume within 48 hours or freeze.",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 128,
    isPopular: true
  },
  {
    id: "prod-2",
    name: "Farm Fresh Broiler Curry Cut (Skinless)",
    category: "Curry Cuts",
    price: 240,
    unit: "per 1kg pack",
    weight: "1.0 kg (12-14 pieces)",
    stock: 60,
    image: "/images/chicken_cuts.jpg",
    description: "Tender, succulent curry pieces including drumsticks, breast portions, and wings. Cleaned, trimmed, and cut into uniform bite-sized pieces for rich gravies.",
    origin: "The Village Farm - Shed B Flock",
    freshness: "Processed daily under strict biosecurity protocols",
    storage: "Store chilled at 2-4°C. Ready to cook.",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 94,
    isPopular: true
  },
  {
    id: "prod-3",
    name: "Premium Boneless Chicken Breast Fillet",
    category: "Boneless & Fillets",
    price: 360,
    unit: "per 1kg pack",
    weight: "1.0 kg (3-4 fillets)",
    stock: 35,
    image: "/images/chicken_cuts.jpg",
    description: "Lean, tender, high-protein boneless breast fillets. Carefully hand-trimmed of excess fat. Ideal for pan-searing, meal prep, healthy grilling, and stir-fries.",
    origin: "The Village Farm - Shed B Flock",
    freshness: "Vacuum-sealed within 2 hours of processing",
    storage: "Chilled at 0-4°C. Do not refreeze after thawing.",
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 156,
    isPopular: true
  },
  {
    id: "prod-4",
    name: "Tender Farm Chicken Drumsticks",
    category: "Curry Cuts",
    price: 280,
    unit: "per 1kg pack",
    weight: "1.0 kg (8-10 pieces)",
    stock: 28,
    image: "/images/drumsticks.jpg",
    description: "Juicy, plump chicken drumsticks with skin-on or skin-off option. Naturally juicy and tender, perfect for tandoori marinades, crispy baking, or hearty stews.",
    origin: "The Village Farm - Shed A Free Range",
    freshness: "Guaranteed same-day farm harvest",
    storage: "Chilled at 2-4°C.",
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 82,
    isPopular: false
  },
  {
    id: "prod-5",
    name: "Kadaknath Black Chicken (Heritage Breed)",
    category: "Specialty Poultry",
    price: 750,
    unit: "per 1.2kg bird",
    weight: "1.1 - 1.3 kg",
    stock: 12,
    image: "/images/whole_chicken.jpg",
    description: "Authentic Kadaknath black meat bird prized for high protein, rich iron content, low fat, and distinctive gourmet flavor. Raised free-range for over 120 days.",
    origin: "The Village Farm - Heritage Aviary",
    freshness: "Limited daily harvest; pre-order recommended",
    storage: "Chilled at 0-2°C.",
    isAvailable: true,
    rating: 5.0,
    reviewsCount: 47,
    isPopular: true
  },
  {
    id: "prod-6",
    name: "Boneless Chicken Thigh Cubes",
    category: "Boneless & Fillets",
    price: 380,
    unit: "per 1kg pack",
    weight: "1.0 kg",
    stock: 22,
    image: "/images/chicken_cuts.jpg",
    description: "Juicy, dark-meat thigh cubes with rich flavor and natural moisture retention. Perfect for chicken tikka, butter chicken, skewers, and stir fry.",
    origin: "The Village Farm - Shed B Flock",
    freshness: "Processed fresh every morning",
    storage: "Chilled at 2-4°C.",
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 68,
    isPopular: false
  }
];

export const INITIAL_BATCHES = [
  {
    id: "BATCH-2026-04",
    shed: "Shed A-1 (Free Range)",
    breed: "Country Chicken (Desi)",
    arrivalDate: "2026-08-20",
    initialBirds: 500,
    currentLiveCount: 486,
    mortality: 14,
    mortalityRate: "2.8%",
    ageDays: 64,
    feedConsumedKg: 1420,
    avgWeightKg: 1.25,
    status: "Ready for Harvest",
    healthStatus: "Excellent",
    notes: "Active pasture grazing, certified disease-free, natural grain feed."
  },
  {
    id: "BATCH-2026-05",
    shed: "Shed B-2 (Broiler)",
    breed: "Cobb 500 Broiler",
    arrivalDate: "2026-09-12",
    initialBirds: 850,
    currentLiveCount: 832,
    mortality: 18,
    mortalityRate: "2.1%",
    ageDays: 41,
    feedConsumedKg: 2150,
    avgWeightKg: 1.85,
    status: "Harvesting Ongoing",
    healthStatus: "Optimal",
    notes: "Daily biosecurity checks completed, automated ventilation active."
  },
  {
    id: "BATCH-2026-06",
    shed: "Shed A-2 (Heritage Aviary)",
    breed: "Kadaknath Black Chicken",
    arrivalDate: "2026-07-05",
    initialBirds: 300,
    currentLiveCount: 294,
    mortality: 6,
    mortalityRate: "2.0%",
    ageDays: 110,
    feedConsumedKg: 1180,
    avgWeightKg: 1.35,
    status: "Maturing",
    healthStatus: "Excellent",
    notes: "High iron herbal diet, open paddock exercise twice daily."
  },
  {
    id: "BATCH-2026-07",
    shed: "Shed C-1 (Nursery)",
    breed: "Country Chicken Chicks",
    arrivalDate: "2026-10-10",
    initialBirds: 600,
    currentLiveCount: 593,
    mortality: 7,
    mortalityRate: "1.1%",
    ageDays: 13,
    feedConsumedKg: 310,
    avgWeightKg: 0.28,
    status: "Brooding / Nursery",
    healthStatus: "Normal",
    notes: "Warm brooding temperature maintained at 32°C."
  }
];

export const INITIAL_DRIVERS = [
  {
    id: "drv-1",
    name: "Ramesh Kumar",
    phone: "+91 98450 12345",
    vehicle: "Insulated Chilled Van (KA-05-EV-8821)",
    status: "On Route",
    activeDeliveries: 2,
    completedToday: 8,
    rating: 4.9,
    currentLocation: "Indiranagar 100ft Rd"
  },
  {
    id: "drv-2",
    name: "Suresh Patel",
    phone: "+91 98765 43210",
    vehicle: "Electric Delivery Van (KA-05-EV-4412)",
    status: "On Route",
    activeDeliveries: 1,
    completedToday: 6,
    rating: 4.8,
    currentLocation: "Koramangala 4th Block"
  },
  {
    id: "drv-3",
    name: "Arun Das",
    phone: "+91 97410 88776",
    vehicle: "Express Delivery Bike (KA-05-BK-9931)",
    status: "Available",
    activeDeliveries: 0,
    completedToday: 11,
    rating: 4.9,
    currentLocation: "Farm Hub Station"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "TVF-84920",
    customerName: "Ananya Sharma",
    customerPhone: "+91 98201 54321",
    deliveryAddress: "Apartment 4B, Green Glen Layout, Bellandur, Bengaluru",
    landmark: "Near Central Park",
    instructions: "Leave with security if not answering doorbell.",
    orderDate: "2026-10-23T09:15:00",
    items: [
      { productId: "prod-1", name: "Whole Free-Range Country Chicken (Desi)", price: 340, quantity: 1 },
      { productId: "prod-3", name: "Premium Boneless Chicken Breast Fillet", price: 360, quantity: 1 }
    ],
    subtotal: 700,
    deliveryFee: 40,
    total: 740,
    paymentMethod: "UPI On Delivery",
    paymentStatus: "Pending",
    orderStatus: "in_transit", // pending | confirmed | processing | in_transit | delivered | cancelled
    assignedDriverId: "drv-1",
    assignedDriverName: "Ramesh Kumar",
    assignedDriverPhone: "+91 98450 12345",
    estimatedDeliveryTime: "45 mins",
    timeline: [
      { status: "Placed", time: "09:15 AM", note: "Order placed online via website" },
      { status: "Confirmed", time: "09:20 AM", note: "Stock validated & confirmed by farm admin" },
      { status: "Packed", time: "09:40 AM", note: "Hygienically vacuum packed with dry ice cooling" },
      { status: "Out for Delivery", time: "10:10 AM", note: "Dispatched in chilled van with Ramesh Kumar" }
    ],
    coordinates: { lat: 12.926, lng: 77.676 }
  },
  {
    id: "TVF-84921",
    customerName: "Vikram Malhotra",
    customerPhone: "+91 99160 88712",
    deliveryAddress: "Villa 22, Whispering Meadows, Sarjapur Road, Bengaluru",
    landmark: "Opposite Wipro Gate 3",
    instructions: "Please call upon arrival at main gate.",
    orderDate: "2026-10-23T09:45:00",
    items: [
      { productId: "prod-2", name: "Farm Fresh Broiler Curry Cut (Skinless)", price: 240, quantity: 2 }
    ],
    subtotal: 480,
    deliveryFee: 40,
    total: 520,
    paymentMethod: "Cash On Delivery",
    paymentStatus: "Pending",
    orderStatus: "in_transit",
    assignedDriverId: "drv-1",
    assignedDriverName: "Ramesh Kumar",
    assignedDriverPhone: "+91 98450 12345",
    estimatedDeliveryTime: "1 hr 15 mins",
    timeline: [
      { status: "Placed", time: "09:45 AM", note: "Order placed by customer" },
      { status: "Confirmed", time: "09:50 AM", note: "Confirmed by admin" },
      { status: "Packed", time: "10:15 AM", note: "Packed in chilled insulated bag" },
      { status: "Out for Delivery", time: "10:30 AM", note: "Dispatched with Ramesh Kumar" }
    ],
    coordinates: { lat: 12.911, lng: 77.692 }
  },
  {
    id: "TVF-84922",
    customerName: "Priya Raman",
    customerPhone: "+91 94480 33219",
    deliveryAddress: "Flat 302, Palm Heights, 12th Main, Koramangala 4th Block",
    landmark: "Behind Sony Signal",
    instructions: "Deliver before 12:30 PM for lunch prep.",
    orderDate: "2026-10-23T10:10:00",
    items: [
      { productId: "prod-5", name: "Kadaknath Black Chicken (Heritage Breed)", price: 750, quantity: 1 }
    ],
    subtotal: 750,
    deliveryFee: 0,
    total: 750,
    paymentMethod: "Verified Online Gateway",
    paymentStatus: "Paid",
    orderStatus: "in_transit",
    assignedDriverId: "drv-2",
    assignedDriverName: "Suresh Patel",
    assignedDriverPhone: "+91 98765 43210",
    estimatedDeliveryTime: "30 mins",
    timeline: [
      { status: "Placed", time: "10:10 AM", note: "Order placed and paid online" },
      { status: "Confirmed", time: "10:12 AM", note: "Heritage flock cut confirmed" },
      { status: "Packed", time: "10:35 AM", note: "Sealed with freshness verification tag" },
      { status: "Out for Delivery", time: "10:55 AM", note: "Dispatched with Suresh Patel" }
    ],
    coordinates: { lat: 12.934, lng: 77.625 }
  },
  {
    id: "TVF-84923",
    customerName: "Deepak Joshi",
    customerPhone: "+91 98800 66554",
    deliveryAddress: "House #14, 7th Cross, HSR Layout Sector 1",
    landmark: "Near Agara Lake Road",
    instructions: "Ring bell twice.",
    orderDate: "2026-10-23T10:40:00",
    items: [
      { productId: "prod-4", name: "Tender Farm Chicken Drumsticks", price: 280, quantity: 2 },
      { productId: "prod-3", name: "Premium Boneless Chicken Breast Fillet", price: 360, quantity: 1 }
    ],
    subtotal: 920,
    deliveryFee: 0,
    total: 920,
    paymentMethod: "Cash On Delivery",
    paymentStatus: "Pending",
    orderStatus: "confirmed",
    assignedDriverId: null,
    assignedDriverName: "Unassigned",
    assignedDriverPhone: "",
    estimatedDeliveryTime: "Awaiting dispatch",
    timeline: [
      { status: "Placed", time: "10:40 AM", note: "Order placed via mobile web" },
      { status: "Confirmed", time: "10:45 AM", note: "Stock verified & batch allocated" }
    ],
    coordinates: { lat: 12.915, lng: 77.649 }
  },
  {
    id: "TVF-84918",
    customerName: "Meera Nair",
    customerPhone: "+91 97312 99881",
    deliveryAddress: "Tower B-1002, Prestige Ferns, Marathahalli-Sarjapur Ring Rd",
    landmark: "Next to Novotel",
    instructions: "Hand over to resident directly.",
    orderDate: "2026-10-23T08:00:00",
    items: [
      { productId: "prod-1", name: "Whole Free-Range Country Chicken (Desi)", price: 340, quantity: 2 }
    ],
    subtotal: 680,
    deliveryFee: 40,
    total: 720,
    paymentMethod: "UPI On Delivery",
    paymentStatus: "Paid",
    orderStatus: "delivered",
    assignedDriverId: "drv-3",
    assignedDriverName: "Arun Das",
    assignedDriverPhone: "+91 97410 88776",
    estimatedDeliveryTime: "Delivered",
    deliveredAt: "09:30 AM",
    timeline: [
      { status: "Placed", time: "08:00 AM", note: "Morning order placed" },
      { status: "Confirmed", time: "08:10 AM", note: "Order verified" },
      { status: "Packed", time: "08:30 AM", note: "Hygienically packed" },
      { status: "Out for Delivery", time: "08:50 AM", note: "Dispatched with Arun Das" },
      { status: "Delivered", time: "09:30 AM", note: "Delivered fresh. Handed over to Meera Nair." }
    ],
    coordinates: { lat: 12.932, lng: 77.683 }
  }
];

export const INITIAL_INVENTORY = [
  { id: "inv-1", name: "Processed Country Chicken (Chilled)", category: "Processed Meat", unit: "kg", available: 52, reserved: 18, minThreshold: 20, status: "Good" },
  { id: "inv-2", name: "Broiler Curry Cut Packs (1kg)", category: "Processed Meat", unit: "packs", available: 68, reserved: 24, minThreshold: 25, status: "Good" },
  { id: "inv-3", name: "Boneless Breast Fillets (1kg)", category: "Processed Meat", unit: "packs", available: 35, reserved: 15, minThreshold: 15, status: "Good" },
  { id: "inv-4", name: "Chicken Drumstick Packs (1kg)", category: "Processed Meat", unit: "packs", available: 28, reserved: 12, minThreshold: 15, status: "Good" },
  { id: "inv-5", name: "Kadaknath Heritage Bird Inventory", category: "Processed Meat", unit: "birds", available: 12, reserved: 4, minThreshold: 10, status: "Low Stock" },
  { id: "inv-6", name: "Organic Poultry Starter Feed (50kg bags)", category: "Feed & Nutrition", unit: "bags", available: 84, reserved: 0, minThreshold: 30, status: "Good" },
  { id: "inv-7", name: "Free-Range Grower Grain Mix (50kg)", category: "Feed & Nutrition", unit: "bags", available: 62, reserved: 0, minThreshold: 25, status: "Good" },
  { id: "inv-8", name: "Eco Kraft Chilled Delivery Trays", category: "Packaging", unit: "units", available: 850, reserved: 80, minThreshold: 200, status: "Good" },
  { id: "inv-9", name: "Dry Ice / Gel Cool Packs", category: "Packaging", unit: "units", available: 340, reserved: 45, minThreshold: 100, status: "Good" }
];

export const INITIAL_PURCHASES = [
  { id: "PUR-1042", date: "2026-10-18", supplier: "Nandi Organic Feed Mills", item: "Organic Broiler Grower Feed (40 Bags)", category: "Feed", quantity: 2000, unit: "kg", unitCost: 32, total: 64000, paymentStatus: "Paid" },
  { id: "PUR-1043", date: "2026-10-15", supplier: "Karnataka Heritage Hatcheries", item: "Day-old Desi Country Chicks", category: "Flock Inflow", quantity: 600, unit: "chicks", unitCost: 45, total: 27000, paymentStatus: "Paid" },
  { id: "PUR-1044", date: "2026-10-12", supplier: "EcoPack Solutions Ltd", item: "Food-Grade Vacuum Trays & Gel Packs", category: "Packaging", quantity: 1500, unit: "sets", unitCost: 14, total: 21000, paymentStatus: "Paid" },
  { id: "PUR-1045", date: "2026-10-08", supplier: "AgriVet BioCare", item: "Herbal Probiotics & Poultry Electrolytes", category: "Veterinary", quantity: 25, unit: "liters", unitCost: 480, total: 12000, paymentStatus: "Paid" }
];

export const INITIAL_EXPENSES = [
  { id: "EXP-201", date: "2026-10-20", category: "Utilities & Cold Chain", title: "Solar Cold Storage Grid Power", amount: 14200, notes: "Monthly electricity for 0-4°C chillers" },
  { id: "EXP-202", date: "2026-10-19", category: "Logistics & Transport", title: "EV Delivery Fleet Charging & Maintenance", amount: 6800, notes: "Fleet charging for 2 vans & 1 bike" },
  { id: "EXP-203", date: "2026-10-15", category: "Biosecurity & Sanitation", title: "Farm Shed Sanitization & Deep Clean", amount: 4500, notes: "Disinfection protocol for Shed A & B" },
  { id: "EXP-204", date: "2026-10-10", category: "Labor & Farm Hands", title: "Weekly Farm Labor & Bird Handling", amount: 22000, notes: "Pasture care, feeding and egg collection staff" },
  { id: "EXP-205", date: "2026-10-05", category: "Veterinary Care", title: "Monthly Certified Avian Vet Inspection", amount: 5000, notes: "Certified organic flock health clearance" }
];

export const INITIAL_CUSTOMERS = [
  { id: "CUST-1", name: "Ananya Sharma", phone: "+91 98201 54321", email: "ananya.sharma@gmail.com", address: "Bellandur, Bengaluru", totalOrders: 7, lifetimeSpend: 5480, lastOrderDate: "2026-10-23" },
  { id: "CUST-2", name: "Vikram Malhotra", phone: "+91 99160 88712", email: "vikram.m@outlook.com", address: "Sarjapur Road, Bengaluru", totalOrders: 4, lifetimeSpend: 2890, lastOrderDate: "2026-10-23" },
  { id: "CUST-3", name: "Priya Raman", phone: "+91 94480 33219", email: "priya.raman@gmail.com", address: "Koramangala, Bengaluru", totalOrders: 9, lifetimeSpend: 8240, lastOrderDate: "2026-10-23" },
  { id: "CUST-4", name: "Deepak Joshi", phone: "+91 98800 66554", email: "deepak.j@gmail.com", address: "HSR Layout, Bengaluru", totalOrders: 3, lifetimeSpend: 2450, lastOrderDate: "2026-10-23" },
  { id: "CUST-5", name: "Meera Nair", phone: "+91 97312 99881", email: "meera.nair@yahoo.com", address: "Marathahalli, Bengaluru", totalOrders: 12, lifetimeSpend: 11200, lastOrderDate: "2026-10-23" }
];

export const FARM_SETTINGS = {
  farmName: "The Village Farm",
  tagline: "Organic Free-Range Poultry & Direct Farm Fresh Delivery",
  phone: "+91 98450 77112",
  whatsapp: "+919845077112",
  email: "orders@thevillagefarm.in",
  farmAddress: "Survey 48/2, Gunjur-Doddakannelli Road, Varthur Hobli, Bengaluru 560087",
  deliveryRadiusKm: 25,
  freeDeliveryThreshold: 750,
  deliveryFee: 40,
  taxRatePercent: 0, // Fresh meat is exempt from GST in India
  allowCOD: true,
  allowUPI: true,
  allowOnlineGateway: true,
  operatingHours: "Daily 6:00 AM – 7:30 PM (Harvest starts 5:00 AM)",
  mapCenter: { lat: 12.923, lng: 77.674 }
};
