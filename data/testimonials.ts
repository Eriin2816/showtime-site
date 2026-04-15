// Placeholder testimonial data — replace with real reviews when available
// Each entry is clearly labeled as a placeholder for easy identification and replacement

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  service: string;
  initials: string;
  rating: 5 | 4;
}

export const testimonials: Testimonial[] = [
  {
    quote: "We've tried three different pool companies in Sherman Oaks over the years. Showtime Pools is the first one that actually shows up consistently, communicates clearly, and leaves the pool looking exactly how it should. We won't be switching again.",
    name: 'Jennifer M.',
    location: 'Sherman Oaks, CA',
    service: 'Weekly Maintenance',
    initials: 'JM',
    rating: 5,
  },
  {
    quote: "Our pump failed on a Friday before a weekend party. Showtime Pools diagnosed it the same afternoon and had parts ordered. They came back Monday and we were fully operational. That kind of responsiveness is what you hope for and rarely get.",
    name: 'David R.',
    location: 'Encino, CA',
    service: 'Equipment Repair',
    initials: 'DR',
    rating: 5,
  },
  {
    quote: "The pool remodel they did for us in Beverly Hills was exactly what we asked for — not what they thought we wanted, not an upsell of something we didn't need. The tile work, resurfacing, and new automation are all outstanding. Very professional team.",
    name: 'Sandra K.',
    location: 'Beverly Hills, CA',
    service: 'Pool Remodeling',
    initials: 'SK',
    rating: 5,
  },
  {
    quote: "I inherited a green pool when I moved into my Woodland Hills home. Showtime Pools turned it around in two visits and set up a weekly schedule that's kept it perfect ever since. I couldn't be happier with the results.",
    name: 'Marcus L.',
    location: 'Woodland Hills, CA',
    service: 'Algae Removal & Maintenance',
    initials: 'ML',
    rating: 5,
  },
  {
    quote: "They installed a Pentair automation system and variable-speed pump at our Calabasas home. Everything was explained clearly upfront, the installation was clean and professional, and the energy savings on our utility bill have already been noticeable.",
    name: 'Thomas A.',
    location: 'Calabasas, CA',
    service: 'Equipment Installation',
    initials: 'TA',
    rating: 5,
  },
  {
    quote: "We had a stubborn leak that two other companies couldn't locate properly. Showtime Pools found it within an hour of arriving — a cracked fitting in the return line — and repaired it the same day. Fair pricing and genuinely skilled technicians.",
    name: 'Rachel B.',
    location: 'Brentwood, CA',
    service: 'Leak Detection & Repair',
    initials: 'RB',
    rating: 5,
  },
];
