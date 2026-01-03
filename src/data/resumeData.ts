// Centralized Resume Data for Adithya S Nair

export interface Education {
    degree: string;
    institution: string;
    location: string;
    timeline: string;
    score: string;
}

export interface Experience {
    title: string;
    company: string;
    location: string;
    timeline: string;
    description: string[];
}

export interface Project {
    name: string;
    timeline: string;
    description: string;
    skills: string[];
}

export interface Leadership {
    role: string;
    organization: string;
    location: string;
    timeline: string;
    description: string[];
}

export const personalInfo = {
    name: "Adithya S Nair",
    email: "adithyasnair2021@gmail.com",
    dob: "26/09/2002",
    phone: "+918136859455",
    address: "Karikkattukunnel (H), Chirakkadavu Centre P.O, Ponkunnam, Kottayam",
    linkedin: "linkedin.com/in/adithya-s-nair",
    github: "github.com/ADITHYASNAIR2021"
};

export const profile = `A passionate AI undergraduate student on a mission to drive the development of intelligent analytics solutions. With a proven track record of leadership skills as the Former Chairman of the ACM Student Chapter, fostering collaborative efforts that embrace diversity and innovation. Thriving on challenges and consistently delivering solutions in intense and demanding environments.`;

export const education: Education[] = [
    {
        degree: "B-Tech, Computer Science with AI and ML",
        institution: "Amrita Vishwa Vidyapeetham",
        location: "Amritapuri, Kollam, India",
        timeline: "09/2021 – 08/2025",
        score: "CGPA: 8.48"
    },
    {
        degree: "Higher Secondary (AISSCE / 12th)",
        institution: "Sreyas Public School and Junior College",
        location: "Ponkunnam, Kottayam, India",
        timeline: "03/2019 – 03/2020",
        score: "Percentage: 87%"
    },
    {
        degree: "Senior Secondary (AISSE / 10th)",
        institution: "Sreyas Public School and Junior College",
        location: "Ponkunnam, Kottayam, India",
        timeline: "03/2017 – 03/2018",
        score: "Percentage: 88%"
    }
];

export const experience: Experience[] = [
    {
        title: "AI R&D Research Intern",
        company: "Doctreen",
        location: "Montpellier, France",
        timeline: "01/2025 – 05/2025",
        description: [
            "Enhancing AI systems for Doctreen's pioneering medical report generation software",
            "Infusing state-of-the-art technologies and customizing innovative approaches",
            "Elevating user experience through advanced AI implementations"
        ]
    },
    {
        title: "Data Science Job Simulation",
        company: "British Airways & Forage",
        location: "Remote, India",
        timeline: "07/2023 – 09/2023",
        description: [
            "Scraped and analysed customer review data to uncover findings",
            "Built a predictive model to understand factors influencing buying behaviour"
        ]
    },
    {
        title: "Virtual Internship Program",
        company: "Cisco & AICTE",
        location: "Remote, India",
        timeline: "06/2023 – 09/2023",
        description: [
            "Analyzed university network topology using Cisco Packet Tracer",
            "Identified vulnerabilities through attack surface mapping",
            "Recommended security measures: VLANs, firewalls, IDP/IPS, VPNs",
            "Delivered detailed security assessment report"
        ]
    }
];

export const leadership: Leadership[] = [
    {
        role: "Member of Advisory Council",
        organization: "ACM, Amritapuri",
        location: "Amritapuri, Kollam, India",
        timeline: "06/2024 – present",
        description: [
            "Provide guidance and oversee club proceedings",
            "Employed Agile methodology"
        ]
    },
    {
        role: "Chairperson",
        organization: "ACM Students Chapter",
        location: "Amritapuri, Kollam, India",
        timeline: "05/2023 – 06/2024",
        description: [
            "Developing and executing chapter programs",
            "Scheduling executive committee meetings",
            "Successfully organized two workshops",
            "Working on event management website for ACM"
        ]
    }
];

