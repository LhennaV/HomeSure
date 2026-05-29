// ── Data ──────────────────────────────────────────────────────────────────────

const properties = [
  {
    title: "House for Sale",
    location: "Pulong Buhangin, Sta. Maria, Bulacan",
    price: "₱10,000",
    period: "/month",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80",
  },
  {
    title: "Cozy Studio Apartment",
    location: "Poblacion, Sta. Maria, Bulacan",
    price: "₱8,000",
    period: "/month",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80",
  },
  {
    title: "Modern 2BR Apartment",
    location: "Poblacion, Sta. Maria, Bulacan",
    price: "₱12,000",
    period: "/month",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80",
  },
  {
    title: "Spacious Family Home",
    location: "Bagbaguin, Sta. Maria, Bulacan",
    price: "₱15,000",
    period: "/month",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
  },
  {
    title: "Studio Loft Unit",
    location: "Pulong Buhangin, Sta. Maria",
    price: "₱6,500",
    period: "/month",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
  },
  {
    title: "Townhouse for Rent",
    location: "Tumana, Sta. Maria, Bulacan",
    price: "₱10,500",
    period: "/month",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  },
];

const bentoListings = [
  {
    badge:'For Sale', badgeType:'sale',
    price:'₱4,500,000', name:'4BR Modern House', barangay:'Pulong Buhangin',
    beds:4, baths:3,
    img:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80',
  },
  {
    badge:'For Rent', badgeType:'rent',
    price:'₱15,000/mo', name:'2BR Apartment', barangay:'Poblacion',
    beds:2, baths:1,
    img:'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=80',
  },
  {
    badge:'For Sale', badgeType:'sale',
    price:'₱2,800,000', name:'3BR Townhouse', barangay:'Guyong',
    beds:3, baths:2,
    img:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
  },
  {
    badge:'For Rent', badgeType:'rent',
    price:'₱8,000/mo', name:'Studio Unit', barangay:'Bagbaguin',
    beds:1, baths:1,
    img:'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
  },
  {
    badge:'New', badgeType:'new',
    price:'₱1,900,000', name:'2BR Condo Unit', barangay:'Tumana',
    beds:2, baths:1,
    img:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  },
];

const categories = [
  {
    name: "Houses",
    count: "342 listings",
    color: "#1a9e8f",
    bg: "rgba(26,158,143,0.15)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  },
  {
    name: "Apartments",
    count: "218 listings",
    color: "#6c63ff",
    bg: "rgba(108,99,255,0.15)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="16" y2="21"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="2" y1="15" x2="22" y2="15"/></svg>`,
  },
  {
    name: "Townhouses",
    count: "97 listings",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.15)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M1 22h22"/><path d="M5 22V7l7-5 7 5v15"/><path d="M9 22V12h6v10"/></svg>`,
  },
];

const steps = [
  {
    num: "1",
    title: "Create an Account",
    desc: "Sign up as a buyer or seller. Verify your identity to build trust.",
  },
  {
    num: "2",
    title: "Browse or List",
    desc: "Search properties by barangay, budget, and type — or post your listing.",
  },
  {
    num: "3",
    title: "Connect Directly",
    desc: "Message verified sellers securely within the platform.",
  },
  {
    num: "4",
    title: "Close the Deal",
    desc: "Agree on terms confidently with full transparency on both sides.",
  },
];

