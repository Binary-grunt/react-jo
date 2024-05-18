import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { FC } from 'react';
import { PriceFormula } from '@/config/enums/PriceFormula.enum';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QuantitySelector } from '../select/QuantitySelector';

interface CardTicketPriceProps {
  currentPrice: number | undefined;
  selectedTicketType: string;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleTicketTypeChange: (value: PriceFormula) => void;
  handleAddToCart: () => any;
}

export const CardTicketSelect: FC<CardTicketPriceProps> = ({
  currentPrice,
  selectedTicketType,
  quantity,
  setQuantity,
  handleTicketTypeChange,
  handleAddToCart
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Ticket Prices </CardTitle>
      <CardDescription className="text-md">
        {currentPrice ? `Price: $${currentPrice}` : 'Select a ticket type'}{' '}
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-6">
      <div className="flex gap-6 pb-3">
        <div className="flex gap-2">
          <RadioGroup
            defaultValue={selectedTicketType}
            onValueChange={handleTicketTypeChange}
            name="ticketType"
            className="flex items-center gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={PriceFormula.SOLO} id="r1" />
              <Label htmlFor="r1">Solo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={PriceFormula.DUO} id="r2" />
              <Label htmlFor="r2">Duo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={PriceFormula.FAMILY} id="r3" />
              <Label htmlFor="r3">Family</Label>
            </div>
          </RadioGroup>
        </div>
        <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      </div>
      <Button type="submit" onClick={handleAddToCart} className="w-full">
        Add to Cart
      </Button>
    </CardContent>
    <CardFooter>
      <div className="flex gap-2"></div>
    </CardFooter>
  </Card>
);
