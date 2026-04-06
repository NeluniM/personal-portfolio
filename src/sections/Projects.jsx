import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";
import { apiFetch } from "@/lib/api";

const projects = [
    {
       title:"Online Gym Management System",
         description:"A modern Online Gym Management System built using the MERN stack (MongoDB, Express.js, React, Node.js). This platform streamlines gym operations by enabling user registration, membership management, workout scheduling, and payment tracking. Featuring a responsive design, it offers an intuitive interface for both gym admins and members to manage routines, track progress, and access real-time updates. ",
         image: "/projects/project-1.jpg",
         tags:["React","Node.js","MongoDB"],
         github:"https://github.com/NeluniM/Online-Bus-Ticket-Reservation-System"

    },
     {
       title:"Online Bus-Ticket Reservation System",
         description:"An efficient Online Bus Ticket Reservation System developed using Java. This platform simplifies the booking process by offering user registration, seat selection, fare calculation, and ticket confirmation. With a user-friendly interface, it provides real-time bus availability and schedule updates for passengers, while admins can manage routes and bookings seamlessly. The system ensures secure transactions and robust performance, making it a reliable solution for bus reservation management.",
         image: "/projects/project-2.jpg",
         tags:["Java"],
         github:"https://github.com/NeluniM/Online-Bus-Ticket-Reservation-System"

    },
     {
       title:"Online Shopping App",
         description:"An elegant Online Shopping App designed using Figma, Nelunique offers a seamless and stylish shopping experience. This platform allows users to browse a curated collection of fashion and lifestyle products, featuring user registration, product selection, and secure checkout. With a user-friendly interface, it provides real-time updates on new arrivals and personalized recommendations. Admins can effortlessly manage inventory and promotions, ensuring a smooth operation. The app ensures secure transactions and robust performance, making it a reliable solution for modern online shopping.",
         image: "/projects/project-3.png",
         tags:["Figma"],
         github:"https://github.com/NeluniM/Online-Bus-Ticket-Reservation-System"

    },

    {
       title:"Online Finance Tracking",
         description:"Spendora is a Online Finance Tracker mobile app developed using Android Studio, designed to help users manage their finances effortlessly. This app allows users to input their monthly income and track both expenses and income with ease. Featuring a user-friendly interface, it provides real-time summaries of financial data, including income trends and expense breakdowns by category. Users can monitor their financial health with intuitive visualizations and insights, ensuring secure data handling and a reliable solution for personal finance management.",
         image: "/projects/project-4.png",
         tags:["Android Studio"],
         github:"https://github.com/NeluniM/Online-Bus-Ticket-Reservation-System"

    },

    {
       title:"eduERP – Educational Resource Planning System",
         description:"A modern Educational Resource Planning system built using the MERN stack (MongoDB, Express.js, React, Node.js). This platform streamlines school administration by enabling role-based access, staff management, leave tracking, payroll handling, and inventory management. Featuring a responsive design, it provides an intuitive interface for admins and teachers to manage daily operations efficiently. The system ensures secure authentication, real-time data handling, and scalability, making it a reliable solution for educational institutions.",
         image: "/projects/project-5.jpeg",
         tags:["React","Node.js","MongoDB"],
         github:"https://github.com/NeluniM/Online-Bus-Ticket-Reservation-System"

    },

    {
       title:"GoalBridge — Bridging Data for a Better Tomorrow",
         description:"An innovative mobile solution designed to empower NGOs, government institutions, donors, and citizens in visualizing and monitoring Sustainable Development Goals. Built with React Native and modern design systems, the platform provides interactive dashboards, transparent data visualization, and impact reporting features. With AI-powered insights, multilingual support, and an inclusive user experience, GoalBridge enables data-driven decision-making while ensuring accessibility, scalability, and real-world impact.",
         image: "/projects/project-6.jpg",
         tags:["React Native","Figma","MongoDB","JavaScript","Node.js"],
         github:"https://github.com/NeluniM/Online-Bus-Ticket-Reservation-System"

    },







]









export const Projects = () =>{
    const [apiProjects, setApiProjects] = useState(null);

    useEffect(() => {
        let isMounted = true;
        apiFetch("/api/projects")
            .then((res) => {
                const list = Array.isArray(res?.projects) ? res.projects : [];
                if (isMounted && list.length) {
                    setApiProjects(list);
                }
            })
            .catch(() => {
                // fallback to local list
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const projectsToRender = useMemo(() => {
        if (Array.isArray(apiProjects) && apiProjects.length) return apiProjects;
        return projects;
    }, [apiProjects]);

    return <section id="projects" className="py-32 relative overflow-hidden">
        {/*Bg glows */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center mx-auto max-w-3xl mb-16">
                <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">Featured Work</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
                    Projects that
                    <span className="font-serif italic font-normal text-white"> {""}
                        make an impact.</span>
                </h2>
                <p className="text-muted-foreground animate-fade-in animation-delay-200">
                    A selection of my recent work, from complex web applications to tools that solve real-world problems.
                </p>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {projectsToRender.map((project, idx) => (
                    <div key={idx} className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
                    style={{animationDelay:`${(idx +1) * 100}ms`}}>
                        
                        {/*image*/}
                        <div className="relative overflow-hidden aspect-video"> 
                            <img src={project.image || "/vite.svg"} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60"/>

                            {/*overlay links*/}
                            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`Open ${project.title} on GitHub`}
                                        className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                 </div>

                        </div>
                        
                        {/*Content*/}
                        <div className="p-6 space-y-4"> 
                            <div className="flex items-start justify-between">

                                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:translate-y-1 transition-all" />
                                </div>
                                <p className="text-muted-foreground text-sm">{project.description}</p>
                                <div className="flex flex-wrap gap-2">{(project.tags || []).map((tag,tagIdx) => (
                                    <span className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300" key={tagIdx}>{tag}</span>
                                ))}</div>
                        </div>


                         </div>
                ))}

            </div>
            {/* View All Button */}
            <div className="text-center mt-12 animate-fade-in animation-delay-500">
                
                    <AnimatedBorderButton>
                        View All Projects
                        <ArrowUpRight className="w-5 h-5"/>
                    </AnimatedBorderButton>
            </div>
        </div>
    </section>;
};