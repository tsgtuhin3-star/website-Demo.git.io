/**
 * FLIPKART CLONE - ANIMATED PRODUCT INTERFACE
 * Features:
 * - Real-time filtering & live debounce search
 * - Auto-sliding hero carousel with controls
 * - Animated "Fly to Cart" 3D physics animation
 * - Persistent cart management & subtotal calculations
 * - Free shipping progress bar
 * - Deals of the day real-time countdown timer
 * - Quick-view product modal
 * - Wishlist heart toggle
 */

// ==========================================
// 1. PRODUCT CATALOG DATA
// ==========================================
const PRODUCTS = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro (Natural Titanium, 128 GB)",
    category: "mobiles",
    price: 119900,
    originalPrice: 134900,
    discount: 11,
    rating: 4.7,
    reviewsCount: "12,450",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: true,
    dealTag: "Hot Deal of the Week",
    specs: [
      "128 GB ROM, Super Retina XDR Display",
      "48MP + 12MP + 12MP Pro Camera System",
      "A17 Pro Chip, 6 Core Processor",
      "Titanium Design with Ceramic Shield"
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)",
    category: "mobiles",
    price: 129999,
    originalPrice: 144999,
    discount: 10,
    rating: 4.8,
    reviewsCount: "8,920",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: true,
    dealTag: "Extra ₹10,000 Off on Exchange",
    specs: [
      "12 GB RAM | 256 GB ROM",
      "200MP Quad Camera with Galaxy AI",
      "Snapdragon 8 Gen 3 Processor",
      "Built-in S Pen & 5000 mAh Battery"
    ]
  },
  {
    id: 3,
    name: "Apple 2024 MacBook Air M3 (13.6 inch, 8GB, 256GB SSD)",
    category: "laptops",
    price: 104990,
    originalPrice: 114900,
    discount: 9,
    rating: 4.8,
    reviewsCount: "3,110",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: true,
    dealTag: "Bank Offer: ₹5,000 Instant",
    specs: [
      "Apple M3 chip with 8-core CPU",
      "13.6-inch Liquid Retina Display",
      "Up to 18 hours battery life",
      "1080p FaceTime HD camera"
    ]
  },
  {
    id: 4,
    name: "ASUS ROG Zephyrus G14 Gaming Laptop (Ryzen 9, RTX 4060)",
    category: "laptops",
    price: 149990,
    originalPrice: 189990,
    discount: 21,
    rating: 4.6,
    reviewsCount: "1,420",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: false,
    dealTag: "Pro Gamer Choice",
    specs: [
      "AMD Ryzen 9 8945HS Processor",
      "16GB DDR5 RAM | 1TB Gen4 SSD",
      "NVIDIA RTX 4060 8GB GDDR6",
      "3K 120Hz OLED ROG Nebula Display"
    ]
  },
  {
    id: 5,
    name: "Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones",
    category: "audio",
    price: 26990,
    originalPrice: 34990,
    discount: 23,
    rating: 4.6,
    reviewsCount: "9,850",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: true,
    dealTag: "Industry-leading ANC",
    specs: [
      "Auto NC Optimizer with 8 Microphones",
      "30 Hours Battery with Quick Charge",
      "Crystal Clear Hands-Free Calling",
      "Ultra-comfortable Lightweight Design"
    ]
  },
  {
    id: 6,
    name: "Apple Watch Series 9 GPS (Midnight Aluminium, 45mm)",
    category: "audio",
    price: 41900,
    originalPrice: 44900,
    discount: 7,
    rating: 4.7,
    reviewsCount: "4,600",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: false,
    dealTag: "Double Tap Gesture",
    specs: [
      "S9 SiP with 64-bit dual-core processor",
      "Always-On Retina Display up to 2000 nits",
      "Blood Oxygen & ECG Apps",
      "Crash Detection & Fall Detection"
    ]
  },
  {
    id: 7,
    name: "Nothing Phone (2) 5G (Dark Grey, 12GB RAM, 256GB)",
    category: "mobiles",
    price: 36999,
    originalPrice: 54999,
    discount: 32,
    rating: 4.4,
    reviewsCount: "18,920",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: true,
    dealTag: "Glyph Interface LED",
    specs: [
      "12 GB RAM | 256 GB ROM",
      "50MP + 50MP Dual Rear Camera",
      "Snapdragon 8+ Gen 1 Processor",
      "6.7 inch Flexible LTPO OLED Display"
    ]
  },
  {
    id: 9,
    name: "Google Pixel 9 Pro 5G (Obsidian, 256 GB)",
    category: "mobiles",
    price: 109999,
    originalPrice: 119999,
    discount: 8,
    rating: 4.7,
    reviewsCount: "4,280",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: true,
    dealTag: "Pure Google AI",
    specs: ["16 GB RAM | 256 GB ROM", "50MP triple rear camera with Pro controls", "Google Tensor G4 processor", "6.3 inch Super Actua OLED display"]
  },
  {
    id: 10,
    name: "OnePlus 12 5G (Emerald Flowy, 256 GB)",
    category: "mobiles",
    price: 64999,
    originalPrice: 69999,
    discount: 7,
    rating: 4.6,
    reviewsCount: "7,640",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: true,
    dealTag: "Flagship Speed",
    specs: ["12 GB RAM | 256 GB ROM", "50MP Sony LYT-808 camera with OIS", "Snapdragon 8 Gen 3 processor", "5400 mAh battery with 100W SUPERVOOC"]
  },
  {
    id: 11,
    name: "Xiaomi 14 Ultra 5G (Black, 512 GB)",
    category: "mobiles",
    price: 99999,
    originalPrice: 109999,
    discount: 9,
    rating: 4.5,
    reviewsCount: "2,190",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: false,
    dealTag: "Leica Camera Phone",
    specs: ["16 GB RAM | 512 GB ROM", "Leica quad camera with 1-inch main sensor", "Snapdragon 8 Gen 3 processor", "2K AMOLED display with 120Hz refresh rate"]
  },
  {
    id: 12,
    name: "Redmi Note 13 Pro+ 5G (Fusion Purple, 256 GB)",
    category: "mobiles",
    price: 31999,
    originalPrice: 36999,
    discount: 13,
    rating: 4.4,
    reviewsCount: "21,450",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: true,
    dealTag: "Best Value Camera",
    specs: ["12 GB RAM | 256 GB ROM", "200MP OIS triple camera", "MediaTek Dimensity 7200 Ultra", "120W HyperCharge with curved AMOLED display"]
  },
  {
    id: 13,
    name: "Motorola Edge 50 Pro 5G (Luxe Lavender, 256 GB)",
    category: "mobiles",
    price: 31999,
    originalPrice: 35999,
    discount: 11,
    rating: 4.3,
    reviewsCount: "5,870",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: false,
    dealTag: "Pantone Colour Phone",
    specs: ["12 GB RAM | 256 GB ROM", "50MP ProLight camera with OIS", "Snapdragon 7 Gen 3 processor", "144Hz pOLED display with 125W TurboPower"]
  },
  {
    id: 14,
    name: "Vivo X100 Pro 5G (Asteroid Black, 512 GB)",
    category: "mobiles",
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    rating: 4.6,
    reviewsCount: "3,560",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: false,
    dealTag: "ZEISS Portrait Camera",
    specs: ["16 GB RAM | 512 GB ROM", "ZEISS professional portrait camera", "MediaTek Dimensity 9300 processor", "5400 mAh battery with 100W FlashCharge"]
  },
  {
    id: 15,
    name: "OPPO Find X8 Pro 5G (Pearl White, 512 GB)",
    category: "mobiles",
    price: 99999,
    originalPrice: 109999,
    discount: 9,
    rating: 4.5,
    reviewsCount: "1,890",
    image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: true,
    dealTag: "Hasselblad Camera",
    specs: ["16 GB RAM | 512 GB ROM", "Hasselblad master camera system", "MediaTek Dimensity 9400 processor", "6.78 inch 120Hz AMOLED display"]
  },
  {
    id: 16,
    name: "realme GT 6 5G (Fluid Silver, 256 GB)",
    category: "mobiles",
    price: 40999,
    originalPrice: 44999,
    discount: 8,
    rating: 4.4,
    reviewsCount: "9,720",
    image: "https://images.unsplash.com/photo-1592286927505-2fd0fdb0b1f7?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: false,
    dealTag: "Performance Beast",
    specs: ["12 GB RAM | 256 GB ROM", "50MP Sony LYT-808 OIS camera", "Snapdragon 8s Gen 3 processor", "5500 mAh battery with 120W SUPERVOOC"]
  },
  {
    id: 17,
    name: "ASUS ROG Phone 8 Pro 5G (Phantom Black, 512 GB)",
    category: "mobiles",
    price: 94999,
    originalPrice: 109999,
    discount: 14,
    rating: 4.6,
    reviewsCount: "1,420",
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: false,
    dealTag: "Ultimate Gaming",
    specs: ["16 GB RAM | 512 GB ROM", "AirTrigger gaming controls", "Snapdragon 8 Gen 3 processor", "165Hz AMOLED display with 5500 mAh battery"]
  },
  {
    id: 18,
    name: "Sony Xperia 1 VI 5G (Khaki Green, 256 GB)",
    category: "mobiles",
    price: 129990,
    originalPrice: 139990,
    discount: 7,
    rating: 4.3,
    reviewsCount: "860",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: false,
    dealTag: "Creator Edition",
    specs: ["12 GB RAM | 256 GB ROM", "ZEISS calibrated telephoto camera", "Snapdragon 8 Gen 3 processor", "4K HDR OLED display with pro video tools"]
  },
  {
    id: 19,
    name: "Nokia X30 5G (Cloudy Blue, 256 GB)",
    category: "mobiles",
    price: 36999,
    originalPrice: 44999,
    discount: 18,
    rating: 4.1,
    reviewsCount: "4,180",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: false,
    dealTag: "Pure Android",
    specs: ["8 GB RAM | 256 GB ROM", "50MP PureView OIS camera", "Snapdragon 695 5G processor", "IP67 rated recycled aluminium design"]
  },
  {
    id: 20,
    name: "Honor 200 Pro 5G (Moonlight White, 512 GB)",
    category: "mobiles",
    price: 57999,
    originalPrice: 64999,
    discount: 11,
    rating: 4.4,
    reviewsCount: "2,760",
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: true,
    dealTag: "Studio Portraits",
    specs: ["12 GB RAM | 512 GB ROM", "50MP Harcourt portrait camera", "Snapdragon 8s Gen 3 processor", "100W wired and 66W wireless charging"]
  },
  {
    id: 21,
    name: "Huawei Pura 70 Pro (Black, 512 GB)",
    category: "mobiles",
    price: 89990,
    originalPrice: 99990,
    discount: 10,
    rating: 4.2,
    reviewsCount: "740",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: false,
    dealTag: "XMAGE Imaging",
    specs: ["16 GB RAM | 512 GB ROM", "50MP Ultra Lighting retractable camera", "Kirin 9010S chipset", "IP68 water and dust resistance"]
  },
  {
    id: 22,
    name: "Apple iPhone 16 Pro Max (Desert Titanium, 256 GB)",
    category: "mobiles",
    price: 144900,
    originalPrice: 154900,
    discount: 6,
    rating: 4.8,
    reviewsCount: "6,480",
    image: "https://images.unsplash.com/photo-1726042543911-8c4a3f8b74e8?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: true,
    dealTag: "Pro Camera System",
    specs: ["256 GB ROM with Super Retina XDR display", "48MP Fusion camera with 5x Telephoto", "A18 Pro chip with Apple Intelligence", "Titanium design with USB-C"]
  },
  {
    id: 23,
    name: "Apple iPhone 16 (Ultramarine, 128 GB)",
    category: "mobiles",
    price: 79900,
    originalPrice: 84900,
    discount: 5,
    rating: 4.7,
    reviewsCount: "8,930",
    image: "https://images.unsplash.com/photo-1722348828358-0e49f8f4f0f4?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: false,
    dealTag: "Next Generation",
    specs: ["128 GB ROM with Super Retina XDR display", "48MP Fusion camera system", "A18 chip with Apple Intelligence", "Action button and Camera Control"]
  },
  {
    id: 24,
    name: "Apple iPhone 15 (Green, 128 GB)",
    category: "mobiles",
    price: 59900,
    originalPrice: 69900,
    discount: 14,
    rating: 4.6,
    reviewsCount: "14,280",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=80",
    assured: true,
    isDealOfDay: true,
    dealTag: "Limited Time Price",
    specs: ["128 GB ROM with Super Retina XDR display", "48MP main camera with 2x Telephoto", "A16 Bionic chip", "USB-C charging with Ceramic Shield"]
  },
  {
    id: 25, name: "Samsung Galaxy S24 5G (Onyx Black, 256 GB)", category: "mobiles",
    price: 58999, originalPrice: 74999, discount: 21, rating: 4.6, reviewsCount: "9,540",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Galaxy AI Flagship",
    specs: ["8 GB RAM | 256 GB ROM", "50MP triple camera with 3x telephoto", "Snapdragon 8 Gen 3 for Galaxy", "6.2 inch Dynamic AMOLED 2X display"]
  },
  {
    id: 26, name: "Google Pixel 9 5G (Porcelain, 256 GB)", category: "mobiles",
    price: 79999, originalPrice: 84999, discount: 6, rating: 4.5, reviewsCount: "3,840",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Google AI Camera",
    specs: ["12 GB RAM | 256 GB ROM", "50MP wide and 48MP ultrawide cameras", "Google Tensor G4 processor", "6.3 inch Actua OLED display"]
  },
  {
    id: 27, name: "OnePlus 12R 5G (Cool Blue, 256 GB)", category: "mobiles",
    price: 42999, originalPrice: 45999, discount: 7, rating: 4.5, reviewsCount: "11,260",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "All-day Performance",
    specs: ["16 GB RAM | 256 GB ROM", "50MP Sony IMX890 main camera with OIS", "Snapdragon 8 Gen 2 processor", "5500 mAh battery with 100W charging"]
  },
  {
    id: 28, name: "Xiaomi 14 5G (Jade Green, 512 GB)", category: "mobiles",
    price: 59999, originalPrice: 69999, discount: 14, rating: 4.4, reviewsCount: "4,920",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Leica Optics",
    specs: ["12 GB RAM | 512 GB ROM", "Leica 50MP triple camera setup", "Snapdragon 8 Gen 3 processor", "6.36 inch 120Hz LTPO AMOLED"]
  },
  {
    id: 29, name: "Redmi Note 14 Pro+ 5G (Titan Black, 256 GB)", category: "mobiles",
    price: 32999, originalPrice: 36999, discount: 11, rating: 4.3, reviewsCount: "8,610",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "200MP OIS Camera",
    specs: ["8 GB RAM | 256 GB ROM", "200MP OIS camera with 4K video", "MediaTek Dimensity 7300 Ultra", "120Hz curved AMOLED display"]
  },
  {
    id: 30, name: "Motorola Edge 50 Fusion 5G (Marshmallow Blue, 128 GB)", category: "mobiles",
    price: 22999, originalPrice: 24999, discount: 8, rating: 4.2, reviewsCount: "6,430",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Vegan Leather Design",
    specs: ["8 GB RAM | 128 GB ROM", "50MP LYTIA camera with OIS", "Snapdragon 7s Gen 2 processor", "6.7 inch 144Hz pOLED display"]
  },
  {
    id: 31, name: "Vivo V40 5G (Ganges Blue, 256 GB)", category: "mobiles",
    price: 34999, originalPrice: 38999, discount: 10, rating: 4.3, reviewsCount: "5,280",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "ZEISS Portrait Studio",
    specs: ["8 GB RAM | 256 GB ROM", "ZEISS 50MP dual camera with OIS", "Snapdragon 7 Gen 3 processor", "5500 mAh battery with 80W FlashCharge"]
  },
  {
    id: 32, name: "OPPO Reno 12 Pro 5G (Space Brown, 256 GB)", category: "mobiles",
    price: 36999, originalPrice: 42999, discount: 14, rating: 4.2, reviewsCount: "4,170",
    image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "AI Portrait Camera",
    specs: ["12 GB RAM | 256 GB ROM", "50MP AI portrait camera with telephoto", "MediaTek Dimensity 7300-Energy", "6.7 inch 120Hz flexible AMOLED"]
  },
  {
    id: 33, name: "realme 13 Pro+ 5G (Monet Gold, 256 GB)", category: "mobiles",
    price: 29999, originalPrice: 33999, discount: 12, rating: 4.2, reviewsCount: "7,920",
    image: "https://images.unsplash.com/photo-1592286927505-2fd0fdb0b1f7?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Sony LYTIA Camera",
    specs: ["12 GB RAM | 256 GB ROM", "50MP Sony LYT-701 OIS camera", "Snapdragon 7s Gen 2 processor", "5200 mAh battery with 80W charging"]
  },
  {
    id: 34, name: "ASUS ROG Phone 8 5G (Rebel Grey, 256 GB)", category: "mobiles",
    price: 79999, originalPrice: 89999, discount: 11, rating: 4.5, reviewsCount: "1,180",
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "AirTrigger Gaming",
    specs: ["16 GB RAM | 256 GB ROM", "50MP gimbal camera with OIS", "Snapdragon 8 Gen 3 processor", "165Hz AMOLED display and 5500 mAh battery"]
  },
  {
    id: 35, name: "Sony Xperia 10 VI 5G (White, 128 GB)", category: "mobiles",
    price: 44990, originalPrice: 49990, discount: 10, rating: 4.1, reviewsCount: "620",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "CinemaWide Display",
    specs: ["8 GB RAM | 128 GB ROM", "48MP dual camera with optical stabilisation", "Snapdragon 6 Gen 1 processor", "21:9 OLED display with 3.5mm audio jack"]
  },
  {
    id: 36, name: "Nokia G42 5G (So Pink, 128 GB)", category: "mobiles",
    price: 14999, originalPrice: 17999, discount: 17, rating: 4.0, reviewsCount: "3,920",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "QuickFix Repairable",
    specs: ["6 GB RAM | 128 GB ROM", "50MP triple rear camera", "Snapdragon 480+ 5G processor", "5000 mAh battery with 20W charging"]
  },
  {
    id: 37, name: "Honor 200 5G (Moonlight White, 512 GB)", category: "mobiles",
    price: 39999, originalPrice: 44999, discount: 11, rating: 4.3, reviewsCount: "2,470",
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Harcourt Portrait Mode",
    specs: ["12 GB RAM | 512 GB ROM", "50MP portrait camera with OIS", "Snapdragon 7 Gen 3 processor", "5200 mAh battery with 100W charging"]
  },
  {
    id: 38, name: "Huawei Nova 12 Pro 5G (Blue, 256 GB)", category: "mobiles",
    price: 54990, originalPrice: 59990, discount: 8, rating: 4.0, reviewsCount: "480",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "XMAGE Selfie Camera",
    specs: ["12 GB RAM | 256 GB ROM", "50MP front portrait camera", "Kirin 8000 chipset", "120Hz OLED display with 100W charging"]
  },
  {
    id: 39, name: "Apple iPhone 15 Plus (Blue, 128 GB)", category: "mobiles",
    price: 69900, originalPrice: 79900, discount: 13, rating: 4.6, reviewsCount: "9,840",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Plus Battery Life",
    specs: ["128 GB ROM with 6.7-inch Super Retina XDR", "48MP main camera with 2x telephoto", "A16 Bionic chip", "USB-C charging and Ceramic Shield"]
  },
  {
    id: 40, name: "Samsung Galaxy Z Flip6 5G (Silver Shadow, 256 GB)", category: "mobiles",
    price: 99999, originalPrice: 109999, discount: 9, rating: 4.5, reviewsCount: "3,240",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Foldable Style",
    specs: ["12 GB RAM | 256 GB ROM", "50MP wide camera with FlexCam", "Snapdragon 8 Gen 3 for Galaxy", "3.4-inch FlexWindow cover display"]
  },
  {
    id: 41, name: "Google Pixel 8a 5G (Bay, 128 GB)", category: "mobiles",
    price: 52999, originalPrice: 56999, discount: 7, rating: 4.4, reviewsCount: "5,670",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Best AI Value",
    specs: ["8 GB RAM | 128 GB ROM", "64MP Quad Bayer camera with Magic Editor", "Google Tensor G3 processor", "6.1-inch Actua OLED with 120Hz"]
  },
  {
    id: 42, name: "OnePlus Nord 4 5G (Obsidian Midnight, 256 GB)", category: "mobiles",
    price: 32999, originalPrice: 35999, discount: 8, rating: 4.4, reviewsCount: "12,480",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Metal Unibody",
    specs: ["8 GB RAM | 256 GB ROM", "50MP Sony LYT-600 OIS camera", "Snapdragon 7+ Gen 3 processor", "5500 mAh battery with 100W charging"]
  },
  {
    id: 43, name: "Xiaomi 14 Civi 5G (Cruise Blue, 256 GB)", category: "mobiles",
    price: 42999, originalPrice: 47999, discount: 10, rating: 4.3, reviewsCount: "3,760",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Leica Portraits",
    specs: ["8 GB RAM | 256 GB ROM", "50MP Leica triple camera setup", "Snapdragon 8s Gen 3 processor", "6.55-inch 1.5K AMOLED display"]
  },
  {
    id: 44, name: "Redmi Note 13 5G (Chromatic Purple, 128 GB)", category: "mobiles",
    price: 17999, originalPrice: 20999, discount: 14, rating: 4.2, reviewsCount: "18,520",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Everyday 5G",
    specs: ["6 GB RAM | 128 GB ROM", "108MP main camera", "MediaTek Dimensity 6080 processor", "120Hz AMOLED display"]
  },
  {
    id: 45, name: "Motorola Razr 50 Ultra 5G (Peach Fuzz, 512 GB)", category: "mobiles",
    price: 99999, originalPrice: 109999, discount: 9, rating: 4.4, reviewsCount: "2,180",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Flip Phone Pro",
    specs: ["12 GB RAM | 512 GB ROM", "50MP main and telephoto cameras", "Snapdragon 8s Gen 3 processor", "4.0-inch external pOLED display"]
  },
  {
    id: 46, name: "Vivo X Fold3 Pro 5G (Celestial Black, 512 GB)", category: "mobiles",
    price: 159999, originalPrice: 169999, discount: 6, rating: 4.5, reviewsCount: "920",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Foldable Flagship",
    specs: ["16 GB RAM | 512 GB ROM", "ZEISS triple camera with telephoto", "Snapdragon 8 Gen 3 processor", "8.03-inch foldable AMOLED display"]
  },
  {
    id: 47, name: "OPPO F27 Pro+ 5G (Dusk Pink, 256 GB)", category: "mobiles",
    price: 29999, originalPrice: 33999, discount: 12, rating: 4.1, reviewsCount: "5,430",
    image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "IP69 Protection",
    specs: ["8 GB RAM | 256 GB ROM", "64MP portrait camera", "MediaTek Dimensity 7050 processor", "120Hz curved AMOLED display"]
  },
  {
    id: 48, name: "realme GT 6T 5G (Fluid Silver, 128 GB)", category: "mobiles",
    price: 30999, originalPrice: 33999, discount: 9, rating: 4.3, reviewsCount: "8,260",
    image: "https://images.unsplash.com/photo-1592286927505-2fd0fdb0b1f7?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Gaming Performance",
    specs: ["8 GB RAM | 128 GB ROM", "50MP Sony LYT-600 OIS camera", "Snapdragon 7+ Gen 3 processor", "5500 mAh battery with 120W charging"]
  },
  {
    id: 49, name: "ASUS Zenfone 11 Ultra 5G (Eternal Black, 512 GB)", category: "mobiles",
    price: 89999, originalPrice: 99999, discount: 10, rating: 4.3, reviewsCount: "1,040",
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Compact Flagship Power",
    specs: ["16 GB RAM | 512 GB ROM", "50MP gimbal stabilised camera", "Snapdragon 8 Gen 3 processor", "5500 mAh battery with LTPO AMOLED"]
  },
  {
    id: 50, name: "Sony Xperia 1 V 5G (Black, 256 GB)", category: "mobiles",
    price: 109990, originalPrice: 119990, discount: 8, rating: 4.2, reviewsCount: "740",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Cinema Pro Creator",
    specs: ["12 GB RAM | 256 GB ROM", "Exmor T sensor with ZEISS optics", "Snapdragon 8 Gen 2 processor", "4K HDR OLED 120Hz display"]
  },
  {
    id: 51, name: "Nokia C32 (Charcoal, 128 GB)", category: "mobiles",
    price: 9999, originalPrice: 11999, discount: 17, rating: 3.9, reviewsCount: "6,840",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Reliable Everyday Phone",
    specs: ["4 GB RAM | 128 GB ROM", "50MP dual rear camera", "Unisoc SC9863A1 processor", "5000 mAh battery with Android 13"]
  },
  {
    id: 52, name: "Honor X9b 5G (Sunrise Orange, 256 GB)", category: "mobiles",
    price: 24999, originalPrice: 28999, discount: 14, rating: 4.2, reviewsCount: "7,120",
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Ultra-Bounce Display",
    specs: ["8 GB RAM | 256 GB ROM", "108MP ultra-clear camera", "Snapdragon 6 Gen 1 processor", "5800 mAh battery with curved AMOLED"]
  },
  {
    id: 53, name: "Huawei Mate 60 Pro (Black, 512 GB)", category: "mobiles",
    price: 89990, originalPrice: 99990, discount: 10, rating: 4.1, reviewsCount: "610",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "XMAGE Flagship",
    specs: ["12 GB RAM | 512 GB ROM", "50MP variable aperture camera", "Kirin 9000S processor", "IP68 water and dust resistance"]
  },
  {
    id: 54, name: "Nothing Phone (2a) 5G (Milk, 256 GB)", category: "mobiles",
    price: 27999, originalPrice: 31999, discount: 13, rating: 4.3, reviewsCount: "10,640",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Glyph Design",
    specs: ["12 GB RAM | 256 GB ROM", "50MP dual camera system", "MediaTek Dimensity 7200 Pro", "6.7-inch flexible AMOLED display"]
  },
  {
    id: 55, name: "Dell XPS 14 (Intel Core Ultra 7, 1TB SSD)", category: "laptops", price: 149990, originalPrice: 169990, discount: 12, rating: 4.5, reviewsCount: "1,840", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Premium Workstation", specs: ["32 GB RAM | 1 TB SSD", "Intel Core Ultra 7 processor", "14.5-inch 3.2K OLED display", "Windows 11 with Intel Arc graphics"]
  },
  {
    id: 56, name: "HP Spectre x360 14 (Core Ultra 7, 1TB SSD)", category: "laptops", price: 139990, originalPrice: 159990, discount: 13, rating: 4.4, reviewsCount: "1,260", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "2-in-1 Convertible", specs: ["16 GB RAM | 1 TB SSD", "Intel Core Ultra 7 processor", "14-inch 2.8K OLED touch display", "360-degree hinge with pen support"]
  },
  {
    id: 57, name: "Lenovo Legion 5i Gaming Laptop (Core i7, RTX 4060)", category: "laptops", price: 119990, originalPrice: 139990, discount: 14, rating: 4.6, reviewsCount: "2,420", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Gaming Power", specs: ["16 GB RAM | 1 TB SSD", "Intel Core i7 processor", "NVIDIA RTX 4060 graphics", "16-inch WQXGA 165Hz display"]
  },
  {
    id: 58, name: "Bose QuietComfort Ultra Headphones", category: "audio", price: 34900, originalPrice: 39900, discount: 13, rating: 4.6, reviewsCount: "4,260", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Immersive Audio", specs: ["Spatial audio with Immersive Modes", "World-class active noise cancellation", "Up to 24 hours battery life", "Bluetooth multipoint connectivity"]
  },
  {
    id: 59, name: "Samsung Galaxy Watch7 Bluetooth (44mm)", category: "audio", price: 33999, originalPrice: 37999, discount: 11, rating: 4.4, reviewsCount: "2,830", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Health Tracking", specs: ["Super AMOLED display", "Sleep and heart-rate monitoring", "Wear OS with Google services", "5ATM water resistance"]
  },
  {
    id: 60, name: "JBL Live Beam 3 True Wireless Earbuds", category: "audio", price: 8999, originalPrice: 12999, discount: 31, rating: 4.3, reviewsCount: "8,140", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Adaptive ANC", specs: ["True Adaptive Noise Cancelling", "Up to 48 hours total playback", "Hi-Res Audio wireless", "Smart charging case with display"]
  },
  {
    id: 61, name: "Levi's 511 Slim Fit Jeans (Dark Indigo)", category: "fashion", price: 2499, originalPrice: 3999, discount: 38, rating: 4.4, reviewsCount: "12,640", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Everyday Essential", specs: ["Stretch denim fabric", "Slim fit through seat and thigh", "Classic five-pocket styling", "Machine washable cotton blend"]
  },
  {
    id: 62, name: "Adidas Ultraboost Light Running Shoes", category: "fashion", price: 8999, originalPrice: 14999, discount: 40, rating: 4.6, reviewsCount: "5,420", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Performance Running", specs: ["Lightweight BOOST midsole", "Engineered adidas PRIMEKNIT upper", "Continental rubber outsole", "Regular lace-up closure"]
  },
  {
    id: 63, name: "Ray-Ban Aviator Classic Sunglasses", category: "fashion", price: 8490, originalPrice: 9990, discount: 15, rating: 4.7, reviewsCount: "3,180", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Iconic Style", specs: ["Classic aviator metal frame", "UV-protected G-15 lenses", "Adjustable nose pads", "Includes protective case and cloth"]
  },
  {
    id: 8,
    name: "Nike Air Jordan 1 Retro High OG Chicago Sneakers",
    category: "fashion",
    price: 16995,
    originalPrice: 19995,
    discount: 15,
    rating: 4.9,
    reviewsCount: "6,210",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=80",
    assured: false,
    isDealOfDay: false,
    dealTag: "Iconic Collector Edition",
    specs: [
      "Genuine leather upper for durability",
      "Encapsulated Air-Sole unit in heel",
      "Solid rubber outsole with deep flex grooves",
      "Padded collar for ankle support"
    ]
  },
  {
    id: 64, name: "Maybelline New York Fit Me Matte + Poreless Foundation", category: "beauty", price: 549, originalPrice: 699, discount: 21, rating: 4.5, reviewsCount: "9,840", image: "https://images.unsplash.com/photo-1631730486572-226d1c12f952?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Beauty Bestseller", specs: ["Lightweight matte finish", "Controls shine for up to 12 hours", "Available in multiple shades", "Suitable for normal to oily skin"]
  },
  {
    id: 65, name: "L'Oréal Paris Revitalift Hyaluronic Acid Serum", category: "beauty", price: 799, originalPrice: 999, discount: 20, rating: 4.6, reviewsCount: "7,260", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Glow Essential", specs: ["1.5% Hyaluronic Acid", "Deeply hydrates and plumps skin", "Dermatologically tested", "Suitable for all skin types"]
  },
  {
    id: 66, name: "MAC Powder Kiss Lipstick (Mull It Over)", category: "beauty", price: 2250, originalPrice: 2700, discount: 17, rating: 4.7, reviewsCount: "4,180", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Premium Makeup", specs: ["Soft matte moisture-matte finish", "Buildable color payoff", "Lightweight comfortable texture", "Long-lasting formula"]
  },
  {
    id: 67, name: "The Body Shop British Rose Body Butter", category: "beauty", price: 1295, originalPrice: 1595, discount: 19, rating: 4.4, reviewsCount: "3,940", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Self Care Pick", specs: ["Rich nourishing body butter", "Infused with rose extract", "Helps soften dry skin", "Cruelty-free beauty care"]
  },
  {
    id: 68, name: "Nykaa Matte To Last Liquid Lipstick", category: "beauty", price: 599, originalPrice: 749, discount: 20, rating: 4.3, reviewsCount: "6,820", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Trending Shade", specs: ["Highly pigmented color", "Transfer-resistant formula", "Comfortable matte finish", "Easy precision applicator"]
  },
  {
    id: 69, name: "Lakmé Absolute Skin Natural Mousse Foundation", category: "beauty", price: 825, originalPrice: 1050, discount: 21, rating: 4.4, reviewsCount: "5,110", image: "https://images.unsplash.com/photo-1522335789203-aabad2a9f9f0?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Makeup Essential", specs: ["Lightweight mousse texture", "Natural matte coverage", "SPF 8 protection", "Blends easily for an even finish"]
  },
  {
    id: 70, name: "Minimalist 10% Niacinamide Face Serum", category: "beauty", price: 599, originalPrice: 699, discount: 14, rating: 4.5, reviewsCount: "11,430", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Skincare Favourite", specs: ["10% Niacinamide with Zinc", "Helps reduce excess oil", "Supports clearer-looking skin", "Fragrance-free formula"]
  },
  {
    id: 71, name: "Dove Deeply Nourishing Body Wash", category: "beauty", price: 349, originalPrice: 425, discount: 18, rating: 4.6, reviewsCount: "8,760", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Daily Care", specs: ["Moisturising body wash", "Mild cleansing formula", "Leaves skin soft and smooth", "Suitable for everyday use"]
  },
  {
    id: 72, name: "Mamaearth Vitamin C Face Wash", category: "beauty", price: 399, originalPrice: 499, discount: 20, rating: 4.4, reviewsCount: "10,260", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Natural Care", specs: ["Vitamin C and turmeric formula", "Helps remove daily impurities", "Brightens dull-looking skin", "Suitable for all skin types"]
  },
  {
    id: 73, name: "Neutrogena Hydro Boost Water Gel", category: "beauty", price: 950, originalPrice: 1100, discount: 14, rating: 4.6, reviewsCount: "8,910", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Hydration Pick", specs: ["Hyaluronic acid gel moisturiser", "Oil-free and non-comedogenic", "Lightweight fast-absorbing texture", "Provides long-lasting hydration"]
  },
  {
    id: 74, name: "Cetaphil Gentle Skin Cleanser", category: "beauty", price: 699, originalPrice: 799, discount: 13, rating: 4.7, reviewsCount: "13,540", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Dermatologist Choice", specs: ["Gentle non-irritating cleanser", "Maintains skin moisture barrier", "Fragrance-free formula", "Ideal for sensitive skin"]
  },
  {
    id: 75, name: "SUGAR Cosmetics Ace Of Face Foundation Stick", category: "beauty", price: 999, originalPrice: 1199, discount: 17, rating: 4.3, reviewsCount: "4,620", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Makeup Favourite", specs: ["Buildable medium-to-full coverage", "Creamy blendable stick formula", "Travel-friendly packaging", "Natural matte finish"]
  },
  {
    id: 76, name: "Plum Green Tea Pore Cleansing Face Wash", category: "beauty", price: 429, originalPrice: 575, discount: 25, rating: 4.4, reviewsCount: "7,380", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Vegan Beauty", specs: ["Green tea pore cleansing formula", "Helps control excess oil", "Vegan and cruelty-free", "Suitable for combination skin"]
  },
  {
    id: 77, name: "NIVEA Soft Light Moisturising Cream", category: "beauty", price: 299, originalPrice: 375, discount: 20, rating: 4.5, reviewsCount: "16,820", image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: true, dealTag: "Everyday Moisture", specs: ["Vitamin E and jojoba oil", "Light non-sticky texture", "For face, body and hands", "Quickly absorbs into skin"]
  },
  {
    id: 78, name: "Colorbar Stay The Day Finishing Spray", category: "beauty", price: 699, originalPrice: 899, discount: 22, rating: 4.2, reviewsCount: "3,270", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=80", assured: true, isDealOfDay: false, dealTag: "Makeup Fixer", specs: ["Lightweight makeup setting mist", "Helps makeup stay fresh", "Fine even spray application", "Suitable for all skin types"]
  }
];

