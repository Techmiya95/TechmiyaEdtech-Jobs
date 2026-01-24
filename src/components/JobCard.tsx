
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Clock, Building2 } from "lucide-react";

interface JobCardProps {
    id: string;
    title: string;
    description: string;
    postedDate: string;
    location: string;
    type: string;
    companyName?: string;
    companyLogo?: string | null;
}

export const JobCard = ({
    id,
    title,
    description,
    postedDate,
    location,
    type,
    companyName,
    companyLogo
}: JobCardProps) => {
    const formattedDate = new Date(postedDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-gray-200">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                        {companyLogo ? (
                            <img
                                src={companyLogo}
                                alt={`${companyName} logo`}
                                className="w-12 h-12 rounded-lg object-contain bg-gray-100 p-1 flex-shrink-0"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                        )}
                        <div>
                            <CardTitle className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{title}</CardTitle>
                            {companyName && (
                                <p className="text-sm font-medium text-amber-700">{companyName}</p>
                            )}
                        </div>
                    </div>
                    <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                        {formattedDate}
                    </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-3">
                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {location}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {type}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="line-clamp-3 text-gray-600">
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Link to={`/jobs/${id}`} className="w-full">
                    <Button variant="outline" className="w-full border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800">
                        Read More
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
