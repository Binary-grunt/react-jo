import { useEventStore } from '@/stores/useEventStore';
import { useEffect } from 'react';
import { useFilter, usePagination } from '@/hooks';
import { EventCard } from '@/components/cards/EventCard';
import { PaginationComponent } from '@/components/pagination/PaginationComponent';
import { SortByDropdown } from '@/components/dropdown/SortByDropdown';
import { SortOrderDropdown } from '@/components/dropdown/SortOrderDropdown';
import { FilterDropdown } from '@/components/dropdown/FilterDropdown';
import { FILTERS_EVENT } from '@/config/filters/filtersEvents';
import { SORTING_EVENTS_PUBLIC } from '@/config/sorting/sortingEvents';
import { GenericTitle } from '@/components/hero/GenericTitle';

export const EventsMainContent: React.FC = () => {
  const { events, fetchEvents, total } = useEventStore();
  const { currentPage, setPage, limit, totalPages, offset } = usePagination({
    initialPage: 1,
    initialLimit: 9,
    totalCount: total
  });
  const { sortBy, setSortBy, sortOrder, setSortOrder, filterBy, filterValue, setFilterValue } =
    useFilter('title', 'DESC', 'categoryType', 'ALL');
  useEffect(() => {
    fetchEvents({ limit, offset, sortBy, sortOrder, filterBy, filterValue });
  }, [currentPage, limit, sortBy, sortOrder, filterBy, filterValue, fetchEvents]);

  useEffect(() => {
    setPage(1); // Reset to the first page whenever filters or sorting change
  }, [setPage, sortBy, sortOrder, filterBy, filterValue]);

  return (
    <section className="w-full py-12 md:py-14 lg:py-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <GenericTitle
              title="Explore All Events"
              subtitle="Browse the complete schedule of events and competitions for the Paris 2024 Olympic Games."
              titleClass="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-100"
              subtitleClass="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <SortByDropdown
              sortBy={sortBy}
              onSortChange={setSortBy}
              options={SORTING_EVENTS_PUBLIC}
            />
            <SortOrderDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
            <FilterDropdown
              groups={FILTERS_EVENT}
              filterValue={filterValue}
              onChange={setFilterValue}
            />
          </div>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {events.map(event => (
            <EventCard
              eventId={event.eventId}
              key={event.eventId}
              title={event.title}
              categoryType={event.categoryType}
              shortDescription={event.shortDescription}
              quantityAvailable={event.quantityAvailable}
              startDate={event.startDate}
              endDate={event.endDate}
            />
          ))}
        </div>
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
};