const BEAUTY_BRAND_EXPANSION = {
  Maybelline: ["SuperStay Matte Ink Liquid Lipstick", "Lash Sensational Sky High Mascara", "Fit Me Compact Powder", "The Colossal Kajal", "Baby Lips Moisturizing Lip Balm", "Instant Age Rewind Concealer", "Fit Me Blush", "Lasting Drama Gel Eyeliner", "FaceStudio Master Chrome Highlighter"],
  "L'Oréal": ["Paris Hyaluron Moisture Shampoo", "Paris Extraordinary Oil Serum", "Paris Infallible Concealer", "Paris Voluminous Mascara", "Paris Revitalift Night Cream", "Paris UV Defender Sunscreen", "Paris Color Riche Lipstick", "Paris Dream Lengths Conditioner", "Paris Glycolic Bright Serum"],
  MAC: ["Ruby Woo Retro Matte Lipstick", "Studio Fix Fluid Foundation", "Prep + Prime Fix+ Mist", "Mineralize Skinfinish Highlighter", "Pro Longwear Concealer", "Extended Play Gigablack Mascara", "M·A·C Eye Kohl", "Lipglass Clear Gloss", "Blot Powder Pressed Powder"],
  "The Body Shop": ["Tea Tree Skin Clearing Facial Wash", "Shea Body Butter", "Vitamin E Moisture Cream", "Aloe Soothing Day Cream", "Moringa Shower Gel", "Hemp Hand Protector", "British Rose Shower Gel", "Ginger Scalp Care Shampoo", "Satsuma Body Mist"],
  Nykaa: ["SkinShield Anti-Pollution Sunscreen", "So Creme! Matte Lipstick", "Wanderlust Body Lotion", "Gloss It Up High Shine Lip Gloss", "Eyes On Me 10-in-1 Palette", "Prep Me Up Face Primer", "Black Magic Liquid Eyeliner", "Naturals Hand Cream", "Glow Getter Highlighter"],
  Lakmé: ["Absolute Matte Melt Liquid Lip Color", "9 to 5 Primer + Matte Lipstick", "Eyeconic Curling Mascara", "Sun Expert SPF 50 Sunscreen", "Absolute Blur Perfect Primer", "Peach Milk Moisturizer", "Radiance Face Powder", "Absolute Spotlight Eye Shadow Palette", "Nourishing Night Cream"],
  Minimalist: ["2% Salicylic Acid Face Serum", "Alpha Arbutin 2% Serum", "Vitamin C 10% Face Serum", "SPF 50 Sunscreen", "Retinol 0.3% Face Serum", "Glycolic Acid Toner", "Ceramide Moisturizer", "Caffeine Under Eye Cream", "Aquaporin Booster Face Wash"],
  Dove: ["Daily Shine Shampoo", "Intense Repair Conditioner", "Deep Moisture Body Lotion", "Original Beauty Bar", "Exfoliating Body Polish", "Advanced Serum Deodorant", "Go Fresh Shower Gel", "Hair Therapy Breakage Repair Mask", "Coconut and Jasmine Body Scrub"],
  Mamaearth: ["Ubtan Face Mask", "Onion Hair Oil", "Aqua Glow Face Wash", "Rice Face Wash", "Vitamin C Face Serum", "Argan Hair Mask", "Sunscreen SPF 50", "Milky Soft Body Lotion", "Tea Tree Spot Gel"],
  Neutrogena: ["Ultra Sheer Dry Touch Sunscreen", "Oil-Free Acne Wash", "Deep Clean Facial Cleanser", "Rapid Wrinkle Repair Cream", "Hydro Boost Cleanser", "Norwegian Formula Hand Cream", "Rainbath Shower Gel", "Visible Repair Serum", "Clear Face Moisturizer"],
  Cetaphil: ["Daily Facial Cleanser", "Moisturising Cream", "Sun SPF 50 Light Gel", "Bright Healthy Radiance Serum", "Baby Gentle Wash", "Gentle Exfoliating Cleanser", "DaiIy Advance Lotion", "Healthy Glow Toner", "Pro Oil Control Foam Wash"],
  "SUGAR Cosmetics": ["Matte Attack Transferproof Lipstick", "Ace Of Face Foundation Stick", "All Set To Go Translucent Powder", "Contour De Force Mini Bronzer", "Jelly Highlighter", "Wingman Waterproof Eyeliner", "Set The Tone Tinted Powder", "Smudge Me Not Liquid Lipstick", "Blend The Rules Eyeshadow Palette"],
  Plum: ["Green Tea Alcohol-Free Toner", "Vitamin C Face Serum", "Hawaiian Rumba Body Mist", "Avocado Nourish-Up Hair Mask", "E-Luminence Cleansing Balm", "Hello Aloe Just Gel", "Chamomile & White Tea Face Wash", "BodyLovin Vanilla Vibes Lotion", "Green Tea Renewed Clarity Night Gel"],
  NIVEA: ["Men Deep Impact Face Wash", "Sun Protect SPF 50 Lotion", "Cherry Shine Lip Balm", "Luminous630 Anti-Dark Spot Serum", "Nourishing Body Milk", "Fresh Energy Deodorant", "MicellAIR Face Wash", "Cocoa Nourish Body Lotion", "Soft Rose Shower Cream"],
  Colorbar: ["Perfect Match Primer", "Velvet Matte Lipstick", "Cheekillusion Blush", "All Day Waterproof Foundation", "Just Smoky Kajal", "Radiant Glow Highlighter", "Zoom & Whoosh Mascara", "Stay The Day Compact", "Cosmetic Brush Set"]
};

