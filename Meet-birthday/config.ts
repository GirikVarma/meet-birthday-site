// config.ts
export interface Friend {
  name: string;
  initial: string;
}

export interface BirthdayMessage {
  id: number;
  sender: string;
  text: string;
}

export interface SiteConfig {
  hero: {
    name: string;
    subtitle: string;
    stat1: { value: string; label: string };
    stat2: { value: string; label: string };
  };
  messages: BirthdayMessage[];
  gallery: string[];
  footer: {
    friends: Friend[];
    closing: string;
  };
  easterEgg: {
    quote: string;
  };
}

export const siteConfig: SiteConfig = {
  hero: {
    name: "Meet Keswani",
    subtitle: "23 Years. 23 Kilometres. One unforgettable birthday.",
    stat1: { value: "23", label: "Years Young" },
    stat2: { value: "23 km", label: "Birthday Run" },
  },
  messages: [
    {
      id: 1,
      sender: "Girik",
      text: "Happy 23rd, Meet. From running 23km to everything else you conquer, it's always an honor to watch you grow. Here's to another year of brilliance."
    },
    {
      id: 2,
      sender: "Friend 2",
      text: "Wishing you the happiest of birthdays! Keep aiming for the stars and playing the cards you're dealt with that same sharp wit."
    },
    {
      id: 3,
      sender: "Friend 3",
      text: "To the smartest, nerdiest, and funniest guy in the room. Happy Birthday, Meet. Let's make 23 the best chapter yet."
    }
  ],
  gallery: [
    "/photos/photo1.jpg", 
    "/photos/photo2.jpg",
    "/photos/photo3.jpg",
    "/photos/photo4.jpg",
    "/photos/photo5.jpg",
    "/photos/photo6.jpg"
  ],
  footer: {
    friends: [
      { name: "Girik", initial: "G" },
      { name: "Friend 2", initial: "F2" },
      { name: "Friend 3", initial: "F3" }
    ],
    closing: "Happy Birthday,\nMeet."
  },
  easterEgg: {
    quote: "Bhai Cigarette bohot kharab chiz hai, nahi phukna chahiye."
  }
};