import { Calendar, Star } from "lucide-react";

 const experiences = [
  {
    period: "Jun 2023 - Present",
    degree: "Bachelor of Science (BSc Hons) in Information Technology",
    specialization: "Specializing in Software Engineering",
    institute: "Sri Lanka Institute of Information Technology (SLIIT), Malabe",
      logo: "/logos/sliit.png",
    summary:
      "Pursuing a degree with a focus on software engineering, actively engaging in modern web and mobile technologies.",
    description:
      "Currently pursuing a Bachelor of Science (Hons) degree in Information Technology with a specialization in Software Engineering. Developing strong expertise in full-stack development, mobile application development, and AI through academic and real-world projects.",
    highlights: [
      "Undergraduate – 3rd Year",
      "Specialization: Software Engineering",
      "Skills: React.js, Node.js, Express.js, MongoDB, Python, Java, Kotlin, Machine Learning, Web & Mobile Development",
    ],
    current: true,
  },
  {
    period: "2008 - 2021",
    degree: "GCE Advanced Level & Ordinary Level",
    specialization: "Physical Science Stream",
    institute: "Southlands College, Galle",
    logo: "/logos/southlands.jpg",
    summary:
      "Completed schooling with leadership roles and diverse extracurricular activities, building a strong foundation in teamwork and discipline.",
    description:
      "Completed primary and secondary education with a strong academic background in the Physical Science stream. Actively participated in sports, leadership roles, and extracurricular activities, developing teamwork, discipline, and leadership skills.",
    highlights: [
      "GCE A/L: 3C passes (Combined Mathematics, Physics, Chemistry)",
      "GCE O/L: 7A and 2B passes",
      "Leadership: Games Captain – Inter House Sports Meet (2020)",
      "Sports: Member of Badminton & Athletic Teams with multiple achievements",
    ],
    current: false,
  },
];






export const Experience = () =>{
    return <section id="experience" className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"/>

        <div className="container mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="max-w-3xl mb-16">
                <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">Education Journey</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
                    Experience that {""} <span className="font-serif italic font-normal text-white"> {""} speaks volumes. </span>
                </h2>

                <p className="text-muted-foreground animate-fade-in animation-delay-200"> A journey of my academic and professional growth, from a passionate IT undergraduate to a future software engineer building impactful digital solutions.</p>
            </div>

            {/* Experience Timeline */}
            <div className="relative">

                <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]"/>
                    {/*Experience items*/}

                    <div className="space-y-12">
                        {experiences.map((exp,idx) => (
                            <div key={idx} className="relative grid md:grid-cols-2 gap-8 animate-fade-in"
                        style={{animationDelay:`${180 + idx * 180}ms`,animationDuration:"1.1s"}}>

                                {/*Timeline Dot*/}
                          <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 z-10">
                            <div className="relative h-14 w-14 rounded-full bg-surface border border-border/60 ring-4 ring-background overflow-hidden flex items-center justify-center">
                              {exp.current && (
                                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                              )}

                              <img
                                src={exp.logo}
                                alt={exp.institute}
                                className="w-10 h-10 object-contain"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.src = "/vite.svg";
                                }}
                              />
                            </div>
                          </div>

                            {/*Left summary card*/}
                            <div className="pl-8 md:pl-0 md:pr-16">
                            <div className="glass p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-500">
                              <div className="flex items-center gap-1 text-foreground/90">
                                {[...Array(5)].map((_, starIdx) => (
                                  <Star key={starIdx} className="w-4 h-4 fill-current" />
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{exp.summary}</p>

                              <div className="mt-6 flex items-center justify-center">
                                <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-border/50 overflow-hidden flex items-center justify-center">
                                  <img
                                    src={exp.logo}
                                    alt={exp.institute}
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                    onError={(e) => {
                                      e.currentTarget.src = "/vite.svg";
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            </div>

                            {/*Right detailed content*/}
                            <div className="md:col-start-2 md:pl-16">
                            <div className="space-y-5">
                              <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                                {exp.institute} {""} <span className="text-muted-foreground">-</span> {""} {exp.degree}
                              </h3>

                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>{exp.period}</span>
                              </div>

                              <p className="text-muted-foreground italic">Highlights</p>
                              <ul className="space-y-3 text-muted-foreground">
                                {exp.highlights.map((item, itemIdx) => (
                                  <li key={itemIdx} className="flex gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <span className="text-sm leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            </div>
                        </div>
                      ))}
                    </div>    
            </div>

        </div>
    </section>;
};