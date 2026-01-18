
import { useParams, Link } from "react-router-dom";
import { jobs } from "@/data/jobs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Briefcase } from "lucide-react";

const JobDetails = () => {
    const { jobId } = useParams();
    const job = jobs.find((j) => j.id === jobId);

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center px-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h2>
                    <Link to="/">
                        <Button>Back to Jobs</Button>
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
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
                        {job.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.location}</span>
                        <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Posted on {formattedDate}</span>
                        <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {job.type}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg text-gray-700 max-w-none">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h3>
                    <p className="mb-8">{job.fullDescription}</p>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-8">
                        {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>

                {/* Footer / Application */}
                <div className="bg-gray-50 p-8 rounded-xl text-center mt-12">
                    <h3 className="text-xl font-bold mb-4">Interested in this role?</h3>
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg">
                            Apply Now
                        </Button>
                    </a>
                    <p className="mt-4 text-sm text-gray-500">You will be redirected to our application portal.</p>
                </div>

            </article>
        </div>
    );
};

export default JobDetails;
