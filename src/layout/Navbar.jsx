import {Button} from "@/components/Button";
import { Home as HomeIcon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
    {to:"/",label:"Home", icon: HomeIcon},
    {to:"/about",label:"About"},
    {to:"/projects",label:"Projects"},
    {to:"/experience",label:"Experience"},
    {to:"/contact",label:"Contact"},
];

export const Navbar = () => {

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    useEffect(() => {

        const handleScroll = () => {
           setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll",handleScroll);

        return () => window.removeEventListener("scroll",handleScroll);
    }, []);

    const closeMobileMenu = () => setMobileMenuOpen(false);
    
    return (
        <header className={`fixed top-0 left-0 right-0 transition-all duration-500 ${isScrolled ? "glass-strong py-3" : "bg-transparent py-5"} z-50`}>
            <nav className="container mx-auto px-6 flex items-center">
                <div className="hidden md:block flex-1" aria-hidden="true" />

                <div className="hidden md:flex items-center justify-center flex-none">
                    <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
                        {navLinks.map((link, index) => (
                            <NavLink
                                to={link.to}
                                key={index}
                                end={link.to === "/"}
                                aria-label={link.label}
                                title={link.label}
                                className={({ isActive }) =>
                                    [
                                        "px-4 py-2 text-sm rounded-full hover:bg-surface inline-flex items-center justify-center",
                                        isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground",
                                    ].join(" ")
                                }
                            >
                                {link.icon ? (
                                    <>
                                        <link.icon className="h-5 w-5" aria-hidden="true" />
                                        <span className="sr-only">{link.label}</span>
                                    </>
                                ) : (
                                    link.label
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                    {/*CTA Button*/}
                    <div className="hidden md:block">
                        <NavLink to="/contact">
                            <Button size="sm">Contact Me</Button>
                        </NavLink>
                    </div>

                    {/*Mobile Menu Button*/}
                    <button
                        className="md:hidden p-2 text-foreground cursor-pointer"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>
            </nav>

            {/*Mobile Menu*/}
            {isMobileMenuOpen && (
                <div className="md:hidden glass-strong animate-fade-in">
                    <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                        {navLinks.map((link, index) => (
                            <NavLink
                                to={link.to}
                                key={index}
                                onClick={closeMobileMenu}
                                end={link.to === "/"}
                                aria-label={link.label}
                                title={link.label}
                                className={({ isActive }) =>
                                    [
                                        "text-lg py-2 inline-flex items-center gap-2",
                                        isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground",
                                    ].join(" ")
                                }
                            >
                                {link.icon ? (
                                    <>
                                        <link.icon className="h-5 w-5" aria-hidden="true" />
                                        <span className="sr-only">{link.label}</span>
                                    </>
                                ) : (
                                    link.label
                                )}
                            </NavLink>
                        ))}

                        <NavLink to="/contact" onClick={closeMobileMenu}>
                            <Button size="sm">Contact Me</Button>
                        </NavLink>
                    </div>
                </div>
            )}
        </header>
    );
};