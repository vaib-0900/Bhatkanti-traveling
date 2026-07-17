import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../componant/Header'
import Footer from '../componant/Footer'

// ===================== Package master data =====================
// NOTE: In production this should live in one shared file and be imported
// by both TourPackages.jsx and this page (or fetched from an API by id).
const PACKAGES = [
  {
    id: 1,
    name: 'Sinhagad Fort Trek',
    place: 'Pune, Maharashtra',
    category: 'Trekking',
    duration: '1 Day',
    rating: '4.7',
    reviews: 128,
    price: 999,
    oldPrice: 1499,
    tag: 'Popular',
    img: 'https://i.pinimg.com/736x/0e/b2/19/0eb219593e7827dd3f17a2a0437de8af.jpg',
    gallery: [
      'https://historicalthings.com/wp-content/uploads/2022/11/Singhgad.jpg',
      'https://i.ytimg.com/vi/KpkiH7JLkLg/maxresdefault.jpg',
      'https://explorewithsandeep.com/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-20-at-22.26.41_fcbad39f-1536x1152.jpg',
    ],
    about:
      "Climb one of the most iconic hill forts near Pune, steeped in Maratha history. An easy-to-moderate trek rewarded with sweeping valley views, cool breeze, and a taste of Pune's favourite weekend escape.",
    highlights: ['Sunrise trek start', 'Local Kandi Pohe breakfast', 'Fort history walkthrough', 'Certified trek guide'],
    itinerary: [
      { title: 'Assemble & Drive to Base', desc: 'Meet at Pune Station at 5:30 AM, drive to Sinhagad base village.' },
      { title: 'The Climb', desc: 'Guided ascent through the old stone steps, photo stops along the way.' },
      { title: 'Summit & Breakfast', desc: 'Reach the top, explore the fort ruins, enjoy hot pithla-bhakri and pohe.' },
      { title: 'Descend & Return', desc: 'Trek back down and drive back to Pune, arriving by early afternoon.' },
    ],
    inclusions: ['Transport from Pune', 'Trek guide', 'Breakfast', 'First-aid kit'],
    exclusions: ['Personal expenses', 'Trekking shoes/gear', 'Anything not mentioned in inclusions'],
    thingsToCarry: ['Trekking shoes', '1L water bottle', 'Cap & sunscreen', 'Small backpack'],
  },
  {
    id: 2,
    name: 'Goa Beach Getaway',
    place: 'Goa',
    category: 'Beach',
    duration: '4 Days / 3 Nights',
    rating: '4.8',
    reviews: 246,
    price: 8999,
    oldPrice: 11999,
    tag: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80',
    gallery: [
      'https://wallpapers.com/images/hd/goa-beach-pictures-okd0v8te136nr4ev.jpg',
      'https://marquishotels.in/wp-content/uploads/2019/06/North_Goa_Beach.jpg',
      'https://www.tusktravel.com/blog/wp-content/uploads/2022/02/Goa.jpg',
    ],
    about:
      'Sun, sand and sundowners — a relaxed 4-day escape covering both the buzzing shacks of North Goa and the quiet shores of the south, with just enough sightseeing to break up the beach time.',
    highlights: ['Beachfront stay', 'North & South Goa covered', 'Sunset cruise', 'Free breakfast daily'],
    itinerary: [
      { title: 'Arrival & Baga Beach', desc: 'Check in, evening free at Baga/Calangute, welcome dinner at a beach shack.' },
      { title: 'North Goa Sightseeing', desc: 'Fort Aguada, Chapora Fort, Anjuna flea market (seasonal) and Vagator sunset point.' },
      { title: 'South Goa & Cruise', desc: 'Visit Old Goa churches, Colva beach, evening Mandovi river sunset cruise.' },
      { title: 'Leisure & Departure', desc: 'Free morning for water sports or shopping, check out post breakfast.' },
    ],
    inclusions: ['3 nights beachfront stay', 'Daily breakfast', 'Airport transfers', 'Sightseeing by private cab', 'Sunset cruise ticket'],
    exclusions: ['Flights', 'Lunch & dinner (except Day 1)', 'Water sports charges', 'Personal expenses'],
    thingsToCarry: ['Swimwear', 'Sunscreen', 'Sunglasses', 'Comfortable slippers', 'ID proof'],
  },
  {
    id: 3,
    name: 'Mahabaleshwar Hills Escape',
    place: 'Satara, Maharashtra',
    category: 'Hill Station',
    duration: '2 Days / 1 Night',
    rating: '4.6',
    reviews: 164,
    price: 4499,
    oldPrice: 5999,
    tag: null,
    img: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=700&q=80',
    gallery: [
      '/assets/img/IMG-20260711-WA0006.jpg.jpeg',
      'https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2019/08/Mahabaleshwar-in-Monsoon.jpg',
      'https://www.traveltwilight.com/wp-content/uploads/2020/12/GOPR3836.jpg ',
    ],
    about:
      'A quick, refreshing weekend up in the Sahyadri hills — strawberry farms, misty viewpoints and Mapro treats, perfect for a short reset from the city.',
    highlights: ['Strawberry farm visit', 'Sunset at Elphinstone Point', 'Mapro Garden stop', 'Comfortable hillside stay'],
    itinerary: [
      { title: 'Arrival & Local Sightseeing', desc: 'Drive from Pune/Mumbai, visit Pratapgad Fort and Mapro Garden en route.' },
      { title: 'Point Hopping & Departure', desc: "Morning visit to Arthur's Seat, Elphinstone & Kate's Point, strawberry farm stop, then head back." },
    ],
    inclusions: ['1 night stay', 'Breakfast', 'Private cab for sightseeing', 'Toll & parking'],
    exclusions: ['Lunch & dinner', 'Entry tickets at points/farms', 'Personal expenses'],
    thingsToCarry: ['Light jacket', 'Comfortable shoes', 'Power bank', 'ID proof'],
  },
  {
    id: 4,
    name: 'Lonavala Monsoon Special',
    place: 'Pune, Maharashtra',
    category: 'Hill Station',
    duration: '2 Days / 1 Night',
    rating: '4.5',
    reviews: 142,
    price: 3999,
    oldPrice: 4999,
    tag: null,
    img: 'https://i.pinimg.com/736x/4d/c4/6f/4dc46fc494eb775d263aced9a5953b2f.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1589286875480-743411b84f53?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MDcyOTl8MHwxfHNlYXJjaHwxfHxMb25hdmFsYXxlbnwwfDB8fHwxNzM5NTkwOTA5fDA&ixlib=rb-4.0.3&q=85',
      'https://xploringdestinations.com/wp-content/uploads/2022/04/Lonavala-Hill-Station-1.jpg',
      'https://oneday.travel/wp-content/uploads/one-day-pune-to-lonavala-sightseeing-tour-package-private-cab-header-1.jpg',
    ],
    about:
      "Waterfalls, mist-covered valleys and hot bhutta by the road — this monsoon special covers Lonavala and Khandala's best viewpoints and the famous Bhushi Dam.",
    highlights: ['Bhushi Dam visit', 'Waterfall points', "Tiger's Point sunset", 'Local Chikki shopping'],
    itinerary: [
      { title: 'Arrival & Bhushi Dam', desc: 'Check in, head to Bhushi Dam and Lonavala Lake in the evening.' },
      { title: 'Viewpoints & Departure', desc: "Visit Tiger's Point and Duke's Nose viewpoint, chikki shopping, then depart." },
    ],
    inclusions: ['1 night stay', 'Breakfast', 'Private cab for sightseeing'],
    exclusions: ['Lunch & dinner', 'Entry fees', 'Personal expenses'],
    thingsToCarry: ['Raincoat/umbrella', 'Extra pair of clothes', 'Waterproof footwear', 'ID proof'],
  },
  {
    id: 5,
    name: 'Kerala Backwaters Tour',
    place: 'Alleppey, Kerala',
    category: 'Beach',
    duration: '5 Days / 4 Nights',
    rating: '4.9',
    reviews: 312,
    price: 14999,
    oldPrice: 18999,
    tag: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=80',
    gallery: [
      'https://i.pinimg.com/1200x/a6/8f/c1/a68fc119d8f9064235f401b163483ac0.jpg',
      'https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2016/06/Munnar.jpg',
      'https://www.media4news.com/wp-content/uploads/2014/09/backwaters-in-Kerala.jpg',
    ],
    about:
      "God's Own Country at its calmest — glide through palm-fringed canals on a private houseboat, unwind on Kerala's beaches, and slow down completely for five days.",
    highlights: ['Private houseboat night stay', 'Kumarakom bird sanctuary', 'Alleppey beach sunset', 'Authentic Kerala Sadhya meal'],
    itinerary: [
      { title: 'Arrival in Kochi', desc: 'Airport pickup, evening at leisure exploring Fort Kochi.' },
      { title: 'Kochi to Alleppey', desc: 'Drive to Alleppey, board your private houseboat by noon, cruise through the backwaters.' },
      { title: 'Houseboat to Kumarakom', desc: 'Onboard breakfast, cruise to Kumarakom, visit the bird sanctuary.' },
      { title: 'Alleppey Beach Day', desc: 'Check into a beach resort, relax by the shore, sunset at Alleppey beach.' },
      { title: 'Departure', desc: 'Breakfast at leisure, transfer back to Kochi airport.' },
    ],
    inclusions: ['1 night houseboat stay (all meals onboard)', '3 nights hotel stay', 'Daily breakfast', 'Airport transfers', 'Sightseeing as per itinerary'],
    exclusions: ['Flights', 'Lunch & dinner outside houseboat', 'Entry tickets', 'Personal expenses'],
    thingsToCarry: ['Light cotton clothing', 'Mosquito repellent', 'Sunscreen', 'Comfortable sandals', 'ID proof'],
  },
  {
    id: 6,
    name: 'Rajasthan Royal Heritage',
    place: 'Jaipur, Rajasthan',
    category: 'Heritage',
    duration: '6 Days / 5 Nights',
    rating: '4.7',
    reviews: 198,
    price: 17999,
    oldPrice: 21999,
    tag: null,
    img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=700&q=80',
    gallery: [
      'https://static.vecteezy.com/system/resources/previews/011/084/232/non_2x/full-picture-of-hawa-mahal-of-rajasthan-photo.jpg',
      'https://etimg.etb2bimg.com/photo/96361312.cms',
      'https://www.goldentrianglesindia.com/assets/img/packages/slider/1754906927_bfYjCU.webp',
    ],
    about:
      'Forts, palaces and desert royalty — a classic circuit through Jaipur, Jodhpur and Udaipur covering the grandest heritage sites of Rajasthan, with heritage-hotel stays along the way.',
    highlights: ['Amber Fort with elephant ride', 'Mehrangarh Fort, Jodhpur', 'Lake Pichola boat ride, Udaipur', 'Heritage hotel stays'],
    itinerary: [
      { title: 'Arrival in Jaipur', desc: 'Check in, evening visit to local bazaars for a taste of Jaipur.' },
      { title: 'Jaipur Sightseeing', desc: 'Amber Fort, City Palace, Hawa Mahal and Jantar Mantar.' },
      { title: 'Drive to Jodhpur', desc: 'Road journey to the Blue City, evening at leisure.' },
      { title: 'Jodhpur Sightseeing', desc: 'Mehrangarh Fort, Jaswant Thada, and the old city market.' },
      { title: 'Drive to Udaipur', desc: 'Travel to the City of Lakes, evening Lake Pichola boat ride.' },
      { title: 'Udaipur & Departure', desc: 'Visit City Palace, Saheliyon-ki-Bari, then transfer to airport/station.' },
    ],
    inclusions: ['5 nights heritage-style hotel stay', 'Daily breakfast', 'All inter-city transfers by AC vehicle', 'Sightseeing as per itinerary', 'Elephant/jeep ride at Amber Fort'],
    exclusions: ['Flights/train fares', 'Lunch & dinner', 'Monument entry fees', 'Personal expenses'],
    thingsToCarry: ['Comfortable walking shoes', 'Sunglasses & cap', 'Light stole/scarf', 'ID proof'],
  },
  {
    id: 7,
    name: 'Ladakh Bike Expedition',
    place: 'Leh, Ladakh',
    category: 'Adventure',
    duration: '7 Days / 6 Nights',
    rating: '4.9',
    reviews: 176,
    price: 24999,
    oldPrice: 29999,
    tag: 'Popular',
    img: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=700&q=80',
    gallery: [
      'https://video.gumlet.io/6898677fc34d4aa0c864379a/69609523195f98d9e15ada21/thumbnail-1-0.png?v=1767937342425',
      'https://d22eux7aqicogj.cloudfront.net/assets/hero-sliders/ladakh-high-on-the-himalayas.jpg',
      'https://endeavorladakh.com/wp-content/uploads/2025/07/photo-spot-ladakh.jpg',
    ],
    about:
      "The ultimate high-altitude motorcycle expedition — Khardung La, Pangong Lake and Nubra Valley on a well-serviced Royal Enfield, with backup vehicle support throughout.",
    highlights: ['Royal Enfield with fuel & backup vehicle', 'Khardung La summit ride', 'Pangong Lake camping', 'Acclimatisation day built in'],
    itinerary: [
      { title: 'Arrival & Acclimatisation', desc: 'Arrive in Leh, rest and acclimatise to the altitude, local market visit in the evening.' },
      { title: 'Leh Local Sightseeing', desc: 'Shanti Stupa, Leh Palace and Magnetic Hill, bike handover and briefing.' },
      { title: 'Leh to Nubra Valley', desc: "Ride via Khardung La, one of the world's highest motorable passes, overnight in Nubra." },
      { title: 'Nubra to Pangong Lake', desc: 'Ride via Shyok route to the stunning Pangong Lake, overnight camping by the lake.' },
      { title: 'Pangong to Leh', desc: 'Scenic ride back via Chang La pass, evening at leisure in Leh.' },
      { title: 'Buffer / Local Exploration', desc: 'Rest day or optional ride to Sangam point and Hall of Fame.' },
      { title: 'Departure', desc: 'Bike drop-off and transfer to Leh airport.' },
    ],
    inclusions: ['6 nights stay (hotel + camping)', 'Royal Enfield rental with fuel', 'Backup support vehicle', 'Daily breakfast & dinner', 'Riding gear (helmet, jacket)'],
    exclusions: ['Flights to/from Leh', 'Lunch', 'Inner line permit charges', 'Personal expenses', 'Fuel beyond planned route'],
    thingsToCarry: ['Riding jacket & gloves', 'Warm layers', 'Valid driving license', 'Sunscreen & lip balm', 'Personal medication'],
  },
  {
    id: 8,
    name: 'Kashmir Valley Dreams',
    place: 'Srinagar, Kashmir',
    category: 'Hill Station',
    duration: '5 Days / 4 Nights',
    rating: '4.8',
    reviews: 221,
    price: 19999,
    oldPrice: 24999,
    tag: null,
    img: 'https://i.pinimg.com/1200x/61/03/8b/61038b9d0d4199a7e43f9a159883a555.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1566837497312-7be7830ae9b1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D',
      'https://res.cloudinary.com/jerrick/image/upload/v1744105776/67f4f1305ee26c001c594133.jpg',
      'https://assets.musafir.com/in/Kashmir_a_Land_of_Unimaginable_Beauty_4_01166904af.webp',
    ],
    about:
      "Paradise on Earth, done right — a houseboat night on Dal Lake, the meadows of Gulmarg and Pahalgam's riverside views, at an easy, unhurried pace.",
    highlights: ['Houseboat stay on Dal Lake', 'Gulmarg gondola ride', 'Pahalgam valley drive', 'Shikara sunset ride'],
    itinerary: [
      { title: 'Arrival in Srinagar', desc: 'Airport pickup, check into houseboat, evening Shikara ride on Dal Lake.' },
      { title: 'Gulmarg Excursion', desc: 'Day trip to Gulmarg, optional gondola (cable car) ride for valley views.' },
      { title: 'Pahalgam Excursion', desc: 'Drive to Pahalgam, visit Betaab Valley and Aru Valley.' },
      { title: 'Srinagar Local Sightseeing', desc: 'Mughal Gardens — Nishat Bagh and Shalimar Bagh, local handicraft market.' },
      { title: 'Departure', desc: 'Breakfast at leisure, transfer to airport.' },
    ],
    inclusions: ['1 night houseboat + 3 nights hotel', 'Daily breakfast', 'Airport transfers', 'Sightseeing by private cab', 'Shikara ride'],
    exclusions: ['Flights', 'Lunch & dinner', 'Gondola/cable car tickets', 'Personal expenses'],
    thingsToCarry: ['Warm jacket', 'Comfortable walking shoes', 'Woollen cap & gloves', 'ID proof'],
  },
  {
    id: 9,
    name: 'Harihar Fort Adventure Trek',
    place: 'Nashik, Maharashtra',
    category: 'Trekking',
    duration: '1 Day',
    rating: '4.6',
    reviews: 96,
    price: 1299,
    oldPrice: 1799,
    tag: null,
    img: 'https://vl-prod-static.b-cdn.net/system/images/000/704/237/eff5c6e94ef9941063e146d30452696f/original/CTKJxaBo0O0.jpg',
    gallery: [
      'https://vl-prod-static.b-cdn.net/system/images/000/704/237/eff5c6e94ef9941063e146d30452696f/original/CTKJxaBo0O0.jpg',
      'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=700&q=80',
    ],
    about:
      "One of Maharashtra's most photographed treks — famous for its near-vertical, carved rock-cut steps. A thrilling day trek for those who want a real adrenaline rush.",
    highlights: ['Iconic carved-step climb', 'Certified trek leader', 'Small group size', 'Breakfast & snacks included'],
    itinerary: [
      { title: 'Assemble & Drive to Base', desc: 'Meet at Nashik at 4:30 AM, drive to Nirgudpada base village.' },
      { title: 'The Climb', desc: 'Guided ascent up the famous vertical rock-cut staircase, safety gear provided at exposed sections.' },
      { title: 'Summit & Breakfast', desc: 'Reach the fort top, enjoy panoramic Sahyadri views and packed breakfast.' },
      { title: 'Descend & Return', desc: 'Careful descent and drive back to Nashik by evening.' },
    ],
    inclusions: ['Transport from Nashik', 'Trek guide', 'Safety gear at difficult sections', 'Breakfast & snacks', 'First-aid kit'],
    exclusions: ['Personal expenses', 'Trekking shoes/gear', 'Anything not mentioned in inclusions'],
    thingsToCarry: ['Trekking shoes with good grip', '1.5L water bottle', 'Gloves', 'Small backpack', 'Energy bars'],
  },
]

