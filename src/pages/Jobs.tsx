
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/services/jobService";
import { JobCard } from "@/components/JobCard";
import { Loader2, AlertCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";

const Jobs = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const {
        data: jobs,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["jobs"],
        queryFn: () => fetchJobs("software-dev", 50),
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });

    const filteredJobs = useMemo(() => {
        if (!jobs) return [];
        if (!searchTerm.trim()) return jobs;
        const term = searchTerm.toLowerCase();
        return jobs.filter(
            (job) =>
                job.title.toLowerCase().includes(term) ||
                job.companyName.toLowerCase().includes(term) ||
                job.location.toLowerCase().includes(term)
        );
    }, [jobs, searchTerm]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
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
                        Browse the latest job openings from top companies. Apply
                        directly and take the next step in your career.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-10">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by job title, company, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="w-12 h-12 animate-spin text-amber-600 mb-4" />
                        <p className="text-lg text-gray-600">
                            Loading jobs...
                        </p>
                    </div>
                )}

                {/* Error State */}
                {isError && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Failed to Load Jobs
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {error instanceof Error
                                ? error.message
                                : "Something went wrong."}
                        </p>
                        <Button
                            onClick={() => refetch()}
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                        >
                            Try Again
                        </Button>
                    </div>
                )}

                {/* Job Listings */}
                {!isLoading && !isError && (
                    <>
                        <p className="text-sm text-gray-500 mb-6">
                            Showing{" "}
                            <span className="font-semibold text-gray-700">
                                {filteredJobs.length}
                            </span>{" "}
                            {filteredJobs.length === 1 ? "job" : "jobs"}
                            {searchTerm.trim() && (
                                <>
                                    {" "}
                                    for &ldquo;
                                    <span className="font-medium">
                                        {searchTerm}
                                    </span>
                                    &rdquo;
                                </>
                            )}
                        </p>

                        {filteredJobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredJobs.map((job) => (
                                    <JobCard
                                        key={job.id}
                                        id={job.id}
                                        title={job.title}
                                        description={job.shortDescription}
                                        postedDate={job.postedDate}
                                        location={job.location}
                                        type={job.type}
                                        companyName={job.companyName}
                                        companyLogo={job.companyLogo}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-lg">
                                    No jobs found matching your search.
                                </p>
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="mt-3 text-amber-600 hover:text-amber-700 font-medium underline"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </>
                )}

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