const BEAUTY_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&auto=format&fit=crop&q=80"
];

let nextBeautyProductId = 79;
Object.entries(BEAUTY_BRAND_EXPANSION).forEach(([brand, names], brandIndex) => {
  names.forEach((name, productIndex) => {
    const price = 299 + ((brandIndex * 137 + productIndex * 211) % 1900);
    PRODUCTS.push({
      id: nextBeautyProductId++,
      name: `${brand} ${name}`,
      category: "beauty",
      price,
      originalPrice: Math.ceil(price * 1.2 / 10) * 10,
      discount: 17 + ((brandIndex + productIndex) % 16),
      rating: Number((4.2 + ((brandIndex + productIndex) % 7) / 10).toFixed(1)),
      reviewsCount: `${(2400 + brandIndex * 613 + productIndex * 387).toLocaleString('en-IN')}`,
      image: BEAUTY_IMAGE_POOL[(brandIndex + productIndex) % BEAUTY_IMAGE_POOL.length],
      assured: true,
      isDealOfDay: productIndex % 3 === 0,
      dealTag: "Beauty Favourite",
      specs: ["Premium beauty formula", "Everyday easy-to-use application", "Suitable for regular beauty routines", "Tuhin Assured quality"]
    });
  });
});

const MOBILE_MODEL_NAMES = {
  iPhone: ["Apple iPhone 16", "Apple iPhone 16 Plus", "Apple iPhone 16 Pro", "Apple iPhone 16 Pro Max", "Apple iPhone 15", "Apple iPhone 15 Plus", "Apple iPhone 15 Pro Max", "Apple iPhone 14", "Apple iPhone 13", "Apple iPhone SE"],
  Samsung: ["Samsung Galaxy S25", "Samsung Galaxy S25+", "Samsung Galaxy S25 Ultra", "Samsung Galaxy S24 FE", "Samsung Galaxy Z Fold6", "Samsung Galaxy Z Flip6", "Samsung Galaxy A56 5G", "Samsung Galaxy A36 5G", "Samsung Galaxy M35 5G", "Samsung Galaxy F55 5G"],
  "Google Pixel": ["Google Pixel 9", "Google Pixel 9 Pro", "Google Pixel 9 Pro XL", "Google Pixel 8a", "Google Pixel 8", "Google Pixel 8 Pro", "Google Pixel 7a", "Google Pixel Fold", "Google Pixel 7", "Google Pixel 6a"],
  OnePlus: ["OnePlus 13", "OnePlus 13R", "OnePlus 12R", "OnePlus Nord 4", "OnePlus Nord CE4", "OnePlus Nord CE4 Lite", "OnePlus Open", "OnePlus 11R", "OnePlus 10 Pro", "OnePlus Nord 3"],
  Xiaomi: ["Xiaomi 14", "Xiaomi 14 Ultra", "Xiaomi 14 Civi", "Xiaomi 13 Pro", "Xiaomi Redmi Note 14 Pro+", "Xiaomi Redmi Note 14 Pro", "Xiaomi Redmi Note 14", "Xiaomi 13T Pro", "Xiaomi Mix Fold 4", "Xiaomi Poco F6"],
  Redmi: ["Redmi Note 14 Pro+", "Redmi Note 14 Pro", "Redmi Note 14", "Redmi Note 13 Pro+", "Redmi Note 13 Pro", "Redmi Note 13", "Redmi 13 5G", "Redmi 12 5G", "Redmi A4 5G", "Redmi K70"],
  Motorola: ["Motorola Edge 50 Ultra", "Motorola Edge 50 Pro", "Motorola Edge 50 Fusion", "Motorola Razr 50 Ultra", "Motorola Razr 50", "Motorola Moto G85 5G", "Motorola Moto G75 5G", "Motorola Moto G64 5G", "Motorola Moto G55 5G", "Motorola ThinkPhone"],
  Vivo: ["Vivo X200 Pro", "Vivo X200", "Vivo V40 Pro", "Vivo V40", "Vivo V30 Pro", "Vivo V30", "Vivo T3 Ultra", "Vivo T3 Pro", "Vivo Y200 Pro", "Vivo Y100"],
  OPPO: ["OPPO Find X8 Pro", "OPPO Find X8", "OPPO Reno 13 Pro", "OPPO Reno 13", "OPPO Reno 12 Pro", "OPPO Reno 12", "OPPO F27 Pro+", "OPPO F27", "OPPO A5 Pro 5G", "OPPO A3 Pro"],
  realme: ["realme GT 7 Pro", "realme GT 6", "realme GT 6T", "realme 13 Pro+", "realme 13 Pro", "realme P3 Pro", "realme P3x 5G", "realme Narzo 70 Pro", "realme Narzo 70", "realme C75 5G"],
  ASUS: ["ASUS ROG Phone 9 Pro", "ASUS ROG Phone 9", "ASUS ROG Phone 8 Pro", "ASUS ROG Phone 8", "ASUS Zenfone 11 Ultra", "ASUS Zenfone 10", "ASUS ROG Phone 7 Ultimate", "ASUS ROG Phone 7", "ASUS Zenfone 9", "ASUS ROG Phone 6D"],
  Nothing: ["Nothing Phone (3)", "Nothing Phone (2a) Plus", "Nothing Phone (2a)", "Nothing Phone (2)", "Nothing Phone (1)", "Nothing Phone (2) Pro", "Nothing Phone (3a)", "Nothing Phone (3a) Pro", "Nothing Phone (4)", "Nothing Phone (4) Pro"],
  "Sony Xperia": ["Sony Xperia 1 VI", "Sony Xperia 5 V", "Sony Xperia 10 VI", "Sony Xperia 1 V", "Sony Xperia 5 IV", "Sony Xperia 10 V", "Sony Xperia Pro-I", "Sony Xperia 1 IV", "Sony Xperia 5 III", "Sony Xperia 10 IV"],
  CMF: ["CMF Phone 1", "CMF Phone 1 Pro", "CMF Phone 2", "CMF Phone 2 Pro", "CMF Phone 1 5G", "CMF Phone Mini", "CMF Phone Plus", "CMF Phone Lite", "CMF Phone Edge", "CMF Phone Max"],
  Nokia: ["Nokia X50 5G", "Nokia G60 5G", "Nokia G42 5G", "Nokia C32", "Nokia C22", "Nokia X30 5G", "Nokia G21", "Nokia C31", "Nokia 8210 4G", "Nokia 2660 Flip"],
  Honor: ["Honor Magic7 Pro", "Honor Magic6 Pro", "Honor 200 Pro", "Honor 200", "Honor 90", "Honor X9c 5G", "Honor X8b", "Honor Magic V3", "Honor 90 Lite", "Honor X7b"],
  Huawei: ["Huawei Pura 70 Ultra", "Huawei Pura 70 Pro", "Huawei Mate 70 Pro", "Huawei Mate X6", "Huawei Nova 13 Pro", "Huawei Nova 12", "Huawei P60 Pro", "Huawei Mate 60 Pro", "Huawei Nova Y72", "Huawei Enjoy 70"]
};

