
export const teamList:{
  title: string;
  color1: string;
  color2: string;
  color3: string;
  person: Array<{
    avatar: string;
    name: string;
    role: string;
    description: string;
  }>,
}[] = [
  {
    title:"<b>Berlin,</b> Germany",
    color1:"--color-blue-light",
    color2:"--color-white",
    color3:"--color-blue-light",
    person:[
      {
        avatar: "H-Memo-Rhein.png",
        name: "H. Memo Rhein",
        role: "Founder & CEO",
        description: "As one of the first pioneers of digital change, H. Memo Rhein anticipated the emerging copyright problems early on. For more than 20 years he has been working on solutions like his fingerprint and watermark technologies that always have the artist in focus. Memo is a renowned expert in international copyright law and has worked for many years as a consultant in this field. Against this international and decentralized background, to initiate and promote the cultural exchange between equal partners has always been very important to him. In this regard, there are many possibilities that digitization offers to recognize cultural identities but also help artists to reach a wider audience.",
      },
      {
        avatar: "Christoph-Martius.png",
        name: "Christoph Martius",
        role: "Head of Sales",
        description: "Christoph is one of Germany's most experienced and well-connected music industry professionals in the field of Marketing and Sales. There's hardly anything he hasn't done yet – from founding record labels, organizing music industry conferences in Africa to co-founding the first legal streaming service for China for western music."
      },
      {
        avatar: "Iris-Mazur-Rhein.png",
        name: "Iris Mazur-Rhein",
        role: "Creative Director, Co-Founder",
        description: "Iris is an accomplished photographer with a vast knowledge about graphic design. Under her wise guidance all the visual deliveries are created.",
      },
      {
        avatar: "Martin-Abend.png",
        name: "Martin Abend",
        role: "COO",
        description: "Martin is a digital media professional with more than 20 years' experience in music, e-commerce, mobile and content and has a strong focus on operations management, strategy and planning. He's an entrepreneur type with start-up and inter-cultural management experiences and used to worked in Beijing, China for the first legal streaming service for western music in China."
      },
      {
        avatar: "Thomas-Herbst.png",
        name: "Thomas Herbst",
        role: "Product Manager",
        description: "Thomas is an experienced Product Manager with a deep affection for and knowledge of the physical product - be it CDs or vinyl. He runs his own record label on the side and is a driving force in the European Experimental/free Improv scene."
      },
      {
        avatar: "Erich Whittenberg.png",
        name: "Erich Whittenberg",
        role: "Events & Social Media",
        description: "One of the brightest Young Professionals we have ever met, Erich leads our Social Media Marketing department with unstoppable enthusiasm and creativity."
      },
      {
        avatar: "Simon-Baumbach.png",
        name: "Simon Baumbach",
        role: "Head of IT-Infrastructure",
        description: "Simon is a computer scientist and specializes in Linux. The skills include monitoring, setting up data centers and full-service support. Thanks to the wide range of qualifications, he can put complex server landscapes up and running in the shortest possible time."
      },
    ]
  },
  {
    title: "<b>Tbilisi,</b> Georgia",
    color1:"--color-white",
    color2:"--color-orange",
    color3:"--color-orange",
    person:[
      {
        avatar: "Niko-Inasaridze.png",
        name: "Niko Inasaridze",
        role: "CTO CUGATE Systems",
        description: "Niko is a mathematician and computer scientist; his wide range of expereince includes Cryptography, Machine Learning, Pattern Recognition, Computer Algebra; iOS (Mobile), Swift/Objective C and Python developing systems. His competence and knowledge of databases and principles of modular and object-oriented programming is a great asset in the creation of new platforms and programs."
      },
      {
        avatar: "Salome-Japaridze.png",
        name: "Salome Japaridze",
        role: "COO Georgia",
        description: "Salome has joined the CUCATE team with a strong background in international project management that mainly implied engagement in extensive cultural projects, communication and sharing experiences with person of different credentials and cultures. She manages our development programs, administrative activities and coordinates the Georgian team with the Berlin Office.",
      },
      {
        avatar: "Vladislav-Lado-Dashtu.png",
        name: "Vladislav \"Lado\" Dashtu",
        role: "Frontend Developer & System Adminsitration",
        description: "Lado is a young developer with quite an impressive experience in the IT field and various levels of web & mobile application creation. He watches over CUCATE projects across the globe and is not afraid of trying out new approaches.",
      },
      {
        avatar: "Lile-Guramishvili.png",
        name: "Lile Guramishvili",
        role: "Graphic Designer",
        description: "Lile is a young promising designer who is always eager to endeavor new approaches in design and integrate them with the daring programs of CUCATE."
      },
      {
        avatar: "Bachuki-Bacho-Mazmaniani.png",
        name: "Bachuki \"Bacho\" Mazmaniani",
        role: "Junior Python Developer",
        description: "Bacho is a junior member of CUGATE Georgian team, accumulating his strong programing skills and focusing on Python system development."
      },
    ]
  },
  {
    title: "<b>Asia</b>",
    color1:"--color-white",
    color2:"--color-blue-light",
    color3:"--color-blue-light",
    person:[
      {
        avatar: "Fu-XueQian.png",
        name: "XueQian Fu",
        role: "CTO Asia, Shenzhen, China",
        description: "XueQian is one of the longest serving members of the Cugate Group. As an extremely experienced system developer he was essential in developing Memo’s visionary ideas through the years."
      },
      {
        avatar: "JM-Chou.png",
        name: "JM Chou",
        role: "Representative Asia, Taipei, Taiwan",
        description: "Served as Chairman of Taipei Audio-Video production Association. Work involved in drama, music, publishing, comics, cartoons, online games, copyright promotion and management, and sound quality optimization technology."
      },
    ]
  },
  {
    title: "<b>North & South America</b>",
    color1:"--color-blue-light",
    color2:"--color-white",
    color3:"--color-blue-light",
    person:[
      {
        avatar: "Raul-Gutierrez.png",
        name: "Raul Gutierrez",
        role: "Representative South America",
        description: "Musician of long artistic trajectory in Europe and Latin America, director of the band Irazu in Munich and then member of the famous \"Afro Cuban All stars\" of the Buena Vista Social Club project. Music producer of many projects in different styles and different formats of Afro Cuban music and jazz, Raul also works as musical director of projects of the University of Veracruz in Mexico."
      },
      {
        avatar: "Thomas-Olscheske.png",
        name: "Thomas Olscheske",
        role: "Representative USA",
        description: "Dr. Olscheske (Tom) is a multidisciplined technologist with a track record of success developing and managing multidiscipline entrepreneurial ventures in business, education and government organization. Tom has a track record of success developing intelligent decision-support solutions for business innovation using artificial intelligence, neural network and data-driven knowledge management technologies. Dr. Olscheske is also a successful serial entrepreneur and executive in international business joint ventures and technology startups."
      },
    ]
  },
  {
    title: "<b>United Kingdom</b>",
    color1:"--color-white",
    color2:"--color-orange",
    color3:"--color-orange",
    person:[
      {
        avatar: "John-Cronin.jpg",
        name: "John Cronin",
        role: "Press / PR / Marketing / Distribution Consultant",
        description: "John Cronin is a UK based freelance press / PR / marketing consultant working with several classical/jazz/world music labels, artists, composers, venues and festivals. Prior to him setting up his own consultancy service, John was Head of Classics & Imports at BMG UK. He has over four decades of experience in the areas within which he operates.<br>For Cugate, John manages our relationships with global physical distribution and key international music press."
      },
    ]
  },
  {
    title: "<b>Cyprus</b>",
    color1:"--color-orange",
    color2:"--color-white",
    color3:"--color-orange",
    person:[
      {
        avatar: "Matthias ML.png",
        name: "Matthias Meyer-Lutterloh",
        role: "Blockchain Advisor & Developer",
        description: "Matthias has a strong background in Blockchain, DeFi, DAO, Regulatory Framework, and NFTs. His interest in blockchain began in 2014, when he founded the “mybinary.me” think-tank, which explored how the blockchain and the internet influence consumers and businesses. Since then, he worked on various cryptocurrency projects, including conceptualizing a blockchain-based platform related to the Football Transfer Market and Aurelium Gold, an Ethereum-based platform to issue, store, market and distribute an ERC1400 gold-backed stablecoin in the primary and secondary market. Today, as the founder of the E.A.D.A.T European Asset Digitalization Agency he advises clients around the world on blockchain, cryptocurrencies and NFTs. Matthias' goal is to support the adoption of NFT by creating an interdisciplinary forum and collaborating globally with entities, agencies, universities, and organisations in his function as member or founder of various NFT and Blockchain discussion groups and the Leader of the European Blockchain Association NFT working group. In addition, he has frequently appeared as VIP-speaker, Moderator and Co-moderator in blockchain related events that allowed him to establish unique connections to the leaders of the blockchain ecosystem.",
      },
    ]
  },
];