export const projects: Project[] = [
    {
        name: "Namude Yatra",
        timeline: "02/2025 – 03/2025",
        description: "AI-powered travel itinerary generator leveraging multi-agent architecture for day-by-day trip planning. Features Streamlit UI, live progress tracking, interactive map visualizations, and chatbot for travel assistance.",
        skills: ["LLM-based Agents", "LangChain", "Streamlit", "Pydeck", "Geopy", "Generative AI"]
    },
    {
        name: "OptiHire",
        timeline: "10/2024 – 11/2024",
        description: "AI-powered web application that automates tailored email and cover letter generation, resume analysis, and application tracking to revolutionize job search.",
        skills: ["Streamlit", "Web Scraping", "LLM", "NLP", "Multi-API Integration", "Prompt Engineering"]
    },
    {
        name: "ACM Chapter Website",
        timeline: "05/2024 – 06/2024",
        description: "Official ACM Students Chapter website using Next JS, Tailwind CSS, and Chakra UI. Hosted on Vercel.",
        skills: ["Next.js", "Tailwind CSS", "Chakra UI", "Vercel"]
    },
    {
        name: "Inventory Optimisation Using DQN",
        timeline: "04/2024 – 06/2024",
        description: "Inventory optimization system for single retailer using Deep Q-Network to improve stock management and reduce costs.",
        skills: ["Reinforcement Learning", "DQN", "Market Understanding"]
    },
    {
        name: "Visionary Controls",
        timeline: "08/2023 – 12/2023",
        description: "Gesture-based computer control system with voice-activated mode switching.",
        skills: ["OpenCV", "NLP"]
    },
    {
        name: "Dementia Classification",
        timeline: "06/2023 – 07/2023",
        description: "Deep learning classification of dementia stages using brain MRI images. Predicts 4 stages with 99% accuracy.",
        skills: ["Deep Learning", "CNN", "Gradio", "HuggingFace", "TensorFlow"]
    }
];

export const skills = {
    programmingLanguages: ["Python", "Matlab", "SQL"],
    frameworks: ["Django", "React", "Gradio", "Streamlit", "Next.js", "Tailwind", "Node.js"],
    tools: ["MLFlow", "MongoDB", "HuggingFace", "MariaDB", "Xampp", "CrewAI"],
    ai: ["Machine Learning", "Deep Learning", "Reinforcement Learning", "NLP", "EDA", "LLM", "Agents", "Prompt Engineering"],
    values: ["Leadership", "Results-Oriented", "Diversity", "Agile", "Continuous Learner", "Initiator", "Adaptable", "Integrity"]
};

export const volunteering = [
    {
        event: "Vidyut",
        timeline: "01/2024",
        role: "Core committee member '24 and Executive member 2023",
        description: "Managing accommodation arrangements for participants, ensuring comfort, coordinating with hostels, organizing check-ins"
    },
    {
        event: "ICPC",
        timeline: "03/2023 – 05/2024",
        role: "Overall Coordinator - Asia West Regional Finals '22 and 2023",
        description: "Organized and ran the Competition, developing strong organizational and communication skills"
    }
];

export const languages = [
    { language: "English", proficiency: "Professional proficiency" },
    { language: "Malayalam", proficiency: "Native proficiency" },
    { language: "Hindi", proficiency: "Working proficiency" },
    { language: "German", proficiency: "Learning" }
];

export const interests = [
    "Artificial Intelligence",
    "Predictive Analysis",
    "Data Analysis",
    "Singing"
];

export const courses = [
    "Cybersecurity Essentials Badge",
    "DL for Images, Text with PyTorch",
    "Data Visualisation: Empowering Business with Effective Insights"
];

export const relatedCourseWork = [
    "DAA", "DSA", "OS", "Advanced Computer Networks", "MIS", "IBS",
    "Signals and Image Processing", "PML", "ROS", "DRL",
    "AI in Speech Processing", "NLP", "Deep Learning"
];
