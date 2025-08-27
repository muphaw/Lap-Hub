
// import { ref } from 'vue';
import type { Project } from '@/types/projects';

export const projects : Project[] = [
  {
    "user_id": 1,
    "project_id": 1,
    "project_title": "AI Weather Predictor",
    "project_detail": "An artificial intelligence system that predicts weather patterns with 95% accuracy using satellite data.",
    "project_image": "https://source.unsplash.com/600x400/?weather,ai",
    "project_date": "2024-05-10",
    "collaborators": [
      {
        "user_id": 3,
        "name": "Aung Ko",
        "email": "aungko@example.com",
        "major": "Data Science",
        "batch": "2020",
        "image": "https://source.unsplash.com/100x100/?man,asian"
      },
      {
        "user_id": 4,
        "name": "Su Su",
        "email": "susu@example.com",
        "major": "Meteorology",
        "batch": "2018",
        "image": "https://source.unsplash.com/100x100/?woman,student"
      }
    ],
    "popularity": 189,
    "liked": true,
    "created_at": "2024-04-28"
  },
  {
    "user_id": 2,
    "project_id": 2,
    "project_title": "Eco-Friendly Packaging",
    "project_detail": "Biodegradable packaging solution made from agricultural waste that decomposes within 30 days.",
    "project_image": "https://source.unsplash.com/600x400/?packaging,eco",
    "project_date": "2024-06-18",
    "collaborators": [
      {
        "user_id": 5,
        "name": "Min Thu",
        "email": "minthu@example.com",
        "major": "Environmental Science",
        "batch": "2021",
        "image": "https://source.unsplash.com/100x100/?man,glasses"
      }
    ],
    "popularity": 312,
    "liked": false,
    "created_at": "2024-05-15"
  },
  {
    "user_id": 3,
    "project_id": 3,
    "project_title": "VR Classroom",
    "project_detail": "Virtual reality platform for immersive education experiences with interactive 3D models.",
    "project_image": "https://source.unsplash.com/600x400/?vr,education",
    "project_date": "2024-07-05",
    "collaborators": [
      {
        "user_id": 6,
        "name": "Nyein Chan",
        "email": "nyeinchan@example.com",
        "major": "Computer Engineering",
        "batch": "2019",
        "image": "https://source.unsplash.com/100x100/?woman,professional"
      },
      {
        "user_id": 7,
        "name": "Kyaw Zin",
        "email": "kyawzin@example.com",
        "major": "Education Technology",
        "batch": "2020",
        "image": "https://source.unsplash.com/100x100/?man,student"
      }
    ],
    "popularity": 276,
    "liked": false,
    "created_at": "2024-06-20"
  },
  {
    "user_id": 4,
    "project_id": 4,
    "project_title": "Autonomous Delivery Robot",
    "project_detail": "Self-navigating robot for last-mile package delivery in urban environments.",
    "project_image": "https://source.unsplash.com/600x400/?robot,delivery",
    "project_date": "2024-08-12",
    "collaborators": [
      {
        "user_id": 8,
        "name": "Thiha Aung",
        "email": "thihaaung@example.com",
        "major": "Robotics",
        "batch": "2021",
        "image": "https://source.unsplash.com/100x100/?man,engineer"
      }
    ],
    "popularity": 421,
    "liked": true,
    "created_at": "2024-07-01"
  },
  {
    "user_id": 5,
    "project_id": 5,
    "project_title": "Blockchain Voting System",
    "project_detail": "Secure digital voting platform using blockchain technology to prevent fraud.",
    "project_image": "https://source.unsplash.com/600x400/?blockchain,voting",
    "project_date": "2024-09-20",
    "collaborators": [
      {
        "user_id": 9,
        "name": "May Zin",
        "email": "mayzin@example.com",
        "major": "Cybersecurity",
        "batch": "2018",
        "image": "https://source.unsplash.com/100x100/?woman,tech"
      },
      {
        "user_id": 10,
        "name": "Hein Htet",
        "email": "heinhtet@example.com",
        "major": "Political Science",
        "batch": "2017",
        "image": "https://source.unsplash.com/100x100/?man,formal"
      }
    ],
    "popularity": 387,
    "liked": false,
    "created_at": "2024-08-15"
  },
  {
    "user_id": 6,
    "project_id": 6,
    "project_title": "Smart Agriculture Drone",
    "project_detail": "AI-powered drone that monitors crop health and optimizes pesticide use.",
    "project_image": "https://source.unsplash.com/600x400/?drone,farm",
    "project_date": "2024-10-05",
    "collaborators": [
      {
        "user_id": 11,
        "name": "Yoon Myat",
        "email": "yoonmyat@example.com",
        "major": "Agricultural Engineering",
        "batch": "2022",
        "image": "https://source.unsplash.com/100x100/?woman,farmer"
      }
    ],
    "popularity": 234,
    "liked": true,
    "created_at": "2024-09-10"
  },
  {
    "user_id": 7,
    "project_id": 7,
    "project_title": "Mental Health Chatbot",
    "project_detail": "AI chatbot that provides mental health support and connects users with professionals.",
    "project_image": "https://source.unsplash.com/600x400/?chatbot,mentalhealth",
    "project_date": "2024-11-15",
    "collaborators": [
      {
        "user_id": 12,
        "name": "Phyo Wai",
        "email": "phyowai@example.com",
        "major": "Psychology",
        "batch": "2019",
        "image": "https://source.unsplash.com/100x100/?man,doctor"
      },
      {
        "user_id": 13,
        "name": "Ei Ei",
        "email": "eiei@example.com",
        "major": "Artificial Intelligence",
        "batch": "2020",
        "image": "https://source.unsplash.com/100x100/?woman,ai"
      }
    ],
    "popularity": 512,
    "liked": false,
    "created_at": "2024-10-20"
  },
  {
    "user_id": 8,
    "project_id": 8,
    "project_title": "3D Printed Prosthetics",
    "project_detail": "Low-cost 3D printed prosthetic limbs customized for each patient's needs.",
    "project_image": "https://source.unsplash.com/600x400/?prosthetic,3dprinting",
    "project_date": "2025-01-10",
    "collaborators": [
      {
        "user_id": 14,
        "name": "Zin Mar",
        "email": "zinmar@example.com",
        "major": "Biomedical Engineering",
        "batch": "2021",
        "image": "https://source.unsplash.com/100x100/?woman,scientist"
      }
    ],
    "popularity": 298,
    "liked": true,
    "created_at": "2024-12-05"
  },
  {
    "user_id": 9,
    "project_id": 9,
    "project_title": "Ocean Cleanup Drone",
    "project_detail": "Autonomous marine drone that collects plastic waste from ocean surfaces.",
    "project_image": "https://source.unsplash.com/600x400/?ocean,drone",
    "project_date": "2025-02-18",
    "collaborators": [
      {
        "user_id": 15,
        "name": "Aung Hein",
        "email": "aunghein@example.com",
        "major": "Marine Biology",
        "batch": "2018",
        "image": "https://source.unsplash.com/100x100/?man,researcher"
      },
      {
        "user_id": 16,
        "name": "Thuzar",
        "email": "thuzar@example.com",
        "major": "Mechanical Engineering",
        "batch": "2020",
        "image": "https://source.unsplash.com/100x100/?woman,engineer"
      }
    ],
    "popularity": 456,
    "liked": false,
    "created_at": "2025-01-15"
  },
  {
    "user_id": 10,
    "project_id": 10,
    "project_title": "Smart Traffic Light System",
    "project_detail": "AI-controlled traffic lights that adapt to real-time traffic conditions to reduce congestion.",
    "project_image": "https://source.unsplash.com/600x400/?traffic,ai",
    "project_date": "2025-03-22",
    "collaborators": [
      {
        "user_id": 17,
        "name": "Myo Min",
        "email": "myomin@example.com",
        "major": "Urban Planning",
        "batch": "2017",
        "image": "https://source.unsplash.com/100x100/?man,architect"
      }
    ],
    "popularity": 321,
    "liked": true,
    "created_at": "2025-02-10"
  },
  {
    "user_id": 11,
    "project_id": 11,
    "project_title": "AR Museum Guide",
    "project_detail": "Augmented reality app that provides interactive information about museum exhibits.",
    "project_image": "https://source.unsplash.com/600x400/?ar,museum",
    "project_date": "2025-04-30",
    "collaborators": [
      {
        "user_id": 18,
        "name": "Htet Htet",
        "email": "htethtet@example.com",
        "major": "Digital Arts",
        "batch": "2022",
        "image": "https://source.unsplash.com/100x100/?woman,artist"
      },
      {
        "user_id": 19,
        "name": "Naing Lin",
        "email": "nainglin@example.com",
        "major": "History",
        "batch": "2019",
        "image": "https://source.unsplash.com/100x100/?man,historian"
      }
    ],
    "popularity": 267,
    "liked": false,
    "created_at": "2025-03-15"
  },
  {
    "user_id": 12,
    "project_id": 12,
    "project_title": "Solar-Powered Water Purifier",
    "project_detail": "Portable device that uses solar energy to purify water for drinking in remote areas.",
    "project_image": "https://source.unsplash.com/600x400/?solar,water",
    "project_date": "2025-05-18",
    "collaborators": [
      {
        "user_id": 20,
        "name": "Yamin",
        "email": "yamin@example.com",
        "major": "Environmental Engineering",
        "batch": "2021",
        "image": "https://source.unsplash.com/100x100/?woman,engineer"
      }
    ],
    "popularity": 389,
    "liked": true,
    "created_at": "2025-04-01"
  },
  {
    "user_id": 13,
    "project_id": 13,
    "project_title": "AI Language Tutor",
    "project_detail": "Artificial intelligence platform that provides personalized language learning experiences.",
    "project_image": "https://source.unsplash.com/600x400/?ai,language",
    "project_date": "2025-06-25",
    "collaborators": [
      {
        "user_id": 21,
        "name": "Soe Moe",
        "email": "soemoe@example.com",
        "major": "Linguistics",
        "batch": "2018",
        "image": "https://source.unsplash.com/100x100/?man,teacher"
      },
      {
        "user_id": 22,
        "name": "Nilar",
        "email": "nilar@example.com",
        "major": "Computer Science",
        "batch": "2020",
        "image": "https://source.unsplash.com/100x100/?woman,programmer"
      }
    ],
    "popularity": 412,
    "liked": false,
    "created_at": "2025-05-10"
  },
  {
    "user_id": 14,
    "project_id": 14,
    "project_title": "Smart Bike Lock",
    "project_detail": "IoT-enabled bike lock with GPS tracking and automatic theft detection.",
    "project_image": "https://source.unsplash.com/600x400/?bike,lock",
    "project_date": "2025-07-15",
    "collaborators": [
      {
        "user_id": 23,
        "name": "Aung Zaw",
        "email": "aungzaw@example.com",
        "major": "Product Design",
        "batch": "2022",
        "image": "https://source.unsplash.com/100x100/?man,designer"
      }
    ],
    "popularity": 276,
    "liked": true,
    "created_at": "2025-06-01"
  },
  {
    "user_id": 15,
    "project_id": 15,
    "project_title": "Food Waste Reducer App",
    "project_detail": "Mobile application that connects restaurants with charities to donate excess food.",
    "project_image": "https://source.unsplash.com/600x400/?food,waste",
    "project_date": "2025-08-20",
    "collaborators": [
      {
        "user_id": 24,
        "name": "Khin May",
        "email": "khinmay@example.com",
        "major": "Social Work",
        "batch": "2019",
        "image": "https://source.unsplash.com/100x100/?woman,activist"
      },
      {
        "user_id": 25,
        "name": "Tun Tun",
        "email": "tuntun@example.com",
        "major": "Mobile Development",
        "batch": "2020",
        "image": "https://source.unsplash.com/100x100/?man,developer"
      }
    ],
    "popularity": 345,
    "liked": false,
    "created_at": "2025-07-05"
  },
  {
    "user_id": 16,
    "project_id": 16,
    "project_title": "Gesture Control Interface",
    "project_detail": "System that allows users to control computers and devices through hand gestures.",
    "project_image": "https://source.unsplash.com/600x400/?gesture,control",
    "project_date": "2025-09-12",
    "collaborators": [
      {
        "user_id": 26,
        "name": "Moe Moe",
        "email": "moemoe@example.com",
        "major": "Human-Computer Interaction",
        "batch": "2021",
        "image": "https://source.unsplash.com/100x100/?woman,researcher"
      }
    ],
    "popularity": 298,
    "liked": true,
    "created_at": "2025-08-01"
  },
  {
    "user_id": 17,
    "project_id": 17,
    "project_title": "Automated Plant Care System",
    "project_detail": "Smart system that monitors and automatically waters plants based on soil conditions.",
    "project_image": "https://source.unsplash.com/600x400/?plants,iot",
    "project_date": "2025-10-05",
    "collaborators": [
      {
        "user_id": 27,
        "name": "Zaw Zaw",
        "email": "zawzaw@example.com",
        "major": "Agricultural Technology",
        "batch": "2018",
        "image": "https://source.unsplash.com/100x100/?man,farmer"
      },
      {
        "user_id": 28,
        "name": "Aye Aye",
        "email": "ayeaye@example.com",
        "major": "Electrical Engineering",
        "batch": "2020",
        "image": "https://source.unsplash.com/100x100/?woman,engineer"
      }
    ],
    "popularity": 267,
    "liked": false,
    "created_at": "2025-09-15"
  },
  {
    "user_id": 18,
    "project_id": 18,
    "project_title": "Disaster Response Drone Network",
    "project_detail": "Fleet of drones that can quickly assess damage and deliver supplies after natural disasters.",
    "project_image": "https://source.unsplash.com/600x400/?drone,disaster",
    "project_date": "2025-11-18",
    "collaborators": [
      {
        "user_id": 29,
        "name": "Kyaw Thu",
        "email": "kyawthu@example.com",
        "major": "Emergency Management",
        "batch": "2017",
        "image": "https://source.unsplash.com/100x100/?man,rescuer"
      }
    ],
    "popularity": 432,
    "liked": true,
    "created_at": "2025-10-10"
  },
  {
    "user_id": 19,
    "project_id": 19,
    "project_title": "Personalized Nutrition App",
    "project_detail": "App that creates customized meal plans based on DNA analysis and health goals.",
    "project_image": "https://source.unsplash.com/600x400/?nutrition,dna",
    "project_date": "2026-01-05",
    "collaborators": [
      {
        "user_id": 30,
        "name": "Thin Thin",
        "email": "thinthin@example.com",
        "major": "Nutrition Science",
        "batch": "2019",
        "image": "https://source.unsplash.com/100x100/?woman,dietician"
      },
      {
        "user_id": 1,
        "name": "Zaw Min",
        "email": "zawmin@example.com",
        "major": "Bioinformatics",
        "batch": "2019",
        "image": "https://source.unsplash.com/100x100/?man,scientist"
      }
    ],
    "popularity": 387,
    "liked": false,
    "created_at": "2025-12-15"
  },
  {
    "user_id": 20,
    "project_id": 20,
    "project_title": "Smart Mirror",
    "project_detail": "Interactive mirror that displays news, weather, and health metrics while you get ready.",
    "project_image": "https://source.unsplash.com/600x400/?mirror,smart",
    "project_date": "2026-02-14",
    "collaborators": [
      {
        "user_id": 2,
        "name": "Hla Hla",
        "email": "hlahla@example.com",
        "major": "Computer Science",
        "batch": "2019",
        "image": "https://source.unsplash.com/100x100/?woman,tech"
      }
    ],
    "popularity": 321,
    "liked": true,
    "created_at": "2026-01-10"
  },
  {
    "user_id": 21,
    "project_id": 21,
    "project_title": "Air Quality Monitoring Network",
    "project_detail": "City-wide network of sensors that provide real-time air quality data to citizens.",
    "project_image": "https://source.unsplash.com/600x400/?air,pollution",
    "project_date": "2026-03-22",
    "collaborators": [
      {
        "user_id": 3,
        "name": "Aung Ko",
        "email": "aungko@example.com",
        "major": "Environmental Science",
        "batch": "2020",
        "image": "https://source.unsplash.com/100x100/?man,researcher"
      },
      {
        "user_id": 4,
        "name": "Su Su",
        "email": "susu@example.com",
        "major": "Data Visualization",
        "batch": "2018",
        "image": "https://source.unsplash.com/100x100/?woman,analyst"
      }
    ],
    "popularity": 356,
    "liked": false,
    "created_at": "2026-02-15"
  },
  {
    "user_id": 22,
    "project_id": 22,
    "project_title": "Virtual Fitness Coach",
    "project_detail": "AI-powered personal trainer that creates and adjusts workout plans in real-time.",
    "project_image": "https://source.unsplash.com/600x400/?fitness,ai",
    "project_date": "2026-04-18",
    "collaborators": [
      {
        "user_id": 5,
        "name": "Min Thu",
        "email": "minthu@example.com",
        "major": "Sports Science",
        "batch": "2021",
        "image": "https://source.unsplash.com/100x100/?man,trainer"
      }
    ],
    "popularity": 412,
    "liked": true,
    "created_at": "2026-03-01"
  },
  {
    "user_id": 23,
    "project_id": 23,
    "project_title": "Blockchain Supply Chain",
    "project_detail": "Transparent supply chain solution using blockchain to track products from source to consumer.",
    "project_image": "https://source.unsplash.com/600x400/?blockchain,supplychain",
    "project_date": "2026-05-30",
    "collaborators": [
      {
        "user_id": 6,
        "name": "Nyein Chan",
        "email": "nyeinchan@example.com",
        "major": "Business Technology",
        "batch": "2019",
        "image": "https://source.unsplash.com/100x100/?woman,business"
      },
      {
        "user_id": 7,
        "name": "Kyaw Zin",
        "email": "kyawzin@example.com",
        "major": "Logistics",
        "batch": "2020",
        "image": "https://source.unsplash.com/100x100/?man,professional"
      }
    ],
    "popularity": 389,
    "liked": false,
    "created_at": "2026-04-10"
  },
  {
    "user_id": 24,
    "project_id": 24,
    "project_title": "Smart Wheelchair",
    "project_detail": "Autonomous wheelchair that can navigate complex environments with minimal user input.",
    "project_image": "https://source.unsplash.com/600x400/?wheelchair,smart",
    "project_date": "2026-07-12",
    "collaborators": [
      {
        "user_id": 8,
        "name": "Thiha Aung",
        "email": "thihaaung@example.com",
        "major": "Assistive Technology",
        "batch": "2021",
        "image": "https://source.unsplash.com/100x100/?man,engineer"
      }
    ],
    "popularity": 345,
    "liked": true,
    "created_at": "2026-05-20"
  },
  {
    "user_id": 25,
    "project_id": 25,
    "project_title": "Language Preservation Platform",
    "project_detail": "Digital archive and learning platform for endangered languages with speech recognition.",
    "project_image": "https://source.unsplash.com/600x400/?language,archive",
    "project_date": "2026-08-25",
    "collaborators": [
      {
        "user_id": 9,
        "name": "May Zin",
        "email": "mayzin@example.com",
        "major": "Anthropology",
        "batch": "2018",
        "image": "https://source.unsplash.com/100x100/?woman,researcher"
      },
      {
        "user_id": 10,
        "name": "Hein Htet",
        "email": "heinhtet@example.com",
        "major": "Computational Linguistics",
        "batch": "2017",
        "image": "https://source.unsplash.com/100x100/?man,linguist"
      }
    ],
    "popularity": 276,
    "liked": false,
    "created_at": "2026-07-15"
  },
  {
    "user_id": 1,
    "project_id": 26,
    "project_title": "AI-Powered Legal Assistant",
    "project_detail": "Tool that helps users understand legal documents and suggests potential issues.",
    "project_image": "https://source.unsplash.com/600x400/?law,ai",
    "project_date": "2026-09-15",
    "collaborators": [
      {
        "user_id": 11,
        "name": "Yoon Myat",
        "email": "yoonmyat@example.com",
        "major": "Law",
        "batch": "2022",
        "image": "https://source.unsplash.com/100x100/?woman,lawyer"
      }
    ],
    "popularity": 432,
    "liked": true,
    "created_at": "2026-08-01"
  },
  {
    "user_id": 2,
    "project_id": 27,
    "project_title": "Smart Sleep Mask",
    "project_detail": "Wearable that monitors sleep patterns and uses gentle stimuli to improve sleep quality.",
    "project_image": "https://source.unsplash.com/600x400/?sleep,mask",
    "project_date": "2026-10-20",
    "collaborators": [
      {
        "user_id": 12,
        "name": "Phyo Wai",
        "email": "phyowai@example.com",
        "major": "Neuroscience",
        "batch": "2019",
        "image": "https://source.unsplash.com/100x100/?man,scientist"
      },
      {
        "user_id": 13,
        "name": "Ei Ei",
        "email": "eiei@example.com",
        "major": "Product Design",
        "batch": "2020",
        "image": "https://source.unsplash.com/100x100/?woman,designer"
      }
    ],
    "popularity": 367,
    "liked": false,
    "created_at": "2026-09-10"
  },
  {
    "user_id": 3,
    "project_id": 28,
    "project_title": "Automated Code Reviewer",
    "project_detail": "AI system that analyzes code for bugs, vulnerabilities, and style consistency.",
    "project_image": "https://source.unsplash.com/600x400/?code,ai",
    "project_date": "2026-11-15",
    "collaborators": [
      {
        "user_id": 14,
        "name": "Zin Mar",
        "email": "zinmar@example.com",
        "major": "Software Engineering",
        "batch": "2021",
        "image": "https://source.unsplash.com/100x100/?woman,coder"
      }
    ],
    "popularity": 512,
    "liked": true,
    "created_at": "2026-10-01"
  },
  {
    "user_id": 4,
    "project_id": 29,
    "project_title": "Urban Vertical Farming System",
    "project_detail": "Modular farming units for high-yield vegetable production in urban environments.",
    "project_image": "https://source.unsplash.com/600x400/?farm,vertical",
    "project_date": "2027-01-10",
    "collaborators": [
      {
        "user_id": 15,
        "name": "Aung Hein",
        "email": "aunghein@example.com",
        "major": "Agricultural Engineering",
        "batch": "2018",
        "image": "https://source.unsplash.com/100x100/?man,farmer"
      },
      {
        "user_id": 16,
        "name": "Thuzar",
        "email": "thuzar@example.com",
        "major": "Urban Design",
        "batch": "2020",
        "image": "https://source.unsplash.com/100x100/?woman,architect"
      }
    ],
    "popularity": 389,
    "liked": false,
    "created_at": "2026-12-15"
  },
  {
    "user_id": 5,
    "project_id": 30,
    "project_title": "AR Navigation for Visually Impaired",
    "project_detail": "Augmented reality glasses that provide audio cues to help visually impaired navigate cities.",
    "project_image": "https://source.unsplash.com/600x400/?ar,accessibility",
    "project_date": "2027-02-18",
    "collaborators": [
      {
        "user_id": 17,
        "name": "Myo Min",
        "email": "myomin@example.com",
        "major": "Assistive Technology",
        "batch": "2017",
        "image": "https://source.unsplash.com/100x100/?man,innovator"
      }
    ],
    "popularity": 456,
    "liked": true,
    "created_at": "2027-01-05"
  }
]