// ============================================================
// SK TOURS & TRAVELS SALEM — OFFICIAL BROCHURE PRODUCT CATALOG
// Sourced directly from SK_TOURS_AND_TRAVELS_SALEM_PRODUCTS.pdf
// Hotline: +91 99946 44744 | Email: sktoursandtravelsalem@gmail.com
// ============================================================

export const INITIAL_TOURS = [
  // ------------------------------------------------------------
  // 1. KASHMIR PACKAGES
  // ------------------------------------------------------------
  {
    id: "tour-kashmir-4n5d",
    name: "Kashmir Paradise – Srinagar, Gulmarg, Pahalgam & Sonmarg",
    slug: "kashmir-paradise-4n-5d",
    duration: "4 Nights / 5 Days",
    durationDays: 5,
    durationNights: 4,
    destination: "Srinagar & Kashmir Valley",
    category: "Kashmir",
    price: 7600,
    offerPrice: 9200,
    rating: 5.0,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Srinagar to Srinagar complete circuit covering Mughal Gardens, Dal Lake Shikara ride, Gulmarg snow meadows, Pahalgam Valley of Shepherds, and Sonmarg Meadow of Gold.",
    overview: "A timeless 5-day holiday in the paradise of Kashmir. Includes stays in Srinagar, 1-hour Dal Lake Shikara ride, Gondola ride excursion in Gulmarg, Lidder River views in Pahalgam, and glacier views in Sonmarg.",
    tourLeader: "Mr. Sakthivel (Salem Tour Director)",
    hotelStars: "Deluxe & Super Deluxe Hotels / Houseboats",
    transport: "Private Sedan / XUV / Tempo Traveller (Airport to Airport)",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar & Dal Lake Shikara",
        desc: "Upon arrival at Srinagar Airport, you will be transferred to your hotel or houseboat for check-in. After freshening up, proceed for local sightseeing covering the beautiful Mughal Gardens (Nishat Bagh, Shalimar Bagh) and Dal Lake. In the evening, enjoy a relaxing 1-hour Shikara ride. Overnight stay in Srinagar.",
        hotel: "Srinagar Deluxe Hotel / Premium Houseboat",
        meals: "Dinner Included",
        activities: ["Airport Transfer", "Mughal Gardens", "Dal Lake Shikara Ride"]
      },
      {
        day: 2,
        title: "Excursion to Gulmarg (Meadow of Flowers)",
        desc: "After breakfast, drive to Gulmarg, one of the most scenic destinations in Kashmir known for its lush meadows and snow activities. Enjoy the famous Gondola ride (Asia's highest cable car) and scenic mountain landscapes. Return to Srinagar for an overnight stay.",
        hotel: "Srinagar Deluxe Hotel",
        meals: "Breakfast & Dinner Included",
        activities: ["Gulmarg Gondola Ride", "Snow Point", "Pine Forest Walk"]
      },
      {
        day: 3,
        title: "Excursion to Pahalgam (Valley of Shepherds)",
        desc: "After breakfast, proceed to Pahalgam, surrounded by beautiful mountains and the Lidder River. Visit saffron fields and explore Betaab Valley and Aru Valley with local union vehicles. Return to Srinagar for overnight stay.",
        hotel: "Srinagar Deluxe Hotel",
        meals: "Breakfast & Dinner Included",
        activities: ["Lidder River", "Betaab Valley", "Aru Valley", "Saffron Fields"]
      },
      {
        day: 4,
        title: "Excursion to Sonmarg (Meadow of Gold)",
        desc: "After breakfast, head towards Sonmarg, famous for its breathtaking glaciers and scenic beauty. Opt for pony rides or short excursions to Thajiwas Glacier. Later, return to Srinagar for an overnight stay.",
        hotel: "Srinagar Deluxe Hotel",
        meals: "Breakfast & Dinner Included",
        activities: ["Sonmarg Valley", "Thajiwas Glacier View", "Sindh River"]
      },
      {
        day: 5,
        title: "Srinagar Airport Departure",
        desc: "After breakfast, check out from the hotel and proceed to Srinagar Airport for your onward journey with fond memories of Kashmir.",
        hotel: "Departure Transit",
        meals: "Breakfast Included",
        activities: ["Airport Drop", "Souvenir Shopping"]
      }
    ],
    inclusions: [
      "Accommodation (Hotel/Houseboat) for 4 nights",
      "Meals as per plan (MAP: Breakfast & Dinner)",
      "All transfers & sightseeing by private vehicle",
      "Airport pick-up & drop at Srinagar",
      "1 Hour Shikara ride at Dal Lake",
      "Driver allowance, tolls, parking and fuel charges",
      "All applicable taxes"
    ],
    exclusions: [
      "Airfare / train fare to Srinagar",
      "Gondola tickets, pony rides",
      "Union vehicle charges in Pahalgam/Sonmarg",
      "Entry fees, guide charges, boating",
      "Adventure activities (skiing, rafting, etc.)",
      "Personal expenses (laundry, tips, shopping)"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", offSeason: "₹12,400", inSeason: "₹13,400", deluxe: "₹15,300", superDeluxe: "₹17,300" },
      { pax: "3 Pax", vehicle: "1 Room, Sedan", offSeason: "₹9,500", inSeason: "₹10,100", deluxe: "₹12,000", superDeluxe: "₹15,000" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", offSeason: "₹9,100", inSeason: "₹10,300", deluxe: "₹11,600", superDeluxe: "₹14,500" },
      { pax: "5 Pax", vehicle: "2 Rooms, XUV", offSeason: "₹8,700", inSeason: "₹9,300", deluxe: "₹11,100", superDeluxe: "₹14,100" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", offSeason: "₹8,300", inSeason: "₹9,400", deluxe: "₹10,700", superDeluxe: "₹13,700" },
      { pax: "8 Pax", vehicle: "4 Rooms, Tempo", offSeason: "₹8,600", inSeason: "₹10,100", deluxe: "₹11,800", superDeluxe: "₹13,800" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", offSeason: "₹7,600", inSeason: "₹9,200", deluxe: "₹11,000", superDeluxe: "₹13,000" }
    ],
    published: true,
    featured: true
  },
  {
    id: "tour-kashmir-5n6d",
    name: "Jammu – Kashmir Classic Route",
    slug: "jammu-kashmir-5n-6d",
    duration: "5 Nights / 6 Days",
    durationDays: 6,
    durationNights: 5,
    destination: "Jammu to Srinagar Circuit",
    category: "Kashmir",
    price: 9600,
    offerPrice: 11700,
    rating: 4.9,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Scenic overland journey starting from Jammu railway station through mountain tunnels into Srinagar, covering Gulmarg, Pahalgam, Sonmarg, and return drop at Jammu.",
    overview: "Ideal for travellers arriving by train at Jammu Tawi. Enjoy scenic mountain roads, Dal Lake houseboats, Gulmarg Gondola views, Pahalgam Betaab valley, and Sonmarg glaciers.",
    tourLeader: "Certified SK Tours Mountain Captain",
    hotelStars: "Deluxe & Super Deluxe Hotels",
    transport: "Private Sedan / XUV / Tempo Traveller (Jammu to Jammu)",
    itinerary: [
      { day: 1, title: "Jammu to Srinagar Scenic Drive", desc: "Upon arrival at Jammu, transfer to Srinagar by road through valleys and mountain tunnels. Check in to hotel. Overnight stay in Srinagar.", hotel: "Srinagar Hotel", meals: "Dinner Included", activities: ["Scenic Road Trip", "Hotel Check-in"] },
      { day: 2, title: "Srinagar Local Sightseeing", desc: "Visit Mughal Gardens, Nishat Bagh, Shalimar Bagh, and Dal Lake with optional Shikara ride. Overnight stay in Srinagar.", hotel: "Srinagar Hotel", meals: "Breakfast & Dinner", activities: ["Mughal Gardens", "Dal Lake"] },
      { day: 3, title: "Gulmarg Snow Excursion", desc: "Drive to Gulmarg, enjoy snow activities and Gondola cable car ride. Return to Srinagar.", hotel: "Srinagar Hotel", meals: "Breakfast & Dinner", activities: ["Gondola Cable Car", "Snow Points"] },
      { day: 4, title: "Pahalgam Valley Excursion", desc: "Visit Pahalgam, Lidder riverbanks, and Betaab Valley. Return to Srinagar in the evening.", hotel: "Srinagar Hotel", meals: "Breakfast & Dinner", activities: ["Lidder River", "Betaab Valley"] },
      { day: 5, title: "Sonmarg Meadow of Gold", desc: "Day trip to Sonmarg offering stunning glacier views. Return to Srinagar for final overnight.", hotel: "Srinagar Hotel", meals: "Breakfast & Dinner", activities: ["Glacier Views", "Pony Rides"] },
      { day: 6, title: "Srinagar to Jammu & Departure", desc: "Drive back to Jammu. Drop at railway station or airport for onward return journey.", hotel: "Return Transit", meals: "Breakfast Included", activities: ["Jammu Drop"] }
    ],
    inclusions: [
      "Accommodation for 5 nights (Hotel/Houseboat)",
      "Meals as per plan (Breakfast & Dinner)",
      "All transfers & sightseeing by private vehicle",
      "Jammu pick-up & drop",
      "1 Hour Shikara ride at Dal Lake",
      "Driver allowance, tolls & parking"
    ],
    exclusions: [
      "Airfare / train fare",
      "Gondola tickets, pony rides",
      "Union vehicle charges in Pahalgam/Sonmarg",
      "Entry fees, guide charges"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", offSeason: "₹17,500", inSeason: "₹19,500", deluxe: "₹21,800", superDeluxe: "₹24,300" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", offSeason: "₹12,100", inSeason: "₹13,900", deluxe: "₹16,300", superDeluxe: "₹18,800" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", offSeason: "₹10,400", inSeason: "₹12,900", deluxe: "₹14,700", superDeluxe: "₹17,100" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", offSeason: "₹9,600", inSeason: "₹11,700", deluxe: "₹13,900", superDeluxe: "₹16,400" }
    ],
    published: true,
    featured: false
  },
  {
    id: "tour-kashmir-gurez-6n7d",
    name: "Kashmir with Untouched Gurez Valley",
    slug: "kashmir-gurez-valley-6n-7d",
    duration: "6 Nights / 7 Days",
    durationDays: 7,
    durationNights: 6,
    destination: "Gurez Valley, Srinagar, Gulmarg & Pahalgam",
    category: "Kashmir",
    price: 13200,
    offerPrice: 15800,
    rating: 5.0,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Offbeat luxury expedition crossing Razdan Pass into the untouched border paradise of Gurez Valley, Kishanganga riverbanks, combined with Srinagar, Gulmarg, and Pahalgam.",
    overview: "Experience Gurez Valley—voted India's best offbeat destination. Cross the dramatic Razdan Pass, witness the majestic Habba Khatoon peak, and explore Dal Lake, Gulmarg, Sonmarg, and Pahalgam.",
    tourLeader: "Senior Salem Himalayan Guide",
    hotelStars: "Premium Hotels & Riverside Wooden Cottages",
    transport: "Private 4x4 / Luxury XUV / Tempo Traveller",
    itinerary: [
      { day: 1, title: "Arrival Srinagar & Local Sightseeing", desc: "Arrival at Srinagar airport, check in to hotel/houseboat. Local sightseeing covering Dal Lake and Mughal Gardens with evening Shikara ride.", hotel: "Srinagar Hotel", meals: "Dinner Included", activities: ["Airport Pickup", "Dal Lake Shikara"] },
      { day: 2, title: "Srinagar to Gurez Valley via Razdan Pass", desc: "Drive to Gurez Valley via scenic Razdan Pass (11,672 ft). Check in to hotel/camp amidst pristine mountain scenery. Overnight stay in Gurez.", hotel: "Gurez Valley Resort/Camp", meals: "Breakfast & Dinner", activities: ["Razdan Pass", "Habba Khatoon Peak View"] },
      { day: 3, title: "Gurez Exploration & Return to Srinagar", desc: "Explore Kishanganga riverbanks and local border culture. Later drive back to Srinagar. Overnight stay in Srinagar.", hotel: "Srinagar Hotel", meals: "Breakfast & Dinner", activities: ["Kishanganga River", "Border Villages"] },
      { day: 4, title: "Gulmarg Gondola Excursion", desc: "Full-day excursion to Gulmarg for snow activities and Gondola rides. Return to Srinagar.", hotel: "Srinagar Hotel", meals: "Breakfast & Dinner", activities: ["Gulmarg Gondola", "Snow Activities"] },
      { day: 5, title: "Sonmarg Glacier Excursion", desc: "Drive to Sonmarg Meadow of Gold and Thajiwas Glacier. Return to Srinagar.", hotel: "Srinagar Hotel", meals: "Breakfast & Dinner", activities: ["Sonmarg Meadow", "Thajiwas Glacier"] },
      { day: 6, title: "Srinagar to Pahalgam", desc: "Proceed to Pahalgam Valley of Shepherds, visit Betaab and Aru Valleys before checking in to hotel in Pahalgam.", hotel: "Pahalgam Resort", meals: "Breakfast & Dinner", activities: ["Pahalgam Valley", "Betaab Valley"] },
      { day: 7, title: "Pahalgam to Srinagar Airport Drop", desc: "Check out and drive to Srinagar airport for onward flight with unforgettable memories.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Airport Drop"] }
    ],
    inclusions: [
      "Accommodation for 6 nights",
      "Daily breakfast & dinner",
      "All sightseeing and transfers by private vehicle",
      "Excursions to Gurez Valley, Gulmarg, Sonmarg & Pahalgam",
      "Shikara ride in Dal Lake",
      "Driver allowance, tolls, parking & fuel charges"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Gondola tickets, pony rides & adventure activities",
      "Union taxi charges in Pahalgam/Sonmarg",
      "Personal expenses & travel insurance"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", offSeason: "₹20,800", inSeason: "₹23,500", deluxe: "₹23,500", superDeluxe: "₹29,000" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", offSeason: "₹15,000", inSeason: "₹17,400", deluxe: "₹17,400", superDeluxe: "₹23,100" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", offSeason: "₹13,800", inSeason: "₹16,300", deluxe: "₹16,300", superDeluxe: "₹21,800" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", offSeason: "₹13,200", inSeason: "₹15,800", deluxe: "₹15,800", superDeluxe: "₹21,400" }
    ],
    published: true,
    featured: true
  },
  {
    id: "tour-beyond-kashmir-4n5d",
    name: "Beyond Kashmir – Hidden Valleys & Alpine Treks",
    slug: "beyond-kashmir-hidden-valleys-4n-5d",
    duration: "4 Nights / 5 Days",
    durationDays: 5,
    durationNights: 4,
    destination: "Naranag, Domail & Sonamarg",
    category: "Kashmir",
    price: 11500,
    offerPrice: 13200,
    rating: 5.0,
    reviewsCount: 24,
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
    ],
    description: "A journey beyond the usual tourist routes of Kashmir, exploring hidden valleys, alpine landscapes, village stays in Naranag, and peaceful Himalayan experiences.",
    overview: "Step away from crowded tourist tracks to experience the untouched wilderness of Kashmir. Highlights include traditional village homestay in historic Naranag, alpine stream trek to Domail and Marchoi, lakeside/riverside camping with bonfires, and Dal Lake Shikara ride.",
    tourLeader: "Mr. Sakthivel (Salem Tour Director)",
    hotelStars: "Charming Himalayan Homestay & Riverside Campsite",
    transport: "Private Vehicle (Jammu to Jammu Entire Tour)",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jammu & Scenic Drive to Srinagar",
        desc: "Arrival at Jammu followed by a scenic drive to Srinagar through the beautiful mountain roads of Kashmir. Upon arrival, check in to the hotel and relax before exploring nearby local areas and enjoying the peaceful atmosphere of Srinagar. Overnight stay in Srinagar.",
        hotel: "Srinagar Deluxe Hotel",
        meals: "Dinner Included",
        activities: ["Scenic Mountain Drive", "Local Market Stroll", "Srinagar Arrival"]
      },
      {
        day: 2,
        title: "Srinagar to Naranag Heritage Village",
        desc: "After breakfast, proceed towards the beautiful Naranag Valley with en-route sightseeing at Ganderbal. Naranag is a peaceful Himalayan village surrounded by forests and mountains, known for its hidden trekking routes, 8th-century temple ruins, and untouched natural beauty. Upon arrival, check in to the homestay and spend the evening exploring the village surroundings. Overnight stay in Naranag.",
        hotel: "Traditional Naranag Himalayan Homestay",
        meals: "Breakfast & Dinner Included",
        activities: ["Ganderbal Viewpoint", "Naranag Ancient Temple Ruins", "Village Exploration"]
      },
      {
        day: 3,
        title: "Trek to Domail & Riverside Camping / Marchoi Valley",
        desc: "After breakfast, enjoy a short trek to Domail, a scenic meadow where two mountain streams meet amidst breathtaking Himalayan landscapes. Guests can also opt for an extended trek to Marchoi, an untouched alpine valley famous for its rivers, meadows, and raw mountain beauty. Later enjoy a peaceful riverside camping experience with dinner and overnight stay.",
        hotel: "Scenic Alpine Riverside Camp",
        meals: "Breakfast & Camp Dinner Included",
        activities: ["Domail Stream Confluence Trek", "Marchoi Alpine Exploration", "Riverside Campfire"]
      },
      {
        day: 4,
        title: "Sonamarg Meadow of Gold & Astanmarg Bonfire",
        desc: "After breakfast, transfer to Sonamarg, popularly known as the Meadow of Gold, famous for its glaciers, alpine scenery, and breathtaking mountain landscapes. Explore the surrounding valleys and later check in to the Astanmarg homestay. Enjoy an evening bonfire and jam session followed by dinner and overnight stay.",
        hotel: "Astanmarg Scenic Homestay",
        meals: "Breakfast & Dinner Included",
        activities: ["Sonamarg Glacier Exploration", "Astanmarg Valley View", "Bonfire & Music Session"]
      },
      {
        day: 5,
        title: "Dal Lake Shikara Experience & Jammu Departure",
        desc: "After breakfast, enjoy a traditional Shikara ride on Dal Lake while admiring the floating markets, houseboats, and mountain views. Later proceed towards Jammu for your return journey with unforgettable memories of Kashmir.",
        hotel: "Departure Transit",
        meals: "Breakfast Included",
        activities: ["Dal Lake Shikara Ride", "Floating Gardens", "Transfer to Jammu"]
      }
    ],
    inclusions: [
      "Accommodation in authentic homestay / riverside camp for 4 nights",
      "Daily breakfast & dinner",
      "Transportation for the entire trip (Jammu to Jammu)",
      "Guided trek experience to Domail confluence",
      "Riverside camping experience",
      "Evening bonfire & musical jam session",
      "Traditional Shikara ride at Dal Lake",
      "Driver allowance, tolls, fuel and parking charges"
    ],
    exclusions: [
      "Flights or train tickets to Jammu",
      "Personal expenses (laundry, telephone, tips)",
      "Lunch during travel days",
      "Entry tickets & local camera permits if applicable",
      "Any activities not specifically mentioned in the itinerary"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", offSeason: "₹14,500", inSeason: "₹16,500", deluxe: "₹18,500", superDeluxe: "₹21,500" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", offSeason: "₹12,800", inSeason: "₹14,200", deluxe: "₹16,000", superDeluxe: "₹18,500" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", offSeason: "₹11,500", inSeason: "₹13,200", deluxe: "₹14,800", superDeluxe: "₹17,200" },
      { pax: "8 Pax", vehicle: "4 Rooms, Tempo", offSeason: "₹10,800", inSeason: "₹12,500", deluxe: "₹13,900", superDeluxe: "₹16,400" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", offSeason: "₹9,800", inSeason: "₹11,500", deluxe: "₹12,800", superDeluxe: "₹15,200" }
    ],
    published: true,
    featured: true
  },

  // ------------------------------------------------------------
  // 2. HIMACHAL PACKAGES
  // ------------------------------------------------------------
  {
    id: "tour-manali-kasol-4n5d",
    name: "Manali & Kasol Valley with Manikaran Sahib",
    slug: "manali-kasol-4n-5d",
    duration: "4 Nights / 5 Days",
    durationDays: 5,
    durationNights: 4,
    destination: "Manali, Kasol & Parvati Valley",
    category: "Himachal",
    price: 5000,
    offerPrice: 6500,
    rating: 4.9,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Scenic Delhi to Delhi Himachal holiday covering Manali local temples, Solang Valley adventure hub, Kullu river rafting, Kasol hippie cafes, and Manikaran hot water springs.",
    overview: "The quintessential Himachal getaway. Board luxury AC Volvo from Delhi, explore Hadimba Temple and Mall Road, experience Solang Valley snow sports, and visit holy Manikaran Sahib hot springs in Parvati Valley.",
    tourLeader: "SK Tours Himachal Team",
    hotelStars: "3-Star & 4-Star Mountain View Resorts",
    transport: "Delhi-Manali AC Volvo + Private Cab for Sightseeing",
    itinerary: [
      { day: 1, title: "Delhi to Manali Overnight Volvo", desc: "Board the luxury AC Volvo coach in Delhi in the evening for an overnight journey to Manali across Himalayan mountain highways.", hotel: "Overnight Volvo Coach", meals: "Dinner (En Route Self)", activities: ["Volvo Journey"] },
      { day: 2, title: "Manali Local Sightseeing", desc: "Morning arrival in Manali. Check in to hotel. Visit Hadimba Temple, Vashisht Hot Springs, Club House, Tibetan Monastery, and Mall Road.", hotel: "Manali Resort", meals: "Dinner Included", activities: ["Hadimba Temple", "Mall Road", "Vashisht Springs"] },
      { day: 3, title: "Solang Valley & Snow Point", desc: "Excursion to Solang Valley for paragliding, ropeway, and snow scooter activities. Return to Manali for overnight stay.", hotel: "Manali Resort", meals: "Breakfast & Dinner Included", activities: ["Solang Valley", "Paragliding", "Snow Activities"] },
      { day: 4, title: "Kullu, Kasol & Manikaran Sahib", desc: "Check out, proceed to Kullu for river rafting and shawl factories, visit Kasol cafes and Manikaran Sahib hot springs. Board evening Volvo to Delhi.", hotel: "Overnight Volvo Coach", meals: "Breakfast Included", activities: ["Kullu Rafting", "Kasol Cafes", "Manikaran Sahib"] },
      { day: 5, title: "Delhi Arrival", desc: "Arrive in Delhi in the morning, marking the conclusion of a wonderful Himachal tour.", hotel: "Departure Transit", meals: "Self", activities: ["Delhi Drop"] }
    ],
    inclusions: [
      "Accommodation in Manali for 2 nights",
      "Meals as per plan (3 Breakfast, 2 Dinner)",
      "Volvo bus tickets for Delhi – Manali – Delhi",
      "All local sightseeing & transfers by private vehicle",
      "Driver allowance, tolls & parking charges",
      "All applicable taxes"
    ],
    exclusions: [
      "Airfare/train fare to Delhi",
      "Adventure activities (paragliding, skiing, rafting)",
      "Entry fees, guide charges & permits",
      "Personal expenses (laundry, tips, shopping)"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", offSeason: "₹8,500", inSeason: "₹9,900", deluxe: "₹11,800", superDeluxe: "₹12,800" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", offSeason: "₹6,400", inSeason: "₹7,400", deluxe: "₹9,300", superDeluxe: "₹10,300" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", offSeason: "₹5,800", inSeason: "₹6,800", deluxe: "₹8,700", superDeluxe: "₹9,700" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", offSeason: "₹5,000", inSeason: "₹6,000", deluxe: "₹7,900", superDeluxe: "₹8,900" }
    ],
    published: true,
    featured: true
  },
  {
    id: "tour-manali-kasol-5n6d",
    name: "Manali with Kasol & Atal Tunnel",
    slug: "manali-kasol-atal-tunnel-5n-6d",
    duration: "5 Nights / 6 Days",
    durationDays: 6,
    durationNights: 5,
    destination: "Manali, Solang, Atal Tunnel & Kasol",
    category: "Himachal",
    price: 7800,
    offerPrice: 9500,
    rating: 5.0,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Extended Himachal journey including Solang Valley, the engineering marvel of Atal Tunnel into Lahaul valley, riverside night stay in Kasol, and Manikaran Gurudwara.",
    overview: "Upgrade your holiday with an exclusive stay in Kasol. Drive through the historic Atal Tunnel, witness dramatic Lahaul mountain landscapes, and relax by the Parvati River in Kasol.",
    tourLeader: "SK Tours Himachal Mountain Team",
    hotelStars: "Deluxe & Super Deluxe Hotels (Manali 2N + Kasol 1N)",
    transport: "Delhi to Manali/Kasol Transportation + Private Vehicle",
    itinerary: [
      { day: 1, title: "Delhi to Manali Overnight Journey", desc: "Overnight Volvo/private vehicle journey from Delhi through scenic mountain routes.", hotel: "Overnight Coach", meals: "Self", activities: ["Overnight Transit"] },
      { day: 2, title: "Manali Local Sightseeing", desc: "Check in to hotel, visit Hadimba Devi Temple, Old Manali, Mall Road, and Tibetan Monastery.", hotel: "Manali Hotel", meals: "Dinner Included", activities: ["Hadimba Temple", "Old Manali"] },
      { day: 3, title: "Solang Valley & Atal Tunnel", desc: "Full day excursion to Solang Valley snow hub and drive through the famous Atal Tunnel into Lahaul Valley.", hotel: "Manali Hotel", meals: "Breakfast & Dinner", activities: ["Solang Valley", "Atal Tunnel", "Lahaul View"] },
      { day: 4, title: "Manali to Kasol via Kullu", desc: "Drive to Kasol along Parvati river, explore Kullu shawl factories, visit Manikaran Gurudwara. Overnight stay in Kasol.", hotel: "Kasol Riverside Hotel", meals: "Breakfast & Dinner", activities: ["Manikaran Sahib", "Parvati River"] },
      { day: 5, title: "Kasol Sightseeing & Return to Delhi", desc: "Explore Chalal village, riverside cafes in Kasol, evening departure to Delhi.", hotel: "Overnight Coach", meals: "Breakfast Included", activities: ["Chalal Village", "Kasol Cafes"] },
      { day: 6, title: "Delhi Arrival", desc: "Morning arrival in Delhi at airport/railway station.", hotel: "Departure Transit", meals: "Self", activities: ["Delhi Drop"] }
    ],
    inclusions: [
      "Accommodation for 3 nights (2N Manali, 1N Kasol)",
      "Daily breakfast & dinner",
      "Delhi to Manali & Kasol to Delhi transportation",
      "All sightseeing & transfers by private vehicle",
      "Solang Valley & Atal Tunnel excursion",
      "Driver allowance, tolls & fuel"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Adventure activities charges",
      "Entry tickets & guide charges",
      "Personal expenses"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", offSeason: "₹11,700", inSeason: "₹13,700", deluxe: "₹16,200", superDeluxe: "₹17,600" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", offSeason: "₹9,200", inSeason: "₹10,800", deluxe: "₹13,400", superDeluxe: "₹14,700" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", offSeason: "₹8,500", inSeason: "₹9,900", deluxe: "₹12,500", superDeluxe: "₹13,800" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", offSeason: "₹7,800", inSeason: "₹9,500", deluxe: "₹12,000", superDeluxe: "₹13,300" }
    ],
    published: true,
    featured: false
  },

  // ------------------------------------------------------------
  // 3. DELHI & AGRA PACKAGES
  // ------------------------------------------------------------
  {
    id: "tour-delhi-agra-2n3d",
    name: "Delhi & Agra Mughal Heritage",
    slug: "delhi-agra-2n-3d",
    duration: "2 Nights / 3 Days",
    durationDays: 3,
    durationNights: 2,
    destination: "Delhi & Taj Mahal, Agra",
    category: "Delhi & Agra",
    price: 7200,
    offerPrice: 8500,
    rating: 4.8,
    reviewsCount: 34,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Compact Golden Triangle heritage tour covering India Gate, Qutub Minar, Red Fort, and a day trip to the world-famous Taj Mahal and Agra Fort.",
    overview: "Witness the Seventh Wonder of the World. A seamless Delhi and Agra package featuring comfortable hotel stays, Yamuna Expressway private transfers, Taj Mahal, and Chandni Chowk.",
    tourLeader: "SK Tours Cultural Guide",
    hotelStars: "Deluxe & Luxury 4-Star / 5-Star City Hotels",
    transport: "Private AC Sedan / XUV / Tempo Traveller",
    itinerary: [
      { day: 1, title: "Delhi Arrival & Sightseeing", desc: "Arrival at Delhi airport/railway station. Visit India Gate, Qutub Minar, Lotus Temple, and Connaught Place. Overnight stay in Delhi.", hotel: "Delhi Hotel", meals: "Dinner Included", activities: ["India Gate", "Qutub Minar", "Lotus Temple"] },
      { day: 2, title: "Agra Day Excursion (Taj Mahal)", desc: "Proceed to Agra via Yamuna Expressway. Visit the world-famous Taj Mahal and Agra Fort. Explore local marble handicraft markets before returning to Delhi.", hotel: "Delhi Hotel", meals: "Breakfast & Dinner", activities: ["Taj Mahal", "Agra Fort", "Marble Crafts"] },
      { day: 3, title: "Old Delhi Heritage & Departure", desc: "Visit Red Fort, Jama Masjid, Raj Ghat, and Chandni Chowk market. Transfer to airport/railway station for departure.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Red Fort", "Jama Masjid", "Chandni Chowk"] }
    ],
    inclusions: [
      "Accommodation for 2 nights in Delhi",
      "Daily breakfast & dinner at hotel",
      "Pickup & drop from Delhi airport/railway station",
      "Agra day excursion by private vehicle",
      "Driver allowance, tolls, parking & taxes"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Taj Mahal & monument entry tickets",
      "Guide charges & camera fees",
      "Lunch & personal expenses"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", offSeason: "₹11,300", inSeason: "₹11,300", deluxe: "₹12,000", superDeluxe: "₹12,800", luxury: "₹21,000" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", offSeason: "₹8,000", inSeason: "₹8,000", deluxe: "₹8,600", superDeluxe: "₹9,500", luxury: "₹18,300" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", offSeason: "₹7,200", inSeason: "₹7,200", deluxe: "₹7,800", superDeluxe: "₹8,800", luxury: "₹17,200" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", offSeason: "₹7,200", inSeason: "₹7,200", deluxe: "₹7,800", superDeluxe: "₹8,700", luxury: "₹16,400" }
    ],
    published: true,
    featured: false
  },
  {
    id: "tour-delhi-agra-3n4d",
    name: "Delhi – Agra Golden Triangle Discovery",
    slug: "delhi-agra-golden-triangle-3n-4d",
    duration: "3 Nights / 4 Days",
    durationDays: 4,
    durationNights: 3,
    destination: "Delhi & Agra",
    category: "Delhi & Agra",
    price: 9100,
    offerPrice: 10600,
    rating: 4.9,
    reviewsCount: 27,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Extended Golden Triangle itinerary with in-depth Delhi exploration, Mughal monuments, Yamuna Expressway drive to Agra Taj Mahal, Agra Fort, and Mehtab Bagh sunset.",
    overview: "Experience India's capital and the Mughal dynasty's architectural jewels at an unhurried pace. Perfect for families seeking comfortable accommodations and expert guidance.",
    tourLeader: "SK Tours Cultural Expert",
    hotelStars: "Deluxe, Super Deluxe & Luxury 5-Star Options",
    transport: "Private AC Vehicle (Sedan / XUV / Tempo)",
    itinerary: [
      { day: 1, title: "Delhi Arrival & Modern Sights", desc: "Arrival in Delhi, hotel check-in. Visit India Gate, Qutub Minar, and Connaught Place.", hotel: "Delhi Hotel", meals: "Dinner Included", activities: ["India Gate", "Qutub Minar"] },
      { day: 2, title: "Historic Delhi City Tour", desc: "Full day sightseeing covering Red Fort, Jama Masjid, Raj Ghat, Lotus Temple, and Chandni Chowk shopping.", hotel: "Delhi Hotel", meals: "Breakfast & Dinner", activities: ["Red Fort", "Raj Ghat", "Chandni Chowk"] },
      { day: 3, title: "Agra Taj Mahal Excursion", desc: "Drive to Agra, visit Taj Mahal and Agra Fort. Explore local handicrafts before returning to Delhi.", hotel: "Delhi Hotel", meals: "Breakfast & Dinner", activities: ["Taj Mahal", "Agra Fort"] },
      { day: 4, title: "Delhi Shopping & Departure", desc: "Check out, morning shopping at Dilli Haat or Janpath, transfer to airport/railway station.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Shopping", "Airport Drop"] }
    ],
    inclusions: [
      "Accommodation for 3 nights in Delhi",
      "Daily breakfast & dinner at hotel",
      "Pickup & drop from Delhi airport/railway station",
      "Private vehicle for all transfers & sightseeing",
      "Agra excursion as per itinerary",
      "Tolls, parking, driver bata & taxes"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Monuments entry tickets & camera fees",
      "Guide charges & lunch"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", offSeason: "₹14,000", inSeason: "₹14,000", deluxe: "₹14,900", superDeluxe: "₹16,300", luxury: "₹21,000" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", offSeason: "₹10,100", inSeason: "₹10,100", deluxe: "₹11,000", superDeluxe: "₹12,400", luxury: "₹18,300" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", offSeason: "₹9,100", inSeason: "₹9,100", deluxe: "₹10,000", superDeluxe: "₹11,400", luxury: "₹17,200" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", offSeason: "₹9,400", inSeason: "₹9,400", deluxe: "₹10,300", superDeluxe: "₹11,700", luxury: "₹16,400" }
    ],
    published: true,
    featured: false
  },

  // ------------------------------------------------------------
  // 4. RAJASTHAN PACKAGES
  // ------------------------------------------------------------
  {
    id: "tour-rajasthan-jaisalmer-4n5d",
    name: "Rajasthan Royal Heritage – Jaipur, Jodhpur & Jaisalmer Desert Camp",
    slug: "rajasthan-jaipur-jodhpur-jaisalmer-4n-5d",
    duration: "4 Nights / 5 Days",
    durationDays: 5,
    durationNights: 4,
    destination: "Jaipur, Jodhpur & Jaisalmer Sam Dunes",
    category: "Rajasthan",
    price: 14800,
    offerPrice: 17300,
    rating: 5.0,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Royal desert circuit across the Pink City of Jaipur, Blue City of Jodhpur, Golden City of Jaisalmer, and overnight luxury Swiss tent desert camp with camel safari at Sam Sand Dunes.",
    overview: "Immerse in royal Rajputana splendor. Visit Amber Fort, Hawa Mahal, Mehrangarh Fort, Jaswant Thada, Jaisalmer Golden Fort, and experience Thar Desert camel safari with traditional Rajasthani folk dances and dinner.",
    tourLeader: "Royal Rajasthan Tour Escort",
    hotelStars: "Heritage Haveli Hotels & Luxury Desert Camp",
    transport: "Private AC Vehicle (Sedan / XUV / Tempo Traveller)",
    nightStay: "Jaipur 1N • Jodhpur 1N • Jaisalmer Hotel 1N • Sam Desert Camp 1N",
    itinerary: [
      { day: 1, title: "Arrival at Jaipur (Pink City)", desc: "Arrival at Jaipur, transfer to hotel. Visit Amber Fort, Jal Mahal, and Hawa Mahal before returning to hotel. Overnight stay in Jaipur.", hotel: "Jaipur Heritage Hotel", meals: "Dinner Included", activities: ["Amber Fort", "Jal Mahal", "Hawa Mahal"] },
      { day: 2, title: "Jaipur to Jodhpur (Blue City)", desc: "Visit City Palace and Jantar Mantar. Drive to Jodhpur. Check in to hotel and spend the evening at leisure.", hotel: "Jodhpur Hotel", meals: "Breakfast & Dinner", activities: ["City Palace", "Jantar Mantar", "Jodhpur Drive"] },
      { day: 3, title: "Jodhpur to Jaisalmer (Golden City)", desc: "Visit Mehrangarh Fort and Jaswant Thada. Proceed to Jaisalmer. Check in to hotel and relax.", hotel: "Jaisalmer City Hotel", meals: "Breakfast & Dinner", activities: ["Mehrangarh Fort", "Jaswant Thada"] },
      { day: 4, title: "Jaisalmer Sightseeing & Sam Desert Camp", desc: "Visit Jaisalmer Golden Fort, Patwon Ki Haveli, and Gadisar Lake. Drive to Sam Sand Dunes for desert camp check-in, camel safari, and Rajasthani cultural performance with dinner.", hotel: "Sam Sand Dunes Swiss Tent Camp", meals: "Breakfast & Gala Dinner", activities: ["Golden Fort", "Camel Safari", "Folk Dance & Bonfire"] },
      { day: 5, title: "Jaisalmer Departure", desc: "Breakfast at desert camp, check out and transfer to Jaisalmer Airport or Railway Station.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Desert Camp Checkout", "Airport Drop"] }
    ],
    inclusions: [
      "4 nights accommodation (Jaipur 1N, Jodhpur 1N, Jaisalmer 1N, Sam Camp 1N)",
      "Daily breakfast at hotels",
      "1 royal buffet dinner at Sam Desert Camp with cultural performances",
      "Camel safari at Sam Sand Dunes",
      "Private vehicle for transfers & sightseeing",
      "Driver allowance, fuel, tolls, and parking"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Monument entrance fees",
      "Jeep safari & camel cart charges",
      "Lunch and personal expenses"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", deluxe: "₹24,500", superDeluxe: "₹27,700" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", deluxe: "₹17,300", superDeluxe: "₹20,300" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", deluxe: "₹14,900", superDeluxe: "₹17,300" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", deluxe: "₹14,800", superDeluxe: "₹17,200" }
    ],
    published: true,
    featured: true
  },
  {
    id: "tour-rajasthan-udaipur-4n5d",
    name: "Rajasthan Splendour – Jaipur, Jodhpur & Udaipur Lake City",
    slug: "rajasthan-jaipur-jodhpur-udaipur-4n-5d",
    duration: "4 Nights / 5 Days",
    durationDays: 5,
    durationNights: 4,
    destination: "Jaipur, Jodhpur & Udaipur",
    category: "Rajasthan",
    price: 15000,
    offerPrice: 17500,
    rating: 4.9,
    reviewsCount: 39,
    image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Experience the royal trio of Rajasthan: Amber Fort in Jaipur, Mehrangarh Fort in Jodhpur, Ranakpur Jain Temples, and 2 nights in the romantic Lake City of Udaipur.",
    overview: "From Jaipur's majestic palaces to the blue alleys of Jodhpur, winding past the marble carvings of Ranakpur to the sparkling waters of Lake Pichola and Fateh Sagar in Udaipur.",
    tourLeader: "SK Tours Rajasthan Director",
    hotelStars: "Deluxe & Super Deluxe Heritage Hotels",
    transport: "Private AC Vehicle (Sedan / XUV / Tempo)",
    nightStay: "Jaipur 1N • Jodhpur 1N • Udaipur 2N",
    itinerary: [
      { day: 1, title: "Jaipur Arrival & Palaces", desc: "Arrival in Jaipur, hotel check-in. Visit Amber Fort, Jal Mahal, and Hawa Mahal. Overnight stay in Jaipur.", hotel: "Jaipur Hotel", meals: "Dinner Included", activities: ["Amber Fort", "Jal Mahal"] },
      { day: 2, title: "Jaipur to Jodhpur", desc: "Visit City Palace and Jantar Mantar. Drive to Jodhpur. Check in to hotel, evening at leisure.", hotel: "Jodhpur Hotel", meals: "Breakfast & Dinner", activities: ["City Palace", "Jodhpur Drive"] },
      { day: 3, title: "Jodhpur to Udaipur via Ranakpur", desc: "Visit Mehrangarh Fort and Jaswant Thada. Proceed to Udaipur via Ranakpur Jain Temple. Check in to hotel.", hotel: "Udaipur Lake Hotel", meals: "Breakfast & Dinner", activities: ["Mehrangarh Fort", "Ranakpur Temple"] },
      { day: 4, title: "Udaipur Lake City Sightseeing", desc: "Explore Udaipur City Palace, Jagdish Temple, Saheliyon Ki Bari, Fateh Sagar Lake, and boat ride on Lake Pichola.", hotel: "Udaipur Lake Hotel", meals: "Breakfast & Dinner", activities: ["City Palace", "Lake Pichola Boat Ride", "Saheliyon Ki Bari"] },
      { day: 5, title: "Udaipur Departure", desc: "Breakfast, check out and transfer to Udaipur Airport or Railway Station for onward journey.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Udaipur Drop"] }
    ],
    inclusions: [
      "4 nights accommodation (Jaipur 1N, Jodhpur 1N, Udaipur 2N)",
      "Daily breakfast and dinner",
      "Private vehicle for all transfers and sightseeing",
      "Driver allowance, fuel, tolls, and parking charges",
      "Hotel taxes"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Monument entrance fees & boat ride charges",
      "Lunch & personal expenses"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", deluxe: "₹24,700", superDeluxe: "₹27,900" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", deluxe: "₹17,500", superDeluxe: "₹20,500" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", deluxe: "₹15,100", superDeluxe: "₹17,500" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", deluxe: "₹15,000", superDeluxe: "₹17,400" }
    ],
    published: true,
    featured: false
  },
  {
    id: "tour-rajasthan-grand-6n7d",
    name: "Royal Rajasthan Grand Circuit – Jaipur, Jodhpur, Jaisalmer & Udaipur",
    slug: "royal-rajasthan-grand-circuit-6n-7d",
    duration: "6 Nights / 7 Days",
    durationDays: 7,
    durationNights: 6,
    destination: "Jaipur, Jodhpur, Jaisalmer & Udaipur",
    category: "Rajasthan",
    price: 19900,
    offerPrice: 22500,
    rating: 5.0,
    reviewsCount: 61,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=600&q=80"
    ],
    description: "The complete Rajputana grand odyssey. Covers Jaipur 2N, Jodhpur 1N, Jaisalmer city 1N, Sam Desert Camp 1N, and Udaipur 1N in a seamless private circuit.",
    overview: "Our flagship Rajasthan itinerary covering all four historic kingdoms. Enjoy forts, havelis, Thar desert camel safaris with campfires, and the romantic lake palaces of Udaipur.",
    tourLeader: "SK Tours Senior Escort",
    hotelStars: "Deluxe & Super Deluxe Heritage Hotels & Desert Resort",
    transport: "Private AC Vehicle (Sedan / XUV / Tempo)",
    nightStay: "Jaipur 2N • Jodhpur 1N • Jaisalmer City 1N • Jaisalmer Desert Camp 1N • Udaipur 1N",
    itinerary: [
      { day: 1, title: "Arrival at Jaipur", desc: "Transfer to hotel, visit Amber Fort, Jal Mahal, and Hawa Mahal. Overnight stay in Jaipur.", hotel: "Jaipur Hotel", meals: "Dinner Included", activities: ["Amber Fort", "Jal Mahal"] },
      { day: 2, title: "Jaipur Sightseeing", desc: "Visit City Palace, Jantar Mantar observatory, and vibrant Bapu Bazar markets. Overnight stay in Jaipur.", hotel: "Jaipur Hotel", meals: "Breakfast & Dinner", activities: ["City Palace", "Jantar Mantar"] },
      { day: 3, title: "Jaipur to Jodhpur", desc: "Drive to Jodhpur. Visit Mehrangarh Fort and Jaswant Thada. Overnight stay in Jodhpur.", hotel: "Jodhpur Hotel", meals: "Breakfast & Dinner", activities: ["Mehrangarh Fort", "Jaswant Thada"] },
      { day: 4, title: "Jodhpur to Jaisalmer", desc: "Drive to Jaisalmer. Visit Gadisar Lake and explore the Golden City evening bazaars.", hotel: "Jaisalmer City Hotel", meals: "Breakfast & Dinner", activities: ["Gadisar Lake", "Golden City"] },
      { day: 5, title: "Jaisalmer Fort & Sam Desert Camp", desc: "Visit Jaisalmer Fort & Patwon Ki Haveli. Transfer to Sam Sand Dunes for desert camp, camel safari, and folk cultural gala dinner.", hotel: "Sam Sand Dunes Swiss Camp", meals: "Breakfast & Gala Dinner", activities: ["Jaisalmer Fort", "Camel Safari", "Cultural Show"] },
      { day: 6, title: "Jaisalmer to Udaipur", desc: "Scenic drive from Jaisalmer to the romantic lake city of Udaipur. Check in to hotel and relax.", hotel: "Udaipur Hotel", meals: "Breakfast & Dinner", activities: ["Scenic Transit to Udaipur"] },
      { day: 7, title: "Udaipur Sightseeing & Departure", desc: "Visit City Palace, Jagdish Temple, Saheliyon Ki Bari, and Fateh Sagar Lake. Transfer to Udaipur airport or railway station.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["City Palace", "Udaipur Airport Drop"] }
    ],
    inclusions: [
      "6 nights accommodation as per itinerary",
      "Daily breakfast and dinner",
      "Camel safari at Sam Sand Dunes",
      "Private vehicle for all transfers and sightseeing",
      "Driver allowance, fuel, tolls, and parking charges"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Monument entrance fees & boat ride charges",
      "Personal expenses & travel insurance"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", deluxe: "₹30,700", superDeluxe: "₹33,500" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", deluxe: "₹22,500", superDeluxe: "₹25,200" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", deluxe: "₹20,600", superDeluxe: "₹23,300" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", deluxe: "₹19,900", superDeluxe: "₹22,600" }
    ],
    published: true,
    featured: true
  },

  // ------------------------------------------------------------
  // 5. LEH – LADAKH PACKAGES
  // ------------------------------------------------------------
  {
    id: "tour-ladakh-pangong-4n5d",
    name: "Leh Ladakh & Pangong Lake Wonder",
    slug: "leh-ladakh-pangong-4n-5d",
    duration: "4 Nights / 5 Days",
    durationDays: 5,
    durationNights: 4,
    destination: "Leh, Hall of Fame & Pangong Lake",
    category: "Leh-Ladakh",
    price: 12500,
    offerPrice: 15000,
    rating: 5.0,
    reviewsCount: 36,
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Acclimatize in Leh, visit Shanti Stupa, Magnetic Hill, Indus-Zanskar Sangam, and cross Chang La Pass to camp by the turquoise waters of Pangong Tso Lake.",
    overview: "A thrilling high-altitude Himalayan adventure. Includes Leh Airport pickup/drop, oxygen cylinder backup, Inner Line Permits, and an overnight camp stay right on Pangong Lake.",
    tourLeader: "High Altitude Specialist Guide",
    hotelStars: "Deluxe & Super Deluxe Hotels / Pangong Deluxe Camps",
    transport: "Private 4x4 / Luxury Scorpio / Tempo Traveller",
    itinerary: [
      { day: 1, title: "Arrival in Leh & Acclimatization", desc: "Arrival at Leh Airport (11,500 ft) and transfer to hotel for mandatory acclimatization. Evening visit to Shanti Stupa and Leh Market.", hotel: "Leh Hotel", meals: "Dinner Included", activities: ["Acclimatization", "Shanti Stupa", "Leh Market"] },
      { day: 2, title: "Leh Local & Sham Valley Sightseeing", desc: "Sightseeing covering Magnetic Hill (gravity defiance), Gurudwara Pathar Sahib, Hall of Fame, and the Sangam of Indus & Zanskar rivers.", hotel: "Leh Hotel", meals: "Breakfast & Dinner", activities: ["Magnetic Hill", "Pathar Sahib", "Indus-Zanskar Sangam"] },
      { day: 3, title: "Leh to Pangong Lake via Chang La Pass", desc: "Drive to Pangong Lake (14,270 ft) via Chang La Pass (17,590 ft). Check in to lake camp and witness changing lake colors at sunset.", hotel: "Pangong Lake Deluxe Camp", meals: "Breakfast & Dinner", activities: ["Chang La Pass", "Pangong Lake Sunset"] },
      { day: 4, title: "Pangong Lake to Leh", desc: "Sunrise over Pangong Lake, drive back to Leh. Evening free for shopping in Leh bazaars.", hotel: "Leh Hotel", meals: "Breakfast & Dinner", activities: ["Pangong Sunrise", "Leh Shopping"] },
      { day: 5, title: "Departure from Leh", desc: "Breakfast, transfer to Leh Airport for onward flight with unforgettable memories of Ladakh.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Leh Airport Drop"] }
    ],
    inclusions: [
      "Accommodation for 4 nights (3N Leh, 1N Pangong Camp)",
      "Daily breakfast and dinner",
      "Oxygen cylinder support vehicle charges",
      "Inner Line Permits (ILP) & wildlife fees",
      "Airport pickup and drop in Leh",
      "Private vehicle for all sightseeing & transfers"
    ],
    exclusions: [
      "Airfare to and from Leh",
      "Lunch and personal expenses",
      "Entry tickets and camera charges",
      "Any expenses due to flight delays or roadblocks"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", deluxe: "₹19,600", superDeluxe: "₹21,800" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", deluxe: "₹15,000", superDeluxe: "₹17,200" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", deluxe: "₹13,400", superDeluxe: "₹15,600" },
      { pax: "8 Pax", vehicle: "4 Rooms, Tempo", deluxe: "₹12,500", superDeluxe: "₹14,700" }
    ],
    published: true,
    featured: true
  },
  {
    id: "tour-ladakh-nubra-5n6d",
    name: "Leh Ladakh with Nubra Valley & Pangong Lake",
    slug: "leh-ladakh-nubra-pangong-5n-6d",
    duration: "5 Nights / 6 Days",
    durationDays: 6,
    durationNights: 5,
    destination: "Leh, Khardung La, Nubra Valley & Pangong Lake",
    category: "Leh-Ladakh",
    price: 17000,
    offerPrice: 19600,
    rating: 5.0,
    reviewsCount: 48,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80"
    ],
    description: "The ultimate Ladakh circuit: cross Khardung La Pass (18,380 ft), ride double-humped camels in Hunder sand dunes, travel the Shyok River route to Pangong Lake, and explore Leh.",
    overview: "Witness the crown of the Himalayas. Features Diskit Monastery giant Buddha, Hunder cold desert, high-altitude Shyok river valley, and Pangong Lake camping.",
    tourLeader: "Certified Ladakh High Altitude Leader",
    hotelStars: "Deluxe & Super Deluxe Hotels & Camps (Leh 3N + Nubra 1N + Pangong 1N)",
    transport: "Private 4x4 / Luxury Scorpio / Tempo Traveller",
    itinerary: [
      { day: 1, title: "Arrival in Leh & Rest", desc: "Arrival at Leh Airport, check in and complete acclimatization rest. Evening visit to Shanti Stupa.", hotel: "Leh Hotel", meals: "Dinner Included", activities: ["Acclimatization", "Shanti Stupa"] },
      { day: 2, title: "Sham Valley Sightseeing", desc: "Visit Hall of Fame museum, Magnetic Hill, Gurudwara Pathar Sahib, and Indus-Zanskar Sangam.", hotel: "Leh Hotel", meals: "Breakfast & Dinner", activities: ["Hall of Fame", "Magnetic Hill", "Sangam"] },
      { day: 3, title: "Leh to Nubra Valley via Khardung La Pass", desc: "Drive to Nubra Valley via Khardung La (18,380 ft), one of the world's highest motorable roads. Visit Diskit Monastery and Hunder sand dunes for double-humped camel rides.", hotel: "Nubra Valley Camp/Hotel", meals: "Breakfast & Dinner", activities: ["Khardung La", "Diskit Monastery", "Hunder Sand Dunes"] },
      { day: 4, title: "Nubra Valley to Pangong Lake via Shyok", desc: "Drive along the scenic Shyok river gorge directly to Pangong Lake. Witness changing colors of the lake and check in to lake camp.", hotel: "Pangong Lake Camp", meals: "Breakfast & Dinner", activities: ["Shyok River Route", "Pangong Lake"] },
      { day: 5, title: "Pangong Lake to Leh via Chang La", desc: "Sunrise over Pangong Lake, drive back to Leh via Chang La Pass. Evening shopping in Leh Market.", hotel: "Leh Hotel", meals: "Breakfast & Dinner", activities: ["Chang La Pass", "Leh Market"] },
      { day: 6, title: "Departure from Leh", desc: "Transfer to Leh Airport for onward return flight.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Airport Drop"] }
    ],
    inclusions: [
      "Accommodation for 5 nights (3N Leh, 1N Nubra, 1N Pangong)",
      "Daily breakfast and dinner",
      "Airport pickup & drop in Leh",
      "Inner Line Permits & oxygen cylinder backup",
      "All transfers & sightseeing by private vehicle"
    ],
    exclusions: [
      "Airfare to/from Leh",
      "Camel ride in Hunder & ATV charges",
      "Personal expenses & monument entry tickets"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", deluxe: "₹27,600", superDeluxe: "₹30,100" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", deluxe: "₹19,600", superDeluxe: "₹22,100" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", deluxe: "₹17,000", superDeluxe: "₹19,500" },
      { pax: "8 Pax", vehicle: "4 Rooms, Tempo", deluxe: "₹19,800", superDeluxe: "₹22,600" }
    ],
    published: true,
    featured: true
  },

  // ------------------------------------------------------------
  // 6. KERALA PACKAGES
  // ------------------------------------------------------------
  {
    id: "tour-wayanad-2n3d",
    name: "Wayanad Hill Retreat & Waterfalls",
    slug: "wayanad-hill-retreat-2n-3d",
    duration: "2 Nights / 3 Days",
    durationDays: 3,
    durationNights: 2,
    destination: "Wayanad, Kerala (Ex-Kozhikode)",
    category: "Kerala",
    price: 5900,
    offerPrice: 7000,
    rating: 4.8,
    reviewsCount: 33,
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Scenic Western Ghats getaway covering Pookode Lake boating, Lakkidi View Point ghat views, prehistoric Edakkal Caves, and lush Soochipara Waterfalls.",
    overview: "Escape into the verdant misty hills of Wayanad. Pick-up from Kozhikode (Calicut), winding mountain drive, spice plantation walks, and tea estate tranquility.",
    tourLeader: "Salem Kerala Tour Executive",
    hotelStars: "Deluxe Plantation Resorts & Treehouses",
    transport: "Private AC Vehicle (Kozhikode to Kozhikode)",
    itinerary: [
      { day: 1, title: "Kozhikode to Wayanad Ghat Drive", desc: "Pickup from Kozhikode railway/airport. Scenic drive via Thamarassery ghats. Visit Pookode Lake for boating and Lakkidi View Point. Check in to resort.", hotel: "Wayanad Resort", meals: "Dinner Included", activities: ["Ghat Road Drive", "Pookode Lake", "Lakkidi View Point"] },
      { day: 2, title: "Edakkal Caves & Soochipara Falls", desc: "Visit ancient Edakkal Caves with Neolithic carvings. Explore Soochipara Waterfalls. Evening plantation walk or resort relaxation.", hotel: "Wayanad Resort", meals: "Breakfast & Dinner", activities: ["Edakkal Caves", "Soochipara Falls", "Spice Plantation Walk"] },
      { day: 3, title: "Wayanad to Kozhikode & Departure", desc: "Breakfast, check out, optional spice shopping in Kalpetta, drive back to Kozhikode for departure.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Spice Shopping", "Kozhikode Drop"] }
    ],
    inclusions: [
      "Accommodation for 2 nights in Wayanad resort",
      "Meals as per plan (Breakfast / Dinner)",
      "Pickup & drop from Kozhikode",
      "All sightseeing & transfers by private vehicle",
      "Driver allowance, tolls & parking"
    ],
    exclusions: [
      "Train/air fare",
      "Entry fees & boating charges",
      "Adventure activities (zipline, trekking)"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", offSeason: "₹9,800", deluxe: "₹11,000", superDeluxe: "₹12,300", luxury: "₹20,800" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", offSeason: "₹7,000", deluxe: "₹8,300", superDeluxe: "₹9,400", luxury: "₹16,100" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", offSeason: "₹6,100", deluxe: "₹7,700", superDeluxe: "₹8,500", luxury: "₹14,400" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", offSeason: "₹5,900", deluxe: "₹6,800", superDeluxe: "₹7,800", luxury: "₹12,900" }
    ],
    published: true,
    featured: false
  },
  {
    id: "tour-munnar-2n3d",
    name: "Munnar Tea Country Getaway",
    slug: "munnar-tea-country-2n-3d",
    duration: "2 Nights / 3 Days",
    durationDays: 3,
    durationNights: 2,
    destination: "Munnar, Kerala (Ex-Kochi)",
    category: "Kerala",
    price: 5900,
    offerPrice: 7000,
    rating: 4.9,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Serene mountain break to Munnar via Cheeyappara and Valara waterfalls, Eravikulam National Park (Nilgiri Tahr), Mattupetty Dam, Echo Point, and Top Station.",
    overview: "Kerala's most famous hill station. Pick up from Kochi, winding past cascading waterfalls and rolling emerald tea plantations to enjoy cool mountain breezes.",
    tourLeader: "Salem Kerala Tour Executive",
    hotelStars: "3-Star & 4-Star Mountain View Resorts",
    transport: "Private AC Vehicle (Kochi to Kochi)",
    itinerary: [
      { day: 1, title: "Kochi to Munnar via Waterfalls", desc: "Pickup from Kochi, scenic drive to Munnar. En route stop at Cheeyappara and Valara waterfalls. Check in to hotel amidst tea gardens.", hotel: "Munnar Hotel", meals: "Dinner Included", activities: ["Cheeyappara Falls", "Valara Falls", "Tea Gardens"] },
      { day: 2, title: "Munnar Full Day Sightseeing", desc: "Visit Eravikulam National Park (home of endangered Nilgiri Tahr), Mattupetty Dam, Echo Point, Kundala Lake, and Top Station viewpoints.", hotel: "Munnar Hotel", meals: "Breakfast & Dinner", activities: ["Eravikulam Park", "Mattupetty Dam", "Echo Point", "Top Station"] },
      { day: 3, title: "Munnar to Kochi & Departure", desc: "Breakfast, visit tea factory museum, return drive to Kochi airport or railway station.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Tea Factory Museum", "Kochi Drop"] }
    ],
    inclusions: [
      "Accommodation for 2 nights in Munnar",
      "Meals as per plan (Breakfast & Dinner)",
      "Pickup & drop from Kochi",
      "Private vehicle for all transfers & sightseeing",
      "Driver allowance, tolls & parking"
    ],
    exclusions: [
      "Airfare/train fare",
      "National Park entry & boating charges",
      "Personal expenses"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", standard: "₹9,600", deluxe: "₹11,000", superDeluxe: "₹12,300", luxury: "₹20,800" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", standard: "₹7,000", deluxe: "₹8,300", superDeluxe: "₹9,400", luxury: "₹16,100" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", standard: "₹6,100", deluxe: "₹7,700", superDeluxe: "₹8,500", luxury: "₹14,400" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", standard: "₹5,900", deluxe: "₹6,800", superDeluxe: "₹7,800", luxury: "₹12,900" }
    ],
    published: true,
    featured: false
  },
  {
    id: "tour-munnar-thekkady-3n4d",
    name: "Munnar & Thekkady Wildlife Experience",
    slug: "munnar-thekkady-3n-4d",
    duration: "3 Nights / 4 Days",
    durationDays: 4,
    durationNights: 3,
    destination: "Munnar & Thekkady (Periyar)",
    category: "Kerala",
    price: 7300,
    offerPrice: 8900,
    rating: 4.9,
    reviewsCount: 37,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Combine the misty tea hills of Munnar with the wildlife and aromatic spice hills of Thekkady. Boat safari on Periyar Lake, Kathakali and Kalaripayattu martial arts shows.",
    overview: "Munnar 2 Nights + Thekkady 1 Night. From the high peaks of Top Station to elephant spotting by boat on Periyar Tiger Reserve lake and fragrant spice gardens.",
    tourLeader: "SK Tours South India Escort",
    hotelStars: "Deluxe & Super Deluxe Properties",
    transport: "Private AC Vehicle (Kochi to Kochi)",
    nightStay: "Munnar 2N • Thekkady 1N",
    itinerary: [
      { day: 1, title: "Kochi to Munnar Hill Drive", desc: "Pickup from Kochi, scenic drive past Cheeyappara waterfalls to Munnar. Check in to resort.", hotel: "Munnar Resort", meals: "Dinner Included", activities: ["Waterfalls", "Tea Gardens"] },
      { day: 2, title: "Munnar Full Day Exploration", desc: "Visit Eravikulam National Park, Mattupetty Dam, Echo Point, and Top Station.", hotel: "Munnar Resort", meals: "Breakfast & Dinner", activities: ["National Park", "Mattupetty Boating", "Echo Point"] },
      { day: 3, title: "Munnar to Thekkady & Periyar Lake", desc: "Drive to Thekkady. Check in to hotel, visit spice plantations, boat safari on Periyar Lake, evening Kathakali show.", hotel: "Thekkady Hotel", meals: "Breakfast & Dinner", activities: ["Spice Plantation", "Periyar Boat Safari", "Kathakali Show"] },
      { day: 4, title: "Thekkady to Kochi & Departure", desc: "Breakfast, return drive to Kochi airport or railway station for onward journey.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Kochi Drop"] }
    ],
    inclusions: [
      "Accommodation for 2 nights in Munnar & 1 night in Thekkady",
      "Meals as per plan (Breakfast & Dinner)",
      "Pickup & drop from Kochi",
      "Private vehicle for all transfers & sightseeing",
      "Driver allowance, tolls & parking"
    ],
    exclusions: [
      "Airfare/train fare",
      "Periyar boating tickets & activity charges",
      "Personal expenses"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", standard: "₹12,200", deluxe: "₹13,500", superDeluxe: "₹15,000", luxury: "₹21,000" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", standard: "₹9,300", deluxe: "₹10,700", superDeluxe: "₹11,800", luxury: "₹18,300" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", standard: "₹8,300", deluxe: "₹9,900", superDeluxe: "₹11,100", luxury: "₹17,200" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", standard: "₹7,300", deluxe: "₹9,100", superDeluxe: "₹10,300", luxury: "₹16,400" }
    ],
    published: true,
    featured: false
  },
  {
    id: "tour-munnar-alleppey-4n5d",
    name: "Munnar, Thekkady & Alleppey Houseboat Backwaters",
    slug: "munnar-thekkady-alleppey-4n-5d",
    duration: "4 Nights / 5 Days",
    durationDays: 5,
    durationNights: 4,
    destination: "Munnar, Thekkady & Alleppey",
    category: "Kerala",
    price: 8500,
    offerPrice: 10700,
    rating: 5.0,
    reviewsCount: 56,
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Kerala's classic trio: 2 Nights in misty Munnar, 1 Night in spice-scented Thekkady, and 1 Night onboard a traditional luxury private houseboat in Alleppey backwaters with all meals.",
    overview: "The most sought-after Kerala vacation. Includes tea hills, Periyar wildlife sanctuary, and an overnight cruise through palm-fringed lagoons in Alleppey with freshly cooked Kerala cuisine.",
    tourLeader: "Senior SK Tours Kerala Captain",
    hotelStars: "Deluxe Mountain Resorts + Deluxe Private Houseboat",
    transport: "Private AC Vehicle (Kochi to Kochi)",
    nightStay: "Munnar 2N • Thekkady 1N • Alleppey Houseboat 1N",
    itinerary: [
      { day: 1, title: "Kochi to Munnar via Cheeyappara", desc: "Pickup from Kochi, scenic drive past Cheeyappara and Valara waterfalls. Check in to Munnar resort.", hotel: "Munnar Resort", meals: "Dinner Included", activities: ["Waterfalls", "Tea Plantations"] },
      { day: 2, title: "Munnar Hill Station Sightseeing", desc: "Visit Eravikulam National Park, Mattupetty Dam, Echo Point, and Top Station.", hotel: "Munnar Resort", meals: "Breakfast & Dinner", activities: ["Eravikulam Park", "Mattupetty Boating"] },
      { day: 3, title: "Munnar to Thekkady Wildlife", desc: "Drive to Thekkady. Visit spice plantations and boat safari on Periyar Lake. Overnight in Thekkady.", hotel: "Thekkady Hotel", meals: "Breakfast & Dinner", activities: ["Spice Plantation", "Periyar Boat Safari"] },
      { day: 4, title: "Thekkady to Alleppey Houseboat Cruise", desc: "Drive to Alleppey. Board private deluxe houseboat at 12:00 PM. Cruise through serene canals and Vembanad Lake. All meals served on board.", hotel: "Alleppey Deluxe Private Houseboat", meals: "Lunch, Evening Tea, Dinner & Breakfast Included", activities: ["Houseboat Cruise", "Village Canals", "Sunset Over Backwaters"] },
      { day: 5, title: "Alleppey to Kochi Departure", desc: "Morning cruise and breakfast on houseboat. Check out at 9:00 AM, transfer to Kochi airport/railway station.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Kochi Drop"] }
    ],
    inclusions: [
      "Accommodation for 4 nights (2N Munnar, 1N Thekkady, 1N Alleppey Houseboat)",
      "Meals as per plan (Breakfast & Dinner in hotels, all meals in houseboat)",
      "Pickup & drop from Kochi",
      "Private vehicle for all transfers & sightseeing",
      "Driver allowance, tolls & parking"
    ],
    exclusions: [
      "Airfare/train fare",
      "Entry fees & activity tickets",
      "Personal expenses"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", standard: "₹14,000", deluxe: "₹16,000", superDeluxe: "₹18,300", luxury: "₹31,000" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", standard: "₹10,600", deluxe: "₹12,400", superDeluxe: "₹15,300", luxury: "₹26,800" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", standard: "₹9,600", deluxe: "₹11,800", superDeluxe: "₹13,800", luxury: "₹25,400" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", standard: "₹8,500", deluxe: "₹10,700", superDeluxe: "₹13,200", luxury: "₹23,500" }
    ],
    published: true,
    featured: true
  },
  {
    id: "tour-south-india-10n11d",
    name: "South India Tapestry Grand Expedition",
    slug: "south-india-tapestry-10n-11d",
    duration: "10 Nights / 11 Days",
    durationDays: 11,
    durationNights: 10,
    destination: "Kochi, Munnar, Thekkady, Madurai, Rameshwaram, Kanyakumari, Kovalam & Alleppey",
    category: "Kerala",
    price: 28500,
    offerPrice: 32000,
    rating: 5.0,
    reviewsCount: 44,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80"
    ],
    description: "The grand South Indian circuit spanning Kerala and Tamil Nadu: Fort Kochi, Munnar tea hills, Thekkady wildlife, Madurai Meenakshi Amman Temple, sacred Rameshwaram, Kanyakumari confluence, Kovalam beaches, Trivandrum Padmanabhaswamy Temple, and Alleppey backwaters.",
    overview: "A grand 11-day master journey connecting the spiritual heritage of Tamil Nadu with the natural beauty of Kerala. Designed with comfortable driving distances, verified hotels, and dedicated chauffeurs.",
    tourLeader: "SK Tours Senior Operations Director",
    hotelStars: "Deluxe 3-Star & 4-Star Properties + Alleppey Houseboat",
    transport: "Private Dedicated AC Vehicle for Full 11 Days",
    itinerary: [
      { day: 1, title: "Arrival at Kochi Heritage", desc: "Arrival at Kochi, visit Fort Kochi, Chinese Fishing Nets, Dutch Palace, Jewish Synagogue, and Marine Drive.", hotel: "Kochi Hotel", meals: "Dinner Included", activities: ["Fort Kochi", "Chinese Nets", "Marine Drive"] },
      { day: 2, title: "Kochi to Munnar Hills", desc: "Scenic drive to Munnar through hills and tea plantations. Check in to resort.", hotel: "Munnar Resort", meals: "Breakfast & Dinner", activities: ["Cheeyappara Falls", "Tea Gardens"] },
      { day: 3, title: "Munnar Sightseeing", desc: "Explore Mattupetty Dam, Kundala Lake, Echo Point, and Eravikulam National Park.", hotel: "Munnar Resort", meals: "Breakfast & Dinner", activities: ["Eravikulam Park", "Mattupetty Dam"] },
      { day: 4, title: "Munnar to Thekkady", desc: "Proceed to Thekkady. Periyar Lake boating, spice plantation tours, and cultural shows.", hotel: "Thekkady Hotel", meals: "Breakfast & Dinner", activities: ["Periyar Lake", "Spice Plantation"] },
      { day: 5, title: "Thekkady to Madurai", desc: "Travel to Madurai temple city. Visit Meenakshi Amman Temple and Thirumalai Nayakkar Palace.", hotel: "Madurai Hotel", meals: "Breakfast & Dinner", activities: ["Meenakshi Amman Temple", "Nayakkar Palace"] },
      { day: 6, title: "Madurai to Rameshwaram", desc: "Drive across Pamban Bridge to Rameshwaram. Holy 22-wells bath, Ramanathaswamy Temple darshan, and Dhanushkodi excursion.", hotel: "Rameshwaram Hotel", meals: "Breakfast & Dinner", activities: ["Pamban Bridge", "Ramanathaswamy Temple", "Dhanushkodi"] },
      { day: 7, title: "Rameshwaram to Kanyakumari", desc: "Drive to Kanyakumari, India's southernmost tip. Visit Vivekananda Rock Memorial, Thiruvalluvar Statue, and sunset.", hotel: "Kanyakumari Hotel", meals: "Breakfast & Dinner", activities: ["Vivekananda Rock", "Thiruvalluvar Statue", "Sunset View"] },
      { day: 8, title: "Kanyakumari to Kovalam Beach", desc: "Sunrise at Kanyakumari, drive to Kovalam beach via Poovar Island. Relax at crescent beach.", hotel: "Kovalam Beach Resort", meals: "Breakfast & Dinner", activities: ["Poovar Backwaters", "Kovalam Beach"] },
      { day: 9, title: "Thiruvananthapuram Sightseeing", desc: "Visit Sri Padmanabhaswamy Temple, Napier Museum, and Kovalam lighthouse.", hotel: "Kovalam Beach Resort", meals: "Breakfast & Dinner", activities: ["Padmanabhaswamy Temple", "Museum", "Lighthouse"] },
      { day: 10, title: "Kovalam to Alleppey Houseboat", desc: "Drive to Alleppey backwaters, board traditional deluxe houseboat. Cruise scenic canals with all meals.", hotel: "Alleppey Houseboat", meals: "Lunch, Evening Snacks, Dinner & Breakfast", activities: ["Backwater Cruise", "Sunset Cruise"] },
      { day: 11, title: "Alleppey to Kochi & Departure", desc: "Check out from houseboat, transfer back to Kochi airport or railway station for onward departure.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Kochi Airport Drop"] }
    ],
    inclusions: [
      "Accommodation for 10 nights in mentioned destinations",
      "Pickup and drop from Kochi airport/railway station",
      "Daily breakfast at all hotels/resorts",
      "All meals in Alleppey houseboat",
      "All transfers & sightseeing by private dedicated vehicle",
      "Driver allowance, tolls, parking, and fuel charges"
    ],
    exclusions: [
      "Airfare, train tickets, or bus tickets",
      "Entry tickets to monuments, parks, and temple special darshan",
      "Optional activities (jeep safari, Kathakali show, Ayurvedic massage)",
      "Personal expenses & travel insurance"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", deluxe: "₹38,500", superDeluxe: "₹42,000" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", deluxe: "₹31,000", superDeluxe: "₹34,500" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", deluxe: "₹28,500", superDeluxe: "₹31,000" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", deluxe: "₹26,500", superDeluxe: "₹29,000" }
    ],
    published: true,
    featured: true
  },

  // ------------------------------------------------------------
  // 7. HYDERABAD PACKAGES
  // ------------------------------------------------------------
  {
    id: "tour-hyderabad-2n3d",
    name: "Hyderabad Heritage & Ramoji Film City",
    slug: "hyderabad-ramoji-2n-3d",
    duration: "2 Nights / 3 Days",
    durationDays: 3,
    durationNights: 2,
    destination: "Hyderabad & Ramoji Film City",
    category: "Hyderabad",
    price: 9500,
    offerPrice: 11000,
    rating: 4.8,
    reviewsCount: 30,
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Explore the City of Pearls: Hussain Sagar Lake, Golconda Fort, Lumbini Park, full-day Ramoji Film City tour with entry tickets & lunch, Charminar, and Mecca Masjid.",
    overview: "A fun-filled family and group package featuring the world's largest film studio complex (Ramoji Film City), combined with the iconic Charminar and Golconda Fort.",
    tourLeader: "SK Tours City Tour Captain",
    hotelStars: "Deluxe City Hotels",
    transport: "Private AC Vehicle (Hyderabad to Hyderabad)",
    itinerary: [
      { day: 1, title: "Arrival at Hyderabad & City Sights", desc: "Arrival at Hyderabad and hotel check-in. Sightseeing: Hussain Sagar Lake, NTR Garden, Golconda Fort, Lumbini Park. Return to hotel.", hotel: "Hyderabad Hotel", meals: "Dinner Included", activities: ["Hussain Sagar", "Golconda Fort", "Lumbini Park"] },
      { day: 2, title: "Full Day Ramoji Film City", desc: "Full day excursion to Ramoji Film City. Enjoy movie sets, theme attractions, stunt shows, and lunch at Ramoji. Overnight stay with dinner.", hotel: "Hyderabad Hotel", meals: "Breakfast, Lunch (Ramoji) & Dinner", activities: ["Ramoji Film City", "Live Shows", "Studio Sets"] },
      { day: 3, title: "Charminar & Departure", desc: "Breakfast, check out. Visit Ambedkar Statue, Charminar, and Mecca Masjid. Evening transfer to railway station or airport.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Charminar", "Mecca Masjid", "Airport Drop"] }
    ],
    inclusions: [
      "Accommodation for 2 nights",
      "Daily breakfast and dinner",
      "All sightseeing and transfers by private vehicle",
      "Driver allowance, tolls, parking",
      "Ramoji Film City basic tickets included",
      "Lunch at Ramoji Film City"
    ],
    exclusions: [
      "Train/air fare",
      "Monument entry tickets other than Ramoji",
      "Personal expenses"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", deluxe: "₹12,900" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", deluxe: "₹10,000" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", deluxe: "₹9,700" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", deluxe: "₹9,500" }
    ],
    published: true,
    featured: false
  },
  {
    id: "tour-hyderabad-3n4d",
    name: "Hyderabad Heritage, Monuments & Ramoji Extended",
    slug: "hyderabad-heritage-ramoji-3n-4d",
    duration: "3 Nights / 4 Days",
    durationDays: 4,
    durationNights: 3,
    destination: "Hyderabad & Ramoji Film City",
    category: "Hyderabad",
    price: 10500,
    offerPrice: 12000,
    rating: 4.9,
    reviewsCount: 26,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Comprehensive 4-day tour with full board meals, monument entries, Golconda Fort, Charminar, full-day Ramoji Film City, Birla Mandir, and ISKCON Hyderabad.",
    overview: "The most comfortable way to experience Hyderabad. All meals provided, entry tickets included, private sanitized transport, and expert local coordinator.",
    tourLeader: "SK Tours Heritage Escort",
    hotelStars: "Deluxe City Hotels",
    transport: "Private AC Vehicle (Hyderabad to Hyderabad)",
    itinerary: [
      { day: 1, title: "Arrival & Local Street Food", desc: "Arrival at railway/airport, check in. Explore local markets and street food. Dinner and overnight stay.", hotel: "Hyderabad Hotel", meals: "Dinner Included", activities: ["Arrival", "Street Food Market"] },
      { day: 2, title: "Historic Hyderabad Sightseeing", desc: "Visit Golconda Fort, NTR Garden, Lumbini Park, Charminar, and Hussain Sagar Lake. Return to hotel.", hotel: "Hyderabad Hotel", meals: "Breakfast, Lunch & Dinner", activities: ["Golconda Fort", "Charminar", "Hussain Sagar"] },
      { day: 3, title: "Ramoji Film City Full Day", desc: "Full day tour of Ramoji Film City with lunch. Enjoy studio tours, gardens, and entertainment shows.", hotel: "Hyderabad Hotel", meals: "Breakfast, Lunch (Ramoji) & Dinner", activities: ["Ramoji Studio Tour", "Theme Parks"] },
      { day: 4, title: "Birla Mandir, ISKCON & Departure", desc: "Check out, visit Mecca Masjid, Birla Mandir, and ISKCON temple. Lunch at local restaurant, evening airport drop.", hotel: "Departure Transit", meals: "Breakfast & Lunch Included", activities: ["Birla Mandir", "ISKCON", "Airport Drop"] }
    ],
    inclusions: [
      "Accommodation for 3 nights as mentioned",
      "Full board meals (Breakfast, Lunch & Dinner)",
      "All sightseeing and transfers by private vehicle",
      "Driver allowance, tolls, parking",
      "Entry tickets to monuments included"
    ],
    exclusions: [
      "Train fare / airfare",
      "Travel insurance & personal expenses"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", deluxe: "₹15,300" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", deluxe: "₹11,200" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", deluxe: "₹10,600" },
      { pax: "10 Pax", vehicle: "5 Rooms, Tempo", deluxe: "₹10,500" }
    ],
    published: true,
    featured: false
  },

  // ------------------------------------------------------------
  // 8. MEGHALAYA PACKAGES
  // ------------------------------------------------------------
  {
    id: "tour-meghalaya-3n4d",
    name: "Meghalaya Wonders – Living Root Bridges & Dawki",
    slug: "meghalaya-living-root-bridges-3n-4d",
    duration: "3 Nights / 4 Days",
    durationDays: 4,
    durationNights: 3,
    destination: "Shillong, Dawki & Cherrapunji",
    category: "Meghalaya",
    price: 11000,
    offerPrice: 14300,
    rating: 5.0,
    reviewsCount: 35,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Northeast India's crown jewel: Umiam Lake, Phe Phe Waterfalls, crystal-clear Dawki Umngot River boating at the Indo-Bangladesh border, trek to Nongriat Double Decker Living Root Bridge, and Cherrapunji caves.",
    overview: "Pickup from Guwahati Railway Station. Explore Shillong's Police Bazar, boat on the transparent waters of Dawki, trek to the bio-engineering marvel of Living Root Bridges, and see Nohkalikai Falls.",
    tourLeader: "SK Tours North-East Specialist",
    hotelStars: "Deluxe Hill Cottages & Cherrapunji Eco-Resorts",
    transport: "Private AC Vehicle (Guwahati to Guwahati)",
    itinerary: [
      { day: 1, title: "Guwahati to Shillong (Scotland of the East)", desc: "Pickup from Guwahati Railway Station (11:00 AM). Drive to Shillong via Umiam Lake viewpoint. Visit Ward's Lake and explore Police Bazar.", hotel: "Shillong Hotel", meals: "Breakfast En Route", activities: ["Umiam Lake", "Ward's Lake", "Police Bazar"] },
      { day: 2, title: "Phe Phe Falls, Dawki & Indo-Bangladesh Border", desc: "Drive to Phe Phe Waterfalls and Krang Suri Falls. Proceed to Dawki for crystal-clear Umngot river boating. Check in at Cherrapunji with dinner.", hotel: "Cherrapunji Resort", meals: "Breakfast & Dinner", activities: ["Phe Phe Falls", "Dawki Boating", "Indo-Bangladesh Border"] },
      { day: 3, title: "Trek to Living Root Bridges & Rainbow Falls", desc: "Trek to Nongriat Village to explore Single Decker & Double Decker Living Root Bridges, Blue Lagoon, and Rainbow Falls.", hotel: "Cherrapunji Resort", meals: "Breakfast & Dinner", activities: ["Double Decker Root Bridge", "Blue Lagoon", "Rainbow Falls"] },
      { day: 4, title: "Cherrapunji Waterfalls & Guwahati Drop", desc: "Visit Seven Sisters Waterfall, Nohkalikai Falls, Mawsmai Cave, and Arwah Cave. Drive back to Guwahati for late-night railway station drop.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Nohkalikai Falls", "Mawsmai Cave", "Guwahati Drop"] }
    ],
    inclusions: [
      "Pickup & drop from Guwahati Railway Station",
      "4 days private transportation",
      "3 nights accommodation (1N Shillong, 2N Cherrapunji)",
      "Daily wholesome breakfasts",
      "Dinner at Cherrapunji"
    ],
    exclusions: [
      "Train/air fare",
      "Travel insurance & personal expenses",
      "Guide fees & adventure activity permits"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", deluxe: "₹15,000" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", deluxe: "₹14,300" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", deluxe: "₹11,000" },
      { pax: "8 Pax", vehicle: "4 Rooms, Tempo", deluxe: "₹11,500" }
    ],
    published: true,
    featured: true
  },
  {
    id: "tour-meghalaya-4n5d",
    name: "Meghalaya Adventure Explorer – Mawlyngbna & Waterfalls",
    slug: "meghalaya-adventure-explorer-4n-5d",
    duration: "4 Nights / 5 Days",
    durationDays: 5,
    durationNights: 4,
    destination: "Shillong, Cherrapunji & Mawlyngbna",
    category: "Meghalaya",
    price: 12400,
    offerPrice: 15200,
    rating: 5.0,
    reviewsCount: 28,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
    ],
    description: "The complete Meghalaya adventure: Nongriat Double Decker Root Bridge trek, Cherrapunji waterfalls and caves, Mawlyngbna river trekking with cliff jumping & natural slides, Phe Phe Falls & Krang Suri.",
    overview: "Pickup from Guwahati Airport / Railway Station. For thrill-seekers and nature lovers who want to explore beyond tourist viewpoints and experience river canyoning and living root architecture.",
    tourLeader: "SK Tours Adventure Trek Leader",
    hotelStars: "Deluxe Hill Stays & Adventure Campsite",
    transport: "Private Vehicle (Guwahati to Guwahati)",
    itinerary: [
      { day: 1, title: "Guwahati to Cherrapunji", desc: "Pickup from Guwahati Airport/Station, scenic drive past Shillong to Cherrapunji. Visit Ward's Lake and Police Bazar en route. Dinner and overnight in Cherrapunji.", hotel: "Cherrapunji Resort", meals: "Dinner Included", activities: ["Scenic Drive", "Ward's Lake"] },
      { day: 2, title: "Nongriat Living Root Bridge Trek", desc: "Trek to Nongriat village, Double Decker Root Bridge, Single Decker Bridge, Blue Lagoon, and Rainbow Falls. Dinner and overnight.", hotel: "Cherrapunji Resort", meals: "Breakfast & Dinner", activities: ["Double Decker Bridge", "Blue Lagoon"] },
      { day: 3, title: "Cherrapunji Waterfalls to Shillong", desc: "Visit Seven Sisters Waterfall, Mawsmai Cave, Nohkalikai Falls, Wei Sawdong Falls, and Arwah Cave. Drive to Shillong for dinner and overnight.", hotel: "Shillong Hotel", meals: "Breakfast & Dinner", activities: ["Nohkalikai Falls", "Wei Sawdong Falls", "Mawsmai Cave"] },
      { day: 4, title: "Mawlyngbna River Trekking & Canyoning", desc: "Drive to Mawlyngbna adventure hub. River trekking, cliff jumping, kayaking, natural water slides, and Split Rock. Return to Shillong.", hotel: "Shillong Hotel", meals: "Breakfast & Dinner", activities: ["Cliff Jumping", "Natural Water Slides", "Kayaking"] },
      { day: 5, title: "Phe Phe & Krang Suri Waterfalls & Departure", desc: "Visit breathtaking Phe Phe Falls and blue-water Krang Suri Falls. Drive back to Guwahati for late-night drop at airport/station.", hotel: "Departure Transit", meals: "Breakfast Included", activities: ["Phe Phe Falls", "Krang Suri Falls", "Guwahati Drop"] }
    ],
    inclusions: [
      "Pickup & drop from Guwahati Airport / Railway Station",
      "5 days private transportation",
      "4 nights accommodation",
      "4 breakfasts & campsite dinner",
      "Tolls, parking, and driver allowance"
    ],
    exclusions: [
      "Airfare / train fare",
      "Adventure activities & river trekking equipment charges",
      "Personal expenses & travel insurance"
    ],
    pricingTable: [
      { pax: "2 Pax", vehicle: "1 Room, Sedan", deluxe: "₹17,500" },
      { pax: "4 Pax", vehicle: "2 Rooms, Sedan", deluxe: "₹12,800" },
      { pax: "6 Pax", vehicle: "3 Rooms, XUV", deluxe: "₹12,400" },
      { pax: "8 Pax", vehicle: "4 Rooms, Tempo", deluxe: "₹15,200" }
    ],
    published: true,
    featured: false
  }
];

