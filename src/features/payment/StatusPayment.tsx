import { useMemo } from 'react';
import { useCartStore } from '@/stores/useCartStore';
import { navigate } from 'wouter/use-browser-location';
import { CheckIcon, XIcon } from '@/components/ui/IconComponents';
import { Button } from '@/components/ui/button';
import { StatusPaymentEnum } from '@/config/enums/StatusPayment.enum';

interface StatusPaymentProps {
  reservation: {
    reservationId: number;
    reservationDetails: any[];
    user: {
      firstName: string;
      lastName: string;
    };
    transaction: {
      statusPayment: string;
      paymentId: string;
      totalAmount: number;
    };
  }[];
}

/**
 * `StatusPayment` component displays the status of a payment transaction.
 * It shows different messages and icons based on the payment status.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Array} props.reservation - The reservation data array.
 * @returns {JSX.Element} The rendered StatusPayment component.
 *
 * @example
 * return (
 *   <StatusPayment
 *     reservation={[{
 *       reservationId: 1,
 *       reservationDetails: [],
 *       user: { firstName: 'John', lastName: 'Doe' },
 *       transaction: { statusPayment: 'APPROVED', paymentId: '123456', totalAmount: 100 }
 *     }]}
 *   />
 * );
 *
 * @remarks
 * The component uses Tailwind CSS for styling and relies on several custom components and hooks:
 * - `useCartStore` to access and clear the cart state.
 * - `CheckIcon`, `XIcon` for status icons.
 * - `Button` for the return button.
 * - `useMemo` to memoize the description status based on payment status.
 */
export const StatusPayment = ({ reservation }: StatusPaymentProps): JSX.Element => {
  const data = reservation[0];
  const clearCart = useCartStore(state => state.clearCart);

  /**
   * Handle navigation to the home page and clear the cart.
   */
  const handleHome = () => {
    navigate('/');
    clearCart();
  };

  /**
   * Get the description of the payment status.
   */
  const descriptionStatus = useMemo(() => {
    if (!data) return 'No payment data available.';
    switch (data.transaction.statusPayment) {
      case StatusPaymentEnum.APPROVED:
        return 'Votre paiement a été accepté.';
      case StatusPaymentEnum.REJECTED:
        return 'Votre paiement a été rejeté.';
      default:
        return 'Pas de statut de paiement disponible.';
    }
  }, [data]);

  /**
   * Get the icon component based on the payment status.
   */
  const StatusIcon = () => {
    if (!data) return null;
    switch (data.transaction.statusPayment) {
      case StatusPaymentEnum.APPROVED:
        return (
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
          </div>
        );
      case StatusPaymentEnum.REJECTED:
        return (
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <XIcon className="h-8 w-8 text-red-500 dark:text-red-400" />
          </div>
        );
      default:
        return null;
    }
  };

  if (!reservation.length) {
    return <p>No reservation data available.</p>;
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 sm:py-8 sm:px-12">
      <StatusIcon />
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Paiement{' '}
          {data.transaction.statusPayment === StatusPaymentEnum.APPROVED ? 'approuvé' : 'rejeté'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">{descriptionStatus}</p>
      </div>
      <div className="w-full space-y-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Numéro de Transaction
          </p>
          <p className="text-sm font-medium">{data.transaction.paymentId}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Prénom</p>
          <p className="text-sm font-medium">{data.user.firstName}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nom de Famille</p>
          <p className="text-sm font-medium">{data.user.lastName}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total du panier</p>
          <p className="text-sm font-medium">€{data.transaction.totalAmount}</p>
        </div>
      </div>
      <Button
        onClick={handleHome}
        className="inline-flex h-10 items-center justify-center rounded-md bg-rose-500 
        px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none 
        disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
      >
        Retour à l'accueil
      </Button>
    </div>
  );
};
