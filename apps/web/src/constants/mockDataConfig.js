export const MOCK_COURSES = [
  {
    id: 'course_1',
    title: 'Full-Stack React & Node.js Masterclass',
    description: 'Learn to build scalable full-stack applications from scratch using React, Node.js, Express, and MongoDB.',
    instructor: { name: 'Sarah Drasner', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    duration: '40 hours',
    level: 'Advanced',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    price: '$99.99',
    priceType: 'Paid',
    students_enrolled: 15420,
    studentCount: 15420,
    rating: 4.9,
    reviewCount: 3200,
    modules: 12,
    prerequisites: 'Basic JavaScript knowledge',
    start_date: '2026-04-01',
    end_date: '2026-06-01',
    status: 'Active',
    created_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-02-20T14:30:00Z'
  }
];

export const MOCK_PROJECTS = [
  {
    id: 'proj_1',
    title: 'Open Source AI Assistant',
    description: 'A privacy-first, locally run AI assistant built for developers. We are looking for contributors to help with the Rust backend and React frontend.',
    category: 'Open Source',
    author: 'DevCollect',
    publishedDate: '2026-02-25',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    realms: ['culture']
  },
  {
    id: 'proj_2',
    title: 'EcoTracker Mobile App',
    description: 'Tracking daily carbon footprints made easy. Currently in beta testing phase, seeking UX researchers and beta testers.',
    category: 'Mobile App',
    author: 'GreenTech Solutions',
    publishedDate: '2026-02-20',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    realms: ['knowledge']
  },
  {
    id: 'proj_3',
    title: 'Community Health Hub',
    description: 'A decentralized platform connecting local healthcare providers with community members for accessible care.',
    category: 'Healthcare',
    author: 'HealthNet',
    publishedDate: '2026-03-10',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80',
    realms: ['social', 'health']
  },
  {
    id: 'proj_4',
    title: 'Decentralized Marketplace Protocol',
    description: 'Building a robust set of smart contracts and UI components for peer-to-peer commerce without intermediaries.',
    category: 'Blockchain',
    author: 'Commerce DAO',
    publishedDate: '2026-01-15',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1621504450181-5d156ff1b392?w=800&q=80',
    realms: ['economy']
  },
  {
    id: 'proj_5',
    title: 'Mindful Meditation App',
    description: 'An ad-free, open-source meditation application offering guided sessions to improve mental wellness.',
    category: 'Mobile App',
    author: 'ZenWorks',
    publishedDate: '2026-02-05',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1545389336-eaee310af15a?w=800&q=80',
    realms: ['health']
  },
  {
    id: 'proj_6',
    title: 'Financial Literacy Portal',
    description: 'Educational resources and interactive tools helping users understand personal finance and investment basics.',
    category: 'Education',
    author: 'FinEd Group',
    publishedDate: '2026-04-12',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    realms: ['knowledge', 'economy']
  },
  {
    id: 'proj_7',
    title: 'Local Art Collaborative',
    description: 'An initiative bringing artists together to create murals in underserved neighborhoods.',
    category: 'Arts & Culture',
    author: 'Urban Canvas',
    publishedDate: '2026-03-22',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    realms: ['culture', 'social']
  }
];

export const MOCK_EVENTS = [
  {
    id: 'evt_1',
    title: 'Global EdTech Summit 2026',
    date: '2026-08-15',
    location: 'Virtual',
    description: 'A 3-day virtual summit exploring the latest innovations in educational technology and pedagogical research.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    realms: ['knowledge']
  },
  {
    id: 'evt_2',
    title: 'Future of Healthcare Symposium',
    date: '2026-09-10',
    location: 'Geneva, Switzerland',
    description: 'Industry leaders gather to discuss how decentralized economics and new technologies are reshaping global health.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80',
    realms: ['economy', 'health']
  },
  {
    id: 'evt_3',
    title: 'Community Organizers Retreat',
    date: '2026-10-05',
    location: 'Austin, TX',
    description: 'An interactive retreat focused on building resilient local communities and effective social networking.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
    realms: ['social']
  },
  {
    id: 'evt_4',
    title: 'Indie Game Developers Showcase',
    date: '2026-07-22',
    location: 'Tokyo, Switzerland',
    description: 'Showcasing the most creative and boundary-pushing independent games from around the world.',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
    realms: ['culture']
  },
  {
    id: 'evt_5',
    title: 'Mindfulness & Wellness Expo',
    date: '2026-11-12',
    location: 'Sedona, AZ',
    description: 'Workshops, guided meditations, and panels focused on holistic health and mental well-being.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    realms: ['health']
  },
  {
    id: 'evt_6',
    title: 'Open Source Maintainers Connect',
    date: '2026-10-18',
    location: 'Virtual',
    description: 'Connecting developers to discuss sustainability, governance, and the social aspects of maintaining large OSS projects.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    realms: ['knowledge', 'social']
  },
  {
    id: 'evt_7',
    title: 'Decentralized Finance Hackathon',
    date: '2026-09-25',
    location: 'London, UK',
    description: 'A competitive 48-hour hackathon to build new financial tools that empower individual users.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    realms: ['economy']
  }
];

export const MOCK_COMMUNITIES = [
  {
    id: 'c1',
    name: 'Tech Innovators Network',
    type: 'Organization',
    location: 'Global',
    activityLevel: 'High',
    memberCount: 1250,
    verified: true,
    description: 'A global network of technologists, founders, and developers building the next generation of software products.',
    tags: ['Technology', 'Startups', 'Networking'],
    avatar: 'https://ui-avatars.com/api/?name=Tech+Innovators&background=6366f1&color=fff'
  }
];

export const MOCK_BLOG_POSTS = [];
export const MOCK_JOBS = [];