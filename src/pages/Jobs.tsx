
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { JobCard } from "@/components/JobCard";
import { fetchJobs } from "@/services/jobService";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 12;

const Jobs = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch jobs from Remotive API
    const { data: jobs = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["jobs"],
        queryFn: () => fetchJobs("software-dev", 50),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });

    // Sort jobs by postedDate descending (latest first)
    const sortedJobs = [...jobs].sort((a, b) =>
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    );

    // Pagination logic
    const totalPages = Math.ceil(sortedJobs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentJobs = sortedJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo(0, 0);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-amber-600 mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Loading job opportunities...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Jobs</h2>
                    <p className="text-gray-600 mb-6">
                        {error instanceof Error ? error.message : "Something went wrong while fetching job listings."}
                    </p>
                    <Button
                        onClick={() => refetch()}
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Career <span className="text-amber-600">Opportunities</span>
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        Explore remote job opportunities in tech from around the world.
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                        Powered by Remotive • {jobs.length} jobs available
                    </p>
                </div>

                {currentJobs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600">No jobs available at the moment. Check back later!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {currentJobs.map((job) => (
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
                )}

                {totalPages > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <PaginationItem key={i + 1}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === i + 1}
                                        onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
};

export default Jobs;