const features = [
  {
    title: "Verified Sellers",
    desc: "All property owners undergo identity verification with government ID and selfie before publishing listings.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
  {
    title: "Local Focus",
    desc: "Find properties by barangay within Sta. Maria, Bulacan with easy filtering options.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  },
  {
    title: "Direct Messaging",
    desc: "Connect directly with verified sellers through our secure in-platform messaging system.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  },
];

const statsData = [
  { end: 1200, suffix: "+", label: "Verified Sellers" },
  { end: 3450, suffix: "+", label: "Active Listings" },
  { end: 8750, suffix: "+", label: "Successful Connections" },
];

const testimonials = [
  {
    stars: 5,
    quote:
      "Found my apartment in just two days. Every seller was verified — no scams, no stress.",
    name: "Maria Santos",
    role: "Tenant, Poblacion",
    initials: "MS",
  },
  {
    stars: 5,
    quote:
      "Listed my townhouse and got genuine buyers in under a week. The platform is so easy to use.",
    name: "Rolando Cruz",
    role: "Property Owner, Bagbaguin",
    initials: "RC",
  },
  {
    stars: 4,
    quote:
      "Direct messaging made negotiating with the seller so much smoother than the usual process.",
    name: "Jessa Reyes",
    role: "Buyer, Tumana",
    initials: "JR",
  },
];

// GeoJSON polygons for all 24 barangays of Sta. Maria, Bulacan
// Traced from PSA/NAMRIA reference map
// lon = 120.910 + px * 0.000171,  lat = 14.895 - py * 0.000185
const barangayGeoJSON = {
  type: 'FeatureCollection',
  features: [
    // ── SILANGAN – northernmost, oval tip ─────────────────────────────────────
    { type:'Feature', properties:{ name:'Silangan', count:4 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9582,14.8905],[120.9618,14.8918],[120.9656,14.8924],[120.9695,14.8920],
      [120.9732,14.8906],[120.9760,14.8884],[120.9776,14.8856],[120.9770,14.8826],
      [120.9748,14.8800],[120.9716,14.8784],[120.9678,14.8778],[120.9638,14.8782],
      [120.9602,14.8796],[120.9574,14.8820],[120.9562,14.8850],[120.9568,14.8880],
      [120.9582,14.8905]
    ]] } },
    // ── MAG-ASAWANG SAPA – broad central-west ─────────────────────────────────
    { type:'Feature', properties:{ name:'Mag-asawang Sapa', count:6 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9228,14.8862],[120.9264,14.8876],[120.9312,14.8882],[120.9365,14.8878],
      [120.9415,14.8866],[120.9462,14.8848],[120.9508,14.8828],[120.9544,14.8804],
      [120.9566,14.8774],[120.9568,14.8738],[120.9550,14.8704],[120.9520,14.8676],
      [120.9480,14.8656],[120.9432,14.8644],[120.9380,14.8640],[120.9328,14.8648],
      [120.9280,14.8664],[120.9240,14.8688],[120.9214,14.8718],[120.9205,14.8752],
      [120.9210,14.8786],[120.9228,14.8814],[120.9228,14.8862]
    ]] } },
    // ── PULONG BUHANGIN – large northeast ─────────────────────────────────────
    { type:'Feature', properties:{ name:'Pulong Buhangin', count:5 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9778,14.8906],[120.9820,14.8916],[120.9868,14.8920],[120.9920,14.8916],
      [120.9970,14.8902],[121.0016,14.8878],[121.0054,14.8846],[121.0080,14.8808],
      [121.0094,14.8764],[121.0094,14.8718],[121.0076,14.8672],[121.0046,14.8632],
      [121.0006,14.8600],[120.9960,14.8578],[120.9910,14.8566],[120.9860,14.8568],
      [120.9814,14.8582],[120.9774,14.8606],[120.9744,14.8638],[120.9726,14.8676],
      [120.9722,14.8716],[120.9730,14.8758],[120.9752,14.8796],[120.9768,14.8838],
      [120.9778,14.8882],[120.9778,14.8906]
    ]] } },
    // ── CAY POMBO – center ─────────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Cay Pombo', count:3 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9550,14.8700],[120.9584,14.8716],[120.9624,14.8722],[120.9664,14.8718],
      [120.9700,14.8702],[120.9726,14.8676],[120.9738,14.8642],[120.9732,14.8606],
      [120.9712,14.8576],[120.9682,14.8556],[120.9644,14.8546],[120.9604,14.8548],
      [120.9566,14.8562],[120.9540,14.8588],[120.9526,14.8620],[120.9528,14.8656],
      [120.9544,14.8684],[120.9550,14.8700]
    ]] } },
    // ── CAYSIO – left of Cay Pombo ────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Caysio', count:5 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9210,14.8790],[120.9250,14.8800],[120.9298,14.8800],[120.9352,14.8790],
      [120.9406,14.8772],[120.9454,14.8748],[120.9494,14.8720],[120.9524,14.8688],
      [120.9538,14.8650],[120.9538,14.8610],[120.9524,14.8574],[120.9500,14.8546],
      [120.9466,14.8528],[120.9424,14.8518],[120.9378,14.8516],[120.9332,14.8524],
      [120.9288,14.8542],[120.9252,14.8566],[120.9224,14.8598],[120.9206,14.8634],
      [120.9200,14.8674],[120.9206,14.8714],[120.9214,14.8752],[120.9210,14.8790]
    ]] } },
    // ── MANGGAHAN – far west, small ───────────────────────────────────────────
    { type:'Feature', properties:{ name:'Manggahan', count:7 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9122,14.8528],[120.9148,14.8542],[120.9180,14.8548],[120.9212,14.8542],
      [120.9238,14.8524],[120.9254,14.8498],[120.9258,14.8468],[120.9248,14.8440],
      [120.9226,14.8418],[120.9196,14.8406],[120.9163,14.8406],[120.9134,14.8418],
      [120.9114,14.8438],[120.9106,14.8464],[120.9110,14.8494],[120.9122,14.8528]
    ]] } },
    // ── BALASING – right side ─────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Balasing', count:3 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9726,14.8640],[120.9762,14.8648],[120.9802,14.8646],[120.9842,14.8636],
      [120.9880,14.8616],[120.9912,14.8590],[120.9934,14.8556],[120.9944,14.8516],
      [120.9940,14.8474],[120.9922,14.8436],[120.9892,14.8404],[120.9852,14.8380],
      [120.9806,14.8366],[120.9758,14.8362],[120.9710,14.8368],[120.9666,14.8384],
      [120.9630,14.8408],[120.9608,14.8440],[120.9600,14.8478],[120.9608,14.8516],
      [120.9628,14.8550],[120.9658,14.8578],[120.9694,14.8614],[120.9726,14.8640]
    ]] } },
    // ── BULAC – far east ──────────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Bulac', count:2 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9946,14.8558],[120.9980,14.8566],[121.0016,14.8564],[121.0048,14.8550],
      [121.0074,14.8526],[121.0090,14.8494],[121.0092,14.8458],[121.0080,14.8424],
      [121.0054,14.8396],[121.0020,14.8376],[120.9982,14.8368],[120.9944,14.8372],
      [120.9910,14.8388],[120.9884,14.8412],[120.9870,14.8444],[120.9870,14.8480],
      [120.9882,14.8514],[120.9906,14.8542],[120.9946,14.8558]
    ]] } },
    // ── GUYONG – large central ─────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Guyong', count:9 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9380,14.8518],[120.9416,14.8530],[120.9460,14.8536],[120.9506,14.8534],
      [120.9550,14.8524],[120.9590,14.8506],[120.9622,14.8480],[120.9642,14.8448],
      [120.9648,14.8412],[120.9638,14.8376],[120.9614,14.8346],[120.9580,14.8322],
      [120.9538,14.8308],[120.9491,14.8302],[120.9443,14.8306],[120.9400,14.8320],
      [120.9363,14.8342],[120.9338,14.8372],[120.9327,14.8406],[120.9330,14.8442],
      [120.9346,14.8476],[120.9366,14.8502],[120.9380,14.8518]
    ]] } },
    // ── SANTA CRUZ – left of Guyong ───────────────────────────────────────────
    { type:'Feature', properties:{ name:'Santa Cruz', count:8 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9200,14.8668],[120.9232,14.8682],[120.9270,14.8686],[120.9310,14.8680],
      [120.9350,14.8664],[120.9384,14.8640],[120.9406,14.8608],[120.9412,14.8572],
      [120.9400,14.8536],[120.9376,14.8508],[120.9340,14.8488],[120.9295,14.8476],
      [120.9248,14.8474],[120.9202,14.8482],[120.9163,14.8500],[120.9135,14.8526],
      [120.9119,14.8558],[120.9116,14.8594],[120.9126,14.8628],[120.9148,14.8654],
      [120.9174,14.8666],[120.9200,14.8668]
    ]] } },
    // ── CATMON – large east ────────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Catmon', count:6 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9650,14.8578],[120.9686,14.8586],[120.9726,14.8588],[120.9768,14.8578],
      [120.9806,14.8558],[120.9836,14.8530],[120.9854,14.8494],[120.9858,14.8454],
      [120.9848,14.8414],[120.9826,14.8380],[120.9794,14.8352],[120.9754,14.8332],
      [120.9708,14.8320],[120.9658,14.8316],[120.9610,14.8322],[120.9568,14.8336],
      [120.9535,14.8358],[120.9515,14.8388],[120.9510,14.8422],[120.9520,14.8456],
      [120.9542,14.8486],[120.9574,14.8512],[120.9614,14.8552],[120.9650,14.8578]
    ]] } },
    // ── SANTA CLARA – far west ────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Santa Clara', count:5 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9112,14.8398],[120.9142,14.8412],[120.9178,14.8420],[120.9216,14.8416],
      [120.9250,14.8400],[120.9272,14.8374],[120.9280,14.8342],[120.9271,14.8308],
      [120.9249,14.8280],[120.9218,14.8260],[120.9181,14.8252],[120.9143,14.8256],
      [120.9110,14.8272],[120.9088,14.8298],[120.9080,14.8330],[120.9086,14.8362],
      [120.9100,14.8386],[120.9112,14.8398]
    ]] } },
    // ── SAN JOSE PATAG – center ───────────────────────────────────────────────
    { type:'Feature', properties:{ name:'San Jose Patag', count:4 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9336,14.8340],[120.9368,14.8350],[120.9406,14.8354],[120.9446,14.8350],
      [120.9484,14.8338],[120.9516,14.8318],[120.9538,14.8292],[120.9547,14.8260],
      [120.9542,14.8228],[120.9524,14.8200],[120.9496,14.8178],[120.9461,14.8164],
      [120.9421,14.8158],[120.9380,14.8162],[120.9342,14.8174],[120.9311,14.8196],
      [120.9292,14.8224],[120.9286,14.8256],[120.9294,14.8288],[120.9314,14.8316],
      [120.9336,14.8340]
    ]] } },
    // ── POBLACION – center (town center) ──────────────────────────────────────
    { type:'Feature', properties:{ name:'Poblacion', count:12 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9292,14.8222],[120.9316,14.8240],[120.9346,14.8250],[120.9380,14.8254],
      [120.9416,14.8250],[120.9448,14.8238],[120.9474,14.8218],[120.9490,14.8192],
      [120.9494,14.8162],[120.9484,14.8134],[120.9462,14.8110],[120.9432,14.8094],
      [120.9396,14.8086],[120.9358,14.8088],[120.9322,14.8100],[120.9293,14.8122],
      [120.9275,14.8150],[120.9270,14.8182],[120.9278,14.8210],[120.9292,14.8222]
    ]] } },
    // ── BAGBAGUIN ─────────────────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Bagbaguin', count:7 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9192,14.8160],[120.9224,14.8176],[120.9262,14.8184],[120.9304,14.8184],
      [120.9346,14.8176],[120.9384,14.8158],[120.9412,14.8132],[120.9428,14.8100],
      [120.9430,14.8066],[120.9420,14.8034],[120.9398,14.8006],[120.9366,14.7986],
      [120.9329,14.7976],[120.9288,14.7976],[120.9248,14.7988],[120.9214,14.8008],
      [120.9188,14.8036],[120.9174,14.8070],[120.9172,14.8106],[120.9182,14.8138],
      [120.9192,14.8160]
    ]] } },
    // ── TUMANA ────────────────────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Tumana', count:6 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9494,14.8160],[120.9524,14.8168],[120.9558,14.8170],[120.9594,14.8164],
      [120.9628,14.8148],[120.9654,14.8124],[120.9669,14.8093],[120.9671,14.8059],
      [120.9660,14.8027],[120.9638,14.8000],[120.9608,14.7980],[120.9572,14.7970],
      [120.9532,14.7968],[120.9493,14.7976],[120.9458,14.7993],[120.9432,14.8018],
      [120.9420,14.8050],[120.9422,14.8084],[120.9436,14.8116],[120.9459,14.8142],
      [120.9494,14.8160]
    ]] } },
    // ── PARADA ────────────────────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Parada', count:5 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9672,14.8216],[120.9704,14.8224],[120.9740,14.8224],[120.9776,14.8214],
      [120.9806,14.8196],[120.9828,14.8170],[120.9838,14.8138],[120.9834,14.8104],
      [120.9817,14.8074],[120.9789,14.8050],[120.9754,14.8034],[120.9714,14.8026],
      [120.9673,14.8028],[120.9635,14.8040],[120.9606,14.8061],[120.9588,14.8089],
      [120.9582,14.8121],[120.9588,14.8153],[120.9605,14.8181],[120.9634,14.8202],
      [120.9672,14.8216]
    ]] } },
    // ── SAN VICENTE – large southeast ─────────────────────────────────────────
    { type:'Feature', properties:{ name:'San Vicente', count:4 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9842,14.8360],[120.9878,14.8370],[120.9918,14.8372],[120.9958,14.8366],
      [120.9994,14.8350],[121.0024,14.8326],[121.0044,14.8294],[121.0050,14.8258],
      [121.0044,14.8220],[121.0026,14.8186],[120.9998,14.8158],[120.9962,14.8138],
      [120.9924,14.8126],[120.9882,14.8122],[120.9840,14.8126],[120.9802,14.8138],
      [120.9770,14.8158],[120.9748,14.8185],[120.9736,14.8218],[120.9736,14.8254],
      [120.9748,14.8288],[120.9770,14.8318],[120.9800,14.8342],[120.9842,14.8360]
    ]] } },
    // ── LALAKHAN – far west, small ────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Lalakhan', count:3 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9086,14.8260],[120.9112,14.8274],[120.9142,14.8280],[120.9175,14.8276],
      [120.9204,14.8260],[120.9224,14.8234],[120.9230,14.8204],[120.9222,14.8174],
      [120.9202,14.8150],[120.9174,14.8135],[120.9142,14.8130],[120.9110,14.8138],
      [120.9085,14.8156],[120.9070,14.8182],[120.9068,14.8212],[120.9078,14.8240],
      [120.9086,14.8260]
    ]] } },
    // ── TABING BAKOD ──────────────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Tabing Bakod', count:3 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9174,14.8128],[120.9202,14.8140],[120.9234,14.8146],[120.9268,14.8142],
      [120.9298,14.8126],[120.9320,14.8100],[120.9330,14.8068],[120.9326,14.8034],
      [120.9310,14.8004],[120.9283,14.7980],[120.9250,14.7964],[120.9213,14.7958],
      [120.9174,14.7962],[120.9140,14.7976],[120.9114,14.7998],[120.9100,14.8028],
      [120.9097,14.8061],[120.9108,14.8093],[120.9130,14.8118],[120.9174,14.8128]
    ]] } },
    // ── SAN GABRIEL ───────────────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'San Gabriel', count:5 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9330,14.7974],[120.9362,14.7982],[120.9398,14.7984],[120.9434,14.7980],
      [120.9468,14.7966],[120.9494,14.7944],[120.9508,14.7916],[120.9508,14.7885],
      [120.9495,14.7856],[120.9472,14.7832],[120.9440,14.7816],[120.9402,14.7808],
      [120.9362,14.7810],[120.9324,14.7822],[120.9293,14.7843],[120.9272,14.7872],
      [120.9264,14.7905],[120.9270,14.7938],[120.9290,14.7964],[120.9330,14.7974]
    ]] } },
    // ── BUENAVISTA ────────────────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Buenavista', count:4 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9434,14.7976],[120.9466,14.7984],[120.9502,14.7988],[120.9540,14.7986],
      [120.9576,14.7976],[120.9608,14.7956],[120.9630,14.7930],[120.9640,14.7899],
      [120.9636,14.7866],[120.9619,14.7836],[120.9592,14.7812],[120.9558,14.7796],
      [120.9519,14.7790],[120.9480,14.7793],[120.9444,14.7806],[120.9414,14.7827],
      [120.9395,14.7856],[120.9389,14.7888],[120.9397,14.7920],[120.9417,14.7952],
      [120.9434,14.7976]
    ]] } },
    // ── CAMANGYANAN ───────────────────────────────────────────────────────────
    { type:'Feature', properties:{ name:'Camangyanan', count:5 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9638,14.8118],[120.9668,14.8124],[120.9700,14.8122],[120.9730,14.8112],
      [120.9756,14.8092],[120.9774,14.8064],[120.9780,14.8032],[120.9774,14.7998],
      [120.9754,14.7968],[120.9725,14.7944],[120.9689,14.7928],[120.9649,14.7920],
      [120.9609,14.7920],[120.9571,14.7930],[120.9540,14.7949],[120.9520,14.7974],
      [120.9512,14.8004],[120.9518,14.8034],[120.9535,14.8062],[120.9562,14.8084],
      [120.9598,14.8100],[120.9638,14.8118]
    ]] } },
    // ── MAHABANG PARANG – far southwest ───────────────────────────────────────
    { type:'Feature', properties:{ name:'Mahabang Parang', count:2 }, geometry:{ type:'Polygon', coordinates:[[
      [120.9108,14.7958],[120.9140,14.7970],[120.9178,14.7978],[120.9218,14.7978],
      [120.9256,14.7966],[120.9286,14.7944],[120.9305,14.7914],[120.9310,14.7880],
      [120.9301,14.7846],[120.9279,14.7816],[120.9248,14.7794],[120.9210,14.7781],
      [120.9170,14.7778],[120.9130,14.7784],[120.9097,14.7800],[120.9074,14.7826],
      [120.9064,14.7856],[120.9068,14.7888],[120.9084,14.7918],[120.9108,14.7958]
    ]] } },
  ]
};

