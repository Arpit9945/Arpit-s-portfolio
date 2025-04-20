// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
const Portfolio = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Initialize skill chart
        const skillChartDom = document.getElementById("skill-chart");
        if (skillChartDom) {
            const myChart = echarts.init(skillChartDom);
            const option = {
                animation: false,
                radar: {
                    indicator: [
                        { name: "React", max: 100 },
                        { name: "JS", max: 100 },
                        { name: "Redux", max: 100 },
                        { name: "Firebase", max: 100 },
                        { name: "Next.js", max: 100 },
                        { name: "PHP", max: 100 },
                    ],
                    radius: "65%",
                    splitNumber: 4,
                    axisName: {
                        color: darkMode ? "#fff" : "#333",
                        backgroundColor: darkMode ? "#1f2937" : "#f3f4f6",
                        borderRadius: 3,
                        padding: [3, 5],
                        fontSize: 14,
                    },
                    splitArea: {
                        areaStyle: {
                            color: darkMode
                                ? [
                                    "rgba(50, 50, 50, 0.3)",
                                    "rgba(50, 50, 50, 0.2)",
                                    "rgba(50, 50, 50, 0.1)",
                                    "rgba(50, 50, 50, 0.05)",
                                ]
                                : [
                                    "rgba(250, 250, 250, 0.5)",
                                    "rgba(240, 240, 240, 0.5)",
                                    "rgba(230, 230, 230, 0.5)",
                                    "rgba(220, 220, 220, 0.5)",
                                ],
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: darkMode
                                ? "rgba(255, 255, 255, 0.2)"
                                : "rgba(0, 0, 0, 0.2)",
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: darkMode
                                ? "rgba(255, 255, 255, 0.2)"
                                : "rgba(0, 0, 0, 0.2)",
                        },
                    },
                },
                series: [
                    {
                        name: "Skills",
                        type: "radar",
                        data: [
                            {
                                value: [90, 85, 95, 80, 75, 70],
                                name: "Skill Level",
                                areaStyle: {
                                    color: darkMode
                                        ? "rgba(79, 70, 229, 0.6)"
                                        : "rgba(99, 102, 241, 0.6)",
                                },
                                lineStyle: {
                                    color: darkMode
                                        ? "rgba(129, 140, 248, 0.8)"
                                        : "rgba(79, 70, 229, 0.8)",
                                    width: 2,
                                },
                                itemStyle: {
                                    color: darkMode ? "#818cf8" : "#4f46e5",
                                },
                            },
                        ],
                    },
                ],
            };
            myChart.setOption(option);
            // Handle resize
            window.addEventListener("resize", () => {
                myChart.resize();
            });
            // Clean up
            return () => {
                window.removeEventListener("resize", () => {
                    myChart.resize();
                });
                myChart.dispose();
            };
        }

    }, [darkMode]);

    useEffect(() => {
        // Apply dark mode to body
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
        // Initialize AOS-like scroll animations
        const animatedElements = document.querySelectorAll(".animate-on-scroll");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-visible");
                    }
                });
            },
            { threshold: 0.1 },
        );
        animatedElements.forEach((el) => observer.observe(el));
        return () => {
            animatedElements.forEach((el) => observer.unobserve(el));
        };
    }, [darkMode]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            {/* Particle Background */}
            <div
                className={`fixed inset-0 pointer-events-none ${darkMode ? "opacity-20" : "opacity-10"}`}
            >
                <div className="absolute w-full h-full overflow-hidden">
                    {Array.from({ length: 50 }).map((_, index) => (
                        <div
                            key={index}
                            className={`absolute rounded-full ${darkMode ? "bg-emerald-500" : "bg-emerald-600"}`}
                            style={{
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: Math.random() * 0.5 + 0.1,
                                animation: `float ${Math.random() * 10 + 20}s linear infinite`,
                                animationDelay: `${Math.random() * 10}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
            {/* Header */}
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? "bg-gray-900/80 backdrop-blur-md" : "bg-white/80 backdrop-blur-md"}`}
            >
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold tracking-tight relative overflow-hidden">
                            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                                <img src="/logo.png" style={{ height: '40px' }} alt="Logo" />
                            </span>
                            <div
                                className={`absolute bottom-0 left-0 w-full h-0.5 transform translate-x-full transition-transform duration-500 ${darkMode ? "bg-emerald-400" : "bg-emerald-600"}`}
                                style={{ animation: "slideInFromRight 1s forwards 0.5s" }}
                            ></div>
                        </div>
                        <div className="flex items-center space-x-8">
                            <nav className="hidden md:flex space-x-8">
                                {["home", "about", "skills", "projects", "experience"].map(
                                    (item) => (
                                        <button
                                            key={item}
                                            onClick={() => scrollToSection(item)}
                                            className={`capitalize font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 relative group cursor-pointer whitespace-nowrap !rounded-button`}
                                        >
                                            {item}
                                            <span
                                                className={`absolute left-0 bottom-0 w-0 h-0.5 ${darkMode ? "bg-emerald-400" : "bg-emerald-600"} transition-all duration-300 group-hover:w-full`}
                                            ></span>
                                        </button>
                                    ),
                                )}
                            </nav>
                            <button
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-full transition-colors duration-300 cursor-pointer whitespace-nowrap !rounded-button ${darkMode ? "bg-gray-800 text-yellow-300 hover:bg-gray-700" : "bg-gray-100 text-indigo-600 hover:bg-gray-200"}`}
                                aria-label="Toggle dark mode"
                            >
                                <i
                                    className={`fas ${darkMode ? "fa-sun" : "fa-moon"} text-lg`}
                                ></i>
                            </button>
                            <button className="md:hidden text-2xl cursor-pointer whitespace-nowrap !rounded-button">
                                <i className="fas fa-bars"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                {/* Hero Section */}
                <section
                    id="home"
                    className="min-h-screen flex items-center relative overflow-hidden pt-20"
                >
                    <div className="container mx-auto px-6 py-12 md:py-24 relative z-10">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="animate-on-scroll" data-aos="fade-right">
                                <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
                                    <span className="block name-animation">Hello, I'm</span>
                                    <span className={`block mt-2 text-[#E93558] name-animation`}>
                                        Arpit Pattani
                                    </span>
                                </h1>
                                <h2 className="text-xl md:text-2xl font-medium mb-6 opacity-80 relative h-[32px]">
                                    <div className="absolute left-0 top-0 w-full">
                                        {[
                                            "Software Developer",
                                            "React.js Developer",
                                            "Next.js Developer",
                                            "Full Stack Developer",
                                        ].map((title, index) => (
                                            <div
                                                key={index}
                                                className="absolute left-0 top-0 w-full flex items-center opacity-0"
                                                style={{
                                                    animation: `titleAnimation 8s linear infinite ${index * 2}s`,
                                                }}
                                            >
                                                {title}
                                            </div>
                                        ))}
                                    </div>
                                </h2>
                                <p
                                    className={`text-lg mb-8 max-w-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                >
                                    Crafting elegant digital experiences with modern web
                                    technologies. Passionate about creating efficient,
                                    user-friendly applications.
                                </p>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://github.com/Arpit9945"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-[#7026ED] hover:bg-[#7026ED]/90 text-white rounded-md font-medium transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg flex items-center cursor-pointer whitespace-nowrap !rounded-button"
                                    >
                                        <i className="fab fa-github mr-2"></i> GitHub
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/arpit-soni-5035482a2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-[#E93558] hover:bg-[#E93558]/90 text-white rounded-md font-medium transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg flex items-center cursor-pointer whitespace-nowrap !rounded-button"
                                    >
                                        <i className="fab fa-linkedin mr-2"></i> LinkedIn
                                    </a>
                                </div>
                            </div>
                            <div className="relative animate-on-scroll" data-aos="fade-left">
                                <div
                                    className={`relative rounded-2xl overflow-hidden transform hover:rotate-2 transition-transform duration-500 shadow-xl ${darkMode ? "shadow-emerald-500/20" : "shadow-emerald-600/20"}`}
                                >
                                    <img
                                        src="/Arpit.jpg"
                                        alt="Arpit Pattani"
                                        className="w-full h-auto object-cover object-top rounded-2xl"
                                    />
                                    <div
                                        className={`absolute inset-0 ${darkMode ? "bg-gradient-to-tr from-emerald-900/40 to-transparent" : "bg-gradient-to-tr from-emerald-600/20 to-transparent"}`}
                                    ></div>
                                </div>
                                {/* Floating tech icons */}
                                {["react", "js", "html5", "css3", "php"].map((tech, index) => (
                                    <div
                                        key={tech}
                                        className={`absolute w-12 h-12 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg flex items-center justify-center text-xl ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}
                                        style={{
                                            top: `${20 + index * 15}%`,
                                            right: index % 2 === 0 ? "-5%" : "85%",
                                            animation: `float ${3 + index}s ease-in-out infinite alternate`,
                                            animationDelay: `${index * 0.5}s`,
                                        }}
                                    >
                                        <i className={`fab fa-${tech}`}></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent"></div>
                    <div
                        className={`absolute top-1/4 right-1/4 w-64 h-64 rounded-full ${darkMode ? "bg-indigo-900/10" : "bg-indigo-200/20"} blur-3xl`}
                    ></div>
                    <div
                        className={`absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full ${darkMode ? "bg-purple-900/10" : "bg-purple-200/20"} blur-3xl`}
                    ></div>
                </section>
                {/* About Section */}
                <section
                    id="about"
                    className={`py-20 ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}`}
                >
                    <div className="container mx-auto px-6">
                        <div
                            className="text-center mb-16 animate-on-scroll"
                            data-aos="fade-up"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                            <div className="w-24 h-1 mx-auto bg-[#7026ED]"></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="animate-on-scroll" data-aos="fade-right">
                                <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
                                <p
                                    className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                >
                                    I'm Arpit Pattani, a passionate Software Developer with
                                    expertise in modern web technologies. My journey in software
                                    development started with a strong educational foundation and
                                    has evolved through hands-on experience in creating robust
                                    applications.
                                </p>
                                <p
                                    className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                >
                                    I specialize in building responsive web applications using
                                    React, JavaScript, and Next.js, complemented by my backend
                                    skills in PHP and MySQL. My approach combines technical
                                    excellence with creative problem-solving to deliver
                                    exceptional user experiences.
                                </p>
                                <div className="flex flex-wrap gap-3 mt-8">
                                    {[
                                        "HTML",
                                        "CSS/SCSS",
                                        "Bootstrap",
                                        "Taildwind",
                                        "ShadCN UI",
                                        "JavaScript",
                                        "React",
                                        "Redux/Redux-Toolkit",
                                        "Next.js",
                                        "PHP",
                                        "MySQL",
                                        "Firebase",
                                        "Vercel",
                                        "Git",
                                    ].map((skill) => (
                                        <span
                                            key={skill}
                                            className={`px-4 py-2 rounded-full text-sm font-medium ${darkMode
                                                ? "bg-gray-700 text-indigo-300 border border-indigo-500/30"
                                                : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                                } transition-transform duration-300 transform hover:scale-105`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-8 animate-on-scroll" data-aos="fade-left">
                                <div>
                                    <h3 className="text-2xl font-bold mb-6">Education</h3>
                                    <div
                                        className={`relative border-l-2 ${darkMode ? "border-gray-700" : "border-gray-200"} pl-8 pb-6`}
                                    >
                                        <div className="absolute w-4 h-4 rounded-full -left-[9px] top-0 bg-[#7026ED]"></div>
                                        <h4 className="text-xl font-semibold">
                                            BSc Information Technology
                                        </h4>
                                        <p
                                            className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                        >
                                            Sanskruti College of Thoughts ( Oct-2021 to April-2024 )
                                        </p>
                                    </div>
                                    <div
                                        className={`relative border-l-2 ${darkMode ? "border-gray-700" : "border-gray-200"} pl-8 pb-6`}
                                    >
                                        <div className="absolute w-4 h-4 rounded-full -left-[9px] top-0 bg-[#7026ED]"></div>
                                        <h4 className="text-xl font-semibold">
                                            Higher Secondary Education
                                        </h4>
                                        <p
                                            className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                        >
                                            Shree S.P. Vidhyalaya
                                        </p>
                                    </div>
                                    <div
                                        className={`relative border-l-2 ${darkMode ? "border-gray-700" : "border-gray-200"} pl-8`}
                                    >
                                        <div className="absolute w-4 h-4 rounded-full -left-[9px] top-0 bg-[#7026ED]"></div>
                                        <h4 className="text-xl font-semibold">
                                            Secondary Education
                                        </h4>
                                        <p
                                            className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                        >
                                            Shree S.P. Vidhyalaya
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Skills Section */}
                <section id="skills" className="py-20">
                    <div className="container mx-auto px-6">
                        <div
                            className="text-center mb-16 animate-on-scroll"
                            data-aos="fade-up"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
                            <div className="w-24 h-1 mx-auto bg-[#7026ED]"></div>
                            <p
                                className={`mt-4 max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                                I've developed expertise across various technologies and tools,
                                enabling me to build comprehensive web solutions.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="animate-on-scroll" data-aos="fade-right">
                                <div id="skill-chart" className="w-full h-[400px]"></div>
                            </div>
                            <div className="space-y-6 animate-on-scroll" data-aos="fade-left">
                                <h3 className="text-2xl font-bold mb-6">
                                    Technical Proficiencies
                                </h3>
                                {[
                                    { name: "Frontend Development", value: 90, icon: "fa-code" },
                                    { name: "Backend Development", value: 70, icon: "fa-server" },
                                    { name: "Responsive Design", value: 85, icon: "fa-mobile-alt" },
                                    { name: "State Management", value: 90, icon: "fa-project-diagram" },
                                ].map((skill) => (
                                    <div key={skill.name} className="mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <i
                                                    className={`fas ${skill.icon} mr-3 text-[#E93558]`}
                                                ></i>
                                                <span className="font-medium">{skill.name}</span>
                                            </div>
                                            <span className="font-semibold">{skill.value}%</span>
                                        </div>
                                        <div
                                            className={`w-full h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                                        >
                                            <div
                                                className="h-full rounded-full bg-[#7026ED]"
                                                style={{
                                                    width: `${skill.value}%`,
                                                    transition: "width 1s ease-in-out",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold mb-4">
                                        Tools & Environments
                                    </h3>
                                    <div className="flex flex-wrap gap-6">
                                        {[
                                            { name: "VS Code", icon: "fa-code" },
                                            { name: "Git", icon: "fab fa-github" },
                                            { name: "Vercel", icon: "fa-cloud-upload-alt" },
                                            { name: "MySQL", icon: "fa-database" },
                                        ].map((tool) => (
                                            <div
                                                key={tool.name}
                                                className={`flex flex-col items-center p-4 rounded-lg ${darkMode
                                                    ? "bg-gray-800 hover:bg-gray-700"
                                                    : "bg-gray-100 hover:bg-gray-200"
                                                    } transition-all duration-300 transform hover:scale-105 hover:shadow-md cursor-pointer`}
                                                style={{ minWidth: "100px" }}
                                            >
                                                <i
                                                    className={`fas ${tool.icon} text-2xl mb-2 text-[#E93558]`}
                                                ></i>
                                                <span className="text-sm font-medium">{tool.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Projects Section */}
                <section
                    id="projects"
                    className={`py-20 ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}`}
                >
                    <div className="container mx-auto px-6">
                        <div
                            className="text-center mb-16 animate-on-scroll"
                            data-aos="fade-up"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Featured Projects
                            </h2>
                            <div className="w-24 h-1 mx-auto bg-[#7026ED]"></div>
                            <p
                                className={`mt-4 max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                                A showcase of my recent work, demonstrating my skills and
                                expertise in web development.
                            </p>
                        </div>
                        <div className="grid justify-center md:grid-cols-1 lg:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "WDesignKit WordPress Plugin",
                                    description:
                                        "A comprehensive WordPress plugin for creating and customizing websites with an intuitive interface.",
                                    image:
                                        "/WDesignKit.png",
                                    tech: ["React JS", "PHP", "Next JS", "JavaScript", "SCSS"],
                                },
                                {
                                    title: "DataSphere",
                                    description:
                                        "A complete jewelry store management software with inventory tracking, sales management, and reporting features.",
                                    image:
                                        "https://readdy.ai/api/search-image?query=jewelry%20store%20management%20software%20dashboard%20with%20inventory%20tracking%20and%20sales%20analytics%2C%20professional%20UI%20design%20with%20charts%20and%20graphs%2C%20clean%20minimal%20design%20interface%2C%20high%20quality%20professional%20screenshot&width=600&height=400&seq=3&orientation=landscape",
                                    tech: ["React", "Taildwind", "Firebase", "PHP", "MySQL"]
                                },
                            ].map((project, index) => (
                                <div
                                    key={project.title}
                                    className={`rounded-xl overflow-hidden ${darkMode
                                        ? "bg-gray-800 hover:bg-gray-700"
                                        : "bg-white hover:bg-gray-50"
                                        } shadow-lg transition-all m-auto duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-on-scroll`}
                                    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                                    style={{ animationDelay: `${index * 0.1}s`, maxWidth: "400px" }}
                                >
                                    <div className="relative overflow-hidden group h-48">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* <div
                                            className={`absolute inset-0 ${darkMode ? "bg-emerald-900/30" : "bg-emerald-600/20"} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}
                                        >
                                            <button
                                                className={`px-4 py-2 rounded-md ${darkMode ? "bg-indigo-500 hover:bg-indigo-600" : "bg-indigo-600 hover:bg-indigo-700"} text-white font-medium transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer whitespace-nowrap !rounded-button`}
                                            >
                                                View Details
                                            </button>
                                        </div> */}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold">{project.title}</h3>
                                            <span
                                                className={`text-xs px-2 py-1 rounded ${darkMode
                                                    ? "bg-gray-700 text-indigo-300"
                                                    : "bg-indigo-50 text-indigo-700"
                                                    }`}
                                            >
                                                {project.company}
                                            </span>
                                        </div>
                                        <p
                                            className={`mb-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                        >
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className={`text-xs px-2 py-1 rounded ${darkMode
                                                        ? "bg-gray-700 text-gray-300"
                                                        : "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <a
                                href="https://github.com/Arpit9945?tab=repositories"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-6 py-3 rounded-md ${darkMode
                                    ? "bg-indigo-600 hover:bg-indigo-700"
                                    : "bg-indigo-600 hover:bg-indigo-700"
                                    } text-white font-medium transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg cursor-pointer whitespace-nowrap !rounded-button`}
                            >
                                View All Projects <i className="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                </section>
                {/* Experience Section */}
                <section id="experience" className="py-20">
                    <div className="container mx-auto px-6">
                        <div
                            className="text-center mb-16 animate-on-scroll"
                            data-aos="fade-up"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Work Experience
                            </h2>
                            <div className="w-24 h-1 mx-auto bg-[#7026ED]"></div>
                            <p
                                className={`mt-4 max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                                My professional journey in the world of software development.
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            {[
                                {
                                    company: "Posimyth Innovations",
                                    position: "React JS Developer",
                                    period: "January 2024 - Present",
                                    description:
                                        "Working on WDesignKit WordPress plugin development, implementing new features and optimizing performance. Collaborating with design and QA teams to deliver high-quality software solutions.",
                                    technologies: [
                                        "WordPress",
                                        "PHP",
                                        "JavaScript",
                                        "React JS",
                                        "Next JS",
                                        "SCSS",
                                    ],
                                },
                                {
                                    company: "Felix IT Systems",
                                    position: "Full Stack Developer Trainee",
                                    period: "April 2023 - December 2023",
                                    description:
                                        "Worked as a Full Stack Developer with a primary focus on building responsive and dynamic web applications using React.js. Collaborated with design and backend teams to deliver scalable front-end solutions, optimize performance, and ensure seamless user experiences.",
                                    technologies: ["React", "PHP", "MySQL", "Bootstrap"],
                                },
                            ].map((job, index) => (
                                <div
                                    key={job.company}
                                    className={`relative pl-8 pb-12 ${index !== 1 ? `border-l-2 ${darkMode ? "border-gray-700" : "border-gray-200"}` : ""} animate-on-scroll`}
                                    data-aos="fade-up"
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                >
                                    <div
                                        className={`absolute w-6 h-6 rounded-full -left-3 flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-white"} border-2 ${darkMode ? "border-indigo-400" : "border-indigo-600"}`}
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full ${darkMode ? "bg-emerald-400" : "bg-emerald-600"}`}
                                        ></div>
                                    </div>
                                    <div
                                        className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}
                                    >
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                            <h3 className="text-xl font-bold">{job.position}</h3>
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 ${darkMode
                                                    ? "bg-indigo-900/50 text-indigo-300"
                                                    : "bg-indigo-50 text-indigo-700"
                                                    }`}
                                            >
                                                {job.period}
                                            </span>
                                        </div>
                                        <h4
                                            className={`text-lg font-semibold mb-3 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}
                                        >
                                            {job.company}
                                        </h4>
                                        <p
                                            className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                        >
                                            {job.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {job.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className={`text-xs px-2 py-1 rounded ${darkMode
                                                        ? "bg-gray-700 text-gray-300"
                                                        : "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            {/* Footer */}
            <footer
                className={`py-12 ${darkMode ? "bg-gray-900" : "bg-gray-100"} border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}
            >
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-8 md:mb-0">
                            <h2 className="text-2xl font-bold mb-2">Arpit Pattani</h2>
                            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                Software Developer
                            </p>
                            <div className="flex justify-center space-x-4 mt-4">
                                <a
                                    href="mailto:arpitpattani2004@gmail.com"
                                    className={`text-lg ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300 cursor-pointer`}
                                >
                                    <i className="fas fa-envelope"></i>
                                </a>
                                <a
                                    href="https://github.com/Arpit9945"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-lg ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300 cursor-pointer`}
                                >
                                    <i className="fab fa-github"></i>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/arpit-soni-5035482a2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-lg ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300 cursor-pointer`}
                                >
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center md:items-end">
                            <p
                                className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}
                            >
                                Built with <i className="fas fa-heart text-red-500"></i> by Arpit
                                Pattani.
                            </p>
                            <p
                                className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}
                            >
                                &copy; {new Date().getFullYear()} Arpit Pattani. All rights
                                reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Back to top button */}
            {isVisible &&
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-50 transition-all duration-300 transform hover:scale-110 ${darkMode
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        } cursor-pointer whitespace-nowrap !rounded-button`}
                >
                    <i className="fas fa-arrow-up"></i>
                </button>
            }
            {/* Global styles */}
            <style>{`
@keyframes float {
0%, 100% {
transform: translateY(0);
}
50% {
transform: translateY(-20px);
}
}
@keyframes slideInFromRight {
from {
transform: translateX(100%);
}
to {
transform: translateX(0);
}
}
.name-animation {
display: inline-block;
animation: nameSlide 1s ease-out forwards;
opacity: 0;
transform: translateY(20px);
}
@keyframes nameSlide {
0% {
opacity: 0;
transform: translateY(20px);
}
100% {
opacity: 1;
transform: translateY(0);
}
}
@keyframes titleAnimation {
0%, 16% {
opacity: 1;
transform: translateY(0);
}
20%, 21% {
opacity: 0;
transform: translateY(-10px);
}
24%, 91% {
opacity: 0;
transform: translateY(10px);
}
95%, 100% {
opacity: 1;
transform: translateY(0);
}
}
.animate-on-scroll {
opacity: 0;
transform: translateY(20px);
transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.animate-visible {
opacity: 1;
transform: translateY(0);
}
body {
overflow-x: hidden;
}
body.dark-mode {
background-color: #111827;
color: #f9fafb;
}
/* Hide number input arrows */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
-webkit-appearance: none;
margin: 0;
}
input[type=number] {
-moz-appearance: textfield;
}
`}</style>
        </div>
    );
};
export default Portfolio;
