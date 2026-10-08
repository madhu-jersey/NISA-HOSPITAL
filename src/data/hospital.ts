// ============================================================
// NISA HOSPITAL — Centralized Data Configuration
// Eye Care · Women & Child Care · Tanuku, Andhra Pradesh
// ============================================================

export const hospital = {
  name: 'Nisa Hospital',
  shortName: 'Nisa',
  tagline: 'Eye Care • Women & Child Care',
  location: 'Tanuku, Andhra Pradesh',
  yearsOfTrust: 16,
  aboutDescription:
    'Nisa Hospital in Tanuku brings together specialised care for eyes, women and children in a patient-focused healthcare environment. With 16 years of trusted healthcare, our dedicated specialists provide compassionate care for your family.',

  // ── Hospital contact numbers ──
  phone: '09885225123',
  phoneMobile: '+91 92467 44123',

  address: 'Tanuku, Andhra Pradesh',
  hours: 'Open 24/7 (Including Sundays)',
  // Verified listing: "Nisa Hospital | Eye Care, Woman & Child Care." (Tanuku)
  googleMapsUrl: 'https://maps.app.goo.gl/QQS9v6KY2WY4EnKv8',
  googleReviewsUrl: 'https://maps.app.goo.gl/QQS9v6KY2WY4EnKv8',
  // Coordinates taken from the verified listing above.
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=16.756136,81.6827284',
  googleMapsEmbedUrl: 'https://www.google.com/maps?q=16.756136,81.6827284&z=17&hl=en&output=embed',

  // ── Real photographs ──
  heroImage: '/nisa-building.webp',
  aboutImage: '',
};

// ── Services, grouped by care area ──
export const serviceCategories = [
  {
    name: 'Eye Care / Ophthalmology',
    icon: 'eye',
    items: [
      'Ophthalmology Consultations',
      'Cataract Operations',
      'Phaco Surgery',
      'Refractive Surgery',
      'Cornea-related Care',
      'Cornea & Anterior Segment Care',
    ],
  },
  {
    name: "Women's Health / Obstetrics & Gynaecology",
    icon: 'heart',
    items: [
      'Obstetrical & Gynaecology Services',
      'Ultrasound Scan',
      'Infertility Treatment',
      'Electronic Foetal Monitoring',
      'Surgical Treatments by Laparoscopy',
      'Obstetric & Gynaecological Surgical Treatments',
    ],
  },
  {
    name: 'Paediatrics / Child Care',
    icon: 'baby',
    items: ['Paediatric Care', 'NICU', 'Centralized Oxygen Unit'],
  },
  {
    name: 'Insurance',
    icon: 'shield',
    items: ['Medical Insurance Facilities', 'Cashless Insurance Facilities'],
  },
];

// ── Doctors ──
// `image` is the doctor's photo in /public. If left empty, a monogram panel is shown.
export const doctors = [
  {
    name: 'Dr. Ayesha Khan Pathan',
    initials: 'AK',
    specialty: 'Consultant Obstetrician & Gynaecologist',
    qualification: 'M.B.B.S., M.S. (OBGYN), DMAS, FMAS , MBA in Healthcare Management (ICB, Hyderabad)',
    regNo: '58346',
    description: 'Compassionate care for women and families through every stage of life.',
    services: [
      'Obstetrical & Gynaecology Services',
      'Ultrasound Scan',
      'Infertility Treatment',
      'Electronic Foetal Monitoring',
      'Laparoscopic Surgical Treatments',
    ],
    badge: 'Obs & Gynae',
    image: '/dr-ayesha-khan-pathan.webp',
  },
  {
    name: 'Dr. Rashid Hussain',
    initials: 'RH',
    specialty: 'Consultant Paediatrician',
    qualification: 'M.B.B.S., D.C.H., D.N.B.',
    regNo: '62293',
    description: 'Gentle, attentive care for children and reassurance for families.',
    services: ['Paediatric Care', 'NICU', 'Child Healthcare'],
    badge: 'Paediatrics',
    image: '/dr-rashid-hussain.webp',
  },
  {
    name: 'Dr. Hussain Ahmed',
    initials: 'HA',
    specialty: 'Ophthalmologist',
    qualification: 'M.B.B.S., D.O.M.S.',
    regNo: '7459',
    description: 'Helping patients protect their vision with thoughtful, attentive eye care.',
    services: ['Ophthalmology', 'Eye Care', 'Cataract-related Care', 'Phaco-related Care'],
    badge: 'Eye Care',
    image: '/dr-hussain-ahmed.webp',
  },
];