// Exact 24 barangays of Sta. Maria, Bulacan
const STA_MARIA_BARANGAYS = new Set([
  'Bagbaguin','Balasing','Buenavista','Bulac','Camangyanan','Catmon',
  'Cay Pombo','Caysio','Guyong','Lalakhan','Mag-asawang Sapa',
  'Mahabang Parang','Manggahan','Parada','Poblacion','Pulong Buhangin',
  'San Gabriel','San Jose Patag','San Vicente','Santa Clara','Santa Cruz',
  'Silangan','Tabing Bakod','Tumana',
]);

// Name aliases — OSM may use these alternate spellings
const BARANGAY_ALIAS = {
  'Sta. Clara':'Santa Clara','Sta. Cruz':'Santa Cruz',
  'Cay-Pombo':'Cay Pombo','Mag-Asawang Sapa':'Mag-asawang Sapa',
  'Mahabang-Parang':'Mahabang Parang','Tabing-Bakod':'Tabing Bakod',
  'San Jose-Patag':'San Jose Patag',
};

// Listing count per barangay — merged with Overpass API data
const barangayListings = {
  'Poblacion':12,'Guyong':9,'Santa Cruz':8,'Manggahan':7,'Bagbaguin':7,
  'Mag-asawang Sapa':6,'Tumana':6,'Catmon':6,'Caysio':5,'Santa Clara':5,
  'San Gabriel':5,'Camangyanan':5,'Parada':5,'Silangan':4,'San Jose Patag':4,
  'San Vicente':4,'Buenavista':4,'Pulong Buhangin':3,'Cay Pombo':3,
  'Balasing':3,'Lalakhan':3,'Tabing Bakod':3,'Bulac':2,'Mahabang Parang':2,
};