const MOBILE_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80"
];

let nextMobileProductId = 200;
Object.entries(MOBILE_MODEL_NAMES).forEach(([brand, models], brandIndex) => {
  const existingCount = PRODUCTS.filter(product => product.category === "mobiles" && getPhoneBrand(product) === brand).length;
  models.slice(0, Math.max(0, 10 - existingCount)).forEach((name, modelIndex) => {
    const price = 8999 + ((brandIndex * 7913 + modelIndex * 3187) % 110000);
    PRODUCTS.push({
      id: nextMobileProductId++,
      name: `${name} (5G, 256 GB)`,
      category: "mobiles",
      price,
      originalPrice: Math.ceil(price * 1.12 / 100) * 100,
      discount: 8 + ((brandIndex + modelIndex) % 23),
      rating: Number((4.2 + ((brandIndex + modelIndex) % 7) / 10).toFixed(1)),
      reviewsCount: `${(1800 + brandIndex * 731 + modelIndex * 419).toLocaleString('en-IN')}`,
      image: MOBILE_IMAGE_POOL[(brandIndex + modelIndex) % MOBILE_IMAGE_POOL.length],
      assured: true,
      isDealOfDay: modelIndex % 3 === 0,
      dealTag: "Mobile Bestseller",
      specs: ["5G smartphone with premium display", "High-resolution multi-camera system", "All-day battery with fast charging", "Tuhin Assured quality"]
    });
  });
});

