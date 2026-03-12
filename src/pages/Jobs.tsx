
import { Building2, GraduationCap, ArrowRight } from "lucide-react";

const Jobs = () => {
    const cards = [
        {
            title: "On Campus",
            subtitle: "Campus Recruitment Drives",
            description:
                "Explore exclusive on-campus placement opportunities from top recruiters visiting your college. Get hired directly through campus drives.",
            icon: GraduationCap,
            gradient: "from-amber-500 via-orange-500 to-red-500",
            hoverGradient: "from-amber-600 via-orange-600 to-red-600",
            bgAccent: "bg-amber-50",
            borderAccent: "border-amber-200",
            iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
            shadowColor: "shadow-amber-200/50",
            link: "https://oncampusjobs.techmiyaedtech.com",
        },
        {
            title: "Off Campus",
            subtitle: "Open Job Opportunities",
            description:
                "Discover off-campus job openings across the industry. Apply to positions from leading companies hiring fresh graduates and experienced professionals.",
            icon: Building2,
            gradient: "from-blue-500 via-indigo-500 to-purple-500",
            hoverGradient: "from-blue-600 via-indigo-600 to-purple-600",
            bgAccent: "bg-blue-50",
            borderAccent: "border-blue-200",
            iconBg: "bg-gradient-to-br from-blue-400 to-indigo-500",
            shadowColor: "shadow-blue-200/50",
            link: "https://offcampusjobs.techmiyaedtech.com",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                        Explore Opportunities
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tight">
                        Find Your{" "}
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                            Dream Job
                        </span>
                    </h1>
                    <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed">
                        Choose your path — explore on-campus placement drives or discover
                        off-campus opportunities across the industry.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.title}
                                className={`group relative rounded-2xl border ${card.borderAccent} ${card.bgAccent} p-8 lg:p-10 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl ${card.shadowColor} cursor-pointer overflow-hidden`}
                            >
                                {/* Background decoration */}
                                <div
                                    className={`absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`}
                                />
                                <div
                                    className={`absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-br ${card.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-15 transition-opacity duration-500`}
                                />

                                {/* Icon */}
                                <div
                                    className={`relative z-10 w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                                >
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                        {card.subtitle}
                                    </p>
                                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                                        {card.title}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        {card.description}
                                    </p>

                                    {/* Button */}
                                    <a
                                        href={card.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2 bg-gradient-to-r ${card.gradient} hover:${card.hoverGradient} text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group/btn`}
                                    >
                                        Explore {card.title}
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom accent */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-400">
                        Powered by{" "}
                        <span className="font-semibold text-amber-600">
                            Techmiya EdTech
                        </span>{" "}
                        • Connecting talent with opportunity
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
