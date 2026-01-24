import { Job, RemotiveApiResponse, RemotiveJob } from "@/types/job";

const API_BASE_URL = "https://remotive.com/api/remote-jobs";

/**
 * Strip HTML tags from description and create a short preview
 */
const stripHtml = (html: string): string => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};

/**
 * Create a short description from the full description
 */
const createShortDescription = (fullDescription: string, maxLength: number = 150): string => {
    const stripped = stripHtml(fullDescription);
    if (stripped.length <= maxLength) return stripped;
    return stripped.substring(0, maxLength).trim() + "...";
};

/**
 * Map Remotive API job to internal Job model
 */
export const mapRemotiveJobToJob = (remoteJob: RemotiveJob): Job => {
    const strippedDescription = stripHtml(remoteJob.description);
    return {
        id: remoteJob.id.toString(),
        title: remoteJob.title,
        companyName: remoteJob.company_name,
        companyLogo: remoteJob.company_logo,
        shortDescription: createShortDescription(remoteJob.description),
        fullDescription: strippedDescription,
        location: remoteJob.candidate_required_location || "Remote",
        type: remoteJob.job_type || "Full-time",
        postedDate: remoteJob.publication_date,
        applyUrl: remoteJob.url,
        salary: remoteJob.salary || "Not specified",
        tags: remoteJob.tags || [],
    };
};

/**
 * Fetch jobs from Remotive API
 */
export const fetchJobs = async (category: string = "software-dev", limit: number = 50): Promise<Job[]> => {
    const url = `${API_BASE_URL}?category=${category}&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
    }

    const data: RemotiveApiResponse = await response.json();

    return data.jobs.map(mapRemotiveJobToJob);
};

/**
 * Fetch a single job by ID
 * Note: Remotive API doesn't have a single job endpoint,
 * so we fetch all and filter (with caching via React Query)
 */
export const fetchJobById = async (jobId: string): Promise<Job | null> => {
    const jobs = await fetchJobs("software-dev", 100);
    return jobs.find((job) => job.id === jobId) || null;
};