const AUDIO_WEARABLE_NAMES = {
  Apple: ["AirPods Pro (2nd Gen)", "AirPods (3rd Gen)", "AirPods Max", "Apple Watch Series 10", "Apple Watch Ultra 2", "Apple Watch SE", "AirPods Pro USB-C", "Beats Studio Pro", "Beats Fit Pro", "Beats Solo 4"],
  Samsung: ["Galaxy Buds3 Pro", "Galaxy Buds3", "Galaxy Buds FE", "Galaxy Watch7", "Galaxy Watch Ultra", "Galaxy Watch6 Classic", "Galaxy Watch6", "Galaxy Buds2 Pro", "Galaxy Buds2", "Galaxy Fit3"],
  Bose: ["QuietComfort Ultra Earbuds", "QuietComfort Headphones", "SoundLink Flex Speaker", "SoundLink Max Speaker", "QuietComfort Earbuds II", "SoundLink Revolve+ II", "Bose 700 Headphones", "Bose Sport Earbuds", "Bose Smart Soundbar", "Bose Home Speaker 500"],
  JBL: ["Tour One M3 Headphones", "Live Beam 3 Earbuds", "Live 770NC Headphones", "Tune 770NC Headphones", "Flip 7 Speaker", "Charge 6 Speaker", "PartyBox Club 120", "Wave Beam 2 Earbuds", "Endurance Peak 3", "Go 4 Portable Speaker"],
  Sony: ["WH-1000XM5 Headphones", "WF-1000XM5 Earbuds", "WH-1000XM6 Headphones", "LinkBuds Fit", "ULT Field 7 Speaker", "SRS-XG300 Speaker", "WF-C700N Earbuds", "INZONE H9 Gaming Headset", "Float Run Sports Headphones", "SRS-XB100 Speaker"],
  boAt: ["Airdopes 800 Earbuds", "Rockerz 650 Headphones", "Lunar Pro LTE Smartwatch", "Wave Sigma 3 Smartwatch", "Stone Spinx Pro Speaker", "Nirvana Ion Earbuds", "Immortal 1500D Gaming Headset", "Ultima Select Smartwatch", "Airdopes 141 Earbuds", "Stone 620 Speaker"],
  Noise: ["Noise Buds N1 Pro", "Noise Airwave Max 5 Headphones", "ColorFit Pro 6 Smartwatch", "Master Buds Earbuds", "Voyage Smartwatch", "Icon 2 Elite Smartwatch", "Buds X Prime", "Force Plus Smartwatch", "One Plus Smartwatch", "Pure Pods Earbuds"],
  OnePlus: ["OnePlus Buds Pro 3", "OnePlus Buds 3", "OnePlus Nord Buds 3 Pro", "OnePlus Watch 2", "OnePlus Watch 2R", "OnePlus Buds Nord 2r", "OnePlus Bullets Wireless Z2", "OnePlus Buds Pro 2", "OnePlus Nord Buds 2", "OnePlus Watch"],
  Garmin: ["Venu 3 Smartwatch", "Forerunner 265", "Fenix 7 Pro", "Instinct 2 Solar", "Vivoactive 5", "Lily 2 Smartwatch", "Epix Pro Gen 2", "Forerunner 165", "Vivoactive 4", "Approach S70"],
  Amazfit: ["Balance Smartwatch", "GTR 4 Smartwatch", "GTS 4 Smartwatch", "Active Edge Smartwatch", "Bip 5 Smartwatch", "Cheetah Pro Smartwatch", "T-Rex 3 Smartwatch", "GTR Mini Smartwatch", "Band 7 Fitness Tracker", "Falcon Premium Smartwatch"]
};

const AUDIO_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=80"
];

let nextAudioProductId = 400;
Object.entries(AUDIO_WEARABLE_NAMES).forEach(([brand, models], brandIndex) => {
  const existingCount = PRODUCTS.filter(product => product.category === "audio" && getCategoryBrand(product, "audio") === brand).length;
  models.slice(0, Math.max(0, 10 - existingCount)).forEach((name, modelIndex) => {
    const price = 1499 + ((brandIndex * 2761 + modelIndex * 1183) % 48000);
    PRODUCTS.push({
      id: nextAudioProductId++,
      name: `${brand} ${name}`,
      category: "audio",
      price,
      originalPrice: Math.ceil(price * 1.18 / 10) * 10,
      discount: 12 + ((brandIndex + modelIndex) % 24),
      rating: Number((4.2 + ((brandIndex + modelIndex) % 7) / 10).toFixed(1)),
      reviewsCount: `${(2100 + brandIndex * 527 + modelIndex * 381).toLocaleString('en-IN')}`,
      image: AUDIO_IMAGE_POOL[(brandIndex + modelIndex) % AUDIO_IMAGE_POOL.length],
      assured: true,
      isDealOfDay: modelIndex % 3 === 0,
      dealTag: "Audio Bestseller",
      specs: ["Immersive sound and clear calls", "All-day battery life", "Bluetooth connectivity", "Tuhin Assured quality"]
    });
  });
});

// ==========================================
// 2. APPLICATION STATE
// ==========================================
let state = {
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'popularity',
  cart: JSON.parse(localStorage.getItem('fk_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('fk_wishlist')) || [],
  currentSlide: 0
};

// ==========================================
// 3. INITIALIZATION ON DOM LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initEnterpriseLogin();
  renderDealsStrip();
  renderProducts();
  updateCartBadge();
  updateWishlistBadge();
  initCarousel();
  startCountdownTimer();
  initSearchInput();
  initMobileInterface();
  initPaymentMethods();
});

// ==========================================
// 3A. TUHIN ENTERPRISE LOGIN EXPERIENCE
// ==========================================
function initEnterpriseLogin() {
  const loginScreen = document.getElementById('loginScreen');
  const loginForm = document.getElementById('enterpriseLoginForm');
  const loginButton = document.getElementById('loginBtn');
  const accountPanel = document.getElementById('accountPanel');
  const accountName = document.getElementById('accountName');
  const accountIdentity = document.getElementById('accountIdentity');
  const accountDetailsIdentity = document.getElementById('accountDetailsIdentity');
  const accountAvatar = document.getElementById('accountAvatar');
  const accountLogoutButton = document.getElementById('accountLogoutBtn');
  const accountOrdersButton = document.getElementById('accountOrdersBtn');
  const ordersHistory = document.getElementById('ordersHistory');
  const accountProfileButton = document.getElementById('accountProfileBtn');
  const profileDetails = document.getElementById('profileDetails');
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profilePhone = document.getElementById('profilePhone');
  const profileLocation = document.getElementById('profileLocation');
  const createAccountLink = document.getElementById('createAccountLink');
  const loginProfileFields = document.getElementById('loginProfileFields');
  const loginTitle = document.getElementById('loginTitle');
  const loginSubtitle = document.querySelector('.login-card-subtitle');
  const loginSubmitLabel = loginForm.querySelector('.enterprise-login-btn span');
  const passwordInput = document.getElementById('loginPassword');
  const confirmPasswordField = document.querySelector('.confirm-password-field');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const passwordToggle = document.getElementById('passwordToggle');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');

  if (!loginScreen || !loginForm) return;

  const setAuthenticated = (identity = localStorage.getItem('te_identity') || 'Customer') => {
    const cleanIdentity = identity.trim() || 'Customer';
    const savedName = localStorage.getItem('te_name') || '';
    const savedPhone = localStorage.getItem('te_phone') || '';
    const savedLocation = localStorage.getItem('te_location') || '';
    const displayName = savedName || (cleanIdentity.includes('@')
      ? cleanIdentity.split('@')[0]
      : cleanIdentity);
    const initials = displayName
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    localStorage.setItem('te_identity', cleanIdentity);
    localStorage.setItem('te_authenticated', 'true');
    loginButton.classList.add('signed-in');
    loginButton.innerHTML = '<span class="account-dot"></span><span>Signed in</span>';
    loginButton.setAttribute('aria-label', 'Signed in to Tuhin Enterprise');
    accountName.textContent = displayName;
    accountIdentity.textContent = cleanIdentity;
    accountDetailsIdentity.textContent = cleanIdentity;
    accountAvatar.textContent = initials || 'TE';
    profileName.textContent = displayName;
    profileEmail.textContent = cleanIdentity;
    profilePhone.textContent = savedPhone || 'Not added';
    profileLocation.textContent = savedLocation || 'Not added';
  };

  // Always show the login screen first (constant login page)
  // The 2nd interface (main store) only appears after login
  document.body.classList.add('login-active');
  loginScreen.classList.remove('is-hidden', 'login-complete');

  // If previously authenticated, restore the signed-in state in the header
  if (localStorage.getItem('te_authenticated') === 'true') {
    setAuthenticated();
  }

  const renderOrderHistory = () => {
    const identity = localStorage.getItem('te_identity') || 'Customer';
    const orders = JSON.parse(localStorage.getItem(`te_orders_${identity}`) || '[]');
    ordersHistory.innerHTML = '';
    if (orders.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'orders-empty';
      empty.textContent = 'No orders yet. Your completed purchases will appear here.';
      ordersHistory.appendChild(empty);
      return;
    }
    orders.forEach((order) => {
      const card = document.createElement('div');
      card.className = 'order-history-card';
      const heading = document.createElement('strong');
      heading.textContent = `Order #${order.id}`;
      const date = document.createElement('span');
      date.textContent = order.date;
      const items = document.createElement('p');
      items.textContent = order.items.map((item) => `${item.name} ×${item.qty}`).join(' • ');
      const total = document.createElement('b');
      total.textContent = `₹${order.total.toLocaleString('en-IN')} · ${order.status}`;
      card.append(heading, date, items, total);
      ordersHistory.appendChild(card);
    });
  };

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (loginForm.classList.contains('create-mode') && passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.focus();
      showToast('Passwords do not match.');
      return;
    }
    localStorage.setItem('te_name', document.getElementById('loginName').value.trim());
    localStorage.setItem('te_phone', document.getElementById('loginPhone').value.trim());
    localStorage.setItem('te_location', document.getElementById('loginLocation').value.trim());
    setAuthenticated(document.getElementById('loginIdentity').value);
    loginScreen.classList.add('login-complete');
    setTimeout(() => {
      loginScreen.classList.add('is-hidden');
      document.body.classList.remove('login-active');
    }, 650);
    showToast('Welcome to Tuhin Enterprise! ✨');
  });

  createAccountLink.addEventListener('click', () => {
    const creatingAccount = loginForm.classList.toggle('create-mode');
    loginProfileFields.hidden = !creatingAccount;
    confirmPasswordField.hidden = !creatingAccount;
    confirmPasswordInput.required = creatingAccount;
    loginTitle.textContent = creatingAccount ? 'Create your account' : 'Welcome back';
    loginSubtitle.textContent = creatingAccount
      ? 'Create a secure account to manage your Tuhin shopping.'
      : 'Sign in to continue to Tuhin Enterprise.';
    loginSubmitLabel.textContent = creatingAccount ? 'Create account' : 'Enter Enterprise';
    createAccountLink.textContent = creatingAccount
      ? 'Already have an account? Sign in'
      : 'New here? Create an account';
  });

  passwordToggle.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    passwordToggle.textContent = isPassword ? 'Hide' : 'Show';
    passwordToggle.setAttribute('aria-label', `${isPassword ? 'Hide' : 'Show'} password`);
  });

  forgotPasswordLink.addEventListener('click', (event) => {
    event.preventDefault();
    showToast('Password recovery is available in the full enterprise portal.');
  });

  loginButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (localStorage.getItem('te_authenticated') === 'true') {
      accountPanel.hidden = !accountPanel.hidden;
      return;
    }
    loginScreen.classList.remove('is-hidden', 'login-complete');
    document.body.classList.add('login-active');
  });

  accountLogoutButton.addEventListener('click', () => {
    localStorage.removeItem('te_authenticated');
    localStorage.removeItem('te_identity');
    localStorage.removeItem('te_name');
    localStorage.removeItem('te_phone');
    localStorage.removeItem('te_location');
    accountPanel.hidden = true;
    profileDetails.hidden = true;
    loginButton.classList.remove('signed-in');
    loginButton.innerHTML = '<span>Login</span>';
    loginButton.setAttribute('aria-label', 'Login to Tuhin Enterprise');
    loginScreen.classList.remove('is-hidden', 'login-complete');
    document.body.classList.add('login-active');
    showToast('You have been signed out.');
  });

  accountOrdersButton.addEventListener('click', () => {
    ordersHistory.hidden = !ordersHistory.hidden;
    if (!ordersHistory.hidden) renderOrderHistory();
  });

  accountProfileButton.addEventListener('click', () => {
    profileDetails.hidden = !profileDetails.hidden;
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.account-menu-wrap')) accountPanel.hidden = true;
  });

  accountPanel.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  loginScreen.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    loginScreen.style.setProperty('--pointer-x', `${x * 14}px`);
    loginScreen.style.setProperty('--pointer-y', `${y * 14}px`);
  });
}

