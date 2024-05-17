import { FC } from 'react';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter
} from '@/components/ui/card';
import { ActivityIcon } from '@/components/ui/IconComponents';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useFormattedDates } from '@/hooks';
import { iconMapping } from '@/components/ui/IconCategories';

export interface EventCardProps {
  eventId: number | undefined;
  title: string;
  shortDescription: string;
  categoryType: string;
  quantityAvailable: number;
  startDate: string;
  endDate: string;
}

export const EventCard: FC<EventCardProps> = ({
  eventId,
  title,
  shortDescription,
  categoryType,
  quantityAvailable,
  startDate,
  endDate
}) => {
  const dateText = useFormattedDates(startDate, endDate);
  const IconComponent = iconMapping[categoryType] || ActivityIcon;

  return (
    <Card className="group hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{shortDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <IconComponent className="h-8 w-8 text-primary group-hover:text-primary-600 transition-colors duration-300" />
          <div>
            <div className="font-medium">{categoryType}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Place available: {quantityAvailable}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{dateText}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {eventId && (
          <Link to={`/events/${eventId}`}>
            <Button variant="default">View Event</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};