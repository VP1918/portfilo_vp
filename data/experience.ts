export interface WorkExperience {
    role: string;
    company: string;
    period: string;
    description: string;
    tech: string[];
}

export const workExperience: WorkExperience[] = [
    {
        role: "Java Developer",
        company: "Inbrain",
        period: "2023 - Present",
        description: "Developed scalable backend services using Java and Spring Boot. Optimized database performance and implemented RESTful APIs for high-traffic applications.",
        tech: ["Java", "Spring Boot", "REST APIs", "MySQL", "Microservices"]
    },
    {
        role: "Python Developer",
        company: "Webial",
        period: "2022 - 2023",
        description: "Built robust automation scripts and backend systems using Python (Django/Flask). Collaborated with cross-functional teams to deliver data-driven web solutions.",
        tech: ["Python", "Django", "Flask", "PostgreSQL", "REST APIs"]
    },
    {
        role: "Tech Information Provider / IT Support",
        company: "Manav Telecom",
        period: "2021 - Present (Part-time)",
        description: "Providing technical information and comprehensive IT support. Responsible for helping users define their requirements and delivering tailored technical solutions.",
        tech: ["Python", "SQL", "HTML", "CSS", "JavaScript"]
    }
];