// ==========================================
// 4. HERO CAROUSEL CONTROLLER
// ==========================================
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const totalSlides = slides.length;
  let autoSlideTimer;

  function goToSlide(index) {
    state.currentSlide = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${state.currentSlide * 100}%)`;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === state.currentSlide);
    });
  }

  function startAutoPlay() {
    autoSlideTimer = setInterval(() => {
      goToSlide(state.currentSlide + 1);
    }, 4500);
  }

  function stopAutoPlay() {
    clearInterval(autoSlideTimer);
  }

  document.getElementById('nextSlideBtn').addEventListener('click', () => {
    stopAutoPlay();
    goToSlide(state.currentSlide + 1);
    startAutoPlay();
  });

  document.getElementById('prevSlideBtn').addEventListener('click', () => {
    stopAutoPlay();
    goToSlide(state.currentSlide - 1);
    startAutoPlay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      goToSlide(parseInt(dot.dataset.index));
      startAutoPlay();
    });
  });

  // Pause on hover
  const carouselEl = document.querySelector('.hero-carousel');
  carouselEl.addEventListener('mouseenter', stopAutoPlay);
  carouselEl.addEventListener('mouseleave', startAutoPlay);

  startAutoPlay();
}


// Open / Close Wishlist Drawer
function toggleWishlistDrawer(open) {
  const drawer = document.getElementById('wishlistDrawer');
  const overlay = document.getElementById('wishlistOverlay');
  if (!drawer || !overlay) return;

  if (open) {
    if (typeof toggleCartDrawer === 'function') toggleCartDrawer(false); // Close cart if open
    renderWishlistItems();
    drawer.classList.add('open');
    overlay.classList.add('active');
  } else {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
  }
}

// Render wishlisted products inside the drawer
function renderWishlistItems() {
  const list = document.getElementById('wishlistItemsList');
  const countLabel = document.getElementById('drawerWishlistCount');
  const footer = document.getElementById('wishlistFooter');
  if (!list) return;

  if (!state.wishlist || state.wishlist.length === 0) {
    if (countLabel) countLabel.innerText = '(0 items)';
    if (footer) footer.style.display = 'none';
    list.innerHTML = `
      <div class="empty-cart-view">
        <div style="font-size: 48px;">❤️</div>
        <h4>Your Wishlist is Empty!</h4>
        <p style="font-size: 13px; color: #777;">Click the heart icon on any product to save it here.</p>
      </div>
    `;
    return;
  }

  if (footer) footer.style.display = 'block';
  if (countLabel) countLabel.innerText = `(${state.wishlist.length} items)`;

  list.innerHTML = state.wishlist.map(id => {
    const prod = PRODUCTS.find(p => p.id === id);
    if (!prod) return '';

    return `
      <div class="cart-item-row">
        <button class="remove-cart-item" onclick="removeFromWishlist(${prod.id})">✕</button>
        <img src="${prod.image}" alt="${prod.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${prod.name}</div>
          <div class="cart-item-price-row">
            <span class="cart-item-price">₹${prod.price.toLocaleString('en-IN')}</span>
            <span class="cart-item-original">₹${prod.originalPrice.toLocaleString('en-IN')}</span>
            <span class="price-discount-percent">${prod.discount}% off</span>
          </div>
          <button class="add-cart-btn" style="margin-top: 8px; padding: 6px 12px;" onclick="moveWishlistToCart(${prod.id}, event)">
            Move to Cart 🛒
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Move from Wishlist to Cart
function moveWishlistToCart(productId, event) {
  if (typeof addToCart === 'function') addToCart(productId, event);
  removeFromWishlist(productId);
}

// Remove from Wishlist
function removeFromWishlist(productId) {
  state.wishlist = state.wishlist.filter(id => id !== productId);
  localStorage.setItem('fk_wishlist', JSON.stringify(state.wishlist));
  updateWishlistBadge();
  renderWishlistItems();

  const card = document.getElementById(`product-${productId}`);
  if (card) {
    const heart = card.querySelector('.wishlist-btn');
    if (heart) heart.classList.remove('active');
  }
}

// Move all Wishlist items to Cart
function addAllWishlistToCart() {
  if (!state.wishlist || state.wishlist.length === 0) return;
  state.wishlist.forEach(id => {
    const existing = state.cart.find(i => i.id === id);
    if (existing) existing.qty += 1;
    else state.cart.push({ id, qty: 1 });
  });
  state.wishlist = [];
  if (typeof saveCart === 'function') saveCart();
  localStorage.setItem('fk_wishlist', JSON.stringify(state.wishlist));
  if (typeof updateCartBadge === 'function') updateCartBadge();
  updateWishlistBadge();
  if (typeof renderProducts === 'function') renderProducts();
  toggleWishlistDrawer(false);
  if (typeof toggleCartDrawer === 'function') toggleCartDrawer(true);
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlistCount');
  if (badge) {
    badge.innerText = state.wishlist ? state.wishlist.length : 0;
  }
}


// ==========================================
// 5. DEALS OF THE DAY HORIZONTAL STRIP
// ==========================================
function renderDealsStrip() {
  const container = document.getElementById('dealsScrollContainer');
  const deals = PRODUCTS.filter(p => p.isDealOfDay);

  container.innerHTML = deals.map(item => `
    <div class="deal-card" data-product-id="${item.id}" onclick="openQuickView(${item.id})">
      <div class="deal-img-wrap">
        <img src="${item.image}" alt="${item.name}" class="deal-img" loading="lazy">
      </div>
      <div class="deal-title">${item.name}</div>
      <div class="deal-discount">Up to ${item.discount}% Off</div>
      <div class="deal-tag">${item.dealTag || 'Special Offer'}</div>
    </div>
  `).join('');
  hydrateProductImages(deals, '.deal-card', '.deal-img');
}

// ==========================================
// 6. PRODUCT GRID RENDERING & FILTERING
// ==========================================
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const emptyState = document.getElementById('emptyState');
  
  // Filter by category or search query
  let list = PRODUCTS;
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      (p.specs && p.specs.some(s => s.toLowerCase().includes(q)))
    );

    const titleEl = document.getElementById('catalogTitle');
    const subEl = document.getElementById('catalogSubtitle');
    if (titleEl) titleEl.innerText = `Search Results for "${state.searchQuery}"`;
    if (subEl) subEl.innerText = `${list.length} product${list.length === 1 ? '' : 's'} found`;
  } else if (state.activeCategory !== 'all') {
    list = list.filter(p => p.category === state.activeCategory);
  }

  // Sort
  if (state.sortBy === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'discount') {
    list.sort((a, b) => b.discount - a.discount);
  } else if (state.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  if (list.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'flex';
    return;
  }

  emptyState.style.display = 'none';

  grid.innerHTML = list.map(item => {
    const isWishlisted = state.wishlist.includes(item.id);
    const formattedPrice = item.price.toLocaleString('en-IN');
    const formattedOriginal = item.originalPrice.toLocaleString('en-IN');

    return `
      <article class="product-card" id="product-${item.id}">
        <!-- Discount tag -->
        <span class="discount-ribbon">${item.discount}% OFF</span>

        <!-- Wishlist Heart -->
        <button 
          class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
          onclick="toggleWishlist(${item.id}, this, event)" 
          title="Wishlist"
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

        <!-- Product Image -->
        <div class="card-img-container" onclick="openQuickView(${item.id})">
          <img src="${item.image}" alt="${item.name}" class="product-thumb" id="img-${item.id}" loading="lazy">
        </div>

        <!-- Details -->
        <div class="card-details">
          <h3 class="product-name" title="${item.name}">${item.name}</h3>

          <div class="rating-assured-row">
            <span class="rating-badge">
              ${item.rating} ★
            </span>
            <span class="rating-count">(${item.reviewsCount})</span>
            ${item.assured ? `
              <span class="assured-badge" title="Tuhin Assured Quality">
                ✔ Assured
              </span>
            ` : ''}
          </div>

          <div class="price-container">
            <span class="price-current">₹${formattedPrice}</span>
            <span class="price-original">₹${formattedOriginal}</span>
            <span class="price-discount-percent">${item.discount}% off</span>
          </div>

          <p class="delivery-note">
            <span class="free-tag">Free Delivery</span> by Tomorrow, 11 PM
          </p>

          <div class="card-actions">
            <button class="quick-view-btn" onclick="openQuickView(${item.id})">
              Quick View
            </button>
            <button class="add-cart-btn ripple-effect" onclick="addToCart(${item.id}, event)">
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================
// 7. CATEGORY & SORT HANDLERS
// ==========================================
function filterCategory(category, el) {
  if (['mobiles', 'laptops', 'audio', 'fashion', 'beauty'].includes(category)) {
    openCategoryInterface(category);
    return;
  }

  state.activeCategory = category;
  
  document.querySelectorAll('.category-item').forEach(item => {
    item.classList.remove('active');
  });

  if (el) {
    el.classList.add('active');
  } else {
    const target = document.querySelector(`.category-item[data-cat="${category}"]`);
    if (target) target.classList.add('active');
  }

  // Update header title
  const titleEl = document.getElementById('catalogTitle');
  const subEl = document.getElementById('catalogSubtitle');
  if (category === 'all') {
    titleEl.innerText = "Trending Products";
    subEl.innerText = "Handpicked deals with Tuhin Assured quality";
  } else {
    titleEl.innerText = `${category.charAt(0).toUpperCase() + category.slice(1)} Deals`;
    subEl.innerText = `Showing top rated items in ${category}`;
  }

  renderProducts();

  if (category === 'mobiles') {
    document.getElementById('catalogTitle').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function initMobileInterface() {
  const brandList = document.getElementById('mobileBrandList');
  if (!brandList) return;
  refreshCategoryBrandList('mobiles');

  brandList.addEventListener('click', (event) => {
    const chip = event.target.closest('.mobile-brand-chip');
    if (!chip) return;
    brandList.querySelectorAll('.mobile-brand-chip').forEach(item => item.classList.remove('active'));
    chip.classList.add('active');
    renderMobileInterface(chip.dataset.brand);
  });

  renderMobileInterface('all');
}

function refreshCategoryBrandList(category) {
  const brandList = document.getElementById('mobileBrandList');
  const brands = [...new Set(PRODUCTS
    .filter(product => product.category === category)
    .map(product => getCategoryBrand(product, category)))];
  brandList.innerHTML = `
    <button class="mobile-brand-chip active" type="button" data-brand="all">All brands</button>
    ${brands.map(brand => `<button class="mobile-brand-chip" type="button" data-brand="${brand}">${brand}</button>`).join('')}
  `;
}

function openCategoryInterface(category) {
  const mobileInterface = document.getElementById('mobileInterface');
  if (!mobileInterface) return;
  mobileInterface.dataset.category = category;
  mobileInterface.classList.add('open');
  document.body.classList.add('mobile-interface-active');
  updateCategoryInterfaceCopy(category);
  refreshCategoryBrandList(category);
  renderMobileInterface('all');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateCategoryInterfaceCopy(category) {
  const copy = {
    mobiles: ['Tuhin Mobile Hub', 'Find your next mobile.', 'Explore flagship cameras, gaming powerhouses, and everyday phones.', 'Shop by mobile brand', 'All popular mobile companies, handpicked for you'],
    laptops: ['Tuhin Laptop Studio', 'Power your next move.', 'Compare creator machines, gaming laptops, and work-ready notebooks.', 'Shop by laptop brand', 'Performance laptops from trusted technology brands'],
    audio: ['Tuhin Audio Lab', 'Hear every detail.', 'Discover headphones, earbuds, speakers, and smart wearables.', 'Shop audio & wearable brands', 'Premium sound and smart lifestyle devices'],
    fashion: ['Tuhin Style Edit', 'Wear your story.', 'Explore sneakers, denim, sunglasses, and signature everyday style.', 'Shop fashion brands', 'Curated fashion from iconic style brands'],
    beauty: ['Tuhin Beauty Studio', 'Glow your way.', 'Discover makeup, skincare, body care, and everyday beauty essentials.', 'Shop beauty brands', 'Curated beauty picks for every routine and style']
  }[category];
  document.getElementById('categoryHubLabel').textContent = copy[0];
  const titleWords = copy[1].split(' ');
  document.getElementById('mobileInterfaceTitle').innerHTML = `${titleWords.slice(0, -1).join(' ')} <span>${titleWords[titleWords.length - 1]}</span>`;
  document.getElementById('categoryInterfaceDescription').textContent = copy[2];
  document.getElementById('categoryBrandHeading').textContent = copy[3];
  document.getElementById('categoryBrandDescription').textContent = copy[4];
}

let activeMarketBrand = 'all';
let activeMarketSearch = '';

function handleCategoryMarketSearch(query) {
  activeMarketSearch = query.trim().toLowerCase();
  renderMobileInterface(activeMarketBrand, activeMarketSearch);
}

function renderMobileInterface(brand = 'all', searchQuery = '') {
  activeMarketBrand = brand;
  const grid = document.getElementById('mobilePhoneGrid');
  const count = document.getElementById('mobileResultCount');
  if (!grid || !count) return;
  const category = document.getElementById('mobileInterface').dataset.category || 'mobiles';

  const phones = PRODUCTS.filter(product => {
    if (product.category !== category) return false;
    const matchBrand = brand === 'all' || getCategoryBrand(product, category) === brand;
    if (!matchBrand) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return product.name.toLowerCase().includes(q) ||
             (product.specs && product.specs.some(s => s.toLowerCase().includes(q)));
    }
    return true;
  });

  count.textContent = `${phones.length} product${phones.length === 1 ? '' : 's'} available`;
  grid.innerHTML = phones.map(phone => `
    <article class="mobile-phone-card" data-phone-id="${phone.id}">
      <div class="mobile-phone-image" onclick="openQuickView(${phone.id})">
        <span class="mobile-phone-discount">${phone.discount}% OFF</span>
        <span class="mobile-phone-brand-badge">${getCategoryBrand(phone, category)}</span>
        <img src="${phone.image}" alt="${phone.name}" loading="lazy">
      </div>
      <div class="mobile-phone-info">
        <span class="mobile-phone-brand">${getCategoryBrand(phone, category)}</span>
        <h3><span class="mobile-name-highlight">${phone.name}</span></h3>
        <div class="mobile-phone-rating">${phone.rating} ★ <span>(${phone.reviewsCount})</span></div>
        <div class="mobile-phone-price">
          <strong>₹${phone.price.toLocaleString('en-IN')}</strong>
          <del>₹${phone.originalPrice.toLocaleString('en-IN')}</del>
        </div>
        <p class="mobile-phone-offer">Free delivery · Tuhin Assured</p>
        <span class="mobile-price-note">Market reference price · offers may vary</span>
        <div class="mobile-phone-actions">
          <button type="button" class="quick-view-btn" onclick="openQuickView(${phone.id})">Quick View</button>
          <button type="button" class="add-cart-btn" onclick="addToCart(${phone.id}, event)">Add to Cart</button>
        </div>
      </div>
    </article>
  `).join('');

  hydrateProductImages(phones, '.mobile-phone-card', 'img');
}

async function hydrateProductImages(products, cardSelector, imageSelector) {
  await Promise.all(products.map(async (product) => {
    const card = document.querySelector(`${cardSelector}[data-phone-id="${product.id}"]`)
      || document.querySelector(`${cardSelector}[data-product-id="${product.id}"]`);
    const image = card ? card.querySelector('img') : null;
    if (!image) return;

    const category = product.category === 'mobiles' ? 'mobile phone' : product.category;
    const query = `${product.name.replace(/\([^)]*\)/, '').trim()} ${category}`;
    const endpoint = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json&origin=*`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) return;
      const result = await response.json();
      const pages = result.query && result.query.pages ? Object.values(result.query.pages) : [];
      const imageUrl = pages[0] && pages[0].imageinfo && pages[0].imageinfo[0]
        ? pages[0].imageinfo[0].thumburl || pages[0].imageinfo[0].url
        : '';
      if (imageUrl) {
        image.src = imageUrl;
        image.dataset.source = 'Wikimedia Commons';
      }
    } catch (error) {
      console.warn(`Product image lookup failed for ${product.name}. Using fallback image.`, error);
    }
  }));
}

