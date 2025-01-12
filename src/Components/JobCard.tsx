import React from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia, Link,
    Typography,

} from "@mui/material";
import {decodeHtmlEntities} from "./JobListings.tsx";

export interface JobProps {
    url: string;
    jobTitle: string;
    companyName: string;
    companyLogo: string;
    jobIndustry: string;
    jobType: string;
    jobGeo: string;
    jobLevel: string;
    jobExcerpt: string;
}

export const JobCard: React.FC<JobProps> = (
    {
        url,
        jobTitle,
        companyName,
        companyLogo,
        jobIndustry,
        jobType,
        jobGeo,
        jobLevel,
        jobExcerpt
    }) => {


    return (
        <Card style={
            {
                display: "flex",
                height: "max-content",
                margin: "1em",
                maxWidth: "40em",
            }}>

            <CardContent>
                <Box sx={{display: "flex", flexDirection: "row", gap: "1em"}}>
                    <Box>
                        <CardMedia
                            component="img"
                            image={companyLogo}
                            alt={`${companyName}_logo`}
                            style={{padding: "0.5em", maxHeight: "4em"}}
                        />
                        <Typography variant="subtitle1" align="center">{companyName}</Typography>
                    </Box>
                    {/* --- JOB DETAILS --- */}

                    <Typography variant="h4">
                        {jobTitle} - {jobLevel}
                    </Typography>

                </Box>
                <Typography variant="body1" color="textSecondary">
                    Type: {jobType}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Industry: {jobIndustry}
                </Typography>
                <Typography variant="body1">
                    Location: {jobGeo}
                </Typography>
                <Typography variant="body2" sx={{marginTop: "8px"}}>
                    {jobExcerpt}
                </Typography>
                <Link href={url}>Visit link to job</Link>
            </CardContent>
        </Card>)
};

