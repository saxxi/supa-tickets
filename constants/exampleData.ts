import { URLImage } from "@/interfaces/image"
import { Distributor } from "@/interfaces/distributor"
import { Ticket } from "@/interfaces/ticket"
import { Category } from "@/interfaces/category";

var API_KEY = '43647816-5d6483732bbb86143b6b2a87f';

const getTicketImages = async () => {
  // const rawResponse = await fetch(`https://pixabay.com/api/?key=${API_KEY}&category=music&image_type=photo&pretty=true`);
  // const rawResponse = await fetch(`https://pixabay.com/api/?key=${API_KEY}&category=music&image_type=photo&pretty=true`);
  // const jsonResponse = await rawResponse.json();
  // jsonResponse.hits.map...
  return [...Array(10).keys()].map((hit: any, id): URLImage => ({
    // url: hit.webformatURL,
    url: `https://dummyjson.com/image/400x200/008080/ffffff?text=hello ${id}&fontSize=16`,
    width: hit.webformatWidth,
    height: hit.webformatHeight,
  }))
}

export const staticCategories = (): Category[] => {
  return [
    { name: "Music", icon: "music" },
    { name: "Theater", icon: "masks-theater" },
    { name: "Sports", icon: "futbol" },
    { name: "Technology", icon: "laptop" },
    { name: "Movies", icon: "film" },
    { name: "Art", icon: "paintbrush" },
    { name: "Comedy", icon: "laugh" },
    { name: "Literature", icon: "book" },
    { name: "History", icon: "landmark" },
    { name: "Gaming", icon: "gamepad" },
    { name: "Dance", icon: "people-pulling" },
    { name: "Food & Drink", icon: "utensils" },
    { name: "Fashion", icon: "shirt" },
    { name: "Science", icon: "flask" },
    { name: "Cinema", icon: "video" },
    { name: "Circus", icon: "hippo" },
    { name: "Wine & Spirits", icon: "wine-bottle" },
  ]
};

