// Helper function to generate random image URLs
const getRandomImageUrl = () => `https://random.imagecdn.app/300/300?random=${Math.random() * 1000}`;

export const allAthletes = [
  {
    id: 1,
    first_name: "Juan",
    last_name: "Dela Cruz",
    bio: "Passionate about soccer and teamwork.",
    age: 12,
    sport: "Soccer",
    goal: 50000,
    funds_raised: 15000,
    is_open: true,
    funding_breakdown: "70% training, 20% travel, 10% equipment",
    achievements: "Won regional championships.",
    image: getRandomImageUrl(),
    video: "https://via.placeholder.com/video.mp4",
    progress_updates: "Training progressing as planned.",
    date_created: "2023-01-20T14:22:23.382748Z",
    owner: 1,
  },
  {
    id: 2,
    first_name: "Maria",
    last_name: "Santos",
    bio: "Aiming to represent the country in swimming.",
    age: 16,
    sport: "Swimming",
    goal: 30000,
    funds_raised: 12000,
    is_open: false,
    funding_breakdown: "60% training, 30% travel, 10% equipment",
    achievements: "National team member.",
    image: getRandomImageUrl(),
    video: "https://via.placeholder.com/video.mp4",
    progress_updates: "Preparing for nationals.",
    date_created: "2023-02-15T10:12:23.382748Z",
    owner: 2,
  },
  {
    id: 3,
    first_name: "Carlos",
    last_name: "Garcia",
    bio: "Dedicated basketball player with big dreams.",
    age: 18,
    sport: "Basketball",
    goal: 40000,
    funds_raised: 8000,
    is_open: true,
    funding_breakdown: "50% training, 40% travel, 10% equipment",
    achievements: "Set a personal scoring record.",
    image: getRandomImageUrl(),
    video: "https://via.placeholder.com/video.mp4",
    progress_updates: "Focused on improving agility.",
    date_created: "2023-03-05T16:45:23.382748Z",
    owner: 1,
  },
  {
    id: 4,
    first_name: "Angel",
    last_name: "Reyes",
    bio: "Loves gymnastics and pushing boundaries.",
    age: 9,
    sport: "Gymnastics",
    goal: 60000,
    funds_raised: 30000,
    is_open: true,
    funding_breakdown: "80% training, 15% travel, 5% equipment",
    achievements: "Won gold in national junior competition.",
    image: getRandomImageUrl(),
    video: "https://via.placeholder.com/video.mp4",
    progress_updates: "Training for an upcoming tournament.",
    date_created: "2023-04-12T09:18:23.382748Z",
    owner: 3,
  },
  {
    id: 5,
    first_name: "Miguel",
    last_name: "Torres",
    bio: "Aspiring cyclist aiming for international recognition.",
    age: 13,
    sport: "Cycling",
    goal: 35000,
    funds_raised: 5000,
    is_open: false,
    funding_breakdown: "65% training, 25% travel, 10% equipment",
    achievements: "Placed top 3 in regional cycling tournaments.",
    image: getRandomImageUrl(),
    video: "https://via.placeholder.com/video.mp4",
    progress_updates: "Building endurance through training.",
    date_created: "2023-05-25T12:30:23.382748Z",
    owner: 2,
  },
  {
    id: 6,
    first_name: "Sophia",
    last_name: "Bautista",
    bio: "Boxing enthusiast aiming to be a world champion.",
    age: 15,
    sport: "Boxing",
    goal: 45000,
    funds_raised: 20000,
    is_open: true,
    funding_breakdown: "55% training, 35% travel, 10% equipment",
    achievements: "Won multiple local amateur championships.",
    image: getRandomImageUrl(),
    video: "https://via.placeholder.com/video.mp4",
    progress_updates: "Training for her next big fight.",
    date_created: "2023-06-10T08:20:23.382748Z",
    owner: 3,
  },
  {
    id: 7,
    first_name: "Diego",
    last_name: "Fernandez",
    bio: "Weightlifting champion with a passion for breaking records.",
    age: 14,
    sport: "Weightlifting",
    goal: 50000,
    funds_raised: 35000,
    is_open: true,
    funding_breakdown: "70% training, 20% travel, 10% equipment",
    achievements: "Set a junior national weightlifting record.",
    image: getRandomImageUrl(),
    video: "https://via.placeholder.com/video.mp4",
    progress_updates: "Training for a national competition.",
    date_created: "2023-07-18T11:45:23.382748Z",
    owner: 1,
  },
  {
    id: 8,
    first_name: "Isabel",
    last_name: "Lopez",
    bio: "Dreaming of Wimbledon while training hard in tennis.",
    age: 10,
    sport: "Tennis",
    goal: 40000,
    funds_raised: 10000,
    is_open: false,
    funding_breakdown: "65% training, 20% travel, 15% equipment",
    achievements: "Won regional tennis championship.",
    image: getRandomImageUrl(),
    video: "https://via.placeholder.com/video.mp4",
    progress_updates: "Practicing for upcoming tournaments.",
    date_created: "2023-08-22T13:30:23.382748Z",
    owner: 2,
  },
  {
    id: 9,
    first_name: "Liam",
    last_name: "Rivera",
    bio: "Inspired wrestler aiming to go global.",
    age: 7,
    sport: "Wrestling",
    goal: 45000,
    funds_raised: 12000,
    is_open: true,
    funding_breakdown: "50% training, 40% travel, 10% equipment",
    achievements: "Silver medalist in junior wrestling.",
    image: getRandomImageUrl(),
    video: "https://via.placeholder.com/video.mp4",
    progress_updates: "Focused on building strength and stamina.",
    date_created: "2023-09-01T09:50:23.382748Z",
    owner: 3,
  },
  {
    id: 10,
    first_name: "Gabriela",
    last_name: "Castillo",
    bio: "A sprinter who thrives under pressure.",
    age: 8,
    sport: "Athletics",
    goal: 30000,
    funds_raised: 8000,
    is_open: true,
    funding_breakdown: "60% training, 30% travel, 10% equipment",
    achievements: "Set a record in the 100m dash for her age group.",
    image: getRandomImageUrl(),
    video: "https://via.placeholder.com/video.mp4",
    progress_updates: "Preparing for the state meet.",
    date_created: "2023-10-05T11:00:23.382748Z",
    owner: 1,
  },
];