// Assemble ordered OSM way segments into a single closed ring
function assembleRing(ways) {
  if (!ways || !ways.length) return null;
  if (ways.length === 1) {
    const w = ways[0]; if (w.length < 3) return null;
    const f = w[0], l = w[w.length-1];
    return (f[0]===l[0]&&f[1]===l[1]) ? w : [...w, f];
  }
  let ring = [...ways[0]];
  const rem = [...ways.slice(1)];
  while (rem.length) {
    const tail = ring[ring.length-1]; let found = false;
    for (let i = 0; i < rem.length; i++) {
      const w = rem[i];
      if (Math.abs(w[0][0]-tail[0])<1e-7 && Math.abs(w[0][1]-tail[1])<1e-7)
        { ring.push(...w.slice(1)); rem.splice(i,1); found=true; break; }
      if (Math.abs(w[w.length-1][0]-tail[0])<1e-7 && Math.abs(w[w.length-1][1]-tail[1])<1e-7)
        { ring.push(...[...w].reverse().slice(1)); rem.splice(i,1); found=true; break; }
    }
    if (!found) break;
  }
  if (ring.length < 4) return null;
  const f = ring[0], l = ring[ring.length-1];
  if (Math.abs(f[0]-l[0])>1e-7||Math.abs(f[1]-l[1])>1e-7) ring.push(f);
  return ring;
}

