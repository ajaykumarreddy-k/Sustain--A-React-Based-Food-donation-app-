
export interface DonationItem {
  id: string;
  title: string;
  description: string;
  donor: string;
  distance: string;
  timeLeft: string;
  category: 'Produce' | 'Prepared' | 'Bakery' | 'Other';
  imageUrl: string;
}

export type ViewType = 'feed' | 'map' | 'activity' | 'profile';