function getPhoneBrand(product) {
  if (product.name.startsWith('Apple iPhone')) return 'iPhone';
  if (product.name.startsWith('Samsung')) return 'Samsung';
  if (product.name.startsWith('Google Pixel')) return 'Google Pixel';
  if (product.name.startsWith('OnePlus')) return 'OnePlus';
  if (product.name.startsWith('Xiaomi')) return 'Xiaomi';
  if (product.name.startsWith('Redmi')) return 'Redmi';
  if (product.name.startsWith('Motorola')) return 'Motorola';
  if (product.name.startsWith('Vivo')) return 'Vivo';
  if (product.name.startsWith('OPPO')) return 'OPPO';
  if (product.name.startsWith('realme')) return 'realme';
  if (product.name.startsWith('ASUS ROG Phone') || product.name.startsWith('ASUS Zenfone')) return 'ASUS';
  if (product.name.startsWith('Sony Xperia')) return 'Sony Xperia';
  if (product.name.startsWith('Nokia')) return 'Nokia';
  if (product.name.startsWith('Honor')) return 'Honor';
  if (product.name.startsWith('Huawei')) return 'Huawei';
  if (product.name.startsWith('CMF')) return 'CMF';
  if (product.name.startsWith('Nothing Phone')) return 'Nothing';
  return product.name.split(' ')[0];
}

function getCategoryBrand(product, category) {
  if (category === 'mobiles') return getPhoneBrand(product);
  const words = product.name.split(' ');
  if (category === 'laptops') {
    if (product.name.startsWith('Apple')) return 'Apple';
    if (product.name.startsWith('ASUS')) return 'ASUS';
    if (product.name.startsWith('Lenovo')) return 'Lenovo';
    if (product.name.startsWith('Dell')) return 'Dell';
    if (product.name.startsWith('HP')) return 'HP';
  }
  if (category === 'audio') {
    if (product.name.startsWith('Apple')) return 'Apple';
    if (product.name.startsWith('Samsung')) return 'Samsung';
    if (product.name.startsWith('Bose')) return 'Bose';
    if (product.name.startsWith('JBL')) return 'JBL';
    if (product.name.startsWith('Sony')) return 'Sony';
    if (product.name.startsWith('boAt')) return 'boAt';
    if (product.name.startsWith('Noise')) return 'Noise';
    if (product.name.startsWith('OnePlus')) return 'OnePlus';
    if (product.name.startsWith('Garmin')) return 'Garmin';
    if (product.name.startsWith('Amazfit')) return 'Amazfit';
  }
  if (category === 'fashion') {
    if (product.name.startsWith('Nike')) return 'Nike';
    if (product.name.startsWith('Adidas')) return 'Adidas';
    if (product.name.startsWith('Levi')) return "Levi's";
    if (product.name.startsWith('Ray-Ban')) return 'Ray-Ban';
  }
  if (category === 'beauty') {
    if (product.name.startsWith('Maybelline')) return 'Maybelline';
    if (product.name.startsWith("L'Oréal")) return "L'Oréal";
    if (product.name.startsWith('MAC')) return 'MAC';
    if (product.name.startsWith('The Body Shop')) return 'The Body Shop';
  }
  return words[0];
}

function openMobileInterface() {
  const mobileInterface = document.getElementById('mobileInterface');
  if (!mobileInterface) return;
  mobileInterface.classList.add('open');
  document.body.classList.add('mobile-interface-active');
  renderMobileInterface('all');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeMobileInterface() {
  const mobileInterface = document.getElementById('mobileInterface');
  if (!mobileInterface) return;
  mobileInterface.classList.remove('open');
  document.body.classList.remove('mobile-interface-active');
}

function handleSortChange() {
  state.sortBy = document.getElementById('sortSelect').value;
  renderProducts();
}

function resetFilters() {
  state.activeCategory = 'all';
  state.searchQuery = '';
  document.getElementById('searchInput').value = '';
  document.getElementById('clearSearchBtn').style.display = 'none';
  filterCategory('all');
}

// ==========================================
// 8. FUNCTIONAL SEARCH WITH SUGGESTIONS & AUTO-SCROLL
// ==========================================
function initSearchInput() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  let debounceTimeout;

  if (!input) return;

  input.addEventListener('input', (e) => {
    const val = e.target.value;
    if (clearBtn) clearBtn.style.display = val.length > 0 ? 'block' : 'none';

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const q = val.trim().toLowerCase();
      if (q.length > 0) {
        showSearchSuggestions(q);
      } else {
        hideSearchSuggestions();
      }
      state.searchQuery = val.trim();
      renderProducts();
    }, 180);
  });

  // Enter key press triggers immediate search and scrolls to results
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeSearch();
    } else if (e.key === 'Escape') {
      hideSearchSuggestions();
    }
  });

  // Click outside search-box closes dropdown
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
      hideSearchSuggestions();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearSearch();
    });
  }
}

function showSearchSuggestions(q) {
  const dropdown = document.getElementById('searchDropdown');
  if (!dropdown) return;

  const matches = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) ||
    (p.specs && p.specs.some(s => s.toLowerCase().includes(q)))
  ).slice(0, 6);

  if (matches.length === 0) {
    dropdown.innerHTML = `
      <div style="padding: 16px; text-align: center; color: #64748b; font-size: 13px;">
        No items found for "<strong>${escapeHtml(q)}</strong>"
      </div>
    `;
  } else {
    dropdown.innerHTML = `
      ${matches.map(item => `
        <div class="search-suggest-item" onclick="selectSearchItem(${item.id})">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" class="search-suggest-img" loading="lazy" />
          <div class="search-suggest-info">
            <div class="search-suggest-title">${item.name}</div>
            <div class="search-suggest-meta">
              <span>₹${item.price.toLocaleString('en-IN')}</span>
              <span class="search-suggest-cat">in ${item.category}</span>
              ${item.discount ? `<span style="color:#e0540f;">${item.discount}% off</span>` : ''}
            </div>
          </div>
        </div>
      `).join('')}
      <div class="search-dropdown-footer" onclick="executeSearch()">
        View all results for "${escapeHtml(q)}" →
      </div>
    `;
  }

  dropdown.classList.add('show');
}

function hideSearchSuggestions() {
  const dropdown = document.getElementById('searchDropdown');
  if (dropdown) dropdown.classList.remove('show');
}

function selectSearchItem(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  const input = document.getElementById('searchInput');
  if (!product) return;

  if (input) input.value = product.name;
  hideSearchSuggestions();

  // Close category marketplace modal if currently open
  closeMobileInterface();

  state.searchQuery = product.name;
  state.activeCategory = 'all';
  renderProducts();

  // Scroll to catalog section and highlight matching card
  scrollToCatalog();
  setTimeout(() => {
    const card = document.getElementById(`product-${productId}`);
    if (card) {
      card.classList.add('search-highlight');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => card.classList.remove('search-highlight'), 3000);
    }
  }, 250);
}

function executeSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  const q = input.value.trim();

  hideSearchSuggestions();
  closeMobileInterface();

  state.searchQuery = q;
  state.activeCategory = 'all';
  renderProducts();

  scrollToCatalog();

  // Highlight first match
  if (q.length > 0) {
    setTimeout(() => {
      const firstCard = document.querySelector('.product-card');
      if (firstCard) {
        firstCard.classList.add('search-highlight');
        setTimeout(() => firstCard.classList.remove('search-highlight'), 2500);
      }
    }, 300);
  }
}

