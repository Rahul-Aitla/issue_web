export const categories = [
  "All finds",
  "Electronics",
  "Books",
  "Room essentials",
  "Everyday",
] as const;

export type Category = (typeof categories)[number];

export interface Product {
  id: string;
  name: string;
  category: Exclude<Category, "All finds">;
  price: number;
  originalPrice: number;
  image: string;
  alt: string;
  condition: string;
  seller: string;
  initials: string;
  location: string;
  description: string;
  color: string;
}

export const products: Product[] = [
  {
    id: "everyday-laptop",
    name: "The assignment sidekick",
    category: "Electronics",
    price: 24500,
    originalPrice: 65000,
    image: "/images/laptop.jpg",
    alt: "Open silver laptop on a wooden desk",
    condition: "Good condition",
    seller: "Aarav M.",
    initials: "AM",
    location: "Library entrance",
    description:
      "A pre-loved 13-inch laptop for notes, late-night assignments, and everything in between. 8 GB memory, 256 GB storage, charger included. A few marks on the lid, plenty of semesters left.",
    color: "sage",
  },
  {
    id: "studio-headphones",
    name: "A little less library noise",
    category: "Electronics",
    price: 2800,
    originalPrice: 7990,
    image: "/images/headphones.jpg",
    alt: "Black over-ear headphones against a yellow background",
    condition: "Like new",
    seller: "Meera S.",
    initials: "MS",
    location: "Student centre",
    description:
      "Comfortable over-ear headphones with a wired connection. Great for focus sessions or the ride home. Includes the original cable and a soft carry pouch.",
    color: "butter",
  },
  {
    id: "weekend-reading",
    name: "Your next chapter",
    category: "Books",
    price: 450,
    originalPrice: 1200,
    image: "/images/books.jpg",
    alt: "A small collection of well-loved books",
    condition: "Pre-loved",
    seller: "Ishita R.",
    initials: "IR",
    location: "Arts block",
    description:
      "A little stack for afternoons when you need a break from course notes. Clean pages, gently worn covers, and no missing chapters. Sold together.",
    color: "peach",
  },
  {
    id: "study-lamp",
    name: "For the midnight deadline",
    category: "Room essentials",
    price: 650,
    originalPrice: 1890,
    image: "/images/lamp.jpg",
    alt: "A warm desk lamp in a quiet room",
    condition: "Good condition",
    seller: "Kabir D.",
    initials: "KD",
    location: "North residence",
    description:
      "A compact desk lamp with a warm light and an adjustable head. Just the right amount of light for a shared room. Working bulb included.",
    color: "lilac-free",
  },
  {
    id: "weekend-camera",
    name: "Make the memories tangible",
    category: "Electronics",
    price: 12900,
    originalPrice: 28000,
    image: "/images/camera.jpg",
    alt: "A black camera with its lens and strap",
    condition: "Good condition",
    seller: "Rohan P.",
    initials: "RP",
    location: "Design studio",
    description:
      "A beginner-friendly digital camera for campus walks and weekend trips. Includes a lens, battery, charger, and strap. Test it at pickup before you decide.",
    color: "sage",
  },
  {
    id: "daily-backpack",
    name: "Carry a little of everything",
    category: "Everyday",
    price: 850,
    originalPrice: 2499,
    image: "/images/backpack.jpg",
    alt: "A practical backpack ready for everyday use",
    condition: "Like new",
    seller: "Ananya K.",
    initials: "AK",
    location: "Canteen courtyard",
    description:
      "A roomy everyday backpack with a padded laptop sleeve and pockets that actually make sense. Clean, lightly used, and ready for a new timetable.",
    color: "peach",
  },
  {
    id: "campus-bicycle",
    name: "The five-minute commute",
    category: "Everyday",
    price: 4200,
    originalPrice: 11000,
    image: "/images/bicycle.jpg",
    alt: "A bicycle photographed from the side",
    condition: "Pre-loved",
    seller: "Dev N.",
    initials: "DN",
    location: "East gate",
    description:
      "A simple city bicycle for getting between classes. Recently checked brakes, smooth gears, and a few honest scratches. Lock included.",
    color: "butter",
  },
  {
    id: "compact-desk",
    name: "A corner to call your own",
    category: "Room essentials",
    price: 1800,
    originalPrice: 4500,
    image: "/images/desk.jpg",
    alt: "A tidy desk setup with room for a laptop and notebook",
    condition: "Good condition",
    seller: "Sana A.",
    initials: "SA",
    location: "South residence",
    description:
      "A compact desk that fits a small student room without taking it over. Sturdy, easy to wipe clean, and ready for pickup. Bring a friend to help carry it.",
    color: "sage",
  },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function findProducts(query = "", category = "All finds") {
  const needle = query.trim().toLowerCase();
  return products.filter(
    (product) =>
      (category === "All finds" || product.category === category) &&
      `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(needle),
  );
}
