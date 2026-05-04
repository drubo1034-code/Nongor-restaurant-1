export type MenuItem = {
  id: string;
  nameBn: string;
  nameEn: string;
  price: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export const menuData: MenuCategory[] = [
  {
    id: "snacks",
    name: "স্ন্যাকস আইটেম",
    items: [
      { id: "01", nameBn: "চিকেন স্যান্ডউইচ", nameEn: "Chicken Sandwich", price: "120" },
      { id: "02", nameBn: "চিকেন ক্লাব স্যান্ডউইচ", nameEn: "Chicken Club Sandwich", price: "160" },
      { id: "03", nameBn: "চিকেন বার্গার", nameEn: "Chicken Burger", price: "120" },
      { id: "04", nameBn: "চিকেন ফ্রাই + ফ্রেঞ্চ ফ্রাই", nameEn: "Chicken Fry with French Fry", price: "170" },
      { id: "05", nameBn: "স্পেশাল চাউমিন", nameEn: "Special Chowmein", price: "120" },
      { id: "06", nameBn: "স্পেশাল চিকেন পাস্তা", nameEn: "Special Chicken Pasta", price: "130" },
      { id: "07", nameBn: "ফ্রেঞ্চ ফ্রাই", nameEn: "French Fry", price: "150" },
      { id: "08", nameBn: "অনথন ০৪ পিস", nameEn: "Wonton 4 pcs", price: "150" },
    ]
  },
  {
    id: "tandoori",
    name: "তন্দুরি ও কাবাব",
    items: [
      { id: "09", nameBn: "পরোটা", nameEn: "Parata", price: "25" },
      { id: "10", nameBn: "চিকেন ঝাল ফ্রাই + পরোটা", nameEn: "Chicken Jhal Fry + Parata", price: "170" },
      { id: "11", nameBn: "চিকেন ফ্রাই টিক্কা + পরোটা", nameEn: "Chicken Tikka + Parata", price: "150" },
      { id: "12", nameBn: "চিকেন মাসালা + পরোটা", nameEn: "Chicken Masala + Parata", price: "150" },
      { id: "13", nameBn: "চিকেন চাপ + পরোটা", nameEn: "Chicken Chaap + Parata", price: "170" },
      { id: "14", nameBn: "বিফ মাসালা + পরোটা", nameEn: "Beef Masala + Parata", price: "170" },
      { id: "15", nameBn: "চিকেন সিজলিং", nameEn: "Chicken Sizzling", price: "400" },
      { id: "16", nameBn: "হট এন্ড সাওয়ার গ্রেভি চিকেন", nameEn: "Hot & Sour Gravy Chicken", price: "350" },
    ]
  },
  {
    id: "biriyani",
    name: "বিরিয়ানি ও খিচুড়ি",
    items: [
      { id: "17", nameBn: "চিকেন বিরিয়ানী", nameEn: "Chicken Biriani", price: "170" },
      { id: "18", nameBn: "চিকেন ঝাল ফ্রাই বিরিয়ানী", nameEn: "Chicken jhal Fry Biriani", price: "220" },
      { id: "19", nameBn: "চিকেন ফ্রাই বিরিয়ানী", nameEn: "Chicken Fry Biriani", price: "210" },
      { id: "20", nameBn: "হায়দ্রাবাদী বিরিয়ানী চিকেন(সোনালী)", nameEn: "Hyderabadi Biriani", price: "260" },
      { id: "21", nameBn: "হায়দ্রাবাদী বিরিয়ানী(মাটন)", nameEn: "Hyderabadi Biriani Mutton", price: "320" },
      { id: "22", nameBn: "চিকেন টিক্কা বিরিয়ানী", nameEn: "Chicken Tikka Biriani", price: "230" },
      { id: "23", nameBn: "বীফ বিরিয়ানী", nameEn: "Beef Biriani", price: "260" },
      { id: "24", nameBn: "চিকেন খিচুড়ী", nameEn: "Chicken khichuri", price: "200" },
      { id: "25", nameBn: "বীফ খিচুড়ী", nameEn: "Beef khichuri", price: "260" },
      { id: "26", nameBn: "মাটন খিচুড়ী", nameEn: "Mutton Khichuri", price: "300" },
      { id: "27", nameBn: "মাটন বিরিয়ানী", nameEn: "Mutton Biriani", price: "300" },
      { id: "28", nameBn: "চিকেন সোনালী বিরিয়ানী", nameEn: "Chicken Sonali Biriani", price: "250" },
    ]
  },
  {
    id: "chicken",
    name: "চিকেন আইটেম",
    items: [
      { id: "34", nameBn: "ফ্রাইড চিকেন ০৪ পিস", nameEn: "Fried Chicken 4 Pcs", price: "270" },
      { id: "35", nameBn: "চিকেন চিলি অনিয়ন", nameEn: "Chicken Chili Onion", price: "380" },
      { id: "36", nameBn: "চিকেন মাসালা ০৪ পিস", nameEn: "Chicken Masala 4 Pcs", price: "270" },
      { id: "37", nameBn: "চিকেন ঝাল ফ্রাই ০৪ পিস", nameEn: "Chicken Jhal Fry 4 Pcs", price: "300" },
      { id: "38", nameBn: "চিকেন রোস্ট সোনালী", nameEn: "Chicken Roast", price: "170" },
    ]
  },
  {
    id: "beef-mutton",
    name: "গরু ও খাসির মাংস",
    items: [
      { id: "39", nameBn: "বীফ মাসালা", nameEn: "Beef Masala", price: "320" },
      { id: "40", nameBn: "বীফ আচারী", nameEn: "Beef Achary", price: "360" },
      { id: "41", nameBn: "মাটন রেজালা", nameEn: "Mutton Rejala", price: "240" },
    ]
  },
  {
    id: "fish",
    name: "মাছের আইটেম",
    items: [
      { id: "42", nameBn: "রূপচাঁদা ভাজা", nameEn: "Pomfret Fried", price: "270" },
      { id: "43", nameBn: "রূপচাঁদা দো পেঁয়াজো", nameEn: "Pomfret Dopeyaja", price: "270" },
      { id: "44", nameBn: "রুই মাছ", nameEn: "Roi Fish", price: "150" },
      { id: "45", nameBn: "চিংড়ি মাছ ভুনা অগ্রীম অর্ডার", nameEn: "Prawn Fried - Pre-order", price: "200" },
    ]
  },
  {
    id: "set-menu",
    name: "সেট মেনু",
    items: [
      { id: "76", nameBn: "এগ ফ্রাইড রাইস + চিকেন মাসালা + ভেজিটেবল + ড্রিংকস", nameEn: "Set 76 (Egg Fried Rice + Chicken Masala + Veg + Drinks)", price: "290" },
      { id: "77", nameBn: "এগ ফ্রাইড রাইস + চিকেন ফ্রাই + ভেজিটেবল + ড্রিংকস", nameEn: "Set 77 (Egg Fried Rice + Chicken Fry + Veg + Drinks)", price: "290" },
      { id: "78", nameBn: "এগ ফ্রাইড রাইস + চিকেন টিক্কা + ভেজিটেবল + ড্রিংকস", nameEn: "Set 78 (Egg Fried Rice + Chicken Tikka + Veg + Drinks)", price: "290" },
      { id: "79", nameBn: "এগ ফ্রাইড রাইস + চিকেন চিলি অনিয়ন + ভেজিটেবল + ড্রিংকস", nameEn: "Set 79 (Egg Fried Rice + Chicken Chilli Onion + Veg + Drinks)", price: "320" },
      { id: "80", nameBn: "সাদা ভাত + চিকেন + ভেজিটেবল + আলু ভর্তা + সালাদ", nameEn: "Set 80 (Plain Rice + Chicken + Veg + Bhorta + Salad)", price: "220" },
      { id: "81", nameBn: "সাদা ভাত + বীফ মাসালা + ভেজিটেবল + আলু ভর্তা + সালাদ", nameEn: "Set 81 (Plain Rice + Beef Masala + Veg + Bhorta + Salad)", price: "260" },
      { id: "82", nameBn: "সাদা ভাত + সোনালী চিকেন + ভেজিটেবল + আলু ভর্তা + সালাদ", nameEn: "Set 82 (Plain Rice + Sonali Chicken + Veg + Bhorta + Salad)", price: "260" },
      { id: "83", nameBn: "সাদা ভাত + মাছ (রুই/রূপচাঁদা) + ভেজিটেবল + আলু ভর্তা + সালাদ", nameEn: "Set 83 (Plain Rice + Fish + Veg + Bhorta + Salad)", price: "250" },
      { id: "84", nameBn: "সাদা ভাত + মাটন + ভেজিটেবল + আলু ভর্তা + সালাদ", nameEn: "Set 84 (Plain Rice + Mutton + Veg + Bhorta + Salad)", price: "330" },
    ]
  },
  {
    id: "salad-others",
    name: "সালাদ ও অন্যান্য",
    items: [
      { id: "29", nameBn: "আচার", nameEn: "Pickle", price: "60" },
      { id: "30", nameBn: "দই সালাদ", nameEn: "Dioy Salad", price: "120" },
      { id: "31", nameBn: "হট এন্ড সাওয়ার সালাদ", nameEn: "Hot & Sour Salad", price: "150" },
      { id: "32", nameBn: "গ্রিন সালাদ জুলিয়ান/রিং", nameEn: "Green Salad Julian/Ring", price: "80" },
      { id: "33", nameBn: "চিকেন ক্যাশনাট সালাদ", nameEn: "Chicken Cashewnut salad", price: "350" },
      { id: "46", nameBn: "আলু ভর্তা", nameEn: "Potato Bhorta", price: "30" },
      { id: "47", nameBn: "ডিম ভর্তা", nameEn: "Egg Bhorta", price: "80" },
      { id: "48", nameBn: "বেগুন ভর্তা", nameEn: "Begun Bhorta", price: "50" },
      { id: "49", nameBn: "শুটকি ভর্তা", nameEn: "Dry Fish Bhorta", price: "80" },
      { id: "50", nameBn: "চাইনিজ ভেজিটেবল", nameEn: "Chinese Vegetable", price: "100" },
    ]
  },
  {
    id: "rice-soup",
    name: "ভাত ও স্যুপ",
    items: [
      { id: "51", nameBn: "সাদা ভাত", nameEn: "Plain Rice", price: "60" },
      { id: "52", nameBn: "পোলাও", nameEn: "Polao", price: "120" },
      { id: "53", nameBn: "খিচুড়ী", nameEn: "Khichuri", price: "140" },
      { id: "54", nameBn: "ভেজিটেবল ফ্রাইড রাইস", nameEn: "Vegetable Fried Rice", price: "200" },
      { id: "55", nameBn: "এগ ফ্রাইড রাইস", nameEn: "Egg Fried Rice", price: "230" },
      { id: "56", nameBn: "নোঙর স্পেশাল ফ্রাইড রাইস", nameEn: "Nonger Special Fried Rice", price: "320" },
      { id: "57", nameBn: "থাই স্যুপ", nameEn: "Thai Soup", price: "250" },
      { id: "58", nameBn: "নোঙর স্পেশাল থাই স্যুপ", nameEn: "Nonger Special Thai Soup", price: "300" },
      { id: "59", nameBn: "চিকেন কর্ণ স্যুপ", nameEn: "Chicken Corn Soup", price: "160" },
      { id: "60", nameBn: "হট এন্ড সাওয়ার স্যুপ", nameEn: "Hot & Sour Soup", price: "250" },
    ]
  },
  {
    id: "drinks-desserts",
    name: "পানীয় ও ডেজার্ট",
    items: [
      { id: "61", nameBn: "লাচ্ছি", nameEn: "Lacchi", price: "100" },
      { id: "62", nameBn: "ফালুদা", nameEn: "Faluda", price: "140" },
      { id: "63", nameBn: "মিক্সড ফ্রুট", nameEn: "Mixed Fruit", price: "140" },
      { id: "64", nameBn: "ফ্রুটস সালাদ", nameEn: "Fruit Salad", price: "120" },
      { id: "65", nameBn: "মিক্সড ফ্রুট আইসক্রিম", nameEn: "Mixed Fruit Ice Cream", price: "190" },
      { id: "66", nameBn: "মিক্সড জুস", nameEn: "Mixed Juice", price: "150" },
      { id: "67", nameBn: "অরেঞ্জ জুস", nameEn: "Orange Juice", price: "120" },
      { id: "68", nameBn: "আম জুস", nameEn: "Mango Juice", price: "80" },
      { id: "69", nameBn: "পেঁপে জুস", nameEn: "Papaya Juice", price: "80" },
      { id: "70", nameBn: "লেমন জুস", nameEn: "Lemon Juice", price: "60" },
      { id: "71", nameBn: "আনার জুস", nameEn: "Anar Juice", price: "160" },
      { id: "72", nameBn: "মিল্ক শেক", nameEn: "Milk Shake", price: "160" },
      { id: "73", nameBn: "কফি", nameEn: "Coffee", price: "80" },
      { id: "74", nameBn: "আইস কফি", nameEn: "Ice Coffee", price: "160" },
      { id: "75", nameBn: "আইসক্রিম ২ স্কুপ", nameEn: "Ice Cream 2 Scoop", price: "100" },
      { id: "76_drinks", nameBn: "কোমল পানীয়", nameEn: "Soft Drink", price: "30" },
    ]
  }
];
