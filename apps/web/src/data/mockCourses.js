export const mockCourses = [
  {
    id: "fullstack-react-node",
    title: "The Complete Full-Stack Web Development Bootcamp",
    instructor: {
      name: "Dr. Angela Yu",
      avatar: "https://ui-avatars.com/api/?name=Angela+Yu&background=random&color=fff",
      bio: "I'm a developer and lead instructor at the London App Brewery, London's leading Programming Bootcamp. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer."
    },
    category: "Web Development",
    difficulty: "Beginner",
    duration: "65 hours",
    studentCount: 154200,
    rating: 4.8,
    reviewCount: 45200,
    price: "$99.99",
    priceType: "Paid",
    priceValue: 99.99,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    description: "Learn web development by building 25+ real-world projects. Master React, Node.js, Express, and MongoDB.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    overview: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps.",
    objectives: [
      "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
      "Learn the latest technologies, including Javascript, React, Node and even Web3 development.",
      "After the course you will be able to build ANY website you want.",
      "Master frontend development with React"
    ],
    curriculum: [
      {
        module: "Front-End Web Development",
        lessons: ["Introduction to HTML", "Intermediate HTML", "Introduction to CSS", "Advanced CSS and Flexbox"]
      },
      {
        module: "JavaScript & DOM Manipulation",
        lessons: ["Introduction to JavaScript ES6", "Intermediate JavaScript", "The Document Object Model (DOM)", "Advanced DOM Manipulation"]
      },
      {
        module: "React.js",
        lessons: ["React Basics", "React Components", "State Management with React Hooks", "Building a To-Do App"]
      },
      {
        module: "Back-End with Node.js",
        lessons: ["Node.js and Express.js", "APIs and RESTful Routing", "Databases with MongoDB", "Authentication & Security"]
      }
    ],
    reviews: [
      { user: "John Doe", rating: 5, comment: "Amazing course! Highly recommend to beginners." },
      { user: "Jane Smith", rating: 4, comment: "Great content, but pacing is a bit fast in the backend section." }
    ],
    prerequisites: ["No programming experience needed - I'll teach you everything you need to know", "A Mac or PC computer with access to the internet", "No paid software required - I'll teach you how to use free editors"],
    certificate: true
  },
  {
    id: "machine-learning-python",
    title: "Machine Learning A-Z: Python & R in Data Science",
    instructor: {
      name: "Kirill Eremenko",
      avatar: "https://ui-avatars.com/api/?name=Kirill+Eremenko&background=random&color=fff",
      bio: "Data Scientist & Forex Systems Expert. I have over 7 years of experience in Data Science and Machine Learning."
    },
    category: "Data Science",
    difficulty: "Intermediate",
    duration: "44 hours",
    studentCount: 89050,
    rating: 4.7,
    reviewCount: 21300,
    price: "$89.99",
    priceType: "Paid",
    priceValue: 89.99,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
    description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
    skills: ["Python", "Machine Learning", "R", "Data Analysis", "Deep Learning"],
    overview: "This course has been designed by two professional Data Scientists so that we can share our knowledge and help you learn complex theory, algorithms, and coding libraries in a simple way.",
    objectives: [
      "Master Machine Learning on Python & R",
      "Have a great intuition of many Machine Learning models",
      "Make accurate predictions",
      "Make powerful analysis"
    ],
    curriculum: [
      {
        module: "Data Preprocessing",
        lessons: ["Importing the Dataset", "Handling Missing Data", "Encoding Categorical Data", "Splitting the Dataset"]
      },
      {
        module: "Regression",
        lessons: ["Simple Linear Regression", "Multiple Linear Regression", "Polynomial Regression", "Support Vector Regression"]
      },
      {
        module: "Classification",
        lessons: ["Logistic Regression", "K-Nearest Neighbors (K-NN)", "Support Vector Machine (SVM)", "Decision Tree Classification"]
      }
    ],
    reviews: [
      { user: "Alex B.", rating: 5, comment: "The intuitive explanations are pure gold." },
      { user: "Maria C.", rating: 4, comment: "Very comprehensive, but R section feels a bit dated." }
    ],
    prerequisites: ["High school level math", "Basic Python programming knowledge"],
    certificate: true
  },
  {
    id: "ui-ux-design-figma",
    title: "Complete Web & Mobile Designer in 2026: UI/UX, Figma",
    instructor: {
      name: "Andrei Neagoie",
      avatar: "https://ui-avatars.com/api/?name=Andrei+Neagoie&background=random&color=fff",
      bio: "Founder of Zero To Mastery. I've worked as a Senior Software Developer in Silicon Valley and Toronto."
    },
    category: "Design",
    difficulty: "Beginner",
    duration: "27 hours",
    studentCount: 65400,
    rating: 4.9,
    reviewCount: 15800,
    price: "$79.99",
    priceType: "Paid",
    priceValue: 79.99,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    description: "Become a UI/UX Designer! Master Figma, Web Design, Mobile Design, UI/UX principles, and build a portfolio.",
    skills: ["Figma", "UI Design", "UX Research", "Wireframing", "Prototyping"],
    overview: "We guarantee you that this is the most comprehensive and up-to-date course to learn Design and Figma. You will learn the principles of User Interface and User Experience design.",
    objectives: [
      "Build beautifully designed web and mobile projects for your customers",
      "Master Figma from beginner to advanced",
      "Learn best practices for UI/UX",
      "Create a professional portfolio"
    ],
    curriculum: [
      {
        module: "Figma Basics",
        lessons: ["Introduction to Figma", "Shapes & Tools", "Text & Typography", "Colors & Gradients"]
      },
      {
        module: "User Experience (UX)",
        lessons: ["User Personas", "User Flows", "Wireframing", "Prototyping"]
      },
      {
        module: "User Interface (UI)",
        lessons: ["Visual Hierarchy", "Spacing & Alignment", "Design Systems", "Component Libraries"]
      }
    ],
    reviews: [
      { user: "Sam T.", rating: 5, comment: "Best design course out there." },
      { user: "Lisa M.", rating: 5, comment: "Figma tutorials are top notch." }
    ],
    prerequisites: ["No prior design experience needed", "A working computer"],
    certificate: true
  },
  {
    id: "intro-to-cloud-aws",
    title: "AWS Certified Cloud Practitioner: Zero to Mastery",
    instructor: {
      name: "Stephane Maarek",
      avatar: "https://ui-avatars.com/api/?name=Stephane+Maarek&background=random&color=fff",
      bio: "AWS Certified Solutions Architect & Developer. I love teaching cloud computing to absolute beginners."
    },
    category: "Cloud Computing",
    difficulty: "Beginner",
    duration: "14 hours",
    studentCount: 210000,
    rating: 4.7,
    reviewCount: 52000,
    price: "Free",
    priceType: "Free",
    priceValue: 0,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    description: "Pass the AWS Certified Cloud Practitioner Exam CLF-C02. Learn AWS basics and fundamentals.",
    skills: ["AWS", "Cloud Computing", "EC2", "S3", "IAM"],
    overview: "This course is strictly designed for absolute beginners to Cloud Computing. We cover all the basics so you can pass the certification exam.",
    objectives: [
      "Pass the AWS Certified Cloud Practitioner Exam",
      "Understand the AWS Global Infrastructure",
      "Learn basic AWS services: EC2, S3, RDS, VPC",
      "Understand cloud security and pricing models"
    ],
    curriculum: [
      {
        module: "Cloud Computing Basics",
        lessons: ["What is Cloud Computing?", "IaaS, PaaS, SaaS", "AWS Global Infrastructure"]
      },
      {
        module: "Core AWS Services",
        lessons: ["IAM & Security", "EC2 Instances", "S3 Storage", "Databases on AWS"]
      }
    ],
    reviews: [
      { user: "Tom H.", rating: 5, comment: "Passed my exam on the first try thanks to this!" },
      { user: "Sarah W.", rating: 4, comment: "Good overview, nice that it's free." }
    ],
    prerequisites: ["No IT experience required", "Basic understanding of computers"],
    certificate: false
  },
  {
    id: "advanced-react-patterns",
    title: "Advanced React Patterns & Performance",
    instructor: {
      name: "Kent C. Dodds",
      avatar: "https://ui-avatars.com/api/?name=Kent+C+Dodds&background=random&color=fff",
      bio: "World renowned speaker, teacher, and software engineer. Creating educational material for developers."
    },
    category: "Web Development",
    difficulty: "Advanced",
    duration: "10 hours",
    studentCount: 45000,
    rating: 4.9,
    reviewCount: 8900,
    price: "$149.99",
    priceType: "Paid",
    priceValue: 149.99,
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=600&fit=crop",
    description: "Level up your React skills. Master custom hooks, render props, compound components, and performance optimization.",
    skills: ["React", "Custom Hooks", "Performance Optimization", "Architecture"],
    overview: "Take your React skills to the next level. This course covers advanced design patterns and performance optimization techniques used by top engineering teams.",
    objectives: [
      "Master advanced component patterns",
      "Optimize heavy React applications",
      "Build robust custom hooks",
      "Understand React rendering behavior deeply"
    ],
    curriculum: [
      {
        module: "React Patterns",
        lessons: ["Context Module Functions", "Compound Components", "Prop Collections and Getters", "State Reducer Pattern"]
      },
      {
        module: "Performance",
        lessons: ["Memoization", "useMemo & useCallback", "Code Splitting", "Windowing"]
      }
    ],
    reviews: [
      { user: "David K.", rating: 5, comment: "Mind blowing techniques. Changed how I write code." },
      { user: "Elena R.", rating: 5, comment: "Highly advanced, not for beginners." }
    ],
    prerequisites: ["Strong understanding of React fundamentals", "Experience building React apps"],
    certificate: true
  },
  {
    id: "digital-marketing-masterclass",
    title: "The Complete Digital Marketing Course",
    instructor: {
      name: "Rob Percival",
      avatar: "https://ui-avatars.com/api/?name=Rob+Percival&background=random&color=fff",
      bio: "Web Developer and Teacher. I've taught over 2 million students how to code and market their products."
    },
    category: "Business",
    difficulty: "Beginner",
    duration: "22 hours",
    studentCount: 320000,
    rating: 4.5,
    reviewCount: 67000,
    price: "$69.99",
    priceType: "Paid",
    priceValue: 69.99,
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop",
    description: "Master Digital Marketing Strategy, Social Media Marketing, SEO, YouTube, Email, Facebook Marketing, Analytics & More!",
    skills: ["SEO", "Social Media Marketing", "Google Ads", "Email Marketing", "Copywriting"],
    overview: "Grow a business online from scratch, make money as an affiliate marketer, or land a highly-paid job in digital marketing.",
    objectives: [
      "Grow a business online from scratch",
      "Make money as an affiliate marketer",
      "Land a highly-paid job in Digital Marketing",
      "Master Facebook, Twitter, Instagram, and Pinterest"
    ],
    curriculum: [
      {
        module: "Market Research",
        lessons: ["Identify Your Audience", "Competitor Analysis", "Creating a Buyer Persona"]
      },
      {
        module: "SEO (Search Engine Optimization)",
        lessons: ["Keyword Research", "On-Page SEO", "Off-Page SEO", "Local SEO"]
      },
      {
        module: "Social Media Marketing",
        lessons: ["Facebook Marketing", "Instagram Marketing", "LinkedIn Marketing", "Twitter Marketing"]
      }
    ],
    reviews: [
      { user: "Mike J.", rating: 4, comment: "Covers a lot of ground. Good starting point." },
      { user: "Anna S.", rating: 5, comment: "Helped me land my first marketing client!" }
    ],
    prerequisites: ["No experience required", "A desire to learn marketing"],
    certificate: true
  },
  {
    id: "ios-development-swift",
    title: "iOS 17 & Swift 5 - The Complete iOS App Development Bootcamp",
    instructor: {
      name: "Dr. Angela Yu",
      avatar: "https://ui-avatars.com/api/?name=Angela+Yu&background=random&color=fff",
      bio: "Lead instructor at the London App Brewery."
    },
    category: "Mobile Development",
    difficulty: "Intermediate",
    duration: "60 hours",
    studentCount: 180000,
    rating: 4.8,
    reviewCount: 35000,
    price: "$94.99",
    priceType: "Paid",
    priceValue: 94.99,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    description: "From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module on SwiftUI!",
    skills: ["Swift", "iOS", "Xcode", "SwiftUI", "CoreData"],
    overview: "Welcome to the Complete iOS App Development Bootcamp. This course will teach you how to code using Swift 5 and build beautiful iOS 17 apps for iPhone and iPad.",
    objectives: [
      "Learn to code using Swift 5",
      "Build a portfolio of apps to apply for junior developer jobs",
      "Master SwiftUI and UIKit",
      "Learn to publish apps to the App Store"
    ],
    curriculum: [
      {
        module: "Swift Programming Basics",
        lessons: ["Variables & Constants", "Control Flow", "Functions", "Optionals"]
      },
      {
        module: "Building UIs",
        lessons: ["Interface Builder", "Auto Layout", "SwiftUI Basics", "Animations in SwiftUI"]
      }
    ],
    reviews: [
      { user: "Chris P.", rating: 5, comment: "Angela is the best teacher on the internet." },
      { user: "Dan R.", rating: 4, comment: "Massive course, takes a while to get through." }
    ],
    prerequisites: ["A Mac computer", "No programming knowledge required"],
    certificate: true
  },
  {
    id: "ethical-hacking-kali",
    title: "Learn Ethical Hacking From Scratch",
    instructor: {
      name: "Zaid Sabih",
      avatar: "https://ui-avatars.com/api/?name=Zaid+Sabih&background=random&color=fff",
      bio: "Ethical Hacker, Computer Scientist & CEO of zSecurity."
    },
    category: "Cybersecurity",
    difficulty: "Intermediate",
    duration: "16 hours",
    studentCount: 450000,
    rating: 4.6,
    reviewCount: 98000,
    price: "$84.99",
    priceType: "Paid",
    priceValue: 84.99,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    description: "Become an ethical hacker that can hack computer systems like black hat hackers and secure them like security experts.",
    skills: ["Ethical Hacking", "Kali Linux", "Network Security", "Penetration Testing"],
    overview: "Welcome to this comprehensive course on Ethical Hacking! This course assumes you have NO prior knowledge and by the end of it you'll be able to hack systems like black-hat hackers.",
    objectives: [
      "Learn ethical hacking from scratch",
      "Understand how hackers hack into networks",
      "Learn how to secure networks from attacks",
      "Master Kali Linux"
    ],
    curriculum: [
      {
        module: "Preparation",
        lessons: ["Installing Kali Linux", "Basic Linux Commands", "Network Basics"]
      },
      {
        module: "Network Hacking",
        lessons: ["Pre-connection Attacks", "Gaining Access", "Post Connection Attacks", "Securing Networks"]
      }
    ],
    reviews: [
      { user: "Omar F.", rating: 5, comment: "Very practical and hands-on." },
      { user: "Steve L.", rating: 4, comment: "Good intro to pentesting." }
    ],
    prerequisites: ["Basic IT skills", "A computer with at least 8GB RAM"],
    certificate: true
  },
  {
    id: "intro-to-graphic-design",
    title: "Graphic Design Masterclass",
    instructor: {
      name: "Lindsay Marsh",
      avatar: "https://ui-avatars.com/api/?name=Lindsay+Marsh&background=random&color=fff",
      bio: "Graphic Designer and Instructor with over 15 years of experience."
    },
    category: "Design",
    difficulty: "Beginner",
    duration: "29 hours",
    studentCount: 120000,
    rating: 4.7,
    reviewCount: 31000,
    price: "Free",
    priceType: "Free",
    priceValue: 0,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
    description: "The Ultimate Graphic Design Course Which Covers Photoshop, Illustrator, InDesign, Design Theory, Branding and Logo Design.",
    skills: ["Photoshop", "Illustrator", "InDesign", "Branding", "Typography"],
    overview: "This is a comprehensive course that covers the holy trinity of graphic design: Adobe Photoshop, Illustrator, and InDesign.",
    objectives: [
      "Have a deep understanding of typography, color theory, layout, and composition",
      "Master Adobe Illustrator",
      "Master Adobe Photoshop",
      "Master Adobe InDesign"
    ],
    curriculum: [
      {
        module: "Design Theory",
        lessons: ["Color Theory", "Typography", "Layout & Composition", "Branding Basics"]
      },
      {
        module: "Adobe Photoshop",
        lessons: ["Layers & Masks", "Photo Manipulation", "Typography in Photoshop"]
      }
    ],
    reviews: [
      { user: "Kelly P.", rating: 5, comment: "Learned so much, thank you!" },
      { user: "Brian G.", rating: 5, comment: "Great free resource to get started." }
    ],
    prerequisites: ["Access to Adobe Creative Cloud", "No prior design experience needed"],
    certificate: false
  },
  {
    id: "rust-programming",
    title: "Ultimate Rust Crash Course",
    instructor: {
      name: "Nathan Stocks",
      avatar: "https://ui-avatars.com/api/?name=Nathan+Stocks&background=random&color=fff",
      bio: "Systems Programmer and Rust Advocate."
    },
    category: "Programming",
    difficulty: "Intermediate",
    duration: "8 hours",
    studentCount: 35000,
    rating: 4.8,
    reviewCount: 7500,
    price: "$49.99",
    priceType: "Paid",
    priceValue: 49.99,
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&h=600&fit=crop",
    description: "Learn Rust quickly! Memory safety without garbage collection. Concurrency without data races.",
    skills: ["Rust", "Systems Programming", "Concurrency", "Memory Management"],
    overview: "Rust is rapidly becoming one of the most loved programming languages. This course gets you up to speed quickly on Rust's unique concepts like ownership and borrowing.",
    objectives: [
      "Understand Rust's ownership model",
      "Build fast, safe concurrent programs",
      "Create command-line utilities",
      "Use Cargo for package management"
    ],
    curriculum: [
      {
        module: "Rust Basics",
        lessons: ["Variables & Types", "Functions", "Control Flow"]
      },
      {
        module: "Core Concepts",
        lessons: ["Ownership", "References & Borrowing", "Structs & Enums", "Pattern Matching"]
      }
    ],
    reviews: [
      { user: "Mark T.", rating: 5, comment: "Finally understood ownership thanks to this." },
      { user: "Sophie H.", rating: 4, comment: "Pacing is fast, but good for experienced devs." }
    ],
    prerequisites: ["Experience with at least one other programming language"],
    certificate: true
  },
  {
    id: "financial-modeling-excel",
    title: "Financial Modeling for Startups & Small Businesses",
    instructor: {
      name: "Evan Kimbrell",
      avatar: "https://ui-avatars.com/api/?name=Evan+Kimbrell&background=random&color=fff",
      bio: "Founder of Sprintkick. Taught over 500k students entrepreneurship."
    },
    category: "Finance",
    difficulty: "Intermediate",
    duration: "11 hours",
    studentCount: 42000,
    rating: 4.5,
    reviewCount: 8200,
    price: "$59.99",
    priceType: "Paid",
    priceValue: 59.99,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    description: "Learn how to build financial models to forecast revenue, expenses, and cash flow for your business.",
    skills: ["Financial Modeling", "Excel", "Forecasting", "Business Strategy"],
    overview: "Every business needs a financial model. Whether you're pitching investors or planning next year's budget, this course will teach you how to model your business in Excel.",
    objectives: [
      "Build a complete financial model from scratch",
      "Forecast revenue based on different business models",
      "Calculate customer acquisition cost (CAC) and LTV",
      "Create professional pitch deck financials"
    ],
    curriculum: [
      {
        module: "Excel Basics for Finance",
        lessons: ["Formulas & Functions", "Formatting for Clarity", "Data Tables"]
      },
      {
        module: "Building the Model",
        lessons: ["Revenue Assumptions", "Expense Forecasting", "Income Statement", "Cash Flow Statement"]
      }
    ],
    reviews: [
      { user: "Jason L.", rating: 5, comment: "Extremely practical for startup founders." },
      { user: "Amanda C.", rating: 4, comment: "Good templates provided." }
    ],
    prerequisites: ["Basic understanding of business concepts", "Familiarity with Excel"],
    certificate: true
  },
  {
    id: "creative-writing-workshop",
    title: "The Creative Writing Masterclass",
    instructor: {
      name: "Jessica Brody",
      avatar: "https://ui-avatars.com/api/?name=Jessica+Brody&background=random&color=fff",
      bio: "Bestselling Author of Save the Cat! Writes a Novel."
    },
    category: "Personal Development",
    difficulty: "Beginner",
    duration: "18 hours",
    studentCount: 28000,
    rating: 4.8,
    reviewCount: 5400,
    price: "$39.99",
    priceType: "Paid",
    priceValue: 39.99,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=800&h=600&fit=crop",
    description: "Write your novel, memoir, or short story with confidence. Learn plotting, character development, and world-building.",
    skills: ["Creative Writing", "Storytelling", "Character Development", "Editing"],
    overview: "Unlock your creative potential. This course walks you through the entire writing process, from brainstorming ideas to revising your final draft.",
    objectives: [
      "Develop compelling characters",
      "Structure a gripping plot",
      "Write authentic dialogue",
      "Overcome writer's block"
    ],
    curriculum: [
      {
        module: "The Foundations of Story",
        lessons: ["Finding Your Idea", "The Three-Act Structure", "Creating Your Protagonist"]
      },
      {
        module: "Drafting",
        lessons: ["Show, Don't Tell", "Writing Dialogue", "Pacing and Tension", "World-Building"]
      }
    ],
    reviews: [
      { user: "Rachel V.", rating: 5, comment: "Helped me finally finish my first draft." },
      { user: "Kevin M.", rating: 4, comment: "Inspiring and practical exercises." }
    ],
    prerequisites: ["A notebook or word processor", "A passion for telling stories"],
    certificate: true
  }
];

export const getCourseCategories = () => {
  const categories = new Set(mockCourses.map(c => c.category));
  return Array.from(categories);
};

export const getDifficultyLevels = () => ['Beginner', 'Intermediate', 'Advanced'];