// ------------------------------------------------------------
// OFFICIAL DESTINATION HUBS
// ------------------------------------------------------------
export const INITIAL_DESTINATIONS = [
  {
    id: "dest-kashmir",
    name: "Kashmir & Srinagar",
    tag: "Paradise on Earth",
    toursCount: 4,
    startingPrice: 7600,
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "Snow-clad Gulmarg meadows, Dal Lake Shikara rides, Pahalgam shepherd valleys, Sonmarg glaciers, and untouched Gurez border valleys."
  },
  {
    id: "dest-himachal",
    name: "Himachal Pradesh",
    tag: "Land of the Gods",
    toursCount: 2,
    startingPrice: 5000,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "Misty pine forests of Manali, Solang Valley adventure sports, Atal Tunnel into Lahaul, Kullu river rafting, and Kasol Parvati Valley cafes."
  },
  {
    id: "dest-rajasthan",
    name: "Royal Rajasthan",
    tag: "Land of Kings",
    toursCount: 3,
    startingPrice: 14800,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "Pink City Jaipur forts, Blue City Jodhpur palaces, Golden City Jaisalmer Thar desert camel safaris, and Udaipur's romantic Lake Pichola."
  },
  {
    id: "dest-ladakh",
    name: "Leh – Ladakh",
    tag: "Roof of the World",
    toursCount: 2,
    startingPrice: 12500,
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "High-altitude Khardung La Pass, Nubra Valley double-humped camel dunes, turquoise Pangong Tso Lake, and ancient Himalayan monasteries."
  },
  {
    id: "dest-kerala",
    name: "God's Own Country, Kerala",
    tag: "Backwaters & Tea Hills",
    toursCount: 5,
    startingPrice: 5900,
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "Emerald tea plantations of Munnar, Periyar wildlife sanctuaries in Thekkady, Wayanad waterfalls, and luxury private houseboats in Alleppey."
  },
  {
    id: "dest-delhi-agra",
    name: "Delhi & Agra",
    tag: "The Golden Triangle",
    toursCount: 2,
    startingPrice: 7200,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "World-famous Taj Mahal and Agra Fort, Red Fort, Qutub Minar, India Gate, and the rich culinary heritage of Chandni Chowk."
  },
  {
    id: "dest-hyderabad",
    name: "Hyderabad & Ramoji",
    tag: "City of Pearls & Film City",
    toursCount: 2,
    startingPrice: 9500,
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    featured: false,
    description: "Historic Golconda Fort, Charminar, Hussain Sagar Lake, and full-day entertainment at the world's largest Ramoji Film City."
  },
  {
    id: "dest-meghalaya",
    name: "Meghalaya & Shillong",
    tag: "Abode of the Clouds",
    toursCount: 2,
    startingPrice: 11000,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    featured: true,
    description: "Bio-engineered Double Decker Living Root Bridges in Nongriat, crystal-clear Dawki Umngot river boating, Nohkalikai waterfalls, and Mawlyngbna cliff jumping."
  },
  {
    id: "dest-gujarat",
    name: "Gujarat & Rann of Kutch",
    tag: "White Desert & Holy Shrines",
    toursCount: 1,
    startingPrice: 16500,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80",
    featured: false,
    description: "White salt desert of the Rann of Kutch, sacred Jyotirlinga shrines of Somnath and Dwarka, and Asiatic lions at Gir National Park."
  },
  {
    id: "dest-sikkim-darjeeling",
    name: "Sikkim & Darjeeling",
    tag: "Eastern Himalayan Splendour",
    toursCount: 1,
    startingPrice: 15500,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    featured: false,
    description: "Gangtok monasteries, Pelling Kanchenjunga viewpoints, Yumthang Valley of flowers, rolling tea gardens, and the iconic Darjeeling Himalayan toy train."
  },
  {
    id: "dest-up-varanasi",
    name: "Uttar Pradesh & Varanasi",
    tag: "Spiritual Heartland",
    toursCount: 1,
    startingPrice: 11500,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    featured: false,
    description: "Sacred ghats and evening Ganga Aarti in Varanasi, Ram Janmabhoomi pilgrimage in Ayodhya, and the Nawabi royal culture of Lucknow."
  }
];

export const INITIAL_LEADS = [];
export const INITIAL_CUSTOMERS = [];
export const INITIAL_FEEDBACK = [];

export const INITIAL_STAFF = [
  {
    id: "staff-1",
    name: "Admin",
    email: "sktoursandtravelsalem@gmail.com",
    role: "Super Admin",
    phone: "+91 99946 44744",
    activeLeads: 0,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  }
];