export const staticTickets = async (): Promise<Ticket[]> => {
  const distributors: Distributor[] = [
    { id: '1', name: 'Example Entertainment', website: 'https://exampleentertainment.com' },
    { id: '2', name: 'TicketMaster', website: 'https://www.ticketmaster.com' },
    { id: '3', name: 'StubHub', website: 'https://www.stubhub.com' },
    { id: '4', name: 'Live Nation', website: 'https://www.livenation.com' },
    { id: '5', name: 'Eventbrite', website: 'https://www.eventbrite.com' },
    { id: '6', name: 'AXS', website: 'https://www.axs.com' },
    { id: '7', name: 'Vivid Seats', website: 'https://www.vividseats.com' },
    { id: '8', name: 'SeatGeek', website: 'https://seatgeek.com' },
    { id: '9', name: 'Goldstar', website: 'https://www.goldstar.com' },
    { id: '10', name: 'TicketCity', website: 'https://www.ticketcity.com' }
  ]

  const ticketImages = await getTicketImages()

  return [
    { category: 'Music', title: 'Concert at Madison Square Garden', description: 'Enjoy live music at one of the most iconic venues in the world.', file_image: 'Concert at Madison Square Garden.jpg' },
    { category: 'Sports', title: 'Sports Event: NBA Finals', description: 'Watch the excitement of the NBA Finals live.', file_image: 'Sports Event- NBA Finals.jpg' },
    { category: 'Music', title: 'Music Festival: Coachella', description: 'Join the ultimate music and arts festival in the California desert.', file_image: 'Music Festival- Coachella.jpg' },
    { category: 'Technology', title: 'TED Talk Conference', description: 'Expand your mind with inspiring talks from thought leaders and innovators.', file_image: 'TED Talk Conference.jpg' },
    { category: 'Art', title: 'Art Exhibition: The Louvre', description: 'Explore masterpieces of art and culture at one of the world\'s largest museums.', file_image: 'Art Exhibition- The Louvre.jpg' },
    { category: 'Technology', title: 'Tech Conference: CES', description: 'Discover the latest in technology and innovation at the Consumer Electronics Show.', file_image: 'Tech Conference- CES.jpg' },
    { category: 'Movies', title: 'Movie Premiere: Avengers: Endgame', description: 'Be among the first to see the epic conclusion to the Avengers saga.', file_image: 'Movie Premiere- Avengers- Endgame.jpg' },
    { category: 'Comedy', title: 'Stand-up Comedy Show: Dave Chappelle Live', description: 'Laugh out loud with one of the greatest comedians of all time.', file_image: 'Stand-up Comedy Show- Dave Chappelle Live.jpg' },
    { category: 'Theater', title: 'Musical: The Phantom of the Opera', description: 'Experience the haunting romance of Broadway\'s longest-running show.', file_image: 'Musical- The Phantom of the Opera.jpg' },
    { category: 'Sports', title: 'Soccer Match: FIFA World Cup Final', description: 'Witness the drama and excitement of the world\'s most prestigious soccer tournament.', file_image: 'Soccer Match- FIFA World Cup Final.jpg' },
    { category: 'Food & Drink', title: 'Food and Wine Festival', description: 'Indulge in gourmet cuisine and fine wines from around the world.', file_image: 'Food and Wine Festival.jpg' },
    { category: 'Fashion', title: 'Fashion Week: Paris', description: 'Get a front-row seat to the latest trends and styles from top designers.', file_image: 'Fashion Week- Paris.jpg' },
    { category: 'Theater', title: 'Broadway Show: Hamilton', description: 'Experience the cultural phenomenon that is Hamilton.', file_image: 'Broadway Show- Hamilton.jpg' },
    { category: 'Literature', title: 'Book Signing: Stephen King', description: 'Meet the legendary author and get your copy of his latest book signed.', file_image: 'Book Signing- Stephen King.jpg' },
    { category: 'History', title: 'Historical Tour: Machu Picchu', description: 'Journey through ancient ruins and breathtaking landscapes in Peru.' },
    { category: 'Gaming', title: 'Gaming Convention: E3', description: 'Explore the future of gaming with hands-on demos and exciting announcements.' },
    { category: 'Art', title: 'Opera: La Traviata', description: 'Savor the beauty and passion of Verdi\'s classic opera.' },
    { category: 'Music', title: 'Musical Festival: Glastonbury', description: 'Dance the night away to the biggest names in music at Glastonbury.' },
    { category: 'Science', title: 'Science Symposium: TEDx', description: 'Engage with groundbreaking ideas and discoveries at a TEDx event.' },
    { category: 'Cinema', title: 'Film Festival: Cannes', description: 'Celebrate cinema with screenings of the year\'s most anticipated films.' },
    { category: 'Dance', title: 'Dance Performance: Swan Lake', description: 'Be enchanted by Tchaikovsky\'s timeless ballet masterpiece.' },
    { category: 'Food & Drink', title: 'Beer Festival: Oktoberfest', description: 'Raise a stein and enjoy traditional Bavarian beer and food at Oktoberfest.' },
    { category: 'Technology', title: 'Motor Show: Geneva International Motor Show', description: 'Admire the latest models and cutting-edge technology at one of the world\'s premier auto shows.' },
    { category: 'Music', title: 'Outdoor Concert: Lollapalooza', description: 'Rock out to your favorite bands under the summer sun at Lollapalooza.' },
    { category: 'Magic', title: 'Magic Show: David Copperfield Live', description: 'Be amazed by illusions and sleight of hand from the master magician.' },
    { category: 'Literature', title: 'Literature Festival: Edinburgh International Book Festival', description: 'Immerse yourself in the world of books and literature in the historic city of Edinburgh.' },
    { category: 'Circus', title: 'Circus Performance: Cirque du Soleil', description: 'Marvel at acrobatics and aerial feats in a spectacle of wonder and imagination.' },
    { category: 'Wine & Spirits', title: 'Wine Tasting Tour: Napa Valley', description: 'Sip on award-winning wines and enjoy scenic vineyard views in Napa Valley.' },
    { category: 'Fashion', title: 'Fashion Show: New York Fashion Week', description: 'See the latest collections from top designers on the runway at New York Fashion Week.' },
    { category: 'Music', title: 'Music Concert: Rolling Stones', description: 'Rock legends the Rolling Stones perform their greatest hits live.' },
    { category: 'Comedy', title: 'Comedy Festival: Just for Laughs', description: 'Laugh until it hurts with top comedians from around the world at Just for Laughs.' },
    { category: 'Art', title: 'Opera: Carmen', description: 'Experience the passion and drama of Bizet\'s classic opera, Carmen.' },
    { category: 'Music', title: 'Jazz Festival: Montreux Jazz Festival', description: 'Groove to the smooth sounds of jazz at the legendary Montreux Jazz Festival.' },
    { category: 'Cinema', title: 'Film Screening: Sundance Film Festival', description: 'Discover independent cinema and emerging filmmakers at the Sundance Film Festival.' },
    { category: 'Food & Drink', title: 'Culinary Tour: Tuscany', description: 'Taste authentic Italian cuisine and learn traditional cooking techniques in the heart of Tuscany.' },
    { category: 'Technology', title: 'Tech Summit: Web Summit', description: 'Join industry leaders and innovators for discussions on the future of technology at Web Summit.' },
    { category: 'Dance', title: 'Ballet: The Nutcracker', description: 'Enter a magical world of dancing toys and sugar plum fairies in the holiday classic, The Nutcracker.' },
    { category: 'Wine & Spirits', title: 'Beer Tasting: Belgium Beer Weekend', description: 'Sample a wide variety of Belgian beers at one of Europe\'s largest beer festivals.' },
    { category: 'Theater', title: 'Musical: Les Misérables', description: 'Experience the epic tale of love and redemption set against the backdrop of 19th-century France.' },
    { category: 'Food & Drink', title: 'Food Truck Festival', description: 'Feast on gourmet street food from around the world at a vibrant food truck festival.' },
    { category: 'Art', title: 'Art Auction: Christie\'s', description: 'Bid on masterpieces from renowned artists at a prestigious art auction at Christie\'s.' },
    { category: 'Gaming', title: 'Comic Con', description: 'Geek out with fellow fans and meet your favorite celebrities at the ultimate pop culture convention, Comic Con.' },
    { category: 'Theater', title: 'Theater Performance: The Lion King', description: 'Hakuna Matata! Experience the magic of Disney\'s The Lion King on Broadway.' },
    { category: 'Wine & Spirits', title: 'Whiskey Tasting: Scotch Whisky Experience', description: 'Discover the rich history and flavors of Scotch whisky with a guided tasting in Edinburgh.' },
    { category: 'Music', title: 'Music Festival: Tomorrowland', description: 'Dance to the biggest DJs in the world at the electrifying Tomorrowland music festival.' },
    { category: 'Cinema', title: 'Film Premiere: Cannes Film Festival', description: 'Rub shoulders with Hollywood stars and attend premieres of the year\'s most anticipated films at the Cannes Film Festival.' },
    { category: 'Art', title: 'Opera: La Bohème', description: 'Be swept away by Puccini\'s romantic masterpiece, La Bohème.' },
    { category: 'Food & Drink', title: 'Wine and Cheese Tasting', description: 'Savor the perfect pairing of fine wines and artisanal cheeses at a gourmet tasting event.' },
    { category: 'Fashion', title: 'Fashion Show: Milan Fashion Week', description: 'Experience the glamour of Italian fashion at Milan Fashion Week.' },
    { category: 'Music', title: 'Music Concert: Taylor Swift Reputation Tour', description: 'Sing along to chart-topping hits from Taylor Swift\'s Reputation album on her world tour.' },
    { category: 'Comedy', title: 'Comedy Show: Kevin Hart Live', description: 'Laugh until you cry with stand-up comedy superstar Kevin Hart.' },
    { category: 'Dance', title: 'Ballet: Swan Lake', description: 'Witness the beauty and tragedy of Tchaikovsky\'s timeless ballet, Swan Lake.' },
    { category: 'Music', title: 'Jazz Club: Blue Note Jazz Club', description: 'Immerse yourself in the soulful sounds of jazz at the legendary Blue Note Jazz Club.' },
    { category: 'Cinema', title: 'Film Screening: Tribeca Film Festival', description: 'Discover groundbreaking films and emerging talent at the Tribeca Film Festival in New York City.' },
    { category: 'Food & Drink', title: 'Cooking Class: Thai Cuisine', description: 'Learn the art of Thai cooking and create delicious dishes with authentic ingredients.' },
    { category: 'Technology', title: 'Tech Conference: Google I/O', description: 'Get the latest updates on Google products and technologies at the annual Google I/O developer conference.' },
    { category: 'Theater', title: 'Broadway Show: Wicked', description: 'Experience the untold story of the Witches of Oz in the hit musical, Wicked.' },
    { category: 'Food & Drink', title: 'Beer Festival: Great American Beer Festival', description: 'Celebrate craft beer culture with thousands of beers from hundreds of breweries at the Great American Beer Festival.' },
    { category: 'Music', title: 'Concert: Adele Live', description: 'Experience the powerhouse vocals of Adele live in concert.' }
  ].map(({ file_image, ...ticket }, index) => {
    return {
      ...ticket,
      distributor: distributors[index % (distributors.length - 1)],
      image: file_image ? { file_image } : ticketImages[index % (ticketImages.length - 1)],
      id: `${index + 1}`,
      date: new Date(2024, 3, index + 1), // Assuming each event is on a different day in April 2024
      price_value: Math.floor(Math.random() * 100) + 50, // Random price between 50 and 150
      price_currency: 'USD',
      quantity: Math.floor(Math.random() * 10) + 1, // Random quantity between 1 and 10
      activated: false,
      expired: false,
      purchased_date: null,
    }
  })
}
