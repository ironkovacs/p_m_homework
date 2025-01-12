import {useQuery} from "@tanstack/react-query";
import axios from 'axios'
import {Header} from "./Header.tsx";
import {JobCard} from "./JobCard.tsx";
import {useState} from "react";
import {Box} from "@mui/material";


interface Job {
    id?: number;
    url?: string;
    jobTitle?: string;
    companyName?: string;
    companyLogo?: string;
    jobIndustry?: string;
    jobType?: string;
    jobGeo?: string;
    jobLevel?: string;
    jobExcerpt?: string;
    jobDescription?: string;
    pubDate?: string; // Publication date and time (UTC+00:00)
    annualSalaryMin?: number;
    annualSalaryMax?: number;
    salaryCurrency?: string; // ISO 4217 salary currency code (if applicable)
}

export interface Location {
    geoId: number;
    geoName: string;
    geoSlug: string;
}

export interface Industry {
    industryId: number;
    industryName: string;
    industrySlug: string;
}

interface JobicyApi2Response {
    apiVersion?: string;
    documentationUrl?: string;
    friendlyNotice?: string;
    jobCount?: number;
    xRayHash?: string;
    clientKey?: string;
    lastUpdate?: string
    jobs?: Job[];
    locations?: Location[];
    industries?: Industry[];
}

export const API_URL = 'https://jobicy.com/api/v2/remote-jobs';

export const decodeHtmlEntities = (text: string): string => {
    const parser = new DOMParser();
    const decoded = parser.parseFromString(text, 'text/html').documentElement.textContent;
    return decoded || '';
};

const fetchJobs = async (jobGeo?: string, jobIndustry?: string ): Promise<JobicyApi2Response> => {
    const params = new URLSearchParams();
    if (jobGeo) params.append('geo', jobGeo);
    if (jobIndustry) params.append('industry', jobIndustry);
    const url = `${API_URL}?${params.toString()}`

    const response = await axios.get(url);
    return response.data;
};


const useJobs = (jobGeo?: string, jobIndustry?: string) => {
    return useQuery(
        ['jobs', jobGeo, jobIndustry],
        () => fetchJobs(jobGeo, jobIndustry),
        {staleTime: 600000,enabled: true,}
    )
}


export const JobListings = () => {
    const [geo, setGeo] = useState('');
    const [industry, setIndustry] = useState('');

    const {data: data, isLoading, error} = useJobs(geo, industry);

    if (isLoading) return <div>Loading jobs...</div>;
    if (error) return <div>Error fetching jobs: {error.message}</div>
    if (!data) return <div>No jobs found</div>;

    return (
        <div>
            <Header
                geo={decodeHtmlEntities(geo)}
                industry={decodeHtmlEntities(industry)}
                onGeoChange={setGeo}
                onIndustryChange={setIndustry}
                jobCount={data.jobCount}
            />

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    gap: 1,
                }}
            >
                {data.jobs && data.jobs.length > 0 ? (
                    data.jobs.map((job: Job) => (
                        <JobCard
                            url={job.url}
                            jobTitle={decodeHtmlEntities(job.jobTitle)}
                            companyName={job.companyName}
                            companyLogo={job.companyLogo}
                            jobIndustry={decodeHtmlEntities(job.jobIndustry)}
                            jobType={decodeHtmlEntities(job.jobType)}
                            jobGeo={job.jobGeo}
                            jobLevel={job.jobLevel}
                            jobExcerpt={decodeHtmlEntities(job.jobExcerpt)}
                        />
                    ))
                ) : (
                    <p>No jobs found for the selected filters.</p>
                )}
            </Box>

        </div>
    );
};

export default JobListings