// Convert any Overpass relation to GeoJSON (no name filter — used for municipality boundary)
function relationToGeoJSON(osm) {
  const features = [];
  (osm.elements || []).forEach(el => {
    if (el.type !== 'relation') return;
    const outerWays = (el.members || [])
      .filter(m => m.type === 'way' && m.role !== 'inner' && m.geometry && m.geometry.length > 1)
      .map(m => m.geometry.map(g => [g.lon, g.lat]));
    if (!outerWays.length) return;
    const ring = assembleRing(outerWays);
    if (!ring || ring.length < 4) return;
    features.push({ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [ring] } });
  });
  return { type: 'FeatureCollection', features };
}

// Convert Overpass API `out geom` response to GeoJSON — only Sta. Maria barangays
function overpassToGeoJSON(osm) {
  const features = [];
  (osm.elements || []).forEach(el => {
    if (el.type !== 'relation') return;
    let name = el.tags?.name || el.tags?.['name:en'] || ''; if (!name) return;
    name = name.replace(/^(Barangay|Brgy\.?)\s+/i, '').trim();
    if (BARANGAY_ALIAS[name]) name = BARANGAY_ALIAS[name];
    if (!STA_MARIA_BARANGAYS.has(name)) return;

    // `out geom` puts geometry directly on each member way; skip inner rings (holes)
    const outerWays = (el.members || [])
      .filter(m => m.type === 'way' && m.role !== 'inner' && m.geometry && m.geometry.length > 1)
      .map(m => m.geometry.map(g => [g.lon, g.lat]));
    if (!outerWays.length) return;

    const ring = assembleRing(outerWays);
    if (!ring || ring.length < 4) return;
    features.push({
      type: 'Feature',
      properties: { name, count: barangayListings[name] || 2 },
      geometry: { type: 'Polygon', coordinates: [ring] },
    });
  });
  return { type: 'FeatureCollection', features };
}

// ── Theme init (read localStorage, default dark) ──────────────────────────────
(function () {
  const t = localStorage.getItem('hs-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
})();

// ── SVG Helpers ───────────────────────────────────────────────────────────────

const pinIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b8fa0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
const checkIcon = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
const chevronLeft = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
const chevronRight = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
const searchIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
const shieldIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
const starIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const lockIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
const LOGO_SRC = "assets/img/image.png";

// ── React Components ──────────────────────────────────────────────────────────

const { useState, useEffect, useRef } = React;

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// Typing Animation
const typingPhrases = [
  "Find your home.",
  "Find verified properties.",
  "Find your perfect place.",
  "Find trusted listings.",
  "Find your next home.",
];

function TypingText() {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = typingPhrases[phraseIdx];
    let timer;

    if (!deleting) {
      if (displayed.length < current.length) {
        timer = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          68 + Math.random() * 38,
        );
      } else {
        timer = setTimeout(() => setDeleting(true), 1900);
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(
          () => setDisplayed(d => d.slice(0, -1)),
          28 + Math.random() * 18,
        );
      } else {
        timer = setTimeout(() => {
          setPhraseIdx(i => (i + 1) % typingPhrases.length);
          setDeleting(false);
        }, 280);
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, deleting, phraseIdx]);

  return React.createElement(
    React.Fragment, null,
    displayed,
    React.createElement('span', { className: 'typing-cursor' }),
  );
}

// Hero Wheel — center is fixed, only arms orbit clockwise
function HeroCards() {
  const cards = properties.slice(0, 3);
  return React.createElement(
    'div', { className: 'hero-cards' },
    cards.map((prop, i) =>
      React.createElement(
        'div', { key: i, className: 'hero-card' },
        React.createElement(
          'div', { className: 'wc-img-wrap' },
          React.createElement('img', { className: 'wc-img', src: prop.image, alt: prop.title }),
          prop.verified
            ? React.createElement(
                'span', { className: 'wc-verified-badge' },
                React.createElement('span', { dangerouslySetInnerHTML: { __html: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` } }),
                'Verified',
              )
            : null,
        ),
        React.createElement(
          'div', { className: 'wc-info' },
          React.createElement('div', { className: 'wc-title' }, prop.title),
          React.createElement('div', { className: 'wc-location' },
            React.createElement('span', { dangerouslySetInnerHTML: { __html: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>` } }),
            prop.location,
          ),
          React.createElement('div', { className: 'wc-footer' },
            React.createElement('span', { className: 'wc-price' }, prop.price, React.createElement('span', { className: 'wc-period' }, prop.period)),
            React.createElement('span', { className: 'wc-view' }, 'View Details'),
          ),
        ),
      )
    ),
  );
}

function HeroMap() {
  const mapRef     = useRef(null);
  const mapInstRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstRef.current) return;

    const map = new maplibregl.Map({
      container:          mapRef.current,
      style:              'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center:             [120.963, 14.820],
      zoom:               12.6,
      pitch:              0,
      bearing:            0,
      antialias:          true,
      attributionControl: false,
      interactive:        true,
    });

    map.on('load', () => {
      // Sta. Maria, Bulacan boundary — tightened to actual municipality limits
      const staMaria = { type:'FeatureCollection', features:[{ type:'Feature', properties:{}, geometry:{ type:'Polygon', coordinates:[[
        // North — Silangan tip
        [120.9620,14.8918],[120.9730,14.8906],[120.9790,14.8900],
        // Pulong Buhangin northeast
        [120.9870,14.8918],[120.9960,14.8900],[121.0050,14.8868],
        [121.0094,14.8836],[121.0100,14.8748],[121.0092,14.8636],[121.0054,14.8594],
        // Balasing / Bulac east
        [121.0090,14.8458],[121.0042,14.8362],
        // San Vicente east coast
        [121.0170,14.8258],[121.0168,14.7958],
        // San Vicente / Camangyanan south
        [121.0060,14.7870],[120.9920,14.7870],[120.9820,14.7905],
        [120.9660,14.7838],[120.9510,14.7842],
        // San Gabriel / Tabing Bakod / Mahabang Parang south
        [120.9360,14.7858],[120.9310,14.7808],
        // Mahabang Parang — western edge (tightened east)
        [120.9240,14.7790],[120.9175,14.7808],
        // Up the western boundary — stays east of Bocaue/Balagtas/Pandi
        [120.9172,14.8028],[120.9178,14.8220],[120.9196,14.8408],[120.9210,14.8526],
        [120.9258,14.8552],[120.9260,14.8758],[120.9272,14.8872],
        // Back to Silangan
        [120.9620,14.8918],
      ]] } }] };

      map.addSource('muni', { type:'geojson', data: staMaria });
      map.addLayer({ id:'muni-fill', type:'fill', source:'muni',
        paint:{ 'fill-color':'#00c9a7', 'fill-opacity':0.18 } });
      map.addLayer({ id:'muni-glow', type:'line', source:'muni',
        paint:{ 'line-color':'#00c9a7', 'line-width':16, 'line-opacity':0.20, 'line-blur':12 } });
      map.addLayer({ id:'muni-border', type:'line', source:'muni',
        paint:{ 'line-color':'#00e5c8', 'line-width':2.2, 'line-opacity':1 } });
    });

    mapInstRef.current = map;
    return () => {
      if (mapInstRef.current) { mapInstRef.current.remove(); mapInstRef.current = null; }
    };
  }, []);

  return React.createElement(
    'div', { className: 'hero-map-wrap' },
    React.createElement('div', { ref: mapRef, className: 'hero-map-el' }),
  );
}

