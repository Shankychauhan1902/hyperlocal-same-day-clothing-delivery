export const initialPolicy = {
  enabled: true,
  hours: 2,
  fee: 49,
  categories: ["Shirts", "Trousers", "Dresses", "Ethnic wear"],
  condition:
    "Items must be unused, unwashed, and have original tags attached. Exchanges depend on requested size availability.",
};
export const shopSeed = [
  {
    name: "Thread & Co.",
    owner: "Aarav Mehta",
    area: "Khora Colony",
    listings: 18,
    status: "Active",
  },
  {
    name: "The Local Edit",
    owner: "Nisha Verma",
    area: "Khora Colony",
    listings: 12,
    status: "Active",
  },
  {
    name: "Blue Door Studio",
    owner: "Kabir Singh",
    area: "Khora Colony",
    listings: 0,
    status: "Pending review",
  },
];
export const productSeed = [
  {
    id: 1,
    name: "Printed Cotton Kurta",
    shop: "Thread & Co.",
    category: "Ethnic wear",
    price: 1299,
    status: "Pending review",
    image: "photo-1583391733956-6c78276477e9",
  },
  {
    id: 2,
    name: "Relaxed Denim Jacket",
    shop: "Blue Door Studio",
    category: "Outerwear",
    price: 2199,
    status: "Pending review",
    image: "photo-1551028719-00167b16eac5",
  },
  {
    id: 3,
    name: "Cotton Everyday Tee",
    shop: "The Local Edit",
    category: "Basics",
    price: 599,
    status: "Pending review",
    image: "photo-1521572163474-6864f9cf17ab",
  },
];
export const orderSeed = [
  {
    id: "NW-1042",
    customer: "Isha Kapoor",
    shop: "Thread & Co.",
    amount: 1848,
    status: "Packing",
    tracking: "",
  },
  {
    id: "NW-1041",
    customer: "Rohan Das",
    shop: "The Local Edit",
    amount: 1098,
    status: "Ready to dispatch",
    tracking: "",
  },
  {
    id: "NW-1039",
    customer: "Meera Jain",
    shop: "Blue Door Studio",
    amount: 1548,
    status: "Dispatched",
    tracking: "https://track.example/1039",
  },
];
export const settlementSeed = [
  {
    id: "ST-6201",
    shop: "Thread & Co.",
    order: "NW-1032",
    gross: 1848,
    commission: 277,
    net: 1571,
    status: "Unpaid",
  },
  {
    id: "ST-6200",
    shop: "The Local Edit",
    order: "NW-1028",
    gross: 1098,
    commission: 165,
    net: 933,
    status: "Unpaid",
  },
  {
    id: "ST-6198",
    shop: "Thread & Co.",
    order: "NW-1021",
    gross: 2348,
    commission: 352,
    net: 1996,
    status: "Paid",
  },
];
