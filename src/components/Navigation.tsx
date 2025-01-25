import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold">AI Mentor</span>
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex">
            <NavigationMenuItem>
              <NavigationMenuLink className="px-4 py-2" asChild>
                <Link to="/roadmaps">Roadmaps</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="px-4 py-2" asChild>
                <Link to="/adaptive-learning">Adaptive Learning</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="px-4 py-2" asChild>
                <Link to="/career-guidance">Career Guidance</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="px-4 py-2" href="#benefits">
                Benefits
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button>
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};