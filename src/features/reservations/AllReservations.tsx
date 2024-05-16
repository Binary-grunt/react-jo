import { CardReservations } from './CardReservations';
import { useEffect } from 'react';
import useReservationStore from '@/stores/useReservationStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useFilter, usePagination } from '@/hooks';
import { PaginationComponent } from '@/components/common/PaginationComponent';
import { FilterDropdown, SortByDropdown, SortOrderDropdown } from '@/components/button';
import { sortingReservationOptions } from './reservationsOptions';
import { categoryDashboardGroups } from '../dashboard/EventDashboard/dashboardEventOptions';
import { Button } from '@/components/ui/button';

export const AllReservations = () => {
  const { reservations, fetchReservations, total } = useReservationStore();
  const { userId } = useAuthStore();

  const { currentPage, setPage, limit, totalPages, offset } = usePagination({
    initialPage: 1,
    initialLimit: 12,
    totalCount: total
  });

  const { sortBy, setSortBy, sortOrder, setSortOrder, filterBy, filterValue, setFilterValue } =
    useFilter('reservationDetails.price', 'DESC', 'reservationDetails.event.categoryType', 'ALL');

  useEffect(() => {
    if (userId) {
      fetchReservations(userId, { limit, offset, sortBy, sortOrder, filterBy, filterValue });
    }
  }, [
    currentPage,
    fetchReservations,
    userId,
    limit,
    offset,
    sortBy,
    sortOrder,
    filterBy,
    filterValue
  ]);

  useEffect(() => {
    setPage(1); // Reset to the first page whenever filters or sorting change
  }, [setPage, sortBy, sortOrder, filterBy, filterValue]);

  return (
    <div className="max-w-10xl mx-auto p-4 lg:px-6 sm:py-8 md:py-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <SortByDropdown
            sortBy={sortBy}
            onSortChange={setSortBy}
            options={sortingReservationOptions}
          />
          <SortOrderDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
          <FilterDropdown
            groups={categoryDashboardGroups}
            filterValue={filterValue}
            onChange={setFilterValue}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Rejected</Button>
          <Button variant="outline">Approved</Button>
          <Button variant="outline">Pending</Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {reservations.map(reservation => (
          <CardReservations key={reservation.reservationId} reservation={reservation} />
        ))}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
