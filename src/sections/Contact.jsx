import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { sendContact } from "@/lib/api";

export const Contact = () => {
    const contactEmail = "madeeshaneluni@gmail.com";

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const mailtoHref = useMemo(() => {
        const subject = encodeURIComponent(
            `Portfolio inquiry${form.name ? ` from ${form.name}` : ""}`
        );
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );
        return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    }, [contactEmail, form.email, form.message, form.name]);

    const socials = [
        { icon: Github, href: "https://github.com/NeluniM", label: "GitHub" },
        {
            icon: Linkedin,
            href: "https://www.linkedin.com/in/neluni-madeesha-wickramathilaka",
            label: "LinkedIn",
        },
    ];

    const onSendClick = () => {
        // Keep existing mailto UX, but also persist to backend
        // so messages show up in the admin dashboard.
        void sendContact({
            name: form.name,
            email: form.email,
            message: form.message,
        }).catch(() => {
            // ignore
        });
    };


    return (
        <section id="contact" className="py-32 relative overflow-hidden">
            {/*Bg glows*/}
            <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mx-auto max-w-3xl mb-16">
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
                        Contact
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
                        Let’s build something {""}
                        <span className="font-serif italic font-normal text-white">
                            meaningful.
                        </span>
                    </h2>
                    <p className="text-muted-foreground animate-fade-in animation-delay-200">
                        Have a project in mind, a role to discuss, or want to collaborate? Send a message and I’ll get back to you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-10 items-start">
                    {/* Left column */}
                    <div className="lg:col-span-2 space-y-6 animate-fade-in animation-delay-300">
                        <div className="glass rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Email</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Prefer email? Reach me at
                                    </p>
                                    <a
                                        className="mt-2 inline-flex text-sm font-medium text-primary hover:underline"
                                        href={`mailto:${contactEmail}`}
                                    >
                                        {contactEmail}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="glass rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Location</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Sri Lanka · Open to remote opportunities
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-lg font-semibold">Connect</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                You can also reach out via social.
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                {socials.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.href}
                                            href={social.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={social.label}
                                            className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right column - form */}
                    <div className="lg:col-span-3 glass rounded-2xl p-6 md:p-8 animate-fade-in animation-delay-400">
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground">Your name</label>
                                    <input
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm((prev) => ({ ...prev, name: e.target.value }))
                                        }
                                        className="w-full rounded-2xl glass px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                        placeholder="Enter your name"
                                        type="text"
                                        autoComplete="name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground">Your email</label>
                                    <input
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm((prev) => ({ ...prev, email: e.target.value }))
                                        }
                                        className="w-full rounded-2xl glass px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                        placeholder="name@company.com"
                                        type="email"
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">Message</label>
                                <textarea
                                    value={form.message}
                                    onChange={(e) =>
                                        setForm((prev) => ({ ...prev, message: e.target.value }))
                                    }
                                    className="w-full min-h-40 rounded-2xl glass px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    placeholder="Tell me a bit about what you’re looking to build..."
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                                <p className="text-xs text-muted-foreground">
                                    This opens your email client with the message pre-filled.
                                </p>

                                <a href={mailtoHref} aria-label="Send message" onClick={onSendClick}>
                                    <Button size="lg">
                                        Send Message <Send className="w-5 h-5" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};