export const trustCards = [
  {
    title: 'Specialist Care',
    description: 'Dedicated specialists in ophthalmology, obstetrics & gynaecology, and paediatrics.',
  },
  {
    title: 'Family-Focused Healthcare',
    description: 'Nisa Hospital is designed around the needs of women, children and families in Tanuku.',
  },
  {
    title: 'Patient-Centered Approach',
    description: "Every care decision is made with the patient's comfort and wellbeing at the centre.",
  },
  {
    title: 'Insurance Facilities',
    description: 'Medical insurance and cashless insurance facilities are available.',
  },
];

export const whyChooseUs = [
  {
    title: 'Specialist Care',
    description: 'Dedicated doctors in ophthalmology, obstetrics & gynaecology, and paediatrics.',
  },
  {
    title: 'Eye Care',
    description: 'Ophthalmology consultations, cataract and phaco surgery, and refractive surgery.',
  },
  {
    title: "Women's & Child Care",
    description: 'Healthcare designed around women, children and families in Tanuku.',
  },
  {
    title: 'Patient-Centered Care',
    description: 'Thoughtful consultations with your comfort and wellbeing at the centre.',
  },
  {
    title: 'Well-Trained & Compassionate Staff',
    description: 'Serving families in Tanuku with care they have trusted for 16 years.',
  },
];

export const patientJourney = [
  {
    title: 'Contact Nisa Hospital',
    description: 'Call the hospital to speak with our team about your visit.',
  },
  {
    title: 'Visit Nisa Hospital',
    description: 'Arrive at our hospital in Tanuku, where our team will welcome and guide you.',
  },
  {
    title: 'Consult Your Specialist',
    description: 'Meet your specialist for a thorough, compassionate consultation.',
  },
  {
    title: 'Continue Your Care',
    description: 'Follow-up care and guidance to support your ongoing wellbeing.',
  },
];

// ── Google Reviews ──
// ONLY genuine reviews copied word-for-word from the Nisa Hospital, Tanuku
// Google listing. Never paraphrase, edit or invent. Spelling, spacing and
// punctuation below are exactly as published on Google.
export const googleRating = { score: 4.2, count: 144 }; // as shown on the listing

export const googleReviews: Array<{
  name: string;
  rating: number; // 1–5
  date?: string; // as shown on Google
  text: string; // exact published text
}> = [
  {
    name: 'rafiya mohammed',
    rating: 5,
    date: 'a year ago',
    text: `Had very best Experience, Doctors and staf are very friendly supportive and caring felt very comfortable throughout my meternity journey.🫶🏻 Thank you so much for best treatment. Mainly Dr. Ayesha khan supported me alot I was very nervous, but she explained me everything very well and motivated me She is very friendly and perfect,Best Doctor.💗 Thank you so much Mam`,
  },
  {
    name: 'srihitha sri',
    rating: 5,
    date: '2 years ago',
    text: `Hi guys today I want to share my personal experience with Nisa hospital
Dr.Ayesha khan pathan GYNECOLOGIST,
She is the perfect example to be a doctor with a positive, friendly and encouraging attitude. That gave me strength for the entire pregnancy period . I did all my checkups from the 3rd month in nisa hospital. I was so tensed in the surgery room because it's my 1st delivery madam and the staff gave good support and confidence.Hussain Sir monitored my baby from the time I admitted the hospital till my discharge.we are blessed with a baby girl. Both me and my baby are doing good.I am so happy that I chose my delivery at NISA Hospital. I strongly recommend NISA hospital for maternity and baby care.`,
  },
  {
    name: 'Swathi Duddupudi',
    rating: 5,
    date: 'Edited 2 years ago',
    text: `I did all my checkups in hyderabad till 8th month I went to nisa hospital for check up and delivery in my 9th month.I was so tensed how the doctor will treat me because its my first delivery but after talking with Dr. Ayesha Khan mam I felt so happy and relaxed. She explained me everything in detail and went through all my scans reports and gave me a lot of confidence and positive attitude.Dr.Rashid Hussain Sir monitored my baby from the time I admitted the hospital till my discharge.we are blessed with a baby boy. Both me and my baby are doing good.I am so happy that I chose my delivery at NISA Hospital..I strongly recommend NISA hospital for maternity and baby care.`,
  },
  {
    name: 'Phanindra Vytla',
    rating: 5,
    date: '4 years ago',
    text: `My wife  was admitted for 1st delivery . We are blessed with baby  girl. Both mother and child health  is very good after  c section
My experience was awesome.  The services were excellent and everyone from the housekeeping to the nursing staff was very kind and helpful.  The doctors are amazing and give a lot of confidence and have a very positive outlook, Dr.  Ayesha madam always gives excellent advice during all scans and despite any ups and downs she handles the situation very well.  Dr. Ayesha  is definitely an amazing doctor and even for 20 minutes with her you will feel very relaxed and she will support you.  We are really grateful that you chose to deliver at NISA Hospital..
I suggest  for women and childcare is best  hospital in and around  tanuku`,
  },
];

