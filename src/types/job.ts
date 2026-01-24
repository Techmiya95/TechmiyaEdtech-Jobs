// TypeScript interfaces for Remotive API response and internal Job model

/**
 * Raw job object from Remotive API
 */
export interface RemotiveJob {
    id: number;
    url: string;
    title: string;
    company_name: string;
    company_logo: string | null;
    category: string;
    job_type: string;
    publication_date: string;
    candidate_required_location: string;
    salary: string;
    description: string;
    tags: string[];
}

/**
 * Remotive API response structure
 */
export interface RemotiveApiResponse {
    "0-legal-notice": string;
    "job-count": number;
    jobs: RemotiveJob[];
}

/**
 * Internal Job model used throughout the application
 */
export interface Job {
    id: string;
    title: string;
    companyName: string;
    companyLogo: string | null;
    shortDescription: string;
    fullDescription: string;
    location: string;
    type: string;
    postedDate: string;
    applyUrl: string;
    salary: string;
    tags: string[];
}