const sunSVG  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const moonSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

// Navbar
function Navbar() {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme') || 'dark'
  );

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('hs-theme', next);
    setTheme(next);
  }

  return React.createElement(
    "nav",
    null,
    React.createElement(
      "a",
      { className: "nav-logo", href: "#" },
      React.createElement("span", { className: "nav-catstone-wrap" },
        React.createElement("img", { src: "assets/img/CatsTone Logo.png", alt: "CatsTone", className: "nav-catstone-img" }),
      ),
      React.createElement("span", { className: "nav-logo-divider" }),
      React.createElement("img", { src: LOGO_SRC, alt: "HomeSure", height: 30, style: { display: "block" } }),
      "HomeSure",
    ),
    React.createElement(
      "div",
      { className: "nav-btns" },
      React.createElement("button", {
        className: "nav-theme-btn",
        onClick: toggleTheme,
        title: theme === 'dark' ? 'Switch to Light' : 'Switch to Dark',
        dangerouslySetInnerHTML: { __html: theme === 'dark' ? sunSVG : moonSVG },
      }),
      React.createElement("button", { className: "btn-outline", onClick: () => (window.location.href = "auth/signin.html") }, "Sign In"),
      React.createElement(
        "button",
        { className: "btn-solid", onClick: () => (window.location.href = "auth/signup.html") },
        "Sign Up",
      ),
    ),
  );
}

const bedSVG  = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5"/><path d="M2 9h20v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/><line x1="6" y1="9" x2="6" y2="20"/></svg>`;
const bathSVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6L9 2"/><path d="M4 6h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M4 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/><line x1="4" y1="14" x2="20" y2="14"/></svg>`;

function HeroBento() {
  return React.createElement('div', { className:'hero-bento-wrap' },
    // ── Live ping badge ──
    React.createElement('div', { className:'bento-ping' },
      React.createElement('span', { className:'bento-ping-dot' }),
      '3 new listings today',
    ),
    // ── Bento grid ──
    React.createElement('div', { className:'hero-bento' },
      bentoListings.map((l, i) =>
        React.createElement('div', {
          key: i,
          className: `bento-tile${i === 0 ? ' bento-featured' : ''}`,
          style: { backgroundImage:`url(${l.img})` },
        },
          React.createElement('div', { className:'bento-grad' }),
          React.createElement('div', { className:'bento-content' },
            React.createElement('span', { className:`bento-badge bento-badge-${l.badgeType}` }, l.badge),
            React.createElement('div', { className:'bento-info' },
              React.createElement('div', { className:'bento-price' }, l.price),
              React.createElement('div', { className:'bento-name' }, l.name),
              React.createElement('div', { className:'bento-loc' }, l.barangay),
              React.createElement('div', { className:'bento-meta' },
                React.createElement('span', { className:'bento-pill' },
                  React.createElement('span', { dangerouslySetInnerHTML:{ __html: bedSVG } }),
                  `${l.beds} bed`,
                ),
                React.createElement('span', { className:'bento-pill' },
                  React.createElement('span', { dangerouslySetInnerHTML:{ __html: bathSVG } }),
                  `${l.baths} bath`,
                ),
              ),
            ),
          ),
        )
      ),
    ),
  );
}

