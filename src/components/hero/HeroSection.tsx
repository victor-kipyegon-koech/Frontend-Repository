// import { useState } from "react";
// import { Search, Calendar, MapPin, Star } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Badge } from '../../components/ui/badge';

// export function HeroSection() {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = () => {
//     // Navigate to events page with search query
//     console.log("Searching for:", searchQuery);
//   };

//   return (
//     <section className="relative min-h-[600px] bg-gradient-to-br from-primary via-primary-glow to-accent flex items-center overflow-hidden">
//       {/* Background Animation */}
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-glow/80 to-accent/90">
//         <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float" />
//         <div className="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
//         <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
//       </div>

//       <div className="container relative z-10 text-center text-white">
//         <div className="max-w-4xl mx-auto space-y-8">
//           {/* Hero Title */}
//           <div className="space-y-4">
//             <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
//               <Star className="h-3 w-3 mr-1" />
//               Discover Amazing Events
//             </Badge>
//             <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//               Find Your Next
//               <span className="block text-accent animate-glow">
//                 Unforgettable Experience
//               </span>
//             </h1>
//             <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
//               Discover, book, and attend incredible events in your city. From concerts to conferences, we've got you covered.
//             </p>
//           </div>

//           {/* Hero Search */}
//           <div className="max-w-2xl mx-auto">
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
//               <div className="flex flex-col md:flex-row gap-3">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
//                   <Input
//                     placeholder="Search for events..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
//                     onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                   />
//                 </div>
//                 <Button 
//                   onClick={handleSearch}
//                   size="lg"
//                   className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
//                 >
//                   Search Events
//                 </Button>
//               </div>
              
//               <div className="flex flex-wrap gap-2 justify-center">
//                 <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 cursor-pointer">
//                   <Calendar className="h-3 w-3 mr-1" />
//                   This Weekend
//                 </Badge>
//                 <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 cursor-pointer">
//                   <MapPin className="h-3 w-3 mr-1" />
//                   Near Me
//                 </Badge>
//                 <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 cursor-pointer">
//                   Music
//                 </Badge>
//                 <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 cursor-pointer">
//                   Sports
//                 </Badge>
//               </div>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto pt-8">
//             <div className="text-center">
//               <div className="text-3xl font-bold">10K+</div>
//               <div className="text-white/80 text-sm">Events</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold">50K+</div>
//               <div className="text-white/80 text-sm">Happy Users</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold">500+</div>
//               <div className="text-white/80 text-sm">Venues</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold">100+</div>
//               <div className="text-white/80 text-sm">Cities</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }