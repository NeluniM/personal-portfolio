export const AnimatedBorderButton = ({ children, href, ...props }) => {
    const Component = href ? "a" : "button";
    return(
        <Component
            href={href}
            type={href ? undefined : "button"}
            className="relative bg-transparent border border-border text-foreground hover:border-primary/50 transition-all duration-1000 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group px-8 py-4 text-lg font-medium rounded-full overflow-visible animated-border"
            {...props}
        >
                        {/* Animated SVG Border */}
                        <svg
                            className="absolute left-0 top-0 w-full h-full pointer-events-none"
                            viewBox="0 0 200 60"
                            preserveAspectRatio="none"
                            style={{ overflow: "visible" }}
                        >
                            <path
                                d="M30,1 H170 A29,29 0 0 1 199,30 V30 A29,29 0 0 1 170,59 H30 A29,29 0 0 1 1,30 V30 A29,29 0 0 1 30,1 Z"
                                fill="none"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                strokeDasharray="400 550"
                                strokeDashoffset="400"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="animated-border-path"
                            />
                        </svg>
                        <span className="relative z-10 flex items-center justify-center gap-2"> 
                            {children}
                            </span>
                    </Component>
    )
}