// Hero
function Hero() {

  return React.createElement(
    "section",
    { className: "hero" },

    // ── Left: text ──
    React.createElement(
      "div",
      { className: "hero-left" },
      React.createElement(
        "div",
        { className: "hero-badge" },
        React.createElement("span", { className: "hero-badge-dot" }),
        "Sta. Maria, Bulacan — Property Platform",
      ),
      React.createElement(
        "h1",
        { className: "hero-title" },
        "Buy. Sell. Rent.",
        React.createElement("br"),
        "All in one place.",
        React.createElement("br"),
        React.createElement(
          "span", { className: "hero-title-accent" },
          React.createElement(TypingText),
        ),
      ),
      React.createElement(
        "p",
        { className: "hero-desc" },
        "HomeSure connects buyers with verified property owners across Sta. Maria, Bulacan. No hidden listings. No unverified sellers.",
      ),
      React.createElement(
        "div",
        { className: "hero-ctas" },
        React.createElement(
          "button",
          { className: "hero-btn-primary", onClick: () => (window.location.href = "auth/signin.html") },
          React.createElement("span", { dangerouslySetInnerHTML: { __html: searchIcon } }),
          React.createElement("span", null, "Browse Listings"),
        ),
        React.createElement(
          "button",
          { className: "hero-btn-secondary", onClick: () => (window.location.href = "auth/signup.html") },
          React.createElement("span", null, "List Your Property"),
          React.createElement("span", { dangerouslySetInnerHTML: { __html: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>` } }),
        ),
      ),
      React.createElement(
        "div",
        { className: "hero-trust" },
        React.createElement("span", { className: "hero-trust-item" },
          React.createElement("span", { className: "hero-trust-icon", dangerouslySetInnerHTML: { __html: shieldIcon } }),
          React.createElement("span", null, "Verified Listings"),
        ),
        React.createElement("span", { className: "hero-trust-item" },
          React.createElement("span", { className: "hero-trust-icon", dangerouslySetInnerHTML: { __html: starIcon } }),
          React.createElement("span", null, "4.8/5 Rating"),
        ),
        React.createElement("span", { className: "hero-trust-item" },
          React.createElement("span", { className: "hero-trust-icon", dangerouslySetInnerHTML: { __html: lockIcon } }),
          React.createElement("span", null, "Secure Messaging"),
        ),
      ),
    ),

    // ── Right: bento grid ──
    React.createElement(HeroBento),
  );
}

// Categories
function Categories() {
  const [ref, visible] = useReveal();
  return React.createElement(
    "section",
    { className: `section reveal-section${visible ? ' in-view' : ''}`, ref },
    React.createElement(
      "span",
      { className: "section-label" },
      "Browse by Type",
    ),
    React.createElement(
      "h2",
      { className: "section-title" },
      "Find What You're Looking For",
    ),
    React.createElement(
      "p",
      { className: "section-sub" },
      "Filter by property type or listing category",
    ),
    React.createElement(
      "div",
      { className: "categories-grid" },
      categories.map((c, i) =>
        React.createElement(
          "div",
          { key: i, className: "cat-card" },
          React.createElement(
            "div",
            { className: "cat-icon", style: { background: c.bg } },
            React.createElement("span", {
              style: { color: c.color },
              dangerouslySetInnerHTML: { __html: c.icon },
            }),
          ),
          React.createElement("div", { className: "cat-name" }, c.name),
          React.createElement("div", { className: "cat-count" }, c.count),
        ),
      ),
    ),
  );
}

// Spotlight Carousel
function Carousel() {
  const [ref, visible] = useReveal();
  const len = properties.length;
  const [idx, setIdx] = useState(0);
  const [autoKey, setAutoKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % len), 3500);
    return () => clearInterval(t);
  }, [autoKey]);

  const go = (next) => {
    setIdx((next + len) % len);
    setAutoKey((k) => k + 1);
  };

  const leftProp = properties[(idx - 1 + len) % len];
  const centerProp = properties[idx];
  const rightProp = properties[(idx + 1) % len];

  const SideCard = (prop) =>
    React.createElement(
      "div",
      { className: "crd-side" },
      React.createElement("img", {
        className: "crd-img",
        src: prop.image,
        alt: prop.title,
      }),
      React.createElement(
        "div",
        { className: "crd-body-side" },
        React.createElement(
          "div",
          { className: "card-title-side" },
          prop.title,
        ),
        React.createElement("div", {
          className: "card-loc",
          dangerouslySetInnerHTML: {
            __html: pinIcon + `<span>${prop.location}</span>`,
          },
        }),
        React.createElement(
          "div",
          { className: "card-price-side" },
          prop.price,
        ),
      ),
    );

  return React.createElement(
    "section",
    { className: `section-alt reveal-section${visible ? ' in-view' : ''}`, ref },
    React.createElement(
      "span",
      { className: "section-label" },
      "Featured Properties",
    ),
    React.createElement(
      "h2",
      { className: "section-title" },
      "Curated Listings Near You",
    ),
    React.createElement(
      "p",
      { className: "section-sub" },
      "Hand-picked from verified sellers in Sta. Maria, Bulacan",
    ),
    React.createElement(
      "div",
      { className: "crs-stage" },
      React.createElement(
        "div",
        { className: "crs-row" },
        React.createElement("button", {
          className: "crs-btn",
          onClick: () => go(idx - 1),
          dangerouslySetInnerHTML: { __html: chevronLeft },
        }),
        React.createElement(
          "div",
          { className: "crs-clip" },
          React.createElement(
            "div",
            {
              className: "crd-side-wrap crd-side-left",
              onClick: () => go(idx - 1),
            },
            SideCard(leftProp),
          ),
          React.createElement(
            "div",
            { className: "crd-center" },
            React.createElement(
              "div",
              { style: { position: "relative" } },
              React.createElement("img", {
                className: "crd-img-center",
                src: centerProp.image,
                alt: centerProp.title,
              }),
              centerProp.verified &&
                React.createElement("div", {
                  className: "verified-badge",
                  dangerouslySetInnerHTML: { __html: checkIcon + " Verified" },
                }),
            ),
            React.createElement(
              "div",
              { className: "crd-body-center" },
              React.createElement(
                "div",
                { className: "card-title" },
                centerProp.title,
              ),
              React.createElement("div", {
                className: "card-loc",
                dangerouslySetInnerHTML: {
                  __html: pinIcon + `<span>${centerProp.location}</span>`,
                },
              }),
              React.createElement(
                "div",
                { className: "card-footer-row" },
                React.createElement(
                  "div",
                  { className: "card-price" },
                  centerProp.price,
                  React.createElement("span", null, centerProp.period),
                ),
                React.createElement(
                  "span",
                  {
                    className: "card-link",
                    onClick: () => (window.location.href = "auth/signin.html"),
                  },
                  "View Details",
                ),
              ),
            ),
          ),
          React.createElement(
            "div",
            {
              className: "crd-side-wrap crd-side-right",
              onClick: () => go(idx + 1),
            },
            SideCard(rightProp),
          ),
        ),
        React.createElement("button", {
          className: "crs-btn",
          onClick: () => go(idx + 1),
          dangerouslySetInnerHTML: { __html: chevronRight },
        }),
      ),
    ),
    React.createElement(
      "div",
      { className: "dots" },
      properties.map((_, i) =>
        React.createElement("button", {
          key: i,
          className: "dot" + (i === idx ? " active" : ""),
          onClick: () => go(i),
        }),
      ),
    ),
  );
}

// How It Works
function HowItWorks() {
  const [ref, visible] = useReveal();
  return React.createElement(
    "section",
    { className: `section reveal-section${visible ? ' in-view' : ''}`, ref },
    React.createElement("span", { className: "section-label" }, "How It Works"),
    React.createElement(
      "h2",
      { className: "section-title" },
      "Simple Steps to Your Next Home",
    ),
    React.createElement(
      "p",
      { className: "section-sub" },
      "Get started in minutes — no complicated process",
    ),
    React.createElement(
      "div",
      { className: "how-steps" },
      steps.map((s, i) =>
        React.createElement(
          "div",
          { key: i, className: "how-step" },
          React.createElement("div", { className: "how-step-num" }, s.num),
          React.createElement("div", { className: "how-step-title" }, s.title),
          React.createElement("div", { className: "how-step-desc" }, s.desc),
        ),
      ),
    ),
  );
}

// Features
function Features() {
  const [ref, visible] = useReveal();
  return React.createElement(
    "section",
    { className: `section-alt reveal-section${visible ? ' in-view' : ''}`, ref },
    React.createElement(
      "div",
      { className: "features-inner" },
      React.createElement(
        "span",
        { className: "section-label" },
        "Why HomeSure",
      ),
      React.createElement(
        "h2",
        { className: "section-title" },
        "Built for Trust & Transparency",
      ),
      React.createElement(
        "p",
        { className: "section-sub" },
        "A platform designed with security and convenience at its core",
      ),
      React.createElement(
        "div",
        { className: "features-card-wrap" },
        features.map((f, i) =>
          React.createElement(
            "div",
            { key: i, className: "feature-card" },
            React.createElement("div", {
              className: "feature-icon",
              dangerouslySetInnerHTML: { __html: f.icon },
            }),
            React.createElement("div", { className: "feature-title" }, f.title),
            React.createElement("div", { className: "feature-desc" }, f.desc),
          ),
        ),
      ),
    ),
  );
}

// Animated counter hook
function useCounter(end, duration, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setVal(end);
        clearInterval(timer);
      } else setVal(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active]);
  return val;
}

function StatBox({ stat }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const count = useCounter(stat.end, 1800, active);
  return React.createElement(
    "div",
    { className: "stat-box", ref },
    React.createElement(
      "div",
      { className: "stat-value" },
      count.toLocaleString() + stat.suffix,
    ),
    React.createElement("div", { className: "stat-label" }, stat.label),
  );
}

function Stats() {
  const [ref, visible] = useReveal();
  return React.createElement(
    "section",
    { className: `section reveal-section${visible ? ' in-view' : ''}`, ref },
    React.createElement(
      "div",
      { className: "stats-inner" },
      React.createElement(
        "span",
        { className: "section-label" },
        "Our Numbers",
      ),
      React.createElement(
        "h2",
        { className: "section-title" },
        "Trusted by Thousands",
      ),
      React.createElement(
        "p",
        { className: "section-sub" },
        "Building a safer housing marketplace for everyone in Sta. Maria",
      ),
      React.createElement(
        "div",
        { className: "stats-grid" },
        statsData.map((s, i) =>
          React.createElement(StatBox, { key: i, stat: s }),
        ),
      ),
    ),
  );
}

// Testimonials
function Testimonials() {
  const [ref, visible] = useReveal();
  return React.createElement(
    "section",
    { className: `section-alt reveal-section${visible ? ' in-view' : ''}`, ref },
    React.createElement("span", { className: "section-label" }, "Testimonials"),
    React.createElement(
      "h2",
      { className: "section-title" },
      "What Our Users Say",
    ),
    React.createElement(
      "p",
      { className: "section-sub" },
      "Real stories from real people in the community",
    ),
    React.createElement(
      "div",
      { className: "testimonials-grid" },
      testimonials.map((t, i) =>
        React.createElement(
          "div",
          { key: i, className: "testimonial-card" },
          React.createElement(
            "div",
            { className: "t-stars" },
            "★".repeat(t.stars) + (t.stars < 5 ? "☆".repeat(5 - t.stars) : ""),
          ),
          React.createElement("p", { className: "t-quote" }, `"${t.quote}"`),
          React.createElement(
            "div",
            { className: "t-author" },
            React.createElement("div", { className: "t-avatar" }, t.initials),
            React.createElement(
              "div",
              null,
              React.createElement("div", { className: "t-name" }, t.name),
              React.createElement("div", { className: "t-role" }, t.role),
            ),
          ),
        ),
      ),
    ),
  );
}

// CTA
function CTA() {
  const [ref, visible] = useReveal();
  return React.createElement(
    "div",
    { className: `cta-section reveal-section${visible ? ' in-view' : ''}`, ref },
    React.createElement(
      "div",
      { className: "cta-inner" },
      React.createElement(
        "h2",
        { className: "cta-title" },
        "Ready to Find Your Next Home?",
      ),
      React.createElement(
        "p",
        { className: "cta-sub" },
        "Join thousands of verified users discovering trusted properties in Sta. Maria, Bulacan",
      ),
      React.createElement(
        "div",
        { className: "cta-btns" },
        React.createElement(
          "button",
          {
            className: "cta-btn-white",
            onClick: () => (window.location.href = "auth/signup.html"),
          },
          "Sign Up as Buyer",
        ),
        React.createElement(
          "button",
          {
            className: "cta-btn-ghost",
            onClick: () => (window.location.href = "auth/signup.html"),
          },
          "List Your Property",
        ),
      ),
    ),
  );
}

// Footer
function Footer() {
  const platformLinks = ["Browse Listings", "List Your Property", "About Us"];
  const supportLinks = ["Contact Us", "Report a Listing"];
  const legalLinks = ["Privacy Policy", "Terms of Service"];

  return React.createElement(
    "footer",
    null,
    React.createElement(
      "div",
      { className: "footer-grid" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "footer-logo" },
          React.createElement("img", {
            src: LOGO_SRC,
            alt: "HomeSure",
            height: 28,
            style: { display: "block" },
          }),
          "HomeSure",
        ),
        React.createElement(
          "p",
          { className: "footer-tagline" },
          "A verified housing platform for secure property rentals and purchases in Sta. Maria, Bulacan.",
        ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "footer-col-title" },
          "Platform",
        ),
        ...platformLinks.map((l) =>
          React.createElement(
            "a",
            {
              key: l,
              className: "footer-link",
              href: l === "About Us" ? "about.html" : "#",
            },
            l,
          ),
        ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "footer-col-title" },
          "Support",
        ),
        ...supportLinks.map((l) =>
          React.createElement(
            "a",
            { key: l, className: "footer-link", href: "#" },
            l,
          ),
        ),
      ),
      React.createElement(
        "div",
        null,
        React.createElement("div", { className: "footer-col-title" }, "Legal"),
        ...legalLinks.map((l) =>
          React.createElement(
            "a",
            {
              key: l,
              className: "footer-link",
              href: l === "Privacy Policy" ? "privacy-policy.html" : "terms.html",
            },
            l,
          ),
        ),
      ),
    ),
    React.createElement("div", { className: "footer-divider" }),
    React.createElement(
      "div",
      { className: "footer-copy" },
      "© 2026 HomeSure. All rights reserved.",
    ),
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────

function App() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Navbar),
    React.createElement(Hero),
    React.createElement(HowItWorks),
    React.createElement(Features),
    React.createElement(Stats),
    React.createElement(Testimonials),
    React.createElement(CTA),
    React.createElement(Footer),
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
