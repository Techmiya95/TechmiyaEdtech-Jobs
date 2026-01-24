
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchJobById } from "@/services/jobService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Briefcase, Building2, ExternalLink, Loader2, AlertCircle, DollarSign } from "lucide-react";

const JobDetails = () => {
    const { jobId } = useParams();

    const { data: job, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["job", jobId],
        queryFn: () => fetchJobById(jobId || ""),
        enabled: !!jobId,
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-amber-600 mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Loading job details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Job</h2>
                    <p className="text-gray-600 mb-6">
                        {error instanceof Error ? error.message : "Something went wrong."}
                    </p>
                    <div className="space-x-4">
                        <Button onClick={() => refetch()} className="bg-amber-600 hover:bg-amber-700 text-white">
                            Try Again
                        </Button>
                        <Link to="/">
                            <Button variant="outline">Back to Jobs</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Job not found
    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center px-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h2>
                    <p className="text-gray-600 mb-6">This job listing may have been removed or is no longer available.</p>
                    <Link to="/">
                        <Button className="bg-amber-600 hover:bg-amber-700 text-white">Back to Jobs</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const formattedDate = new Date(job.postedDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <article className="max-w-4xl mx-auto">
                <Link to="/">
                    <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-amber-600">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
                    </Button>
                </Link>

                {/* Header */}
                <div className="border-b border-gray-200 pb-8 mb-8">
                    <div className="flex items-start gap-4 mb-4">
                        {job.companyLogo ? (
                            <img
                                src={job.companyLogo}
                                alt={`${job.companyName} logo`}
                                className="w-16 h-16 rounded-xl object-contain bg-gray-100 p-2"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                        )}
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                {job.title}
                            </h1>
                            <p className="text-xl text-amber-700 font-medium mt-1">{job.companyName}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4">
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.location}</span>
                        <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Posted on {formattedDate}</span>
                        <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {job.type}</span>
                        {job.salary && job.salary !== "Not specified" && (
                            <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" /> {job.salary}</span>
                        )}
                    </div>

                    {/* Tags */}
                    {job.tags && job.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {job.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="prose prose-lg text-gray-700 max-w-none">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h3>
                    <div className="whitespace-pre-wrap leading-relaxed">
                        {job.fullDescription}
                    </div>
                </div>

                {/* Footer / Application */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-xl text-center mt-12 border border-amber-100">
                    <h3 className="text-xl font-bold mb-2">Interested in this role?</h3>
                    <p className="text-gray-600 mb-6">Apply directly on the company's website</p>
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg">
                            Apply Now <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                    </a>
                    <p className="mt-4 text-sm text-gray-500">You will be redirected to an external application portal.</p>
                </div>

            </article>
        </div>
    );
};

export default JobDetails;
