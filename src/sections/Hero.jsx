
import {Button} from '@/components/Button';
import { ArrowRight ,ChevronDown, Github, Linkedin} from 'lucide-react';
import { useState } from 'react';
import { AnimatedBorderButton } from '../components/AnimatedBorderButton';
import { Link } from 'react-router-dom';

const skills =[
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "MongoDB",
    "Figma",
    "Git",
    "GitHub",
    "Node.js",
    "Express.js",
    "MySQL",
    "SQL developer",


]

;
export const Hero = () =>{
    const [dots] = useState(() =>
        Array.from({ length: 30 }, () => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 5}s`,
        }))
    );

    return <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
          {/*Bg*/}
            <div className="absolute inset-0">
                <img src="/projects/hero-bg.jpg" alt="Hero image" className="w-full h-full object-cover opacity-40"/>
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background"/>
            </div>



            {/*Green Dots*/}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {dots.map((dot,i) => (
                <div key={i} className="absolute w-1.5 h-1.5 rounded-full opacity-60" 
                style={{
                    backgroundColor: "var(--color-primary)",
                    left: dot.left,
                    top: dot.top,
                    animation:`slow-drift 50s ease-in-out infinite`,
                    animationDelay: dot.delay,
                }}
                
                />
            ))}
        </div>

        {/*Content*/}

            <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/*Left Column - Text Content*/}
            <div className="space-y-8">
                <div className="animate-fade-in">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                    <span className="w-2 h-2 bg-primary rounded-full  animate-pulse"/>
                        Software Engineer - React Specialist
                
                    </span>
                </div>

                {/*Headline*/}
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                        Crafting <span className="text-primary glow-text">digital</span>
                        <br/>
                        experience with
                        <br/>
                        <span className="font-serif italic font-normal text-white">
                            precision.
                        </span>
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animate-delay-800">
                       Hi, I’m Neluni Madeesha, a Software Engineering undergraduate , focused on building scalable web and mobile applications with modern technologies. 
                    </p>
                </div>

                {/*CTAs section*/}
                <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
                    <Link to="/contact">
                        <Button size="lg">
                            Contact Me <ArrowRight className="w-5 h-5"/>
                        </Button>
                    </Link>

                    <AnimatedBorderButton href="/cv.pdf" download>
                        Download CV
                    </AnimatedBorderButton>

                </div>
                {/*Social Links*/}
                <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
                    <span className="text-sm text-muted-foreground">Follow me:</span>
                    {[
                        {icon: Github, href:"https://github.com/NeluniM"},
                        {icon: Linkedin, href:"http://www.linkedin.com/in/neluni-madeesha-wickramathilaka"},
                    ].map((social) => {
                        const Icon = social.icon;
                        return (
                            <a key={social.href} href={social.href} target="_blank" rel="noreferrer" className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300">
                                <Icon className="w-5 h-5" />
                            </a>
                        );
                    })}
                </div>

            </div>
                    {/*Right Column - Profile Image*/}
                    <div className="relative animate-fade-in animation-delay-300">
                        {/*Profile Image*/}
                        <div className="relative max-w-md mx-auto">
                           <div
                           className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-primary/10 blur-2xl animate-pulse"
                           />
                            <div className="relative glass rounded-3xl p-2 glow-border">
                                <img src="/projects/profile-photo.jpeg" alt="Neluni Madeesha" className="w-full aspect-[4/5] object-cover rounded-2xl"/>
                                {/* Floating Badge */}
                                <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"/>
                                        <span className="text-sm font-medium">
                                            Available for Work</span>
                                    </div>
                                </div>
                                {/* Stats Badge*/}
                                <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500">
                                    <div className="text-2xl font-bold text-primary">6+</div>
                                    <div className="text-xs text-muted-foreground">Months Exp.</div>
                                </div>

                            </div>
                        </div>
                    </div>
                
                </div>

                {/*Skills Section*/}
                <div className="mt-20 animate-fade-in animation-delay-600">

                    <p className="text-sm text-muted-foreground mb-6 text-center">
                        Technologies I work with
                    </p>
                    <div className="relative overflow-hidden">
                        <div className="flex animate-marquee">
                           {[...skills, ...skills].map ((skill, idx) => (
                            <div key={idx} className="flex-shrink-0 px-8 py-4"> 
                                <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">{skill}</span></div>
                           ))} 
                        </div>
                    </div>
                </div>
            </div>

             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-800">
                <Link
                to="/about"
                className="flex flex-col items-center gap-2 text-muted-foreground" 
                >
                    <span className="text-xs uppercase tracking-wider">Scroll</span>
                    <ChevronDown className="w-6 h-6 animate-bounce" />

                </Link>
                
            </div>             
    </section>

  



};