import React from 'react';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {API_URL, decodeHtmlEntities, Industry, Location} from "./JobListings.tsx";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";

interface HeaderProps {
    geo: string;
    industry: string;
    onGeoChange: (value: string) => void;
    onIndustryChange: (value: string) => void;
    jobCount: number;
}
const fetchGeos = async (): Promise<Location[]> => {
    const response = await axios.get(`${API_URL}?get=locations`);
    return response.data.locations;
};
const useGeos = () => {
    return useQuery<Location[]>(['locations'], fetchGeos);
};

const fetchIndustries = async (): Promise<Industry[]> => {
    const response = await axios.get(`${API_URL}?get=industries`);
    return response.data.industries;
};

const useIndustries = () => {
    return useQuery<Industry[]>(['industries'], fetchIndustries);
};

export const Header: React.FC<HeaderProps> = (
    {
        geo,
        industry,
        onGeoChange,
        onIndustryChange,
        jobCount
    }) => {
    const { data: geos, isLoading: geosLoading } = useGeos();
    const { data: industries, isLoading: industriesLoading } = useIndustries();

    if (geosLoading || industriesLoading) return <div>Loading filters...</div>;



    return (
        <header style={{
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }}> <Typography variant='h3'>jobicy Remote Jobs search</Typography>
            <Box sx={{display: 'flex', gap: '1em', justifyContent: 'space-around', alignItems: 'center'}}>
                <FormControl className='filter location'>
                    <InputLabel id="geo-select-label">Location:</InputLabel>
                    <Select
                        id="geo-select"
                        labelId="geo-select-label"
                        value={geo}
                        onChange={(e) => onGeoChange(e.target.value)}
                        sx={{ width: '12em', marginLeft: '0.5em', padding: '0.5em'}}
                    >
                        <MenuItem value="">All Locations</MenuItem>
                        ({geos?.map((geo) => (
                        <MenuItem key={geo.geoId} value={geo.geoSlug}>
                            {decodeHtmlEntities(geo.geoName)}
                        </MenuItem>
                    ))})
                    </Select>
                </FormControl>
                <FormControl className='filter industry'>
                    <InputLabel id="ndustry-select-label">Industry</InputLabel>
                    <Select
                        sx={{ width: '12em', marginLeft: '0.5em', padding: '0.5em'}}
                        labelId="ndustry-select-label"
                        label="Industry"
                        id="industry-select"
                        value={industry}
                        onChange={(e) => onIndustryChange(e.target.value)}
                    >
                        <MenuItem value="">All Industries</MenuItem>
                        ({industries?.map((industry) => (
                        <MenuItem key={industry.industryId} value={industry.industrySlug}>
                            {decodeHtmlEntities(industry.industryName)}
                        </MenuItem>
                    ))})
                    </Select>
                </FormControl>
                <Typography variant='body1'>Listed jobs: {jobCount}</Typography>
            </Box>
        </header>
    );
};