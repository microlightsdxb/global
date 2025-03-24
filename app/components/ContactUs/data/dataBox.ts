import { assets } from "@/public/assets/assets";
export const banner = {
  data: [
    {
      id: 1,
      title: "Let’s Talk",
      image: assets.cbanner.src,

    }
  ]
};
export const locations  = {
  "tb-1": [
    {
      id:1,
      city: "Dubai",
      type: "Headquarters",
      address:
        "P.O. Box 23994, Al Kuthban Building, 1st Floor, Offices 106 & 107, Sheikh Zayed Road, Dubai, UAE",
      tel: "+971 056 1713002",
      mob: "+971 4 328 5488",
      email: "info@microlightsgroup.ae",
      map: assets.mapuae, // Replace with actual image path
    },
    {
      id:2,
      city: "Dubai",
      type: "Headquarters",
      address:
        "P.O. Box 23994, Al Kuthban Building, 1st Floor, Offices 106 & 107, Sheikh Zayed Road, Dubai, UAE",
      tel: "+971 056 1713002",
      mob: "+971 4 328 5488",
      email: "info@microlightsgroup.ae",
      map: assets.mapuae, // Replace with actual image path
    },
  ],
  "tb-2": [
    {
      id:1,
      city: "Riyadh",
      type: "Branch Office",
      address:
        "P.O. Box 12345, Business Tower, Office 202, King Fahd Road, Riyadh, Saudi Arabia",
      tel: "+966 056 1713002",
      mob: "+966 4 328 5488",
      email: "info@microlightsgroup.sa",
      map: assets.mapuae, // Replace with actual image path
    },
    {
      id:2,
      city: "Riyadh",
      type: "Branch Office",
      address:
        "P.O. Box 12345, Business Tower, Office 202, King Fahd Road, Riyadh, Saudi Arabia",
      tel: "+966 056 1713002",
      mob: "+966 4 328 5488",
      email: "info@microlightsgroup.sa",
      map: assets.mapuae, // Replace with actual image path
    },
  ],
};
export const tabs = [
  { id: "tb-1", label: "UAE" },
  { id: "tb-2", label: "Saudi Arabia" },
];