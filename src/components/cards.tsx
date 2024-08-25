import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LeafIcon, Heart, Calendar, Camera, Globe, DollarSign } from "lucide-react"; // Ensure these icons are correctly imported
import clsx from "clsx";

const Cards = () => {
  const features = [
    {
      icon: LeafIcon,
      title: "Habitat finder",
      description: "Discover and explore various wildlife habitats around the world.",
    },
    {
      icon: Heart,
      title: "Emergency & Urgent Care",
      description: "Find urgent care options for wildlife emergencies.",
    },
    {
      icon: Calendar,
      title: "Doctor Appointment",
      description: "Schedule appointments with wildlife veterinarians.",
    },
    {
      icon: Camera,
      title: "Live stream",
      description: "Watch live streams of wildlife in their natural habitats.",
    },
    {
      icon: Globe,
      title: "Blogs",
      description: "Read blogs about wildlife conservation and care.",
    },
    {
      icon: DollarSign,
      title: "Crowd Funding",
      description: "Support wildlife conservation efforts through crowdfunding.",
    },
  ];

  return (
    <section className="py-10 container px-10">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold"></h2>
        </div>
        <div className="flex flex-wrap -mx-4">
          {features.map((feature, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="relative">
                <Card className="h-64 text-center pt-12 bg-white hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
                  <div
                    className={clsx(
                      "absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-20 h-20 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full",
                      "hover:bg-green-500 hover:border-green-500 transition-colors duration-300"
                    )}
                  >
                    <feature.icon size={40} className="text-gray-700 hover:text-white transition-colors duration-300" />
                  </div>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;