import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
    {
        icon: Code2,
        title: "Clean Code",
        description: "Writing maintainable, scalable code that stands the test of time.",
    },
    {
        icon: Rocket,
        title: "Performance",
        description: "Optimizing for speed and delivering lightning-fast user experiences.",
    },
    {
        icon: Users,
        title: "Collaboration",
        description: "Working closely with teams to bring ideas to life.",
    },
    {
        icon: Lightbulb,
        title: "Innovation",
        description: "Staying ahead with the latest technologies and best practices.",
    },
];

export const About = () => {
    return (
        <section id="about" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <div className="animate-fade-in">
                        <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">About Me</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">Building the Future,
                        <span className="font-serif italic font-normal text-white">
                          one component at a time.  
                        </span>
                    </h2>

                    <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200 ">
                        <p>
I’m a passionate software engineering undergraduate with a strong focus on building impactful digital solutions. Currently pursuing my BSc (Hons) in Information Technology at SLIIT, I’ve developed a solid foundation in full-stack development, mobile applications, and modern software engineering practices. My journey in tech started with curiosity and has grown into a deep interest in creating scalable, user-centered systems that solve real-world problems.
</p>

<p>
I have hands-on experience working with technologies like React, Node.js, Java Spring Boot, and MongoDB, along with mobile development using React Native and Kotlin. From developing enterprise-level systems at Ceylon Electricity Board to building AI-powered applications and UX-driven mobile apps, I enjoy combining technical skills with creativity to deliver high-quality solutions.
</p>

<p>
Beyond coding, I’m a collaborative team player who values clean architecture, problem-solving, and continuous learning. I’m always exploring new technologies and opportunities to grow as a software engineer while contributing to innovative and meaningful projects.
</p>
                    </div>

                    <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
                        <p className="text-lg font-medium italic text-foreground">
"My mission is to build innovative and scalable digital solutions that solve real-world problems — creating systems that are efficient, user-friendly, and impactful while continuously growing as a software engineer."
</p>
                    </div>
                </div>
                {/*Right Column -Highlights*/}
                <div className="grid sm:grid-cols-2 gap-6">
                    {highlights.map((item,idx)=> (
                        <div key={idx} className="glass p-6 rounded-2xl animate-fade-in" style={{animationDelay:`${(idx +1) * 100}ms`}}>
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20"><item.icon className="w-6 h-6 text-primary" /></div>
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>    
                    ))}
                </div>
                </div>
            </div>
        </section>
    );
};