const FALLBACK = {
  name: 'Tour Package',
  place: 'India',
  category: 'Travel',
  duration: '—',
  rating: '4.7',
  reviews: 100,
  price: 4999,
  oldPrice: 6999,
  tag: null,
  img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=700&q=80',
  ],
  about: 'A handpicked getaway designed to take the planning off your hands, so all that is left to do is show up and enjoy.',
  highlights: ['Handpicked stays', 'Private transport', 'Local expert guide', '24x7 support on trip'],
  itinerary: [
    { title: 'Arrival', desc: 'Arrive at the destination, check in and settle at your stay.' },
    { title: 'Exploration', desc: 'Full day covering the must-see spots with your local guide.' },
    { title: 'Leisure Day', desc: 'A relaxed day to explore at your own pace or add an optional activity.' },
    { title: 'Departure', desc: 'Check out after breakfast and head back with a bag full of memories.' },
  ],
  inclusions: ['Stay', 'Breakfast', 'Private transport', 'Sightseeing as per itinerary'],
  exclusions: ['Flights/train tickets', 'Personal expenses', 'Anything not mentioned in inclusions'],
  thingsToCarry: ['Comfortable footwear', 'ID proof', 'Personal medication', 'Camera'],
}

const TABS = ['Overview', 'Itinerary', 'Inclusions', 'Things to Carry']