function scrollToCatalog() {
  const catalog = document.querySelector('.catalog-section');
  if (catalog) {
    catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  if (input) {
    input.value = '';
    input.focus();
  }
  if (clearBtn) clearBtn.style.display = 'none';
  hideSearchSuggestions();
  state.searchQuery = '';
  renderProducts();
  const titleEl = document.getElementById('catalogTitle');
  const subEl = document.getElementById('catalogSubtitle');
  if (titleEl) titleEl.innerText = "Trending Products";
  if (subEl) subEl.innerText = "Handpicked deals with Tuhin Assured quality";
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ==========================================
// 9. ANIMATED FLY TO CART LOGIC
// ==========================================
function addToCart(productId, event) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // 1. Locate source image and target cart icon
  const sourceImg = document.getElementById(`img-${productId}`) || event.target.closest('.product-card').querySelector('img');
  const cartIcon = document.getElementById('cartBadgeWrapper');

  if (sourceImg && cartIcon) {
    const startRect = sourceImg.getBoundingClientRect();
    const endRect = cartIcon.getBoundingClientRect();

    // Create a floating clone
    const clone = document.createElement('img');
    clone.src = sourceImg.src;
    clone.classList.add('flying-clone');
    clone.style.top = `${startRect.top}px`;
    clone.style.left = `${startRect.left}px`;
    clone.style.width = `${startRect.width}px`;
    clone.style.height = `${startRect.height}px`;

    document.body.appendChild(clone);

    // Force layout reflow
    void clone.offsetWidth;

    // Animate to cart icon
    requestAnimationFrame(() => {
      clone.style.top = `${endRect.top + 4}px`;
      clone.style.left = `${endRect.left + 4}px`;
      clone.style.width = '24px';
      clone.style.height = '24px';
      clone.style.opacity = '0.3';
      clone.style.transform = 'rotate(720deg) scale(0.6)';
    });

    // Cleanup clone & bounce cart badge
    setTimeout(() => {
      clone.remove();
      const badge = document.getElementById('cartCount');
      badge.classList.remove('bounce-pop');
      void badge.offsetWidth; // trigger reflow
      badge.classList.add('bounce-pop');
    }, 750);
  }

  // 2. Update cart state
  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id: productId, qty: 1 });
  }

  saveCart();
  updateCartBadge();
  showToast(`Added "${product.name.substring(0, 26)}..." to cart! 🛒`);
}

// ==========================================
// 10. CART DRAWER & CALCULATIONS
// ==========================================
function toggleCartDrawer(open) {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');

  if (open) {
    renderCartItems();
    drawer.classList.add('open');
    overlay.classList.add('active');
  } else {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
  }
}

document.getElementById('cartBtn').addEventListener('click', () => {
  toggleCartDrawer(true);
});

function renderCartItems() {
  const list = document.getElementById('cartItemsList');
  const countLabel = document.getElementById('drawerCartCount');

  if (state.cart.length === 0) {
    countLabel.innerText = '(0 items)';
    list.innerHTML = `
      <div class="empty-cart-view">
        <div class="empty-cart-img">🛒</div>
        <h4>Your cart is empty!</h4>
        <p>Explore our hot deals and add items to your cart.</p>
        <button class="slide-cta-btn" onclick="toggleCartDrawer(false)">Shop Deals</button>
      </div>
    `;
    updatePriceSummary(0, 0);
    return;
  }

  let totalItems = 0;
  let subtotal = 0;
  let originalTotal = 0;

  list.innerHTML = state.cart.map(item => {
    const prod = PRODUCTS.find(p => p.id === item.id);
    if (!prod) return '';

    totalItems += item.qty;
    subtotal += prod.price * item.qty;
    originalTotal += prod.originalPrice * item.qty;

    return `
      <div class="cart-item-row">
        <button class="remove-cart-item" onclick="removeCartItem(${prod.id})" title="Remove">✕</button>
        <img src="${prod.image}" alt="${prod.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${prod.name}</div>
          <div class="cart-item-price-row">
            <span class="cart-item-price">₹${(prod.price * item.qty).toLocaleString('en-IN')}</span>
            <span class="cart-item-original">₹${(prod.originalPrice * item.qty).toLocaleString('en-IN')}</span>
          </div>
          <div class="cart-qty-controls">
            <button class="qty-btn" onclick="changeQty(${prod.id}, -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${prod.id}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  countLabel.innerText = `(${totalItems} item${totalItems > 1 ? 's' : ''})`;
  updatePriceSummary(subtotal, originalTotal);
}

function changeQty(productId, delta) {
  const item = state.cart.find(p => p.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(p => p.id !== productId);
  }

  saveCart();
  renderCartItems();
  updateCartBadge();
}

function removeCartItem(productId) {
  state.cart = state.cart.filter(p => p.id !== productId);
  saveCart();
  renderCartItems();
  updateCartBadge();
  showToast('Item removed from cart.');
}

function updatePriceSummary(subtotal, originalTotal) {
  const discount = originalTotal - subtotal;
  document.getElementById('cartSubtotal').innerText = `₹${originalTotal.toLocaleString('en-IN')}`;
  document.getElementById('cartDiscount').innerText = `- ₹${discount.toLocaleString('en-IN')}`;
  document.getElementById('cartGrandTotal').innerText = `₹${subtotal.toLocaleString('en-IN')}`;

  // Free delivery progress bar (Free above ₹1,000)
  const target = 1000;
  const fill = document.getElementById('shippingProgressFill');
  const text = document.getElementById('shippingText');

  if (subtotal >= target || subtotal === 0) {
    fill.style.width = subtotal === 0 ? '0%' : '100%';
    text.innerHTML = subtotal === 0 ? 'Add items to earn free shipping' : '<span style="color:#388e3c">🎉 You unlocked FREE Express Delivery!</span>';
  } else {
    const diff = target - subtotal;
    const pct = Math.min((subtotal / target) * 100, 100);
    fill.style.width = `${pct}%`;
    text.innerText = `Add ₹${diff.toLocaleString('en-IN')} more for FREE Delivery!`;
  }
}

function saveCart() {
  localStorage.setItem('fk_cart', JSON.stringify(state.cart));
}

function updateCartBadge() {
  const total = state.cart.reduce((acc, item) => acc + item.qty, 0);
  document.getElementById('cartCount').innerText = total;
}

function handleCheckout() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty! Add products first.');
    return;
  }
  openPaymentInterface();
}

function openPaymentInterface() {
  const payment = document.getElementById('paymentInterface');
  const items = document.getElementById('paymentItems');
  const total = document.getElementById('cartGrandTotal').innerText;
  items.innerHTML = state.cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return product ? `<div class="payment-item"><span>${product.name} <b>×${item.qty}</b></span><strong>₹${(product.price * item.qty).toLocaleString('en-IN')}</strong></div>` : '';
  }).join('');
  document.getElementById('paymentTotal').innerText = total;
  document.getElementById('paymentButtonTotal').innerText = total;
  payment.classList.add('open');
  toggleCartDrawer(false);
  document.body.classList.add('payment-active');
}

function closePaymentInterface() {
  document.getElementById('paymentInterface').classList.remove('open');
  document.body.classList.remove('payment-active');
}

function completePayment() {
  const requiredFields = ['checkoutName', 'checkoutPhone', 'checkoutAddress', 'checkoutCity', 'checkoutPin'];
  const missingField = requiredFields.find(id => !document.getElementById(id).value.trim());
  if (missingField) {
    document.getElementById(missingField).focus();
    showToast('Please complete your delivery details.');
    return;
  }

  const method = document.querySelector('input[name="paymentMethod"]:checked').value;
  if (method !== 'cod' && !document.getElementById('paymentReference').value.trim()) {
    document.getElementById('paymentReference').focus();
    showToast(method === 'upi' ? 'Please enter your UPI ID.' : 'Please enter your card details.');
    return;
  }

  const identity = localStorage.getItem('te_identity') || 'Customer';
  const ordersKey = `te_orders_${identity}`;
  const savedOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
  const orderItems = state.cart.map((item) => {
    const product = PRODUCTS.find((product) => product.id === item.id);
    return product ? { name: product.name, qty: item.qty } : null;
  }).filter(Boolean);
  const total = state.cart.reduce((sum, item) => {
    const product = PRODUCTS.find((candidate) => candidate.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  savedOrders.unshift({
    id: `TE${Date.now().toString().slice(-6)}`,
    date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    items: orderItems,
    total,
    status: 'Confirmed'
  });
  localStorage.setItem(ordersKey, JSON.stringify(savedOrders));
  closePaymentInterface();
  state.cart = [];
  saveCart();
  updateCartBadge();
  showFarewellInterface();
}

function showFarewellInterface() {
  document.getElementById('farewellInterface').classList.add('open');
  document.body.classList.add('payment-active');
}

function closeFarewellInterface() {
  document.getElementById('farewellInterface').classList.remove('open');
  document.body.classList.remove('payment-active');
}

function initPaymentMethods() {
  const methods = document.querySelectorAll('.payment-method');
  const extra = document.getElementById('paymentExtra');
  const upiApps = document.getElementById('upiApps');
  const reference = document.getElementById('paymentReference');
  const apps = document.querySelectorAll('.upi-app');
  methods.forEach(method => {
    method.addEventListener('click', () => {
      methods.forEach(item => item.classList.remove('active'));
      method.classList.add('active');
      const selected = method.querySelector('input').value;
      extra.style.display = selected === 'cod' ? 'none' : 'block';
      upiApps.style.display = selected === 'upi' ? 'grid' : 'none';
      reference.placeholder = selected === 'upi' ? 'Enter UPI ID (example: name@upi)' : 'Card number / demo reference';
    });
  });
  apps.forEach(app => {
    app.addEventListener('click', () => {
      apps.forEach(item => item.classList.remove('active'));
      app.classList.add('active');
    });
  });
}

// ==========================================
// 11. WISHLIST TOGGLE WITH PARTICLES
// ==========================================
function toggleWishlist(productId, btnEl, event) {
  event.stopPropagation();
  const index = state.wishlist.indexOf(productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    btnEl.classList.remove('active');
    showToast('Removed from your Wishlist.');
  } else {
    state.wishlist.push(productId);
    btnEl.classList.add('active');
    showToast('Added to your Wishlist! ❤️');
  }

  localStorage.setItem('fk_wishlist', JSON.stringify(state.wishlist));
  updateWishlistBadge();
}

function updateWishlistBadge() {
  document.getElementById('wishlistCount').innerText = state.wishlist.length;
}

// ==========================================
// 12. QUICK VIEW MODAL
// ==========================================
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quickViewModal');
  const details = document.getElementById('modalProductDetails');

  details.innerHTML = `
    <div class="modal-body-grid">
      <div class="modal-gallery">
        <img src="${product.image}" alt="${product.name}" class="modal-main-img">
      </div>
      <div class="modal-details">
        <h2 class="modal-title">${product.name}</h2>
        <div class="rating-assured-row">
          <span class="rating-badge">${product.rating} ★</span>
          <span class="rating-count">(${product.reviewsCount} Ratings)</span>
          ${product.assured ? '<span class="assured-badge">✔ Assured</span>' : ''}
        </div>

        <div class="price-container" style="margin: 12px 0;">
          <span class="price-current" style="font-size: 24px;">₹${product.price.toLocaleString('en-IN')}</span>
          <span class="price-original" style="font-size: 16px;">₹${product.originalPrice.toLocaleString('en-IN')}</span>
          <span class="price-discount-percent" style="font-size: 16px;">${product.discount}% off</span>
        </div>

        <h4 class="modal-highlights-title">Highlights & Specifications:</h4>
        <ul class="modal-specs-list">
          ${product.specs.map(s => `<li>${s}</li>`).join('')}
        </ul>

        <div style="margin-top: auto; display: flex; gap: 12px;">
          <button class="add-cart-btn" style="padding: 12px; font-size: 14px;" onclick="addToCart(${product.id}, event); closeQuickView();">
            <span>🛒 Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeQuickView(event) {
  if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close-btn')) {
    return;
  }
  document.getElementById('quickViewModal').classList.remove('open');
}

// Escape key to close modal or drawer
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeQuickView();
    toggleCartDrawer(false);
  }
});

// ==========================================
// 13. REAL-TIME COUNTDOWN TIMER
// ==========================================
function startCountdownTimer() {
  const timerEl = document.getElementById('countdownTimer');
  let secondsRemaining = 14 * 3600 + 45 * 60 + 30; // 14h 45m 30s

  setInterval(() => {
    if (secondsRemaining <= 0) {
      secondsRemaining = 24 * 3600; // Reset next cycle
    }
    secondsRemaining--;

    const hours = Math.floor(secondsRemaining / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = secondsRemaining % 60;

    const pad = (n) => String(n).padStart(2, '0');
    timerEl.innerText = `${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s Left`;
  }, 1000);
}

// ==========================================
// 14. TOAST NOTIFICATION SYSTEM
// ==========================================
function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s, transform 0.4s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.9)';
    setTimeout(() => toast.remove(), 400);
  }, 2600);
}