export const faqs = [
  {
    question: 'What services does Nisa Hospital provide?',
    answer:
      'Nisa Hospital provides eye care and ophthalmology, obstetrics and gynaecology, and paediatric care. Services include cataract operations, phaco surgery, refractive surgery, ultrasound scan, infertility treatment, NICU, and medical and cashless insurance facilities. See the Services section for the full list.',
  },
  {
    question: 'Which doctors are available?',
    answer:
      'Our specialist doctors are Dr. Ayesha Khan Pathan (Consultant Obstetrician & Gynaecologist), Dr. Rashid Hussain (Consultant Paediatrician) and Dr. Hussain Ahmed (Ophthalmologist). Please call the hospital to confirm availability.',
  },
  {
    question: 'What eye care services are available?',
    answer:
      'Eye care at Nisa Hospital includes ophthalmology consultations, cataract operations, phaco surgery, refractive surgery, and cornea-related and anterior segment care.',
  },
  {
    question: 'Does Nisa Hospital provide women and child care?',
    answer:
      'Yes. Nisa Hospital offers obstetrics and gynaecology services, including ultrasound scan, infertility treatment, electronic foetal monitoring and laparoscopic surgical treatments, along with paediatric care, NICU and a centralized oxygen unit.',
  },
  {
    question: 'Are insurance facilities available?',
    answer:
      'Nisa Hospital offers medical insurance facilities and cashless insurance facilities. Please call the hospital to confirm details for your insurer.',
  },
  {
    question: 'How can I contact the hospital?',
    answer: 'Call 09885225123 or +91 92467 44123, or use the Call Hospital button on this page.',
  },
  {
    question: 'Where is Nisa Hospital located?',
    answer:
      'Nisa Hospital is located in Tanuku, Andhra Pradesh. Use the Get Directions button on this page to open the location in Google Maps.',
  },
];


// ── Gallery Images ──
export const galleryImages = [
  {
    url: '/gallery/gallery-1.png', // The green consultation room
    alt: 'Pediatric Consultation Room',
    caption: 'Consultation Room'
  },
  {
    url: '/gallery/gallery-2.png', // The exterior building
    alt: 'Nisa Hospital Exterior',
    caption: 'Hospital Exterior'
  },
  {
    url: '/gallery/gallery-3.jpg', // The reception
    alt: 'Hospital Reception',
    caption: 'Reception'
  },
  {
    url: '/gallery/gallery-4.jpg', // The waiting chairs
    alt: 'Patient Waiting Area',
    caption: 'Patient Waiting Area'
  },
  {
    url: '/gallery/gallery-5.jpg', // Slit lamp
    alt: 'Eye Examination Setup',
    caption: 'Eye Examination'
  },
  {
    url: '/gallery/gallery-6.png', // Optometry equip against window
    alt: 'Optometry Equipment',
    caption: 'Optometry Equipment'
  },
  {
    url: '/gallery/gallery-7.jpg', // Lab equipment
    alt: 'Diagnostic Laboratory',
    caption: 'Diagnostic Laboratory'
  },
  {
    url: '/gallery/gallery-8.jpg', // Nisa Opticals
    alt: 'Nisa Opticals Storefront',
    caption: 'Nisa Opticals'
  },
  {
    url: '/gallery/gallery-9.jpg', // Wide Optometrist chamber
    alt: 'Optometrist Chamber',
    caption: 'Optometrist Chamber'
  },
  {
    url: '/gallery/gallery-10.jpg', // Auto refractometer
    alt: 'Auto Refractometer',
    caption: 'Eye Testing'
  }
];