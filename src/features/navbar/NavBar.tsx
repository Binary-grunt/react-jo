import { Link } from 'wouter';
import { NAVLINKS_PUBLIC } from '@/config/navlink';
import { FC } from 'react';
import { DropDownAccount } from '@/features/header/DropDownAccount';
import { UserRole } from '@/config/enums/UserRole.enum';
import { CartPopoverPreview } from '@/features/cart/CartPopoverPreview';
import { MedalIcon } from '@/components/ui/IconComponents';

interface NavBarProps {
  isAuthenticated: boolean;
  totalItems: number;
  role: string | null;
}

export const NavBar: FC<NavBarProps> = ({ isAuthenticated, totalItems, role }) => {
  return (
    <header className="w-full shadow-sm dark:bg-gray-950">
      <div className="container flex items-center justify-between h-16 px-4 md:px-2">
        <div className="flex items-center gap-2">
          <MedalIcon className="w-8 h-8 text-rose-500" />
          <span className="text-xl font-bold tracking-tight text-white ml-2">Paris 2024</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-md font-medium">
          {NAVLINKS_PUBLIC.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className="text-md font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated && role === UserRole.ADMIN && (
            <Link
              href={'/dashboard'}
              className="text-md font-medium text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-6">
          <div className="relative">
            <CartPopoverPreview />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-medium">
                {totalItems}
              </span>
            )}
          </div>
          {!isAuthenticated ? (
            <>
              <Link
                href="/auth"
                className="inline-flex items-center justify-center px-6 py-3 text-base 
                font-semibold text-gray-900 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-50"
              >
                Connexion
              </Link>
            </>
          ) : (
            <DropDownAccount />
          )}
        </div>
      </div>
    </header>
  );
};