const TourPackageDetails = () => {
  const { id } = useParams ? useParams() : { id: undefined }
  const pkg = PACKAGES.find((p) => String(p.id) === String(id)) || FALLBACK

  const [activeTab, setActiveTab] = useState('Overview')
  const [activeImg, setActiveImg] = useState(pkg.gallery[0])
  const [guests, setGuests] = useState(2)
  const [date, setDate] = useState('')

  const total = pkg.price * guests

  return (
    <>
      <Header />
      <main className="main" id="top">

        {/* ===================== Breadcrumb ===================== */}

 <section className="bhk-tp-banner mt-7">
          <img
            className="bhk-banner-img"
            src="https://i.pinimg.com/1200x/85/62/a8/8562a863b19d2075eb119f1a22044bfe.jpg"
            alt="Scenic travel destination"
          />
          <div className="bhk-banner-overlay" />
          <div className="container position-relative text-center">
            <h1>Tour Packages Details</h1>
            <p className="mb-0">
              <span>Home</span> <span className="sep">/</span> <span className="active">Tour Packages</span>/
               <span className="active">{pkg.name}</span>
            </p>    
          </div>
        </section>


        {/* ===================== Gallery ===================== */}
        <section className="bhk-pd-gallery">
          <div className="container">
            <div className="bhk-pd-gallery-main">
              <img src={activeImg} alt={pkg.name} />
              {pkg.tag && <span className="bhk-pd-tag">{pkg.tag}</span>}
            </div>
            <div className="bhk-pd-thumbs">
              {pkg.gallery.map((src, i) => (
                <button
                  key={i}
                  className={'bhk-pd-thumb' + (activeImg === src ? ' active' : '')}
                  onClick={() => setActiveImg(src)}
                >
                  <img src={src} alt={`${pkg.name} ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== Main content ===================== */}
        <section className="bhk-pd-body">
          <div className="container">
            <div className="bhk-pd-layout">

              {/* ---------- Left column ---------- */}
              <div className="bhk-pd-left">
                <span className="bhk-pd-cat">{pkg.category}</span>
                <h1 className="bhk-pd-title">{pkg.name}</h1>

                <div className="bhk-pd-meta">
                  <span className="bhk-pd-place">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f5581f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {pkg.place}
                  </span>
                  <span className="bhk-pd-duration">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                    {pkg.duration}
                  </span>
                  <span className="bhk-pd-rating">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#f5a623" stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z" />
                    </svg>
                    {pkg.rating} <span className="muted">({pkg.reviews} reviews)</span>
                  </span>
                </div>

                <p className="bhk-pd-about">{pkg.about}</p>

                {/* Highlights */}
                <div className="bhk-pd-highlights">
                  {pkg.highlights.map((h, i) => (
                    <div className="bhk-pd-highlight" key={i}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f4d3d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {h}
                    </div>
                  ))}
                </div>

                {/* Tabs */}
                <div className="bhk-pd-tabs">
                  {TABS.map((t) => (
                    <button
                      key={t}
                      className={'bhk-pd-tab-btn' + (activeTab === t ? ' active' : '')}
                      onClick={() => setActiveTab(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="bhk-pd-tab-panel">
                  {activeTab === 'Overview' && (
                    <p className="bhk-pd-about">{pkg.about} Every trip is planned by our local travel experts and can be tailored to your pace, so you spend less time coordinating logistics and more time actually being there.</p>
                  )}

                  {activeTab === 'Itinerary' && (
                    <div className="bhk-pd-itinerary">
                      {pkg.itinerary.map((step, i) => (
                        <div className="bhk-pd-step" key={i}>
                          <div className="bhk-pd-step-marker">
                            <span>{String(i + 1).padStart(2, '0')}</span>
                            {i !== pkg.itinerary.length - 1 && <div className="bhk-pd-step-line" />}
                          </div>
                          <div className="bhk-pd-step-body">
                            <h6>{step.title}</h6>
                            <p>{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'Inclusions' && (
                    <div className="bhk-pd-inc-exc">
                      <div>
                        <h6 className="bhk-pd-inc-h">What's included</h6>
                        <ul className="bhk-pd-inc-list included">
                          {pkg.inclusions.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h6 className="bhk-pd-inc-h">What's not included</h6>
                        <ul className="bhk-pd-inc-list excluded">
                          {pkg.exclusions.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Things to Carry' && (
                    <ul className="bhk-pd-carry-list">
                      {pkg.thingsToCarry.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  )}
                </div>
              </div>

              {/* ---------- Right column: booking card ---------- */}
              <aside className="bhk-pd-right">
                <div className="bhk-pd-book-card">
                  <div className="bhk-pd-book-price">
                    <span className="bhk-pd-old">₹{pkg.oldPrice.toLocaleString('en-IN')}</span>
                    <div>
                      <span className="bhk-pd-price">₹{pkg.price.toLocaleString('en-IN')}</span>
                      <span className="bhk-pd-per">/ person</span>
                    </div>
                  </div>

                  <label className="bhk-pd-label">Travel date</label>
                  <input
                    type="date"
                    className="bhk-pd-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />

                  <label className="bhk-pd-label">Guests</label>
                  <div className="bhk-pd-guests">
                    <button onClick={() => setGuests((g) => Math.max(1, g - 1))} aria-label="Decrease guests">−</button>
                    <span>{guests}</span>
                    <button onClick={() => setGuests((g) => g + 1)} aria-label="Increase guests">+</button>
                  </div>

                  <div className="bhk-pd-total">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>

                  <button className="bhk-pd-book-btn">Book Now</button>
                  <a href="/contact" className="bhk-pd-enquire-btn">Enquire Instead</a>

                  <p className="bhk-pd-note">Free cancellation up to 48 hours before the trip.</p>
                </div>
              </aside>

            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`

        /* Banner */
        .bhk-tp-banner {
          position: relative;
          overflow: hidden;
          padding: 7rem 0 3.5rem;
          min-height: 300px;
          display: flex;
          align-items: center;
        }
        .bhk-banner-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .bhk-banner-overlay {
          position: absolute;
          inset: 0;
          
          z-index: 0;
        }
        .bhk-tp-banner .container { z-index: 1; }
        .bhk-tp-banner h1 {
          color: #fff;
          font-weight: 700;
          font-size: 2.6rem;
          margin-bottom: 0.6rem;
        }
        .bhk-tp-banner p { color: rgba(255,255,255,0.7); font-size: 0.95rem; }
        .bhk-tp-banner .active { color: #f5a623; font-weight: 600; }
        .bhk-tp-banner .sep { margin: 0 6px; }

        .bhk-pd-breadcrumb { padding: 6.5rem 0 1rem; }
        .bhk-pd-breadcrumb p { font-size: 0.9rem; color: #6b7280; }
        .bhk-pd-breadcrumb .active { color: #f5581f; font-weight: 600; }
        .bhk-pd-breadcrumb .sep { margin: 0 6px; }

        /* Gallery */
        .bhk-pd-gallery { padding-bottom: 1.5rem; }
        .bhk-pd-gallery-main {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 16 / 7;
        }
        .bhk-pd-gallery-main img { width: 100%; height: 100%; object-fit: cover; }
        .bhk-pd-tag {
          position: absolute; top: 16px; left: 16px;
          background: #f5581f; color: #fff; font-size: 0.78rem; font-weight: 700;
          padding: 5px 14px; border-radius: 20px;
        }
        .bhk-pd-thumbs { display: flex; gap: 0.75rem; margin-top: 0.75rem; }
        .bhk-pd-thumb {
          border: 2px solid transparent; border-radius: 10px; overflow: hidden;
          width: 90px; height: 65px; padding: 0; flex-shrink: 0; opacity: 0.7;
          transition: all 0.2s ease; background: none;
        }
        .bhk-pd-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .bhk-pd-thumb.active, .bhk-pd-thumb:hover { opacity: 1; border-color: #1f4d3d; }

        /* Layout */
        .bhk-pd-body { padding: 1.5rem 0 4.5rem; }
        .bhk-pd-layout { display: grid; grid-template-columns: 1fr 340px; gap: 2.5rem; align-items: start; }

        .bhk-pd-cat {
          display: inline-block; background: #eaf1ee; color: #1f4d3d;
          font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 20px;
          margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.03em;
        }
        .bhk-pd-title { font-weight: 700; font-size: 2rem; color: #1e1e1e; margin-bottom: 0.75rem; }
        .bhk-pd-meta { display: flex; flex-wrap: wrap; gap: 1.25rem; margin-bottom: 1.25rem; }
        .bhk-pd-meta > span { display: flex; align-items: center; gap: 6px; font-size: 0.88rem; font-weight: 600; color: #374151; }
        .bhk-pd-meta .muted { font-weight: 400; color: #9ca3af; }
        .bhk-pd-about { color: #4b5563; line-height: 1.7; margin-bottom: 1.5rem; }

        .bhk-pd-highlights {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem 1.5rem;
          margin-bottom: 2rem; padding: 1.25rem; background: #f9faf9; border-radius: 14px;
        }
        .bhk-pd-highlight { display: flex; align-items: center; gap: 8px; font-size: 0.88rem; font-weight: 600; color: #1e1e1e; }

        .bhk-pd-tabs { display: flex; gap: 0.5rem; border-bottom: 1px solid #eee; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .bhk-pd-tab-btn {
          background: none; border: none; padding: 0.7rem 0.25rem; margin-right: 1.25rem;
          font-size: 0.9rem; font-weight: 600; color: #9ca3af; border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
        }
        .bhk-pd-tab-btn.active, .bhk-pd-tab-btn:hover { color: #1f4d3d; border-color: #f5581f; }

        /* Itinerary */
        .bhk-pd-step { display: flex; gap: 1rem; }
        .bhk-pd-step-marker { display: flex; flex-direction: column; align-items: center; }
        .bhk-pd-step-marker span {
          width: 34px; height: 34px; border-radius: 50%; background: #1f4d3d; color: #fff;
          display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
        }
        .bhk-pd-step-line { width: 2px; flex: 1; background: #e5e7eb; margin: 4px 0; }
        .bhk-pd-step-body { padding-bottom: 1.75rem; }
        .bhk-pd-step-body h6 { font-weight: 700; color: #1e1e1e; margin-bottom: 0.25rem; }
        .bhk-pd-step-body p { color: #6b7280; font-size: 0.9rem; margin: 0; }

        /* Inclusions */
        .bhk-pd-inc-exc { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .bhk-pd-inc-h { font-weight: 700; color: #1e1e1e; margin-bottom: 0.75rem; }
        .bhk-pd-inc-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; }
        .bhk-pd-inc-list li { font-size: 0.88rem; color: #4b5563; padding-left: 1.5rem; position: relative; }
        .bhk-pd-inc-list.included li::before { content: '✓'; position: absolute; left: 0; color: #1f4d3d; font-weight: 700; }
        .bhk-pd-inc-list.excluded li::before { content: '✕'; position: absolute; left: 0; color: #d1483a; font-weight: 700; }
        .bhk-pd-carry-list { padding-left: 1.25rem; color: #4b5563; font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.5rem; }

        /* Booking card */
        .bhk-pd-right { position: sticky; top: 100px; }
        .bhk-pd-book-card {
          background: #fff; border-radius: 16px; box-shadow: 0 12px 32px rgba(0,0,0,0.08);
          padding: 1.5rem; border: 1px solid #f0f0f0;
        }
        .bhk-pd-book-price { display: flex; flex-direction: column; margin-bottom: 1.25rem; }
        .bhk-pd-old { font-size: 0.8rem; color: #9ca3af; text-decoration: line-through; }
        .bhk-pd-price { font-size: 1.6rem; font-weight: 700; color: #1f4d3d; }
        .bhk-pd-per { font-size: 0.8rem; color: #9ca3af; margin-left: 4px; }

        .bhk-pd-label { display: block; font-size: 0.78rem; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: 0.4rem; margin-top: 1rem; }
        .bhk-pd-input {
          width: 100%; border: 1px solid #e5e7eb; border-radius: 8px; padding: 0.55rem 0.75rem; font-size: 0.9rem; color: #1e1e1e;
        }
        .bhk-pd-guests { display: flex; align-items: center; gap: 1rem; }
        .bhk-pd-guests button {
          width: 34px; height: 34px; border-radius: 8px; border: 1px solid #e5e7eb; background: #fff;
          font-size: 1.1rem; font-weight: 700; color: #1f4d3d; cursor: pointer;
        }
        .bhk-pd-guests button:hover { border-color: #1f4d3d; }
        .bhk-pd-guests span { font-weight: 700; font-size: 1rem; min-width: 20px; text-align: center; }

        .bhk-pd-total {
          display: flex; justify-content: space-between; align-items: center;
          margin: 1.25rem 0; padding-top: 1rem; border-top: 1px solid #f0f0f0;
          font-weight: 700; color: #1e1e1e; font-size: 1rem;
        }

        .bhk-pd-book-btn {
          width: 100%; background: #f5581f; color: #fff; border: none; font-weight: 700;
          padding: 0.85rem; border-radius: 10px; font-size: 0.95rem; cursor: pointer; transition: background 0.2s ease;
        }
        .bhk-pd-book-btn:hover { background: #d8481a; }
        .bhk-pd-enquire-btn {
          display: block; text-align: center; margin-top: 0.6rem; padding: 0.75rem;
          border: 1px solid #1f4d3d; color: #1f4d3d; font-weight: 700; border-radius: 10px;
          text-decoration: none; font-size: 0.9rem; transition: all 0.2s ease;
        }
        .bhk-pd-enquire-btn:hover { background: #1f4d3d; color: #fff; }
        .bhk-pd-note { text-align: center; font-size: 0.75rem; color: #9ca3af; margin: 0.9rem 0 0; }

        @media (max-width: 991px) {
          .bhk-pd-layout { grid-template-columns: 1fr; }
          .bhk-pd-right { position: static; }
          .bhk-pd-inc-exc { grid-template-columns: 1fr; gap: 1.5rem; }
        }
        @media (max-width: 575px) {
          .bhk-pd-title { font-size: 1.5rem; }
          .bhk-pd-highlights { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}

export default TourPackageDetails
